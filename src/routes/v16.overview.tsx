import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V16Page } from "@/components/v16/V16Page";
import { ExecHeadline, ScoreCard, KpiGrid, Section, SimpleTable } from "@/components/v16/ui-bits";
import * as H from "@/v16/hooks";

function Page() {
  const h = H.useV16Headline();
  const gov = H.useAutonomousAssistGovernance();
  const board = H.useCapitalGradeBoardIntelligence();
  const edge = H.useV16EdgeBoundary();
  const teaser = H.useV16Phase46Teaser();
  return (
    <V16Page icon={<ShieldCheck className="size-6 text-cyan-300" />}
      title="Anderoute V16 — Autonomous-Assist Operating Governance"
      blurb="Mock-only. CoPilot predicts, recommends, explains and tracks outcomes — humans approve every high-impact action across capital, revenue, marketplace, accounts, partners, product, category, and board.">
      <ExecHeadline tag="V16 headline" headline={h.headline} bullets={h.highlights} />
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Assist governance" value={gov.score} tone="violet" />
        <ScoreCard label="Approval SLA" value="91%" tone="emerald" />
        <ScoreCard label="Explainability" value="89%" tone="amber" />
        <ScoreCard label="Board intel" value={board.score} tone="sky" />
      </div>
      <KpiGrid cols={4} items={gov.kpis.slice(0, 8)} />
      <Section title="ServerFn vs /api/public vs Edge boundary">
        <SimpleTable rows={edge as any} columns={[
          { key: "layer", label: "Layer" },
          { key: "concern", label: "Concern" },
          { key: "auth", label: "Auth" },
          { key: "returns", label: "Returns" },
        ]} />
      </Section>
      <p className="text-xs text-muted-foreground">{teaser}</p>
    </V16Page>
  );
}

export const Route = createFileRoute("/v16/overview")({ component: Page });
