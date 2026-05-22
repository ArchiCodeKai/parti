/**
 * PyramidHero · v3 · State Machine + Decoupled Loop
 *
 * 改進（依 Kai 規格 2026-05-21）：
 *
 * State Machine：
 *   idle ──scroll>0──→ extruding ──scroll>5%──→ looping
 *     ↑                                            │
 *     │                                       scroll<2%
 *     │                                            ↓
 *     └────onComplete────  retracting  ←──────────┘
 *
 * 1. idle: 文字完全等寬等距、無三角形
 * 2. extruding (scroll-driven 0→5%): ▶ 寬度 0→0.8em、把文字往右擠
 * 3. looping (脫離 scroll、自動 4 秒循環):
 *    a. 0-12.5% (500ms): ▶ smooth fade out → ▲ pixel fade in、整體 rotate 0 → -90°
 *    b. 12.5-50% (1500ms): 10 條水平層線從底往頂 stagger fade in
 *    c. 50-65% (600ms): 3 條垂直軸線 fade in
 *    d. 65-75% (400ms): 完整顯示停頓
 *    e. 75-87.5% (500ms): 所有線 fade out
 *    f. 87.5-100% (500ms): ▲ pixel fade out → ▶ smooth fade in、rotate -90° → 0
 * 4. retracting (animated 0.6s): 寬度 0.8em→0、回 idle
 *
 * 關鍵：phase ≥ looping 後、文字位置完全鎖定、scroll 不影響（除非反向）。
 */

"use client";

import {
  useScroll,
  useMotionValue,
  useTransform,
  useMotionValueEvent,
  motion,
  animate,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Phase = "idle" | "extruding" | "looping" | "retracting";

// === SVG Path Constants ===

const SMOOTH_PATH = "M 90 50 L 10 10 L 10 90 Z";

// 像素鋸齒三角形（指右、每階 8x4、旋轉 -90° 後變金字塔）
const PIXEL_PATH = `
  M 90 50
  L 82 50 L 82 46 L 74 46 L 74 42 L 66 42 L 66 38 L 58 38 L 58 34 L 50 34 L 50 30 L 42 30 L 42 26 L 34 26 L 34 22 L 26 22 L 26 18 L 18 18 L 18 14 L 10 14
  L 10 10 L 10 90
  L 14 90 L 18 86 L 18 82 L 26 82 L 26 78 L 34 78 L 34 74 L 42 74 L 42 70 L 50 70 L 50 66 L 58 66 L 58 62 L 66 62 L 66 58 L 74 58 L 74 54 L 82 54 L 82 50 L 90 50
  Z
`;

// 水平層線（旋轉前是垂直線、旋轉 -90° 後變水平層線）
// x 越大 = 旋轉後越接近頂層、線越短
const HORIZONTAL_LAYERS = [
  { x: 14, y1: 14, y2: 86 }, // 最底層（最長）
  { x: 22, y1: 18, y2: 82 },
  { x: 30, y1: 22, y2: 78 },
  { x: 38, y1: 26, y2: 74 },
  { x: 46, y1: 30, y2: 70 },
  { x: 54, y1: 34, y2: 66 },
  { x: 62, y1: 38, y2: 62 },
  { x: 70, y1: 42, y2: 58 },
  { x: 78, y1: 46, y2: 54 },
  { x: 84, y1: 48, y2: 52 }, // 最頂層（最短）
];

// 垂直軸線（旋轉前是水平線、旋轉 -90° 後變垂直軸）
const VERTICAL_AXES = [
  { y: 50, x1: 10, x2: 90 }, // 中央主軸（最長）
  { y: 42, x1: 14, x2: 82 }, // 右對稱（旋轉後變左對稱）
  { y: 58, x1: 14, x2: 82 }, // 左對稱（旋轉後變右對稱）
];

const LOOP_DURATION = 4; // seconds
const LOOP_EASE: [number, number, number, number] = [0.65, 0, 0.35, 1];
const SCROLL_TRIGGER_THRESHOLD = 0.05;
const SCROLL_RETRACT_THRESHOLD = 0.02;

// === Component ===

export function PyramidHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const [phase, setPhase] = useState<Phase>("idle");
  const phaseRef = useRef<Phase>("idle");

  // 同步 ref 跟 state（每次 render 都更新、避免 stale closure）
  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  // Motion values
  const triangleWidthEm = useMotionValue(0);
  const triangleWidthStyle = useTransform(triangleWidthEm, (v) => `${v}em`);

  // State machine
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const current = phaseRef.current;

    if (current === "idle" || current === "extruding") {
      if (latest <= SCROLL_TRIGGER_THRESHOLD) {
        // Scroll-driven 擠出
        const t = Math.max(0, latest / SCROLL_TRIGGER_THRESHOLD);
        triangleWidthEm.set(t * 0.8);

        if (latest > 0.001 && current === "idle") {
          phaseRef.current = "extruding";
          setPhase("extruding");
        } else if (latest <= 0.001 && current === "extruding") {
          phaseRef.current = "idle";
          setPhase("idle");
        }
      } else {
        // 超過 5% → 進入 looping、鎖定寬度
        phaseRef.current = "looping";
        setPhase("looping");
        animate(triangleWidthEm, 0.8, {
          duration: 0.25,
          ease: LOOP_EASE,
        });
      }
    } else if (current === "looping") {
      if (latest < SCROLL_RETRACT_THRESHOLD) {
        // 開始 retracting
        phaseRef.current = "retracting";
        setPhase("retracting");
        animate(triangleWidthEm, 0, {
          duration: 0.6,
          ease: LOOP_EASE,
          onComplete: () => {
            if (phaseRef.current === "retracting") {
              phaseRef.current = "idle";
              setPhase("idle");
            }
          },
        });
      }
    } else if (current === "retracting") {
      // Retracting 期間用戶又往下 scroll、中斷縮回、回 looping
      if (latest > SCROLL_TRIGGER_THRESHOLD) {
        phaseRef.current = "looping";
        setPhase("looping");
        animate(triangleWidthEm, 0.8, {
          duration: 0.3,
          ease: LOOP_EASE,
        });
      }
    }
  });

  return (
    <section
      ref={containerRef}
      style={{ minHeight: "200vh", position: "relative" }}
    >
      <div
        className="sticky top-0 flex items-center justify-center"
        style={{ height: "100vh" }}
      >
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 200,
            fontSize: "var(--text-mega)",
            letterSpacing: "0.02em",
            lineHeight: 1.0,
            display: "flex",
            alignItems: "center",
            whiteSpace: "nowrap",
            margin: 0,
          }}
        >
          <span>一</span>
          <span style={{ marginInlineStart: "0.5em" }}>部</span>
          <span style={{ marginInlineStart: "0.5em" }}>建</span>
          <span style={{ marginInlineStart: "0.5em" }}>築</span>

          {/* Triangle / Pyramid 容器
              idle: width 0、不佔空間
              extruding/looping/retracting: width 由 motion value 控制 */}
          <motion.span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: triangleWidthStyle,
              height: "0.8em",
              overflow: "visible",
              position: "relative",
              flexShrink: 0,
            }}
            aria-hidden="true"
          >
            {phase === "looping" ? <LoopingPyramid /> : <SmoothTriangle />}
          </motion.span>

          <span style={{ marginInlineStart: "0.5em" }}>圖</span>
          <span style={{ marginInlineStart: "0.5em" }}>鑑</span>
        </h1>
      </div>
    </section>
  );
}

