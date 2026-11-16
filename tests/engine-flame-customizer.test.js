"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const html = fs.readFileSync("index.html", "utf8");
const game = fs.readFileSync("src/game.js", "utf8");
const css = fs.readFileSync("src/style.css", "utf8");
const translations = fs.readFileSync("src/translations.js", "utf8");
test("engine flame effect and customizer are fully removed", () => {
  for (const source of [html, game, css]) assert.doesNotMatch(source, /engineFlame|EngineFlame|ENGINE_FLAME|drawEngineFlames|engine-flame/i);
});
test("game script still parses after removing the optional effect", () => {
  assert.doesNotThrow(() => new vm.Script(game, { filename: "src/game.js" }));
  assert.match(game, /function draw\(\)/);
  assert.match(game, /function resizeCanvas\(/);
});
test("space background picker is separate from settings and supports presets and local image upload", () => {
  assert.match(html, /id="openSpaceBackgroundButton"/);
  assert.match(html, /id="spaceBackgroundOverlay"/);
  assert.match(html, /id="spaceBackgroundUpload" type="file" accept="image\/\*"/);
  assert.doesNotMatch(html, /id="uiSpaceDust"/);
  assert.match(game, /function drawSpaceBackground\(/);
  assert.match(game, /drawSpaceBackground\(\);drawSpaceDust\(\)/);
  assert.match(game, /spaceBackgroundCache/);
  assert.match(game, /#003cff/);
  assert.match(game, /#e100ff/);
  assert.match(game, /#ff3b9d/);
  assert.match(game, /#28d7ff/);
  assert.match(game, /galaxyDefenderCustomBackground/);
  assert.match(game, /if\(special==="king"\)\{/);
  assert.match(game, /\["mirror","ice","gate","chaser","teleport","inversion","split","doom"\]/);
  assert.match(game, /\["mirror","ice","gate","chaser","teleport","inversion","split"\]/);
  assert.match(game, /\{section:"👑 אזור מלך החלל",items:\[\{icon:"👑",title:"מלך החלל"/);
  assert.doesNotMatch(game, /אויבים ומטאוריטים מכל האזורים/);

  assert.match(game, /file\.size>3\*1024\*1024/);
  assert.match(game, /setSpaceBackground\(button\.dataset\.spaceBackground\)/);
  assert.match(css, /#spaceBackgroundPanel/);
  assert.match(translations, /"🌌 רקע חלל":\["🌌 Space background"/);
});
