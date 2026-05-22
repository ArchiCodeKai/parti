# PARTI · Landing Page Visual Brief · v3.1

> 配合 `CLAUDE_DESIGN_BRIEF.md` v3.1 使用。第二輪對話餵這份。
> **核心特色**：Glass Editorial + Scroll-Driven Pyramid + Hidden-until-Touched

---

## Goal

生成 PARTI 首頁、**4 屏 vertical scroll**、桌機優先。

要的氣質：**像 Stripe Press × Linear × read.cv 隱藏式 UX**。

**v3.1 變更**：
- 移除構成主義角落 motif（朱紅圓 + 斜線 / 灰青三角 — 全部不要）
- Hero 用 Inter Tight 200 + PingFang TC（不要 Cormorant Garamond）
- 加入 **Scroll-Driven Pyramid 動畫**（「築/圖」間的三角形→像素金字塔）
- 副資訊用 Hidden-until-Touched（載入 800ms peek、停 3 秒淡出）
- 卡片用玻璃（`.glass`、`.glass-strong`）

---

## Page Structure（4 屏 × 100vh）

```
═══════════════════════════════════════════
Screen 1 (100vh): Hero
═══════════════════════════════════════════
Screen 2 (100vh): 4 大入口
═══════════════════════════════════════════
Screen 3 (100vh): 策展宣言
═══════════════════════════════════════════
Screen 4 (auto): 隨機 10 條精選
═══════════════════════════════════════════
[Footer]
═══════════════════════════════════════════
```

---

## Screen 1：Hero（100vh）

### 視覺結構

```
╔═════════════════════════════════════════════════╗
║  ●                                          ◯  ║  ← 左上 / 右上 motif
║                                                 ║
║                                                 ║
║                                                 ║
║                                                 ║
║                                                 ║
║                一 部 建 築 圖 鑑                   ║  ← Serif 大字 120px
║                                                 ║
║         PARTI · An Atlas of Modern               ║  ← Mono uppercase 16px
║                Architecture                     ║
║                                                 ║
║                                                 ║
║                                                 ║
║                                                 ║
║              scroll ↓ 1000 條目                  ║  ← Mono 小字 12px
║                                                 ║
║  ─                                          ◯  ║  ← 左下 / 右下 motif
╚═════════════════════════════════════════════════╝
```

### 元素清單 · v3.1

| 元素 | 規格 |
|---|---|
| 主標題「一 部 建 築 圖 鑑」 | **Inter Tight 200 + PingFang TC 200**、clamp(72px, 11vw, 180px)、letter-spacing 0.02em |
| 副標 "PARTI · An Atlas of Modern Architecture" | JetBrains Mono 11px、letter-spacing 0.18em、uppercase、ink-tertiary、**Hidden-until-Touched** |
| Scroll hint | JetBrains Mono 12px、ink-tertiary、**Hidden-until-Touched** |
| **Scroll-driven pyramid 三角形** | 朱紅、初始隱藏、scroll 5% 才出現 |
| **角落 motif** | **完全移除**（v3.1 移除所有靜態裝飾）|

### 背景

- `var(--bg-page)` #FCFBF8（接近白、v3.1 已改）
- **無紋理 overlay**（v3.1 移除 paper grain）

### ⭐ Scroll-Driven Pyramid 動畫（核心 wow moment）

詳細劇本見 `docs/04-頁面設計/landing-hero.md`。

關鍵：
- scroll 5% → 純三角形 ▶（朱紅）從「築」「圖」間擠出
- scroll 15-30% → 把「圖」往右推 0-80px
- scroll 30-50% → 三角形旋轉 -90deg、變正三角形 ▲
- scroll 65-75% → 邊緣變像素鋸齒（zentto.com 風）
- scroll 85-100% → 由下往上畫金字塔格線
- **往上 scroll 完全可逆**

技術：Framer Motion `useScroll` + SVG path

### 動畫

