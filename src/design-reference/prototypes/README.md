# prototypes/ 版本管理規則

## 用途

存放 Claude Design 產出的所有原型版本。**每次 Claude Design 生成都是一個獨立版本、不可覆寫**。

這個資料夾是 PARTI 視覺設計的「**迭代博物館**」 — 任何版本都可回溯、任何決策都有紀錄。

---

## 資料夾結構

```
prototypes/
├── README.md                       ← 本檔案（規則）
├── CHANGELOG.md                    ← 全部版本變更紀錄
│
├── v{N}-{slug}/                    ← 每次 Claude Design 產出一個資料夾
│   ├── index.html                  ← Claude Design 產出的主檔案
│   ├── design-system.md            ← Claude Design 產出的 Design System md
│   ├── source-prompt.md            ← 我餵的 prompt + 引用的 briefs
│   ├── screenshots/                ← 三尺寸截圖
│   │   ├── desktop-1440.png
│   │   ├── tablet-768.png
│   │   └── mobile-380.png
│   └── notes.md                    ← 我的 review notes（採納 / 修改 / 廢棄）
│
└── promoted/                       ← 已正式採用的版本（symlink 或 copy）
    └── landing/                    ← 目前正式版的 Landing
```

---

## 版本命名規則

格式：`v{N}-{slug}-{type}`

| 欄位 | 範例 | 說明 |
|---|---|---|
| `v{N}` | v1 / v2 / v1.1 | 主版本號、小修補用 `.1` |
| `{slug}` | landing / architects / individual / movements / map | 頁面類型 |
| `{type}` | 可選後綴 | 變體說明（如 dark / mobile） |

### 範例

- `v1-landing/`                       第一版 Landing
- `v1.1-landing-typography-refined/`  第一版 Landing 微調字型
- `v2-landing/`                       Landing 整頁重做
- `v1-architects-mosaic/`             第一版人物馬賽克
- `v1-individual-le-corbusier/`       第一版個人頁（柯比意示範）

### 不能用的命名

- ✘ `final` / `latest` / `new`（無時序、易混亂）
- ✘ 中文資料夾名（terminal 兼容性差）
- ✘ 空格（用 `-` 替代）

---

## 每次 Claude Design 產出後必做 6 步

### Step 1：下載 HTML
從 Claude Design 介面下載產出的 HTML 檔案。

### Step 2：建立版本資料夾
```bash
mkdir -p prototypes/v{N}-{slug}/screenshots
```

### Step 3：放入 index.html
把下載的 HTML 重命名為 `index.html`、放進該資料夾。

### Step 4：截圖（必做、3 尺寸）
用 Chrome DevTools / Responsively App 截 3 個尺寸：

| 裝置 | 寬度 | 檔案 |
|---|---|---|
| Desktop | 1440px | `screenshots/desktop-1440.png` |
| Tablet | 768px | `screenshots/tablet-768.png` |
| Mobile | 380px | `screenshots/mobile-380.png` |

### Step 5：寫 source-prompt.md
紀錄這次用的 prompt + 引用的 briefs。

### Step 6：寫 notes.md
review 後的決策。

---

## Codex 正式開發模式例外

如果專案已經進入正式 Codex / Next.js 開發，且不需要 Claude Design 產出獨立靜態稿，則不必為了形式建立 `index.html`、`screenshots/` 或 `promoted/`。

此時版本資料夾可作為實作規格與 handoff 紀錄，最小結構為：

```text
v{N}-{slug}/
├── source-prompt.md
├── design-system.md
└── notes.md
```

只有在需要高風險視覺探索、外部 review、或保留 Claude Design 產物時，才回到完整 prototype 流程。

---

## source-prompt.md 模板

每個版本資料夾都要寫一份、記錄「**這版本怎麼生出來的**」：

