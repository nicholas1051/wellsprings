import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <p className={cn("eyebrow mb-3", dark ? "text-gold" : "text-brand-blue-deep")}>{eyebrow}</p>
      ) : null}
      <h2
        className={cn(
          "font-heading text-3xl tracking-tight sm:text-4xl lg:text-5xl",
          dark ? "text-white" : "text-navy",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className={cn("mt-4 text-lg leading-relaxed", dark ? "text-white/80" : "text-text-grey")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
