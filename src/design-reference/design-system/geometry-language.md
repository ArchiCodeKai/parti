# 幾何視覺語言（Geometry Language）

## 核心宣言

> 「我們用幾何原理本身、來呈現建築知識的結構 — 因為建築 = 幾何 = 思想」

PARTI 不使用任何裝飾性插畫。所有視覺元素都來自基本幾何原理：點、線、面、圓、三角、Voronoi、Delaunay、軸線、中垂線、同心圓。

## 7 個核心幾何原型

### 1. 三點定圓（Circumcircle）

```
     ●
    / \
   /   \
  ●─────●
    \◯/         ← 外接圓
```

**用途**：
- A. 三位互相影響的建築師 → 共同形成一個流派（流派頁 hero）
- B. **`/compare` 三人比較**（hero piece 王牌互動）

**動畫**：三點 fade in → 連線畫出 → 外接圓 path drawing

**符號意義**：「他們三人共同定義了這個流派」/「他們三人的關係視覺化」

### 1.1 N→幾何映射系統（v3.1 核心）⭐

PARTI 處理「多人關係」時、根據人數自動切換幾何形式：

| N | 幾何 | 含義 | 使用情境 |
|---|---|---|---|
| **1** | 同心圓（Concentric Circles） | 獨行者 / 孤峰 | 自成一派的建築師（Kahn / Scarpa） |
| **2** | 中垂線（Perpendicular Bisector） | 對立 / 對話 | Compare 2 人比較 |
| **3** | 三點定圓（Circumcircle） | 流派最小單位 | Compare 3 人比較、流派核心三人 |
| **4–6** | Delaunay 三角網 | 多人緊密互動 | 中型流派核心圈 |
| **7–12** | Voronoi 細胞 | 領地切割 | 大型流派、地理分佈 |
| **13+** | Force Graph | 大型網絡 / 學派 | 影響上百人的人物（柯比意、密斯） |

每個 N 區間有對應的視覺密度、永遠不卡死在「3 人」。
柯比意這種影響上百人的、自動切到 force graph。

### 1.2 Compare 模式的圓視覺規範 ⭐

`/compare` 三人比較時（N=3）、圓的 **大小 / 彩度 / 透明度** 隨「離散度」變化：

| 離散度 | 圓大小 | HSL 彩度 | 透明度 | 視覺意義 |
|---|---|---|---|---|
| 0.0 | 80px | hsl(5, 80%, 50%) | 1.0 | 風格相近、共同點多 |
| 0.5 | 180px | hsl(5, 55%, 50%) | 0.75 | 中等差異 |
| 1.0 | 280px | hsl(5, 30%, 50%) | 0.5 | 風格相異、幾乎無共同點 |

**公式**：
```typescript
size = 80 + dispersion * 200          // 80 → 280px
saturation = 80 - dispersion * 50     // 80% → 30%
opacity = 1.0 - dispersion * 0.5      // 1.0 → 0.5
```

**離散度計算**：
- 時代軸（30%）：出生年標準差
- 流派重疊（50%）：Jaccard 係數
- 地理（20%）：國籍地理距離

**設計哲學**：
> 「圓越小 + 越濃 = 越親近」
> 「圓越大 + 越淡 = 越疏遠」
> 像水波紋從中心擴散、近的清晰、遠的朦朧

### 2. 三點定平面 / Delaunay 三角網

```
  ●───●───●
  │ ╲ │ ╱ │
  ●───●───●
  │ ╱ │ ╲ │
  ●───●───●
```

**用途**：流派內部結構（多人物關係）
**動畫**：點先出現、三角網依序連結

### 3. Voronoi 細胞

```
  ┌──┬──┬──┐
  │  │  │  │
  ├──●──●──┤   ← 每個點是流派核心
  │  │  │  │
  ├──●──●──┤
  │  │  │  │
  └──┴──┴──┘
```

**用途**：流派之間的「領地切割」
**動畫**：點先出現、細胞邊界從點向外擴張

### 4. 軸線（Axis）

```
  ●────────────────────●
   1850            2025
```

**用途**：時代軸、影響軸
**動畫**：線從一端畫到另一端

