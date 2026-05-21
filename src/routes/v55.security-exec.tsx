import { createFileRoute } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { V55Page } from "@/components/v55/V55Page";
import { SimpleTable, StatusPill } from "@/components/v55/ui-bits";
import { Card } from "@/components/ui/card";
import { useSecurityComplianceExecutiveView } from "@/v55/hooks";

export const Route = createFileRoute("/v55/security-exec")({
  head: () => ({ meta: [{ title: "Security/Compliance Exec · Anderoute V5.5" }] }),
  component: () => {
    const { items } = useSecurityComplianceExecutiveView();
    return (
      <V55Page icon={<Lock className="size-6 text-amber-300" />} title="Security & Compliance Executive View"
        blurb="Access review, audit log coverage, IR readiness, DR testing, vulnerabilities, API/EDI/mobile security, data retention, AI governance, vendor reviews and customer security requests.">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={items} columns={[
            { key: "area",   label: "Area" },
            { key: "status", label: "Status", render: (r) => <StatusPill status={r.status} /> },
            { key: "note",   label: "Notes" },
          ]} />
        </Card>
      </V55Page>
    );
  },
});
