import { FileText, Upload, File } from "lucide-react";

const PLACEHOLDER_DOCS = [
  { type: "Rate Confirmation", status: "pending" },
  { type: "Bill of Lading (BOL)", status: "pending" },
  { type: "Proof of Delivery (POD)", status: "pending" },
];

export function LoadDocumentsPanel({ loadId: _loadId }: { loadId: string }) {
  return (
    <div className="space-y-3">
      {/* Doc list */}
      <div className="space-y-2">
        {PLACEHOLDER_DOCS.map((doc) => (
          <div
            key={doc.type}
            className="flex items-center justify-between rounded-xl border border-dashed border-slate-200 dark:border-[#1e3a5f] bg-white dark:bg-[#0f1a2e] px-3 py-2.5"
          >
            <div className="flex items-center gap-2.5">
              <div className="size-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <FileText className="size-3.5 text-slate-400" />
              </div>
              <div>
                <div className="text-xs font-medium text-slate-700 dark:text-slate-200">
                  {doc.type}
                </div>
                <div className="text-[9px] text-slate-400 dark:text-slate-500">Not uploaded</div>
              </div>
            </div>
            <button className="flex items-center gap-1 text-[9px] font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-700 transition-colors">
              <Upload className="size-2.5" /> Upload
            </button>
          </div>
        ))}
      </div>

      {/* Upload placeholder */}
      <button className="w-full flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 dark:border-[#1e3a5f] bg-slate-50 dark:bg-[#080f1d]/60 py-6 text-slate-400 dark:text-slate-500 hover:border-teal-400 dark:hover:border-teal-500 hover:text-teal-500 transition-colors">
        <File className="size-6" />
        <div className="text-xs">Drop files here or click to upload</div>
        <div className="text-[9px]">PDF, JPG, PNG — max 25 MB</div>
      </button>

      <div className="text-[9px] text-slate-400 dark:text-slate-500 text-center">
        Document storage requires Supabase Storage to be configured.
      </div>
    </div>
  );
}
