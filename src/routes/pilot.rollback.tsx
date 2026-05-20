import { createFileRoute } from "@tanstack/react-router";
import { Undo2 } from "lucide-react";
import { PilotPage } from "@/components/pilot/PilotPage";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ROLLBACK_ACTIONS } from "@/pilot/data/mockPhase13Extra";

export const Route = createFileRoute("/pilot/rollback")({
  head: () => ({ meta: [{ title: "Pilot Rollback · Anderoute" }] }),
  component: Page,
});

function Page() {
  return (
    <PilotPage
      icon={<Undo2 className="size-6 text-teal-300" />}
      title="Pilot Rollback & Recovery Plan"
      blurb="Each trigger maps to a documented action. Manual dispatch fallback keeps the pilot company operational while we recover."
    >
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <div className="space-y-2">
          {ROLLBACK_ACTIONS.map((a) => (
            <div key={a.id} className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground">{a.id}</span>
                <Badge variant="outline" className="border-rose-500/30 text-rose-300">trigger</Badge>
                <span>{a.trigger}</span>
              </div>
              <div className="mt-2 flex items-start gap-2 pl-1 text-sm">
                <Badge variant="outline" className="border-teal-500/30 text-teal-300">action</Badge>
                <span className="text-muted-foreground">{a.action}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Manual dispatch fallback</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Export active loads to CSV</li>
          <li>Switch dispatchers to phone / radio</li>
          <li>Notify pilot users via email + SMS placeholder</li>
          <li>Open incident with timeline + impact</li>
          <li>Restore previous build + replay migrations</li>
        </ul>
      </Card>
    </PilotPage>
  );
}
