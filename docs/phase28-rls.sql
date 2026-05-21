-- Phase 28 — V7.5 RLS examples
-- Pattern: enable RLS on every new table, restrict by company + role via
-- security-definer helpers (public.current_company, public.has_role,
-- public.is_platform_owner). Never reference a table from its own policy.

-- ============================================================
-- 1. Regulated customer onboarding (company-scoped)
-- ============================================================
alter table public.regulated_customer_onboarding_projects enable row level security;

create policy "company admins view their regulated onboarding"
  on public.regulated_customer_onboarding_projects for select
  using (
    company_id = public.current_company()
    and (public.has_role(auth.uid(), company_id, 'admin')
      or public.has_role(auth.uid(), company_id, 'owner'))
  );

create policy "company admins manage their regulated onboarding"
  on public.regulated_customer_onboarding_projects for all
  using (
    company_id = public.current_company()
    and (public.has_role(auth.uid(), company_id, 'admin')
      or public.has_role(auth.uid(), company_id, 'owner'))
  )
  with check (
    company_id = public.current_company()
    and (public.has_role(auth.uid(), company_id, 'admin')
      or public.has_role(auth.uid(), company_id, 'owner'))
  );

-- ============================================================
-- 2. Regulated control pack (company-scoped, CCO/CISO/CFO sign-off)
-- ============================================================
alter table public.regulated_customer_control_packs enable row level security;

create policy "company admins view their control packs"
  on public.regulated_customer_control_packs for select
  using (
    company_id = public.current_company()
    and (public.has_role(auth.uid(), company_id, 'admin')
      or public.has_role(auth.uid(), company_id, 'owner'))
  );

-- ============================================================
-- 3. International customer success (company-scoped, broader read)
-- ============================================================
alter table public.international_customer_success_records enable row level security;

create policy "company team views intl customer success"
  on public.international_customer_success_records for select
  using (
    company_id = public.current_company()
    and (public.has_role(auth.uid(), company_id, 'admin')
      or public.has_role(auth.uid(), company_id, 'owner')
      or public.has_role(auth.uid(), company_id, 'dispatcher'))
  );

-- ============================================================
-- 4. Platform-owner-only: expansion, country launches, audit, recon,
--    residency, partner launches, marketplace controls, approvals
-- ============================================================
alter table public.global_expansion_execution_items enable row level security;
create policy "platform owners view expansion execution"
  on public.global_expansion_execution_items for select
  using (public.is_platform_owner(auth.uid()));

alter table public.country_launches enable row level security;
create policy "platform owners manage country launches"
  on public.country_launches for all
  using (public.is_platform_owner(auth.uid()))
  with check (public.is_platform_owner(auth.uid()));

alter table public.country_launch_blockers enable row level security;
create policy "platform owners manage country launch blockers"
  on public.country_launch_blockers for all
  using (public.is_platform_owner(auth.uid()))
  with check (public.is_platform_owner(auth.uid()));

alter table public.financial_audit_readiness_items_v75 enable row level security;
create policy "platform owners view financial audit v75"
  on public.financial_audit_readiness_items_v75 for select
  using (public.is_platform_owner(auth.uid()));

alter table public.revenue_reconciliation_placeholders enable row level security;
create policy "platform owners view recon placeholders"
  on public.revenue_reconciliation_placeholders for select
  using (public.is_platform_owner(auth.uid()));

alter table public.data_residency_execution_items enable row level security;
create policy "platform owners view data residency"
  on public.data_residency_execution_items for select
  using (public.is_platform_owner(auth.uid()));

alter table public.international_partner_launches enable row level security;
create policy "platform owners manage intl partner launches"
  on public.international_partner_launches for all
  using (public.is_platform_owner(auth.uid()))
  with check (public.is_platform_owner(auth.uid()));

alter table public.global_marketplace_operating_controls enable row level security;
create policy "platform owners view marketplace controls"
  on public.global_marketplace_operating_controls for select
  using (public.is_platform_owner(auth.uid()));

alter table public.global_launch_approval_requests enable row level security;
create policy "platform owners manage launch approvals"
  on public.global_launch_approval_requests for all
  using (public.is_platform_owner(auth.uid()))
  with check (public.is_platform_owner(auth.uid()));

-- ============================================================
-- 5. Customer / carrier / partner users: NO permissive policies on the
--    tables above. Absence of a policy under RLS = no access. Do NOT add
--    `for select using (true)` or any policy that joins back to these
--    tables — keep restrictions enforced at the database layer.
-- ============================================================

-- ============================================================
-- 6. Recursion-safety pattern — always go through security-definer
--    helpers. Anti-example:
--
--    -- WRONG (recursive): policy on user_roles references user_roles
--    create policy "..." on public.user_roles for select
--      using ((select role from public.user_roles where user_id = auth.uid()) = 'admin');
--
--    Use public.has_role / public.is_platform_owner instead.
-- ============================================================
