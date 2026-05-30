/**
 * ThemeToggle — animated Sun / Moon pill for the Anderoute top navigation.
 *
 * Uses useTheme() from AndetrackThemeProvider.
 * Supports keyboard interaction and aria-label for accessibility.
 */

import { Moon, Sun, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";
import type { ThemeMode } from "@/hooks/useTheme";

interface Props {
  /** Show three-way toggle (light / dark / system). Default: two-way (light / dark). */
  showSystem?: boolean;
  className?: string;
}

// ─── Two-way toggle (simple pill) ─────────────────────────────────────────────

export function ThemeToggle({ className }: Props) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "relative inline-flex h-9 w-16 items-center rounded-full border",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "transition-colors duration-300 ease-in-out",
        isDark ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-200",
        className,
      )}
    >
      {/* Track icons */}
      <span
        className={cn(
          "absolute left-1.5 flex items-center justify-center size-5 transition-all duration-300",
          isDark ? "opacity-40 scale-75" : "opacity-100 scale-100",
        )}
      >
        <Sun className="size-3.5 text-amber-500" strokeWidth={2.5} />
      </span>
      <span
        className={cn(
          "absolute right-1.5 flex items-center justify-center size-5 transition-all duration-300",
          isDark ? "opacity-100 scale-100" : "opacity-40 scale-75",
        )}
      >
        <Moon className="size-3.5 text-indigo-400" strokeWidth={2.5} />
      </span>

      {/* Thumb */}
      <span
        className={cn(
          "absolute size-7 rounded-full shadow-md transition-all duration-300 ease-in-out",
          "flex items-center justify-center",
          isDark
            ? "left-[calc(100%-1.75rem-2px)] bg-slate-900 border border-slate-600"
            : "left-[2px] bg-white border border-slate-200",
        )}
      >
        {isDark ? (
          <Moon className="size-3.5 text-teal-400" strokeWidth={2.5} />
        ) : (
          <Sun className="size-3.5 text-amber-500" strokeWidth={2.5} />
        )}
      </span>
    </button>
  );
}

// ─── Three-way segmented control ──────────────────────────────────────────────

const MODES: { value: ThemeMode; icon: React.ElementType; label: string }[] = [
  { value: "light", icon: Sun, label: "Light mode" },
  { value: "system", icon: Monitor, label: "System mode" },
  { value: "dark", icon: Moon, label: "Dark mode" },
];

export function ThemeSegment({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border p-0.5 gap-0.5",
        "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700",
        className,
      )}
      role="group"
      aria-label="Theme selector"
    >
      {MODES.map(({ value, icon: Icon, label }) => {
        const active = theme === value;
        return (
          <button
            key={value}
            onClick={() => setTheme(value)}
            aria-label={label}
            aria-pressed={active}
            className={cn(
              "size-7 rounded-full flex items-center justify-center transition-all duration-200",
              active
                ? "bg-white dark:bg-slate-900 shadow-sm text-teal-600 dark:text-teal-400 scale-105"
                : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300",
            )}
          >
            <Icon className="size-3.5" strokeWidth={2.5} />
          </button>
        );
      })}
    </div>
  );
}