```markdown
# Source Prompt for v{N}-{slug}

## Date
2026-05-13

## Claude Design 模型
Opus 4.7 / Sonnet 4.6

## 引用的 briefs
- CLAUDE_DESIGN_BRIEF.md（master）
- page-briefs/01-landing.md

## Prompt（原文）

[把實際在 Claude Design 對話框打的 prompt 完整貼進來]

## 迭代輪數
3 輪
- Round 1: 確認方向、列 5 個錯誤
- Round 2: 生成初版
- Round 3: Edit tool 微調字距

## Token 消耗（如可見）
約 X% 週限額

## 備註
- 第一輪 Claude Design 把副標題字距搞錯、第二輪修正
- Tweaks 面板換了一個變體
```

---

## notes.md 模板

每個版本資料夾的「review 報告」：

```markdown
# Review Notes for v{N}-{slug}

## Date
2026-05-13

## 採納決策
- [ ] 採納為正式版（搬到 promoted/）
- [x] 採納部分元素、進下一輪
- [ ] 廢棄

## 做得好的地方
- Hero 大字字距完美
- 構成主義 motif 比例對
- 配色精準遵守 brief

## 需要修改
- [ ] 副標題太大、應縮小
- [ ] Scroll hint 位置偏低
- [ ] 4 大入口卡片邊框太粗

## 下一輪要做的
- 進 v1.1、用 Edit tool 直接點擊修改副標題
- 不要重新生成（省 token）

## 跟 brief 的偏離
- 沒做角落 motif（Claude Design 自己省略）
- Mono 字型用了 Roboto Mono 而非 JetBrains Mono
```

---

## CHANGELOG 更新責任

每次新增 / 修改 / 廢棄版本、**必須更新 CHANGELOG.md**。

格式：

```markdown
## v{N}-{slug} — YYYY-MM-DD
**Base**: 從哪版迭代來的
**Brief**: 引用哪些 brief
**Changes**: 主要變化
**Issues**: 發現的問題
**Decision**: 採納 / 進下版 / 廢棄
```

---

## promoted/ 資料夾規則

當某版本經過 review、**正式採用到開發**、就用 symlink 或 copy 到 `promoted/`：

```bash
# 假設 v1.2-landing-final 是正式版
ln -s ../v1.2-landing-final promoted/landing

# 或 copy（如果該版會被後續修改）
cp -r v1.2-landing-final promoted/landing
```

`promoted/` 內的版本是「**當前正式參考**」、實作時對照這個寫。

舊版不刪、保留所有歷史。

---

## 跟工程實作的對接

當 promoted/ 內某版本被選為實作目標：

1. 工程師讀 `promoted/{page}/index.html`
2. 把 CSS variables / 字型 / Tailwind class 抽出來
3. 用 React component 重新組織（不要直接搬 HTML）
4. 實作完成後、在 `docs/03-元件設計/` 補對應元件規格

---

## 不要做的

- ✘ 覆寫舊版本（每次都是新資料夾）
- ✘ 把 Claude Design 產出直接放專案 `src/`（先進 prototypes/）
- ✘ 不寫 source-prompt.md（之後不知道怎麼 reproduce）
- ✘ 沒截圖就 commit（CHANGELOG 是文字、screenshots 是證據）
- ✘ 跳號（v1 後直接 v3、應該寫 v2 即使失敗的版本）

---

## 快速指令

每次新版本的 setup：

```bash
# 在 parti/ 根目錄執行
VERSION="v1-landing"
mkdir -p src/design-reference/prototypes/$VERSION/screenshots
cd src/design-reference/prototypes/$VERSION
touch source-prompt.md notes.md
echo "把 Claude Design 產出的 index.html 放這" > placeholder.txt
```

---

## 為什麼這麼麻煩

因為 Claude Design **燒 token**、每次生成都很貴。

紀律的版本管理 = 不會重複犯同樣錯誤 = 省下大筆 token = 省下你的 200 USD/月。

> 「讓 Claude Design 朝錯方向跑十分鐘、是最貴的失誤。」
> 紀律的 prototypes/ 就是防止這個。
