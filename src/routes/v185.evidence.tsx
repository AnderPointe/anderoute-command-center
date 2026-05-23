import { createFileRoute } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { V185Page } from "@/components/v185/V185Page";
import { ScoreCard, KpiGrid, Section, SimpleTable } from "@/components/v185/ui-bits";
import * as H from "@/v185/hooks";

function Page() {
  const e = H.useEvidenceAssurance();
  return (
    <V185Page icon={<Lock className="size-6 text-cyan-300" />} title="Evidence Assurance Center"
      blurb="15 evidence domains: freshness, owner coverage, approval status, completeness, external/board/data-room use, exceptions, audit.">
      <ScoreCard label="Evidence assurance" value={e.score} tone="violet" />
      <KpiGrid cols={4} items={e.kpis} />
      <Section title="Evidence assurance matrix">
        <SimpleTable rows={e.matrix as any} columns={[
          { key: "domain", label: "Domain" }, { key: "fresh", label: "Freshness" },
          { key: "owner", label: "Owner" }, { key: "status", label: "Status" },
        ]} />
      </Section>
      <Section title="Exceptions">
        <SimpleTable rows={e.exceptions as any} columns={[
          { key: "id", label: "ID" }, { key: "domain", label: "Domain" }, { key: "desc", label: "Description" }, { key: "owner", label: "Owner" },
        ]} />
      </Section>
      <Section title="Action plan">
        <SimpleTable rows={e.action_plan as any} columns={[{ key: "item", label: "Action" }, { key: "owner", label: "Owner" }, { key: "due", label: "Due" }]} />
      </Section>
    </V185Page>
  );
}
export const Route = createFileRoute("/v185/evidence")({ component: Page });
