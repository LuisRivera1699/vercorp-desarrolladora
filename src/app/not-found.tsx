import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function NotFound() {
  return (
    <>
      <Header solid />
      <main className="flex flex-1 items-center justify-center bg-stone px-6 pt-32 pb-24 text-center">
        <div className="flex max-w-lg flex-col items-center">
          <p className="font-serif text-7xl font-semibold text-accent sm:text-8xl">
            404
          </p>
          <h1 className="mt-4 font-serif text-3xl font-semibold tracking-wide text-foreground uppercase sm:text-4xl">
            Este espacio ya tiene dueño
          </h1>
          <p className="mt-4 text-sm leading-relaxed font-light text-neutral-500 sm:text-[0.95rem] sm:leading-8">
            La página que buscas no existe o el proyecto ya se vendió por
            completo. Mira los proyectos que tenemos disponibles hoy.
          </p>
          <Link
            href="/#en-venta"
            className="mt-9 inline-flex items-center justify-center bg-accent px-8 py-3.5 text-[11px] font-semibold tracking-[0.22em] text-white uppercase transition-colors hover:bg-accent-hover"
          >
            Ver espacios disponibles
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
