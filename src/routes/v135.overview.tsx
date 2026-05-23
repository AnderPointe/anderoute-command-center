import { createFileRoute } from "@tanstack/react-router";
import { Gauge } from "lucide-react";
import { V135Page } from "@/components/v135/V135Page";
import { ScoreCard, SimpleTable, TrendBars, ExecHeadline, Section, KpiGrid, StatusPill } from "@/components/v135/ui-bits";
import * as H from "@/v135/hooks";

function Page() {
  const dur = H.useV135Durability();
  const headline = H.useV135ExecHeadline();
  const exec = H.useV135ExecStewardship();
  const board = H.useV135BoardStewardship();
  const ret = H.useV135Retention();
  const teaser = H.useV135Phase41Teaser();
  const edge = H.useV135EdgeVsServerFnExt();
  const vm = H.useV135ValueMaturity();
  const vt = H.useV135ValueTrends();
  const cap = H.useV135CapitalStrategy();
  const drivers = H.useV135ValueDrivers();
  const real = H.useV135ValueRealization();
  return (
    <V135Page icon={<Gauge className="size-6 text-fuchsia-300" />} title="Anderoute V13.5 — Enterprise Value Creation Maturity" blurb="Mock-only. Value-creation maturity across capital strategy, revenue durability, marketplace economics, board strategic OS, and value driver management. No autonomous dispatch. No final IPO / audit / SOC 2 / ISO claims.">
      <ExecHeadline tag="V13.5 exec headline" headline={headline.headline} bullets={headline.highlights} />

      <div className="grid gap-3 md:grid-cols-5">
        <ScoreCard label="Value maturity"   value={vm.score}    tone="violet" />
        <ScoreCard label="Capital strategy" value={cap.score}   tone="amber" />
        <ScoreCard label="Durability"       value={dur.score}   tone="emerald" />
        <ScoreCard label="Board steward"    value={board.score} tone="sky" />
        <ScoreCard label="NRR"              value={`${ret.nrr_pct}%`} tone="rose" />
      </div>

      <KpiGrid cols={4} items={[
        { label: "Value realized",      value: `${real.realized_pct}%`, sub: `${real.in_flight_pct}% in flight` },
        { label: "Value at-risk",       value: `${real.at_risk_pct}%`,  sub: "Mitigations active" },
        { label: "Maturity QoQ",        value: `+${vm.trend_qoq}`,       sub: "vs Q-1" },
        { label: "Exec stewardship",    value: `${exec.score}%`,         sub: "Logged" },
      ]} />

      <div className="grid gap-3 md:grid-cols-2">
        <TrendBars
          title="Maturity trend (QoQ)"
          points={vt.map((t) => ({ label: t.q, value: t.maturity, sub: `Cap ${t.capital}` }))}
        />
        <TrendBars
          title="Durability vs Board OS (QoQ)"
          accent="bg-emerald-400/60" labelColor="text-emerald-200"
          points={vt.map((t) => ({ label: t.q, value: t.durability, sub: `Board ${t.board}` }))}
        />
      </div>

      <Section title="Enterprise value drivers">
        <SimpleTable rows={drivers as any} columns={[
          { key: "driver", label: "Driver" }, { key: "weight", label: "Wt" },
          { key: "value", label: "Value" }, { key: "trend", label: "Trend" }, { key: "note", label: "Note" },
        ]} />
      </Section>

      <Section title="Capital strategy execution">
        <SimpleTable rows={cap.pillars as any} columns={[
          { key: "lever", label: "Lever" },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
          { key: "owner", label: "Owner" },
        ]} />
      </Section>

      <Section title="Value maturity pillars">
        <SimpleTable rows={vm.pillars as any} columns={[
          { key: "pillar", label: "Pillar" }, { key: "pct", label: "%" },
        ]} />
      </Section>

      <Section title="Edge Function vs ServerFn separation">
        <SimpleTable rows={edge as any} columns={[
          { key: "kind", label: "Kind" }, { key: "surface", label: "Surface" },
          { key: "example", label: "Example" }, { key: "why", label: "Why" },
        ]} />
      </Section>

      <ExecHeadline tag="Phase 41 (V14) teaser — not started" headline="Long-horizon capital execution + board strategic execution audit" bullets={teaser} />
    </V135Page>
  );
}

export const Route = createFileRoute("/v135/overview")({
  head: () => ({ meta: [{ title: "V13.5 Overview · Phase 40 polish" }] }),
  component: Page,
});
