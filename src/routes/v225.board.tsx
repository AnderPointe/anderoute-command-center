import { createFileRoute } from "@tanstack/react-router";
import { Brain } from "lucide-react";
import { ControlPage } from "@/components/v225/ControlPage";
import * as H from "@/v225/hooks";
function Page() { return <ControlPage icon={<Brain className="size-6 text-emerald-300" />} title="Board Lifecycle Assurance Intelligence Center" blurb="Packet · KPI · decision evidence · risk review · approvals · action follow-up · audit trail. HITL on redaction + decisions." data={H.useBoardLifecycleAssuranceIntelligence()} />; }
export const Route = createFileRoute("/v225/board")({ component: Page });
