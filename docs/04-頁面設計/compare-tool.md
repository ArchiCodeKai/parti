# 比較工具（Compare）頁面設計

## 路由

`/compare?ids=le_corbusier,wright,aalto`

URL 同步選的 entity ids、可分享連結。

## 設計目的

讓使用者任選 **1–3 位建築師**、視覺化呈現他們的關係：
- 1 人：高亮 timeline
- 2 人：中垂線 + 兩側對立特徵
- 3 人：三點外接圓 + 圓內共同點

**這是 PARTI 的 hero piece 王牌互動** — Wikipedia 不會、ChatGPT 不能、Awwwards 評審會記住的功能。

## 入口（4 處）

| 位置 | 互動 |
|---|---|
| **Header** | 「Compare」永久連結 |
| **`/architects` 每張卡片** | 右上角 ⊕ icon、點擊加入比較 |
| **個人頁 hero** | 「+ 加入比較」按鈕 |
| **底部 Compare Bar**（浮動）| 已選 1+ 人時自動顯示、可移除 / 清空 / 跳 /compare |

## 頁面結構

```
═══════════════════════════════════════════════════════
[Header fixed]
═══════════════════════════════════════════════════════
[Page Title]
═══════════════════════════════════════════════════════
[Slot 區 - 3 個建築師卡片並排]
═══════════════════════════════════════════════════════
[Visualization 區 - 隨選人數變化]
═══════════════════════════════════════════════════════
[Comparison Details 區 - 文字描述]
═══════════════════════════════════════════════════════
[Footer]
═══════════════════════════════════════════════════════
```

## Slot 區（卡片並排）

```
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║  ┌─────────┐    ┌─────────┐    ┌─────────┐            ║
║  │ ●       │    │         │    │         │            ║
║  │         │    │         │    │  + 加入  │            ║
║  │ 柯比意   │    │  萊特    │    │         │            ║
║  │ ─────   │    │ ─────   │    │         │            ║
║  │ 1887   │    │ 1867    │    │         │            ║
║  │   ×    │    │   ×     │    │         │            ║
║  └─────────┘    └─────────┘    └─────────┘            ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
```

### Slot 規格

- 每 slot：240 × 280px（桌機）
- 已選：實線朱紅邊框、含建築師資訊、右上 × 移除
- 未選：虛線 1px ink-tertiary 邊框、中央 + icon、點擊開啟搜尋選擇

### 選擇互動

未選 slot 點擊 → 開啟 mini Cmd+K 搜尋框（只搜建築師 entity）
- 鍵盤輸入名字
- 上下選擇
- Enter 加入

## Visualization 區（核心）

### 狀態 0：未選任何人

```
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║              選擇 1–3 位建築師、看他們的關係             ║  ← Serif 24px
║                                                       ║
║              ────                                     ║
║                                                       ║
║              1 人：時間軸高亮                          ║  ← Mono 14px
║              2 人：中垂線比較                          ║
║              3 人：外接圓共同點                        ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
```

### 狀態 1：選 1 人（Timeline 高亮）

```
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║   柯比意 · LE CORBUSIER                                ║
║                                                       ║
║   1887 ──────────────────────────────── 1965          ║
║      [Purism ███ ][Intl Style █████][Brutal ███]      ║
║      1918  1928   1935        1947   1955   1965      ║
║                                                       ║
║   25 件代表建築                                        ║
║   3 個流派時期                                         ║
║   影響後世 28 位建築師                                  ║
║                                                       ║
║   ────                                                ║
║                                                       ║
║   再加 1 位看對立關係 →                                ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
```

### 狀態 2：選 2 人（中垂線比較）

```
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║                                                       ║
║                                                       ║
║     ●─────────────────────────────●                   ║
║   柯比意           │              萊特                 ║
║                  │  ← 中垂線                          ║
║                  │  （朱紅 1px、800ms 從中心畫出兩側） ║
║                  │                                    ║
║   ── 柯比意 ──             ── 萊特 ──                  ║
║   • International Style    • Organic                  ║
║   • 機器美學                • 自然有機                  ║
║   • 城市主義                • 草原派                    ║
║   • 法國（瑞士裔）           • 美國                     ║
║   • 1887–1965              • 1867–1959                ║
║                                                       ║
║   ────                                                ║
║                                                       ║
║   共同點：                                             ║
║   • 都是現代主義先驅                                    ║
║   • 都活躍於 1920–1950 黃金期                          ║
║   • 都影響後世建築教育                                  ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
```

