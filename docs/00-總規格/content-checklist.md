# PARTI · 內容管線與查核清單

> 版本：2026-07-08 · 對應路線圖 T3.1。Phase 3 所有內容擴寫（T3.2–T3.4）依本文件執行。
> 寫作風格權威：`.ai-context/global/content-writing.md`；字數權威：`docs/05-內容架構/word-count-rules.md`。
> 本文件負責「流程與查核」，不重複定義風格規則（衝突時以上述兩份為準）。

## 一、流程總覽

每條目走五步，缺一不可：

```
1. 產草稿   — 用本文件的 prompt 模板（模型生成或人工撰寫）
2. 自查     — 逐項過「三、事實查核清單」+「四、禁用詞速查」
3. 人審     — 使用者定稿（Phase 3 鐵則：模型產草稿、人審後才算數）
4. 入資料   — 更新 src/lib/data/*.ts 的 bodyText
5. 收緊驗證 — 把該條目 id 加入 scripts/validate-data.ts 的 WORD_COUNT_ENFORCED，
              跑 npm run validate 確認通過
```

**分批啟用機制**：`WORD_COUNT_ENFORCED` 名單內的條目，字數不在 wordCount ±15% 時
validate 直接失敗（error）；名單外只彙總為資訊行、不擋驗證。每完成一批擴寫就把
該批 id 加入名單——棘輪式收緊，永不回退（禁止從名單移除 id 來「修」錯誤）。

## 二、字數計算規則（與 validate-data 一致）

```
字數 = bodyText.replace(/\s/g, "").length
```

- 去除全部空白後計算字元數：**中文字、標點、拉丁字母、數字都算 1 字元**。
- 容許範圍：`wordCount × 0.85 ～ wordCount × 1.15`（800 字 → 680–920）。
- 拉丁詞（如 CIAM、Dom-ino）會膨脹字元數，正文以中文為主即可，不必刻意迴避。
- v1 的 bodyText 是**連續散文**（渲染為單一段落）：模板的段落結構是內容組織依據，
  不落實為換行。段與段之間直接以句號銜接。

## 三、事實查核清單（每條目自查 + 人審共用）

逐項打勾，任何一項不確定就標註「待查」交人審，不得含糊帶過：

- [ ] **生卒年 / 建成年**與資料檔欄位一致（`lifespan`、`year.design/completed`、`era`）
      —— 內文年份的唯一權威是資料檔，不是記憶。寫作前先讀該條目的完整資料。
      前例：柯比意舊文寫「薩伏伊別墅 (1929)」、資料是 design 1928 / completed 1931。
- [ ] **國籍**與 `nationality` 一致（含入籍變動，如柯比意 CH→FR）
- [ ] **流派歸屬與時段**與 `movements[]` 的 id / period / weight 一致
- [ ] **代表作**只提 `buildings[]` 內存在的建築（前向引用除外），名稱用資料檔 `name.zh`
- [ ] **獎項年份**與 `awards[]` 一致（Pritzker 年份錯誤是最常見錯）
- [ ] **師承 / 合作關係**有把握才寫（Perret、Behrens 這類明確記載可寫；傳聞不寫）
- [ ] **著作名**用固定譯名（《邁向建築》《複雜與矛盾》），與 `books[]` 對應
- [ ] 字數在 wordCount ±15% 內（用「二」的算法自算一次）
- [ ] 交叉驗證來源至少一項：Wikipedia（基本事實）/ Pritzker 官網（得主資料）/
      阮慶岳著作（華人建築師）/ 漢寶德著作（台灣戰後）

## 四、禁用詞速查（可 grep 的清單）

寫完草稿後逐一 grep，命中即改寫：

```
被稱為        （→ 業界稱他為 / 建築史視他為）
令人難忘
深深地
感到十分
這讓我們明白
這啟示我們
難道不是嗎
無疑是
毫無疑問
！             （任何驚嘆號）
我認為 / 我們覺得（第一人稱）
可能影響了     （投機性結論）
```

加上：emoji 一律禁止；不做政治評論、八卦、商業推薦（完整清單見 content-writing.md）。

## 五、譯名對照

**唯一權威是資料檔的 `name.zh`**（`architects.ts` / `buildings.ts` / `movements.ts`）
——寫作時直接查資料檔，本表只列容易寫錯的高風險項：

