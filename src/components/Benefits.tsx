import Image from "next/image";
import LandIcon from "@/components/LandIcon";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { TOTAL_SOLD_LOTS, unsplash, type LandIconId } from "@/lib/projects";
import { SITE } from "@/lib/site";

const BENEFITS: {
  icon: LandIconId;
  title: string;
  description: string;
  href?: string;
}[] = [
  {
    icon: "trend",
    title: "Zonas con mayor proyección",
    description:
      "Elegimos zonas donde Cuzco está creciendo: nuevas vías, servicios y polos de desarrollo como el aeropuerto de Chinchero.",
  },
  {
    icon: "location",
    title: "Precio de entrada competitivo",
    description:
      "Precios por m² competitivos en zonas en plena expansión, con precios especiales si necesitas más metros.",
  },
  {
    icon: "title",
    title: "Título en regla",
    description:
      "Espacios independizados y saneados, listos para inscribirse a tu nombre en Registros Públicos.",
  },
  {
    icon: "water",
    title: "Servicios habilitados",
    description:
      "Agua, luz, desagüe y vías proyectadas: un activo que puedes usar, alquilar o revender.",
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
    description: `Holding inmobiliario con 8 proyectos desarrollados en Cuzco y más de ${TOTAL_SOLD_LOTS} espacios entregados.`,
    href: SITE.parentUrl,
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
                title="Invierte en tierra con proyección"
                description="Un espacio en Cuzco no es un gasto: es patrimonio. En lugar de dejar tu dinero parado, lo inviertes en una zona con mayor proyección, con el respaldo de un holding inmobiliario con trayectoria."
              />
              <a
                href={SITE.parentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block text-[11px] font-semibold tracking-[0.22em] text-foreground uppercase underline-offset-4 transition-colors hover:text-accent hover:underline"
              >
                Conoce el holding Vercorp →
              </a>
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

        <div className="lg:col-span-7 lg:self-center">
          <ul className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2">
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
                  {benefit.href ? (
                    <a
                      href={benefit.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block text-[11px] font-semibold tracking-[0.22em] text-foreground uppercase underline-offset-4 transition-colors hover:text-accent hover:underline"
                    >
                      Visitar {benefit.href.replace("https://", "")} →
                    </a>
                  ) : null}
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
