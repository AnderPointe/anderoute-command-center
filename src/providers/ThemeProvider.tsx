/**
 * AndetrackThemeProvider — smooth theme switching for Anderoute / Andetrack.
 *
 * Strategy:
 *  1. Read "andetrack-theme" (or legacy "ar-theme") from localStorage.
 *  2. If "system", track prefers-color-scheme.
 *  3. When switching: add .theme-transitioning to <html> (enables CSS
 *     color transitions), optionally wrap in View Transitions API, toggle
 *     the .dark class, then remove .theme-transitioning after 450 ms.
 *  4. Write both localStorage keys so legacy TopBar code stays in sync.
 */

import React, { useCallback, useEffect, useRef, useState } from "react";
import type { ThemeMode, ResolvedTheme } from "@/hooks/useTheme";
import { ThemeContext } from "./theme-context";

// Re-export so callers can import from one place
export { ThemeContext } from "./theme-context";

// ─── Constants ────────────────────────────────────────────────────────────────

const STORAGE_KEY = "andetrack-theme";
const LEGACY_KEY = "ar-theme";
const TRANSITION_DURATION = 450; // ms — matches CSS

// ─── Helpers ─────────────────────────────────────────────────────────────────

function readStoredTheme(): ThemeMode {
  if (typeof window === "undefined") return "system";
  const v = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_KEY);
  if (v === "light" || v === "dark" || v === "system") return v;
  return "system";
}

function resolveTheme(mode: ThemeMode): ResolvedTheme {
  if (mode === "light") return "light";
  if (mode === "dark") return "dark";
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

// ─── DOM application (called inside View Transition or directly) ───────────────

function applyDark(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
}

// ─── Provider ─────────────────────────────────────────────────────────────────

interface Props {
  children: React.ReactNode;
}

export function AndetrackThemeProvider({ children }: Props) {
  const [theme, setThemeState] = useState<ThemeMode>(() =>
    typeof window !== "undefined" ? readStoredTheme() : "system",
  );

  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() =>
    resolveTheme(typeof window !== "undefined" ? readStoredTheme() : "system"),
  );

  const transitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mediaRef = useRef<MediaQueryList | null>(null);

  // ── Apply theme to DOM with smooth transition ─────────────────────────────

  const applyTheme = useCallback((mode: ThemeMode, skipTransition = false) => {
    if (typeof window === "undefined") return;

    const dark = resolveTheme(mode) === "dark";

    // Write both keys for legacy compatibility
    localStorage.setItem(STORAGE_KEY, mode);
    localStorage.setItem(LEGACY_KEY, dark ? "dark" : "light");

    setThemeState(mode);
    setResolvedTheme(dark ? "dark" : "light");

    if (skipTransition) {
      applyDark(dark);
      return;
    }

    // Add transitioning class to unlock CSS color transitions
    if (transitionTimer.current) clearTimeout(transitionTimer.current);
    document.documentElement.classList.add("theme-transitioning");
    transitionTimer.current = setTimeout(() => {
      document.documentElement.classList.remove("theme-transitioning");
    }, TRANSITION_DURATION);

    // Use View Transitions API if available (progressive enhancement)
    if (typeof document.startViewTransition === "function") {
      document.startViewTransition(() => applyDark(dark));
    } else {
      applyDark(dark);
    }
  }, []);

  // ── Initial sync on mount ────────────────────────────────────────────────

  useEffect(() => {
    const stored = readStoredTheme();
    applyTheme(stored, true); // no transition on first render

    // Watch system preference when mode === "system"
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mediaRef.current = mq;

    const handler = () => {
      if (readStoredTheme() === "system") {
        applyTheme("system", false);
      }
    };

    mq.addEventListener("change", handler);
    return () => {
      mq.removeEventListener("change", handler);
      if (transitionTimer.current) clearTimeout(transitionTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Public API ───────────────────────────────────────────────────────────

  const setTheme = useCallback((t: ThemeMode) => applyTheme(t, false), [applyTheme]);

  const toggleTheme = useCallback(() => {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    applyTheme(next, false);
  }, [resolvedTheme, applyTheme]);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
