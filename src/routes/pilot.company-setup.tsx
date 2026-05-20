import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { PilotPage } from "@/components/pilot/PilotPage";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PILOT_COMPANY_SETUP } from "@/pilot/data/mockPhase13Extra";

export const Route = createFileRoute("/pilot/company-setup")({
  head: () => ({ meta: [{ title: "Pilot Company Setup · Anderoute" }] }),
  component: Page,
});

const TONE: Record<string, string> = {
  done: "border-emerald-500/30 text-emerald-300",
  in_progress: "border-sky-500/30 text-sky-300",
  todo: "border-white/15 text-muted-foreground",
};

function Page() {
  return (
    <PilotPage
      icon={<Users className="size-6 text-teal-300" />}
      title="Pilot Company Setup Wizard"
      blurb="Guided onboarding for the first pilot company: profile, admin, dispatchers, drivers, vehicles, customers, and first loads."
    >
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <ol className="space-y-2">
          {PILOT_COMPANY_SETUP.map((s, i) => (
            <li key={s.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm">
              <div className="flex items-center gap-3">
                <span className="grid size-6 place-items-center rounded-full border border-white/10 text-xs text-muted-foreground">{i + 1}</span>
                <div>
                  <div>{s.step}</div>
                  {s.detail && <div className="text-xs text-muted-foreground">{s.detail}</div>}
                </div>
              </div>
              <Badge variant="outline" className={TONE[s.status]}>{s.status.replace("_", " ")}</Badge>
            </li>
          ))}
        </ol>
      </Card>
    </PilotPage>
  );
}
