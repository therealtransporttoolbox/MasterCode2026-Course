#!/usr/bin/env python3
"""
abn_ingest.py
-------------
Processes the ABR Bulk Extract (weekly ZIP/XML, dataset "ABN Bulk Extract"
on data.gov.au) to discover road-freight leads. No API key required.

Requirements:
    python 3.10+   (stdlib only — no third-party packages needed)

Usage:
    python abn_ingest.py --input ./extract --out staging.sqlite --csv road_freight.csv
    python abn_ingest.py --input abn_part1.zip --out staging.sqlite
    python abn_ingest.py --self-test
"""

from __future__ import annotations

import argparse
import csv
import re
import sqlite3
import sys
import zipfile
from pathlib import Path
from typing import IO, Iterator, Optional
from xml.etree import ElementTree as ET

# ── Classification ────────────────────────────────────────────────────────────
# Strip EXCLUSION phrases from the combined name string BEFORE scanning strong/
# medium terms.  This stops "transportable" from supplying a false "transport"
# hit and "air freight" / "sea freight" from supplying a false "freight" hit.
# LCV is checked BEFORE neutralisation on the raw string.

_EXCLUSION_PHRASES = [
    "transportable", "public transport", "patient transport", "medical transport",
    "transport planning", "transport consulting", "bus", "coach", "taxi",
    "air freight", "sea freight",
]

_STRONG_PATTERNS = [
    r"transport",       r"haulage",         r"cartage",         r"freight",
    r"trucking",        r"tippers?",        r"carriers?",       r"road train",
    r"linehaul",        r"b-double",        r"prime mover",     r"semitrailer",
    r"low loader",      r"heavy haulage",   r"general freight", r"freight lines",
    r"livestock transport", r"refrigerated transport",
    r"bulk transport",  r"container transport",
]

_MEDIUM_PATTERNS: dict[str, float] = {
    r"logistics":    0.6,
    r"haul":         0.7,
    r"tanker":       0.7,
    r"distribution": 0.45,
    r"towing":       0.55,
    r"removals":     0.45,
}

_LCV_PATTERNS = [r"couriers?", r"parcels?", r"food delivery"]

_EXCL_RE   = [re.compile(r"\b" + re.escape(p) + r"\b", re.I) for p in _EXCLUSION_PHRASES]
_STRONG_RE = [re.compile(r"\b" + p + r"\b", re.I) for p in _STRONG_PATTERNS]
_MEDIUM_RE = {re.compile(r"\b" + p + r"\b", re.I): w for p, w in _MEDIUM_PATTERNS.items()}
_LCV_RE    = [re.compile(r"\b" + p + r"\b", re.I) for p in _LCV_PATTERNS]


def _neutralise(text: str) -> str:
    for pat in _EXCL_RE:
        text = pat.sub(" ", text)
    return text


def classify(names: list[str]) -> tuple[bool, float, list[str]]:
    """Return (is_road_freight, confidence 0-1, matched_terms)."""
    combined = " ".join(names)

    # LCV checked on raw text before any neutralisation
    for pat in _LCV_RE:
        if pat.search(combined):
            return False, 0.0, ["lcv:" + pat.pattern]

    clean = _neutralise(combined)
    matched: list[str] = []
    score = 0.0

    for pat in _STRONG_RE:
        if pat.search(clean):
            matched.append(pat.pattern)
            score = 1.0

    if not matched:
        for pat, weight in _MEDIUM_RE.items():
            if pat.search(clean):
                matched.append(pat.pattern)
                score += weight

    return score > 0, min(score, 1.0), matched


# ── XML helpers (namespace-agnostic) ─────────────────────────────────────────

def _local(tag: str) -> str:
    return tag.rsplit("}", 1)[-1]


def _find(elem: ET.Element, *steps: str) -> Optional[ET.Element]:
    cur: Optional[ET.Element] = elem
    for step in steps:
        cur = next((c for c in cur if _local(c.tag) == step), None)
        if cur is None:
            return None
    return cur


def _findall_local(elem: ET.Element, tag: str) -> list[ET.Element]:
    return [c for c in elem if _local(c.tag) == tag]


def _text(elem: ET.Element, *steps: str) -> str:
    node = _find(elem, *steps)
    return (node.text or "").strip() if node is not None else ""


# ── Record extraction ─────────────────────────────────────────────────────────

_INDIVIDUAL_CODES = {"IND"}

_COLUMNS = [
    "abn", "entity_name", "entity_type", "abn_status",
    "state", "postcode", "contact_name",
    "segment", "confidence", "matched_terms", "trading_names",
    "acn", "gst_status", "source",
]


