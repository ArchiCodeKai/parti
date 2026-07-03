/**
 * TagBar · 流派標籤列（Hidden-until-Touched）
 *
 * 載入 800ms 後 peek 2 秒、滑鼠移動時顯示、閒置 3 秒淡出。
 * 規格見 docs/03-元件設計/hidden-until-touched.md
 */

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { colorFor } from "./movementColors";

interface TagBarProps {
  movements: Array<{ id: string; weight: "primary" | "secondary" }>;
}

export function TagBar({ movements }: TagBarProps) {
  const [visible, setVisible] = useState(false);
  const idleTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    // 載入 800ms peek
    const peek = setTimeout(() => {
      setVisible(true);
      idleTimerRef.current = setTimeout(() => setVisible(false), 2000);
    }, 800);

    const handleMouseMove = () => {
      setVisible(true);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => setVisible(false), 3000);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      clearTimeout(peek);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className={`huk-hidden ${visible ? "is-visible" : ""}`}
      style={{
        display: "flex",
        gap: "var(--space-2)",
        flexWrap: "wrap",
        marginTop: "var(--space-4)",
      }}
    >
      {movements.map((m) => (
        <Link
          key={m.id}
          href={`/movements/${m.id}`}
          className="badge-soft"
          style={{
            background:
              m.weight === "primary"
                ? `${colorFor(m.id)}30`
                : "rgba(15,15,15,0.04)",
            color: colorFor(m.id),
            textDecoration: "none",
            cursor: "none",
          }}
        >
          {m.id.replace(/-/g, " ").toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
