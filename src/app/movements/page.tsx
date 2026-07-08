/**
 * /movements · 流派總覽
 *
 * 規格見 docs/04-頁面設計/movements-flow.md
 * v1：index + 詳情頁。20 屏 Apple-style 捲動敘事留待後續。
 */

"use client";

import Link from "next/link";
import { MOVEMENTS, getArchitectsByMovement } from "@/lib/data/movements";

export default function MovementsPage() {
  const movements = [...MOVEMENTS].sort((a, b) => a.era[0] - b.era[0]);

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
          03 · Movements
        </p>
        <h1
          className="t-2xl"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 200,
            margin: "var(--space-3) 0 var(--space-4)",
          }}
        >
          M O V E M E N T S · 流派
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
          觀念如何變形 — 從現代主義到參數化，{MOVEMENTS.length} 條流派譜系如何彼此承接與對抗。
        </p>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            letterSpacing: "0.18em",
            color: "var(--ink-tertiary)",
            marginTop: "var(--space-4)",
          }}
        >
          1900 → 2025
        </p>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))",
          gap: "var(--space-4)",
        }}
      >
        {movements.map((m) => {
          const count = getArchitectsByMovement(m.id).length;
          return (
            <Link
              key={m.id}
              href={`/movements/${m.id}`}
              className="glass parti-card"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-3)",
                padding: "var(--space-5)",
                borderRadius: "var(--r-lg)",
                textDecoration: "none",
                color: "var(--ink-primary)",
                minHeight: "180px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* 流派配色標記 */}
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "3px",
                  background: m.colorTheme,
                  opacity: 0.85,
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--ink-tertiary)",
                }}
              >
                {m.era[0]}–{m.era[1]} · {count} 位建築師
              </span>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 200,
                  fontSize: "var(--text-xl)",
                  lineHeight: 1.1,
                }}
              >
                {m.name.en}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-cjk)",
                  fontWeight: 200,
                  fontSize: "16px",
                  letterSpacing: "0.1em",
                  color: "var(--ink-secondary)",
                }}
              >
                {m.name.zh}
              </span>
              <span
                style={{
                  marginTop: "auto",
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--ink-tertiary)",
                }}
              >
                {m.originLocation.city}
              </span>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
