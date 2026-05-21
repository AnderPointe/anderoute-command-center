import { createFileRoute } from "@tanstack/react-router";
import { Apple } from "lucide-react";
import { V4Page } from "@/components/v4/V4Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CARPLAY } from "@/v4/data/mockPhase21";

export const Route = createFileRoute("/v4/carplay")({
  head: () => ({ meta: [{ title: "CarPlay Execution · Anderoute" }] }),
  component: () => (
    <V4Page icon={<Apple className="size-6 text-sky-300" />} title="CarPlay Execution Tracker"
      blurb="Apple entitlement, native iOS module, CarPlay navigation template, Siri/voice, safety review, app review considerations. Approval is pending.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <ul className="space-y-1 text-sm">{CARPLAY.map((a,i) => (
          <li key={i} className="flex items-center justify-between rounded border border-white/10 bg-black/20 p-2">
            <span>{a.item}</span>
            <Badge variant="outline" className="border-white/15">{a.status}</Badge>
          </li>))}
        </ul>
      </Card>
    </V4Page>
  ),
});
