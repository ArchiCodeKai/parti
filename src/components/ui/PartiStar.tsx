/**
 * PARTI Star · 12 角放射星
 *
 * 通用裝飾 / 跳轉符號 / 載入 / 角落 / CTA 前綴。
 * 詳細規格見 docs/03-元件設計/parti-star.md。
 */

import { CSSProperties } from "react";

export type PartiStarSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl";

export type PartiStarColor =
  | "tertiary"
  | "primary"
  | "accent-red"
  | "accent-cyan"
  | "soft";

export type PartiStarAnimation =
  | "static"
  | "breathe"
  | "spin"
  | "pulse"
  | "hover-rotate"
  | "page-transition";

interface PartiStarProps {
  size?: PartiStarSize;
  color?: PartiStarColor;
  animation?: PartiStarAnimation;
  className?: string;
  style?: CSSProperties;
}

const PATH_D =
  "M 152 70.059 L 201.539 20.519 L 235.48 54.461 L 185.941 104 L 256 104 L 256 152 L 185.941 152 L 235.48 201.539 L 201.539 235.48 L 152 185.941 L 152 256 L 104 256 L 104 185.941 L 54.46 235.48 L 20.52 201.539 L 70.059 152 L 0 152 L 0 104 L 70.059 104 L 20.519 54.46 L 54.461 20.52 L 104 70.059 L 104 0 L 152 0 Z";

export function PartiStar({
  size = "md",
  color = "tertiary",
  animation = "static",
  className = "",
  style,
}: PartiStarProps) {
  const classes = [
    "parti-star",
    `parti-star--${size}`,
    `parti-star--${color}`,
    animation !== "static" ? `parti-star--${animation}` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <svg
      className={classes}
      style={style}
      viewBox="0 0 256 256"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d={PATH_D} />
    </svg>
  );
}
