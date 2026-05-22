# Entity Types 完整定義

## Entity 統一基類

```typescript
type EntityType =
  | "architect"
  | "building"
  | "movement"
  | "school"
  | "firm"
  | "book"
  | "exhibition"
  | "award"
  | "theorist";

interface BaseEntity {
  id: string;                    // slug-style: "le_corbusier"
  type: EntityType;
  name: {
    zh: string;                  // 「柯比意」
    en: string;                  // "Le Corbusier"
    native?: string;             // 「ル・コルビュジエ」 / 原文
  };
  wordCount: 200 | 300 | 500 | 800 | 1000;
  bodyText: string;              // MDX content
  imageUrl?: string;             // SVG / line drawing optional
  tags: string[];                // 自由標籤、用於搜尋與關聯
  relatedIds: string[];          // 80% auto + 20% manual
  importance: 1 | 2 | 3 | 4 | 5; // 影響首頁出現機率、卡片大小
}
```

## 9 種 Entity 類型詳細

### 1. Architect（人物）

```typescript
interface Architect extends BaseEntity {
  type: "architect";
  lifespan: [number, number];
  nationality: string[];
  movements: Array<{
    id: string;                  // movement entity id
    period: [number, number];
    weight: "primary" | "secondary";
  }>;
  buildings: string[];           // building ids
  firms?: string[];              // firm ids
  schools?: Array<{              // 受教 / 任教學派
    id: string;
    role: "student" | "faculty" | "founder";
    period: [number, number];
  }>;
  influences?: {
    from: string[];              // 影響者
    to: string[];                // 受影響者
  };
  books?: string[];
  awards?: Array<{
    id: string;
    year: number;
  }>;
  isPritzker?: boolean;
}
```

範例：Le Corbusier 字數 = 800（必選大師）
範例：Renzo Piano 字數 = 500（Pritzker 得主）
範例：李重耀 字數 = 300（一般列出）

### 2. Building（建築）

```typescript
interface Building extends BaseEntity {
  type: "building";
  architect: string;             // 主設計師 id
  coArchitects?: string[];
  firm?: string;
  movement?: string;
  year: {
    design?: number;
    completed: number;
    demolished?: number;
  };
  location: {
    country: string;
    city: string;
    lat: number;
    lng: number;
  };
  events?: Array<{
    year: number;
    label: string;               // 「列入 UNESCO」「改建」「工安事件」
  }>;
  buildingType?: "religious" | "residential" | "public" | "commercial" |
                 "cultural" | "educational" | "memorial" | "infrastructure";
}
```

範例：落水山莊 字數 = 800（突破性地標）
範例：克萊斯勒大廈 字數 = 1000（建築運動代表）
範例：一般 Pritzker 建築 字數 = 300

### 3. Movement（運動 / 流派）

```typescript
interface Movement extends BaseEntity {
  type: "movement";
  era: [number, number];
  originLocation: {
    country: string;
    city: string;
    lat: number;
    lng: number;
  };
  coreArchitects: string[];
  keyBuildings: string[];
  manifestoBook?: string;
  colorTheme: string;            // hex
  opposingMovements?: string[];
  derivativeMovements?: string[];
}
```

範例：包浩斯 字數 = 1000
範例：所有 20 流派 字數 = 800

### 4. School（學派 / 學校）

```typescript
interface School extends BaseEntity {
  type: "school";
  founded: number;
  location: {
    country: string;
    city: string;
  };
  founders: string[];            // architect ids
  notableFaculty?: string[];
  notableAlumni?: string[];
}
```

範例：包浩斯 學派 / 東海建築系 / AA / Bartlett 字數 = 300

### 5. Firm（事務所）

```typescript
interface Firm extends BaseEntity {
  type: "firm";
  founded: number;
  founders: string[];
  keyProjects: string[];
  disbanded?: number;
}
```

範例：OMA / H&dM / SOM 字數 = 300

### 6. Book（著作）

```typescript
interface Book extends BaseEntity {
  type: "book";
  author: string;
  publishedYear: number;
  publisher?: string;
}
```

範例：《邁向建築》字數 = 500
範例：《複雜與矛盾》字數 = 500
範例：田園城市原書 字數 = 200（書本身）/ 田園城市觀念條目 = 800（觀念）

### 7. Exhibition（展覽）

```typescript
interface Exhibition extends BaseEntity {
  type: "exhibition";
  year: number;
  venue: string;
  curator?: string;
  featured: string[];            // architect / building ids
}
```

範例：MoMA 1932 國際樣式展、MoMA 1988 解構展、威尼斯雙年展 字數 = 200–300

### 8. Award（獎項）

```typescript
interface Award extends BaseEntity {
  type: "award";
  established: number;
  givingBody: string;
  laureates: Array<{
    year: number;
    recipient: string;           // architect id
  }>;
}
```

範例：Pritzker / RIBA / AIA / Stirling Prize / Mies van der Rohe Award 字數 = 200

### 9. Theorist（保留理論家 20 位）

```typescript
interface Theorist extends BaseEntity {
  type: "theorist";
  lifespan: [number, number];
  field: "philosophy" | "sociology" | "criticism" | "landscape" | "history" | "geography";
  influencedArchitects?: string[];
  keyBooks?: string[];
}
```

範例：傅柯 / 列斐伏爾 / 雅各 / 哈維 等 20 位 字數 = 200–500（觀念越重要字越多）

## 字數對照表

| 對象 | 字數 |
|---|---|
| 必選大師（柯、密、萊、康） | 800 |
| Pritzker 得主 | 500 |
| 普通列出人物 | 300 |
| 重要建築運動 / 主義 | 800–1000 |
| 突破性地標建築 | 800–1000 |
| 一般建築物 | 300 |
| 學派 / 事務所 | 300 |
| 著作（書本身） | 200–500 |
| 著作觀念（重要的） | 800 |
| 展覽 | 200–300 |
| 獎項 | 200 |
| 理論家 | 200–500 |
