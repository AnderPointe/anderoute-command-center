import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { drivers } from "@/data/mock";
import { DriverStatusBadge } from "@/components/drivers/DriverStatusBadge";
import { VehicleTypeBadge } from "@/components/fleet/VehicleTypeBadge";
import { DriverProfileDrawer } from "@/components/drivers/DriverProfileDrawer";
import type { Driver } from "@/types";
import { Search } from "lucide-react";

export const Route = createFileRoute("/drivers")({
  head: () => ({
    meta: [
      { title: "Drivers — Anderoute" },
      { name: "description", content: "All CDL and Non-CDL drivers with live status, vehicle assignment, and performance metrics." },
    ],
  }),
  component: DriversPage,
});

function DriversPage() {
  const [selected, setSelected] = useState<Driver | null>(null);
  const [q, setQ] = useState("");
  const list = drivers.filter((d) => d.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <AppShell>
      <div className="p-4 md:p-6 space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Drivers</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {drivers.length} total · {drivers.filter((d) => d.cdlStatus).length} CDL · {drivers.filter((d) => !d.cdlStatus).length} Non-CDL
            </p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search drivers"
              className="h-9 pl-9 pr-3 text-sm rounded-md bg-secondary/60 border border-border outline-none focus:ring-2 focus:ring-ring/40"
            />
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-[11px] uppercase tracking-wider text-muted-foreground bg-surface-2/60">
                <tr>
                  <th className="text-left font-medium px-4 py-2.5">Driver</th>
                  <th className="text-left font-medium px-4 py-2.5">Status</th>
                  <th className="text-left font-medium px-4 py-2.5">Vehicle</th>
                  <th className="text-left font-medium px-4 py-2.5">Location</th>
                  <th className="text-right font-medium px-4 py-2.5">Speed</th>
                  <th className="text-right font-medium px-4 py-2.5">MPG</th>
                  <th className="text-right font-medium px-4 py-2.5">On-time</th>
                  <th className="text-right font-medium px-4 py-2.5">Safety</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {list.map((d) => (
                  <tr
                    key={d.id}
                    onClick={() => setSelected(d)}
                    className="cursor-pointer hover:bg-secondary/40 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="size-9 rounded-full bg-gradient-to-br from-teal to-orange grid place-items-center text-white text-xs font-semibold">
                          {d.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <div className="font-medium">{d.name}</div>
                          <div className="text-[11px] text-muted-foreground">
                            {d.licenseType} · {d.dispatcher}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3"><DriverStatusBadge status={d.status} size="xs" /></td>
                    <td className="px-4 py-3"><VehicleTypeBadge type={d.vehicleType} /></td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{d.currentLocation.label}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{d.currentSpeed}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{d.averageMpg}</td>
                    <td className="px-4 py-3 text-right tabular-nums text-success">{d.onTimePercentage}%</td>
                    <td className="px-4 py-3 text-right tabular-nums">{d.safetyScore}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <DriverProfileDrawer driver={selected} onClose={() => setSelected(null)} />
    </AppShell>
  );
}
