# PARTI

> 一部建築圖鑑 —— 用幾何本身呈現建築知識的結構,視覺驅動的線上百科。

[English](./README.md)

---

## 定位

PARTI(建築學術語:設計初始概念)不是 Wikipedia、不是 ArchDaily、也不是 ChatGPT 包裝。

它是**前建築人視角的策展型百科** —— 用點、線、面、數學原理 + 絲滑動畫,把 200+ 位建築師、建築物、流派、書籍串成可探索的網絡,而不是一份扁平的條目清單。

## 核心特性

- **4 大主入口** —— 人物 · 建築 · 運動 · 地圖
- **3 個篩選器** —— 時代 · 學派 · 事務所
- **多視角總覽** —— 馬賽克牆(人物)/ 分區年表(建築)/ 流動敘事(運動)/ 世界地圖(地理)
- **雙向關聯網絡** —— 每個詞條右側列出相關詞條,即使內文未提及
- **三層查詢** —— `Cmd+K` 命令面板 · Header 搜尋 · `/explore` 進階篩選
- **極簡視覺系統** —— 構成主義 + 等距插畫 + 朱紅 / 黑 / 米白配色
- **Hidden-until-Touched** 互動哲學 —— UI 預設靜止,有意圖才出現

## 技術棧

| 層級 | 選擇 |
|---|---|
| 框架 | Next.js 15 · React 19 · TypeScript |
| 樣式 | Tailwind CSS 4 |
| 動效 | Framer Motion · Lenis |
| 視覺化 | D3 Delaunay · react-force-graph-2d · Mapbox GL |
| 狀態 | Zustand |
| 搜尋 | Fuse.js |

## 專案結構

```
docs/                    設計文件(繁體中文)
  01-專案規劃/             概覽、功能、技術、資料模型
  02-MVP規劃/              版本拆分
  03-元件設計/             Card、RelatedList、CmdK、Animation
  04-頁面設計/             Landing + 4 大分類頁
  05-內容架構/             Entity schema、字數規範、關聯圖

src/
  app/                   Next.js App Router
  components/            UI 元件
  content/               策展內容資料
  design-reference/      設計系統權威來源
  hooks/                 自定義 React hooks
  lib/                   工具函式
  store/                 Zustand stores
  types/                 TypeScript 型別定義
```

## 本地開發

```bash
npm install
npm run dev          # port 3737
npm run build
npm run type-check
npm run lint
```

開啟 <http://localhost:3737>。

### 環境變數

複製 `.env.example` 為 `.env.local`,填入:

```bash
NEXT_PUBLIC_MAPBOX_TOKEN=...   # 申請 https://mapbox.com
NEXT_PUBLIC_SITE_URL=...
```

## 開發進度

| 階段 | 狀態 |
|---|---|
| 內容架構 + 資料模型 | 進行中 |
| 設計系統 | 進行中 |
| MVP v1 — Landing + 人物 | 規劃中 |
| MVP v2 — 建築 + 運動 + 地圖 | 規劃中 |
| Public beta | 規劃中 |

## 關於

由 **ArchiCodeKai** 策展與開發 —— 一個會寫 code 的前建築人。
編輯標準、內容選擇、設計語言、資訊架構全由我定;200+ 條目皆為人工挑選,而非爬蟲抓取。

## 授權

- **原始碼** —— [MIT](./LICENSE)
- **策展內容**(`docs/` 與 `src/content/` 下)—— © 2026 ArchiCodeKai. 保留所有權利。
