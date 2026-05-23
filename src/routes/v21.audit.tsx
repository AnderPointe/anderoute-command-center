import { createFileRoute } from "@tanstack/react-router";
import { FileSearch } from "lucide-react";
import { ControlPage } from "@/components/v21/ControlPage";
import * as H from "@/v21/hooks";
function Page() {
  const d = H.useTrustAuditNetwork();
  return <ControlPage icon={<FileSearch className="size-6 text-cyan-300" />} title="Trust Audit Network Center"
    blurb="Autonomous-assist, recommendation, approval, evidence, revenue, MP, capital, board, customer, partner, product, category, tenant isolation, override, boundary audits." data={d} />;
}
export const Route = createFileRoute("/v21/audit")({ component: Page });
