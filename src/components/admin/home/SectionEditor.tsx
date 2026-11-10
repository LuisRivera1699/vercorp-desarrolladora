"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";
import SaveBar from "@/components/admin/cms/SaveBar";
import { useDocEditor } from "@/components/admin/cms/useDocEditor";
import { HOME_STORAGE_ROOT, SECTIONS_PATH } from "@/lib/home/constants";
import { DEFAULT_HOME } from "@/lib/home/defaults";
import type { HomeContent, SectionId } from "@/lib/home/types";
import { validateSection } from "@/lib/home/validate";
import { EDITORS, type EditorProps } from "./editors";

export default function SectionEditor<K extends SectionId>({
  section,
}: {
  section: { id: K; label: string; description: string; anchor: string };
}) {
  const { id } = section;
  const validate = useCallback((value: HomeContent[K]) => validateSection(id, value), [id]);
  const { value, update, save, status, errors, dirty } = useDocEditor<HomeContent[K]>(SECTIONS_PATH, id, {
    validate,
    folder: HOME_STORAGE_ROOT,
    fallback: DEFAULT_HOME[id],
  });
  const Editor = EDITORS[id] as React.ComponentType<EditorProps<HomeContent[K]>>;
  const errorsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (errors.length) errorsRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [errors]);

  return (
    <>
      <header>
        <Link
          href="/admin/contenido"
          onClick={(event) => {
            if (dirty && !window.confirm("Tienes cambios sin guardar. ¿Salir de todos modos?")) {
              event.preventDefault();
            }
          }}
          className="text-sm text-foreground/55 transition-colors hover:text-foreground"
        >
          &larr; Contenido
        </Link>
        <h1 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">{section.label}</h1>
        <p className="mt-1.5 text-sm text-foreground/60">{section.description}</p>
      </header>

      <div className="mt-8">
        {status === "load-error" ? (
          <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">
            No se pudo cargar esta sección. Recarga la página e inténtalo de nuevo.
          </p>
        ) : value === null ? (
          <div className="space-y-4" role="status" aria-label="Cargando contenido">
            {Array.from({ length: 2 }, (_, i) => (
              <div key={i} className="h-48 animate-pulse rounded-2xl bg-black/[0.05]" />
            ))}
          </div>
        ) : (
          <>
            {errors.length ? (
              <div ref={errorsRef} role="alert" className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">
                <p className="font-medium">No se guardó. Corrige lo siguiente:</p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  {errors.map((error) => (
                    <li key={error}>{error}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            <Editor value={value} onChange={update} />
            <SaveBar status={status} dirty={dirty} onSave={save} href={section.anchor} />
          </>
        )}
      </div>
    </>
  );
}
