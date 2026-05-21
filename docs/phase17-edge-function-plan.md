# Phase 17 — V2 Edge / server function plan

In this stack, server-side logic is written as TanStack `createServerFn`
handlers (and `/api/public/*` server routes for webhooks). The names below
are logical handlers; the migration plan to V2.5 may move latency-sensitive
ones onto dedicated workers.

## AI / optimization
- `calculate-predictive-risks` — runs risk_kind scorers on active subjects, writes `predictive_risks`
- `generate-ai-recommendations` — turns top risks into recommendations (driver assignment, customer update, reassignment)
- `run-driver-optimization` — input load_id → ranked drivers + match breakdown (`optimization_runs`, `driver_match_scores`)
- `create-ai-approval-request` — required for any approval_action
- `approve-ai-action` / `reject-ai-action` — append to `ai_approval_history`, then execute or discard
- `generate-shift-handoff` — narrative summary for the next dispatcher
- `generate-executive-summary` — daily/weekly executive intelligence
- `generate-customer-update-draft` — drafts proactive delay explanation; never sends without approval

## EDI beta
- `receive-edi-transaction` (server route, signed) — stores raw EDI envelope
- `parse-edi-204` — parses Load Tender into shipment request
- `send-edi-990` — accept/reject response to a 204
- `send-edi-214` — shipment status updates
- `send-edi-210-placeholder` — freight invoice placeholder
- `create-edi-997-placeholder` — functional acknowledgment placeholder

## API marketplace
- `create-api-key` — generates key + prefix, stores hash, returns plaintext ONCE
- `rotate-api-key` — issues new secret, marks old revoked after grace
- `revoke-api-key` — immediate revoke
- `validate-api-key` — used by api-gateway-handler
- `api-gateway-handler` (`/api/public/v1/*`) — verifies key, enforces scopes + rate limit, proxies
- `log-api-request` — fire-and-forget into `api_request_logs`

## Reports
- `run-advanced-report` — async job, writes `advanced_report_runs`
- `export-report` — CSV/XLSX export
- `schedule-report-placeholder` — scheduling lands in V2.5

## Webhooks
- `dispatch-webhook-event` — signs payload (HMAC-SHA256), POSTs to subscribers
- `retry-webhook-delivery` — backoff retry from `failed` queue
- `validate-webhook-signature` — helper used by inbound integrations

## Security boundaries
- All AI handlers MUST require a company-scoped session (server fn middleware) before reading risks or recommendations.
- Approval handlers MUST verify the reviewer has admin/owner role.
- API gateway runs OUTSIDE the user-session middleware and uses key hash + scope check + rate limit.
- Webhook secrets are never returned after creation; only `secret_hash` is stored.
