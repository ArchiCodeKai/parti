/**
 * BodyGrid · 內文 + 相關建築師側欄（Hidden-until-Touched）
 *
 * children 為 server 端渲染好的內文；本元件只負責
 * sidebar 的 scroll 觸發展開與 grid 欄寬過渡。
 */

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface RelatedItem {
  id: string;
  nameEn: string;
  nameZh: string;
}

export function BodyGrid({
  related,
  children,
}: {
  related: RelatedItem[];
  children: React.ReactNode;
}) {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  // Scroll ≥ 18% 觸發展開（一次性、setState 冪等）
  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent =
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100;
      if (scrollPercent >= 18) setSidebarVisible(true);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: sidebarVisible ? "1fr 280px" : "1fr 40px",
        gap: "var(--space-7)",
        transition: "grid-template-columns 680ms var(--ease-emphasized)",
      }}
    >
      {children}

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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "var(--space-2)",
            }}
          >
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
                  <Link
                    href={`/architects/${r.id}`}
                    style={{
                      display: "block",
                      padding: "var(--space-2) 0",
                      textDecoration: "none",
                      cursor: "none",
                      color: "var(--ink-primary)",
                      fontFamily: "var(--font-sans)",
                      fontSize: "13px",
                    }}
                  >
                    ◦ {r.nameEn}
                    <span
                      style={{
                        marginLeft: "var(--space-2)",
                        color: "var(--ink-tertiary)",
                        fontSize: "11px",
                      }}
                    >
                      {r.nameZh}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </aside>
    </div>
  );
}
