import { createFileRoute } from "@tanstack/react-router";
import { Network } from "lucide-react";
import { V14Page } from "@/components/v14/V14Page";
import { ScoreCard, Section, SimpleTable, StatusPill } from "@/components/v14/ui-bits";
import * as H from "@/v14/hooks";

function Page() {
  const p = H.usePartnerEcosystemValueGovernance();
  return (
    <V14Page icon={<Network className="size-6 text-cyan-300" />} title="Partner Ecosystem Value Governance" blurb="Partner sourced/influenced pipeline, health, risk, next action.">
      <ScoreCard label="Partner value" value={p.score} tone="emerald" />
      <Section title="Partners">
        <SimpleTable rows={p.partners as any} columns={[
          { key: "partner", label: "Partner" }, { key: "owner", label: "Owner" }, { key: "category", label: "Category" },
          { key: "sourced", label: "Sourced" }, { key: "influenced", label: "Influenced" },
          { key: "health", label: "Health", render: (r: any) => <StatusPill status={r.health} /> },
          { key: "risk", label: "Risk", render: (r: any) => <StatusPill status={r.risk} /> },
          { key: "next", label: "Next" },
        ]} />
      </Section>
    </V14Page>
  );
}

export const Route = createFileRoute("/v14/partner-value")({
  head: () => ({ meta: [{ title: "Partner Value · V14" }] }),
  component: Page,
});
