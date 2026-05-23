import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V165Page } from "@/components/v165/V165Page";
import { ExecHeadline, ScoreCard, KpiGrid, Section, SimpleTable } from "@/components/v165/ui-bits";
import * as H from "@/v165/hooks";

function Page() {
  const h = H.useV165Headline();
  const pg = H.usePredictiveGovernance();
  const headlines = H.useV165PolishHeadlines();
  const heatmap = H.useV165OwnerHeatmap();
  const freshness = H.useV165EvidenceFreshness();
  const edge = H.useV165EdgeBoundaryPolish();
  const rls = H.useV165RlsPolish();
  const roadmap = H.useV165RoadmapPolish();
  const teaser = H.useV165Phase47TeaserPolish();
  return (
    <V165Page icon={<ShieldCheck className="size-6 text-emerald-300" />}
      title="Anderoute V16.5 — Predictive Governance Maturity"
      blurb="Polish layer. CoPilot predicts, assembles evidence, routes approvals, and tracks outcomes. Every high-impact action requires a human approver who is not the recommender.">
      <ExecHeadline tag="V16.5 headline" headline={h.headline} bullets={h.highlights} />
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Predictive governance" value={pg.score} tone="emerald" />
        <ScoreCard label="Approval orchestration" value="92%" tone="violet" />
        <ScoreCard label="Evidence automation" value="88%" tone="amber" />
        <ScoreCard label="Revenue automation" value="86%" tone="sky" />
      </div>
      <KpiGrid cols={4} items={pg.kpis} />
      <Section title="Per-area headlines (12 polish areas)">
        <SimpleTable rows={headlines as any} columns={[
          { key: "area", label: "Area" }, { key: "headline", label: "Headline" }, { key: "owner", label: "Owner" },
        ]} />
      </Section>
      <Section title="Owner approval heatmap (last 7 days)">
        <SimpleTable rows={heatmap as any} columns={[
          { key: "owner", label: "Owner" }, { key: "pending", label: "Pending" },
          { key: "approved7d", label: "Approved 7d" }, { key: "rejected7d", label: "Rejected 7d" },
          { key: "sla", label: "SLA" },
        ]} />
      </Section>
      <Section title="Evidence freshness by category">
        <SimpleTable rows={freshness as any} columns={[
          { key: "category", label: "Category" }, { key: "fresh", label: "Fresh %" },
          { key: "stale", label: "Stale items" }, { key: "owner", label: "Owner" },
        ]} />
      </Section>
      <Section title="ServerFn · /api/public · Edge boundary">
        <SimpleTable rows={edge as any} columns={[
          { key: "layer", label: "Layer" }, { key: "concern", label: "Concern" },
          { key: "auth", label: "Auth" },   { key: "returns", label: "Returns" },
        ]} />
      </Section>
      <Section title="RLS policy examples (polished)">
        <SimpleTable rows={rls as any} columns={[
          { key: "name", label: "Policy" }, { key: "target", label: "Target" }, { key: "sql", label: "SQL sketch" },
        ]} />
      </Section>
      <Section title="Long-term predictive governance roadmap">
        <SimpleTable rows={roadmap as any} columns={[
          { key: "horizon", label: "Horizon" }, { key: "focus", label: "Focus" }, { key: "signal", label: "Signal" },
        ]} />
      </Section>
      <p className="text-xs text-muted-foreground">{teaser}</p>
    </V165Page>
  );
}
export const Route = createFileRoute("/v165/overview")({ component: Page });
