import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart } from "lucide-react";
import { V4Page } from "@/components/v4/V4Page";
import { Card } from "@/components/ui/card";

const REPORTS = [
  "Enterprise launch readiness","Strategic integration status","Carrier marketplace scale",
  "National carrier coverage","Multi-region operations","Large fleet performance",
  "Compliance operations","Mobile certification readiness","Android Auto readiness",
  "CarPlay readiness","Enterprise support performance","Governance review status",
  "National operations intelligence","Enterprise revenue operations","Partner revenue operations",
  "AI governance report",
];

export const Route = createFileRoute("/v4/reports")({
  head: () => ({ meta: [{ title: "V4 Reports · Anderoute" }] }),
  component: () => (
    <V4Page icon={<FileBarChart className="size-6 text-sky-300" />} title="V4 Advanced Reports"
      blurb="Enterprise launch, integrations, marketplace, network coverage, mobile cert, support, governance, ops intelligence, and revenue reports.">
      <div className="grid gap-2 text-sm md:grid-cols-2">
        {REPORTS.map(r => (
          <Card key={r} className="border-white/10 bg-white/[0.02] p-3">
            <div className="font-medium">{r}</div>
            <div className="text-xs text-muted-foreground">CSV · PDF · scheduled</div>
          </Card>
        ))}
      </div>
    </V4Page>
  ),
});
