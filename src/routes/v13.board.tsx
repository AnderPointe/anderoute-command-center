import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart } from "lucide-react";
import { V13Page } from "@/components/v13/V13Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable, StatusPill } from "@/components/v13/ui-bits";
import * as H from "@/v13/hooks";

function Page() {
  const b = H.useBoardCapitalGovernance();
  const ready = b.packet.filter((p) => p.status === "ready").length;
  return (
    <V13Page icon={<FileBarChart className="size-6 text-indigo-300" />} title="Board Capital Governance Center" blurb="Capital review calendar, board packet, decisions, and actions.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Reviews" value={b.calendar.length} tone="emerald" />
        <ScoreCard label="Packet sections" value={b.packet.length} tone="sky" />
        <ScoreCard label="Ready" value={ready} tone="violet" />
        <ScoreCard label="Decisions queued" value={b.decisions.length} tone="amber" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Capital review calendar</h3>
        <SimpleTable rows={b.calendar as any} columns={[
          { key: "review", label: "Review" }, { key: "cadence", label: "Cadence" }, { key: "owner", label: "Owner" },
        ]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Board packet</h3>
        <SimpleTable rows={b.packet as any} columns={[
          { key: "section", label: "Section" }, { key: "owner", label: "Owner" },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
        ]} />
      </Card>
      <div className="grid gap-3 lg:grid-cols-2">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Decisions</h3>
          <SimpleTable rows={b.decisions as any} columns={[{ key: "decision", label: "Decision" }, { key: "owner", label: "Owner" }, { key: "status", label: "Status" }]} />
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Action items</h3>
          <SimpleTable rows={b.actions as any} columns={[{ key: "action", label: "Action" }, { key: "owner", label: "Owner" }, { key: "due", label: "Due" }]} />
        </Card>
      </div>
    </V13Page>
  );
}

export const Route = createFileRoute("/v13/board")({
  head: () => ({ meta: [{ title: "Board Capital · Phase 39" }] }),
  component: Page,
});
