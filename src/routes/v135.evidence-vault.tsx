import { createFileRoute } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { V135Page } from "@/components/v135/V135Page";
import { Card } from "@/components/ui/card";
import { SimpleTable } from "@/components/v135/ui-bits";
import * as H from "@/v135/hooks";

function Page() {
  const rows = H.useV135EvidenceVault();
  const cap = H.useV135CapitalEvidence();
  return (
    <V135Page icon={<Lock className="size-6 text-fuchsia-300" />} title="Durability & Capital Evidence Vault" blurb="Durability evidence + capital evidence freshness with owners. Lower is fresher.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Capital evidence</h3>
        <SimpleTable rows={cap as any} columns={[
          { key: "evidence", label: "Evidence" }, { key: "freshness_d", label: "Fresh (d)" }, { key: "owner", label: "Owner" },
        ]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Durability evidence</h3>
        <SimpleTable rows={rows as any} columns={[
          { key: "evidence", label: "Evidence" }, { key: "freshness_d", label: "Fresh (d)" }, { key: "owner", label: "Owner" },
        ]} />
      </Card>
    </V135Page>
  );
}

export const Route = createFileRoute("/v135/evidence-vault")({
  head: () => ({ meta: [{ title: "Evidence Vault · V13.5" }] }),
  component: Page,
});
