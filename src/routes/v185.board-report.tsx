import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart } from "lucide-react";
import { V185Page } from "@/components/v185/V185Page";
import { Section, SimpleTable } from "@/components/v185/ui-bits";
import * as H from "@/v185/hooks";

function Page() {
  const b = H.useBoardAssuranceReporting();
  return (
    <V185Page icon={<FileBarChart className="size-6 text-cyan-300" />} title="Board Assurance Reporting Center"
      blurb="16 sections covering assurance, resilience, board intelligence, revenue maturity, MP optimization, exec governance, approval/rec/outcome/evidence/risk assurance, exceptions, audit, decisions, priorities.">
      <Section title="Report sections">
        <SimpleTable rows={b.sections as any} columns={[
          { key: "section", label: "Section" }, { key: "status", label: "Status" }, { key: "approver", label: "Approver" },
        ]} />
      </Section>
      <Section title="Decisions needed">
        <ul className="text-sm text-muted-foreground">{b.decisions_needed.map(d => <li key={d}>· {d}</li>)}</ul>
      </Section>
    </V185Page>
  );
}
export const Route = createFileRoute("/v185/board-report")({ component: Page });
