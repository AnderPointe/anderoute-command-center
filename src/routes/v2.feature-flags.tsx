import { createFileRoute } from "@tanstack/react-router";
import { Flag } from "lucide-react";
import { V2Page } from "@/components/v2/V2Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FEATURE_FLAGS } from "@/v2/data/mockPhase17";

export const Route = createFileRoute("/v2/feature-flags")({
  head: () => ({ meta: [{ title: "Feature Flags · Anderoute" }] }),
  component: Page,
});

function Page() {
  return (
    <V2Page
      icon={<Flag className="size-6 text-violet-300" />}
      title="Feature Flag Manager V2"
      blurb="Company-level toggles for V2 features. Every change writes to the audit log and to feature_flag_events."
    >
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <div className="space-y-2 text-sm">
          {FEATURE_FLAGS.map((f) => (
            <div key={f.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2">
              <div>
                <div className="font-medium">{f.label}</div>
                <div className="text-xs text-muted-foreground font-mono">{f.id} · scope: {f.scope}</div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={f.enabled ? "border-emerald-500/30 text-emerald-300" : "border-white/15 text-muted-foreground"}>
                  {f.enabled ? "enabled" : "disabled"}
                </Badge>
                <Button size="sm" variant="outline" className="h-7 text-xs">{f.enabled ? "Disable" : "Enable"}</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </V2Page>
  );
}
