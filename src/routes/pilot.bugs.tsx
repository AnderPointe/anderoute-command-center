import { createFileRoute } from "@tanstack/react-router";
import { Bug } from "lucide-react";
import { PilotPage } from "@/components/pilot/PilotPage";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BUGS } from "@/pilot/data/mockPhase13";

export const Route = createFileRoute("/pilot/bugs")({
  head: () => ({ meta: [{ title: "Bug Triage · Anderoute" }] }),
  component: Page,
});

const SEV: Record<string, string> = {
  critical: "border-rose-500/40 text-rose-300",
  high: "border-orange-500/40 text-orange-300",
  medium: "border-amber-500/40 text-amber-300",
  low: "border-white/15 text-muted-foreground",
};
const STATUS: Record<string, string> = {
  new: "border-sky-500/30 text-sky-300",
  confirmed: "border-amber-500/30 text-amber-300",
  in_progress: "border-sky-500/30 text-sky-300",
  ready_retest: "border-violet-500/30 text-violet-300",
  fixed: "border-teal-500/30 text-teal-300",
  verified: "border-emerald-500/30 text-emerald-300",
  released: "border-emerald-500/30 text-emerald-300",
  wont_fix: "border-white/15 text-muted-foreground",
  duplicate: "border-white/15 text-muted-foreground",
};

function Page() {
  const groups = ["P0", "P1", "P2", "P3"] as const;
  return (
    <PilotPage
      icon={<Bug className="size-6 text-teal-300" />}
      title="Bug Triage Board"
      blurb="Bugs are tracked with severity, priority, and a release blocker indicator. P0 must reach zero before pilot launch."
    >
      {groups.map((p) => {
        const items = BUGS.filter((b) => b.priority === p);
        if (!items.length) return null;
        return (
          <Card key={p} className="border-white/10 bg-white/[0.02] p-4">
            <h2 className="text-sm font-semibold">
              {p} · {items.length} {p === "P0" ? "(release blockers)" : ""}
            </h2>
            <div className="mt-3 space-y-2">
              {items.map((b) => (
                <div key={b.id} className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground">{b.id}</span>
                    <span className="font-medium">{b.title}</span>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                    <Badge variant="outline" className={SEV[b.severity]}>{b.severity}</Badge>
                    <Badge variant="outline" className={STATUS[b.status]}>{b.status.replace("_", " ")}</Badge>
                    <Badge variant="outline" className="border-white/15 text-muted-foreground">workflow: {b.workflow}</Badge>
                    <Badge variant="outline" className="border-white/15 text-muted-foreground">role: {b.role}</Badge>
                    {b.assignee && <Badge variant="outline" className="border-white/15 text-muted-foreground">owner: {b.assignee}</Badge>}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        );
      })}
    </PilotPage>
  );
}
