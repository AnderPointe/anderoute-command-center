import { createFileRoute } from "@tanstack/react-router";
import { Layers } from "lucide-react";
import { V16Page } from "@/components/v16/V16Page";
import { Section, SimpleTable, StatusPill } from "@/components/v16/ui-bits";
import * as H from "@/v16/hooks";

function Page() {
  const scope = H.useV16Scope();
  const matrix = H.useV16FeatureMatrix();
  return (
    <V16Page icon={<Layers className="size-6 text-cyan-300" />} title="V16 Scope & Feature Matrix"
      blurb="Scope board and feature maturity for V16 — clear about what is in (assist-only governance) and what is deferred (fully autonomous dispatch, pricing, capital and board actions).">
      <Section title="V16 scope board">
        <SimpleTable rows={scope as any} columns={[
          { key: "area", label: "Area" },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status === "in_progress" ? "healthy" : r.status === "deferred" ? "watchlist" : "blocked"} /> },
          { key: "note", label: "Note" },
        ]} />
      </Section>
      <Section title="V16 feature matrix">
        <SimpleTable rows={matrix as any} columns={[
          { key: "feature", label: "Feature" },
          { key: "maturity", label: "Maturity" },
          { key: "owner", label: "Owner" },
        ]} />
      </Section>
      <Section title="Deferred scope">
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Fully autonomous dispatch, pricing, billing, marketplace, customer/carrier, legal, board, capital actions</li>
          <li>Final IPO / acquisition / audited financial / SOC 2 / ISO / CarPlay / Android Auto claims</li>
          <li>Full customs production, international tax automation, insurance underwriting, autonomous vehicle workflows</li>
        </ul>
      </Section>
    </V16Page>
  );
}

export const Route = createFileRoute("/v16/scope")({ component: Page });
