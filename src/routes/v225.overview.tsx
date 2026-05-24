import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V225Page } from "@/components/v225/V225Page";
import { ExecHeadline, ScoreCard, Section, SimpleTable } from "@/components/v225/ui-bits";
import * as H from "@/v225/hooks";

function Page() {
  const head = H.useV225Headline();
  const auto = H.useEnterpriseLifecycleTrustAutomation();
  const feat = H.useV225FeatureMatrix();
  const roadmap = H.useLifecycleTrustAutomationRoadmap();
  const teaser = H.useV225Phase59Teaser();

  // Phase 58 polish
  const pDomains   = H.useV225PolishDomains();
  const pQueue     = H.useV225PolishHitlQueue();
  const pBoundary  = H.useV225PolishBoundary();
  const pRls       = H.useV225PolishRls();
  const pEdge      = H.useV225PolishEdge();
  const pInv       = H.useV225PolishInvariants();
  const pDemo      = H.useV225PolishDemo();
  const pOwners    = H.useV225PolishOwnerHeatmap();
  const pLanes     = H.useV225PolishRoadmapLanes();

  return (
    <V225Page icon={<ShieldCheck className="size-6 text-emerald-300" />}
      title="Anderoute V22.5 — Enterprise Lifecycle Trust Automation Scale"
      blurb="21 lifecycle automation centers, polished. Every high-impact action HITL-gated; approver ≠ recommender, dual sign-off > $25k, append-only evidence — enforced in RLS + server fns, not UI.">
      <ExecHeadline tag="V22.5 polish headline" headline={head.headline} bullets={head.highlights} />

      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Automation scale"      value={auto.score} tone="emerald" />
        <ScoreCard label="Board assurance"       value={H.useBoardLifecycleAssuranceIntelligence().score} tone="emerald" />
        <ScoreCard label="Revenue optimization"  value={H.useRevenueLifecycleTrustOptimization().score} tone="emerald" />
        <ScoreCard label="MP governance"         value={H.useMarketplaceLifecycleGovernance().score} tone="emerald" />
        <ScoreCard label="Customer maturity"     value={H.useCustomerLifecycleTrustMaturity().score} tone="emerald" />
        <ScoreCard label="Partner maturity"      value={H.usePartnerLifecycleTrustMaturity().score} tone="emerald" />
        <ScoreCard label="Evidence scale"        value={H.useLifecycleEvidenceScaleGovernance().score} tone="emerald" />
        <ScoreCard label="Approval scale"        value={H.useHumanApprovalLifecycleScale().score} tone="emerald" />
      </div>

      <Section title="V22.5 domain uplift — before → after (Phase 58 polish)">
        <SimpleTable rows={pDomains as any} columns={[
          { key: "domain", label: "Domain" }, { key: "before", label: "Before" }, { key: "after", label: "After" },
          { key: "owner", label: "Owner" }, { key: "note", label: "Note" },
        ]} />
      </Section>

      <Section title="Live HITL approval queue (sample)">
        <SimpleTable rows={pQueue as any} columns={[
          { key: "id", label: "#" }, { key: "surface", label: "Surface" }, { key: "action", label: "Action" },
          { key: "recommender", label: "Recommender" }, { key: "approver", label: "Approver" },
          { key: "sla", label: "SLA" }, { key: "status", label: "Status" },
        ]} />
      </Section>

      <Section title="Lifecycle boundary controls">
        <SimpleTable rows={pBoundary as any} columns={[
          { key: "surface", label: "Surface" }, { key: "control", label: "Control" },
          { key: "owner", label: "Owner" }, { key: "state", label: "State" },
        ]} />
      </Section>

      <Section title="Invariants (enforced server-side)">
        <ul className="space-y-1 text-sm text-muted-foreground">{pInv.map((g, i) => <li key={i}>• {g}</li>)}</ul>
      </Section>

      <Section title="RLS policies (V22.5, polished)">
        <SimpleTable rows={pRls as any} columns={[
          { key: "policy", label: "Policy" }, { key: "rule", label: "Rule" }, { key: "surface", label: "Surface" },
        ]} />
      </Section>

      <Section title={`Server functions vs public routes — ${pEdge.rule}`}>
        <SimpleTable rows={pEdge.serverfn as any} columns={[
          { key: "name", label: "ServerFn" }, { key: "kind", label: "Kind" }, { key: "auth", label: "Auth" },
        ]} />
        <div className="mt-3">
          <SimpleTable rows={pEdge.edge_routes as any} columns={[
            { key: "path", label: "Public route" }, { key: "purpose", label: "Purpose" },
          ]} />
        </div>
      </Section>

      <Section title="Owner heatmap">
        <SimpleTable rows={pOwners as any} columns={[
          { key: "owner", label: "Owner" }, { key: "domains", label: "Domains" }, { key: "attention", label: "Attention" },
        ]} />
      </Section>

      <Section title="Long-term lifecycle automation roadmap (lanes × quarters)">
        <SimpleTable rows={pLanes as any} columns={[
          { key: "lane", label: "Lane" }, { key: "q1", label: "Q1" }, { key: "q2", label: "Q2" },
          { key: "q3", label: "Q3" }, { key: "q4", label: "Q4" },
        ]} />
        <div className="mt-3">
          <SimpleTable rows={roadmap.horizons as any} columns={[
            { key: "horizon", label: "Horizon" }, { key: "focus", label: "Focus" },
          ]} />
        </div>
      </Section>

      <Section title="V22.5 polished demo flow (13 steps)">
        <SimpleTable rows={pDemo as any} columns={[
          { key: "id", label: "#" }, { key: "actor", label: "Actor" }, { key: "step", label: "Step" },
        ]} />
      </Section>

      <Section title="V22.5 feature matrix">
        <SimpleTable rows={feat as any} columns={[
          { key: "feature", label: "Feature" }, { key: "status", label: "Status" }, { key: "hitl", label: "HITL" },
        ]} />
      </Section>

      <Section title={`Phase 59 teaser — ${teaser.version} (not started)`}>
        <ul className="space-y-1 text-sm text-muted-foreground">{teaser.themes.map((t, i) => <li key={i}>• {t}</li>)}</ul>
      </Section>
    </V225Page>
  );
}
export const Route = createFileRoute("/v225/overview")({ component: Page });
