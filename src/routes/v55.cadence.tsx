import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock } from "lucide-react";
import { V55Page } from "@/components/v55/V55Page";
import { SimpleTable } from "@/components/v55/ui-bits";
import { Card } from "@/components/ui/card";
import { useExecutiveOperatingCadence } from "@/v55/hooks";

export const Route = createFileRoute("/v55/cadence")({
  head: () => ({ meta: [{ title: "Exec Cadence · Anderoute V5.5" }] }),
  component: () => {
    const { cadences, decisions } = useExecutiveOperatingCadence();
    return (
      <V55Page icon={<CalendarClock className="size-6 text-amber-300" />} title="Executive Operating Cadence"
        blurb="Daily, weekly, monthly and quarterly operating cadences plus executive decision log.">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Operating meeting calendar</h3>
          <div className="mt-2">
            <SimpleTable rows={cadences} columns={[
              { key: "cadence",  label: "Cadence" },
              { key: "owner",    label: "Owner" },
              { key: "audience", label: "Audience" },
              { key: "duration", label: "Duration" },
            ]} />
          </div>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Executive decision tracker</h3>
          <div className="mt-2">
            <SimpleTable rows={decisions} columns={[
              { key: "date",     label: "Date" },
              { key: "topic",    label: "Topic" },
              { key: "decision", label: "Decision" },
              { key: "owner",    label: "Owner" },
            ]} />
          </div>
        </Card>
      </V55Page>
    );
  },
});
