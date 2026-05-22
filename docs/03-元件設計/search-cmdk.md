# Cmd+K 命令面板設計

## 設計目的

最快速跳轉到任意條目。Awwwards 評審現在很吃這個。

## 觸發方式

| 方式 | 平台 |
|---|---|
| 鍵盤 `⌘ K` | macOS |
| 鍵盤 `Ctrl K` | Windows / Linux |
| Header 搜尋圖示點擊 | 所有平台 |
| `/` 鍵 | 所有平台（Vercel-style） |

## 視覺

```
┌──────────────────────────────────────────────┐
│                                              │
│   ⌘ K                                        │
│                                              │
│   ┌────────────────────────────────────┐     │
│   │  搜尋人物、建築、流派...               │     │
│   └────────────────────────────────────┘     │
│                                              │
│   ─── 結果 ───                                │
│                                              │
│   人物                                        │
│   ◦ Le Corbusier 柯比意                       │
│   ◦ Louis Kahn 路易斯·康                       │
│                                              │
│   建築                                        │
│   ◦ 廊香教堂                                   │
│                                              │
│   流派                                        │
│   ◦ Brutalism 粗獷主義                         │
│                                              │
│   ↑ ↓ 選擇 · ↵ 跳轉 · ESC 關閉                  │
│                                              │
└──────────────────────────────────────────────┘
```

- 寬度：640px（桌機）/ 全寬（手機）
- 背景：米白 #F4EFE6 + 黑邊框 1px
- 浮在頁面正中、外圍黑色半透明 overlay
- 開啟動畫：fade + scale 0.95 → 1（200ms）

## 鍵盤導航

- `↑ / ↓`：上下選擇
- `↵ Enter`：跳轉到選中項
- `ESC`：關閉
- `Tab`：切換結果類型（人物 / 建築 / 流派...）

## 搜尋邏輯（Fuse.js）

```typescript
const fuse = new Fuse(allEntities, {
  keys: [
    { name: "name.zh", weight: 2 },
    { name: "name.en", weight: 2 },
    { name: "name.native", weight: 1.5 },
    { name: "tags", weight: 1 },
    { name: "bodyText", weight: 0.5 },
  ],
  threshold: 0.4,
  includeScore: true,
});
```

- 中英日韓全部支援
- 模糊匹配（typo tolerance）
- 結果按 score + entity 重要度排序

## 結果分組

按 EntityType 分組顯示、優先順序：
1. 人物
2. 建築
3. 流派
4. 著作
5. 學派
6. 事務所
7. 展覽 / 獎項

每組最多 5 個結果、超過顯示「在 /explore 看更多」。

## 索引建構

Build-time 生成 `public/search-index.json`：
- 包含所有 entity 的 id / name / type / tags
- 不含 bodyText（太大、首載慢）
- 用戶搜尋時、bodyText 用 lazy load

## 不要做的

- ✘ 顯示縮圖（純文字搜尋面板才快）
- ✘ 搜尋歷史（v1 不做、v2 考慮）
- ✘ 推薦 / autocomplete（保持極簡）
