import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { ControlPage } from "@/components/v21/ControlPage";
import * as H from "@/v21/hooks";
function Page() {
  const d = H.useRecommendationTrustNetwork();
  return <ControlPage icon={<CheckCircle2 className="size-6 text-cyan-300" />} title="Recommendation Trust Network Center"
    blurb="Source signal, evidence, explainability, confidence, risk, alternatives, no-action impact, duplicate detection, policy compliance, outcome tracking." data={d} />;
}
export const Route = createFileRoute("/v21/rec")({ component: Page });
