/**
 * Phase 5 — Notifications barrel.
 */
export * from "./types";
export { getPushProvider, resetPushProvider, DEFAULT_PUSH_PROVIDER } from "./providers/registry";
export { MockPushProvider } from "./providers/MockPushProvider";
export { WebPushProvider } from "./providers/WebPushProvider";
export { ExpoPushProvider } from "./providers/ExpoPushProvider";
export { FcmPushProvider } from "./providers/FcmPushProvider";
export { ApnsPushProvider } from "./providers/ApnsPushProvider";

export {
  loadOfferNotification,
  dispatchVoiceNotification,
  routeHazardNotification,
  etaArrivalNotification,
} from "./services/notificationTriggers";
export { sendNotification } from "./services/notificationService";
export {
  type NotificationPreferences,
  DEFAULT_PREFS,
  loadPreferences,
  savePreferences,
  shouldPresent,
} from "./services/notificationPreferences";
export { resolveDeeplink, type NotificationLike } from "./services/notificationRouter";

export { usePushRegistration } from "./hooks/usePushRegistration";
export { useNotificationCenter, type NotificationEvent } from "./hooks/useNotificationCenter";
export { useNotificationPreferences } from "./hooks/useNotificationPreferences";
