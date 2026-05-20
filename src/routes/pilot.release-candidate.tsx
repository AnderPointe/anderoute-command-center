import { createFileRoute } from "@tanstack/react-router";
import { PackageCheck } from "lucide-react";
import { PilotPage } from "@/components/pilot/PilotPage";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { READINESS_LABEL, READINESS_TONE } from "@/pilot/data/mockPhase13";
import { RC_STEPS } from "@/pilot/data/mockPhase13Extra";

export const Route = createFileRoute("/pilot/release-candidate")({
  head: () => ({ meta: [{ title: "Pilot Release Candidate · Anderoute" }] }),
  component: Page,
});

function Page() {
  const ready = RC_STEPS.every((s) => s.status === "passed" || s.status === "ready");
  return (
    <PilotPage
      icon={<PackageCheck className="size-6 text-teal-300" />}
      title="Pilot Release Candidate"
      blurb="The build promoted to the pilot environment must clear every step below before go-live approval."
    >
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <div className="flex items-center justify-between text-sm">
          <span>Status</span>
          <Badge
            variant="outline"
            className={ready ? "border-emerald-500/30 text-emerald-300" : "border-amber-500/30 text-amber-300"}
          >
            {ready ? "RC ready" : "RC in progress"}
          </Badge>
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <ol className="space-y-2">
          {RC_STEPS.map((s, i) => (
            <li key={s.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm">
              <div className="flex items-center gap-3">
                <span className="grid size-6 place-items-center rounded-full border border-white/10 text-xs text-muted-foreground">{i + 1}</span>
                <span>{s.step}</span>
              </div>
              <Badge variant="outline" className={READINESS_TONE[s.status]}>{READINESS_LABEL[s.status]}</Badge>
            </li>
          ))}
        </ol>
      </Card>
    </PilotPage>
  );
}
