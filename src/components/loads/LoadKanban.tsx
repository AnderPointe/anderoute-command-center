import { LoadKanbanColumn } from "./LoadKanbanColumn";
import { KANBAN_COLUMNS } from "@/types/loads";
import type { Load } from "@/types/loads";

interface Props {
  loads: Load[];
  onView: (load: Load) => void;
  onAssign: (load: Load) => void;
  onOffer: (load: Load) => void;
}

export function LoadKanban({ loads, onView, onAssign, onOffer }: Props) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-3 min-h-[420px]">
      {KANBAN_COLUMNS.map((col) => (
        <LoadKanbanColumn
          key={col.status}
          column={col}
          loads={loads.filter((l) => l.status === col.status)}
          onView={onView}
          onAssign={onAssign}
          onOffer={onOffer}
        />
      ))}
    </div>
  );
}
