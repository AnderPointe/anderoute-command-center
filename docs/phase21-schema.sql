-- Phase 21 schema additions (V4 enterprise launch)
-- All tenant-owned tables include company_id. Platform-level records may be platform-scoped.

create table if not exists public.v4_launch_milestones (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  title text not null,
  owner text,
  due date,
  status text not null default 'planned',
  created_at timestamptz default now()
);

create table if not exists public.v4_launch_blockers (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  area text, title text not null, severity text, owner text,
  resolved_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists public.v4_launch_risks (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  title text not null, likelihood text, impact text, mitigation text,
  created_at timestamptz default now()
);

create table if not exists public.strategic_integrations (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  name text not null, partner_type text, business_value text, customer_demand text,
  complexity text, security_review_status text, api_docs_status text,
  test_status text, launch_status text, owner text, target_release date,
  revenue_impact numeric,
  created_at timestamptz default now()
);

create table if not exists public.strategic_integration_launches (
  id uuid primary key default gen_random_uuid(),
  integration_id uuid references public.strategic_integrations(id) on delete cascade,
  milestone text, status text, due date
);

create table if not exists public.strategic_partners (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  name text not null, partner_type text, stage text, owner text,
  created_at timestamptz default now()
);

create table if not exists public.partner_launch_plans (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid references public.strategic_partners(id) on delete cascade,
  milestone text, status text, due date
);

create table if not exists public.carrier_lane_coverage (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  region text, equipment_type text, density int, gap boolean default false
);

create table if not exists public.carrier_capacity_snapshots (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  region text, equipment_type text, available_carriers int, snapshot_at timestamptz default now()
);

create table if not exists public.carrier_marketplace_awards (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  load_id uuid, carrier_id uuid, rate numeric, awarded_at timestamptz default now()
);

create table if not exists public.carrier_disputes (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  load_id uuid, carrier_id uuid, reason text, status text default 'open',
  opened_at timestamptz default now(), resolved_at timestamptz
);

create table if not exists public.regions (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  name text not null, tz text, created_at timestamptz default now()
);

create table if not exists public.dispatch_zones (
  id uuid primary key default gen_random_uuid(),
  region_id uuid references public.regions(id) on delete cascade,
  name text, polygon jsonb
);

create table if not exists public.regional_operations_metrics (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  region_id uuid references public.regions(id) on delete cascade,
  loads int, util_drv numeric, util_veh numeric, carrier_cov numeric,
  support_load int, revenue numeric, captured_at timestamptz default now()
);

create table if not exists public.large_fleet_performance_metrics (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  metric text, value numeric, captured_at timestamptz default now()
);

create table if not exists public.enterprise_onboarding_templates (
  id uuid primary key default gen_random_uuid(),
  name text, steps jsonb
);

create table if not exists public.enterprise_implementation_plans (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  customer_id uuid, template_id uuid references public.enterprise_onboarding_templates(id),
  stage text, owner text, created_at timestamptz default now()
);

create table if not exists public.enterprise_customer_lifecycle (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  customer_id uuid, stage text, owner text, renewal_date date,
  expansion_opp text, risk_reason text
);

create table if not exists public.enterprise_health_scores (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  customer_id uuid, score int, captured_at timestamptz default now()
);

create table if not exists public.compliance_operations_tasks (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  area text, due date, status text default 'planned', owner text
);

create table if not exists public.compliance_exceptions (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  area text, description text, expires date, status text default 'review'
);

create table if not exists public.mobile_certification_tasks (
  id uuid primary key default gen_random_uuid(),
  area text, progress int default 0, notes text
);

create table if not exists public.android_auto_execution_items (
  id uuid primary key default gen_random_uuid(),
  item text not null, status text
);

create table if not exists public.carplay_execution_items (
  id uuid primary key default gen_random_uuid(),
  item text not null, status text
);

create table if not exists public.enterprise_support_tiers (
  id uuid primary key default gen_random_uuid(),
  tier text not null, sla_first text, sla_resolve text, coverage text
);

create table if not exists public.enterprise_support_slas (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  tier text, sla_first_min int, sla_resolve_min int
);

create table if not exists public.support_escalation_rules (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  trigger text, route_to text, priority int
);

create table if not exists public.governance_review_campaigns (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  title text not null, scope text, due date, status text default 'planned'
);

create table if not exists public.governance_exceptions (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  area text, description text, expires date, status text default 'review'
);

create table if not exists public.national_operations_metrics (
  id uuid primary key default gen_random_uuid(),
  region text, metric text, value numeric, captured_at timestamptz default now()
);

create table if not exists public.enterprise_revenue_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  line text, amount numeric, occurred_at timestamptz default now()
);

create table if not exists public.partner_revenue_events (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid references public.strategic_partners(id) on delete cascade,
  amount numeric, share numeric, occurred_at timestamptz default now()
);

create table if not exists public.partner_payouts_placeholder (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid references public.strategic_partners(id) on delete cascade,
  amount numeric, status text default 'pending', scheduled_for date
);

create table if not exists public.ai_governance_rules (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  action text not null, confidence_threshold numeric, requires_approval boolean default true
);

create table if not exists public.ai_confidence_thresholds (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  category text, threshold numeric
);

create table if not exists public.ai_action_audit_reviews (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  action text, confidence numeric, approved_by text, occurred_at timestamptz default now()
);

create table if not exists public.v4_report_runs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  report text not null, params jsonb, generated_at timestamptz default now(), generated_by uuid
);
