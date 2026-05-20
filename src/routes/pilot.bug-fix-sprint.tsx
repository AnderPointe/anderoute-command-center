import { createFileRoute } from "@tanstack/react-router";
import { Wrench } from "lucide-react";
import { PilotPage } from "@/components/pilot/PilotPage";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BUG_FIX_SPRINT } from "@/pilot/data/mockPhase13Extra";

export const Route = createFileRoute("/pilot/bug-fix-sprint")({
  head: () => ({ meta: [{ title: "Bug Fix Sprint · Anderoute" }] }),
  component: Page,
});

function Page() {
  return (
    <PilotPage
      icon={<Wrench className="size-6 text-teal-300" />}
      title="Bug Fix Sprint Plan"
      blurb="Time-boxed sprint to clear pilot blockers and pilot-quality bugs before go-live."
    >
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <div className="grid gap-2 md:grid-cols-2">
          {BUG_FIX_SPRINT.map((b) => (
            <div key={b.id} className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm">
              <div className="flex items-center justify-between">
                <span>{b.bucket}</span>
                <Badge variant="outline" className="border-white/15 text-muted-foreground">ETA {b.eta}</Badge>
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{b.count} bug{b.count === 1 ? "" : "s"}</div>
            </div>
          ))}
        </div>
      </Card>
    </PilotPage>
  );
}
