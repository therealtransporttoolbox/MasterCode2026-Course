# TRTT Leads Pipeline

Pulls transport-industry leads from the **Australian Business Register (ABR)**
and loads them into Supabase for follow-up on the
**NHVR Master Code of Practice** online course.

## File overview

| File | Purpose |
|------|---------|
| `001_trtt_leads_schema.sql` | Creates the `trtt_leads` table, indexes, RLS policies, and updated-at trigger |
| `abn_ingest.py` | Queries the ABR API by ABN list or keyword, outputs `leads.csv` |
| `supabase_load.py` | Upserts `leads.csv` into the `trtt_leads` Supabase table |

## Prerequisites

```
python 3.10+
pip install requests supabase python-dotenv
```

Create a `.env` file (never commit it):

```env
ABR_GUID=your-abr-guid-here
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key
```

**ABR GUID** — register free at <https://abr.business.gov.au/Tools/WebServices>

## Step 1 — apply the schema

Run `001_trtt_leads_schema.sql` once against your Supabase project:

- **SQL Editor** in the Supabase dashboard, or
- `supabase db push` (local CLI), or
- Supabase MCP → `apply_migration`

## Step 2 — ingest ABN data

**Option A — known ABN list**

Create `abnlist.txt` with one ABN per line, then:

```bash
python abn_ingest.py --abn-file abnlist.txt --out leads.csv
```

**Option B — name search**

```bash
python abn_ingest.py --keyword "road freight" --state NSW --out leads.csv
python abn_ingest.py --keyword "heavy vehicle" --state VIC --limit 500 --out leads.csv
```

## Step 3 — load into Supabase

```bash
# Dry run — validates CSV without writing
python supabase_load.py --csv leads.csv --dry-run

# Live upsert
python supabase_load.py --csv leads.csv
```

Duplicate ABNs are **updated**, not duplicated — safe to re-run.

## Lead lifecycle

| Stage | Meaning |
|-------|---------|
| `prospect` | Imported from ABR, not yet contacted |
| `contacted` | Initial outreach sent |
| `qualified` | Confirmed interest / CoR obligation identified |
| `converted` | Enrolled in course |
| `disqualified` | Not applicable (wrong industry, ceased trading, etc.) |

Update `lead_stage` manually in the Supabase dashboard or via the app UI.

## Notes

- The ABR API returns public data only; contact details must be enriched separately.
- ABN lookups are rate-limited to ~3 req/s by default (`REQUEST_DELAY = 0.3 s`).
- RLS policies grant full access to the service role (scripts) and read/write to authenticated staff users.
