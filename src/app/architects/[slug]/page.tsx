/**
 * /architects/[slug] · 建築師個人頁
 *
 * 規格見 docs/04-頁面設計/landing-hero.md (個人頁 brief)
 * 含 Hidden-until-Touched 行為：tag bar、related sidebar
 */

"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ARCHITECTS, getArchitectBySlug } from "@/lib/data/architects";
import { useCompareStore } from "@/store/useCompareStore";

const MOVEMENT_COLORS: Record<string, string> = {
  purism: "#E63B2E",
  "international-style": "#0F0F0F",
  brutalism: "#5B7A82",
  organic: "#4A6B4D",
  "prairie-style": "#A8A8A0",
  modernism: "#3A3A3A",
  "monumental-modernism": "#444",
  postmodernism: "#D4B66C",
  deconstructivism: "#4B6B7A",
  parametricism: "#6A6B6F",
  "critical-regionalism": "#6E8478",
  minimalism: "#C5C0B5",
  metabolism: "#A8A8A0",
  "high-tech": "#5B7A82",
  sustainable: "#4A6B4D",
  default: "#7A7A7A",
};

function colorFor(movementId: string): string {
  return MOVEMENT_COLORS[movementId] ?? MOVEMENT_COLORS.default;
}

export default function ArchitectPage() {
  const params = useParams();
  const router = useRouter();
  const compareStore = useCompareStore();

  const slug = typeof params.slug === "string" ? params.slug : "";
  const arch = getArchitectBySlug(slug);

  // Hidden-until-Touched：tag bar
  const [tagsVisible, setTagsVisible] = useState(false);
  // Hidden-until-Touched：related sidebar
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const tagTimerRef = useRef<NodeJS.Timeout>(undefined);

  useEffect(() => {
    // 載入 800ms peek
    const peek = setTimeout(() => {
      setTagsVisible(true);
      setTimeout(() => setTagsVisible(false), 2000);
    }, 800);

    // Scroll trigger
    const handleScroll = () => {
      const scrollPercent =
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100;
      if (scrollPercent >= 18 && !sidebarVisible) {
        setSidebarVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(peek);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sidebarVisible]);

  const showTags = () => {
    setTagsVisible(true);
    if (tagTimerRef.current) clearTimeout(tagTimerRef.current);
    tagTimerRef.current = setTimeout(() => setTagsVisible(false), 3000);
  };

  if (!arch) {
    return (
      <main style={{ padding: "120px var(--space-7)" }}>
        <p>找不到此建築師。</p>
        <button onClick={() => router.push("/architects")} className="chip-soft">
          ← 回人物列表
        </button>
      </main>
    );
  }

  // 相關建築師（依共同流派）
  const related = ARCHITECTS.filter((a) => {
    if (a.id === arch.id) return false;
    const aMoves = new Set(a.movements.map((m) => m.id));
    return arch.movements.some((m) => aMoves.has(m.id));
  }).slice(0, 5);

  const isInCompare = compareStore.has(arch.id);

  return (
    <main
      style={{
        padding: "120px var(--space-7) var(--space-9)",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
      onMouseMove={showTags}
    >
      {/* Hero */}
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
          People · 人物 · {arch.isPritzker ? "Pritzker Laureate" : "Modern Master"}
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 200,
            fontSize: "var(--text-hero)",
            letterSpacing: "-0.02em",
            lineHeight: 1.0,
            margin: "var(--space-4) 0 var(--space-2)",
          }}
        >
          {arch.name.en}
        </h1>
        <p
          style={{
            fontFamily: "var(--font-cjk)",
            fontWeight: 200,
            fontSize: "var(--text-3xl)",
            color: "var(--ink-secondary)",
            letterSpacing: "0.1em",
            margin: 0,
          }}
        >
          {arch.name.zh}
        </p>

        {/* Meta line */}
        <div
          style={{
            marginTop: "var(--space-4)",
            display: "flex",
            gap: "var(--space-4)",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--ink-tertiary)",
            }}
          >
            {arch.lifespan[0]}
            {arch.lifespan[1] >= 2099 ? "–" : `–${arch.lifespan[1]}`} ·{" "}
            {arch.nationality.join(" / ")}
          </span>

          <button
            onClick={() =>
              isInCompare
                ? compareStore.remove(arch.id)
                : compareStore.add(arch.id)
            }
            className={`chip-soft ${isInCompare ? "is-active" : ""}`}
          >
            {isInCompare ? "✓ 在比較中" : "+ 加入比較"}
          </button>
        </div>

        {/* Tag bar · Hidden-until-Touched */}
        <div
          className={`huk-hidden ${tagsVisible ? "is-visible" : ""}`}
          style={{
            display: "flex",
            gap: "var(--space-2)",
            flexWrap: "wrap",
            marginTop: "var(--space-4)",
          }}
        >
          {arch.movements.map((m) => (
            <span
              key={m.id}
              className="badge-soft"
              style={{
                background: m.weight === "primary" ? `${colorFor(m.id)}30` : "rgba(15,15,15,0.04)",
                color: colorFor(m.id),
              }}
            >
              {m.id.replace(/-/g, " ").toUpperCase()}
            </span>
          ))}
        </div>
      </header>

      {/* Multi-period timeline bar */}
      <section
        style={{
          marginBottom: "var(--space-7)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--ink-tertiary)",
            margin: "0 0 var(--space-3)",
          }}
        >
          Movement Timeline
        </p>
        <TimelineBar architect={arch} />
      </section>

      {/* Body Content + Sidebar */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: sidebarVisible ? "1fr 280px" : "1fr 40px",
          gap: "var(--space-7)",
          transition: "grid-template-columns 680ms var(--ease-emphasized)",
        }}
      >
        {/* Main content */}
        <article>
          <p
            style={{
              fontSize: "var(--text-lg)",
              lineHeight: 1.8,
              color: "var(--ink-primary)",
              margin: 0,
            }}
          >
            {arch.bodyText}
          </p>

          {/* Pullquote · scroll-to-reveal */}
          {arch.tags[0] && (
            <Pullquote text={`「${arch.tags[0].replace(/-/g, " ")}」`} />
          )}

          {/* Buildings list */}
          {arch.buildings.length > 0 && (
            <section style={{ marginTop: "var(--space-7)" }}>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--accent-red)",
                  margin: "0 0 var(--space-3)",
                }}
              >
                代表作 · Key Works
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--space-3)",
                }}
              >
                {arch.buildings.map((b) => (
                  <li
                    key={b}
                    style={{
                      padding: "var(--space-3) var(--space-4)",
                      borderBottom: "1px solid var(--line-hair)",
                      fontFamily: "var(--font-display)",
                      fontWeight: 200,
                      fontSize: "var(--text-lg)",
                    }}
                  >
                    {b.replace(/-/g, " ")}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>

        {/* Related sidebar · Hidden-until-Touched */}
        <aside
          className="glass-thin"
          style={{
            position: "sticky",
            top: "100px",
            padding: sidebarVisible ? "var(--space-4)" : "var(--space-2)",
            borderRadius: "var(--r-md)",
            height: "fit-content",
            transition: "padding 680ms var(--ease-emphasized)",
            cursor: "none",
          }}
          onMouseEnter={() => setSidebarVisible(true)}
        >
          {!sidebarVisible ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-2)" }}>
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--accent-red)",
                  animation: "breath 2.4s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "9px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--ink-tertiary)",
                  writingMode: "vertical-rl",
                }}
              >
                Related
              </span>
            </div>
          ) : (
            <>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--ink-tertiary)",
                  margin: "0 0 var(--space-3)",
                }}
              >
                Related · 相關建築師
              </p>
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
                {related.map((r) => (
                  <li key={r.id}>
                    <button
                      onClick={() => router.push(`/architects/${r.id}`)}
                      style={{
                        background: "transparent",
                        border: "none",
                        padding: "var(--space-2) 0",
                        textAlign: "left",
                        cursor: "none",
                        color: "var(--ink-primary)",
                        fontFamily: "var(--font-sans)",
                        fontSize: "13px",
                        width: "100%",
                      }}
                    >
                      ◦ {r.name.en}
                      <span
                        style={{
                          marginLeft: "var(--space-2)",
                          color: "var(--ink-tertiary)",
                          fontSize: "11px",
                        }}
                      >
                        {r.name.zh}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </aside>
      </div>
    </main>
  );
}

/** 流派彩條時間軸 */
function TimelineBar({ architect }: { architect: ReturnType<typeof getArchitectBySlug> }) {
  if (!architect) return null;
  const [start, end] = architect.lifespan;
  const lifeRange = (end >= 2099 ? new Date().getFullYear() : end) - start;

  return (
    <div
      style={{
        position: "relative",
        height: "32px",
        background: "rgba(15,15,15,0.04)",
        borderRadius: "var(--r-pill)",
        overflow: "hidden",
      }}
    >
      {architect.movements.map((m) => {
        const left = ((m.period[0] - start) / lifeRange) * 100;
        const width = ((m.period[1] - m.period[0]) / lifeRange) * 100;
        return (
          <div
            key={m.id}
            style={{
              position: "absolute",
              left: `${left}%`,
              width: `${width}%`,
              top: 0,
              bottom: 0,
              background: colorFor(m.id),
              opacity: m.weight === "primary" ? 0.85 : 0.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#fff",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
            title={`${m.id} · ${m.period[0]}–${m.period[1]}`}
          >
            {width > 12 && m.id.replace(/-/g, " ")}
          </div>
        );
      })}
    </div>
  );
}

/** Pullquote · scroll-to-reveal 摺疊霜玻璃 */
function Pullquote({ text }: { text: string }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.4 },
    );
    observer.observe(ref.current);

    // Fallback：1.2s 後仍未 trigger 就強制展開
    const fallback = setTimeout(() => setVisible(true), 1200);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="glass-frost"
      style={{
        margin: "var(--space-7) 0",
        padding: visible ? "var(--space-7) var(--space-6)" : "var(--space-3)",
        borderRadius: "var(--r-lg)",
        textAlign: "center",
        transition: "padding 680ms var(--ease-emphasized)",
        overflow: "hidden",
      }}
    >
      {visible ? (
        <p
          style={{
            fontFamily: "var(--font-editorial)",
            fontStyle: "italic",
            fontSize: "var(--text-xl)",
            color: "var(--ink-primary)",
            margin: 0,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 500ms 200ms, transform 500ms 200ms",
          }}
        >
          {text}
        </p>
      ) : (
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
          Quote · Scroll to Reveal
        </p>
      )}
    </div>
  );
}
