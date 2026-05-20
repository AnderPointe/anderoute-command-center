import { createFileRoute } from "@tanstack/react-router";
import { BellRing } from "lucide-react";
import { V1Page } from "@/components/v1/V1Page";
import { StatTile } from "@/components/v1/StatTile";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NOTIFICATION_RELIABILITY, reliabilityTone } from "@/v1/data/mockPhase14";

export const Route = createFileRoute("/v1/notifications")({
  head: () => ({ meta: [{ title: "Notification Reliability · Anderoute" }] }),
  component: Page,
});

function Page() {
  const open = NOTIFICATION_RELIABILITY.find((m) => m.id === "opn");
  const fail = NOTIFICATION_RELIABILITY.find((m) => m.id === "fld");
  const dt = NOTIFICATION_RELIABILITY.find((m) => m.id === "dt");
  return (
    <V1Page
      icon={<BellRing className="size-6 text-indigo-300" />}
      title="Notification Reliability"
      blurb="Load offer delivery, open rate, failure rate, and driver response latency. Open rate >70% and failure <3% are V1 GA gates."
    >
      <div className="grid gap-3 md:grid-cols-3">
        <StatTile label="Open rate" value={open?.value ?? "—"} hint="target >70%" tone={reliabilityTone("opn", open?.value ?? "")} />
        <StatTile label="Failure rate" value={fail?.value ?? "—"} hint="target <3%" tone={reliabilityTone("fld", fail?.value ?? "")} />
        <StatTile label="Avg delivery time" value={dt?.value ?? "—"} hint="target <5s" tone={reliabilityTone("dt", dt?.value ?? "")} />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">All notification signals</h2>
          <Badge variant="outline" className="border-white/15 text-muted-foreground">{NOTIFICATION_RELIABILITY.length} metrics</Badge>
        </div>
        <div className="mt-3 grid gap-2 md:grid-cols-3">
          {NOTIFICATION_RELIABILITY.map((m) => {
            const tone = reliabilityTone(m.id, m.value);
            const ring =
              tone === "good" ? "border-emerald-500/30" :
              tone === "warn" ? "border-amber-500/30" :
              tone === "bad"  ? "border-rose-500/30"   :
              "border-white/10";
            return (
              <div key={m.id} className={`rounded-lg border ${ring} bg-black/20 p-3`}>
                <div className="text-xs text-muted-foreground">{m.label}</div>
                <div className="mt-1 text-lg font-semibold">{m.value}</div>
                {m.hint && <div className="text-[11px] text-muted-foreground">{m.hint}</div>}
              </div>
            );
          })}
        </div>
      </Card>
    </V1Page>
  );
}
