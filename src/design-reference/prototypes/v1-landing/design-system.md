# Design System Notes for v1-landing

## Status
Codex 實作規格草稿，待 review 後進入正式 Next.js landing 開發。

## Source of Truth

本版本必須遵守：

- `src/design-reference/CLAUDE_DESIGN_BRIEF.md`
- `src/design-reference/page-briefs/01-landing.md`
- `src/design-reference/design-system/theme.css`
- `docs/04-頁面設計/landing-hero.md`

若文件互相衝突，優先順序為：

1. `CLAUDE_DESIGN_BRIEF.md`
2. `page-briefs/01-landing.md`
3. `theme.css`
4. `docs/04-頁面設計/landing-hero.md`

## Visual Direction

**Glass Editorial · Hidden-until-Touched**

這版不是構成主義海報，也不是一般 SaaS landing。核心是用幾何本身表達建築知識結構：

- 預設安靜、接近白、低對比。
- 互動後才出現朱紅重點。
- 幾何元素是內容結構，不是裝飾。
- 文字排版要像建築史編輯頁，不像行銷頁。

## CSS Variables

Landing 實作必須使用下列 token，不在元件內寫死顏色。

```css
:root {
  --bg-page: #FCFBF8;
  --bg-card-base: #F4EFE6;
  --bg-card-glass: rgba(255, 255, 255, 0.42);
  --bg-card-glass-strong: rgba(255, 255, 255, 0.68);
  --bg-card-frost: rgba(255, 255, 255, 0.85);

  --ink-primary: #0F0F0F;
  --ink-secondary: #3A3A3A;
  --ink-tertiary: #7A7A7A;
  --ink-faint: rgba(15, 15, 15, 0.40);

  --accent-red: #E63B2E;
  --accent-red-dim: #C32A1F;
  --accent-cyan: #5B7A82;

  --line: rgba(15, 15, 15, 0.85);
  --line-soft: rgba(15, 15, 15, 0.08);
  --line-hair: rgba(15, 15, 15, 0.05);
}
```

## Typography

```css
:root {
  --font-display: "Inter Tight", "PingFang TC", sans-serif;
  --font-sans: "Inter", "PingFang TC", sans-serif;
  --font-editorial: "Instrument Serif", "PingFang TC", serif;
  --font-mono: "JetBrains Mono", "SF Mono", monospace;

  --text-xs: 12px;
  --text-sm: 14px;
  --text-base: 16px;
  --text-lg: 20px;
  --text-xl: 28px;
  --text-2xl: 40px;
  --text-3xl: 64px;
  --text-hero: clamp(48px, 8vw, 120px);
  --text-mega: clamp(72px, 11vw, 180px);
}
```

### Rules

- Hero 中文主標題使用 `--font-display`，font-weight 200。
- Hero 不可使用 font-weight 400 以上。
- Mono 標籤使用 `--font-mono`、uppercase、letter-spacing 0.16em 到 0.22em。
- 手機版不得用 viewport width 直接線性縮放字體；使用 `clamp()`。
- letter-spacing 不使用負值。

## Layout

### Screen 1: Hero

- 高度：100vh 視覺區，但為了 scroll-driven pyramid 可使用 sticky section。
- 主標題置中。
- 副標題與 scroll hint 為 Hidden-until-Touched。
- 「築」與「圖」之間保留 pyramid slot。

### Screen 2: Entry Grid

- Desktop：2x2，接近每格 50vw x 50vh。
- Tablet：2x2，但降低字級與 padding。
- Mobile：單欄，每格至少 52vh 或足夠可讀高度。

### Screen 3: Manifesto

- 文字置中，但不要放在浮動 card 裡。
- 三點定圓作為幾何說明，不作為背景裝飾。

### Screen 4: Random Picks

- 使用 list，不使用卡片牆。
- 編號欄固定寬度。
- hover 時底線由左至右，詞條轉朱紅。

## Motion

### Hidden-until-Touched

行為：

- 載入後 800ms peek。
- 1.5s 到 3s 後淡出。
- hover / focus / pointer move 時顯示。
- touch device 上應保持足夠可見，不依賴 hover。

### Scroll-Driven Pyramid

第一版正式實作可採取漸進方式：

1. 保留既有 `PyramidHero` 的 sticky hero 與 state machine。
2. pyramid slot 固定在「築」與「圖」之間。
3. scroll 或 viewport 進入後，三角形顯示。
4. 使用 SVG 或 CSS polygon 表現像素金字塔。
5. 若完整可逆動畫成本過高，先保持視覺意圖清楚，避免為第一版引入額外大型依賴。

## Implementation Boundary

- 正式 source of truth 是 Next.js / React code，不是靜態 prototype HTML。
- `index.html` 只在需要獨立視覺探索時才建立。
- 若後續建立 HTML prototype，必須標記為 exploratory，不可直接複製進 `src/app/page.tsx`。
- 不新增 screenshots / promoted 流程，除非真的切回 Claude Design 版本管理。

## Accessibility

- 保留可見 focus state。
- hover-only 資訊不可成為唯一資訊來源。
- `prefers-reduced-motion: reduce` 時顯示靜態完成狀態。
- 連結與按鈕需有語意，不用純 `div` 假裝互動元件。

## Hard Don'ts

- 不要真實照片、stock photo、AI 圖。
- 不要 gradient background。
- 不要靜態角落 motif。
- 不要 Cormorant Garamond。
- 不要把 Random Picks 做成卡片牆。
- 不要擴到其他頁面。
- 不要把 prototype HTML 直接搬進 `src/app/page.tsx`。
