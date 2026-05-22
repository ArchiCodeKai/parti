# PARTI · Individual Architect Page Visual Brief · v3.1

> 配合 `CLAUDE_DESIGN_BRIEF.md` v3.1 使用。
> 用於 `/architects/[slug]` 路徑、個人詳細頁。
> **核心特色**：Hidden-until-Touched 流派 tag bar + 可摺疊霜玻璃 Pullquote + 摺疊 Related sidebar

---

## Goal

生成 PARTI 建築師個人頁、**雙欄（內文 + 相關詞條）**、桌機優先。

要的氣質：**像 Stripe Press 書頁 + read.cv 個人簡歷 + Linear 文檔**。

---

## Page Structure

```
═══════════════════════════════════════════════════════
[Header fixed top]
═══════════════════════════════════════════════════════
[Hero - Architect Name + Meta + Timeline]      (50vh)
═══════════════════════════════════════════════════════
[Main Body Layout: 70% Content + 30% Related]
═══════════════════════════════════════════════════════
[Buildings Section - 代表作 cards]
═══════════════════════════════════════════════════════
[Footer]
═══════════════════════════════════════════════════════
```

---

## Hero Section（50vh）

### 視覺結構

```
╔═══════════════════════════════════════════════════════╗
║  ●                                                 ◯  ║
║                                                       ║
║   Le Corbusier                                        ║  ← Serif 120px Light
║                                                       ║
║   柯 比 意                                             ║  ← Serif 64px、ink-secondary
║                                                       ║
║   ────                                                ║  ← 1px 短線
║                                                       ║
║   1887 – 1965 · 瑞士裔法籍                              ║  ← Mono uppercase 14px
║   現代主義教父                                          ║  ← Sans 18px
║                                                       ║
║   ┌───────────────────────────────────────────────┐   ║
║   │ [Purism ████ ][Intl Style ██████][Brutal ███] │   ║  ← 彩條時間軸
║   │  1918  1928   1935        1947   1955   1965 │   ║
║   └───────────────────────────────────────────────┘   ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
```

### 元素規格 · v3.1

| 元素 | 規格 |
|---|---|
| 英文名 | **Inter Tight 200**、120px、letter-spacing -0.02em |
| 中文名 | **PingFang TC 200**、64px、letter-spacing 0.1em（中文呼吸）、ink-secondary |
| 流派 tag bar | "MODERNISM · PURISM · BRUTALISM · CIAM"、**預設 opacity 0**、Hidden-until-Touched 觸發 |
| 分隔線 | width 40px、height 1px、bg `var(--line)` |
| 生卒 + 國籍 | JetBrains Mono 11px、uppercase、letter-spacing 0.18em |
| 一句定位 | Inter 18px Regular、ink-primary、italic 用 Instrument Serif |
| 彩條時間軸 | height 24px、3 段彩色、pill 圓角 6px、scroll-driven path drawing |

### 構成主義 motif
- 左上：朱紅 16px 圓 + 黑 1px 斜線 45°
- 右上：灰青三角 + 細圓弧

---

## 彩條時間軸（Multi-period Movements）

```
1918      1928       1935            1947    1955    1965
 │         │           │               │       │       │
 ┃━━━━━━━━━┃                                              ← Purism (朱紅)
            ┃━━━━━━━━━━━━━━━━━━━━━━━━━━━┃                ← International (黑)
                                       ┃━━━━━━━━━━━━━━━┃ ← Brutalism (灰青)
```

### 規格
- 整體高度：24px（含年份標籤 40px）
- 每段顏色：來自 `Movement.colorTheme`
- 段落間有 2px gap
- Hover 任段：tooltip 顯示流派名 + 該段年代

### Scroll-driven 動畫
- 進入 viewport 時：每段從左往右依序「畫」出來（200ms per segment）
- 總時長：600ms

---

## Main Body Layout（70% + 30%）

```
╔══════════════════════════════════════╦═════════════════╗
║                                      ║                 ║
║  [Main Content 70%]                   ║  [Related 30%]  ║
║                                      ║  sticky right   ║
║  瑞士裔法籍建築師、現代主義教父。1887     ║                 ║
║  年生於瑞士拉紹德豐 (La Chaux-de-      ║  RELATED         ║
║  Fonds)。早年受 Auguste Perret 與     ║  ──────         ║
║  Peter Behrens 影響、發展出「自由       ║                 ║
║  平面、自由立面、底層架空、屋頂花園、       ║  人物             ║
║  橫向長窗」現代建築五點原則。             ║  ◦ Mies          ║
║                                      ║  ◦ Gropius       ║
║  1923 年發表《邁向建築》、提出「住宅是     ║  ◦ Wright        ║
║  居住的機器」、奠定現代主義理論基石。早期    ║  ◦ Aalto        ║
║  作品如薩伏伊別墅 (1929) 是純粹主義       ║                 ║
║  盛期代表。                            ║  建築             ║
║                                      ║  ◦ 廊香教堂        ║
║  二戰後轉向粗獷主義、馬賽公寓 (1952)     ║  ◦ 薩伏伊         ║
║  奠定「居住單位」概念、廊香教堂 (1955)    ║  ◦ 馬賽公寓        ║
║  與昌迪加爾 (1953) 展示混凝土的塑性      ║                 ║
║  美學。                               ║  流派             ║
║                                      ║  ◦ Brutalism     ║
║  ...                                 ║  ◦ Modernism     ║
║                                      ║  ◦ Purism        ║
║                                      ║                 ║
╚══════════════════════════════════════╩═════════════════╝
```

### Main Content 70% 規格

- max-width：720px（read-friendly）
- 字型：Inter 16px / 1.7 line-height
- 段落間距：1.2em
- 文字色：`var(--ink-primary)`

