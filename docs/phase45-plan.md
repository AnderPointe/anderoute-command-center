# Phase 45 — V16 Autonomous-Assist Operating Governance

Mock-only scaffold under `/v16/*`. Moves Anderoute from V15.5 intelligence maturity
into V16 autonomous-assist operating governance: predictive performance intelligence,
capital-grade board intelligence, marketplace optimization intelligence, strategic
control maturity, recommendation governance maturity, human-in-the-loop approvals,
recommendation explainability + evidence, outcome learning loops.

## Hard guardrails (mock only — NOT implemented as autonomous)

- No autonomous dispatch, pricing, billing, marketplace, customer/carrier, capital,
  legal/compliance, or board actions.
- All recommendations require human approval before execution.
- No IPO/acquisition/SOC2/ISO/CarPlay/Android Auto claims without tracked evidence.

## Surfaces

Overview · Scope · Assist Governance Command · Predictive Performance · Predictive
Risk · Rec Governance Maturity · HITL Approvals · Rec Explainability · Rec Evidence ·
Outcome Learning · Capital-Grade Board Intel · Exec Decision Intel · Board Decision
Intel · MP Optimization Intel · MP Controls · Revenue Controls · Capital Controls ·
Account Controls · Partner Controls · Product-Line Controls · Category Controls ·
Strategic Control Maturity · Long-Term Roadmap · V16 Reports · Demo Flow.

## Planned Supabase tables (sketch — not migrated)

v16_autonomous_assist_scores, autonomous_assist_governance_records,
predictive_performance_intelligence_records, predictive_risk_signal_records,
recommendation_governance_maturity_records, hitl_approval_governance_records,
recommendation_explainability_maturity_records, recommendation_evidence_maturity_records,
outcome_learning_loop_records, capital_grade_board_intelligence_records,
executive_decision_intelligence_records, board_decision_intelligence_records,
marketplace_optimization_intelligence_records, marketplace_intelligence_control_records,
revenue_intelligence_control_records, capital_intelligence_control_records,
strategic_account_intelligence_control_records, partner_intelligence_control_records,
product_line_intelligence_control_records, category_intelligence_control_records,
strategic_control_maturity_records, autonomous_assist_roadmap_items, v16_report_runs.

Tenant tables carry `company_id`; platform-wide governance records may be
platform-scoped via `has_role(auth.uid(), null, 'platform_owner')`.

## RLS sketches

- Company admins → company-scoped intel + recs.
- Platform owners → platform-wide assist governance, strategic control.
- Executive role → exec decision intel, capital intel, risk intel, board intel.
- Board role → approved board intel + board decision records only.
- Security/admin → manage assist policies, thresholds, control matrices.
- RevOps/MP/CS/Partner/Product/Category leaders → manage their respective
  intelligence control records.
- Customer / carrier / partner users → blocked from internal intel; partner
  users only see records flagged `partner_visible=true AND approved=true`.
- `rec_no_self_approve`: approver_id ≠ recommender_id.

## ServerFn vs Edge boundary

createServerFn (auth required):
- approve_hitl_request, reject_hitl_request, escalate_hitl_request
- calculate_v16_autonomous_assist_score
- generate_capital_grade_board_intelligence_report
- snapshot_strategic_control_maturity

/api/public/* (signed webhooks only):
- ingest signal events from external scoring providers
- cron-triggered nightly score recompute (hmac-signed)

Edge functions remain for cross-tenant batch jobs scheduled by pg_cron.

## Deferred to Phase 46 (V16.5)

Enterprise predictive governance, AI-assisted board operating system, durable
revenue control automation, marketplace intelligence maturity, strategic approval
orchestration.
