import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays } from "lucide-react";
import { PilotPage } from "@/components/pilot/PilotPage";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DAILY_REVIEW } from "@/pilot/data/mockPhase13Extra";

export const Route = createFileRoute("/pilot/daily-review")({
  head: () => ({ meta: [{ title: "Daily Pilot Review · Anderoute" }] }),
  component: Page,
});

function Page() {
  const d = DAILY_REVIEW;
  const stats: { label: string; value: number }[] = [
    { label: "Loads completed",   value: d.loadsCompleted },
    { label: "Open loads",        value: d.openLoads },
    { label: "GPS issues",        value: d.gpsIssues },
    { label: "Driver issues",     value: d.driverIssues },
    { label: "Dispatcher issues", value: d.dispatcherIssues },
    { label: "Portal issues",     value: d.portalIssues },
    { label: "Support tickets",   value: d.supportTickets },
    { label: "Bugs opened",       value: d.bugsOpened },
    { label: "Bugs closed",       value: d.bugsClosed },
    { label: "Feedback received", value: d.feedbackReceived },
  ];
  return (
    <PilotPage
      icon={<CalendarDays className="size-6 text-teal-300" />}
      title="Daily Pilot Review"
      blurb={`Snapshot for ${d.date} — workflows, issues, and tomorrow's action items.`}
    >
      <div className="grid gap-3 md:grid-cols-5">
        {stats.map((s) => (
          <Card key={s.label} className="border-white/10 bg-white/[0.02] p-4">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">{s.label}</div>
            <div className="mt-1 text-2xl font-semibold">{s.value}</div>
          </Card>
        ))}
      </div>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Next actions</h2>
        <ul className="mt-2 space-y-2 text-sm">
          {d.nextActions.map((a) => (
            <li key={a} className="flex items-center gap-2">
              <Badge variant="outline" className="border-teal-500/30 text-teal-300">action</Badge>
              <span>{a}</span>
            </li>
          ))}
        </ul>
      </Card>
    </PilotPage>
  );
}
