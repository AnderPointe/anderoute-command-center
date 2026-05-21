-- Phase 25 / V6 RLS examples (illustrative).
-- Pattern: company-scoped tables use is_company_member(); platform-level
-- records use is_platform_owner(); executive/admin scopes use has_role().

-- 1. Company admins can view their own platform maturity records.
alter table public.v6_category_leadership_scores enable row level security;
create policy v6_leadership_company_read on public.v6_category_leadership_scores
  for select using (
    company_id is not null and public.is_company_member(auth.uid(), company_id)
  );

-- 2. Platform owners can view platform-wide leadership/readiness.
create policy v6_leadership_platform_read on public.v6_category_leadership_scores
  for select using (
    company_id is null and public.is_platform_owner(auth.uid())
  );

-- 3. Board governance is executive/admin restricted.
alter table public.board_governance_meetings enable row level security;
create policy board_meetings_exec_read on public.board_governance_meetings
  for select using (
    public.is_platform_owner(auth.uid())
    or public.has_role(auth.uid(), public.current_company(), 'admin')
  );

-- 4. Investor data room is platform-owner/executive only.
alter table public.investor_data_room_sections enable row level security;
create policy data_room_owner_only on public.investor_data_room_sections
  for select using (public.is_platform_owner(auth.uid()));

-- 5. Exit/IPO readiness is executive restricted.
alter table public.exit_ipo_readiness_items enable row level security;
create policy exit_readiness_owner_only on public.exit_ipo_readiness_items
  for select using (public.is_platform_owner(auth.uid()));

-- 6. Revenue quality is billing/executive restricted.
alter table public.revenue_quality_metrics enable row level security;
create policy revenue_quality_exec_read on public.revenue_quality_metrics
  for select using (
    public.is_platform_owner(auth.uid())
    or public.has_role(auth.uid(), public.current_company(), 'admin')
  );

-- 7. Automation governance is admin-only.
alter table public.automation_governance_policies enable row level security;
create policy automation_gov_admin on public.automation_governance_policies
  for select using (
    public.is_platform_owner(auth.uid())
    or public.has_role(auth.uid(), public.current_company(), 'admin')
  );

-- 8. AI governance is admin/security restricted.
alter table public.ai_governance_maturity_v6 enable row level security;
create policy ai_gov_admin on public.ai_governance_maturity_v6
  for select using (
    public.is_platform_owner(auth.uid())
    or public.has_role(auth.uid(), public.current_company(), 'admin')
  );

-- 9. Customer users cannot access internal leadership/revenue/risk/board.
--    (No SELECT policy granted to customer_users roles.)

-- 10. Carrier users cannot access marketplace economics internals.
--     (No SELECT policy granted to carrier role.)

-- 11. Partner users can only view approved partner-facing records.
alter table public.market_education_assets enable row level security;
create policy edu_partner_read on public.market_education_assets
  for select using (
    audience in ('public','partner')
    and status = 'complete'
  );

-- 12. Certification evidence is security/admin restricted.
alter table public.certification_evidence_completion enable row level security;
create policy evidence_security_only on public.certification_evidence_completion
  for select using (
    public.is_platform_owner(auth.uid())
    or public.has_role(auth.uid(), public.current_company(), 'admin')
  );

-- 13. Strategic risk portfolio is executive/admin restricted.
alter table public.strategic_risk_portfolio_items enable row level security;
create policy risks_exec_only on public.strategic_risk_portfolio_items
  for select using (
    public.is_platform_owner(auth.uid())
    or public.has_role(auth.uid(), public.current_company(), 'admin')
  );

-- 14. Roadmap investment governance is product/executive restricted.
alter table public.roadmap_investment_items enable row level security;
create policy roadmap_exec_only on public.roadmap_investment_items
  for select using (
    public.is_platform_owner(auth.uid())
    or public.has_role(auth.uid(), public.current_company(), 'admin')
  );
