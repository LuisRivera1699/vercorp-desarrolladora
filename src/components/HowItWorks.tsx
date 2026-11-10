import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import StepIllustration from "@/components/StepIllustration";
import type { StepsContent } from "@/lib/home/types";

export default function HowItWorks({ content }: { content: StepsContent }) {
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
            eyebrow={content.eyebrow}
            title={content.title}
            description={content.description}
          />
        </Reveal>

        <ol className="relative mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-14 md:mt-20 lg:grid-cols-4 lg:gap-8">
          <span
            className="absolute top-12 right-[12.5%] left-[12.5%] hidden h-px border-t border-dashed border-accent/50 lg:block"
            aria-hidden
          />
          {content.items.map((step, index) => (
            <li key={step.id}>
              <Reveal
                delay={index * 120}
                className="flex flex-col items-center text-center"
              >
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-accent/40 bg-white text-accent transition-colors duration-500 hover:bg-stone">
                  <StepIllustration step={step} />
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
