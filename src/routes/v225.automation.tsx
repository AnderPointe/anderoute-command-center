import { createFileRoute } from "@tanstack/react-router";
import { Network } from "lucide-react";
import { ControlPage } from "@/components/v225/ControlPage";
import * as H from "@/v225/hooks";
function Page() { return <ControlPage icon={<Network className="size-6 text-emerald-300" />} title="Enterprise Lifecycle Trust Automation Scale Center" blurb="20 lifecycle automation domains under one scale score. HITL on every high-impact action." data={H.useEnterpriseLifecycleTrustAutomation()} />; }
export const Route = createFileRoute("/v225/automation")({ component: Page });
