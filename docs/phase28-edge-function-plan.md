# Phase 28 — V7.5 server logic plan

All app-internal V7.5 logic is implemented as TanStack `createServerFn`
handlers (NOT Supabase Edge Functions). External webhooks live under
`src/routes/api/public/*` server routes with HMAC signature verification.

## Boundary rules

- `createServerFn` (in `src/lib/*.functions.ts`) — internal RPC the V7.5
  dashboards call via `useServerFn` + `useQuery`. Always use
  `requireSupabaseAuth` middleware; never read `process.env` at module
  scope.
- `src/routes/api/public/*` — public HTTP endpoints for external callers
  only (Stripe, partner webhooks, cron pings). Always verify signatures
  using `crypto.timingSafeEqual` before processing. Never return PII.
- Platform-level functions additionally gate on
  `is_platform_owner(auth.uid())` server-side AND through RLS.
- Customer / carrier / partner users never invoke launch, residency,
  financial recon, or marketplace control functions (no permissive RLS
  policy + handler-level role check).

## Server functions (createServerFn)

### Global expansion execution
- `calculate-v75-execution-readiness-score` — weighted score across 14 categories
- `create-country-launch` (platform-owner only)
- `calculate-country-launch-readiness` — derive readiness % per country
- `generate-country-go-no-go-recommendation` — rule-based recommendation
- `list-country-launch-blockers` — joins blockers across domains
- `record-execution-readiness-trend` — append weekly snapshot
- `list-execution-alerts` — high/medium severity, owner-routed

### Controlled country pilot + regulated onboarding
- `create-controlled-country-pilot` — initialize 15-step workflow
- `record-country-pilot-conditions` (CCO-gated)
- `generate-country-pilot-review`
- `create-regulated-customer-onboarding`
- `summarize-regulated-onboarding-owner-load`
- `generate-regulated-control-pack` — composes 14 sections
- `calculate-regulated-customer-risk`
- `approve-regulated-go-live` — CCO + CISO + CFO approval gate

### Financial controls
- `calculate-financial-audit-readiness-v75`
- `record-financial-audit-trend`
- `reconcile-revenue-events-placeholder` — matching only (no GAAP claim)
- `create-revenue-reconciliation-exception`
- `summarize-revenue-reconciliation-placeholder`
- `calculate-country-billing-readiness`
- `generate-global-revenue-control-report`

### Partners + marketplace
- `calculate-international-partner-launch-readiness`
- `summarize-international-partner-launch-funnel`
- `approve-international-partner-launch`
- `summarize-international-partner-certification` (placeholder only)
- `calculate-global-marketplace-discipline-score`
- `record-marketplace-discipline-trend`
- `activate-regional-marketplace`
- `calculate-regional-marketplace-readiness`
- `generate-marketplace-exception-report`

### Residency / compliance / support / risk / approvals
- `calculate-data-residency-execution-risk`
- `summarize-data-residency-execution`
- `summarize-cross-border-workflow-placeholders`
- `calculate-global-support-readiness`
- `summarize-global-support-coverage`
- `calculate-global-compliance-control-score`
- `summarize-global-compliance-controls`
- `calculate-regional-risk-score`
- `summarize-regional-risk-profile`
- `create-global-launch-approval-request`
- `summarize-global-launch-approvals`
- `summarize-global-operating-cadence-load`
- `summarize-international-customer-success`

## External webhooks (`/api/public/*`)
- `POST /api/public/stripe-webhook` — Stripe HMAC verification
- `POST /api/public/partner-launch-webhook` — partner HMAC verification
- `POST /api/public/marketplace-exception-webhook` — internal HMAC
- `POST /api/public/cron/weekly-readiness-snapshot` — bearer + IP allow-list

## Explicitly NOT in scope
- No autonomous dispatch server function.
- No production customs / broker / commercial-invoice handler.
- No SOC 2 / ISO certification assertions.
- No production international tax automation.
