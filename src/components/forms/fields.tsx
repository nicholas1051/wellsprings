import type { ReactNode } from "react";

export const inputClasses =
  "h-11 w-full rounded-lg border border-grey-line bg-white px-3.5 text-navy shadow-sm placeholder:text-text-grey/70 focus:border-brand-blue-dark focus:outline-none focus:ring-2 focus:ring-brand-blue/30";

export const textAreaClasses =
  "w-full rounded-lg border border-grey-line bg-white px-3.5 py-3 text-navy shadow-sm placeholder:text-text-grey/70 focus:border-brand-blue-dark focus:outline-none focus:ring-2 focus:ring-brand-blue/30";

interface FieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  hint?: string;
  className?: string;
  children: ReactNode;
}

export function Field({ label, htmlFor, error, required, hint, className, children }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-navy">
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      {children}
      {hint && !error ? <p className="mt-1.5 text-xs text-text-grey">{hint}</p> : null}
      {error ? <p className="mt-1.5 text-sm font-medium text-error">{error}</p> : null}
    </div>
  );
}
