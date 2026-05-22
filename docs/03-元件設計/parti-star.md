# PARTI Star — 通用裝飾 / 跳轉符號

## 是什麼

12 角放射狀星形 SVG、PARTI 的「**通用視覺記號**」。

用於：頁面跳轉指示、角落裝飾、載入狀態、空狀態、CTA 前綴、404 頁面、Loading spinner。

## SVG Source（權威來源）

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor">
  <path d="M 152 70.059 L 201.539 20.519 L 235.48 54.461 L 185.941 104 L 256 104 L 256 152 L 185.941 152 L 235.48 201.539 L 201.539 235.48 L 152 185.941 L 152 256 L 104 256 L 104 185.941 L 54.46 235.48 L 20.52 201.539 L 70.059 152 L 0 152 L 0 104 L 70.059 104 L 20.519 54.46 L 54.461 20.52 L 104 70.059 L 104 0 L 152 0 Z"/>
</svg>
```

**注意**：用 `fill="currentColor"`、不寫死顏色（讓 CSS `color` 決定）。

## 設計概念

這個符號在建築 / PARTI 脈絡有 4 重隱喻：

| 隱喻 | 意義 |
|---|---|
| **羅盤** | 引導用戶探索方向 |
| **放射狀廣場** | 像巴黎凱旋門廣場的 8 條放射街道、建築學經典 |
| **太陽 / 光芒** | 構成主義常見的「光輝」符號（El Lissitzky） |
| **建築十字軸** | 中軸線 + 對角線 = 建築平面 4 個基本方向 |

## 使用情境（8 個）

### 1. 頁面跳轉指示
按鈕 / 連結文字尾端：「比較 → ✦」

### 2. 載入中 Spinner
代替預設 spinner、自旋動畫（800ms / 圈）

### 3. 空狀態 placeholder
「找不到結果」頁面正中央、大尺寸（80px）+ 慢速呼吸動畫

### 4. 角落裝飾
4 屏 Landing 的某屏角落、小尺寸（16px）、靜止

### 5. CTA 按鈕前綴
「+ 加入比較 ✦」「→ 進入流派頁 ✦」

### 6. 新內容 / featured 標記
近期新加入的建築師卡片角落、極小（12px）、朱紅色

### 7. 404 / 錯誤頁主視覺
中央超大尺寸（128px）、緩慢自旋

### 8. Cmd+K 開啟動畫
面板浮現時、左上角 PARTI Star 從 scale 0 → 1（200ms）

## 尺寸變體

```css
:root {
  --star-xs: 12px;    /* 角落極小裝飾、新內容標記 */
  --star-sm: 16px;    /* 按鈕前綴、Hover 提示 */
  --star-md: 24px;    /* CTA、頁面跳轉指示 */
  --star-lg: 32px;    /* 載入中、空狀態小型 */
  --star-xl: 48px;    /* 大型 hero 裝飾 */
  --star-2xl: 80px;   /* 空狀態 placeholder */
  --star-3xl: 128px;  /* 404 主視覺 */
}
```

## 顏色變體

| 用途 | 顏色 |
|---|---|
| 預設裝飾 | `var(--ink-tertiary)` 淡灰 #7A7A7A |
| Hover / 強調 | `var(--accent-red)` 朱紅 |
| 載入中 | `var(--accent-cyan)` 灰青 |
| 反白（深色背景） | `var(--bg-paper)` 米白 |
| 極淡裝飾 | `var(--line-soft)` 15% 黑 |

## 動畫類型（6 種）

### A. Static（靜止）
無動畫、純裝飾。

### B. Breathe（呼吸）
緩慢自旋 + 微微放大縮小。

```css
@keyframes star-breathe {
  0%, 100% { transform: rotate(0deg) scale(1); }
  50%      { transform: rotate(15deg) scale(1.05); }
}
.parti-star--breathe {
  animation: star-breathe 8s ease-in-out infinite;
}
```

**用在**：角落裝飾、空狀態。

### C. Spin（自旋）
持續旋轉、像 loading spinner。

```css
@keyframes star-spin {
  to { transform: rotate(360deg); }
}
.parti-star--spin {
  animation: star-spin 800ms linear infinite;
}
```

**用在**：載入中、頁面切換過渡。

### D. Pulse（脈動）
點擊瞬間 scale 1 → 1.2 → 1。

```css
@keyframes star-pulse {
  0%, 100% { transform: scale(1); }
  50%      { transform: scale(1.2); }
}
.parti-star--pulse {
  animation: star-pulse 200ms ease-out;
}
```

**用在**：按鈕點擊反饋、收藏成功瞬間。

### E. Hover-Rotate（hover 加速旋轉）
靜止 → hover 時開始 1 秒一圈。

```css
.parti-star {
  transition: transform 200ms ease-out;
}
.parti-star:hover {
  animation: star-spin 1s linear infinite;
  color: var(--accent-red);
}
```

**用在**：CTA 按鈕、可互動連結。

### F. Page-Transition（頁面切換）
從 scale 0 → 1 → 0、600ms 完成。

```css
@keyframes star-page-in {
  0%   { transform: scale(0) rotate(0); opacity: 0; }
  50%  { transform: scale(1) rotate(180deg); opacity: 1; }
  100% { transform: scale(0) rotate(360deg); opacity: 0; }
}
.parti-star--page-transition {
  animation: star-page-in 600ms ease-emphasized;
}
```

**用在**：路由切換之間短暫顯示。

## React 元件 API

```typescript
// src/components/ui/PartiStar.tsx

