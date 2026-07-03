/**
 * 資料不變量檢查
 *
 * 規格見 docs/00-總規格/03-技術規格書.md §3.3
 * 執行：npm run validate（非零退出 = 有錯誤）
 *
 * 檢查項目：
 * 1. id 全域唯一（跨三檔）
 * 2. 三向引用完整性（architect ↔ building ↔ movement）
 * 3. colorTheme 為合法 CSS color 格式
 *
 * TODO Phase 3 — 啟用 bodyText 字數 = wordCount ± 15% 檢查（先 architect、再其他）
 */

import { ARCHITECTS } from "../src/lib/data/architects";
import { BUILDINGS } from "../src/lib/data/buildings";
import { MOVEMENTS } from "../src/lib/data/movements";

const errors: string[] = [];

const architectIds = new Set(ARCHITECTS.map((a) => a.id));
const buildingIds = new Set(BUILDINGS.map((b) => b.id));
const movementIds = new Set(MOVEMENTS.map((m) => m.id));

// 1. id 全域唯一
const allIds = [
  ...ARCHITECTS.map((a) => a.id),
  ...BUILDINGS.map((b) => b.id),
  ...MOVEMENTS.map((m) => m.id),
];
const seen = new Set<string>();
for (const id of allIds) {
  if (seen.has(id)) errors.push(`重複 id：${id}`);
  seen.add(id);
}

// 2. 引用完整性
for (const a of ARCHITECTS) {
  for (const b of a.buildings) {
    if (!buildingIds.has(b)) errors.push(`architect ${a.id} → 不存在的 building ${b}`);
  }
  for (const m of a.movements) {
    if (!movementIds.has(m.id)) errors.push(`architect ${a.id} → 不存在的 movement ${m.id}`);
  }
  // firms / schools / books 為前向引用（v2 才實作對應 entity）、不檢查
}

for (const b of BUILDINGS) {
  if (!architectIds.has(b.architect)) {
    errors.push(`building ${b.id} → 不存在的 architect ${b.architect}`);
  }
  // coArchitects 為前向引用（如 pompidou 的 richard-rogers 不在 v1 的 29 位內）、不檢查
  if (b.movement && !movementIds.has(b.movement)) {
    errors.push(`building ${b.id} → 不存在的 movement ${b.movement}`);
  }
}

for (const m of MOVEMENTS) {
  for (const c of m.coreArchitects) {
    if (!architectIds.has(c)) errors.push(`movement ${m.id} → 不存在的 architect ${c}`);
  }
  for (const k of m.keyBuildings) {
    if (!buildingIds.has(k)) errors.push(`movement ${m.id} → 不存在的 building ${k}`);
  }
  for (const o of m.opposingMovements ?? []) {
    if (!movementIds.has(o)) errors.push(`movement ${m.id} → 不存在的 opposing ${o}`);
  }
  for (const d of m.derivativeMovements ?? []) {
    if (!movementIds.has(d)) errors.push(`movement ${m.id} → 不存在的 derivative ${d}`);
  }
}

// 3. colorTheme 格式
const colorPattern = /^(#[0-9A-Fa-f]{3,8}|rgb|hsl|var\(--)/;
for (const m of MOVEMENTS) {
  if (!colorPattern.test(m.colorTheme)) {
    errors.push(`movement ${m.id} → colorTheme 非合法 CSS color：${m.colorTheme}`);
  }
}

// 結果
console.log(
  `資料規模：${ARCHITECTS.length} architects / ${BUILDINGS.length} buildings / ${MOVEMENTS.length} movements`,
);

if (errors.length > 0) {
  console.error(`\n驗證失敗、${errors.length} 個錯誤：`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

console.log("驗證通過：id 唯一、引用完整、colorTheme 合法。");
