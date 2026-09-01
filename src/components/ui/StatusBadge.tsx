import { statusLabels, type UnitStatus } from "@/data/properties";
import { cn } from "@/lib/utils";

const statusStyles: Record<UnitStatus, { classes: string; dot: string }> = {
  available: {
    classes: "border-brand-blue bg-brand-blue text-white",
    dot: "bg-white",
  },
  limited: {
    classes: "border-brand-blue-deep bg-brand-blue-deep text-white",
    dot: "bg-white",
  },
  reserved: {
    classes: "border-navy/20 bg-off-white text-text-grey",
    dot: "bg-navy",
  },
  sold: {
    classes: "border-grey-line bg-off-white text-text-grey",
    dot: "bg-grey-line",
  },
};

export function StatusBadge({ status, unitsLeft, className }: { status: UnitStatus; unitsLeft?: number; className?: string }) {
  const style = statusStyles[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold",
        style.classes,
        className,
      )}
    >
      <span className={cn("h-2 w-2 rounded-full", style.dot)} aria-hidden="true" />
      {statusLabels[status]}
      {unitsLeft !== undefined && unitsLeft > 0 && (
        <span className="text-xs opacity-80">\u2022 {unitsLeft} left</span>
      )}
    </span>
  );
}
