"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function ParallaxImage({
  src,
  alt,
  sizes = "100vw",
  strength = 90,
  className = "",
}: {
  src: string;
  alt: string;
  sizes?: string;
  strength?: number;
  className?: string;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const layer = layerRef.current;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!frame || !layer || reducedMotion) return;

    let raf = 0;

    const update = () => {
      const rect = frame.getBoundingClientRect();
      const viewH = window.innerHeight;
      const progress = (viewH - rect.top) / (viewH + rect.height);
      const clamped = Math.min(Math.max(progress, 0), 1);
      layer.style.transform = `translate3d(0, ${(clamped - 0.5) * strength}px, 0)`;
      raf = 0;
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [strength]);

  return (
    <div ref={frameRef} className="absolute inset-0 overflow-hidden">
      <div
        ref={layerRef}
        className="absolute inset-[-18%] will-change-transform"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className={`object-cover ${className}`}
        />
      </div>
    </div>
  );
}
