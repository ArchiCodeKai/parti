/**
 * useHiddenUntilTouched · v3.1 核心 UX hook
 *
 * 詳細規範見 docs/03-元件設計/hidden-until-touched.md
 */

import { useEffect, useRef, useState, useCallback } from "react";

interface HiddenUntilTouchedOptions {
  /** 載入後 peek 時間（ms）、預設 800 */
  initialPeekMs?: number;
  /** 停止互動多久後隱藏（ms）、預設 3000 */
  hideAfterIdleMs?: number;
  /** scroll trigger 啟用 */
  triggerOnScroll?: boolean;
  /** hover trigger 啟用 */
  triggerOnHover?: boolean;
  /** scroll 達多少 percent 觸發、預設 18 */
  scrollThresholdPercent?: number;
}

export function useHiddenUntilTouched(
  options: HiddenUntilTouchedOptions = {},
) {
  const {
    initialPeekMs = 800,
    hideAfterIdleMs = 3000,
    triggerOnScroll = true,
    triggerOnHover = true,
    scrollThresholdPercent = 18,
  } = options;

  const [visible, setVisible] = useState(false);
  const idleTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const peekTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Initial peek
  useEffect(() => {
    if (initialPeekMs <= 0) return;

    peekTimerRef.current = setTimeout(() => {
      setVisible(true);
      setTimeout(() => setVisible(false), 1500);
    }, initialPeekMs);

    return () => {
      if (peekTimerRef.current) clearTimeout(peekTimerRef.current);
    };
  }, [initialPeekMs]);

  // Activity handler（hover / scroll / mouse move 都呼這個）
  const onActivity = useCallback(() => {
    setVisible(true);
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(
      () => setVisible(false),
      hideAfterIdleMs,
    );
  }, [hideAfterIdleMs]);

  // Scroll trigger
  useEffect(() => {
    if (!triggerOnScroll) return;

    const handleScroll = () => {
      const scrollPercent =
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100;

      if (scrollPercent >= scrollThresholdPercent) {
        onActivity();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [triggerOnScroll, scrollThresholdPercent, onActivity]);

  return { visible, onActivity };
}
