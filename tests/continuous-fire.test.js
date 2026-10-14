const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const source = fs.readFileSync(
  path.join(__dirname, "..", "src", "game.js"),
  "utf8"
);

function loadContinuousFireDamage(level) {
  const start = source.indexOf("function getContinuousFireDamage(");
  assert.notEqual(start, -1, "continuous-fire damage helper exists");
  const end = source.indexOf("\nfunction ", start + 10);
  assert.notEqual(end, -1, "helper has a clear function boundary");
  const helperSource = source.slice(start, end).trim();
  return new Function("continuousFireLevel", "return (" + helperSource + ");")(level);
}

test("continuous-fire card is rare and supports Roman-numeral upgrades", () => {
  assert.match(source, /id:"continuousFire",rarity:"נדיר",rarityClass:"rare",icon:"🎯",title:"ירי רציף"/);
  assert.match(source, /"continuousFire","expandedChoice","flamethrower","laserHeat"\]\);/);
  assert.match(source, /case"continuousFire":return continuousFireLevel;/);
  assert.match(source, /case"continuousFire":continuousFireLevel\+\+/);
});

test("first hit uses base damage and each later hit grows by 20% per card level", () => {
  const damage = loadContinuousFireDamage(1);
  const target = {};
  assert.equal(damage(target, 100, {}, 1000), 100);
  assert.ok(Math.abs(damage(target, 100, {}, 1100) - 120) < 1e-9);
  assert.ok(Math.abs(damage(target, 100, {}, 1200) - 144) < 1e-9);
});

test("each card upgrade adds another 20 percentage points to growth", () => {
  const damage = loadContinuousFireDamage(3);
  const target = {};
  assert.equal(damage(target, 100, {}, 1000), 100);
  assert.equal(damage(target, 100, {}, 1100), 160);
  assert.equal(damage(target, 100, {}, 1200), 256);
});

test("different enemies have independent streaks and old streaks reset", () => {
  const damage = loadContinuousFireDamage(1);
  const first = {}, second = {};
  assert.equal(damage(first, 100, {}, 1000), 100);
  assert.equal(damage(second, 50, {}, 1100), 50);
  assert.ok(Math.abs(damage(first, 100, {}, 1200) - 120) < 1e-9);
  assert.equal(damage(first, 100, {}, 3000), 100);
});

test("a piercing projectile does not repeatedly increase the streak while overlapping one target", () => {
  const damage = loadContinuousFireDamage(1);
  const target = {}, bullet = {};
  assert.equal(damage(target, 100, bullet, 1000), 100);
  assert.equal(damage(target, 100, bullet, 1010), 100);
  assert.equal(damage(target, 100, {}, 1020), 120);
});

test("continuous-fire bonus is applied to both meteorites and enemy ships", () => {
  assert.match(source, /getContinuousFireDamage\\(a,b\\.damage\\*5\\*piercingHit\\.multiplier,b,performance\\.now\\(\\)\\)/);
  assert.match(source, /getContinuousFireDamage\\(enemy,b\\.damage\\*5\\*piercingHit\\.multiplier,b,performance\\.now\\(\\)\\)/);
});
