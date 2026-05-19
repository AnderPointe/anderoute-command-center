import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

export interface StatCardProps {
  label: string;
  value: string | number;
  delta?: string;
  trend?: "up" | "down" | "flat";
  icon?: LucideIcon;
  accent?: "teal" | "orange" | "success" | "warning" | "destructive" | "info";
  hint?: string;
}

export function StatCard({
  label,
  value,
  delta,
  trend = "flat",
  icon: Icon,
  accent = "teal",
  hint,
}: StatCardProps) {
  const accentColor = `var(--${accent === "destructive" ? "destructive" : accent})`;
  const TrendIcon = trend === "up" ? ArrowUpRight : trend === "down" ? ArrowDownRight : Minus;
  return (
    <div className="group relative rounded-xl border border-border bg-card p-4 overflow-hidden hover:border-foreground/15 hover:shadow-[var(--shadow-md)] transition-all">
      <div
        className="absolute -top-16 -right-10 size-36 rounded-full opacity-[0.08] blur-2xl group-hover:opacity-[0.14] transition-opacity"
        style={{ backgroundColor: accentColor }}
      />
      <div className="flex items-start justify-between gap-3 relative">
        <div className="min-w-0">
          <div className="text-[11px] uppercase tracking-[0.12em] font-semibold text-muted-foreground">
            {label}
          </div>
          <div className="mt-1.5 text-[26px] leading-none font-semibold tracking-tight tabular-nums">
            {value}
          </div>
          {hint && <div className="mt-1 text-[11px] text-muted-foreground">{hint}</div>}
        </div>
        {Icon && (
          <div
            className="size-9 rounded-lg grid place-items-center shrink-0 ring-1"
            style={{
              backgroundColor: `color-mix(in oklab, ${accentColor} 12%, transparent)`,
              color: accentColor,
              boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${accentColor} 22%, transparent)`,
            }}
          >
            <Icon className="size-4" />
          </div>
        )}
      </div>
      {delta && (
        <div className="mt-3 flex items-center gap-1.5 text-xs">
          <span
            className={cn(
              "inline-flex items-center gap-0.5 font-semibold tabular-nums px-1.5 py-0.5 rounded",
              trend === "up" && "text-success bg-success/10",
              trend === "down" && "text-destructive bg-destructive/10",
              trend === "flat" && "text-muted-foreground bg-secondary",
            )}
          >
            <TrendIcon className="size-3" />
            {delta}
          </span>
          <span className="text-muted-foreground text-[11px]">vs yesterday</span>
        </div>
      )}
    </div>
  );
}
