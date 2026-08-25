import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "primary"
  | "navy"
  | "whatsapp"
  | "outline"
  | "outline-white"
  | "white"
  | "gold"
  | "ghost";

export type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-brand-blue-dark text-white hover:bg-navy",
  navy: "bg-navy text-white hover:bg-brand-blue-dark",
  whatsapp: "bg-whatsapp text-white hover:bg-whatsapp-dark",
  outline: "border border-navy/25 bg-white text-navy hover:border-navy/60 hover:bg-tint",
  "outline-white": "border border-white/50 text-white hover:bg-white/10",
  white: "bg-white text-navy hover:bg-tint",
  gold: "bg-gold text-navy hover:brightness-95",
  ghost: "text-brand-blue-dark hover:bg-tint",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-7 text-base",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 hover:shadow-md active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60";

export function buttonStyles(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string,
) {
  return cn(baseClasses, variantClasses[variant], sizeClasses[size], className);
}

interface ButtonLinkProps {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  external?: boolean;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  external = false,
  className,
  children,
  ariaLabel,
}: ButtonLinkProps) {
  const classes = buttonStyles(variant, size, className);
  if (external) {
    return (
      <a href={href} className={classes} aria-label={ariaLabel} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  ariaLabel?: string;
  disabled?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  type = "button",
  onClick,
  ariaLabel,
  disabled,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
      className={buttonStyles(variant, size, className)}
    >
      {children}
    </button>
  );
}
