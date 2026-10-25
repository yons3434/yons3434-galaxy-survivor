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

test("heartbeat screen shake obeys the existing hit-effects setting", () => {
  assert.match(js, /return hitEffectsEnabled\?severity\*severity\*10\*beat:0/);
  assert.match(js, /if\(!hitEffectsEnabled\)\{screenShakePower=0;screenShakeUntil=0;canvas\.style\.transform=""\}/);
  assert.match(js, /heartbeatShake=updateLowHealthHeartbeat\(now\)/);
});

test("heartbeat overlay does not block gameplay or the HUD", () => {
  assert.match(index, /id="lowHealthHeartbeatOverlay" aria-hidden="true"/);
  assert.match(css, /#lowHealthHeartbeatOverlay\{[^}]*pointer-events:none/);
  assert.match(css, /#lowHealthHeartbeatOverlay\{[^}]*z-index:19/);
});

test("heartbeat red edges are stronger and spread farther as severity increases", () => {\n  assert.match(js, /const spread=12\\+Math\\.pow\\(severity,\\.8\\)\\*43/);\n  assert.match(js, /const strength=\\.62\\+\\.38\\*beat/);\n  assert.match(js, /String\\(\\.62\\+\\.33\\*severity\\)/);\n  assert.match(css, /rgba\\(255,0,15,\\.72\\),transparent 58%/);\n});\n