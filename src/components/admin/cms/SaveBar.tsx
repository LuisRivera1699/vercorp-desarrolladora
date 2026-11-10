"use client";

import type { SaveStatus } from "./useDocEditor";

const MESSAGES: Partial<Record<SaveStatus, { text: string; tone: string }>> = {
  saving: { text: "Guardando…", tone: "text-foreground/60" },
  saved: { text: "Publicado. Ya se ve en la web.", tone: "text-emerald-700" },
  "not-published": {
    text: "Guardado, pero la web no se actualizó. Vuelve a guardar en un momento.",
    tone: "text-amber-700",
  },
  error: { text: "Revisa los errores antes de guardar.", tone: "text-red-700" },
};

export default function SaveBar({
  status,
  dirty,
  onSave,
  href,
  hidden = false,
}: {
  status: SaveStatus;
  dirty: boolean;
  onSave: () => void;
  /** Página pública; `null` si todavía no se puede ver. */
  href: string | null;
  /** El proyecto está oculto: guardar no lo muestra en la web. */
  hidden?: boolean;
}) {
  const message =
    dirty && status !== "saving" && status !== "error"
      ? { text: "Tienes cambios sin guardar.", tone: "text-foreground/70" }
      : status === "saved" && hidden
        ? { text: "Guardado. El proyecto sigue oculto en la web.", tone: "text-emerald-700" }
        : MESSAGES[status];

  return (
    <div className="sticky bottom-0 z-10 -mx-5 mt-8 border-t border-black/5 bg-neutral-50/95 px-5 py-3 backdrop-blur sm:-mx-8 sm:px-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className={`text-sm ${message?.tone ?? "text-foreground/50"}`} aria-live="polite">
          {message?.text ?? "Sin cambios."}
        </p>
        <div className="flex items-center gap-2">
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 items-center rounded-lg px-4 text-sm font-medium ring-1 ring-black/10 transition-colors hover:bg-black/[0.04]"
            >
              Ver en la web
            </a>
          ) : null}
          <button
            type="button"
            onClick={onSave}
            disabled={(!dirty && status !== "not-published") || status === "saving"}
            className="h-10 rounded-lg bg-accent px-5 text-sm font-semibold text-ink transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === "saving" ? "Guardando…" : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
}
