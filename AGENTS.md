# PARTI Codex 操作規則

## 語言與回答

- 一律使用繁體中文（台灣用語）回答。
- 技術名詞首次出現時，必要時以「中文（English）」補充英文原文。
- 避免中國用語，例如「代碼、視頻、屏幕、默認、軟件、文件夾、菜單、登錄」。
- `bug`、`debug`、`commit`、`deploy`、`pull request`、`merge`、`build` 維持英文原文。

## Animation Skill 使用規則

在這個 repo 內，只要任務涉及 GSAP、ScrollTrigger、Lenis、scroll-linked animation、landing 動畫、pinned section、timeline、動畫效能或 React 動畫 cleanup，Codex 必須優先使用已安裝的官方 GSAP skills：

- `gsap-react`
- `gsap-scrolltrigger`
- `gsap-timeline`
- `gsap-core`
- `gsap-performance`
- 視需要再使用 `gsap-utils`、`gsap-plugins`、`gsap-frameworks`

官方 GSAP skills 負責「GSAP API 與實作模式正確性」；本檔負責「PARTI 專案語境與產品規則」。

只要任務涉及 Framer Motion、Motion component、variants、gesture、hover/tap、layout animation、`AnimatePresence`、`useMotionValue`、`useReducedMotion` 或 SVG motion element，Codex 必須使用已安裝的 `motion-framer` skill。

## PARTI Motion 專案規則

- 專案技術棧是 Next.js、React、TypeScript、Tailwind CSS。
- PARTI 目前 runtime dependency 是 `framer-motion`，不是新版 `motion` 套件；不要自動把 import 改成 `motion/react`。
- Framer Motion 負責 component-level animation：卡片 hover/tap、SVG path/polygon reveal、`useMotionValue` 狀態驅動、`useReducedMotion`、`AnimatePresence` 與 layout animation。
- PARTI 已使用 `gsap`、`ScrollTrigger`、`Lenis` 實作 landing 的 scroll-linked deck。
- 目前 runtime dependency 有 `gsap`，但沒有 `@gsap/react`；除非任務明確要新增 React GSAP abstraction，否則沿用現有 `useEffect` + dynamic import + `gsap.context()` 模式。
- 不要為了動畫新增平行的 `index.html` prototype；正式實作優先改 Next.js 既有檔案。
- scroll-linked 區塊必須以 scroll position 作為 source of truth；chapter nav 只能導向 timeline 位置，不應只切 local state。
- 不要用 Framer Motion 重寫既有 GSAP / Lenis / ScrollTrigger landing deck，除非任務明確要求遷移並先比較 trade-off。
- landing pinned section 不能長時間畫面不變；幾乎每次滾動都應該有可見的標題、卡片、材質或構圖變化。
- GSAP / Lenis 應在 client component 中動態載入，避免增加初始 bundle。
- React component unmount 時必須 cleanup：`gsap.context().revert()`、`ScrollTrigger`、`gsap.ticker`、`Lenis` listener 與 instance。
- 必須尊重 `prefers-reduced-motion`，減少動畫時提供靜態可讀狀態。
- 優先動畫化 transform / opacity / CSS variables；避免在 scroll scrub 中頻繁動畫化 layout-heavy properties。
- 視覺語言維持 PARTI 的 Glass Editorial、Hidden-until-Touched、建築幾何與材質分層，不要套用 HUD、SaaS dashboard 或過度遊戲化動效。

## 驗證

完成 motion / GSAP 相關修改後，至少執行：

```bash
npm run type-check
npm run build
```

若啟動 dev server，使用 `npm run dev`，預設 port 是 `3737`。若該 port 被佔用，再使用相鄰 port，並在回覆中明確告知。
