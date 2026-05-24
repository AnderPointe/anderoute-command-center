import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { ControlPage } from "@/components/v225/ControlPage";
import * as H from "@/v225/hooks";
function Page() { return <ControlPage icon={<AlertTriangle className="size-6 text-emerald-300" />} title="Trust Risk Lifecycle Intelligence Center" blurb="Signal → owner → evidence → score → mitigation → approval → execution → outcome → recurrence → board visibility → closed. 15 categories." data={H.useTrustRiskLifecycleIntelligence()} />; }
export const Route = createFileRoute("/v225/risk")({ component: Page });
