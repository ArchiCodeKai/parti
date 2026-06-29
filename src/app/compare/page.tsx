/**
 * /compare · 比較工具 hero piece
 *
 * 規格見 docs/04-頁面設計/compare-tool.md
 * N→幾何映射見 src/lib/utils.ts nToGeometry()、視覺見 RelationGeometry
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
import { RelationGeometry } from "@/components/geometry/RelationGeometry";
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

        {N >= 1 && <RelationGeometry architects={architects} />}

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
