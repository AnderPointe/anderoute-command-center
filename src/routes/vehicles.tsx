import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { vehicles, drivers } from "@/data/mock";
import { VehicleTypeBadge } from "@/components/fleet/VehicleTypeBadge";

export const Route = createFileRoute("/vehicles")({
  head: () => ({
    meta: [
      { title: "Vehicles — Anderoute" },
      { name: "description", content: "Fleet vehicle inventory: trucks, hotshots, vans, reefers, flatbeds and more." },
    ],
  }),
  component: VehiclesPage,
});

function VehiclesPage() {
  return (
    <AppShell>
      <div className="p-4 md:p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Vehicles</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{vehicles.length} units in fleet</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {vehicles.map((v) => {
            const driver = drivers.find((d) => d.id === v.currentDriverId);
            const statusColor =
              v.status === "Active" ? "var(--success)" :
              v.status === "Idle" ? "var(--warning)" :
              v.status === "Maintenance" ? "var(--orange)" : "var(--destructive)";
            return (
              <div key={v.id} className="rounded-xl border border-border bg-card overflow-hidden">
                <div className="p-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{v.unitNumber}</span>
                    <span
                      className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded"
                      style={{
                        color: statusColor,
                        backgroundColor: `color-mix(in oklab, ${statusColor} 12%, transparent)`,
                      }}
                    >
                      {v.status}
                    </span>
                  </div>
                  <h3 className="mt-1 font-semibold">{v.year} {v.make} {v.model}</h3>
                  <div className="mt-2"><VehicleTypeBadge type={v.type} /></div>
                </div>
                <div className="p-4 grid grid-cols-2 gap-y-2 text-xs">
                  <span className="text-muted-foreground">Plate</span><span className="font-mono">{v.plate}</span>
                  <span className="text-muted-foreground">Fuel</span><span>{v.fuelType}</span>
                  <span className="text-muted-foreground">Avg MPG</span><span className="tabular-nums">{v.averageMpg}</span>
                  <span className="text-muted-foreground">Driver</span>
                  <span className="truncate">{driver?.name ?? "—"}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
