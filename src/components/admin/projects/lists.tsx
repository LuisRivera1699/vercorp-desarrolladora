"use client";

import { useId, useState } from "react";
import ImageField from "@/components/admin/cms/ImageField";
import ListEditor from "@/components/admin/cms/ListEditor";
import { INPUT_CLASS, TextArea, TextField } from "@/components/admin/cms/fields";
import { emptyImage, newItemId } from "@/lib/projects/defaults";
import type { GrowthItem, Lot, PhotoItem, StepItem, TextItem, ValueItem } from "@/lib/projects/types";
import { LIMITS, MAX } from "@/lib/projects/validate";

export function TextList({
  items,
  onChange,
  noun,
  max,
  min = 0,
  limit = LIMITS.long,
}: {
  items: TextItem[];
  onChange: (items: TextItem[]) => void;
  noun: string;
  max: number;
  min?: number;
  limit?: number;
}) {
  return (
    <ListEditor
      items={items}
      onChange={onChange}
      createItem={() => ({ id: newItemId(), text: "" })}
      itemTitle={(item) => item.text}
      noun={noun}
      min={min}
      max={max}
      renderItem={(item, update) =>
        limit > LIMITS.short ? (
          <TextArea label="Texto" value={item.text} max={limit} rows={4} onChange={(text) => update({ text })} />
        ) : (
          <TextField label="Texto" value={item.text} max={limit} onChange={(text) => update({ text })} />
        )
      }
    />
  );
}

/** Dato con valor destacado y su texto, p. ej. "2,500 m²" + "de área total". */
export function ValueList({
  items,
  onChange,
  noun,
  max,
  valueHint,
}: {
  items: ValueItem[];
  onChange: (items: ValueItem[]) => void;
  noun: string;
  max: number;
  valueHint?: string;
}) {
  return (
    <ListEditor
      items={items}
      onChange={onChange}
      createItem={() => ({ id: newItemId(), value: "", label: "" })}
      itemTitle={(item) => [item.value, item.label].filter(Boolean).join(" ")}
      noun={noun}
      max={max}
      renderItem={(item, update) => (
        <div className="grid gap-5 sm:grid-cols-[12rem_1fr]">
          <TextField label="Valor" value={item.value} max={24} hint={valueHint} onChange={(value) => update({ value })} />
          <TextField label="Texto" value={item.label} max={LIMITS.short} onChange={(label) => update({ label })} />
        </div>
      )}
    />
  );
}

export function PhotoList({
  items,
  onChange,
  noun,
}: {
  items: PhotoItem[];
  onChange: (items: PhotoItem[]) => void;
  noun: string;
}) {
  return (
    <ListEditor
      items={items}
      onChange={onChange}
      createItem={() => ({ id: newItemId(), title: "", image: emptyImage() })}
      itemTitle={(item) => item.title}
      noun={noun}
      min={1}
      max={MAX.photos}
      renderItem={(item, update) => (
        <>
          <TextField label="Título" value={item.title} max={LIMITS.short} onChange={(title) => update({ title })} />
          <ImageField label="Foto" value={item.image} aspect="aspect-[4/5]" onChange={(image) => update({ image })} />
        </>
      )}
    />
  );
}

export function StepList({
  items,
  onChange,
  noun,
  max,
  min = 0,
}: {
  items: StepItem[];
  onChange: (items: StepItem[]) => void;
  noun: string;
  max: number;
  min?: number;
}) {
  return (
    <ListEditor
      items={items}
      onChange={onChange}
      createItem={() => ({ id: newItemId(), title: "", description: "" })}
      itemTitle={(item) => item.title}
      noun={noun}
      min={min}
      max={max}
      renderItem={(item, update) => (
        <>
          <TextField label="Título" value={item.title} max={LIMITS.short} onChange={(title) => update({ title })} />
          <TextArea
            label="Texto"
            value={item.description}
            max={LIMITS.text}
            onChange={(description) => update({ description })}
          />
        </>
      )}
    />
  );
}

export function GrowthList({
  items,
  onChange,
}: {
  items: GrowthItem[];
  onChange: (items: GrowthItem[]) => void;
}) {
  return (
    <ListEditor
      items={items}
      onChange={onChange}
      createItem={() => ({ id: newItemId(), title: "", description: "", image: emptyImage() })}
      itemTitle={(item) => item.title}
      noun="Tarjeta"
      min={1}
      max={MAX.growth}
      renderItem={(item, update) => (
        <>
          <TextField label="Título" value={item.title} max={LIMITS.short} onChange={(title) => update({ title })} />
          <TextArea
            label="Texto"
            value={item.description}
            max={LIMITS.text}
            onChange={(description) => update({ description })}
          />
          <ImageField label="Foto de fondo" value={item.image} aspect="aspect-[3/4]" onChange={(image) => update({ image })} />
        </>
      )}
    />
  );
}

