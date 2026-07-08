/**
 * 通用 helpers
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind class merge helper
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 取得 architect 的「主流派」（weight = primary、第一個）
 */
export function getPrimaryMovement(
  architect: { movements: Array<{ id: string; weight: string }> },
): string | undefined {
  return architect.movements.find((m) => m.weight === "primary")?.id;
}

/**
 * N → 幾何映射（依人數決定使用哪種幾何）
 */
export type GeometryType =
  | "concentric"
  | "bisector"
  | "circumcircle"
  | "delaunay"
  | "voronoi"
  | "force-graph";

export function nToGeometry(n: number): GeometryType {
  if (n === 1) return "concentric";
  if (n === 2) return "bisector";
  if (n === 3) return "circumcircle";
  if (n <= 6) return "delaunay";
  if (n <= 12) return "voronoi";
  return "force-graph";
}

/**
 * 生卒年格式化。在世者卒年為哨兵值 2099，顯示為「1929–」；已故顯示「1887–1965」。
 * 收斂散落各頁的 `lifespan[1] >= 2099` 判斷。
 */
export function formatLifespan(lifespan: [number, number]): string {
  const [start, end] = lifespan;
  return end >= 2099 ? `${start}–` : `${start}–${end}`;
}
