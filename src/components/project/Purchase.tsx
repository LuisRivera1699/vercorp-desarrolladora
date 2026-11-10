import Reveal from "@/components/Reveal";
import { contactHref, financingExample, formatUsd, getFinancing } from "@/lib/projects";
import { sectionVars } from "@/lib/projects/theme";
import type { Project } from "@/lib/projects/types";
import { CornerMark, Eyebrow, titleClass } from "./shared";

export default function Purchase({ project }: { project: Project }) {
  const { purchase } = project;
  const { style } = purchase;
  const financing = getFinancing(project);

  return (
    <section
      id="compra"
      className="relative scroll-mt-16 bg-s-bg px-5 py-20 text-s-fg sm:scroll-mt-20 sm:px-8 sm:py-24 lg:py-32"
      style={sectionVars(
        { bg: style.bg, fg: style.fg, accent: style.accent, card: style.cardBg },
        { btn: style.button },
      )}
    >
      <CornerMark mark={project.mark} />
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Eyebrow mark={project.mark}>{purchase.eyebrow}</Eyebrow>
          <h2 className={`${titleClass} max-w-3xl`}>{purchase.title}</h2>
        </Reveal>

        <ol className="mt-12 grid grid-cols-1 gap-10 md:mt-16 md:grid-cols-3 md:gap-8">
          {purchase.steps.map((step, index) => (
            <li key={step.id}>
              <Reveal delay={index * 110} className="border-t border-s-fg/20 pt-6">
                <p className="text-5xl font-extralight tracking-[-0.03em] text-s-accent">
                  {index + 1}.
                </p>
                <h3 className="mt-5 text-xl font-normal">{step.title}</h3>
                <p className="mt-2 max-w-xs text-[15px] leading-relaxed font-light text-s-fg/70">
                  {step.description}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal className="mt-14 flex flex-col gap-6 rounded-2xl bg-s-card p-6 sm:p-8 md:flex-row md:items-center md:justify-between lg:rounded-3xl">
          <div>
            <p className="text-3xl font-extralight tracking-[-0.02em] sm:text-4xl">
              Desde {formatUsd(financing.monthly)}/mes
            </p>
            <p className="mt-1 text-[15px] font-light text-s-fg/70">
              {financing.downPaymentPercent}% de inicial y{" "}
              {financing.installments} cuotas sin intereses
            </p>
            <p className="mt-3 max-w-xl text-[12px] leading-relaxed font-light text-s-fg/50">
              {financingExample(financing)}
            </p>
          </div>
          <a
            href={contactHref(project, "comprar")}
            className="inline-flex h-12 shrink-0 items-center justify-center rounded-full bg-s-btn px-7 text-sm font-medium text-s-btn-fg transition-colors hover:bg-s-btn-hover hover:text-s-btn-hover-fg"
          >
            {purchase.buttonLabel}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
