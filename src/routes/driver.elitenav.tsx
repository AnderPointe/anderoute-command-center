import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { DriverLoadOffer } from "@/components/driver/DriverLoadOffer";
import { EliteNavScreen } from "@/components/navigation/EliteNavScreen";
import { mockLoad } from "@/data/elitenav/mockLoad";

export const Route = createFileRoute("/driver/elitenav")({
  head: () => ({
    meta: [
      { title: "Anderoute EliteNav — Driver Navigation" },
      { name: "description", content: "Elite GPS navigation and AI CoPilot for Anderoute drivers." },
    ],
  }),
  component: EliteNavRoute,
});

function EliteNavRoute() {
  const [view, setView] = useState<"offer" | "nav">("offer");
  const [deniedReason, setDeniedReason] = useState<string | null>(null);

  if (view === "nav") {
    return (
      <AppShell fullBleed>
        <EliteNavScreen onExit={() => setView("offer")} />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="py-2">
        {deniedReason && (
          <div className="mx-auto mb-4 max-w-2xl rounded-xl border border-red-500/20 bg-red-500/[0.05] px-4 py-2 text-sm text-red-200">
            Load denied · reason: <span className="font-medium">{deniedReason}</span>
          </div>
        )}
        <DriverLoadOffer
          load={mockLoad}
          onAccept={() => { setDeniedReason(null); setView("nav"); }}
          onDeny={(r) => setDeniedReason(r)}
        />
      </div>
    </AppShell>
  );
}
