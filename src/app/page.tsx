/**
 * PARTI Landing Page
 *
 * 詳細規格見 docs/04-頁面設計/landing-hero.md
 */

import Link from "next/link";
import { PyramidHero } from "@/components/landing/PyramidHero";
import { ArchitectCard } from "@/components/cards/ArchitectCard";

export default function HomePage() {
  return (
    <main>
      {/* Screen 1: Hero with Scroll-Driven Pyramid */}
      <PyramidHero />

      {/* Screen 2: 4 大入口（demo placeholder）*/}
      <section
        style={{
          minHeight: "100vh",
          padding: "var(--space-9) var(--space-7)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-6)",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--accent-red)",
              marginBottom: "var(--space-3)",
            }}
          >
            02 · Entries
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 200,
              fontSize: "var(--text-2xl)",
              letterSpacing: "-0.01em",
              margin: 0,
            }}
          >
            四 大 入 口
          </h2>
        </div>

        {/* 卡片 hover 變體 demo */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "var(--space-4)",
            maxWidth: "1200px",
          }}
        >
          <ArchitectCard
            size="L"
            name={{ en: "Le Corbusier", zh: "柯比意" }}
            lifespan="1887–1965"
            nationality="瑞士/法"
            movements={["BRUTALISM", "MODERNISM"]}
          />
          <ArchitectCard
            size="M"
            name={{ en: "Mies van der Rohe", zh: "密斯" }}
            lifespan="1886–1969"
            nationality="德/美"
          />
          <ArchitectCard
            size="S"
            name={{ en: "Tadao Ando", zh: "安藤忠雄" }}
            lifespan="1941–"
            nationality="日本"
          />
          <ArchitectCard
            size="XS"
            name={{ en: "陳其寬", zh: "Chen Chi-Kuan" }}
          />
        </div>

        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--ink-tertiary)",
            marginTop: "var(--space-4)",
          }}
        >
          Hover 看 4 種變體：L tilt · M lift · S Y-rotate · XS flood red
        </p>

        {/* Nav demo */}
        <div
          style={{
            display: "flex",
            gap: "var(--space-3)",
            marginTop: "var(--space-6)",
            flexWrap: "wrap",
          }}
        >
          <Link href="/architects" className="chip-soft">
            → /architects
          </Link>
          <Link href="/compare" className="chip-soft">
            → /compare
          </Link>
          <Link href="/architects/le-corbusier" className="chip-soft">
            → /architects/le-corbusier
          </Link>
          <span
            className="chip-soft"
            style={{ background: "var(--accent-red)", color: "#fff" }}
          >
            按 ⌘ K 開全站搜尋
          </span>
        </div>
      </section>
    </main>
  );
}
