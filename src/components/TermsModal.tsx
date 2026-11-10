"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import {
  fetchTerms,
  formatTermsDate,
  paragraphs,
  prefetchTerms,
  type Terms,
} from "@/lib/terms";

type OpenOptions = { onAccept?: () => void; preview?: Terms };

type State =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; terms: Terms | null; preview: boolean };

const TermsContext = createContext<((options?: OpenOptions) => void) | null>(null);

export function useTerms() {
  const open = useContext(TermsContext);
  if (!open) throw new Error("useTerms must be used inside <TermsProvider>");
  return open;
}

export function TermsProvider({ children }: { children: React.ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [state, setState] = useState<State>({ status: "loading" });
  const [onAccept, setOnAccept] = useState<(() => void) | undefined>(undefined);

  const liveTerms = useRef<Terms | null | undefined>(undefined);

  const load = useCallback(() => {
    setState({ status: "loading" });
    fetchTerms().then(
      (terms) => {
        liveTerms.current = terms;
        setState({ status: "ready", terms, preview: false });
      },
      () => setState({ status: "error" }),
    );
  }, []);

  const open = useCallback(
    (options: OpenOptions = {}) => {
      setOnAccept(() => options.onAccept);
      if (options.preview) {
        setState({ status: "ready", terms: options.preview, preview: true });
      } else if (liveTerms.current !== undefined) {
        setState({ status: "ready", terms: liveTerms.current, preview: false });
      } else {
        load();
      }
      const dialog = dialogRef.current;
      if (dialog && !dialog.open) {
        dialog.showModal();
        document.documentElement.style.overflow = "hidden";
      }
    },
    [load],
  );

  const close = useCallback(() => dialogRef.current?.close(), []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => {
      document.documentElement.style.overflow = "";
    };
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);

  const terms = state.status === "ready" ? state.terms : null;
  const updated = terms ? formatTermsDate(terms.updatedAt) : null;

  return (
    <TermsContext.Provider value={open}>
      {children}
      <dialog
        ref={dialogRef}
        aria-labelledby="terms-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape") close();
        }}
        className="m-auto max-h-[min(46rem,calc(100dvh-2rem))] w-[min(44rem,calc(100%-2rem))] flex-col overflow-hidden rounded-2xl bg-white p-0 text-foreground shadow-2xl backdrop:bg-black/55 backdrop:backdrop-blur-[2px] open:flex"
      >
        <header className="flex shrink-0 items-start justify-between gap-4 border-b border-black/10 px-6 py-5 sm:px-8">
          <div>
            <h2 id="terms-title" className="font-serif text-2xl leading-tight font-semibold sm:text-3xl">
              {terms?.title || "Términos y condiciones"}
            </h2>
            {updated ? (
              <p className="mt-1 text-xs text-foreground/50">Última actualización: {updated}</p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Cerrar"
            className="-mt-1 -mr-2 flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-foreground/60 transition-colors hover:bg-black/5 hover:text-foreground"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" className="h-5 w-5" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6 text-sm leading-relaxed text-foreground/75 sm:px-8">
          {state.status === "loading" ? (
            <div className="space-y-3" role="status" aria-label="Cargando términos">
              {[92, 100, 76, 0, 40, 100, 88, 64].map((width, i) =>
                width ? (
                  <div key={i} className="h-3.5 animate-pulse rounded bg-black/[0.07]" style={{ width: `${width}%` }} />
                ) : (
                  <div key={i} className="h-3" />
                ),
              )}
            </div>
          ) : state.status === "error" ? (
            <div role="alert" className="py-6 text-center">
              <p className="font-medium text-foreground">No pudimos cargar los términos.</p>
              <p className="mt-1 text-foreground/60">Revisa tu conexión e inténtalo de nuevo.</p>
              <button
                type="button"
                onClick={load}
                className="mt-4 cursor-pointer rounded-md px-5 py-2 text-sm font-medium ring-1 ring-black/15 transition-colors hover:bg-black/5"
              >
                Reintentar
              </button>
            </div>
          ) : !terms ? (
            <p className="py-6 text-center text-foreground/60">
              Los términos y condiciones estarán disponibles pronto.
            </p>
          ) : (
            <div className="space-y-6">
              {paragraphs(terms.intro).map((text, i) => (
                <p key={i}>{text}</p>
              ))}
              {terms.sections.map((section) => (
                <section key={section.id}>
                  <h3 className="font-semibold text-foreground">{section.title}</h3>
                  <div className="mt-2 space-y-2">
                    {paragraphs(section.text).map((text, i) => (
                      <p key={i}>{text}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>

        <footer className="flex shrink-0 justify-end border-t border-black/10 px-6 py-4 sm:px-8">
          <button
            type="button"
            onClick={() => {
              onAccept?.();
              close();
            }}
            className="h-11 cursor-pointer rounded-md bg-accent px-8 text-[11px] font-semibold tracking-[0.22em] text-white uppercase transition-colors duration-300 hover:bg-accent-hover"
          >
            {onAccept ? "Acepto" : "Cerrar"}
          </button>
        </footer>
      </dialog>
    </TermsContext.Provider>
  );
}

export function TermsLink({
  children = "términos y condiciones",
  className,
  onAccept,
}: {
  children?: React.ReactNode;
  className?: string;
  onAccept?: () => void;
}) {
  const open = useTerms();
  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        open({ onAccept });
      }}
      onPointerEnter={prefetchTerms}
      onFocus={prefetchTerms}
      className={`cursor-pointer ${className ?? ""}`}
    >
      {children}
    </button>
  );
}
