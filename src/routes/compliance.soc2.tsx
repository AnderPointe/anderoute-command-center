import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { SecurityNav } from "@/components/security/SecurityNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  useComplianceControls, usePolicyLibrary, useEvidenceVault,
} from "@/security/hooks/useSecurityData";
import type { TscCategory, ControlStatus } from "@/security/data/mockSecurity";
import { Upload, ShieldCheck, BookOpen, FileStack } from "lucide-react";

export const Route = createFileRoute("/compliance/soc2")({
  head: () => ({ meta: [{ title: "SOC 2 Readiness — Anderoute" }] }),
  component: Soc2Page,
});

const TSC_LABEL: Record<TscCategory, string> = {
  security: "Security",
  availability: "Availability",
  processing_integrity: "Processing Integrity",
  confidentiality: "Confidentiality",
  privacy: "Privacy",
};

const STATUS_TONE: Record<ControlStatus, string> = {
  not_started:       "bg-slate-500/15 text-slate-300 border-slate-500/30",
  designed:          "bg-blue-500/15 text-blue-300 border-blue-500/30",
  implemented:       "bg-teal-500/15 text-teal-300 border-teal-500/30",
  operating:         "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  needs_remediation: "bg-rose-500/15 text-rose-300 border-rose-500/30",
  ready_for_audit:   "bg-violet-500/15 text-violet-300 border-violet-500/30",
};

function Soc2Page() {
  const { controls, score } = useComplianceControls();
  const { policies } = usePolicyLibrary();
  const { evidence } = useEvidenceVault();

  const byTsc = controls.reduce<Record<string, typeof controls>>((acc, c) => {
    (acc[c.tsc] ??= [] as any).push(c); return acc;
  }, {});

  return (
    <AppShell>
      <div className="p-4 md:p-6 space-y-6">
        <SecurityNav />
        <header className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">SOC 2 Readiness</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Controls mapped to AICPA Trust Services Criteria. Evidence vault and policy library wired to control library.</p>
          </div>
          <Card className="p-3 px-4 flex items-center gap-3">
            <ShieldCheck className="size-4 text-emerald-300" />
            <div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Readiness</div>
              <div className="text-xl font-semibold tabular-nums text-emerald-300">{score}<span className="text-xs text-muted-foreground"> / 100</span></div>
            </div>
          </Card>
        </header>

        {/* Controls by TSC */}
        {Object.entries(byTsc).map(([tsc, list]) => (
          <Card key={tsc} className="p-5">
            <h2 className="text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground">{TSC_LABEL[tsc as TscCategory]}</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-xs uppercase tracking-wider text-muted-foreground">
                  <tr className="border-b border-white/5">
                    <th className="text-left py-2 pr-3">Code</th>
                    <th className="text-left py-2 pr-3">Control</th>
                    <th className="text-left py-2 pr-3">Owner</th>
                    <th className="text-left py-2 pr-3">Status</th>
                    <th className="text-left py-2 pr-3">Evidence</th>
                    <th className="text-left py-2 pr-3">Last tested</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((c) => (
                    <tr key={c.id} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                      <td className="py-2 pr-3 font-mono text-xs">{c.code}</td>
                      <td className="py-2 pr-3 font-medium">{c.name}</td>
                      <td className="py-2 pr-3 text-xs text-muted-foreground">{c.owner}</td>
                      <td className="py-2 pr-3"><Badge className={STATUS_TONE[c.status]}>{c.status.replaceAll("_", " ")}</Badge></td>
                      <td className="py-2 pr-3 text-xs tabular-nums">{c.evidence} / {c.required}</td>
                      <td className="py-2 pr-3 text-xs text-muted-foreground">{c.last_tested ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        ))}

        {/* Evidence vault */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <FileStack className="size-4 text-teal-300" />
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Evidence Vault</h2>
            </div>
            <Button variant="outline" size="sm"><Upload className="size-3.5 mr-1.5" />Upload evidence</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase tracking-wider text-muted-foreground">
                <tr className="border-b border-white/5">
                  <th className="text-left py-2 pr-3">Control</th>
                  <th className="text-left py-2 pr-3">Title</th>
                  <th className="text-left py-2 pr-3">Type</th>
                  <th className="text-left py-2 pr-3">Status</th>
                  <th className="text-left py-2 pr-3">Uploaded by</th>
                  <th className="text-left py-2 pr-3">When</th>
                </tr>
              </thead>
              <tbody>
                {evidence.map((e) => (
                  <tr key={e.id} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                    <td className="py-2 pr-3 font-mono text-xs">{e.control}</td>
                    <td className="py-2 pr-3 font-medium">{e.title}</td>
                    <td className="py-2 pr-3 text-xs text-muted-foreground">{e.type}</td>
                    <td className="py-2 pr-3">
                      <Badge className={
                        e.status === "approved" ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30" :
                        e.status === "pending"  ? "bg-amber-500/15 text-amber-300 border-amber-500/30" :
                        "bg-rose-500/15 text-rose-300 border-rose-500/30"
                      }>{e.status}</Badge>
                    </td>
                    <td className="py-2 pr-3 text-xs text-muted-foreground">{e.uploaded_by}</td>
                    <td className="py-2 pr-3 text-xs text-muted-foreground">{e.uploaded_at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Policy library */}
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="size-4 text-teal-300" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Policy Library</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {policies.map((p) => {
              const pct = Math.round((p.acks / p.total) * 100);
              return (
                <div key={p.id} className="rounded-md border border-white/5 bg-white/[0.02] p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium leading-tight">{p.title}</span>
                    <Badge className="bg-slate-500/15 text-slate-300 border-slate-500/30 font-mono text-[10px]">v{p.version}</Badge>
                  </div>
                  <div className="mt-1 text-[11px] text-muted-foreground">Owner: {p.owner} · Effective {p.effective}</div>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-1.5 flex-1 rounded-full bg-white/5 overflow-hidden">
                      <div className={`h-full ${pct === 100 ? "bg-emerald-400" : pct >= 80 ? "bg-teal-400" : "bg-amber-400"}`} style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-[10px] tabular-nums text-muted-foreground">{p.acks}/{p.total}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
