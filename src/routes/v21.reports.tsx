import { createFileRoute } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { V21Page } from "@/components/v21/V21Page";
import { Section, SimpleTable } from "@/components/v21/ui-bits";
import * as H from "@/v21/hooks";

function Page() {
  const r = H.useReportsV21();
  return (
    <V21Page icon={<FileText className="size-6 text-cyan-300" />} title="V21 Advanced Reports"
      blurb="Mock report catalog spanning every V21 trust intelligence network center.">
      <Section title="Reports">
        <SimpleTable rows={r as any} columns={[
          { key: "id", label: "ID" }, { key: "name", label: "Report" },
          { key: "owner", label: "Owner" }, { key: "status", label: "Status" },
        ]} />
      </Section>
    </V21Page>
  );
}
export const Route = createFileRoute("/v21/reports")({ component: Page });
