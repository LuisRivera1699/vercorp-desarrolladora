"use client";

import { FormEvent, useState } from "react";
import {
  inputClass,
  SubmitButton,
  SuccessMessage,
  TermsCheckbox,
  type FormStatus,
} from "@/components/forms";
import { submitLead } from "@/lib/leads";
import { ACTIVE_PROJECTS } from "@/lib/projects";

export default function Inquiry() {
  const [accepted, setAccepted] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAttempted(true);
    if (!accepted || status === "sending") return;

    const data = new FormData(event.currentTarget);
    setStatus("sending");
    await submitLead({
      source: "home",
      intent: "info",
      name: String(data.get("name") ?? ""),
      phone: String(data.get("phone") ?? ""),
      email: String(data.get("email") ?? ""),
      project: String(data.get("project") ?? ""),
      message: String(data.get("message") ?? ""),
    });
    setStatus("sent");
  };

  const reset = () => {
    setStatus("idle");
    setAccepted(false);
    setAttempted(false);
  };

  return (
    <section
      id="contacto"
      className="scroll-mt-16 bg-stone px-5 py-16 sm:scroll-mt-20 sm:px-8 sm:py-20 md:py-24 lg:py-28"
      aria-labelledby="inquiry-heading"
    >
      <div className="mx-auto max-w-5xl rounded-2xl bg-white px-6 py-12 shadow-[0_8px_40px_rgba(0,0,0,0.04)] sm:px-10 sm:py-14 md:rounded-3xl md:px-14 md:py-16 lg:px-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-medium tracking-[0.32em] text-neutral-400 uppercase">
            Encuentra tu espacio
          </p>
          <h2
            id="inquiry-heading"
            className="mt-4 font-serif text-[1.55rem] leading-[1.2] font-semibold tracking-wide text-foreground uppercase sm:text-3xl md:text-[2.15rem] md:leading-[1.18]"
          >
            Hablemos de tu próximo proyecto.
            <br className="hidden sm:block" /> Un asesor te contactará.
          </h2>
        </div>

        {status === "sent" ? (
          <SuccessMessage
            title="¡Gracias!"
            message="Recibimos tu consulta. Un asesor de Vercorp Desarrolladora te contactará muy pronto para ayudarte a elegir tu espacio."
            onReset={reset}
          />
        ) : (
          <form onSubmit={onSubmit} className="mx-auto mt-10 max-w-4xl sm:mt-12">
            <div className="grid gap-3 sm:grid-cols-2 lg:gap-4">
              <label className="sr-only" htmlFor="inquiry-name">
                Nombre y apellido
              </label>
              <input
                id="inquiry-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Nombre y apellido"
                className={inputClass}
              />

              <label className="sr-only" htmlFor="inquiry-phone">
                Número de teléfono
              </label>
              <input
                id="inquiry-phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                placeholder="Número de teléfono"
                className={inputClass}
              />

              <label className="sr-only" htmlFor="inquiry-email">
                Correo electrónico
              </label>
              <input
                id="inquiry-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="Correo electrónico"
                className={inputClass}
              />

              <label className="sr-only" htmlFor="inquiry-project">
                Proyecto de interés
              </label>
              <select
                id="inquiry-project"
                name="project"
                required
                defaultValue=""
                className={`${inputClass} invalid:text-neutral-400`}
              >
                <option value="" disabled>
                  Proyecto de interés…
                </option>
                {ACTIVE_PROJECTS.map((project) => (
                  <option key={project.slug} value={project.slug}>
                    {project.name} · {project.place}
                  </option>
                ))}
                <option value="general">Aún no lo sé, quiero asesoría</option>
              </select>
            </div>

            <div className="mt-3 flex flex-col gap-3 sm:flex-row lg:mt-4 lg:gap-4">
              <label className="sr-only" htmlFor="inquiry-message">
                Mensaje
              </label>
              <textarea
                id="inquiry-message"
                name="message"
                rows={3}
                placeholder="¿Qué te gustaría construir? (opcional)"
                className="w-full flex-1 rounded-md border border-neutral-300 bg-white px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-neutral-400 focus:border-accent"
              />
              <SubmitButton
                status={status}
                className="shrink-0 sm:h-auto sm:self-stretch md:min-w-[9.5rem]"
              />
            </div>

            <TermsCheckbox
              checked={accepted}
              onChange={setAccepted}
              showError={attempted}
            />
          </form>
        )}
      </div>
    </section>
  );
}
