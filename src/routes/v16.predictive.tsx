import { createFileRoute } from "@tanstack/react-router";
import { Activity } from "lucide-react";
import { V16Page } from "@/components/v16/V16Page";
import { ScoreCard, Section, SimpleTable, KpiGrid } from "@/components/v16/ui-bits";
import * as H from "@/v16/hooks";

function Page() {
  const p = H.usePredictivePerformanceIntelligence();
  return (
    <V16Page icon={<Activity className="size-6 text-cyan-300" />} title="Predictive Performance Intelligence Center"
      blurb="Forward-looking signals across enterprise performance, revenue durability, marketplace scale, accounts, partners, product, category, capital, diligence, risk, and board. Confidence, freshness, quality.">
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="Predictive perf score" value={p.score} tone="violet" />
        <ScoreCard label="Rec readiness" value={p.recommendation_readiness} tone="emerald" />
        <ScoreCard label="Signals tracked" value={p.signals.length} tone="amber" />
      </div>
      <KpiGrid cols={3} items={[
        { label: "SLA 24h freshness", value: p.freshness.sla_24h },
        { label: "SLA 72h freshness", value: p.freshness.sla_72h },
        { label: "Stale signals", value: p.freshness.stale_signals },
      ]} />
      <Section title="Predictive signals">
        <SimpleTable rows={p.signals as any} columns={[
          { key: "area", label: "Area" },
          { key: "value", label: "Value" },
          { key: "confidence", label: "Confidence" },
          { key: "fresh", label: "Fresh" },
          { key: "quality", label: "Quality" },
        ]} />
      </Section>
    </V16Page>
  );
}

export const Route = createFileRoute("/v16/predictive")({ component: Page });
