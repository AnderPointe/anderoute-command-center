# Security & Privacy Model — Anderoute

## Consent model

Driver consent flags live in `src/runtime/driverConsent.ts`. All are
**off by default**, revocable, and persisted via the secure-storage helper.

| Flag | Default | Notes |
|---|---|---|
| `location_tracking` | off | Foreground only |
| `background_location` | off | Required for active-load tracking |
| `microphone` | off | Required for voice CoPilot |
| `voice_transcripts_persist` | off | Opt-in. Text only, never audio |
| `raw_audio_persist` | **hard-locked off** | UI does not expose a toggle |
| `push_notifications` | off | Mirrors OS permission |
| `in_vehicle_handoff` | off | CarPlay / Android Auto session |

Server-side must mirror these flags — never trust client-side suppression
for retention or PII handling.

## Secure storage classes

`src/runtime/secureStorage.ts` classifies every key:

- **PERSIST** → localStorage on web; **Expo SecureStore / iOS Keychain /
  Android Keystore** on native.
- **SESSION** → sessionStorage on web; in-memory only on native.
- **NEVER** → throws if any code tries to read/write. Examples:
  `supabase.service_role_key`, `openai.api_key`, `voice.raw_audio`,
  `dispatch.admin_credentials`.

## RLS posture (current schema)

All Phase 5 tables (`driver_push_tokens`, `notification_events`,
`in_vehicle_sessions`) have RLS enabled with these patterns:

- Driver-owned rows: `auth.uid() = driver_id` for insert/select/update.
- Company managers: `can_manage_company(auth.uid(), company_id)` for
  cross-driver visibility.
- Sensitive writes (delivery confirmation, alert resolution) restricted to
  managers via existing `has_role` helper.

### Recommended additions (next migration)

```sql
-- Only service role / server fns can mark notifications as `sent`
create policy "system marks sent" on public.notification_events
  for update using (false) with check (false);  -- service role bypasses RLS
```

```sql
-- Drivers manage their own preferences
create policy "driver manages own prefs" on public.notification_preferences
  for all using (auth.uid() = driver_id)
            with check (auth.uid() = driver_id);
```

## Edge function vs server fn boundary

This stack is TanStack Start. App-internal logic (load offers, CoPilot
proxy, POD submission, validation) belongs in `createServerFn` — not
Supabase Edge Functions. Only put a handler under
`supabase/functions/` when:

1. An external service (Stripe, Twilio) calls the URL directly, and
2. The payload must be processed inside Supabase's network perimeter
   (DB-trigger-adjacent workloads).

For everything else use `src/lib/*.functions.ts` with
`requireSupabaseAuth` for user-scoped calls, or
`src/integrations/supabase/client.server.ts` (admin) for trusted
maintenance.

## Audit + retention

- All write paths (status changes, dispatch messages, POD, alerts) insert
  into `audit_logs` server-side.
- Default retention: 90 days for raw location events, 1 year for
  navigation events, indefinite for POD + load history.
- Driver data export + deletion endpoints: Phase 6.

## Incident response

- Crash + error events stream to `app_error_events` / `crash_events`
  (tables planned, not yet created).
- Provider failures (push, AI, navigation) land in
  `provider_error_events` so on-call can spot a regional outage.
- Emergency event raises a high-priority dispatcher notification AND
  appends to `audit_logs` with `event_type = 'emergency'`.
