import { createFileRoute } from "@tanstack/react-router";
import { CalendarRange } from "lucide-react";
import { PilotPage } from "@/components/pilot/PilotPage";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GO_LIVE_PHASES, READINESS_LABEL, READINESS_TONE } from "@/pilot/data/mockPhase13";

export const Route = createFileRoute("/pilot/go-live")({
  head: () => ({ meta: [{ title: "Pilot Go-Live Plan · Anderoute" }] }),
  component: Page,
});

function Page() {
  return (
    <PilotPage
      icon={<CalendarRange className="size-6 text-teal-300" />}
      title="Pilot Go-Live Plan"
      blurb="Phased rollout from internal smoke test to first live load, first POD, and pilot review cadence."
    >
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <ol className="space-y-2">
          {GO_LIVE_PHASES.map((p, i) => (
            <li key={p.id} className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="grid size-6 place-items-center rounded-full border border-white/10 text-xs text-muted-foreground">{i + 1}</span>
                  <span className="font-medium">{p.phase}</span>
                  <Badge variant="outline" className="border-white/15 text-muted-foreground">owner: {p.owner}</Badge>
                </div>
                <Badge variant="outline" className={READINESS_TONE[p.status]}>{READINESS_LABEL[p.status]}</Badge>
              </div>
              <p className="mt-1 pl-9 text-xs text-muted-foreground">Success: {p.success}</p>
            </li>
          ))}
        </ol>
      </Card>
    </PilotPage>
  );
}
