import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Bell,
  Filter,
  ChevronDown,
  Radio,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PremiumToggle } from "@/components/ui/premium-toggle";
import { alerts } from "@/data/mock";


export function TopBar() {
  const [dark, setDark] = useState(false);
  const openAlerts = alerts.filter((a) => !a.resolved).length;

  useEffect(() => {
    if (typeof document === "undefined") return;
    const stored = localStorage.getItem("ar-theme");
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    const initial = stored ? stored === "dark" : !!prefersDark;
    setDark(initial);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("ar-theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <header className="h-16 shrink-0 border-b border-border bg-surface/85 backdrop-blur-xl sticky top-0 z-30">
      <div className="flex h-full items-center gap-3 px-4 md:px-6">
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-success/10 border border-success/25 text-success text-[11px] font-medium">
          <Radio className="size-3" />
          Live
        </div>

        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            placeholder="Search drivers, loads, shipments, vehicles…"
            className="w-full h-10 pl-10 pr-20 rounded-lg bg-secondary/50 border border-border text-sm placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring/40 focus:border-ring focus:bg-card transition"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1 text-[10px] font-mono text-muted-foreground border border-border rounded px-1.5 py-0.5 bg-background">
            ⌘ K
          </kbd>
        </div>

        <Button variant="outline" size="sm" className="hidden lg:inline-flex gap-2 h-9">
          <Filter className="size-4" /> Filters
        </Button>

        <Button size="sm" className="gap-2 h-9 bg-orange text-orange-foreground hover:bg-orange/90 shadow-[var(--shadow-sm)]">
          <Plus className="size-4" /> Tender Load
        </Button>

        <div className="h-6 w-px bg-border mx-1 hidden md:block" />

        <PremiumToggle
          checked={dark}
          onChange={setDark}
          aria-label="Toggle dark mode"
        />


        <button className="size-9 rounded-md grid place-items-center hover:bg-secondary relative transition" aria-label="Alerts">
          <Bell className="size-4" />
          {openAlerts > 0 && (
            <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 px-1 rounded-full bg-orange text-orange-foreground text-[9px] font-bold grid place-items-center tabular-nums">
              {openAlerts}
            </span>
          )}
        </button>

        <div className="flex items-center gap-2 pl-3 border-l border-border">
          <div className="size-9 rounded-full bg-gradient-to-br from-teal to-orange grid place-items-center text-sm font-semibold text-white">
            LH
          </div>
          <div className="hidden md:flex flex-col leading-tight">
            <span className="text-sm font-medium">L. Howard</span>
            <span className="text-[11px] text-muted-foreground">
              Senior Dispatcher
            </span>
          </div>
          <ChevronDown className="size-4 text-muted-foreground hidden md:block" />
        </div>
      </div>
    </header>
  );
}
