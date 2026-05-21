import { createFileRoute } from "@tanstack/react-router";
import { Handshake } from "lucide-react";
import { V55Page } from "@/components/v55/V55Page";
import { SimpleTable, StatusPill } from "@/components/v55/ui-bits";
import { Card } from "@/components/ui/card";
import { useNationalPartnerships } from "@/v55/hooks";

export const Route = createFileRoute("/v55/partnerships")({
  head: () => ({ meta: [{ title: "National Partnerships · Anderoute V5.5" }] }),
  component: () => {
    const { partners } = useNationalPartnerships();
    return (
      <V55Page icon={<Handshake className="size-6 text-amber-300" />} title="National Partnership Execution"
        blurb="Telematics, broker, shipper, fuel, EDI, API, hardware and mobile partners with joint value, executive sponsor, milestone, and security/commercial readiness.">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={partners} columns={[
            { key: "name",      label: "Partner" },
            { key: "cat",       label: "Category" },
            { key: "status",    label: "Status", render: (r) => <StatusPill status={r.status} /> },
            { key: "sponsor",   label: "Exec sponsor" },
            { key: "value",     label: "Joint value" },
            { key: "milestone", label: "Next milestone" },
          ]} />
        </Card>
      </V55Page>
    );
  },
});
