"use client";

import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";
import {
  inputClass,
  SubmitButton,
  SuccessMessage,
  TermsCheckbox,
  type FormStatus,
} from "@/components/forms";
import { submitLead } from "@/lib/leads";
import type { ActiveProject } from "@/lib/projects";
import { SITE } from "@/lib/site";

type ProjectIntent = "visita" | "compra";

const HASH_INTENT: Record<string, ProjectIntent> = {
  "#visita": "visita",
  "#comprar": "compra",
};

const TABS: { id: ProjectIntent; label: string }[] = [
  { id: "visita", label: "Agendar visita" },
  { id: "compra", label: "Quiero comprar" },
];

const COPY: Record<
  ProjectIntent,
  { title: string; description: string; submit: string; success: string }
> = {
  visita: {
    title: "Agenda tu cita",
    description:
      "Elige el día que prefieras y un asesor te confirmará el horario para recorrer el terreno contigo.",
    submit: "Agendar",
    success: "¡Nos vemos en el terreno!",
  },
  compra: {
    title: "Separa tu lote",
    description:
      "Cuéntanos qué lote te interesa. Te confirmamos disponibilidad, precio y los pasos para hacerlo tuyo.",
    submit: "Quiero este lote",
    success: "¡Lote en camino!",
  },
};

