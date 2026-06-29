# Prototypes Changelog

> 所有 Claude Design 產出版本的變更紀錄。
> 規則見 `README.md`。

---

## 格式說明

每個版本一個 section、按時間倒序排列（**最新在上**）：

```markdown
## v{N}-{slug} — YYYY-MM-DD
**Base**: 從哪版迭代來 / 第一版
**Brief**: 引用哪些 brief
**Variant**: 變體說明（如有）
**Changes**: 主要變化 bullet list
**Issues**: 發現的問題 bullet list
**Decision**: 採納為正式版 / 進下版 / 廢棄
```

---

## 版本紀錄

### v1-landing — 2026-05-22

**Base**: 第一版 Landing Codex 實作文件骨架
**Brief**:
- `CLAUDE_DESIGN_BRIEF.md`
- `page-briefs/01-landing.md`
- `docs/02-MVP規劃/MVP-v1.md`
- `docs/04-頁面設計/landing-hero.md`

**Variant**: Codex 開發準備版，靜態 HTML prototype 改為 optional

**Changes**:
- 建立 `v1-landing/` 版本資料夾。
- 補 `source-prompt.md`，作為 Codex 正式實作的第一版輸入。
- 補 `design-system.md`，整理 v1 landing 需要遵守的 token、排版、layout、motion 與 hard don'ts。
- 補 `notes.md`，列出 review checklist 與下一輪實作暫停點。
- 補 `CLAUDE_DESIGN_BRIEF.md` 相容入口，避免既有 brief 引用找不到檔案。
- 將 `index.html` 與 screenshots 流程降級為 optional，避免在正式開發期間增加平行 prototype 維護成本。
- 補齊正式 Next.js landing 四屏結構：Hero、四大入口、策展宣言、Random Picks、Footer。

**Issues**:
- Buildings / Movements / Map 尚無 route，因此首頁先保留靜態入口 tile，不做 404 連結。
- Random Picks 的刷新按鈕尚未接資料邏輯。
- 尚未建立 `promoted/landing`，因目前不走靜態 prototype 採用流程。

**Decision**: 進入正式 Next.js landing 骨架，待視覺 review 後微調

**Files**:
- `v1-landing/design-system.md`
- `v1-landing/source-prompt.md`
- `v1-landing/notes.md`
- `src/app/page.tsx`
- `src/components/landing/LandingSections.tsx`
- `src/components/landing/PyramidHero.tsx`
- `src/app/globals.css`
- `src/app/themes.css`

---

## 待產出版本（plan）

按 `docs/02-MVP規劃/MVP-v1.md` 的開發順序：

| 規劃版本 | 對應頁面 | 引用 brief | 預估時間 |
|---|---|---|---|
| v1-landing | `/` | 01-landing | 第 1 週 |
| v1-architects-mosaic | `/architects` | 02-architects-mosaic | 第 2 週 |
| v1-individual-le-corbusier | `/architects/le_corbusier` | 03-individual-page | 第 3 週 |
| v1-buildings-timeline | `/buildings` | 04-buildings-timeline（待寫） | 第 4 週 |
| v1-movements-flow | `/movements` | 05-movements-flow（待寫） | 第 5 週 |
| v1-map-world | `/map` | 06-map-world（待寫） | 第 6 週 |
| v1-cmdk-dialog | Cmd+K | 07-cmdk（待寫） | 第 7 週 |

---

## 統計

**版本總數**：1
**正式採用**：0
**廢棄版本**：0

（隨時更新）

---

## Promoted 版本（當前正式參考）

```
promoted/
├── landing/         → 待產出
├── architects/      → 待產出
├── individual/      → 待產出
├── buildings/       → 待產出
├── movements/       → 待產出
├── map/             → 待產出
└── cmdk/            → 待產出
```

每個 promoted 連結到 `prototypes/v{N}-{slug}/`、實作時對照這個寫。

---

## 重要規則 reminder

- 每次 Claude Design 產出 = 一個獨立資料夾、不可覆寫
- 必須截 3 尺寸截圖（desktop / tablet / mobile）
- 必須寫 source-prompt.md（紀錄 prompt + brief 引用）
- 必須寫 notes.md（review 決策）
- 必須更新本 CHANGELOG.md

不寫紀錄 = 下次重複犯同樣錯 = 浪費 token。
