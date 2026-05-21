-- Phase 25 / V6 schema additions (illustrative, not yet applied).
-- Tenant-owned tables include company_id. Platform-level records
-- (leadership, board, investor, category) may be platform-scoped.

create table if not exists public.v6_category_leadership_scores (
  id uuid primary key default gen_random_uuid(),
  company_id uuid null,
  captured_at timestamptz not null default now(),
  overall int not null,
  product int, marketplace int, ai_ops int, customer_ecosystem int,
  partner_ecosystem int, revenue int, security int, compliance int,
  data int, reliability int, defensibility int, moats int,
  investor_ready int, board_ready int, operating_model int
);

create table if not exists public.v6_platform_maturity_metrics (
  id uuid primary key default gen_random_uuid(),
  captured_at timestamptz not null default now(),
  pillar text not null, score int not null
);

create table if not exists public.intelligent_network_metrics (
  id uuid primary key default gen_random_uuid(),
  captured_at timestamptz not null default now(),
  companies int, drivers int, carriers int, customers int,
  loads_active int, shipments_30d int, regions int, integrations int,
  gps_events_24h bigint, nav_sessions_24h int, marketplace_loads_7d int,
  api_requests_24h bigint, edi_tx_24h int, webhook_deliveries_24h int,
  portal_active_24h int, copilot_recs_24h int, automation_approvals_24h int,
  support_incidents_24h int, revenue_events_24h int
);

create table if not exists public.network_operating_metrics (
  id uuid primary key default gen_random_uuid(),
  region text not null, captured_at timestamptz not null default now(),
  health int, carrier_cov int, demand int, driver_density int,
  equip int, liquidity int, lane_rel int, support text, revenue_idx numeric
);

create table if not exists public.automation_governance_policies (
  id uuid primary key default gen_random_uuid(),
  company_id uuid null,
  action text not null, level text not null, approval_role text,
  min_confidence numeric, audit_required bool default true,
  rollback_required bool default true, updated_at timestamptz default now()
);

create table if not exists public.automation_control_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  policy_id uuid references public.automation_governance_policies(id),
  kind text, outcome text, override bool, created_at timestamptz default now()
);

create table if not exists public.automation_outcomes_v6 (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  window_start timestamptz, window_end timestamptz,
  approved int, rejected int, success_rate numeric, failure_rate numeric, override_rate numeric
);

create table if not exists public.ai_governance_maturity_v6 (
  id uuid primary key default gen_random_uuid(),
  company_id uuid null, captured_at timestamptz not null default now(),
  recs_generated int, recs_accepted int, recs_rejected int,
  confidence_threshold numeric, actions_approved int, actions_denied int,
  drafts int, exec_summaries int, risk_explanations int,
  data_freshness_pct int, cost_usd numeric, safety_incidents int,
  bias_reviews_due int, explainability_coverage int
);

create table if not exists public.marketplace_liquidity_intelligence (
  id uuid primary key default gen_random_uuid(),
  captured_at timestamptz not null default now(),
  score int, coverage int, bids_per_load numeric,
  time_to_first_bid_min int, time_to_award_min int,
  uncovered_rate int, acceptance int, falloff int,
  trust_score int, revenue_quality int
);

create table if not exists public.platform_economics_metrics (
  id uuid primary key default gen_random_uuid(),
  captured_at timestamptz not null default now(),
  product_line text, arr_usd_m numeric, segment text, region text,
  gross_margin_pct numeric, nrr_pct numeric, grr_pct numeric,
  cac_usd numeric, ltv_usd numeric
);

create table if not exists public.enterprise_ecosystem_scale_metrics (
  id uuid primary key default gen_random_uuid(),
  captured_at timestamptz not null default now(),
  companies int, enterprise_accts int, dispatchers int, drivers int,
  vehicles int, carriers int, customers int,
  partner_integrations int, api_partners int, edi_partners int,
  telematics_partners int, marketplace_partners int, strategic_partners int
);

