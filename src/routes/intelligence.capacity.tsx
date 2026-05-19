import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { IntelligenceNav } from "@/components/intelligence/IntelligenceNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gauge, AlertCircle } from "lucide-react";
import { useCapacityForecast } from "@/intelligence/hooks/useIntelligence";

export const Route = createFileRoute("/intelligence/capacity")({
  head: () => ({ meta: [{ title: "Capacity Forecast — Anderoute Intelligence" }] }),
  component: CapacityPage,
});

function CapacityPage() {
  const { slots } = useCapacityForecast();
  const gaps = slots.filter((s) => s.coverage_gap);
  return (
    <AppShell>
      <div className="space-y-6">
        <header className="space-y-3">
          <div className="flex items-center gap-3">
            <Gauge className="size-5 text-teal-300" />
            <h1 className="text-xl font-semibold">Capacity Forecast</h1>
            <Badge variant="outline" className="border-teal-500/40 text-teal-200">Next 8 hours</Badge>
          </div>
          <IntelligenceNav />
        </header>

        {gaps.length > 0 && (
          <Card className="border-amber-500/30 bg-amber-500/5 p-3 text-sm flex items-center gap-2">
            <AlertCircle className="size-4 text-amber-300" />
            <span>Coverage gap predicted at <strong>{gaps.map((g) => g.hour).join(", ")}</strong>. Consider adding drivers or shifting capacity.</span>
          </Card>
        )}

        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-medium">Hourly capacity (mock forecast)</h3>
          <div className="mt-4 space-y-2">
            {slots.map((s) => {
              const utilization = Math.min(100, Math.round((s.expected_deliveries / Math.max(1, s.available_drivers)) * 100));
              const tone = s.coverage_gap ? "bg-rose-400/80" : utilization > 80 ? "bg-amber-400/80" : "bg-emerald-400/80";
              return (
                <div key={s.hour} className={`rounded border p-2 ${s.coverage_gap ? "border-amber-500/30 bg-amber-500/5" : "border-white/10 bg-black/20"}`}>
                  <div className="flex items-center gap-3 text-xs">
                    <div className="w-14 font-medium">{s.hour}</div>
                    <div className="flex-1 h-2 rounded bg-white/5 overflow-hidden">
                      <div className={`h-full ${tone}`} style={{ width: `${utilization}%` }} />
                    </div>
                    <div className="w-12 text-right text-muted-foreground">{utilization}%</div>
                    <div className="hidden md:flex gap-4 text-[11px] text-muted-foreground">
                      <span>🚚 {s.available_drivers} drivers</span>
                      <span>🚛 {s.available_vehicles} veh</span>
                      <span>📦 {s.expected_deliveries} del</span>
                      <span className={s.expected_delays > 0 ? "text-amber-300" : ""}>⏱ {s.expected_delays} delays</span>
                      <span>👤 {s.dispatcher_workload}% disp</span>
                    </div>
                    {s.coverage_gap && (
                      <Badge variant="outline" className="border-amber-500/30 text-amber-300 text-[10px]">gap</Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-3 text-[10px] text-muted-foreground">
            Utilization = expected deliveries ÷ available drivers. Mock forecast only.
          </p>
        </Card>
      </div>
    </AppShell>
  );
}
