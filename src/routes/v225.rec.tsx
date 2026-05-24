import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { ControlPage } from "@/components/v225/ControlPage";
import * as H from "@/v225/hooks";
function Page() { return <ControlPage icon={<CheckCircle2 className="size-6 text-emerald-300" />} title="Recommendation Lifecycle Automation Governance Center" blurb="Signal → rec → explanation → evidence → risk → confidence → approver → approval → action → outcome → lesson → policy tuning → evidence updated." data={H.useRecommendationLifecycleAutomationGovernance()} />; }
export const Route = createFileRoute("/v225/rec")({ component: Page });
