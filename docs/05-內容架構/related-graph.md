# 關聯網絡（relatedIds）

## 設計目的

每個 entity 都有 `relatedIds: string[]` 欄位 — 這是右側相關詞條 list 的資料來源、也是雙向關聯網絡的骨架。

80% 自動生成、20% 人工標註。

## 自動生成規則

### 規則 1：同流派（任一時期）

```
A.movements ∩ B.movements ≠ ∅
→ relatedIds 加入彼此
```

例：Le Corbusier (brutalism) ↔ Smithsons (brutalism)

### 規則 2：同事務所

```
A.firms ∩ B.firms ≠ ∅
→ relatedIds 加入彼此
```

例：SOM 的所有合夥人互為相關

### 規則 3：同學派出身

```
A.schools.id = B.schools.id (role = student)
→ relatedIds 加入彼此
```

例：包浩斯校友互為相關（Gropius、Breuer、Mies 等）

### 規則 4：師生關係

```
A.influences.to includes B
A.influences.from includes B
→ 雙向加入
```

例：Mies → Johnson

### 規則 5：建築物關聯

```
Building.architect = A
→ A.relatedIds += [Building.id]
→ Building.relatedIds += [A.id]
```

### 規則 6：流派代表作

```
Movement.keyBuildings includes B
→ Movement.relatedIds += [B.id]
→ B.relatedIds += [Movement.id]
```

### 規則 7：同時代（±10 年）

```
|A.lifespan.start - B.lifespan.start| ≤ 10
→ 互相加入 (weight = low)
```

僅在其他規則沒匹配時使用。

### 規則 8：同國籍

```
A.nationality ∩ B.nationality ≠ ∅
→ 互相加入 (weight = low)
```

僅當其他規則沒匹配時使用。

## 人工標註情境

### 情境 A：對立 / 反駁關係

例：Le Corbusier vs Wright（理念對立、互相批評）
人工加入 `relatedIds.opposition`

### 情境 B：間接影響（無直接師生但有思想傳承）

例：Tatlin 第三國際塔 → 影響 Lebbeus Woods 紙上建築
人工加入 `relatedIds.indirect`

### 情境 C：類比 / 並列

例：Carlo Scarpa 與 Aalto 同屬「自成一派的人文現代主義」
人工加入 `relatedIds.parallel`

### 情境 D：地緣關聯

例：Calatrava + Gaudí（都西班牙、加泰隆尼亞）
若已被「同國籍」規則覆蓋則無需重複；但若需強調「兩人之間的特殊關聯」則人工加入

## 排序與顯示

### 排序權重

```
weight = (
  shared_movement * 3 +
  shared_firm * 5 +
  shared_school * 4 +
  teacher_student * 6 +
  same_era * 1 +
  same_nationality * 0.5 +
  manual_boost * 10
)
```

### 顯示分組

右側相關詞條 list 按 entity type 分組顯示：

```
RELATED
─────────

人物          ← 同 type 排在最前
◦ Mies van der Rohe
◦ Walter Gropius
◦ ... (前 5 個)

建築
◦ 廊香教堂
◦ 薩伏伊別墅
◦ ...

流派
◦ Brutalism
◦ ...

著作
◦ 邁向建築
```

每組超過 5 個顯示「+N more」、點擊展開全部。

## 資料生成流程

### Build-time 腳本

```typescript
// scripts/generate-relations.ts

import { allEntities } from "../src/content";

function autoGenerateRelations(entity: Entity): string[] {
  const related = new Set<string>();

  for (const other of allEntities) {
    if (other.id === entity.id) continue;

    let weight = 0;
    weight += shareMovement(entity, other) * 3;
    weight += shareFirm(entity, other) * 5;
    // ... 各規則
    weight += entity.manualRelated?.includes(other.id) ? 10 : 0;

    if (weight > THRESHOLD) related.add(other.id);
  }

  return Array.from(related).sort(/* by weight */).slice(0, 30);
}
```

每次 build 時跑一次、寫入靜態 `relations.json`。

## 不要做的

- ✘ 即時搜尋相似條目（用 build-time 索引即可）
- ✘ 顯示「相似度分數」給用戶看（保持極簡）
- ✘ 為每個條目產生超過 30 個 relations（太多反而稀釋）
- ✘ 自動加入「同時代」當預設規則（雜訊太大、改為 fallback）
