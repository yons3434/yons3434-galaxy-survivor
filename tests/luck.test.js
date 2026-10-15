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

test("all higher rarity chances rise at every level from 0 through XV", () => {
  for (const rarity of RARITY_ORDER.filter(r => r !== "common")) {
    for (let level = 1; level <= 15; level++) {
      assert.ok(
        getRarityChances(level)[rarity] > getRarityChances(level - 1)[rarity],
        `${rarity} should rise from level ${level - 1} to ${level}`
      );
    }
  }
});

test("the agreed endpoints are 55% common / 0.5% ultra at level 0 and 25% / 5% at XV", () => {
  assert.equal(getRarityChances(0).common, 55);
  assert.equal(getRarityChances(0).ultra, 0.5);
  assert.equal(getRarityChances(15).common, 25);
  assert.equal(getRarityChances(15).ultra, 5);
});

test("the full agreed rarity table matches all 16 levels", () => {
  const expected = [
    [55,25,12,5,2.5,0.5],
    [53,24.87,12.53,5.8,3,0.8],
    [51,24.73,13.07,6.6,3.5,1.1],
    [49,24.6,13.6,7.4,4,1.4],
    [47,24.47,14.13,8.2,4.5,1.7],
    [45,24.33,14.67,9,5,2],
    [43,24.2,15.2,9.8,5.5,2.3],
    [41,24.07,15.73,10.6,6,2.6],
    [39,23.93,16.27,11.4,6.5,2.9],
    [37,23.8,16.8,12.2,7,3.2],
    [35,23.67,17.33,13,7.5,3.5],
    [33,23.53,17.87,13.8,8,3.8],
    [31,23.4,18.4,14.6,8.5,4.1],
    [29,23.27,18.93,15.4,9,4.4],
    [27,23.13,19.47,16.2,9.5,4.7],
    [25,23,20,17,10,5]
  ];
  assert.deepEqual(RARITY_CHANCES, expected);
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
