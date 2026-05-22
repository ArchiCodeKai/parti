# 字型系統 · v3.1 PingFang Edition

> 權威 token 見 `theme.css`。本檔為文件版說明。

## 重大變更 vs 早期版本

| 字型分類 | v1 | **v3.1（現行）** |
|---|---|---|
| Display | Cormorant Garamond Serif | **Inter Tight 200** Sans |
| 中文 | Source Han Serif TC | **PingFang TC**（Apple 系統字） |
| Editorial italic | 無 | **Instrument Serif italic**（quote 用） |
| Body | Inter | Inter（保留） |
| Mono | JetBrains Mono | JetBrains Mono（保留） |

**Cormorant Garamond 已完全移除** — 太死板、不符合 Glass Editorial 氣質。

## 四層字型 stack

```css
--font-display:   "Inter Tight", "PingFang TC", "PingFang HK", "PingFang SC",
                  -apple-system, BlinkMacSystemFont,
                  "Helvetica Neue", "Microsoft JhengHei", sans-serif;

--font-sans:      "Inter", "PingFang TC", "PingFang HK", "PingFang SC",
                  -apple-system, BlinkMacSystemFont,
                  "Helvetica Neue", "Microsoft JhengHei", sans-serif;

--font-editorial: "Instrument Serif", "PingFang TC", "PingFang HK", serif;

--font-mono:      "JetBrains Mono", "SF Mono", Menlo, monospace;

--font-cjk:       "PingFang TC", "PingFang HK", "PingFang SC",
                  -apple-system, BlinkMacSystemFont,
                  "Microsoft JhengHei", "Heiti TC", sans-serif;
```

## 字型分配

| Tier | 字型 | 字重 | 用途 |
|---|---|---|---|
| **Display** | Inter Tight + PingFang TC | 200 | Hero、條目名、卡片標題 |
| **Editorial** | Instrument Serif + PingFang TC | 400 italic | 引言、強調、義式詞彙 |
| **Body / UI** | Inter + PingFang TC | 400 | 段落、UI、副資訊 |
| **Mono** | JetBrains Mono | 400 / 500 | 編號、日期、標籤、code |

## 為什麼選 PingFang TC（6 個理由）

1. **零載入**：Apple 系統字、不需 Google Fonts、首載快
2. **零授權**：Apple 內建、無商用限制
3. **200 weight 線條極細**：跟 Inter Tight 200 線條重心一致
4. **現代港式美感**：PingFang TC 設計師是日本字研、有國際味
5. **完整 CJK 支援**：TC / HK / SC 三套 fallback
6. **macOS / iOS / iPadOS 完美**：你的目標用戶大量在這

Windows / Android fallback：
- `Microsoft JhengHei`（Windows）
- `Heiti TC`（舊 Mac）

## Type scale（9 階）

```
--text-xs:   12px         /* mono 標籤、最小字 */
--text-sm:   14px         /* 副資訊 */
--text-base: 16px         /* 內文預設 */
--text-lg:   20px         /* 副標題 */
--text-xl:   28px         /* 小標題 */
--text-2xl:  40px         /* 中標題 */
--text-3xl:  64px         /* 大標題 */
--text-hero: clamp(48px, 8vw, 120px)    /* Hero 大字 */
--text-mega: clamp(72px, 11vw, 180px)   /* 滿版超大 Hero */
```

## Utility class

```css
.t-hero  { font-family: display; weight: 200; size: hero;  line: 1.0;  letter: -0.02em; }
.t-3xl   { font-family: display; weight: 200; size: 3xl;   line: 1.05; letter: -0.02em; }
.t-2xl   { font-family: display; weight: 200; size: 2xl;   line: 1.1;  letter: -0.01em; }
.t-xl    { font-family: display; weight: 300; size: xl;    line: 1.2;  letter: -0.01em; }
.t-lg    {                                   size: lg;    line: 1.5; }
.t-base  {                                   size: base;  line: 1.7; }
.t-sm    {                                   size: sm;    line: 1.5;  color: secondary; }
.t-xs    {                                   size: xs;    line: 1.4; }
```

額外：
```css
.editorial      { font-family: editorial; italic; letter: -0.02em; }
.mono           { font-family: mono; letter: 0.05em; }
.uppercase-mono { font-family: mono; uppercase; letter: 0.18em; size: xs; }
```

## 字重規範

| Weight | 用途 |
|---|---|
| **200 Light** | Hero、所有 display 大字（v3.1 主要字重） |
| 300 | Title-xl、副標題 |
| 400 | 內文、UI |
| 500 | 強調、selected |
| 600 | 罕用、僅特殊情境 |

**Hero 不准用 weight 400 以上**（破壞 hairline 質感）。

## 字距 letter-spacing

| 場景 | letter-spacing |
|---|---|
| Hero 大字 | -0.02em（收緊） |
| Title 標題 | -0.01em |
| 內文 | 0 |
| Mono 標籤 | 0.05em |
| Uppercase 全大寫 mono | 0.18em |

## 中英文混排規範

PARTI 大量中英混排（建築師中英名、條目雙語）。規則：

### 並列堆疊（Stack）

```
[Display 200, large]
Le Corbusier

[Display 300, smaller, ink-secondary]
柯 比 意
```

中文字距開：`letter-spacing: 0.1em`（讓字看起來呼吸）。

### 行內混排

```html
<p>
  柯比意（<span class="t-base">Le Corbusier</span>）的代表作...
</p>
```

英文部分自動繼承字型 stack、不需要切 class。

## Editorial italic 用法

`.editorial` class（Instrument Serif italic）只用於：

```html
<blockquote>
  <em class="editorial">「Less is more.」</em>
  — Mies van der Rohe
</blockquote>
```

或：

```html
<h2>The age of <em class="editorial">parti</em></h2>
```

**禁止用在**：內文、按鈕、標籤。

## Hero 範例（Landing）

```html
<h1 class="t-mega" style="font-family: var(--font-display); font-weight: 200;">
  一部建築圖鑑
</h1>

<p class="uppercase-mono" style="color: var(--ink-tertiary);">
  PARTI · An Atlas of Modern Architecture
</p>
```

渲染：
- 主標題：Inter Tight 200 + PingFang TC 200、超大 hairline
- 副標：JetBrains Mono uppercase、letter-spacing 0.18em

## 不要做的

- ✘ Mix 第五種字型（最多 4 層 stack）
- ✘ Italic 內文（除非引用書名 / 義式詞彙）
- ✘ Underline 強調文字（用色 / 字重）
- ✘ Letter-spacing 為負值在內文（只用大標題）
- ✘ Line-height < 1.4 在內文
- ✘ Hero 用 weight ≥ 400
- ✘ 引入 Cormorant Garamond / Noto Serif TC（已棄用）

## Loading

只載 3 個外部字型：

```css
@import url("https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@200;300;400;500;600&family=Inter:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap");
```

PingFang TC 不載入（系統內建）。

## 給 AI 寫 code 的快速 reference

```jsx
// Hero
<h1 className="t-hero">一部建築圖鑑</h1>

// 標題
<h2 className="t-2xl">人 物</h2>

// 內文
<p className="t-base">瑞士裔法籍建築師...</p>

// Mono 標籤
<span className="uppercase-mono">PARTI · ATLAS</span>

// Italic 強調
<em className="editorial">parti</em>
```
