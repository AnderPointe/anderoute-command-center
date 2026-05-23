import { createFileRoute } from "@tanstack/react-router";
import { Megaphone } from "lucide-react";
import { V14Page } from "@/components/v14/V14Page";
import { ScoreCard, Section, SimpleTable, StatusPill, KpiGrid } from "@/components/v14/ui-bits";
import * as H from "@/v14/hooks";

function Page() {
  const m = H.useMarketplaceEconomicsGovernance();
  return (
    <V14Page icon={<Megaphone className="size-6 text-cyan-300" />} title="Global Marketplace Economics Governance Center" blurb="Regional economics, KPIs, unit-econ confidence, action plan.">
      <ScoreCard label="MP economics score" value={m.score} tone="rose" />
      <KpiGrid cols={4} items={[
        { label: "Fee capture",     value: `${m.kpis.fee_capture_pct}%` },
        { label: "Load coverage",   value: `${m.kpis.load_coverage_pct}%` },
        { label: "Avg bids/load",   value: m.kpis.avg_bids_per_load },
        { label: "Time-to-first-bid", value: `${m.kpis.time_to_first_bid_min}m` },
        { label: "Time-to-award",   value: `${m.kpis.time_to_award_min}m` },
        { label: "Carrier quality", value: m.kpis.carrier_quality },
        { label: "Carrier compliance", value: `${m.kpis.carrier_compliance}%` },
        { label: "Unit econ",       value: m.kpis.unit_econ_confidence },
      ]} />
      <Section title="Regional economics">
        <SimpleTable rows={m.regions as any} columns={[
          { key: "region", label: "Region" }, { key: "economics", label: "Economics" },
          { key: "density", label: "Density" }, { key: "take_rate", label: "Take rate" },
          { key: "risk", label: "Risk", render: (r: any) => <StatusPill status={r.risk} /> },
        ]} />
      </Section>
      <Section title="Action plan">
        <ol className="list-decimal space-y-1 pl-5 text-xs">{m.action_plan.map((a) => <li key={a}>{a}</li>)}</ol>
      </Section>
    </V14Page>
  );
}

export const Route = createFileRoute("/v14/mp-econ")({
  head: () => ({ meta: [{ title: "MP Economics · V14" }] }),
  component: Page,
});
