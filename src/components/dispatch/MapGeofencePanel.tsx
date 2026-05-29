/**
 * MapGeofencePanel — shows geofences and allows selecting them.
 */

import { useState } from "react";
import { Shield, ChevronDown, ChevronUp, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MapGeofence } from "@/types/map";

interface Props {
  geofences: MapGeofence[];
  onSelectGeofence: (g: MapGeofence) => void;
  loading?: boolean;
}

const TYPE_LABELS: Record<string, string> = {
  delivery_zone: "Delivery Zone",
  customer_zone: "Customer Zone",
  yard_zone: "Yard Zone",
  restricted: "Restricted",
  airport_zone: "Airport Zone",
  port_zone: "Port Zone",
  warehouse_zone: "Warehouse Zone",
  dispatch_zone: "Dispatch Zone",
  custom: "Custom Zone",
};

export function MapGeofencePanel({ geofences, onSelectGeofence, loading }: Props) {
  const [open, setOpen] = useState(false);
  const activeCount = geofences.filter((g) => g.is_active).length;

  return (
    <div className="absolute bottom-16 right-3 z-30">
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold shadow-lg transition-all",
          "bg-[#0f1a2e]/95 border-[#1e3a5f] text-slate-200 backdrop-blur-md",
          "hover:bg-[#1a2840] hover:border-teal-500/40",
          open && "border-teal-500/60",
        )}
      >
        <Shield className="size-3.5 text-teal-400" />
        <span>Zones</span>
        <span className="rounded-full bg-teal-500/20 px-1.5 py-0.5 text-[10px] text-teal-300">
          {activeCount}
        </span>
        {open ? (
          <ChevronUp className="size-3 text-slate-400" />
        ) : (
          <ChevronDown className="size-3 text-slate-400" />
        )}
      </button>

      {open && (
        <div
          className="absolute bottom-10 right-0 w-64 rounded-2xl border border-[#1e3a5f] bg-[#0b1526]/97 shadow-2xl backdrop-blur-xl overflow-hidden z-40"
          style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.6)" }}
        >
          <div className="border-b border-[#1e3a5f] px-3 py-2.5 flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-widest text-teal-400">
              Geofences & Zones
            </span>
            {loading && <span className="text-[9px] text-slate-500 animate-pulse">Loading…</span>}
          </div>

          <div className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-700">
            {geofences.length === 0 ? (
              <div className="py-6 text-center text-[11px] text-slate-500">
                No geofences configured.
              </div>
            ) : (
              geofences.map((g) => (
                <button
                  key={g.id}
                  onClick={() => onSelectGeofence(g)}
                  className="flex w-full items-start gap-2.5 px-3 py-2.5 text-left hover:bg-white/5 transition-colors"
                >
                  <Circle
                    className="size-3 mt-0.5 shrink-0"
                    style={{ color: g.color, fill: g.color + "40" }}
                  />
                  <div className="min-w-0">
                    <div className="text-[11px] font-semibold text-slate-200 truncate">
                      {g.name}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[9px] text-slate-500">
                        {TYPE_LABELS[g.geofence_type] ?? g.geofence_type}
                      </span>
                      <span
                        className={cn(
                          "inline-flex items-center rounded px-1 py-0.5 text-[8px] font-medium",
                          g.is_active
                            ? "bg-teal-500/20 text-teal-300"
                            : "bg-slate-700 text-slate-500",
                        )}
                      >
                        {g.is_active ? "Active" : "Inactive"}
                      </span>
                    </div>
                    {g.description && (
                      <div className="text-[9px] text-slate-600 truncate mt-0.5">
                        {g.description}
                      </div>
                    )}
                  </div>
                </button>
              ))
            )}
          </div>

          <div className="border-t border-[#1e3a5f] px-3 py-2">
            <p className="text-[9px] text-slate-600">
              Polygon overlays rendered on map. Click a zone for details.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
