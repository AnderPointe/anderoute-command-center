import { createFileRoute } from "@tanstack/react-router";
import { Server } from "lucide-react";
import { PilotPage } from "@/components/pilot/PilotPage";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ENV_CHECKS } from "@/pilot/data/mockPhase13Extra";
import { READINESS_LABEL, READINESS_TONE } from "@/pilot/data/mockPhase13";

export const Route = createFileRoute("/pilot/environment")({
  head: () => ({ meta: [{ title: "Pilot Environment · Anderoute" }] }),
  component: Page,
});

function Page() {
  return (
    <PilotPage
      icon={<Server className="size-6 text-teal-300" />}
      title="Pilot Environment Checklist"
      blurb="Supabase project, environment variables, RLS, storage, realtime, edge functions, and error logging must all be green before go-live."
    >
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <div className="space-y-2">
          {ENV_CHECKS.map((e) => (
            <div key={e.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground">{e.id}</span>
                <span>{e.check}</span>
              </div>
              <Badge variant="outline" className={READINESS_TONE[e.status]}>{READINESS_LABEL[e.status]}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </PilotPage>
  );
}
