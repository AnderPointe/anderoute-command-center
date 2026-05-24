import { createFileRoute } from "@tanstack/react-router";
import { Briefcase } from "lucide-react";
import { ControlPage } from "@/components/v225/ControlPage";
import * as H from "@/v225/hooks";
function Page() { return <ControlPage icon={<Briefcase className="size-6 text-emerald-300" />} title="Executive Lifecycle Assurance Command Center" blurb="CEO/CFO/COO/CRO/MP/Product/CS/Partner/Security assurance queues, high-risk items, overdue approvals, escalations, board decisions, outcomes." data={H.useExecutiveLifecycleAssuranceCommand()} />; }
export const Route = createFileRoute("/v225/exec")({ component: Page });
