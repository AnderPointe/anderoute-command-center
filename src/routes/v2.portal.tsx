import { createFileRoute } from "@tanstack/react-router";
import { Globe } from "lucide-react";
import { V2Page } from "@/components/v2/V2Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CUSTOMER_SHIPMENTS_V2 } from "@/v2/data/mockPhase17";

export const Route = createFileRoute("/v2/portal")({
  head: () => ({ meta: [{ title: "Customer Portal V2 · Anderoute" }] }),
  component: Page,
});

const winTone: Record<string, string> = {
  on_track: "border-emerald-500/30 text-emerald-300",
  watch:    "border-sky-500/30 text-sky-300",
  at_risk:  "border-amber-500/30 text-amber-300",
  late:     "border-rose-500/30 text-rose-300",
};

const stTone: Record<string, string> = {
  scheduled:  "border-white/15 text-muted-foreground",
  in_transit: "border-sky-500/30 text-sky-300",
  delayed:    "border-amber-500/30 text-amber-300",
  delivered:  "border-emerald-500/30 text-emerald-300",
};

function Page() {
  return (
    <V2Page
      icon={<Globe className="size-6 text-violet-300" />}
      title="Customer Portal V2 Insights"
      blurb="What the customer actually sees — status, ETA, delivery window, timeline, POD, delay explanation, proactive update messages, history, and a support contact."
    >
      <div className="grid gap-3 md:grid-cols-2">
        {CUSTOMER_SHIPMENTS_V2.map((s) => (
          <Card key={s.id} className="border-white/10 bg-white/[0.02] p-4 text-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-mono text-xs text-muted-foreground">{s.id}</div>
                <div className="font-medium">{s.customer}</div>
              </div>
              <Badge variant="outline" className={stTone[s.status]}>{s.status.replace("_", " ")}</Badge>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">ETA {s.etaAt}</span>
              <Badge variant="outline" className={winTone[s.windowStatus]}>{s.windowStatus.replace("_", " ")}</Badge>
            </div>
            {s.delayExplanation && (
              <div className="mt-2 rounded-md border border-amber-500/30 bg-amber-500/[0.04] px-2 py-1.5 text-xs text-amber-100/90">
                {s.delayExplanation}
              </div>
            )}
            {s.podReady && (
              <div className="mt-2 text-xs text-emerald-300">POD ready to view</div>
            )}
          </Card>
        ))}
      </div>
    </V2Page>
  );
}
