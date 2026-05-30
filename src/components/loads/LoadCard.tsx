import {
  MapPin,
  Truck,
  Package,
  Clock,
  DollarSign,
  Eye,
  UserPlus,
  Send,
  MessageSquare,
  Map,
  Flame,
  AlertTriangle,
  Weight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Load } from "@/types/loads";
import { STATUS_COLORS, PRIORITY_COLORS, PRIORITY_LABELS } from "@/types/loads";

interface Props {
  load: Load;
  onView: (load: Load) => void;
  onAssign: (load: Load) => void;
  onOffer: (load: Load) => void;
}

function formatWindow(start?: string | null, end?: string | null): string {
  if (!start) return "";
  const s = new Date(start);
  const now = new Date();
  const diffH = (s.getTime() - now.getTime()) / 3600000;
  if (diffH < 0) return "Overdue";
  if (diffH < 1) return `${Math.round(diffH * 60)}m`;
  if (diffH < 24) return `${diffH.toFixed(1)}h`;
  return s.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  void end;
}

export function LoadCard({ load, onView, onAssign, onOffer }: Props) {
  const statusColor = STATUS_COLORS[load.status] ?? "#94a3b8";
  const priorityColor = PRIORITY_COLORS[load.priority] ?? "#64748b";
  const isUrgent = load.priority === "urgent" || load.priority === "high";

  return (
    <div
      className={cn(
        "group relative rounded-xl border bg-white dark:bg-[#0f1a2e] shadow-sm",
        "hover:shadow-md transition-all cursor-pointer select-none",
        isUrgent
          ? "border-orange-300/60 dark:border-orange-500/30"
          : "border-slate-200 dark:border-[#1e3a5f]",
      )}
      onClick={() => onView(load)}
    >
      {/* Priority stripe */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl"
        style={{ backgroundColor: priorityColor }}
      />

      <div className="pl-3 pr-3 pt-2.5 pb-2">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-[11px] font-bold text-slate-800 dark:text-slate-100 font-mono">
              {load.load_number}
            </span>
            {/* Status badge */}
            <span
              className="inline-flex items-center rounded-full px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide"
              style={{ backgroundColor: statusColor + "22", color: statusColor }}
            >
              {load.status.replace("_", " ")}
            </span>
            {isUrgent && (
              <span className="inline-flex items-center gap-0.5 rounded-full bg-orange-100 dark:bg-orange-500/15 text-orange-600 dark:text-orange-400 px-1.5 py-0.5 text-[9px] font-bold uppercase">
                <Flame className="size-2.5" />
                {PRIORITY_LABELS[load.priority]}
              </span>
            )}
          </div>
          {load.rate && (
            <span className="text-[11px] font-bold text-teal-600 dark:text-teal-400 tabular-nums shrink-0">
              ${load.rate.toLocaleString()}
            </span>
          )}
        </div>

        {/* Customer */}
        {load.customer_name && (
          <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate mb-1.5">
            {load.customer_name}
            {load.broker_name ? ` · ${load.broker_name}` : ""}
          </div>
        )}

        {/* Route */}
        <div className="flex items-center gap-1.5 mb-1.5">
          <div className="flex flex-col items-center gap-0.5 shrink-0">
            <span className="size-1.5 rounded-full bg-teal-500" />
            <span className="w-px h-2.5 bg-slate-300 dark:bg-slate-600" />
            <span className="size-1.5 rounded-full bg-orange-500" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[11px] font-medium text-slate-700 dark:text-slate-300 truncate leading-tight">
              {load.pickup_city}, {load.pickup_state}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate leading-tight">
              {load.dropoff_city}, {load.dropoff_state}
            </div>
          </div>
          {load.pickup_window_start && (
            <div className="shrink-0 flex items-center gap-0.5 text-[9px] text-amber-600 dark:text-amber-400 font-semibold">
              <Clock className="size-2.5" />
              {formatWindow(load.pickup_window_start)}
            </div>
          )}
        </div>

        {/* Metadata pills */}
        <div className="flex flex-wrap gap-1 mb-2">
          {load.equipment_type && (
            <span className="inline-flex items-center gap-0.5 text-[9px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/60 rounded px-1.5 py-0.5">
              <Truck className="size-2.5" />
              {load.equipment_type}
            </span>
          )}
          {load.commodity && (
            <span className="inline-flex items-center gap-0.5 text-[9px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/60 rounded px-1.5 py-0.5">
              <Package className="size-2.5" />
              {load.commodity}
            </span>
          )}
          {load.weight_lbs && (
            <span className="inline-flex items-center gap-0.5 text-[9px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/60 rounded px-1.5 py-0.5">
              <Weight className="size-2.5" />
              {load.weight_lbs.toLocaleString()} lbs
            </span>
          )}
          {load.miles && (
            <span className="inline-flex items-center gap-0.5 text-[9px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/60 rounded px-1.5 py-0.5">
              <MapPin className="size-2.5" />
              {load.miles.toLocaleString()} mi
            </span>
          )}
          {load.rate && load.miles && load.miles > 0 && (
            <span className="inline-flex items-center gap-0.5 text-[9px] text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-500/10 rounded px-1.5 py-0.5">
              <DollarSign className="size-2.5" />
              {(load.rate / load.miles).toFixed(2)}/mi
            </span>
          )}
        </div>

        {/* Driver / unassigned */}
        {load.assigned_driver_name ? (
          <div className="flex items-center gap-1.5 mb-2">
            <div className="size-5 rounded-full bg-gradient-to-br from-teal-500 to-orange-500 flex items-center justify-center text-white text-[8px] font-bold shrink-0">
              {load.assigned_driver_name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </div>
            <span className="text-[10px] font-medium text-slate-700 dark:text-slate-300 truncate">
              {load.assigned_driver_name}
            </span>
            {load.assigned_unit_number && (
              <span className="text-[9px] text-slate-400 shrink-0">
                · {load.assigned_unit_number}
              </span>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-1 mb-2">
            <AlertTriangle className="size-3 text-amber-500" />
            <span className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">
              Unassigned
            </span>
          </div>
        )}

        {/* Action buttons */}
        <div
          className="flex items-center gap-1 pt-1 border-t border-slate-100 dark:border-slate-800"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => onView(load)}
            className="flex items-center gap-1 text-[9px] font-semibold text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 px-1.5 py-1 rounded hover:bg-teal-50 dark:hover:bg-teal-500/10 transition-colors"
          >
            <Eye className="size-2.5" /> View
          </button>
          <button
            onClick={() => onAssign(load)}
            className="flex items-center gap-1 text-[9px] font-semibold text-slate-500 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 px-1.5 py-1 rounded hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-colors"
          >
            <UserPlus className="size-2.5" /> Assign
          </button>
          <button
            onClick={() => onOffer(load)}
            className="flex items-center gap-1 text-[9px] font-semibold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 px-1.5 py-1 rounded hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors"
          >
            <Send className="size-2.5" /> Offer
          </button>
          <button
            onClick={() => onView(load)}
            className="flex items-center gap-1 text-[9px] font-semibold text-slate-500 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 px-1.5 py-1 rounded hover:bg-purple-50 dark:hover:bg-purple-500/10 transition-colors"
          >
            <MessageSquare className="size-2.5" /> Chat
          </button>
          <button
            onClick={() => onView(load)}
            className="flex items-center gap-1 text-[9px] font-semibold text-slate-500 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-400 px-1.5 py-1 rounded hover:bg-green-50 dark:hover:bg-green-500/10 transition-colors ml-auto"
          >
            <Map className="size-2.5" /> Map
          </button>
        </div>
      </div>
    </div>
  );
}
