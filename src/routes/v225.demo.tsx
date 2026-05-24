import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { V225Page } from "@/components/v225/V225Page";
import { Section, SimpleTable } from "@/components/v225/ui-bits";
import * as H from "@/v225/hooks";
function Page() {
  return (
    <V225Page icon={<ListChecks className="size-6 text-emerald-300" />} title="V22.5 Demo Flow" blurb="End-to-end CEO · Board · RevOps · MP · CCO · Partner Ops · CISO · Governance · Risk · ELT walkthrough.">
      <Section title="Demo steps">
        <SimpleTable rows={H.useV225Demo() as any} columns={[
          { key: "id", label: "#" }, { key: "actor", label: "Actor" }, { key: "step", label: "Step" },
        ]} />
      </Section>
    </V225Page>
  );
}
export const Route = createFileRoute("/v225/demo")({ component: Page });
