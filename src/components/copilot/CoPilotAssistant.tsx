import { motion, AnimatePresence } from "framer-motion";
import { X, Mic } from "lucide-react";
import type { CoPilotMessage } from "@/types/elitenav";
import { VoiceCommandPanel } from "./VoiceCommandPanel";
import type { VoiceCommand } from "@/types/elitenav";

interface Props {
  open: boolean;
  listening: boolean;
  onToggleListen: () => void;
  onClose: () => void;
  feed: CoPilotMessage[];
  commands: VoiceCommand[];
  onCommand: (c: VoiceCommand) => void;
}

export function CoPilotAssistant({ open, listening, onToggleListen, onClose, feed, commands, onCommand }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="absolute inset-0 z-40 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="absolute inset-x-3 bottom-3 z-50 overflow-hidden rounded-3xl border border-teal-400/20 bg-gradient-to-br from-[#0b1620]/95 via-[#0a1218]/95 to-[#0a151c]/95 backdrop-blur-2xl shadow-[0_30px_80px_-20px_rgba(45,212,191,0.25)] sm:inset-x-auto sm:right-4 sm:w-[440px]"
            initial={{ y: 40, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", damping: 24, stiffness: 260 }}
          >
            {/* Header */}
            <div className="relative border-b border-white/5 px-5 py-4">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-teal-500/10 via-transparent to-orange-500/10" />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={onToggleListen}
                    className={`relative flex h-11 w-11 items-center justify-center rounded-full border ${
                      listening
                        ? "border-teal-400/60 bg-teal-500/15 text-teal-300"
                        : "border-white/10 bg-white/[0.04] text-slate-300"
                    }`}
                  >
                    {listening && (
                      <motion.span
                        className="absolute inset-0 rounded-full border border-teal-400/40"
                        animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity }}
                      />
                    )}
                    <Mic className="h-4 w-4" />
                  </button>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-teal-300/80">Anderoute</div>
                    <div className="text-base font-semibold text-white tracking-tight">CoPilot</div>
                  </div>
                </div>
                <button onClick={onClose} className="rounded-full border border-white/10 p-1.5 text-slate-300 hover:bg-white/5">
                  <X className="h-4 w-4" />
                </button>
              </div>
              {/* Waveform */}
              <div className="relative mt-4 flex h-8 items-end gap-[3px]">
                {Array.from({ length: 32 }).map((_, i) => (
                  <motion.span
                    key={i}
                    className="w-[3px] rounded-full bg-teal-300/70"
                    animate={listening
                      ? { height: [`${20 + Math.random() * 60}%`, `${30 + Math.random() * 70}%`, `${20 + Math.random() * 60}%`] }
                      : { height: ["18%", "26%", "18%"] }
                    }
                    transition={{ duration: 0.9 + (i % 5) * 0.1, repeat: Infinity, ease: "easeInOut" }}
                  />
                ))}
              </div>
              <div className="mt-2 text-[11px] text-slate-400">
                {listening ? "Listening… say a command" : "Tap the mic or pick a quick action"}
              </div>
            </div>

            {/* Feed */}
            <div className="max-h-[280px] space-y-2 overflow-y-auto px-4 py-3">
              {feed.slice().reverse().map((m) => (
                <div
                  key={m.id}
                  className={`rounded-2xl border px-3 py-2 text-[12.5px] leading-relaxed ${
                    m.role === "dispatch"
                      ? "border-orange-400/20 bg-orange-500/[0.05] text-orange-100"
                      : m.tone === "warning"
                      ? "border-orange-400/20 bg-white/[0.02] text-slate-100"
                      : m.tone === "success"
                      ? "border-emerald-500/20 bg-emerald-500/[0.04] text-emerald-100"
                      : "border-white/10 bg-white/[0.025] text-slate-100"
                  }`}
                >
                  <div className="mb-0.5 text-[9px] uppercase tracking-widest text-slate-500">
                    {m.role === "dispatch" ? "Dispatch" : "CoPilot"} · {m.at}
                  </div>
                  {m.text}
                </div>
              ))}
            </div>

            <VoiceCommandPanel commands={commands} onCommand={onCommand} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
