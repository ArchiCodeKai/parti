# PARTI · Claude Design Brand Brief · v3.1

> **使用說明**：本檔是 self-contained brand spec、直接整份貼到 Claude Design 對話框。配合 `page-briefs/` 內的 page 特定 brief 使用。
> **省 token 原則**：所有腦力激盪在 Chat 模式完成、Claude Design 只負責執行。

---

## 0. 視覺哲學名稱

**Glass Editorial · Hidden-until-Touched**

- 接近白底 + 玻璃層級 + 圓角
- Inter Tight 200 hairline + PingFang TC
- 完全無靜態裝飾
- 預設冷靜 / 互動才爆色
- 滑鼠停 3 秒淡出
- N→幾何映射

---

## 1. Mission（一句話）

**PARTI 是用幾何原理本身呈現建築知識結構的線上圖鑑** —— 1000+ 條目的策展型百科、用 Glass Editorial 風格 + Hidden-until-Touched 互動。

---

## 2. Audience

### 核心使用者
- 建築系大學生 / 碩士生
- 備課中的建築教授
- 跨界設計師

### 次要使用者
- Awwwards / FWA 評審
- 設計圈讀者
- 想轉行 / 申請建築留學的人

### 使用情境
- 學期報告找柯比意資料 → 直接搜尋、馬上找到
- 想知道粗獷主義 → 瀏覽流派、看代表作
- 夜晚滑手機消遣 → 隨機探索

---

## 3. Color Palette · v3.1

### 主色票（必精確）

```css
/* 兩層 paper */
--bg-page:        #FCFBF8   /* 整頁背景、接近白 */
--bg-card-base:   #F4EFE6   /* 卡片基底 */

/* Glass 層 */
--bg-card-glass:        rgba(255, 255, 255, 0.42)
--bg-card-glass-strong: rgba(255, 255, 255, 0.68)
--bg-card-frost:        rgba(255, 255, 255, 0.85)

/* 文字 */
--ink-primary:   #0F0F0F
--ink-secondary: #3A3A3A
--ink-tertiary:  #7A7A7A
--ink-faint:     rgba(15, 15, 15, 0.40)

/* Accent */
--accent-red:     #E63B2E   /* ≤ 3% 使用率 */
--accent-red-dim: #C32A1F
--accent-cyan:    #5B7A82   /* ≤ 1% 使用率 */

/* 線條 */
--line:      rgba(15, 15, 15, 0.85)
--line-soft: rgba(15, 15, 15, 0.08)
--line-hair: rgba(15, 15, 15, 0.05)
```

### 使用比例

| 色 | 比例 |
|---|---|
| 接近白底 | 78% |
| 黑文字 | 18% |
| 朱紅（藏在互動後）| ≤ 3% |
| 灰青 | ≤ 1% |

### 哲學

> **「Default = 冷靜到無聊 / Interactive = 色彩爆發」**

預設畫面冷靜到無聊、朱紅藏在卡片背面 / hover 後才出現。

---

## 4. Typography · v3.1 PingFang Edition

### 四層 stack

```css
--font-display:   "Inter Tight", "PingFang TC", sans-serif;
--font-sans:      "Inter", "PingFang TC", sans-serif;
--font-editorial: "Instrument Serif", "PingFang TC", serif;  /* italic only */
--font-mono:      "JetBrains Mono", "SF Mono", monospace;
```

**重大變更**：完全移除 Cormorant Garamond。Display 改用 **Inter Tight 200**（極細 hairline）。

### 字重

- **200 Light** = Hero 大字主要字重
- 300 / 400 = 副標題、內文

Hero 不准用 weight ≥ 400。

### Type scale

```
--text-xs:   12px
--text-sm:   14px
--text-base: 16px
--text-lg:   20px
--text-xl:   28px
--text-2xl:  40px
--text-3xl:  64px
--text-hero: clamp(48px, 8vw, 120px)
--text-mega: clamp(72px, 11vw, 180px)
```

---

## 5. Glass System（核心視覺）

### 4 層 glass

| Token | Blur | 用途 |
|---|---|---|
| `.glass-thin` | 8px | Header、最輕 |
| `.glass` | 36px | 卡片預設 |
| `.glass-strong` | 48px | 卡片 hover |
| `.glass-frost` | 56px | Modal / 展開 |

### 圓角

```
--r-xs: 4px
--r-sm: 8px
--r-md: 14px
--r-lg: 20px     /* 卡片預設 */
--r-xl: 28px
--r-pill: 999px
```

**重大變更**：圓角從 ≤ 4px 開放到 14–28px modern rounded。

---

## 6. Tone of Voice（3 個關鍵詞）

1. **Editorial** — 像建築史教科書、不像 App
2. **Restrained** — 留白多於填滿、藏色彩在互動
3. **Glass** — 半透明、層次感、modern

（過去的 "Constructive" 已棄用、構成主義靜態裝飾全部移除）

---

## 7. Visual Reference

| 站 | 取的元素 |
|---|---|
| **Stripe Press** | 米白紙頁感、Serif 大字 |
| **Linear** | Cmd+K、Mono + Sans 組合、黑米白 |
| **read.cv** | 純文字優雅、隱藏式 UX |
| **bejamas.com/services#consulting** | Random Picks 展開互動 |
| **mad.ac/approach** | Sticker 連結 |
| **zentto.com** | Hero pyramid scroll-driven animation |

---

## 8. Logo Concept · v3.1

### A. 純文字 Wordmark（主）
```
●  P A R T I
```
- Inter Tight 200 大寫
- 字距 0.2em
- 朱紅小圓 8px 在 P 左上