- 進入頁面：主標題 fade in 600ms ease-out、字字 stagger 50ms
- 副標題：fade in 400ms、delay 600ms
- Motif：path drawing 1200ms、delay 1000ms

---

## Screen 2：4 大入口（100vh）

### 視覺結構

```
╔════════════════════════╦═══════════════════════╗
║                        ║                       ║
║       人 物             ║       建 築            ║
║      ARCHITECTS         ║      BUILDINGS         ║
║       1 0 0 +           ║       6 0 0 +          ║
║                        ║                       ║
║   [極淡灰小型 force      ║   [極淡灰線稿輪廓]        ║
║    graph 漂浮]           ║                       ║
║                        ║                       ║
╠════════════════════════╬═══════════════════════╣
║                        ║                       ║
║       運 動             ║       地 圖            ║
║     MOVEMENTS           ║        MAP             ║
║       2 0 +            ║       WORLD            ║
║                        ║                       ║
║   [Voronoi 細胞流動]     ║   [世界地圖縮影 +        ║
║                        ║    朱紅點]              ║
║                        ║                       ║
╚════════════════════════╩═══════════════════════╝
```

### 元素規格

| 卡片 | 中文標題 | 英文標題 | 數量 | Motif |
|---|---|---|---|---|
| 左上 | 人物 | ARCHITECTS | 100+ | 極淡灰 force graph |
| 右上 | 建築 | BUILDINGS | 600+ | 線稿輪廓 |
| 左下 | 運動 | MOVEMENTS | 20+ | Voronoi 細胞 |
| 右下 | 地圖 | MAP | WORLD | 世界地圖縮影 + 朱紅點 |

### 卡片視覺

- 每卡 50vw × 50vh
- 邊框 1px `var(--line)`、無圓角（或最多 2px）
- **無陰影、無 gradient**
- Hover：邊框瞬間變朱紅 + 整卡 scale 1.02 + cursor: zoom-in

### 文字排版

- 中文標題：Serif 64px Light 300
- 英文標題：Mono uppercase 14px、letter-spacing 0.15em、ink-tertiary
- 數量：Mono 24px Light、ink-secondary

---

## Screen 3：策展宣言（100vh）

### 視覺結構

```
╔═════════════════════════════════════════════════╗
║                                                 ║
║                                                 ║
║                                                 ║
║              — about                             ║  ← Mono uppercase 12px
║                                                 ║
║                                                 ║
║         「我們用幾何原理本身                       ║  ← Serif 64px Light 300
║          呈現建築知識的結構」                       ║
║                                                 ║
║                                                 ║
║              [三 點 定 圓 動 畫]                   ║
║              ●         ●                       ║  ← 朱紅小圓
║                  ●                             ║
║              ╲___╱                              ║  ← 外接圓 0.5px
║                                                 ║
║                                                 ║
║              → 閱讀完整論述                       ║  ← Mono 14px、朱紅
║                                                 ║
╚═════════════════════════════════════════════════╝
```

### Scroll-driven 動畫

進入 viewport 時依序：
1. "— about" Mono label fade in（200ms）
2. 引號 fade in（300ms、delay 100ms）
3. 主文字字字 stagger reveal（50ms × N、delay 400ms）
4. 三個朱紅小圓 fade in（200ms、delay 1000ms）
5. 點之間連線畫出（800ms、delay 1200ms）
6. 外接圓 path drawing（1200ms、delay 2000ms）
7. CTA 連結 fade in（200ms、delay 3200ms）

總時長：約 3.5 秒（不過長、因為用戶 scroll 速度會影響）

---

## Screen 4：隨機 10 條精選

### 視覺結構

