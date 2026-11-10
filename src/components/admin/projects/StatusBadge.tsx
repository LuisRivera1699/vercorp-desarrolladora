export default function StatusBadge({ published }: { published: boolean }) {
  return (
    <span
      className={`inline-flex h-6 items-center gap-1.5 rounded-full px-2.5 text-xs font-medium ${
        published ? "bg-emerald-50 text-emerald-800" : "bg-black/[0.05] text-foreground/60"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${published ? "bg-emerald-500" : "bg-foreground/30"}`}
        aria-hidden
      />
      {published ? "Publicado" : "Oculto"}
    </span>
  );
}