| 原文 | 統一譯名 | 常見錯誤 |
|---|---|---|
| Metabolism | 代謝派 | ✘ 新陳代謝派 |
| Le Corbusier | 柯比意 | ✘ 勒·柯布西耶（大陸譯法） |
| Mies van der Rohe | 密斯（全稱：密斯·凡·德·羅） | ✘ 密斯凡德羅（不加間隔號） |
| Louis Kahn | 路易斯·康（簡稱：康） | ✘ 路康 |
| Zaha Hadid | 札哈·哈蒂 | ✘ 扎哈·哈迪德（大陸譯法） |
| Pritzker | 普利茲克獎 | ✘ 普立茲獎（那是新聞獎） |
| Unité d'Habitation | 馬賽公寓 | ✘ 居住單元 |
| Notre Dame du Haut | 廊香教堂 | ✘ 朗香教堂（本站統一用「廊」） |

## 六、草稿 Prompt 模板

共同要求（每型都附在 prompt 尾）：

```
- 第三人稱、客觀、繁體中文（台灣慣用語）、像建築教科書
- 嚴格遵守 .ai-context/global/content-writing.md 禁用詞彙
- 年份 / 國籍 / 流派 / 代表作名稱以我提供的資料欄位為準、不得自行更動
- 連續散文、不分段換行、不出現 emoji 與驚嘆號
- 字數 = 去空白字元數、目標 [N] ±10%（驗證容差 ±15%、自留餘裕）
```

### 6.1 建築師 · 大師 800 字（T3.2：柯比意 / 密斯 / 萊特 / 康）

```
請撰寫 [名字] 的 800 字建築師介紹、內容依序涵蓋六個層次（不換行、連續散文）：
身份定位(約100字)→早期教育與背景(約150字)→核心理念與宣言(約200字)
→代表作分析(約200字、限用下列建築)→流派貢獻與時代位置(約100字)→晚年與評價(約50字)。

資料（唯一權威）：
- 生卒：[lifespan]　國籍：[nationality]
- 流派時段：[movements 展開：id / period / weight]
- 代表作：[buildings 展開：name.zh + year]
- 著作：[books 對應譯名]
```

### 6.2 建築師 · Pritzker 500 字（T3.3）

```
請撰寫 [名字] 的 500 字建築師介紹、四個層次（連續散文）：
身份定位(約80字)→時代背景(約100字)→核心貢獻(約200字、代表作限用下列建築)
→影響與評價(約120字)。

資料（唯一權威）：
- 生卒：[lifespan]　國籍：[nationality]　Pritzker：[awards.year]
- 流派時段：[movements 展開]
- 代表作：[buildings 展開：name.zh + year]
```

### 6.3 建築 300 / 200 字（T3.4）

```
請撰寫 [建築 name.zh]（[name.en]）的 [300|200] 字介紹、涵蓋：
設計者與年代背景→空間與構造要點→在建築史中的位置。

資料（唯一權威）：
- 設計者：[architect 的 name.zh]　年代：[year.design→completed]
- 地點：[location.city, country]　流派：[movement 的 name.zh]
- 事件：[events 若有]
```

### 6.4 流派 800 / 500 / 300 / 200 字（T3.4）

```
請撰寫 [流派 name.zh]（[name.en]）的 [N] 字介紹、涵蓋：
起源脈絡（era + originLocation）→核心主張→代表人物與建築（限用資料欄位）
→與其他流派的關係（relatedIds / opposingMovements）→後續影響。

資料（唯一權威）：
- 年代：[era]　起源地：[originLocation.city]
- 核心建築師：[coreArchitects 的 name.zh]　關鍵建築：[keyBuildings 的 name.zh]
- 對立流派：[opposingMovements]　衍生：[derivativeMovements]
```

## 七、現況基線（2026-07-08 量測）

啟用檢查前的全站量測：**0/124 條目在 ±15% 內**（全部只有目標字數的 12–46%）。
這是 Phase 3 的起點事實——擴寫進度即 `WORD_COUNT_ENFORCED` 名單長度，
對外聲稱「內容完成度」時以名單長度 / 124 計算，不得用其他口徑。

## 八、批次順序（照路線圖）

1. **T3.2** 四大師 800 字：le-corbusier → mies-van-der-rohe → frank-lloyd-wright → louis-kahn
2. **T3.3** Pritzker 500 字 × 25（其餘 architects）
3. **T3.4** buildings（68）/ movements（27）按字數規格

每批完成 = 全部通過本清單 + 人審定稿 + 加入 enforced 名單 + validate 綠。
