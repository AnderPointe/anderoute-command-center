import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { V185Page } from "@/components/v185/V185Page";
import { Section, SimpleTable } from "@/components/v185/ui-bits";
import * as H from "@/v185/hooks";

function Page() {
  const d = H.useV185Demo();
  return (
    <V185Page icon={<ListChecks className="size-6 text-cyan-300" />} title="V18.5 Demo Flow"
      blurb="12-step persona walkthrough of enterprise control assurance. Every high-impact action HITL-gated.">
      <Section title="Walkthrough">
        <SimpleTable rows={d as any} columns={[{ key: "who", label: "Persona" }, { key: "step", label: "Step" }, { key: "outcome", label: "Outcome" }]} />
      </Section>
    </V185Page>
  );
}
export const Route = createFileRoute("/v185/demo")({ component: Page });
