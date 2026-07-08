import assert from "node:assert/strict";
import test from "node:test";
import { ARCHITECTS } from "../data/architects.ts";
import {
  layoutPoints,
  circumcircle,
  delaunayEdges,
  voronoiCells,
  type Pt,
} from "./relation.ts";

const dist = (p: Pt, cx: number, cy: number) => Math.hypot(p.x - cx, p.y - cy);

test("circumcircle 圓心到三點距離相等（誤差 < 1e-6）", () => {
  const a: Pt = { x: 10, y: 0 };
  const b: Pt = { x: 0, y: 20 };
  const c: Pt = { x: -15, y: 5 };
  const cc = circumcircle(a, b, c);
  assert.ok(cc, "三點不共線應有外接圓");
  assert.ok(Math.abs(dist(a, cc.cx, cc.cy) - cc.r) < 1e-6);
  assert.ok(Math.abs(dist(b, cc.cx, cc.cy) - cc.r) < 1e-6);
  assert.ok(Math.abs(dist(c, cc.cx, cc.cy) - cc.r) < 1e-6);
});

test("三點共線回傳 null", () => {
  assert.equal(
    circumcircle({ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }),
    null,
  );
});

test("layoutPoints 三人 → 外接圓確實通過三個點", () => {
  const pts = layoutPoints(ARCHITECTS.slice(0, 3), 400, 0.4);
  assert.equal(pts.length, 3);
  const cc = circumcircle(pts[0], pts[1], pts[2]);
  assert.ok(cc, "三點應非共線");
  for (const p of pts) {
    assert.ok(
      Math.abs(dist(p, cc.cx, cc.cy) - cc.r) < 1e-6,
      "每個點都應落在外接圓上",
    );
  }
});

test("Voronoi cell 數 = N（N=9）", () => {
  const pts = layoutPoints(ARCHITECTS.slice(0, 9), 400, 0.4);
  const cells = voronoiCells(pts, 400);
  assert.equal(cells.filter(Boolean).length, 9);
});

test("Delaunay 產生邊（N=5 至少 N 條邊）", () => {
  const pts = layoutPoints(ARCHITECTS.slice(0, 5), 400, 0.4);
  const edges = delaunayEdges(pts);
  assert.ok(edges.length >= 5);
});
