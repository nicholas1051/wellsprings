"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { BookViewingButton } from "@/components/modals/BookViewingButton";
import { navLinks } from "@/data/site";
import { waLinkForUnit } from "@/lib/contact";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";
  const solid = !isHome || scrolled;

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    if (menuOpen) {
      setMenuOpen(false);
    }
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        solid
          ? "border-b border-grey-line bg-white/90 shadow-sm backdrop-blur-md"
          : "border-b border-white/10 bg-gradient-to-b from-black/30 via-black/10 to-transparent backdrop-blur-[2px]",
      )}
    >
      <nav aria-label="Main" className="container-site flex h-16 items-center justify-between gap-4 sm:h-20">
        <Logo dark={!solid} />

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-3.5 py-2 text-sm font-semibold transition-colors",
                solid ? "text-navy hover:bg-tint" : "text-white hover:bg-white/10",
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="ml-2 flex items-center gap-2">
            <BookViewingButton source="navbar" size="sm" label="Schedule a Visit" />
          </div>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className={cn(
            "grid h-11 w-11 place-items-center rounded-full transition-colors lg:hidden",
            menuOpen
              ? "bg-navy text-white hover:bg-navy/80"
              : solid
                ? "text-navy hover:bg-tint"
                : "text-white bg-white/10 hover:bg-white/20",
          )}
        >
          {menuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-16 z-50 flex flex-col bg-ink px-6 pb-8 pt-8 sm:top-20 lg:hidden"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index, duration: 0.25 }}
                >
                  <Link
                    href={link.href}
                    className="block border-b border-white/10 py-4 text-2xl font-bold text-white transition-colors hover:text-brand-blue"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="mt-auto space-y-3">
              <a
                href={waLinkForUnit()}
                target="_blank"
                rel="noopener noreferrer"
                data-track="whatsapp_click"
                data-track-label="mobile-menu"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-whatsapp font-semibold text-white transition-colors hover:bg-whatsapp-dark"
              >
                Chat on WhatsApp
              </a>
              <BookViewingButton source="mobile-menu" variant="primary" size="lg" className="w-full" label="Schedule a Visit" />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
