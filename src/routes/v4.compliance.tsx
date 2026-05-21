import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V4Page } from "@/components/v4/V4Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { COMPLIANCE_TASKS, COMPLIANCE_EXCEPTIONS } from "@/v4/data/mockPhase21";

export const Route = createFileRoute("/v4/compliance")({
  head: () => ({ meta: [{ title: "Compliance Ops · Anderoute" }] }),
  component: () => (
    <V4Page icon={<ShieldCheck className="size-6 text-sky-300" />} title="Compliance Operations Center"
      blurb="Access reviews, retention, vendor reviews, DR testing, audit trails and security questionnaire responses.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Tasks</h3>
        <ul className="mt-2 space-y-1 text-sm">{COMPLIANCE_TASKS.map(t => (
          <li key={t.id} className="flex items-center justify-between rounded border border-white/10 bg-black/20 p-2">
            <span>{t.area} <span className="text-xs text-muted-foreground">· due {t.due} · {t.owner}</span></span>
            <Badge variant="outline" className="border-white/15">{t.status}</Badge>
          </li>))}
        </ul>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Exceptions</h3>
        <ul className="mt-2 space-y-1 text-sm">{COMPLIANCE_EXCEPTIONS.map(e => (
          <li key={e.id} className="rounded border border-amber-500/20 bg-amber-500/5 p-2">
            <div className="text-xs text-amber-300">{e.area} · expires {e.expires} · {e.status}</div>
            <div>{e.desc}</div>
          </li>))}
        </ul>
      </Card>
    </V4Page>
  ),
});
