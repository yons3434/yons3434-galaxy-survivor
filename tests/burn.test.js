const test = require("node:test");
const assert = require("node:assert/strict");
const burn = require("../src/burn.js");

test("burn chance follows the agreed levels I-XI", () => {
  assert.deepEqual(
    Array.from({ length: 11 }, (_, i) => burn.getChance(i + 1)),
    [0.10, 0.15, 0.20, 0.30, 0.40, 0.50, 0.60, 0.70, 0.80, 0.90, 1.00]
  );
});

test("burn damage per tick scales from 5% to 30% of max health", () => {
  assert.equal(burn.getDamageFraction(1), 0.05);
  assert.equal(burn.getDamageFraction(2), 0.075);
  assert.equal(burn.getDamageFraction(6), 0.175);
  assert.equal(burn.getDamageFraction(11), 0.30);
  assert.equal(burn.getDamageFraction(99), 0.30);
});

test("bosses take one quarter of normal burn damage", () => {
  assert.equal(burn.getTickDamage(1000, 1, false), 50);
  assert.equal(burn.getTickDamage(1000, 1, true), 12.5);
  assert.equal(burn.getTickDamage(1000, 11, true), 75);
});

test("burn timing is four seconds with eight half-second ticks", () => {
  assert.equal(burn.durationMs, 4000);
  assert.equal(burn.tickIntervalMs, 500);
  assert.equal(burn.ticksPerApplication, 8);
});

test("invalid and out-of-range levels are safely clamped", () => {
  assert.equal(burn.getChance(0), 0);
  assert.equal(burn.getChance(-4), 0);
  assert.equal(burn.getChance(100), 1);
  assert.equal(burn.getDamageFraction("not a level"), 0);
});
