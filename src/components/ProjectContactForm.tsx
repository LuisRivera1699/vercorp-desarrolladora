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
import ProjectLogo from "@/components/ProjectLogo";
import { submitLead } from "@/lib/leads";
import { getAvailability, type ActiveProject } from "@/lib/projects";
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
    title: "Separa tu espacio",
    description:
      "Cuéntanos qué espacio te interesa. Te confirmamos disponibilidad, precio y los pasos para hacerlo tuyo.",
    submit: "Quiero este espacio",
    success: "¡Espacio en camino!",
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
      className="grid scroll-mt-16 bg-background sm:scroll-mt-20 lg:grid-cols-2"
      aria-labelledby="project-contact-heading"
    >
      <div className="relative isolate flex min-h-[26rem] flex-col justify-between overflow-hidden px-5 py-10 text-background sm:px-10 sm:py-12 lg:min-h-[44rem] lg:px-14 lg:py-16">
        <Image
          src={project.contact.image.src}
          alt={project.contact.image.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-ink/35 to-ink/25" />

        <ProjectLogo project={project} className="h-9 w-auto sm:h-11" />

        <div>
          <h2
            id="project-contact-heading"
            className="text-[2.75rem] leading-none font-extralight tracking-[-0.02em] sm:text-6xl"
          >
            Conversemos
          </h2>
          <p className="mt-4 text-[15px] font-light text-background/85 sm:text-base">
            {project.contact.blurb}
          </p>
          <ul className="mt-8 space-y-1.5 text-sm font-light text-background/70">
            <li>
              <a
                href={`tel:${SITE.phone}`}
                className="transition-colors hover:text-background"
              >
                {SITE.phoneLabel}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${SITE.email}`}
                className="transition-colors hover:text-background"
              >
                {SITE.email}
              </a>
            </li>
            <li>
              <a
                href={SITE.parentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-background"
              >
                {SITE.parentUrl.replace("https://", "www.")}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex items-center px-5 py-14 sm:px-10 sm:py-16 lg:px-14 lg:py-20 xl:px-20">
        <div className="w-full max-w-xl">
          {status === "sent" ? (
            <SuccessMessage
              title={copy.success}
              message={
                buying
                  ? `Recibimos tu solicitud de compra en ${project.name}. Un asesor te contactará para confirmar disponibilidad y separar tu espacio.`
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
                    className={`flex-1 rounded-full px-3 py-2.5 text-[13px] whitespace-nowrap transition-all duration-300 sm:px-4 ${
                      intent === tab.id
                        ? "bg-foreground font-medium text-background"
                        : "text-foreground/60 hover:text-foreground"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <h3 className="mt-9 text-3xl font-extralight tracking-[-0.01em] text-foreground sm:text-4xl">
                {copy.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed font-light text-foreground/65">
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
                        Espacio de interés
                      </label>
                      <select
                        key="lot"
                        id="project-lot"
                        name="lot"
                        defaultValue=""
                        className={inputClass}
                      >
                        <option value="">Espacio de interés (opcional)</option>
                        <option value="mas-metros">
                          Quiero más de {project.area.from} m² (precio especial)
                        </option>
                        {getAvailability(project).availableSpaces.map(
                          (space) => (
                            <option key={space.number} value={String(space.number)}>
                              Espacio {space.number} · {space.area} m²
                            </option>
                          ),
                        )}
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
                  className="mt-3 w-full rounded-md border border-neutral-300 bg-white px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-neutral-400 focus:border-accent md:mt-4"
                />
                <SubmitButton
                  status={status}
                  label={copy.submit}
                  variant="pill"
                  className="mt-3 w-full md:mt-4"
                />

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
