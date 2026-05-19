/**
 * Phase 4 — DispatchVoiceInbox.
 *
 * Driver-side list of unacknowledged dispatch voice messages. Lets the
 * driver re-play or acknowledge with one tap.
 */
import { Inbox, Check, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { DispatchVoiceMessage } from "../hooks/useDispatchVoiceMessages";

interface Props {
  messages: DispatchVoiceMessage[];
  onAcknowledge: (id: string) => void;
  onReplay: (text: string) => void;
}

const PRIORITY_STYLES = {
  urgent: "border-red-500/40 bg-red-500/10 text-red-200",
  high: "border-amber-400/40 bg-amber-500/10 text-amber-200",
  normal: "border-white/10 bg-white/[0.03] text-zinc-200",
  low: "border-white/5 bg-white/[0.02] text-zinc-400",
} as const;

export function DispatchVoiceInbox({ messages, onAcknowledge, onReplay }: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-950/85 p-4 shadow-xl">
      <div className="flex items-center gap-2">
        <Inbox className="h-4 w-4 text-emerald-300" />
        <span className="text-[13px] font-semibold tracking-wide text-zinc-100">
          Dispatch Voice Inbox
        </span>
        <Badge variant="outline" className="border-white/15 text-[10px] text-zinc-400">
          {messages.length}
        </Badge>
      </div>
      <div className="mt-3 space-y-2">
        {messages.length === 0 && (
          <div className="text-[12px] text-zinc-600">No new messages from dispatch.</div>
        )}
        {messages.map((m) => (
          <div
            key={m.id}
            className={cn(
              "flex items-start gap-2 rounded-lg border px-2.5 py-2 leading-tight",
              PRIORITY_STYLES[m.priority],
            )}
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 text-[10px] uppercase">
                <span>{m.priority}</span>
                <span className="text-zinc-600">·</span>
                <span className="text-zinc-500">{new Date(m.created_at).toLocaleTimeString()}</span>
              </div>
              <div className="text-[12px]">{m.message}</div>
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="h-7 px-2 text-zinc-300 hover:bg-white/5"
              onClick={() => onReplay(`Dispatch: ${m.message}`)}
              aria-label="Replay message"
            >
              <Volume2 className="h-3.5 w-3.5" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-7 px-2 text-emerald-300 hover:bg-emerald-500/10"
              onClick={() => onAcknowledge(m.id)}
              aria-label="Acknowledge message"
            >
              <Check className="h-3.5 w-3.5" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
