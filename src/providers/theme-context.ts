/**
 * theme-context — ThemeContext singleton.
 * Separated from the provider component to satisfy React Fast Refresh rules.
 */

import { createContext } from "react";
import type { ThemeContextValue } from "@/hooks/useTheme";

export const ThemeContext = createContext<ThemeContextValue | null>(null);
