const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const game = fs.readFileSync(path.join(root, "src", "game.js"), "utf8");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "src", "style.css"), "utf8");

test("Ultra Laser is a separate Ultra-rarity card and requires Ultra Mode unlock", () => {
  assert.match(game, /id:"ultraLaser",rarity:"אולטרה",rarityClass:"ultra",icon:"🌈",title:"אולטרה לייזר"/);
  assert.match(game, /u\.id==="ultraLaser"&&\(!ultraUnlocked\|\|ultraLaserUnlocked\)/);
  assert.match(game, /case"ultraLaser":if\(ultraUnlocked\)\{ultraLaserUnlocked=true/);
});

test("Ultra Laser button is present and separately styled", () => {
  assert.match(html, /id="ultraLaserButton"/);
  assert.match(css, /#ultraLaserButton\{display:none/);
  assert.match(css, /#ultraLaserButton\.disabled/);
});

test("Ultra Laser uses the agreed 10-second, 750 DPS, 500 points/second and 20-second cooldown", () => {
  assert.match(game, /elapsed>=10/);
  assert.match(game, /targetSpent=Math\.min\(5000,elapsed\*500\)/);
  assert.match(game, /damage=750\*dt/);
  assert.match(game, /ultraLaserCooldownUntil=now\+20000/);
});

test("Ultra Laser damages targets along the mouse-aimed beam and draws a fading rainbow", () => {
  assert.match(game, /function updateUltraLaser\(\)/);
  assert.match(game, /mouse\.x-player\.x,dy=mouse\.y-player\.y/);
  assert.match(game, /function drawUltraLaser\(\)/);
  assert.match(game, /ultraLaserFadeUntil-now\)\/500/);
});

test("Ultra Laser cannot start without 5,000 points and stops dealing damage at 10 seconds", () => {
  assert.match(game, /if\(ultraPoints<5000\)\{showMessage/);
  assert.match(game, /if\(elapsed>=10\)\{ultraLaserActive=false/);
  assert.match(game, /if\(!ultraLaserActive\|\|!gameRunning\)return/);
});
