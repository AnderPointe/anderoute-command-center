import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart } from "lucide-react";
import { V12Page } from "@/components/v12/V12Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable, StatusPill } from "@/components/v12/ui-bits";
import * as H from "@/v12/hooks";

function Page() {
  const b = H.useBoardReadyRevenueReporting();
  const ready = b.sections.filter((s) => s.status === "ready").length;
  const atRisk = b.sections.filter((s) => s.status === "at_risk").length;
  return (
    <V12Page icon={<FileBarChart className="size-6 text-cyan-300" />} title="Board-Ready Revenue Reporting" blurb="Board pack with pipeline, revenue quality, expansion, renewal, MP / API-EDI / partner governance, procurement, risks, and queued decisions.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Sections"        value={String(b.sections.length)} tone="sky" />
        <ScoreCard label="Ready"           value={String(ready)}              tone="emerald" />
        <ScoreCard label="At risk"         value={String(atRisk)}             tone="amber" />
        <ScoreCard label="Decisions queued" value={String(b.decisions.length)} tone="violet" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Sections</h3>
        <SimpleTable rows={b.sections as any} columns={[
          { key: "section", label: "Section" },
          { key: "status",  label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
          { key: "note",    label: "Note" },
        ]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Decisions needed</h3>
        <SimpleTable rows={b.decisions as any} columns={[
          { key: "decision", label: "Decision" }, { key: "owner", label: "Owner" }, { key: "due", label: "Due" },
        ]} />
      </Card>
    </V12Page>
  );
}

export const Route = createFileRoute("/v12/board")({
  head: () => ({ meta: [{ title: "Board-Ready Revenue · V12" }] }),
  component: Page,
});
