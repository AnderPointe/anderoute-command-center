import { createFileRoute } from "@tanstack/react-router";
import { Map } from "lucide-react";
import { V55Page } from "@/components/v55/V55Page";
import { SimpleTable } from "@/components/v55/ui-bits";
import { Card } from "@/components/ui/card";
import { useLongTermRoadmapGovernance } from "@/v55/hooks";

export const Route = createFileRoute("/v55/roadmap")({
  head: () => ({ meta: [{ title: "Roadmap Governance · Anderoute V5.5" }] }),
  component: () => {
    const { items, decisions } = useLongTermRoadmapGovernance();
    const horizons = ["Current Q", "Next Q", "6 months", "12 months", "24 months"];
    return (
      <V55Page icon={<Map className="size-6 text-amber-300" />} title="Long-Term Roadmap Governance"
        blurb="Current, next, 6/12/24-month horizons across core dispatch, mobile, AI, marketplace, API/EDI, telematics, compliance, portal, enterprise gov and partnerships.">
        {horizons.map(h => {
          const rows = items.filter(i => i.horizon === h);
          if (rows.length === 0) return null;
          return (
            <Card key={h} className="border-white/10 bg-white/[0.02] p-4">
              <h3 className="text-sm font-semibold">{h}</h3>
              <div className="mt-2">
                <SimpleTable rows={rows} columns={[
                  { key: "cat",  label: "Category" },
                  { key: "item", label: "Item" },
                ]} />
              </div>
            </Card>
          );
        })}
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Decision log</h3>
          <div className="mt-2">
            <SimpleTable rows={decisions} columns={[
              { key: "date", label: "Date" },
              { key: "item", label: "Decision" },
              { key: "by",   label: "By" },
            ]} />
          </div>
        </Card>
      </V55Page>
    );
  },
});
