import { createFileRoute } from "@tanstack/react-router";
import { Bot } from "lucide-react";
import { V4Page } from "@/components/v4/V4Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AI_GOVERNANCE, AI_ACTION_AUDIT } from "@/v4/data/mockPhase21";

export const Route = createFileRoute("/v4/ai-governance")({
  head: () => ({ meta: [{ title: "AI Governance V4 · Anderoute" }] }),
  component: () => (
    <V4Page icon={<Bot className="size-6 text-sky-300" />} title="AI Governance V4"
      blurb="Approval rules, confidence thresholds, data source transparency, action audit, and usage/cost controls. Fully autonomous dispatch is not enabled.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Approval rules</h3>
        <ul className="mt-2 space-y-1 text-sm">{AI_GOVERNANCE.approval_rules.map((r,i) => (
          <li key={i} className="flex items-center justify-between rounded border border-white/10 bg-black/20 p-2">
            <span>{r.action} <span className="text-xs text-muted-foreground">· ≥ {(r.threshold*100).toFixed(0)}%</span></span>
            <Badge variant="outline" className={r.requires_approval ? "border-amber-400/40 text-amber-300" : "border-white/15"}>
              {r.requires_approval ? "human approval" : "auto"}
            </Badge>
          </li>))}
        </ul>
      </Card>
      <div className="grid gap-3 md:grid-cols-3">
        <Card className="border-white/10 bg-white/[0.02] p-3">
          <div className="text-xs uppercase text-muted-foreground">Confidence floor</div>
          <div className="mt-1 text-xl font-semibold">{(AI_GOVERNANCE.confidence_floor*100).toFixed(0)}%</div>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-3">
          <div className="text-xs uppercase text-muted-foreground">Usage MTD</div>
          <div className="mt-1 text-xl font-semibold">${AI_GOVERNANCE.usage_cost_mtd}</div>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-3">
          <div className="text-xs uppercase text-muted-foreground">Monthly cap</div>
          <div className="mt-1 text-xl font-semibold">${AI_GOVERNANCE.cost_cap_monthly}</div>
        </Card>
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Action audit</h3>
        <ul className="mt-2 space-y-1 text-sm">{AI_ACTION_AUDIT.map(a => (
          <li key={a.id} className="flex items-center justify-between rounded border border-white/10 bg-black/20 p-2">
            <span>{a.action} <span className="text-xs text-muted-foreground">· {(a.confidence*100).toFixed(0)}% · {a.at}</span></span>
            <Badge variant="outline" className="border-white/15">{a.approved_by}</Badge>
          </li>))}
        </ul>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Data sources</h3>
        <div className="mt-2 flex flex-wrap gap-2 text-xs">{AI_GOVERNANCE.data_sources.map(s => (
          <Badge key={s} variant="outline" className="border-white/15">{s}</Badge>
        ))}</div>
      </Card>
    </V4Page>
  ),
});
