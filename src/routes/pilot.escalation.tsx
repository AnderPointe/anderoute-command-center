import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { PilotPage } from "@/components/pilot/PilotPage";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ESCALATIONS } from "@/pilot/data/mockPhase13Extra";

export const Route = createFileRoute("/pilot/escalation")({
  head: () => ({ meta: [{ title: "Pilot Escalation · Anderoute" }] }),
  component: Page,
});

const LEVELS: Record<number, string> = {
  1: "User support",
  2: "Workflow bug",
  3: "Data issue",
  4: "Security / privacy",
  5: "Pilot STOP",
};

function Page() {
  return (
    <PilotPage
      icon={<AlertTriangle className="size-6 text-teal-300" />}
      title="Pilot Issue Escalation"
      blurb="Escalation levels determine response time, owner, and whether the pilot continues."
    >
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Escalation policy</h2>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
          <li>L1 User support — CS responds within 4h</li>
          <li>L2 Workflow bug — Platform triages within 2h</li>
          <li>L3 Data issue — Platform + Security within 1h</li>
          <li>L4 Security / privacy — Security on call within 30m</li>
          <li>L5 Pilot STOP — Executive owner + rollback plan triggered</li>
        </ol>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Active escalations</h2>
        <div className="mt-3 space-y-2">
          {ESCALATIONS.map((e) => (
            <div key={e.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground">{e.id}</span>
                <Badge variant="outline" className="border-amber-500/30 text-amber-300">L{e.level} · {LEVELS[e.level]}</Badge>
                <span>{e.issue}</span>
              </div>
              <Badge
                variant="outline"
                className={e.status === "open" ? "border-rose-500/30 text-rose-300" : "border-emerald-500/30 text-emerald-300"}
              >
                {e.status}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </PilotPage>
  );
}
