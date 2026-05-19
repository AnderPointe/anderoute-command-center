import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { SecurityNav } from "@/components/security/SecurityNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSecurityPosture, useSecurityFindings } from "@/security/hooks/useSecurityData";
import {
  KeyRound, Lock, Building2, ShieldAlert, Smartphone, Globe,
  Database, Bell, BookOpen, FileCheck2,
} from "lucide-react";

export const Route = createFileRoute("/security/center")({
  head: () => ({ meta: [{ title: "Security Center — Anderoute" }] }),
  component: SecurityCenter,
});

const sevTone: Record<string, string> = {
  critical: "bg-rose-500/15 text-rose-300 border-rose-500/30",
  high:     "bg-orange-500/15 text-orange-300 border-orange-500/30",
  medium:   "bg-amber-500/15 text-amber-300 border-amber-500/30",
  low:      "bg-blue-500/15 text-blue-300 border-blue-500/30",
  info:     "bg-slate-500/15 text-slate-300 border-slate-500/30",
};

const CHECKLISTS: Array<{ icon: any; title: string; items: { label: string; status: "pass" | "warn" | "fail" }[] }> = [
  { icon: KeyRound, title: "Authentication", items: [
    { label: "MFA enforced for owners", status: "pass" },
    { label: "Session timeout (24h)", status: "pass" },
    { label: "Refresh-token rotation", status: "pass" },
    { label: "Password policy (12+ chars, HIBP)", status: "pass" },
    { label: "Magic-link policy", status: "pass" },
    { label: "SSO / SAML", status: "warn" },
    { label: "SCIM provisioning", status: "warn" },
    { label: "Login history & failed-login alerts", status: "pass" },
    { label: "Suspicious-login detection", status: "warn" },
    { label: "Admin re-auth for sensitive actions", status: "pass" },
  ]},
  { icon: Building2, title: "Authorization & Tenant Isolation", items: [
    { label: "RBAC enforced server-side", status: "pass" },
    { label: "Every tenant table has company_id", status: "pass" },
    { label: "Customer-portal scoped to customer_users", status: "pass" },
    { label: "Drivers see only own data", status: "pass" },
    { label: "Dispatchers see only own company", status: "pass" },
    { label: "RLS coverage on documents.list", status: "warn" },
    { label: "Support access time-limited + audited", status: "pass" },
    { label: "Permission-change audit trail", status: "pass" },
  ]},
  { icon: Lock, title: "API Security", items: [
    { label: "API keys hashed at rest (SHA-256)", status: "pass" },
    { label: "Key rotation policy (90d)", status: "pass" },
    { label: "Scope review (17 scopes)", status: "pass" },
    { label: "HMAC-SHA256 webhook signing", status: "pass" },
    { label: "Webhook timestamp tolerance (±5m)", status: "pass" },
    { label: "Replay-attack protection", status: "pass" },
    { label: "Per-company rate limits", status: "pass" },
    { label: "IP allowlist for `webhooks.manage`", status: "warn" },
    { label: "Abuse detection on `api_request_logs`", status: "warn" },
  ]},
  { icon: Database, title: "Data Protection", items: [
    { label: "TLS 1.2+ in transit", status: "pass" },
    { label: "AES-256 at rest", status: "pass" },
    { label: "PII inventory current", status: "pass" },
    { label: "Sensitive-field classification", status: "pass" },
    { label: "Raw audio hard-locked off", status: "pass" },
    { label: "Location retention rules active", status: "pass" },
    { label: "GPS aggregation (30d → daily)", status: "pass" },
    { label: "Data export workflow", status: "warn" },
    { label: "Data deletion workflow", status: "warn" },
    { label: "Document access logging", status: "pass" },
  ]},
  { icon: ShieldAlert, title: "Driver Privacy & Consent", items: [
    { label: "All consent off by default", status: "pass" },
    { label: "Background location disclosure", status: "pass" },
    { label: "Active-tracking indicator visible", status: "pass" },
    { label: "Off-duty tracking disabled", status: "pass" },
    { label: "Last-sync visible to driver", status: "pass" },
    { label: "Voice transcripts opt-in only", status: "pass" },
    { label: "Driver can report privacy issue", status: "pass" },
    { label: "Consent history audit trail", status: "pass" },
  ]},
  { icon: Smartphone, title: "Mobile Security (MASVS)", items: [
    { label: "Secure storage (Keychain / Keystore)", status: "pass" },
    { label: "No service-role keys in app", status: "pass" },
    { label: "No raw AI provider keys in app", status: "pass" },
    { label: "Certificate pinning", status: "warn" },
    { label: "Root / jailbreak detection", status: "warn" },
    { label: "App integrity / Play Integrity", status: "warn" },
    { label: "Deep-link validation", status: "pass" },
    { label: "Push-token security", status: "pass" },
    { label: "Crash logs scrub PII", status: "pass" },
    { label: "Force-update policy", status: "pass" },
  ]},
  { icon: Globe, title: "Web Security (OWASP ASVS)", items: [
    { label: "Secure auth + session", status: "pass" },
    { label: "Access control checks server-side", status: "pass" },
    { label: "Input validation (Zod)", status: "pass" },
    { label: "Output encoding (React default)", status: "pass" },
    { label: "CSRF on state-changing routes", status: "pass" },
    { label: "Secure file upload (signed URL, MIME check)", status: "pass" },
    { label: "Rate limiting on public endpoints", status: "pass" },
    { label: "Security headers (HSTS, X-Frame, X-CTO)", status: "pass" },
    { label: "CSP (report-only → enforce)", status: "warn" },
    { label: "CORS allowlist", status: "pass" },
    { label: "Dependency + secret scanning", status: "warn" },
  ]},
  { icon: Bell, title: "Audit, Backup, Incident, Vendor", items: [
    { label: "Audit log coverage on writes", status: "pass" },
    { label: "PITR enabled (7d)", status: "pass" },
    { label: "Last restore drill passed", status: "pass" },
    { label: "Incident runbooks 9/12", status: "warn" },
    { label: "Postmortem template adopted", status: "pass" },
    { label: "Vendor risk reviews current", status: "warn" },
    { label: "DPA status tracked", status: "warn" },
    { label: "Compliance evidence vault wired", status: "warn" },
  ]},
];

