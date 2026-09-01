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
  const solid = menuOpen || !isHome || scrolled;

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
        menuOpen
          ? "bg-navy shadow-md"
          : solid
            ? "border-b border-grey-line bg-white/90 shadow-sm backdrop-blur-md"
            : "border-b border-white/10 bg-gradient-to-b from-black/30 via-black/10 to-transparent backdrop-blur-[2px]",
      )}
    >
      <nav aria-label="Main" className="container-site flex h-16 items-center justify-between gap-4 pt-[env(safe-area-inset-top,0px)] sm:h-20">
        <Logo dark={!solid} />

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-3.5 py-2 text-sm font-semibold transition-colors",
                menuOpen
                  ? "text-white hover:bg-white/10"
                  : `${solid ? "text-navy" : "text-white"} hover:bg-brand-blue-deep hover:text-white`,
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="ml-2 flex items-center gap-2">
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className={cn("grid h-10 w-10 place-items-center rounded-full bg-brand-blue text-white transition-colors hover:bg-brand-blue-deep")}>
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.546 12 3.546 12 3.546s-7.505 0-9.377.504A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.504 9.376.504 9.376.504s7.505 0 9.377-.504a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={cn("grid h-10 w-10 place-items-center rounded-full bg-brand-blue text-white transition-colors hover:bg-brand-blue-deep")}>
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={cn("grid h-10 w-10 place-items-center rounded-full bg-brand-blue text-white transition-colors hover:bg-brand-blue-deep")}>
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <div className="ml-1">
              <BookViewingButton source="navbar" size="sm" label="Schedule a Visit" />
            </div>
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
              ? "bg-white/10 text-white hover:bg-white/20"
              : solid
                ? "text-navy hover:bg-brand-blue-deep hover:text-white"
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
            className="fixed inset-0 top-16 z-50 flex flex-col bg-navy px-6 pb-8 pt-8 sm:top-20 lg:hidden"
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
                    className="group relative block border-b border-white/10 py-4 text-2xl font-bold text-white transition-colors hover:text-brand-blue"
                  >
                    <span className="absolute left-0 top-1/2 h-0 w-px -translate-y-1/2 bg-brand-blue-deep transition-all duration-300 group-hover:h-2/3" aria-hidden="true" />
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
              <div className="flex items-center justify-center gap-3 pt-4">
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.546 12 3.546 12 3.546s-7.505 0-9.377.504A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.504 9.376.504 9.376.504s7.505 0 9.377-.504a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
