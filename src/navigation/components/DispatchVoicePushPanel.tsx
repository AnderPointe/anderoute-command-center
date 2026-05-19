/**
 * Phase 4 — DispatchVoicePushPanel.
 *
 * Dispatcher composes a short message and pushes it to a specific driver.
 * Driver's CoPilot speaks it aloud (autoplay) via realtime subscription.
 */
import { useState } from "react";
import { Send, Megaphone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

interface Props {
  companyId: string;
  driverId: string;
  dispatcherId: string;
  sessionId?: string | null;
}

type Priority = "low" | "normal" | "high" | "urgent";

export function DispatchVoicePushPanel({ companyId, driverId, dispatcherId, sessionId }: Props) {
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState<Priority>("normal");
  const [sending, setSending] = useState(false);
  const [lastSent, setLastSent] = useState<string | null>(null);

  const send = async () => {
    if (!message.trim()) return;
    setSending(true);
    const { error } = await supabase.from("dispatch_voice_messages").insert({
      company_id: companyId,
      driver_id: driverId,
      dispatcher_id: dispatcherId,
      session_id: sessionId ?? null,
      message: message.trim(),
      priority,
    });
    setSending(false);
    if (!error) {
      setLastSent(message.trim());
      setMessage("");
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-950/85 p-4 shadow-xl">
      <div className="flex items-center gap-2">
        <Megaphone className="h-4 w-4 text-emerald-300" />
        <span className="text-[13px] font-semibold tracking-wide text-zinc-100">
          Push Voice to Driver
        </span>
      </div>
      <div className="mt-3 flex gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="e.g. Reefer alarm on load 4421, please check trailer"
          maxLength={240}
          className="border-white/10 bg-white/5 text-[12px] text-zinc-100 placeholder:text-zinc-500"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              void send();
            }
          }}
        />
        <Select value={priority} onValueChange={(v) => setPriority(v as Priority)}>
          <SelectTrigger className="h-9 w-28 border-white/10 bg-white/5 text-[11px] text-zinc-200">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="normal">Normal</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="urgent">Urgent</SelectItem>
          </SelectContent>
        </Select>
        <Button
          onClick={send}
          disabled={!message.trim() || sending}
          className="h-9 gap-1 bg-emerald-500 text-emerald-950 hover:bg-emerald-400"
        >
          <Send className="h-3.5 w-3.5" />
          Send
        </Button>
      </div>
      {lastSent && (
        <div className="mt-2 text-[11px] text-zinc-500">
          Last sent: <span className="text-zinc-300">"{lastSent}"</span>
        </div>
      )}
      <div className="mt-2 text-[10px] text-zinc-600">
        Urgent and high priority interrupt CoPilot's current speech.
      </div>
    </div>
  );
}
