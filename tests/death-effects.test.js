const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const game = fs.readFileSync(path.join(__dirname, "..", "src", "game.js"), "utf8");
const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");

test("meteorite-break setting controls meteorite, enemy, and boss fragments", () => {
  assert.match(game, /let meteoriteBreakEffectEnabled=localStorage\.getItem\("galaxyDefenderMeteoriteBreakEffect"\)!=="off"/);
  assert.match(game, /function spawnMeteoriteFragments\(a\)\{if\(!meteoriteBreakEffectEnabled/);
  assert.match(game, /function spawnEnemyDeathFragments\(enemy\)\{if\(!meteoriteBreakEffectEnabled/);
  assert.match(game, /spawnEnemyDeathFragments\(enemy\);/);
  assert.match(game, /localStorage\.setItem\("galaxyDefenderMeteoriteBreakEffect",meteoriteBreakEffectEnabled\?"on":"off"\)/);
  assert.match(game, /if\(!meteoriteBreakEffectEnabled\)meteoriteFragments\.length=0/);
  assert.match(html, /id="uiMeteoriteBreak"/);
  assert.match(html, /☄️ התפרקות מטאוריטים/);
});

test("enemy death particles have distinct boss and regular-enemy styles", () => {
  assert.match(game, /count=boss\?48:16/);
  assert.match(game, /particleType:boss\?"boss":"enemy"/);
  assert.match(game, /if\(f\.particleType\)/);
});
