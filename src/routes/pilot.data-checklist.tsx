import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { PilotPage } from "@/components/pilot/PilotPage";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PILOT_DATA_CHECKLIST } from "@/pilot/data/mockPhase13Extra";

export const Route = createFileRoute("/pilot/data-checklist")({
  head: () => ({ meta: [{ title: "Pilot Data Checklist · Anderoute" }] }),
  component: Page,
});

function Page() {
  const items = PILOT_DATA_CHECKLIST.map((d) => ({ ...d, ok: d.current >= d.required }));
  const completion = Math.round((items.filter((i) => i.ok).length / items.length) * 100);
  return (
    <PilotPage
      icon={<ListChecks className="size-6 text-teal-300" />}
      title="Pilot Data Validation Checklist"
      blurb="Minimum required data so the pilot company can run real workflows on day one."
    >
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <div className="flex items-center justify-between text-sm">
          <span>Completion</span>
          <span className="font-mono">{completion}%</span>
        </div>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <div className="space-y-2">
          {items.map((d) => (
            <div key={d.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground">{d.id}</span>
                <span>{d.item}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground">{d.current} / {d.required}</span>
                <Badge variant="outline" className={d.ok ? "border-emerald-500/30 text-emerald-300" : "border-amber-500/30 text-amber-300"}>
                  {d.ok ? "OK" : "Missing"}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </PilotPage>
  );
}
