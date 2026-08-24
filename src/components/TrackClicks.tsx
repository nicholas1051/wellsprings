"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export function TrackClicks() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target as Element | null;
      const el = target?.closest<HTMLElement>("[data-track]");
      if (!el) {
        return;
      }
      const eventName = el.getAttribute("data-track");
      const params: Record<string, string | undefined> = {
        label: el.getAttribute("data-track-label") ?? undefined,
        unit: el.getAttribute("data-track-unit") ?? undefined,
        source: el.getAttribute("data-track-source") ?? undefined,
      };
      if (eventName) {
        trackEvent(eventName, params);
      }
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
