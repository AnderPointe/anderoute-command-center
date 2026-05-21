import { createFileRoute } from "@tanstack/react-router";
import { Factory } from "lucide-react";
import { V4Page } from "@/components/v4/V4Page";
import { Card } from "@/components/ui/card";
import { ENTERPRISE_ONBOARDING_TEMPLATE } from "@/v4/data/mockPhase21";

export const Route = createFileRoute("/v4/onboarding")({
  head: () => ({ meta: [{ title: "Enterprise Onboarding · Anderoute" }] }),
  component: () => (
    <V4Page icon={<Factory className="size-6 text-sky-300" />} title="Enterprise Onboarding Factory"
      blurb="Repeatable enterprise onboarding template with implementation, data migration, training, go-live and post-launch review stages.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <ol className="grid gap-2 text-sm md:grid-cols-2">{ENTERPRISE_ONBOARDING_TEMPLATE.map((s,i) => (
          <li key={s} className="rounded border border-white/10 bg-black/20 p-2"><span className="text-xs text-muted-foreground">Step {i+1}</span><div>{s}</div></li>
        ))}</ol>
      </Card>
    </V4Page>
  ),
});
