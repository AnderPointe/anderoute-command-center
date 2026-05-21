import { createFileRoute } from "@tanstack/react-router";
import { Gauge } from "lucide-react";
import { V4Page } from "@/components/v4/V4Page";
import { Card } from "@/components/ui/card";
import { FLEET_PERF } from "@/v4/data/mockPhase21";

export const Route = createFileRoute("/v4/fleet-performance")({
  head: () => ({ meta: [{ title: "Large Fleet Performance · Anderoute" }] }),
  component: () => (
    <V4Page icon={<Gauge className="size-6 text-sky-300" />} title="Large-Fleet Performance"
      blurb="Driver, vehicle, realtime, map, API, DB, webhook and notification health at national scale.">
      <div className="grid gap-3 md:grid-cols-4">
        {Object.entries(FLEET_PERF).map(([k,v]) => (
          <Card key={k} className="border-white/10 bg-white/[0.02] p-3">
            <div className="text-xs uppercase text-muted-foreground">{k.replace(/_/g," ")}</div>
            <div className="mt-1 text-xl font-semibold">{v}</div>
          </Card>
        ))}
      </div>
    </V4Page>
  ),
});
