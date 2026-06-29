/**
 * PyramidHero · v5 · Formula-generated 3D pixel pyramid
 *
 * Geometry source of truth:
 *   A  = apex
 *   FL = front-left base corner
 *   FR = front-right base corner
 *   BR = back-right base corner
 *
 * Visible faces:
 *   front face = triangle(A, FL, FR)
 *   side face  = triangle(A, FR, BR)
 *
 * Each layer is projected independently onto each face by interpolating between
 * the two visible face edges at the same t. The shared edge A -> FR is the
 * structural line that creates volume without changing the material language.
 */

"use client";

import {
  animate,
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import type { MotionValue } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const MIN_BLOCKS = 2;
const DESKTOP_PYRAMID = {
  layers: 18,
  maxBlocks: 26,
};
const MOBILE_PYRAMID = {
  layers: 14,
  maxBlocks: 18,
};
const VIEWBOX = {
  minX: -190,
  minY: 0,
  width: 390,
  height: 370,
};
const A = { x: -14, y: 8 };
const BASE_Y = 332;
const BASE_HALF_SIZE = 122;
const DEPTH_X = 0.72;
const INITIAL_YAW = 42;
const A3 = { x: 0, y: 0, z: 0 };
const FL3 = { x: -BASE_HALF_SIZE, y: BASE_Y, z: -BASE_HALF_SIZE };
const FR3 = { x: BASE_HALF_SIZE, y: BASE_Y, z: -BASE_HALF_SIZE };
const BR3 = { x: BASE_HALF_SIZE, y: BASE_Y, z: BASE_HALF_SIZE };
const BL3 = { x: -BASE_HALF_SIZE, y: BASE_Y, z: BASE_HALF_SIZE };

type PixelBlock = {
  id: string;
  corners: Point3D[];
  fill: string;
  order: number;
  tone: FaceTone;
};

type FaceTone = "front" | "right" | "back" | "left";

type Point = {
  x: number;
  y: number;
};

type Point3D = Point & {
  z: number;
};

type PixelLayer = {
  index: number;
  blocks: PixelBlock[];
};

const FACE_RENDER_ORDER: FaceTone[] = ["back", "left", "right", "front"];

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const easeOutCubic = (value: number) => 1 - (1 - value) ** 3;

function seededUnit(index: number, blockIndex: number) {
  const n = Math.sin(index * 127.1 + blockIndex * 311.7) * 43758.5453;
  return n - Math.floor(n);
}

function interpolate(
  from: Point3D,
  to: Point3D,
  t: number,
) {
  return {
    x: from.x + (to.x - from.x) * t,
    y: from.y + (to.y - from.y) * t,
    z: from.z + (to.z - from.z) * t,
  };
}

function pointOnFace3D({
  t,
  s,
  leftBase,
  rightBase,
}: {
  t: number;
  s: number;
  leftBase: Point3D;
  rightBase: Point3D;
}) {
  const left = interpolate(A3, leftBase, t);
  const right = interpolate(A3, rightBase, t);
  return interpolate(left, right, s);
}

function pointsToPolygon(points: Array<{ x: number; y: number }>) {
  return points
    .map((point) => `${point.x.toFixed(2)},${point.y.toFixed(2)}`)
    .join(" ");
}

function faceBlockCorners({
  t0,
  t1,
  s0,
  s1,
  leftBase,
  rightBase,
}: {
  t0: number;
  t1: number;
  s0: number;
  s1: number;
  leftBase: Point3D;
  rightBase: Point3D;
}) {
  return [
    pointOnFace3D({ t: t0, s: s0, leftBase, rightBase }),
    pointOnFace3D({ t: t0, s: s1, leftBase, rightBase }),
    pointOnFace3D({ t: t1, s: s1, leftBase, rightBase }),
    pointOnFace3D({ t: t1, s: s0, leftBase, rightBase }),
  ];
}

function projectPoint(point: Point3D, yawValue: number) {
  const yaw = yawValue * Math.PI / 180;
  const cos = Math.cos(yaw);
  const sin = Math.sin(yaw);
  const rotatedX = point.x * cos - point.z * sin;
  const rotatedZ = point.x * sin + point.z * cos;

  return {
    x: A.x + rotatedX + rotatedZ * DEPTH_X,
    y: A.y + point.y,
  };
}

function projectPolygon(
  corners: Point3D[],
  yawValue: number,
) {
  return pointsToPolygon(
    corners.map((point) => projectPoint(point, yawValue)),
  );
}

function projectedPath(points: Point3D[], yawValue: number) {
  return points
    .map((point, index) => {
      const projected = projectPoint(point, yawValue);
      return `${index === 0 ? "M" : "L"} ${projected.x.toFixed(2)} ${projected.y.toFixed(2)}`;
    })
    .join(" ");
}

function buildFaceBlocks({
  layerIndex,
  layerCount,
  blocks,
  leftBase,
  rightBase,
  tone,
  blockOffset,
  orderStart,
  orderByIndex,
}: {
  layerIndex: number;
  layerCount: number;
  blocks: number;
  leftBase: Point3D;
  rightBase: Point3D;
  tone: FaceTone;
  blockOffset: number;
  orderStart: number;
  orderByIndex: (index: number) => number;
}) {
  const t0 = layerIndex / layerCount;
  const t1 = (layerIndex + 1) / layerCount;
  const tGap = Math.min(0.18 / layerCount, (t1 - t0) * 0.18);
  const sGap = Math.min(0.16, 0.42 / blocks);
  const safeT0 = t0 + tGap;
  const safeT1 = t1 - tGap;

  return Array.from({ length: blocks }, (_, j) => {
    const variation = seededUnit(layerIndex, j + blockOffset);
    const s0 = j / blocks + sGap / 2;
    const s1 = (j + 1) / blocks - sGap / 2;
    const frontFill = {
      red: 166 + Math.round(variation * 20),
      green: 36 + Math.round(variation * 10),
      blue: 28 + Math.round(variation * 8),
    };
    const shadeByFace: Record<FaceTone, number> = {
      front: 1,
      right: 0.82,
      back: 0.72,
      left: 0.9,
    };
    const faceShade = shadeByFace[tone];
    const shadedFill = {
      red: Math.round(frontFill.red * faceShade),
      green: Math.round(frontFill.green * faceShade),
      blue: Math.round(frontFill.blue * faceShade),
    };
    const sideFill = {
      red: 132 + Math.round(variation * 16),
      green: 31 + Math.round(variation * 8),
      blue: 31 + Math.round(variation * 8),
    };
    const fill = tone === "right" ? sideFill : shadedFill;

    return {
      id: `${tone}-${layerIndex}-${j}`,
      order: orderStart + orderByIndex(j),
      tone,
      corners: faceBlockCorners({
        t0: safeT0,
        t1: safeT1,
        s0,
        s1,
        leftBase,
        rightBase,
      }),
      fill: `rgb(${fill.red} ${fill.green} ${fill.blue})`,
    };
  });
}

function buildPixelPyramidLayers({
  layerCount,
  minBlocks,
  maxBlocks,
}: {
  layerCount: number;
  minBlocks: number;
  maxBlocks: number;
}): PixelLayer[] {
  const layerBlockCounts = Array.from({ length: layerCount }, (_, i) => {
    const face = Math.round(
      minBlocks + (maxBlocks - minBlocks) * i / (layerCount - 1),
    );
    return { face, total: face * 4 };
  });
  const faceEdges: Array<{
    tone: FaceTone;
    leftBase: Point3D;
    rightBase: Point3D;
    blockOffset: number;
  }> = [
    { tone: "front", leftBase: FL3, rightBase: FR3, blockOffset: 0 },
    { tone: "right", leftBase: FR3, rightBase: BR3, blockOffset: 91 },
    { tone: "back", leftBase: BR3, rightBase: BL3, blockOffset: 181 },
    { tone: "left", leftBase: BL3, rightBase: FL3, blockOffset: 271 },
  ];

  return Array.from({ length: layerCount }, (_, i) => {
    const { face: faceBlocks } = layerBlockCounts[i];
    const orderStart = layerBlockCounts
      .slice(i + 1)
      .reduce((sum, layer) => sum + layer.total, 0);

    return {
      index: i,
      blocks: faceEdges.flatMap((face, faceIndex) =>
        buildFaceBlocks({
          layerIndex: i,
          layerCount,
          blocks: faceBlocks,
          leftBase: face.leftBase,
          rightBase: face.rightBase,
          tone: face.tone,
          blockOffset: face.blockOffset,
          orderStart,
          orderByIndex: (blockIndex) => faceIndex * faceBlocks + blockIndex,
        }),
      ),
    };
  });
}

function usePyramidDensity() {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 720px)");
    const update = () => setIsCompact(query.matches);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return isCompact ? MOBILE_PYRAMID : DESKTOP_PYRAMID;
}

