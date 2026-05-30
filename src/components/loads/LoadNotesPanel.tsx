import { useState } from "react";
import { Send, MessageSquare, Lock } from "lucide-react";
import { useLoadNotes } from "@/hooks/useLoadNotes";

export function LoadNotesPanel({ loadId }: { loadId: string }) {
  const { notes, loading, adding, addNote } = useLoadNotes(loadId);
  const [text, setText] = useState("");

  const submit = async () => {
    if (!text.trim()) return;
    await addNote(text.trim());
    setText("");
  };

  return (
    <div className="flex flex-col h-full gap-3">
      {/* Notes list */}
      <div className="flex-1 space-y-2 overflow-y-auto">
        {loading ? (
          <div className="py-6 text-center text-xs text-slate-400 dark:text-slate-500">
            Loading notes…
          </div>
        ) : notes.length === 0 ? (
          <div className="py-8 text-center">
            <MessageSquare className="size-6 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
            <div className="text-xs text-slate-400 dark:text-slate-500">No notes yet</div>
            <div className="text-[10px] text-slate-300 dark:text-slate-600 mt-0.5">
              Add the first note below
            </div>
          </div>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className="rounded-xl border border-slate-200 dark:border-[#1e3a5f] bg-white dark:bg-[#0f1a2e] p-3"
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5">
                  <div className="size-5 rounded-full bg-gradient-to-br from-teal-500 to-orange-500 flex items-center justify-center text-white text-[8px] font-bold">
                    {(note.created_by_name ?? "D").charAt(0)}
                  </div>
                  <span className="text-[10px] font-semibold text-slate-600 dark:text-slate-300">
                    {note.created_by_name ?? "Dispatcher"}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {note.is_internal && (
                    <span className="inline-flex items-center gap-0.5 text-[8px] text-slate-400 dark:text-slate-500">
                      <Lock className="size-2" /> Internal
                    </span>
                  )}
                  <span className="text-[9px] text-slate-400 dark:text-slate-500">
                    {new Date(note.created_at).toLocaleString(undefined, {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
                {note.note}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2 pt-2 border-t border-slate-200 dark:border-[#1e3a5f]">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) submit();
          }}
          placeholder="Add an internal note… (Ctrl+Enter to save)"
          rows={2}
          className="flex-1 rounded-xl border border-slate-200 dark:border-[#1e3a5f] bg-white dark:bg-[#0f1a2e] text-xs text-slate-700 dark:text-slate-200 placeholder:text-slate-400 px-3 py-2 outline-none focus:border-teal-400 dark:focus:border-teal-500 resize-none transition-colors"
        />
        <button
          onClick={submit}
          disabled={!text.trim() || adding}
          className="flex items-center justify-center size-10 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-40 text-white transition-colors shrink-0 self-end"
        >
          <Send className="size-4" />
        </button>
      </div>
    </div>
  );
}
