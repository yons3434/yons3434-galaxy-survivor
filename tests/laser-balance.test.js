const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const source = fs.readFileSync(path.join(__dirname, "..", "src", "game.js"), "utf8");

test("heating laser uses the configured starting and maximum damage multipliers", () => {
  assert.match(source, /const heatStats=getLaserHeatStats\(laserHeatLevel\),baseDps=getBaseLaserDps\(\),startDps=baseDps\*heatStats\.startingDamageMultiplier,maxDps=baseDps\*heatStats\.spatialDamageMultiplier/);
  assert.match(source, /dps=startDps\+\(maxDps-startDps\)\*laserHeat/);
});

test("heating laser uses the agreed per-level heat and cooldown times", () => {
  assert.match(source, /heatTime:10-safeLevel,coolTime:10\+safeLevel/);
  assert.match(source, /laserHeat=Math\.min\(1,laserHeat\+dt\/heatStats\.heatTime\)/);
  assert.match(source, /laserHeat-\(2\*Math\.sqrt\(Math\.max\(laserHeat,0\)\)\/heatStats\.coolTime\)\*dt/);
});

test("Ultra Laser scales from the full heated laser damage and beats it", () => {
  assert.match(source, /const startDps=getBaseLaserDps\(\)\*heatStats\.startingDamageMultiplier,maxDps=getBaseLaserDps\(\)\*heatStats\.spatialDamageMultiplier,baseDps=startDps\+\(maxDps-startDps\)\*\(laserHeatLevel>0\?laserHeat:0\)/);
  assert.match(source, /const damage=baseDps\*\(ultraModeActive\?5:2\)\*dt/);
});

test("Ultra Laser movement penalty remains tied to Ultra Mode", () => {
  assert.match(source, /if\(ultraLaserActive&&ultraModeActive\)v\*=\.5/);
});
