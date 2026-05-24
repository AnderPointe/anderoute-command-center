import { createFileRoute } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { V225Page } from "@/components/v225/V225Page";
import { Section, SimpleTable } from "@/components/v225/ui-bits";
import * as H from "@/v225/hooks";
function Page() {
  return (
    <V225Page icon={<FileText className="size-6 text-emerald-300" />} title="V22.5 Advanced Reports" blurb="21 lifecycle automation reports — ready for board, executive, and operating review.">
      <Section title="Reports">
        <SimpleTable rows={H.useReportsV225() as any} columns={[
          { key: "id", label: "ID" }, { key: "name", label: "Report" },
          { key: "owner", label: "Owner" }, { key: "status", label: "Status" },
        ]} />
      </Section>
    </V225Page>
  );
}
export const Route = createFileRoute("/v225/reports")({ component: Page });
