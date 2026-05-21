import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { V55Page } from "@/components/v55/V55Page";
import { SimpleTable, StatusPill } from "@/components/v55/ui-bits";
import { Card } from "@/components/ui/card";
import { useStrategicRiskManagement } from "@/v55/hooks";

export const Route = createFileRoute("/v55/risks")({
  head: () => ({ meta: [{ title: "Strategic Risks · Anderoute V5.5" }] }),
  component: () => {
    const { risks } = useStrategicRiskManagement();
    return (
      <V55Page icon={<AlertTriangle className="size-6 text-amber-300" />} title="Strategic Risk Management Dashboard"
        blurb="Product, security, compliance, marketplace, revenue, concentration, partner, technical-debt, mobile and competitive risks with severity, owner and mitigation.">
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
