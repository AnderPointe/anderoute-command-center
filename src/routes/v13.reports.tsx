import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart } from "lucide-react";
import { V13Page } from "@/components/v13/V13Page";
import { Card } from "@/components/ui/card";
import * as H from "@/v13/hooks";

function Page() {
  const reports = H.useReportsV13();
  return (
    <V13Page icon={<FileBarChart className="size-6 text-indigo-300" />} title="V13 Reports" blurb="All capital-grade reports. Mock-only; exports are placeholders.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Available reports ({reports.length})</h3>
        <ul className="mt-2 grid grid-cols-1 gap-1.5 text-sm md:grid-cols-2">
          {reports.map((r) => (
            <li key={r} className="flex items-center justify-between rounded border border-white/10 bg-white/[0.02] px-3 py-1.5">
              <span>{r}</span>
              <span className="text-xs text-muted-foreground">placeholder export</span>
            </li>
          ))}
        </ul>
      </Card>
    </V13Page>
  );
}

export const Route = createFileRoute("/v13/reports")({
  head: () => ({ meta: [{ title: "Reports · Phase 39" }] }),
  component: Page,
});
