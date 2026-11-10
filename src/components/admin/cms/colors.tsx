"use client";

import { createContext, useContext, useId } from "react";
import {
  contrastRatio,
  HEX_PATTERN,
  isPaletteRef,
  PALETTE_KEYS,
  PALETTE_LABELS,
  resolveColor,
} from "@/lib/projects/constants";
import type { ButtonColors, Color, Overlay, Palette } from "@/lib/projects/types";
import { INPUT_CLASS } from "./fields";

export const PaletteContext = createContext<Palette | null>(null);

function usePalette() {
  const palette = useContext(PaletteContext);
  if (!palette) throw new Error("ColorField necesita PaletteContext.");
  return palette;
}

function Swatch({ color, className = "" }: { color: string; className?: string }) {
  return (
    <span
      className={`inline-block shrink-0 rounded-full ring-1 ring-black/15 ${className}`}
      style={{ backgroundColor: color }}
    />
  );
}

/**
 * Un color de la paleta del proyecto (sigue a la paleta si cambia) o uno
 * propio en hexadecimal.
 */
export function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: Color;
  onChange: (value: Color) => void;
}) {
  const palette = usePalette();
  const id = useId();
  const resolved = resolveColor(value, palette);
  const custom = !isPaletteRef(value);

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 flex items-center gap-2 text-xs font-medium text-foreground/70">
        <Swatch color={resolved} className="h-3.5 w-3.5" />
        {label}
      </label>
      <div className="flex flex-wrap items-center gap-1.5">
        {PALETTE_KEYS.map((key) => {
          const selected = value === `$${key}`;
          return (
            <button
              key={key}
              type="button"
              title={`${PALETTE_LABELS[key]} (${palette[key]})`}
              aria-label={`${PALETTE_LABELS[key]} de la paleta`}
              aria-pressed={selected}
              onClick={() => onChange(`$${key}`)}
              className={`flex h-7 w-7 items-center justify-center rounded-full transition-shadow ${
                selected ? "ring-2 ring-foreground ring-offset-2" : "ring-1 ring-black/15 hover:ring-black/40"
              }`}
              style={{ backgroundColor: palette[key] }}
            />
          );
        })}
        <span className="mx-1 h-5 w-px bg-black/10" aria-hidden />
        <input
          type="color"
          aria-label={`${label}: color propio`}
          value={HEX_PATTERN.test(resolved) ? resolved : "#000000"}
          onChange={(e) => onChange(e.target.value)}
          className={`h-7 w-9 cursor-pointer rounded-md bg-transparent ${custom ? "ring-2 ring-foreground" : ""}`}
        />
        <input
          id={id}
          value={custom ? value : ""}
          placeholder={custom ? "" : "propio"}
          maxLength={7}
          onChange={(e) => {
            const next = e.target.value.trim();
            onChange(next.startsWith("#") ? next : `#${next}`);
          }}
          className={`${INPUT_CLASS} h-8 w-24 font-mono text-xs`}
        />
      </div>
    </div>
  );
}

export function ColorGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-5 lg:grid-cols-2">{children}</div>;
}

export function ButtonColorsField({
  label,
  value,
  onChange,
  bgLabel = "Fondo",
}: {
  label: string;
  value: ButtonColors;
  onChange: (value: ButtonColors) => void;
  /** En botones de borde, `bg` es el color del borde. */
  bgLabel?: string;
}) {
  const set = (patch: Partial<ButtonColors>) => onChange({ ...value, ...patch });
  return (
    <fieldset className="rounded-xl p-4 ring-1 ring-black/10">
      <legend className="px-1 text-sm font-medium">{label}</legend>
      <ColorGrid>
        <ColorField label={bgLabel} value={value.bg} onChange={(bg) => set({ bg })} />
        <ColorField label="Texto" value={value.fg} onChange={(fg) => set({ fg })} />
        <ColorField
          label={`${bgLabel} al pasar el mouse`}
          value={value.hoverBg}
          onChange={(hoverBg) => set({ hoverBg })}
        />
        <ColorField
          label="Texto al pasar el mouse"
          value={value.hoverFg}
          onChange={(hoverFg) => set({ hoverFg })}
        />
      </ColorGrid>
    </fieldset>
  );
}

function Slider({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="mb-1 flex justify-between text-xs font-medium text-foreground/70">
        {label}
        <span className="tabular-nums">{value}%</span>
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-accent"
      />
    </div>
  );
}

/** Capa de color sobre una foto; con `bottomOnly`, solo la sombra de la base. */
export function OverlayField({
  label,
  value,
  onChange,
  bottomOnly = false,
}: {
  label: string;
  value: Overlay;
  onChange: (value: Overlay) => void;
  bottomOnly?: boolean;
}) {
  const palette = usePalette();
  const set = (patch: Partial<Overlay>) => onChange({ ...value, ...patch });
  const color = resolveColor(value.color, palette);
  const stop = (opacity: number) => `color-mix(in oklab, ${color} ${opacity}%, transparent)`;

  return (
    <fieldset className="rounded-xl p-4 ring-1 ring-black/10">
      <legend className="px-1 text-sm font-medium">{label}</legend>
      <div className="grid gap-5 sm:grid-cols-[1fr_7rem]">
        <div className="space-y-4">
          <ColorField label="Color" value={value.color} onChange={(next) => set({ color: next })} />
          {bottomOnly ? (
            <Slider label="Opacidad en la base" value={value.bottom} onChange={(bottom) => set({ bottom })} />
          ) : (
            <div className="grid gap-4 sm:grid-cols-3">
              <Slider label="Arriba" value={value.top} onChange={(top) => set({ top })} />
              <Slider label="Centro" value={value.middle} onChange={(middle) => set({ middle })} />
              <Slider label="Abajo" value={value.bottom} onChange={(bottom) => set({ bottom })} />
            </div>
          )}
        </div>
        <div
          aria-hidden
          className="h-28 rounded-lg bg-neutral-300 ring-1 ring-black/10 sm:h-full"
          style={{
            backgroundImage: bottomOnly
              ? `linear-gradient(to top, ${stop(value.bottom)} 0%, transparent 33%)`
              : `linear-gradient(to bottom, ${stop(value.top)}, ${stop(value.middle)}, ${stop(value.bottom)})`,
          }}
        />
      </div>
    </fieldset>
  );
}

/** Aviso si el texto no se va a leer bien sobre el fondo. */
export function ContrastWarning({ bg, fg, label = "El texto" }: { bg: Color; fg: Color; label?: string }) {
  const palette = usePalette();
  const ratio = contrastRatio(resolveColor(bg, palette), resolveColor(fg, palette));
  if (ratio >= 3) return null;
  return (
    <p role="status" className="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-900">
      {label} casi no contrasta con el fondo ({ratio.toFixed(1)}:1). Elige un color más claro u
      oscuro para que se lea bien.
    </p>
  );
}
