import { Package } from "lucide-react";
import { LoadCard } from "./LoadCard";
import type { Load, KanbanColumn } from "@/types/loads";

interface Props {
  column: KanbanColumn;
  loads: Load[];
  onView: (load: Load) => void;
  onAssign: (load: Load) => void;
  onOffer: (load: Load) => void;
}

export function LoadKanbanColumn({ column, loads, onView, onAssign, onOffer }: Props) {
  const revenue = loads.reduce((sum, l) => sum + (l.rate ?? 0), 0);

  return (
    <div className="flex flex-col w-64 shrink-0 rounded-xl border border-slate-200 dark:border-[#1e3a5f] bg-slate-50 dark:bg-[#080f1d]/80 overflow-hidden">
      {/* Column header */}
      <div
        className="px-3 py-2.5 border-b border-slate-200 dark:border-[#1e3a5f]"
        style={{ borderTopWidth: 3, borderTopColor: column.color }}
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
            {column.label}
          </span>
          <span
            className="min-w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
            style={{ backgroundColor: column.color + "25", color: column.color }}
          >
            {loads.length}
          </span>
        </div>
        {revenue > 0 && (
          <div className="text-[9px] text-slate-400 dark:text-slate-500 mt-0.5">
            ${revenue.toLocaleString()} total
          </div>
        )}
      </div>

      {/* Load cards */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2 min-h-24 max-h-[calc(100vh-280px)]">
        {loads.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <Package className="size-6 text-slate-300 dark:text-slate-600 mb-1.5" />
            <span className="text-[10px] text-slate-400 dark:text-slate-600">No loads</span>
          </div>
        ) : (
          loads.map((load) => (
            <LoadCard
              key={load.id}
              load={load}
              onView={onView}
              onAssign={onAssign}
              onOffer={onOffer}
            />
          ))
        )}
      </div>
    </div>
  );
}
