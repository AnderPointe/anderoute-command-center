import { createFileRoute } from "@tanstack/react-router";
import { Truck } from "lucide-react";
import { PilotPage } from "@/components/pilot/PilotPage";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FIRST_LIVE_LOAD_STEPS } from "@/pilot/data/mockPhase13";

export const Route = createFileRoute("/pilot/first-live-load")({
  head: () => ({ meta: [{ title: "First Live Load · Anderoute" }] }),
  component: Page,
});

function Page() {
  return (
    <PilotPage
      icon={<Truck className="size-6 text-teal-300" />}
      title="First Live Load Wizard"
      blurb="Guided dispatcher + driver + customer flow for the very first live load through Anderoute."
    >
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <ol className="space-y-2">
          {FIRST_LIVE_LOAD_STEPS.map((s, i) => (
            <li key={s.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm">
              <div className="flex items-center gap-3">
                <span className="grid size-6 place-items-center rounded-full border border-white/10 text-xs text-muted-foreground">{i + 1}</span>
                <span>{s.step}</span>
              </div>
              <Badge variant="outline" className="border-white/15 text-muted-foreground">{s.owner}</Badge>
            </li>
          ))}
        </ol>
      </Card>
    </PilotPage>
  );
}
