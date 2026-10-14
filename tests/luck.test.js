const test = require("node:test");
const assert = require("node:assert/strict");
const { RARITY_ORDER, RARITY_CHANCES, getRarityChances, chooseUpgradeChoices } = require("../src/luck.js");

test("luck table has 16 rows whose rarity chances each total 100%", () => {
  assert.equal(RARITY_CHANCES.length, 16);
  for (const row of RARITY_CHANCES) {
    assert.ok(Math.abs(row.reduce((sum, value) => sum + value, 0) - 100) < 1e-9);
    assert.ok(row.every(value => value >= 0));
  }
});

test("common rarity chance falls at every level from 0 through XV", () => {
  for (let level = 1; level <= 15; level++) {
    assert.ok(getRarityChances(level).common < getRarityChances(level - 1).common);
  }
});

test("ultra rarity chance rises at every level from 0 through XV", () => {
  for (let level = 1; level <= 15; level++) {
    assert.ok(getRarityChances(level).ultra > getRarityChances(level - 1).ultra);
  }
});

test("the agreed endpoints are 55% common / 0.5% ultra at level 0 and 25% / 5% at XV", () => {
  assert.equal(getRarityChances(0).common, 55);
  assert.equal(getRarityChances(0).ultra, 0.5);
  assert.equal(getRarityChances(15).common, 25);
  assert.equal(getRarityChances(15).ultra, 5);
});

test("choice selection returns unique card IDs and respects requested count", () => {
  const cards = [
    { id: "c1", rarityClass: "common" },
    { id: "c2", rarityClass: "common" },
    { id: "r1", rarityClass: "rare" },
    { id: "e1", rarityClass: "epic" },
    { id: "u1", rarityClass: "ultra" },
    { id: "u1", rarityClass: "ultra" }
  ];
  const choices = chooseUpgradeChoices(cards, 15, 5, () => 0.999);
  assert.equal(choices.length, 5);
  assert.equal(new Set(choices.map(card => card.id)).size, choices.length);
});

test("missing rarities are handled without breaking the level-up choice", () => {
  const cards = [{ id: "a", rarityClass: "common" }, { id: "b", rarityClass: "common" }];
  const choices = chooseUpgradeChoices(cards, 15, 3, () => 0);
  assert.equal(choices.length, 2);
  assert.deepEqual(choices.map(card => card.id).sort(), ["a", "b"]);
});

test("out-of-range luck levels are safely clamped", () => {
  assert.deepEqual(getRarityChances(-5), getRarityChances(0));
  assert.deepEqual(getRarityChances(99), getRarityChances(15));
});
