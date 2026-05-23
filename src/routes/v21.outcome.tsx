import { createFileRoute } from "@tanstack/react-router";
import { Radar } from "lucide-react";
import { ControlPage } from "@/components/v21/ControlPage";
import * as H from "@/v21/hooks";
function Page() {
  const d = H.useOutcomeTrustNetwork();
  return <ControlPage icon={<Radar className="size-6 text-cyan-300" />} title="Outcome Trust Network Center"
    blurb="Approved + rejected recommendation outcomes, automation, approval, domain outcomes, calibration, lessons, policy tuning." data={d} />;
}
export const Route = createFileRoute("/v21/outcome")({ component: Page });
