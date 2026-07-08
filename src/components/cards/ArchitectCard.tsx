/**
 * ArchitectCard · 建築師卡片（4 種 hover 變體）
 *
 * 規格見 docs/03-元件設計/card-system.md
 *
 * 4 種 hover：
 * - L 卡：等角 3D tilt 12°
 * - M 卡：垂直浮起 -12px + scale 1.02
 * - S 卡：側向 Y 軸 6° 微旋
 * - XS 卡：整卡 flood 朱紅 + 反白文字
 */

"use client";

import { motion, type Easing } from "framer-motion";
import { cn } from "@/lib/utils";

// Easing tuples（framer-motion 嚴格要求 4-tuple）
const EASE_EMPHASIZED: Easing = [0.65, 0, 0.35, 1];
const EASE_OUT: Easing = [0, 0, 0.2, 1];

export type CardSize = "L" | "M" | "S" | "XS";

interface ArchitectCardProps {
  size: CardSize;
  name: {
    en: string;
    zh: string;
  };
  lifespan?: string;
  nationality?: string;
  movements?: string[];
  importance?: 1 | 2 | 3 | 4 | 5;
  onClick?: () => void;
  className?: string;
}

const SIZE_STYLES: Record<CardSize, React.CSSProperties> = {
  L: { gridColumn: "span 2", gridRow: "span 2", aspectRatio: "1 / 1.25" },
  M: { gridColumn: "span 1", gridRow: "span 1", aspectRatio: "1 / 1.3" },
  S: { gridColumn: "span 1", gridRow: "span 1", aspectRatio: "1 / 1" },
  XS: { gridColumn: "span 1", gridRow: "span 1", aspectRatio: "1 / 0.7" },
};

export function ArchitectCard({
  size,
  name,
  lifespan,
  nationality,
  movements = [],
  onClick,
  className,
}: ArchitectCardProps) {
  // 4 種 hover 變體
  const hoverProps =
    size === "L"
      ? {
          rotateY: -12,
          transition: { duration: 0.32, ease: EASE_EMPHASIZED },
        }
      : size === "M"
        ? {
            y: -12,
            scale: 1.02,
            transition: { duration: 0.22, ease: EASE_OUT },
          }
        : size === "S"
          ? {
              rotateY: 6,
              transition: { duration: 0.22, ease: EASE_OUT },
            }
          : {
              // XS 用 CSS class 處理 background change（framer 處理 transform）
              transition: { duration: 0.22, ease: EASE_OUT },
            };

  return (
    <motion.article
      className={cn("glass parti-card", `parti-card--${size}`, className)}
      style={{
        ...SIZE_STYLES[size],
        borderRadius: "var(--r-lg)",
        padding: size === "XS" ? "16px" : "20px 24px",
        position: "relative",
        transformStyle: "preserve-3d",
        perspective: "1000px",
        overflow: "hidden",
      }}
      whileHover={hoverProps}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`${name.en} ${name.zh}`}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          gap: "12px",
        }}
      >
        {/* 圖片 placeholder（待 AI 生圖、暫顯縮寫）*/}
        {size !== "XS" && (
          <div
            className="img-placeholder"
            style={{
              flex: 1,
              background: "var(--bg-card-base)",
              borderRadius: "var(--r-md)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-display)",
              fontWeight: 200,
              fontSize: size === "L" ? "48px" : "32px",
              color: "var(--ink-tertiary)",
              letterSpacing: "0.05em",
            }}
          >
            {name.en
              .split(" ")
              .map((w) => w[0])
              .join("")
              .slice(0, 2)}
          </div>
        )}

        {/* 名字 stack */}
        <div>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 200,
              fontSize:
                size === "L"
                  ? "28px"
                  : size === "M"
                    ? "20px"
                    : size === "S"
                      ? "18px"
                      : "16px",
              letterSpacing: "-0.01em",
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            {name.en}
          </h3>
          <p
            style={{
              fontFamily: "var(--font-cjk)",
              fontWeight: 200,
              fontSize:
                size === "L"
                  ? "20px"
                  : size === "M"
                    ? "14px"
                    : "13px",
              letterSpacing: "0.1em",
              color: "var(--ink-secondary)",
              margin: "4px 0 0",
            }}
          >
            {name.zh}
          </p>
        </div>

        {/* 副資訊 */}
        {(lifespan || nationality) && size !== "XS" && (
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--ink-tertiary)",
              margin: 0,
            }}
          >
            {[lifespan, nationality].filter(Boolean).join(" · ")}
          </p>
        )}

        {/* 流派 badges */}
        {movements.length > 0 && size === "L" && (
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {movements.slice(0, 2).map((m) => (
              <span key={m} className="badge-soft">
                {m}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}
