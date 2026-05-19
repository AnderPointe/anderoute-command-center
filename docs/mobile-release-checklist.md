# Mobile Release Checklist — Anderoute Driver

Use this as a pre-submission gate for App Store + Google Play.

## App metadata
- [ ] App name: **Anderoute Driver**
- [ ] iOS bundle id: `com.anderoute.driver`
- [ ] Android applicationId: `com.anderoute.driver`
- [ ] Adaptive icon (Android) + 1024×1024 marketing icon (iOS)
- [ ] Splash screen (light + dark)
- [ ] Localized listings (EN required; ES recommended for US trucking)

## Permissions copy
- [ ] Location (when in use) — "Anderoute uses your location to share ETA with dispatch while you are on shift."
- [ ] Location (always) — "Background location is used only during an active load so dispatch can keep customers informed."
- [ ] Microphone — "The microphone is used for hands-free voice commands. Raw audio is never stored."
- [ ] Notifications — "Push notifications deliver load offers, dispatch messages, ETA alerts, and route hazards."
- [ ] Camera (POD) — "Camera is used to capture Proof of Delivery photos."

## Privacy disclosures
- [ ] App Store Privacy Labels populated (Location, Audio Data: not collected for ML, Identifiers, Diagnostics)
- [ ] Google Play Data Safety section populated
- [ ] In-app privacy policy URL + terms URL
- [ ] Background location disclosure screen in onboarding
- [ ] Granular consent toggles (see `PrivacyControlsPanel`)

## Build hygiene
- [ ] EAS build profile `production` with separate provisioning + keystore
- [ ] Secrets stored in EAS (not in repo)
- [ ] Source maps uploaded to crash reporter
- [ ] Min OS: iOS 16 / Android 8 (API 26)
- [ ] App size < 80 MB

## QA
- [ ] Auth: login → company assignment → consent gate → home
- [ ] Permissions: deny → re-prompt → "open settings" deeplink works
- [ ] Push: registration → trigger from dispatcher → deeplink resolves
- [ ] Offline: airplane mode → status change + POD draft → reconnect → queue flushes in order
- [ ] CoPilot moving mode: replies stay under 12 words
- [ ] CarPlay simulator screenshot captured (for review)
- [ ] Android Auto Desktop Head Unit recording captured

## Release
- [ ] TestFlight internal → 5 drivers, 1 week
- [ ] Google Play internal testing → 5 drivers, 1 week
- [ ] Staged rollout 10% → 50% → 100%
- [ ] Rollback plan documented
