# Glass 玻璃系統設計

## 設計目的

PARTI 視覺核心 = **Glass Editorial**。
4 層玻璃強度按使用場景區分、不混用。

實作見 `src/design-reference/design-system/theme.css` 的 `.glass*` class。

## 4 層 Glass token

| Token | Blur | Saturation | 透明度 | 用途 |
|---|---|---|---|---|
| `.glass-thin` | 8px | 140% | `rgba(252, 251, 248, 0.62)` | **Header / sticky nav** — 最輕、幾乎無感 |
| `.glass` | 36px | 180% | `rgba(255, 255, 255, 0.42)` | **卡片預設** — 明顯霧化 |
| `.glass-strong` | 48px | 200% | `rgba(255, 255, 255, 0.68)` | **卡片 hover / active** — 強化 |
| `.glass-frost` | 56px | 200% | `rgba(255, 255, 255, 0.85)` | **Modal / expanded** — 最厚 |

## 使用情境

### `.glass-thin`（最輕、平滑）
- `<header>` parti-header（h: 64px）
- sticky filter bar
- 浮動 CompareBar

### `.glass`（中等霧化）
- 馬賽克牆每張卡片預設
- 個人頁的內容區塊
- 流派頁 hero
- 流派卡片

### `.glass-strong`（hover 加深）
- 卡片 hover 狀態
- Selected / active 卡片
- 觸發中的互動元素

### `.glass-frost`（最厚）
- Cmd+K 命令面板
- 全螢幕 modal
- 個人頁 Pullquote 展開後
- 詳細頁面 expanded state

## 共同規則

所有 glass class 必含：

```css
backdrop-filter: blur(Npx) saturate(M%);
-webkit-backdrop-filter: blur(Npx) saturate(M%);
border: 1px solid var(--line-soft); /* or var(--line-hair) for thin/frost */
border-radius: var(--r-lg);          /* 預設 20px */
box-shadow:
  0 1px 0 rgba(255, 255, 255, 0.55) inset,    /* inner highlight */
  0 30px 60px -30px rgba(15, 15, 15, 0.14),   /* drop */
  0 2px 8px -2px rgba(15, 15, 15, 0.03);      /* contact */
```

## 卡片底色層級

玻璃需要「底下有東西」才看得到效果。PARTI 用兩層 paper：

```
1. body 背景      = #FCFBF8（接近白、玻璃透出此色）
2. 卡片基底色     = #F4EFE6（米白、玻璃疊在這上面）
3. 玻璃層         = rgba(255,255,255, 0.42–0.85)
```

實作時、卡片下方 background 用 `--bg-card-base #F4EFE6`、上方再疊 `.glass` class。

## 響應式行為

- 桌機：完整 backdrop-filter（GPU 加速）
- 手機（< 768px）：blur 強度降 30%（避免效能問題）
- iOS Safari：自動加 `-webkit-backdrop-filter` prefix

```css
@media (max-width: 767px) {
  .glass { backdrop-filter: blur(24px); }
  .glass-strong { backdrop-filter: blur(32px); }
  .glass-frost { backdrop-filter: blur(40px); }
}
```

## 性能限制

- 同畫面 `.glass*` 元素 **不超過 8 個**
- 不在 `.glass*` 內嵌套另一個 `.glass*`（雙層 backdrop-filter 會崩）
- Modal 用 `.glass-frost` 後、底下卡片可以暫時降為靜態色

## 不要做的

- ✘ 寫死透明度（必須用 theme.css 的 token）
- ✘ 混用兩種 blur 強度（用對應 class）
- ✘ 加 gradient background（玻璃感破壞）
- ✘ 用 `backdrop-filter: blur(0)` 偽裝（毫無意義）
- ✘ 在 `<body>` 直接套 backdrop-filter（無父層、無效果）

## 給 AI 寫 code 的快速 reference

```jsx
// 卡片預設
<article className="glass">...</article>

// Hover 強化（用 CSS hover 切換）
<article className="glass" onMouseEnter={...}>
  // CSS: .glass:hover { @apply .glass-strong properties; }
</article>

// Cmd+K 面板
<dialog className="glass-frost">...</dialog>

// Header
<header className="parti-header glass-thin">...</header>
```
