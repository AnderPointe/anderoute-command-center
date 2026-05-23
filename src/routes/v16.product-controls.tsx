import { createFileRoute } from "@tanstack/react-router";
import { Boxes } from "lucide-react";
import { ControlDomainPage } from "@/components/v16/ControlDomainPage";
import * as H from "@/v16/hooks";

function Page() {
  return <ControlDomainPage icon={<Boxes className="size-6 text-cyan-300" />}
    title="Product-Line Intelligence Control Center"
    blurb="Controls over product investment, roadmap, support burden, reliability, technical debt placeholder, pricing/packaging, category proof — approval and audit."
    rows={H.useProductLineIntelligenceControls()} />;
}
export const Route = createFileRoute("/v16/product-controls")({ component: Page });
