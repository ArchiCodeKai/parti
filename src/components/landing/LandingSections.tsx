"use client";

import Link from "next/link";
import { RefreshCw } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";

import { FallingwaterModelCanvas } from "./FallingwaterModelCanvas";

type Entry = {
  href?: string;
  titleZh: string;
  titleEn: string;
  count: string;
  description: string;
  motif: "graph" | "building" | "voronoi" | "map";
};

export type LandingPick = {
  name: string;
  meta: string;
};

export type LandingCounts = {
  architects: number;
  buildings: number;
  movements: number;
};

interface LandingSectionsProps {
  counts: LandingCounts;
  picks: LandingPick[];
  totalEntries: number;
}

// 數字由 server 端（src/app/page.tsx）從資料長度導出後以 props 傳入、
// 避免把整包 data 拉進 client bundle（規範見 docs/00-總規格/02-產品規格書.md 產品原則 5）
const buildEntries = (counts: LandingCounts): Entry[] => [
  {
    href: "/architects",
    titleZh: "人 物",
    titleEn: "ARCHITECTS",
    count: `${counts.architects}`,
    description: "從建築師進入流派、作品與思想網絡。",
    motif: "graph",
  },
  {
    href: "/buildings",
    titleZh: "建 築",
    titleEn: "BUILDINGS",
    count: `${counts.buildings}`,
    description: "用時間、地點與構造關係閱讀代表作品。",
    motif: "building",
  },
  {
    href: "/movements",
    titleZh: "運 動",
    titleEn: "MOVEMENTS",
    count: `${counts.movements}`,
    description: "從現代主義到地域主義，追蹤觀念如何變形。",
    motif: "voronoi",
  },
  {
    href: "/map",
    titleZh: "地 圖",
    titleEn: "MAP",
    count: "WORLD",
    description: "以地理尺度觀看建築知識的擴散與重疊。",
    motif: "map",
  },
];

export function LandingSections({ counts, picks, totalEntries }: LandingSectionsProps) {
  // memo 讓 entries identity 穩定、避免 EntryGridSection 的 GSAP effect 重跑
  const entries = useMemo(() => buildEntries(counts), [counts]);

  return (
    <>
      <EntryGridSection entries={entries} />
      <ManifestoSection />
      <RandomPicksSection picks={picks} totalEntries={totalEntries} />
      <LandingFooter />
    </>
  );
}

