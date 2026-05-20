import { ReactNode } from "react";
import { Card } from "@/components/ui/card";

export function StatTile({
  label,
  value,
  hint,
  tone = "default",
  icon,
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  tone?: "default" | "good" | "warn" | "bad" | "info";
  icon?: ReactNode;
}) {
  const toneCls =
    tone === "good"
      ? "border-emerald-500/30"
      : tone === "warn"
      ? "border-amber-500/30"
      : tone === "bad"
      ? "border-rose-500/30"
      : tone === "info"
      ? "border-sky-500/30"
      : "border-white/10";
  const valueCls =
    tone === "good"
      ? "text-emerald-300"
      : tone === "warn"
      ? "text-amber-300"
      : tone === "bad"
      ? "text-rose-300"
      : tone === "info"
      ? "text-sky-300"
      : "";
  return (
    <Card className={`bg-white/[0.02] p-4 ${toneCls}`}>
      <div className="flex items-center justify-between gap-2">
        <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
        {icon}
      </div>
      <div className={`mt-1 text-2xl font-semibold ${valueCls}`}>{value}</div>
      {hint && <div className="text-xs text-muted-foreground">{hint}</div>}
    </Card>
  );
}
