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

function loadSplitBulletRuntime(randomValue = 0) {
  const start = source.indexOf("const SPLIT_BULLET_MAX_LEVEL=15;");
  const end = source.indexOf("function shootPistol()", start);
  assert.ok(start >= 0 && end > start, "split-bullet runtime must exist");
  const module = { exports: {} };
  const runtime = `
    let splitBulletLevel = 0;
    let homingLevel = 0;
    const bullets = [];
  ` + source.slice(start, end) + `
    module.exports = {
      SPLIT_BULLET_MAX_LEVEL, SPLIT_BULLET_LEVELS,
      getSplitBulletConfig, getSplitBulletCount, getSplitBulletSpread,
      getSplitBulletSpeedMultiplier, getSplitBulletRangeMultiplier,
      getSplitBulletSizeMultiplier, getSplitBulletAlpha,
      shouldSplitBullet, spawnSplitBullets, bullets,
      setLevel(value) { splitBulletLevel = value; }
    };
  `;
  const math = Object.create(Math);
  math.random = () => randomValue;
  new Function("module", "exports", "Math", runtime)(module, module.exports, math);
  return module.exports;
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

test("actual bullet-count rolls follow every level's configured probability buckets", () => {
  const runtime = loadSplitBulletRuntime();
  for (let level = 1; level <= 15; level++) {
    const chances = runtime.getSplitBulletConfig(level).counts;
    let lower = 0;
    for (let i = 0; i < chances.length; i++) {
      const chance = chances[i];
      if (chance > 0) {
        const roll = (lower + chance / 2) / 100;
        assert.equal(
          runtime.getSplitBulletCount(level, roll),
          i + 2,
          `level ${level}, bucket ${i + 2} bullets`
        );
      }
      lower += chance;
    }
  }
});

test("split children conserve the intended total base damage across generations", () => {
  const runtime = loadSplitBulletRuntime(0);
  runtime.setLevel(3);
  const original = { x: 0, y: 0, vx: 0, vy: -10, damage: 10, size: 5, splitGeneration: 0 };
  runtime.spawnSplitBullets(original);
  assert.equal(runtime.bullets.length, 2);
  assert.ok(runtime.bullets.every(b => b.splitGeneration === 1));
  assert.equal(runtime.bullets.reduce((sum, b) => sum + b.damage, 0), 30);

  const firstChild = runtime.bullets[0];
  runtime.bullets.length = 0;
  runtime.spawnSplitBullets(firstChild);
  assert.equal(runtime.bullets.length, 2);
  assert.ok(runtime.bullets.every(b => b.splitGeneration === 2));
  assert.equal(runtime.bullets.reduce((sum, b) => sum + b.damage, 0), firstChild.damage);
});

test("split bullet cannot create a fourth generation and excludes RPG and black-hole bullets", () => {
  const runtime = loadSplitBulletRuntime();
  runtime.setLevel(15);
  assert.equal(runtime.shouldSplitBullet({ splitGeneration: 3 }), false);
  assert.equal(runtime.shouldSplitBullet({ rpg: true, splitGeneration: 0 }), false);
  assert.equal(runtime.shouldSplitBullet({ blackHole: true, splitGeneration: 0 }), false);
  assert.equal(runtime.shouldSplitBullet({ splitGeneration: 0 }), true);
});

test("split bullet is capped at level XV and total damage is scaled only on the first split", () => {
  assert.match(source, /SPLIT_BULLET_MAX_LEVEL=15/);
  assert.match(source, /u\.id==="splitBullet"&&splitBulletLevel>=SPLIT_BULLET_MAX_LEVEL/);
  assert.match(source, /childDamage=\(generation===1\?b\.damage\*levelValue:b\.damage\)\/count/);
});