function EntryGridSection({ entries }: { entries: Entry[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<Array<HTMLElement | null>>([]);
  const chapterButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const scrollToChapterRef = useRef<(index: number) => void>(() => {});
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    let cancelled = false;
    let cleanupTimeline: (() => void) | undefined;
    let releaseNavTransition: (() => void) | undefined;
    const section = sectionRef.current;
    const surface = surfaceRef.current;
    const grid = gridRef.current;
    const tiles = tileRefs.current.filter(Boolean) as HTMLElement[];
    const chapterButtons = chapterButtonRefs.current.filter(Boolean) as HTMLButtonElement[];

    if (!section || !surface || !grid || tiles.length === 0) {
      return;
    }

    const clearBuildingMode = () => {
      document.body.classList.remove("is-landing-building-active");
    };

    section.classList.add("is-assembly");

    void (async () => {
      const [{ default: Lenis }, gsapModule, { ScrollTrigger }] =
        await Promise.all([
          import("lenis"),
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

      if (cancelled) {
        return;
      }

      const gsap = gsapModule.gsap ?? gsapModule.default;
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.35,
      });
      const updateScrollTrigger = () => ScrollTrigger.update();
      const tickLenis = (time: number) => lenis.raf(time * 1000);

      lenis.on("scroll", updateScrollTrigger);
      gsap.ticker.add(tickLenis);
      gsap.ticker.lagSmoothing(0);

      const context = gsap.context(() => {
        const isCompact = window.matchMedia("(max-width: 640px)").matches;
        const hasSeenMaterialIndex =
          window.sessionStorage.getItem("parti:seen-material-index") === "true";
        const scrollEnd = hasSeenMaterialIndex
          ? "+=280%"
          : isCompact
            ? "+=280%"
            : "+=390%";
        const labels = tiles.map((tile) =>
          tile.querySelector(".landing-entry-title"),
        );
        const descriptions = tiles.map((tile) =>
          tile.querySelector(".landing-entry-description"),
        );
        const motifs = tiles.map((tile) => tile.querySelector(".landing-entry-motif"));
        const affordances = tiles.map((tile) =>
          tile.querySelector(".landing-entry-affordance"),
        );
        const chapterStarts = [0.38, 1.23, 2.08, 2.93];
        const chapterSettles = [1.1, 1.95, 2.8, 3.65];
        const activeBreakpoints = [1.23, 2.08, 2.93];
        const timelineEnd = 4.15;
        let currentActive = -1;
        let currentFinal = false;
        let navTransition: ReturnType<typeof gsap.timeline> | undefined;

        const applyActiveState = (activeIndex: number, isFinal: boolean) => {
          if (activeIndex === currentActive && isFinal === currentFinal) {
            return;
          }

          currentActive = activeIndex;
          currentFinal = isFinal;
          section.dataset.activeEntry = entries[activeIndex]?.titleEn.toLowerCase() ?? "";
          section.classList.toggle("is-assembly-final", isFinal);
          document.body.classList.toggle(
            "is-landing-building-active",
            activeIndex === 1 && !isFinal,
          );

          tiles.forEach((tile, index) => {
            const isActive = index === activeIndex;
            tile.classList.toggle("is-active", isActive);
            tile.classList.toggle("is-inactive", !isActive && !isFinal);

            if (tile instanceof HTMLAnchorElement) {
              tile.tabIndex = isActive ? 0 : -1;
              tile.setAttribute("aria-hidden", !isActive && !isFinal ? "true" : "false");
            }
          });

          chapterButtons.forEach((button, index) => {
            const isActive = index === activeIndex;
            button.classList.toggle("is-active", isActive);
            button.setAttribute("aria-current", isActive ? "true" : "false");
          });
        };

        gsap.set(surface, { opacity: 0, scale: 0.94 });
        gsap.set(grid, { clipPath: "inset(12% 14%)", y: 24, scale: 0.96 });
        gsap.set(tiles, (index: number) => ({
          opacity: 0,
          xPercent: index % 2 === 0 ? -42 : 42,
          yPercent: index < 2 ? -10 : 14,
          scale: 0.9,
          rotateZ: index % 2 === 0 ? -1.2 : 1.2,
          filter: "blur(1px)",
          clipPath: "inset(42% 18% 42% 18%)",
          "--entry-material-opacity": 0.05,
          "--entry-material-glint-opacity": 0.02,
          "--entry-material-shift": "0px",
        }));
        gsap.set(descriptions, { opacity: 0, y: 10 });
        gsap.set(motifs, { opacity: 0.08, y: 14 });
        gsap.set(affordances, { opacity: 0, y: 6 });
        applyActiveState(0, false);

        const timeline = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: scrollEnd,
            pin: true,
            scrub: 0.9,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const time = self.progress * timelineEnd;
              const activeIndex = time < activeBreakpoints[0]
                ? 0
                : time < activeBreakpoints[1]
                  ? 1
                  : time < activeBreakpoints[2]
                    ? 2
                    : 3;
              applyActiveState(activeIndex, time >= 3.78);
            },
            onLeave: () => {
              window.sessionStorage.setItem("parti:seen-material-index", "true");
            },
          },
        });
        releaseNavTransition = () => {
          const trigger = timeline.scrollTrigger;

          navTransition?.kill();
          navTransition = undefined;

          requestAnimationFrame(() => {
            trigger?.getTween()?.progress(1);
            if (trigger) {
              timeline.progress(trigger.progress, false);
            }
          });
        };

        timeline
          .to(surface, { opacity: 0.72, scale: 1, duration: 0.5 }, 0)
          .to(grid, { clipPath: "inset(0% 0%)", y: 0, scale: 1, duration: 0.35 }, 0)
          .to(
            ".landing-entry-surface-grain",
            { opacity: 0.34, duration: 0.5 },
            0.05,
          );

        const materialColors = [
          "rgba(255, 255, 255, 0.72)",
          "rgba(255, 255, 255, 0.82)",
          "rgba(250, 249, 246, 0.7)",
          "rgba(255, 255, 255, 0.64)",
        ];

        const getAssemblyEntry = (tileIndex: number, activeIndex: number) => {
          const direction = tileIndex % 2 === 0 ? -1 : 1;
          const vertical = tileIndex < 2 ? -1 : 1;
          const isActive = tileIndex === activeIndex;

          return {
            opacity: isActive ? 1 : 0,
            xPercent: isActive ? 0 : direction * 52,
            yPercent: isActive ? 0 : vertical * 18,
            scale: isActive ? 1 : 0.92,
            rotateZ: isActive ? 0 : direction * 2.4,
            filter: isActive ? "blur(0px)" : "blur(1.2px)",
            clipPath: isActive ? "inset(0% 0% 0% 0%)" : "inset(46% 22% 46% 22%)",
            zIndex: isActive ? 20 : 2,
          };
        };

        const getAssemblyOrigin = (activeIndex: number) => {
          const origins = [
            { xPercent: -46, yPercent: -4, rotateZ: -1.4 },
            { xPercent: 34, yPercent: -18, rotateZ: 1.1 },
            { xPercent: -28, yPercent: 22, rotateZ: -2.2 },
            { xPercent: 46, yPercent: 8, rotateZ: 1.6 },
          ];

          return origins[activeIndex] ?? origins[0];
        };

        const playDirectChapterTransition = (activeIndex: number) => {
          const tile = tiles[activeIndex];
          const label = labels[activeIndex];
          const description = descriptions[activeIndex];
          const motif = motifs[activeIndex];
          const affordance = affordances[activeIndex];
          const origin = getAssemblyOrigin(activeIndex);

          navTransition?.kill();
          navTransition = gsap.timeline({
            onComplete: () => {
              navTransition = undefined;
            },
            defaults: {
              ease: "power3.out",
            },
          });

          gsap.set(tile, {
            ...getAssemblyEntry(activeIndex, activeIndex),
            opacity: 0.82,
            xPercent: origin.xPercent * 0.12,
            yPercent: origin.yPercent * 0.12,
            scale: 0.982,
            rotateZ: origin.rotateZ * 0.24,
            filter: "blur(0.9px)",
            clipPath: "inset(5% 4% 5% 4%)",
            "--entry-material-opacity": 0.42,
            "--entry-material-glint-opacity": 0.12,
            "--entry-material-shift": "8px",
          });
          gsap.set(label, { opacity: 0.7, y: 6 });
          gsap.set(description, { opacity: 0.28, y: 8 });
          gsap.set(motif, { opacity: 0.22, y: 10 });
          gsap.set(affordance, { opacity: 0, y: 5 });

          navTransition
            .to(grid, { scale: 0.992, duration: 0.16 }, 0)
            .to(grid, { scale: 1, duration: 0.36 }, 0.12)
            .to(surface, { scale: 1.006, opacity: 0.76, duration: 0.18 }, 0)
            .to(surface, { scale: 1, opacity: 0.72, duration: 0.34 }, 0.14)
            .to(tile, {
              ...getAssemblyEntry(activeIndex, activeIndex),
              "--entry-material-opacity": 0.88,
              "--entry-material-glint-opacity": 0.46,
              "--entry-material-shift": "34px",
              duration: 0.42,
            }, 0)
            .to(label, { opacity: 1, y: -6, duration: 0.34 }, 0.05)
            .to(description, { opacity: 0.72, y: 0, duration: 0.34 }, 0.09)
            .to(motif, { opacity: 0.62, y: -8, duration: 0.42 }, 0.03)
            .to(affordance, { opacity: 1, y: 0, duration: 0.26 }, 0.16);
        };

        const focusTile = (activeIndex: number, at: number) => {
          const tile = tiles[activeIndex];
          const label = labels[activeIndex];
          const description = descriptions[activeIndex];
          const motif = motifs[activeIndex];
          const affordance = affordances[activeIndex];
          const origin = getAssemblyOrigin(activeIndex);

          timeline
            .to(tiles, {
              opacity: 0,
              xPercent: 0,
              yPercent: 0,
              scale: 0.94,
              rotateZ: 0,
              filter: "blur(1.4px)",
              clipPath: "inset(48% 26% 48% 26%)",
              "--entry-material-opacity": 0.04,
              "--entry-material-glint-opacity": 0.02,
              duration: 0.18,
            }, at)
            .to(
              surface,
              { backgroundColor: materialColors[activeIndex], duration: 0.35 },
              at,
            )
            .to(labels, { y: 12, opacity: 0, duration: 0.18 }, at)
            .to(motifs, { opacity: 0, y: 18, duration: 0.2 }, at)
            .to(descriptions, { opacity: 0, y: 10, duration: 0.18 }, at)
            .fromTo(tile, {
              ...origin,
              opacity: 0,
              scale: 0.82,
              filter: "blur(2.2px)",
              clipPath: "inset(44% 30% 44% 30%)",
              "--entry-material-opacity": 0.18,
              "--entry-material-glint-opacity": 0.08,
              "--entry-material-shift": "0px",
            }, {
              ...getAssemblyEntry(activeIndex, activeIndex),
              "--entry-material-opacity": 0.88,
              "--entry-material-glint-opacity": 0.46,
              "--entry-material-shift": "34px",
              duration: 0.56,
            }, at + 0.16)
            .fromTo(label, { y: 18 }, { y: -6, opacity: 1, duration: 0.44 }, at + 0.24)
            .to(description, { opacity: 0.72, y: 0, duration: 0.34 }, at + 0.36)
            .fromTo(motif, { y: 26 }, { opacity: 0.62, y: -8, duration: 0.52 }, at + 0.26)
            .to(affordance, { opacity: 1, y: 0, duration: 0.28 }, at + 0.42);
        };

        chapterStarts.forEach((start, index) => {
          focusTile(index, start);
        });

        timeline
          .to(grid, { scale: 0.96, y: -6, duration: 0.34 }, 3.78)
          .to(descriptions, { opacity: 0.56, y: 0, duration: 0.24 }, 3.78)
          .to(motifs, { opacity: 0.28, y: 0, duration: 0.24 }, 3.78)
          .to(surface, {
            opacity: 0.5,
            backgroundColor: "rgba(255, 255, 255, 0.52)",
            duration: 0.48,
          }, 3.78);

        scrollToChapterRef.current = (index: number) => {
          const trigger = timeline.scrollTrigger;
          if (!trigger) {
            return;
          }

          const targetTime = chapterSettles[index] ?? chapterSettles[0];
          const targetProgress = targetTime / timelineEnd;
          const targetScroll = trigger.start + (trigger.end - trigger.start) * targetProgress;
          const jumpToSettledState = () => {
            trigger.getTween()?.progress(1);
            navTransition?.kill();
            timeline.progress(targetProgress, false);
            applyActiveState(index, targetTime >= 3.78);
          };

          jumpToSettledState();
          lenis.scrollTo(targetScroll, {
            force: true,
            immediate: true,
          });
          ScrollTrigger.update();
          jumpToSettledState();
          playDirectChapterTransition(index);

          requestAnimationFrame(() => {
            trigger.getTween()?.progress(1);
            ScrollTrigger.update();
          });
        };

        window.addEventListener("wheel", releaseNavTransition, { passive: true });
        window.addEventListener("touchstart", releaseNavTransition, { passive: true });
      }, section);

      cleanupTimeline = () => {
        context.revert();
        if (releaseNavTransition) {
          window.removeEventListener("wheel", releaseNavTransition);
          window.removeEventListener("touchstart", releaseNavTransition);
        }
        lenis.off("scroll", updateScrollTrigger);
        gsap.ticker.remove(tickLenis);
        lenis.destroy();
        section.classList.remove("is-assembly", "is-assembly-final");
        section.removeAttribute("data-active-entry");
        clearBuildingMode();
        scrollToChapterRef.current = () => {};
      };
    })();

    return () => {
      cancelled = true;
      section.classList.remove("is-assembly", "is-assembly-final");
      section.removeAttribute("data-active-entry");
      clearBuildingMode();
      cleanupTimeline?.();
    };
  }, [shouldReduceMotion, entries]);

  return (
    <section
      ref={sectionRef}
      className="landing-section landing-entry-section"
      aria-labelledby="landing-entry-title"
    >
      <div
        ref={surfaceRef}
        className="landing-entry-surface"
        aria-hidden="true"
      >
        <span className="landing-entry-surface-grain" />
        <span className="landing-entry-surface-glint" />
      </div>
      <div className="landing-section-kicker">02 · Entries</div>
      <h2 id="landing-entry-title" className="sr-only">
        PARTI 四大入口
      </h2>

      <div ref={gridRef} className="landing-entry-grid">
        {entries.map((entry, index) => (
          <EntryTile
            entry={entry}
            key={entry.titleEn}
            setRef={(node) => {
              tileRefs.current[index] = node;
            }}
          />
        ))}
      </div>

      <nav className="landing-entry-chapters" aria-label="四大入口章節">
        {entries.map((entry, index) => (
          <button
            className="landing-entry-chapter"
            key={entry.titleEn}
            type="button"
            ref={(node) => {
              chapterButtonRefs.current[index] = node;
            }}
            onClick={() => scrollToChapterRef.current(index)}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <span>{entry.titleEn}</span>
          </button>
        ))}
      </nav>
    </section>
  );
}