function statusBadge(s: "pass" | "warn" | "fail") {
  const cls =
    s === "pass" ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30" :
    s === "warn" ? "bg-amber-500/15 text-amber-300 border-amber-500/30" :
    "bg-rose-500/15 text-rose-300 border-rose-500/30";
  return <Badge className={cls}>{s}</Badge>;
}

function SecurityCenter() {
  const { score, cards } = useSecurityPosture();
  const { findings } = useSecurityFindings();
  return (
    <AppShell>
      <div className="p-4 md:p-6 space-y-6">
        <SecurityNav />
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Security Center</h1>
            <p className="text-sm text-muted-foreground mt-0.5">11 hardening pillars across authentication, isolation, data, mobile, web.</p>
          </div>
          <Card className="p-3 px-4 flex items-center gap-3">
            <FileCheck2 className="size-4 text-emerald-300" />
            <div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Readiness</div>
              <div className="text-xl font-semibold tabular-nums text-emerald-300">{score}<span className="text-xs text-muted-foreground"> / 100</span></div>
            </div>
          </Card>
        </div>

        {/* Posture summary strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {cards.slice(0, 12).map((c) => (
            <Card key={c.key} className="p-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-muted-foreground">{c.label}</span>
                {statusBadge(c.status)}
              </div>
              <div className="mt-1 text-lg font-semibold tabular-nums">{c.score}</div>
            </Card>
          ))}
        </div>

        {/* Checklists grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {CHECKLISTS.map((cl) => {
            const pass = cl.items.filter((i) => i.status === "pass").length;
            return (
              <Card key={cl.title} className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <cl.icon className="size-4 text-teal-300" />
                    <h3 className="text-sm font-semibold">{cl.title}</h3>
                  </div>
                  <span className="text-[11px] text-muted-foreground tabular-nums">{pass}/{cl.items.length} passing</span>
                </div>
                <ul className="space-y-1.5">
                  {cl.items.map((i) => (
                    <li key={i.label} className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{i.label}</span>
                      {statusBadge(i.status)}
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </div>

        {/* Findings */}
        <Card className="p-5">
          <h2 className="text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground">Open security findings</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase tracking-wider text-muted-foreground">
                <tr className="border-b border-white/5">
                  <th className="text-left py-2 pr-3">Severity</th>
                  <th className="text-left py-2 pr-3">Title</th>
                  <th className="text-left py-2 pr-3">Category</th>
                  <th className="text-left py-2 pr-3">Status</th>
                  <th className="text-left py-2 pr-3">Owner</th>
                  <th className="text-left py-2 pr-3">Due</th>
                </tr>
              </thead>
              <tbody>
                {findings.map((f) => (
                  <tr key={f.id} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                    <td className="py-2 pr-3"><Badge className={sevTone[f.severity]}>{f.severity}</Badge></td>
                    <td className="py-2 pr-3 font-medium">{f.title}</td>
                    <td className="py-2 pr-3 text-xs text-muted-foreground">{f.category}</td>
                    <td className="py-2 pr-3 text-xs">{f.status}</td>
                    <td className="py-2 pr-3 text-xs text-muted-foreground">{f.owner}</td>
                    <td className="py-2 pr-3 text-xs text-muted-foreground">{f.due ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <p className="text-[11px] text-muted-foreground">Checklists derived from OWASP ASVS (web) and OWASP MASVS (mobile). Pillars map to AICPA Trust Services Criteria in SOC 2.</p>
      </div>
    </AppShell>
  );
}
