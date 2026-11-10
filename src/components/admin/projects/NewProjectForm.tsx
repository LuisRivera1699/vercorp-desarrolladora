"use client";

import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AdminCard from "@/components/admin/AdminCard";
import { FieldGroup, SelectField, TextField } from "@/components/admin/cms/fields";
import { db } from "@/lib/firebase";
import { PROJECTS_PATH, SLUG_MAX, slugify, STATUS_OPTIONS } from "@/lib/projects/constants";
import { newProject } from "@/lib/projects/defaults";
import type { EditableStatus, Project } from "@/lib/projects/types";
import { LIMITS, validateSlug } from "@/lib/projects/validate";
import { SITE } from "@/lib/site";

export default function NewProjectForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [tagline, setTagline] = useState("");
  const [status, setStatus] = useState<EditableStatus>("preventa");
  const [slug, setSlug] = useState("");
  const [slugEdited, setSlugEdited] = useState(false);
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const domain = SITE.url.replace(/^https?:\/\//, "");

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (busy) return;

    const problems: string[] = [];
    if (!name.trim()) problems.push("Nombre: es obligatorio.");
    const slugError = validateSlug(slug);
    if (slugError) problems.push(slugError);
    setErrors(problems);
    if (problems.length) return;

    setBusy(true);
    try {
      if ((await getDoc(doc(db, PROJECTS_PATH, slug))).exists()) {
        setErrors(["Ya existe un proyecto con esa dirección. Elige otra."]);
        setBusy(false);
        return;
      }
      const others = (await getDocs(collection(db, PROJECTS_PATH))).docs.map(
        (item) => item.data() as Project,
      );
      const order = others.reduce((max, item) => Math.max(max, item.order + 1), 0);
      await setDoc(
        doc(db, PROJECTS_PATH, slug),
        newProject({ slug, name: name.trim(), place: place.trim(), tagline: tagline.trim(), status }, order),
      );
      router.replace(`/admin/proyectos/${slug}`);
    } catch {
      setErrors(["No se pudo crear el proyecto. Revisa tu conexión e inténtalo de nuevo."]);
      setBusy(false);
    }
  }

  return (
    <>
      <header>
        <Link href="/admin/proyectos" className="text-sm text-foreground/55 transition-colors hover:text-foreground">
          &larr; Proyectos
        </Link>
        <h1 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">Nuevo proyecto</h1>
        <p className="mt-1.5 text-sm text-foreground/60">
          Se crea oculto, con los textos base de Vercorp. Completa su branding, fotos y espacios, y
          publícalo cuando esté listo.
        </p>
      </header>

      <form onSubmit={onSubmit} className="mt-8 space-y-6" noValidate>
        {errors.length ? (
          <div role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">
            <ul className="list-disc space-y-1 pl-5">
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <AdminCard title="Datos básicos" description="Lo demás se completa en el editor del proyecto.">
          <FieldGroup>
            <TextField
              label="Nombre"
              value={name}
              max={LIMITS.label}
              placeholder="Killa"
              onChange={(value) => {
                setName(value);
                if (!slugEdited) setSlug(slugify(value));
              }}
            />
            <TextField
              label="Ubicación"
              value={place}
              max={LIMITS.short}
              placeholder="Huaypo, Cuzco"
              onChange={setPlace}
            />
            <TextField
              label="Frase"
              value={tagline}
              max={LIMITS.short}
              placeholder="Condominio en el Valle Sagrado"
              onChange={setTagline}
            />
            <SelectField label="Estado" value={status} options={STATUS_OPTIONS} onChange={setStatus} />
            <TextField
              label="Dirección de la página"
              value={slug}
              max={SLUG_MAX}
              placeholder="killa"
              hint={`Quedará en ${domain}/${slug || "tu-proyecto"}. Solo minúsculas, números y guiones. No se puede cambiar después.`}
              onChange={(value) => {
                setSlugEdited(true);
                setSlug(value.toLowerCase());
              }}
            />
          </FieldGroup>
        </AdminCard>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={busy}
            className="h-10 rounded-lg bg-accent px-5 text-sm font-semibold text-ink transition-colors hover:bg-accent-hover disabled:cursor-wait disabled:opacity-60"
          >
            {busy ? "Creando…" : "Crear proyecto"}
          </button>
        </div>
      </form>
    </>
  );
}
