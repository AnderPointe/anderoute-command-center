import { createFileRoute } from "@tanstack/react-router";
import { Compass } from "lucide-react";
import { V15Page } from "@/components/v15/V15Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GOOGLE_BOUNDARY } from "@/v15/data/mockPhase16";

export const Route = createFileRoute("/v15/google")({
  head: () => ({ meta: [{ title: "V1.5 Google Provider · Anderoute" }] }),
  component: Page,
});

const FILES = [
  "src/navigation/providers/GoogleNavigationProvider.ts",
  "src/navigation/services/googleRouteService.ts",
  "src/navigation/utils/googleRouteParser.ts",
  "src/navigation/types/google.ts",
];

function Page() {
  return (
    <V15Page
      icon={<Compass className="size-6 text-cyan-300" />}
      title="Google Navigation Provider"
      blurb="Optional secondary provider. Web Directions API for route geometry + ETA. The full Google Navigation SDK handoff lives on native and is deferred. The platform is never hardwired to Google."
    >
      <Card className="border-white/10 bg-white/[0.02] p-4 text-sm">
        <h2 className="font-semibold">Boundary scope</h2>
        <ul className="mt-2 list-disc pl-5 text-muted-foreground">
          <li>API key configuration placeholder (server-side only)</li>
          <li>Route request boundary (Web Directions API)</li>
          <li>Route geometry support (encoded polyline parser)</li>
          <li>ETA + remaining distance parsing placeholder</li>
          <li>Mobile SDK handoff placeholder — native bridge in V2</li>
          <li>Provider health test + error handling + cost tracking placeholder</li>
        </ul>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Files</h2>
        <div className="mt-2 space-y-1 text-xs font-mono text-muted-foreground">
          {FILES.map((f) => <div key={f}>· {f}</div>)}
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Provider boundary layers</h2>
        <p className="mt-1 text-xs text-muted-foreground">Google secret key never leaves the server. Native Nav SDK handoff stays deferred until a native shell ships.</p>
        <div className="mt-3 space-y-2 text-sm">
          {GOOGLE_BOUNDARY.map((l) => (
            <div key={l.layer} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2">
              <div>
                <div className="font-medium">{l.layer}</div>
                <div className="text-xs text-muted-foreground">{l.detail}</div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-white/15 text-xs text-muted-foreground">{l.scope}</Badge>
                <Badge variant="outline" className={l.ok ? "border-emerald-500/30 text-emerald-300" : "border-amber-500/30 text-amber-300"}>
                  {l.ok ? "OK" : "Action"}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </V15Page>
  );
}
