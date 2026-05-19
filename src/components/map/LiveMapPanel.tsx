import { motion } from "framer-motion";
import { drivers, statusMeta } from "@/data/mock";
import type { Driver } from "@/types";
import { Layers, Navigation, Eye, Zap, Users, Truck } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

// Project lat/lng across continental US into a 0..1 box
function project(lat: number, lng: number) {
  const minLat = 24,
    maxLat = 49;
  const minLng = -125,
    maxLng = -66;
  const x = (lng - minLng) / (maxLng - minLng);
  const y = 1 - (lat - minLat) / (maxLat - minLat);
  return { x: Math.max(0.02, Math.min(0.98, x)), y: Math.max(0.05, Math.min(0.95, y)) };
}

const toggles = [
  { id: "routes", label: "Routes", icon: Navigation },
  { id: "traffic", label: "Traffic", icon: Zap },
  { id: "heat", label: "Heatmap", icon: Layers },
  { id: "cluster", label: "Cluster", icon: Users },
];

export function LiveMapPanel({
  onSelectDriver,
  selectedId,
  className,
  compact = false,
}: {
  onSelectDriver?: (d: Driver) => void;
  selectedId?: string | null;
  className?: string;
  compact?: boolean;
}) {
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [active, setActive] = useState<Record<string, boolean>>({ routes: true });

  const filtered = drivers.filter(
    (d) => !statusFilter || d.status === statusFilter,
  );

  return (
    <div
      className={cn(
        "relative rounded-xl border border-border bg-card overflow-hidden",
        className,
      )}
    >
      {/* Map surface */}
      <div className="absolute inset-0 map-grid map-radial bg-surface-2" />

      {/* Decorative route lines */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="routeGrad" x1="0" x2="1">
            <stop offset="0%" stopColor="var(--teal)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="var(--orange)" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        {active.routes &&
          filtered
            .filter((d) => d.currentLoadId)
            .map((d, i) => {
              const p = project(d.currentLocation.lat, d.currentLocation.lng);
              const target = project(
                d.currentLocation.lat + (Math.sin(i) * 3),
                d.currentLocation.lng + (Math.cos(i) * 5),
              );
              return (
                <path
                  key={d.id}
                  d={`M ${p.x * 100} ${p.y * 100} Q ${(p.x + target.x) * 50} ${(p.y + target.y) * 50 - 6} ${target.x * 100} ${target.y * 100}`}
                  stroke="url(#routeGrad)"
                  strokeWidth="0.35"
                  fill="none"
                  strokeDasharray="0.8 0.6"
                />
              );
            })}
      </svg>

      {/* Top toolbar */}
      <div className="relative z-10 flex flex-wrap items-center gap-2 p-3">
        <div className="flex flex-wrap items-center gap-1.5 bg-surface/85 backdrop-blur rounded-lg border border-border p-1">
          <button
            onClick={() => setStatusFilter(null)}
            className={cn(
              "text-xs px-2.5 py-1 rounded-md",
              !statusFilter ? "bg-teal text-teal-foreground" : "text-foreground/70 hover:bg-secondary",
            )}
          >
            All ({drivers.length})
          </button>
          {(Object.keys(statusMeta) as Array<keyof typeof statusMeta>).slice(0, 6).map((s) => {
            const count = drivers.filter((d) => d.status === s).length;
            if (!count) return null;
            return (
              <button
                key={s}
                onClick={() => setStatusFilter(s === statusFilter ? null : s)}
                className={cn(
                  "text-xs px-2 py-1 rounded-md inline-flex items-center gap-1.5",
                  statusFilter === s ? "bg-secondary" : "hover:bg-secondary/50",
                )}
              >
                <span
                  className="size-1.5 rounded-full"
                  style={{ backgroundColor: `var(--${statusMeta[s].token})` }}
                />
                {statusMeta[s].label}
                <span className="text-muted-foreground">{count}</span>
              </button>
            );
          })}
        </div>

        <div className="ml-auto flex items-center gap-1 bg-surface/85 backdrop-blur rounded-lg border border-border p-1">
          {toggles.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setActive((a) => ({ ...a, [t.id]: !a[t.id] }))}
                className={cn(
                  "text-xs px-2 py-1 rounded-md inline-flex items-center gap-1.5",
                  active[t.id]
                    ? "bg-teal text-teal-foreground"
                    : "text-foreground/70 hover:bg-secondary",
                )}
              >
                <Icon className="size-3.5" />
                {!compact && t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Driver markers */}
      <div className="absolute inset-0">
        {filtered.map((d) => {
          const p = project(d.currentLocation.lat, d.currentLocation.lng);
          const color = `var(--${statusMeta[d.status].token})`;
          const selected = selectedId === d.id;
          return (
            <button
              key={d.id}
              onClick={() => onSelectDriver?.(d)}
              className="absolute -translate-x-1/2 -translate-y-1/2 group"
              style={{ left: `${p.x * 100}%`, top: `${p.y * 100}%` }}
            >
              <motion.span
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: color, opacity: 0.3 }}
                animate={{ scale: [1, 2.2, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 2.4, repeat: Infinity }}
              />
              <div
                className={cn(
                  "relative size-3.5 rounded-full ring-2 ring-surface shadow",
                  selected && "size-4 ring-4",
                )}
                style={{ backgroundColor: color }}
              />
              <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap rounded-md border border-border bg-popover px-2 py-1.5 text-[11px] shadow-md min-w-40 text-left">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium">{d.name}</span>
                  <span className="text-muted-foreground">{d.cdlStatus ? "CDL" : "Non-CDL"}</span>
                </div>
                <div className="mt-0.5 flex items-center gap-1.5 text-muted-foreground">
                  <Truck className="size-3" /> {d.vehicleType}
                </div>
                <div className="mt-0.5 flex items-center justify-between gap-2 text-muted-foreground">
                  <span>{d.currentSpeed} mph</span>
                  <span>ETA {d.eta ?? "—"}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Bottom-right scale */}
      <div className="absolute bottom-3 right-3 z-10 flex items-center gap-2 rounded-md border border-border bg-surface/85 backdrop-blur px-2.5 py-1 text-[10px] text-muted-foreground">
        <Eye className="size-3" />
        Live · {filtered.length} units
        <span className="ml-2 size-1.5 rounded-full bg-success animate-pulse" />
      </div>
    </div>
  );
}