// === Sub-components ===

/** Smooth ▶ triangle（idle / extruding / retracting 用） */
function SmoothTriangle() {
  return (
    <svg
      viewBox="0 0 100 100"
      style={{ width: "100%", height: "100%", overflow: "visible" }}
      preserveAspectRatio="xMidYMid meet"
    >
      <path d={SMOOTH_PATH} fill="var(--accent-red)" />
    </svg>
  );
}

/** 永久 4 秒循環的 ▶ ↔ ▲ 動畫 */
function LoopingPyramid() {
  return (
    <svg
      viewBox="0 0 100 100"
      style={{ width: "100%", height: "100%", overflow: "visible" }}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* 整個 group 旋轉：0 → -90 → -90 → 0 */}
      <motion.g
        animate={{ rotate: [0, -90, -90, 0] }}
        transition={{
          duration: LOOP_DURATION,
          times: [0, 0.125, 0.875, 1],
          repeat: Infinity,
          ease: LOOP_EASE,
        }}
        style={{ transformOrigin: "50px 50px" }}
      >
        {/* Smooth ▶ path：opacity 1 → 0 → 0 → 1 */}
        <motion.path
          d={SMOOTH_PATH}
          fill="var(--accent-red)"
          animate={{ opacity: [1, 0, 0, 1] }}
          transition={{
            duration: LOOP_DURATION,
            times: [0, 0.125, 0.875, 1],
            repeat: Infinity,
            ease: LOOP_EASE,
          }}
        />

        {/* Pixel ▶ path：opacity 0 → 1 → 1 → 0 */}
        <motion.path
          d={PIXEL_PATH}
          fill="var(--accent-red)"
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{
            duration: LOOP_DURATION,
            times: [0, 0.125, 0.875, 1],
            repeat: Infinity,
            ease: LOOP_EASE,
          }}
        />

        {/* 水平層線：從底層 (i=0) 開始 stagger、12.5% → 50% 期間依序 fade in */}
        {HORIZONTAL_LAYERS.map((line, i) => {
          const stagger = 0.125 + (i / HORIZONTAL_LAYERS.length) * 0.375;
          return (
            <motion.line
              key={`h-${i}`}
              x1={line.x}
              y1={line.y1}
              x2={line.x}
              y2={line.y2}
              stroke="rgba(252, 251, 248, 0.85)"
              strokeWidth={0.6}
              strokeLinecap="square"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
              transition={{
                duration: LOOP_DURATION,
                times: [0, stagger, stagger + 0.04, 0.75, 0.85, 1],
                repeat: Infinity,
                ease: "linear",
              }}
            />
          );
        })}

        {/* 垂直軸線：50% → 65% 期間 fade in */}
        {VERTICAL_AXES.map((line, i) => {
          const stagger = 0.5 + (i / VERTICAL_AXES.length) * 0.15;
          return (
            <motion.line
              key={`v-${i}`}
              x1={line.x1}
              y1={line.y}
              x2={line.x2}
              y2={line.y}
              stroke="rgba(252, 251, 248, 0.6)"
              strokeWidth={0.4}
              strokeLinecap="square"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
              transition={{
                duration: LOOP_DURATION,
                times: [0, stagger, stagger + 0.04, 0.78, 0.85, 1],
                repeat: Infinity,
                ease: "linear",
              }}
            />
          );
        })}
      </motion.g>
    </svg>
  );
}
