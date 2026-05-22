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

## 範例紀錄（將來實際填入）

### v1-landing — TBD（待 Claude Design 第一次產出後填入）

**Base**: 第一次生成
**Brief**:
- `CLAUDE_DESIGN_BRIEF.md`
- `page-briefs/01-landing.md`

**Variant**: 預設

**Changes**:
- 初版 Landing 頁、4 屏 vertical scroll
- Hero 大字 + 構成主義 motif
- 4 大入口 2×2 grid
- 策展宣言屏含三點定圓動畫
- 隨機 10 條精選 list

**Issues**:
- 待填入

**Decision**: 待填入

**Files**:
- `v1-landing/index.html`
- `v1-landing/design-system.md`
- `v1-landing/source-prompt.md`
- `v1-landing/screenshots/desktop-1440.png`
- `v1-landing/screenshots/tablet-768.png`
- `v1-landing/screenshots/mobile-380.png`
- `v1-landing/notes.md`

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

**版本總數**：0
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
