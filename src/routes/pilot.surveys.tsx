import { createFileRoute } from "@tanstack/react-router";
import { ClipboardList } from "lucide-react";
import { PilotPage } from "@/components/pilot/PilotPage";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/pilot/surveys")({
  head: () => ({ meta: [{ title: "Pilot Surveys · Anderoute" }] }),
  component: Page,
});

const SURVEYS = [
  {
    audience: "Dispatcher",
    questions: [
      "Ease of creating loads",
      "Ease of assigning drivers",
      "Map usefulness",
      "Alert usefulness",
      "Overall confidence in Anderoute",
    ],
  },
  {
    audience: "Driver",
    questions: [
      "Ease of login",
      "Load offer clarity",
      "Accept / deny ease",
      "Status update ease",
      "GPS / privacy clarity",
      "POD submission ease",
    ],
  },
  {
    audience: "Customer",
    questions: [
      "Shipment visibility",
      "ETA clarity",
      "Portal ease of use",
      "POD access",
      "Communication improvement vs. before",
    ],
  },
] as const;

function Page() {
  return (
    <PilotPage
      icon={<ClipboardList className="size-6 text-teal-300" />}
      title="Pilot Surveys"
      blurb="Quantitative + qualitative surveys per role to validate workflow fit before V1."
    >
      <div className="grid gap-3 md:grid-cols-3">
        {SURVEYS.map((s) => (
          <Card key={s.audience} className="border-white/10 bg-white/[0.02] p-4">
            <h2 className="text-sm font-semibold">{s.audience} survey</h2>
            <ol className="mt-2 list-decimal space-y-1 pl-4 text-sm text-muted-foreground">
              {s.questions.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ol>
          </Card>
        ))}
      </div>
    </PilotPage>
  );
}
