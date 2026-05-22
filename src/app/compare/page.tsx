/**
 * /compare · 比較工具 hero piece
 *
 * 規格見 docs/04-頁面設計/compare-tool.md
 * N→幾何映射見 src/lib/utils.ts nToGeometry()
 */

"use client";

import { useMemo, useState } from "react";
import { ARCHITECTS } from "@/lib/data/architects";
import { useCompareStore } from "@/store/useCompareStore";
import {
  calculateDispersion,
  computeCommonalities,
} from "@/lib/compare/dispersion";
import { nToGeometry } from "@/lib/utils";
import type { Architect } from "@/types/entity";

export default function ComparePage() {
  const { ids, add, remove, clear } = useCompareStore();
  const [searchOpen, setSearchOpen] = useState(false);

  const architects = useMemo(
    () =>
      ids
        .map((id) => ARCHITECTS.find((a) => a.id === id))
        .filter(Boolean) as Architect[],
    [ids],
  );

  const N = architects.length;
  const geometry = nToGeometry(N);
  const dispersion = N >= 2 ? calculateDispersion(architects) : 0;
  const commonalities = N >= 2 ? computeCommonalities(architects) : [];

  return (
    <main
      style={{
        padding: "120px var(--space-7) var(--space-9)",
        maxWidth: "1440px",
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <header style={{ marginBottom: "var(--space-7)" }}>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--accent-red)",
            margin: 0,
          }}
        >
          Compare · 比較
        </p>
        <h1
          className="t-2xl"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 200,
            margin: "var(--space-3) 0 var(--space-4)",
          }}
        >
          任 選 N 位 建 築 師
        </h1>
        <p
          style={{
            color: "var(--ink-secondary)",
            fontSize: "var(--text-lg)",
            margin: 0,
          }}
        >
          依人數自動套對應幾何 — 1 同心圓 / 2 中垂線 / 3 三點定圓 / 4-6 三角網 /
          7-12 細胞 / 13+ 力導向圖
        </p>
      </header>

      {/* Slot row */}
      <div
        style={{
          display: "flex",
          gap: "var(--space-3)",
          flexWrap: "wrap",
          marginBottom: "var(--space-7)",
        }}
      >
        {architects.map((arch) => (
          <div
            key={arch.id}
            className="glass"
            style={{
              padding: "var(--space-3) var(--space-4)",
              borderRadius: "var(--r-md)",
              display: "flex",
              alignItems: "center",
              gap: "var(--space-3)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 200,
                fontSize: "var(--text-lg)",
              }}
            >
              {arch.name.en}
            </span>
            <span
              style={{
                fontFamily: "var(--font-cjk)",
                fontWeight: 200,
                color: "var(--ink-secondary)",
                fontSize: "14px",
                letterSpacing: "0.1em",
              }}
            >
              {arch.name.zh}
            </span>
            <button
              onClick={() => remove(arch.id)}
              className="badge-soft"
              style={{ cursor: "none" }}
            >
              ×
            </button>
          </div>
        ))}
        <button
          onClick={() => setSearchOpen((s) => !s)}
          className="chip-soft"
          style={{ height: "auto", padding: "var(--space-3) var(--space-4)" }}
        >
          + 加入建築師
        </button>
        {N > 0 && (
          <button onClick={clear} className="chip-soft">
            清空
          </button>
        )}
      </div>

      {/* Search panel (簡易) */}
      {searchOpen && (
        <div
          className="glass"
          style={{
            padding: "var(--space-4)",
            borderRadius: "var(--r-lg)",
            marginBottom: "var(--space-6)",
            maxHeight: "400px",
            overflowY: "auto",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "var(--space-2)",
            }}
          >
            {ARCHITECTS.filter((a) => !ids.includes(a.id))
              .sort((a, b) => b.importance - a.importance)
              .map((a) => (
                <button
                  key={a.id}
                  onClick={() => {
                    add(a.id);
                    setSearchOpen(false);
                  }}
                  className="chip-soft"
                  style={{
                    height: "auto",
                    padding: "var(--space-3)",
                    justifyContent: "flex-start",
                  }}
                >
                  {a.name.en} · {a.name.zh}
                </button>
              ))}
          </div>
        </div>
      )}

      {/* Visualization */}
      <section
        className="glass-frost"
        style={{
          padding: "var(--space-7)",
          borderRadius: "var(--r-xl)",
          minHeight: "500px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "var(--space-5)",
          marginBottom: "var(--space-6)",
        }}
      >
        {N === 0 && (
          <div style={{ textAlign: "center", color: "var(--ink-tertiary)" }}>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 200,
                fontSize: "var(--text-xl)",
                margin: 0,
              }}
            >
              選擇 1 位以上建築師、看他們的關係
            </p>
          </div>
        )}

        {N >= 1 && (
          <GeometryViz
            architects={architects}
            geometry={geometry}
            dispersion={dispersion}
          />
        )}

        {N >= 1 && (
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--ink-tertiary)",
              margin: 0,
            }}
          >
            N = {N} · {geometry.toUpperCase().replace(/-/g, " ")}
          </p>
        )}
      </section>

      {/* Commonalities */}
      {N >= 2 && (
        <section
          className="glass"
          style={{
            padding: "var(--space-6)",
            borderRadius: "var(--r-lg)",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--accent-red)",
              margin: "0 0 var(--space-4)",
            }}
          >
            共同點 · Commonalities
          </h2>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-2)",
            }}
          >
            {commonalities.map((c, i) => (
              <li
                key={i}
                style={{
                  paddingLeft: "var(--space-4)",
                  position: "relative",
                  color: "var(--ink-primary)",
                  fontSize: "15px",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    color: "var(--accent-red)",
                  }}
                >
                  ◦
                </span>
                {c}
              </li>
            ))}
          </ul>

          {/* Dispersion meter */}
          <div
            style={{
              marginTop: "var(--space-5)",
              paddingTop: "var(--space-4)",
              borderTop: "1px solid var(--line-hair)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--ink-tertiary)",
                margin: "0 0 var(--space-2)",
              }}
            >
              離散度 Dispersion · {(dispersion * 100).toFixed(0)}%
            </p>
            <div
              style={{
                width: "100%",
                height: "4px",
                background: "rgba(15,15,15,0.06)",
                borderRadius: "var(--r-pill)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${dispersion * 100}%`,
                  height: "100%",
                  background: "var(--accent-red)",
                  transition: "width 600ms var(--ease-emphasized)",
                }}
              />
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

