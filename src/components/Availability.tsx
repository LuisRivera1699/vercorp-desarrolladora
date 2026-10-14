import { getAvailability, type ActiveProject } from "@/lib/projects";

const PROGRESS_BAR_RATIO = 0.5;

export default function Availability({
  project,
  tone = "light",
  className = "",
}: {
  project: ActiveProject;
  tone?: "light" | "dark";
  className?: string;
}) {
  const { total, sold, available, soldRatio } = getAvailability(project);
  const dark = tone === "dark";
  const label = `${available} ${available === 1 ? "espacio disponible" : "espacios disponibles"}`;

  if (soldRatio < PROGRESS_BAR_RATIO) {
    return (
      <p
        className={`flex items-center gap-2 text-[11px] font-semibold tracking-[0.16em] uppercase ${
          dark ? "text-white/85" : "text-foreground"
        } ${className}`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
        {label}
      </p>
    );
  }

  return (
    <div className={className}>
      <div
        className={`flex items-baseline justify-between gap-4 text-[11px] font-semibold tracking-[0.16em] uppercase ${
          dark ? "text-white/85" : "text-foreground"
        }`}
      >
        <span>
          {sold} de {total} vendidos
        </span>
        <span className="text-accent">
          {available === 1 ? "Queda 1" : `Quedan ${available}`}
        </span>
      </div>
      <div
        className={`mt-2 h-1.5 overflow-hidden rounded-full ${
          dark ? "bg-white/20" : "bg-neutral-200"
        }`}
        role="progressbar"
        aria-label="Espacios vendidos"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={sold}
      >
        <div
          className="h-full rounded-full bg-accent"
          style={{ width: `${Math.round(soldRatio * 100)}%` }}
        />
      </div>
    </div>
  );
}
