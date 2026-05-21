import { createFileRoute } from "@tanstack/react-router";
import { Users2 } from "lucide-react";
import { V35Page } from "@/components/v35/V35Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ENTERPRISE_ACCOUNTS, CUSTOMER_SUCCESS_PLAYS } from "@/v35/data/mockPhase20";

export const Route = createFileRoute("/v35/customer-success")({
  head: () => ({ meta: [{ title: "Enterprise Customer Success · Anderoute V3.5" }] }),
  component: () => (
    <V35Page icon={<Users2 className="size-6 text-amber-300" />} title="Enterprise Customer Success"
      blurb="Account health, adoption, executive sponsor, renewal date, risk, expansion, and active success plays.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Active plays</h3>
        <div className="mt-2 grid gap-1.5 text-sm md:grid-cols-2">{CUSTOMER_SUCCESS_PLAYS.map((p) => (
          <div key={p.play} className="flex items-center justify-between rounded border border-white/10 bg-black/20 px-2 py-1.5">
            <span>{p.play} <span className="text-xs text-muted-foreground">— {p.target}</span></span>
            <Badge variant="outline" className="border-emerald-500/40 text-emerald-300">{p.status}</Badge>
          </div>
        ))}</div>
      </Card>
      <div className="grid gap-3 md:grid-cols-2">{ENTERPRISE_ACCOUNTS.map((a) => (
        <Card key={a.customer} className="border-white/10 bg-white/[0.02] p-4">
          <div className="flex items-center justify-between">
            <div><h3 className="font-semibold">{a.customer}</h3><div className="text-xs text-muted-foreground">{a.tier} · exec {a.exec}</div></div>
            <Badge variant="outline" className={a.risk === "medium" ? "border-amber-500/40 text-amber-300" : "border-emerald-500/40 text-emerald-300"}>{a.risk} risk</Badge>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
            <div>Health<Progress value={a.health} className="mt-1 h-1.5" /></div>
            <div>Adoption<Progress value={a.adoption} className="mt-1 h-1.5" /></div>
          </div>
          <div className="mt-2 text-xs text-muted-foreground">Go-live: {a.go_live} · renewal {a.renewal} · expansion: {a.expansion}</div>
        </Card>
      ))}</div>
    </V35Page>
  ),
});
