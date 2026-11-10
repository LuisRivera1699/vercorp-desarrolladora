export default function AdminCard({
  title,
  description,
  id,
  actions,
  muted = false,
  children,
}: {
  title: string;
  description: string;
  /** Ancla para el índice del editor. */
  id?: string;
  actions?: React.ReactNode;
  /** Sección oculta en la web: se sigue pudiendo editar. */
  muted?: boolean;
  children: React.ReactNode;
}) {
  const headingId = `card-${(id ?? title).toLowerCase().replace(/\W+/g, "-")}`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="scroll-mt-32 rounded-2xl bg-white ring-1 ring-black/5 lg:scroll-mt-20"
    >
      <header className="flex flex-col gap-3 border-b border-black/5 px-5 py-5 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div>
          <h2 id={headingId} className="text-base font-semibold">
            {title}
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-foreground/55">{description}</p>
        </div>
        {actions ? <div className="shrink-0">{actions}</div> : null}
      </header>
      <div className={`px-5 py-5 transition-opacity sm:px-6 ${muted ? "opacity-60" : ""}`}>{children}</div>
    </section>
  );
}
