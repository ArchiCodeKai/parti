# PARTI · Architects Mosaic Visual Brief · v3.1

> 配合 `CLAUDE_DESIGN_BRIEF.md` v3.1 使用。
> 用於 `/architects` 路徑、馬賽克牆總覽。
> **核心特色**：4 種卡片 hover 變體 + Glass + Hidden-until-Touched ⊕ icon

---

## Goal

生成 PARTI 人物總覽頁、**馬賽克牆 + 篩選器**、桌機優先。

要的氣質：**像 Pinterest 但更克制、像 Pentagram NYT Editorial Portraits 集成**。

---

## Page Structure

```
═══════════════════════════════════════════════════════
[Header fixed top]
═══════════════════════════════════════════════════════
[Page Title section]
═══════════════════════════════════════════════════════
[Filter Bar sticky]
═══════════════════════════════════════════════════════
[Mosaic Grid - 200 cards]
═══════════════════════════════════════════════════════
[Footer]
═══════════════════════════════════════════════════════
```

---

## Page Title Section

```
╔═══════════════════════════════════════════════╗
║                                               ║
║   ARCHITECTS · 人 物                           ║  ← Serif 48px Light 300
║                                                  ║
║   100+ 位重塑現代建築的人                          ║  ← Sans 18px
║                                                  ║
║   1850 → 2025                                  ║  ← Mono 14px、letter-spacing 0.15em
║                                                  ║
╚═══════════════════════════════════════════════╝
```

高度：40vh、米白背景、左對齊（不置中）。

---

## Filter Bar（sticky top）

```
═══════════════════════════════════════════════════════
時代 ▾   流派 ▾   國籍 ▾   學派 ▾   事務所 ▾    [ 清除 ]
═══════════════════════════════════════════════════════
```

### 規格

- 高度：60px
- 背景：`var(--bg-paper)` + bottom border 1px `var(--line-soft)`
- 5 個下拉 chips + 1 個 reset button
- Chips 之間 gap 24px
- 字型：JetBrains Mono 14px、uppercase

### Chip 視覺

```
┌──────────┐
│ 時代  ▾  │      ← 預設狀態、邊框 1px var(--line)
└──────────┘
```

```
┌────────────────────┐
│ 時代: 1950-1965  × │  ← 選中狀態、邊框朱紅、文字朱紅
└────────────────────┘
```

### 互動

- 點 chip → 下拉選單浮出（米白底 + 1px 黑邊）
- 多選用 checkbox
- URL query 同步：`/architects?era=1950-1965&movement=brutalism`

---

## Mosaic Grid

### 排列規則（CSS Grid Masonry）

3 種卡片大小自然錯落：

| 變體 | 桌機尺寸 | grid-column | grid-row |
|---|---|---|---|
| L（大）| ~400×500 | span 2 | span 2 |
| M（中）| ~280×360 | span 1 | span 1.3 |
| S（小）| ~200×200 | span 1 | span 1 |

### 排列示意

```
╔═════════╗  ╔═════╗  ╔═════╗  ╔═════════╗
║         ║  ║  M  ║  ║  M  ║  ║         ║
║    L    ║  ║     ║  ║     ║  ║    L    ║
║         ║  ╠═════╣  ╠═════╣  ║         ║
║  柯比意  ║  ║  S  ║  ║  S  ║  ║   萊特   ║
║         ║  ╚═════╝  ╚═════╝  ║         ║
╚═════════╝                    ╚═════════╝
╔═════╗  ╔═════════╗  ╔═════╗  ╔═════════╗
║  M  ║  ║         ║  ║  M  ║  ║         ║
║     ║  ║    L    ║  ║     ║  ║    L    ║
╠═════╣  ║         ║  ╠═════╣  ║         ║
║  S  ║  ║   高第   ║  ║  S  ║  ║   康     ║
║     ║  ║         ║  ║     ║  ║         ║
╚═════╝  ╚═════════╝  ╚═════╝  ╚═════════╝
```

**Grid container**：
- 桌機：grid-template-columns: repeat(8, 1fr)
- 平板：repeat(4, 1fr)
- 手機：repeat(2, 1fr)
- gap: 16px

---

## Card Designs（3 變體）

### L 卡片（必選大師、現代先驅）

```
┌──────────────────────────────────┐
│ ●                                │  ← 朱紅小裝飾
│                                  │
│                                  │
│   [線稿肖像 SVG]                  │  ← 60% 卡面、path animation
│                                  │
│                                  │
│   Le Corbusier                   │  ← Serif 28px
│   柯 比 意                        │  ← Serif 20px、ink-secondary
│   ────                           │  ← 1px 細線
│   1887–1965 · 瑞士裔法籍           │  ← Mono 12px、uppercase
│   現代主義教父                     │  ← Sans 14px、ink-secondary
│                                  │
│   [Brutalism]  [Modernism]       │  ← Mono badges 10px
│                                  │
└──────────────────────────────────┘
```

