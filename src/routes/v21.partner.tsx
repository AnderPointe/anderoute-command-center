import { createFileRoute } from "@tanstack/react-router";
import { GitBranch } from "lucide-react";
import { ControlPage } from "@/components/v21/ControlPage";
import * as H from "@/v21/hooks";
function Page() {
  const d = H.usePartnerTrustScale();
  return <ControlPage icon={<GitBranch className="size-6 text-cyan-300" />} title="Partner Trust Scale Center"
    blurb="Performance, enablement, support burden, pipeline, partner-facing evidence, communication, data boundary, approval routing." data={d} />;
}
export const Route = createFileRoute("/v21/partner")({ component: Page });
