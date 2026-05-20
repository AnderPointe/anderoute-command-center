import { createFileRoute } from "@tanstack/react-router";
import { MessageSquare } from "lucide-react";
import { PilotPage } from "@/components/pilot/PilotPage";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FEEDBACK_THEMES } from "@/pilot/data/mockPhase13Extra";

export const Route = createFileRoute("/pilot/feedback")({
  head: () => ({ meta: [{ title: "Pilot Feedback · Anderoute" }] }),
  component: Page,
});

const TONE: Record<string, string> = {
  positive: "border-emerald-500/30 text-emerald-300",
  neutral: "border-white/15 text-muted-foreground",
  negative: "border-rose-500/30 text-rose-300",
};

const FIELDS = [
  "Role", "Workflow", "Rating", "What worked well", "What was confusing",
  "What slowed you down", "Missing feature", "Bug encountered", "Urgency", "Notes",
];

function Page() {
  return (
    <PilotPage
      icon={<MessageSquare className="size-6 text-teal-300" />}
      title="Pilot Feedback Center"
      blurb="Structured feedback from dispatchers, drivers, customers, and admins — clustered into themes and converted into backlog items."
    >
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Feedback form fields</h2>
        <div className="mt-2 flex flex-wrap gap-2 text-xs">
          {FIELDS.map((f) => (
            <Badge key={f} variant="outline" className="border-white/15 text-muted-foreground">{f}</Badge>
          ))}
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Current themes</h2>
        <div className="mt-3 space-y-2">
          {FEEDBACK_THEMES.map((t) => (
            <div key={t.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground">{t.id}</span>
                <span>{t.theme}</span>
                <Badge variant="outline" className="border-white/15 text-muted-foreground">{t.role}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground">×{t.count}</span>
                <Badge variant="outline" className={TONE[t.sentiment]}>{t.sentiment}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </PilotPage>
  );
}
