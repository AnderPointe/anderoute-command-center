import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import {
  usePushRegistration,
  useNotificationCenter,
  sendNotification,
  loadOfferNotification,
  dispatchVoiceNotification,
  routeHazardNotification,
  etaArrivalNotification,
} from "@/notifications";
import { NotificationPermissionCard } from "@/notifications/components/NotificationPermissionCard";
import { NotificationCenterPanel } from "@/notifications/components/NotificationCenterPanel";
import { useInVehicleSession } from "@/invehicle";
import { InVehicleSimulatorPanel } from "@/invehicle/components/InVehicleSimulatorPanel";
import type { InVehicleSurfaceId, RoutingInfoSnapshot } from "@/invehicle/types";

export const Route = createFileRoute("/driver/notifications-lab")({
  head: () => ({
    meta: [
      { title: "Notifications + In-Vehicle Lab — Anderoute" },
      { name: "description", content: "Phase 5 lab: push notification providers, dispatcher triggers, and CarPlay / Android Auto in-vehicle simulator." },
    ],
  }),
  component: NotificationsLab,
});

const COMPANY_ID = "demo-company";
const DRIVER_ID = "demo-driver";

function NotificationsLab() {
  const reg = usePushRegistration({ driverId: DRIVER_ID, companyId: COMPANY_ID, providerId: "mock" });
  const center = useNotificationCenter(DRIVER_ID, { autoPresent: true, providerId: "mock" });

  const [surface, setSurface] = useState<InVehicleSurfaceId>("web_sim");
  const vehicle = useInVehicleSession({ driverId: DRIVER_ID, companyId: COMPANY_ID, surface });

  const sampleRouting: RoutingInfoSnapshot = useMemo(
    () => ({
      current_maneuver: { type: "right", distance_m: 420, instruction: "Turn right onto I-10 W ramp" },
      next_maneuver:    { type: "merge", distance_m: 2100, instruction: "Merge onto I-10 W" },
      destination_label: "Phoenix, AZ",
      eta_iso: new Date(Date.now() + 184 * 60_000).toISOString(),
      remaining_minutes: 184,
      remaining_miles: 162,
      alert: null,
    }),
    [],
  );

  async function trigger(kind: "load_offer" | "dispatch_voice" | "route_hazard" | "eta_arrival") {
    if (kind === "load_offer") {
      await sendNotification(
        loadOfferNotification({
          driver_id: DRIVER_ID, company_id: COMPANY_ID,
          load_id: "load_demo_001",
          origin_city: "Los Angeles, CA", destination_city: "Phoenix, AZ",
          pickup_at: new Date(Date.now() + 90 * 60_000).toISOString(),
          rate_usd: 1850,
        }),
      );
    } else if (kind === "dispatch_voice") {
      await sendNotification(
        dispatchVoiceNotification({
          driver_id: DRIVER_ID, company_id: COMPANY_ID,
          message_id: "msg_demo_001", dispatcher_name: "Sam",
          preview: "Customer asked for a 30-min ETA window — copy?",
          priority: "high",
        }),
      );
    } else if (kind === "route_hazard") {
      await sendNotification(
        routeHazardNotification({
          driver_id: DRIVER_ID, company_id: COMPANY_ID,
          intelligence_id: "ri_demo_001",
          hazard_label: "Low clearance",
          detail: "12 ft 4 in clearance ahead in 6.2 mi on US-60. Plan re-route now.",
          severity: "critical",
        }),
      );
      void vehicle.pushAlert({ label: "CDL hazard ahead: 12'4\" clearance", severity: "critical" });
    } else {
      await sendNotification(
        etaArrivalNotification({
          driver_id: DRIVER_ID, company_id: COMPANY_ID,
          load_id: "load_demo_001",
          kind: "approaching_dropoff", minutes: 8, location_label: "Phoenix yard",
        }),
      );
    }
  }

  return (
    <AppShell>
      <div className="mx-auto grid max-w-6xl gap-4 py-4">
        <div>
          <h1 className="text-lg font-semibold text-zinc-100">Notifications + In-Vehicle Lab</h1>
          <p className="text-[12px] text-zinc-400">
            Phase 5 — push notification providers, dispatcher triggers, CarPlay / Android Auto simulator.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
          <div className="space-y-3">
            <NotificationPermissionCard
              permission={reg.permission}
              providerId={reg.providerId}
              busy={reg.busy}
              error={reg.error}
              onRegister={() => void reg.register()}
            />

            <div className="rounded-lg border border-white/10 bg-zinc-950/60 p-3">
              <div className="mb-2 text-[12px] font-semibold text-zinc-100">Trigger a notification</div>
              <div className="grid grid-cols-2 gap-2">
                {(["load_offer","dispatch_voice","route_hazard","eta_arrival"] as const).map((k) => (
                  <button
                    key={k}
                    onClick={() => void trigger(k)}
                    className="rounded-md bg-white/5 px-3 py-2 text-[12px] text-zinc-200 hover:bg-white/10"
                  >
                    {k.replace("_", " ")}
                  </button>
                ))}
              </div>
              <div className="mt-2 text-[10px] leading-snug text-zinc-500">
                Each trigger renders locally via the active provider and inserts a
                row into <span className="font-mono">notification_events</span>.
                Dispatchers in the same company see these in realtime.
              </div>
            </div>

            <NotificationCenterPanel
              events={center.events}
              loading={center.loading}
              onMarkOpened={center.markOpened}
            />
          </div>

          <div className="space-y-3">
            <div className="rounded-lg border border-white/10 bg-zinc-950/60 p-3">
              <div className="mb-2 flex items-center justify-between">
                <div className="text-[12px] font-semibold text-zinc-100">In-vehicle surface</div>
                <select
                  value={surface}
                  onChange={(e) => setSurface(e.target.value as InVehicleSurfaceId)}
                  className="rounded-md border border-white/10 bg-zinc-900 px-2 py-1 text-[11px] text-zinc-200"
                >
                  <option value="web_sim">Web simulator</option>
                  <option value="carplay">Apple CarPlay (stub)</option>
                  <option value="android_auto">Android for Cars (stub)</option>
                </select>
              </div>
              <button
                onClick={() => void vehicle.pushRouting(sampleRouting)}
                disabled={vehicle.status !== "connected"}
                className="mb-2 w-full rounded-md bg-emerald-500 px-3 py-1.5 text-[12px] font-semibold text-emerald-950 disabled:opacity-50"
              >
                Push sample routing info
              </button>
              <InVehicleSimulatorPanel
                surfaceLabel={surface === "carplay" ? "Apple CarPlay" : surface === "android_auto" ? "Android for Cars" : "Web simulator"}
                status={vehicle.status}
                routing={vehicle.routing}
                alert={vehicle.alert}
                onConnect={() => void vehicle.connect()}
                onDisconnect={() => void vehicle.disconnect()}
              />
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
