import { VectorAsset } from "@/components/ProjectLogo";
import type { StepCard } from "@/lib/home/types";

const ARTS = {
  terrain: TerrainArt,
  urbanize: UrbanizeArt,
  lots: LotsArt,
  home: HomeArt,
};

export default function StepIllustration({ step }: { step: StepCard }) {
  if (step.art === "custom") {
    return step.customArt ? <VectorAsset asset={step.customArt} className="h-12 w-12" /> : null;
  }
  const Art = ARTS[step.art];
  return <Art />;
}

const art = {
  width: 48,
  height: 48,
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function TerrainArt() {
  return (
    <svg {...art}>
      <path d="M6 30c6-8 12-11 18-11s12 3 18 11" />
      <path d="M10 33c5-6 9.5-8 14-8s9 2 14 8" />
      <path d="M15 36c3-3.5 6-5 9-5s6 1.5 9 5" />
      <path d="M4 40h40" />
      <path d="M33 10l3-4 3 4" opacity="0.6" />
    </svg>
  );
}

function UrbanizeArt() {
  return (
    <svg {...art}>
      <rect x="6" y="6" width="36" height="36" rx="2" />
      <path d="M21 6v36M27 6v36" />
      <path d="M6 21h15M27 21h15" strokeDasharray="2 3" />
      <path d="M12 30v6M36 30v6" opacity="0.6" />
    </svg>
  );
}

function LotsArt() {
  return (
    <svg {...art}>
      <rect x="6" y="6" width="36" height="36" rx="2" />
      <path d="M6 24h36M18 6v36M30 6v36" />
      <rect
        x="19.5"
        y="25.5"
        width="9"
        height="15"
        fill="currentColor"
        fillOpacity="0.25"
        stroke="none"
      />
    </svg>
  );
}

function HomeArt() {
  return (
    <svg {...art}>
      <rect x="5" y="30" width="38" height="12" rx="1.5" strokeDasharray="3 3" />
      <path d="M14 34V22l10-8 10 8v12" />
      <path d="M21 34v-7h6v7" />
      <path d="M36 12c2 0 3.5 1.6 3.5 3.6S38 19 36 19" opacity="0.6" />
    </svg>
  );
}
