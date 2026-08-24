"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGsapReveal<T extends HTMLElement>(options?: { y?: number; duration?: number; delay?: number }) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.fromTo(
      el,
      { opacity: 0, y: options?.y ?? 40 },
      {
        opacity: 1,
        y: 0,
        duration: options?.duration ?? 0.8,
        delay: options?.delay ?? 0,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      },
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [options?.y, options?.duration, options?.delay]);

  return ref;
}

export function useGsapStagger<T extends HTMLElement>(
  selector: string,
  options?: { y?: number; stagger?: number; duration?: number },
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const children = container.querySelectorAll(selector);
    if (!children.length) return;

    gsap.fromTo(
      children,
      { opacity: 0, y: options?.y ?? 30 },
      {
        opacity: 1,
        y: 0,
        duration: options?.duration ?? 0.6,
        stagger: options?.stagger ?? 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: container, start: "top 80%", once: true },
      },
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [selector, options?.y, options?.stagger, options?.duration]);

  return ref;
}
