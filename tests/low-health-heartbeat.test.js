const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const js = fs.readFileSync(path.join(root, "src", "game.js"), "utf8");
const index = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "src", "style.css"), "utf8");

test("low-health heartbeat has a persistent settings toggle enabled by default", () => {
  assert.match(js, /lowHealthHeartbeatEnabled=localStorage\.getItem\("galaxyDefenderLowHealthHeartbeat"\)!=="off"/);
  assert.match(index, /id="uiLowHealthHeartbeat"/);
  assert.match(index, /פעימות ❤️/);
  assert.match(js, /localStorage\.setItem\("galaxyDefenderLowHealthHeartbeat",lowHealthHeartbeatEnabled\?"on":"off"\)/);
});

test("heartbeat appears at low health and stays active in Impossible until max-lives upgrade", () => {
  assert.match(js, /const impossibleAlways=difficulty==="impossible"&&maxLivesLevel===0/);
  assert.match(js, /\(impossibleAlways\|\|ratio<=\.49\)/);
  assert.match(js, /maxLivesLevel===0/);
  assert.match(js, /case"maxLives":maxLivesLevel\+\+;player\.maxLives\+\+;player\.lives\+\+/);
});

test("heartbeat pulse does not add screen shake; hit-effects setting stays separate", () => {
  assert.ok(!js.includes("return hitEffectsEnabled?severity*severity*10*beat"));
  assert.match(js, /if\(!hitEffectsEnabled\)\{screenShakePower=0;screenShakeUntil=0;canvas\.style\.transform=""\}/);
  assert.match(js, /heartbeatShake=updateLowHealthHeartbeat\(now\)/);
});

test("heartbeat overlay does not block gameplay or the HUD", () => {
  assert.match(index, /id="lowHealthHeartbeatOverlay" aria-hidden="true"/);
  assert.match(css, /#lowHealthHeartbeatOverlay\{[^}]*pointer-events:none/);
  assert.match(css, /#lowHealthHeartbeatOverlay\{[^}]*z-index:19/);
});

test("heartbeat uses a CSS pulse and does not shake or stall the canvas", () => {
  assert.ok(js.includes("function updateLowHealthHeartbeat(now)"));
  assert.ok(js.includes("return 0}\nlet speedComboDistance"));
  assert.ok(!js.includes("return hitEffectsEnabled?severity*severity*10*beat"));
  assert.ok(css.includes("@keyframes lowHealthHeartbeatPulse"));
  assert.ok(css.includes('#lowHealthHeartbeatOverlay[data-severity]:not([data-severity="0"])'));
  assert.ok(css.includes("pointer-events:none"));
});