### 內文中的可點擊詞條

**整段文字看起來一致極簡、無底線、無顏色變化**。

Hover 任一詞條（如「廊香教堂」、「薩伏伊別墅」、「Peter Behrens」）：
- 鼠標變放大鏡（cursor: zoom-in）
- 文字變朱紅
- 底下朱紅細線從左畫到右（200ms）

```html
<a class="parti-link">廊香教堂</a>
```

```css
.parti-link {
  color: inherit;
  cursor: zoom-in;
  position: relative;
  transition: color 200ms;
  text-decoration: none;
}
.parti-link::after {
  content: ""; position: absolute; bottom: -2px;
  left: 0; width: 0; height: 1px;
  background: var(--accent-red);
  transition: width 200ms;
}
.parti-link:hover { color: var(--accent-red); }
.parti-link:hover::after { width: 100%; }
```

### Related Sidebar 30% 規格 · v3.1（摺疊式）

- width: 280px（min）
- position: sticky top: 80px
- `.glass-frost` 玻璃背景（blur 56px、白霜質感）

### Hidden-until-Touched 行為（核心）

**預設摺疊狀態**：
- 整個 sidebar 只顯示一行小提示：「RELATED · Scroll to expand · 28 entries」+ 朱紅小點 hint
- 高度 40px、寬 280px
- 朱紅小點呼吸動畫

**觸發展開**：
- Scroll 達 18% 觸發、或滑鼠 hover sidebar
- 上下撐開為完整 list、680ms ease-emphasized
- 內容：人物 / 建築 / 流派 / 著作 分組、每組最多 5 項

**短頁 fallback**：
- 1.2 秒後若仍在 viewport 內 → 自動展開
- 避免短頁面看不到 related

**Hover 任 item**：
- 文字變朱紅 + cursor 變朱紅圓 + 底線 0→100%

---

## 代表作 Section（Buildings）

```
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║   ─── 代表作 / Key Works ───                            ║  ← Mono uppercase 12px
║                                                       ║
║   ┌──────────┐  ┌──────────┐  ┌──────────┐           ║
║   │          │  │          │  │          │           ║
║   │  [線稿]  │  │  [線稿]  │  │  [線稿]  │           ║
║   │          │  │          │  │          │           ║
║   │  廊香教堂 │  │  薩伏伊  │  │  馬賽公寓 │           ║
║   │  1955    │  │  1929    │  │  1952    │           ║
║   │  France  │  │  France  │  │  France  │           ║
║   │          │  │          │  │          │           ║
║   │ [Brutal] │  │ [Modern] │  │ [Brutal] │           ║
║   └──────────┘  └──────────┘  └──────────┘           ║
║                                                       ║
║   [ 展開全部 12 件作品 →]                                ║  ← Mono uppercase button
║                                                       ║
╚═══════════════════════════════════════════════════════╝
```

### 卡片規格
- 與 architects-mosaic 的 M 卡片同規格
- 預設顯示前 3 件
- 「展開全部」展開到 12 件

---

## Header（fixed top、與 Landing 一致）

```
═══════════════════════════════════════════════════════
PARTI · 01 / ATLAS                People · Buildings ·
                                  Movements · Map · ⌘K
═══════════════════════════════════════════════════════
```

---

## 響應式

### Mobile (380px)
- Hero 標題縮小到 64px
- 雙欄變單欄（Related sidebar 移除、換成 FAB 浮動按鈕）
- FAB 點擊 → bottom sheet 從下方滑出（高度 70vh）
- 內文 max-width: 100%

### Tablet (768px)
- 雙欄維持、但 Main Content 65% + Related 35%
- Hero 標題 80px

---

## Output Requirements

### 給 Claude Design 的指令

```
請以 CLAUDE_DESIGN_BRIEF.md 為設計骨架、本檔案為頁面結構、
生成 PARTI 個人頁的 HTML + Tailwind CSS。

示範用 Le Corbusier 柯比意。

特別要求：
1. Hero 區用大字 Serif 120px + 中文 64px 中英堆疊
2. 彩條時間軸 3 段（Purism 朱紅 / International 黑 / Brutalism 灰青）
3. 主內文 70% + Related sidebar 30%（sticky right）
4. 內文中的可點擊詞條：預設無底線、hover 才出現朱紅底線從左畫到右
5. Related sidebar 分組（人物 / 建築 / 流派 / 著作）
6. 代表作 3 張 M 卡片（廊香教堂、薩伏伊、馬賽公寓）
7. 完整 hover state 必須能在預覽看到

內文範例（不要 AI 自己寫、用我給的這段）：

「瑞士裔法籍建築師、現代主義教父。1887 年生於瑞士拉紹德豐
(La Chaux-de-Fonds)。早年受 Auguste Perret 與 Peter Behrens 影響、
發展出「自由平面、自由立面、底層架空、屋頂花園、橫向長窗」現代建築五點原則。

1923 年發表《邁向建築》、提出「住宅是居住的機器」、奠定現代主義理論基石。
早期作品如薩伏伊別墅 (1929) 是純粹主義盛期代表。

二戰後轉向粗獷主義、馬賽公寓 (1952) 奠定「居住單位」概念、
廊香教堂 (1955) 與昌迪加爾 (1953) 展示混凝土的塑性美學。」

請將：廊香教堂、薩伏伊別墅、馬賽公寓、Auguste Perret、Peter Behrens、
邁向建築、Purism、International Style、Brutalism、Modernism
這些詞條 wrap 為 <a class="parti-link"> 元素。
```

---

## 預期成果

`/architects/le_corbusier` 頁面、含完整 hero / timeline / body / related / buildings、可瀏覽器預覽。

這頁是 PARTI 的「靈魂頁面」、必須做到極致。
