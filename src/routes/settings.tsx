import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { ShieldCheck, MapPin, Users, FileText, KeyRound, EyeOff } from "lucide-react";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — Anderoute" }] }),
  component: SettingsPage,
});

const sections = [
  { icon: ShieldCheck, title: "Driver Consent", desc: "Drivers must accept terms and grant location permission inside the Anderoute driver app before any tracking begins." },
  { icon: MapPin, title: "Location Permissions", desc: "Status of GPS permission per driver. Tracking pauses when permission is revoked." },
  { icon: Users, title: "Roles & Permissions", desc: "Dispatcher, Fleet Manager, Admin, and Driver roles with scoped access levels." },
  { icon: KeyRound, title: "Admin-Only Settings", desc: "API keys, integrations, billing — restricted to org admins." },
  { icon: FileText, title: "Audit Logs", desc: "Immutable record of dispatcher actions, driver acceptance, and status changes." },
  { icon: EyeOff, title: "Privacy", desc: "No stealth tracking. All location data tied to active, authenticated driver sessions only." },
];

function SettingsPage() {
  return (
    <AppShell>
      <div className="p-4 md:p-6 space-y-6 max-w-4xl">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Account, privacy, and platform configuration.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sections.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="rounded-xl border border-border bg-card p-4">
                <div className="size-9 rounded-md bg-accent text-accent-foreground grid place-items-center mb-3">
                  <Icon className="size-4" />
                </div>
                <h3 className="font-semibold">{s.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
                <button className="mt-3 text-xs text-teal hover:underline">Configure →</button>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
