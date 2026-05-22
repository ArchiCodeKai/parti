# MVP v2 規劃（草稿）

## 前提條件

MVP v1 完整 ship + 投稿 Awwwards 後才開始。

## 核心新功能

### Compare 比較工具（hero piece 王牌） ⭐ 最優先

PARTI 的 hero piece 核心互動、規格見 `docs/04-頁面設計/compare-tool.md`。

- 路由：`/compare?ids=...`
- 任選 1–3 位建築師、視覺化關係
  - 1 人：時間軸高亮
  - 2 人：中垂線 + 對立特徵
  - 3 人：外接圓 + 共同點（圓大小 / 彩度 / 透明度 = 離散度）
- 入口（4 處）：Header / 卡片 ⊕ icon / 個人頁按鈕 / 底部 CompareBar
- URL 同步 + localStorage persist + 可分享連結
- 工時：60h（含圖學計算、動畫、響應式）

### 內容擴充（v1 → v2）

| 類型 | v1 | v2 | 新增 |
|---|---|---|---|
| Architect | 30 | 200+ | +170（非 Pritzker、台日中等） |
| Building | 90 | 600+ | +510 |
| Theorist | 5 | 20 | +15 |
| 其他類型 | 50 | 100+ | +50 |

### 書籤 / 收藏（localStorage）

- 任一條目右上角加 ♡ 按鈕
- 收藏資料存 `localStorage["parti:bookmarks"]`
- `/bookmarks` 頁顯示已收藏條目
- 工時：4h

### OG image 分享卡

- 每條目自動生成分享圖（1200 × 630）
- 使用 `@vercel/og` 動態生成
- 設計：黑底 / 朱紅標題 / 條目名 + 副標
- 工時：6h

### Surprise me（隨機跳）

- Header 加骰子 icon
- 點擊隨機跳到任一條目
- 工時：1h

### 黑暗模式

- 系統偏好自動切換
- Header 加切換按鈕
- 工時：4h

### 閱讀進度

- 記錄看過的條目（localStorage）
- `/about` 頁顯示「你看過 X / 200 條」
- 進度條視覺
- 工時：3h

## v2 工時總估

| 項目 | 工時 |
|---|---|
| **Compare 比較工具** ⭐ | **60h** |
| 內容擴充 170+ Architect | AI 自動 + 校對 50h |
| 內容擴充其他類型 | 30h |
| 書籤 / 收藏 | 4h |
| OG image | 6h |
| Surprise me | 1h |
| 黑暗模式 | 4h |
| 閱讀進度 | 3h |
| QA + Polish | 20h |
| **合計** | **~180h** |

## v3 預計功能

- 中英對照切換（next-intl）
- 用戶評論（人工審核）
- 自訂個人路徑（curated tour）
- Compare 擴展（比較建築 / 流派、不只人物）
