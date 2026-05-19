import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { shipments } from "@/data/mock";
import { Package, MapPin, Clock } from "lucide-react";

export const Route = createFileRoute("/shipments")({
  head: () => ({
    meta: [
      { title: "Shipments — Anderoute" },
      { name: "description", content: "Active shipments with commodity, package details, ETA and proof of delivery." },
    ],
  }),
  component: ShipmentsPage,
});

function ShipmentsPage() {
  return (
    <AppShell>
      <div className="p-4 md:p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Shipments</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{shipments.length} active shipments</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {shipments.map((s) => (
            <div key={s.id} className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="size-9 rounded-md bg-accent text-accent-foreground grid place-items-center">
                    <Package className="size-4" />
                  </div>
                  <div>
                    <div className="font-semibold">{s.id}</div>
                    <div className="text-xs text-muted-foreground">{s.customerName}</div>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground inline-flex items-center gap-1"><Clock className="size-3" /> {s.eta}</span>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2"><MapPin className="size-3.5 text-teal" /> {s.pickupAddress}</div>
                <div className="flex items-center gap-2"><MapPin className="size-3.5 text-orange" /> {s.dropoffAddress}</div>
              </div>

              <div className="mt-3 grid grid-cols-4 rounded-lg border border-border bg-surface-2 divide-x divide-border text-center text-xs">
                <div className="p-2"><div className="text-muted-foreground">Commodity</div><div className="font-medium mt-0.5 truncate">{s.commodity}</div></div>
                <div className="p-2"><div className="text-muted-foreground">Package</div><div className="font-medium mt-0.5">{s.packageType}</div></div>
                <div className="p-2"><div className="text-muted-foreground">Weight</div><div className="font-medium mt-0.5 tabular-nums">{s.weight}</div></div>
                <div className="p-2"><div className="text-muted-foreground">Qty</div><div className="font-medium mt-0.5 tabular-nums">{s.quantity}</div></div>
              </div>

              {s.specialInstructions && (
                <p className="mt-3 text-xs rounded-md bg-accent/40 border border-border p-2">
                  <span className="font-medium">Handling: </span>{s.specialInstructions}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
