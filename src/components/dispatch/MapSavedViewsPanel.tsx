/**
 * MapSavedViewsPanel — quick-access saved map views panel.
 */

import { useState } from "react";
import { Bookmark, ChevronDown, ChevronUp, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MapSavedView } from "@/types/map";

interface Props {
  views: MapSavedView[];
  currentViewId?: string | null;
  onSelectView: (view: MapSavedView) => void;
  loading?: boolean;
}

const VIEW_ICONS: Record<string, string> = {
  usa: "🇺🇸",
  texas: "⭐",
  dfw: "🏙️",
  active_dispatch: "📡",
  all_drivers: "🚛",
  alerts_only: "⚠️",
  warehouses: "🏗️",
  airports: "✈️",
  truck_stops: "⛽",
};

export function MapSavedViewsPanel({ views, currentViewId, onSelectView, loading }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute top-3 left-80 z-30">
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold shadow-lg transition-all",
          "bg-[#0f1a2e]/95 border-[#1e3a5f] text-slate-200 backdrop-blur-md",
          "hover:bg-[#1a2840] hover:border-teal-500/40",
          open && "border-teal-500/60",
        )}
      >
        <Bookmark className="size-3.5 text-teal-400" />
        <span>Views</span>
        {open ? (
          <ChevronUp className="size-3 text-slate-400" />
        ) : (
          <ChevronDown className="size-3 text-slate-400" />
        )}
      </button>

      {open && (
        <div
          className="absolute top-10 left-0 w-56 rounded-2xl border border-[#1e3a5f] bg-[#0b1526]/97 shadow-2xl backdrop-blur-xl overflow-hidden z-40"
          style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.6)" }}
        >
          <div className="border-b border-[#1e3a5f] px-3 py-2.5 flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-widest text-teal-400">
              Saved Views
            </span>
            {loading && <span className="text-[9px] text-slate-500 animate-pulse">Loading…</span>}
          </div>

          <div className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-700">
            {views.map((view) => {
              const icon = VIEW_ICONS[view.id] ?? "🗺️";
              const isActive = currentViewId === view.id;
              return (
                <button
                  key={view.id}
                  onClick={() => {
                    onSelectView(view);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-start gap-2.5 px-3 py-2.5 text-left transition-colors",
                    "hover:bg-white/5",
                    isActive && "bg-teal-500/10",
                  )}
                >
                  <span className="text-base leading-none mt-0.5">{icon}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1">
                      <span className="text-[11px] font-semibold text-slate-200 truncate">
                        {view.name}
                      </span>
                      {isActive && <Check className="size-2.5 text-teal-400 shrink-0" />}
                    </div>
                    {view.description && (
                      <div className="text-[9px] text-slate-500 truncate mt-0.5">
                        {view.description}
                      </div>
                    )}
                    <div className="text-[9px] text-slate-600 mt-0.5">
                      z{view.zoom.toFixed(1)} · {view.pitch}° pitch
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
