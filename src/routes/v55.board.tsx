import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart } from "lucide-react";
import { V55Page } from "@/components/v55/V55Page";
import { KpiGrid } from "@/components/v55/ui-bits";
import { Card } from "@/components/ui/card";
import { useBoardInvestorReporting } from "@/v55/hooks";

export const Route = createFileRoute("/v55/board")({
  head: () => ({ meta: [{ title: "Board & Investor · Anderoute V5.5" }] }),
  component: () => {
    const { report } = useBoardInvestorReporting();
    return (
      <V55Page icon={<FileBarChart className="size-6 text-amber-300" />} title="Board & Investor Reporting Center"
        blurb="Executive summary, revenue, marketplace, customer success, product, certification, risks, decisions and next-quarter priorities. Financials are placeholder.">
        <Card className="border-white/10 bg-white/[0.02] p-4 text-sm">
          <h3 className="font-semibold">Executive summary</h3>
          <p className="mt-1 text-muted-foreground">{report.exec_summary}</p>
        </Card>
        <KpiGrid cols={4} items={[
          { label: "ARR (placeholder)", value: `$${report.revenue.arr_m}M`, sub: report.revenue.growth },
          { label: "NRR",               value: `${report.revenue.nrr}%` },
          { label: "GMV (placeholder)", value: `$${report.marketplace.gmv_m}M` },
          { label: "Coverage",          value: `${report.marketplace.coverage}%` },
          { label: "GRR",               value: `${report.cs.grr}%` },
          { label: "NPS",               value: report.cs.nps },
          { label: "Product adoption",  value: `${report.product.adoption}%` },
          { label: "SOC 2 progress",    value: `${report.cert.soc2_pct}%`, sub: `${report.cert.evidence_fresh}% fresh` },
        ]} />
        <div className="grid gap-3 md:grid-cols-3">
          <Card className="border-white/10 bg-white/[0.02] p-4 text-xs">
            <h3 className="text-sm font-semibold">Key risks</h3>
            <ul className="mt-2 space-y-1 text-muted-foreground">{report.risks.map(r => <li key={r}>· {r}</li>)}</ul>
          </Card>
          <Card className="border-white/10 bg-white/[0.02] p-4 text-xs">
            <h3 className="text-sm font-semibold">Decisions needed</h3>
            <ul className="mt-2 space-y-1 text-muted-foreground">{report.decisions.map(r => <li key={r}>· {r}</li>)}</ul>
          </Card>
          <Card className="border-white/10 bg-white/[0.02] p-4 text-xs">
            <h3 className="text-sm font-semibold">Next-Q priorities</h3>
            <ul className="mt-2 space-y-1 text-muted-foreground">{report.next_q_priorities.map(r => <li key={r}>· {r}</li>)}</ul>
          </Card>
        </div>
      </V55Page>
    );
  },
});
