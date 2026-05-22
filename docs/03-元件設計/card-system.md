# 卡片系統設計

## 設計目的

PARTI 的所有總覽頁主視覺都是「卡片」— 必須有強識別、可重複、有層次。

## 三種尺寸變體

| 變體 | 桌機尺寸 | 適用 | 顯示內容 |
|---|---|---|---|
| **L（大）** | 400 × 500 | 重要建築師 / 流派 hero | 名字 + 線稿肖像 + 副標 + 一句話描述 |
| **M（中）** | 280 × 360 | 一般 Pritzker / 重要建築 | 名字 + 縮圖（可選） + 流派 badge |
| **S（小）** | 200 × 200 | 補充人物 / 次要條目 | 名字 + 生卒 |

按重要性混排、不要全部一樣大（避免視覺疲勞）。

## 卡片元素

```
┌────────────────────────┐
│   [線稿 / SVG 縮圖]      │  ← optional
│                        │
│  Le Corbusier          │  ← 中文 + 英文堆疊
│  柯比意                  │
│                        │
│  1887–1965 · 瑞士/法     │  ← 副資訊 mono 字
│                        │
│  [Brutalism] [Modern]   │  ← 流派 badge
└────────────────────────┘
   ↑ hover：邊框朱紅、輕微 scale 1.02
```

## 互動規則 · v3.1（4 種 hover 變體）

### 預設狀態
- 玻璃背景（`.glass` blur 36px、saturation 180%）
- 邊框 1px `var(--line-soft)`
- 圓角 `--r-lg` 20px
- 微妙 box-shadow（inner highlight + drop）
- **無陰影顯眼**、**無 emoji**、**無靜態裝飾**

### Hover 4 種變體（按卡片大小差異化）

| 卡片 | Hover 行為 | 動畫 |
|---|---|---|
| **L 卡** | **等角 3D tilt 12°**（perspective rotate） | 320ms ease-emphasized |
| **M 卡** | **垂直浮起 -12px + scale 1.02 + 深陰影** | 220ms ease-out |
| **S 卡** | **側向 Y 軸 6° 微旋** | 220ms ease-out |
| **XS 卡** | **整卡 flood 朱紅 + 反白文字** | 220ms ease-out |

所有 hover 共同：
- 玻璃 class 從 `.glass` → `.glass-strong`（blur 36→48px）
- Cursor 變放大鏡 / 朱紅圓 cursor
- 加入比較 ⊕ icon Hidden-until-Touched 淡入

### 點擊
- View Transitions API morph 到下一頁
- 動畫時長 500ms（`--duration-slow`）

### Selected 狀態
- 朱紅小點靜止在卡片角落（不再 5 秒繞行動畫）
- 持續顯示直到取消選擇

## 構成主義變體（裝飾元素）

在某些卡片角落加幾何裝飾：

```
┌────────────────────────┐
│ ●                      │  ← 紅圓（朱紅）
│                        │
│  Mies van der Rohe     │
│  ───                   │  ← 細黑線
│                        │
│            ◯           │  ← 灰青圓
└────────────────────────┘
```

- 紅圓在左上、灰青圓在右下（對角構成）
- 三點定圓變體：某些卡片用 3 個點構成外接圓裝飾

## 不要做的

- ✘ 預設陰影（破壞極簡感）
- ✘ 圓角過大（不超過 4px）
- ✘ 漸層背景（純色才對）
- ✘ 所有卡片一樣大
- ✘ Hover 太誇張的動畫（保持 200ms 內）

## 元件 props

```typescript
interface CardProps {
  entity: Architect | Building | Movement;
  size: "L" | "M" | "S";
  decoration?: "dots" | "circle" | "triangle" | "none";
  onClick?: () => void;
}
```
