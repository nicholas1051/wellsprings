import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/site";

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" aria-label={`${site.brandName} Home`} className="inline-flex items-center">
      <Image
        src="/wellsprings-logo.png"
        alt="Wellsprings Ibadan"
        width={160}
        height={48}
        priority
        className={`h-auto w-[130px] sm:w-[160px] ${dark ? "brightness-0 invert" : ""}`}
      />
    </Link>
  );
}
