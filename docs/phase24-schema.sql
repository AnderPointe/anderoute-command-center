-- Phase 24 — V5.5 schema additions (illustrative, not auto-applied).
-- All tenant-owned tables include company_id. Platform-scope tables omit it intentionally.

create table if not exists public.v55_leadership_scores (
  id uuid primary key default gen_random_uuid(),
  pillar text not null, score int not null check (score between 0 and 100),
  captured_at timestamptz not null default now()
);

create table if not exists public.market_leadership_metrics (
  id uuid primary key default gen_random_uuid(),
  metric text not null, value numeric, captured_at timestamptz default now()
);

create table if not exists public.platform_defensibility_metrics (
  id uuid primary key default gen_random_uuid(),
  pillar text not null, score int not null, captured_at timestamptz default now()
);

create table if not exists public.strategic_moats (
  id uuid primary key default gen_random_uuid(),
  name text not null, strength int not null, owner text,
  weakness text, investment text, risk text, timeline text, value text
);

create table if not exists public.moat_evidence_items (
  id uuid primary key default gen_random_uuid(),
  moat_id uuid references public.strategic_moats(id) on delete cascade,
  evidence text not null, captured_at timestamptz default now()
);

create table if not exists public.ecosystem_monetization_metrics (
  id uuid primary key default gen_random_uuid(),
  line text not null, arr numeric, growth text, maturity text,
  captured_at timestamptz default now()
);

create table if not exists public.marketplace_economics_metrics (
  id uuid primary key default gen_random_uuid(),
  company_id uuid, metric text not null, value numeric, window text,
  captured_at timestamptz default now()
);

create table if not exists public.national_partnerships (
  id uuid primary key default gen_random_uuid(),
  name text not null, category text, status text, sponsor text,
  joint_value text, milestone text, updated_at timestamptz default now()
);

create table if not exists public.partnership_execution_items (
  id uuid primary key default gen_random_uuid(),
  partnership_id uuid references public.national_partnerships(id) on delete cascade,
  step text, status text, owner text, due_at timestamptz
);

create table if not exists public.partner_ecosystem_scale_metrics (
  id uuid primary key default gen_random_uuid(),
  metric text not null, value numeric, captured_at timestamptz default now()
);

create table if not exists public.enterprise_operating_functions (
  id uuid primary key default gen_random_uuid(),
  fn text not null, owner text, kpis text, cadence text, risks text
);

create table if not exists public.operating_cadences (
  id uuid primary key default gen_random_uuid(),
  cadence text not null, owner text, audience text, duration text
);

create table if not exists public.executive_decisions (
  id uuid primary key default gen_random_uuid(),
  decided_at date, topic text, decision text, owner text
);

create table if not exists public.board_reports_v55 (
  id uuid primary key default gen_random_uuid(),
  period text, exec_summary text, payload jsonb, created_at timestamptz default now()
);

create table if not exists public.investor_updates (
  id uuid primary key default gen_random_uuid(),
  period text, payload jsonb, created_at timestamptz default now()
);

create table if not exists public.product_line_maturity_scores (
  id uuid primary key default gen_random_uuid(),
  product text not null, adoption int, revenue_pct int,
  support text, roadmap text, competitive text, captured_at timestamptz default now()
);

create table if not exists public.customer_retention_scores (
  id uuid primary key default gen_random_uuid(),
  company_id uuid, account text, health int, adoption int, risk text,
  renewal_date date, sponsor_status text, captured_at timestamptz default now()
);

create table if not exists public.expansion_opportunities (
  id uuid primary key default gen_random_uuid(),
  company_id uuid, account text, opportunity text, arr_uplift numeric,
  captured_at timestamptz default now()
);

create table if not exists public.enterprise_account_plans (
  id uuid primary key default gen_random_uuid(),
  company_id uuid, account text, profile text, products text[], goals text,
  pains text, sponsor text, renewal_date date, risks text
);

create table if not exists public.account_stakeholders (
  id uuid primary key default gen_random_uuid(),
  plan_id uuid references public.enterprise_account_plans(id) on delete cascade,
  name text, role text, engagement text
);

create table if not exists public.category_narratives (
  id uuid primary key default gen_random_uuid(),
  category text, problem text, why_now text, old_way text, new_way text,
  pov text, updated_at timestamptz default now()
);

create table if not exists public.proof_points (
  id uuid primary key default gen_random_uuid(),
  narrative_id uuid references public.category_narratives(id) on delete cascade,
  kind text, text text
);

create table if not exists public.competitive_differentiators (
  id uuid primary key default gen_random_uuid(),
  competitor text, segment text, differentiation text, risk text
);

create table if not exists public.win_loss_analysis_items (
  id uuid primary key default gen_random_uuid(),
  company_id uuid, account text, outcome text, reason text, captured_at timestamptz default now()
);

create table if not exists public.certification_evidence_maturity (
  id uuid primary key default gen_random_uuid(),
  control text, owner text, freshness_pct int, status text, captured_at timestamptz default now()
);

create table if not exists public.security_compliance_executive_metrics (
  id uuid primary key default gen_random_uuid(),
  area text, status text, note text, captured_at timestamptz default now()
);

create table if not exists public.strategic_risks (
  id uuid primary key default gen_random_uuid(),
  category text, description text, severity text, owner text, mitigation text
);

create table if not exists public.risk_mitigation_plans (
  id uuid primary key default gen_random_uuid(),
  risk_id uuid references public.strategic_risks(id) on delete cascade,
  step text, owner text, due_at timestamptz, status text
);

create table if not exists public.long_term_roadmap_items (
  id uuid primary key default gen_random_uuid(),
  horizon text, category text, item text, owner text
);

create table if not exists public.roadmap_decision_logs (
  id uuid primary key default gen_random_uuid(),
  decided_at date, item text, decided_by text
);

create table if not exists public.advanced_data_room_items (
  id uuid primary key default gen_random_uuid(),
  section text, status text, owner text, updated_at timestamptz default now()
);

create table if not exists public.due_diligence_requests_v55 (
  id uuid primary key default gen_random_uuid(),
  requester text, topic text, status text, created_at timestamptz default now()
);

create table if not exists public.platform_reliability_metrics_v55 (
  id uuid primary key default gen_random_uuid(),
  metric text, value numeric, captured_at timestamptz default now()
);

create table if not exists public.v55_report_runs (
  id uuid primary key default gen_random_uuid(),
  report text, requested_by uuid, payload jsonb, created_at timestamptz default now()
);
