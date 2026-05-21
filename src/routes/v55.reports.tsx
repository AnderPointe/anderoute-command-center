import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart } from "lucide-react";
import { V55Page } from "@/components/v55/V55Page";
import { Card } from "@/components/ui/card";
import { useReportsV55 } from "@/v55/hooks";

export const Route = createFileRoute("/v55/reports")({
  head: () => ({ meta: [{ title: "V5.5 Reports · Anderoute" }] }),
  component: () => {
    const { reports } = useReportsV55();
    return (
      <V55Page icon={<FileBarChart className="size-6 text-amber-300" />} title="V5.5 Advanced Reporting"
        blurb="Board, leadership, defensibility, monetization, marketplace, partnership, retention, certification, risk, roadmap, data-room and reliability reports.">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <ul className="grid gap-2 text-sm md:grid-cols-2">
            {reports.map(r => (
              <li key={r} className="rounded border border-white/10 bg-white/[0.02] px-3 py-2 text-muted-foreground">· {r}</li>
            ))}
          </ul>
          <p className="mt-3 text-[10px] text-muted-foreground">Exports run via TanStack server functions with `requireSupabaseAuth` and role checks.</p>
        </Card>
      </V55Page>
    );
  },
});
