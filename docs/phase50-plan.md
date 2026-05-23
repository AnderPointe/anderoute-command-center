# Phase 50 — V18.5 Enterprise Control Assurance

Mock-only. Anderoute becomes a resilient, controlled, board-ready enterprise
logistics intelligence platform. Autonomous-assist workflows are continuously
monitored, policy-enforced, evidence-backed, human-approved, audited, and
resilient. **Every high-impact action remains HITL-gated.**

## In scope (V18.5)
1. Enterprise Control Assurance Command Center
2. Autonomous-Assist Operating Resilience Center
3. Board Intelligence Assurance Center
4. Revenue Automation Control Maturity Center
5. Marketplace Control Optimization Center
6. Executive Governance Assurance Center
7. Automation Resilience Controls Center
8. Human Approval Assurance Center
9. Recommendation Control Assurance Center
10. Outcome Learning Assurance Center
11. Evidence Assurance Center
12. Predictive Risk Control Assurance Center
13. Capital Control Assurance Center
14. Strategic Account Control Assurance Center
15. Partner Control Assurance Center
16. Product-Line Control Assurance Center
17. Category Control Assurance Center
18. Autonomous-Assist Resilience Audit Center
19. Board Assurance Reporting Center
20. Long-Term Control Assurance Roadmap
21. V18.5 Reports

## Out of scope (still deferred)
- Fully autonomous dispatch / pricing / billing / marketplace / capital / board
- IPO / acquisition / audited financial / SOC 2 / ISO claims without evidence
- Android Auto / CarPlay final claims
- Full customs / international tax / insurance underwriting / autonomous vehicle

## Schema (mocked)
- v185_control_assurance_scores
- enterprise_control_assurance_records
- autonomous_assist_operating_resilience_records
- board_intelligence_assurance_records
- revenue_automation_control_maturity_records
- marketplace_control_optimization_records
- executive_governance_assurance_records
- automation_resilience_control_records
- human_approval_assurance_records
- recommendation_control_assurance_records
- outcome_learning_assurance_records
- evidence_assurance_records
- predictive_risk_control_assurance_records
- capital_control_assurance_records
- strategic_account_control_assurance_records
- partner_control_assurance_records
- product_line_control_assurance_records
- category_control_assurance_records
- assist_resilience_audit_records
- board_assurance_reports
- control_assurance_roadmap_items
- v185_report_runs

## RLS sketches
- `v185_company_scope` — `USING (company_id = public.current_company())`
- `v185_platform_assurance_owner` — `USING (public.is_platform_owner(auth.uid()))`
- `v185_exec_assurance_visibility` — `USING (public.has_role(auth.uid(), company_id, 'owner') OR public.has_role(auth.uid(), company_id, 'admin'))`
- `v185_board_report_approved_only` — `USING (audience='board' AND status='approved')`
- `v185_security_admin_manage_resilience` — `FOR ALL USING (public.has_role(auth.uid(), company_id, 'admin'))`
- `v185_no_self_approve` — `WITH CHECK (approver_id <> recommender_id)`
- `v185_high_impact_hitl` — `USING (impact_tier <> 'high' OR EXISTS (SELECT 1 FROM approvals a WHERE a.action_id = id AND a.approver_id <> recommender_id AND a.status='approved'))`
- `v185_customer_excluded_internal` — `USING (NOT public.is_customer_user(auth.uid(), company_id))`
- `v185_carrier_blocked_mp_internals` — marketplace control rows hidden from carrier role
- `v185_partner_facing_approved_only` — `USING (audience='partner' AND status='approved')`
- `v185_audit_append_only` — INSERT only; UPDATE/DELETE forbidden
- `v185_evidence_append_only` — `FOR UPDATE USING (false)`

## Edge Function / ServerFn boundary
- **createServerFn** (auth required, RLS as user): assurance approvals,
  evidence attach, control reads, recommendation reads, exception remediation.
- **Edge Functions** (service role, cron/signature gated):
  - calculate-v185-control-assurance-score
  - generate-control-assurance-summary
  - detect-control-assurance-exceptions
  - generate-control-assurance-action-plan
  - calculate-assist-operating-resilience
  - detect-assist-workflow-failures
  - generate-resilience-remediation-plan
  - create-resilience-audit-log
  - calculate-board-intelligence-assurance
  - generate-board-assurance-report
  - detect-board-assurance-gaps
  - calculate-revenue-control-maturity
  - detect-revenue-control-exceptions
  - generate-revenue-control-maturity-plan
  - calculate-marketplace-control-optimization
  - detect-marketplace-control-optimization-gaps
  - generate-marketplace-control-optimization-plan
  - calculate-executive-governance-assurance
  - calculate-human-approval-assurance
  - calculate-recommendation-control-assurance
  - calculate-outcome-learning-assurance
  - calculate-evidence-assurance
  - calculate-predictive-risk-control-assurance
  - calculate-capital-control-assurance
  - calculate-account-control-assurance
  - calculate-partner-control-assurance
  - calculate-product-line-control-assurance
  - calculate-category-control-assurance
  - generate-assist-resilience-audit-report
  - detect-resilience-audit-exceptions
  - generate-long-term-control-assurance-roadmap
- **/api/public/webhook/\***: signed external evidence ingest + cron triggers.

## V18.5 demo (12 steps)
CEO → Assurance Command → Resilience → Board Intelligence Assurance →
Revenue Maturity → MP Optimization → Exec Governance → Human Approval →
Recommendation Assurance → Evidence Assurance → Risk Assurance →
Board Assurance Report.

## Phase 51 teaser (V19)
Enterprise assurance operating system with autonomous-assist resilience
maturity, board assurance execution, durable revenue control assurance,
and marketplace optimization assurance. All high-impact still HITL.