export function PyramidHero() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const revealProgress = useMotionValue(0);
  const buildProgress = useMotionValue(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const pyramidPresence = useTransform(
    revealProgress,
    [0, 0.42, 1],
    [0, 0.72, 1],
  );
  const pyramidWidth = useTransform(
    revealProgress,
    (value) => `${clamp01(value) * 1.18}em`,
  );
  const heroDriftY = useTransform(scrollYProgress, [0, 0.72, 1], [0, 28, 34]);
  const heroBlur = useTransform(scrollYProgress, [0, 0.18, 0.62, 1], [0, 0.85, 0.28, 0]);
  const heroBrightness = useTransform(scrollYProgress, [0, 0.2, 0.62, 1], [1, 1.08, 1.03, 1]);
  const heroFilter = useMotionTemplate`blur(${heroBlur}px) brightness(${heroBrightness})`;
  const sheenOpacity = useTransform(scrollYProgress, [0, 0.1, 0.48, 0.82], [0, 0.22, 0.14, 0]);
  const sheenX = useTransform(scrollYProgress, [0, 0.82], ["-38%", "118%"]);

  useEffect(() => {
    let revealAnimation: { stop: () => void } | null = null;
    let buildAnimation: { stop: () => void } | null = null;
    let buildTimer = 0;

    const startTimer = window.setTimeout(() => {
      if (shouldReduceMotion) {
        revealProgress.set(1);
        buildProgress.set(1);
        return;
      }

      revealProgress.set(0);
      buildProgress.set(0);

      revealAnimation = animate(revealProgress, 1, {
        duration: 1.45,
        ease: [0.33, 1, 0.68, 1],
      });

      buildTimer = window.setTimeout(() => {
        buildAnimation = animate(buildProgress, 1, {
          duration: 8.4,
          ease: [0.22, 1, 0.36, 1],
        });
      }, 620);
    }, 500);

    return () => {
      window.clearTimeout(startTimer);
      window.clearTimeout(buildTimer);
      revealAnimation?.stop();
      buildAnimation?.stop();
    };
  }, [buildProgress, revealProgress, shouldReduceMotion]);

  return (
    <section
      ref={sectionRef}
      style={{ minHeight: "170vh", position: "relative" }}
    >
      <div
        className="pyramid-hero-sticky sticky top-0 flex items-center justify-center"
        style={{ height: "100vh" }}
      >
        <motion.span
          className="pyramid-hero-sheen"
          style={{ opacity: sheenOpacity, x: sheenX }}
          aria-hidden="true"
        />
        <motion.h1
          className="pyramid-hero-title"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 200,
            letterSpacing: "0.02em",
            lineHeight: 1,
            display: "flex",
            alignItems: "center",
            whiteSpace: "nowrap",
            margin: 0,
            y: shouldReduceMotion ? 0 : heroDriftY,
            filter: shouldReduceMotion ? "none" : heroFilter,
          }}
        >
          <span>一</span>
          <span>部</span>
          <span>建</span>
          <span>築</span>

          <motion.span
            className="pixel-pyramid-slot"
            style={{ opacity: pyramidPresence, width: pyramidWidth }}
            aria-hidden="true"
          >
            <FormulaPixelPyramid
              progress={buildProgress}
              reducedMotion={shouldReduceMotion}
            />
          </motion.span>

          <span>圖</span>
          <span>鑑</span>
        </motion.h1>
        <motion.div
          className="pyramid-hero-meta huk-hidden is-visible"
          style={{ y: shouldReduceMotion ? 0 : heroDriftY }}
        >
          <p>PARTI · An Atlas of Modern Architecture</p>
          <p>Scroll ↓ 200+ entries</p>
        </motion.div>
      </div>
    </section>
  );
}

