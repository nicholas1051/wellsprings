import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarkerProps {
  children: ReactNode;
  className?: string;
}

export function Marker({ children, className }: MarkerProps) {
  return (
    <span
      className={cn(
        "cursor-default bg-gradient-to-t from-brand-blue-light via-brand-blue-light to-brand-blue-light bg-no-repeat px-1 [background-position:0_72%] [background-size:0%_38%] transition-[background-size] duration-500 ease-out hover:[background-size:100%_38%]",
        className,
      )}
    >
      {children}
    </span>
  );
}