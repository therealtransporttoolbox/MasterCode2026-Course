#!/usr/bin/env python3
"""
supabase_load.py
----------------
Reads the CSV produced by abn_ingest.py and upserts rows into the
trtt_leads table in Supabase.

Requirements:
    pip install supabase python-dotenv

Environment variables (or .env file):
    SUPABASE_URL         – project URL, e.g. https://xxxx.supabase.co
    SUPABASE_SERVICE_KEY – service-role key (bypasses RLS)

Usage:
    python supabase_load.py --csv leads.csv [--dry-run]
"""

from __future__ import annotations

import argparse
import csv
import os
import sys
from typing import Any

from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

SUPABASE_URL: str = os.environ.get("SUPABASE_URL", "")
SUPABASE_SERVICE_KEY: str = os.environ.get("SUPABASE_SERVICE_KEY", "")

TABLE = "trtt_leads"
UPSERT_ON_CONFLICT = "abn"  # unique column — duplicate ABNs are updated, not inserted

# Columns that map directly from CSV → table
CSV_COLUMNS = ["abn", "entity_name", "entity_type", "abn_status", "state", "postcode", "segment", "source"]


def read_csv(path: str) -> list[dict[str, Any]]:
    rows: list[dict[str, Any]] = []
    with open(path, newline="", encoding="utf-8") as fh:
        reader = csv.DictReader(fh)
        for row in reader:
            record = {col: row.get(col, "").strip() for col in CSV_COLUMNS}
            # Skip rows without a valid 11-digit ABN
            abn = record["abn"].replace(" ", "")
            if len(abn) != 11 or not abn.isdigit():
                print(f"  [skip] invalid ABN: {record['abn']!r}", file=sys.stderr)
                continue
            record["abn"] = abn
            record["lead_stage"] = "prospect"
            record["course_interest"] = True
            rows.append(record)
    return rows


def upsert_batch(client: Client, rows: list[dict[str, Any]], batch_size: int = 100) -> int:
    inserted = 0
    for i in range(0, len(rows), batch_size):
        batch = rows[i : i + batch_size]
        response = (
            client.table(TABLE)
            .upsert(batch, on_conflict=UPSERT_ON_CONFLICT)
            .execute()
        )
        if hasattr(response, "data") and response.data:
            inserted += len(response.data)
        else:
            # supabase-py v2 raises on error; log unexpected empty responses
            print(f"  [warn] batch {i // batch_size + 1}: empty response data", file=sys.stderr)
    return inserted


def main() -> None:
    parser = argparse.ArgumentParser(description="Load ABN leads CSV into Supabase trtt_leads table")
    parser.add_argument("--csv", required=True, metavar="FILE", help="Input CSV from abn_ingest.py")
    parser.add_argument("--dry-run", action="store_true", help="Parse and validate without writing")
    parser.add_argument("--batch-size", type=int, default=100, help="Rows per upsert call (default: 100)")
    args = parser.parse_args()

    if not args.dry_run:
        if not SUPABASE_URL or not SUPABASE_SERVICE_KEY:
            sys.exit(
                "ERROR: SUPABASE_URL and SUPABASE_SERVICE_KEY must be set.\n"
                "Copy .env.example to .env and fill in the values."
            )

    print(f"Reading {args.csv} …")
    rows = read_csv(args.csv)
    print(f"  {len(rows)} valid rows ready for upsert")

    if args.dry_run:
        print("[dry-run] skipping Supabase write. First 3 rows:")
        for row in rows[:3]:
            print(" ", row)
        return

    client: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)
    print(f"Upserting into {TABLE} …")
    inserted = upsert_batch(client, rows, batch_size=args.batch_size)
    print(f"Done — {inserted} rows upserted.")


if __name__ == "__main__":
    main()
