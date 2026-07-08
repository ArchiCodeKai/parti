/**
 * RelationGeometry · N→幾何關係視覺化（共用）
 *
 * 依人數自動套幾何：1 同心圓 / 2 中垂線 / 3 三點定圓（真外接圓）/
 * 4-6 Delaunay 三角網 / 7+ Voronoi 細胞。點位與幾何運算由
 * `@/lib/geometry/relation` 純函式確定性輸出（AD-6）。
 * N≥13 力導向圖 v1 不實作（資料規模到不了）。
 *
 * 給 Compare 頁與 Movement 詳情頁共用。
 */

"use client";

import { useMemo } from "react";
import { calculateDispersion } from "@/lib/compare/dispersion";
import {
  layoutPoints,
  circumcircle,
  delaunayEdges,
  voronoiCells,
} from "@/lib/geometry/relation";
import { nToGeometry } from "@/lib/utils";
import type { Architect } from "@/types/entity";

interface RelationGeometryProps {
  architects: Architect[];
  /** SVG 視窗尺寸，預設 400 */
  size?: number;
  /** 最大顯示寬度，預設 500px */
  maxWidth?: number;
}

export function RelationGeometry({
  architects,
  size = 400,
  maxWidth = 500,
}: RelationGeometryProps) {
  const cx = size / 2;
  const cy = size / 2;
  const n = architects.length;
  const geometry = nToGeometry(n);
  const dispersion = n >= 2 ? calculateDispersion(architects) : 0;

  // 確定性點位（角度由出生年排序、半徑受離散度調變）
  const points = useMemo(
    () => layoutPoints(architects, size, dispersion),
    [architects, size, dispersion],
  );

  // N=3 真外接圓（外心通過三點）
  const circle = useMemo(
    () => (n === 3 ? circumcircle(points[0], points[1], points[2]) : null),
    [n, points],
  );

  // N=4-6 Delaunay 邊
  const edges = useMemo(
    () => (n >= 4 && n <= 6 ? delaunayEdges(points) : []),
    [n, points],
  );

  // N≥7 Voronoi 細胞
  const cells = useMemo(
    () => (n >= 7 ? voronoiCells(points, size) : []),
    [n, points, size],
  );

  // N=3 圓的填色濃度隨離散度反向（越集中越實）
  const circumFillOpacity = 0.05 + (1 - dispersion) * 0.06;

  if (n === 0) return null;

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      style={{ width: "100%", maxWidth: `${maxWidth}px`, aspectRatio: "1 / 1" }}
      aria-hidden="true"
    >
      {/* N=1 同心圓 */}
      {geometry === "concentric" && (
        <g>
          {[40, 80, 120, 160].map((r, i) => (
            <circle
              key={r}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke="var(--accent-red)"
              strokeWidth={0.8}
              opacity={1 - i * 0.2}
            />
          ))}
          <circle cx={cx} cy={cy} r={6} fill="var(--accent-red)" />
        </g>
      )}

      {/* N=2 中垂線 */}
      {geometry === "bisector" && points.length === 2 && (
        <g>
          <line
            x1={points[0].x}
            y1={points[0].y}
            x2={points[1].x}
            y2={points[1].y}
            stroke="var(--ink-tertiary)"
            strokeWidth={0.5}
            strokeDasharray="4 4"
          />
          {(() => {
            const mx = (points[0].x + points[1].x) / 2;
            const my = (points[0].y + points[1].y) / 2;
            const dx = points[1].x - points[0].x;
            const dy = points[1].y - points[0].y;
            const len = Math.sqrt(dx * dx + dy * dy) || 1;
            const nx = -dy / len;
            const ny = dx / len;
            const halfLen = 150;
            return (
              <line
                x1={mx + nx * halfLen}
                y1={my + ny * halfLen}
                x2={mx - nx * halfLen}
                y2={my - ny * halfLen}
                stroke="var(--accent-red)"
                strokeWidth={1.5}
              />
            );
          })()}
          {points.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={8} fill="var(--accent-red)" />
          ))}
        </g>
      )}

      {/* N=3 三點定圓（真外接圓） */}
      {n === 3 && (
        <g>
          {circle && (
            <circle
              cx={circle.cx}
              cy={circle.cy}
              r={circle.r}
              fill="var(--accent-red)"
              fillOpacity={circumFillOpacity}
              stroke="var(--accent-red)"
              strokeWidth={1}
            />
          )}
          {points.map((p, i) => (
            <g key={i}>
              <line
                x1={points[i].x}
                y1={points[i].y}
                x2={points[(i + 1) % 3].x}
                y2={points[(i + 1) % 3].y}
                stroke="var(--ink-primary)"
                strokeWidth={0.5}
                opacity={0.3}
              />
              <circle cx={p.x} cy={p.y} r={8} fill="var(--accent-red)" />
            </g>
          ))}
        </g>
      )}

      {/* N=4-6 Delaunay 三角網 */}
      {n >= 4 && n <= 6 && (
        <g>
          {edges.map(([p1, p2], i) => (
            <line
              key={i}
              x1={p1.x}
              y1={p1.y}
              x2={p2.x}
              y2={p2.y}
              stroke="var(--accent-red)"
              strokeWidth={0.6}
              opacity={0.6}
            />
          ))}
          {points.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={6} fill="var(--accent-red)" />
          ))}
        </g>
      )}

      {/* N≥7 Voronoi 細胞 */}
      {n >= 7 && (
        <g>
          {cells.map((cell, i) =>
            cell ? (
              <polygon
                key={`cell-${i}`}
                points={cell.map(([x, y]) => `${x},${y}`).join(" ")}
                fill="none"
                stroke="var(--accent-red)"
                strokeWidth={0.5}
                opacity={0.4}
              />
            ) : null,
          )}
          {points.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={5} fill="var(--accent-red)" />
          ))}
        </g>
      )}
    </svg>
  );
}
