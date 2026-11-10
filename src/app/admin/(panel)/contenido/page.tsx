import type { Metadata } from "next";
import Link from "next/link";
import { SECTIONS } from "@/lib/home/constants";

export const metadata: Metadata = { title: "Contenido" };

export default function AdminContentPage() {
  return (
    <>
      <header>
        <h1 className="font-serif text-3xl font-semibold sm:text-4xl">Contenido</h1>
        <p className="mt-1.5 text-sm text-foreground/60">
          Textos e imágenes del home de Vercorp Desarrolladora, en el orden en que aparecen. Los
          cambios se publican al guardar.
        </p>
      </header>

      <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {SECTIONS.map((section, index) => (
          <li key={section.id}>
            <Link
              href={`/admin/contenido/${section.id}`}
              className="group flex h-full flex-col rounded-2xl bg-white p-5 ring-1 ring-black/5 transition hover:ring-accent/50"
            >
              <span className="text-xs font-semibold tabular-nums text-foreground/35">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="mt-2 text-base font-semibold group-hover:text-accent-hover">
                {section.label}
              </span>
              <span className="mt-1 text-sm text-foreground/55">{section.description}</span>
            </Link>
          </li>
        ))}
      </ol>
    </>
  );
}
