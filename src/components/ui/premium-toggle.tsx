import * as React from "react";
import { cn } from "@/lib/utils";
import "./premium-toggle.css";

export interface PremiumToggleProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export const PremiumToggle = React.forwardRef<HTMLInputElement, PremiumToggleProps>(
  ({ className, checked, onChange, ...props }, ref) => {
    return (
      <label className={cn("premium-toggle", className)}>
        <input
          ref={ref}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          {...props}
        />
        <span className="switch">
          <span className="track">
            <span className="track-shadow" />
            <span className="wave-group">
              <span className="wave wave1" />
              <span className="wave wave2" />
              <span className="wave wave3" />
            </span>
          </span>
          <span className="magnetic-field" />
          <span className="handle-container">
            <span className="handle">
              <span className="handle-inner">
                <span className="sun-moon">
                  <span className="ray ray1" />
                  <span className="ray ray2" />
                  <span className="ray ray3" />
                  <span className="ray ray4" />
                  <span className="crater crater1" />
                  <span className="crater crater2" />
                  <span className="crater crater3" />
                </span>
              </span>
              <span className="handle-shine" />
              <span className="handle-texture" />
              <span className="handle-ripple" />
            </span>
          </span>
        </span>
      </label>
    );
  }
);

PremiumToggle.displayName = "PremiumToggle";
