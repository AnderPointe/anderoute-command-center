import { createFileRoute } from "@tanstack/react-router";
import { Trophy } from "lucide-react";
import { V55Page } from "@/components/v55/V55Page";
import { SimpleTable, StatusPill } from "@/components/v55/ui-bits";
import { Card } from "@/components/ui/card";
import { useStrategicMoats } from "@/v55/hooks";

export const Route = createFileRoute("/v55/moats")({
  head: () => ({ meta: [{ title: "Strategic Moats · Anderoute V5.5" }] }),
  component: () => {
    const { moats } = useStrategicMoats();
    return (
      <V55Page icon={<Trophy className="size-6 text-amber-300" />} title="Strategic Moat Tracker"
        blurb="Strength, evidence, weakness, investment, competitor risk, timeline and owner for every category of moat.">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={moats} columns={[
            { key: "name",       label: "Moat" },
            { key: "strength",   label: "Strength" },
            { key: "evidence",   label: "Evidence" },
            { key: "weakness",   label: "Weakness" },
            { key: "investment", label: "Investment" },
            { key: "risk",       label: "Risk", render: (r) => <StatusPill status={r.risk} /> },
            { key: "owner",      label: "Owner" },
            { key: "timeline",   label: "Timeline" },
          ]} />
        </Card>
      </V55Page>
    );
  },
});