```
╔═══════════════════════════════════════════════╗
║                                               ║
║   RANDOM PICKS · 10 / 1000        [刷新 →]    ║  ← Mono uppercase 12px
║   ────────────────────────────────             ║  ← 1px 細線分隔
║                                               ║
║   01  Carlo Scarpa 卡羅·斯卡帕      · 義大利工藝現代主義  ║
║                                                          ║
║   02  廊香教堂 Notre Dame du Haut · 1955 · 粗獷主義        ║
║                                                          ║
║   03  Brutalism 粗獷主義           · 1950–1975           ║
║                                                          ║
║   04  Frank Lloyd Wright 萊特    · 1867–1959 · 有機建築   ║
║                                                          ║
║   05  落水山莊 Fallingwater       · 1935                 ║
║                                                          ║
║   06  包浩斯 Bauhaus              · 1919–1933            ║
║                                                          ║
║   07  Tadao Ando 安藤忠雄         · 批判性地域主義          ║
║                                                          ║
║   08  Mies van der Rohe 密斯      · less is more         ║
║                                                          ║
║   09  邁向建築 Vers une architecture · 柯比意 1923          ║
║                                                          ║
║   10  代謝派 Metabolism           · 日本 1960–1975        ║
║                                                          ║
╚═══════════════════════════════════════════════╝
```

### 排版規格

每行：
- 編號：Mono 14px、ink-tertiary、寬度固定 32px、靠左對齊
- 中英名：Serif 18px Regular、中英間用空格
- 副資訊：Mono 12px、ink-secondary、用「·」分隔

### Hover 規則

Hover 任一行：
- 整行詞條變朱紅
- 編號變更淡
- 底線從左畫到右

---

## Footer（極簡）

```
╔═══════════════════════════════════════════════╗
║                                               ║
║   PARTI                          © 2026       ║
║                                               ║
║   一部建築圖鑑                                    ║
║                                               ║
║   ────                                        ║
║                                               ║
║   About · Methodology · Credits · GitHub      ║
║                                               ║
╚═══════════════════════════════════════════════╝
```

---

## Header（fixed top、極簡）

```
═══════════════════════════════════════════════════════
PARTI · 01 / ATLAS                People · Buildings ·
                                  Movements · Map · ⌘K
═══════════════════════════════════════════════════════
```

- 高度 60px
- 背景 `var(--bg-paper)` + bottom border 1px `var(--line-soft)`
- 左：Mono 14px logo 文字
- 右：Mono 12px 導覽連結 + Cmd+K 觸發圖示

---

## Interaction（互動）

### Scroll
- **Lenis 接管全站 scroll**、絲滑慣性
- duration: 1.2s
- 不破壞 anchor link、不破壞 Tab navigation

### Hover
- 所有可點擊文字 / 卡片：cursor: zoom-in
- Hover state 200ms ease-out

### Click
- 卡片點擊：View Transitions API morph 到下一頁
- 連結點擊：普通 navigation

---

## Output Requirements

### 給 Claude Design 的指令

```
請以 CLAUDE_DESIGN_BRIEF.md 為設計骨架、本檔案為頁面結構、
生成 PARTI Landing Page 的 HTML + Tailwind CSS。

桌機 1440px width 為主、必須包含：
1. CSS variables 在 :root 定義（用 brief 的色票）
2. Google Fonts CDN 載入（Cormorant Garamond / Inter / JetBrains Mono / Noto Serif TC）
3. 4 屏 vertical scroll structure
4. Hover state（不要用 React、用 CSS pseudo）
5. 響應式 breakpoint：mobile 380px、tablet 768px、desktop 1440px

不要：
- React component（要純 HTML）
- 任何 shadow / gradient / glassmorphism
- 動畫超過 800ms（除 path drawing）
- emoji / 卡通元素

請先列出 5 個你會避免的常見錯誤、再開始生成。
```

---

## 預期成果

一個 .html 檔（含 CSS、JS 全部 inline 或 CDN）、瀏覽器開啟可直接看到效果。

如果 Claude Design 偏離 brief、立即停下、用 Edit tool 直接點擊修改、不要打 prompt（省 token）。
