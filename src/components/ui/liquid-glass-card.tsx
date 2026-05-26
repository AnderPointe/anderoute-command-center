import * as React from "react";
import { cn } from "@/lib/utils";

export const LiquidGlassCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("glass-card", className)} {...props}>
    {children}
  </div>
));
LiquidGlassCard.displayName = "LiquidGlassCard";

export const LiquidGlassCardContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("glass-card-container", className)} {...props}>
    {children}
  </div>
));
LiquidGlassCardContainer.displayName = "LiquidGlassCardContainer";
