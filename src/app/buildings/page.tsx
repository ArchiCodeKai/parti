/**
 * /buildings · 建築年表
 *
 * 規格見 docs/04-頁面設計/buildings-timeline.md
 * v1：依完工十年分組的年表 + 卡片。馬賽克切換留待後續。
 */

"use client";

import Link from "next/link";
import { BUILDINGS, getBuildingsByDecade } from "@/lib/data/buildings";
import { getArchitectBySlug } from "@/lib/data/architects";

const TYPE_LABEL: Record<string, string> = {
  residential: "住宅",
  religious: "宗教",
  public: "公共",
  commercial: "商業",
  cultural: "文化",
  educational: "教育",
  memorial: "紀念",
  infrastructure: "基礎設施",
};

export default function BuildingsPage() {
  const decades = getBuildingsByDecade();

  return (
    <main
      style={{
        padding: "120px var(--space-7) var(--space-9)",
        maxWidth: "1440px",
        margin: "0 auto",
      }}
    >
      <header style={{ marginBottom: "var(--space-8)" }}>
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
          02 · Buildings
        </p>
        <h1
          className="t-2xl"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 200,
            margin: "var(--space-3) 0 var(--space-4)",
          }}
        >
          B U I L D I N G S · 建築
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
          沿時間軸閱讀 {BUILDINGS.length} 件代表作 — 從薩伏伊別墅到甘多小學，看構造與觀念如何展開。
        </p>
      </header>

      {decades.map(({ decade, buildings }) => (
        <section
          key={decade}
          className="decade-row"
          style={{ marginBottom: "var(--space-8)" }}
        >
          <div
            className="decade-label"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 200,
              fontSize: "var(--text-2xl)",
              color: "var(--ink-tertiary)",
            }}
          >
            {decade}s
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(240px, 100%), 1fr))",
              gap: "var(--space-4)",
            }}
          >
            {buildings.map((b) => {
              const architect = getArchitectBySlug(b.architect);
              return (
                <Link
                  key={b.id}
                  href={`/buildings/${b.id}`}
                  className="glass parti-card"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--space-2)",
                    padding: "var(--space-5)",
                    borderRadius: "var(--r-lg)",
                    textDecoration: "none",
                    color: "var(--ink-primary)",
                    minHeight: "150px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "10px",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--ink-tertiary)",
                    }}
                  >
                    {b.year.completed} · {b.location.city} ·{" "}
                    {b.buildingType ? TYPE_LABEL[b.buildingType] : ""}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 200,
                      fontSize: "var(--text-lg)",
                      lineHeight: 1.15,
                    }}
                  >
                    {b.name.en}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-cjk)",
                      fontWeight: 200,
                      fontSize: "15px",
                      letterSpacing: "0.08em",
                      color: "var(--ink-secondary)",
                    }}
                  >
                    {b.name.zh}
                  </span>
                  {architect && (
                    <span
                      style={{
                        marginTop: "auto",
                        fontFamily: "var(--font-mono)",
                        fontSize: "10px",
                        letterSpacing: "0.14em",
                        color: "var(--ink-tertiary)",
                      }}
                    >
                      {architect.name.en}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </main>
  );
}
