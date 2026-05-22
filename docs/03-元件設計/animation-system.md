# 動畫系統設計

## 設計宗旨

> 「動畫宗旨：建築物建構的過程」 — 貫穿整個網站

所有動畫應該感覺像「**圖正在被畫出來**」、「**結構正在被組裝**」、「**圖層正在被堆疊**」。

避免：彈跳、震動、粒子噴發、Disney 風活潑。
追求：絲滑、勻速、有方向性、像建築師畫圖的節奏。

## 動畫時長規範

| 互動類型 | 時長 | Easing |
|---|---|---|
| Hover 反饋 | 200ms | ease-out |
| 元件 fade in | 300ms | ease-out |
| Stagger reveal（多元素依序）| 50ms × N | ease-out |
| 頁面切換 | 400ms | cubic-bezier(0.4, 0, 0.2, 1) |
| 大型 morph（卡片變 hero） | 600ms | cubic-bezier(0.65, 0, 0.35, 1) |
| Force graph tick | 持續 | spring physics |

**任何動畫不超過 800ms**。超過用戶就會覺得慢。

## 同時動畫元素限制

任一畫面中、同時跑動畫的元素 **不超過 3 個**。
否則：
- 視覺噪音、用戶眼睛追不到焦點
- Awwwards 扣分（評審不喜歡 motion overload）

## 核心動畫類型

### 1. Path Drawing（線條繪製）

SVG path 從 0% 畫到 100%、像建築師畫圖。

```typescript
<motion.path
  d="M 0 0 L 100 100"
  initial={{ pathLength: 0 }}
  animate={{ pathLength: 1 }}
  transition={{ duration: 1.2, ease: "easeInOut" }}
/>
```

**用在**：建築線稿肖像、流派圖示、卡片邊框、時間軸繪製。

### 2. Stagger Reveal（依序浮現）

多個元素依序 fade in、間隔 50ms。

```typescript
<motion.div
  variants={{
    show: {
      transition: { staggerChildren: 0.05 }
    }
  }}
>
  {items.map(item => (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 }
      }}
    />
  ))}
</motion.div>
```

**用在**：馬賽克牆載入、相關詞條 list、流派內人物排列。

### 3. Card Morph（卡片變 hero）

點擊卡片、卡片放大成下一頁 hero、用 View Transitions API。

```typescript
// pages
<div style={{ viewTransitionName: `card-${id}` }} />

// onClick
document.startViewTransition(() => router.push(`/architects/${id}`));
```

**用在**：人物 / 建築卡片點擊跳轉。

### 4. Geometry Build（幾何構建）

三點定圓、Voronoi 細胞、Delaunay 三角網依序「建構」起來。

- 先三點 fade in
- 再連線依序畫出
- 最後外接圓 path drawing

**用在**：流派頁 hero、Landing force graph、/about 頁。

### 5. Smooth Scroll（Lenis 全站）

全站 scroll 用 Lenis 接管、有慣性。

```typescript
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});
```

### 6. Compare 視覺化動畫（hero piece）

詳細劇本見 `docs/04-頁面設計/compare-tool.md`。

關鍵動畫片段：

```typescript
// 狀態 2：中垂線從中心向兩側畫出
<motion.line
  initial={{ x1: midpoint, x2: midpoint }}
  animate={{ x1: leftEnd, x2: rightEnd }}
  transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
/>

// 狀態 3：外接圓 path drawing
<motion.circle
  initial={{ pathLength: 0 }}
  animate={{ pathLength: 1 }}
  transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
/>

// 圓視覺隨離散度漸變
const dispersion = calculateDispersion(architects);
<motion.circle
  animate={{
    r: 80 + dispersion * 200,
    fill: `hsla(5, ${80 - dispersion * 50}%, 50%, ${1 - dispersion * 0.5})`,
  }}
  transition={{ duration: 0.6 }}
/>
```

**用在**：`/compare` 比較工具頁。

### 7. Scroll-Driven Pyramid（Landing Hero · v3.1 ⭐）

Landing 頁的 hero pyramid 動畫、完全 scroll-driven、可逆。

詳細劇本見 `docs/04-頁面設計/landing-hero.md`。

關鍵實作：

```typescript
import { useScroll, useTransform, motion } from "framer-motion";

const { scrollYProgress } = useScroll();
const triangleRotate = useTransform(scrollYProgress, [0.3, 0.5], [0, -90]);
const tuShift = useTransform(scrollYProgress, [0.05, 0.3], [0, 80]);
const pyramidLines = useTransform(scrollYProgress, [0.85, 1], [0, 1]);
```

特色：
- 純三角形（不是旗子）從「築」「圖」之間擠出
- 把「圖」往右推
- 旋轉倒下變正三角形
- 像素鋸齒邊緣（zentto.com 風）
- 由下往上畫金字塔格線
- 反向 scroll → 動畫逆向、完全可逆

### 8. Hidden-until-Touched（v3.1 核心 UX）

詳細規範見 `docs/03-元件設計/hidden-until-touched.md`。

預設元素 `opacity: 0` + `transform: translateY(8px)`、觸發後 320ms fade in、停止互動 3 秒後 500ms fade out。

### 9. Scroll-Driven Reveal

GSAP ScrollTrigger 或 IntersectionObserver、元素進入 viewport 時觸發動畫。

**用在**：流動敘事頁（運動分類）、條目頁的長內文段落。

## Cursor 互動

| 元素 | Cursor |
|---|---|
| 可點擊文字 | `cursor: zoom-in`（放大鏡） |
| 卡片 | `cursor: zoom-in` |
| 拖曳元素（時間軸） | `cursor: grab` / `grabbing` |
| 一般文字 | `cursor: default` |
| 鏈接 | `cursor: pointer` |

## 文字 hover 動畫（最關鍵）

> 整篇文章顯示一致、極簡。只有 hover 時提示可點擊。

```typescript
// Inline link (without underline by default)
.parti-link {
  color: inherit;
  cursor: zoom-in;
  transition: color 200ms ease-out;
  position: relative;
}

.parti-link:hover {
  color: var(--accent-red);
}

// Hover：下方一條短線「畫出」
.parti-link::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--accent-red);
  transition: width 200ms ease-out;
}

.parti-link:hover::after {
  width: 100%;
}
```

## 無障礙

必須尊重 `prefers-reduced-motion`：

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 不要做的

- ✘ 彈跳 / 震動效果
- ✘ 過度的 stagger（>10 個元素同時依序動）
- ✘ 旋轉超過 360° 的元素
- ✘ 動畫超過 800ms
- ✘ 同時 3 個以上元素動
- ✘ 視差 scroll 過度（單頁不超過 2 層視差）
