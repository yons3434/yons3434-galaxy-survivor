"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const html = fs.readFileSync("index.html", "utf8");
const game = fs.readFileSync("src/game.js", "utf8");
const css = fs.readFileSync("src/style.css", "utf8");
test("engine flame effect and customizer are fully removed", () => {
  for (const source of [html, game, css]) assert.doesNotMatch(source, /engineFlame|EngineFlame|ENGINE_FLAME|drawEngineFlames|engine-flame/i);
});
test("game script still parses after removing the optional effect", () => {
  assert.doesNotThrow(() => new vm.Script(game, { filename: "src/game.js" }));
  assert.match(game, /function draw\(\)/);
  assert.match(game, /function initGame\(/);
});
