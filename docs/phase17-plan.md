# Phase 17 — V2 plan

V2 moves Anderoute from V1.5 production logistics into an intelligent
operations platform. Routes live under `/v2/*`.

## In scope
- AI Operations Intelligence dashboard
- Predictive risk scoring (delivery, pickup, GPS, route, customer, integration, billing, EDI, webhook)
- Optimization engine (driver-for-load scoring, ranking, suggested assignment, reassignment)
- Suggested driver assignment workflow
- Human approval workflow for all high-impact AI actions
- CoPilot V2 intelligence (context-aware rules + drafts + shift handoff + exec summary)
- Customer impact intelligence
- Executive intelligence dashboard
- Advanced reporting (16 reports)
- EDI beta (204 / 990 / 214 / 210 / 997 placeholders)
- API marketplace beta (keys, scopes, rotation, request logs)
- Expanded webhook system (17 events, retry queue, payload preview)
- Integration health dashboard
- Enterprise controls (permissions, audits, retention, feature flags)
- Customer portal V2 insights

## Deferred (out of V2)
Fully autonomous dispatch, Android Auto, CarPlay, full SOC 2 evidence
automation, full EDI production certification, white-label custom domains,
advanced ML model training, multi-constraint optimization, carrier marketplace.

## Schema additions
See `docs/phase17-schema.sql`.

## RLS examples
See `docs/phase17-rls.sql`.

## Edge functions
See `docs/phase17-edge-function-plan.md`.

## Phase 18
See `docs/phase18-plan.md` — Enterprise V2.5: production EDI, API monetization,
advanced optimization, advanced AI, white-label domains, enterprise security
controls, larger fleet scaling.
