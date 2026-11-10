"use client";

import { useRef, useState } from "react";
import { VectorAsset } from "@/components/ProjectLogo";
import type { SvgAsset } from "@/lib/projects/types";
import { Field } from "./fields";
import { prepareSvg } from "./images";

/** Logo o icono en SVG; se previsualiza en claro y en oscuro, como se usará en la web. */
export default function SvgField({
  label,
  value,
  onChange,
  hint,
  light,
  dark,
}: {
  label: string;
  value: SvgAsset | null;
  onChange: (value: SvgAsset | null) => void;
  hint?: string;
  /** Colores de la paleta para la vista previa. */
  light: string;
  dark: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onFile(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      onChange(await prepareSvg(file));
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo leer el SVG.");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <Field label={label} hint={hint}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="grid w-full grid-cols-2 overflow-hidden rounded-xl ring-1 ring-black/10 sm:w-56">
          {[
            { bg: light, fg: dark },
            { bg: dark, fg: light },
          ].map((tone) => (
            <div
              key={tone.bg}
              className="flex aspect-square items-center justify-center p-3"
              style={{ backgroundColor: tone.bg, color: tone.fg }}
            >
              {value ? (
                <VectorAsset asset={value} className="max-h-full w-full" />
              ) : (
                <span className="text-[11px] opacity-50">Sin SVG</span>
              )}
            </div>
          ))}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={busy}
              className="h-9 rounded-lg px-3.5 text-sm font-medium ring-1 ring-black/10 transition-colors hover:bg-black/[0.04] disabled:cursor-wait disabled:opacity-60"
            >
              {busy ? "Procesando…" : value ? "Reemplazar SVG" : "Subir SVG"}
            </button>
            {value ? (
              <span className="text-xs text-foreground/45 tabular-nums">
                {value.shapes.length} {value.shapes.length === 1 ? "forma" : "formas"}
              </span>
            ) : null}
            <input
              ref={inputRef}
              type="file"
              accept="image/svg+xml,.svg"
              className="hidden"
              onChange={(e) => onFile(e.target.files?.[0])}
            />
          </div>
          <p className="text-xs text-foreground/50">
            Se dibuja en un solo color, el que elijas en cada sección. Exporta el SVG con textos y
            trazos convertidos a contornos.
          </p>
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
