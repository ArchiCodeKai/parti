/**
 * CustomCursor · v3.1 自訂朱紅圓 cursor
 *
 * 規格見 CLAUDE_DESIGN_BRIEF.md v3.1：
 * - 預設：12px 朱紅實心圓、mix-blend-mode: multiply（印刷感）
 * - Hover 互動元素：放大為 32px 線圈
 * - 只在 hover-capable 裝置（桌機）啟用
 * - Touch device 自動隱藏、恢復原生 cursor
 */

"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE_SELECTOR =
  'a, button, .parti-card, .parti-link, .sticker, [role="button"], input, textarea, select';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 只在桌機（有真實 hover）啟用、touch device 不執行
    if (!window.matchMedia("(hover: hover)").matches) {
      // touch device：恢復原生 cursor
      document.body.style.cursor = "auto";
      return;
    }

    const cursor = cursorRef.current;
    if (!cursor) return;

    let rafId: number | null = null;
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // 第一次移動 → 顯示 cursor
      if (!cursor.classList.contains("is-visible")) {
        cursor.classList.add("is-visible");
        currentX = mouseX;
        currentY = mouseY;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = !!target.closest(INTERACTIVE_SELECTOR);
      cursor.classList.toggle("is-big", isInteractive);
    };

    const handleMouseLeave = () => {
      cursor.classList.remove("is-visible");
    };

    // 平滑跟隨（lerp 0.25 = 輕微 lag、有質感）
    const update = () => {
      currentX += (mouseX - currentX) * 0.25;
      currentY += (mouseY - currentY) * 0.25;
      cursor.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(update);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    update();

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />;
}
