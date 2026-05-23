import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp } from "lucide-react";
import { ControlPage } from "@/components/v21/ControlPage";
import * as H from "@/v21/hooks";
function Page() {
  const d = H.useDurableRevenueTrustSystems();
  return <ControlPage icon={<TrendingUp className="size-6 text-cyan-300" />} title="Durable Revenue Trust Systems"
    blurb="Renewal, expansion, churn prevention, concentration, payment health, billing dispute, marketplace + API + partner revenue trust." data={d} />;
}
export const Route = createFileRoute("/v21/revenue")({ component: Page });
