# src/design-reference/ 資料夾使用指南

## 用途

本資料夾存放所有設計原件、設計系統、視覺迭代版本。
**是視覺層的 Source of Truth**，不是可編譯的程式碼。

Next.js 建置流程不會匯入此資料夾的內容（無任何 .ts / .tsx import 進來）。

## 資料夾結構

```
design-reference/
├── README.md
├── design-system/              # 設計系統權威來源
│   ├── colors.md               # 色票
│   ├── typography.md           # 字型
│   ├── motion.md               # 動畫規範
│   └── geometry-language.md    # 幾何視覺語言
└── prototypes/                 # HTML / Figma / Huashu 原型
    ├── (待後續產出)
    └── ...
```

## 給 Claude Code 的指令

實作新元件或頁面時：

1. 先查閱 `design-system/colors.md`、`typography.md` 確認 token 名稱
2. 所有顏色引用透過 CSS 變數（如 `var(--bg-paper)`、`var(--accent-red)`），**禁止寫死 hex 值**
3. 動畫時長與 easing 引用 `motion.md` 的常數
4. 幾何元素（圓、線、三角）參考 `geometry-language.md` 的視覺原型

## 視覺設計原則

PARTI 的視覺路線：

> **Constructivist Editorial（構成主義編輯派）**
> 紅 + 黑 + 米白為主、等距幾何為骨架、抽象構成為敘事、點線面為原子單位

不是純 Vignelli/Tufte 派、也不是純 Bauhaus、是兩者融合 + 中俄構成主義配色。

## 視覺風格 reference

- heyo.is（等距插畫派）
- mailchimp.com/about 早期版本
- Otl Aicher 1972 Munich Olympics（圖示系統聖經）
- Aprilzero（Tristan Hume）
- Pentagram x The New York Times
- 蘇聯構成主義海報（El Lissitzky）

## 不允許的視覺風格

- ✘ 過度漸層（破壞極簡）
- ✘ 玻璃擬態 / Glassmorphism（過時、Y2K 拉風）
- ✘ 圓角過大（不超過 4px）
- ✘ 太多陰影（保持扁平）
- ✘ Disney 風活潑動畫
- ✘ AI slop typography（任意 Google Fonts 拼接）
