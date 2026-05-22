# 人物總覽（馬賽克牆）設計

## 路由

`/architects`

## 頁面結構

```
═══════════════════════════════════════════
[Header]
  PARTI · ARCHITECTS

[篩選器 sticky]
  時代 | 流派 | 國籍 | 學派 | 事務所
═══════════════════════════════════════════
[馬賽克牆]
  ┌─L─┐  ┌M┐ ┌M┐ ┌─S─┐
  │   │  │ │ │ │ │   │
  └───┘  └─┘ └─┘ └───┘
  ┌M┐ ┌─L─┐ ┌M┐ ┌─S─┐
  │ │ │   │ │ │ │   │
  └─┘ └───┘ └─┘ └───┘
  ...（200+ 卡片）
═══════════════════════════════════════════
```

## 篩選器（sticky top）

橫向排列、像 tag chips：
- **時代**：1850–1900 / 1900–1920 / 1920–1945 / 1945–1965 / 1965–1980 / 1980–2000 / 2000–現在
- **流派**：20 個流派可多選
- **國籍**：依條目自動列出（前 10 國 + more）
- **學派**：包浩斯、AA、Bartlett、Cooper Union、東海...
- **事務所**：OMA、H&dM、SANAA、SOM...

互動：
- 點 tag → 即時收斂 mosaic
- URL query params 同步：`/architects?era=1945-1965&movement=brutalism`
- Cmd+Click 多選

## 卡片混排規則

- **L 卡片**：Pritzker 得主、現代主義先驅（柯比意、密斯、萊特、康）— 約 10 張
- **M 卡片**：其他 Pritzker、台日中重要建築師 — 約 50 張
- **S 卡片**：其他補充建築師 — 約 140 張

排列：用 CSS Grid + grid-row-end / grid-column-end 控制不同大小、形成自然的 Pinterest-style masonry。

## 排序

預設：**重要性**（Pritzker > 現代先驅 > 其他）
可切換：年代正序 / 倒序 / 字母順

## 載入策略

- 初載 30 張（最重要的）
- Scroll 觸發 lazy load 下一批 30 張
- IntersectionObserver 監測滾到底

## 卡片元素

參考 `docs/03-元件設計/card-system.md`：
- L：名字 + 線稿肖像 + 副標 + 一句話
- M：名字 + 流派 badge
- S：名字 + 生卒

## 互動（v3.1 · 4 種 hover 變體）

### 卡片 hover 行為差異化

不再用「統一 scale 1.02」、依卡片大小差異化：

| 卡片 | Hover 行為 | 動畫時長 |
|---|---|---|
| **L 卡** | **等角 3D tilt 12°**（透視旋轉、給縱深感） | 320ms ease-emphasized |
| **M 卡** | **垂直浮起 -12px + scale 1.02 + 更深陰影** | 220ms ease-out |
| **S 卡** | **側向 Y 軸 6° 微旋** | 220ms ease-out |
| **XS 卡** | **整卡 flood 朱紅 + 反白文字** | 220ms ease-out |

所有 hover 共同：
- Cursor 變放大鏡（cursor: zoom-in、或 cursor: none + 自訂朱紅圓 cursor）
- 玻璃 class 從 `.glass` → `.glass-strong`（blur 36→48px）
- 加入比較 ⊕ icon 從 opacity 0 → 1（Hidden-until-Touched）

### Selected 狀態
被選為「加入比較」的卡片：
- 朱紅小點繞卡片邊環行（不再有 5 秒 orbit、改為靜止小點）
- 持續顯示直到取消選擇

### 點擊
- 卡片點擊：View Transitions API morph 到個人頁
- 點擊空白處：篩選器收起

## 手機版

- 馬賽克變單列堆疊（全寬卡片）
- L / M / S 改為「全寬大圖」/「全寬中圖」/「半寬小圖（2 欄）」
- 篩選器收進 bottom sheet（點按鈕展開）

## 空狀態

無結果時：
```
找不到符合篩選的建築師

[ 清除篩選 ]
```
