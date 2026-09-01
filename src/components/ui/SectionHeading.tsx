import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { InteractiveHeading } from "@/components/ui/InteractiveHeading";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  align?: "left" | "center";
  dark?: boolean;
  interactive?: boolean;
  accentWords?: string[];
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
  interactive = false,
  accentWords = [],
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <p className={cn("eyebrow mb-3", dark ? "text-gold" : "text-brand-blue-deep")}>{eyebrow}</p>
      ) : null}
      {interactive ? (
        <InteractiveHeading
          as="h2"
          text={title}
          accentWords={accentWords}
          className={cn(
            "font-heading text-3xl tracking-tight sm:text-4xl lg:text-5xl",
            dark ? "text-white" : "text-navy",
          )}
        />
      ) : (
        <h2
          className={cn(
            "font-heading text-3xl tracking-tight sm:text-4xl lg:text-5xl",
            dark ? "text-white" : "text-navy",
          )}
        >
          {title}
        </h2>
      )}
      {description ? (
        <p className={cn("mt-4 text-lg leading-relaxed", dark ? "text-white/80" : "text-text-grey")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
