"use client";

import type { ReactNode } from "react";
import { LightboxProvider } from "@/components/gallery/Lightbox";
import { ViewingProvider } from "@/components/modals/ViewingProvider";
import { CallbackProvider } from "@/components/modals/CallbackProvider";
import { LenisProvider } from "@/components/LenisProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ViewingProvider>
      <CallbackProvider>
        <LightboxProvider>
          <LenisProvider />
          {children}
        </LightboxProvider>
      </CallbackProvider>
    </ViewingProvider>
  );
}