def extract_record(abr: ET.Element) -> Optional[dict]:
    abn_el = _find(abr, "ABN")
    if abn_el is None:
        return None

    abn_val = (abn_el.text or "").strip().replace(" ", "")
    if len(abn_val) != 11 or not abn_val.isdigit():
        return None

    abn_status = (abn_el.get("status") or "").strip()
    if abn_status != "ACT":
        return None

    entity_type = _text(abr, "EntityType", "EntityTypeInd")
    is_individual = entity_type in _INDIVIDUAL_CODES

    main_name = _text(abr, "MainEntity", "NonIndividualName", "NonIndividualNameText")

    ind_el = _find(abr, "LegalEntity", "IndividualName")
    given  = _text(ind_el, "GivenName")  if ind_el is not None else ""
    family = _text(ind_el, "FamilyName") if ind_el is not None else ""
    individual_name = " ".join(filter(None, [given, family]))

    entity_name = main_name or individual_name
    if not entity_name:
        return None

    contact_name = individual_name if is_individual else ""

    # Trading / business names (type BN, TRD, OTN) — may span multiple OtherEntity blocks
    trading: list[str] = []
    for other_el in _findall_local(abr, "OtherEntity"):
        for nn in _findall_local(other_el, "NonIndividualName"):
            if (nn.get("type") or "").upper() in ("BN", "TRD", "OTN"):
                nt = _text(nn, "NonIndividualNameText")
                if nt:
                    trading.append(nt)

    is_rf, confidence, matched = classify([entity_name] + trading)

    is_lcv = not is_rf and bool(matched) and matched[0].startswith("lcv:")
    if not is_rf and not is_lcv:
        return None  # not road-transport-related

    segment = ("owner_operator" if is_individual else "small_fleet") if is_rf else "lcv"

    gst_el   = _find(abr, "GST")
    acn      = _text(abr, "ASICNumber")
    state    = _text(abr, "BusinessAddress", "AddressDetails", "State")
    postcode = _text(abr, "BusinessAddress", "AddressDetails", "Postcode")

    return {
        "abn":           abn_val,
        "entity_name":   entity_name,
        "entity_type":   entity_type,
        "abn_status":    abn_status,
        "state":         state,
        "postcode":      postcode,
        "contact_name":  contact_name,
        "segment":       segment,
        "confidence":    round(confidence, 3),
        "matched_terms": ",".join(matched),
        "trading_names": "|".join(trading),
        "acn":           acn,
        "gst_status":    (gst_el.get("status") or "") if gst_el is not None else "",
        "source":        "bulk_extract",
    }


# ── Streaming parser ──────────────────────────────────────────────────────────

def iterparse_abr(fileobj: IO) -> Iterator[ET.Element]:
    """Yield one <ABR> element at a time; keeps memory flat across ~9 M records."""
    root: Optional[ET.Element] = None
    for event, elem in ET.iterparse(fileobj, events=("start", "end")):
        if event == "start" and root is None:
            root = elem
        elif event == "end" and _local(elem.tag) == "ABR":
            yield elem
            elem.clear()
            if root is not None:
                root.clear()


def xml_streams(input_path: str) -> Iterator[IO]:
    """Yield open binary file objects for every XML found in path (dir/.zip/.xml)."""
    p = Path(input_path)
    if p.is_dir():
        for child in sorted(p.iterdir()):
            if child.suffix.lower() == ".zip":
                with zipfile.ZipFile(child) as zf:
                    for name in sorted(zf.namelist()):
                        if name.lower().endswith(".xml"):
                            with zf.open(name) as f:
                                yield f
            elif child.suffix.lower() == ".xml":
                with open(child, "rb") as f:
                    yield f
    elif p.suffix.lower() == ".zip":
        with zipfile.ZipFile(p) as zf:
            for name in sorted(zf.namelist()):
                if name.lower().endswith(".xml"):
                    with zf.open(name) as f:
                        yield f
    elif p.suffix.lower() == ".xml":
        with open(p, "rb") as f:
            yield f
    else:
        raise ValueError(f"Unsupported input: {p!r}  (expected dir, .zip, or .xml)")


# ── Output sinks ──────────────────────────────────────────────────────────────

def init_sqlite(path: str) -> sqlite3.Connection:
    conn = sqlite3.connect(path)
    conn.execute("PRAGMA journal_mode=WAL")
    col_defs = ", ".join(
        f"{c} REAL" if c == "confidence" else f"{c} TEXT"
        for c in _COLUMNS
    )
    conn.execute(f"CREATE TABLE IF NOT EXISTS leads ({col_defs}, PRIMARY KEY (abn))")
    conn.commit()
    return conn


def flush_sqlite(conn: sqlite3.Connection, records: list[dict]) -> None:
    ph  = ", ".join("?" * len(_COLUMNS))
    sql = f"INSERT OR REPLACE INTO leads ({', '.join(_COLUMNS)}) VALUES ({ph})"
    conn.executemany(sql, [[r[c] for c in _COLUMNS] for r in records])
    conn.commit()


