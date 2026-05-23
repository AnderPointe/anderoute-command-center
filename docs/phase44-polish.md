# Phase 44 — V15.5 Enterprise Intelligence Maturity (polish)

V15.5 extends V15 Enterprise Performance Command into an **intelligence maturity layer**:
recommendation engines (capital, revenue, marketplace), autonomous-assist
governance, human approval workflows, explainability, and outcome tracking.

## Scope
- Enterprise Intelligence Maturity Center
- Capital execution intelligence + revenue optimization recs
- Marketplace scale intelligence + optimization recs
- Autonomous-assist governance with mandatory human approval
- Recommendation explainability (inputs, weights, confidence, counterfactual)
- Recommendation outcome tracking (predicted vs. realized)
- Strategic / executive / board / risk / account / partner / product /
  category / capital-evidence / diligence intelligence
- Enterprise intelligence controls + long-term roadmap

## Explicitly NOT shipped
- Fully autonomous dispatch
- SOC 2 / ISO / IPO certification assertions
- Phase 45

## Server boundary
- `createServerFn` — internal: score recs, approve, snapshot, replay
- `/api/public/*` server routes — external: signal webhooks (HMAC verified)
- Edge functions: only legacy/inherited; no new ones for V15.5

## Routes (under /v155)
overview, scope, command, capital-intel, revenue-opt, rev-rec-engine,
mp-intel, mp-rec-engine, autonomy-gov, approvals, explainability,
outcomes, intel, exec-intel, board-intel, risk-intel, accounts-intel,
partners-intel, product-intel, category-intel, cap-evidence-intel,
diligence-intel, controls, roadmap, demo
