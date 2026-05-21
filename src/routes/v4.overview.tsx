import { createFileRoute } from "@tanstack/react-router";
import { Rocket } from "lucide-react";
import { V4Page } from "@/components/v4/V4Page";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { V4_READINESS } from "@/v4/data/mockPhase21";

export const Route = createFileRoute("/v4/overview")({
  head: () => ({ meta: [{ title: "V4 Overview · Anderoute" }] }),
  component: () => (
    <V4Page icon={<Rocket className="size-6 text-sky-300" />} title="V4 Full Enterprise Launch Readiness"
      blurb="National-scale logistics operating platform: strategic integrations, carrier marketplace scale, national operations, mobile certification, enterprise support, governance, and revenue operations.">
      <div className="grid gap-3 md:grid-cols-4">
        {Object.entries(V4_READINESS).map(([k, v]) => (
          <Card key={k} className="border-white/10 bg-white/[0.02] p-4">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">{k}</div>
            <div className="mt-1 text-2xl font-semibold">{v}%</div>
            <Progress value={v as number} className="mt-2 h-1.5" />
          </Card>
        ))}
      </div>
    </V4Page>
  ),
});
