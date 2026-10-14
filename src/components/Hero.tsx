import Image from "next/image";
import LotPlan from "@/components/LotPlan";

export default function Hero() {
  return (
    <section
      className="relative h-[100dvh] min-h-[600px] w-full overflow-hidden bg-ink"
      aria-label="Presentación Vercorp Desarrolladora"
    >
      <Image
        src="/photos/valle-andino.png"
        alt="Valle andino de Cuzco con parcelas de cultivo y montañas"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[50%_60%]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/50" />

      <div
        className="hero-plane pointer-events-none absolute inset-x-[-40%] bottom-[-4%] h-[50%] sm:inset-x-[-12%] md:h-[60%]"
        aria-hidden
      >
        <LotPlan
          preserveAspectRatio="xMidYMax slice"
          className="h-full w-full"
        />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center px-6 pt-[22vh] text-center text-white sm:pt-[20vh]">
        <div className="animate-hero-in flex max-w-4xl flex-col items-center">
          <p className="text-[10px] font-medium tracking-[0.36em] text-white/75 uppercase sm:text-[11px]">
            Habilitaciones urbanas en Cuzco
          </p>
          <h1 className="mt-5 font-serif text-[2.6rem] leading-[1.04] font-semibold tracking-wide text-white uppercase sm:text-6xl md:text-7xl lg:text-[5.4rem]">
            Tu lugar para
            <br />
            crecer en Cuzco
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed font-light text-white/85 sm:text-base md:text-[1.05rem] md:leading-8">
            Transformamos grandes terrenos en espacios listos para ser tuyos, en
            las zonas con mayor proyección del Cuzco. Tú pones la idea;
            nosotros, el lugar.
          </p>
          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
            <a
              href="#en-venta"
              className="inline-flex items-center justify-center bg-accent px-8 py-3.5 text-[11px] font-semibold tracking-[0.22em] text-white uppercase transition-colors duration-300 hover:bg-accent-hover sm:px-10"
            >
              Ver espacios disponibles
            </a>
            <a
              href="#entregados"
              className="inline-flex items-center justify-center border border-white/80 px-8 py-3.5 text-[11px] font-semibold tracking-[0.22em] text-white uppercase transition-all duration-300 hover:bg-white hover:text-foreground sm:px-10"
            >
              Condominios entregados
            </a>
          </div>
        </div>
      </div>

      <a
        href="#cifras"
        className="animate-chevron absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center text-white/70 transition-colors hover:text-white sm:bottom-9"
        aria-label="Desplazarse al contenido"
      >
        <ChevronDown />
        <ChevronDown className="-mt-2.5 opacity-60" />
      </a>
    </section>
  );
}

function ChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
