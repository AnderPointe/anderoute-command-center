import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart } from "lucide-react";
import { V55Page } from "@/components/v55/V55Page";
import { KpiGrid } from "@/components/v55/ui-bits";
import { Card } from "@/components/ui/card";
import { useBoardInvestorReporting, useBoardTrends } from "@/v55/hooks";

export const Route = createFileRoute("/v55/board")({
  head: () => ({ meta: [{ title: "Board & Investor · Anderoute V5.5" }] }),
  component: () => {
    const { report } = useBoardInvestorReporting();
    const { trends } = useBoardTrends();
    const maxArr = Math.max(...trends.map(t => t.arr));
    const maxGmv = Math.max(...trends.map(t => t.gmv));
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

        <div className="grid gap-3 md:grid-cols-2">
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-sm font-semibold">ARR · NRR (QoQ)</h3>
            <div className="mt-3 flex items-end gap-3 h-32">
              {trends.map(t => (
                <div key={t.q} className="flex flex-1 flex-col items-center gap-1">
                  <div className="text-[10px] text-amber-200">${t.arr}M</div>
                  <div className="w-full rounded-t bg-amber-400/60" style={{ height: `${(t.arr / maxArr) * 100}%` }} />
                  <div className="text-[10px] text-muted-foreground">{t.q}</div>
                  <div className="text-[10px] text-emerald-300">NRR {t.nrr}</div>
                </div>
              ))}
            </div>
          </Card>
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-sm font-semibold">GMV · Coverage (QoQ)</h3>
            <div className="mt-3 flex items-end gap-3 h-32">
              {trends.map(t => (
                <div key={t.q} className="flex flex-1 flex-col items-center gap-1">
                  <div className="text-[10px] text-sky-200">${t.gmv}M</div>
                  <div className="w-full rounded-t bg-sky-400/60" style={{ height: `${(t.gmv / maxGmv) * 100}%` }} />
                  <div className="text-[10px] text-muted-foreground">{t.q}</div>
                  <div className="text-[10px] text-violet-300">Cov {t.coverage}%</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <Card className="border-white/10 bg-white/[0.02] p-4 text-xs">
            <h3 className="text-sm font-semibold text-rose-300">Key risks</h3>
            <ul className="mt-2 space-y-1 text-muted-foreground">{report.risks.map(r => <li key={r}>· {r}</li>)}</ul>
          </Card>
          <Card className="border-white/10 bg-white/[0.02] p-4 text-xs">
            <h3 className="text-sm font-semibold text-amber-300">Decisions needed</h3>
            <ul className="mt-2 space-y-1 text-muted-foreground">{report.decisions.map(r => <li key={r}>· {r}</li>)}</ul>
          </Card>
          <Card className="border-white/10 bg-white/[0.02] p-4 text-xs">
            <h3 className="text-sm font-semibold text-emerald-300">Next-Q priorities</h3>
            <ul className="mt-2 space-y-1 text-muted-foreground">{report.next_q_priorities.map(r => <li key={r}>· {r}</li>)}</ul>
          </Card>
        </div>
      </V55Page>
    );
  },
});
