import { createFileRoute } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { PilotPage } from "@/components/pilot/PilotPage";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PILOT_DOCS } from "@/pilot/data/mockPhase13Extra";

export const Route = createFileRoute("/pilot/docs")({
  head: () => ({ meta: [{ title: "Pilot Documentation · Anderoute" }] }),
  component: Page,
});

function Page() {
  return (
    <PilotPage
      icon={<BookOpen className="size-6 text-teal-300" />}
      title="Pilot Documentation Hub"
      blurb="Role-based guides, support process, known issues, feedback flow, escalation, and rollback plan in one place."
    >
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <div className="grid gap-2 md:grid-cols-2">
          {PILOT_DOCS.map((d) => (
            <div key={d.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground">{d.id}</span>
                <span>{d.title}</span>
              </div>
              <Badge variant="outline" className="border-white/15 text-muted-foreground">{d.audience}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </PilotPage>
  );
}
