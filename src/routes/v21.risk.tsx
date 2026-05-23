import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { ControlPage } from "@/components/v21/ControlPage";
import * as H from "@/v21/hooks";
function Page() {
  const d = H.useTrustRiskNetwork();
  return <ControlPage icon={<AlertTriangle className="size-6 text-cyan-300" />} title="Trust Risk Network Center"
    blurb="Revenue, customer, MP, carrier, partner, product, category, capital, board, evidence, audit, AI, compliance, boundary, scalability risks." data={d} />;
}
export const Route = createFileRoute("/v21/risk")({ component: Page });
