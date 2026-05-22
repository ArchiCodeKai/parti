# MVP v1 規劃

## Step 0：開發順序

按以下順序開發、不跳步：

1. **Entity schema 定義 + Seed Data（30 位 Pritzker 核心）**
   - 撰寫 `src/types/entity.ts`
   - 用 AI 生成 30 位核心 architect 條目（每位 500 字）
   - 同時生成相關 building / movement / firm 資料
   - 自動產生 `relatedIds`

2. **Design System 落地**
   - 落實 `themes.css`（色票、字型、間距 token）
   - 建立 `geometry-language.css`（線條、圓、三角原型）
   - 建立基礎元件：Card、Badge、Link

3. **Landing Page**
   - Hero（大字標題「一部建築圖鑑」）
   - 4 大入口（人物 / 建築 / 運動 / 地圖）
   - Force graph 縮影動態漂浮
   - 隨機推送 10 條精選詞條

4. **人物總覽（馬賽克牆）**
   - 30 位 v1 卡片 grid（3 種 size 變體）
   - 篩選器（時代 / 流派 / 國籍）
   - 點擊 → 個人頁

5. **個人頁（首位完整實作）**
   - 內文（500 字）
   - 右側相關詞條 list（桌機 sticky / 手機 bottom sheet）
   - 文字 hover 動畫提示（鼠標變放大鏡、詞條變色）
   - 絲滑頁面切換（View Transitions API）

6. **運動 / 建築 / 地圖 三大分類**
   - 流動敘事（運動）
   - 分區年表（建築）
   - 世界地圖 zoom（地圖）

7. **Cmd+K 命令面板**
   - Fuse.js 全站索引
   - 鍵盤 Cmd+K 開啟、上下選擇

8. **`/explore` 進階篩選頁**
   - 多維度組合（流派 × 時代 × 國籍 × 學派）
   - 即時結果以馬賽克呈現

9. **手機版 RWD**
   - 馬賽克牆改 1 列
   - 右側 list 改 bottom sheet
   - 相關詞條按鈕（浮動）

10. **PWA**
    - manifest.json
    - service worker（快取靜態資源）
    - iOS splash screens

## v1 內容範圍

| 類型 | 數量 | 字數 |
|---|---|---|
| Architect | 30（Pritzker 精選） | 500 / 位 |
| Building | 90（每位 3 件） | 300 / 件 |
| Movement | 20 | 800 / 派 |
| School | 10 | 300 / 所 |
| Firm | 15 | 300 / 所 |
| Book | 20 | 200–500 / 本 |
| Exhibition | 5 | 200 / 場 |
| Award | 3（Pritzker / RIBA / AIA） | 200 / 個 |
| Theorist | 5（首批保留） | 200–500 / 位 |

總計 ~ 200 條目、~80,000 字。

## v1 不包含（移到 v2 / v3）

- 書籤 / 收藏
- OG image 分享卡
- Surprise me
- 黑暗模式
- 閱讀進度
- 比較模式
- 中英對照切換
- 用戶評論

## v1 成功標準

- [ ] 所有 200 條目可瀏覽、可搜尋
- [ ] Cmd+K 1 秒內找到任何條目
- [ ] 桌機 Lighthouse Performance > 90
- [ ] 手機所有頁面不破版
- [ ] 投稿 Awwwards
