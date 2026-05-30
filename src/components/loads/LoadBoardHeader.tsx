import {
  Search,
  Plus,
  Wifi,
  WifiOff,
  Loader2,
  Package,
  Truck,
  CheckCircle,
  AlertTriangle,
  Flame,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Load } from "@/types/loads";
import type { RealtimeStatus } from "@/hooks/useLoads";

interface Props {
  loads: Load[];
  realtimeStatus: RealtimeStatus;
  usingDemo: boolean;
  onSearch: (q: string) => void;
  searchQuery: string;
  onCreateLoad: () => void;
}

function MetricPill({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex flex-col items-center px-3 py-1.5 rounded-lg bg-white dark:bg-[#0f1a2e] border border-slate-200 dark:border-[#1e3a5f] min-w-14">
      <span className="text-base font-bold tabular-nums" style={{ color }}>
        {value}
      </span>
      <span className="text-[9px] text-slate-500 dark:text-slate-400 text-center leading-tight">
        {label}
      </span>
    </div>
  );
}

export function LoadBoardHeader({
  loads,
  realtimeStatus,
  usingDemo,
  onSearch,
  searchQuery,
  onCreateLoad,
}: Props) {
  const open = loads.filter((l) => l.status === "open").length;
  const assigned = loads.filter((l) => l.status === "assigned").length;
  const inProgress = loads.filter((l) =>
    ["pickup", "at_pickup", "loaded", "transit", "at_dropoff"].includes(l.status),
  ).length;
  const deliveredToday = loads.filter((l) => {
    if (l.status !== "delivered") return false;
    const updated = new Date(l.updated_at);
    const now = new Date();
    return (
      updated.getFullYear() === now.getFullYear() &&
      updated.getMonth() === now.getMonth() &&
      updated.getDate() === now.getDate()
    );
  }).length;
  const highPriority = loads.filter((l) => ["high", "urgent"].includes(l.priority)).length;
  const unassigned = loads.filter(
    (l) => !l.assigned_driver_id && l.status !== "delivered" && l.status !== "cancelled",
  ).length;

  return (
    <div className="space-y-3">
      {/* Title row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Load Board
            </h1>
            {usingDemo && (
              <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-full px-2 py-0.5">
                Demo Data
              </span>
            )}
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Logistics command center · Create, assign, track, and deliver loads
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Realtime badge */}
          {realtimeStatus === "connected" ? (
            <div className="flex items-center gap-1.5 text-[10px] font-semibold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-500/10 rounded-full px-2.5 py-1 border border-teal-200 dark:border-teal-500/30">
              <Wifi className="size-3" />
              <span className="size-1.5 rounded-full bg-teal-500 animate-pulse" />
              Realtime
            </div>
          ) : realtimeStatus === "connecting" ? (
            <div className="flex items-center gap-1.5 text-[10px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 rounded-full px-2.5 py-1 border border-amber-200 dark:border-amber-500/30">
              <Loader2 className="size-3 animate-spin" />
              Connecting
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/60 rounded-full px-2.5 py-1 border border-slate-200 dark:border-slate-700">
              <WifiOff className="size-3" />
              Offline
            </div>
          )}

          {/* Create Load */}
          <button
            onClick={onCreateLoad}
            className="flex items-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold px-3 py-2 rounded-xl transition-colors shadow-sm"
          >
            <Plus className="size-3.5" />
            Create Load
          </button>
        </div>
      </div>

      {/* Metrics + Search row */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Metrics */}
        <div className="flex items-center gap-2 flex-wrap">
          <MetricPill label="Open" value={open} color="#94a3b8" />
          <MetricPill label="Assigned" value={assigned} color="#f97316" />
          <MetricPill label="In Progress" value={inProgress} color="#14b8a6" />
          <MetricPill label="Delivered Today" value={deliveredToday} color="#22c55e" />
          <MetricPill label="High Priority" value={highPriority} color="#ef4444" />
          <MetricPill label="Unassigned" value={unassigned} color="#f59e0b" />
        </div>

        {/* Search */}
        <div
          className={cn(
            "flex items-center gap-2 flex-1 min-w-48 max-w-72 rounded-xl border px-3 py-2",
            "bg-white dark:bg-[#0f1a2e] border-slate-200 dark:border-[#1e3a5f]",
            "focus-within:border-teal-400 dark:focus-within:border-teal-500 transition-colors",
          )}
        >
          <Search className="size-3.5 text-slate-400 shrink-0" />
          <input
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search loads, customers, drivers…"
            className="flex-1 bg-transparent text-xs text-slate-700 dark:text-slate-200 placeholder:text-slate-400 outline-none"
          />
        </div>
      </div>

      {/* Quick stats icons */}
      <div className="flex items-center gap-4 text-[10px] text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1">
          <Package className="size-3" />
          {loads.length} total loads
        </span>
        <span className="flex items-center gap-1">
          <Truck className="size-3" />
          {assigned + inProgress} moving
        </span>
        <span className="flex items-center gap-1">
          <CheckCircle className="size-3 text-green-500" />
          {deliveredToday} delivered today
        </span>
        {unassigned > 0 && (
          <span className="flex items-center gap-1 text-amber-500 dark:text-amber-400 font-semibold">
            <AlertTriangle className="size-3" />
            {unassigned} need driver
          </span>
        )}
        {highPriority > 0 && (
          <span className="flex items-center gap-1 text-orange-500 dark:text-orange-400 font-semibold">
            <Flame className="size-3" />
            {highPriority} high priority
          </span>
        )}
      </div>
    </div>
  );
}
