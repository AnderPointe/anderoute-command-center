import { createFileRoute } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { V55Page } from "@/components/v55/V55Page";
import { Card } from "@/components/ui/card";
import { useCategoryNarrative } from "@/v55/hooks";

export const Route = createFileRoute("/v55/narrative")({
  head: () => ({ meta: [{ title: "Category Narrative · Anderoute V5.5" }] }),
  component: () => {
    const { narrative } = useCategoryNarrative();
    return (
      <V55Page icon={<BookOpen className="size-6 text-amber-300" />} title="Category Narrative System"
        blurb="Category, market problem, why now, old way vs new way, point of view, proof points, customer/marketplace/AI/enterprise proof.">
        <Card className="border-white/10 bg-white/[0.02] p-4 text-sm space-y-2">
          <div><span className="text-xs uppercase text-muted-foreground">Category</span><div className="font-medium">{narrative.category}</div></div>
          <div><span className="text-xs uppercase text-muted-foreground">Market problem</span><div className="text-muted-foreground">{narrative.problem}</div></div>
          <div><span className="text-xs uppercase text-muted-foreground">Why now</span><div className="text-muted-foreground">{narrative.why_now}</div></div>
          <div className="grid gap-3 md:grid-cols-2">
            <div><span className="text-xs uppercase text-muted-foreground">Old way</span><div>{narrative.old_way}</div></div>
            <div><span className="text-xs uppercase text-muted-foreground">New way</span><div>{narrative.new_way}</div></div>
          </div>
          <div><span className="text-xs uppercase text-muted-foreground">Point of view</span><div className="font-medium">{narrative.pov}</div></div>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Proof point library</h3>
          <div className="mt-2 grid gap-2 text-xs md:grid-cols-2">
            {narrative.proofs.map(p => (
              <div key={p.kind} className="rounded border border-white/10 bg-white/[0.02] p-2">
                <div className="text-[10px] uppercase text-amber-300">{p.kind}</div>
                <div className="text-muted-foreground">{p.text}</div>
              </div>
            ))}
          </div>
        </Card>
      </V55Page>
    );
  },
});
