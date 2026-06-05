-- Add operator-segment classification to trtt_leads.
-- Separated from lead_stage (funnel status) to avoid overloading that column.
-- Values: owner_operator | small_fleet | lcv
-- NULL = imported before segmentation was added (re-run abn_ingest to populate).

alter table trtt_leads
  add column if not exists segment text;
