import { Battery, Signal, Truck, Clock, CheckCircle } from "lucide-react";
import { useDriverMatches } from "@/hooks/useDriverMatches";
import { cn } from "@/lib/utils";
import type { DriverMatch } from "@/types/loads";

interface Props {
  onSelect: (driver: DriverMatch) => void;
  selectedDriverId?: string | null;
}

function timeAgo(iso?: string | null): string {
  if (!iso) return "Unknown";
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return `${Math.round(diff)}s ago`;
  if (diff < 3600) return `${Math.round(diff / 60)}m ago`;
  return `${Math.round(diff / 3600)}h ago`;
}

export function LoadDriverMatchPanel({ onSelect, selectedDriverId }: Props) {
  const { drivers, loading } = useDriverMatches();

  if (loading) {
    return (
      <div className="py-8 text-center text-xs text-slate-400 dark:text-slate-500">
        Loading drivers…
      </div>
    );
  }

  const available = drivers.filter((d) => d.is_available);
  const busy = drivers.filter((d) => !d.is_available);

  const renderDriver = (driver: DriverMatch) => {
    const isSelected = driver.driver_id === selectedDriverId;
    return (
      <div
        key={driver.driver_id}
        className={cn(
          "rounded-xl border p-3 cursor-pointer transition-all",
          isSelected
            ? "border-teal-400 dark:border-teal-500 bg-teal-50 dark:bg-teal-500/10"
            : "border-slate-200 dark:border-[#1e3a5f] bg-white dark:bg-[#0f1a2e] hover:border-slate-300 dark:hover:border-slate-600",
        )}
        onClick={() => onSelect(driver)}
      >
        <div className="flex items-start gap-2.5">
          <div className="size-8 rounded-full bg-gradient-to-br from-teal-500 to-orange-500 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
            {driver.driver_name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 truncate">
                {driver.driver_name}
              </span>
              {isSelected && <CheckCircle className="size-3.5 text-teal-500 shrink-0" />}
            </div>
            <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
              {driver.unit_number && (
                <span className="inline-flex items-center gap-0.5 text-[9px] text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 rounded px-1.5 py-0.5">
                  <Truck className="size-2.5" />
                  {driver.unit_number}
                </span>
              )}
              {driver.vehicle_type && (
                <span className="text-[9px] text-slate-400 dark:text-slate-500">
                  {driver.vehicle_type}
                </span>
              )}
              <span
                className="inline-flex items-center rounded-full px-1.5 py-0.5 text-[8px] font-semibold uppercase"
                style={{
                  backgroundColor: driver.is_available ? "#22c55e20" : "#f9731620",
                  color: driver.is_available ? "#22c55e" : "#f97316",
                }}
              >
                {driver.status}
              </span>
            </div>
            <div className="flex items-center gap-3 mt-1">
              <span className="flex items-center gap-0.5 text-[9px] text-slate-400 dark:text-slate-500">
                <Clock className="size-2.5" />
                {timeAgo(driver.last_ping_at)}
              </span>
              {driver.battery_level != null && (
                <span className="flex items-center gap-0.5 text-[9px] text-slate-400 dark:text-slate-500">
                  <Battery className="size-2.5" />
                  {driver.battery_level}%
                </span>
              )}
              {driver.current_load_number && (
                <span className="text-[9px] text-amber-500 dark:text-amber-400">
                  On load: {driver.current_load_number}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {available.length > 0 && (
        <div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 mb-2">
            Available ({available.length})
          </div>
          <div className="space-y-2">{available.map(renderDriver)}</div>
        </div>
      )}
      {busy.length > 0 && (
        <div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
            On Duty ({busy.length})
          </div>
          <div className="space-y-2 opacity-70">{busy.map(renderDriver)}</div>
        </div>
      )}
      {drivers.length === 0 && (
        <div className="py-6 text-center text-xs text-slate-400 dark:text-slate-500">
          <Signal className="size-6 mx-auto mb-2 opacity-40" />
          No drivers found
        </div>
      )}
    </div>
  );
}
