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

test("Ultra Laser costs 5,000 points over 10 seconds and has a 20-second cooldown", () => {
  assert.match(game, /elapsed>=10/);
  assert.match(game, /targetSpent=Math\.min\(5000,elapsed\*500\)/);
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

test("Ultra Laser effects scale with Ultra Mode and bosses are not pushed", () => {
  assert.match(game, /baseDps=laserHeatLevel>0/);
  assert.match(game, /ultraModeActive\?5:2/);
  assert.match(game, /const thickness=\(12\+laserHeat\*3\)\*\(ultraModeActive\?3:1\)/);
  assert.match(game, /ultraLaserActive&&ultraModeActive\)v\*=\.5/);
  assert.match(game, /if\(ultraModeActive&&!isBoss\)/);
  assert.match(game, /if\(ultraModeActive\)\{\s*\/\/ Only the empowered Ultra Laser deflects hostile projectiles\./);
});

test("Ultra Laser matches the regular laser's heat-dependent thickness and triples it only in Ultra Mode", () => {
  assert.match(game, /const thickness=\(12\+laserHeat\*3\)\*\(ultraModeActive\?3:1\)/);
  assert.match(game, /ctx\.lineWidth=\(thickness-i\*\(thickness\/11\)\)\*1/);
});
