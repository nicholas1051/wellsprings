declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

export type AnalyticsEvent =
  | "whatsapp_click"
  | "call_click"
  | "brochure_download"
  | "enquiry_submit"
  | "viewing_booked";

export interface AnalyticsParams {
  unit?: string;
  source?: string;
  label?: string;
  [key: string]: string | number | boolean | undefined;
}

export function track(event: AnalyticsEvent, params: AnalyticsParams = {}) {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.gtag?.("event", event, params);
    window.fbq?.("trackCustom", event, params);
  } catch {
    return;
  }
}

export function trackEvent(name: string, params: AnalyticsParams = {}) {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.gtag?.("event", name, params);
    window.fbq?.("trackCustom", name, params);
  } catch {
    return;
  }
}
