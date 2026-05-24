import { createFileRoute } from "@tanstack/react-router";
import { GitBranch } from "lucide-react";
import { ControlPage } from "@/components/v225/ControlPage";
import * as H from "@/v225/hooks";
function Page() { return <ControlPage icon={<GitBranch className="size-6 text-emerald-300" />} title="Partner Lifecycle Trust Maturity Center" blurb="Qualification → onboarding → integration → enablement → campaign → joint customer → evidence → support → renewal → offboarding. HITL on publishing + comms." data={H.usePartnerLifecycleTrustMaturity()} />; }
export const Route = createFileRoute("/v225/partner")({ component: Page });
