-- Phase 24 — V5.5 RLS examples (illustrative; align with existing helpers
-- has_role, is_company_member, is_platform_owner).

alter table public.v55_leadership_scores enable row level security;
alter table public.platform_defensibility_metrics enable row level security;
alter table public.strategic_moats enable row level security;
alter table public.board_reports_v55 enable row level security;
alter table public.investor_updates enable row level security;
alter table public.competitive_differentiators enable row level security;
alter table public.strategic_risks enable row level security;
alter table public.long_term_roadmap_items enable row level security;
alter table public.advanced_data_room_items enable row level security;
alter table public.certification_evidence_maturity enable row level security;
alter table public.ecosystem_monetization_metrics enable row level security;
alter table public.marketplace_economics_metrics enable row level security;
alter table public.enterprise_account_plans enable row level security;
alter table public.customer_retention_scores enable row level security;
alter table public.partnership_execution_items enable row level security;

-- Platform-owner only (leadership, defensibility, board, investor)
create policy "platform_owner_select_leadership"
  on public.v55_leadership_scores for select to authenticated
  using (public.is_platform_owner(auth.uid()));

create policy "platform_owner_select_defensibility"
  on public.platform_defensibility_metrics for select to authenticated
  using (public.is_platform_owner(auth.uid()));

create policy "platform_owner_select_board"
  on public.board_reports_v55 for select to authenticated
  using (public.is_platform_owner(auth.uid()));

create policy "platform_owner_select_investor"
  on public.investor_updates for select to authenticated
  using (public.is_platform_owner(auth.uid()));

-- Internal-only: competitive intel + strategic risks (platform owners + admins)
create policy "internal_select_competitive"
  on public.competitive_differentiators for select to authenticated
  using (public.is_platform_owner(auth.uid()));

create policy "internal_select_strategic_risks"
  on public.strategic_risks for select to authenticated
  using (public.is_platform_owner(auth.uid()));

-- Roadmap governance: product/admin restricted (platform-scope)
create policy "platform_owner_select_roadmap"
  on public.long_term_roadmap_items for select to authenticated
  using (public.is_platform_owner(auth.uid()));

-- Data room: executive/platform-owner restricted
create policy "platform_owner_select_data_room"
  on public.advanced_data_room_items for select to authenticated
  using (public.is_platform_owner(auth.uid()));

-- Security/cert evidence: security/admin restricted
create policy "security_select_evidence"
  on public.certification_evidence_maturity for select to authenticated
  using (
    public.is_platform_owner(auth.uid())
    or public.has_role(auth.uid(), public.current_company(), 'admin')
  );

-- Monetization (platform-scope, billing/exec restricted)
create policy "platform_owner_select_monetization"
  on public.ecosystem_monetization_metrics for select to authenticated
  using (public.is_platform_owner(auth.uid()));

-- Marketplace economics: company-scoped; carrier users cannot see internals
create policy "company_member_select_marketplace_economics"
  on public.marketplace_economics_metrics for select to authenticated
  using (
    company_id is not null
    and public.is_company_member(auth.uid(), company_id)
    and public.has_role(auth.uid(), company_id, 'admin')
  );

-- Account plans + retention: company admins/CS
create policy "company_admin_select_account_plans"
  on public.enterprise_account_plans for select to authenticated
  using (
    public.is_company_member(auth.uid(), company_id)
    and public.has_role(auth.uid(), company_id, 'admin')
  );

create policy "company_admin_select_retention"
  on public.customer_retention_scores for select to authenticated
  using (
    public.is_company_member(auth.uid(), company_id)
    and public.has_role(auth.uid(), company_id, 'admin')
  );

-- Partnership execution: partner users only see their partnership row
-- (assumes partnership_execution_items joins to a partner_users mapping; placeholder)
create policy "partner_user_select_own_partnership_items"
  on public.partnership_execution_items for select to authenticated
  using (
    public.is_platform_owner(auth.uid())
    -- or exists (select 1 from public.partner_users pu
    --   where pu.user_id = auth.uid()
    --   and pu.partnership_id = partnership_execution_items.partnership_id)
  );
