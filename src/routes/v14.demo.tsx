import { createFileRoute, Link } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { V14Page } from "@/components/v14/V14Page";
import { Card } from "@/components/ui/card";
import { ExecHeadline, KpiGrid } from "@/components/v14/ui-bits";
import * as H from "@/v14/hooks";

function Page() {
  const steps = H.useV14Demo();
  const sos = H.useEnterpriseStrategicOperatingSystem();
  const tower = H.useExecutiveValueCreationControl();
  const headline = H.useV14ExecHeadline();
  return (
    <V14Page icon={<ListChecks className="size-6 text-cyan-300" />} title="V14 Demo Flow" blurb="Guided executive walkthrough: CEO → CFO → MP leader → strategy → board → product → CEO control tower.">
      <ExecHeadline tag="V14 exec headline" headline={headline.headline} bullets={headline.highlights} />
      <KpiGrid cols={4} items={[
        { label: "Strategic OS",     value: `${sos.score}%`, sub: `+${sos.trend_qoq} QoQ` },
        { label: "Value tower",      value: `${tower.score}%`, sub: "Top-5 actions" },
        { label: "Open gaps",        value: sos.gaps.length, sub: "Tracked" },
        { label: "Board decisions",  value: tower.decisions.length, sub: "Pending" },
      ]} />
      <ol className="space-y-2">
        {steps.map((s, i) => (
          <li key={s.to}>
            <Link to={s.to}>
              <Card className="border-white/10 bg-white/[0.02] p-3 transition-colors hover:border-cyan-400/40">
                <div className="flex items-start gap-3">
                  <div className="inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-500/10 text-xs font-semibold text-cyan-200">{i + 1}</div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="rounded border border-white/10 px-1.5 py-0.5 text-[10px]">{s.who}</span>
                      <span className="font-medium text-foreground">{s.title}</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{s.detail}</p>
                  </div>
                </div>
              </Card>
            </Link>
          </li>
        ))}
      </ol>
    </V14Page>
  );
}

export const Route = createFileRoute("/v14/demo")({
  head: () => ({ meta: [{ title: "V14 Demo · Phase 41" }] }),
  component: Page,
});
