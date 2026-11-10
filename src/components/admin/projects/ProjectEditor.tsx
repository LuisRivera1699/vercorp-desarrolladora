"use client";

import { deleteDoc, doc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import AdminCard from "@/components/admin/AdminCard";
import { INPUT_CLASS } from "@/components/admin/cms/fields";
import { collectImagePaths, deleteImages, listProjectImages, projectFolder } from "@/components/admin/cms/images";
import { publish } from "@/components/admin/cms/publish";
import SaveBar from "@/components/admin/cms/SaveBar";
import { useDocEditor } from "@/components/admin/cms/useDocEditor";
import { db } from "@/lib/firebase";
import { PROJECTS_PATH } from "@/lib/projects/constants";
import type { Project } from "@/lib/projects/types";
import { validateProject } from "@/lib/projects/validate";
import ProjectForm, { PROJECT_SECTIONS } from "./ProjectForm";
import StatusBadge from "./StatusBadge";

export default function ProjectEditor({ slug }: { slug: string }) {
  const { value, update, save, discard, saved, status, errors, dirty } = useDocEditor<Project>(
    PROJECTS_PATH,
    slug,
    { validate: validateProject, folder: projectFolder(slug) },
  );
  const errorsRef = useRef<HTMLDivElement>(null);
  const savedPublished = Boolean(saved?.published);

  useEffect(() => {
    if (errors.length) errorsRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [errors]);

  async function remove() {
    const paths = collectImagePaths(saved);
    try {
      (await listProjectImages(slug)).forEach((path) => paths.add(path));
    } catch {
      // Si no se puede listar la carpeta, se borran al menos las del documento.
    }
    await deleteDoc(doc(db, PROJECTS_PATH, slug));
    discard();
    await deleteImages(paths);
    await publish().catch(() => undefined);
  }

  return (
    <>
      <header>
        <Link
          href="/admin/proyectos"
          onClick={(event) => {
            if (dirty && !window.confirm("Tienes cambios sin guardar. ¿Salir de todos modos?")) {
              event.preventDefault();
            }
          }}
          className="text-sm text-foreground/55 transition-colors hover:text-foreground"
        >
          &larr; Proyectos
        </Link>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <h1 className="font-serif text-3xl font-semibold sm:text-4xl">{value?.name || slug}</h1>
          {value ? <StatusBadge published={savedPublished} /> : null}
        </div>
        <p className="mt-1.5 text-sm text-foreground/60">
          Las secciones siguen el orden de la página del proyecto.
        </p>
      </header>

      <div className="mt-6">
        {status === "not-found" ? (
          <p role="alert" className="rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-900">
            Este proyecto no existe o fue eliminado.{" "}
            <Link href="/admin/proyectos" className="font-medium underline">
              Volver a la lista
            </Link>
          </p>
        ) : status === "load-error" ? (
          <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">
            No se pudo cargar el proyecto. Recarga la página e inténtalo de nuevo.
          </p>
        ) : value === null ? (
          <div className="space-y-4" role="status" aria-label="Cargando proyecto">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="h-48 animate-pulse rounded-2xl bg-black/[0.05]" />
            ))}
          </div>
        ) : (
          <>
            <nav
              aria-label="Secciones del proyecto"
              className="sticky top-16 z-10 -mx-5 mb-6 overflow-x-auto border-b border-black/5 bg-neutral-50/95 px-5 py-2.5 backdrop-blur sm:-mx-8 sm:px-8 lg:top-0"
            >
              <ul className="flex gap-1.5">
                {PROJECT_SECTIONS.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="flex h-8 items-center rounded-full px-3 text-xs font-medium whitespace-nowrap text-foreground/65 ring-1 ring-black/10 transition-colors hover:bg-accent-soft/50 hover:text-foreground"
                    >
                      {section.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white px-5 py-4 ring-1 ring-black/5 sm:px-6">
              <div>
                <p className="text-sm font-semibold">Publicado en la web</p>
                <p className="mt-0.5 text-sm text-foreground/55">
                  Para publicarlo, todas las secciones visibles deben estar completas.
                </p>
              </div>
              <label className="flex cursor-pointer items-center gap-2.5 text-sm font-medium">
                <input
                  type="checkbox"
                  checked={value.published}
                  onChange={(e) => update({ ...value, published: e.target.checked })}
                  className="h-4 w-4 rounded accent-accent"
                />
                {value.published ? "Publicado" : "Oculto"}
              </label>
            </div>

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

            <ProjectForm value={value} onChange={update} />
            <div className="mt-6">
              <DeleteProject name={value.name || slug} onDelete={remove} />
            </div>
            <SaveBar
              status={status}
              dirty={dirty}
              onSave={save}
              href={savedPublished ? `/${slug}` : null}
              hidden={!savedPublished}
            />
          </>
        )}
      </div>
    </>
  );
}

function DeleteProject({ name, onDelete }: { name: string; onDelete: () => Promise<void> }) {
  const router = useRouter();
  const inputId = useId();
  const [confirmation, setConfirmation] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onClick() {
    setBusy(true);
    setError(null);
    try {
      await onDelete();
      router.replace("/admin/proyectos");
    } catch {
      setError("No se pudo eliminar. Revisa tu conexión e inténtalo de nuevo.");
      setBusy(false);
    }
  }

  return (
    <AdminCard
      title="Zona de peligro"
      description="Eliminar el proyecto borra su página, sus textos y todas sus imágenes. No se puede deshacer."
    >
      <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium">
        Escribe <span className="font-semibold">{name}</span> para confirmar
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id={inputId}
          value={confirmation}
          autoComplete="off"
          onChange={(e) => setConfirmation(e.target.value)}
          className={`${INPUT_CLASS} h-10 sm:max-w-sm`}
        />
        <button
          type="button"
          onClick={onClick}
          disabled={confirmation.trim() !== name.trim() || busy}
          className="h-10 shrink-0 rounded-lg bg-red-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {busy ? "Eliminando…" : "Eliminar proyecto"}
        </button>
      </div>
      {error ? (
        <p role="alert" className="mt-2 text-xs text-red-700">
          {error}
        </p>
      ) : null}
    </AdminCard>
  );
}
