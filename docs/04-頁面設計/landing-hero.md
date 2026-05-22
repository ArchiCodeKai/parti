# Landing Page 設計

## 頁面結構（四屏）

```
═══════════════════════════════════════════
[屏 1：Hero  100vh]

           一部建築圖鑑

       PARTI · An Atlas of Modern
             Architecture

         scroll ↓ 200+ 條目
═══════════════════════════════════════════
[屏 2：4 大入口  100vh]

  ┌─────────┐  ┌─────────┐
  │  人物    │  │   建築   │
  │ ARCHITECTS │ │  BUILDINGS │
  │    200+   │ │    600+   │
  └─────────┘  └─────────┘

  ┌─────────┐  ┌─────────┐
  │  運動    │  │   地圖   │
  │ MOVEMENTS │ │    MAP    │
  │     20    │ │  WORLD    │
  └─────────┘  └─────────┘
═══════════════════════════════════════════
[屏 3：策展宣言  100vh]

    「我們用幾何原理本身
     呈現建築知識的結構」

         — about the project
═══════════════════════════════════════════
[屏 4：隨機 10 條精選]

  RANDOM PICKS

  ◦ Carlo Scarpa 卡羅·斯卡帕
  ◦ 廊香教堂 Notre Dame du Haut
  ◦ Brutalism 粗獷主義
  ◦ ...

  [刷新看下一批 10 條]
═══════════════════════════════════════════
```

## 屏 1：Hero（v3.1 · Scroll-Driven Pyramid）

### 文字 stack

```
[Display 200 滿版]
一 部 建 築 圖 鑑
font-family: "Inter Tight" 200, "PingFang TC" 200
font-size: var(--text-mega) → clamp(72px, 11vw, 180px)
letter-spacing: 0.02em
line-height: 1.0

[Mono uppercase 副標、隱藏式 hidden-until-touched]
PARTI · An Atlas of Modern Architecture
font-size: 11px / letter-spacing: 0.18em / uppercase
color: var(--ink-tertiary)
載入 800ms peek、之後 hover/scroll 才出現
```

### 背景

- `var(--bg-page)` #FCFBF8（接近白）
- **無紋理 / 無 noise overlay**（v3.1 移除 paper grain）

### 角落裝飾

**完全移除**（v3.1）。沒有朱紅小圓、沒有黑斜線、沒有灰青三角。
所有「生命」來自動畫、不來自靜態裝飾。

---

## ⭐ Scroll-Driven Pyramid 動畫（核心 wow moment）

### 動畫宗旨

「築」「圖」之間出現純三角形 → 把「圖」字往右擠 → 三角形倒下變正三角形 → 邊緣變像素鋸齒 → 從底部由下往上畫格線變金字塔。

**可逆**：用戶往上 scroll 回頂端時、動畫反向播放、文字回原位、金字塔消失。

### 動畫劇本（scroll progress 0 → 1）

```
[scroll 0%]  初始
═══════════════════════════════════════
        一  部  建  築   圖  鑑
═══════════════════════════════════════
四個字正常間距、靜止。

[scroll 5%]  ▶ 三角形從「築」「圖」之間出現
═══════════════════════════════════════
        一  部  建  築 ▶ 圖  鑑
═══════════════════════════════════════
純三角形（朱紅 #E63B2E）從 width 0 → 完整顯示（200ms ease-out）

[scroll 15%]  ▶ 把「圖」往右推
═══════════════════════════════════════
        一  部  建  築 ▶▶  圖  鑑
═══════════════════════════════════════
三角形寬度增加、「圖」字 translateX +N（0→80px）

[scroll 30%]  ▶ 最大寬度
═══════════════════════════════════════
        一  部  建  築 ▶▶▶▶  圖  鑑
═══════════════════════════════════════

[scroll 50%]  三角形旋轉 / 倒下
═══════════════════════════════════════
        一  部  建  築   ◢   圖  鑑
═══════════════════════════════════════
從 ▶（指右）旋轉到 ▲（向上）
rotate -90deg、500ms ease-emphasized

[scroll 65%]  變正三角形
═══════════════════════════════════════
        一  部  建  築   ▲   圖  鑑
═══════════════════════════════════════
朱紅正三角、底邊與基線對齊

[scroll 75%]  邊緣變像素鋸齒
═══════════════════════════════════════
        一  部  建  築   △   圖  鑑   ← 像素邊緣
═══════════════════════════════════════
zentto.com 風格、用 SVG path 或 clip-path 實作

[scroll 85%]  從底部開始畫格線
═══════════════════════════════════════
        一  部  建  築   ▲   圖  鑑
                       ═══         ← 底部第一條線
═══════════════════════════════════════

[scroll 95%]  格線往上畫完
═══════════════════════════════════════
        一  部  建  築   ▲   圖  鑑
                       ═══
                       ═══
                       ═══         ← 多條橫線
                       ═══         ← 由下往上 path drawing
                       ═══
═══════════════════════════════════════

[scroll 100%]  完成
═══════════════════════════════════════
        一  部  建  築  [像素金字塔]  圖  鑑
═══════════════════════════════════════
完整像素金字塔成形、保持狀態
```

### Scroll Reverse（往上滾、可逆）

當 scroll progress 反向：
- 所有上述動畫**逆向播放**
- 金字塔線條淡出 → 像素邊緣變平滑 → 三角形旋轉回 ▶ → 「圖」字 translateX 0 → 三角形消失
- 用戶 scroll 回頂端、回到初始狀態

