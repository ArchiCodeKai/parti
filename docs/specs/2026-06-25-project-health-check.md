# PARTI 專案健檢報告

> 日期:2026-06-25
> 範圍:全專案文件 / 設計規範 / 實作程式碼掃描
> 驗證:`type-check` / `lint` / `build` 三者全綠

---

## 一、總體完成度:約 25–30%(對標 MVP v1)

骨架與最難的互動原型超前,但「廣度(4 大分類缺 3)」與「內容(約 10%)」嚴重落後。

| 區塊 | 完成度 | 狀態 |
|---|---|---|
| 基礎建設(Next 15 / TS strict / build / token) | ~90% | ✅ |
| 設計系統 CSS(themes.css / glass / 字體 / 圓角) | ~85% | ✅ |
| Landing(PyramidHero + 4 入口材質組裝 + manifesto + random picks) | ~70% | 🟡 進階待 QA |
| Architects 馬賽克 | ~55% | 🟡 能跑、資料薄 |
| Architect 個人頁 | ~50% | 🟡 related/代表作/pullquote 是 stub |
| Compare 比較(hero piece) | ~55% | 🟡 數學完整、視覺簡化 |
| Cmd+K 搜尋 | ~60% | 🟡 只搜建築師 |
| Buildings 頁 | 0% | ❌ |
| Movements 頁 | 0% | ❌ |
| Map 世界地圖 | 0% | ❌ |
| Explore 進階篩選 | ~15% | ❌ 只有 era filter |
| 內容資料 | ~10% | ❌ 29/200 建築師、buildings/movements 資料全空 |
| v2 功能(書籤/OG/暗色/i18n/PWA) | 0% | ❌ |

**已建路由(5 條,全部能 build)**:`/` · `/architects` · `/architects/[slug]` · `/compare` · `/_not-found`

---

## 二、已完成 vs 未完成

### 已完成且品質不錯
- Landing GSAP ScrollTrigger + Lenis 四章節材質組裝(`src/components/landing/LandingSections.tsx`)
- Fallingwater Three.js 卡片模型(`src/components/landing/FallingwaterModelCanvas.tsx`)
- Compare 離散度 / 共同點計算引擎(`src/lib/compare/dispersion.ts`,Jaccard + 標準差)
- Cmd+K 全站搜尋(`src/components/layout/CmdKDialog.tsx`,Fuse.js + 鍵盤導航)
- Hidden-until-Touched hook + 個人頁 tag bar / related sidebar 摺疊
- CustomCursor(正確偵測觸控裝置關閉)

### 沒做完 / 未開始
- Buildings、Movements、Map 三大分類(landing 入口標 `LATER`,點不進去)
- 全站 Header / Nav / Compare Bar(規格已定義,未實作)
- `src/content/` MDX 管線(資料夾空,實際硬編在 `lib/data/architects.ts`)
- buildings / movements / books 內容資料(型別有、資料無)
- N→幾何的「真實」幾何(Delaunay/Voronoi/Force 都是簡化示意)

---

## 三、Bug 與缺失清單

### 🔴 P0 — 影響體驗 / 正確性
1. **沒有任何全站導覽**。子頁都留 `120px` 頂部白給不存在的 header。後果:子頁無法回首頁、Cmd+K 隱形、加入比較無回饋。(`src/app/architects/page.tsx`、`compare/page.tsx`、`architects/[slug]/page.tsx`)
2. **`Math.random()` 寫在 render**(`src/app/compare/page.tsx:537`)。Force-graph 連線每次重繪都變,有 SSR hydration mismatch 風險。
3. **卡片無鍵盤可及性**(`src/components/cards/ArchitectCard.tsx:78`)。`motion.article` 用 `onClick` 但無 `role`/`tabIndex`/Enter 處理。

### 🟡 P1 — 明顯但不致命
4. **importance 資料膨脹**:29 位裡 17 位 importance 5(L 卡)、10 位 M、2 位 S、0 位 XS → 馬賽克被巨型卡淹沒。
5. **個人頁 stub 內容**:代表作直接顯示 building id 文字、Pullquote 拿 `tags[0]` 當引言、related 只用同流派前 5(未用加權圖譜)。
6. **個人頁 useEffect 依賴 `[sidebarVisible]`**(`architects/[slug]/page.tsx:75`):sidebar 展開時 peek 計時器重跑 → tag bar 二次閃現。
7. **「三點定圓」非真外接圓**:三點在 r=120 圓上,畫的圓是另一半徑,無幾何關係。
8. **硬編色值違反規範**(`architects/[slug]/page.tsx:15-32` 含 `#fff`/`#444`)。

### 🟢 P2 — 體質 / 一致性
9. **規範漂移(重要)**:`.ai-context/restrictions.md` 禁止 GSAP/Three.js,但兩者現為核心依賴且 landing 在用。`docs/specs/`(05-28、06-18)已推翻舊禁令,但禁令文件未更新。
10. **inline style vs CSS class 不一致**:landing 用 class,子頁用大量 inline style。
11. **兩份設計系統並存**:`src/app/themes.css`(生效)vs `src/design-reference/design-system/theme.css`(參考)易漂移。
12. **個人頁 `"use client"` 無 `generateStaticParams`** → build 標記 ƒ 動態,可靜態化利 SEO。

---

## 四、奇怪的 UI/UX
- 進得去出不來(無 header,子頁都是死路)
- Cmd+K 是隱藏功能(無視覺 affordance)
- 「加入比較」無回饋迴路(缺全站 Compare Bar)
- 馬賽克全是大卡(見 P1#4)
- landing 四入口三個是死的(`LATER`),對訪客觀感差
- 個人頁「代表作」顯示 slug 文字,像未完成佔位

---

## 五、可擴充方向(依價值排序)
1. 補上全站殼層:Header + Compare Bar + 頁面轉場
2. 打通第二條分類:Buildings 或 Movements 擇一做完
3. 內容生產線:接 MDX 管線(或定案用 lib/data),批量生到 v1 200 條目
4. N→幾何升級:Delaunay/Voronoi 從示意換真實(`d3-delaunay` 已在依賴)
5. 可及性 + SEO:卡片鍵盤化、個人頁靜態化
6. v2 輕功能:書籤、Surprise me、OG 分享卡

---

## 六、建議接手路線
- **第 0 步(對齊)**:更新 restrictions.md 對齊現況,確立 inline→class、themes.css 單一真相兩條體質規則
- **第 1 步(殼層)**:Header + 全站 Compare Bar + 修 P0 三個 bug ← 已選定為第一個衝刺
- **第 2 步(廣度)**:Movements 或 Buildings 打通第二條分類
- **第 3 步(深度)**:內容管線 + 批量生成 + N→幾何升級

---

## 附:技術棧現況
Next.js 15 App Router · React 19 · TypeScript strict · Tailwind 4 · Framer Motion 12 · **GSAP 3**(landing)· **Three.js**(Fallingwater)· Lenis · Fuse.js · Zustand · d3-delaunay · mapbox-gl(未用)· react-force-graph-2d(未用)

> GSAP 與 Three.js 已實際採用,與舊版 `restrictions.md` 禁令衝突,需對齊文件。
