import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";
import { PilotPage } from "@/components/pilot/PilotPage";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TRAINING_MODULES } from "@/pilot/data/mockPhase13Extra";

export const Route = createFileRoute("/pilot/training")({
  head: () => ({ meta: [{ title: "Pilot Training · Anderoute" }] }),
  component: Page,
});

const TONE: Record<string, string> = {
  complete: "border-emerald-500/30 text-emerald-300",
  in_progress: "border-sky-500/30 text-sky-300",
  not_started: "border-white/15 text-muted-foreground",
};

function Page() {
  const roles = ["admin", "dispatcher", "driver", "customer"] as const;
  return (
    <PilotPage
      icon={<GraduationCap className="size-6 text-teal-300" />}
      title="Pilot Training Paths"
      blurb="Role-based quick-start training for admins, dispatchers, drivers, and pilot customers."
    >
      {roles.map((role) => {
        const items = TRAINING_MODULES.filter((m) => m.role === role);
        const avg = Math.round(items.reduce((a, m) => a + m.completion, 0) / Math.max(items.length, 1));
        return (
          <Card key={role} className="border-white/10 bg-white/[0.02] p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold capitalize">{role} path</h2>
              <Badge variant="outline" className="border-white/15 text-muted-foreground">avg {avg}%</Badge>
            </div>
            <div className="mt-3 space-y-2">
              {items.map((m) => (
                <div key={m.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground">{m.id}</span>
                    <span>{m.title}</span>
                    <span className="text-xs text-muted-foreground">· {m.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground">{m.completion}%</span>
                    <Badge variant="outline" className={TONE[m.status]}>{m.status.replace("_", " ")}</Badge>
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
