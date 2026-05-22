# AI 圖片生成系統

## 決策背景

PARTI 不使用真人肖像 / stock photo。
理由：
- 真人照片有版權 + 肖像權雙重保護
- AI redraw / pixel art / halftone 都不能洗白源頭版權
- 線稿 SVG 風格與 Glass Editorial 衝突

**最終決策**：**全程用 AI 純生成圖**（耗 token 但零版權問題）。

## 統一視覺風格

### Master Style（6 條 DO）

1. **單色 + 朱紅 accent**：主體灰階、僅關鍵元素朱紅
2. **接近白底**：背景 #FCFBF8 系列
3. **無真實人臉**：所有人物只到肩膀、剪影或側臉
4. **建築物：軸測線稿 + 微塗色**：保留結構、避開照片感
5. **平面構成**：扁平、無 3D 立體感、無透視戲劇化
6. **顆粒噪訊 5%**：保留紙感

### Master Style（8 條 DON'T）

1. ✘ 真實人臉 / 識別性五官
2. ✘ 鮮藍 / 鮮綠 / 鮮黃
3. ✘ 漸層 background
4. ✘ Drop shadow / 立體感
5. ✘ 卡通 / Disney 風
6. ✘ 完整 logo / 招牌字（容易違反商標）
7. ✘ 寫實照片風（風格要明顯偏向插畫）
8. ✘ 透視戲劇化（保持平面）

## Slot 系統

### v1 P1 slot 清單（51 張）

| 類型 | 數量 | 用途 |
|---|---|---|
| **Person（建築師）** | 28 | 馬賽克 L/M 卡片、個人頁 hero |
| **Building（建築）** | 11 | 建築物卡片、個人頁代表作、building 詳細頁 |
| **Movement cover（流派）** | 12 | 流派 cover、流動敘事 hero |

### 統一檔名規範

```
public/img/
  person/
    le-corbusier.webp
    mies-van-der-rohe.webp
    ...
  building/
    fallingwater.webp
    notre-dame-du-haut.webp
    ...
  movement/
    brutalism.webp
    modernism.webp
    ...
```

### Slot priority

| Priority | 條件 |
|---|---|
| **P1** | v1 ship 必備（51 張） |
| **P2** | v2 補上 |
| **P3** | v3 視情況 |

## 4 個 Prompt Template

### Template 1：Person（建築師）

```
Editorial portrait illustration, monochrome with subtle red accent (#E63B2E),
flat 2D illustration style, no photographic realism, no real face features,
shown from shoulders only, profile or 3/4 view, head tilted slightly,
clean light-cream background (#FCFBF8), subtle 5% grain texture,
single thin black outline (1px equivalent), no drop shadow, no gradient,
inspired by 1960s editorial magazine illustration, Pentagram-style,
focus on silhouette and posture rather than facial detail.
Subject: {{architect_name}}, {{era}}, {{country}}, {{key_trait}}.
```

範例填入：
- `{{architect_name}}` = "Le Corbusier"
- `{{era}}` = "1920s-1960s"
- `{{country}}` = "Switzerland/France"
- `{{key_trait}}` = "modernist pioneer, glasses, suit"

### Template 2：Building（建築）

```
Architectural axonometric line drawing with subtle red accent (#E63B2E)
on key structural element only, monochrome base (#0F0F0F lines on #FCFBF8),
flat 2D, no perspective drama, no photographic realism, no shadow,
clean editorial style, 1960s Italian architecture magazine inspired,
subtle 5% paper grain texture, single building no environment,
viewed from 3/4 isometric angle.
Subject: {{building_name}} by {{architect}}, {{year}}, {{location}},
key feature: {{distinctive_element}}.
```

範例填入：
- `{{building_name}}` = "Fallingwater"
- `{{architect}}` = "Frank Lloyd Wright"
- `{{year}}` = "1935"
- `{{distinctive_element}}` = "cantilever, horizontal slabs"

### Template 3：Movement Cover（流派）

```
Abstract editorial illustration representing {{movement}} architectural movement,
geometric abstraction, monochrome with single red accent (#E63B2E),
flat 2D, no specific buildings, conceptual visual language only,
{{geometric_motif}} as central element,
clean cream background (#FCFBF8), 5% grain, no shadow, no gradient.
Mood: {{mood_keywords}}.
```

