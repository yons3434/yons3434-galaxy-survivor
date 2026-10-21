const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const game = fs.readFileSync(path.join(__dirname, "../src/game.js"), "utf8");
const html = fs.readFileSync(path.join(__dirname, "../index.html"), "utf8");

test("minigun is fully removed from game logic and mobile controls", () => {
  assert.doesNotMatch(game, /minigun|מיניגאן|shootMinigun/i);
  assert.doesNotMatch(html, /minigun|מיניגאן/i);
});

test("weapon number controls are compacted after removing minigun", () => {
  assert.match(game, /Digit1"\|\|e\.key==="1"\)\{switchWeapon\("pistol"\)/);
  assert.match(game, /Digit2"\|\|e\.key==="2"\)\{switchWeapon\("rpg"\)/);
  assert.match(game, /Digit3"\|\|e\.key==="3"\)\{switchWeapon\("shotgun"\)/);
  assert.match(game, /Digit4"\|\|e\.key==="4"\)\{switchWeapon\("flamethrower"\)/);
  assert.match(game, /Digit5"\|\|e\.key==="5"\)\{switchWeapon\("laser"\)/);
  assert.match(game, /Digit6"\|\|e\.key==="6"\)\{switchWeapon\("blackHole"\)/);
  assert.match(game, /1 — אקדח \| 2 — RPG \| 3 — שוטגאן/);
  assert.match(game, /4 — להביור \| 5 — לייזר \| 6 — רובה חור שחור/);
});

test("mobile weapon buttons use the same order as keyboard controls", () => {
  const weapons = [...html.matchAll(/class="mobileWeaponBtn" data-weapon="([^"]+)"/g)].map(m => m[1]);
  assert.deepEqual(weapons, ["pistol", "rpg", "shotgun", "flamethrower", "laser", "blackHole"]);
});
