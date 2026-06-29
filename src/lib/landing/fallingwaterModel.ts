export type FallingwaterBoxKind =
  | "slab"
  | "stone-core"
  | "glass-band"
  | "terrain";

export type FallingwaterBoxPart = {
  id: string;
  kind: FallingwaterBoxKind;
  position: readonly [number, number, number];
  size: readonly [number, number, number];
  tone: number;
  opacity?: number;
};

export type FallingwaterLinePart = {
  id: string;
  kind: "water-line" | "contour-line";
  points: readonly (readonly [number, number, number])[];
  tone: number;
  opacity?: number;
};

export type FallingwaterModelParts = {
  boxes: readonly FallingwaterBoxPart[];
  lines: readonly FallingwaterLinePart[];
};

export type FallingwaterModelSummary = {
  slabs: number;
  stoneCores: number;
  glassBands: number;
  terrainBlocks: number;
  waterLines: number;
};

export const FALLINGWATER_MODEL_PARTS = {
  boxes: [
    {
      id: "terrain-left",
      kind: "terrain",
      position: [-1.92, -1.02, 0.28],
      size: [2.6, 0.28, 1.28],
      tone: 0.82,
    },
    {
      id: "terrain-center",
      kind: "terrain",
      position: [-0.24, -1.18, -0.08],
      size: [2.52, 0.34, 1.56],
      tone: 0.76,
    },
    {
      id: "terrain-right",
      kind: "terrain",
      position: [1.78, -1.07, -0.18],
      size: [2.18, 0.26, 1.12],
      tone: 0.86,
    },
    {
      id: "terrain-water-shelf",
      kind: "terrain",
      position: [0.36, -1.48, 0.62],
      size: [1.18, 0.18, 0.72],
      tone: 0.72,
    },
    {
      id: "stone-core-main",
      kind: "stone-core",
      position: [-0.98, 0.08, -0.22],
      size: [0.52, 2.7, 0.58],
      tone: 0.58,
    },
    {
      id: "stone-core-side",
      kind: "stone-core",
      position: [-0.55, -0.02, -0.44],
      size: [0.32, 2.34, 0.44],
      tone: 0.64,
    },
    {
      id: "slab-lower-long",
      kind: "slab",
      position: [0.18, -0.42, 0.16],
      size: [4.62, 0.18, 1.18],
      tone: 0.93,
    },
    {
      id: "slab-lower-left",
      kind: "slab",
      position: [-1.42, -0.18, 0.42],
      size: [2.46, 0.16, 0.92],
      tone: 0.9,
    },
    {
      id: "slab-middle-main",
      kind: "slab",
      position: [0.56, 0.18, -0.08],
      size: [4.08, 0.16, 1.04],
      tone: 0.96,
    },
    {
      id: "slab-middle-right",
      kind: "slab",
      position: [1.62, 0.46, -0.36],
      size: [2.28, 0.15, 0.84],
      tone: 0.88,
    },
    {
      id: "slab-roof",
      kind: "slab",
      position: [0.22, 0.98, -0.2],
      size: [3.22, 0.16, 0.92],
      tone: 0.94,
    },
    {
      id: "slab-top-cap",
      kind: "slab",
      position: [0.48, 1.34, -0.34],
      size: [2.08, 0.12, 0.66],
      tone: 0.9,
    },
    {
      id: "glass-lower-band",
      kind: "glass-band",
      position: [0.72, -0.22, -0.43],
      size: [2.58, 0.32, 0.035],
      tone: 0.4,
      opacity: 0.34,
    },
    {
      id: "glass-middle-band",
      kind: "glass-band",
      position: [0.92, 0.38, -0.58],
      size: [2.72, 0.28, 0.035],
      tone: 0.34,
      opacity: 0.32,
    },
    {
      id: "glass-upper-band",
      kind: "glass-band",
      position: [0.56, 1.1, -0.54],
      size: [1.72, 0.24, 0.035],
      tone: 0.3,
      opacity: 0.3,
    },
  ] satisfies readonly FallingwaterBoxPart[],
  lines: [
    {
      id: "water-front",
      kind: "water-line",
      points: [
        [0.12, -0.42, 0.74],
        [0.04, -0.72, 0.78],
        [-0.08, -1.02, 0.8],
        [-0.04, -1.42, 0.76],
      ],
      tone: 0.55,
      opacity: 0.5,
    },
    {
      id: "water-center",
      kind: "water-line",
      points: [
        [0.28, -0.38, 0.82],
        [0.2, -0.78, 0.86],
        [0.12, -1.08, 0.84],
        [0.22, -1.46, 0.78],
      ],
      tone: 0.46,
      opacity: 0.42,
    },
    {
      id: "water-rear",
      kind: "water-line",
      points: [
        [0.46, -0.46, 0.68],
        [0.38, -0.86, 0.72],
        [0.46, -1.18, 0.68],
        [0.42, -1.42, 0.62],
      ],
      tone: 0.62,
      opacity: 0.34,
    },
    {
      id: "contour-left",
      kind: "contour-line",
      points: [
        [-2.5, -0.82, 0.88],
        [-1.42, -0.68, 0.78],
        [-0.32, -0.78, 0.92],
      ],
      tone: 0.68,
      opacity: 0.26,
    },
    {
      id: "contour-right",
      kind: "contour-line",
      points: [
        [0.72, -0.86, -0.92],
        [1.68, -0.72, -0.82],
        [2.64, -0.92, -0.68],
      ],
      tone: 0.7,
      opacity: 0.24,
    },
  ] satisfies readonly FallingwaterLinePart[],
} satisfies FallingwaterModelParts;

export const FALLINGWATER_INTERACTION = {
  dragAction: "rotate",
  wheelAction: "zoom",
  middleClickAction: "none",
  minZoom: 0.72,
  maxZoom: 1.42,
  maxYaw: 0.62,
  maxPitch: 0.3,
  defaultRotation: [-0.22, -0.5, 0] as const,
};

export function getFallingwaterModelSummary(
  parts: FallingwaterModelParts,
): FallingwaterModelSummary {
  return {
    slabs: parts.boxes.filter((part) => part.kind === "slab").length,
    stoneCores: parts.boxes.filter((part) => part.kind === "stone-core").length,
    glassBands: parts.boxes.filter((part) => part.kind === "glass-band").length,
    terrainBlocks: parts.boxes.filter((part) => part.kind === "terrain").length,
    waterLines: parts.lines.filter((part) => part.kind === "water-line").length,
  };
}

