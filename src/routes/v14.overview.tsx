import { createFileRoute } from "@tanstack/react-router";
import { Gauge } from "lucide-react";
import { V14Page } from "@/components/v14/V14Page";
import { ScoreCard, KpiGrid, ExecHeadline, Section, SimpleTable, TrendBars } from "@/components/v14/ui-bits";
import * as H from "@/v14/hooks";

function Page() {
  const sos = H.useEnterpriseStrategicOperatingSystem();
  const tr = H.useV14SosTrends();
  const h = H.useV14ExecHeadline();
  const cap = H.useCapitalExecutionMaturity();
  const dur = H.useLongTermRevenueDurability();
  const mp = H.useMarketplaceEconomicsGovernance();
  const cat = H.useCategoryLeadershipStewardship();
  const tower = H.useExecutiveValueCreationControl();
  const teaser = H.useV14Phase42Teaser();
  const edge = H.useV14EdgeVsServerFn();
  return (
    <V14Page icon={<Gauge className="size-6 text-cyan-300" />} title="Anderoute V14 — Enterprise Strategic Operating System" blurb="Mock-only. Capital execution, long-term revenue durability, global marketplace economics, category leadership, board-level strategic execution. No autonomous dispatch. No final IPO/audit/SOC2/ISO claims.">
      <ExecHeadline tag="V14 exec headline" headline={h.headline} bullets={h.highlights} />
      <div className="grid gap-3 md:grid-cols-5">
        <ScoreCard label="Strategic OS"      value={sos.score} tone="violet" />
        <ScoreCard label="Capital execution" value={cap.score} tone="amber" />
        <ScoreCard label="Revenue durability" value={dur.score} tone="emerald" />
        <ScoreCard label="MP economics"      value={mp.score}  tone="rose" />
        <ScoreCard label="Category leadership" value={cat.score} tone="sky" />
      </div>
      <KpiGrid cols={4} items={[
        { label: "Value tower",  value: `${tower.score}%`, sub: "Top-5 actions" },
        { label: "Strategic OS QoQ", value: `+${sos.trend_qoq}`, sub: "vs Q-1" },
        { label: "Open gaps",    value: sos.gaps.length, sub: "Tracked" },
        { label: "Decisions",    value: tower.decisions.length, sub: "Pending board" },
      ]} />
      <div className="grid gap-3 md:grid-cols-2">
        <TrendBars title="Strategic OS QoQ" points={tr.map(t => ({ label: t.q, value: t.sos, sub: `Cap ${t.cap}` }))} />
        <TrendBars title="Durability vs MP" accent="bg-emerald-400/60" labelColor="text-emerald-200"
          points={tr.map(t => ({ label: t.q, value: t.dur, sub: `MP ${t.mp}` }))} />
      </div>
      <Section title="Strategic operating dimensions">
        <SimpleTable rows={sos.dims as any} columns={[
          { key: "dim", label: "Dimension" }, { key: "pct", label: "%" },
        ]} />
      </Section>
      <Section title="Edge Function vs ServerFn separation">
        <SimpleTable rows={edge as any} columns={[
          { key: "kind", label: "Kind" }, { key: "surface", label: "Surface" },
          { key: "example", label: "Example" }, { key: "why", label: "Why" },
        ]} />
      </Section>
      <ExecHeadline tag="Phase 42 (V14.5) teaser — not started" headline="Enterprise operating excellence + strategic capital discipline" bullets={teaser} />
    </V14Page>
  );
}

export const Route = createFileRoute("/v14/overview")({
  head: () => ({ meta: [{ title: "V14 Overview · Phase 41" }] }),
  component: Page,
});
