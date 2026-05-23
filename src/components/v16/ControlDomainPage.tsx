import { ReactNode } from "react";
import { V16Page } from "@/components/v16/V16Page";
import { Section, SimpleTable, StatusPill, ScoreCard } from "@/components/v16/ui-bits";

export function ControlDomainPage({ title, blurb, icon, rows }: { title: string; blurb: string; icon: ReactNode; rows: any[] }) {
  const passing = rows.filter((r) => r.status === "passing").length;
  const pct = Math.round((passing / rows.length) * 100);
  return (
    <V16Page title={title} blurb={blurb} icon={icon}>
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="Controls passing" value={`${pct}%`} tone="emerald" />
        <ScoreCard label="Total controls" value={rows.length} tone="violet" />
        <ScoreCard label="Exceptions" value={rows.length - passing} tone="rose" />
      </div>
      <Section title="Control matrix">
        <SimpleTable rows={rows as any} columns={[
          { key: "control", label: "Control" },
          { key: "coverage", label: "Coverage %" },
          { key: "last_tested", label: "Last tested" },
          { key: "owner", label: "Owner" },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status === "passing" ? "healthy" : "watchlist"} /> },
        ]} />
      </Section>
      <Section title="Approval & audit posture">
        <p className="text-sm text-muted-foreground">
          All recommendations in this domain require human approval before execution. Audit log captures actor, reason, evidence link, and outcome metric. No autonomous execution.
        </p>
      </Section>
    </V16Page>
  );
}
