import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { V21Page } from "@/components/v21/V21Page";
import { Section, SimpleTable } from "@/components/v21/ui-bits";
import * as H from "@/v21/hooks";

function Page() {
  const d = H.useV21Demo();
  return (
    <V21Page icon={<ListChecks className="size-6 text-cyan-300" />} title="V21 Demo Flow"
      blurb="12-step persona walkthrough: CEO → CS → Partner → Board → RevOps → MP → CISO → CEO → Board → ELT → CEO.">
      <Section title="Demo steps">
        <SimpleTable rows={d as any} columns={[
          { key: "id", label: "Step" }, { key: "actor", label: "Actor" }, { key: "step", label: "Action" },
        ]} />
      </Section>
    </V21Page>
  );
}
export const Route = createFileRoute("/v21/demo")({ component: Page });
