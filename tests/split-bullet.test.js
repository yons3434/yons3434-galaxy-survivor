const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const source = fs.readFileSync(
  path.join(__dirname, "..", "src", "game.js"),
  "utf8"
);

function loadSplitBulletLevels() {
  const match = source.match(/const SPLIT_BULLET_LEVELS=(\[[\s\S]*?\n\]);/);
  assert.ok(match, "split-bullet level table must exist in game.js");
  return new Function("return (" + match[1] + ")")();
}

test("split bullet has levels I through XV", () => {
  const levels = loadSplitBulletLevels();
  assert.equal(levels.length, 16);
  assert.equal(levels[0], null);
  assert.equal(levels[15].counts[3], 50);
});

test("each split bullet level has valid probabilities totaling 100%", () => {
  const levels = loadSplitBulletLevels();
  for (let level = 1; level <= 15; level++) {
    const config = levels[level];
    assert.equal(config.counts.length, 4, `level ${level} must define 2–5 bullet chances`);
    assert.equal(config.counts.reduce((sum, chance) => sum + chance, 0), 100);
    assert.ok(config.secondChance >= 0 && config.secondChance <= 100);
    assert.ok(config.thirdChance >= 0 && config.thirdChance <= 100);
    assert.ok(config.spreadDeg > 0);
    assert.ok(config.speed >= 1);
    assert.ok(config.size >= 1);
  }
});

test("split bullet is capped at level XV and total damage is scaled only on the first split", () => {
  assert.match(source, /SPLIT_BULLET_MAX_LEVEL=15/);
  assert.match(source, /u\.id==="splitBullet"&&splitBulletLevel>=SPLIT_BULLET_MAX_LEVEL/);
  assert.match(source, /childDamage=\(generation===1\?b\.damage\*levelValue:b\.damage\)\/count/);
});
