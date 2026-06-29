/**
 * RelationGeometry · N→幾何關係視覺化（共用）
 *
 * 依人數自動套幾何：1 同心圓 / 2 中垂線 / 3 三點定圓 /
 * 4-6 三角網 / 7-12 細胞 / 13+ 力導向圖。
 * 給 Compare 頁與 Movement 詳情頁共用。
 *
 * 規格見 docs/04-頁面設計/compare-tool.md、src/design-reference/design-system/geometry-language.md
 */

"use client";

import { useMemo } from "react";
import { calculateDispersion } from "@/lib/compare/dispersion";
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

  // N 個點均勻分布在圓上
  const points = useMemo(
    () =>
      architects.map((_, i) => {
        const angle = (i / Math.max(n, 1)) * Math.PI * 2 - Math.PI / 2;
        const r = n === 1 ? 0 : 120;
        return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
      }),
    [architects, n, cx, cy],
  );

  // N=3 圓圈視覺規範（離散度 → 大小 / 彩度 / 透明度）
  const circumRadius = 80 + dispersion * 200;
  const circumSaturation = 80 - dispersion * 50;
  const circumOpacity = 1.0 - dispersion * 0.5;

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
      {geometry === "bisector" && (
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

      {/* N=3 三點定圓 */}
      {geometry === "circumcircle" && (
        <g>
          <circle
            cx={cx}
            cy={cy}
            r={circumRadius}
            fill={`hsla(5, ${circumSaturation}%, 50%, ${circumOpacity})`}
            stroke="var(--accent-red)"
            strokeWidth={1}
          />
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

      {/* N=4-6 Delaunay 三角網（簡化：所有點互連） */}
      {geometry === "delaunay" && (
        <g>
          {points.map((p1, i) =>
            points.slice(i + 1).map((p2, j) => (
              <line
                key={`${i}-${j}`}
                x1={p1.x}
                y1={p1.y}
                x2={p2.x}
                y2={p2.y}
                stroke="var(--accent-red)"
                strokeWidth={0.6}
                opacity={0.6}
              />
            )),
          )}
          {points.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={6} fill="var(--accent-red)" />
          ))}
        </g>
      )}

      {/* N=7-12 Voronoi（簡化：圓點 + 半徑示意） */}
      {geometry === "voronoi" && (
        <g>
          {points.map((p, i) => (
            <g key={i}>
              <circle
                cx={p.x}
                cy={p.y}
                r={40}
                fill="none"
                stroke="var(--accent-red)"
                strokeWidth={0.5}
                opacity={0.4}
                strokeDasharray="3 3"
              />
              <circle cx={p.x} cy={p.y} r={5} fill="var(--accent-red)" />
            </g>
          ))}
        </g>
      )}

      {/* N≥13 Force Graph（簡化：確定性連線約 30% 密度） */}
      {geometry === "force-graph" && (
        <g>
          {points.map((p1, i) =>
            points.slice(i + 1).map((p2, j) => {
              // 確定性連線 — 不用 Math.random 避免重繪跳動與 hydration mismatch
              if ((i * 7 + (i + 1 + j) * 13) % 10 >= 3) return null;
              return (
                <line
                  key={`${i}-${j}`}
                  x1={p1.x}
                  y1={p1.y}
                  x2={p2.x}
                  y2={p2.y}
                  stroke="var(--ink-tertiary)"
                  strokeWidth={0.4}
                  opacity={0.4}
                />
              );
            }),
          )}
          {points.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={4} fill="var(--accent-red)" />
          ))}
        </g>
      )}
    </svg>
  );
}
