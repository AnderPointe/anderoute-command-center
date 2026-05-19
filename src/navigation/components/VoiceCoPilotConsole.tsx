/**
 * Phase 4 — VoiceCoPilotConsole.
 *
 * Driver-facing console: big mic toggle, live transcript, last spoken
 * response, recent command history. Designed for in-cab use — large hit
 * targets, high contrast, minimal motion.
 */
import { Mic, MicOff, Volume2, VolumeX, AlertCircle, Sparkles, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { VoiceCoPilotEntry } from "../hooks/useVoiceCoPilot";
import type { VoiceListenerStatus } from "../types/voice";

interface Props {
  status: VoiceListenerStatus;
  transcript: string;
  muted: boolean;
  error: string | null;
  log: VoiceCoPilotEntry[];
  onStart: () => void;
  onStop: () => void;
  onMutedChange: (m: boolean) => void;
  onSimulate?: (text: string) => void;
  suggestions?: string[];
}

export function VoiceCoPilotConsole({
  status, transcript, muted, error, log, onStart, onStop, onMutedChange, onSimulate, suggestions,
}: Props) {
  const listening = status === "listening";
  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-950/85 p-4 shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-emerald-300" />
          <span className="text-[13px] font-semibold tracking-wide text-zinc-100">CoPilot Voice</span>
          <Badge variant="outline" className="border-white/15 text-[10px] uppercase text-zinc-400">
            {status}
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 gap-1 text-zinc-300 hover:bg-white/5"
          onClick={() => onMutedChange(!muted)}
          aria-label={muted ? "Unmute CoPilot" : "Mute CoPilot"}
        >
          {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          <span className="text-[11px]">{muted ? "Muted" : "Voice on"}</span>
        </Button>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={listening ? onStop : onStart}
          aria-pressed={listening}
          aria-label={listening ? "Stop listening" : "Start listening"}
          className={cn(
            "grid h-16 w-16 place-items-center rounded-full transition shadow-lg",
            listening
              ? "bg-emerald-500/90 text-emerald-950 ring-4 ring-emerald-400/40 animate-pulse"
              : "bg-zinc-800 text-zinc-200 hover:bg-zinc-700 ring-2 ring-white/10",
          )}
        >
          {listening ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
        </button>
        <div className="min-w-0 flex-1 leading-tight">
          <div className="text-[11px] uppercase tracking-wider text-zinc-500">You said</div>
          <div className="truncate text-[13px] text-zinc-100">
            {transcript || (listening ? "Listening…" : "Tap the mic and speak")}
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-amber-400/40 bg-amber-500/10 px-3 py-2 text-amber-200">
          <AlertCircle className="h-3.5 w-3.5" />
          <span className="text-[12px]">{error}</span>
        </div>
      )}

      {onSimulate && suggestions && suggestions.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {suggestions.map((s) => (
            <Button
              key={s}
              variant="outline"
              size="sm"
              className="h-7 border-white/15 bg-white/5 px-2 text-[11px] text-zinc-300 hover:bg-white/10"
              onClick={() => onSimulate(s)}
            >
              {s}
            </Button>
          ))}
        </div>
      )}

      <div className="mt-4 space-y-1.5">
        <div className="text-[11px] uppercase tracking-wider text-zinc-500">Recent commands</div>
        {log.length === 0 && <div className="text-[12px] text-zinc-600">No commands yet.</div>}
        {log.map((e) => (
          <div key={e.id} className="rounded-lg border border-white/5 bg-white/[0.02] px-2.5 py-1.5 leading-tight">
            <div className="flex items-center gap-2 text-[10px] uppercase text-zinc-500">
              <Cpu className="h-3 w-3" />
              <span>{e.intent}</span>
              <span className="text-zinc-700">·</span>
              <span>{e.source}</span>
            </div>
            <div className="truncate text-[12px] text-zinc-200">{e.transcript}</div>
            <div className="truncate text-[11px] text-emerald-200/80">↳ {e.spoken}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
