/**
 * RelationGeometry 幾何運算（純函式、確定性、可測）
 *
 * 點位規則：角度 = 出生年在群體中的排序均分 360°，
 * 半徑 = 基準 120 × (1 ± 離散度貢獻)。禁止 Math.random。
 * N=3 用外心公式、N≥4 用 d3-delaunay。離散度由呼叫端算好傳入
 * （幾何模組不負責 domain 計算，見技術規格書 §4、AD-6）。
 *
 * 註：本檔為 node:test 直接載入的純模組，只依賴 d3-delaunay 與型別匯入
 *（型別會被剝除），不做 `@/` 值匯入以確保 `node --test` 可解析。
 */

import { Delaunay } from "d3-delaunay";
import type { Architect } from "@/types/entity";

export interface Pt {
  x: number;
  y: number;
}

/** 基準半徑（px，對應 size=400 的視窗） */
const BASE_RADIUS = 120;

/**
 * 依建築師群體算出確定性點位。
 * 角度由出生年排序決定（同年以原順序穩定排序）、半徑受離散度調變。
 */
export function layoutPoints(
  architects: Architect[],
  size: number,
  dispersion: number,
): Pt[] {
  const n = architects.length;
  const cx = size / 2;
  const cy = size / 2;
  if (n === 0) return [];
  if (n === 1) return [{ x: cx, y: cy }];

  const years = architects.map((a) => a.lifespan[0]);
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);
  const span = maxYear - minYear || 1;

  // 出生年排序 → 每位建築師的 rank
  const rankOf = new Array<number>(n);
  architects
    .map((a, i) => ({ i, year: a.lifespan[0] }))
    .sort((a, b) => a.year - b.year || a.i - b.i)
    .forEach((o, rank) => {
      rankOf[o.i] = rank;
    });

  return architects.map((a, i) => {
    const angle = (rankOf[i] / n) * Math.PI * 2 - Math.PI / 2;
    // 該點出生年在群體中的相對位置（0..1）作為離散度貢獻
    const norm = (a.lifespan[0] - minYear) / span;
    const r = BASE_RADIUS * (1 + (norm - 0.5) * dispersion);
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  });
}

export interface Circumcircle {
  cx: number;
  cy: number;
  r: number;
}

/** 三點外接圓（外心公式）。三點共線回傳 null。 */
export function circumcircle(a: Pt, b: Pt, c: Pt): Circumcircle | null {
  const d = 2 * (a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.y));
  if (Math.abs(d) < 1e-9) return null;

  const a2 = a.x * a.x + a.y * a.y;
  const b2 = b.x * b.x + b.y * b.y;
  const c2 = c.x * c.x + c.y * c.y;

  const ux = (a2 * (b.y - c.y) + b2 * (c.y - a.y) + c2 * (a.y - b.y)) / d;
  const uy = (a2 * (c.x - b.x) + b2 * (a.x - c.x) + c2 * (b.x - a.x)) / d;
  return { cx: ux, cy: uy, r: Math.hypot(a.x - ux, a.y - uy) };
}

/** Delaunay 三角網的唯一邊（i<j 去重）。 */
export function delaunayEdges(points: Pt[]): Array<[Pt, Pt]> {
  if (points.length < 3) return [];
  const delaunay = Delaunay.from(
    points,
    (p) => p.x,
    (p) => p.y,
  );
  const { triangles } = delaunay;
  const seen = new Set<string>();
  const edges: Array<[Pt, Pt]> = [];
  for (let t = 0; t < triangles.length; t += 3) {
    const tri = [triangles[t], triangles[t + 1], triangles[t + 2]];
    for (let e = 0; e < 3; e++) {
      const i = tri[e];
      const j = tri[(e + 1) % 3];
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (!seen.has(key)) {
        seen.add(key);
        edges.push([points[i], points[j]]);
      }
    }
  }
  return edges;
}

/**
 * Voronoi 細胞多邊形（bounds = [0,0,size,size]）。
 * 回傳每點對應的多邊形；點若無有效細胞則為 null。
 */
export function voronoiCells(
  points: Pt[],
  size: number,
): Array<Array<[number, number]> | null> {
  if (points.length === 0) return [];
  const delaunay = Delaunay.from(
    points,
    (p) => p.x,
    (p) => p.y,
  );
  const voronoi = delaunay.voronoi([0, 0, size, size]);
  return points.map((_, i) => {
    const poly = voronoi.cellPolygon(i);
    return poly ? (poly as Array<[number, number]>) : null;
  });
}
