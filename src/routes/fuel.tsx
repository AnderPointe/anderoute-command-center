import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { drivers, vehicles } from "@/data/mock";
import { Fuel } from "lucide-react";

export const Route = createFileRoute("/fuel")({
  head: () => ({ meta: [{ title: "Fuel & Mileage — Anderoute" }] }),
  component: FuelPage,
});

function FuelPage() {
  return (
    <AppShell>
      <div className="p-4 md:p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Fuel & Mileage</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Track miles, MPG, and fuel efficiency by driver and vehicle.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border bg-card">
            <div className="px-4 py-3 border-b border-border font-semibold">Driver Mileage Today</div>
            <ul className="divide-y divide-border">
              {drivers.map((d) => (
                <li key={d.id} className="px-4 py-3 flex items-center justify-between gap-3">
                  <span className="text-sm">{d.name}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-muted-foreground tabular-nums">{d.averageMpg} MPG</span>
                    <span className="text-sm font-medium tabular-nums">{d.milesToday} mi</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-card">
            <div className="px-4 py-3 border-b border-border font-semibold flex items-center gap-2">
              <Fuel className="size-4 text-orange" /> Vehicle Fuel Efficiency
            </div>
            <ul className="divide-y divide-border">
              {vehicles.map((v) => (
                <li key={v.id} className="px-4 py-3 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm">{v.unitNumber} · {v.make} {v.model}</div>
                    <div className="text-xs text-muted-foreground">{v.fuelType}</div>
                  </div>
                  <span className="text-sm font-medium tabular-nums">{v.averageMpg} MPG</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
