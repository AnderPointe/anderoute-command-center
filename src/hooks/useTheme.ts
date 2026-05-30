/**
 * useTheme — centralized theme state for Anderoute / Andetrack.
 *
 * Supports "light" | "dark" | "system".
 * Persists to localStorage under both keys for compatibility:
 *   "andetrack-theme" (primary)
 *   "ar-theme" (legacy, keeps TopBar in sync)
 *
 * Applies .dark on <html> via View Transitions API when available,
 * falling back to direct class toggle with a .theme-transitioning
 * window that drives CSS transitions on color-only properties.
 */

import { useContext } from "react";
import { ThemeContext } from "@/providers/theme-context";

export type ThemeMode = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export interface ThemeContextValue {
  /** The user-selected preference ("light" | "dark" | "system") */
  theme: ThemeMode;
  /** The actual rendered theme after resolving "system" */
  resolvedTheme: ResolvedTheme;
  setTheme: (t: ThemeMode) => void;
  toggleTheme: () => void;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used inside <AndetrackThemeProvider>");
  }
  return ctx;
}
