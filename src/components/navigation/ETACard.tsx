import { Clock, Gauge, MapPin, AlertTriangle } from "lucide-react";
import { computeETAClock, formatMinutes } from "@/utils/elitenav";

interface Props {
  etaMinutes: number;
  remainingMiles: number;
  currentSpeed: number;
  speedLimit: number;
  delayMin: number;
  deliveryWindow: string;
  trafficLabel: "Clear" | "Light" | "Moderate" | "Heavy";
  big?: boolean;
}

const trafficTone: Record<Props["trafficLabel"], string> = {
  Clear: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
  Light: "bg-teal-500/10 text-teal-300 border-teal-500/30",
  Moderate: "bg-orange-500/10 text-orange-300 border-orange-500/30",
  Heavy: "bg-red-500/10 text-red-300 border-red-500/30",
};

export function ETACard({
  etaMinutes,
  remainingMiles,
  currentSpeed,
  speedLimit,
  delayMin,
  deliveryWindow,
  trafficLabel,
  big = false,
}: Props) {
  const over = currentSpeed > speedLimit;
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0d141a]/85 p-4 backdrop-blur-xl shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)]">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-slate-500">Arrival</div>
          <div className={"font-semibold text-white tracking-tight " + (big ? "text-5xl" : "text-3xl")}>
            {computeETAClock(etaMinutes)}
          </div>
          <div className="mt-0.5 flex items-center gap-2 text-xs text-slate-400">
            <Clock className="h-3 w-3" /> {formatMinutes(etaMinutes)} • {remainingMiles.toFixed(0)} mi
            {delayMin !== 0 && (
              <span className={delayMin > 0 ? "text-orange-300" : "text-emerald-300"}>
                ({delayMin > 0 ? "+" : ""}
                {delayMin}m)
              </span>
            )}
          </div>
        </div>
        <span className={`rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wider ${trafficTone[trafficLabel]}`}>
          {trafficLabel} traffic
        </span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-2.5">
          <div className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-slate-500">
            <Gauge className="h-3 w-3" /> Speed
          </div>
          <div className={`mt-1 text-xl font-semibold ${over ? "text-red-400" : "text-white"}`}>
            {currentSpeed}
            <span className="ml-0.5 text-[10px] font-normal text-slate-500">mph</span>
          </div>
        </div>
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-2.5">
          <div className="text-[10px] uppercase tracking-widest text-slate-500">Limit</div>
          <div className="mt-1 text-xl font-semibold text-white">
            {speedLimit}
            <span className="ml-0.5 text-[10px] font-normal text-slate-500">mph</span>
          </div>
        </div>
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-2.5">
          <div className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-slate-500">
            <MapPin className="h-3 w-3" /> Window
          </div>
          <div className="mt-1 line-clamp-2 text-[11px] leading-tight text-slate-200">{deliveryWindow}</div>
        </div>
      </div>

      {delayMin > 8 && (
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-orange-500/30 bg-orange-500/5 px-2.5 py-2 text-[11px] text-orange-200">
          <AlertTriangle className="h-3.5 w-3.5" /> Delivery window risk — consider notifying dispatch
        </div>
      )}
    </div>
  );
}
