"use client";

import { collection, doc, getDocs, updateDoc, writeBatch } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { publish } from "@/components/admin/cms/publish";
import { db } from "@/lib/firebase";
import { getAvailability } from "@/lib/projects";
import { PROJECTS_PATH } from "@/lib/projects/constants";
import type { Project } from "@/lib/projects/types";
import { validateProject } from "@/lib/projects/validate";
import StatusBadge from "./StatusBadge";

type Notice = { text: string; tone: string; errors?: string[]; slug?: string };

const SAVING: Notice = { text: "Guardando…", tone: "text-foreground/60" };
const SAVED: Notice = { text: "Guardado. Ya se ve en la web.", tone: "text-emerald-700" };
const FAILED: Notice = { text: "No se pudo guardar. Inténtalo de nuevo.", tone: "text-red-700" };

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [notice, setNotice] = useState<Notice | null>(null);
  const busy = notice === SAVING;

  useEffect(() => {
    let active = true;
    getDocs(collection(db, PROJECTS_PATH))
      .then((snapshot) => {
        if (!active) return;
        const list = snapshot.docs.map((item) => item.data() as Project);
        setProjects(list.sort((a, b) => a.order - b.order));
      })
      .catch(() => active && setLoadError(true));
    return () => {
      active = false;
    };
  }, []);

  async function move(index: number, delta: number) {
    if (!projects || busy) return;
    const previous = projects;
    const next = [...projects];
    const [item] = next.splice(index, 1);
    next.splice(index + delta, 0, item);
    const reordered = next.map((project, order) => ({ ...project, order }));

    setProjects(reordered);
    setNotice(SAVING);
    try {
      const batch = writeBatch(db);
      reordered.forEach((project) =>
        batch.update(doc(db, PROJECTS_PATH, project.slug), { order: project.order }),
      );
      await batch.commit();
      await publish();
      setNotice(SAVED);
    } catch {
      setProjects(previous);
      setNotice(FAILED);
    }
  }

  async function togglePublished(project: Project) {
    if (!projects || busy) return;
    const published = !project.published;

    if (published) {
      const problems = validateProject({ ...project, published: true });
      if (problems.length) {
        setNotice({
          text: `${project.name} todavía no se puede publicar. Completa lo siguiente en su editor:`,
          tone: "text-red-700",
          errors: problems,
          slug: project.slug,
        });
        return;
      }
    }

    const previous = projects;
    setProjects(projects.map((item) => (item.slug === project.slug ? { ...item, published } : item)));
    setNotice(SAVING);
    try {
      await updateDoc(doc(db, PROJECTS_PATH, project.slug), { published });
      await publish();
      setNotice(
        published
          ? { text: `${project.name} ya se ve en la web.`, tone: "text-emerald-700" }
          : { text: `${project.name} quedó oculto en la web.`, tone: "text-emerald-700" },
      );
    } catch {
      setProjects(previous);
      setNotice(FAILED);
    }
  }

  return (
    <>
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-serif text-3xl font-semibold sm:text-4xl">Proyectos en venta</h1>
          <p className="mt-1.5 text-sm text-foreground/60">
            Los proyectos publicados aparecen en este orden en el home, el formulario y el footer.
          </p>
        </div>
        <Link
          href="/admin/proyectos/nuevo"
          className="flex h-10 shrink-0 items-center justify-center rounded-lg bg-accent px-5 text-sm font-semibold text-ink transition-colors hover:bg-accent-hover"
        >
          + Nuevo proyecto
        </Link>
      </header>

      <div className="mt-8">
        {loadError ? (
          <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">
            No se pudieron cargar los proyectos. Recarga la página e inténtalo de nuevo.
          </p>
        ) : projects === null ? (
          <div className="space-y-3" role="status" aria-label="Cargando proyectos">
            {Array.from({ length: 2 }, (_, i) => (
              <div key={i} className="h-28 animate-pulse rounded-2xl bg-black/[0.05]" />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-black/15 bg-white px-6 py-12 text-center text-sm text-foreground/55">
            Todavía no hay proyectos. Crea el primero.
          </p>
        ) : (
          <>
            <ol className="space-y-3">
              {projects.map((project, index) => {
                const { available, total } = getAvailability(project);
                return (
                  <li
                    key={project.slug}
                    className="flex flex-col gap-3 rounded-2xl bg-white p-3 ring-1 ring-black/5 sm:flex-row sm:items-center sm:gap-4 sm:p-4"
                  >
                    <Link
                      href={`/admin/proyectos/${project.slug}`}
                      className="group flex min-w-0 flex-1 items-center gap-4"
                    >
                      <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-lg bg-neutral-100 ring-1 ring-black/5">
                        {project.hero.image.url ? (
                          <Image
                            src={project.hero.image.url}
                            alt=""
                            fill
                            sizes="96px"
                            className="object-cover"
                          />
                        ) : null}
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="truncate font-medium group-hover:underline">
                            {project.name || project.slug}
                          </p>
                          <StatusBadge published={project.published} />
                        </div>
                        <p className="mt-0.5 truncate text-sm text-foreground/55">
                          {project.place || "Sin ubicación"}
                        </p>
                        <p className="mt-1 text-xs text-foreground/45 tabular-nums">
                          {total === 0
                            ? "Sin espacios cargados"
                            : `${available} de ${total} espacios disponibles`}
                        </p>
                      </div>
                    </Link>
                    <div className="flex shrink-0 items-center gap-1">
                      <button
                        type="button"
                        onClick={() => togglePublished(project)}
                        disabled={busy}
                        className="mr-2 h-9 rounded-lg px-3.5 text-sm font-medium ring-1 ring-black/10 transition-colors hover:bg-black/[0.04] disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {project.published ? "Ocultar" : "Publicar"}
                      </button>
                      <OrderButton
                        label={`Subir ${project.name}`}
                        disabled={index === 0 || busy}
                        onClick={() => move(index, -1)}
                        path="M12 19V5M6 11l6-6 6 6"
                      />
                      <OrderButton
                        label={`Bajar ${project.name}`}
                        disabled={index === projects.length - 1 || busy}
                        onClick={() => move(index, 1)}
                        path="M12 5v14M6 13l6 6 6-6"
                      />
                    </div>
                  </li>
                );
              })}
            </ol>
            {notice ? (
              <div className={`mt-4 text-sm ${notice.tone}`} aria-live="polite">
                <p>{notice.text}</p>
                {notice.errors ? (
                  <>
                    <ul className="mt-2 list-disc space-y-1 pl-5">
                      {notice.errors.slice(0, 6).map((error) => (
                        <li key={error}>{error}</li>
                      ))}
                    </ul>
                    {notice.errors.length > 6 ? (
                      <p className="mt-1">y {notice.errors.length - 6} más.</p>
                    ) : null}
                    <Link
                      href={`/admin/proyectos/${notice.slug}`}
                      className="mt-2 inline-block font-medium underline"
                    >
                      Abrir el editor
                    </Link>
                  </>
                ) : null}
              </div>
            ) : null}
          </>
        )}
      </div>
    </>
  );
}

function OrderButton({
  label,
  path,
  onClick,
  disabled,
}: {
  label: string;
  path: string;
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground/60 transition-colors hover:bg-black/[0.05] disabled:cursor-not-allowed disabled:opacity-30"
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