### 狀態 3：選 3 人（外接圓 + 共同點） ⭐ wow moment

```
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║                                                       ║
║                  ●  柯比意                             ║
║                ╱ ╲                                    ║
║              ╱     ╲                                  ║
║            ╱   ◯   ╲   ← 外接圓                       ║
║          ╱  共同點   ╲                                 ║
║        ╱             ╲                                ║
║      ╱                ╲                               ║
║     ●──────────────────●                              ║
║   萊特               Aalto                            ║
║                                                       ║
║   ────                                                ║
║                                                       ║
║   ◯ 外接圓的視覺意義：                                  ║
║                                                       ║
║   ● 圓小 + 深朱紅 + 不透明  = 風格相近                  ║
║   ◯ 圓大 + 淡灰紅 + 半透明 = 風格相異                  ║
║                                                       ║
║   ────                                                ║
║                                                       ║
║   三人共同點：                                          ║
║   • 都是現代主義先驅（1880s 出生）                       ║
║   • 都活躍於 1920–1960                                ║
║   • 都影響後世建築教育                                  ║
║   • 都不接受國際樣式的純粹理性                          ║
║                                                       ║
║   差異維度：                                            ║
║   • 時代離散度：低（出生年差 26 年）                     ║
║   • 流派重疊：中（都跨多派、但派別不全同）                ║
║   • 地理：高（瑞士 / 美國 / 芬蘭）                       ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
```

## N→幾何映射（v3.1 整合）⭐

PARTI Compare 不再限定 3 人。根據已選人數自動切換幾何形式：

| N | 幾何 | 視覺 |
|---|---|---|
| 1 | 同心圓 Concentric | 該人為圓心、向外擴散 3 層影響圈 |
| 2 | 中垂線 Bisector | 兩點之間中垂線、兩側對立特徵 |
| **3** | **三點定圓 Circumcircle** | **三點外接圓 + 圓內共同點**（離散度視覺規範見下）|
| 4–6 | Delaunay 三角網 | 多人緊密互動、點與點全連接成三角網 |
| 7–12 | Voronoi 細胞 | 每人一個細胞、細胞大小 = 影響力 |
| 13+ | Force Graph | 大型網絡 / 學派、節點漂浮 |

切換動畫：
- N 變化時、舊幾何 fade out 320ms → 新幾何 path drawing 1200ms 出現
- 同類人物（如同流派）會自動聚得近、不同類分散
- 用戶 hover 任一點 → 該人物資訊浮現

**舊「最多 3 人」限制已移除**。

---

## 圓圈視覺規範（N=3 三點定圓專用）

### 離散度計算

```typescript
function calculateDispersion(architects: [A, A, A]): number {
  // 時代軸（30% 權重）
  const eraVariance = standardDeviation(
    architects.map(a => a.birthYear)
  ) / 50;                                  // normalize 0-1

  // 流派重疊（50% 權重）
  const allMovements = architects.map(a => new Set(a.movements.map(m => m.id)));
  const moveOverlap = jaccardIntersection(allMovements);

  // 地理離散（20% 權重）
  const geoVariance = avgGeoDistance(
    architects.map(a => a.nationality)
  ) / 10000;                               // normalize 0-1

  return Math.min(1,
    eraVariance * 0.3 +
    (1 - moveOverlap) * 0.5 +
    geoVariance * 0.2
  );
}
```

### 視覺映射

```typescript
function getCircleStyle(dispersion: number) {
  return {
    // 大小：80px → 280px
    size: 80 + dispersion * 200,

    // 彩度：HSL saturation 80% → 30%
    fill: `hsl(5, ${80 - dispersion * 50}%, 50%)`,

    // 透明度：1.0 → 0.5
    opacity: 1.0 - dispersion * 0.5,

    // 邊框：永遠 1px 朱紅實線
    stroke: "var(--accent-red)",
    strokeWidth: 1,
  };
}
```

### 範例

| 三人組合 | dispersion | 圓大小 | 彩度 | 透明度 |
|---|---|---|---|---|
| 柯比意 / 密斯 / Gropius（都是國際樣式） | 0.2 | 120px | 70% | 0.9 |
| 柯比意 / 萊特 / Aalto（同代但不同派） | 0.55 | 190px | 53% | 0.73 |
| 柯比意 / 王澍 / Calatrava（跨代跨地） | 0.85 | 250px | 38% | 0.58 |

