/**
 * /buildings/[slug] · 建築詳情頁
 *
 * 規格見 docs/04-頁面設計/buildings-timeline.md
 * 連結至設計者（/architects）與流派（/movements）。
 */

"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  getBuildingBySlug,
  getBuildingsByArchitect,
} from "@/lib/data/buildings";
import { getArchitectBySlug } from "@/lib/data/architects";
import { getMovementBySlug } from "@/lib/data/movements";

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

const META: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "10px",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "var(--ink-tertiary)",
};

export default function BuildingPage() {
  const params = useParams();
  const router = useRouter();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const building = getBuildingBySlug(slug);

  if (!building) {
    return (
      <main style={{ padding: "120px var(--space-7)" }}>
        <p>找不到此建築。</p>
        <button onClick={() => router.push("/buildings")} className="chip-soft">
          ← 回建築年表
        </button>
      </main>
    );
  }

  const architect = getArchitectBySlug(building.architect);
  const movement = building.movement
    ? getMovementBySlug(building.movement)
    : undefined;
  const siblings = getBuildingsByArchitect(building.architect).filter(
    (b) => b.id !== building.id,
  );

  return (
    <main
      style={{
        padding: "120px var(--space-7) var(--space-9)",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      {/* Hero */}
      <header style={{ marginBottom: "var(--space-7)" }}>
        <p style={{ ...META, color: "var(--accent-red)", fontSize: "11px", letterSpacing: "0.22em" }}>
          Building · 建築
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
          {building.name.en}
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
          {building.name.zh}
        </p>

        {/* Meta row */}
        <div
          style={{
            marginTop: "var(--space-5)",
            display: "flex",
            gap: "var(--space-3)",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <span style={{ ...META, fontSize: "12px" }}>
            {building.year.design ? `${building.year.design}→` : ""}
            {building.year.completed} · {building.location.city},{" "}
            {building.location.country}
          </span>
          {building.buildingType && (
            <span className="badge-soft">{TYPE_LABEL[building.buildingType]}</span>
          )}
          {architect && (
            <Link
              href={`/architects/${architect.id}`}
              className="chip-soft"
              style={{ textDecoration: "none" }}
            >
              {architect.name.zh} {architect.name.en}
            </Link>
          )}
          {movement && (
            <Link
              href={`/movements/${movement.id}`}
              className="chip-soft"
              style={{ textDecoration: "none", color: movement.colorTheme }}
            >
              {movement.name.zh}
            </Link>
          )}
        </div>
      </header>

      {/* Body */}
      <article style={{ maxWidth: "720px", marginBottom: "var(--space-8)" }}>
        <p
          style={{
            fontSize: "var(--text-lg)",
            lineHeight: 1.8,
            color: "var(--ink-primary)",
            margin: 0,
          }}
        >
          {building.bodyText}
        </p>
      </article>

      {/* Events timeline */}
      {building.events && building.events.length > 0 && (
        <section style={{ marginBottom: "var(--space-8)" }}>
          <p style={{ ...META, color: "var(--accent-red)", margin: "0 0 var(--space-4)" }}>
            事件 · Timeline
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {building.events.map((e) => (
              <li
                key={`${e.year}-${e.label}`}
                style={{
                  display: "flex",
                  gap: "var(--space-4)",
                  padding: "var(--space-2) 0",
                  borderBottom: "1px solid var(--line-hair)",
                }}
              >
                <span style={{ ...META, fontSize: "12px", minWidth: "48px" }}>
                  {e.year}
                </span>
                <span style={{ fontSize: "15px", color: "var(--ink-primary)" }}>
                  {e.label}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Location note（替 Map 鋪路） */}
      <section
        className="glass-thin"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-3)",
          padding: "var(--space-3) var(--space-4)",
          borderRadius: "var(--r-md)",
          marginBottom: "var(--space-8)",
          width: "fit-content",
        }}
      >
        <span style={{ ...META }}>位置</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--ink-secondary)" }}>
          {building.location.lat.toFixed(4)}, {building.location.lng.toFixed(4)}
        </span>
      </section>

      {/* 同建築師其他作品 */}
      {architect && siblings.length > 0 && (
        <section>
          <p style={{ ...META, color: "var(--accent-red)", margin: "0 0 var(--space-4)" }}>
            {architect.name.zh}的其他作品
          </p>
          <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap" }}>
            {siblings.map((b) => (
              <Link
                key={b.id}
                href={`/buildings/${b.id}`}
                className="chip-soft"
                style={{ textDecoration: "none" }}
              >
                {b.name.zh} {b.name.en}
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
