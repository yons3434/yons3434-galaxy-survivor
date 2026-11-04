const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const game = fs.readFileSync(path.join(__dirname, "..", "src", "game.js"), "utf8");

function loadPoison(level, targets = {}) {
  const start = game.indexOf("function applyPoison(target){");
  const end = game.indexOf("function clearBurn(target){", start);
  assert.ok(start >= 0 && end > start, "poison functions exist");
  const source = game.slice(start, end);
  let now = 0;
  const asteroids = targets.asteroids || [];
  const enemies = targets.enemies || [];
  const damageNumbers = [];
  const functions = new Function(
    "poisonLevel", "performance", "asteroids", "enemies", "showDamageNumber",
    source + "\nreturn { applyPoison, updatePoison };"
  );
  return {
    ...functions(level, { now: () => now }, asteroids, enemies,
      (target, damage) => damageNumbers.push({ target, damage })),
    setNow(value) { now = value; },
    damageNumbers,
    asteroids,
    enemies
  };
}

test("Poison starts at 10% and one-second ticks at level I", () => {
  const target = { health: 1000, maxHealth: 1000 };
  const poison = loadPoison(1, { enemies: [target] });
  poison.applyPoison(target);
  assert.equal(target.poisonStrength, 0.1);
  assert.equal(target.poisonIntervalMs, 1000);
  assert.equal(target.poisonNextTickAt, 1000);
  poison.setNow(1000);
  poison.updatePoison();
  assert.equal(target.health, 900);
});

test("each repeated hit adds 10% of the remaining strength and speeds ticks", () => {
  const target = { health: 1000, maxHealth: 1000 };
  const poison = loadPoison(1, { enemies: [target] });
  poison.applyPoison(target);
  poison.applyPoison(target);
  assert.ok(Math.abs(target.poisonStrength - 0.19) < 1e-12);
  assert.equal(target.poisonIntervalMs, 900);
  poison.applyPoison(target);
  assert.ok(Math.abs(target.poisonStrength - 0.271) < 1e-12);
  assert.equal(target.poisonIntervalMs, 810);
});

test("card level scales initial strength and tick speed up to level IX", () => {
  const target2 = { health: 1000, maxHealth: 1000 };
  const level2 = loadPoison(2);
  level2.applyPoison(target2);
  assert.equal(target2.poisonStrength, 0.2);
  assert.equal(target2.poisonIntervalMs, 500);

  const target9 = { health: 1000, maxHealth: 1000 };
  const level9 = loadPoison(9);
  level9.applyPoison(target9);
  assert.equal(target9.poisonStrength, 0.9);
  assert.ok(Math.abs(target9.poisonIntervalMs - 1000 / 9) < 1e-12);
});

test("bosses receive 25% poison strength while regular enemies receive full strength", () => {
  const regular = { health: 1000, maxHealth: 1000 };
  const boss = { health: 1000, maxHealth: 1000, boss: true };
  const poison = loadPoison(1, { enemies: [regular, boss] });
  poison.applyPoison(regular);
  poison.applyPoison(boss);
  poison.setNow(1000);
  poison.updatePoison();
  assert.equal(regular.health, 900);
  assert.equal(boss.health, 975);
});

test("poison never kills and remains active without an expiration timestamp", () => {
  const target = { health: 2, maxHealth: 1000 };
  const poison = loadPoison(9, { enemies: [target] });
  poison.applyPoison(target);
  poison.setNow(1000 / 9);
  poison.updatePoison();
  assert.equal(target.health, 1);
  assert.equal(target.poisonUntil, undefined);
});

test("Poison upgrade is capped at IX and hidden after reaching the cap", () => {
  assert.match(game, /case"poison":poisonLevel=Math\.min\(9,poisonLevel\+1\)/);
  assert.match(game, /u\.id==="poison"&&poisonLevel>=9/);
});