### 5. 中垂線（Perpendicular Bisector）

```
  ●─────────●
       │
       │      ← 中垂線
       │
```

**用途**：兩位建築師的「對立 / 中介」關係（如 Le Corbusier vs Wright）
**動畫**：兩點先出、線從中點向兩側擴張

### 6. 同心圓（Concentric Circles）

```
      ◯
     ◯
    ◯●◯
     ◯
      ◯
```

**用途**：一位建築師的「影響擴散」
**動畫**：圓從中心向外依序出現

### 7. 連線 / 力導向圖（Force Graph）

```
   ●───●
   │   │
   ●───●───●
       │
       ●
```

**用途**：人物與人物之間的網絡關係
**用在**：Landing hero 縮影、`/architects` 馬賽克 hover preview

### 8. PARTI Star（12 角放射星）⭐

```
        ┃
      ╲ ┃ ╱
    ━━━━●━━━━
      ╱ ┃ ╲
        ┃
```

**用途**：通用裝飾 / 跳轉符號 / 載入 / 角落 motif / CTA 前綴
**符號意義**：羅盤 + 建築放射廣場 + 構成主義光芒
**詳細規格**：見 `docs/03-元件設計/parti-star.md`

**SVG path（權威）**：
```
M 152 70.059 L 201.539 20.519 L 235.48 54.461 L 185.941 104 L 256 104 L 256 152 L 185.941 152 L 235.48 201.539 L 201.539 235.48 L 152 185.941 L 152 256 L 104 256 L 104 185.941 L 54.46 235.48 L 20.52 201.539 L 70.059 152 L 0 152 L 0 104 L 70.059 104 L 20.519 54.46 L 54.461 20.52 L 104 70.059 L 104 0 L 152 0 Z
```

ViewBox: `0 0 256 256`、fill `currentColor`。

## 視覺原子 token

```css
:root {
  /* 點 */
  --geo-dot-sm: 4px;
  --geo-dot-md: 8px;
  --geo-dot-lg: 16px;

  /* 線 */
  --geo-line-thin: 0.5px;
  --geo-line-base: 1px;
  --geo-line-bold: 2px;

  /* 圓 */
  --geo-circle-sm: 16px;
  --geo-circle-md: 32px;
  --geo-circle-lg: 80px;
  --geo-circle-xl: 200px;
}
```

## SVG 元件庫

實作時建立可複用的幾何 SVG 元件：

```typescript
// src/components/geometry/

CircumCircle.tsx          // 三點定圓
DelaunayMesh.tsx          // Delaunay 三角網
VoronoiCells.tsx          // Voronoi 細胞
AxisLine.tsx              // 軸線
PerpendicularBisector.tsx // 中垂線
ConcentricCircles.tsx     // 同心圓
ForceGraph2D.tsx          // 力導向圖
```

每個元件接受相同 props pattern：

```typescript
interface GeometryProps {
  points: Array<{ x: number; y: number; label?: string }>;
  color?: string;
  animated?: boolean;
  animationDelay?: number;
}
```

## 構成主義 motif（裝飾元素）

```
●   ̶̶̶̶
                                                                                                    

                                                                                                                                          
       ↑
       朱紅圓 + 細黑線（每頁四角隨機分佈）
```

非結構性裝飾、但 fixed 在某些位置（卡片角落、區塊轉換處），保持構成主義氣質。

## 不要做的

- ✘ 用裝飾性插畫（人物 icon、emoji、卡通圖）
- ✘ 用 3D 立體效果（保持 2D）
- ✘ 用紋理填色（線條 + 點 + 純色面）
- ✘ 用陰影、漸層（破壞構成主義感）
- ✘ 過度使用單一原型（每頁不要超過 3 個幾何元素）

## 為什麼這樣做

| 普通網站 | PARTI |
|---|---|
| 用裝飾性圖示 | 用幾何原理 |
| 用 emoji 表達 | 用線條表達 |
| 用照片填充版面 | 用留白 + 幾何骨架 |
| 一致的卡片排列 | 用 Voronoi / Delaunay 切割 |

這就是 PARTI 跟 Wikipedia / ArchDaily / ChatGPT 的根本差異。
