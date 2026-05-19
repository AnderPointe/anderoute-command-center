import { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Truck, Radio } from "lucide-react";

interface Props {
  children: ReactNode;
  fullBleed?: boolean;
}

export function AppShell({ children, fullBleed = false }: Props) {
  return (
    <div className="min-h-screen bg-[#0a0e12] text-slate-100 antialiased">
      <header className="sticky top-0 z-30 border-b border-white/5 bg-[#0a0e12]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link to="/driver/elitenav" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-teal-400 to-teal-600 shadow-[0_0_24px_-6px_theme(colors.teal.500)]">
              <Truck className="h-4 w-4 text-slate-950" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Anderoute</span>
              <span className="text-sm font-semibold tracking-tight text-white">EliteNav</span>
            </div>
          </Link>
          <div className="flex items-center gap-2 rounded-full border border-white/5 bg-white/[0.03] px-3 py-1.5 text-[11px]">
            <Radio className="h-3 w-3 animate-pulse text-emerald-400" />
            <span className="text-slate-300">Dispatch Live</span>
          </div>
        </div>
      </header>
      <main className={fullBleed ? "" : "mx-auto max-w-7xl px-4 py-6 sm:px-6"}>{children}</main>
    </div>
  );
}
