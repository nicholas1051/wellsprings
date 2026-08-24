"use client";

import type { ReactNode } from "react";
import { LightboxProvider } from "@/components/gallery/Lightbox";
import { ViewingProvider } from "@/components/modals/ViewingProvider";
import { LenisProvider } from "@/components/LenisProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ViewingProvider>
      <LightboxProvider>
        <LenisProvider />
        {children}
      </LightboxProvider>
    </ViewingProvider>
  );
}