## 動畫劇本

### 加入第 1 人

```
Frame 0:   點擊加入按鈕
           ↓
Frame 1ms: Slot 1 卡片膨脹放入（200ms scale 0 → 1）
           ↓
Frame 200ms: 該人物時間軸 fade in（300ms）
             彩條時間軸 path drawing 從左到右（800ms）
           ↓
Frame 1000ms: 統計數字（25 件 / 3 流派 / 28 影響）依序 fade in
           ↓
Frame 1500ms: 「再加 1 位」提示 fade in
```

### 加入第 2 人（從狀態 1 → 狀態 2）

```
Frame 0:    加入第 2 位
            ↓
Frame 1ms:  Slot 2 卡片膨脹（200ms）
            ↓
Frame 200ms: 第一人 timeline fade out（300ms）
             ↓
Frame 500ms: 兩個 ● 從卡片位置「飛」到視覺區（800ms ease-out）
             ↓
Frame 1300ms: 中垂線從中心向兩側「畫出」
              （朱紅 1px、800ms ease-in-out）
             ↓
Frame 2100ms: 左右兩側對立特徵 list fade in（stagger 100ms）
             ↓
Frame 2800ms: 共同點 list fade in
```

### 加入第 3 人（從狀態 2 → 狀態 3） ⭐

```
Frame 0:     加入第 3 位
             ↓
Frame 1ms:   Slot 3 卡片膨脹（200ms）
             ↓
Frame 200ms: 中垂線 fade out（300ms）
             對立特徵 list fade out（300ms）
             ↓
Frame 500ms: 第三個 ● 從卡片位置 fly in 到第三點位置（800ms）
             ↓
Frame 1300ms: 三點之間連線依序畫出（每線 400ms、共 1200ms）
              ↓
Frame 2500ms: 外接圓計算完成、path drawing 從 0 → 100%
              （1200ms ease-in-out）
              同時、圓的 size/saturation/opacity 從 default 漸變到目標值
              ↓
Frame 3700ms: 圓內中心點 fade in（共同點圖示）
              ↓
Frame 4000ms: 共同點 list + 差異維度 list fade in
```

### 移除任一人

```
被移除的 slot 卡片 fade out 200ms
↓
視覺區從 N 人狀態 morph 到 N-1 人狀態
（中間有 200ms 過渡、相關元素 fade out 再重新繪製）
```

### 4 人嘗試加入

```
顯示 toast：「最多 3 位、請先移除一位」
toast 從上方滑下、停 2 秒、滑回
```

## Compare Bar（底部浮動）

當已選 1+ 人時、所有頁面底部出現浮動 bar：

```
═══════════════════════════════════════════════════════
  ● 柯比意   ● 萊特   + 加入第 3 位     [清空]  [比較 →]
═══════════════════════════════════════════════════════
```

- 位置：底部 fixed、高度 60px
- 背景：`var(--bg-paper)` + 上邊框 1px `var(--line-soft)`
- 已選人物：mono small chip + × 移除
- 「比較 →」按鈕：朱紅、跳到 /compare 主頁

## 共同點 / 差異點計算邏輯

### 共同點來源

```typescript
function computeCommonalities(architects: Architect[]): string[] {
  const commons: string[] = [];

  // 1. 同流派（任一時期）
  const sharedMovements = intersectMovements(architects);
  if (sharedMovements.length > 0) {
    commons.push(`都屬於 ${sharedMovements.join(" / ")} 流派`);
  }

  // 2. 同學派
  const sharedSchools = intersectSchools(architects);
  if (sharedSchools.length > 0) {
    commons.push(`都來自 ${sharedSchools.join(" / ")} 學派`);
  }

  // 3. 同事務所
  const sharedFirms = intersectFirms(architects);
  if (sharedFirms.length > 0) {
    commons.push(`都曾在 ${sharedFirms.join(" / ")}`);
  }

  // 4. 同代（出生年 ±10 年）
  if (sameGeneration(architects)) {
    commons.push(`都活躍於 ${commonEra(architects)}`);
  }

  // 5. 都受同一人影響
  const sharedInfluencers = intersectInfluencers(architects);
  if (sharedInfluencers.length > 0) {
    commons.push(`都受 ${sharedInfluencers.join(" / ")} 影響`);
  }

  return commons;
}
```

