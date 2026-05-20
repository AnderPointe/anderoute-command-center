import { createFileRoute } from "@tanstack/react-router";
import { FlaskConical } from "lucide-react";
import { PilotPage } from "@/components/pilot/PilotPage";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TEST_CASES } from "@/pilot/data/mockPhase13";

export const Route = createFileRoute("/pilot/tests")({
  head: () => ({ meta: [{ title: "MVP Test Execution · Anderoute" }] }),
  component: Page,
});

const TONE: Record<string, string> = {
  passed: "border-emerald-500/30 text-emerald-300",
  failed: "border-rose-500/30 text-rose-300",
  needs_retest: "border-amber-500/30 text-amber-300",
  blocked: "border-rose-500/30 text-rose-300",
  not_run: "border-white/15 text-muted-foreground",
  deferred: "border-white/15 text-muted-foreground",
};

function Page() {
  const totals = TEST_CASES.reduce((acc, t) => ({ ...acc, [t.status]: (acc[t.status] || 0) + 1 }), {} as Record<string, number>);
  const categories = Array.from(new Set(TEST_CASES.map((t) => t.category)));
  return (
    <PilotPage
      icon={<FlaskConical className="size-6 text-teal-300" />}
      title="MVP Test Execution"
      blurb="Critical-path test cases across auth, RLS, load, driver, GPS, customer portal, audit, and alerts. Failed tests open bugs in the triage board."
    >
      <div className="grid gap-3 md:grid-cols-6">
        {["passed", "failed", "needs_retest", "blocked", "not_run", "deferred"].map((s) => (
          <Card key={s} className="border-white/10 bg-white/[0.02] p-4">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">{s.replace("_", " ")}</div>
            <div className="mt-1 text-2xl font-semibold">{totals[s] ?? 0}</div>
          </Card>
        ))}
      </div>

      {categories.map((cat) => (
        <Card key={cat} className="border-white/10 bg-white/[0.02] p-4">
          <h2 className="text-sm font-semibold text-foreground">{cat}</h2>
          <div className="mt-3 space-y-2">
            {TEST_CASES.filter((t) => t.category === cat).map((t) => (
              <div key={t.id} className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-muted-foreground">{t.id}</span>
                  <span>{t.title}</span>
                  {t.related_bug && (
                    <Badge variant="outline" className="border-rose-500/30 text-rose-300">{t.related_bug}</Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-white/15 text-muted-foreground">{t.priority}</Badge>
                  <Badge variant="outline" className={TONE[t.status]}>{t.status.replace("_", " ")}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </PilotPage>
  );
}
