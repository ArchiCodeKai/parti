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

import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import {
  SEARCH_INDEX,
  DEFAULT_DOCS,
  SEARCH_TYPE_LABEL,
  SEARCH_TYPE_ORDER,
  type SearchDoc,
} from "@/lib/search";
import { useCmdKStore } from "@/store/useCmdKStore";

export function CmdKDialog() {
  const router = useRouter();
  const open = useCmdKStore((s) => s.open);
  const setOpen = useCmdKStore((s) => s.setOpen);
  const toggleOpen = useCmdKStore((s) => s.toggle);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fuse.js singleton（三類 entity 統一索引）
  const fuse = useMemo(
    () =>
      new Fuse(SEARCH_INDEX, {
        keys: [
          { name: "nameZh", weight: 2 },
          { name: "nameEn", weight: 2 },
          { name: "tags", weight: 1 },
          { name: "body", weight: 0.5 },
        ],
        threshold: 0.4,
        includeScore: true,
      }),
    [],
  );

  // 搜尋結果（空 query 顯示重要性排序的建築師）
  const results: SearchDoc[] = useMemo(() => {
    if (!query.trim()) return DEFAULT_DOCS;
    return fuse.search(query).slice(0, 20).map((r) => r.item);
  }, [query, fuse]);

  // 依 type 分組（固定組別順序），攤平成鍵盤導航用的列，首列標記 groupHead
  const rows = useMemo(() => {
    const out: Array<{ doc: SearchDoc; index: number; groupHead: boolean }> = [];
    let index = 0;
    for (const type of SEARCH_TYPE_ORDER) {
      results
        .filter((r) => r.type === type)
        .forEach((doc, i) => {
          out.push({ doc, index, groupHead: i === 0 });
          index += 1;
        });
    }
    return out;
  }, [results]);

  const flatDocs = useMemo(() => rows.map((r) => r.doc), [rows]);

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
        setSelectedIndex((prev) => Math.min(prev + 1, flatDocs.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const selected = flatDocs[selectedIndex];
        if (selected) {
          router.push(selected.route);
          setOpen(false);
          setQuery("");
        }
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, flatDocs, selectedIndex, router, setOpen, toggleOpen]);

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
            role="combobox"
            aria-expanded
            aria-controls="cmdk-listbox"
            aria-autocomplete="list"
            aria-activedescendant={
              flatDocs[selectedIndex] ? `cmdk-opt-${selectedIndex}` : undefined
            }
            aria-label="搜尋建築師、建築、流派"
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
          id="cmdk-listbox"
          role="listbox"
          aria-label="搜尋結果"
          style={{
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}
        >
          {flatDocs.length === 0 ? (
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
            rows.map(({ doc, index, groupHead }) => (
              <Fragment key={`${doc.type}-${doc.id}`}>
                {groupHead && (
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "9px",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "var(--ink-tertiary)",
                      padding: "var(--space-3) var(--space-4) var(--space-2)",
                    }}
                  >
                    {SEARCH_TYPE_LABEL[doc.type]}
                  </div>
                )}
                <button
                  id={`cmdk-opt-${index}`}
                  role="option"
                  aria-selected={index === selectedIndex}
                  onClick={() => {
                    router.push(doc.route);
                    setOpen(false);
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className="parti-card"
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "var(--space-3)",
                    padding: "var(--space-3) var(--space-4)",
                    background:
                      index === selectedIndex
                        ? "rgba(230, 59, 46, 0.08)"
                        : "transparent",
                    border: "none",
                    borderRadius: "var(--r-sm)",
                    textAlign: "left",
                    color:
                      index === selectedIndex
                        ? "var(--accent-red)"
                        : "var(--ink-primary)",
                    transition: "background 150ms",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 300,
                      fontSize: "16px",
                    }}
                  >
                    {doc.nameEn}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-cjk)",
                      fontWeight: 200,
                      fontSize: "14px",
                      color: "var(--ink-secondary)",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {doc.nameZh}
                  </span>
                </button>
              </Fragment>
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
