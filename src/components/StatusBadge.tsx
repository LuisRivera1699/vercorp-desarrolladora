import { STATUS_LABEL, type ProjectStatus } from "@/lib/projects";

export default function StatusBadge({
  status,
  tone = "light",
}: {
  status: ProjectStatus;
  tone?: "light" | "dark";
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] font-semibold tracking-[0.22em] uppercase backdrop-blur-md ${
        tone === "light"
          ? "bg-white/90 text-foreground"
          : "bg-black/35 text-white ring-1 ring-white/25"
      }`}
    >
      <span className="animate-status h-1.5 w-1.5 rounded-full bg-accent" />
      {STATUS_LABEL[status]}
    </span>
  );
}
