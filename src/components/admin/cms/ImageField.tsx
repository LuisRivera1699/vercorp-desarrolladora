"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";
import type { CmsImage } from "@/lib/projects/types";
import { Field, INPUT_CLASS } from "./fields";
import { ACCEPTED_IMAGE_TYPES, prepareImage } from "./images";

export default function ImageField({
  label,
  value,
  onChange,
  hint,
  og = false,
  sharp = false,
  onRemove,
  aspect = "aspect-[4/3]",
  logo,
}: {
  label: string;
  value: CmsImage;
  onChange: (value: CmsImage) => void;
  hint?: string;
  /** Imagen para redes sociales: se recorta a 1200x630. */
  og?: boolean;
  /** Planos: más calidad para que se lean los textos. */
  sharp?: boolean;
  /** Si la imagen es opcional, permite quitarla. */
  onRemove?: () => void;
  aspect?: string;
  /** Logo sin fondo: se ve completo, sobre fondo claro u oscuro según el logo. */
  logo?: "light" | "dark";
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const altId = useId();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onFile(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      onChange({ ...value, ...(await prepareImage(file, { og, sharp })) });
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo cargar la imagen.");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <Field label={label} hint={hint}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div
          className={`relative w-full overflow-hidden rounded-xl ring-1 ring-black/10 sm:w-56 ${
            logo === "light" ? "bg-ink" : "bg-neutral-100"
          } ${og ? "aspect-[1200/630]" : logo ? "aspect-[3/1]" : aspect}`}
        >
          {value.url ? (
            <Image
              src={value.url}
              alt=""
              fill
              unoptimized
              sizes="224px"
              className={sharp || logo ? "object-contain p-2" : "object-cover"}
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-xs text-foreground/40">
              Sin imagen
            </span>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={busy}
              className="h-9 rounded-lg px-3.5 text-sm font-medium ring-1 ring-black/10 transition-colors hover:bg-black/[0.04] disabled:cursor-wait disabled:opacity-60"
            >
              {busy ? "Procesando…" : value.url ? "Reemplazar imagen" : "Subir imagen"}
            </button>
            {value.url && onRemove ? (
              <button
                type="button"
                onClick={onRemove}
                className="h-9 rounded-lg px-3.5 text-sm font-medium text-red-700 transition-colors hover:bg-red-50"
              >
                Quitar
              </button>
            ) : null}
            {value.width ? (
              <span className="text-xs text-foreground/45 tabular-nums">
                {value.width} × {value.height} px
              </span>
            ) : null}
            <input
              ref={inputRef}
              type="file"
              accept={ACCEPTED_IMAGE_TYPES.join(",")}
              className="hidden"
              onChange={(e) => onFile(e.target.files?.[0])}
            />
          </div>

          <div>
            <label htmlFor={altId} className="mb-1.5 block text-xs font-medium text-foreground/70">
              Descripción de la imagen (accesibilidad y SEO)
            </label>
            <input
              id={altId}
              value={value.alt}
              maxLength={160}
              onChange={(e) => onChange({ ...value, alt: e.target.value })}
              className={`${INPUT_CLASS} h-9`}
            />
          </div>

          {error ? (
            <p role="alert" className="text-xs text-red-700">
              {error}
            </p>
          ) : null}
        </div>
      </div>
    </Field>
  );
}
