#!/usr/bin/env python3
"""
abn_ingest.py
-------------
Queries the Australian Business Register (ABR) web service for ABNs in the
road-transport industry, then writes a normalised CSV ready for supabase_load.py.

Requirements:
    pip install requests python-dotenv

Environment variables (or .env file):
    ABR_GUID          – your ABR web services GUID (register at abr.business.gov.au)

Usage:
    # Lookup a list of ABNs stored in a plain-text file (one per line):
    python abn_ingest.py --abn-file abnlist.txt --out leads.csv

    # Search by ANZSIC keyword (returns up to --limit results):
    python abn_ingest.py --keyword "road freight" --state NSW --out leads.csv
"""

from __future__ import annotations

import argparse
import csv
import os
import sys
import time
from dataclasses import dataclass, fields
from typing import Optional
from xml.etree import ElementTree as ET

import requests
from dotenv import load_dotenv

load_dotenv()

ABR_GUID: str = os.environ.get("ABR_GUID", "")
ABR_BASE = "https://abr.business.gov.au/abrxmlsearch/AbrXmlSearch.asmx"

# Seconds between API calls — ABR fair-use policy
REQUEST_DELAY = 0.3


@dataclass
class Lead:
    abn: str
    entity_name: str
    entity_type: str
    abn_status: str
    state: str
    postcode: str
    source: str = "abn_ingest"


def _text(el: Optional[ET.Element], tag: str, default: str = "") -> str:
    child = el.find(tag) if el is not None else None
    return (child.text or "").strip() if child is not None else default


def _ns(tag: str, ns: str = "http://abr.business.gov.au/ABRXMLSearch/") -> str:
    return f"{{{ns}}}{tag}"


def lookup_abn(abn: str, guid: str) -> Optional[Lead]:
    """Fetch a single ABN from the ABR and return a Lead, or None on failure."""
    params = {
        "searchString": abn.replace(" ", ""),
        "includeHistoricalDetails": "N",
        "authenticationGuid": guid,
    }
    try:
        r = requests.get(f"{ABR_BASE}/SearchByABNv202001", params=params, timeout=10)
        r.raise_for_status()
    except requests.RequestException as exc:
        print(f"  [warn] ABN {abn}: {exc}", file=sys.stderr)
        return None

    root = ET.fromstring(r.text)
    ns = "http://abr.business.gov.au/ABRXMLSearch/"
    response = root.find(f".//{{{ns}}}response")
    if response is None:
        return None

    exception = response.find(f"{{{ns}}}exception")
    if exception is not None:
        print(f"  [warn] ABN {abn}: {_text(exception, f'{{{ns}}}exceptionDescription')}", file=sys.stderr)
        return None

    business = response.find(f"{{{ns}}}businessEntity202001")
    if business is None:
        return None

    abn_node = business.find(f"{{{ns}}}ABN")
    abn_status = _text(abn_node, f"{{{ns}}}identifierStatus")
    abn_value = _text(abn_node, f"{{{ns}}}identifierValue")

    entity_type = _text(business.find(f"{{{ns}}}entityType"), f"{{{ns}}}entityTypeDescription")

    # Prefer trading name, fall back to legal name
    name = ""
    for name_tag in ("mainTradingName", "legalName", "otherEntity"):
        node = business.find(f"{{{ns}}}{name_tag}")
        if node is not None:
            candidate = _text(node, f"{{{ns}}}organisationName") or (
                " ".join(filter(None, [
                    _text(node, f"{{{ns}}}givenName"),
                    _text(node, f"{{{ns}}}otherGivenName"),
                    _text(node, f"{{{ns}}}familyName"),
                ]))
            )
            if candidate:
                name = candidate
                break

    # Main business address
    addr = business.find(f"{{{ns}}}mainBusinessPhysicalAddress202001")
    state = _text(addr, f"{{{ns}}}stateCode")
    postcode = _text(addr, f"{{{ns}}}postcode")

    return Lead(
        abn=abn_value,
        entity_name=name,
        entity_type=entity_type,
        abn_status=abn_status,
        state=state,
        postcode=postcode,
    )


def search_by_name(keyword: str, state: str, guid: str, limit: int = 200) -> list[Lead]:
    """Search ABR by business name and return up to *limit* leads."""
    params = {
        "name": keyword,
        "filters.stateCode": state,
        "filters.entityTypeCode": "",
        "filters.postcode": "",
        "filters.nameType.tradingName": "Y",
        "filters.nameType.legalName": "Y",
        "authenticationGuid": guid,
    }
    try:
        r = requests.get(f"{ABR_BASE}/SearchByNameAdvancedSimpleProtocol2017", params=params, timeout=15)
        r.raise_for_status()
    except requests.RequestException as exc:
        print(f"[error] Name search failed: {exc}", file=sys.stderr)
        return []

    root = ET.fromstring(r.text)
    ns = "http://abr.business.gov.au/ABRXMLSearch/"
    leads: list[Lead] = []

    for result in root.findall(f".//{{{ns}}}searchResultsList//{{{ns}}}searchResultsRecord"):
        abn_val = _text(result.find(f"{{{ns}}}ABN"), f"{{{ns}}}identifierValue")
        if not abn_val:
            continue
        lead = lookup_abn(abn_val, guid)
        if lead:
            leads.append(lead)
            if len(leads) >= limit:
                break
        time.sleep(REQUEST_DELAY)

    return leads


def write_csv(leads: list[Lead], path: str) -> None:
    field_names = [f.name for f in fields(Lead)]
    with open(path, "w", newline="", encoding="utf-8") as fh:
        writer = csv.DictWriter(fh, fieldnames=field_names)
        writer.writeheader()
        for lead in leads:
            writer.writerow({f.name: getattr(lead, f.name) for f in fields(Lead)})
    print(f"Wrote {len(leads)} leads → {path}")


def main() -> None:
    parser = argparse.ArgumentParser(description="Ingest transport ABN leads from the ABR")
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("--abn-file", metavar="FILE", help="Text file with one ABN per line")
    group.add_argument("--keyword", metavar="TERM", help="Business-name search keyword")
    parser.add_argument("--state", default="NSW", help="State filter for name search (default: NSW)")
    parser.add_argument("--limit", type=int, default=200, help="Max results for name search")
    parser.add_argument("--out", required=True, metavar="CSV", help="Output CSV file path")
    args = parser.parse_args()

    if not ABR_GUID:
        sys.exit("ERROR: ABR_GUID environment variable not set. "
                 "Register at https://abr.business.gov.au/Tools/WebServices")

    leads: list[Lead] = []

    if args.abn_file:
        with open(args.abn_file, encoding="utf-8") as fh:
            abns = [line.strip() for line in fh if line.strip()]
        print(f"Looking up {len(abns)} ABNs …")
        for abn in abns:
            lead = lookup_abn(abn, ABR_GUID)
            if lead:
                leads.append(lead)
                print(f"  {lead.abn}  {lead.entity_name}")
            time.sleep(REQUEST_DELAY)
    else:
        print(f"Searching ABR for '{args.keyword}' in {args.state} …")
        leads = search_by_name(args.keyword, args.state, ABR_GUID, limit=args.limit)

    write_csv(leads, args.out)


if __name__ == "__main__":
    main()
