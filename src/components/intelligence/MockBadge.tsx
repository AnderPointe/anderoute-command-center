/** Phase 9 — consistent label for AI/mock surfaces. */
import { Badge } from "@/components/ui/badge";
import { FlaskConical } from "lucide-react";

export function MockBadge({ label = "Mock model · not trained on real data" }: { label?: string }) {
  return (
    <Badge variant="outline" className="gap-1 border-violet-500/30 text-violet-200">
      <FlaskConical className="size-3" />
      <span className="text-[10px]">{label}</span>
    </Badge>
  );
}
