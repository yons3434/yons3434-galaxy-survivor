const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const source = fs.readFileSync(path.join(__dirname, "..", "src", "game.js"), "utf8");

function loadRpgCooldown() {
  const match = source.match(/function getRpgCooldownMs\(level\)\{([^\n]+)\}/);
  assert.ok(match, "RPG cooldown helper exists");
  return new Function("level", match[1]);
}

test("RPG cooldown starts at 3 seconds and decreases by 0.25 seconds per fire-rate card", () => {
  const cooldown = loadRpgCooldown();
  assert.equal(cooldown(0), 3000);
  assert.equal(cooldown(1), 2750);
  assert.equal(cooldown(2), 2500);
  assert.equal(cooldown(4), 2000);
  assert.equal(cooldown(6), 1500);
});

test("RPG cooldown never falls below one second, even with many fire-rate upgrades", () => {
  const cooldown = loadRpgCooldown();
  assert.equal(cooldown(8), 1000);
  assert.equal(cooldown(20), 1000);
  assert.equal(cooldown(100), 1000);
});

test("RPG uses an independent time-based cooldown and does not share the normal weapon cooldown", () => {
  assert.match(source, /let rpgCooldownUntil=0/);
  assert.match(source, /if\(performance\.now\(\)<rpgCooldownUntil\)return/);
  assert.match(source, /rpgCooldownUntil=performance\.now\(\)\+getEffectiveRpgCooldownMs\(fireRateLevel\)/);
  assert.doesNotMatch(source, /if\(currentWeapon==="rpg"\)\{if\(player\.lastShot>0\)/);
  assert.match(source, /rpgCooldownUntil=0;gameStarted=true/);
});

test("Rage pickup boosts RPG reload speed by 50 percent", () => {
  assert.match(source, /function getEffectiveRpgCooldownMs\(level\)\{return getRpgCooldownMs\(level\)\*\(deadlyLootRageActive\(\)\?2\/3:1\)\}/);
  assert.match(source, /rpgCooldownUntil=performance\.now\(\)\+getEffectiveRpgCooldownMs\(fireRateLevel\)/);
});