### B. PARTI Star（輔助符號）

12 角放射星、用於頁面跳轉 / Loading / 404 / 角落。
SVG 見 `docs/03-元件設計/parti-star.md`。

---

## 9. Hidden-until-Touched 行為（核心 UX）

詳見 `docs/03-元件設計/hidden-until-touched.md`。

### 4 種觸發

| 觸發 | 隱藏時機 |
|---|---|
| 載入 800ms peek | 1.5s 後 |
| 滑鼠移動 | 3s 後 |
| Scroll 進 viewport | 出 viewport 後 |
| Hover 區塊 | hover 離開 3s 後 |

### 預設隱藏元素

- 流派 tag bar、卡片副資訊、Filter chip 提示
- 個人頁 Pullquote（scroll 才上下撐開）
- Related sidebar（摺疊為紅點 hint）
- 構成主義裝飾（**完全移除**）

---

## 10. Visual Don'ts

### 顏色
- ✘ 純白 #FFFFFF（用 `#FCFBF8`）
- ✘ 純黑 #000000（用 `#0F0F0F`）
- ✘ 鮮藍 / 鮮綠 / 鮮黃
- ✘ Gradient background
- ✘ 朱紅 > 3% 全頁

### 樣式
- ✘ Drop shadow（用 box-shadow 但極輕）
- ✘ Border radius < 4px 或 > 28px
- ✘ 任何靜態裝飾（角落 motif、紅圓 + 斜線、三角 + 圓弧 — 全部砍）
- ✘ Underline 強調文字
- ✘ Italic 內文（除非引用書名 / 義式詞彙）

### 字型
- ✘ Cormorant Garamond（已棄用）
- ✘ Noto Serif TC（已棄用）
- ✘ Source Han Serif TC（已棄用）
- ✘ Mix 第五種字型
- ✘ Hero 用 weight ≥ 400

### 動畫
- ✘ 任何超過 800ms 的單一動畫（除 path drawing）
- ✘ Bounce easing
- ✘ 旋轉 > 360°
- ✘ 同畫面 > 3 元素同時動

### 圖片
- ✘ 真實照片 / stock photo
- ✘ AI redraw 網路圖（仍是衍生作品）
- ✘ Pixel art / Halftone 處理網路圖（不能洗白）
- ✘ 真人臉部識別性五官（即使是 AI 生成）

---

## 11. 幾何視覺語言 · N→幾何映射

| N | 幾何 |
|---|---|
| 1 | 同心圓 Concentric |
| 2 | 中垂線 Bisector |
| 3 | 三點定圓 Circumcircle |
| 4–6 | Delaunay 三角網 |
| 7–12 | Voronoi 細胞 |
| 13+ | Force Graph |

詳見 `src/design-reference/design-system/geometry-language.md`。

---

## 12. Animation Tone

### 動畫宗旨
> 「**建築物建構的過程**」 — 像建築師現場畫圖

### 時長

| 互動 | 時長 |
|---|---|
| Hover 反饋 | 220ms |
| 元件 fade in | 320ms |
| 頁面切換 | 500ms |
| 大型 morph | 680ms |
| Path drawing | 1200ms（唯一可超過 800ms） |

### Cursor

- 預設：`cursor: none`
- 自訂朱紅小圓 cursor 跟隨滑鼠
- Hover 互動元素：放大為線圈

---

## 13. 卡片 hover 4 種變體

| 卡片 | Hover 行為 |
|---|---|
| **L card** | 等角 3D tilt 12° |
| **M card** | 垂直浮起 -12px + scale 1.02 + 更深陰影 |
| **S card** | 側向 Y 軸 6° 微旋 |
| **XS card** | 整卡 flood 朱紅 + 反白文字 |

不再用「統一 scale 1.02」。

---

## 14. Output Format

### 我要的輸出
- HTML + Tailwind CSS
- 桌機優先（1440px）
- 響應式（mobile 380、tablet 768、desktop 1440）

### 我不要的輸出
- ✘ React component（要純 HTML）
- ✘ Figma / PPT
- ✘ 寫死 hex（必用 CSS variables）

---

## 15. 衝突優先順序

1. **本檔 = 最高優先**
2. page-briefs/ = 次優先
3. Visual Don'ts = hard rules
4. theme.css 的 token 必須精確
5. N→幾何映射 + Glass system 不可妥協

---

## 16. Quick Start Prompt（範本）

```
我要為 PARTI（一部建築圖鑑）設計第一版頁面。

請嚴格遵守附件的 CLAUDE_DESIGN_BRIEF.md v3.1：
1. Glass Editorial 視覺哲學
2. 配色必須精確（用 CSS variables、不寫死 hex）
3. Typography = Inter Tight 200 + PingFang TC（不要 Cormorant）
4. 4 層 Glass 系統（thin/mid/strong/frost）
5. Hidden-until-Touched UX 哲學
6. 完全無靜態裝飾（無角落 motif）
7. N→幾何映射處理多人關係

請先列 5 個你會避免的常見錯誤、再開始生成。
```

---

## 結語

把這份 brief 餵進 Claude Design 之前、再檢查一次：

- [ ] 確認 hex 沒拼錯
- [ ] 確認字型名稱正確（Inter Tight、不是 Inter）
- [ ] 確認 PingFang TC 在 stack 內
- [ ] 確認沒提到 Cormorant Garamond
- [ ] 確認 Visual Don'ts 完整
- [ ] 配對對應的 page-brief 一起餵

省 token 的關鍵：**Design 不要腦力激盪、只執行 brief**。
