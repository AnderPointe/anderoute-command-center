import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp } from "lucide-react";
import { ControlPage } from "@/components/v185/ControlPage";
import * as H from "@/v185/hooks";

function Page() {
  return <ControlPage icon={<TrendingUp className="size-6 text-cyan-300" />}
    title="Revenue Automation Control Maturity Center"
    blurb="Renewal, expansion, churn, concentration, payment, dispute, MP/API/EDI/partner revenue — evidence, approval, audit assured."
    data={H.useRevenueControlMaturity()} />;
}
export const Route = createFileRoute("/v185/revenue-maturity")({ component: Page });
