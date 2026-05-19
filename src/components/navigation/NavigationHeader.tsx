import { AlertTriangle } from "lucide-react";
import { maneuverGlyph } from "@/utils/elitenav";
import type { RouteStep } from "@/types/elitenav";

interface Props {
  step: RouteStep;
  upcoming?: RouteStep;
  distanceToTurn: string;
  big?: boolean;
  onClick?: () => void;
}

export function NavigationHeader({ step, upcoming, distanceToTurn, big = false, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="group block w-full text-left rounded-2xl border border-white/10 bg-gradient-to-br from-[#0e171f]/95 to-[#0a1218]/95 p-4 backdrop-blur-xl shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)] transition hover:border-teal-500/40"
    >
      <div className="flex items-start gap-4">
        <div
          className={
            "flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400/20 to-teal-600/10 text-teal-300 ring-1 ring-teal-400/30 " +
            (big ? "h-20 w-20 text-5xl" : "h-14 w-14 text-3xl")
          }
        >
          {maneuverGlyph(step.maneuver)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[10px] uppercase tracking-widest text-slate-500">In {distanceToTurn}</div>
          <div className={"truncate font-semibold text-white tracking-tight " + (big ? "text-2xl" : "text-lg")}>
            {step.instruction}
          </div>
          <div className="mt-0.5 truncate text-xs text-slate-400">{step.street}</div>
          {step.alert && (
            <div className="mt-2 flex items-center gap-1.5 text-[11px] text-orange-300">
              <AlertTriangle className="h-3 w-3" /> {step.alert}
            </div>
          )}
        </div>
      </div>
      {upcoming && (
        <div className="mt-3 flex items-center gap-2 border-t border-white/5 pt-3 text-[11px] text-slate-400">
          <span className="text-base text-slate-500">{maneuverGlyph(upcoming.maneuver)}</span>
          <span>Then</span>
          <span className="truncate text-slate-200">{upcoming.instruction}</span>
        </div>
      )}
    </button>
  );
}
