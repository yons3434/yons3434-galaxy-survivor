"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

const html = fs.readFileSync("index.html", "utf8");
const game = fs.readFileSync("src/game.js", "utf8");

test("engine flame customizer button is inside the settings grid", () => {
  const gridStart = html.indexOf('<div class="settingsGrid">');
  const customizer = html.indexOf('<div class="engineFlameSettings">');
  const gridEnd = html.indexOf('<button type="button" id="closeGameSettingsButton">');
  assert.ok(gridStart >= 0 && customizer > gridStart && gridEnd > customizer);
  assert.match(html, /id="openEngineFlameCustomizer"/);
  assert.match(html, /id="engineFlameCustomizer"[^>]*style="display:none"/);
});

test("engine flame preview has all requested controls and defaults", () => {
  assert.match(html, /id="engineFlamePreview"/);
  assert.match(html, /id="engineFlameShape"[\s\S]*?<option value="smooth">חלקה<\/option>/);
  assert.match(html, /id="engineFlameColor"[\s\S]*?<option value="orange">כתום־צהוב<\/option>/);
  assert.match(html, /id="engineFlamePower"[^>]*value="75"/);
  for (const id of ["engineFlameGlow", "engineFlameSparks", "engineFlameTrail"]) {
    assert.match(html, new RegExp('id="' + id + '"[^>]*checked'));
  }
  assert.match(game, /DEFAULT_ENGINE_FLAMES=\{shape:"smooth",color:"orange",power:75,glow:true,sparks:true,trail:true\}/);
});

test("engine flame game script parses and wires the customizer", () => {
  assert.doesNotThrow(() => new vm.Script(game, { filename: "src/game.js" }));
  assert.match(game, /initEngineFlameCustomizer\(\)/);
  assert.match(game, /saveEngineFlameSettings\(\)/);
  assert.match(game, /drawEngineFlamePreview/);
});
