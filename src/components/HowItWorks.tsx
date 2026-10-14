import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

const STEPS: { title: string; description: string; illustration: ReactNode }[] = [
  {
    title: "Elegimos el terreno",
    description:
      "Identificamos grandes extensiones en zonas de Cuzco con proyección real de crecimiento, conectividad y servicios.",
    illustration: <TerrainArt />,
  },
  {
    title: "Habilitamos",
    description:
      "Saneamos cada terreno con un estudio jurídico y dejamos todos los papeles en regla. Al comprar, recibes tu boleta o factura.",
    illustration: <UrbanizeArt />,
  },
  {
    title: "Lotizamos",
    description:
      "Dividimos el terreno en espacios independientes, con medidas claras, documentación en regla y precio transparente.",
    illustration: <LotsArt />,
  },
  {
    title: "Crece tu patrimonio",
    description:
      "Invierte en zonas con mayor proyección en lugar de dejar tu dinero parado, expuesto a la inflación. A futuro, un inmueble que es patrimonio de por vida.",
    illustration: <HomeArt />,
  },
];

export default function HowItWorks() {
  return (
    <section
      id="como-funciona"
      className="scroll-mt-16 bg-white px-5 py-20 sm:scroll-mt-20 sm:px-8 sm:py-24 md:py-28 lg:py-32"
      aria-labelledby="how-heading"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            id="how-heading"
            eyebrow="Habilitación urbana"
            title="De un gran terreno a tu propio espacio"
            description="En Vercorp Desarrolladora convertimos terrenos amplios en comunidades ordenadas y listas para crecer. Así funciona:"
          />
        </Reveal>

        <ol className="relative mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-14 md:mt-20 lg:grid-cols-4 lg:gap-8">
          <span
            className="absolute top-12 right-[12.5%] left-[12.5%] hidden h-px border-t border-dashed border-accent/50 lg:block"
            aria-hidden
          />
          {STEPS.map((step, index) => (
            <li key={step.title}>
              <Reveal
                delay={index * 120}
                className="flex flex-col items-center text-center"
              >
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-accent/40 bg-white text-accent transition-colors duration-500 hover:bg-stone">
                  {step.illustration}
                </div>
                <p className="mt-6 font-serif text-4xl font-semibold text-accent/60">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-serif text-xl font-semibold tracking-wide text-foreground uppercase sm:text-[1.35rem]">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed font-light text-neutral-500 sm:leading-7">
                  {step.description}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const art = {
  width: 48,
  height: 48,
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function TerrainArt() {
  return (
    <svg {...art}>
      <path d="M6 30c6-8 12-11 18-11s12 3 18 11" />
      <path d="M10 33c5-6 9.5-8 14-8s9 2 14 8" />
      <path d="M15 36c3-3.5 6-5 9-5s6 1.5 9 5" />
      <path d="M4 40h40" />
      <path d="M33 10l3-4 3 4" opacity="0.6" />
    </svg>
  );
}

function UrbanizeArt() {
  return (
    <svg {...art}>
      <rect x="6" y="6" width="36" height="36" rx="2" />
      <path d="M21 6v36M27 6v36" />
      <path d="M6 21h15M27 21h15" strokeDasharray="2 3" />
      <path d="M12 30v6M36 30v6" opacity="0.6" />
    </svg>
  );
}

function LotsArt() {
  return (
    <svg {...art}>
      <rect x="6" y="6" width="36" height="36" rx="2" />
      <path d="M6 24h36M18 6v36M30 6v36" />
      <rect
        x="19.5"
        y="25.5"
        width="9"
        height="15"
        fill="currentColor"
        fillOpacity="0.25"
        stroke="none"
      />
    </svg>
  );
}

function HomeArt() {
  return (
    <svg {...art}>
      <rect x="5" y="30" width="38" height="12" rx="1.5" strokeDasharray="3 3" />
      <path d="M14 34V22l10-8 10 8v12" />
      <path d="M21 34v-7h6v7" />
      <path d="M36 12c2 0 3.5 1.6 3.5 3.6S38 19 36 19" opacity="0.6" />
    </svg>
  );
}
