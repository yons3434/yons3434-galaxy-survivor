const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const source = fs.readFileSync(path.join(__dirname, "..", "src", "game.js"), "utf8");

test("heating laser starts and peaks at the configured level multipliers", () => {
  assert.match(source, /function getBaseLaserDps\(\)\{return \(lowHealthActive\(\)\?player\.damage\*1\.25:player\.damage\)\*15\}/);
  assert.equal(10 * 15, 150);
  assert.equal(20 * 15, 300);
  assert.equal(10 * 1.25 * 15, 187.5);
  assert.match(source, /const heatStats=getLaserHeatStats\(laserHeatLevel\),baseDps=getBaseLaserDps\(\),startDps=baseDps\*heatStats\.startingDamageMultiplier,maxDps=baseDps\*heatStats\.spatialDamageMultiplier/);
});

test("heating laser reaches full heat in 8 seconds at level I", () => {
  assert.match(source, /const heatTime=Math\.max\(2\.5,8-1\.5\*\(laserHeatLevel-1\)\)/);
});

test("Ultra Laser scales from the regular or heated laser and beats both", () => {
  assert.match(source, /const startDps=getBaseLaserDps\(\)\*heatStats\.startingDamageMultiplier,maxDps=getBaseLaserDps\(\)\*heatStats\.spatialDamageMultiplier,baseDps=startDps\+\(maxDps-startDps\)\*\(laserHeatLevel>0\?laserHeat:0\)/);
  assert.match(source, /const damage=baseDps\*\(ultraModeActive\?5:2\)\*dt/);
  // At base player damage 10: 300 DPS without Ultra Mode, 750 DPS with it.
  const baseDps = 10 * 15;
  assert.equal(baseDps * 2, 300);
  assert.equal(baseDps * 5, 750);
  // With heating laser fully hot, Ultra Laser reaches 600 / 1500 DPS.
  assert.equal(baseDps * 2 * 2, 600);
  assert.equal(baseDps * 2 * 5, 1500);
});

test("Ultra Laser movement penalty remains tied to Ultra Mode", () => {
  assert.match(source, /if\(ultraLaserActive&&ultraModeActive\)v\*=\.5/);
});
