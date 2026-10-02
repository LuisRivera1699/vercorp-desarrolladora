"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

export default function ImageLightbox({
  src,
  alt,
  width,
  height,
  label = "Ampliar imagen",
  children,
  className = "",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  label?: string;
  children: ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const overlay = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={() => setOpen(false)}
      className="animate-hero-in fixed inset-0 z-[70] flex items-center justify-center bg-ink/95 p-4 sm:p-8"
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="100vw"
        className="max-h-full w-auto max-w-full rounded-xl bg-white object-contain p-3 sm:p-6"
        onClick={(event) => event.stopPropagation()}
      />
      <button
        type="button"
        onClick={() => setOpen(false)}
        aria-label="Cerrar"
        className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white hover:text-foreground sm:top-6 sm:right-6"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M6 6l12 12M18 6 6 18"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <p className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-medium tracking-[0.28em] text-white/50 uppercase">
        Esc para cerrar
      </p>
    </div>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={label}
        className={`group relative block w-full cursor-zoom-in text-left ${className}`}
      >
        {children}
      </button>
      {open ? createPortal(overlay, document.body) : null}
    </>
  );
}
