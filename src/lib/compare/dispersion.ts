/**
 * Compare 工具 · 離散度計算
 *
 * 規格見 docs/04-頁面設計/compare-tool.md
 * 權重：時代 30% / 流派 50% / 地理 20%
 */

import type { Architect } from "@/types/entity";

/** Jaccard 係數（兩 set 的交集 / 聯集） */
function jaccard<T>(setA: Set<T>, setB: Set<T>): number {
  if (setA.size === 0 && setB.size === 0) return 1;
  const inter = new Set([...setA].filter((x) => setB.has(x)));
  const union = new Set([...setA, ...setB]);
  return inter.size / union.size;
}

/** 多 set 的平均 Jaccard 重疊度 */
function multiJaccard<T>(sets: Set<T>[]): number {
  if (sets.length < 2) return 1;
  const pairs: number[] = [];
  for (let i = 0; i < sets.length - 1; i++) {
    for (let j = i + 1; j < sets.length; j++) {
      pairs.push(jaccard(sets[i], sets[j]));
    }
  }
  return pairs.reduce((s, v) => s + v, 0) / pairs.length;
}

/** 計算 N 個建築師的離散度（0=最近、1=最遠） */
export function calculateDispersion(architects: Architect[]): number {
  if (architects.length < 2) return 0;

  // 時代軸（30%）：出生年標準差
  const years = architects.map((a) => a.lifespan[0]);
  const meanYear = years.reduce((s, y) => s + y, 0) / years.length;
  const variance =
    years.reduce((s, y) => s + Math.pow(y - meanYear, 2), 0) / years.length;
  const stdDev = Math.sqrt(variance);
  const eraVariance = Math.min(stdDev / 50, 1);

  // 流派重疊（50%）：Jaccard 係數
  const movementSets = architects.map(
    (a) => new Set(a.movements.map((m) => m.id)),
  );
  const moveOverlap = multiJaccard(movementSets);

  // 地理離散（20%）：用國籍集合的 Jaccard 反向
  const natSets = architects.map((a) => new Set(a.nationality));
  const natOverlap = multiJaccard(natSets);

  return Math.min(
    1,
    eraVariance * 0.3 + (1 - moveOverlap) * 0.5 + (1 - natOverlap) * 0.2,
  );
}

/** 計算共同點 */
export function computeCommonalities(architects: Architect[]): string[] {
  const commons: string[] = [];
  if (architects.length < 2) return commons;

  // 共同流派
  const moveSets = architects.map(
    (a) => new Set(a.movements.map((m) => m.id)),
  );
  const sharedMovements = [...moveSets[0]].filter((m) =>
    moveSets.slice(1).every((s) => s.has(m)),
  );
  if (sharedMovements.length > 0) {
    commons.push(
      `都屬於 ${sharedMovements.map((m) => m.replace(/-/g, " ")).join(" / ")} 流派`,
    );
  }

  // 同代（出生年差 ≤ 30 年）
  const years = architects.map((a) => a.lifespan[0]);
  if (Math.max(...years) - Math.min(...years) <= 30) {
    commons.push(
      `都活躍於同一世代 (${Math.min(...years)}–${Math.max(...years)})`,
    );
  }

  // 共同國籍
  const natSets = architects.map((a) => new Set(a.nationality));
  const sharedNat = [...natSets[0]].filter((n) =>
    natSets.slice(1).every((s) => s.has(n)),
  );
  if (sharedNat.length > 0) {
    commons.push(`都來自 ${sharedNat.join(" / ")}`);
  }

  // 都是 Pritzker
  if (architects.every((a) => a.isPritzker)) {
    commons.push("都是 Pritzker 得主");
  }

  if (commons.length === 0) {
    commons.push("沒有明顯共同點 — 風格高度離散");
  }

  return commons;
}
