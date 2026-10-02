import type { ReactNode } from "react";

export default function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "center",
  tone = "dark",
}: {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  tone?: "dark" | "light";
}) {
  const centered = align === "center";
  const light = tone === "light";

  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-xl"}>
      <p
        className={`text-[11px] font-medium tracking-[0.32em] uppercase ${
          light ? "text-accent" : "text-neutral-400"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        id={id}
        className={`mt-4 font-serif text-[1.75rem] leading-[1.15] font-semibold tracking-wide uppercase sm:text-4xl md:text-[2.55rem] md:leading-[1.12] ${
          light ? "text-white" : "text-foreground"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-5 text-sm leading-relaxed font-light sm:text-[0.95rem] sm:leading-8 ${
            centered ? "mx-auto max-w-2xl" : ""
          } ${light ? "text-white/70" : "text-neutral-500"}`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