/**
 * Espacios del proyecto. El número de cada espacio es su posición, igual que
 * en el plano: borrar uno del medio renumera los siguientes.
 */
export function LotsEditor({
  lots,
  onChange,
  defaultArea,
}: {
  lots: Lot[];
  onChange: (lots: Lot[]) => void;
  defaultArea: number;
}) {
  const countId = useId();
  const areaId = useId();
  const [count, setCount] = useState(1);
  const [area, setArea] = useState(defaultArea || 200);
  const sold = lots.filter((lot) => lot.sold).length;
  const room = MAX.lots - lots.length;

  function patch(index: number, next: Partial<Lot>) {
    onChange(lots.map((lot, i) => (i === index ? { ...lot, ...next } : lot)));
  }

  function add() {
    const amount = Math.min(Math.max(1, Math.floor(count) || 1), room);
    onChange([...lots, ...Array.from({ length: amount }, () => ({ area, sold: false }))]);
  }

  return (
    <div className="space-y-5">
      <dl className="grid grid-cols-3 gap-3 text-center">
        {[
          ["Espacios", lots.length],
          ["Vendidos", sold],
          ["Disponibles", lots.length - sold],
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl bg-black/[0.03] px-3 py-3">
            <dt className="text-xs text-foreground/55">{label}</dt>
            <dd className="mt-0.5 text-xl font-semibold tabular-nums">{value}</dd>
          </div>
        ))}
      </dl>

      {lots.length ? (
        <ol className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {lots.map((lot, index) => (
            <li
              key={index}
              className={`flex flex-col gap-2 rounded-xl p-3 ring-1 transition-colors ${
                lot.sold ? "bg-black/[0.03] ring-black/5" : "ring-black/10"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold tabular-nums">N.º {index + 1}</span>
                <button
                  type="button"
                  onClick={() => onChange(lots.filter((_, i) => i !== index))}
                  aria-label={`Eliminar espacio ${index + 1}`}
                  title="Eliminar"
                  className="flex h-7 w-7 items-center justify-center rounded-md text-red-700/70 transition-colors hover:bg-red-50 hover:text-red-700"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" className="h-3.5 w-3.5" aria-hidden>
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>
              <label className="flex items-center gap-2 text-xs text-foreground/60">
                <input
                  type="number"
                  min={0}
                  inputMode="numeric"
                  aria-label={`Área del espacio ${index + 1} en m²`}
                  value={Number.isFinite(lot.area) ? lot.area : ""}
                  onChange={(e) =>
                    patch(index, { area: e.target.value === "" ? Number.NaN : Number(e.target.value) })
                  }
                  className={`${INPUT_CLASS} h-8 px-2.5 tabular-nums`}
                />
                m²
              </label>
              <label className="flex cursor-pointer items-center gap-2 text-xs font-medium">
                <input
                  type="checkbox"
                  checked={lot.sold}
                  onChange={(e) => patch(index, { sold: e.target.checked })}
                  className="h-4 w-4 rounded accent-accent"
                />
                Vendido
              </label>
            </li>
          ))}
        </ol>
      ) : (
        <p className="rounded-xl border border-dashed border-black/15 px-4 py-6 text-center text-sm text-foreground/55">
          Todavía no hay espacios. Agrégalos abajo.
        </p>
      )}

      <div className="flex flex-wrap items-end gap-3 rounded-xl bg-black/[0.03] p-4">
        <div>
          <label htmlFor={countId} className="mb-1.5 block text-xs font-medium text-foreground/70">
            Cantidad
          </label>
          <input
            id={countId}
            type="number"
            min={1}
            max={room}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className={`${INPUT_CLASS} h-9 w-24`}
          />
        </div>
        <div>
          <label htmlFor={areaId} className="mb-1.5 block text-xs font-medium text-foreground/70">
            Área de cada uno (m²)
          </label>
          <input
            id={areaId}
            type="number"
            min={1}
            value={area}
            onChange={(e) => setArea(Number(e.target.value))}
            className={`${INPUT_CLASS} h-9 w-32`}
          />
        </div>
        <button
          type="button"
          onClick={add}
          disabled={room <= 0}
          className="h-9 rounded-lg px-3.5 text-sm font-medium text-earth ring-1 ring-accent/60 transition-colors hover:bg-accent-soft/40 disabled:cursor-not-allowed disabled:opacity-50"
        >
          + Agregar espacios
        </button>
        <p className="w-full text-xs text-foreground/50">
          El número de cada espacio es su posición, como en el plano. Si eliminas uno del medio, los
          siguientes se renumeran.
        </p>
      </div>
    </div>
  );
}
