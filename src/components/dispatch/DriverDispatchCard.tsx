import { Phone, Crosshair, MapPin, ClipboardList } from "lucide-react";
import type { DispatchDriver } from "@/types/dispatch";
import { DRIVER_STATUS_COLOR, DRIVER_STATUS_LABEL } from "./dispatchTokens";

interface Props {
  driver: DispatchDriver;
  selected: boolean;
  onSelect: () => void;
  onCenter: () => void;
  onCall: () => void;
}

export function DriverDispatchCard({ driver, selected, onSelect, onCenter, onCall }: Props) {
  const color = DRIVER_STATUS_COLOR[driver.status];
  const initials = (driver.driver_name || "??")
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("");

  return (
    <div
      onClick={onSelect}
      className={`group cursor-pointer border-l-2 px-3 py-3 transition hover:bg-slate-50 ${
        selected ? "border-l-teal-500 bg-teal-50/60" : "border-l-transparent"
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Avatar with status ring */}
        <div className="relative shrink-0">
          {driver.avatar_url ? (
            <img
              src={driver.avatar_url}
              alt={driver.driver_name ?? ""}
              className="size-11 rounded-full object-cover"
              style={{ boxShadow: `0 0 0 2px ${color}` }}
            />
          ) : (
            <div
              className="grid size-11 place-items-center rounded-full text-[12px] font-bold text-white"
              style={{ background: color, boxShadow: `0 0 0 2px ${color}` }}
            >
              {initials}
            </div>
          )}
        </div>

        {/* Main column */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="truncate text-[13px] font-semibold text-slate-900">
              {driver.driver_name}
            </span>
            <span
              className="ml-auto rounded-full px-1.5 py-px text-[9px] font-semibold uppercase tracking-wider"
              style={{ background: `${color}1f`, color }}
            >
              {DRIVER_STATUS_LABEL[driver.status]}
            </span>
          </div>
          <div className="mt-0.5 text-[11px] text-slate-500">
            {driver.shift_start && driver.shift_end
              ? `${driver.shift_start} – ${driver.shift_end}`
              : `Unit ${driver.unit_number} · ${driver.vehicle_type}`}
          </div>

          {(driver.pickup_address || driver.city) && (
            <div className="mt-1.5 flex items-start gap-1.5 text-[11px] text-slate-600">
              <MapPin className="mt-0.5 size-3 shrink-0 text-slate-400" />
              <span className="truncate">{driver.pickup_address ?? driver.city}</span>
            </div>
          )}
          {driver.current_load_number && (
            <div className="mt-1 flex items-start gap-1.5 text-[11px] text-slate-600">
              <ClipboardList className="mt-0.5 size-3 shrink-0 text-slate-400" />
              <span className="truncate">
                <span className="font-medium text-slate-800">PMA Fall Inspection</span>
                <span className="block text-[10px] text-slate-500">
                  #J{driver.current_load_number} · Lions Dane Inc.
                </span>
              </span>
            </div>
          )}
        </div>

        {/* Right-side icon actions */}
        <div className="flex shrink-0 flex-col items-center gap-1.5 pt-0.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCall();
            }}
            title="Call"
            className="grid size-7 place-items-center rounded-md border border-slate-200 bg-white text-teal-600 transition hover:border-teal-400 hover:bg-teal-50"
          >
            <Phone className="size-3.5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCenter();
            }}
            title="Center on map"
            className="grid size-7 place-items-center rounded-md border border-slate-200 bg-white text-slate-500 transition hover:border-orange-400 hover:text-orange-600"
          >
            <Crosshair className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
