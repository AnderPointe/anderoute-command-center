import { createFileRoute } from "@tanstack/react-router";
import { Megaphone } from "lucide-react";
import { ControlPage } from "@/components/v21/ControlPage";
import * as H from "@/v21/hooks";
function Page() {
  const d = H.useCategoryTrustLeadershipExecution();
  return <ControlPage icon={<Megaphone className="size-6 text-cyan-300" />} title="Category Trust Leadership Execution Center"
    blurb="Narrative, proof assets, market education, positioning, differentiation, sales + web + board narrative; publishing approval HITL." data={d} />;
}
export const Route = createFileRoute("/v21/category")({ component: Page });
