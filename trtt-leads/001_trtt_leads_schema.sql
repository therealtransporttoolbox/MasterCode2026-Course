-- TRTT Leads Schema
-- Tracks transport-industry prospects for the NHVR Master Code of Practice course.
-- Run against the target Supabase project via apply_migration or the SQL editor.

create extension if not exists "uuid-ossp";

-- ── Core leads table ──────────────────────────────────────────────────────────

create table if not exists trtt_leads (
  id               uuid        primary key default uuid_generate_v4(),

  -- ABN identity
  abn              char(11)    not null,
  entity_name      text        not null,
  entity_type      text,                        -- e.g. 'Individual/Sole Trader', 'Company'
  abn_status       text        default 'Active', -- Active | Cancelled

  -- Location
  state            char(3),                     -- NSW, VIC, QLD, …
  postcode         char(4),

  -- Contact details (populated manually or via enrichment)
  contact_name     text,
  email            text,
  phone            text,

  -- Lead lifecycle
  lead_stage       text        not null default 'prospect',
  -- prospect | contacted | qualified | converted | disqualified

  course_interest  boolean     not null default true,
  source           text        not null default 'abn_ingest',
  notes            text,

  -- Audit
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),

  constraint trtt_leads_abn_unique unique (abn),
  constraint trtt_leads_stage_check check (
    lead_stage in ('prospect','contacted','qualified','converted','disqualified')
  )
);

-- ── Updated-at trigger ────────────────────────────────────────────────────────

create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trtt_leads_updated_at on trtt_leads;
create trigger trtt_leads_updated_at
  before update on trtt_leads
  for each row execute function set_updated_at();

-- ── Indexes ───────────────────────────────────────────────────────────────────

create index if not exists trtt_leads_state_idx       on trtt_leads (state);
create index if not exists trtt_leads_lead_stage_idx  on trtt_leads (lead_stage);
create index if not exists trtt_leads_created_at_idx  on trtt_leads (created_at desc);

-- ── Row-level security ────────────────────────────────────────────────────────

alter table trtt_leads enable row level security;

-- Service-role bypass (used by backend / ingest scripts)
create policy "service role full access"
  on trtt_leads
  using (auth.role() = 'service_role');

-- Authenticated staff read/write
create policy "authenticated read"
  on trtt_leads for select
  using (auth.role() = 'authenticated');

create policy "authenticated write"
  on trtt_leads for insert
  with check (auth.role() = 'authenticated');

create policy "authenticated update"
  on trtt_leads for update
  using (auth.role() = 'authenticated');
