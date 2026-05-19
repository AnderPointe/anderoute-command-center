import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { EliteNavScreen } from "@/components/elitenav/EliteNavScreen";

export const Route = createFileRoute("/driver/elite-nav")({
  head: () => ({
    meta: [
      { title: "EliteNav — Anderoute CoPilot" },
      { name: "description", content: "Premium driver navigation with AI CoPilot, turn-by-turn routing, CDL truck-safe checks, and live dispatch sync." },
    ],
  }),
  component: () => (
    <AppShell>
      <EliteNavScreen />
    </AppShell>
  ),
});
