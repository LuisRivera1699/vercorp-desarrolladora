"use client";

import { useId } from "react";

export const INPUT_CLASS =
  "block w-full rounded-lg border border-black/10 bg-white px-3.5 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/25";

export function Field({
  label,
  hint,
  htmlFor,
  counter,
  children,
}: {
  label: string;
  hint?: string;
  htmlFor?: string;
  counter?: { length: number; max: number };
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <label htmlFor={htmlFor} className="text-sm font-medium">
          {label}
        </label>
        {counter ? (
          <span
            className={`text-xs tabular-nums ${
              counter.length > counter.max ? "text-red-700" : "text-foreground/40"
            }`}
          >
            {counter.length}/{counter.max}
          </span>
        ) : null}
      </div>
      {children}
      {hint ? <p className="mt-1.5 text-xs text-foreground/50">{hint}</p> : null}
    </div>
  );
}

export function TextField({
  label,
  value,
  onChange,
  max,
  hint,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  max: number;
  hint?: string;
  placeholder?: string;
  type?: "text" | "email" | "tel" | "url";
}) {
  const id = useId();
  return (
    <Field label={label} hint={hint} htmlFor={id} counter={{ length: value.length, max }}>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`${INPUT_CLASS} h-10`}
      />
    </Field>
  );
}

export function TextArea({
  label,
  value,
  onChange,
  max,
  hint,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  max: number;
  hint?: string;
  rows?: number;
}) {
  const id = useId();
  return (
    <Field label={label} hint={hint} htmlFor={id} counter={{ length: value.length, max }}>
      <textarea
        id={id}
        value={value}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        className={`${INPUT_CLASS} resize-y py-2.5 leading-relaxed`}
      />
    </Field>
  );
}

export function NumberField({
  label,
  value,
  onChange,
  hint,
  decimals = false,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  hint?: string;
  decimals?: boolean;
}) {
  const id = useId();
  return (
    <Field label={label} hint={hint} htmlFor={id}>
      <input
        id={id}
        type="number"
        min={0}
        step={decimals ? "any" : 1}
        inputMode={decimals ? "decimal" : "numeric"}
        value={Number.isFinite(value) ? value : ""}
        onChange={(e) => onChange(e.target.value === "" ? Number.NaN : Number(e.target.value))}
        className={`${INPUT_CLASS} h-10`}
      />
    </Field>
  );
}

export function SelectField<T extends string>({
  label,
  value,
  options,
  onChange,
  hint,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
  hint?: string;
}) {
  const id = useId();
  return (
    <Field label={label} hint={hint} htmlFor={id}>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className={`${INPUT_CLASS} h-10`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Field>
  );
}

export function CheckboxField({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm font-medium">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded accent-accent"
      />
      {label}
    </label>
  );
}

export function FieldGroup({ children }: { children: React.ReactNode }) {
  return <div className="space-y-5">{children}</div>;
}
