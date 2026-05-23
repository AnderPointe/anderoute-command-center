import { createFileRoute } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { V185Page } from "@/components/v185/V185Page";
import { Section, SimpleTable } from "@/components/v185/ui-bits";
import * as H from "@/v185/hooks";

function Page() {
  const r = H.useReportsV185();
  return (
    <V185Page icon={<FileText className="size-6 text-cyan-300" />} title="V18.5 Reports Dashboard"
      blurb="20 reports across assurance, resilience, board, revenue/MP/exec, approval/rec/outcome/evidence/risk assurance, domain controls, audit, board, roadmap.">
      <Section title="Reports">
        <SimpleTable rows={r as any} columns={[{ key: "name", label: "Report" }, { key: "status", label: "Status" }, { key: "owner", label: "Owner" }]} />
      </Section>
    </V185Page>
  );
}
export const Route = createFileRoute("/v185/reports")({ component: Page });
