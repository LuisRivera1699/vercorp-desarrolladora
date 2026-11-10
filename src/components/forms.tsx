"use client";

import { TermsLink } from "@/components/TermsModal";
import { useSiteSettings } from "@/components/SiteSettings";
import { whatsappLink } from "@/lib/home/contact";

export const inputClass =
  "h-12 w-full rounded-md border border-neutral-300 bg-white px-4 text-sm text-foreground placeholder:text-neutral-400 outline-none transition-colors focus:border-accent sm:h-[3.25rem]";

export type FormStatus = "idle" | "sending" | "sent" | "error";

export const FIELD_LIMITS = { name: 120, phone: 30, email: 200, message: 1000 } as const;

export function Honeypot() {
  return (
    <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden>
      <label htmlFor="lead-website">Sitio web</label>
      <input id="lead-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

export function isBot(data: FormData) {
  return String(data.get("website") ?? "") !== "";
}

export function FormError({ whatsappMessage }: { whatsappMessage: string }) {
  const { phone } = useSiteSettings();
  return (
    <p role="alert" className="mt-5 text-center text-[13px] leading-relaxed text-red-600">
      No pudimos enviar tu consulta. Inténtalo de nuevo o{" "}
      <a
        href={whatsappLink(phone, whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-foreground underline underline-offset-2 hover:text-accent"
      >
        escríbenos por WhatsApp
      </a>
      .
    </p>
  );
}

type ButtonVariant = "default" | "pill";

const buttonBase =
  "inline-flex h-12 items-center justify-center gap-2.5 bg-accent px-8 text-[var(--btn-fg,#fff)] transition-colors duration-300 hover:bg-accent-hover hover:text-[var(--btn-hover-fg,#fff)] sm:h-[3.25rem]";

function buttonShape(variant: ButtonVariant) {
  return variant === "pill"
    ? "rounded-full text-sm font-medium"
    : "rounded-md text-[11px] font-semibold tracking-[0.22em] uppercase";
}

export function SubmitButton({
  status,
  label = "Enviar",
  variant = "default",
  className = "",
}: {
  status: FormStatus;
  label?: string;
  variant?: ButtonVariant;
  className?: string;
}) {
  const sending = status === "sending";

  return (
    <button
      type="submit"
      disabled={sending}
      className={`${buttonBase} disabled:cursor-wait disabled:opacity-80 ${buttonShape(variant)} ${className}`}
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
          <TermsLink
            onAccept={() => onChange(true)}
            className="font-medium text-foreground underline-offset-2 hover:underline"
          >
            términos y condiciones
          </TermsLink>{" "}
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
  bookingText = "Agenda una llamada con uno de nuestros asesores en el horario que mejor te acomode.",
  variant = "default",
}: {
  title: string;
  message: string;
  onReset: () => void;
  bookingText?: string;
  variant?: ButtonVariant;
}) {
  const { bookingUrl } = useSiteSettings();
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

      <div className="mt-8 w-full border-t border-neutral-200 pt-7">
        <p className="text-[11px] font-medium tracking-[0.32em] text-neutral-400 uppercase">
          ¿Prefieres no esperar?
        </p>
        <p className="mt-3 text-sm leading-relaxed text-neutral-500">{bookingText}</p>
        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${buttonBase} mt-5 ${buttonShape(variant)}`}
        >
          Agendar llamada
          <ExternalArrow />
          <span className="sr-only">(se abre en una pestaña nueva)</span>
        </a>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="mt-7 text-[11px] font-semibold tracking-[0.22em] text-accent uppercase transition-colors hover:text-accent-hover"
      >
        Enviar otra consulta
      </button>
    </div>
  );
}

function ExternalArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 17L17 7M9 7h8v8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
