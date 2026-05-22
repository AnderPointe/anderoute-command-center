# Phase 37 polish — V12 enterprise commercial command

Polish pass on V12. No new modules, no autonomous dispatch, Phase 38 still
deferred.

## What got better
- **Commercial command** now surfaces last-4Q trend (command score, quality,
  velocity, slippage) plus win-rate, average ACV, and exec-sponsored %.
- **Overview** adds forecast-governance (placeholder), capital-grade
  reporting readiness, long-term operating-model maturity, and global
  commercial cadence — all on one page.
- **Demo flow** now renders the explicit "deferred in V12" list and the
  Phase 38 (V12.5) teaser side-by-side so reviewers cannot confuse scope.
- **Trust-led procurement** and **expansion/retention** scoreboards remain
  the headline-blocker cards on the overview.

## Backend boundary (re-confirmed)
- **TanStack `createServerFn`** owns all V12 internal scoring/report
  generation (command score, revenue-quality, deal execution, board pack,
  proof governance). Reads execute via Supabase RLS as the calling user.
- **`/api/public/*` (HMAC-signed)** is the only entry point for partner
  revenue webhooks and marketplace settlement callbacks. Service-role
  `supabaseAdmin` is allowed only inside those verified handlers.
- No edge function carries internal commercial logic; we did not regress
  toward Supabase Edge Functions.

## RLS examples re-stated (see `V12_RLS_EXAMPLES`)
- `board_revenue_reports_v12` → company-scoped + owner role only.
- `commercial_data_room_items` → company-scoped + admin only.
- `commercial_proof_governance_records` → public when `status='approved'`,
  otherwise admin only.
- `strategic_account_governance_records` → assigned AE/CSM or admin.
- `partner_revenue_governance_records` & `marketplace_revenue_governance_records`
  → company-scoped + dispatcher role (billing/MP ops).
- `v12_commercial_command_scores` → `is_platform_owner(auth.uid())` only.

## Explicit non-goals (unchanged)
- No autonomous deal closure or dispatch.
- No audit / certification / IPO / M&A completeness claims.
- Insurance underwriting, customs production, AndroidAuto/CarPlay approvals
  remain placeholders.

## Phase 38 (V12.5) — not started
Capital-grade enterprise growth operations, commercial auditability evidence
chains, global revenue intelligence placeholder, partner channel
optimization with payout governance, executive growth stewardship cadence.
