# TRTT Leads Pipeline

Discovers road-freight leads from the **ABR Bulk Extract** and loads them into
Supabase for NHVR Master Code of Practice course follow-up.

## File overview

| File | Purpose |
|------|---------|
| `001_trtt_leads_schema.sql` | Creates `trtt_leads` table, indexes, RLS, updated-at trigger |
| `002_add_segment_column.sql` | Adds `segment` column (owner_operator / small_fleet / lcv) |
| `abn_ingest.py` | Processes bulk extract → SQLite staging + CSV; **no API key needed** |
| `enrich_abn.py` | *Optional* — refreshes abn_status / acn / gst_status via ABR SearchByABN |
| `supabase_load.py` | Upserts CSV into Supabase `trtt_leads` table |
| `.env.example` | Environment variable template |

## Prerequisites

```
python 3.10+
pip install supabase python-dotenv   # supabase_load.py and enrich_abn.py only
```

Copy `.env.example` to `.env` (never commit it) and fill in Supabase credentials.
`ABR_GUID` is only needed for `enrich_abn.py`.

## Run order

### 1 — Apply migrations

Run both SQL files once against your Supabase project (SQL editor or MCP):

```
001_trtt_leads_schema.sql   ← creates the table
002_add_segment_column.sql  ← adds the segment column
```

### 2 — Download the bulk extract

Go to <https://data.gov.au/dataset/ds-dga-abn-bulk-extract> and download
the two weekly ZIP parts into a local directory, e.g. `./extract/`.

Do **not** commit them — they are multi-GB and covered by `.gitignore`.

### 3 — Process the extract

```bash
python abn_ingest.py \
  --input ./extract \
  --out   staging.sqlite \
  --csv   road_freight.csv
```

Progress is printed live (`scanned / kept`). Expect ~9 M records, a few
minutes depending on disk speed. Interrupted runs can be re-started —
`INSERT OR REPLACE` is idempotent.

Verify with the built-in regression suite first (stdlib only, no data needed):

```bash
python abn_ingest.py --self-test
```

### 4 — Load into Supabase

```bash
python supabase_load.py --csv road_freight.csv --dry-run   # validate first
python supabase_load.py --csv road_freight.csv
```

Duplicate ABNs are updated, not duplicated — safe to re-run.

### 5 — Optional: enrich metadata

After loading, refresh `abn_status` / `acn` / `gst_status` via the ABR API
(requires `ABR_GUID` in `.env`):

```bash
python enrich_abn.py --db staging.sqlite          # local SQLite
python enrich_abn.py --target supabase            # directly in Supabase
python enrich_abn.py --db staging.sqlite --limit 50  # test on first 50
```

Bulk-extract names are **not** overwritten — API trading names are stale
since 2012.

## Classification logic

`abn_ingest.py` classifies each entity against all its registered names
(main + trading):

| Category | Terms | Score |
|----------|-------|-------|
| Strong | transport, haulage, cartage, freight, trucking, road train, b-double, … | 1.0 (any hit) |
| Medium | logistics 0.6, haul 0.7, tanker 0.7, distribution 0.45, towing 0.55, removals 0.45 | cumulative |
| LCV | couriers, parcels, food delivery | flagged, **not** road_freight |
| Excluded | transportable, public transport, air/sea freight, bus, taxi, … | stripped before scan |

Word-boundary matching (`\bterm\b`) prevents substring false positives
(e.g. `transport` does not fire inside `transportable`).

## Segment values

| Value | Meaning |
|-------|---------|
| `owner_operator` | Individual / sole trader classified as road freight |
| `small_fleet` | Company, partnership, or trust classified as road freight |
| `lcv` | Light-commercial (courier/parcel) — in pipeline but not heavy vehicle |

## Lead lifecycle (`lead_stage`)

| Stage | Meaning |
|-------|---------|
| `prospect` | Imported from bulk extract, not yet contacted |
| `contacted` | Initial outreach sent |
| `qualified` | Confirmed CoR obligation / course interest |
| `converted` | Enrolled in course |
| `disqualified` | Wrong industry, ceased trading, etc. |
