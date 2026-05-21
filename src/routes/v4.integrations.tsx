import { createFileRoute } from "@tanstack/react-router";
import { Plug } from "lucide-react";
import { V4Page } from "@/components/v4/V4Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { STRATEGIC_INTEGRATIONS } from "@/v4/data/mockPhase21";

export const Route = createFileRoute("/v4/integrations")({
  head: () => ({ meta: [{ title: "Strategic Integrations · Anderoute" }] }),
  component: () => (
    <V4Page icon={<Plug className="size-6 text-sky-300" />} title="Strategic Integration Program"
      blurb="TMS, telematics, accounting, EDI, ERPs, broker platforms, fuel, maintenance, notifications, AI and mapping — tracked from discovery to launch.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <div className="grid gap-2 text-sm">
          {STRATEGIC_INTEGRATIONS.map(i => (
            <div key={i.id} className="flex items-center justify-between gap-3 rounded border border-white/10 bg-black/20 p-2">
              <div className="min-w-0">
                <div className="font-medium">{i.name}</div>
                <div className="text-xs text-muted-foreground">{i.type} · value {i.value} · complexity {i.complexity} · {i.owner}</div>
              </div>
              <Badge variant="outline" className="border-white/15">{i.status}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </V4Page>
  ),
});
