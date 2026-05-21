import { createFileRoute } from "@tanstack/react-router";
import { Database } from "lucide-react";
import { V75Page } from "@/components/v75/V75Page";
import { SimpleTable, StatusPill, KpiGrid } from "@/components/v75/ui-bits";
import { Card } from "@/components/ui/card";
import { useDataResidencyExecution } from "@/v75/hooks";

export const Route = createFileRoute("/v75/data-residency")({
  head: () => ({ meta: [{ title: "Data Residency Execution · V7.5 · Anderoute" }] }),
  component: () => {
    const { rows, summary } = useDataResidencyExecution();
    return (
      <V75Page icon={<Database className="size-6 text-indigo-300" />} title="Data Residency Execution Tracker"
        blurb="Placeholder only — current vs required regions, customer/country requirements, legal/security/technical plan status and exceptions.">
        <KpiGrid cols={5} items={[
          { label: "Tracked",    value: summary.tracked },
          { label: "Drafted",    value: summary.drafted },
          { label: "Exceptions", value: summary.exceptions, sub: "Open" },
          { label: "High risk",  value: summary.high_risk },
          { label: "Next review", value: summary.next_review, sub: "CCO" },
        ]} />

        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={rows as any} columns={[
            { key: "data_type",    label: "Data type" },
            { key: "current",      label: "Current" },
            { key: "required",     label: "Required" },
            { key: "customer_req", label: "Customer" },
            { key: "country_req",  label: "Country" },
            { key: "risk",         label: "Risk", render: (r: any) => <StatusPill status={r.risk} /> },
            { key: "legal",        label: "Legal", render: (r: any) => <StatusPill status={r.legal} /> },
            { key: "security",     label: "Security", render: (r: any) => <StatusPill status={r.security} /> },
            { key: "tech",         label: "Tech plan", render: (r: any) => <StatusPill status={r.tech} /> },
            { key: "status",       label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
          ]} />
        </Card>
      </V75Page>
    );
  },
});
