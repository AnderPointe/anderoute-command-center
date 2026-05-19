import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { SecurityNav } from "@/components/security/SecurityNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useObservability } from "@/security/hooks/useSecurityData";
import { Activity, ArrowDown, ArrowUp, Minus } from "lucide-react";

export const Route = createFileRoute("/ops/observability")({
  head: () => ({ meta: [{ title: "Observability — Anderoute" }] }),
  component: ObservabilityPage,
});

function trendIcon(t: "up" | "down" | "flat") {
  if (t === "up") return <ArrowUp className="size-3" />;
  if (t === "down") return <ArrowDown className="size-3" />;
  return <Minus className="size-3" />;
}

function ObservabilityPage() {
  const { metrics } = useObservability();
  return (
    <AppShell>
      <div className="p-4 md:p-6 space-y-6">
        <SecurityNav />
        <div className="flex items-center gap-2">
          <Activity className="size-5 text-teal-300" />
          <h1 className="text-2xl font-semibold tracking-tight">Observability</h1>
        </div>
        <p className="text-sm text-muted-foreground -mt-3">Uptime, latency, error, realtime, GPS, notification, EDI, AI cost, crash, sync.</p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {metrics.map((m) => (
            <Card key={m.key} className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wider text-muted-foreground">{m.label}</span>
                <Badge className={
                  m.status === "ok" ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30" :
                  m.status === "warn" ? "bg-amber-500/15 text-amber-300 border-amber-500/30" :
                  "bg-rose-500/15 text-rose-300 border-rose-500/30"
                }>{m.status}</Badge>
              </div>
              <div className="mt-1 flex items-end gap-2">
                <span className="text-2xl font-semibold tabular-nums">{m.value}</span>
                <span className="mb-1 inline-flex items-center text-[10px] text-muted-foreground">{trendIcon(m.trend)}</span>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-5">
          <h2 className="text-sm font-semibold mb-2 uppercase tracking-wider text-muted-foreground">Alerting rules</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            {[
              "API error rate > 1% for 5m → page on-call",
              "Realtime push p95 > 3s for 10m → warn",
              "GPS stale rate > 5% for 5m → page on-call",
              "Push delivery rate < 95% for 15m → warn",
              "Webhook failure rate > 2% for 10m → warn",
              "EDI failure rate > 3% for 30m → page",
              "Mobile crash-free users < 99% for 1h → page",
              "AI cost (24h) > $250 → notify finance",
              "Provider error spike (any) → notify integrations",
              "Backup missed for > 24h → page SRE",
            ].map((r) => (
              <li key={r} className="rounded-md border border-white/5 bg-white/[0.02] p-2.5 text-muted-foreground">
                {r}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </AppShell>
  );
}