export default function ProjectContactForm({
  project,
}: {
  project: ActiveProject;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [intent, setIntent] = useState<ProjectIntent>("visita");
  const [accepted, setAccepted] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");

  useEffect(() => {
    const syncFromHash = () => {
      const next = HASH_INTENT[window.location.hash];
      if (!next) return;
      setIntent(next);
      sectionRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAttempted(true);
    if (!accepted || status === "sending") return;

    const data = new FormData(event.currentTarget);
    setStatus("sending");
    await submitLead({
      source: "proyecto",
      intent,
      project: project.slug,
      name: String(data.get("name") ?? ""),
      phone: String(data.get("phone") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
      ...(intent === "compra"
        ? { lot: String(data.get("lot") ?? "") }
        : { visitDate: String(data.get("visitDate") ?? "") }),
    });
    setStatus("sent");
  };

  const reset = () => {
    setStatus("idle");
    setAccepted(false);
    setAttempted(false);
  };

  const copy = COPY[intent];
  const buying = intent === "compra";

  return (
    <section
      ref={sectionRef}
      id="contacto-proyecto"
      className="relative scroll-mt-16 overflow-hidden bg-ink px-5 py-16 sm:scroll-mt-20 sm:px-8 sm:py-20 md:py-28"
      aria-labelledby="project-contact-heading"
    >
      <Image
        src={project.contact.image.src}
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-40 grayscale"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-ink/90 via-ink/70 to-ink/40" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="text-white lg:col-span-4">
          <p className="text-[11px] font-medium tracking-[0.32em] text-accent uppercase">
            {project.name}
          </p>
          <h2
            id="project-contact-heading"
            className="mt-4 font-serif text-[2.2rem] leading-[1.05] font-semibold tracking-wide uppercase sm:text-5xl"
          >
            Conversemos
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-relaxed font-light text-white/75 sm:text-[0.95rem] sm:leading-8">
            {project.contact.blurb}
          </p>
          <ul className="mt-8 space-y-3 text-sm font-light text-white/70">
            <li>
              <a
                href={SITE.parentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-accent"
              >
                {SITE.parentUrl.replace("https://", "www.")}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${SITE.email}`}
                className="transition-colors hover:text-accent"
              >
                {SITE.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${SITE.phone}`}
                className="transition-colors hover:text-accent"
              >
                {SITE.phoneLabel}
              </a>
            </li>
          </ul>
        </div>

        <div className="rounded-2xl bg-white px-6 py-10 shadow-[0_24px_60px_rgba(0,0,0,0.25)] sm:px-10 sm:py-12 lg:col-span-8 lg:rounded-3xl">
          {status === "sent" ? (
            <SuccessMessage
              title={copy.success}
              message={
                buying
                  ? `Recibimos tu solicitud de compra en ${project.name}. Un asesor te contactará para confirmar disponibilidad y separar tu lote.`
                  : `Recibimos tu solicitud de visita a ${project.name}. Un asesor te contactará para confirmar el día y la hora.`
              }
              onReset={reset}
            />
          ) : (
            <>
              <div
                className="flex max-w-sm rounded-full bg-stone p-1"
                role="tablist"
                aria-label="Tipo de solicitud"
              >
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={intent === tab.id}
                    onClick={() => setIntent(tab.id)}
                    className={`flex-1 rounded-full px-3 py-2.5 text-[10px] font-semibold tracking-[0.16em] whitespace-nowrap uppercase transition-all duration-300 sm:px-4 sm:text-[11px] sm:tracking-[0.2em] ${
                      intent === tab.id
                        ? "bg-white text-foreground shadow-[0_2px_10px_rgba(0,0,0,0.06)]"
                        : "text-neutral-500 hover:text-foreground"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <h3 className="mt-8 font-serif text-2xl font-semibold tracking-wide text-foreground uppercase sm:text-3xl">
                {copy.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed font-light text-neutral-500">
                {copy.description}
              </p>

              <form onSubmit={onSubmit} className="mt-7">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4">
                  <label className="sr-only" htmlFor="project-name">
                    Nombre y apellido
                  </label>
                  <input
                    id="project-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Nombre y apellido"
                    className={inputClass}
                  />
                  <label className="sr-only" htmlFor="project-phone">
                    Número de teléfono
                  </label>
                  <input
                    id="project-phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    placeholder="Número de teléfono"
                    className={inputClass}
                  />
                  <label className="sr-only" htmlFor="project-email">
                    Correo electrónico
                  </label>
                  <input
                    id="project-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Correo electrónico (opcional)"
                    className={inputClass}
                  />

                  {buying ? (
                    <>
                      <label className="sr-only" htmlFor="project-lot">
                        Lote de interés
                      </label>
                      <select
                        key="lot"
                        id="project-lot"
                        name="lot"
                        defaultValue=""
                        className={inputClass}
                      >
                        <option value="">Lote de interés (opcional)</option>
                        {project.lots.areas.map((area, index) => (
                          <option key={index} value={String(index + 1)}>
                            Lote {index + 1} · {area} m²
                          </option>
                        ))}
                      </select>
                    </>
                  ) : (
                    <>
                      <label className="sr-only" htmlFor="project-visit-date">
                        Fecha preferida de visita
                      </label>
                      <input
                        key="visitDate"
                        id="project-visit-date"
                        name="visitDate"
                        type="text"
                        placeholder="Fecha preferida de visita (opcional)"
                        onFocus={(event) => {
                          const input = event.currentTarget;
                          input.type = "date";
                          input.min = new Date().toISOString().slice(0, 10);
                        }}
                        onBlur={(event) => {
                          if (!event.currentTarget.value) {
                            event.currentTarget.type = "text";
                          }
                        }}
                        className={inputClass}
                      />
                    </>
                  )}
                </div>

                <div className="mt-3 flex flex-col gap-3 sm:flex-row md:mt-4 md:gap-4">
                  <label className="sr-only" htmlFor="project-message">
                    Mensaje
                  </label>
                  <textarea
                    id="project-message"
                    name="message"
                    rows={3}
                    placeholder={
                      buying
                        ? "¿Algo más que debamos saber? (opcional)"
                        : "¿Alguna consulta antes de la visita? (opcional)"
                    }
                    className="w-full flex-1 rounded-md border border-neutral-300 bg-white px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-neutral-400 focus:border-accent"
                  />
                  <SubmitButton
                    status={status}
                    label={copy.submit}
                    className="shrink-0 sm:h-auto sm:self-stretch md:min-w-[11rem]"
                  />
                </div>

                <TermsCheckbox
                  checked={accepted}
                  onChange={setAccepted}
                  showError={attempted}
                />
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
