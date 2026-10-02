import Image from "next/image";
import LandIcon from "@/components/LandIcon";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { TOTAL_SOLD_LOTS, unsplash, type LandIconId } from "@/lib/projects";

const BENEFITS: { icon: LandIconId; title: string; description: string }[] = [
  {
    icon: "title",
    title: "Título en regla",
    description:
      "Lotes independizados y saneados, listos para inscribirse a tu nombre en Registros Públicos.",
  },
  {
    icon: "location",
    title: "Ubicación con proyección",
    description:
      "Elegimos zonas donde Cusco está creciendo: nuevas vías, servicios y polos de desarrollo.",
  },
  {
    icon: "calendar",
    title: "Proceso simple",
    description:
      "Agendas tu cita, separas tu lote y firmas la escritura pública. Tres pasos claros, sin letra chica.",
  },
  {
    icon: "water",
    title: "Servicios habilitados",
    description:
      "Agua, luz, desagüe y vías proyectadas para que construyas sin sorpresas.",
  },
  {
    icon: "legal",
    title: "Acompañamiento legal",
    description:
      "Te guiamos en cada paso: separación, minuta, escritura e inscripción.",
  },
  {
    icon: "security",
    title: "Respaldo Vercorp",
    description: `8 proyectos desarrollados en Cusco y más de ${TOTAL_SOLD_LOTS} lotes entregados a familias que ya construyen su futuro.`,
  },
];

export default function Benefits() {
  return (
    <section
      id="por-que"
      className="bg-stone px-5 py-20 sm:px-8 sm:py-24 md:py-28 lg:py-32"
      aria-labelledby="benefits-heading"
    >
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <SectionHeading
                id="benefits-heading"
                align="left"
                eyebrow="Por qué Vercorp"
                title="Compra con la tranquilidad de hacerlo bien"
                description="Un lote es el inicio de tu proyecto de vida. Por eso cuidamos cada detalle: legal, técnico y humano."
              />
            </Reveal>
            <Reveal delay={150}>
              <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-2xl lg:rounded-3xl">
                <Image
                  src={unsplash("1503387762-592deb58ef4e", 1200)}
                  alt="Revisión de planos de un proyecto de habilitación urbana"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>

        <ul className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:col-span-7 lg:self-center">
          {BENEFITS.map((benefit, index) => (
            <li key={benefit.title}>
              <Reveal delay={(index % 2) * 120}>
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-accent/35 bg-white text-accent">
                  <LandIcon id={benefit.icon} />
                </div>
                <h3 className="mt-5 font-serif text-xl font-semibold tracking-wide text-foreground uppercase">
                  {benefit.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed font-light text-neutral-500 sm:leading-7">
                  {benefit.description}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
