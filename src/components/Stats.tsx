import AnimatedNumber from "@/components/AnimatedNumber";
import { type DeliveredStats, metricValue } from "@/lib/home/stats";
import type { Metric } from "@/lib/home/types";

export default function Stats({ metrics, stats }: { metrics: Metric[]; stats: DeliveredStats }) {
  return (
    <section
      id="cifras"
      className="scroll-mt-16 border-y border-neutral-200/70 bg-stone px-5 py-16 sm:scroll-mt-20 sm:px-8 sm:py-20"
      aria-label="Vercorp Desarrolladora en cifras"
    >
      <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-y-12 lg:grid-cols-4">
        {metrics.map((stat, index) => (
          <li
            key={stat.id}
            className={`flex flex-col items-center border-neutral-200 px-3 text-center ${
              index % 2 === 1 ? "border-l" : ""
            } lg:border-l lg:first:border-l-0`}
          >
            <AnimatedNumber
              value={metricValue(stat, stats)}
              suffix={stat.suffix}
              className="font-serif text-4xl font-semibold tracking-wide text-accent sm:text-5xl md:text-6xl"
            />
            <p className="mt-3 text-[10px] font-medium tracking-[0.22em] text-foreground uppercase sm:text-[11px]">
              {stat.label}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
