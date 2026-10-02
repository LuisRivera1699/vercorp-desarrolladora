"use client";

export const inputClass =
  "h-12 w-full rounded-md border border-neutral-300 bg-white px-4 text-sm text-foreground placeholder:text-neutral-400 outline-none transition-colors focus:border-accent sm:h-[3.25rem]";

export type FormStatus = "idle" | "sending" | "sent";

export function SubmitButton({
  status,
  label = "Enviar",
  className = "",
}: {
  status: FormStatus;
  label?: string;
  className?: string;
}) {
  const sending = status === "sending";

  return (
    <button
      type="submit"
      disabled={sending}
      className={`inline-flex h-12 items-center justify-center gap-2.5 rounded-md bg-accent px-8 text-[11px] font-semibold tracking-[0.22em] text-white uppercase transition-colors duration-300 hover:bg-accent-hover disabled:cursor-wait disabled:opacity-80 sm:h-[3.25rem] ${className}`}
    >
      {sending ? (
        <>
          <span
            className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white"
            aria-hidden
          />
          Enviando
        </>
      ) : (
        label
      )}
    </button>
  );
}

export function TermsCheckbox({
  checked,
  onChange,
  showError,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  showError: boolean;
}) {
  return (
    <div className="mt-6 text-center sm:mt-7">
      <label className="inline-flex cursor-pointer items-start justify-center gap-2.5 sm:items-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className={`mt-0.5 h-4 w-4 shrink-0 appearance-none rounded-full border bg-white checked:border-accent checked:bg-accent sm:mt-0 ${
            showError && !checked ? "border-red-400" : "border-neutral-300"
          }`}
        />
        <span className="text-[12px] leading-relaxed text-neutral-500 sm:text-[13px]">
          Acepto los{" "}
          <a
            href="#"
            className="font-medium text-foreground underline-offset-2 hover:underline"
          >
            términos y condiciones
          </a>{" "}
          para el tratamiento de datos personales.
        </span>
      </label>
      {showError && !checked ? (
        <p className="mt-2 text-[12px] text-red-500" role="alert">
          Necesitamos tu aceptación para poder contactarte.
        </p>
      ) : null}
    </div>
  );
}

export function SuccessMessage({
  title,
  message,
  onReset,
}: {
  title: string;
  message: string;
  onReset: () => void;
}) {
  return (
    <div
      className="animate-hero-in mx-auto mt-10 flex max-w-md flex-col items-center text-center sm:mt-12"
      role="status"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-accent">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M5 12.5l4.5 4.5L19 7.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h3 className="mt-5 font-serif text-2xl font-semibold tracking-wide text-foreground uppercase">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-neutral-500">{message}</p>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 text-[11px] font-semibold tracking-[0.22em] text-accent uppercase transition-colors hover:text-accent-hover"
      >
        Enviar otra consulta
      </button>
    </div>
  );
}
