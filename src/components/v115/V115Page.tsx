import { ReactNode } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { V115Nav } from "./V115Nav";
import { Badge } from "@/components/ui/badge";

export function V115Page({ title, blurb, icon, children }: { title: string; blurb: string; icon?: ReactNode; children: ReactNode }) {
  return (
    <AppShell>
      <div className="space-y-5">
        <V115Nav />
        <header className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="border-emerald-400/40 text-emerald-200">Phase 36</Badge>
            <Badge variant="outline" className="border-white/15 text-muted-foreground">V11.5 enterprise revenue optimization</Badge>
          </div>
          <div className="flex items-center gap-3">
            {icon}
            <h1 className="text-2xl font-semibold">{title}</h1>
          </div>
          <p className="max-w-3xl text-sm text-muted-foreground">{blurb}</p>
        </header>
        {children}
      </div>
    </AppShell>
  );
}
