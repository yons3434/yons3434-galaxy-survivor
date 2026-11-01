const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const source = fs.readFileSync(path.join(__dirname, "..", "src", "game.js"), "utf8");

function loadLaserHeatStats() {
  const match = source.match(/function getLaserHeatStats\(level\)\{([^\n]+)\}/);
  assert.ok(match, "laser heat stats helper exists");
  return new Function("level", match[1]);
}

test("heating laser levels use the agreed heat, cooldown, and damage progression", () => {
  const getStats = loadLaserHeatStats();
  const expected = [
    [9, 11, 100, 200],
    [8, 12, 125, 250],
    [7, 13, 150, 300],
    [6, 14, 175, 350],
    [5, 15, 200, 400]
  ];
  expected.forEach(([heat, cool, start, spatial], index) => {
    const stats = getStats(index + 1);
    assert.equal(stats.heatTime, heat);
    assert.equal(stats.coolTime, cool);
    assert.equal(stats.startingDamageMultiplier * 100, start);
    assert.equal(stats.spatialDamageMultiplier * 100, spatial);
  });
});

test("heating laser stats clamp to the supported five levels", () => {
  const getStats = loadLaserHeatStats();
  assert.deepEqual(getStats(0), getStats(1));
  assert.deepEqual(getStats(99), getStats(5));
});

test("laser damage interpolates from starting damage to spatial damage using heat", () => {
  const getStats = loadLaserHeatStats();
  const levelThree = getStats(3);
  const baseDps = 150;
  const startDps = baseDps * levelThree.startingDamageMultiplier;
  const maxDps = baseDps * levelThree.spatialDamageMultiplier;
  assert.equal(startDps, 225);
  assert.equal(maxDps, 450);
  assert.equal(startDps + (maxDps - startDps) * 0, 225);
  assert.equal(startDps + (maxDps - startDps) * 1, 450);
});

test("laser heat upgrade remains available only after laser unlock and until level V", () => {
  assert.match(source, /u\.id==="laserHeat"&&\(!laserMode\|\|laserHeatLevel>=5\)/);
  assert.match(source, /case"laserHeat":laserHeatLevel=Math\.min\(5,laserHeatLevel\+1\)/);
  assert.match(source, /getLaserHeatStats\(laserHeatLevel\)/);
});
