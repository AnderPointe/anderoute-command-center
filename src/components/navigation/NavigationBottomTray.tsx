import { Mic, Phone, AlertTriangle, ChevronUp, ShieldAlert } from "lucide-react";

interface Props {
  onCoPilot: () => void;
  onDispatch: () => void;
  onIssue: () => void;
  onSteps: () => void;
  onStatus: () => void;
  reducedActions?: boolean;
}

export function NavigationBottomTray({ onCoPilot, onDispatch, onIssue, onSteps, onStatus, reducedActions }: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0d141a]/85 p-2 backdrop-blur-xl shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)]">
      <div className="grid grid-cols-5 gap-1.5">
        <TrayButton onClick={onCoPilot} icon={<Mic className="h-4 w-4" />} label="CoPilot" accent />
        <TrayButton onClick={onDispatch} icon={<Phone className="h-4 w-4" />} label="Dispatch" />
        <TrayButton onClick={onIssue} icon={<AlertTriangle className="h-4 w-4" />} label="Report" tone="warn" />
        {!reducedActions && <TrayButton onClick={onSteps} icon={<ChevronUp className="h-4 w-4" />} label="Steps" />}
        {!reducedActions && <TrayButton onClick={onStatus} icon={<ShieldAlert className="h-4 w-4" />} label="Status" />}
        {reducedActions && (
          <>
            <div className="rounded-xl border border-dashed border-white/10 p-2 text-center text-[10px] text-slate-500">
              Locked
            </div>
            <div className="rounded-xl border border-dashed border-white/10 p-2 text-center text-[10px] text-slate-500">
              Locked
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function TrayButton({
  onClick,
  icon,
  label,
  accent,
  tone,
}: {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  accent?: boolean;
  tone?: "warn";
}) {
  const base = "flex flex-col items-center gap-1 rounded-xl border px-2 py-2.5 text-[10px] font-medium uppercase tracking-wider transition";
  const cls = accent
    ? "border-teal-400/40 bg-teal-500/10 text-teal-200 hover:bg-teal-500/15"
    : tone === "warn"
    ? "border-orange-500/30 bg-orange-500/[0.06] text-orange-200 hover:bg-orange-500/10"
    : "border-white/10 bg-white/[0.03] text-slate-300 hover:bg-white/[0.06]";
  return (
    <button onClick={onClick} className={`${base} ${cls}`}>
      {icon}
      {label}
    </button>
  );
}
