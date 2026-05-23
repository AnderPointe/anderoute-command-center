import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp } from "lucide-react";
import { V14Page } from "@/components/v14/V14Page";
import { ScoreCard, Section, SimpleTable, StatusPill, KpiGrid } from "@/components/v14/ui-bits";
import * as H from "@/v14/hooks";

function Page() {
  const d = H.useLongTermRevenueDurability();
  return (
    <V14Page icon={<TrendingUp className="size-6 text-cyan-300" />} title="Long-Term Revenue Durability Center" blurb="Revenue durability across recurring, usage, marketplace, API, EDI, partner, expansion, renewal — with concentration risk.">
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="Durability score" value={d.score} tone="emerald" />
        <ScoreCard label="Payment health" value={`${d.payment_health}%`} tone="sky" />
        <ScoreCard label="Evidence to refresh" value={d.evidence_to_refresh} tone="amber" />
      </div>
      <Section title="Domains">
        <SimpleTable rows={d.domains as any} columns={[
          { key: "domain", label: "Domain" },
          { key: "durability", label: "Durability", render: (r: any) => <StatusPill status={r.durability} /> },
          { key: "evidence", label: "Evidence", render: (r: any) => <StatusPill status={r.evidence} /> },
          { key: "risk", label: "Risk", render: (r: any) => <StatusPill status={r.risk} /> },
        ]} />
      </Section>
      <Section title="Concentration risk">
        <SimpleTable rows={d.concentration as any} columns={[
          { key: "lens", label: "Lens" }, { key: "pct", label: "%" },
          { key: "trend", label: "Trend" },
          { key: "risk", label: "Risk", render: (r: any) => <StatusPill status={r.risk} /> },
        ]} />
      </Section>
      <KpiGrid cols={4} items={[
        { label: "Action 1", value: "Evidence refresh", sub: "RevOps" },
        { label: "Action 2", value: "Concentration plan", sub: "CRO" },
        { label: "Action 3", value: "API metering audit", sub: "API PM" },
        { label: "Action 4", value: "MP durability proof", sub: "MP Ops" },
      ]} />
    </V14Page>
  );
}

export const Route = createFileRoute("/v14/revenue-durability")({
  head: () => ({ meta: [{ title: "Revenue Durability · V14" }] }),
  component: Page,
});
