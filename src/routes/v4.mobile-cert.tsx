import { createFileRoute } from "@tanstack/react-router";
import { Smartphone } from "lucide-react";
import { V4Page } from "@/components/v4/V4Page";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MOBILE_CERT } from "@/v4/data/mockPhase21";

export const Route = createFileRoute("/v4/mobile-cert")({
  head: () => ({ meta: [{ title: "Mobile Certification · Anderoute" }] }),
  component: () => (
    <V4Page icon={<Smartphone className="size-6 text-sky-300" />} title="Mobile Certification Execution"
      blurb="App Store and Google Play readiness, privacy labels, permission reviews, crash monitoring and rollout policy. Approval is not claimed.">
      <div className="grid gap-3 md:grid-cols-2">{MOBILE_CERT.map(m => (
        <Card key={m.area} className="border-white/10 bg-white/[0.02] p-3">
          <div className="flex items-center justify-between text-sm"><span>{m.area}</span><span className="text-muted-foreground">{m.progress}%</span></div>
          <Progress value={m.progress} className="mt-2 h-1.5" />
        </Card>))}
      </div>
    </V4Page>
  ),
});
