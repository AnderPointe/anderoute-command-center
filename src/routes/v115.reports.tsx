import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart } from "lucide-react";
import { V115Page } from "@/components/v115/V115Page";
import { Card } from "@/components/ui/card";
import { SimpleTable, StatusPill } from "@/components/v115/ui-bits";
import * as H from "@/v115/hooks";

function Page() {
  const r = H.useReportsV115();
  return (
    <V115Page icon={<FileBarChart className="size-6 text-emerald-300" />} title="V11.5 Reports" blurb="Reports catalog. Mock-only.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <SimpleTable rows={r.reports as any} columns={[
          { key: "id",   label: "ID" },
          { key: "name", label: "Report" },
        ]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Distribution and operating rhythm</h3>
        <SimpleTable rows={r.distribution as any} columns={[
          { key: "report", label: "Report" },
          { key: "audience", label: "Audience" },
          { key: "cadence", label: "Cadence" },
          { key: "status", label: "Status", render: (row: any) => <StatusPill status={row.status} /> },
        ]} />
      </Card>
    </V115Page>
  );
}

export const Route = createFileRoute("/v115/reports")({
  head: () => ({ meta: [{ title: "Reports · V11.5" }] }),
  component: Page,
});
