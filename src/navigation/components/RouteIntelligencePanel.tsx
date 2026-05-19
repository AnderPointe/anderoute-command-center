/**
 * Phase 4 — RouteIntelligencePanel.
 *
 * Shows AI-generated route insights to driver + dispatcher. Sorted by
 * severity (critical → warning → info). Auto-refresh handled by the hook.
 */
import { AlertTriangle, Cloud, Fuel, Bed, Truck, Clock, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { RouteIntelligenceInsight } from "../services/copilot.functions";

const ICONS: Record<RouteIntelligenceInsight["insight_type"], typeof Truck> = {
  traffic_risk: Clock,
  eta_risk: Clock,
  fuel_stop: Fuel,
  rest_stop: Bed,
  cdl_hazard: Truck,
  weather: Cloud,
};

const SEVERITY_ORDER = { critical: 0, warning: 1, info: 2 } as const;

interface Props {
  insights: RouteIntelligenceInsight[];
  summary: string;
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
  lastFetchedAt: string | null;
}

export function RouteIntelligencePanel({
  insights, summary, loading, error, onRefresh, lastFetchedAt,
}: Props) {
  const sorted = [...insights].sort((a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity]);
  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-950/85 p-4 shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-300" />
          <span className="text-[13px] font-semibold tracking-wide text-zinc-100">Route Intelligence</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 gap-1 text-zinc-300 hover:bg-white/5"
          onClick={onRefresh}
          disabled={loading}
        >
          <RefreshCw className={cn("h-3.5 w-3.5", loading && "animate-spin")} />
          <span className="text-[11px]">{loading ? "Updating" : "Refresh"}</span>
        </Button>
      </div>

      {summary && (
        <p className="mt-2 text-[12px] leading-snug text-zinc-300">{summary}</p>
      )}
      {error && (
        <div className="mt-2 rounded-md border border-amber-400/40 bg-amber-500/10 px-2.5 py-1.5 text-[11px] text-amber-200">
          {error}
        </div>
      )}

      <div className="mt-3 space-y-2">
        {sorted.length === 0 && !loading && (
          <div className="text-[12px] text-zinc-600">No insights yet. Tap refresh.</div>
        )}
        {sorted.map((ins, i) => {
          const Icon = ICONS[ins.insight_type];
          return (
            <div
              key={i}
              className={cn(
                "flex gap-2.5 rounded-lg border px-2.5 py-2 leading-tight",
                ins.severity === "critical" && "border-red-500/40 bg-red-500/10",
                ins.severity === "warning" && "border-amber-400/40 bg-amber-500/10",
                ins.severity === "info" && "border-white/10 bg-white/[0.03]",
              )}
            >
              <Icon className="mt-0.5 h-4 w-4 shrink-0 text-zinc-200" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-[12px] font-semibold text-zinc-100">{ins.title}</span>
                  <Badge
                    variant="outline"
                    className={cn(
                      "h-5 border-white/15 text-[9px] uppercase",
                      ins.severity === "critical" && "border-red-400/40 text-red-200",
                      ins.severity === "warning" && "border-amber-400/40 text-amber-200",
                    )}
                  >
                    {ins.insight_type.replace(/_/g, " ")}
                  </Badge>
                </div>
                <p className="text-[11px] text-zinc-300">{ins.message}</p>
                {typeof ins.distance_ahead_m === "number" && (
                  <div className="mt-0.5 text-[10px] text-zinc-500">
                    {ins.distance_ahead_m > 1000
                      ? `${(ins.distance_ahead_m / 1000).toFixed(1)} km ahead`
                      : `${ins.distance_ahead_m} m ahead`}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {lastFetchedAt && (
        <div className="mt-3 text-[10px] text-zinc-600">
          Updated {new Date(lastFetchedAt).toLocaleTimeString()}
        </div>
      )}
    </div>
  );
}
