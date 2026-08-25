"use client";

import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { waLinkForUnit } from "@/lib/contact";

export function WhatsAppFloat() {
  const pathname = usePathname();

  if (pathname.startsWith("/properties/")) {
    return null;
  }

  return (
    <a
      href={waLinkForUnit()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      data-track="whatsapp_click"
      data-track-label="floating-button"
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-white shadow-lg transition-transform hover:scale-105 hover:bg-whatsapp-dark"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <MessageCircle className="h-7 w-7" aria-hidden="true" />
    </a>
  );
}
