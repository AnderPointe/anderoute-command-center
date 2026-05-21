import { createFileRoute } from "@tanstack/react-router";
import { Boxes } from "lucide-react";
import { V55Page } from "@/components/v55/V55Page";
import { SimpleTable } from "@/components/v55/ui-bits";
import { Card } from "@/components/ui/card";
import { useProductLineMaturity } from "@/v55/hooks";

export const Route = createFileRoute("/v55/product-lines")({
  head: () => ({ meta: [{ title: "Product Lines · Anderoute V5.5" }] }),
  component: () => {
    const { lines } = useProductLineMaturity();
    return (
      <V55Page icon={<Boxes className="size-6 text-amber-300" />} title="Product-Line Maturity Dashboard"
        blurb="Adoption, revenue contribution, support burden, roadmap maturity, and competitive strength per product line.">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={lines} columns={[
            { key: "name",         label: "Product line" },
            { key: "adoption",     label: "Adoption %" },
            { key: "revenue",      label: "Revenue %" },
            { key: "support",      label: "Support burden" },
            { key: "roadmap",      label: "Roadmap" },
            { key: "competitive",  label: "Competitive" },
          ]} />
        </Card>
      </V55Page>
    );
  },
});
