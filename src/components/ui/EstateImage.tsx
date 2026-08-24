"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type EstateImageProps = Omit<ImageProps, "alt"> & {
  alt: string;
  fallbackLabel?: string;
};

export function EstateImage({
  src,
  alt,
  fallbackLabel,
  className,
  onError,
  ...props
}: EstateImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-cream text-center",
          className
        )}
        role="img"
        aria-label={alt}
      >
        <div className="space-y-1 p-4">
          <p className="text-sm font-bold text-navy/60">
            {fallbackLabel || alt}
          </p>
          <p className="text-xs text-text-grey/50">Wellsprings Ibadan</p>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        setHasError(true);
        onError?.(e);
      }}
      {...props}
    />
  );
}
