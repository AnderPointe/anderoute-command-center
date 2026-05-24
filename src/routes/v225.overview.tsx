import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V225Page } from "@/components/v225/V225Page";
import { ExecHeadline, ScoreCard, Section, SimpleTable } from "@/components/v225/ui-bits";
import * as H from "@/v225/hooks";

function Page() {
  const head = H.useV225Headline();
  const auto = H.useEnterpriseLifecycleTrustAutomation();
  const feat = H.useV225FeatureMatrix();
  const rls = H.useV225Rls();
  const edge = H.useV225Edge();
  const guard = H.useV225Guardrails();
  const demo = H.useV225Demo();
  const roadmap = H.useLifecycleTrustAutomationRoadmap();
  const teaser = H.useV225Phase59Teaser();

  return (
    <V225Page icon={<ShieldCheck className="size-6 text-emerald-300" />}
      title="Anderoute V22.5 — Enterprise Lifecycle Trust Automation Scale"
      blurb="Lifecycle trust automation scaled across 20 centers. All high-impact actions HITL-gated. Approver ≠ recommender, dual sign-off > $25k, append-only evidence — enforced in middleware, not UI.">
      <ExecHeadline tag="V22.5 headline" headline={head.headline} bullets={head.highlights} />

      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Automation scale"    value={auto.score} tone="emerald" />
        <ScoreCard label="Board assurance"     value={H.useBoardLifecycleAssuranceIntelligence().score} tone="emerald" />
        <ScoreCard label="Revenue optimization" value={H.useRevenueLifecycleTrustOptimization().score} tone="emerald" />
        <ScoreCard label="MP governance"       value={H.useMarketplaceLifecycleGovernance().score} tone="emerald" />
        <ScoreCard label="Customer maturity"   value={H.useCustomerLifecycleTrustMaturity().score} tone="emerald" />
        <ScoreCard label="Partner maturity"    value={H.usePartnerLifecycleTrustMaturity().score} tone="emerald" />
        <ScoreCard label="Evidence scale"      value={H.useLifecycleEvidenceScaleGovernance().score} tone="emerald" />
        <ScoreCard label="Approval scale"      value={H.useHumanApprovalLifecycleScale().score} tone="emerald" />
      </div>

      <Section title="V22.5 feature matrix">
        <SimpleTable rows={feat as any} columns={[
          { key: "feature", label: "Feature" }, { key: "status", label: "Status" }, { key: "hitl", label: "HITL" },
        ]} />
      </Section>

      <Section title="Invariants">
        <ul className="space-y-1 text-sm text-muted-foreground">{guard.map((g, i) => <li key={i}>• {g}</li>)}</ul>
      </Section>

      <Section title="RLS policies (V22.5)">
        <SimpleTable rows={rls as any} columns={[
          { key: "policy", label: "Policy" }, { key: "rule", label: "Rule" }, { key: "surface", label: "Surface" },
        ]} />
      </Section>

      <Section title={`Server functions vs public routes — ${edge.rule}`}>
        <SimpleTable rows={edge.serverfn as any} columns={[
          { key: "name", label: "ServerFn" }, { key: "kind", label: "Kind" }, { key: "auth", label: "Auth" },
        ]} />
        <div className="mt-3">
          <SimpleTable rows={edge.edge_routes as any} columns={[
            { key: "path", label: "Public route" }, { key: "purpose", label: "Purpose" },
          ]} />
        </div>
      </Section>

      <Section title="Long-term lifecycle trust automation roadmap">
        <SimpleTable rows={roadmap.horizons as any} columns={[
          { key: "horizon", label: "Horizon" }, { key: "focus", label: "Focus" },
        ]} />
      </Section>

      <Section title="V22.5 demo flow">
        <SimpleTable rows={demo as any} columns={[
          { key: "id", label: "#" }, { key: "actor", label: "Actor" }, { key: "step", label: "Step" },
        ]} />
      </Section>

      <Section title={`Phase 59 teaser — ${teaser.version}`}>
        <ul className="space-y-1 text-sm text-muted-foreground">{teaser.themes.map((t, i) => <li key={i}>• {t}</li>)}</ul>
      </Section>
    </V225Page>
  );
}
export const Route = createFileRoute("/v225/overview")({ component: Page });
