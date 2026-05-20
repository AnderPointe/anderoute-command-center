import { createFileRoute } from "@tanstack/react-router";
import { LifeBuoy } from "lucide-react";
import { PilotPage } from "@/components/pilot/PilotPage";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SUPPORT_TICKETS, SUPPORT_CATEGORIES } from "@/pilot/data/mockPhase13Extra";

export const Route = createFileRoute("/pilot/support")({
  head: () => ({ meta: [{ title: "Pilot Support · Anderoute" }] }),
  component: Page,
});

const TONE: Record<string, string> = {
  open: "border-rose-500/30 text-rose-300",
  in_progress: "border-sky-500/30 text-sky-300",
  waiting: "border-amber-500/30 text-amber-300",
  resolved: "border-emerald-500/30 text-emerald-300",
};

function Page() {
  return (
    <PilotPage
      icon={<LifeBuoy className="size-6 text-teal-300" />}
      title="Pilot Support Center"
      blurb="In-app tickets, escalations, FAQ, and known issues for the first pilot company."
    >
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Categories</h2>
        <div className="mt-2 flex flex-wrap gap-2">
          {SUPPORT_CATEGORIES.map((c) => (
            <Badge key={c} variant="outline" className="border-white/15 text-muted-foreground">{c}</Badge>
          ))}
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Open + recent tickets</h2>
        <div className="mt-3 space-y-2">
          {SUPPORT_TICKETS.map((t) => (
            <div key={t.id} className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground">{t.id}</span>
                <span className="font-medium">{t.subject}</span>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                <Badge variant="outline" className="border-white/15 text-muted-foreground">{t.category}</Badge>
                <Badge variant="outline" className="border-white/15 text-muted-foreground">{t.role}</Badge>
                <Badge variant="outline" className="border-white/15 text-muted-foreground">{t.priority}</Badge>
                <Badge variant="outline" className={TONE[t.status]}>{t.status.replace("_", " ")}</Badge>
                {t.owner && <Badge variant="outline" className="border-white/15 text-muted-foreground">owner: {t.owner}</Badge>}
                <span className="text-muted-foreground">· {t.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </PilotPage>
  );
}