interface PartiStarProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  color?: "tertiary" | "primary" | "accent-red" | "accent-cyan" | "soft";
  animation?: "static" | "breathe" | "spin" | "pulse" | "hover-rotate" | "page-transition";
  className?: string;
}

export function PartiStar({
  size = "md",
  color = "tertiary",
  animation = "static",
  className = "",
}: PartiStarProps) {
  return (
    <svg
      className={`parti-star parti-star--${size} parti-star--${color} parti-star--${animation} ${className}`}
      viewBox="0 0 256 256"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M 152 70.059 L 201.539 20.519 L 235.48 54.461 L 185.941 104 L 256 104 L 256 152 L 185.941 152 L 235.48 201.539 L 201.539 235.48 L 152 185.941 L 152 256 L 104 256 L 104 185.941 L 54.46 235.48 L 20.52 201.539 L 70.059 152 L 0 152 L 0 104 L 70.059 104 L 20.519 54.46 L 54.461 20.52 L 104 70.059 L 104 0 L 152 0 Z" />
    </svg>
  );
}
```

## 範例用法

### Loading spinner
```tsx
<PartiStar size="lg" color="accent-cyan" animation="spin" />
```

### CTA 按鈕前綴
```tsx
<button>
  比較 <PartiStar size="sm" color="accent-red" animation="hover-rotate" />
</button>
```

### 空狀態
```tsx
<div className="empty-state">
  <PartiStar size="2xl" color="tertiary" animation="breathe" />
  <p>找不到符合條件的建築師</p>
</div>
```

### 404 頁面
```tsx
<div className="page-404">
  <PartiStar size="3xl" color="accent-red" animation="breathe" />
  <h1>404</h1>
  <p>這個建築還沒蓋好</p>
</div>
```

### 角落裝飾
```tsx
<div className="corner-decoration top-right">
  <PartiStar size="xs" color="soft" animation="static" />
</div>
```

## 在 PARTI 各頁面的使用位置

| 頁面 | 位置 | 尺寸 | 動畫 |
|---|---|---|---|
| Landing 屏 1 | 左上角 + 右下角 motif（混搭朱紅圓） | xs | static |
| Landing 屏 2 | 4 大入口卡片的 hover 反饋 | sm | hover-rotate |
| Landing 屏 4 | 「刷新看下一批 10 條」按鈕前綴 | sm | hover-rotate |
| `/architects` | 卡片右上角 ⊕ 加入比較按鈕替代圖示 | sm | hover-rotate |
| 個人頁 hero | 角落裝飾 | xs | breathe |
| `/movements` | 每屏進入時的 page-transition | md | page-transition |
| `/map` | Marker hover 時的 click hint | sm | spin |
| `/compare` | 外接圓中心點 | md | breathe |
| Cmd+K | 開啟動畫、面板左上 | sm | page-transition |
| 全站 loading | 路由切換時 | lg | spin |
| 404 / 錯誤頁 | 主視覺 | 3xl | breathe |

## 加進 Header logo 的方案（推薦）

```
[PARTI Star]  PARTI · 01 / ATLAS         People · Buildings · ...
   ✦
```

- Header 左側 logo 區、PARTI Star sm + 文字 logo 並排
- Hover：Star 旋轉 360° + 文字 letter-spacing 微微放大
- 點擊：跳回 /

## Tailwind 整合

```css
/* src/app/globals.css */

.parti-star { display: inline-block; flex-shrink: 0; }

.parti-star--xs { width: 12px; height: 12px; }
.parti-star--sm { width: 16px; height: 16px; }
.parti-star--md { width: 24px; height: 24px; }
.parti-star--lg { width: 32px; height: 32px; }
.parti-star--xl { width: 48px; height: 48px; }
.parti-star--2xl { width: 80px; height: 80px; }
.parti-star--3xl { width: 128px; height: 128px; }

.parti-star--tertiary { color: var(--ink-tertiary); }
.parti-star--primary { color: var(--ink-primary); }
.parti-star--accent-red { color: var(--accent-red); }
.parti-star--accent-cyan { color: var(--accent-cyan); }
.parti-star--soft { color: var(--line-soft); }

/* 動畫 keyframes 如上 */
```

## 禁止

- ✘ 寫死 fill 顏色（必須用 `currentColor` + CSS color）
- ✘ 用於正式 Logo（PARTI logo 是 wordmark、Star 是補助裝飾）
- ✘ 同畫面超過 3 個 PARTI Star 同時動
- ✘ 旋轉超過 360° 的動畫（會引起暈眩）
- ✘ 用 emoji ✦ ⭐ 替代（必須用此 SVG）

## 設計師說明

當被問「為什麼是這個符號」、標準論述：

> 「PARTI Star 是 12 角放射星、是羅盤 / 廣場放射軸 / 構成主義光芒的綜合。它代表 PARTI 作為『建築知識的探索起點』 — 每次點擊都從中心向外發散一條探索路徑。」
