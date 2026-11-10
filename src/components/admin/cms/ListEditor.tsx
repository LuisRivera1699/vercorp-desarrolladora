"use client";

import { useState } from "react";

export function newItemId() {
  return crypto.randomUUID().slice(0, 8);
}

type Props<T extends { id: string }> = {
  items: T[];
  onChange: (items: T[]) => void;
  createItem: () => T;
  itemTitle: (item: T, index: number) => string;
  renderItem: (item: T, update: (patch: Partial<T>) => void) => React.ReactNode;
  noun: string;
  min?: number;
  max?: number;
};

export default function ListEditor<T extends { id: string }>({
  items,
  onChange,
  createItem,
  itemTitle,
  renderItem,
  noun,
  min = 0,
  max,
}: Props<T>) {
  const [open, setOpen] = useState<string | null>(null);
  const [confirming, setConfirming] = useState<string | null>(null);

  const canAdd = max === undefined || items.length < max;
  const canRemove = items.length > min;

  function update(id: string, patch: Partial<T>) {
    onChange(items.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }

  function move(index: number, delta: number) {
    const next = [...items];
    const [item] = next.splice(index, 1);
    next.splice(index + delta, 0, item);
    onChange(next);
  }

  function add() {
    const item = createItem();
    onChange([...items, item]);
    setOpen(item.id);
  }

  function remove(id: string) {
    onChange(items.filter((item) => item.id !== id));
    setConfirming(null);
    if (open === id) setOpen(null);
  }

  return (
    <div className="space-y-3">
      {items.length === 0 ? (
        <p className="rounded-xl border border-dashed border-black/15 px-4 py-6 text-center text-sm text-foreground/55">
          No hay elementos. Agrega el primero.
        </p>
      ) : (
        <ol className="space-y-3">
          {items.map((item, index) => {
            const isOpen = open === item.id;
            return (
              <li key={item.id} className="rounded-xl ring-1 ring-black/10">
                <div className="flex items-center gap-2 px-3 py-2.5 sm:px-4">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : item.id)}
                    aria-expanded={isOpen}
                    className="flex min-w-0 flex-1 items-center gap-3 text-left"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black/[0.05] text-xs font-semibold tabular-nums text-foreground/60">
                      {index + 1}
                    </span>
                    <span className="truncate text-sm font-medium">
                      {itemTitle(item, index) || `${noun} sin título`}
                    </span>
                    <Chevron open={isOpen} />
                  </button>

                  {confirming === item.id ? (
                    <div className="flex shrink-0 items-center gap-2">
                      <span className="hidden text-xs text-foreground/60 sm:inline">¿Eliminar?</span>
                      <button
                        type="button"
                        onClick={() => remove(item.id)}
                        className="h-8 rounded-lg bg-red-600 px-3 text-xs font-semibold text-white transition-colors hover:bg-red-700"
                      >
                        Sí, eliminar
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirming(null)}
                        className="h-8 rounded-lg px-3 text-xs font-medium text-foreground/70 ring-1 ring-black/10 transition-colors hover:bg-black/[0.04]"
                      >
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <div className="flex shrink-0 items-center gap-1">
                      <IconButton
                        label="Subir"
                        disabled={index === 0}
                        onClick={() => move(index, -1)}
                        path="M12 19V5M6 11l6-6 6 6"
                      />
                      <IconButton
                        label="Bajar"
                        disabled={index === items.length - 1}
                        onClick={() => move(index, 1)}
                        path="M12 5v14M6 13l6 6 6-6"
                      />
                      <IconButton
                        label="Eliminar"
                        disabled={!canRemove}
                        onClick={() => setConfirming(item.id)}
                        path="M5 7h14M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3"
                        danger
                      />
                    </div>
                  )}
                </div>

                {isOpen ? (
                  <div className="space-y-5 border-t border-black/5 px-3 py-4 sm:px-4 sm:py-5">
                    {renderItem(item, (patch) => update(item.id, patch))}
                  </div>
                ) : null}
              </li>
            );
          })}
        </ol>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={add}
          disabled={!canAdd}
          className="h-9 rounded-lg px-3.5 text-sm font-medium text-earth ring-1 ring-accent/60 transition-colors hover:bg-accent-soft/40 disabled:cursor-not-allowed disabled:opacity-50"
        >
          + Agregar {noun.toLowerCase()}
        </button>
        {max !== undefined || min > 0 ? (
          <span className="text-xs text-foreground/45">
            {min > 0 && max !== undefined
              ? `Entre ${min} y ${max}.`
              : max !== undefined
                ? `Máximo ${max}.`
                : `Mínimo ${min}.`}
          </span>
        ) : null}
      </div>
    </div>
  );
}

function IconButton({
  label,
  path,
  onClick,
  disabled,
  danger,
}: {
  label: string;
  path: string;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${
        danger ? "text-red-700 hover:bg-red-50" : "text-foreground/60 hover:bg-black/[0.05]"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
        aria-hidden
      >
        <path d={path} />
      </svg>
    </button>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`ml-auto h-4 w-4 shrink-0 text-foreground/40 transition-transform ${open ? "rotate-180" : ""}`}
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
