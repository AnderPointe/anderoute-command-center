import { createFileRoute } from "@tanstack/react-router";
import { CalendarCheck } from "lucide-react";
import { PilotPage } from "@/components/pilot/PilotPage";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WEEKLY_REVIEW } from "@/pilot/data/mockPhase13Extra";

export const Route = createFileRoute("/pilot/weekly-review")({
  head: () => ({ meta: [{ title: "Weekly Pilot Review · Anderoute" }] }),
  component: Page,
});

function Page() {
  const w = WEEKLY_REVIEW;
  return (
    <PilotPage
      icon={<CalendarCheck className="size-6 text-teal-300" />}
      title="Weekly Pilot Review"
      blurb={w.week}
    >
      <div className="grid gap-3 md:grid-cols-3">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Adoption</h3>
          <div className="mt-2 space-y-1 text-sm">
            <div className="flex justify-between"><span>Driver</span><span className="font-mono">{w.adoption.driver}</span></div>
            <div className="flex justify-between"><span>Dispatcher</span><span className="font-mono">{w.adoption.dispatcher}</span></div>
            <div className="flex justify-between"><span>Customer</span><span className="font-mono">{w.adoption.customer}</span></div>
          </div>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Workflow</h3>
          <div className="mt-2 space-y-1 text-sm">
            <div className="flex justify-between"><span>Loads completed</span><span className="font-mono">{w.loadsCompleted}</span></div>
            <div className="flex justify-between"><span>GPS reliability</span><span className="font-mono">{w.gpsReliability}</span></div>
            <div className="flex justify-between"><span>POD completion</span><span className="font-mono">{w.podCompletion}</span></div>
          </div>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Support + bugs</h3>
          <div className="mt-2 space-y-1 text-sm">
            <div className="flex justify-between"><span>Support volume</span><span className="font-mono">{w.supportVolume}</span></div>
            <div className="flex justify-between"><span>Bugs opened</span><span className="font-mono">{w.bugsOpened}</span></div>
            <div className="flex justify-between"><span>Bugs closed</span><span className="font-mono">{w.bugsClosed}</span></div>
          </div>
        </Card>
      </div>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Themes</h2>
        <ul className="mt-2 space-y-2 text-sm">
          {w.themes.map((t) => (
            <li key={t} className="flex items-start gap-2">
              <Badge variant="outline" className="border-white/15 text-muted-foreground">theme</Badge>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Recommendations</h2>
        <ul className="mt-2 space-y-2 text-sm">
          {w.recommendations.map((t) => (
            <li key={t} className="flex items-start gap-2">
              <Badge variant="outline" className="border-teal-500/30 text-teal-300">rec</Badge>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </Card>
    </PilotPage>
  );
}
