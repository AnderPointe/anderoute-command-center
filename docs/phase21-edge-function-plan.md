# Phase 21 — Edge Function & Server Function Plan (V4)

In TanStack Start, app-internal logic belongs in `createServerFn`. Only true external
webhook / cron surfaces remain in Supabase Edge Functions.

## TanStack server functions (`createServerFn`)

Launch:
- `calculate-v4-launch-readiness` — aggregates readiness scores across product/security/mobile/marketplace/etc.
- `create-launch-blocker` — auth-bound write (`requireSupabaseAuth`, admin role).
- `resolve-launch-blocker` — auth-bound write.
- `generate-enterprise-launch-report` — synchronous PDF/CSV; persists to storage.

Integrations:
- `calculate-integration-readiness`
- `update-strategic-integration-status`
- `generate-partner-launch-plan`

Marketplace:
- `calculate-carrier-network-readiness`
- `calculate-regional-carrier-coverage`
- `process-carrier-award` — transactional write of award + dispatch trigger; no fully-autonomous assignment.
- `create-carrier-dispute`

Operations:
- `calculate-regional-health-score`
- `calculate-large-fleet-performance`
- `aggregate-national-operations-metrics`

Support:
- `calculate-enterprise-sla-status`
- `route-support-escalation`
- `create-critical-incident`

Compliance / governance:
- `generate-compliance-review`
- `create-governance-review-campaign`
- `calculate-mobile-certification-readiness`
- `calculate-ai-governance-score`

Revenue:
- `calculate-enterprise-revenue-summary`
- `calculate-partner-revenue-summary`
- `generate-revenue-operations-report`

All of the above use `requireSupabaseAuth`. AI-driven actions check
`ai_governance_rules.requires_approval` — no autonomous dispatch.

## Supabase Edge Functions (external surfaces only)

- `stripe-webhook` — Stripe billing events. Verifies `Stripe-Signature` HMAC.
- `samsara-webhook` — telematics events from Samsara. Verifies provider HMAC.
- `edi-inbound` — EDI VAN POST endpoint. IP allow-list + per-partner shared secret.
- `cron-nightly-readiness` — pg_cron trigger to refresh readiness aggregates.
- `mobile-crash-ingest` — receives Sentry/Crashlytics forwarder webhooks.

All edge functions:
- Validate signatures before any DB write.
- Use `supabaseAdmin` (service role) inside the verified handler.
- Never return PII.
- Live at `supabase/functions/<name>/index.ts` only when truly required.

## Separation rationale

App-internal logic uses TanStack server fns to inherit:
- Per-request `requireSupabaseAuth`
- RLS-scoped Supabase client
- Vite typecheck + same deploy lifecycle as the app

Edge functions are reserved for sources Lovable Cloud cannot reach via the app
session (external webhooks, cron, third-party HTTP forwarders).
