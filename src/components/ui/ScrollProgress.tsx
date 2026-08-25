"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollProgress() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <motion.div
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-brand-blue via-gold to-brand-blue-dark"
        style={reduceMotion ? { display: "none" } : { scaleX }}
        aria-hidden="true"
      />

      <motion.button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="fixed bottom-20 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-navy text-white shadow-lg transition-colors hover:bg-brand-blue-dark sm:bottom-6"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={showTop ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowUp className="h-5 w-5" />
      </motion.button>
    </>
  );
}