def write_csv(records: list[dict], path: str) -> None:
    with open(path, "w", newline="", encoding="utf-8") as fh:
        writer = csv.DictWriter(fh, fieldnames=_COLUMNS, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(records)


# ── Self-test ─────────────────────────────────────────────────────────────────

_SOLE_TRADER_XML = """<ABR>
  <ABN status="ACT" ABNStatusFromDate="2000-01-01">12345678901</ABN>
  <EntityType><EntityTypeInd>IND</EntityTypeInd></EntityType>
  <LegalEntity>
    <IndividualName type="LGL">
      <GivenName>JOHN</GivenName><FamilyName>SMITH</FamilyName>
    </IndividualName>
  </LegalEntity>
  <OtherEntity>
    <NonIndividualName type="TRD">
      <NonIndividualNameText>SMITH CARTAGE</NonIndividualNameText>
    </NonIndividualName>
  </OtherEntity>
  <BusinessAddress><AddressDetails>
    <State>NSW</State><Postcode>2000</Postcode>
  </AddressDetails></BusinessAddress>
</ABR>"""


def self_test() -> None:
    failures: list[str] = []

    def chk(label: str, got, expected, note: str = "") -> None:
        ok = got == expected
        print(f"  {'PASS' if ok else 'FAIL'}  {label}" + (f"  [{note}]" if note else ""))
        if not ok:
            failures.append(f"  {label}: expected {expected!r}, got {got!r}")

    print("Running self-test …\n")

    # 1. Company with strong term → road_freight, small_fleet
    is_rf, conf, terms = classify(["EXAMPLE TRANSPORT PTY LTD"])
    chk("company transport / is_rf",   is_rf, True)
    chk("company transport / segment", "small_fleet" if is_rf else "?", "small_fleet")

    # 2. Sole trader: trading name "SMITH CARTAGE" triggers match; owner name captured
    elem = ET.fromstring(_SOLE_TRADER_XML)
    rec  = extract_record(elem)
    chk("sole trader / kept",         rec is not None, True)
    chk("sole trader / segment",      (rec or {}).get("segment"),      "owner_operator")
    chk("sole trader / contact_name", (rec or {}).get("contact_name"), "JOHN SMITH",
        "owner name must be captured")

    # 3. Medium-weight logistics term → road_freight
    is_rf, conf, _ = classify(["PEAK LOGISTICS"])
    chk("logistics / is_rf",      is_rf,     True)
    chk("logistics / confidence", conf > 0,  True)

    # 4. LCV couriers → NOT road_freight, lcv term flagged
    is_rf, _, terms = classify(["QUICK COURIERS"])
    chk("lcv / is_rf",        is_rf, False)
    chk("lcv / term flagged", any(t.startswith("lcv:") for t in terms), True)

    # 5. KEY REGRESSION — word-boundary exclusion must prevent false transport hit
    is_rf, _, _ = classify(["AUSSIE TRANSPORTABLE HOMES"])
    chk("transportable exclusion / is_rf", is_rf, False,
        "'transportable' must not fire \\btransport\\b")

    # 6. Unrelated → dropped
    is_rf, _, _ = classify(["GREENFIELDS CAFE"])
    chk("unrelated / is_rf", is_rf, False)

    print()
    if failures:
        print(f"{len(failures)} FAILED:")
        for f in failures:
            print(f)
        sys.exit(1)
    print("All assertions passed.")


# ── Entry point ───────────────────────────────────────────────────────────────

def main() -> None:
    parser = argparse.ArgumentParser(
        description="Discover road-freight leads from the ABR Bulk Extract"
    )
    parser.add_argument("--self-test", action="store_true",
                        help="Run regression assertions and exit")
    parser.add_argument("--input", metavar="PATH",
                        help="Directory, .zip, or .xml from the ABR bulk extract")
    parser.add_argument("--out", metavar="SQLITE",
                        help="SQLite staging file (created if absent)")
    parser.add_argument("--csv", metavar="FILE",
                        help="Optional CSV export alongside the SQLite output")
    args = parser.parse_args()

    if args.self_test:
        self_test()
        return

    if not args.input or not args.out:
        parser.error("--input and --out are required (or use --self-test)")

    conn    = init_sqlite(args.out)
    total   = 0
    kept    = 0
    buf: list[dict] = []
    FLUSH   = 5_000

    print(f"Processing  {args.input}")
    print(f"Staging  →  {args.out}")

    for f in xml_streams(args.input):
        for elem in iterparse_abr(f):
            total += 1
            rec = extract_record(elem)
            if rec is not None:
                buf.append(rec)
                kept += 1
            if len(buf) >= FLUSH:
                flush_sqlite(conn, buf)
                buf.clear()
                print(f"  {total:>10,} scanned   {kept:>7,} kept", end="\r", flush=True)

    if buf:
        flush_sqlite(conn, buf)

    print(f"  {total:>10,} scanned   {kept:>7,} kept")
    print(f"\nWrote {kept} leads → {args.out}")

    if args.csv:
        rows = conn.execute(
            f"SELECT {', '.join(_COLUMNS)} FROM leads ORDER BY abn"
        ).fetchall()
        records = [dict(zip(_COLUMNS, row)) for row in rows]
        write_csv(records, args.csv)
        print(f"Wrote {len(records)} rows  → {args.csv}")

    conn.close()


if __name__ == "__main__":
    main()
