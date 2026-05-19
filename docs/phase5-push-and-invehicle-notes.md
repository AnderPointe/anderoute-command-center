# Phase 5 — Push notifications + in-vehicle integration notes

This phase prepares Anderoute EliteNav to run on real driver devices with OS
push notifications and to surface inside Apple CarPlay / Android for Cars.
The web preview ships with mock + simulator adapters so all flows can be
exercised without native shells.

## Layers added

```
src/notifications/
├── types.ts                       # Provider-agnostic interface
├── providers/
│   ├── MockPushProvider.ts        # ✅ Browser Notification API (works in preview)
│   ├── WebPushProvider.ts         # 🚧 PUSH API + service worker — wiring notes inside
│   ├── ExpoPushProvider.ts        # 🚧 Expo / EAS native — wiring notes inside
│   ├── FcmPushProvider.ts         # 🚧 FCM HTTP v1 — wiring notes inside
│   ├── ApnsPushProvider.ts        # 🚧 APNs HTTP/2 — wiring notes inside
│   └── registry.ts
├── services/
│   ├── notificationTriggers.ts    # Pure payload factories per category
│   └── notificationService.ts     # presentLocal + insertWithQueue (offline-safe)
├── hooks/
│   ├── usePushRegistration.ts     # Permission + token upsert
│   └── useNotificationCenter.ts   # Realtime feed (notification_events)
└── components/
    ├── NotificationPermissionCard.tsx
    └── NotificationCenterPanel.tsx

src/invehicle/
├── types.ts                       # RoutingInfoSnapshot + adapter interface
├── adapters/
│   ├── CarPlayAdapter.ts          # 🚧 CPMapTemplate / CPNavigationSession
│   ├── AndroidAutoAdapter.ts      # 🚧 NavigationTemplate / RoutingInfo
│   └── WebSimAdapter.ts           # ✅ In-memory + Supabase session logging
├── registry.ts
├── hooks/useInVehicleSession.ts
└── components/InVehicleSimulatorPanel.tsx
```

## Notification triggers (Phase 5 wiring scope)

| Trigger              | Factory                          | Source event                                   |
| -------------------- | -------------------------------- | ---------------------------------------------- |
| New load offer       | `loadOfferNotification`          | Dispatcher assigns a load to a driver          |
| Dispatch voice push  | `dispatchVoiceNotification`      | Phase 4 `dispatch_voice_messages` INSERT       |
| Route / CDL hazard   | `routeHazardNotification`        | Phase 4 `route_intelligence_insights` INSERT   |
| ETA / arrival        | `etaArrivalNotification`         | Phase 2 GPS stream crossing geofence / ETA slip |

All factories are pure — call them from either client previews (`sendNotification`)
or server-side fan-out (a future `sendBatch` createServerFn over FCM/APNs/Expo).

## Permissions & credentials checklist

- **Expo (preferred for cross-platform)**
  - APNs key (.p8) uploaded to EAS credentials
  - FCM v1 service account JSON uploaded to EAS credentials
  - `expo-notifications` + `expo-device` installed; `Notifications.getExpoPushTokenAsync`
- **Direct FCM (Android only)**
  - `google-services.json` + Firebase Messaging SDK
  - Server holds `FIREBASE_SERVICE_ACCOUNT_JSON`
- **Direct APNs (iOS only)**
  - `aps-environment` entitlement
  - Server holds `APNS_AUTH_KEY` + `APNS_KEY_ID` + `APNS_TEAM_ID`
- **Web Push**
  - VAPID key pair (`VITE_WEBPUSH_PUBLIC_KEY` + `WEBPUSH_PRIVATE_KEY`)
  - Service worker registered at `/sw.js` handling `push` + `notificationclick`

## In-vehicle entitlements

- **Apple CarPlay** — Apply via Apple's CarPlay framework form. Required entitlement:
  `com.apple.developer.carplay-maps`. Without it the app cannot present a CarPlay
  navigation scene, even in TestFlight.
- **Android for Cars** — Declare the navigation category in `AndroidManifest.xml`:
  `<category android:name="androidx.car.app.category.NAVIGATION" />` plus the
  `NAVIGATION_TEMPLATES` permission. Run the Android Auto Desktop Head Unit (DHU)
  for local testing.

## Tables added (see migration)

- `driver_push_tokens` — per-device tokens, revocation-aware
- `notification_events` — outbound delivery log, realtime-enabled
- `in_vehicle_sessions` — CarPlay / Android Auto / web sim lifecycle, realtime-enabled

All three follow the Phase 4 RLS pattern: drivers see/write their own rows;
dispatchers/owners see all rows for their company.

## Offline & privacy

- Notification inserts go through the Phase 4 `insertWithQueue`, so a fired
  notification while offline still lands in Supabase on reconnect.
- Mock and Web Push providers never persist raw notification body off-device —
  only the structured row we explicitly insert.
- Push tokens are stored as opaque strings; we never echo them to logs.

## Try it

Visit `/driver/notifications-lab` in the preview to:

1. Grant browser notification permission and register a mock device token.
2. Trigger each of the 4 notification categories.
3. Connect the web in-vehicle simulator and push routing snapshots / alerts
   into a CarPlay/Android-Auto-style template surface.