### 差異維度

```typescript
function computeDifferences(architects: [A, A, A]) {
  return {
    eraVariance: standardDeviation(architects.map(a => a.birthYear)),
    movementOverlap: jaccardCoefficient(architects.map(a => a.movements)),
    geoDistance: avgGeoDistance(architects.map(a => a.nationality)),
    nationalitySet: uniqueNationalities(architects),
  };
}
```

## 響應式

### Mobile (380px)

- 3 個 slot 變成 vertical stack（垂直排列）
- 視覺區改為 vertical timeline / vertical bisector
- 外接圓改成 vertical 3 點 + 圓
- Compare Bar 改為底部 1 行精簡版

### Tablet (768px)

- 3 slot 並排但縮小
- 視覺區保持

## 狀態持久化

```typescript
// localStorage key: parti:compare
{
  ids: ["le_corbusier", "wright", "aalto"],
  lastUpdated: 1715570000000
}
```

- 加入 / 移除 → 自動更新
- URL query 同步：`/compare?ids=le_corbusier,wright,aalto`
- 進入 /compare 時、優先讀 URL > localStorage
- 7 天未動 → 自動清空

## 分享功能

頁面右上角「分享」按鈕：
- Copy URL 到剪貼簿
- 生成 OG image（含三人線稿肖像 + 圓圈）
- 預設社群文案：「我在 PARTI 比較了 柯比意 / 萊特 / Aalto」

## 不要做的

- ✘ 比較非建築師 entity（v1 限 architect、v2 可擴展）
- ✘ N=4-6 時還顯示「外接圓」（改用 Delaunay）
- ✘ N≥13 時用 Voronoi（改用 Force Graph）
- ✘ 動畫超過 5 秒（總時長 4 秒已經是上限）
- ✘ 自動推薦「下一個比較對象」（保持極簡、用戶主動）
- ✘ 比較結果評分 / 排名（不下價值判斷）

---

## 細節決策（已拍板）

### 決策 1：第 2 人 → 第 3 人的轉場

**選擇**：**中垂線淡出 → 重新繪製外接圓**（不做 morph）

理由：morph 計算複雜（中垂線變成圓弦數學）、淡出 + 重畫穩定且視覺乾淨。

實作：
```
Step 1: 中垂線 fade out 300ms
Step 2: 第 3 點 fly in 800ms
Step 3: 三點連線依序畫出
Step 4: 外接圓 path drawing 1200ms
```

### 決策 2：離散度權重

**維持原案**：時代軸 30% + 流派重疊 50% + 地理 20%

理由：建築學門慣例「流派 > 時代 > 地理」是合理權重、不調整。

如果使用者反饋「太偏流派」可後續調為 25/45/30。

### 決策 3：3 人後的「鎖定 / 替換」

**v1 不做 Lock 功能**。

替代做法：點 × 移除任一人 → 點 + 加入另一人。

理由：Lock UI 複雜（要加 lock icon、解 lock 流程、UX 學習成本高）、v1 用最簡操作。

v2 可考慮加 lock icon：點擊鎖定 → 移除其他 2 人時、該人保留。

### 決策 4：跨類型比較範圍

| 版本 | 允許比較 |
|---|---|
| **v1** | 只限 architect × architect × architect |
| v2 | 加入 building × building、movement × movement（同類比較） |
| v3 | 跨類比較（如 architect × building × school） |

URL schema 預留擴展：`/compare?type=architect&ids=...`

### 決策 5：OG 分享圖設計

**簡單版**（v2 上線時做）：

```
═══════════════════════════════════════════
[1200 × 630 px、黑底 #0F0F0F]

        ●           ← 三點朱紅
      ╱   ╲
     ╱  ◯  ╲        ← 外接圓（用實際 dispersion）
    ●───────●
                                    PARTI
   柯比意 · 萊特 · Aalto             ─────
   compare · 3 architects            ✦

═══════════════════════════════════════════
```

技術：
- 用 `@vercel/og` 動態生成
- 從 URL query `?ids=...` 讀人物
- Build 時不預生、runtime serverless 生成（cache 1 hour）
- 預設社群文案：「我在 PARTI 比較了 {人物名} ｜ PARTI · 一部建築圖鑑」
