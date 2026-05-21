import { createFileRoute } from "@tanstack/react-router";
import { Shield } from "lucide-react";
import { V55Page } from "@/components/v55/V55Page";
import { ScoreCard } from "@/components/v55/ui-bits";
import { usePlatformDefensibility } from "@/v55/hooks";

export const Route = createFileRoute("/v55/defensibility")({
  head: () => ({ meta: [{ title: "Defensibility · Anderoute V5.5" }] }),
  component: () => {
    const { defensibility } = usePlatformDefensibility();
    const items = Object.entries(defensibility).filter(([k]) => k !== "overall");
    return (
      <V55Page icon={<Shield className="size-6 text-amber-300" />} title="Platform Defensibility Dashboard"
        blurb="Workflow, data, marketplace, integration, compliance, brand, enterprise, partner, mobile, portal, and AI ops moats with strength, evidence and competitor risk.">
        <div className="grid gap-3 md:grid-cols-4">
          <ScoreCard label="Overall defensibility" value={defensibility.overall} tone="violet" />
          {items.map(([k, v]) => <ScoreCard key={k} label={k.replace(/_/g, " ")} value={v as number} tone="sky" />)}
        </div>
      </V55Page>
    );
  },
});
