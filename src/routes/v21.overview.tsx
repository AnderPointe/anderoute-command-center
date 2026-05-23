import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V21Page } from "@/components/v21/V21Page";
import { ExecHeadline, ScoreCard, Section, SimpleTable } from "@/components/v21/ui-bits";
import * as H from "@/v21/hooks";

function Page() {
  const h = H.useV21Headline();
  const n = H.useEnterpriseTrustIntelligenceNetwork();
  const rls = H.useV21Rls();
  const edge = H.useV21Edge();
  const guards = H.useV21Guardrails();
  const teaser = H.useV21Phase56Teaser();
  return (
    <V21Page icon={<ShieldCheck className="size-6 text-cyan-300" />}
      title="Anderoute V21 — Enterprise Trust Intelligence Network"
      blurb="Mock-only. Customer, partner, marketplace, board, revenue, product, category, evidence, approvals, audits, exceptions, and executive oversight connected through one trust-led network — HITL on every high-impact assist.">
      <ExecHeadline tag="V21 headline" headline={h.headline} bullets={h.highlights} />
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Trust intelligence network" value={n.score} tone="violet" />
        <ScoreCard label="Customer trust scale" value={94} tone="emerald" />
        <ScoreCard label="Partner trust scale" value={92} tone="emerald" />
        <ScoreCard label="Board trust execution" value={95} tone="emerald" />
      </div>
      <Section title="Server boundary (ServerFn vs public route)">
        <SimpleTable rows={edge.serverfn.slice(0, 12) as any} columns={[
          { key: "name", label: "ServerFn" }, { key: "kind", label: "Kind" }, { key: "auth", label: "Auth" },
        ]} />
        <SimpleTable rows={edge.edge_routes as any} columns={[
          { key: "path", label: "Public route" }, { key: "purpose", label: "Purpose" },
        ]} />
      </Section>
      <Section title="RLS policy examples">
        <SimpleTable rows={rls as any} columns={[
          { key: "policy", label: "Policy" }, { key: "rule", label: "Rule" }, { key: "surface", label: "Surface" },
        ]} />
      </Section>
      <Section title="Guardrails (still enforced)">
        <ul className="text-sm text-muted-foreground">{guards.map((g) => <li key={g}>· {g}</li>)}</ul>
      </Section>
      <Section title="Phase 56 teaser">
        <p className="text-sm text-muted-foreground"><b>{teaser.version}</b> — {teaser.themes.join(" · ")}</p>
      </Section>
    </V21Page>
  );
}
export const Route = createFileRoute("/v21/overview")({ component: Page });
