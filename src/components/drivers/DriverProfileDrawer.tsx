import type { Driver } from "@/types";
import { DriverStatusBadge } from "@/components/drivers/DriverStatusBadge";
import { VehicleTypeBadge } from "@/components/fleet/VehicleTypeBadge";
import {
  X,
  Phone,
  MessageSquare,
  MapPin,
  Gauge,
  Fuel,
  Clock,
  ShieldCheck,
  Package,
  TrendingUp,
} from "lucide-react";
import { loads, shipments } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function DriverProfileDrawer({
  driver,
  onClose,
}: {
  driver: Driver | null;
  onClose: () => void;
}) {
  const load = loads.find((l) => l.id === driver?.currentLoadId);
  const shipment = shipments.find((s) => s.id === driver?.activeShipmentId);

  return (
    <AnimatePresence>
      {driver && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-40"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 240 }}
            className="fixed top-0 right-0 h-screen w-full sm:w-[480px] z-50 bg-card border-l border-border overflow-y-auto"
          >
            <div className="sticky top-0 bg-card border-b border-border z-10 p-4 flex items-center gap-3">
              <div className="size-11 rounded-full bg-gradient-to-br from-teal to-orange grid place-items-center text-white font-semibold">
                {driver.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="font-semibold truncate">{driver.name}</h2>
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded border border-border bg-secondary">
                    {driver.licenseType}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <DriverStatusBadge status={driver.status} size="xs" />
                  <VehicleTypeBadge type={driver.vehicleType} />
                </div>
              </div>
              <button onClick={onClose} className="size-9 rounded-md grid place-items-center hover:bg-secondary">
                <X className="size-4" />
              </button>
            </div>

            <div className="p-4 grid grid-cols-2 gap-3">
              <Metric icon={Gauge} label="Speed" value={`${driver.currentSpeed} mph`} />
              <Metric icon={Clock} label="ETA" value={driver.eta ?? "—"} />
              <Metric icon={Fuel} label="Avg MPG" value={driver.averageMpg.toString()} />
              <Metric icon={TrendingUp} label="On-time" value={`${driver.onTimePercentage}%`} />
              <Metric icon={ShieldCheck} label="Safety" value={driver.safetyScore.toString()} />
              <Metric icon={MapPin} label="Today" value={`${driver.milesToday} mi`} />
            </div>

            <div className="px-4 flex gap-2">
              <Button variant="outline" className="flex-1 gap-2"><Phone className="size-4" /> Call</Button>
              <Button variant="outline" className="flex-1 gap-2"><MessageSquare className="size-4" /> Message</Button>
            </div>

            <section className="p-4 mt-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Current Assignment
              </h3>
              {load ? (
                <div className="rounded-lg border border-border bg-surface-2 p-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{load.id}</span>
                    <span className="text-xs text-muted-foreground">{load.customer}</span>
                  </div>
                  <div className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-xs">
                    <span className="text-muted-foreground">Pickup</span>
                    <span>{load.pickupLocation}</span>
                    <span className="text-muted-foreground">Drop-off</span>
                    <span>{load.dropoffLocation}</span>
                    <span className="text-muted-foreground">Distance</span>
                    <span>{load.estimatedMiles} mi · {load.estimatedDuration}</span>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No active load.</p>
              )}
            </section>

            {shipment && (
              <section className="p-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-2">
                  <Package className="size-3.5" /> Shipment
                </h3>
                <div className="rounded-lg border border-border bg-surface-2 p-3 text-xs grid grid-cols-2 gap-y-1.5">
                  <span className="text-muted-foreground">ID</span><span>{shipment.id}</span>
                  <span className="text-muted-foreground">Commodity</span><span>{shipment.commodity}</span>
                  <span className="text-muted-foreground">Package</span><span>{shipment.packageType}</span>
                  <span className="text-muted-foreground">Weight</span><span>{shipment.weight} lb</span>
                  <span className="text-muted-foreground">Qty</span><span>{shipment.quantity}</span>
                </div>
                {shipment.specialInstructions && (
                  <div className="mt-2 text-xs text-foreground/80 rounded-md bg-accent/40 border border-border p-2">
                    <span className="font-medium">Note: </span>{shipment.specialInstructions}
                  </div>
                )}
              </section>
            )}

            <section className="p-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Activity Timeline
              </h3>
              <ol className="space-y-3 text-sm">
                {[
                  { time: driver.lastUpdated, label: `Status update · ${driver.status}` },
                  { time: "12m ago", label: "GPS ping received" },
                  { time: "34m ago", label: "Speed adjusted to 62 mph" },
                  { time: "1h ago", label: "Departed pickup facility" },
                  { time: "2h ago", label: "Load accepted" },
                ].map((e, i) => (
                  <li key={i} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <span className="size-2 rounded-full bg-teal" />
                      <span className="w-px flex-1 bg-border mt-1" />
                    </div>
                    <div className="pb-1 flex-1">
                      <div className="text-foreground">{e.label}</div>
                      <div className="text-xs text-muted-foreground">{e.time}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-surface-2 p-3">
      <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground uppercase tracking-wider">
        <Icon className="size-3" />
        {label}
      </div>
      <div className="mt-1 text-base font-semibold tabular-nums">{value}</div>
    </div>
  );
}
