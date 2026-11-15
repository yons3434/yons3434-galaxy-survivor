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
test("space dust effect is drawn behind gameplay and has a persistent settings toggle", () => {
  assert.match(html, /id="uiSpaceDust"/);
  assert.match(game, /spaceDustEnabled=localStorage\.getItem\("galaxyDefenderSpaceDust"\)!=="off"/);
  assert.match(game, /function drawSpaceDust\(/);
  assert.match(game, /drawSpaceDust\(\);drawInfernoBombEffects\(\)/);
  assert.match(game, /localStorage\.setItem\("galaxyDefenderSpaceDust"/);
  assert.match(translations, /"🌌 אבק חלל":\["🌌 Space dust"/);
});
