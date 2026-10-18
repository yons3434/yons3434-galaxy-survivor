const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.join(__dirname, "..");
const game = fs.readFileSync(path.join(root, "src", "game.js"), "utf8");
const moduleSource = fs.readFileSync(path.join(root, "src", "ultra-mini-ships.js"), "utf8");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "src", "style.css"), "utf8");

test("Ultra Mini Spaceship is loaded after the game and has its own button", () => {
  assert.match(html, /id="ultraMiniShipButton"/);
  assert.match(html, /src="src\/ultra-mini-ships\.js"/);
  assert.ok(html.indexOf('src="src/game.js"') < html.indexOf('src="src/ultra-mini-ships.js"'));
  assert.match(css, /#ultraMiniShipButton\{display:none/);
});

test("Ultra Mini Spaceship is an Ultra card unlocked only after Ultra Mode", () => {
  assert.match(moduleSource, /id: "ultraMiniShip"/);
  assert.match(moduleSource, /if \(upgrade\.id === "ultraMode"\) addCard\(\)/);
  assert.match(moduleSource, /if \(ultraUnlocked && ultraMiniShipLevel < MAX_LEVEL\) addCard\(\)/);
  assert.match(moduleSource, /const MAX_LEVEL = 5/);
});

test("Normal mini-ships use an independent elliptical orbit and 3-second laser bursts", () => {
  assert.match(moduleSource, /SHIP_ORBIT_X = 112/);
  assert.match(moduleSource, /SHIP_ORBIT_Y = 72/);
  assert.match(moduleSource, /SHOT_INTERVAL_MS = 3000/);
  assert.match(moduleSource, /SHOT_DURATION_MS = 500/);
  assert.match(moduleSource, /STOP_DURATION_MS = 700/);
  assert.match(moduleSource, /NORMAL_DPS = 300/);
});

test("Ultra Mini Spaceship costs 3,000 points and ends on the twentieth connection", () => {
  assert.match(moduleSource, /POINT_COST = 3000/);
  assert.match(moduleSource, /MAX_CONNECTIONS = 20/);
  assert.match(moduleSource, /ultraMiniConnections \+= 1/);
  assert.match(moduleSource, /ultraMiniConnections >= MAX_CONNECTIONS/);
  assert.match(moduleSource, /COOLDOWN_MS = 20000/);
});

test("Ultra beams stay attached, deal continuous damage, and draw rainbow links", () => {
  assert.match(moduleSource, /ship\.beams\.forEach\(beam =>/);
  assert.match(moduleSource, /ULTRA_DPS \* dt/);
  assert.match(moduleSource, /hsl\(\$\{hue\},100%,65%\)/);
  assert.match(moduleSource, /beam\.target\.health > 0/);
});

test("Ultra Mini Spaceship button is disabled without enough points or during cooldown", () => {
  assert.match(moduleSource, /ultraPoints < POINT_COST/);
  assert.match(moduleSource, /ultraMiniCooldownUntil/);
  assert.match(moduleSource, /button\.disabled = unavailable/);
});

test("Ultra Mini Spaceship script parses as valid JavaScript", () => {
  assert.doesNotThrow(() => new vm.Script(moduleSource, { filename: "src/ultra-mini-ships.js" }));
});
