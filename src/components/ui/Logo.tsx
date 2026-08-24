import Link from "next/link";
import { Droplets } from "lucide-react";
import { cn } from "@/lib/utils";
import { site } from "@/data/site";

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" aria-label={`${site.brandName} Home`} className="inline-flex items-center gap-2.5">
      <span
        className={cn(
          "grid h-9 w-9 place-items-center rounded-lg",
          dark ? "bg-white/15 text-white" : "bg-brand-blue text-white",
        )}
      >
        <Droplets className="h-5 w-5" aria-hidden="true" />
      </span>
      <div className="flex flex-col leading-none">
        <span
          className={cn(
            "text-lg font-bold tracking-tight",
            dark ? "text-white" : "text-navy",
          )}
        >
          Wellsprings
        </span>
        <span
          className={cn(
            "text-[0.6rem] font-semibold uppercase tracking-[0.2em]",
            dark ? "text-white/60" : "text-text-grey",
          )}
        >
          Ibadan
        </span>
      </div>
    </Link>
  );
}
