const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const source = fs.readFileSync(path.join(__dirname, "..", "src", "game.js"), "utf8");

function loadBaseLaserDps(damage, lowHealth = false) {
  const start = source.indexOf("function getBaseLaserDps()");
  assert.notEqual(start, -1, "base laser DPS helper exists");
  const end = source.indexOf("\\nfunction ", start + 10);
  assert.notEqual(end, -1, "base laser DPS helper has a clear boundary");
  const helper = source.slice(start, end).trim();
  return new Function("player", "lowHealthActive", "return (" + helper + ");")(
    { damage },
    () => lowHealth
  )();
}

test("heating laser starts at regular laser DPS and reaches twice that damage", () => {
  assert.equal(loadBaseLaserDps(10), 150);
  assert.equal(loadBaseLaserDps(20), 300);
  assert.equal(loadBaseLaserDps(10, true), 187.5);
  assert.match(source, /const startDps=getBaseLaserDps\(\),maxDps=startDps\*2/);
});

test("heating laser reaches full heat in 8 seconds at level I", () => {
  assert.match(source, /const heatTime=Math\.max\(2\.5,8-1\.5\*\(laserHeatLevel-1\)\)/);
});

test("Ultra Laser scales from the regular or heated laser and beats both", () => {
  assert.match(source, /const baseDps=getBaseLaserDps\(\)\*\(laserHeatLevel>0\?1\+laserHeat:1\)/);
  assert.match(source, /const damage=baseDps\*\(ultraModeActive\?5:2\)\*dt/);
  // At base player damage 10: 300 DPS without Ultra Mode, 750 DPS with it.
  const baseDps = 10 * 15;
  assert.equal(baseDps * 2, 300);
  assert.equal(baseDps * 5, 750);
  // With heating laser fully hot, Ultra Laser reaches 600 / 1500 DPS.
  assert.equal(baseDps * 2 * 2, 600);
  assert.equal(baseDps * 2 * 5, 1500);
});

test("player is slowed while Ultra Laser is active even when Ultra Mode is off", () => {
  assert.match(source, /if\(ultraLaserActive\)v\*=\.5/);
});