### M 卡片（Pritzker 得主、重要建築師）

```
┌──────────────────────┐
│                      │
│   [線稿縮圖]           │  ← 40% 卡面
│                      │
│                      │
│   Tadao Ando         │  ← Serif 20px
│   安藤忠雄             │  ← Serif 14px、ink-secondary
│                      │
│   1941– · 日本         │  ← Mono 10px
│                      │
│   [Minimalism]        │  ← Mono badge
│                      │
└──────────────────────┘
```

### S 卡片（補充人物）

```
┌────────────────┐
│                │
│  陳其寬          │  ← Serif 18px
│                │
│  1921–2007     │  ← Mono 10px
│  台灣           │  ← Mono 10px
│                │
└────────────────┘
```

---

## Card 互動 · v3.1（4 種 hover 變體）

### 預設狀態
- `.glass` 玻璃卡（blur 36px、saturate 180%）
- 圓角 `--r-lg` 20px（v3.1 已改、不再 ≤ 2px）
- 邊框 1px `var(--line-soft)`
- 微妙 box-shadow（inner highlight + drop）
- **無顯眼陰影**、**無 emoji**、**無角落裝飾**

### Hover 4 變體（按卡片大小差異化）

| 卡片 | Hover 行為 | 動畫時長 |
|---|---|---|
| **L 卡** | **等角 3D tilt 12°**（perspective rotate）| 320ms ease-emphasized |
| **M 卡** | **垂直浮起 -12px + scale 1.02 + 深陰影** | 220ms ease-out |
| **S 卡** | **側向 Y 軸 6° 微旋** | 220ms ease-out |
| **XS 卡** | **整卡 flood 朱紅 + 反白文字** | 220ms ease-out |

所有 hover 共同：
- 玻璃從 `.glass` → `.glass-strong`（blur 36→48px）
- Cursor 變 `none` + 自訂朱紅圓 cursor
- 右上角 ⊕「加入比較」icon Hidden-until-Touched 淡入（opacity 0→1、320ms）

### Click
- 卡片邊框「畫出」動畫（path 0 → 1）
- View Transitions API morph 到個人頁
- 動畫時長 600ms

---

## Stagger Reveal（載入動畫）

進入 viewport 時：
- 卡片以 **50ms 間隔** stagger fade in + slide up 10px
- 200 張卡片總時長：50ms × 30 (visible) = 1.5s

```typescript
// pseudo
cards.forEach((card, i) => {
  setTimeout(() => card.fadeIn(), i * 50);
});
```

---

## Empty State

無篩選結果時：

```
╔═══════════════════════════════════════════════╗
║                                               ║
║              找不到符合篩選的建築師               ║  ← Serif 24px
║                                               ║
║                                               ║
║              [ 清除篩選 ]                       ║  ← Mono uppercase button
║                                               ║
╚═══════════════════════════════════════════════╝
```

---

## 響應式

### Mobile (380px)
- Grid：repeat(2, 1fr)
- L 卡片改成 span 2（全寬）
- M / S 卡片改成 span 1
- Filter bar → 漢堡按鈕、點開 bottom sheet
- 卡片內字型縮小 20%

### Tablet (768px)
- Grid：repeat(4, 1fr)
- L 卡片 span 2、M / S 卡片 span 1

### Desktop (1440px+)
- Grid：repeat(8, 1fr)
- 標準排列

---

## Output Requirements

### 給 Claude Design 的指令

```
請以 CLAUDE_DESIGN_BRIEF.md 為設計骨架、本檔案為頁面結構、
生成 PARTI Architects Mosaic 頁面的 HTML + Tailwind CSS。

特別要求：
1. CSS Grid masonry 排列（3 變體 L/M/S 自然錯落）
2. 用 20 張示範卡片（柯比意 L、密斯 L、萊特 L、康 L、Aalto M、Loos M、高第 L、Gropius M、安藤忠雄 M、隈研吾 M、王澍 M、陳其寬 S、王大閎 S、姚仁喜 M、李祖原 M、Foster M、Hadid M、Gehry L、Wright L、Mies L）
3. 線稿肖像用簡單的 SVG circle + line 佔位（不需真實肖像）
4. Filter bar 6 個 chips（時代 / 流派 / 國籍 / 學派 / 事務所 / 清除）
5. Hover state 必須含：邊框朱紅、scale 1.02、cursor: zoom-in

請先確認你的卡片排列邏輯、再生成。
```

---

## 預期成果

`/architects` 頁面、含 20 張示範卡片、可瀏覽器預覽、可看到 hover 效果。

之後 Kai 把真實 200 卡資料替換進去（用 MDX content + map）。
