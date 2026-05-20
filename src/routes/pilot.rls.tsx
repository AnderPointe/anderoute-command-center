import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { PilotPage } from "@/components/pilot/PilotPage";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RLS_TESTS } from "@/pilot/data/mockPhase13Extra";

export const Route = createFileRoute("/pilot/rls")({
  head: () => ({ meta: [{ title: "RLS & Security Validation · Anderoute" }] }),
  component: Page,
});

const TONE: Record<string, string> = {
  pass: "border-emerald-500/30 text-emerald-300",
  fail: "border-rose-500/30 text-rose-300",
  pending: "border-white/15 text-muted-foreground",
};

function Page() {
  const passed = RLS_TESTS.filter((t) => t.result === "pass").length;
  return (
    <PilotPage
      icon={<ShieldCheck className="size-6 text-teal-300" />}
      title="RLS & Security Validation"
      blurb="Tenant isolation, role scoping, storage, edge function auth, and audit coverage. A single FAIL holds pilot launch."
    >
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <div className="flex items-center justify-between text-sm">
          <span>Coverage</span>
          <span className="font-mono">{passed}/{RLS_TESTS.length} passing</span>
        </div>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <div className="space-y-2">
          {RLS_TESTS.map((t) => (
            <div key={t.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground">{t.id}</span>
                <span>{t.test}</span>
              </div>
              <Badge variant="outline" className={TONE[t.result]}>{t.result.toUpperCase()}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </PilotPage>
  );
}