/** 依 N 渲染對應幾何 */
function GeometryViz({
  architects,
  geometry,
  dispersion,
}: {
  architects: Architect[];
  geometry: ReturnType<typeof nToGeometry>;
  dispersion: number;
}) {
  const size = 400;
  const cx = size / 2;
  const cy = size / 2;

  // 計算 N 個點均勻分布在圓上的座標
  const points = architects.map((_, i) => {
    const angle = (i / architects.length) * Math.PI * 2 - Math.PI / 2;
    const r = architects.length === 1 ? 0 : 120;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    };
  });

  // N=3 圓圈視覺規範
  const circumRadius = 80 + dispersion * 200;
  const circumSaturation = 80 - dispersion * 50;
  const circumOpacity = 1.0 - dispersion * 0.5;

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      style={{
        width: "100%",
        maxWidth: "500px",
        aspectRatio: "1 / 1",
      }}
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
          {/* 中垂線（垂直於兩點連線、過中點） */}
          {(() => {
            const mx = (points[0].x + points[1].x) / 2;
            const my = (points[0].y + points[1].y) / 2;
            const dx = points[1].x - points[0].x;
            const dy = points[1].y - points[0].y;
            const len = Math.sqrt(dx * dx + dy * dy);
            // 法向量（垂直）
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
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={8}
              fill="var(--accent-red)"
            />
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
              <circle
                cx={p.x}
                cy={p.y}
                r={8}
                fill="var(--accent-red)"
              />
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
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={6}
              fill="var(--accent-red)"
            />
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
              <circle
                cx={p.x}
                cy={p.y}
                r={5}
                fill="var(--accent-red)"
              />
            </g>
          ))}
        </g>
      )}

      {/* N≥13 Force Graph（簡化：所有點 + 隨機連線） */}
      {geometry === "force-graph" && (
        <g>
          {points.map((p1, i) =>
            points.slice(i + 1).map((p2, j) => {
              if (Math.random() > 0.7) return null;
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
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={4}
              fill="var(--accent-red)"
            />
          ))}
        </g>
      )}
    </svg>
  );
}