function EntryTile({
  entry,
  setRef,
}: {
  entry: Entry;
  setRef: (node: HTMLElement | null) => void;
}) {
  const tileClassName = `landing-entry-tile landing-entry-tile--${entry.motif}`;
  const content = (
    <>
      <span className="landing-entry-meta">
        <span>{entry.titleEn}</span>
        <span>{entry.count}</span>
      </span>
      <span className="landing-entry-title">{entry.titleZh}</span>
      <span className="landing-entry-description">{entry.description}</span>
      {entry.motif === "building" ? (
        <span className="landing-building-material" aria-hidden="true">
          <FallingwaterDiagram className="landing-building-diagram landing-building-diagram--base" />
          <FallingwaterModelCanvas />
          <span className="landing-building-material__pane" />
          <span className="landing-building-material__shine" />
          <span className="landing-building-material__fold" />
          <span className="landing-building-material__shadow" />
        </span>
      ) : null}
      <EntryMotif type={entry.motif} />
      <span className="landing-entry-affordance">{entry.href ? "OPEN" : "LATER"}</span>
    </>
  );

  if (entry.href) {
    return (
      <Link className={tileClassName} href={entry.href} ref={setRef}>
        {content}
      </Link>
    );
  }

  return (
    <article className={`${tileClassName} landing-entry-tile--pending`} ref={setRef}>
      {content}
    </article>
  );
}

