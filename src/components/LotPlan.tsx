const COLS = 6;
const ROWS = 3;
const BLOCK_W = 170;
const BLOCK_H = 120;
const STREET = 26;
const PAD = 40;
const LOT_COLS = 4;
const LOT_ROWS = 2;
const PARK_BLOCK = 8;

const WIDTH = PAD * 2 + COLS * BLOCK_W + (COLS - 1) * STREET;
const HEIGHT = PAD * 2 + ROWS * BLOCK_H + (ROWS - 1) * STREET;

const BOUNDARY = `M18 30 L${WIDTH * 0.52} 10 L${WIDTH - 14} 36 L${WIDTH - 10} ${HEIGHT - 26} L${WIDTH * 0.5} ${HEIGHT - 8} L14 ${HEIGHT - 30} Z`;

const HIGHLIGHTS = [5, 21, 44, 58, 97, 118, 131];

const STROKE = "#efe6d8";

type Lot = { id: number; block: number; x: number; y: number; w: number; h: number };

const BLOCKS = Array.from({ length: COLS * ROWS }, (_, block) => {
  const col = block % COLS;
  const row = Math.floor(block / COLS);
  return {
    block,
    x: PAD + col * (BLOCK_W + STREET),
    y: PAD + row * (BLOCK_H + STREET),
  };
});

const LOTS: Lot[] = BLOCKS.filter((b) => b.block !== PARK_BLOCK).flatMap(
  (b, blockIndex) => {
    const w = BLOCK_W / LOT_COLS;
    const h = BLOCK_H / LOT_ROWS;
    return Array.from({ length: LOT_COLS * LOT_ROWS }, (_, i) => ({
      id: blockIndex * LOT_COLS * LOT_ROWS + i,
      block: b.block,
      x: b.x + (i % LOT_COLS) * w,
      y: b.y + Math.floor(i / LOT_COLS) * h,
      w,
      h,
    }));
  },
);

export default function LotPlan({
  preserveAspectRatio,
  className = "",
}: {
  preserveAspectRatio?: string;
  className?: string;
}) {
  const park = BLOCKS[PARK_BLOCK];

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio={preserveAspectRatio}
      className={className}
      fill="none"
      aria-hidden
    >
      <path
        d={BOUNDARY}
        pathLength={1}
        className="lot-stroke"
        stroke={STROKE}
        strokeOpacity={0.7}
        strokeWidth={2.2}
        style={{ animationDelay: "0.2s" }}
      />

      {LOTS.map((lot) => {
        const blockDelay = 0.6 + lot.block * 0.08;
        const highlight = HIGHLIGHTS.indexOf(lot.id);

        return (
          <g key={lot.id}>
            {highlight >= 0 ? (
              <rect
                x={lot.x + 2}
                y={lot.y + 2}
                width={lot.w - 4}
                height={lot.h - 4}
                className="lot-glow"
                fill="#c4a484"
                style={{ animationDelay: `${2.8 + highlight * 0.85}s` }}
              />
            ) : null}
            <rect
              x={lot.x}
              y={lot.y}
              width={lot.w}
              height={lot.h}
              pathLength={1}
              className="lot-stroke"
              stroke={STROKE}
              strokeOpacity={0.5}
              strokeWidth={1.4}
              style={{ animationDelay: `${blockDelay}s` }}
            />
          </g>
        );
      })}

      <g
        className="lot-fade"
        style={{ animationDelay: `${0.6 + PARK_BLOCK * 0.08 + 0.4}s` }}
      >
        <rect
          x={park.x}
          y={park.y}
          width={BLOCK_W}
          height={BLOCK_H}
          rx={10}
          stroke={STROKE}
          strokeOpacity={0.45}
          strokeDasharray="4 6"
        />
        {[
          [0.25, 0.32],
          [0.5, 0.55],
          [0.75, 0.3],
          [0.32, 0.72],
          [0.7, 0.75],
        ].map(([fx, fy]) => (
          <circle
            key={`${fx}-${fy}`}
            cx={park.x + BLOCK_W * fx}
            cy={park.y + BLOCK_H * fy}
            r={9}
            stroke={STROKE}
            strokeOpacity={0.5}
          />
        ))}
      </g>
    </svg>
  );
}