### 技術實作

```typescript
// 用 Framer Motion useScroll
const { scrollYProgress } = useScroll();

// 三角形旋轉：scroll 30% → 50% 之間從 0 → -90deg
const triangleRotate = useTransform(scrollYProgress, [0.3, 0.5], [0, -90]);

// 「圖」字位移：scroll 5% → 30% 從 0 → 80px
const tuShift = useTransform(scrollYProgress, [0.05, 0.3], [0, 80]);

// 三角形寬度：scroll 5% → 30% 從 0 → 100%
const triangleWidth = useTransform(scrollYProgress, [0.05, 0.3], [0, 1]);

// 像素鋸齒切換（clip-path）：scroll 65% → 75%
// 金字塔格線（path drawing 從底部往上）：scroll 85% → 100%
const pyramidLines = useTransform(scrollYProgress, [0.85, 1], [0, 1]);
```

### 像素鋸齒邊緣 SVG（zentto.com 風）

```svg
<svg viewBox="0 0 100 100">
  <path d="
    M 50 0
    L 55 5 L 50 10 L 60 15 L 55 20 L 65 25 L 60 30
    L 70 35 L 65 40 L 75 45 L 70 50 L 80 55 L 75 60
    L 85 65 L 80 70 L 90 75 L 85 80 L 95 85 L 90 90 L 100 95 L 100 100
    L 0 100 L 0 95 L 10 90 L 5 85 L 15 80 L 10 75
    L 20 70 L 15 65 L 25 60 L 20 55 L 30 50 L 25 45
    L 35 40 L 30 35 L 40 30 L 35 25 L 45 20 L 40 15
    L 50 10 L 45 5 L 50 0
    Z
  " fill="var(--accent-red)" />
</svg>
```

（數值需微調、模擬「8-bit 像素風」鋸齒）

### 金字塔格線 SVG

```svg
<g class="pyramid-lines" stroke="var(--accent-red-dim)" stroke-width="0.5">
  <line x1="42" y1="20"  x2="58"  y2="20" />
  <line x1="36" y1="30"  x2="64"  y2="30" />
  <line x1="30" y1="40"  x2="70"  y2="40" />
  <line x1="24" y1="50"  x2="76"  y2="50" />
  <line x1="18" y1="60"  x2="82"  y2="60" />
  <line x1="12" y1="70"  x2="88"  y2="70" />
  <line x1="6"  y1="80"  x2="94"  y2="80" />
  <line x1="0"  y1="90"  x2="100" y2="90" />
</g>
```

由底（scroll 85%）往上（scroll 100%）stroke-dashoffset 0 → 1 依序畫出。

### Reduced Motion fallback

```css
@media (prefers-reduced-motion: reduce) {
  .pyramid-container {
    opacity: 1;
    /* 直接顯示完成狀態、無動畫 */
  }
}
```

## 屏 2：4 大入口

### 排版

- 2 × 2 grid
- 每卡 40vw × 40vh（桌機）
- 卡片邊框 1px 黑
- Hover：邊框朱紅、卡片內出現代表元素（人物 = 線稿肖像、建築 = 平面線稿、運動 = 幾何 motif、地圖 = 經緯線）

### 卡片底層動畫

每卡有一個小型 force graph 動態漂浮（極淡灰、節點 5–10 個）暗示「進入後是網絡」。

## 屏 3：策展宣言

### 文字

```
[超大 Serif、置中]
「我們用幾何原理本身
 呈現建築知識的結構」

[極小、上方 mono label]
— about the project

[CTA 連結]
→ 閱讀完整策展論述
```

### 動畫

進入此屏時、Scroll-Driven Reveal：
- 引號淡入
- 文字字字依序浮現（stagger 50ms）
- 背景出現「三點定圓」動畫（path drawing）

## 屏 4：隨機 10 條精選

### 邏輯

- Build-time 隨機抽 10 條（500 字以上的條目）
- Refresh 頁面 → 不同 10 條
- 點擊「刷新」按鈕 → 不重載頁面、即時換 10 條

### 視覺

純文字 list、像書目錄：

```
RANDOM PICKS · 10 / 1000

01  Carlo Scarpa 卡羅·斯卡帕         · 義大利工藝現代主義
02  廊香教堂 Notre Dame du Haut    · 1955 · 粗獷主義
03  Brutalism 粗獷主義              · 1950–1975
04  Frank Lloyd Wright 萊特       · 1867–1959 · 有機建築
05  落水山莊 Fallingwater          · 1935
06  包浩斯 Bauhaus                · 1919–1933
07  Tadao Ando 安藤忠雄            · 批判性地域主義
08  Mies van der Rohe 密斯         · less is more
09  邁向建築 Vers une architecture · 柯比意 1923
10  代謝派 Metabolism              · 日本 1960–1975

[刷新看下一批 10 條 →]
```

## 互動

- Scroll：Lenis 接管、絲滑下捲
- 各屏元素 Scroll-Driven Reveal
- 屏 2 4 大入口 Hover：卡片邊框朱紅 + 內部 force graph 強化
- 屏 4 條目 Hover：詞條變朱紅、左側 01–10 編號變灰

## SEO Meta

```
<title>PARTI — 一部建築圖鑑 | An Atlas of Modern Architecture</title>
<meta description="200+ 位建築師、600+ 件建築、20 個流派。用幾何原理本身呈現建築知識的結構。" />
<meta og:image="/og/landing.png" />
```
