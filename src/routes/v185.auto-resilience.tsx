import { createFileRoute } from "@tanstack/react-router";
import { Settings2 } from "lucide-react";
import { V185Page } from "@/components/v185/V185Page";
import { Section, SimpleTable } from "@/components/v185/ui-bits";
import { ControlPage } from "@/components/v185/ControlPage";
import * as H from "@/v185/hooks";

function Page() {
  const cal = H.useAutomationResilienceCalendar();
  return (
    <>
      <ControlPage icon={<Settings2 className="size-6 text-cyan-300" />}
        title="Automation Resilience Controls Center"
        blurb="14 resilience domains tested or documented. Tabletop drill cadence, exception queue, audit trail."
        data={H.useAutomationResilienceControls()} />
      <V185Page icon={<Settings2 className="size-6 text-cyan-300" />} title=" " blurb=" ">
        <Section title="Resilience testing calendar">
          <SimpleTable rows={cal as any} columns={[
            { key: "drill", label: "Drill" }, { key: "date", label: "When" }, { key: "result", label: "Result" },
          ]} />
        </Section>
      </V185Page>
    </>
  );
}
export const Route = createFileRoute("/v185/auto-resilience")({ component: Page });
