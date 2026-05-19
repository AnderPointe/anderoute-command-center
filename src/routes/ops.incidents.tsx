import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { SecurityNav } from "@/components/security/SecurityNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useIncidents } from "@/security/hooks/useSecurityData";
import { AlertTriangle, BookOpen, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/ops/incidents")({
  head: () => ({ meta: [{ title: "Incident Response — Anderoute" }] }),
  component: IncidentsPage,
});

const sevTone: Record<string, string> = {
  sev1: "bg-rose-500/15 text-rose-300 border-rose-500/30",
  sev2: "bg-orange-500/15 text-orange-300 border-orange-500/30",
  sev3: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  sev4: "bg-slate-500/15 text-slate-300 border-slate-500/30",
};

const WORKFLOW = ["Detected", "Triage", "Investigating", "Mitigating", "Monitoring", "Resolved", "Postmortem"];

const RUNBOOKS = [
  "Security incident", "Data access incident", "GPS outage", "Realtime outage",
  "Notification outage", "Billing outage", "AI provider outage", "Map provider outage",
  "EDI/API outage", "Mobile crash spike", "Customer portal outage",
];

function IncidentsPage() {
  const { incidents } = useIncidents();
  return (
    <AppShell>
      <div className="p-4 md:p-6 space-y-6">
        <SecurityNav />
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="size-5 text-amber-300" />
            <h1 className="text-2xl font-semibold tracking-tight">Incident Response</h1>
          </div>
          <Button variant="outline" size="sm">Declare incident</Button>
        </div>

        {/* MTTR / MTTA strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { label: "Active incidents",  value: String(incidents.filter((i) => i.status !== "resolved").length), tone: "text-amber-300" },
            { label: "MTTA (30d)",        value: "4 min",  tone: "text-emerald-300" },
            { label: "Sev1/2 MTTR (30d)", value: "42 min", tone: "text-emerald-300" },
            { label: "Postmortems on-time", value: "100%", tone: "text-emerald-300" },
          ].map((s) => (
            <Card key={s.label} className="p-3">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.label}</div>
              <div className={`mt-1 text-xl font-semibold tabular-nums ${s.tone}`}>{s.value}</div>
            </Card>
          ))}
        </div>

        {/* Workflow strip */}
        <Card className="p-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Incident workflow</h2>
          <ol className="flex flex-wrap items-center gap-1 text-[11px]">
            {WORKFLOW.map((s, i) => (
              <li key={s} className="flex items-center gap-1">
                <span className="rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-1 text-muted-foreground">{s}</span>
                {i < WORKFLOW.length - 1 && <ChevronRight className="size-3 text-muted-foreground" />}
              </li>
            ))}
          </ol>
        </Card>

        {/* Active incidents */}
        <Card className="p-5">
          <h2 className="text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground">Incidents</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase tracking-wider text-muted-foreground">
                <tr className="border-b border-white/5">
                  <th className="text-left py-2 pr-3">ID</th>
                  <th className="text-left py-2 pr-3">Severity</th>
                  <th className="text-left py-2 pr-3">Title</th>
                  <th className="text-left py-2 pr-3">Type</th>
                  <th className="text-left py-2 pr-3">Status</th>
                  <th className="text-left py-2 pr-3">Detected</th>
                  <th className="text-left py-2 pr-3">Resolved</th>
                  <th className="text-left py-2 pr-3">Owner</th>
                </tr>
              </thead>
              <tbody>
                {incidents.map((i) => (
                  <tr key={i.id} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                    <td className="py-2 pr-3 font-mono text-xs">{i.id}</td>
                    <td className="py-2 pr-3"><Badge className={sevTone[i.severity]}>{i.severity}</Badge></td>
                    <td className="py-2 pr-3 font-medium">{i.title}</td>
                    <td className="py-2 pr-3 text-xs text-muted-foreground">{i.type}</td>
                    <td className="py-2 pr-3 text-xs">{i.status}</td>
                    <td className="py-2 pr-3 text-xs text-muted-foreground">{i.detected}</td>
                    <td className="py-2 pr-3 text-xs text-muted-foreground">{i.resolved ?? "—"}</td>
                    <td className="py-2 pr-3 text-xs text-muted-foreground">{i.owner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Runbooks */}
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="size-4 text-teal-300" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Runbook library</h2>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
            {RUNBOOKS.map((r) => (
              <li key={r} className="rounded-md border border-white/5 bg-white/[0.02] p-2.5">
                <div className="font-medium">{r}</div>
                <div className="text-[10px] text-muted-foreground mt-0.5">Owner: on-call · Last reviewed 2026-04</div>
              </li>
            ))}
          </ul>
        </Card>

        {/* Postmortem template */}
        <Card className="p-5">
          <h2 className="text-sm font-semibold mb-2 uppercase tracking-wider text-muted-foreground">Postmortem template</h2>
          <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
            <li>Summary (one paragraph)</li>
            <li>Impact (customers, surfaces, duration)</li>
            <li>Timeline (detection → resolution)</li>
            <li>Root cause analysis</li>
            <li>What went well</li>
            <li>What went poorly</li>
            <li>Action items with owner + due date</li>
            <li>Lessons learned</li>
          </ol>
        </Card>
      </div>
    </AppShell>
  );
}
