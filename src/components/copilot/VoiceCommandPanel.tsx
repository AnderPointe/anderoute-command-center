import type { VoiceCommand } from "@/types/elitenav";

interface Props {
  commands: VoiceCommand[];
  onCommand: (c: VoiceCommand) => void;
}

export function VoiceCommandPanel({ commands, onCommand }: Props) {
  return (
    <div className="border-t border-white/5 bg-white/[0.015] p-3">
      <div className="mb-2 text-[10px] uppercase tracking-widest text-slate-500">Suggested commands</div>
      <div className="flex flex-wrap gap-1.5">
        {commands.map((c) => (
          <button
            key={c.id}
            onClick={() => onCommand(c)}
            className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] text-slate-200 transition hover:border-teal-400/40 hover:bg-teal-500/10 hover:text-teal-200"
          >
            {c.label}
          </button>
        ))}
      </div>
    </div>
  );
}
