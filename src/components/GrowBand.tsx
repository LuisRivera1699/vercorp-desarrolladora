import Image from "next/image";
import ParallaxImage from "@/components/ParallaxImage";
import Reveal from "@/components/Reveal";
import type { GrowContent } from "@/lib/home/types";

export default function GrowBand({ content }: { content: GrowContent }) {
  return (
    <section
      id="crece"
      className="relative overflow-hidden bg-ink"
      aria-labelledby="grow-heading"
    >
      {content.image.url ? (
        <ParallaxImage src={content.image.url} alt={content.image.alt} />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col px-6 py-24 sm:px-8 md:py-32 lg:min-h-[620px] lg:justify-center lg:py-36">
        <Reveal className="max-w-xl">
          <div aria-hidden>
            {content.mark.url ? (
              <Image
                src={content.mark.url}
                alt=""
                width={content.mark.width}
                height={content.mark.height}
                className="h-11 w-auto sm:h-12"
              />
            ) : null}
            <div className="mt-3 h-px w-20 bg-white/80 sm:w-24" />
          </div>

          <h2
            id="grow-heading"
            className="mt-10 font-serif text-[2.5rem] leading-[1.02] font-semibold tracking-wide text-white uppercase sm:mt-12 sm:text-5xl md:text-6xl"
          >
            {content.title}
            {content.accent ? (
              <>
                <br />
                <span className="text-accent">{content.accent}</span>
              </>
            ) : null}
          </h2>

          <p className="mt-6 text-sm leading-relaxed font-light text-white/80 sm:text-[0.95rem] sm:leading-8">
            {content.text}
          </p>

          <a
            href="#en-venta"
            className="mt-9 inline-flex items-center justify-center bg-accent px-8 py-3.5 text-[11px] font-semibold tracking-[0.22em] text-white uppercase transition-colors duration-300 hover:bg-accent-hover sm:px-10"
          >
            {content.buttonLabel}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
