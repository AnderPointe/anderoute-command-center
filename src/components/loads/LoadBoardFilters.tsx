import { Filter, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { KANBAN_COLUMNS } from "@/types/loads";
import type { LoadFilters, LoadStatus, LoadPriority } from "@/types/loads";

interface Props {
  filters: LoadFilters;
  onChange: (filters: LoadFilters) => void;
}

const EQUIPMENT_TYPES = [
  "Box Truck",
  "Dry Van",
  "Reefer",
  "Flatbed",
  "Hotshot",
  "Cargo Van",
  "Step Deck",
  "Power Only",
  "CDL Freight",
];
const US_STATES = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

export function LoadBoardFilters({ filters, onChange }: Props) {
  const [open, setOpen] = useState(false);

  const set = <K extends keyof LoadFilters>(key: K, value: LoadFilters[K]) =>
    onChange({ ...filters, [key]: value });

  const hasActive =
    filters.status ||
    filters.priority ||
    filters.equipment_type ||
    filters.pickup_state ||
    filters.dropoff_state ||
    filters.high_priority_only ||
    filters.unassigned_only;

  const reset = () =>
    onChange({
      search: filters.search,
      status: "",
      priority: "",
      equipment_type: "",
      pickup_state: "",
      dropoff_state: "",
      assigned_driver_id: "",
      high_priority_only: false,
      unassigned_only: false,
    });

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl border transition-colors",
          hasActive
            ? "bg-teal-50 dark:bg-teal-500/15 border-teal-300 dark:border-teal-500/40 text-teal-700 dark:text-teal-300"
            : "bg-white dark:bg-[#0f1a2e] border-slate-200 dark:border-[#1e3a5f] text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600",
        )}
      >
        <Filter className="size-3.5" />
        Filters
        {hasActive && (
          <span className="min-w-4 h-4 rounded-full bg-teal-600 dark:bg-teal-500 text-white text-[9px] font-bold flex items-center justify-center px-1">
            ●
          </span>
        )}
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1.5 z-40 w-80 rounded-2xl border border-slate-200 dark:border-[#1e3a5f] bg-white dark:bg-[#0b1526] shadow-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
              Filter Loads
            </span>
            <div className="flex items-center gap-2">
              {hasActive && (
                <button
                  onClick={reset}
                  className="text-[10px] text-teal-600 dark:text-teal-400 hover:underline"
                >
                  Clear all
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="size-3.5" />
              </button>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => set("status", e.target.value as LoadStatus | "")}
              className="mt-1 w-full rounded-lg border border-slate-200 dark:border-[#1e3a5f] bg-slate-50 dark:bg-[#0f1a2e] text-xs text-slate-700 dark:text-slate-200 px-2 py-1.5 outline-none"
            >
              <option value="">All statuses</option>
              {KANBAN_COLUMNS.map((c) => (
                <option key={c.status} value={c.status}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Priority
            </label>
            <select
              value={filters.priority}
              onChange={(e) => set("priority", e.target.value as LoadPriority | "")}
              className="mt-1 w-full rounded-lg border border-slate-200 dark:border-[#1e3a5f] bg-slate-50 dark:bg-[#0f1a2e] text-xs text-slate-700 dark:text-slate-200 px-2 py-1.5 outline-none"
            >
              <option value="">All priorities</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="normal">Normal</option>
              <option value="low">Low</option>
            </select>
          </div>

          {/* Equipment */}
          <div>
            <label className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Equipment Type
            </label>
            <select
              value={filters.equipment_type}
              onChange={(e) => set("equipment_type", e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 dark:border-[#1e3a5f] bg-slate-50 dark:bg-[#0f1a2e] text-xs text-slate-700 dark:text-slate-200 px-2 py-1.5 outline-none"
            >
              <option value="">All equipment</option>
              {EQUIPMENT_TYPES.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </div>

          {/* States */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Pickup State
              </label>
              <select
                value={filters.pickup_state}
                onChange={(e) => set("pickup_state", e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 dark:border-[#1e3a5f] bg-slate-50 dark:bg-[#0f1a2e] text-xs text-slate-700 dark:text-slate-200 px-2 py-1.5 outline-none"
              >
                <option value="">Any</option>
                {US_STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Drop-off State
              </label>
              <select
                value={filters.dropoff_state}
                onChange={(e) => set("dropoff_state", e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 dark:border-[#1e3a5f] bg-slate-50 dark:bg-[#0f1a2e] text-xs text-slate-700 dark:text-slate-200 px-2 py-1.5 outline-none"
              >
                <option value="">Any</option>
                {US_STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick toggles */}
          <div className="space-y-1.5 pt-1 border-t border-slate-100 dark:border-[#1e3a5f]">
            {[
              { key: "high_priority_only", label: "High priority only" },
              { key: "unassigned_only", label: "Unassigned only" },
            ].map(({ key, label }) => (
              <label key={key} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters[key as keyof LoadFilters] as boolean}
                  onChange={(e) =>
                    set(key as keyof LoadFilters, e.target.checked as LoadFilters[typeof key])
                  }
                  className="rounded border-slate-300 dark:border-slate-600 text-teal-600"
                />
                <span className="text-xs text-slate-600 dark:text-slate-300">{label}</span>
              </label>
            ))}
          </div>

          <button
            onClick={() => setOpen(false)}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold py-2 rounded-xl transition-colors"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
}
