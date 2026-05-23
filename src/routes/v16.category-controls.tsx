import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { ControlDomainPage } from "@/components/v16/ControlDomainPage";
import * as H from "@/v16/hooks";

function Page() {
  return <ControlDomainPage icon={<Star className="size-6 text-cyan-300" />}
    title="Category Intelligence Control Center"
    blurb="Controls over category narrative, market education, competitive positioning, proof publishing, external-use approvals for customer/MP/partner proofs, sales + site narrative — approval and audit."
    rows={H.useCategoryIntelligenceControls()} />;
}
export const Route = createFileRoute("/v16/category-controls")({ component: Page });
