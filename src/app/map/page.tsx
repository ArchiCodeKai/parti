/**
 * /map · 世界地圖（純 SVG，無外部依賴）
 *
 * 規格見 docs/04-頁面設計/map-world.md
 * 用 buildings 的 lat/lng 以等距柱狀投影畫圖釘。
 * 符合設計哲學：海洋近白、幾何座標場、無寫實圖磚。
 * Mapbox 完整版留待後續。
 */

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BUILDINGS } from "@/lib/data/buildings";
import { getArchitectBySlug } from "@/lib/data/architects";

const W = 720;
const H = 360;

/** 等距柱狀投影 lng/lat → SVG 座標 */
function project(lng: number, lat: number): { x: number; y: number } {
  return { x: ((lng + 180) / 360) * W, y: ((90 - lat) / 180) * H };
}

const CONTINENT_OF: Record<string, string> = {
  US: "North America", MX: "North America",
  JP: "Asia", CN: "Asia", TW: "Asia", HK: "Asia", BD: "Asia", AZ: "Asia",
  FR: "Europe", GB: "Europe", IT: "Europe", ES: "Europe", DE: "Europe", CH: "Europe", PT: "Europe",
  BR: "South America",
  AU: "Oceania", NZ: "Oceania",
  BF: "Africa",
};

const CONTINENT_ORDER = [
  "North America", "South America", "Europe", "Africa", "Asia", "Oceania",
];

/** 各洲標籤在地圖上的大略位置（lng, lat） */
const CONTINENT_LABEL: Record<string, [number, number]> = {
  "North America": [-100, 48],
  "South America": [-58, -12],
  Europe: [12, 55],
  Africa: [20, 3],
  Asia: [98, 45],
  Oceania: [140, -25],
};

function continentOf(country: string): string {
  return CONTINENT_OF[country] ?? "Other";
}

export default function MapPage() {
  const router = useRouter();
  const [hovered, setHovered] = useState<string | null>(null);

  // 依洲分組（側欄用）
  const grouped = useMemo(() => {
    return CONTINENT_ORDER.map((continent) => ({
      continent,
      buildings: BUILDINGS.filter((b) => continentOf(b.location.country) === continent).sort(
        (a, b) => a.location.city.localeCompare(b.location.city),
      ),
    })).filter((g) => g.buildings.length > 0);
  }, []);

  const meridians = [-150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150];
  const parallels = [-60, -30, 0, 30, 60];

  return (
    <main
      style={{
        padding: "120px var(--space-7) var(--space-9)",
        maxWidth: "1440px",
        margin: "0 auto",
      }}
    >
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
          04 · Map
        </p>
        <h1
          className="t-2xl"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 200,
            margin: "var(--space-3) 0 var(--space-4)",
          }}
        >
          M A P · 地圖
        </h1>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-lg)",
            color: "var(--ink-secondary)",
            margin: 0,
            maxWidth: "640px",
          }}
        >
          以地理尺度觀看 {BUILDINGS.length} 件建築的分布 — 停在圖釘或清單上看名稱，點擊進入。
        </p>
      </header>

      <div className="map-layout">
        {/* SVG 世界座標場 */}
        <div
          className="glass"
          style={{ padding: "var(--space-4)", borderRadius: "var(--r-lg)" }}
        >
          <svg
            viewBox={`0 0 ${W} ${H}`}
            style={{ width: "100%", height: "auto", display: "block" }}
            role="img"
            aria-label="建築世界分布圖"
          >
            {/* 經緯格線 */}
            {meridians.map((lng) => {
              const { x } = project(lng, 0);
              return (
                <line
                  key={`m${lng}`}
                  x1={x} y1={0} x2={x} y2={H}
                  stroke="var(--line-hair)"
                  strokeWidth={lng === 0 ? 1 : 0.5}
                />
              );
            })}
            {parallels.map((lat) => {
              const { y } = project(0, lat);
              return (
                <line
                  key={`p${lat}`}
                  x1={0} y1={y} x2={W} y2={y}
                  stroke="var(--line-hair)"
                  strokeWidth={lat === 0 ? 1 : 0.5}
                />
              );
            })}

            {/* 各洲標籤 */}
            {Object.entries(CONTINENT_LABEL).map(([name, [lng, lat]]) => {
              const { x, y } = project(lng, lat);
              return (
                <text
                  key={name}
                  x={x} y={y}
                  textAnchor="middle"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "8px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    fill: "var(--ink-faint)",
                  }}
                >
                  {name}
                </text>
              );
            })}

            {/* 建築圖釘 */}
            {BUILDINGS.map((b) => {
              const { x, y } = project(b.location.lng, b.location.lat);
              const isHot = hovered === b.id;
              return (
                <g
                  key={b.id}
                  onMouseEnter={() => setHovered(b.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => router.push(`/buildings/${b.id}`)}
                  style={{ cursor: "none" }}
                >
                  <title>{`${b.name.en} · ${b.location.city}`}</title>
                  <circle
                    cx={x} cy={y}
                    r={isHot ? 5 : 2.6}
                    fill={isHot ? "var(--accent-red)" : "var(--ink-tertiary)"}
                    opacity={isHot ? 1 : 0.5}
                    style={{ transition: "r 200ms var(--ease-out), fill 200ms, opacity 200ms" }}
                  />
                  {isHot && (
                    <text
                      x={x + 8} y={y + 3}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "9px",
                        letterSpacing: "0.06em",
                        fill: "var(--ink-primary)",
                      }}
                    >
                      {b.name.en}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* 側欄：依洲分組 */}
        <aside
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-5)",
            maxHeight: "70vh",
            overflowY: "auto",
          }}
        >
          {grouped.map(({ continent, buildings }) => (
            <div key={continent}>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--accent-red)",
                  margin: "0 0 var(--space-2)",
                }}
              >
                {continent} · {buildings.length}
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {buildings.map((b) => {
                  const architect = getArchitectBySlug(b.architect);
                  const isHot = hovered === b.id;
                  return (
                    <li key={b.id}>
                      <Link
                        href={`/buildings/${b.id}`}
                        onMouseEnter={() => setHovered(b.id)}
                        onMouseLeave={() => setHovered(null)}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "1px",
                          padding: "var(--space-2) var(--space-2)",
                          borderRadius: "var(--r-sm)",
                          textDecoration: "none",
                          cursor: "none",
                          background: isHot ? "rgba(230, 59, 46, 0.08)" : "transparent",
                          color: isHot ? "var(--accent-red)" : "var(--ink-primary)",
                          transition: "background 150ms, color 150ms",
                        }}
                      >
                        <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px" }}>
                          {b.name.zh}
                        </span>
                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "9px",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "var(--ink-tertiary)",
                          }}
                        >
                          {b.location.city}
                          {architect ? ` · ${architect.name.en}` : ""}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </aside>
      </div>
    </main>
  );
}
