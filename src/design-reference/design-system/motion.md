# 動畫規範（Motion System）

> 動畫宗旨：建築物建構的過程

詳細元件動畫設計請參考 `docs/03-元件設計/animation-system.md`。
本文件僅作為 token 與規範定義。

## 時長 tokens · v3.1

```css
:root {
  --duration-fast:  150ms;
  --duration-base:  220ms;   /* hover 預設、v3.1 從 200 調為 220 */
  --duration-mid:   320ms;
  --duration-slow:  500ms;
  --duration-morph: 680ms;   /* 大型 morph */
}
```

## Easing tokens · v3.1

```css
:root {
  --ease-out:        cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out:     cubic-bezier(0.4, 0, 0.2, 1);
  --ease-emphasized: cubic-bezier(0.65, 0, 0.35, 1);
  --ease-expo:       cubic-bezier(0.16, 1, 0.3, 1);    /* v3.1 新增 */
}
```

**禁止 bounce** — 不符合 Glass Editorial 氣質。

## 動畫類型對照

| 互動 | 時長 | Easing |
|---|---|---|
| Hover 顏色變化 | `--duration-base` | `--ease-out` |
| Hover scale | `--duration-base` | `--ease-out` |
| 元件 fade in | `--duration-mid` | `--ease-out` |
| Stagger reveal step | 50ms | `--ease-out` |
| 頁面切換 (View Transitions) | `--duration-page` | `--ease-in-out` |
| 卡片 morph 到 hero | `--duration-morph` | `--ease-emphasized` |
| Path drawing（線稿繪製） | 1200ms | `--ease-in-out` |

## 不允許的動畫

- ✘ 任何超過 800ms 的單一動畫（除了 path drawing）
- ✘ Bounce easing（除非極特殊場景）
- ✘ 旋轉超過 360°
- ✘ 同畫面超過 3 個元素同時動
- ✘ 整頁式抖動 / 震動效果

## 鼠標 cursor

```css
:root {
  --cursor-default: default;
  --cursor-pointer: pointer;
  --cursor-zoom: zoom-in;
  --cursor-grab: grab;
  --cursor-grabbing: grabbing;
}

.parti-link {
  cursor: var(--cursor-zoom);
}

.parti-card {
  cursor: var(--cursor-zoom);
}

.timeline-draggable {
  cursor: var(--cursor-grab);
}

.timeline-draggable:active {
  cursor: var(--cursor-grabbing);
}
```

## 可訪問性

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

## Framer Motion 預設

```typescript
// src/lib/motion.ts
export const FADE_IN = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: [0.0, 0.0, 0.2, 1] },
};

export const STAGGER_CONTAINER = {
  initial: {},
  animate: { transition: { staggerChildren: 0.05 } },
};

export const PATH_DRAW = {
  initial: { pathLength: 0 },
  animate: { pathLength: 1 },
  transition: { duration: 1.2, ease: [0.4, 0.0, 0.2, 1] },
};
```

## Lenis 預設

```typescript
// src/lib/lenis.ts
import Lenis from "lenis";

export const lenisOptions = {
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 1.5,
};
```
