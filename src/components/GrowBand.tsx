import Image from "next/image";
import ParallaxImage from "@/components/ParallaxImage";
import Reveal from "@/components/Reveal";
import { unsplash } from "@/lib/projects";

export default function GrowBand() {
  return (
    <section
      className="relative overflow-hidden bg-ink"
      aria-labelledby="grow-heading"
    >
      <ParallaxImage
        src={unsplash("1531065208531-4036c0dba3ca", 2400)}
        alt="Montañas sagradas de Cuzco al atardecer"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col px-6 py-24 sm:px-8 md:py-32 lg:min-h-[620px] lg:justify-center lg:py-36">
        <Reveal className="max-w-xl">
          <div aria-hidden>
            <Image
              src="/brand/vercorp-v-white.png"
              alt=""
              width={395}
              height={381}
              className="h-11 w-auto sm:h-12"
            />
            <div className="mt-3 h-px w-20 bg-white/80 sm:w-24" />
          </div>

          <h2
            id="grow-heading"
            className="mt-10 font-serif text-[2.5rem] leading-[1.02] font-semibold tracking-wide text-white uppercase sm:mt-12 sm:text-5xl md:text-6xl"
          >
            Cuzco crece.
            <br />
            <span className="text-accent">Crece con él.</span>
          </h2>

          <p className="mt-6 text-sm leading-relaxed font-light text-white/80 sm:text-[0.95rem] sm:leading-8">
            Cada espacio es el comienzo de una historia: una casa para la familia,
            un negocio propio, un patrimonio para toda la vida.
            Construye tu futuro en la tierra donde la historia sigue
            escribiéndose.
          </p>

          <a
            href="#en-venta"
            className="mt-9 inline-flex items-center justify-center bg-accent px-8 py-3.5 text-[11px] font-semibold tracking-[0.22em] text-white uppercase transition-colors duration-300 hover:bg-accent-hover sm:px-10"
          >
            Elegir mi espacio
          </a>
        </Reveal>
      </div>
    </section>
  );
}
