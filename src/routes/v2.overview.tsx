import { createFileRoute, Link } from "@tanstack/react-router";
import { Rocket } from "lucide-react";
import { V2Page } from "@/components/v2/V2Page";
import { StatTile } from "@/components/v1/StatTile";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { v2ReadinessScore, v2ReadinessBreakdown, v2Stats } from "@/v2/data/mockPhase17";

export const Route = createFileRoute("/v2/overview")({
  head: () => ({ meta: [{ title: "V2 Overview · Anderoute" }] }),
  component: Page,
});

function Page() {
  const score = v2ReadinessScore();
  const bd = v2ReadinessBreakdown();
  const s = v2Stats();
  return (
    <V2Page
      icon={<Rocket className="size-6 text-violet-300" />}
      title="Anderoute V2 Operations Intelligence"
      blurb="AI operations intelligence, optimization engine, EDI beta, API marketplace beta, advanced reports, expanded integrations, and enterprise controls — all gated by human approval for high-impact actions."
    >
      <div className="grid gap-3 md:grid-cols-4">
        <StatTile label="V2 readiness" value={`${score}%`} hint="weighted across 7 gates" tone={score >= 80 ? "good" : score >= 65 ? "warn" : "bad"} />
        <StatTile label="Critical risks" value={s.risksCritical} hint={`${s.risksHigh} high`} tone={s.risksCritical ? "bad" : s.risksHigh ? "warn" : "good"} />
        <StatTile label="Approvals pending" value={s.approvalsPending} tone={s.approvalsPending ? "warn" : "good"} />
        <StatTile label="Security" value={`${s.securityOk}/${s.securityTotal}`} tone={s.securityOk >= s.securityTotal - 1 ? "good" : "warn"} />
      </div>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">V2 readiness composition</h2>
        <div className="mt-3 space-y-3">
          {bd.map((b) => (
            <div key={b.id}>
              <div className="flex items-center justify-between text-xs">
                <span>{b.label} <span className="text-muted-foreground">· weight {b.weight}</span></span>
                <span className={b.pct >= 85 ? "text-emerald-300" : b.pct >= 65 ? "text-sky-300" : "text-amber-300"}>{b.pct}%</span>
              </div>
              <Progress value={b.pct} className="mt-1 h-1.5" />
            </div>
          ))}
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4 text-sm">
        <h2 className="font-semibold">Where to go next</h2>
        <ul className="mt-2 grid gap-1 text-muted-foreground md:grid-cols-2">
          <li>· <Link to="/v2/ai-ops" className="text-violet-300 hover:underline">AI Operations</Link> — live dashboard</li>
          <li>· <Link to="/v2/risk" className="text-violet-300 hover:underline">Risk scoring</Link></li>
          <li>· <Link to="/v2/optimization" className="text-violet-300 hover:underline">Optimization engine</Link></li>
          <li>· <Link to="/v2/approvals" className="text-violet-300 hover:underline">Approvals queue</Link></li>
          <li>· <Link to="/v2/edi" className="text-violet-300 hover:underline">EDI beta</Link></li>
          <li>· <Link to="/v2/api-marketplace" className="text-violet-300 hover:underline">API marketplace</Link></li>
          <li>· <Link to="/v2/executive" className="text-violet-300 hover:underline">Executive dashboard</Link></li>
          <li>· <Link to="/v2/demo" className="text-violet-300 hover:underline">Demo flow</Link> — V2 end-to-end</li>
        </ul>
      </Card>
    </V2Page>
  );
}
