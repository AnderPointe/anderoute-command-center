import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { LiveMapPanel } from "@/components/map/LiveMapPanel";
import { DriverProfileDrawer } from "@/components/drivers/DriverProfileDrawer";
import type { Driver } from "@/types";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "Live Map — Anderoute" },
      { name: "description", content: "Full-screen live fleet map with status filters, route overlays and driver markers." },
    ],
  }),
  component: MapPage,
});

function MapPage() {
  const [selected, setSelected] = useState<Driver | null>(null);
  return (
    <AppShell>
      <div className="p-4 md:p-6">
        <div className="mb-4">
          <h1 className="text-2xl font-semibold tracking-tight">Live Map</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Map-ready surface · Will connect to Mapbox, MapLibre or Google Maps once tokens are configured.
          </p>
        </div>
        <LiveMapPanel className="h-[calc(100vh-12rem)]" onSelectDriver={setSelected} selectedId={selected?.id} />
      </div>
      <DriverProfileDrawer driver={selected} onClose={() => setSelected(null)} />
    </AppShell>
  );
}
