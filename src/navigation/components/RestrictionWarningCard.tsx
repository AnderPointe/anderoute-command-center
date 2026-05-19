/**
 * Phase 3 polish — RestrictionWarningCard.
 * Renders a single truck-route restriction with severity-driven styling.
 */
import { AlertOctagon, AlertTriangle, Info } from "lucide-react";
import type { RestrictionWarning } from "@/navigation";
import { severityColorClass } from "@/navigation";

export function RestrictionWarningCard({ w }: { w: RestrictionWarning }) {
  const Icon = w.severity === "critical" ? AlertOctagon : w.severity === "warning" ? AlertTriangle : Info;
  return (
    <div className={`flex items-start gap-2 rounded-lg border px-2.5 py-2 text-[11px] ${severityColorClass(w.severity)}`}>
      <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0" />
      <div className="min-w-0 leading-tight">
        <div className="text-[11px] font-semibold uppercase tracking-wider opacity-80">
          {w.type.replace(/_/g, " ")}
          {w.road_name ? ` · ${w.road_name}` : ""}
        </div>
        <div className="text-[12px]">{w.message}</div>
        {w.recommended_action && (
          <div className="mt-0.5 text-[11px] opacity-80">→ {w.recommended_action}</div>
        )}
      </div>
    </div>
  );
}
