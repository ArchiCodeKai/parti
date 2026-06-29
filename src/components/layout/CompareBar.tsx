/**
 * CompareBar · 底部浮動比較列（所有頁面共用）
 *
 * 規格見 docs/04-頁面設計/compare-tool.md（Compare Bar 底部浮動）
 * 已選 1+ 人時自動顯示，可移除 / 清空 / 跳 /compare。
 */

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ARCHITECTS } from "@/lib/data/architects";
import { useCompareStore } from "@/store/useCompareStore";

export function CompareBar() {
  const ids = useCompareStore((s) => s.ids);
  const remove = useCompareStore((s) => s.remove);
  const clear = useCompareStore((s) => s.clear);
  const reduceMotion = useReducedMotion();

  // 避免 zustand persist 在 SSR/hydration 時不一致
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const selected = ids
    .map((id) => ARCHITECTS.find((a) => a.id === id))
    .filter((a): a is (typeof ARCHITECTS)[number] => Boolean(a));

  return (
    <AnimatePresence>
      {selected.length > 0 && (
        <motion.div
          className="compare-bar"
          role="region"
          aria-label="比較列"
          initial={reduceMotion ? false : { y: 72 }}
          animate={{ y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { y: 72 }}
          transition={{ duration: 0.32, ease: [0.65, 0, 0.35, 1] }}
        >
          <span className="compare-bar__label">Compare · {selected.length}</span>

          <div className="compare-bar__list">
            {selected.map((a) => (
              <span key={a.id} className="compare-bar__chip">
                {a.name.zh}
                <button
                  type="button"
                  onClick={() => remove(a.id)}
                  aria-label={`從比較移除 ${a.name.zh}`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          <div className="compare-bar__actions">
            <button type="button" className="compare-bar__clear" onClick={clear}>
              清空
            </button>
            <Link className="compare-bar__go" href="/compare">
              比較 →
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
