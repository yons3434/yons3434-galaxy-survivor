const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const source = fs.readFileSync(
  path.join(__dirname, "..", "js", "config", "difficulty.js"),
  "utf8"
);

function loadDifficultyModule() {
  const transformed = source
    .replace(/export const /g, "const ")
    .replace(/export function /g, "function ")
    .concat("\nmodule.exports = { difficultySettings, getDifficultySettings };");
  const module = { exports: {} };
  const fn = new Function("module", "exports", transformed);
  fn(module, module.exports);
  return module.exports;
}

test("all five difficulty modes exist", () => {
  const { difficultySettings } = loadDifficultyModule();
  assert.deepEqual(Object.keys(difficultySettings), [
    "easy",
    "normal",
    "hard",
    "super",
    "impossible"
  ]);
});

test("normal difficulty is the neutral baseline", () => {
  const { getDifficultySettings } = loadDifficultyModule();
  const normal = getDifficultySettings("normal");
  assert.equal(normal.enemyHP, 1);
  assert.equal(normal.xp, 1);
  assert.equal(normal.extraLives, 0);
});

test("invalid difficulty falls back to normal", () => {
  const { getDifficultySettings } = loadDifficultyModule();
  assert.deepEqual(getDifficultySettings("unknown"), getDifficultySettings("normal"));
});

const heartbeatHtml = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
const heartbeatGame = fs.readFileSync(path.join(__dirname, "..", "src", "game.js"), "utf8");
const heartbeatCss = fs.readFileSync(path.join(__dirname, "..", "src", "style.css"), "utf8");

function loadHeartbeatClamp() {
  const match = heartbeatGame.match(/function clampHeartbeatIntensity\(value,fallback=lowHealthHeartbeatIntensity\)\{([^}]*)\}/);
  assert.ok(match, "heartbeat intensity clamp helper exists");
  return new Function("lowHealthHeartbeatIntensity", `return function clampHeartbeatIntensity(value,fallback=lowHealthHeartbeatIntensity){${match[1]}};`)(50);
}

test("typed heartbeat intensity is rounded and clamped from 0 to 100", () => {
  const clamp = loadHeartbeatClamp();
  assert.equal(clamp("37"), 37);
  assert.equal(clamp("300"), 100);
  assert.equal(clamp("-8"), 0);
  assert.equal(clamp("49.6"), 50);
  assert.equal(clamp(""), 50);
  assert.equal(clamp("not-a-number"), 50);
});

test("heartbeat numeric input, one-percent arrows, and slider stay synchronized", () => {
  assert.match(heartbeatHtml, /id="heartbeatIntensityNumber" type="number" min="0" max="100"/);
  assert.match(heartbeatHtml, /id="heartbeatIntensityUp"/);
  assert.match(heartbeatHtml, /id="heartbeatIntensityDown"/);
  assert.match(heartbeatGame, /heartbeatIntensityUp\.onclick=\(\)=>setHeartbeatIntensity\(lowHealthHeartbeatIntensity\+1\)/);
  assert.match(heartbeatGame, /heartbeatIntensityDown\.onclick=\(\)=>setHeartbeatIntensity\(lowHealthHeartbeatIntensity-1\)/);
  assert.match(heartbeatGame, /heartbeatIntensitySlider\.oninput=\(\)=>setHeartbeatIntensity\(heartbeatIntensitySlider\.value\)/);
  assert.match(heartbeatGame, /localStorage\.setItem\("galaxyDefenderHeartbeatIntensity"/);
});

test("heartbeat intensity slider color transitions from gray to yellow to red", () => {
  const match = heartbeatGame.match(/function heartbeatIntensityColor\(value\)\{([^}]*)\}/);
  assert.ok(match, "heartbeat intensity color helper exists");
  const color = new Function("value", match[1]);
  assert.equal(color(0), "#888888");
  assert.equal(color(1), "rgb(255, 212, 0)");
  assert.equal(color(50), "rgb(255, 107, 0)");
  assert.equal(color(100), "rgb(255, 0, 0)");
});

test("heartbeat percentage controls have responsive styles", () => {
  assert.match(heartbeatCss, /\.heartbeatNumberControls input\[type="number"\]\{width:88px/);
  assert.match(heartbeatCss, /\.heartbeatIntensityControls\{display:flex;flex-direction:column/);
});


test("hit flash settings and overlays are wired without triggering on shield hits", () => {
  const root = path.join(__dirname, "..");
  const game = fs.readFileSync(path.join(root, "src", "game.js"), "utf8");
  const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
  const css = fs.readFileSync(path.join(root, "src", "style.css"), "utf8");
  assert.match(html, /id="hitFlashOverlay"/);
  assert.match(html, /id="uiHitFlash"/);
  assert.match(html, /id="uiHeartbeatPulse"/);
  assert.match(game, /function triggerHitFlash\(\)/);
  assert.match(game, /player\.lives--;runLivesLost=true;\s*triggerHitFlash\(\);/);
  assert.match(game, /if\(ultraShields>0\)\{ultraShields--;[\s\S]*?return true;\}/);
  assert.match(game, /localStorage\.setItem\("galaxyDefenderHitFlash"/);
  assert.match(game, /localStorage\.setItem\("galaxyDefenderHeartbeatPulse"/);
  assert.match(css, /@keyframes hitFlashFade/);
  assert.match(css, /data-pulse="0"/);
});
