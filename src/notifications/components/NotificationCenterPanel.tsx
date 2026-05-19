/**
 * Phase 5 — Notification center panel.
 */
import type { NotificationEvent } from "../hooks/useNotificationCenter";

interface Props {
  events: NotificationEvent[];
  loading: boolean;
  onMarkOpened: (id: string) => void;
}

const CATEGORY_LABEL: Record<NotificationEvent["category"], string> = {
  load_offer:     "Load offer",
  dispatch_voice: "Dispatch voice",
  route_hazard:   "Route hazard",
  eta_arrival:    "ETA / arrival",
  system:         "System",
};

const PRIORITY_TONE: Record<NotificationEvent["priority"], string> = {
  low:    "border-white/10 bg-white/5 text-zinc-300",
  normal: "border-sky-500/30 bg-sky-500/10 text-sky-200",
  high:   "border-amber-500/40 bg-amber-500/10 text-amber-200",
  urgent: "border-rose-500/50 bg-rose-500/10 text-rose-200",
};

export function NotificationCenterPanel({ events, loading, onMarkOpened }: Props) {
  return (
    <div className="rounded-lg border border-white/10 bg-zinc-950/60 p-3">
      <div className="mb-2 flex items-center justify-between">
        <div className="text-[12px] font-semibold text-zinc-100">Notification center</div>
        <div className="text-[10px] uppercase tracking-wide text-zinc-500">
          {loading ? "Syncing…" : `${events.length} events`}
        </div>
      </div>
      <div className="space-y-2">
        {events.length === 0 && !loading ? (
          <div className="rounded-md border border-dashed border-white/10 p-4 text-center text-[11px] text-zinc-500">
            No notifications yet. Trigger one from the simulator.
          </div>
        ) : null}
        {events.map((e) => (
          <button
            key={e.id}
            onClick={() => onMarkOpened(e.id)}
            className={`block w-full rounded-md border p-2 text-left text-[12px] ${PRIORITY_TONE[e.priority]} ${e.status === "opened" ? "opacity-60" : ""}`}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="font-medium">{e.title}</div>
              <div className="text-[10px] uppercase tracking-wide opacity-70">{CATEGORY_LABEL[e.category]}</div>
            </div>
            <div className="text-[11px] opacity-90">{e.body}</div>
            <div className="mt-1 flex items-center gap-2 text-[10px] opacity-70">
              <span className="font-mono">{e.provider ?? "—"}</span>
              <span>·</span>
              <span>{e.status}</span>
              <span>·</span>
              <span>{new Date(e.created_at).toLocaleTimeString()}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
