/**
 * MapLayerControlPanel — floating layer toggle panel for the Anderoute map.
 * Appears on the top-right of the map.
 */

import { useState } from "react";
import {
  Layers,
  ChevronDown,
  ChevronUp,
  Truck,
  Package,
  MapPin,
  Building2,
  Fuel,
  Wrench,
  PlaneTakeoff,
  Ship,
  Train,
  Store,
  Star,
  Waves,
  Pin,
  Shield,
  Box,
  CloudRain,
  Zap,
  Users,
  Navigation,
  Warehouse,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { LayerKey, MapLayerState } from "@/types/map";

interface Props {
  layers: MapLayerState[];
  onToggle: (key: LayerKey) => void;
}

const LAYER_ICONS: Record<LayerKey, React.ElementType> = {
  drivers: Truck,
  loads: Package,
  pickups: Navigation,
  dropoffs: MapPin,
  depots: Building2,
  warehouses: Warehouse,
  customers: Users,
  truck_stops: Truck,
  fuel: Fuel,
  maintenance: Wrench,
  airports: PlaneTakeoff,
  ports: Ship,
  rail_yards: Train,
  stores: Store,
  landmarks: Star,
  lakes: Waves,
  rivers: Waves,
  custom_pins: Pin,
  geofences: Shield,
  buildings_3d: Box,
  traffic: Zap,
  weather: CloudRain,
};

const GROUP_ORDER = ["Fleet", "Locations", "Infrastructure", "Environment", "Other", "Map"];

function groupLayers(layers: MapLayerState[]): Record<string, MapLayerState[]> {
  const groups: Record<string, MapLayerState[]> = {};
  for (const l of layers) {
    if (!groups[l.group]) groups[l.group] = [];
    groups[l.group].push(l);
  }
  return groups;
}

export function MapLayerControlPanel({ layers, onToggle }: Props) {
  const [open, setOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(["Fleet", "Locations"]),
  );

  const toggleGroup = (g: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(g)) {
        next.delete(g);
      } else {
        next.add(g);
      }
      return next;
    });
  };

  const grouped = groupLayers(layers);
  const enabledCount = layers.filter((l) => l.enabled).length;

  return (
    <div className="absolute top-3 right-3 z-30 flex flex-col items-end gap-2">
      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold shadow-lg transition-all",
          "bg-[#0f1a2e]/95 border-[#1e3a5f] text-slate-200 backdrop-blur-md",
          "hover:bg-[#1a2840] hover:border-teal-500/40",
          open && "border-teal-500/60 bg-[#1a2840]",
        )}
      >
        <Layers className="size-3.5 text-teal-400" />
        <span>Layers</span>
        <span className="rounded-full bg-teal-500/20 px-1.5 py-0.5 text-[10px] text-teal-300">
          {enabledCount}
        </span>
        {open ? (
          <ChevronUp className="size-3 text-slate-400" />
        ) : (
          <ChevronDown className="size-3 text-slate-400" />
        )}
      </button>

      {/* Panel */}
      {open && (
        <div
          className="w-52 rounded-2xl border border-[#1e3a5f] bg-[#0b1526]/97 shadow-2xl backdrop-blur-xl overflow-hidden"
          style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(20,184,166,0.1)" }}
        >
          <div className="border-b border-[#1e3a5f] px-3 py-2.5">
            <span className="text-[11px] font-bold uppercase tracking-widest text-teal-400">
              Map Layers
            </span>
          </div>

          <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-700">
            {GROUP_ORDER.filter((g) => grouped[g]).map((group) => (
              <div key={group}>
                {/* Group header */}
                <button
                  onClick={() => toggleGroup(group)}
                  className="flex w-full items-center justify-between px-3 py-1.5 hover:bg-white/5"
                >
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    {group}
                  </span>
                  {expandedGroups.has(group) ? (
                    <ChevronUp className="size-2.5 text-slate-600" />
                  ) : (
                    <ChevronDown className="size-2.5 text-slate-600" />
                  )}
                </button>

                {/* Layer rows */}
                {expandedGroups.has(group) && (
                  <div className="pb-1">
                    {grouped[group].map((layer) => {
                      const Icon = LAYER_ICONS[layer.key] ?? MapPin;
                      return (
                        <button
                          key={layer.key}
                          onClick={() => onToggle(layer.key)}
                          className={cn(
                            "flex w-full items-center gap-2.5 px-3 py-1.5 transition-all",
                            "hover:bg-white/5",
                            layer.enabled ? "opacity-100" : "opacity-40",
                          )}
                        >
                          {/* Toggle pill */}
                          <div
                            className={cn(
                              "relative h-3.5 w-6 rounded-full transition-all",
                              layer.enabled ? "bg-teal-500" : "bg-slate-700",
                            )}
                          >
                            <div
                              className={cn(
                                "absolute top-0.5 size-2.5 rounded-full bg-white shadow transition-all",
                                layer.enabled ? "left-3" : "left-0.5",
                              )}
                            />
                          </div>
                          <Icon
                            className={cn(
                              "size-3 shrink-0 transition-colors",
                              layer.enabled ? "text-teal-400" : "text-slate-600",
                            )}
                          />
                          <span
                            className={cn(
                              "text-[11px] font-medium transition-colors",
                              layer.enabled ? "text-slate-200" : "text-slate-600",
                            )}
                          >
                            {layer.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer note */}
          <div className="border-t border-[#1e3a5f] px-3 py-2">
            <p className="text-[9px] text-slate-600 leading-tight">
              {/* The map style controls which road layers are visible. A production Anderoute
               logistics style should emphasize highways, interstates, industrial roads,
               warehouses, ports, airports, and truck routes. */}
              Truck routes & highway emphasis active
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
