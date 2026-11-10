"use client";

import Image from "next/image";
import { type CSSProperties, FormEvent, useEffect, useRef, useState } from "react";
import {
  FIELD_LIMITS,
  FormError,
  Honeypot,
  inputClass,
  isBot,
  SubmitButton,
  SuccessMessage,
  TermsCheckbox,
  type FormStatus,
} from "@/components/forms";
import ProjectLogo from "@/components/ProjectLogo";
import { submitLead } from "@/lib/leads";
import { getAvailability } from "@/lib/projects";
import { overlayGradient, resolveColor } from "@/lib/projects/constants";
import { sectionVars } from "@/lib/projects/theme";
import type { ButtonColors, Palette, Project } from "@/lib/projects/types";
import { useSiteSettings } from "@/components/SiteSettings";
import { telHref } from "@/lib/home/contact";
import { SITE } from "@/lib/site";

type ProjectIntent = "visita" | "compra";

const HASH_INTENT: Record<string, ProjectIntent> = {
  "#visita": "visita",
  "#comprar": "compra",
};

/**
 * Los componentes de formulario compartidos con el home pintan el botón con
 * `--accent`; aquí se redefine con los colores del botón de esta sección.
 * Van resueltos a hex porque `--accent: var(--accent)` sería circular.
 */
function formButtonVars(button: ButtonColors, palette: Palette) {
  return {
    "--accent": resolveColor(button.bg, palette),
    "--accent-hover": resolveColor(button.hoverBg, palette),
    "--btn-fg": resolveColor(button.fg, palette),
    "--btn-hover-fg": resolveColor(button.hoverFg, palette),
  } as CSSProperties;
}

function todayInLima() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Lima" }).format(new Date());
}

export default function ProjectContactForm({
  project,
}: {
  project: Project;
}) {
  const settings = useSiteSettings();
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
    if (isBot(data)) {
      setStatus("sent");
      return;
    }

    setStatus("sending");
    try {
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
    } catch {
      setStatus("error");
    }
  };

  const selectIntent = (next: ProjectIntent) => {
    setIntent(next);
    if (status === "error") setStatus("idle");
  };

  const reset = () => {
    setStatus("idle");
    setAccepted(false);
    setAttempted(false);
  };

  const { contact } = project;
  const { style } = contact;
  const tabs: { id: ProjectIntent; label: string }[] = [
    { id: "visita", label: contact.visit.tab },
    { id: "compra", label: contact.buy.tab },
  ];
  const copy = intent === "compra" ? contact.buy : contact.visit;
  const buying = intent === "compra";

  return (
    <section
      ref={sectionRef}
      id="contacto-proyecto"
      className="grid scroll-mt-16 bg-s-bg text-s-fg sm:scroll-mt-20 lg:grid-cols-2"
      style={{
        ...sectionVars(
          { bg: style.bg, fg: style.fg, card: style.tabsBg, "on-photo": style.photoFg },
          { btn2: style.tabActive },
        ),
        ...formButtonVars(style.button, project.palette),
      }}
      aria-labelledby="project-contact-heading"
    >
      <div className="relative isolate flex min-h-[26rem] flex-col justify-between overflow-hidden px-5 py-10 text-s-on-photo sm:px-10 sm:py-12 lg:min-h-[44rem] lg:px-14 lg:py-16">
        <Image
          src={contact.image.url}
          alt={contact.image.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="-z-10 object-cover"
        />
        <div
          className="absolute inset-0 -z-10"
          style={{ backgroundImage: overlayGradient(style.overlay) }}
        />

        <ProjectLogo project={project} className="h-9 w-auto sm:h-11" />

        <div>
          <h2
            id="project-contact-heading"
            className="text-[2.75rem] leading-none font-extralight tracking-[-0.02em] sm:text-6xl"
          >
            Conversemos
          </h2>
          <p className="mt-4 text-[15px] font-light text-s-on-photo/85 sm:text-base">
            {contact.blurb}
          </p>
          <ul className="mt-8 space-y-1.5 text-sm font-light text-s-on-photo/70">
            <li>
              <a
                href={telHref(settings.phone)}
                className="transition-colors hover:text-s-on-photo"
              >
                {settings.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${settings.email}`}
                className="transition-colors hover:text-s-on-photo"
              >
                {settings.email}
              </a>
            </li>
            <li>
              <a
                href={SITE.parentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-s-on-photo"
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
              variant="pill"
              bookingText={
                buying
                  ? undefined
                  : "Agenda una llamada y coordina tu visita con un asesor al instante."
              }
            />
          ) : (
            <>
              <div
                className="flex max-w-sm rounded-full bg-s-card p-1"
                role="tablist"
                aria-label="Tipo de solicitud"
              >
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={intent === tab.id}
                    onClick={() => selectIntent(tab.id)}
                    className={`flex-1 rounded-full px-3 py-2.5 text-[13px] whitespace-nowrap transition-all duration-300 sm:px-4 ${
                      intent === tab.id
                        ? "bg-s-btn2 font-medium text-s-btn2-fg"
                        : "text-s-fg/60 hover:text-s-fg"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <h3 className="mt-9 text-3xl font-extralight tracking-[-0.01em] text-s-fg sm:text-4xl">
                {copy.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed font-light text-s-fg/65">
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
                    maxLength={FIELD_LIMITS.name}
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
                    maxLength={FIELD_LIMITS.phone}
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
                    maxLength={FIELD_LIMITS.email}
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
                          Quiero más de {project.pricing.areaFrom} m² (precio especial)
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
                          input.min = todayInLima();
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
                  maxLength={FIELD_LIMITS.message}
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

                <Honeypot />

                {status === "error" && (
                  <FormError
                    whatsappMessage={
                      buying
                        ? `Hola, quiero comprar un espacio en ${project.name}.`
                        : `Hola, quiero agendar una visita a ${project.name}.`
                    }
                  />
                )}

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
