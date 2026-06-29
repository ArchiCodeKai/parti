/**
 * CmdKDialog · 全站命令面板
 *
 * 規格見 docs/03-元件設計/search-cmdk.md
 *
 * 觸發：
 * - ⌘K（macOS）/ Ctrl+K（其他）
 * - / 鍵（Vercel-style）
 *
 * 鍵盤導航：↑↓ 選擇、Enter 跳轉、ESC 關閉
 */

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import { ARCHITECTS } from "@/lib/data/architects";
import { useCmdKStore } from "@/store/useCmdKStore";
import type { Architect } from "@/types/entity";

interface SearchResult extends Architect {
  matchedField?: string;
}

export function CmdKDialog() {
  const router = useRouter();
  const open = useCmdKStore((s) => s.open);
  const setOpen = useCmdKStore((s) => s.setOpen);
  const toggleOpen = useCmdKStore((s) => s.toggle);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fuse.js singleton
  const fuse = useMemo(
    () =>
      new Fuse(ARCHITECTS, {
        keys: [
          { name: "name.zh", weight: 2 },
          { name: "name.en", weight: 2 },
          { name: "name.native", weight: 1.5 },
          { name: "tags", weight: 1 },
          { name: "bodyText", weight: 0.5 },
        ],
        threshold: 0.4,
        includeScore: true,
      }),
    [],
  );

  // 計算搜尋結果
  const results: SearchResult[] = useMemo(() => {
    if (!query.trim()) {
      // 空狀態：顯示重要性最高的前 8 位
      return [...ARCHITECTS]
        .sort((a, b) => b.importance - a.importance)
        .slice(0, 8);
    }
    return fuse.search(query).slice(0, 12).map((r) => r.item);
  }, [query, fuse]);

  // 鍵盤監聽（全域）
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // ⌘K / Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        toggleOpen();
        return;
      }

      // / 鍵（非 input focus 時）
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        setOpen(true);
        return;
      }

      if (!open) return;

      // ESC 關閉
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }

      // ↑↓ 選擇
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const selected = results[selectedIndex];
        if (selected) {
          router.push(`/architects/${selected.id}`);
          setOpen(false);
          setQuery("");
        }
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, results, selectedIndex, router, setOpen, toggleOpen]);

  // 開啟時 focus input + 重置
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setSelectedIndex(0);
    } else {
      setQuery("");
    }
  }, [open]);

  // query 變動時、reset selectedIndex
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(15, 15, 15, 0.5)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: "10vh",
        animation: "fadeIn 200ms ease-out",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div
        className="glass-frost"
        style={{
          width: "min(640px, 92vw)",
          maxHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          borderRadius: "var(--r-lg)",
          overflow: "hidden",
          padding: "var(--space-4)",
          gap: "var(--space-3)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-3)",
            padding: "0 0 var(--space-3) 0",
            borderBottom: "1px solid var(--line-hair)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--accent-red)",
            }}
          >
            ⌘ K
          </span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜尋建築師、建築、流派..."
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              fontFamily: "var(--font-sans)",
              fontSize: "16px",
              color: "var(--ink-primary)",
            }}
            autoComplete="off"
            spellCheck={false}
          />
        </div>

        {/* Results list */}
        <div
          style={{
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}
        >
          {results.length === 0 ? (
            <div
              style={{
                padding: "var(--space-5)",
                textAlign: "center",
                color: "var(--ink-tertiary)",
                fontFamily: "var(--font-mono)",
                fontSize: "13px",
                letterSpacing: "0.05em",
              }}
            >
              找不到 “{query}”
            </div>
          ) : (
            results.map((result, index) => (
              <button
                key={result.id}
                onClick={() => {
                  router.push(`/architects/${result.id}`);
                  setOpen(false);
                }}
                onMouseEnter={() => setSelectedIndex(index)}
                className="parti-card"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: "var(--space-3)",
                  padding: "var(--space-3) var(--space-4)",
                  background:
                    index === selectedIndex
                      ? "rgba(230, 59, 46, 0.08)"
                      : "transparent",
                  border: "none",
                  borderRadius: "var(--r-sm)",
                  textAlign: "left",
                  cursor: "none",
                  color:
                    index === selectedIndex
                      ? "var(--accent-red)"
                      : "var(--ink-primary)",
                  transition: "background 150ms",
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 300,
                      fontSize: "16px",
                    }}
                  >
                    {result.name.en}
                    <span
                      style={{
                        marginLeft: "var(--space-3)",
                        fontFamily: "var(--font-cjk)",
                        fontWeight: 200,
                        fontSize: "14px",
                        color: "var(--ink-secondary)",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {result.name.zh}
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "10px",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--ink-tertiary)",
                      marginTop: "2px",
                    }}
                  >
                    {result.lifespan[0]}–
                    {result.lifespan[1] >= 2099 ? "" : result.lifespan[1]} ·{" "}
                    {result.nationality.join(" / ")}
                  </div>
                </div>
                {result.isPritzker && (
                  <span
                    className="badge-soft"
                    style={{ alignSelf: "center" }}
                  >
                    Pritzker
                  </span>
                )}
              </button>
            ))
          )}
        </div>

        {/* Footer keyboard hints */}
        <div
          style={{
            display: "flex",
            gap: "var(--space-5)",
            paddingTop: "var(--space-3)",
            borderTop: "1px solid var(--line-hair)",
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--ink-tertiary)",
          }}
        >
          <span>↑ ↓ 選擇</span>
          <span>↵ 跳轉</span>
          <span>ESC 關閉</span>
        </div>
      </div>
    </div>
  );
}