範例填入（Brutalism）：
- `{{movement}}` = "Brutalism"
- `{{geometric_motif}}` = "stacked concrete blocks, raw textures"
- `{{mood_keywords}}` = "heavy, monumental, austere"

### Template 4：Ambient（環境裝飾）

```
Minimal ambient background illustration, monochrome grayscale,
geometric shapes only (circle, line, triangle), no human, no building,
flat 2D, suggest architectural concept,
subtle red dot accent (#E63B2E) placed asymmetrically.
Concept: {{concept}}.
```

範例填入：
- `{{concept}}` = "transition between two pages"

## 生圖工具選擇

| 工具 | 推薦度 | 理由 |
|---|---|---|
| **Midjourney v6+** | ⭐⭐⭐⭐⭐ | 風格控制最強、適合 editorial style |
| Stable Diffusion XL（本地） | ⭐⭐⭐⭐ | 零成本、可大量生 |
| DALL-E 3 | ⭐⭐⭐ | API 方便、但風格控制較差 |
| Flux Pro | ⭐⭐⭐⭐ | 新模型、品質高 |

## 工作流程（5 步驟）

### Step 1：填入 template
從 entity metadata 自動填入變數、產出最終 prompt。

### Step 2：批次生圖
一次生 4 張、選最接近 Master Style 的一張。

### Step 3：後製（如需要）
- 用 Photoshop / Figma 調色到符合 token 朱紅
- 加 5% grain texture
- Crop 到正確比例（卡片 = 3:4、hero = 16:9）

### Step 4：轉 WebP
```bash
cwebp -q 80 source.png -o public/img/person/le-corbusier.webp
```

目標檔案大小：< 80KB / 張。

### Step 5：寫入 manifest
```json
// public/img/manifest.json
{
  "person/le-corbusier": {
    "generated": "2026-05-21",
    "model": "midjourney-v6",
    "prompt_hash": "abc123",
    "size_kb": 72
  }
}
```

## Attribution

由於是 AI 生成、技術上無版權問題。但 PARTI 在 footer 標明：

```
所有圖片由 AI 生成、不代表真人實際容貌。
Architectural depictions are AI-generated interpretations.
```

## Placeholder（圖未生時的顯示）

在 P1 圖未生完前、卡片用 placeholder：

```css
.img-placeholder {
  background: var(--bg-card-base);
  display: flex;
  align-items: center;
  justify-content: center;
}

.img-placeholder::after {
  content: "PENDING";
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.18em;
  color: var(--accent-red);
  animation: breath 3s ease-in-out infinite;
}

.img-placeholder .initials {
  font-family: var(--font-display);
  font-weight: 200;
  font-size: 48px;
  color: var(--ink-tertiary);
  letter-spacing: 0.05em;
}
```

範例：柯比意 placeholder 顯示「LC」+ 「PENDING」紅字呼吸動畫。

## 不要做的

- ✘ 用網路圖二次處理（AI redraw / pixel / halftone — 都仍是衍生作品）
- ✘ 用任何免費 stock 但未確認 license
- ✘ AI 生圖時用真實照片當參考（reference image）
- ✘ 跨 style 混用（必須 100% Master Style）
- ✘ 過度後製到看不出 AI 生成（保留適度的「插畫感」）
- ✘ 加 watermark

## v2 擴展計畫

| 階段 | 內容 |
|---|---|
| v1 | 51 P1 slot 全填完、ship |
| v2 | 補 P2 slot（~80 張）、覆蓋 v2 內容擴充 |
| v3 | 動態生圖（每位新建築師加入時自動生）|

## 預估成本（v1）

| 工具 | 51 張 | 估算 |
|---|---|---|
| Midjourney v6 | 51 × 4 attempts | ~USD 30（一個月訂閱） |
| 後製工時 | 51 × 5 min | ~4.25 hr |
| 寫 prompt + 校對 | 51 × 3 min | ~2.5 hr |
| **總計** | | **~USD 30 + 7 小時** |
