import { createFileRoute } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { PilotPage } from "@/components/pilot/PilotPage";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DATA_PROTECTION_CHECKS } from "@/pilot/data/mockPhase13Extra";

export const Route = createFileRoute("/pilot/data-protection")({
  head: () => ({ meta: [{ title: "Pilot Data Protection · Anderoute" }] }),
  component: Page,
});

function Page() {
  const passed = DATA_PROTECTION_CHECKS.filter((d) => d.ok).length;
  return (
    <PilotPage
      icon={<Lock className="size-6 text-teal-300" />}
      title="Pilot Data Protection Review"
      blurb="Privacy and access review covering driver consent, location tracking, POD storage, audit coverage, and cross-company isolation."
    >
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <div className="flex items-center justify-between text-sm">
          <span>Status</span>
          <span className="font-mono">{passed}/{DATA_PROTECTION_CHECKS.length} cleared</span>
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <div className="space-y-2">
          {DATA_PROTECTION_CHECKS.map((d) => (
            <div key={d.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground">{d.id}</span>
                <span>{d.item}</span>
              </div>
              <Badge
                variant="outline"
                className={d.ok ? "border-emerald-500/30 text-emerald-300" : "border-amber-500/30 text-amber-300"}
              >
                {d.ok ? "OK" : "Open"}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </PilotPage>
  );
}
