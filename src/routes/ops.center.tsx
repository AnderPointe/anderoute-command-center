import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { SecurityNav } from "@/components/security/SecurityNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  useChangeManagement, useQaDashboard, useDeploymentStatus,
} from "@/security/hooks/useSecurityData";
import { GitBranch, FlaskConical, Rocket, GitCommitHorizontal } from "lucide-react";

export const Route = createFileRoute("/ops/center")({
  head: () => ({ meta: [{ title: "Operations Center — Anderoute" }] }),
  component: OpsCenter,
});

const PIPELINE = [
  "install", "typecheck", "lint", "unit", "integration", "build",
  "security-scan", "dep-scan", "secret-scan",
  "migration-dry-run", "rls-tests", "e2e-smoke",
  "deploy:preview", "manual-approval", "deploy:prod", "post-deploy smoke",
];

function tone(status: string) {
  const map: Record<string, string> = {
    passed: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    ok: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    failed: "bg-rose-500/15 text-rose-300 border-rose-500/30",
    fail: "bg-rose-500/15 text-rose-300 border-rose-500/30",
    flaky: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    warn: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    skipped: "bg-slate-500/15 text-slate-300 border-slate-500/30",
    running: "bg-blue-500/15 text-blue-300 border-blue-500/30",
    pending: "bg-blue-500/15 text-blue-300 border-blue-500/30",
    draft: "bg-slate-500/15 text-slate-300 border-slate-500/30",
    review: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    approved: "bg-teal-500/15 text-teal-300 border-teal-500/30",
    scheduled: "bg-violet-500/15 text-violet-300 border-violet-500/30",
    deployed: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  };
  return map[status] ?? "bg-slate-500/15 text-slate-300 border-slate-500/30";
}

function OpsCenter() {
  const { changes } = useChangeManagement();
  const { tests } = useQaDashboard();
  const { deployments } = useDeploymentStatus();
  const failed = tests.filter((t) => t.status === "failed").length;
  const flaky = tests.filter((t) => t.status === "flaky").length;
  return (
    <AppShell>
      <div className="p-4 md:p-6 space-y-6">
        <SecurityNav />
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Operations Center</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Change management, QA, deployments, CI/CD pipeline view.</p>
        </div>

        {/* Change requests */}
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <GitBranch className="size-4 text-teal-300" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Change requests</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase tracking-wider text-muted-foreground">
                <tr className="border-b border-white/5">
                  <th className="text-left py-2 pr-3">ID</th>
                  <th className="text-left py-2 pr-3">Title</th>
                  <th className="text-left py-2 pr-3">Risk</th>
                  <th className="text-left py-2 pr-3">Status</th>
                  <th className="text-left py-2 pr-3">Owner</th>
                  <th className="text-left py-2 pr-3">ETA</th>
                </tr>
              </thead>
              <tbody>
                {changes.map((c) => (
                  <tr key={c.id} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                    <td className="py-2 pr-3 font-mono text-xs">{c.id}</td>
                    <td className="py-2 pr-3 font-medium">{c.title}</td>
                    <td className="py-2 pr-3">
                      <Badge className={
                        c.risk === "high" ? "bg-rose-500/15 text-rose-300 border-rose-500/30" :
                        c.risk === "medium" ? "bg-amber-500/15 text-amber-300 border-amber-500/30" :
                        "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                      }>{c.risk}</Badge>
                    </td>
                    <td className="py-2 pr-3"><Badge className={tone(c.status)}>{c.status}</Badge></td>
                    <td className="py-2 pr-3 text-xs text-muted-foreground">{c.owner}</td>
                    <td className="py-2 pr-3 text-xs text-muted-foreground">{c.eta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* QA */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <FlaskConical className="size-4 text-teal-300" />
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">QA test runs</h2>
            </div>
            <div className="flex gap-2 text-[11px]">
              <Badge className="bg-emerald-500/15 text-emerald-300 border-emerald-500/30">{tests.length - failed - flaky} passing</Badge>
              {flaky > 0 && <Badge className="bg-amber-500/15 text-amber-300 border-amber-500/30">{flaky} flaky</Badge>}
              {failed > 0 && <Badge className="bg-rose-500/15 text-rose-300 border-rose-500/30">{failed} failing</Badge>}
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase tracking-wider text-muted-foreground">
                <tr className="border-b border-white/5">
                  <th className="text-left py-2 pr-3">Suite</th>
                  <th className="text-left py-2 pr-3">Case</th>
                  <th className="text-left py-2 pr-3">Status</th>
                  <th className="text-right py-2 pr-3">Duration</th>
                </tr>
              </thead>
              <tbody>
                {tests.map((t) => (
                  <tr key={t.id} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                    <td className="py-2 pr-3 text-xs text-muted-foreground">{t.suite}</td>
                    <td className="py-2 pr-3 font-medium">{t.name}</td>
                    <td className="py-2 pr-3"><Badge className={tone(t.status)}>{t.status}</Badge></td>
                    <td className="py-2 pr-3 text-xs tabular-nums text-right text-muted-foreground">{t.duration_ms} ms</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Deployments */}
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Rocket className="size-4 text-teal-300" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Deployments</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {deployments.map((d) => (
              <div key={d.id} className="rounded-md border border-white/5 bg-white/[0.02] p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{d.surface}</span>
                  <Badge className={tone(d.status)}>{d.status}</Badge>
                </div>
                <div className="mt-1 text-[11px] text-muted-foreground">{d.env} · <span className="font-mono">{d.version}</span></div>
                <div className="mt-0.5 text-[10px] text-muted-foreground">{d.ts}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* CI/CD pipeline */}
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <GitCommitHorizontal className="size-4 text-teal-300" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">CI/CD pipeline</h2>
          </div>
          <ol className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 text-[11px]">
            {PIPELINE.map((s, i) => (
              <li key={s} className="rounded-md border border-white/5 bg-white/[0.02] p-2">
                <div className="font-mono text-[10px] text-muted-foreground">step {i + 1}</div>
                <div className="mt-0.5 font-medium">{s}</div>
              </li>
            ))}
          </ol>
          <p className="mt-3 text-[11px] text-muted-foreground">Pipeline detail: <span className="font-mono">docs/ci-cd-plan.md</span>. Release flow: <span className="font-mono">docs/release-process.md</span>. Rollback: <span className="font-mono">docs/rollback-process.md</span>.</p>
        </Card>
      </div>
    </AppShell>
  );
}
