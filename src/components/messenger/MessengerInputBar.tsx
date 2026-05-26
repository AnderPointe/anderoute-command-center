import { useRef } from "react";
import { Mic, Paperclip, Send, Smile } from "lucide-react";
import { toast } from "sonner";
import { MessengerAttachmentCard } from "./MessengerAttachmentCard";
import type { Attachment } from "./types";

export function MessengerInputBar({
  draft,
  onDraftChange,
  attachment,
  onAttachmentChange,
  onSend,
}: {
  draft: string;
  onDraftChange: (v: string) => void;
  attachment: Attachment | null;
  onAttachmentChange: (a: Attachment | null) => void;
  onSend: () => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function onPickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    onAttachmentChange({
      name: file.name,
      type: file.type || "FILE",
      size: file.size,
    });
    toast.success(`Attached ${file.name}`);
    e.target.value = "";
  }

  return (
    <div className="border-t border-white/[0.06] p-3 space-y-2">
      {attachment && (
        <MessengerAttachmentCard
          variant="composer"
          filename={attachment.name}
          filetype={attachment.type}
          size={attachment.size}
          onRemove={() => onAttachmentChange(null)}
        />
      )}
      <div className="flex items-center gap-2 rounded-2xl border border-white/[0.08] bg-[#0D1020] px-3 py-2">
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={onPickFile}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="grid size-9 place-items-center rounded-lg text-[#8B90A7] hover:bg-white/5 hover:text-white"
        >
          <Paperclip className="size-4" />
        </button>
        <input
          value={draft}
          onChange={(e) => onDraftChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSend();
            }
          }}
          placeholder="Write a message…"
          className="flex-1 bg-transparent px-2 text-sm outline-none placeholder:text-[#8B90A7]"
        />
        <button
          onClick={() => toast.info("Emoji picker coming soon")}
          className="grid size-9 place-items-center rounded-lg text-[#8B90A7] hover:bg-white/5 hover:text-white"
        >
          <Smile className="size-4" />
        </button>
        <button
          onClick={() => toast.info("Recording voice note…")}
          className="grid size-9 place-items-center rounded-lg text-[#8B90A7] hover:bg-white/5 hover:text-white"
        >
          <Mic className="size-4" />
        </button>
        <button
          onClick={onSend}
          className="grid size-9 place-items-center rounded-lg bg-[#6D35E8] text-white shadow-[0_8px_30px_-8px_rgba(109,53,232,0.7)] hover:bg-[#7c47ee]"
        >
          <Send className="size-4" />
        </button>
      </div>
    </div>
  );
}
