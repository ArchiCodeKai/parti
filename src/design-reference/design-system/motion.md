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

## Framer Motion 使用規則

> 本專案已安裝 `motion-framer` Codex skill。實作或 review Framer Motion 相關功能時，先套用該 skill 的 component animation、variants、gesture、layout animation、`AnimatePresence` 與 accessibility 規則，再套用本節的 PARTI 專案限制。

- PARTI 目前 runtime dependency 是 `framer-motion`，不是新版 `motion` 套件；不要自動把 import 改成 `motion/react`。
- Framer Motion 負責 component-level animation：卡片 hover/tap、SVG path/polygon reveal、`useMotionValue` 狀態驅動、`useReducedMotion`、`AnimatePresence` 與 layout animation。
- Pyramid hero 的幾何 reveal、SVG element 動畫與小型狀態轉場可優先使用 Framer Motion。
- Architect card、compare tool、modal、command palette 這類互動元件可優先使用 Framer Motion。
- 不要用 Framer Motion 重寫既有 GSAP / Lenis / ScrollTrigger landing deck，除非任務明確要求遷移並先比較 trade-off。
- 所有 Framer Motion 動畫都必須尊重 `useReducedMotion()` 或等價的 reduced-motion 邏輯。
- 大量列表或 scroll scrub 場景避免替每個 item 建立過多 MotionValue 或 layout animation；必要時先限制動畫元素數量。

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

## GSAP / ScrollTrigger 規則

> 本專案已安裝官方 GSAP Codex skills。實作或 review GSAP 相關功能時，優先套用 `gsap-react`、`gsap-scrolltrigger`、`gsap-timeline`、`gsap-core` 與 `gsap-performance` 的規則，再套用本節的 PARTI 專案限制。

- GSAP / Lenis 僅在 client component 中使用，並優先 dynamic import，避免增加初始 bundle。
- 目前 runtime dependency 有 `gsap`，但沒有 `@gsap/react`；除非要新增共用 React GSAP abstraction，否則沿用既有 `useEffect` + dynamic import + `gsap.context()` 模式。
- Scroll-linked 區塊以 scroll position 作為 source of truth；chapter nav 應導向 timeline 位置，不只切換 local state。
- Landing pinned section 不能長時間畫面不變；每段滾動都要有可見的標題、卡片、材質或構圖變化。
- React unmount 時必須 cleanup：`gsap.context().revert()`、`ScrollTrigger`、`gsap.ticker`、`Lenis` listener 與 instance。
- 必須尊重 `prefers-reduced-motion`，減少動畫時提供靜態可讀狀態。
- Scroll scrub 中優先動畫化 `transform`、`opacity` 與 CSS variables；避免頻繁動畫化 `width`、`height`、`top`、`left`、`margin`、`padding`。
- 視覺語言維持 Glass Editorial、Hidden-until-Touched、建築幾何與材質分層；不要套用 HUD、SaaS dashboard 或過度遊戲化動效。
