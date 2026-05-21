-- Phase 17 — V2 RLS examples
-- Assumes helpers from earlier phases:
--   current_company(), is_company_member(uid, cid), has_role(uid, cid, role),
--   customer_ids_for_user(uid), is_platform_owner(uid).

alter table predictive_risks enable row level security;
create policy "company members read risks"
  on predictive_risks for select
  using (is_company_member(auth.uid(), company_id));

alter table ai_recommendations enable row level security;
create policy "dispatchers see ai recs"
  on ai_recommendations for select
  using (
    is_company_member(auth.uid(), company_id)
    and (
      has_role(auth.uid(), company_id, 'dispatcher')
      or has_role(auth.uid(), company_id, 'admin')
      or has_role(auth.uid(), company_id, 'owner')
    )
  );

alter table ai_approval_requests enable row level security;
create policy "approvers see approval queue"
  on ai_approval_requests for select
  using (
    is_company_member(auth.uid(), company_id)
    and (
      has_role(auth.uid(), company_id, 'admin')
      or has_role(auth.uid(), company_id, 'owner')
    )
  );
create policy "approvers decide"
  on ai_approval_history for insert
  with check (
    exists (
      select 1 from ai_approval_requests r
      where r.id = request_id
        and is_company_member(auth.uid(), r.company_id)
        and (has_role(auth.uid(), r.company_id, 'admin') or has_role(auth.uid(), r.company_id, 'owner'))
    )
  );

alter table customer_update_drafts enable row level security;
create policy "customers see only their delay explanations"
  on customer_update_drafts for select
  using (
    is_customer_user(auth.uid(), customer_id)
    and status in ('approved','sent')
  );
create policy "internal staff manage drafts"
  on customer_update_drafts for all
  using (is_company_member(auth.uid(), company_id))
  with check (is_company_member(auth.uid(), company_id));

alter table edi_transactions enable row level security;
create policy "company admin/dispatcher read edi"
  on edi_transactions for select
  using (
    is_company_member(auth.uid(), company_id)
    and (has_role(auth.uid(), company_id, 'admin')
         or has_role(auth.uid(), company_id, 'dispatcher')
         or has_role(auth.uid(), company_id, 'owner'))
  );

alter table api_keys enable row level security;
create policy "company admin manage keys"
  on api_keys for all
  using (
    is_company_member(auth.uid(), company_id)
    and (has_role(auth.uid(), company_id, 'admin') or has_role(auth.uid(), company_id, 'owner'))
  );

alter table api_request_logs enable row level security;
create policy "company admin reads api logs"
  on api_request_logs for select
  using (
    is_company_member(auth.uid(), company_id)
    and (has_role(auth.uid(), company_id, 'admin') or has_role(auth.uid(), company_id, 'owner'))
  );

alter table integration_health_events enable row level security;
create policy "company members read their integration health"
  on integration_health_events for select
  using (company_id is null and is_platform_owner(auth.uid())
         or is_company_member(auth.uid(), company_id));

alter table executive_summaries enable row level security;
create policy "admins read exec summaries"
  on executive_summaries for select
  using (
    is_company_member(auth.uid(), company_id)
    and (has_role(auth.uid(), company_id, 'admin') or has_role(auth.uid(), company_id, 'owner'))
  );
