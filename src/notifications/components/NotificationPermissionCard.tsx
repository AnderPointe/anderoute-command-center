/**
 * Phase 5 — Notification permission card.
 *
 * Drives the driver through Allow → registers device token → confirms.
 */
import type { PermissionStatus, PushProviderId } from "../types";

interface Props {
  permission: PermissionStatus;
  providerId: PushProviderId;
  busy: boolean;
  error: string | null;
  onRegister: () => void;
}

export function NotificationPermissionCard({ permission, providerId, busy, error, onRegister }: Props) {
  const tone: Record<PermissionStatus, string> = {
    granted: "bg-emerald-500/10 border-emerald-500/40 text-emerald-200",
    denied:  "bg-rose-500/10 border-rose-500/40 text-rose-200",
    prompt:  "bg-amber-500/10 border-amber-500/40 text-amber-200",
    unknown: "bg-white/5 border-white/10 text-zinc-300",
  };
  return (
    <div className={`rounded-lg border p-3 text-[12px] ${tone[permission]}`}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="font-medium">Push notifications</div>
          <div className="text-[11px] opacity-80">
            Provider: <span className="font-mono">{providerId}</span> · Permission:{" "}
            <span className="font-mono">{permission}</span>
          </div>
        </div>
        {permission !== "granted" ? (
          <button
            onClick={onRegister}
            disabled={busy || permission === "denied"}
            className="rounded-md bg-emerald-500 px-3 py-1.5 text-[12px] font-semibold text-emerald-950 disabled:opacity-50"
          >
            {busy ? "…" : permission === "denied" ? "Blocked" : "Enable"}
          </button>
        ) : (
          <span className="rounded-md bg-emerald-500/20 px-2 py-1 text-[11px]">Registered</span>
        )}
      </div>
      {error ? <div className="mt-2 text-[11px] text-rose-300">{error}</div> : null}
      {permission === "denied" ? (
        <div className="mt-2 text-[11px] opacity-80">
          Re-enable in your browser/OS settings to receive load offers, dispatch
          voice messages, route hazard alerts, and ETA reminders.
        </div>
      ) : null}
    </div>
  );
}
