# Phase 25 — V6 server function / route plan

V6 follows the stack's TanStack pattern: app-internal logic uses
`createServerFn` (under `src/lib/*.functions.ts`), webhooks and
externally-triggered jobs use TanStack server routes under
`src/routes/api/public/*` with signature verification. We do NOT add
new Supabase Edge Functions for app-internal logic.

The names below are logical handler names; map each to either a
server function or a public API route as noted.

## Category / platform (server functions)
- `calculate-v6-category-leadership-score`
- `calculate-platform-maturity-score`
- `generate-category-leadership-summary`

## Network (server functions)
- `calculate-intelligent-network-health`
- `aggregate-network-operating-metrics`
- `generate-network-opportunity-report`

## Automation / AI (server functions; admin-gated)
- `enforce-automation-governance-policy`
- `calculate-automation-governance-score`
- `calculate-ai-governance-maturity`
- `generate-ai-explainability-report`

## Marketplace / economics (server functions)
- `calculate-marketplace-liquidity-intelligence`
- `calculate-platform-economics`
- `calculate-revenue-quality-score`

## Board / investor (server functions; platform-owner gated)
- `generate-board-packet-v6`
- `generate-investor-update-v6`
- `calculate-exit-readiness-score`
- `calculate-data-room-readiness-v6`
- `process-due-diligence-request`

## Risk / roadmap (server functions; exec gated)
- `calculate-strategic-risk-score`
- `generate-risk-portfolio-summary`
- `calculate-roadmap-investment-score`
- `generate-roadmap-governance-summary`

## Reliability / certification (server functions; security gated)
- `calculate-reliability-maturity`
- `create-incident-postmortem`
- `calculate-certification-evidence-completion`
- `generate-audit-package-readiness-report`

## Public API routes (`src/routes/api/public/*`, signed)
- `POST /api/public/webhooks/billing-event` — billing provider events
- `POST /api/public/webhooks/edi-status`    — EDI partner status updates
- `POST /api/public/webhooks/telematics`    — telematics partner events
- `POST /api/public/cron/refresh-v6-metrics` — scheduled aggregator

## Boundaries
- `requireSupabaseAuth` on every server fn that touches user-scoped data.
- Admin-elevated paths (board, investor, risk, roadmap, evidence) check
  `is_platform_owner` or `has_role(..., 'admin')` in the handler in
  addition to RLS — server-fn middleware is the primary gate, RLS is
  the backstop.
- All public routes verify HMAC signatures before processing.
