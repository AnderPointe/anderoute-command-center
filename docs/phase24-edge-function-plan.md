# Phase 24 — Server boundary plan (V5.5)

On this stack, **internal** logic lives in **TanStack server functions**
(`createServerFn` + `requireSupabaseAuth`). Supabase Edge Functions are
only for external webhooks that must hit a stable Supabase URL.

## Internal server functions (TanStack, `requireSupabaseAuth`)

### Leadership
- `calculate-market-leadership-score`
- `calculate-platform-defensibility-score`
- `generate-leadership-action-plan`

### Monetization
- `calculate-ecosystem-monetization-score`
- `calculate-marketplace-economics`
- `calculate-product-line-revenue-maturity`

### Partnerships
- `calculate-partnership-execution-score`
- `calculate-partner-ecosystem-scale-score`
- `generate-partner-executive-brief`

### Executive reporting
- `generate-board-report-v55`
- `generate-investor-update`
- `generate-executive-operating-summary`

### Retention
- `calculate-renewal-readiness`
- `calculate-expansion-opportunities`
- `calculate-churn-risk`

### Strategy
- `generate-category-narrative`
- `generate-competitive-battlecard`
- `calculate-defensibility-risk`
- `generate-strategic-risk-report`
- `generate-roadmap-governance-summary`

### Data room
- `calculate-data-room-maturity`
- `generate-acquisition-readiness-report`
- `track-due-diligence-request`

### Reliability
- `calculate-platform-reliability-score`
- `generate-reliability-action-plan`

Each function:
- runs through `requireSupabaseAuth` middleware
- enforces RBAC (`has_role`, `is_platform_owner`)
- writes to `v55_report_runs` for audit
- returns plain DTOs (no SDK objects across the RPC boundary)
- does NOT perform fully autonomous dispatch
- does NOT claim certification/Auto/CarPlay approval without tracked evidence

## External webhooks (TanStack server routes under `/api/public/*`)

- `/api/public/webhooks/stripe-billing` — signature-verified
- `/api/public/webhooks/partner-sync` — HMAC verified per partner
- `/api/public/webhooks/edi-callback`  — signed payloads
- `/api/public/webhooks/app-store-status` — Apple/Google notifications

Stable URLs use `project--<id>.lovable.app` so external callers don't need
to update on rename.

## Out of scope this phase
- Fully autonomous dispatch
- Insurance underwriting automation
- Global customs workflows
- Certification claims without audit evidence
