import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart } from "lucide-react";
import { V16Page } from "@/components/v16/V16Page";
import { ScoreCard, KpiGrid, Section, SimpleTable } from "@/components/v16/ui-bits";
import * as H from "@/v16/hooks";

function Page() {
  const b = H.useCapitalGradeBoardIntelligence();
  return (
    <V16Page icon={<FileBarChart className="size-6 text-cyan-300" />} title="Capital-Grade Board Intelligence Center"
      blurb="Board-ready intelligence across enterprise performance, capital, revenue, marketplace, accounts, partners, product, category, risk, with recommendation outcomes, approval activity and decisions queued.">
      <ScoreCard label="Board intelligence score" value={b.score} tone="sky" />
      <KpiGrid cols={4} items={b.kpis} />
      <Section title="Board strategic signals">
        <SimpleTable rows={b.signals as any} columns={[
          { key: "signal", label: "Signal" },
          { key: "note", label: "Note" },
        ]} />
      </Section>
      <Section title="Recommendation outcomes summary">
        <KpiGrid cols={5} items={[
          { label: "Approved", value: b.rec_outcomes_summary.approved },
          { label: "Rejected", value: b.rec_outcomes_summary.rejected },
          { label: "Executed", value: b.rec_outcomes_summary.executed },
          { label: "On track", value: b.rec_outcomes_summary.on_track },
          { label: "Off track", value: b.rec_outcomes_summary.off_track },
        ]} />
      </Section>
      <Section title="Approval activity (last 30d)">
        <KpiGrid cols={3} items={[
          { label: "Total approvals", value: b.approval_activity.last_30d },
          { label: "SLA met", value: `${Math.round(b.approval_activity.sla_met * 100)}%` },
          { label: "Escalated", value: b.approval_activity.escalated },
        ]} />
      </Section>
      <Section title="Board decision intelligence queue">
        <SimpleTable rows={b.decisions_queue as any} columns={[
          { key: "decision", label: "Decision" },
          { key: "owner", label: "Owner" },
          { key: "due", label: "Due" },
        ]} />
      </Section>
    </V16Page>
  );
}

export const Route = createFileRoute("/v16/capital-board")({ component: Page });