function FormulaPixelPyramid({
  progress,
  reducedMotion,
}: {
  progress: MotionValue<number>;
  reducedMotion: boolean | null;
}) {
  const density = usePyramidDensity();
  const layers = useMemo(
    () =>
      buildPixelPyramidLayers({
        layerCount: density.layers,
        minBlocks: MIN_BLOCKS,
        maxBlocks: density.maxBlocks,
      }),
    [density],
  );
  const totalBlocks = useMemo(
    () =>
      layers.reduce(
        (sum, layer) => sum + layer.blocks.length,
        0,
      ),
    [layers],
  );
  const blocksByFace = useMemo(() => {
    const next: Record<FaceTone, PixelBlock[]> = {
      front: [],
      right: [],
      back: [],
      left: [],
    };

    for (const layer of layers) {
      for (const block of layer.blocks) {
        next[block.tone].push(block);
      }
    }

    return next;
  }, [layers]);
  const yaw = useMotionValue(INITIAL_YAW);
  const rotateZ = useMotionValue(0);
  const progressRef = useRef(0);

  useMotionValueEvent(progress, "change", (value) => {
    progressRef.current = value;

    if (value < 0.5) {
      yaw.set(INITIAL_YAW);
      rotateZ.set(0);
    }
  });

  useAnimationFrame((elapsed) => {
    if (reducedMotion) {
      return;
    }

    const currentProgress = progressRef.current;

    if (currentProgress < 0.5) {
      return;
    }

    const rotationGate = clamp01((currentProgress - 0.5) * 2);
    const angle = (elapsed / 18000 * 360) % 360;
    yaw.set(INITIAL_YAW + angle * rotationGate);
    rotateZ.set(Math.sin(elapsed / 7600) * 0.35 * rotationGate);
  });
  const rotateZDeg = useTransform(rotateZ, (value) => `${value}deg`);
  const rotorTransform = useMotionTemplate`rotate(${rotateZDeg})`;
  const guideOpacity = useTransform(progress, [0, 0.42, 0.86], [0, 0, 0.34]);
  const guideLength = useTransform(progress, [0.32, 1], [0, 1]);
  const sharedEdgeOpacity = useTransform(progress, [0.46, 0.72], [0, 1]);
  const sharedEdgeLength = useTransform(progress, [0.46, 0.82], [0, 1]);
  const baseEdgeOpacity = useTransform(progress, [0.03, 0.22], [0, 1]);
  const baseEdgeLength = useTransform(progress, [0.03, 0.28], [0, 1]);
  const guidePath = useTransform(yaw, (value) =>
    `${projectedPath([A3, FL3, FR3, BR3, BL3, FL3], value)} ${projectedPath([A3, FR3], value)} ${projectedPath([A3, BR3], value)} ${projectedPath([A3, BL3], value)}`,
  );
  const sharedEdgePath = useTransform(yaw, (value) =>
    projectedPath([A3, FR3], value),
  );
  const baseEdgePath = useTransform(yaw, (value) =>
    projectedPath([FL3, FR3, BR3, BL3, FL3], value),
  );

  return (
    <motion.span
      className="pixel-pyramid-rotor"
      style={{ transform: rotorTransform }}
    >
      <svg
        className="pixel-pyramid-svg"
        viewBox={`${VIEWBOX.minX} ${VIEWBOX.minY} ${VIEWBOX.width} ${VIEWBOX.height}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Formula-generated three-dimensional pixel pyramid"
      >
        <motion.path
          d={guidePath}
          className="pixel-pyramid-guide"
          pathLength={1}
          style={{ opacity: guideOpacity, pathLength: guideLength }}
        />
        {FACE_RENDER_ORDER.map((tone) => (
          <PixelPyramidFace
            key={tone}
            tone={tone}
            blocks={blocksByFace[tone]}
            totalBlocks={totalBlocks}
            progress={progress}
            yaw={yaw}
          />
        ))}
        <motion.path
          d={sharedEdgePath}
          className="pixel-pyramid-shared-edge"
          pathLength={1}
          style={{ opacity: sharedEdgeOpacity, pathLength: sharedEdgeLength }}
        />
        <motion.path
          d={baseEdgePath}
          className="pixel-pyramid-base-edge"
          pathLength={1}
          style={{ opacity: baseEdgeOpacity, pathLength: baseEdgeLength }}
        />
      </svg>
    </motion.span>
  );
}

function PixelPyramidFace({
  tone,
  blocks,
  totalBlocks,
  progress,
  yaw,
}: {
  tone: FaceTone;
  blocks: PixelBlock[];
  totalBlocks: number;
  progress: MotionValue<number>;
  yaw: MotionValue<number>;
}) {
  const faceVisibility = useTransform(yaw, (value) => {
    const angle = value * Math.PI / 180;
    const phaseByFace: Record<FaceTone, number> = {
      front: 0,
      right: Math.PI / 2,
      back: Math.PI,
      left: Math.PI * 1.5,
    };
    const facing = clamp01((Math.cos(angle - phaseByFace[tone]) + 0.16) / 1.16);
    return 0.22 + facing * 0.78;
  });
  const brightness = useTransform(yaw, (value) => {
    const angle = value * Math.PI / 180;
    const phaseByFace: Record<FaceTone, number> = {
      front: 0,
      right: Math.PI / 2,
      back: Math.PI,
      left: Math.PI * 1.5,
    };
    const delta = Math.cos(angle - phaseByFace[tone]) * 0.08;
    return 1 + delta;
  });
  const faceFilter = useMotionTemplate`brightness(${brightness})`;

  return (
    <motion.g
      className="pixel-pyramid-face"
      style={{ opacity: faceVisibility, filter: faceFilter }}
    >
      {blocks.map((block) => (
        <PixelPyramidBlock
          key={block.id}
          block={block}
          totalBlocks={totalBlocks}
          progress={progress}
          yaw={yaw}
        />
      ))}
    </motion.g>
  );
}

function PixelPyramidBlock({
  block,
  totalBlocks,
  progress,
  yaw,
}: {
  block: PixelBlock;
  totalBlocks: number;
  progress: MotionValue<number>;
  yaw: MotionValue<number>;
}) {
  const blockProgress = useTransform(progress, (value) => {
    const eased = easeOutCubic(clamp01(value));
    const local = (eased - block.order / totalBlocks) * totalBlocks;
    return clamp01(local);
  });
  const points = useTransform(yaw, (value) =>
    projectPolygon(block.corners, value),
  );

  return (
    <motion.polygon
      points={points}
      fill={block.fill}
      style={{ opacity: blockProgress }}
    />
  );
}
