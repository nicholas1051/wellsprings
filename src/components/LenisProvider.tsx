"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function LenisProvider() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const kickObservers = () => {
      const y = window.scrollY || 0;
      window.scrollTo(0, y + 1);
      requestAnimationFrame(() => {
        window.scrollTo(0, y);
      });
    };

    const timers = [
      setTimeout(kickObservers, 200),
      setTimeout(kickObservers, 600),
    ];

    return () => {
      timers.forEach(clearTimeout);
      lenis.destroy();
    };
  }, []);

  return null;
}
