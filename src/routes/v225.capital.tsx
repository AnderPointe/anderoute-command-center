import { createFileRoute } from "@tanstack/react-router";
import { Wallet } from "lucide-react";
import { ControlPage } from "@/components/v225/ControlPage";
import * as H from "@/v225/hooks";
function Page() { return <ControlPage icon={<Wallet className="size-6 text-emerald-300" />} title="Capital Lifecycle Trust Readiness Center" blurb="Data room · investor/acquirer · board capital · revenue durability · MP · strategic risk · external-use approval · capital rec/approval/audit. Two-person sign-off > $25k." data={H.useCapitalLifecycleTrustReadiness()} />; }
export const Route = createFileRoute("/v225/capital")({ component: Page });
