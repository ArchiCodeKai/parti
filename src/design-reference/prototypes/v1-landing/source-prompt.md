# Source Prompt for v1-landing

## Date
2026-05-22

## Status
Codex 實作規格草稿，待 review 後進入正式 Next.js landing 開發。

## 使用情境

這份文件不是要求每次都產出靜態 `index.html`。目前 PARTI 已進入正式 Codex 開發，因此本文件主要作為：

- Codex 實作 landing 時的 source prompt。
- 對齊 `DESIGN_BRIEF.md`、landing page brief 與 MVP v1 的實作邊界。
- 必要時才轉成 Claude Design / 靜態 HTML 探索 prompt。

## 引用的 briefs
- `src/design-reference/CLAUDE_DESIGN_BRIEF.md`
- `src/design-reference/page-briefs/01-landing.md`
- `docs/02-MVP規劃/MVP-v1.md`
- `docs/04-頁面設計/landing-hero.md`
- `src/design-reference/prototypes/README.md`

## 設計目標

為 PARTI 建立第一版正式 Landing 可落地骨架：以現有 Next.js / React / Tailwind CSS 專案為主，不先額外建立靜態 HTML prototype，避免增加平行維護成本。

這一版只處理 Landing，不擴到 Architects、Buildings、Movements、Map、Cmd+K 或個人頁。

## 必須符合的頁面結構

1. Screen 1：Hero，100vh。
   - 主標題：「一 部 建 築 圖 鑑」。
   - 「築」與「圖」之間放入 scroll-driven pyramid 的初版視覺骨架。
   - 副標題與 scroll hint 使用 Hidden-until-Touched 行為。

2. Screen 2：四大入口，100vh。
   - 人物 / ARCHITECTS / 100+
   - 建築 / BUILDINGS / 600+
   - 運動 / MOVEMENTS / 20+
   - 地圖 / MAP / WORLD
   - 桌機為 2x2 grid，手機改為單欄。

3. Screen 3：策展宣言，100vh。
   - 核心文案：「我們用幾何原理本身，呈現建築知識的結構」。
   - 搭配三點定圓 Circumcircle 的靜態或輕量動畫骨架。

4. Screen 4：Random Picks。
   - 10 條精選詞條 list。
   - 每行包含編號、詞條名稱、副資訊。

5. Footer。
   - 極簡 PARTI wordmark、年份與基本連結。

## Codex 實作 Prompt

```text
請在 PARTI 專案中實作第一版正式 Landing 骨架。

請直接使用現有 Next.js / React / Tailwind CSS 架構，不要另外建立靜態 `index.html`，除非實作前需要做高風險視覺探索。

請先讀：
- README.md
- docs/02-MVP規劃/MVP-v1.md
- docs/04-頁面設計/landing-hero.md
- src/design-reference/CLAUDE_DESIGN_BRIEF.md
- src/design-reference/page-briefs/01-landing.md
- src/design-reference/design-system/theme.css
- src/app/page.tsx
- src/components/landing/PyramidHero.tsx

實作範圍：
1. 只處理 `/` landing。
2. 保留並整合既有 `PyramidHero`，不要重寫成無關的新 hero。
3. 補齊 Screen 2 四大入口、Screen 3 策展宣言、Screen 4 Random Picks、Footer。
4. 若需要拆元件，放在 `src/components/landing/`，命名要清楚且貼近頁面結構。
5. 使用既有 CSS variables / design token，不要在元件內寫死 hex。
6. 不新增其他頁面、不碰資料模型、不做 Cmd+K、不做 promoted prototype。

視覺規則：
1. 視覺哲學是 Glass Editorial · Hidden-until-Touched。
2. 配色必須使用 CSS variables。
3. Typography 必須使用 Inter Tight 200 + PingFang TC；不要使用 Cormorant Garamond、Noto Serif TC 或 Source Han Serif TC。
4. 整體背景使用 `--bg-page: #FCFBF8`，不要純白、不要 gradient background、不要 paper grain。
5. 完全不要靜態角落裝飾、紅圓斜線、灰青三角或構成主義 motif。
6. 朱紅 `--accent-red` 全頁使用率必須克制，預設畫面冷靜，互動後才出現重點色。
7. Landing 必須是 4 屏 vertical scroll：Hero、四大入口、策展宣言、Random Picks，加上極簡 Footer。
8. Hero 主標題為「一 部 建 築 圖 鑑」，字重 200，字級用 `clamp(72px, 11vw, 180px)`，letter-spacing 0.02em。
9. Hero 的「築」與「圖」之間要有 scroll-driven pyramid 的可落地初版：初始隱藏，scroll 後出現朱紅三角形，再形成像素金字塔線稿。若純 CSS 無法完整可逆，請先做可理解的 CSS scroll / sticky prototype，不要引入大型 JS framework。
10. 副標題、scroll hint、卡片副資訊採 Hidden-until-Touched：載入時短暫 peek，之後淡出，hover 或 focus 時顯示。
11. Screen 2 四大入口使用 2x2 grid，每格包含中文標題、英文標題、數量與極淡幾何 motif。hover 時邊框變朱紅、微 scale，但不要誇張陰影。
12. Screen 3 使用三點定圓 Circumcircle 幾何語言，不要照片、不要 AI 圖、不要 stock image。
13. Screen 4 Random Picks 使用 editorial list，不做卡片牆。
14. 必須支援 desktop 1440、tablet 768、mobile 380，文字不可溢出容器。
15. 完成後跑 type-check / lint / build 中可行的驗證，並用本機瀏覽器檢查 desktop 與 mobile。
```

## Optional Claude Design / Static HTML Prompt

只有在正式 React 實作前需要快速探索視覺方向時，才使用這段。

```text
我要為 PARTI（一部建築圖鑑）探索 Landing 視覺方向。

請產出一個可直接本機打開的純 HTML 檔案，所有 CSS 寫在同一個 HTML 的 <style> 中，不要產出 React component、不要使用外部 build tool、不要擴到其他頁面。

此 HTML 只作為視覺探索，不是正式開發 source of truth。正式實作會回到 Next.js / React。

請遵守 Codex 實作 Prompt 中的所有視覺規則與頁面結構。
```

## 迭代狀態

- Round 1：文件 review。
- Round 2：正式 Next.js landing 骨架。
- Round 3：視覺與互動微調。

## 不做項目

- 不建立 `index.html` 作為預設流程。
- 不新增 screenshots 佔位資料夾。
- 不建立 `promoted/landing`，除非後續真的採用靜態 prototype 流程。
- 不把 prototype HTML 直接搬進 React。
- 不擴到其他頁面。

## Review Gate

進入實作前確認：

- [ ] 是否仍以正式 Next.js 開發為主？
- [ ] 是否接受不產出 `index.html`？
- [ ] 是否接受先不建立 screenshots / promoted？
- [ ] 是否確認這輪只做 landing？
