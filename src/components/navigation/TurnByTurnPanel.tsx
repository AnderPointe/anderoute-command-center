import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle } from "lucide-react";
import { maneuverGlyph } from "@/utils/elitenav";
import type { RouteStep } from "@/types/elitenav";

interface Props {
  open: boolean;
  onClose: () => void;
  steps: RouteStep[];
  currentIndex: number;
}

export function TurnByTurnPanel({ open, onClose, steps, currentIndex }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="absolute inset-0 z-40 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 z-50 rounded-t-3xl border-t border-white/10 bg-[#0b1218]/95 backdrop-blur-xl"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
          >
            <div className="mx-auto mt-2 h-1 w-10 rounded-full bg-white/15" />
            <div className="flex items-center justify-between px-5 pt-3">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-slate-500">Turn-by-turn</div>
                <div className="text-base font-semibold text-white">{steps.length} maneuvers</div>
              </div>
              <button onClick={onClose} className="rounded-full border border-white/10 p-1.5 text-slate-300 hover:bg-white/5">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto px-3 pb-6 pt-3">
              <ol className="space-y-1.5">
                {steps.map((s, i) => {
                  const done = i < currentIndex;
                  const active = i === currentIndex;
                  return (
                    <li
                      key={s.id}
                      className={`flex items-start gap-3 rounded-xl border p-3 ${
                        active
                          ? "border-teal-400/40 bg-teal-500/[0.07]"
                          : done
                          ? "border-white/5 bg-white/[0.015] opacity-60"
                          : "border-white/10 bg-white/[0.03]"
                      }`}
                    >
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xl ${
                        active ? "bg-teal-500/15 text-teal-300 ring-1 ring-teal-400/40"
                        : done ? "bg-white/5 text-slate-500"
                        : "bg-white/[0.04] text-slate-300"
                      }`}>
                        {maneuverGlyph(s.maneuver)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium text-white">{s.instruction}</div>
                        <div className="mt-0.5 truncate text-[11px] text-slate-400">{s.street}</div>
                        {s.alert && (
                          <div className="mt-1 flex items-center gap-1 text-[10px] text-orange-300">
                            <AlertTriangle className="h-3 w-3" /> {s.alert}
                          </div>
                        )}
                      </div>
                      <div className="shrink-0 text-right">
                        <div className="text-xs font-semibold text-white">{s.distance}</div>
                        <div className="text-[10px] text-slate-500">{s.duration}</div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
