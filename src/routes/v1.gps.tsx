import { createFileRoute } from "@tanstack/react-router";
import { Satellite } from "lucide-react";
import { V1Page } from "@/components/v1/V1Page";
import { StatTile } from "@/components/v1/StatTile";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GPS_RELIABILITY, reliabilityTone } from "@/v1/data/mockPhase14";

export const Route = createFileRoute("/v1/gps")({
  head: () => ({ meta: [{ title: "GPS Reliability · Anderoute" }] }),
  component: Page,
});

function Page() {
  const stale = GPS_RELIABILITY.find((m) => m.id === "stl");
  const reconnect = GPS_RELIABILITY.find((m) => m.id === "rc");
  const lat = GPS_RELIABILITY.find((m) => m.id === "lat");
  return (
    <V1Page
      icon={<Satellite className="size-6 text-indigo-300" />}
      title="GPS & Realtime Reliability"
      blurb="Update frequency, stale rate, accuracy, realtime disconnects, and offline queue depth. Stale rate <5% and reconnect >98% are the V1 GA gates."
    >
      <div className="grid gap-3 md:grid-cols-3">
        <StatTile label="Stale rate" value={stale?.value ?? "—"} hint="target <5%" tone={reliabilityTone("stl", stale?.value ?? "")} />
        <StatTile label="Reconnect success" value={reconnect?.value ?? "—"} hint="target >98%" tone={reliabilityTone("rc", reconnect?.value ?? "")} />
        <StatTile label="Map update latency" value={lat?.value ?? "—"} hint="target <2s" tone={reliabilityTone("lat", lat?.value ?? "")} />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">All GPS signals</h2>
          <Badge variant="outline" className="border-white/15 text-muted-foreground">{GPS_RELIABILITY.length} metrics</Badge>
        </div>
        <div className="mt-3 grid gap-2 md:grid-cols-3">
          {GPS_RELIABILITY.map((m) => {
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
              </div>
            );
          })}
        </div>
      </Card>
    </V1Page>
  );
}
