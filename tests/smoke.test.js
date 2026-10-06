const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const index = fs.readFileSync(path.join(root, "index.html"), "utf8");
const js = fs.readFileSync(path.join(root, "src", "game.js"), "utf8");
const css = fs.readFileSync(path.join(root, "src", "style.css"), "utf8");

test("split project has the expected entry files", () => {
  assert.match(index, /src\/style\.css/);
  assert.match(index, /src\/game\.js/);
  assert.equal((index.match(/<script/g) || []).length, 2);
  assert.match(index, /cdn\.jsdelivr\.net\/npm\/\@supabase\/supabase-js/);
});

test("game JavaScript keeps permanent combo across hits", () => {
  assert.match(js, /speedComboPermanentDistance/);
  assert.match(js, /permanent combo/);
  assert.match(js, /NEVER resets/);
  assert.match(js, /resetTemporarySpeedCombo/);
});

test("amazing achievements have the requested definitions, rewards, and tracking", () => {
  assert.match(js, /id:"amazingCard1",tier:"legendary"/);
  assert.match(js, /id:"amazingCards10",tier:"amazing"/);
  assert.match(js, /id:"legendaryCards25",tier:"amazing"/);
  assert.match(js, /id:"epicCards50",tier:"amazing"/);
  assert.match(js, /id:"rareCards75",tier:"amazing"/);
  assert.match(js, /id:"commonCards150",tier:"amazing"/);
  assert.match(js, /id:"levels150",tier:"amazing"/);
  assert.match(js, /id:"level100",tier:"amazing"/);
  assert.match(js, /id:"specialBoss25",tier:"amazing"/);
  assert.match(js, /id:"boss50",tier:"amazing"/);
  assert.match(js, /id:"impossible1500",tier:"amazing"/);
  assert.match(js, /id:"impossibleBoss1",tier:"amazing"/);
  assert.match(js, /id:"m25000",tier:"amazing"/);
  assert.match(js, /id:"enemy2500",tier:"amazing"/);
  assert.match(js, /id:"meteor2500",tier:"amazing"/);
  assert.match(js, /amazing:\s*5000/);
  assert.match(js, /amazing:500/);
  assert.match(js, /tierCounts\.amazing/);
  assert.match(css, /achievementCard\.amazing/);
  assert.match(css, /achievementRed/);
});

test("achievement stats track special and impossible bosses", () => {
  assert.match(js, /specialBosses:0/);
  assert.match(js, /impossibleBosses:0/);
  assert.match(js, /ach\.specialBosses\+\+/);
  assert.match(js, /ach\.impossibleBosses\+\+/);
});

test("game assets are non-empty", () => {
  assert.ok(js.length > 10000);
  assert.ok(css.length > 1000);
  assert.ok(index.length > 1000);
});

test("poison upgrade keeps its requested scaling", () => {
  assert.match(js, /id:"poison",rarity:"אדיר",rarityClass:"epic"/);
  assert.match(js, /enemy\.poisonTimeLeft=4/);
  assert.match(js, /enemy\.poisonTickTimer=1/);
  assert.match(js, /enemy\.maxHealth\*\.05\*enemy\.poisonStrength/);
  assert.match(js, /case"poison":poisonLevel\+\+/);
});

test("stackable upgrade cards show Roman numeral levels while unlock-only cards do not", () => {
  assert.match(js, /const numberedUpgradeIds=new Set\(\["damage"/);
  assert.match(js, /function getUpgradeLevel\(id\)/);
  assert.match(js, /case"poison":return poisonLevel/);
  assert.match(js, /return upgrade\.title\+" "\+toRomanNumeral\(getUpgradeLevel\(upgrade\.id\)\+1\)/);
  assert.match(js, /function toRomanNumeral\(value\)/);
  assert.match(js, /function getUpgradeCardTitle\(upgrade\)/);
});
