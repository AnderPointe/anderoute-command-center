import { createFileRoute } from "@tanstack/react-router";
import { FileCheck2 } from "lucide-react";
import { V55Page } from "@/components/v55/V55Page";
import { KpiGrid, SimpleTable, StatusPill } from "@/components/v55/ui-bits";
import { Card } from "@/components/ui/card";
import { useCertificationEvidenceMaturity } from "@/v55/hooks";

export const Route = createFileRoute("/v55/evidence")({
  head: () => ({ meta: [{ title: "Cert Evidence · Anderoute V5.5" }] }),
  component: () => {
    const { evidence } = useCertificationEvidenceMaturity();
    return (
      <V55Page icon={<FileCheck2 className="size-6 text-amber-300" />} title="Certification Evidence Maturity"
        blurb="Evidence freshness, control ownership, policy currency, remediation status and audit export readiness. No claims of completion without evidence.">
        <KpiGrid cols={4} items={[
          { label: "Evidence freshness", value: `${evidence.freshness_pct}%` },
          { label: "Controls w/ owner",  value: `${evidence.controls_with_owner}%` },
          { label: "Policies current",   value: `${evidence.policies_current}%` },
          { label: "Remediation open",   value: evidence.remediation_open },
          { label: "Audit export ready", value: `${evidence.audit_export_ready_pct}%` },
        ]} />
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Open exceptions</h3>
          <div className="mt-2">
            <SimpleTable rows={evidence.exceptions} columns={[
              { key: "id",      label: "ID" },
              { key: "control", label: "Control" },
              { key: "owner",   label: "Owner" },
              { key: "status",  label: "Status", render: (r) => <StatusPill status={r.status} /> },
            ]} />
          </div>
        </Card>
      </V55Page>
    );
  },
});
