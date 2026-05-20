import { createFileRoute } from "@tanstack/react-router";
import { Ban } from "lucide-react";
import { PilotPage } from "@/components/pilot/PilotPage";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PILOT_BLOCKERS } from "@/pilot/data/mockPhase13";

export const Route = createFileRoute("/pilot/blockers")({
  head: () => ({ meta: [{ title: "Pilot Blockers · Anderoute" }] }),
  component: Page,
});

function Page() {
  return (
    <PilotPage
      icon={<Ban className="size-6 text-teal-300" />}
      title="Pilot Launch Blocker Rules"
      blurb="Any STOP condition automatically holds the pilot launch. WARN conditions require explicit sign-off."
    >
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <div className="space-y-2">
          {PILOT_BLOCKERS.map((b) => (
            <div key={b.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground">{b.id}</span>
                <span>{b.rule}</span>
              </div>
              <Badge
                variant="outline"
                className={b.severity === "stop" ? "border-rose-500/40 text-rose-300" : "border-amber-500/40 text-amber-300"}
              >
                {b.severity.toUpperCase()}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </PilotPage>
  );
}
