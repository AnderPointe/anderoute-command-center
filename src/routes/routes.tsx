import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { routes, loads, drivers } from "@/data/mock";
import { Clock, MapPin, Navigation } from "lucide-react";

export const Route = createFileRoute("/routes")({
  head: () => ({ meta: [{ title: "Routes — Anderoute" }] }),
  component: RoutesPage,
});

function RoutesPage() {
  return (
    <AppShell>
      <div className="p-4 md:p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Active Routes</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{routes.length} live routes</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {routes.map((r) => {
            const load = loads.find((l) => l.id === r.loadId)!;
            const driver = drivers.find((d) => d.id === r.driverId)!;
            const progress = ((r.totalMiles - r.remainingMiles) / r.totalMiles) * 100;
            return (
              <div key={r.id} className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Navigation className="size-4 text-teal" />
                    <span className="font-semibold">{r.id}</span>
                    <span className="text-xs text-muted-foreground">· {load.id}</span>
                  </div>
                  <span className="text-xs inline-flex items-center gap-1 text-muted-foreground">
                    <Clock className="size-3" /> {r.eta}
                  </span>
                </div>
                <div className="mt-2 text-sm">{driver.name} · {driver.vehicleType}</div>
                <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin className="size-3 text-teal" /> {load.pickupLocation}
                  <span>→</span>
                  <MapPin className="size-3 text-orange" /> {load.dropoffLocation}
                </div>
                <div className="mt-3">
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-1">
                    <span>{r.totalMiles - r.remainingMiles} mi completed</span>
                    <span>{r.remainingMiles} mi remaining</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-teal to-orange" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
