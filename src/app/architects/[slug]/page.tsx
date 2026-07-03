/**
 * /architects/[slug] · 建築師個人頁
 *
 * Server Component + SSG（generateStaticParams / generateMetadata）。
 * 互動部分拆為 client islands：TagBar / BodyGrid / CompareButton / Pullquote。
 * 規格見 docs/00-總規格/04-開發路線圖.md T1.1
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ARCHITECTS, getArchitectBySlug } from "@/lib/data/architects";
import { getBuildingBySlug } from "@/lib/data/buildings";
import type { Architect } from "@/types/entity";
import { TagBar } from "./TagBar";
import { BodyGrid } from "./BodyGrid";
import { CompareButton } from "./CompareButton";
import { Pullquote } from "./Pullquote";
import { colorFor } from "./movementColors";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return ARCHITECTS.map((a) => ({ slug: a.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const arch = getArchitectBySlug(slug);
  if (!arch) return {};

  return {
    title: `${arch.name.en} ${arch.name.zh} · PARTI`,
    description: arch.bodyText.slice(0, 80),
    openGraph: {
      title: `${arch.name.en} ${arch.name.zh}`,
      description: arch.bodyText.slice(0, 80),
      type: "profile",
    },
  };
}

export default async function ArchitectPage({ params }: PageProps) {
  const { slug } = await params;
  const arch = getArchitectBySlug(slug);

  if (!arch) notFound();

  // 相關建築師（依共同流派）
  const related = ARCHITECTS.filter((a) => {
    if (a.id === arch.id) return false;
    const aMoves = new Set(a.movements.map((m) => m.id));
    return arch.movements.some((m) => aMoves.has(m.id));
  })
    .slice(0, 5)
    .map((a) => ({ id: a.id, nameEn: a.name.en, nameZh: a.name.zh }));

  return (
    <main
      style={{
        padding: "120px var(--space-7) var(--space-9)",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
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

          <CompareButton id={arch.id} />
        </div>

        {/* Tag bar · Hidden-until-Touched */}
        <TagBar movements={arch.movements} />
      </header>

      {/* Multi-period timeline bar */}
      <section style={{ marginBottom: "var(--space-7)" }}>
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
      <BodyGrid related={related}>
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
                {arch.buildings.map((b) => {
                  const bld = getBuildingBySlug(b);
                  return (
                    <li key={b} style={{ borderBottom: "1px solid var(--line-hair)" }}>
                      <Link
                        href={`/buildings/${b}`}
                        style={{
                          display: "flex",
                          alignItems: "baseline",
                          gap: "var(--space-3)",
                          padding: "var(--space-3) var(--space-4)",
                          textDecoration: "none",
                          cursor: "none",
                          color: "var(--ink-primary)",
                          fontFamily: "var(--font-display)",
                          fontWeight: 200,
                          fontSize: "var(--text-lg)",
                        }}
                      >
                        <span>{bld ? bld.name.en : b.replace(/-/g, " ")}</span>
                        {bld && (
                          <span
                            style={{
                              fontFamily: "var(--font-cjk)",
                              fontSize: "14px",
                              letterSpacing: "0.08em",
                              color: "var(--ink-tertiary)",
                            }}
                          >
                            {bld.name.zh}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}
        </article>
      </BodyGrid>
    </main>
  );
}

/** 流派彩條時間軸（純渲染、server 端） */
function TimelineBar({ architect }: { architect: Architect }) {
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
