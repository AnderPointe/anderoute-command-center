import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { LoadBoard } from "@/components/loads/LoadBoard";
import { loads, drivers } from "@/data/mock";
import { MapPin, Truck, ShieldCheck, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/loads")({
  head: () => ({
    meta: [
      { title: "Load Requests — Anderoute" },
      { name: "description", content: "All loads, suggested driver matches, and dispatch assignment workflows." },
    ],
  }),
  component: LoadsPage,
});

function LoadsPage() {
  const open = loads.filter((l) => ["available", "offered", "draft"].includes(l.status));
  const sample = open[0] ?? loads[0]!;
  const suggested = drivers
    .filter((d) => d.vehicleType === sample.requiredVehicleType || (!sample.requiresCDL && !d.cdlStatus))
    .slice(0, 4);

  return (
    <AppShell>
      <div className="p-4 md:p-6 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Load Requests</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Assign drivers, view route distance, and monitor ETAs for every load.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {["All", "Available", "Assigned", "In Transit", "Delivered", "CDL Only", "Non-CDL"].map((f, i) => (
              <button
                key={f}
                className={`px-2.5 py-1 rounded-md border ${i === 0 ? "bg-teal text-teal-foreground border-teal" : "border-border hover:bg-secondary"}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <LoadBoard />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-4">
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
              Featured Load
            </div>
            <div className="mt-1 flex items-center justify-between">
              <h3 className="text-lg font-semibold">{sample.id} · {sample.customer}</h3>
              <span className="text-xs text-muted-foreground">${sample.rate.toLocaleString()}</span>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2"><MapPin className="size-4 text-teal" />{sample.pickupLocation}</div>
              <div className="flex items-center gap-2"><MapPin className="size-4 text-orange" />{sample.dropoffLocation}</div>
              <div className="flex items-center gap-2"><Truck className="size-4 text-muted-foreground" />{sample.requiredVehicleType}</div>
              <div className="flex items-center gap-2"><ShieldCheck className="size-4 text-muted-foreground" />{sample.requiresCDL ? "CDL Required" : "Non-CDL OK"}</div>
              <div className="flex items-center gap-2"><Clock className="size-4 text-muted-foreground" />{sample.estimatedDuration} · {sample.estimatedMiles} mi</div>
            </div>
            <div className="mt-3 text-sm rounded-md bg-surface-2 border border-border p-3">
              <span className="font-medium">Note: </span>{sample.dispatcherNote}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card">
            <div className="px-4 py-3 border-b border-border">
              <h3 className="font-semibold">Suggested Drivers</h3>
              <p className="text-xs text-muted-foreground">
                Ranked by vehicle match, distance, status, and on-time score.
              </p>
            </div>
            <ul className="divide-y divide-border">
              {suggested.map((d, i) => (
                <li key={d.id} className="p-3 flex items-center gap-3">
                  <div className="size-9 rounded-full bg-gradient-to-br from-teal to-orange grid place-items-center text-white text-xs font-semibold">
                    {d.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium truncate">{d.name}</span>
                      <span className="inline-flex items-center gap-1 text-[11px] text-orange font-medium">
                        <Star className="size-3 fill-current" /> {(98 - i * 4)}%
                      </span>
                    </div>
                    <div className="text-[11px] text-muted-foreground">
                      {d.vehicleType} · {d.currentLocation.label} · MPG {d.averageMpg}
                    </div>
                  </div>
                  <Button size="sm" className="h-7 text-xs bg-teal text-teal-foreground hover:bg-teal/90">Offer</Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
