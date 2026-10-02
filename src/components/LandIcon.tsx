import type { ReactNode } from "react";
import type { LandIconId } from "@/lib/projects";

const common = {
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export default function LandIcon({ id }: { id: LandIconId }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      {ICONS[id]}
    </svg>
  );
}

const ICONS: Record<LandIconId, ReactNode> = {
  water: <path {...common} d="M12 3.5s6 6.6 6 10.5a6 6 0 0 1-12 0c0-3.9 6-10.5 6-10.5Z" />,
  road: (
    <>
      <path {...common} d="M8 3 5 21M16 3l3 18" />
      <path {...common} d="M12 4v3M12 10.5v3M12 17v3" />
    </>
  ),
  title: (
    <>
      <path {...common} d="M6 3h8l4 4v14H6V3Z" />
      <path {...common} d="M14 3v4h4M9 12h6M9 16h4" />
    </>
  ),
  location: (
    <>
      <path {...common} d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11Z" />
      <circle {...common} cx="12" cy="10" r="2.3" />
    </>
  ),
  calendar: (
    <>
      <rect {...common} x="3.5" y="5" width="17" height="15" rx="2" />
      <path {...common} d="M3.5 9.5h17M8 3v4M16 3v4M8 14h3M8 17h5" />
    </>
  ),
  legal: (
    <>
      <path {...common} d="M12 4v16M7 20h10M5 7h14" />
      <path {...common} d="m5 7-2.5 6a2.5 2.5 0 0 0 5 0L5 7ZM19 7l-2.5 6a2.5 2.5 0 0 0 5 0L19 7Z" />
    </>
  ),
  security: (
    <>
      <path {...common} d="M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6l-7-3Z" />
      <path {...common} d="m9 12 2 2 4-4" />
    </>
  ),
  trend: (
    <>
      <path {...common} d="M3.5 20.5h17" />
      <path {...common} d="m4.5 16 5-5 3.5 3.5 6.5-7" />
      <path {...common} d="M15 7.5h4.5V12" />
    </>
  ),
  view: (
    <>
      <path {...common} d="m2.5 18 6-8 4 5 3-3.5 6 6.5" />
      <circle {...common} cx="16.5" cy="6.5" r="2" />
      <path {...common} d="M2.5 21h19" />
    </>
  ),
  activity: (
    <>
      <path {...common} d="M3 17.5c1.5 1 3 1 4.5 0s3-1 4.5 0 3 1 4.5 0 3-1 4.5 0" />
      <path {...common} d="M5 14.5 14.5 6" />
      <path {...common} d="M14 6.5c.8-2 2.6-3.4 5.5-3.5-.1 2.9-1.5 4.7-3.5 5.5-1 .4-2.4-1-2-2Z" />
      <path {...common} d="M3 21c1.5 1 3 1 4.5 0s3-1 4.5 0 3 1 4.5 0 3-1 4.5 0" />
    </>
  ),
};
