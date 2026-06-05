#!/usr/bin/env python3
"""
enrich_abn.py
-------------
Validates and refreshes metadata for ABNs ALREADY staged in SQLite (or
loaded into Supabase) via the ABR web service SearchByABN endpoint.
Never used for discovery — discovery is done via the bulk extract.

Bulk-extract names are preferred and are NOT overwritten by this script;
API trading names have not been updated since 2012.  Fields refreshed:
abn_status, acn, gst_status.

Requirements:
    pip install requests python-dotenv

Environment variables (or .env file):
    ABR_GUID              – ABR web services GUID (required)
    SUPABASE_URL          – only needed with --target supabase
    SUPABASE_SERVICE_KEY  – only needed with --target supabase

Usage:
    # Enrich records in local staging SQLite
    python enrich_abn.py --db staging.sqlite

    # Enrich records already in Supabase (reads ABNs, calls API, writes back)
    python enrich_abn.py --target supabase
"""

from __future__ import annotations

import argparse
import os
import sqlite3
import sys
import time
from typing import Optional
from xml.etree import ElementTree as ET

import requests
from dotenv import load_dotenv

load_dotenv()

ABR_GUID: str = os.environ.get("ABR_GUID", "")
ABR_URL = "https://abr.business.gov.au/abrxmlsearch/AbrXmlSearch.asmx/SearchByABNv202001"
REQUEST_DELAY = 0.35  # seconds — ABR fair-use


def _text(el: Optional[ET.Element], *path: str) -> str:
    cur = el
    for tag in path:
        if cur is None:
            return ""
        cur = next((c for c in cur if c.tag.rsplit("}", 1)[-1] == tag), None)
    return (cur.text or "").strip() if cur is not None else ""


def lookup_abn(abn: str) -> Optional[dict]:
    """Call ABR SearchByABN and return refreshable fields, or None on failure."""
    try:
        r = requests.get(
            ABR_URL,
            params={
                "searchString": abn,
                "includeHistoricalDetails": "N",
                "authenticationGuid": ABR_GUID,
            },
            timeout=10,
        )
        r.raise_for_status()
    except requests.RequestException as exc:
        print(f"  [warn] {abn}: {exc}", file=sys.stderr)
        return None

    root = ET.fromstring(r.text)
    ns = "http://abr.business.gov.au/ABRXMLSearch/"

    def fnd(*path):
        cur = root
        for tag in path:
            cur = cur.find(f"{{{ns}}}{tag}")
            if cur is None:
                return None
        return cur

    biz = fnd("response", "businessEntity202001")
    if biz is None:
        exc_desc = _text(fnd("response", "exception"), "exceptionDescription")
        if exc_desc:
            print(f"  [warn] {abn}: {exc_desc}", file=sys.stderr)
        return None

    abn_el     = biz.find(f"{{{ns}}}ABN")
    gst_el     = biz.find(f"{{{ns}}}GST")
    asic_el    = biz.find(f"{{{ns}}}ASICNumber")

    return {
        "abn_status": (abn_el.get("status") or "").strip()      if abn_el  is not None else "",
        "acn":        (asic_el.text or "").strip()               if asic_el is not None else "",
        "gst_status": (gst_el.get("status") or "").strip()       if gst_el  is not None else "",
    }


# ── SQLite target ─────────────────────────────────────────────────────────────

def enrich_sqlite(db_path: str, limit: Optional[int]) -> None:
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row

    sql = "SELECT abn FROM leads ORDER BY abn"
    if limit:
        sql += f" LIMIT {limit}"
    abns = [row["abn"] for row in conn.execute(sql)]

    print(f"Enriching {len(abns)} ABNs in {db_path} …")
    updated = 0

    for abn in abns:
        data = lookup_abn(abn)
        if data:
            conn.execute(
                "UPDATE leads SET abn_status=?, acn=?, gst_status=? WHERE abn=?",
                (data["abn_status"], data["acn"], data["gst_status"], abn),
            )
            updated += 1
            print(f"  {abn}  status={data['abn_status']}  gst={data['gst_status']}")
        time.sleep(REQUEST_DELAY)

    conn.commit()
    conn.close()
    print(f"\nUpdated {updated}/{len(abns)} records.")


# ── Supabase target ───────────────────────────────────────────────────────────

def enrich_supabase(limit: Optional[int]) -> None:
    supabase_url = os.environ.get("SUPABASE_URL", "")
    service_key  = os.environ.get("SUPABASE_SERVICE_KEY", "")
    if not supabase_url or not service_key:
        sys.exit("ERROR: SUPABASE_URL and SUPABASE_SERVICE_KEY required for --target supabase")

    try:
        from supabase import create_client
    except ImportError:
        sys.exit("ERROR: pip install supabase")

    client = create_client(supabase_url, service_key)
    q = client.table("trtt_leads").select("abn").order("abn")
    if limit:
        q = q.limit(limit)
    rows = q.execute().data or []
    abns = [r["abn"] for r in rows]

    print(f"Enriching {len(abns)} ABNs in Supabase …")
    updated = 0

    for abn in abns:
        data = lookup_abn(abn)
        if data:
            client.table("trtt_leads").update(data).eq("abn", abn).execute()
            updated += 1
            print(f"  {abn}  status={data['abn_status']}  gst={data['gst_status']}")
        time.sleep(REQUEST_DELAY)

    print(f"\nUpdated {updated}/{len(abns)} records.")


# ── Entry point ───────────────────────────────────────────────────────────────

def main() -> None:
    parser = argparse.ArgumentParser(
        description="Enrich staged leads via ABR SearchByABN (validation only, not discovery)"
    )
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("--db",     metavar="SQLITE", help="Local staging SQLite from abn_ingest.py")
    group.add_argument("--target", choices=["supabase"], help="Enrich records in Supabase")
    parser.add_argument("--limit", type=int, metavar="N",
                        help="Process only the first N ABNs (useful for testing)")
    args = parser.parse_args()

    if not ABR_GUID:
        sys.exit(
            "ERROR: ABR_GUID not set.\n"
            "Register at https://abr.business.gov.au/Tools/WebServices\n"
            "Then add ABR_GUID=your-guid to .env"
        )

    if args.db:
        enrich_sqlite(args.db, args.limit)
    else:
        enrich_supabase(args.limit)


if __name__ == "__main__":
    main()
