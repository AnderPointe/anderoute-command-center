# Phase 39 — V13 Enterprise Capital Readiness

Mock-only scaffolding for V13 of Anderoute. No autonomous dispatch. No IPO,
acquisition, SOC 2, ISO, audited financials, or CarPlay/Android Auto
completeness claims.

## Routes (24)

- /v13/overview, /scope, /capital-readiness, /revenue-intel, /diligence
- /data-room, /investor-evidence, /revenue-quality, /concentration
- /strategic-acct, /retention, /marketplace, /mp-unit-econ, /api-edi
- /partner-value, /forecast, /growth-investment, /exec-value
- /board, /risk, /valuation, /roadmap, /reports, /demo

## Backend boundary

App-internal logic → TanStack `createServerFn` under `src/lib/*.functions.ts`
with `requireSupabaseAuth` + role checks (exec / cro / cfo / revops / csm /
mp_ops / api_pm / partner_mgr / billing / security / board / platform_owner).

External webhooks (investor data room webhook, partner attribution webhook) →
`src/routes/api/public/*` with HMAC signature verification only. No PII.

## RLS sketches (V13)

- `v13_capital_readiness_scores`             — exec/admin only, platform_owner read-all
- `capital_readiness_metrics`                — exec/admin select; tenant insert
- `revenue_intelligence_maturity_records`    — revops/admin manage; billing read
- `commercial_diligence_records`             — exec/admin only
- `capital_data_room_items_v13`              — exec/admin only; no customer/carrier
- `investor_acquirer_evidence_items`         — exec/admin only; no partner/customer
- `revenue_quality_evidence_items`           — billing/revops manage; exec read
- `customer_concentration_governance_records` — exec/cro select; csm assigned select
- `strategic_account_value_creation_records` — csm/admin manage assigned; exec read
- `retention_expansion_value_records`        — csm/admin manage assigned; exec read
- `marketplace_economics_governance_records` — mp_ops/admin manage; exec read
- `marketplace_unit_economics_placeholders`  — finance/admin manage; exec read
- `api_edi_revenue_maturity_records`         — api_pm/admin manage; exec read
- `partner_value_governance_records`         — partner_mgr manage; partner read approved-only
- `commercial_forecast_evidence_placeholders` — revops manage; exec read
- `growth_investment_governance_records`     — exec/admin manage; board read approved-only
- `executive_value_creation_records`         — exec/admin only
- `board_capital_governance_records`         — board/exec/admin; board only approved
- `strategic_capital_risk_records`           — exec/cro only
- `valuation_driver_placeholders`            — exec/admin only
- `capital_strategy_roadmap_items`           — exec/admin manage; board read
- `v13_report_runs`                          — exec/admin; report-owner select

Customer users have no access to internal capital, valuation, revenue
quality, diligence, or board records. Carrier users have no marketplace
internals. Partner users only see approved partner-facing records.

## Edge function plan

Capital readiness, revenue intelligence, diligence/data room, customer/value,
marketplace/API/partner, board/capital — see `src/v13/data/mockPhase39.ts`
`V13_BACKEND_BOUNDARY` for the full list (22 server fns + 2 public webhooks).

## Demo flow

CEO → Capital Readiness 83% → Revenue Intel 86% → Diligence 78% → Data Room
74% → Marketplace 71%. CFO opens Revenue Intel. RevOps opens Diligence
System and flags gaps. Board admin opens Data Room. MP leader confirms SE
risk + moderate unit-econ confidence. Partner lead generates value action
plan (Verda strong, ClearPath enablement low). CEO opens Executive Value
Creation (87%). Board admin generates Board Capital Governance Report.

## Phase 40 plan (V13.5)

- Enterprise value creation maturity
- Capital strategy execution discipline
- Revenue durability governance
- Marketplace economics optimization
- Board-level strategic operating system
- Improved RLS examples + edge function separation
- Improved V13.5 demo flow
- Still deferring fully autonomous dispatch + final IPO/acquisition/audit claims
