-- Phase 17 — V2 schema additions
-- All tenant tables include company_id and are RLS-scoped (see phase17-rls.sql).

create type risk_level as enum ('low','moderate','high','critical');
create type risk_kind as enum (
  'delivery_delay','pickup_delay','gps_stale','route_deviation',
  'driver_unavailable','customer_priority','delivery_window','pod_missing',
  'load_reassignment','billing','integration_failure','edi_failure','webhook_failure'
);
create type approval_status as enum ('pending','approved','rejected','expired');
create type approval_action as enum (
  'reassign_active_load','cancel_load','notify_customer_major_delay',
  'override_cdl_warning','trigger_billing_action','send_mass_notification',
  'mark_shipment_completed','disable_driver_tracking','change_subscription_plan',
  'modify_customer_portal_access'
);
create type edi_doc_type as enum ('204','990','214','210','997');
create type edi_status as enum ('received','parsed','accepted','rejected','sent','ack','error');
create type api_scope as enum (
  'loads.read','loads.write','shipments.read','shipments.write',
  'tracking.read','pod.read','customers.read','webhooks.manage','reports.read'
);

create table predictive_risks (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  subject_type text not null,           -- load | shipment | driver | customer | integration
  subject_id uuid not null,
  kind risk_kind not null,
  level risk_level not null,
  score int not null check (score between 0 and 100),
  explanation text,
  recommended_action text,
  created_at timestamptz not null default now()
);

create table risk_score_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  risk_id uuid references predictive_risks(id) on delete cascade,
  delta int not null,
  reason text,
  occurred_at timestamptz not null default now()
);

create table ai_recommendations (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  kind text not null,                    -- driver_assignment | customer_update | reassignment | ...
  subject_id uuid,
  payload jsonb not null,
  confidence int check (confidence between 0 and 100),
  status text not null default 'open',   -- open | accepted | rejected | expired
  created_at timestamptz not null default now()
);

create table ai_recommendation_actions (
  id uuid primary key default gen_random_uuid(),
  recommendation_id uuid references ai_recommendations(id) on delete cascade,
  actor_id uuid,
  action text not null,
  occurred_at timestamptz not null default now()
);

create table ai_approval_requests (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  action approval_action not null,
  subject_id uuid,
  preview jsonb not null,
  requested_by uuid,                     -- null = system
  status approval_status not null default 'pending',
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

create table ai_approval_history (
  id uuid primary key default gen_random_uuid(),
  request_id uuid references ai_approval_requests(id) on delete cascade,
  reviewer_id uuid not null,
  decision approval_status not null,
  reason text,
  decided_at timestamptz not null default now()
);

create table optimization_runs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  load_id uuid,
  goal text,
  candidate_count int,
  best_score int,
  ran_at timestamptz not null default now()
);

create table driver_match_scores (
  id uuid primary key default gen_random_uuid(),
  run_id uuid references optimization_runs(id) on delete cascade,
  driver_id uuid not null,
  score int not null,
  vehicle_match int, cdl_match int, distance_mi numeric, eta_min int,
  availability int, on_time int, gps_fresh boolean,
  explanation text
);

create table customer_impact_scores (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  customer_id uuid not null,
  score int not null,
  at_risk_count int default 0,
  needs_update boolean default false,
  computed_at timestamptz not null default now()
);

create table customer_update_drafts (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  customer_id uuid not null,
  shipment_id uuid,
  draft text not null,
  status text not null default 'pending', -- pending | approved | sent | rejected
  created_at timestamptz not null default now()
);

create table executive_summaries (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  period text not null,                  -- daily | weekly
  summary jsonb not null,
  generated_at timestamptz not null default now()
);

create table advanced_report_runs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  report_key text not null,
  params jsonb,
  status text not null default 'queued',
  result_url text,
  ran_at timestamptz not null default now()
);

create table saved_reports (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  owner_id uuid not null,
  name text not null,
  report_key text not null,
  filters jsonb,
  schedule text,                         -- placeholder for V2.5
  created_at timestamptz not null default now()
);

create table edi_trading_partners (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  partner_name text not null,
  isa_qualifier text, isa_id text,
  enabled boolean default true,
  created_at timestamptz not null default now()
);

create table edi_transactions (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  partner_id uuid references edi_trading_partners(id) on delete set null,
  doc_type edi_doc_type not null,
  direction text not null,               -- in | out
  status edi_status not null default 'received',
  raw text,
  parsed jsonb,
  error text,
  received_at timestamptz not null default now()
);

create table edi_acknowledgments (
  id uuid primary key default gen_random_uuid(),
  transaction_id uuid references edi_transactions(id) on delete cascade,
  ack_type edi_doc_type not null,        -- typically 997 or 990
  status text,
  sent_at timestamptz not null default now()
);

create table edi_mapping_rules (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  partner_id uuid references edi_trading_partners(id) on delete cascade,
  doc_type edi_doc_type not null,
  rules jsonb not null
);

create table api_keys (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  name text not null,
  key_prefix text not null,              -- first 8 chars only, displayed
  key_hash text not null,                -- hashed (never plaintext)
  created_by uuid not null,
  last_used_at timestamptz,
  revoked_at timestamptz,
  created_at timestamptz not null default now()
);

create table api_key_scopes (
  id uuid primary key default gen_random_uuid(),
  api_key_id uuid references api_keys(id) on delete cascade,
  scope api_scope not null,
  unique (api_key_id, scope)
);

create table api_request_logs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  api_key_id uuid references api_keys(id) on delete set null,
  method text not null, path text not null,
  status int, latency_ms int,
  ip text,
  occurred_at timestamptz not null default now()
);

create table webhook_event_subscriptions (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  endpoint_url text not null,
  events text[] not null,
  secret_hash text not null,
  enabled boolean default true,
  created_at timestamptz not null default now()
);

create table integration_health_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid,                       -- null = platform-level
  provider text not null,
  status text not null,                  -- ok | degraded | down
  detail text,
  occurred_at timestamptz not null default now()
);

create table enterprise_control_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  actor_id uuid,
  control text not null,
  before jsonb, after jsonb,
  occurred_at timestamptz not null default now()
);

create table support_access_audit_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  support_user_id uuid not null,
  reason text not null,
  scope text,
  started_at timestamptz not null default now(),
  ended_at timestamptz
);

create table feature_flag_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  flag text not null,
  enabled boolean not null,
  changed_by uuid,
  changed_at timestamptz not null default now()
);
