import { Activity, Truck, CheckCircle2, MapPin, Bell } from "lucide-react";

const events = [
  { icon: CheckCircle2, color: "var(--success)", text: "DRV-009 delivered LD-1009 in Memphis, TN", time: "2 min" },
  { icon: Truck, color: "var(--teal)", text: "DRV-007 accepted LD-1007 (Denver → SLC)", time: "5 min" },
  { icon: MapPin, color: "var(--status-pickup)", text: "DRV-003 arrived at pickup · BuildCorp ATL", time: "8 min" },
  { icon: Bell, color: "var(--destructive)", text: "Alert: DRV-005 delayed 47 min on I-95 N", time: "11 min" },
  { icon: Activity, color: "var(--orange)", text: "DRV-002 loaded LD-1002 · Reefer at -4°F", time: "16 min" },
  { icon: Truck, color: "var(--teal)", text: "DRV-008 offered LD-1008 · awaiting response", time: "21 min" },
  { icon: CheckCircle2, color: "var(--success)", text: "Dispatcher L. Howard assigned LD-1001", time: "34 min" },
];

export function EventFeed() {
  return (
    <div className="rounded-xl border border-border bg-card shadow-[var(--shadow-sm)]">
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="font-semibold flex items-center gap-2">
            <Activity className="size-4 text-teal" /> Operations Stream
          </h3>
          <p className="text-[11px] text-muted-foreground mt-0.5">Live driver, load and exception events</p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[11px] text-success font-medium">
          <span className="size-1.5 rounded-full bg-success animate-pulse" /> Live
        </span>
      </div>
      <ul className="p-2 max-h-[440px] overflow-y-auto">
        {events.map((e, i) => {
          const Icon = e.icon;
          return (
            <li key={i} className="relative flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-secondary/50 transition-colors">
              <div className="relative flex flex-col items-center">
                <div
                  className="size-7 rounded-lg grid place-items-center shrink-0"
                  style={{
                    backgroundColor: `color-mix(in oklab, ${e.color} 14%, transparent)`,
                    color: e.color,
                    boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${e.color} 25%, transparent)`,
                  }}
                >
                  <Icon className="size-3.5" />
                </div>
                {i < events.length - 1 && <span className="w-px flex-1 bg-border mt-1 min-h-3" />}
              </div>
              <div className="flex-1 min-w-0 pb-1">
                <p className="text-[13px] leading-snug text-foreground/90">{e.text}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5 tabular-nums">{e.time} ago</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
