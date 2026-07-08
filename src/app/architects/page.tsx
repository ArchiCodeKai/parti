/**
 * /architects · 人物馬賽克牆
 *
 * 規格見 docs/04-頁面設計/architects-mosaic.md
 */

"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ARCHITECTS } from "@/lib/data/architects";
import { ArchitectCard, type CardSize } from "@/components/cards/ArchitectCard";
import { formatLifespan } from "@/lib/utils";
import type { Architect } from "@/types/entity";

/** 依 importance 決定卡片大小 */
function sizeFor(importance: number): CardSize {
  if (importance === 5) return "L";
  if (importance === 4) return "M";
  if (importance === 3) return "S";
  return "XS";
}

const ERAS = [
  { label: "All", value: null as string | null },
  { label: "1850–1900", value: "1850-1900" },
  { label: "1900–1945", value: "1900-1945" },
  { label: "1945–1980", value: "1945-1980" },
  { label: "1980–", value: "1980-" },
];

function eraMatches(arch: Architect, era: string | null): boolean {
  if (!era) return true;
  const [start, end] = era.split("-").map(Number);
  const birth = arch.lifespan[0];
  return birth >= start && (!end || birth < end);
}

export default function ArchitectsPage() {
  const router = useRouter();
  const [selectedEra, setSelectedEra] = useState<string | null>(null);

  const filtered = useMemo(
    () => ARCHITECTS.filter((a) => eraMatches(a, selectedEra)),
    [selectedEra],
  );

  return (
    <main
      style={{
        padding: "120px var(--space-7) var(--space-9)",
        maxWidth: "1440px",
        margin: "0 auto",
      }}
    >
      {/* Page title */}
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
          01 · People
        </p>
        <h1
          className="t-2xl"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 200,
            margin: "var(--space-3) 0 var(--space-4)",
          }}
        >
          A R C H I T E C T S · 人物
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
          {ARCHITECTS.length} 位重塑現代建築的人。從柯比意到 Francis Kéré、跨越 130 年的譜系。
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
          1850 → 2025
        </p>
      </header>

      {/* Filter chips */}
      <div
        style={{
          display: "flex",
          gap: "var(--space-2)",
          flexWrap: "wrap",
          marginBottom: "var(--space-6)",
          padding: "var(--space-3) 0",
          borderBottom: "1px solid var(--line-hair)",
        }}
      >
        {ERAS.map((era) => (
          <button
            key={era.label}
            onClick={() => setSelectedEra(era.value)}
            className={`chip-soft ${selectedEra === era.value ? "is-active" : ""}`}
          >
            {era.label}
          </button>
        ))}
        <span
          style={{
            marginLeft: "auto",
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            letterSpacing: "0.15em",
            color: "var(--ink-tertiary)",
            alignSelf: "center",
          }}
        >
          {filtered.length} / {ARCHITECTS.length}
        </span>
      </div>

      {/* Mosaic grid */}
      <div className="mosaic-grid">
        {filtered.map((arch) => (
          <ArchitectCard
            key={arch.id}
            size={sizeFor(arch.importance)}
            name={arch.name}
            lifespan={formatLifespan(arch.lifespan)}
            nationality={arch.nationality.join("/")}
            movements={arch.movements
              .filter((m) => m.weight === "primary")
              .map((m) => m.id.toUpperCase().replace(/-/g, " "))
              .slice(0, 2)}
            onClick={() => router.push(`/architects/${arch.id}`)}
          />
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div
          style={{
            padding: "var(--space-9) 0",
            textAlign: "center",
            color: "var(--ink-tertiary)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 200,
              fontSize: "var(--text-xl)",
              margin: 0,
            }}
          >
            找不到符合篩選的建築師
          </p>
          <button
            onClick={() => setSelectedEra(null)}
            className="chip-soft"
            style={{ marginTop: "var(--space-4)" }}
          >
            清除篩選
          </button>
        </div>
      )}
    </main>
  );
}