function ManifestoSection() {
  return (
    <section className="landing-section landing-manifesto" aria-labelledby="landing-manifesto-title">
      <div className="landing-manifesto-inner">
        <p className="landing-section-kicker">03 · About</p>
        <h2 id="landing-manifesto-title">
          我們用幾何原理本身
          <br />
          呈現建築知識的結構
        </h2>
        <CircumcircleMotif />
        <Link className="landing-text-link" href="/architects">
          閱讀第一批人物條目
        </Link>
      </div>
    </section>
  );
}

function RandomPicksSection({
  picks,
  totalEntries,
}: {
  picks: LandingPick[];
  totalEntries: number;
}) {
  return (
    <section className="landing-section landing-random" aria-labelledby="landing-random-title">
      <div className="landing-random-header">
        <div>
          <p className="landing-section-kicker">04 · Random Picks</p>
          <h2 id="landing-random-title">{picks.length} / {totalEntries}</h2>
        </div>
        <button className="landing-refresh-button" type="button" aria-label="刷新精選詞條">
          <RefreshCw aria-hidden="true" size={16} strokeWidth={1.5} />
        </button>
      </div>

      <ol className="landing-pick-list">
        {picks.map((pick, index) => (
          <li className="landing-pick-row" key={pick.name}>
            <span className="landing-pick-index">{String(index + 1).padStart(2, "0")}</span>
            <span className="landing-pick-name">{pick.name}</span>
            <span className="landing-pick-meta">{pick.meta}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

function LandingFooter() {
  return (
    <footer className="landing-footer">
      <div className="landing-footer-mark">
        <p className="landing-footer-brand">PARTI</p>
        <p className="landing-footer-title">一部建築圖鑑</p>
      </div>
      <nav aria-label="Landing footer">
        <Link href="/architects">Architects</Link>
        <Link href="/compare">Compare</Link>
        <a href="https://github.com" rel="noreferrer" target="_blank">
          GitHub
        </a>
      </nav>
      <p className="landing-footer-year">© 2026</p>
    </footer>
  );
}

function EntryMotif({ type }: { type: Entry["motif"] }) {
  if (type === "graph") {
    return (
      <svg className="landing-entry-motif" viewBox="0 0 240 160" aria-hidden="true">
        <path d="M44 112L92 64L150 92L198 42" />
        <path d="M92 64L112 126L150 92" />
        <circle cx="44" cy="112" r="5" />
        <circle cx="92" cy="64" r="5" />
        <circle cx="112" cy="126" r="5" />
        <circle cx="150" cy="92" r="5" />
        <circle cx="198" cy="42" r="5" />
      </svg>
    );
  }

  if (type === "building") {
    return (
      <FallingwaterDiagram className="landing-entry-motif landing-entry-motif--fallingwater" />
    );
  }

  if (type === "voronoi") {
    return (
      <svg className="landing-entry-motif" viewBox="0 0 240 160" aria-hidden="true">
        <path d="M28 76L76 24L136 44L210 30" />
        <path d="M76 24L96 96L52 138" />
        <path d="M96 96L166 116L210 30" />
        <path d="M52 138L166 116L214 146" />
        <path d="M136 44L166 116" />
      </svg>
    );
  }

  return (
    <svg className="landing-entry-motif" viewBox="0 0 240 160" aria-hidden="true">
      <path d="M42 82C72 42 116 28 164 40C198 48 216 72 208 100C198 132 156 142 112 130C72 120 24 112 42 82Z" />
      <path d="M60 86C98 96 136 98 196 88" />
      <path d="M126 40C104 70 98 102 112 130" />
      <circle className="landing-entry-motif-accent" cx="154" cy="72" r="4" />
      <circle className="landing-entry-motif-accent" cx="94" cy="108" r="4" />
    </svg>
  );
}

function FallingwaterDiagram({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 640 360" aria-hidden="true">
      <path className="fallingwater-terrain" d="M54 282L174 246L330 258L514 232L604 254" />
      <path className="fallingwater-terrain" d="M62 302L196 270L330 282L514 258L600 276" />
      <path className="fallingwater-terrain fallingwater-terrain--step" d="M66 318L190 292L326 304L514 280L590 296" />
      <path className="fallingwater-water" d="M292 246C278 264 278 282 264 302C254 318 256 330 264 342" />
      <path className="fallingwater-water" d="M318 244C304 266 306 284 294 304C286 318 286 330 294 340" />

      <path className="fallingwater-shadow fallingwater-shadow--site" d="M92 240L306 194L568 226L344 292Z" />
      <path className="fallingwater-shadow fallingwater-shadow--lower" d="M204 198L466 160L574 186L316 226Z" />
      <path className="fallingwater-shadow fallingwater-shadow--middle" d="M164 160L424 118L564 152L300 192Z" />
      <path className="fallingwater-shadow fallingwater-shadow--upper" d="M232 116L424 86L512 110L322 138Z" />

      <path className="fallingwater-slab fallingwater-slab--left" d="M82 174L250 142L326 158L158 190Z" />
      <path className="fallingwater-slab fallingwater-slab--left" d="M82 190L250 158L326 174L158 206Z" />
      <path className="fallingwater-slab fallingwater-slab--middle" d="M154 150L416 108L570 146L300 188Z" />
      <path className="fallingwater-slab fallingwater-slab--middle" d="M164 172L418 130L560 158L304 202Z" />
      <path className="fallingwater-slab fallingwater-slab--right" d="M284 188L496 154L588 180L372 218Z" />
      <path className="fallingwater-slab fallingwater-slab--right" d="M300 214L498 178L572 196L378 232Z" />
      <path className="fallingwater-slab fallingwater-slab--roof" d="M212 108L410 76L528 106L330 136Z" />
      <path className="fallingwater-slab fallingwater-slab--roof" d="M222 124L414 92L514 116L326 146Z" />

      <path className="fallingwater-core fallingwater-core--face" d="M210 72L268 60L268 256L210 268Z" />
      <path className="fallingwater-core fallingwater-core--side" d="M268 60L304 72L304 248L268 256Z" />
      <path className="fallingwater-core" d="M210 72L268 60L304 72" />
      <path className="fallingwater-core" d="M210 268L268 256L304 248" />
      <path className="fallingwater-hatch" d="M220 92L258 84" />
      <path className="fallingwater-hatch" d="M220 116L258 108" />
      <path className="fallingwater-hatch" d="M220 140L258 132" />
      <path className="fallingwater-hatch" d="M220 164L258 156" />
      <path className="fallingwater-hatch" d="M220 188L258 180" />
      <path className="fallingwater-hatch" d="M220 212L258 204" />
      <path className="fallingwater-hatch" d="M220 236L258 228" />

      <path className="fallingwater-parapet" d="M314 146L552 178" />
      <path className="fallingwater-parapet" d="M332 166L520 190" />
      <path className="fallingwater-parapet" d="M186 168L292 184" />
      <path className="fallingwater-vertical" d="M336 134L336 232" />
      <path className="fallingwater-vertical" d="M440 120L440 214" />
      <path className="fallingwater-vertical" d="M514 146L514 220" />
      <path className="fallingwater-pier" d="M356 204L356 272" />
      <path className="fallingwater-pier" d="M426 194L426 260" />

      <path className="fallingwater-glass" d="M316 114L416 96L502 118" />
      <path className="fallingwater-glass" d="M322 128L416 110L496 130" />
      <path className="fallingwater-glass" d="M318 114L318 128M360 106L360 120M404 98L404 112M450 106L450 122M492 116L492 130" />
      <path className="fallingwater-ledge" d="M94 226L214 208L318 226L198 248Z" />
      <path className="fallingwater-ledge" d="M402 230L528 212L594 228L466 248Z" />
    </svg>
  );
}

function CircumcircleMotif() {
  return (
    <svg className="landing-circumcircle" viewBox="0 0 260 180" aria-hidden="true">
      <circle className="landing-circumcircle-ring" cx="130" cy="92" r="64" />
      <path className="landing-circumcircle-line" d="M82 52L184 70L116 136Z" />
      <circle className="landing-circumcircle-point" cx="82" cy="52" r="5" />
      <circle className="landing-circumcircle-point" cx="184" cy="70" r="5" />
      <circle className="landing-circumcircle-point" cx="116" cy="136" r="5" />
    </svg>
  );
}
