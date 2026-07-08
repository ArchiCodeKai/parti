/**
 * 統一搜尋索引
 *
 * 把三類 entity 映射成統一 SearchDoc 陣列餵給 Fuse（client-side fuzzy）。
 * 規格見 docs/00-總規格/03-技術規格書.md AD-7、04-開發路線圖.md T2.1
 */

import { ARCHITECTS } from "@/lib/data/architects";
import { BUILDINGS } from "@/lib/data/buildings";
import { MOVEMENTS } from "@/lib/data/movements";
import type { Architect } from "@/types/entity";

export type SearchType = "architect" | "building" | "movement";

export interface SearchDoc {
  id: string;
  type: SearchType;
  route: string;
  nameZh: string;
  nameEn: string;
  tags: string[];
  body: string;
}

/** type → 分組標題 */
export const SEARCH_TYPE_LABEL: Record<SearchType, string> = {
  architect: "人物",
  building: "建築",
  movement: "流派",
};

/** 分組顯示順序 */
export const SEARCH_TYPE_ORDER: SearchType[] = [
  "architect",
  "building",
  "movement",
];

const toArchitectDoc = (a: Architect): SearchDoc => ({
  id: a.id,
  type: "architect",
  route: `/architects/${a.id}`,
  nameZh: a.name.zh,
  nameEn: a.name.en,
  tags: a.tags,
  body: a.bodyText,
});

const architectDocs = ARCHITECTS.map(toArchitectDoc);

const buildingDocs: SearchDoc[] = BUILDINGS.map((b) => ({
  id: b.id,
  type: "building",
  route: `/buildings/${b.id}`,
  nameZh: b.name.zh,
  nameEn: b.name.en,
  tags: b.tags,
  body: b.bodyText,
}));

const movementDocs: SearchDoc[] = MOVEMENTS.map((m) => ({
  id: m.id,
  type: "movement",
  route: `/movements/${m.id}`,
  nameZh: m.name.zh,
  nameEn: m.name.en,
  tags: m.tags,
  body: m.bodyText,
}));

/** 全站統一搜尋索引 */
export const SEARCH_INDEX: SearchDoc[] = [
  ...architectDocs,
  ...buildingDocs,
  ...movementDocs,
];

/** 空 query 預設清單：重要性最高的建築師（前 8） */
export const DEFAULT_DOCS: SearchDoc[] = [...ARCHITECTS]
  .sort((a, b) => b.importance - a.importance)
  .slice(0, 8)
  .map(toArchitectDoc);
