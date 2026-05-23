import { createFileRoute } from "@tanstack/react-router";
import { Radar } from "lucide-react";
import { V16Page } from "@/components/v16/V16Page";
import { ScoreCard, Section, SimpleTable } from "@/components/v16/ui-bits";
import * as H from "@/v16/hooks";

function Page() {
  const m = H.useMarketplaceOptimizationIntelligence();
  return (
    <V16Page icon={<Radar className="size-6 text-cyan-300" />} title="Marketplace Optimization Intelligence Center"
      blurb="Regional + lane liquidity, carrier density, equipment coverage, quality, compliance, coverage, bid density, time-to-award, dispute and settlement signals. All MP recommendations are human-approved.">
      <ScoreCard label="MP optimization score" value={m.score} tone="emerald" />
      <Section title="Marketplace optimization signals">
        <SimpleTable rows={m.signals as any} columns={[
          { key: "signal", label: "Signal" },
          { key: "value", label: "Value" },
          { key: "trend", label: "Trend" },
        ]} />
      </Section>
      <Section title="MP optimization recommendations (require approval)">
        <SimpleTable rows={m.recommendations as any} columns={[
          { key: "rec", label: "Recommendation" },
          { key: "approver", label: "Required approver" },
          { key: "confidence", label: "Confidence" },
        ]} />
      </Section>
    </V16Page>
  );
}

export const Route = createFileRoute("/v16/mp-opt")({ component: Page });
