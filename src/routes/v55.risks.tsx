import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { V55Page } from "@/components/v55/V55Page";
import { SimpleTable, StatusPill, KpiGrid } from "@/components/v55/ui-bits";
import { Card } from "@/components/ui/card";
import { useStrategicRiskManagement } from "@/v55/hooks";

export const Route = createFileRoute("/v55/risks")({
  head: () => ({ meta: [{ title: "Strategic Risks · Anderoute V5.5" }] }),
  component: () => {
    const { risks } = useStrategicRiskManagement();
    const high = risks.filter(r => r.severity === "high");
    const med = risks.filter(r => r.severity === "medium");
    const low = risks.filter(r => r.severity === "low");
    const byCat: Record<string, typeof risks> = {};
    for (const r of risks) (byCat[r.cat] ||= []).push(r);
    return (
      <V55Page icon={<AlertTriangle className="size-6 text-amber-300" />} title="Strategic Risk Management Dashboard"
        blurb="Product, security, compliance, marketplace, revenue, concentration, partner, technical-debt, mobile and competitive risks with severity, owner and mitigation.">
        <KpiGrid cols={4} items={[
          { label: "Total risks",  value: risks.length },
          { label: "High severity",value: high.length, sub: "active mitigation" },
          { label: "Medium",       value: med.length },
          { label: "Low",          value: low.length },
        ]} />
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Heatmap by category</h3>
          <div className="mt-3 grid gap-2 md:grid-cols-2">
            {Object.entries(byCat).map(([cat, list]) => (
              <div key={cat} className="rounded-lg border border-white/10 bg-black/20 p-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium">{cat}</span>
                  <span className="text-muted-foreground">{list.length} risk{list.length > 1 ? "s" : ""}</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {list.map(r => <StatusPill key={r.id} status={r.severity} />)}
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={risks} columns={[
            { key: "id",         label: "ID" },
            { key: "cat",        label: "Category" },
            { key: "desc",       label: "Risk" },
            { key: "severity",   label: "Severity", render: (r) => <StatusPill status={r.severity} /> },
            { key: "owner",      label: "Owner" },
            { key: "mitigation", label: "Mitigation" },
          ]} />
        </Card>
      </V55Page>
    );
  },
});
