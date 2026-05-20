import { createFileRoute } from "@tanstack/react-router";
import { Gauge } from "lucide-react";
import { PilotPage } from "@/components/pilot/PilotPage";
import { Card } from "@/components/ui/card";
import { PILOT_METRICS_DEFS } from "@/pilot/data/mockPhase13";

export const Route = createFileRoute("/pilot/metrics")({
  head: () => ({ meta: [{ title: "Pilot Metrics · Anderoute" }] }),
  component: Page,
});

function Page() {
  return (
    <PilotPage
      icon={<Gauge className="size-6 text-teal-300" />}
      title="Pilot Success Metrics"
      blurb="Adoption, workflow, reliability, support, and satisfaction KPIs for the first pilot."
    >
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {PILOT_METRICS_DEFS.map((m) => (
          <Card key={m.id} className="border-white/10 bg-white/[0.02] p-4">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">{m.id}</div>
            <div className="mt-1 font-medium">{m.name}</div>
            <div className="mt-2 flex items-baseline justify-between text-sm">
              <span className="text-muted-foreground">Target</span>
              <span className="font-mono">{m.target}</span>
            </div>
            <div className="flex items-baseline justify-between text-sm">
              <span className="text-muted-foreground">Current</span>
              <span className="font-mono">{m.current}</span>
            </div>
          </Card>
        ))}
      </div>
    </PilotPage>
  );
}
