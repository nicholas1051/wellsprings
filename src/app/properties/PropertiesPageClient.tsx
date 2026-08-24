"use client";

import { GradientBlobs } from "@/components/ui/GradientBlobs";
import { PropertiesContent } from "@/components/properties/PropertiesContent";

export function PropertiesPageClient() {
  return (
    <div className="relative">
      <GradientBlobs blobs={[
        { color: "blue", size: 800, className: "top-[-200px] left-[-200px]" },
        { color: "terracotta", size: 600, className: "bottom-[-100px] right-[-150px]", delay: 0.3 },
      ]} />
      <PropertiesContent />
    </div>
  );
}
