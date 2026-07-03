/**
 * CompareButton · 加入 / 移除比較
 *
 * mounted guard 避免 zustand persist 的 SSG hydration 不一致。
 */

"use client";

import { useEffect, useState } from "react";
import { useCompareStore } from "@/store/useCompareStore";

export function CompareButton({ id }: { id: string }) {
  const ids = useCompareStore((s) => s.ids);
  const add = useCompareStore((s) => s.add);
  const remove = useCompareStore((s) => s.remove);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isInCompare = mounted && ids.includes(id);

  return (
    <button
      onClick={() => (isInCompare ? remove(id) : add(id))}
      className={`chip-soft ${isInCompare ? "is-active" : ""}`}
    >
      {isInCompare ? "✓ 在比較中" : "+ 加入比較"}
    </button>
  );
}