create table if not exists public.exit_ipo_readiness_items (
  id uuid primary key default gen_random_uuid(),
  area text not null, score int, status text,
  is_placeholder bool default false, updated_at timestamptz default now()
);

create table if not exists public.investor_data_room_sections (
  id uuid primary key default gen_random_uuid(),
  section text not null, status text not null,
  owner text, updated_at timestamptz default now()
);

create table if not exists public.due_diligence_requests_v6 (
  id uuid primary key default gen_random_uuid(),
  party text not null, topic text not null, status text not null,
  due_at date, created_at timestamptz default now()
);

create table if not exists public.board_governance_meetings (
  id uuid primary key default gen_random_uuid(),
  meeting_date date not null, title text not null, status text not null
);
create table if not exists public.board_decisions (
  id uuid primary key default gen_random_uuid(),
  meeting_id uuid references public.board_governance_meetings(id),
  topic text, owner text, status text
);
create table if not exists public.board_action_items (
  id uuid primary key default gen_random_uuid(),
  meeting_id uuid references public.board_governance_meetings(id),
  action text, owner text, due_at date, status text
);

create table if not exists public.strategic_risk_portfolio_items (
  id uuid primary key default gen_random_uuid(),
  category text not null, description text, severity text,
  owner text, mitigation text, updated_at timestamptz default now()
);

create table if not exists public.roadmap_investment_items (
  id uuid primary key default gen_random_uuid(),
  category text not null, horizon text not null,
  invest_usd_m numeric, value_tier text, status text
);
create table if not exists public.roadmap_board_approvals (
  id uuid primary key default gen_random_uuid(),
  item_id uuid references public.roadmap_investment_items(id),
  board_period text, status text
);

create table if not exists public.platform_reliability_maturity (
  id uuid primary key default gen_random_uuid(),
  captured_at timestamptz not null default now(),
  uptime_pct numeric, api_latency_p95_ms int, rt_latency_p95_ms int,
  gps_reliability_pct numeric, route_provider_reliability_pct numeric,
  notification_delivery_pct numeric, webhook_delivery_pct numeric,
  edi_reliability_pct numeric, billing_provider_pct numeric,
  mobile_crash_free_pct numeric, support_rate numeric,
  critical_incidents_30d int, error_budget_pct numeric
);
create table if not exists public.incident_postmortems (
  id uuid primary key default gen_random_uuid(),
  occurred_on date, title text, severity text, status text, body text
);

create table if not exists public.certification_evidence_completion (
  id uuid primary key default gen_random_uuid(),
  control text not null, owner text, status text,
  evidence_url text, last_refreshed timestamptz
);

create table if not exists public.security_operating_model_metrics (
  id uuid primary key default gen_random_uuid(),
  function text not null, owner text, score int,
  updated_at timestamptz default now()
);

create table if not exists public.revenue_quality_metrics (
  id uuid primary key default gen_random_uuid(),
  captured_at timestamptz not null default now(),
  score int, recurring_pct numeric, usage_pct numeric,
  marketplace_quality int, api_quality int,
  concentration_pct numeric, retention_pct numeric, expansion_pct numeric,
  churn_risk_pct numeric, gross_margin_pct numeric, payment_health_pct numeric,
  billing_disputes int, predictability_score int
);

create table if not exists public.customer_partner_ecosystem_maturity (
  id uuid primary key default gen_random_uuid(),
  area text not null, score int, updated_at timestamptz default now()
);

create table if not exists public.product_defensibility_maturity (
  id uuid primary key default gen_random_uuid(),
  factor text not null, score int, updated_at timestamptz default now()
);

create table if not exists public.category_narrative_assets (
  id uuid primary key default gen_random_uuid(),
  asset text not null, status text, updated_at timestamptz default now()
);
create table if not exists public.market_education_assets (
  id uuid primary key default gen_random_uuid(),
  asset text not null, audience text, status text
);

create table if not exists public.v6_report_runs (
  id uuid primary key default gen_random_uuid(),
  report text not null, run_at timestamptz default now(),
  generated_by uuid, payload jsonb
);
