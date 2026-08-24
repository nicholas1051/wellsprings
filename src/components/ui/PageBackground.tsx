"use client";

import { GradientBlobs } from "@/components/ui/GradientBlobs";

export function PageBackground({
  blobs,
  children,
}: {
  blobs: Array<{ color: "blue" | "terracotta" | "sage" | "gold"; size?: number; className?: string; delay?: number }>;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <GradientBlobs blobs={blobs} />
      {children}
    </div>
  );
}
