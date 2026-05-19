import { alerts } from "@/data/mock";
import type { AlertSeverity } from "@/types";
import { AlertTriangle, Phone, Check, ShieldCheck, AlertOctagon, AlertCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

const severityMeta: Record<AlertSeverity, { token: string; label: string; icon: typeof Info }> = {
  low: { token: "info", label: "Low", icon: Info },
  medium: { token: "warning", label: "Medium", icon: AlertCircle },
  high: { token: "orange", label: "High", icon: AlertTriangle },
  critical: { token: "destructive", label: "Critical", icon: AlertOctagon },
};

const severityOrder: AlertSeverity[] = ["critical", "high", "medium", "low"];

export function AlertsPanel({ limit }: { limit?: number }) {
  const items = alerts
    .filter((a) => !a.resolved)
    .sort((a, b) => severityOrder.indexOf(a.severity) - severityOrder.indexOf(b.severity))
    .slice(0, limit);

  const critical = alerts.filter((a) => !a.resolved && a.severity === "critical").length;

  return (
    <div className="rounded-xl border border-border bg-card shadow-[var(--shadow-sm)] overflow-hidden">
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="font-semibold flex items-center gap-2">
            <AlertTriangle className="size-4 text-orange" /> Exceptions & Alerts
          </h3>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            {items.length} open · {critical} critical requiring action
          </p>
        </div>
        <Link to="/alerts" className="text-xs text-teal font-medium hover:underline">View all →</Link>
      </div>
      {items.length === 0 ? (
        <div className="py-14 text-center px-6">
          <div className="mx-auto size-12 rounded-full bg-success/10 text-success grid place-items-center">
            <ShieldCheck className="size-5" />
          </div>
          <div className="mt-3 text-sm font-medium">All clear</div>
          <div className="text-xs text-muted-foreground mt-1">
            No open exceptions. Drivers, routes and shipments are nominal.
          </div>
        </div>
      ) : (
        <ul className="divide-y divide-border">
          {items.map((a) => {
            const meta = severityMeta[a.severity];
            const Icon = meta.icon;
            const color = `var(--${meta.token})`;
            return (
              <li key={a.id} className="relative p-4 pl-5 hover:bg-secondary/30 transition-colors">
                <span
                  className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full"
                  style={{ backgroundColor: color }}
                />
                <div className="flex items-start gap-3">
                  <div
                    className="size-8 rounded-lg grid place-items-center shrink-0"
                    style={{
                      color,
                      backgroundColor: `color-mix(in oklab, ${color} 14%, transparent)`,
                    }}
                  >
                    <Icon className="size-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-sm font-semibold truncate">{a.type}</span>
                        <span
                          className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded shrink-0"
                          style={{
                            color,
                            backgroundColor: `color-mix(in oklab, ${color} 12%, transparent)`,
                            boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${color} 28%, transparent)`,
                          }}
                        >
                          {meta.label}
                        </span>
                      </div>
                      <span className="text-[11px] text-muted-foreground shrink-0 tabular-nums">{a.createdAt}</span>
                    </div>
                    <p className="text-[13px] text-foreground/85 mt-1 leading-snug">{a.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      <span className="text-foreground/80 font-medium">Recommended: </span>
                      {a.recommendedAction}
                    </p>
                    <div className="mt-2.5 flex items-center gap-2">
                      <Button size="sm" variant="outline" className="h-7 gap-1.5 text-xs">
                        <Phone className="size-3" /> Contact
                      </Button>
                      <Button size="sm" className="h-7 gap-1.5 text-xs bg-teal text-teal-foreground hover:bg-teal/90">
                        <Check className="size-3" /> Resolve
                      </Button>
                      {(a.driverId || a.loadId) && (
                        <span className="ml-auto text-[11px] text-muted-foreground tabular-nums">
                          {a.driverId}{a.loadId ? ` · ${a.loadId}` : ""}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
