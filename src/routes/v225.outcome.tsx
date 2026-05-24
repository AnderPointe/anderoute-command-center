import { createFileRoute } from "@tanstack/react-router";
import { Radar } from "lucide-react";
import { ControlPage } from "@/components/v225/ControlPage";
import * as H from "@/v225/hooks";
function Page() { return <ControlPage icon={<Radar className="size-6 text-emerald-300" />} title="Outcome Lifecycle Trust Optimization Center" blurb="Approved / rejected / automation outcomes per domain · confidence calibration · policy tuning · lessons learned · board visibility — optimized at scale." data={H.useOutcomeLifecycleTrustOptimization()} />; }
export const Route = createFileRoute("/v225/outcome")({ component: Page });
