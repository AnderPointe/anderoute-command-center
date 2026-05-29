import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Anderoute3DDispatchMap } from "@/components/dispatch/Anderoute3DDispatchMap";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "Map Intelligence — Anderoute" },
      {
        name: "description",
        content:
          "Anderoute Map Intelligence Layer — live drivers, POIs, geofences, 3D buildings, and logistics layers on an OpenStreetMap-based vector tile map.",
      },
    ],
  }),
  component: MapPage,
});

function MapPage() {
  return (
    <AppShell>
      <div className="p-4 md:p-6 h-full flex flex-col">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Map Intelligence</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Live dispatch map · OpenStreetMap vector tiles · Anderoute logistics overlay
            </p>
          </div>
        </div>
        <Anderoute3DDispatchMap className="flex-1 min-h-[calc(100vh-13rem)]" />
      </div>
    </AppShell>
  );
}
