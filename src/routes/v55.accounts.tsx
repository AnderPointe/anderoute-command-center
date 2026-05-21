import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { V55Page } from "@/components/v55/V55Page";
import { Card } from "@/components/ui/card";
import { useEnterpriseAccountPlans } from "@/v55/hooks";

export const Route = createFileRoute("/v55/accounts")({
  head: () => ({ meta: [{ title: "Account Plans · Anderoute V5.5" }] }),
  component: () => {
    const { plans } = useEnterpriseAccountPlans();
    return (
      <V55Page icon={<Users className="size-6 text-amber-300" />} title="Enterprise Account Planning"
        blurb="Account profile, products used, goals, pains, key stakeholders, expansion roadmap and risks.">
        <div className="grid gap-3 md:grid-cols-2">
          {plans.map(p => (
            <Card key={p.acct} className="border-white/10 bg-white/[0.02] p-4 text-sm">
              <div className="text-xs uppercase text-muted-foreground">{p.profile}</div>
              <h3 className="mt-1 text-base font-semibold">{p.acct}</h3>
              <dl className="mt-2 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <div><dt className="text-foreground">Products</dt><dd>{p.products.join(", ")}</dd></div>
                <div><dt className="text-foreground">Goals</dt><dd>{p.goals}</dd></div>
                <div><dt className="text-foreground">Pains</dt><dd>{p.pains}</dd></div>
                <div><dt className="text-foreground">Sponsor</dt><dd>{p.sponsor}</dd></div>
                <div><dt className="text-foreground">Renewal</dt><dd>{p.renewal}</dd></div>
                <div><dt className="text-foreground">Risks</dt><dd>{p.risks}</dd></div>
              </dl>
            </Card>
          ))}
        </div>
      </V55Page>
    );
  },
});
