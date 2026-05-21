import { createFileRoute } from "@tanstack/react-router";
import { Briefcase } from "lucide-react";
import { V55Page } from "@/components/v55/V55Page";
import { SimpleTable } from "@/components/v55/ui-bits";
import { Card } from "@/components/ui/card";
import { useEnterpriseOperatingModel } from "@/v55/hooks";

export const Route = createFileRoute("/v55/operating-model")({
  head: () => ({ meta: [{ title: "Operating Model · Anderoute V5.5" }] }),
  component: () => {
    const { fns } = useEnterpriseOperatingModel();
    return (
      <V55Page icon={<Briefcase className="size-6 text-amber-300" />} title="Enterprise Operating Model"
        blurb="Owner, KPIs, operating cadence, risks and staffing notes for every long-term enterprise function.">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={fns} columns={[
            { key: "fn",      label: "Function" },
            { key: "owner",   label: "Owner" },
            { key: "cadence", label: "Cadence" },
            { key: "kpis",    label: "KPIs" },
            { key: "risks",   label: "Risks" },
          ]} />
        </Card>
      </V55Page>
    );
  },
});
