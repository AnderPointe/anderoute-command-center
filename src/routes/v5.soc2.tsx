import { createFileRoute } from "@tanstack/react-router";
import { FileCheck2 } from "lucide-react";
import { V5Page } from "@/components/v5/V5Page";
import { SimpleTable, StatusPill } from "@/components/v5/ui-bits";
import { Card } from "@/components/ui/card";
import { SOC2_CONTROLS, SOC2_EXCEPTIONS, SOC2_TREND } from "@/v5/data/mockPhase23";

export const Route = createFileRoute("/v5/soc2")({
  head: () => ({ meta: [{ title: "SOC 2 Completion · Anderoute V5" }] }),
  component: () => {
    const avg = Math.round(SOC2_CONTROLS.reduce((s, c) => s + c.pct, 0) / SOC2_CONTROLS.length);
    return (
      <V5Page icon={<FileCheck2 className="size-6 text-fuchsia-300" />} title="SOC 2 Completion Tracker"
        blurb="Per-control completion across TSC with policy, evidence, test result, exception, and remediation status.">
        <div className="grid gap-3 md:grid-cols-2">
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <div className="text-sm">Average control completion: <span className="font-semibold text-fuchsia-300">{avg}%</span></div>
            <div className="mt-1 text-[11px] text-muted-foreground">Audit-ready target: 95% · {SOC2_EXCEPTIONS.length} exceptions open</div>
          </Card>
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-sm font-semibold">Completion trend</h3>
            <div className="mt-2 flex items-end gap-2 h-20">
              {SOC2_TREND.map(t => (
                <div key={t.week} className="flex flex-1 flex-col items-center gap-1">
                  <div className="w-full rounded-t bg-fuchsia-400/60" style={{ height: `${t.pct}%` }} />
                  <div className="text-[10px] text-muted-foreground">{t.week} · {t.pct}%</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Controls</h3>
          <div className="mt-2">
            <SimpleTable rows={SOC2_CONTROLS} columns={[
              { key: "id",          label: "ID" },
              { key: "tsc",         label: "TSC" },
              { key: "owner",       label: "Owner" },
              { key: "policy",      label: "Policy",     render: r => <StatusPill status={r.policy} /> },
              { key: "evidence",    label: "Evidence",   render: r => <StatusPill status={r.evidence} /> },
              { key: "test",        label: "Test",       render: r => <StatusPill status={r.test} /> },
              { key: "exception",   label: "Exception",  render: r => <StatusPill status={r.exception} /> },
              { key: "remediation", label: "Remediation", render: r => <StatusPill status={r.remediation} /> },
              { key: "pct",         label: "%" },
            ]} />
          </div>
        </Card>
        <Card className="border-amber-400/30 bg-amber-500/[0.04] p-4">
          <h3 className="text-sm font-semibold text-amber-200">Exceptions</h3>
          <div className="mt-2">
            <SimpleTable rows={SOC2_EXCEPTIONS} columns={[
              { key: "control",     label: "Control" },
              { key: "description", label: "Issue" },
              { key: "remediation", label: "Remediation" },
              { key: "owner",       label: "Owner" },
              { key: "due",         label: "Due" },
            ]} />
          </div>
        </Card>
      </V5Page>
    );
  },
});
