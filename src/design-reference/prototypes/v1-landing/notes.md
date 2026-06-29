# Review Notes for v1-landing

## Date
2026-05-22

## Status
Codex 實作文件骨架已建立，Round 2 已補正式 Next.js landing 四屏結構。靜態 HTML prototype 不列為預設產物。

## 採納決策

- [ ] 採納為正式版（搬到 `promoted/landing`）
- [ ] 採納部分元素、進下一輪
- [ ] 廢棄
- [x] 文件待 review，尚未進入正式 landing 實作

## 本輪已完成

- [x] 建立 `v1-landing/` 版本資料夾。
- [x] 撰寫 `source-prompt.md` 作為 Codex 實作 prompt。
- [x] 撰寫 `design-system.md` 作為 landing 實作規格。
- [x] 撰寫本 review notes。
- [x] 更新 prototypes changelog。
- [x] 補齊正式首頁的 Hero、四大入口、策展宣言、Random Picks、Footer。
- [x] 避免將尚未建立的 Buildings / Movements / Map 做成 404 連結。

## 本輪刻意不做

- [x] 不產出 `index.html`。
- [x] 不截圖。
- [x] 不建立 `promoted/landing`。
- [x] 不修改 Next.js app 首頁。
- [x] 不擴到 Architects、Buildings、Movements、Map 或 Cmd+K。

## Review Checklist

### Scope

- [ ] 是否確認這版只做 Landing？
- [ ] 是否確認以正式 Next.js / React 開發為主？
- [ ] 是否確認 `index.html` 僅作為 optional 視覺探索，不列為預設產物？
- [ ] 是否確認暫不建立 `promoted/landing`？

### Prompt

- [ ] `source-prompt.md` 是否足以直接交給 Codex 繼續實作？
- [ ] 是否需要把 prompt 改得更強硬，避免偏離到其他頁面？
- [ ] 是否需要保留 optional Claude Design / static HTML prompt？

### Visual Direction

- [ ] Glass Editorial 方向是否正確？
- [ ] Hidden-until-Touched 是否保留為核心 UX？
- [ ] Scroll-driven pyramid 是否仍是 Hero 的核心 wow moment？

### Content

- [ ] 「一 部 建 築 圖 鑑」是否保留空格字距？
- [ ] Random Picks 的 10 條示範內容是否需要先指定？
- [ ] Footer 連結是否需要先定案？

## 下一輪要做

正式實作已進入第一版骨架。下一輪建議：

- 用瀏覽器細調 desktop / mobile 的視覺比例。
- 決定 Buildings / Movements / Map 未完成入口要保持靜態、加 coming-soon 狀態，或等頁面建立後再開連結。
- 補齊 `useHiddenUntilTouched` 的既有 lint warning。
- 補齊 `notes.md` 的 review 結果。

## 跟 brief 的偏離

- Buildings / Movements / Map 在 MVP 文件中是入口，但目前尚無對應 route，因此第一版骨架先不做真連結，避免點擊進 404。
- Random Picks 的刷新按鈕目前是視覺骨架，尚未接隨機資料邏輯。
