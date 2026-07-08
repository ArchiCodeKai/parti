/**
 * /movements/[slug] · 流派詳情頁
 *
 * Server Component + SSG（generateStaticParams / generateMetadata）。
 * Hero 用 RelationGeometry（client island）；核心建築師陣列由 server 端算好傳入。
 * 規格見 docs/00-總規格/04-開發路線圖.md T1.2
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MOVEMENTS,
  getMovementBySlug,
  getArchitectsByMovement,
} from "@/lib/data/movements";
import { RelationGeometry } from "@/components/geometry/RelationGeometry";
import { nToGeometry } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return MOVEMENTS.map((m) => ({ slug: m.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const movement = getMovementBySlug(slug);
  if (!movement) return {};

  return {
    title: `${movement.name.en} ${movement.name.zh} · PARTI`,
    description: movement.bodyText.slice(0, 80),
    openGraph: {
      title: `${movement.name.en} ${movement.name.zh}`,
      description: movement.bodyText.slice(0, 80),
      type: "article",
    },
  };
}

export default async function MovementPage({ params }: PageProps) {
  const { slug } = await params;
  const movement = getMovementBySlug(slug);

  if (!movement) notFound();

  const architects = getArchitectsByMovement(slug);
  const N = architects.length;
  const geometry = nToGeometry(N);

  const linkedMovements = (movement.relatedIds ?? [])
    .map(getMovementBySlug)
    .filter((m): m is NonNullable<typeof m> => Boolean(m));
  const opposing = (movement.opposingMovements ?? [])
    .map(getMovementBySlug)
    .filter((m): m is NonNullable<typeof m> => Boolean(m));

  return (
    <main className="page-shell">
      {/* Hero */}
      <header style={{ marginBottom: "var(--space-7)" }}>
        <p className="meta-label" style={{ color: "var(--accent-red)", fontSize: "11px", letterSpacing: "0.22em" }}>
          Movement · 流派
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
          {movement.name.en}
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
          {movement.name.zh}
        </p>

        <div
          style={{
            marginTop: "var(--space-4)",
            display: "flex",
            gap: "var(--space-4)",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: "28px",
              height: "8px",
              borderRadius: "var(--r-pill)",
              background: movement.colorTheme,
            }}
          />
          <span className="meta-label" style={{ fontSize: "12px" }}>
            {movement.era[0]}–{movement.era[1]} · {movement.originLocation.city}
          </span>
        </div>
      </header>

      {/* Geometry hero */}
      <section
        className="glass-frost"
        style={{
          padding: "var(--space-7)",
          borderRadius: "var(--r-xl)",
          minHeight: "420px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "var(--space-5)",
          marginBottom: "var(--space-7)",
        }}
      >
        <RelationGeometry architects={architects} maxWidth={440} />
        <p className="meta-label" style={{ letterSpacing: "0.22em" }}>
          N = {N} · {geometry.toUpperCase().replace(/-/g, " ")}
        </p>
      </section>

      {/* Body */}
      <article style={{ maxWidth: "720px" }}>
        <p
          style={{
            fontSize: "var(--text-lg)",
            lineHeight: 1.8,
            color: "var(--ink-primary)",
            margin: 0,
          }}
        >
          {movement.bodyText}
        </p>
      </article>

      {/* 核心建築師 */}
      {architects.length > 0 && (
        <section style={{ marginTop: "var(--space-8)" }}>
          <p className="meta-label" style={{ color: "var(--accent-red)", margin: "0 0 var(--space-4)" }}>
            核心建築師 · Architects
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(220px, 100%), 1fr))",
              gap: "var(--space-3)",
            }}
          >
            {architects.map((a) => (
              <Link
                key={a.id}
                href={`/architects/${a.id}`}
                className="glass-thin"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2px",
                  padding: "var(--space-3) var(--space-4)",
                  borderRadius: "var(--r-md)",
                  textDecoration: "none",
                  color: "var(--ink-primary)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 200,
                    fontSize: "var(--text-lg)",
                  }}
                >
                  {a.name.en}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-cjk)",
                    fontSize: "13px",
                    letterSpacing: "0.08em",
                    color: "var(--ink-secondary)",
                  }}
                >
                  {a.name.zh}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 相關 / 對立流派 */}
      {(linkedMovements.length > 0 || opposing.length > 0) && (
        <section style={{ marginTop: "var(--space-8)" }}>
          <p className="meta-label" style={{ color: "var(--accent-red)", margin: "0 0 var(--space-4)" }}>
            相關流派 · Related
          </p>
          <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap" }}>
            {linkedMovements.map((m) => (
              <Link
                key={m.id}
                href={`/movements/${m.id}`}
                className="chip-soft"
                style={{ textDecoration: "none" }}
              >
                {m.name.zh} {m.name.en}
              </Link>
            ))}
            {opposing.map((m) => (
              <Link
                key={m.id}
                href={`/movements/${m.id}`}
                className="chip-soft"
                style={{
                  textDecoration: "none",
                  borderColor: "var(--accent-red)",
                  color: "var(--accent-red)",
                }}
              >
                ⟷ {m.name.zh}
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
