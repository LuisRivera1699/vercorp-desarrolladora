"use client";

import { useEffect, useRef } from "react";
import AdminCard from "@/components/admin/AdminCard";
import { FieldGroup, TextArea, TextField } from "@/components/admin/cms/fields";
import SaveBar from "@/components/admin/cms/SaveBar";
import { useDocEditor } from "@/components/admin/cms/useDocEditor";
import { BACKING_DOC, SHARED_PATH } from "@/lib/projects/constants";
import { DEFAULT_BACKING } from "@/lib/projects/defaults";
import type { Backing } from "@/lib/projects/types";
import { LIMITS, MAX, validateBacking } from "@/lib/projects/validate";
import { StepList } from "./lists";

export default function BackingEditor() {
  const { value, update, save, status, errors, dirty } = useDocEditor<Backing>(SHARED_PATH, BACKING_DOC, {
    validate: validateBacking,
    fallback: DEFAULT_BACKING,
  });
  const errorsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (errors.length) errorsRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [errors]);

  const set = (patch: Partial<Backing>) => value && update({ ...value, ...patch });

  return (
    <>
      <header>
        <h1 className="font-serif text-3xl font-semibold sm:text-4xl">Respaldo del holding</h1>
        <p className="mt-1.5 text-sm text-foreground/60">
          La sección sobre Vercorp que aparece en todos los proyectos. Si se muestra, su icono y sus
          colores se eligen en el editor de cada proyecto.
        </p>
      </header>

      <div className="mt-8">
        {status === "load-error" ? (
          <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">
            No se pudo cargar el contenido. Recarga la página e inténtalo de nuevo.
          </p>
        ) : value === null ? (
          <div className="h-96 animate-pulse rounded-2xl bg-black/[0.05]" role="status" aria-label="Cargando" />
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

            <div className="space-y-6">
              <AdminCard title="Textos" description="El botón lleva al home de Vercorp Desarrolladora.">
                <FieldGroup>
                  <TextField label="Antetítulo" value={value.eyebrow} max={LIMITS.label} onChange={(eyebrow) => set({ eyebrow })} />
                  <TextField label="Título" value={value.title} max={LIMITS.title} onChange={(title) => set({ title })} />
                  <TextArea label="Texto" value={value.about} max={LIMITS.long} rows={5} onChange={(about) => set({ about })} />
                  <TextField
                    label="Botón"
                    value={value.buttonLabel}
                    max={LIMITS.label}
                    onChange={(buttonLabel) => set({ buttonLabel })}
                  />
                </FieldGroup>
              </AdminCard>
              <AdminCard title="Pilares" description="Puntos que respaldan al holding, con título y texto.">
                <StepList items={value.pillars} onChange={(pillars) => set({ pillars })} noun="Pilar" max={MAX.pillars} />
              </AdminCard>
            </div>

            <SaveBar status={status} dirty={dirty} onSave={save} href={null} />
          </>
        )}
      </div>
    </>
  );
}
