# Android Auto Plan — Anderoute EliteNav

## Surface

Anderoute EliteNav qualifies as a **navigation app** under the Android for Cars
App Library category. That gives access to `NavigationTemplate`,
`MapWithContentTemplate`, routing notifications, and voice actions — but bars
free-form list UI while the car is in motion.

## Module shape

This must ship as a separate **native Android module** inside the Expo
config plugin, not as JS. The module:

- Implements `CarAppService` and declares
  `androidx.car.app.category.NAVIGATION` in `AndroidManifest.xml`.
- Exposes a `Session` that renders `NavigationTemplate` with route polyline,
  current maneuver, next maneuver, ETA, remaining distance.
- Bridges to the JS layer through a small event bus (route updates, dispatch
  alerts) using the same `RoutingInfoSnapshot` shape as
  `src/invehicle/types.ts`.
- Fires turn-by-turn **routing notifications** so the cluster display can
  surface them.

## Driver safety constraints

- No free-form scrolling lists in motion → use grid + pane templates only.
- Dispatch messages: short preview + "Reply with voice" action; full text
  only when parked.
- Voice-first commands map to the same intents as the phone CoPilot:
  ETA, next turn, report delay, contact dispatch, request reroute.
- Emergency action visible on every template.

## Testing

- Desktop Head Unit (DHU) for development.
- Pixel Tablet + an emulated car for QA.
- Future: cluster display + AAOS (Automotive OS) head-unit profile.

## Status today (web preview)

`src/invehicle/adapters/AndroidAutoAdapter.ts` is a no-op stub that mirrors
the surface contract. The web simulator at `/driver/notifications-lab`
exercises the JS-side bridge so the native module can be implemented to a
known contract.
