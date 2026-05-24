import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp } from "lucide-react";
import { ControlPage } from "@/components/v225/ControlPage";
import * as H from "@/v225/hooks";
function Page() { return <ControlPage icon={<TrendingUp className="size-6 text-emerald-300" />} title="Revenue Lifecycle Trust Optimization Center" blurb="Renewal · expansion · churn · concentration · payment · dispute · MP/API/EDI/partner revenue — evidence + approval + audit, lifecycle-optimized." data={H.useRevenueLifecycleTrustOptimization()} />; }
export const Route = createFileRoute("/v225/revenue")({ component: Page });
