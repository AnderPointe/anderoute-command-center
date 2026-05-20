import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { PilotPage } from "@/components/pilot/PilotPage";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ACCEPTANCE_CRITERIA, computeGoNoGo } from "@/pilot/data/mockPhase13";

export const Route = createFileRoute("/pilot/acceptance")({
  head: () => ({ meta: [{ title: "Pilot Acceptance · Anderoute" }] }),
  component: Page,
});

function Page() {
  const gng = computeGoNoGo(ACCEPTANCE_CRITERIA);
  return (
    <PilotPage
      icon={<CheckCircle2 className="size-6 text-teal-300" />}
      title="Pilot Acceptance Checklist"
      blurb="All criteria must be met before the first live pilot is approved."
    >
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <div className="flex items-center justify-between text-sm">
          <span>Go / No-Go</span>
          <div className="flex items-center gap-2">
            <span className="font-mono">{gng.met}/{gng.total} met</span>
            <Badge
              variant="outline"
              className={gng.ready ? "border-emerald-500/30 text-emerald-300" : "border-amber-500/30 text-amber-300"}
            >
              {gng.ready ? "GO" : "NO-GO"}
            </Badge>
          </div>
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <div className="space-y-2">
          {ACCEPTANCE_CRITERIA.map((c) => (
            <div key={c.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground">{c.id}</span>
                <span>{c.criterion}</span>
              </div>
              <Badge
                variant="outline"
                className={c.met ? "border-emerald-500/30 text-emerald-300" : "border-amber-500/30 text-amber-300"}
              >
                {c.met ? "Met" : "Open"}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </PilotPage>
  );
}
