/**
 * MapPoiPanel — shows POI list and allows toggling category filters.
 */

import { useState } from "react";
import { MapPin, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MapPoi, PoiCategory } from "@/types/map";
import { POI_CATEGORY_META } from "./poiHelpers";

interface Props {
  pois: MapPoi[];
  onSelectPoi: (poi: MapPoi) => void;
  activeCategories: Set<PoiCategory>;
  onToggleCategory: (cat: PoiCategory) => void;
  loading?: boolean;
}

export function MapPoiPanel({
  pois,
  onSelectPoi,
  activeCategories,
  onToggleCategory,
  loading,
}: Props) {
  const [open, setOpen] = useState(false);

  const visiblePois = pois.filter((p) => activeCategories.has(p.category));

  return (
    <div className="absolute bottom-16 left-3 z-30 flex flex-col items-start gap-2 max-w-xs">
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold shadow-lg transition-all",
          "bg-[#0f1a2e]/95 border-[#1e3a5f] text-slate-200 backdrop-blur-md",
          "hover:bg-[#1a2840] hover:border-teal-500/40",
          open && "border-teal-500/60",
        )}
      >
        <MapPin className="size-3.5 text-orange-400" />
        <span>POIs</span>
        <span className="rounded-full bg-orange-500/20 px-1.5 py-0.5 text-[10px] text-orange-300">
          {visiblePois.length}
        </span>
        {open ? (
          <ChevronUp className="size-3 text-slate-400" />
        ) : (
          <ChevronDown className="size-3 text-slate-400" />
        )}
      </button>

      {open && (
        <div
          className="w-72 rounded-2xl border border-[#1e3a5f] bg-[#0b1526]/97 shadow-2xl backdrop-blur-xl overflow-hidden"
          style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.6)" }}
        >
          <div className="border-b border-[#1e3a5f] px-3 py-2.5 flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-widest text-orange-400">
              Points of Interest
            </span>
            {loading && <span className="text-[9px] text-slate-500 animate-pulse">Loading…</span>}
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-1 p-2 border-b border-[#1e3a5f]">
            {(Object.keys(POI_CATEGORY_META) as PoiCategory[]).map((cat) => {
              const meta = POI_CATEGORY_META[cat];
              const active = activeCategories.has(cat);
              return (
                <button
                  key={cat}
                  onClick={() => onToggleCategory(cat)}
                  className={cn(
                    "flex items-center gap-1 rounded-lg px-2 py-0.5 text-[10px] font-medium transition-all",
                    active
                      ? "bg-orange-500/20 text-orange-300 border border-orange-500/30"
                      : "bg-slate-800/60 text-slate-600 border border-transparent hover:border-slate-600",
                  )}
                >
                  <span>{meta.emoji}</span>
                  <span>{meta.label}</span>
                </button>
              );
            })}
          </div>

          {/* POI list */}
          <div className="max-h-56 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-700">
            {visiblePois.length === 0 ? (
              <div className="py-6 text-center text-[11px] text-slate-500">
                No POIs match selected categories.
              </div>
            ) : (
              visiblePois.map((poi) => {
                const meta = POI_CATEGORY_META[poi.category] ?? POI_CATEGORY_META.custom;
                return (
                  <button
                    key={poi.id}
                    onClick={() => onSelectPoi(poi)}
                    className="flex w-full items-start gap-2.5 px-3 py-2 hover:bg-white/5 text-left transition-colors"
                  >
                    <span className="text-base leading-none mt-0.5">{meta.emoji}</span>
                    <div className="min-w-0">
                      <div className="text-[11px] font-semibold text-slate-200 truncate">
                        {poi.name}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate">
                        {poi.city ? `${poi.city}, ${poi.state ?? ""}` : poi.category}
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
