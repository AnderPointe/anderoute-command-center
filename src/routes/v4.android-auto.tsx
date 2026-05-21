import { createFileRoute } from "@tanstack/react-router";
import { Car } from "lucide-react";
import { V4Page } from "@/components/v4/V4Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ANDROID_AUTO } from "@/v4/data/mockPhase21";

export const Route = createFileRoute("/v4/android-auto")({
  head: () => ({ meta: [{ title: "Android Auto Execution · Anderoute" }] }),
  component: () => (
    <V4Page icon={<Car className="size-6 text-sky-300" />} title="Android Auto Execution Tracker"
      blurb="Native Android module, Android for Cars App Library, navigation template, safety review, voice rules, Desktop Head Unit testing and app review. Approval is pending.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <ul className="space-y-1 text-sm">{ANDROID_AUTO.map((a,i) => (
          <li key={i} className="flex items-center justify-between rounded border border-white/10 bg-black/20 p-2">
            <span>{a.item}</span>
            <Badge variant="outline" className="border-white/15">{a.status}</Badge>
          </li>))}
        </ul>
      </Card>
    </V4Page>
  ),
});
