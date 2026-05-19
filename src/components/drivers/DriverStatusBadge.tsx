import { statusMeta } from "@/data/mock";
import type { DriverStatus } from "@/types";
import { cn } from "@/lib/utils";

const pulsing: DriverStatus[] = ["transit", "pickup", "offered", "delayed"];

export function DriverStatusBadge({
  status,
  className,
  size = "sm",
}: {
  status: DriverStatus;
  className?: string;
  size?: "xs" | "sm" | "md";
}) {
  const meta = statusMeta[status];
  const color = `var(--${meta.token})`;
  const isPulsing = pulsing.includes(status);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium border whitespace-nowrap",
        size === "xs" && "text-[10px] px-1.5 py-0.5",
        size === "sm" && "text-[11px] px-2 py-0.5",
        size === "md" && "text-xs px-2.5 py-1",
        className,
      )}
      style={{
        color,
        borderColor: `color-mix(in oklab, ${color} 32%, transparent)`,
        backgroundColor: `color-mix(in oklab, ${color} 10%, transparent)`,
      }}
    >
      <span className="relative inline-flex size-1.5">
        {isPulsing && (
          <span
            className="absolute inset-0 rounded-full animate-ping"
            style={{ backgroundColor: color, opacity: 0.55 }}
          />
        )}
        <span
          className="relative inline-flex size-1.5 rounded-full"
          style={{ backgroundColor: color }}
        />
      </span>
      {meta.label}
    </span>
  );
}
