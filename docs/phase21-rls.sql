-- Phase 21 RLS examples (V4)
-- Assumes existing helpers: current_company(), has_role(uid, company_id, role), is_platform_owner(uid).

-- Enable RLS for all Phase 21 tables.
alter table public.v4_launch_milestones        enable row level security;
alter table public.v4_launch_blockers          enable row level security;
alter table public.v4_launch_risks             enable row level security;
alter table public.strategic_integrations      enable row level security;
alter table public.strategic_partners          enable row level security;
alter table public.carrier_disputes            enable row level security;
alter table public.regional_operations_metrics enable row level security;
alter table public.enterprise_revenue_events   enable row level security;
alter table public.partner_revenue_events      enable row level security;
alter table public.compliance_operations_tasks enable row level security;
alter table public.governance_review_campaigns enable row level security;
alter table public.ai_governance_rules         enable row level security;
alter table public.mobile_certification_tasks  enable row level security;
alter table public.android_auto_execution_items enable row level security;
alter table public.carplay_execution_items     enable row level security;

-- Company admins read enterprise readiness; platform owners see all.
create policy v4_milestones_read on public.v4_launch_milestones
  for select using (
    company_id = public.current_company()
    or public.is_platform_owner(auth.uid())
  );
create policy v4_milestones_write on public.v4_launch_milestones
  for all using (
    public.has_role(auth.uid(), company_id, 'admin')
    or public.is_platform_owner(auth.uid())
  ) with check (
    public.has_role(auth.uid(), company_id, 'admin')
    or public.is_platform_owner(auth.uid())
  );

-- Strategic integrations: admins of the owning company only.
create policy strategic_integrations_admin on public.strategic_integrations
  for all using (
    company_id = public.current_company()
    and public.has_role(auth.uid(), company_id, 'admin')
  );

-- Carrier disputes: company members.
create policy carrier_disputes_company on public.carrier_disputes
  for all using (company_id = public.current_company());

-- Revenue operations: billing admins only.
create policy enterprise_revenue_billing on public.enterprise_revenue_events
  for select using (public.has_role(auth.uid(), company_id, 'billing_admin'));

-- AI governance settings: admin only.
create policy ai_gov_admin on public.ai_governance_rules
  for all using (public.has_role(auth.uid(), company_id, 'admin'));

-- Compliance tasks: security or admin only.
create policy compliance_tasks_secadmin on public.compliance_operations_tasks
  for all using (
    public.has_role(auth.uid(), company_id, 'security_admin')
    or public.has_role(auth.uid(), company_id, 'admin')
  );

-- Regional metrics: company members, optionally region-scoped if dispatcher.
create policy regional_metrics_company on public.regional_operations_metrics
  for select using (company_id = public.current_company());

-- Mobile certification and Android Auto / CarPlay items: platform-owner only.
create policy mobile_cert_platform on public.mobile_certification_tasks
  for all using (public.is_platform_owner(auth.uid()));
create policy android_auto_platform on public.android_auto_execution_items
  for all using (public.is_platform_owner(auth.uid()));
create policy carplay_platform on public.carplay_execution_items
  for all using (public.is_platform_owner(auth.uid()));

-- Governance review campaigns: admin/security role only.
create policy governance_admin on public.governance_review_campaigns
  for all using (
    public.has_role(auth.uid(), company_id, 'admin')
    or public.has_role(auth.uid(), company_id, 'security_admin')
  );

-- NOTE:
-- Customer portal users and carrier-portal users MUST NOT see marketplace internal scoring
-- or revenue events. Do not add anon policies. Public reads must go through server functions
-- backed by supabaseAdmin with explicit safe-column projection.
