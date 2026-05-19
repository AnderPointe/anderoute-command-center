# Anderoute — Production Readiness (Phase 5 polished)

This is the running scorecard for moving Anderoute from advanced prototype to a
deployable driver mobile app + dispatcher operations platform.

## Architecture boundaries

| Layer | In this repo | Production target |
|---|---|---|
| Driver mobile app | TanStack web preview of driver flows | Expo (React Native) + EAS build |
| Dispatcher web | TanStack Start app | Same app |
| Backend (app-internal) | `createServerFn` (TanStack) | Same — *not* Supabase Edge Functions |
| Backend (external webhooks) | `src/routes/api/public/*` | Same |
| Database | Lovable Cloud (Supabase) with RLS | Same |
| Navigation providers | `src/navigation/providers/*` (mock + SDK stubs) | Mapbox / Google / HERE / Trimble |
| AI providers | `src/ai/providers/*` (mock + LocalRules + OpenAI stubs) | Lovable AI Gateway / OpenAI Realtime |
| Push providers | `src/notifications/providers/*` (mock + Expo/FCM/APNs/WebPush stubs) | Expo Push + APNs/FCM |
| In-vehicle surface | `src/invehicle/adapters/*` (WebSim + native stubs) | CarPlay framework + Android for Cars |

## What's hardened in this pass

- Offline queue with idempotency keys, exponential backoff, attempt cap,
  critical-vs-best-effort classification, subscriber notifications.
- Notification preferences (per-category + quiet hours) + deeplink router.
- AI provider abstraction with fallback chain; never crashes the UI.
- CoPilot system prompt with per-mode addenda (moving/parked/dispatcher/admin/offline/emergency).
- Secure storage classification (PERSIST / SESSION / NEVER) with refusal of forbidden keys.
- Granular driver consent flags (raw audio storage hard-locked off).
- Production settings dashboard at `/settings/production`.

## What is deferred to native build

- Expo project (`apps/driver-mobile/`) and EAS configuration.
- Real CarPlay / Android Auto modules (entitlement + native code).
- Real background location.
- Crash reporter SDK (Sentry/Bugsnag) wiring.

## Phase 1–4 features (unchanged)

EliteNav UI, GPS streaming, navigation SDK abstraction, CoPilot voice
assistant, route intelligence, dispatch voice messages, voice command
intents, offline command queue (v1) — all still pass through.
