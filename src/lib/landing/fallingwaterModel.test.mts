import assert from "node:assert/strict";
import test from "node:test";

import {
  FALLINGWATER_INTERACTION,
  FALLINGWATER_MODEL_PARTS,
  getFallingwaterModelSummary,
} from "./fallingwaterModel.ts";

test("Fallingwater model keeps the required architectural primitives", () => {
  const summary = getFallingwaterModelSummary(FALLINGWATER_MODEL_PARTS);

  assert.equal(summary.slabs >= 5, true);
  assert.equal(summary.stoneCores >= 2, true);
  assert.equal(summary.glassBands >= 3, true);
  assert.equal(summary.terrainBlocks >= 4, true);
  assert.equal(summary.waterLines >= 3, true);
});

test("Fallingwater model has the expected horizontal cantilever emphasis", () => {
  const slabs = FALLINGWATER_MODEL_PARTS.boxes.filter((part) => part.kind === "slab");
  const longestSlab = Math.max(...slabs.map((part) => part.size[0]));
  const averageSlabDepth =
    slabs.reduce((total, part) => total + part.size[2], 0) / slabs.length;

  assert.equal(longestSlab > averageSlabDepth * 2.8, true);
});

test("Fallingwater card interaction uses drag rotate and bounded wheel zoom", () => {
  assert.equal(FALLINGWATER_INTERACTION.dragAction, "rotate");
  assert.equal(FALLINGWATER_INTERACTION.wheelAction, "zoom");
  assert.equal(FALLINGWATER_INTERACTION.middleClickAction, "none");
  assert.equal(FALLINGWATER_INTERACTION.minZoom < FALLINGWATER_INTERACTION.maxZoom, true);
});

