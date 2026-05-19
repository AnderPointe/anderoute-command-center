# Notification Flow — Anderoute

Single source of truth for what fires when, to whom, with which priority.

## Categories × audience

| Category | Trigger | Recipient | Priority | Deeplink |
|---|---|---|---|---|
| `load_offer` | Dispatcher assigns a load | Driver | high | `/driver/loads/:id` |
| `load_offer` (expiring) | 5 min before offer expiry | Driver | high | `/driver/loads/:id` |
| `dispatch_voice` | Dispatcher sends voice/text | Driver | high / urgent | `/driver/copilot-lab` |
| `route_hazard` | Route intelligence emits hazard | Driver | high / urgent | `/driver/nav-lab` |
| `eta_arrival` (approaching) | Geofence enter | Driver | high | `/driver/navigation` |
| `eta_arrival` (slipped) | ETA delta > 10 min | Driver + Dispatcher | normal | `/driver/navigation` |
| `system` (app update) | Min version bump | Driver | normal | `/settings/production` |
| Dispatcher acceptance/denial | Driver responds to offer | Dispatcher | normal | `/dispatch` |
| Dispatcher arrival/loaded/delivered | Driver status change | Dispatcher | normal | `/dispatch` |
| Dispatcher POD submitted | POD insert | Dispatcher | normal | `/loads/:id` |
| Emergency | Driver triggers emergency | Dispatcher | urgent | `/dispatch` |

## Suppression rules (`shouldPresent`)

1. Category disabled in preferences → drop.
2. Quiet hours active AND priority ≠ `urgent` → drop.
3. Otherwise present.

Dispatcher-bound urgent events bypass driver quiet hours by definition (they
target a different user).

## Tap → deeplink resolution

See `src/notifications/services/notificationRouter.ts`. Explicit
`payload.deeplink` wins over category default.

## Server-side fan-out

Local presentation goes through `sendNotification` in this app. Server-side
multi-driver fan-out (Expo batches, FCM/APNs) belongs in a `createServerFn`
that reads from `driver_push_tokens` and writes results back into
`notification_events`. Never call provider keys from the client.
