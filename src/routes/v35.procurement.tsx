import { createFileRoute } from "@tanstack/react-router";
import { Briefcase } from "lucide-react";
import { V35Page } from "@/components/v35/V35Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PROCUREMENT_PROJECTS, PROCUREMENT_CHECKLIST, PROCUREMENT_RISK } from "@/v35/data/mockPhase20";

export const Route = createFileRoute("/v35/procurement")({
  head: () => ({ meta: [{ title: "Enterprise Procurement · Anderoute V3.5" }] }),
  component: () => (
    <V35Page icon={<Briefcase className="size-6 text-amber-300" />} title="Enterprise Procurement Readiness"
      blurb="Track the procurement checklist, document vault, per-customer readiness, and blockers.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Procurement checklist</h3>
        <div className="mt-2 grid gap-1 text-sm md:grid-cols-2">{PROCUREMENT_CHECKLIST.map((c) => (
          <div key={c} className="rounded border border-white/10 bg-black/20 px-2 py-1">{c}</div>
        ))}</div>
      </Card>
      <div className="grid gap-3 md:grid-cols-3">
        {PROCUREMENT_PROJECTS.map((p) => (
          <Card key={p.customer} className="border-white/10 bg-white/[0.02] p-4">
            <h3 className="font-semibold">{p.customer}</h3>
            <div className="text-xs text-muted-foreground">Owner: {p.owner}</div>
            <Progress value={p.readiness} className="mt-2 h-1.5" />
            <div className="mt-1 text-xs text-muted-foreground">Readiness {p.readiness}% · {p.status}</div>
          </Card>
        ))}
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Risk + blockers</h3>
        <ul className="mt-2 space-y-1 text-sm">{PROCUREMENT_RISK.map((r) => (
          <li key={r.customer} className="flex items-center justify-between rounded border border-white/10 bg-black/20 px-2 py-1.5">
            <span>{r.customer} — <span className="text-xs text-muted-foreground">{r.blocker}</span></span>
            <Badge variant="outline" className={r.risk === "medium" ? "border-amber-500/40 text-amber-300" : "border-emerald-500/40 text-emerald-300"}>{r.risk}</Badge>
          </li>
        ))}</ul>
      </Card>
    </V35Page>
  ),
});
