import { createFileRoute } from "@tanstack/react-router";
import { Boxes } from "lucide-react";
import { V14Page } from "@/components/v14/V14Page";
import { ScoreCard, Section, SimpleTable, StatusPill } from "@/components/v14/ui-bits";
import * as H from "@/v14/hooks";

function Page() {
  const p = H.useProductLineStrategicStewardship();
  return (
    <V14Page icon={<Boxes className="size-6 text-cyan-300" />} title="Product-Line Strategic Stewardship" blurb="12 product lines · adoption, retention, expansion, support, debt, competitive, investment recommendation.">
      <ScoreCard label="Product stewardship" value={p.score} tone="violet" />
      <Section title="Product lines">
        <SimpleTable rows={p.lines as any} columns={[
          { key: "line", label: "Line" }, { key: "value", label: "Val" },
          { key: "adoption", label: "Adopt" }, { key: "retention", label: "Ret" }, { key: "expansion", label: "Exp" },
          { key: "support", label: "Sup" }, { key: "reliability", label: "Rel" }, { key: "debt", label: "Debt" },
          { key: "competitive", label: "Compet" }, { key: "category", label: "Cat" },
          { key: "invest", label: "Invest", render: (r: any) => <StatusPill status={r.invest} /> },
        ]} />
      </Section>
    </V14Page>
  );
}

export const Route = createFileRoute("/v14/product-line")({
  head: () => ({ meta: [{ title: "Product Stewardship · V14" }] }),
  component: Page,
});
