import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Anderoute3DDispatchMap } from "@/components/dispatch/Anderoute3DDispatchMap";
import { DispatchStatusBoard } from "@/components/dispatch/DispatchStatusBoard";
import { AlertsPanel } from "@/components/dashboard/AlertsPanel";

export const Route = createFileRoute("/dispatch")({
  head: () => ({
    meta: [
      { title: "Live Dispatch — Anderoute" },
      {
        name: "description",
        content:
          "Real-time driver status board, live fleet map, and logistics intelligence for active dispatch operations.",
      },
    ],
  }),
  component: DispatchPage,
});

function DispatchPage() {
  return (
    <AppShell>
      <div className="p-4 md:p-6">
        <div className="dispatch-canvas space-y-5">
          <div className="glass-panel p-5">
            <h1 className="text-2xl font-semibold tracking-tight">Live Dispatch</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Anderoute Map Intelligence · Live drivers · POIs · Geofences
            </p>
          </div>

          <div className="glass-panel p-2">
            <Anderoute3DDispatchMap compact className="h-[420px] !rounded-xl" />
          </div>

          <div className="glass-panel p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">Status Board</h2>
              <span className="text-xs text-muted-foreground">
                Scroll horizontally to view all columns
              </span>
            </div>
            <DispatchStatusBoard />
          </div>

          <div className="glass-panel">
            <AlertsPanel limit={4} />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
