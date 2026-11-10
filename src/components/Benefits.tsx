import Image from "next/image";
import LandIcon from "@/components/LandIcon";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { type DeliveredStats, fillDelivered } from "@/lib/home/stats";
import type { WhyContent } from "@/lib/home/types";

export default function Benefits({
  content,
  stats,
}: {
  content: WhyContent;
  stats: DeliveredStats;
}) {
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
                eyebrow={content.eyebrow}
                title={content.title}
                description={content.description}
              />
              {content.link.href ? (
                <a
                  href={content.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-block text-[11px] font-semibold tracking-[0.22em] text-foreground uppercase underline-offset-4 transition-colors hover:text-accent hover:underline"
                >
                  {content.link.label} →
                </a>
              ) : null}
            </Reveal>
            {content.image.url ? (
              <Reveal delay={150}>
                <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-2xl lg:rounded-3xl">
                  <Image
                    src={content.image.url}
                    alt={content.image.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            ) : null}
          </div>
        </div>

        <div className="lg:col-span-7 lg:self-center">
          <ul className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2">
            {content.items.map((benefit, index) => (
              <li key={benefit.id}>
                <Reveal delay={(index % 2) * 120}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-accent/35 bg-white text-accent">
                    <LandIcon id={benefit.icon} />
                  </div>
                  <h3 className="mt-5 font-serif text-xl font-semibold tracking-wide text-foreground uppercase">
                    {benefit.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed font-light text-neutral-500 sm:leading-7">
                    {fillDelivered(benefit.description, stats)}
                  </p>
                  {benefit.link.href ? (
                    <a
                      href={benefit.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block text-[11px] font-semibold tracking-[0.22em] text-foreground uppercase underline-offset-4 transition-colors hover:text-accent hover:underline"
                    >
                      {benefit.link.label} →
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
