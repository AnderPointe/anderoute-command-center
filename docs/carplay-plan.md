# CarPlay Plan — Anderoute EliteNav

## Entitlement first

Apple gates CarPlay navigation apps behind the
`com.apple.developer.carplay-maps` entitlement (and "Audio" / "Communication"
for adjacent flows). Anderoute must apply via the **CarPlay framework
request** form at developer.apple.com, providing:

- App Store screenshots demonstrating driver-safe UI.
- Privacy policy URL.
- Justification: CDL-aware truck navigation + dispatcher integration.

No production build can ship until the entitlement is granted.

## Module shape

CarPlay is a separate **iOS app extension** inside the same Expo app:

- `CPTemplateApplicationScene` registered in `Info.plist`.
- Root template: `CPMapTemplate` with route overlay + maneuver bar.
- `CPNavigationSession` drives turn-by-turn updates.
- Dispatch messages surface as `CPAlertTemplate` (parked) or a maneuver-bar
  pill (moving).
- Bridges to JS via the same `RoutingInfoSnapshot` interface used by the web
  simulator and the Android Auto module.

## Siri + voice

Phase 5 ships voice on-device (Web Speech + Expo Speech). CarPlay v2 will
register Siri intents:

- "Hey Siri, what's my ETA?"
- "Hey Siri, tell dispatch I'm running late."
- "Hey Siri, start proof of delivery." (parked-only via SiriKit intent
  precondition)

## Driver safety constraints

- No keyboard input while moving.
- Lists limited to 6 items (Apple HIG).
- Notifications: short title + body, single primary action.
- Emergency action available from every template.

## Live Activities + widgets

Phase 6 candidate: pickup/delivery countdown Live Activity, lock-screen
widget for current load. Out of scope for Phase 5.

## Status today (web preview)

`src/invehicle/adapters/CarPlayAdapter.ts` is a no-op stub. The web
simulator exercises the JS-side contract so the iOS extension can be wired
to known event shapes.
