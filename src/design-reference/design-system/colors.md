# 色彩系統 · v3.1

> 權威 token 見 `theme.css`。本檔為文件版說明。

## 色彩哲學

> **Default = 冷靜到無聊 / Interactive = 色彩爆發**

預設畫面 78% 接近白 + 18% 黑文字、朱紅 ≤ 3%、灰青 ≤ 1%。
所有顯眼色彩**藏在卡片背面 / hover / 翻轉 / 互動才出現**。

## 主色票（v3.1 權威）

### 背景層級（兩層 paper）

```
--bg-page:        #FCFBF8   ← 整頁背景、接近白
--bg-card-base:   #F4EFE6   ← 卡片基底（玻璃下方的米白底）
```

### 玻璃層

```
--bg-card-glass:        rgba(255, 255, 255, 0.42)   ← .glass 預設
--bg-card-glass-strong: rgba(255, 255, 255, 0.68)   ← .glass-strong hover
--bg-card-frost:        rgba(255, 255, 255, 0.85)   ← .glass-frost modal
--bg-elev:              rgba(255, 255, 255, 0.78)
```

### 文字色

```
--ink-primary:   #0F0F0F                  ← 主文字
--ink-secondary: #3A3A3A                  ← 副文字
--ink-tertiary:  #7A7A7A                  ← 淡灰
--ink-faint:     rgba(15, 15, 15, 0.40)   ← 極淡
```

### Accent

```
--accent-red:     #E63B2E   ← 朱紅、互動主色（≤ 3% 全頁使用率）
--accent-red-dim: #C32A1F   ← 朱紅深、pressed 狀態
--accent-cyan:    #5B7A82   ← 灰青、副強調（≤ 1% 使用率）
```

### 線條

```
--line:      rgba(15, 15, 15, 0.85)   ← 明顯邊線
--line-soft: rgba(15, 15, 15, 0.08)   ← 軟邊（glass border）
--line-hair: rgba(15, 15, 15, 0.05)   ← 細到看不太到
--noise:     rgba(15, 15, 15, 0.03)   ← 紋理
```

## 使用比例（v3.1 黃金規則）

| 色 | 比例 | 在哪裡 |
|---|---|---|
| `--bg-page` 接近白 | 78% | 整頁背景 |
| 黑文字 | 18% | 內文、標題 |
| 朱紅 `--accent-red` | ≤ 3% | 預設隱藏、互動才出現 |
| 灰青 `--accent-cyan` | ≤ 1% | 極少數標記 |

**重點變化（vs v1）**：朱紅從「5–8%」降到「≤ 3%」、預設**完全隱藏在卡片背面 / hover 後**才出現。

## 「藏紅」哲學（重要）

```
默認看到的：
─────────────────────
■ ─ ─ ─ ─ ─ ─ ─ ─ ─
─ ─ ─ ─ ─ ─ ─ ─ ─ ─
─ ─ ─ ─ ─ ─ ─ ─ ─ ─
■ ─ ─ ─ ─ ─ ─ ─ ─ ─

唯一一點紅：Header 左側 dot-red（呼吸動畫、賞識自己這是 PARTI）
```

互動後才會出現的紅：
- Hover 卡片 → 卡片背面翻出來、整個朱紅 + 反白文字
- Click chip → 從左 scaleX 掃描成滿色 + 反白
- 內文 hover 詞條 → 底線從左畫到右、文字變朱紅
- 加入比較選中 → 紅點環繞卡片
- Cmd+K 選中 row → 朱紅 5% 透明

## Dark Mode（v2、預留）

token 命名已預留 dark mode：

```css
[data-theme="dark"] {
  --bg-page:        #1A1815;
  --bg-card-base:   #2A2722;
  --ink-primary:    #F4EFE6;
  --ink-secondary:  #C5C0B5;
  --ink-tertiary:   #888377;
  /* accent 維持不變 */
}
```

v1 不實作、v2 才做。

## 流派代表色（流動敘事頁用）

每流派的 subtle tint（5% opacity overlay）、不破壞主底：

| 流派 | 色（5% tint） |
|---|---|
| Art Nouveau | 暗綠 #4A6B4D |
| Bauhaus | 純黑 #0F0F0F |
| Constructivism | 朱紅 #E63B2E |
| International Style | 純白 #FFFFFF |
| Brutalism | 灰青 #5B7A82 |
| Metabolism（代謝派）| 銀灰 #A8A8A0 |
| Postmodernism | 米黃 #D4B66C |
| Deconstructivism | 鋼藍 #4B6B7A |
| Minimalism | 純白 #FFFFFF |
| Parametricism | 鈦灰 #6A6B6F |
| （其他 10 流派） | 待定 |

## 不允許

- ✘ 寫死 hex（必須用 `var(--token)`）
- ✘ 朱紅 > 3% 全頁覆蓋
- ✘ 鮮藍 / 鮮綠 / 鮮黃
- ✘ Gradient background
- ✘ 半透明色除了 token 內定義的
- ✘ 同畫面同時用 4 種以上 accent

## 給 AI 寫 code 的快速 reference

```css
/* 一般卡片 */
.card {
  background: var(--bg-card-base);
  color: var(--ink-primary);
  border: 1px solid var(--line-soft);
}

/* Hover 才出現 accent */
.card:hover {
  background: var(--accent-red);
  color: #FFFFFF;
}

/* 內文連結 */
.parti-link:hover {
  color: var(--accent-red);
}
```
