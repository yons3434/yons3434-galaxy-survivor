const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
const game = fs.readFileSync(path.join(__dirname, "..", "src", "game.js"), "utf8");
const css = fs.readFileSync(path.join(__dirname, "..", "src", "style.css"), "utf8");

test("heartbeat setting is a 0–100 slider with default intensity 50", () => {
  assert.match(html, /id="uiLowHealthHeartbeat" type="range" min="0" max="100" step="1" value="50"/);
  assert.match(html, /id="heartbeatIntensityNumber" type="number" min="0" max="100" step="1" value="50"/);
});

test("heartbeat intensity persists and zero disables the effect", () => {
  assert.match(game, /galaxyDefenderHeartbeatIntensity/);
  assert.match(game, /lowHealthHeartbeatIntensity===0/);
  assert.match(game, /intensity>0&&maxLivesLevel===0/);
});

test("50 intensity preserves the previous baseline and higher values scale the effect", () => {
  assert.match(game, /const intensityScale=intensity\/50/);
  assert.match(game, /Math\.min\(\.99,\(\.58\+\.38\*bucket\)\*intensityScale\)/);
  assert.match(game, /Math\.min\(100,\(12\+Math\.pow\(bucket,\.8\)\*48\)\*intensityScale\)/);
  assert.match(css, /--heartbeat-strength:1/);
  assert.match(css, /calc\(\.68 \* var\(--heartbeat-strength\)\)/);
});
