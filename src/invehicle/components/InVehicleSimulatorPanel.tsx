/**
 * Phase 5 — In-vehicle template simulator panel.
 *
 * Renders a CarPlay / Android Auto-style template (map placeholder + maneuver
 * card + ETA + alert banner) using the in-memory state from WebSimAdapter.
 */
import type { InVehicleListenerStatus, RoutingInfoSnapshot } from "../types";

interface Props {
  surfaceLabel: string;
  status: InVehicleListenerStatus;
  routing: RoutingInfoSnapshot | null;
  alert: { label: string; severity: "info" | "warning" | "critical" } | null;
  onConnect: () => void;
  onDisconnect: () => void;
}

const SEVERITY_TONE: Record<"info" | "warning" | "critical", string> = {
  info:     "bg-sky-500/15 border-sky-500/40 text-sky-100",
  warning:  "bg-amber-500/15 border-amber-500/50 text-amber-100",
  critical: "bg-rose-500/20 border-rose-500/60 text-rose-100",
};

const STATUS_TONE: Record<InVehicleListenerStatus, string> = {
  disconnected: "text-zinc-400",
  connecting:   "text-amber-300",
  connected:    "text-emerald-300",
  error:        "text-rose-300",
};

export function InVehicleSimulatorPanel({ surfaceLabel, status, routing, alert, onConnect, onDisconnect }: Props) {
  const connected = status === "connected";
  return (
    <div className="rounded-lg border border-white/10 bg-zinc-950/60 p-3">
      <div className="mb-2 flex items-center justify-between">
        <div>
          <div className="text-[12px] font-semibold text-zinc-100">{surfaceLabel}</div>
          <div className={`text-[10px] uppercase tracking-wide ${STATUS_TONE[status]}`}>{status}</div>
        </div>
        {connected ? (
          <button onClick={onDisconnect} className="rounded-md bg-white/10 px-3 py-1.5 text-[11px] text-zinc-200">
            Disconnect
          </button>
        ) : (
          <button onClick={onConnect} className="rounded-md bg-emerald-500 px-3 py-1.5 text-[11px] font-semibold text-emerald-950">
            Connect
          </button>
        )}
      </div>

      {/* CarPlay/AAuto-style routing card */}
      <div className="rounded-md border border-white/10 bg-zinc-900/80 p-3">
        <div className="mb-2 aspect-[16/7] w-full rounded-md bg-[radial-gradient(circle_at_30%_40%,rgba(56,189,248,0.18),transparent_60%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))]" />
        {routing ? (
          <div className="space-y-2">
            {alert ? (
              <div className={`rounded-md border px-2 py-1 text-[11px] ${SEVERITY_TONE[alert.severity]}`}>
                {alert.label}
              </div>
            ) : null}
            <div className="flex items-center justify-between gap-2">
              <div>
                <div className="text-[20px] font-semibold leading-none text-zinc-100">
                  {Math.round(routing.current_maneuver.distance_m)} m
                </div>
                <div className="text-[12px] text-zinc-300">{routing.current_maneuver.instruction}</div>
              </div>
              <div className="text-right">
                <div className="text-[11px] text-zinc-400">ETA</div>
                <div className="text-[14px] font-medium text-zinc-100">
                  {new Date(routing.eta_iso).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
                </div>
                <div className="text-[11px] text-zinc-400">
                  {routing.remaining_minutes} min · {routing.remaining_miles} mi
                </div>
              </div>
            </div>
            {routing.next_maneuver ? (
              <div className="border-t border-white/5 pt-2 text-[11px] text-zinc-400">
                Then in {Math.round(routing.next_maneuver.distance_m)} m: {routing.next_maneuver.instruction}
              </div>
            ) : null}
          </div>
        ) : (
          <div className="rounded-md border border-dashed border-white/10 p-4 text-center text-[11px] text-zinc-500">
            {connected ? "Awaiting routing info from the navigation provider…" : "Connect to start the in-vehicle session."}
          </div>
        )}
      </div>

      <div className="mt-2 text-[10px] leading-snug text-zinc-500">
        CarPlay + Android Auto adapters share this template surface. Production
        navigation requires Apple's CarPlay framework entitlement and the
        Android <span className="font-mono">androidx.car.app.category.NAVIGATION</span> manifest declaration.
      </div>
    </div>
  );
}
