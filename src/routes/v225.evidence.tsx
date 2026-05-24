import { createFileRoute } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { ControlPage } from "@/components/v225/ControlPage";
import * as H from "@/v225/hooks";
function Page() { return <ControlPage icon={<Lock className="size-6 text-emerald-300" />} title="Lifecycle Evidence Scale Governance Center" blurb="Requested → collected → validated → approved → attached → board/customer/partner/external/data-room use → archived → expired → refreshed. 13 evidence domains at scale." data={H.useLifecycleEvidenceScaleGovernance()} />; }
export const Route = createFileRoute("/v225/evidence")({ component: Page });
