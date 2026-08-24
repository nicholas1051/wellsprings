"use client";

import { CalendarCheck } from "lucide-react";
import { Button, type ButtonVariant, type ButtonSize } from "@/components/ui/Button";
import { useViewing } from "@/components/modals/ViewingProvider";

interface BookViewingButtonProps {
  unit?: string;
  source?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  label?: string;
}

export function BookViewingButton({
  unit = "not-sure",
  source,
  variant = "primary",
  size = "md",
  className,
  label = "Schedule a Visit",
}: BookViewingButtonProps) {
  const { openViewing } = useViewing();

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={() => openViewing({ unit, source })}
      ariaLabel={label}
    >
      <CalendarCheck className="h-4 w-4" aria-hidden="true" />
      {label}
    </Button>
  );
}
