import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { V16Page } from "@/components/v16/V16Page";
import { Section, SimpleTable } from "@/components/v16/ui-bits";
import * as H from "@/v16/hooks";

function Page() {
  const steps = H.useV16Demo();
  return (
    <V16Page icon={<ListChecks className="size-6 text-cyan-300" />} title="V16 Demo Flow"
      blurb="Persona-led walkthrough proving autonomous-assist governance is operational and that no high-impact action executes without human approval.">
      <Section title="Walkthrough">
        <SimpleTable rows={steps as any} columns={[
          { key: "step", label: "#" },
          { key: "actor", label: "Actor" },
          { key: "surface", label: "Surface" },
          { key: "expect", label: "Expected outcome" },
        ]} />
      </Section>
      <p className="text-xs text-muted-foreground">
        Acceptance: V16 scope, assist-governance, predictive perf, risk, rec governance, HITL approvals, explainability, evidence, outcomes, board intel, exec/board decision, MP optimization, 7 control domains, control maturity, roadmap, reports, and demo all reachable under <code>/v16/*</code>.
      </p>
    </V16Page>
  );
}

export const Route = createFileRoute("/v16/demo")({ component: Page });
