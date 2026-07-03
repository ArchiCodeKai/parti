/**
 * Pullquote · scroll-to-reveal 摺疊霜玻璃
 */

"use client";

import { useEffect, useRef, useState } from "react";

export function Pullquote({ text }: { text: string }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.4 },
    );
    observer.observe(ref.current);

    // Fallback：1.2s 後仍未 trigger 就強制展開
    const fallback = setTimeout(() => setVisible(true), 1200);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="glass-frost"
      style={{
        margin: "var(--space-7) 0",
        padding: visible ? "var(--space-7) var(--space-6)" : "var(--space-3)",
        borderRadius: "var(--r-lg)",
        textAlign: "center",
        transition: "padding 680ms var(--ease-emphasized)",
        overflow: "hidden",
      }}
    >
      {visible ? (
        <p
          style={{
            fontFamily: "var(--font-editorial)",
            fontStyle: "italic",
            fontSize: "var(--text-xl)",
            color: "var(--ink-primary)",
            margin: 0,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 500ms 200ms, transform 500ms 200ms",
          }}
        >
          {text}
        </p>
      ) : (
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--ink-tertiary)",
            margin: 0,
          }}
        >
          Quote · Scroll to Reveal
        </p>
      )}
    </div>
  );
}
