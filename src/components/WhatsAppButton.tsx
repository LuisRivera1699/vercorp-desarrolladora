import { whatsappLink } from "@/lib/site";

export default function WhatsAppButton() {
  return (
    <a
      href={whatsappLink(
        "Hola, quiero información sobre los lotes de Vercorp Desarrolladora.",
      )}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="group fixed right-5 bottom-5 z-40 flex h-13 w-13 items-center justify-center rounded-full bg-[#1f1f1f] text-white shadow-[0_10px_30px_rgba(0,0,0,0.25)] ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent sm:right-7 sm:bottom-7 sm:h-14 sm:w-14"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M4 20l1.2-3.6A8 8 0 1 1 8 19.1L4 20Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M9.2 8.6c.2-.4.4-.4.7-.4h.5c.2 0 .4 0 .5.4l.6 1.5c.1.2 0 .4-.1.6l-.4.5c-.1.1-.2.3 0 .5.3.6 1.2 1.6 2.2 2 .2.1.4.1.5-.1l.6-.7c.1-.2.3-.2.5-.1l1.4.7c.2.1.3.2.3.4 0 .4-.2 1.2-1 1.5-.7.3-1.6.4-3.4-.5-1.6-.8-2.8-2.5-3.1-3.2-.3-.6-.4-1.4-.2-2 .1-.4.3-.7.4-1.1Z"
          fill="currentColor"
        />
      </svg>
      <span className="pointer-events-none absolute right-full mr-3 hidden rounded-full bg-white px-4 py-2 text-[11px] font-medium tracking-[0.14em] whitespace-nowrap text-foreground uppercase opacity-0 shadow-[0_6px_24px_rgba(0,0,0,0.12)] transition-opacity duration-300 group-hover:opacity-100 sm:block">
        Escríbenos
      </span>
    </a>
  );
}
