import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { ControlPage } from "@/components/v225/ControlPage";
import * as H from "@/v225/hooks";
function Page() { return <ControlPage icon={<ListChecks className="size-6 text-emerald-300" />} title="Human Approval Lifecycle Scale Center" blurb="Requested → evidence → explanation → risk → approver + backup → escalation → approved/rejected → reason → action → outcome → audit. approver_id ≠ recommender_id at scale." data={H.useHumanApprovalLifecycleScale()} />; }
export const Route = createFileRoute("/v225/approval")({ component: Page });
