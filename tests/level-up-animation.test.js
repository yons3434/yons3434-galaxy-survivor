const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const root = path.join(__dirname, "..");
const game = fs.readFileSync(path.join(root, "src", "game.js"), "utf8");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "src", "style.css"), "utf8");

test("level-up animation settings are available from the game settings like the space-background picker", () => {
  assert.match(html, /id="openLevelUpAnimationButton"/);
  assert.match(html, /id="levelUpAnimationSettingsOverlay"/);
  assert.match(game, /openLevelUpAnimationButton\.onclick=/);
  assert.match(game, /closeLevelUpAnimationButton\.onclick=/);
});

test("level-up animation preferences persist with safe defaults and supported speed/color values", () => {
  assert.match(game, /galaxyDefenderLevelUpAnimation/);
  assert.match(game, /speed:Math\.max\(\.4,Math\.min\(2\.5/);
  assert.match(game, /\["gold","blue","purple"\]/);
  assert.match(game, /saveLevelUpAnimationSettings\(\)/);
});

test("level-up title is displayed for one second at normal speed and follows the speed setting", () => {
  assert.match(css, /@keyframes levelUpTitle/);
  assert.match(css, /20%\{opacity:1;transform:scale\(1\.12\)\}70%\{opacity:1/);
  assert.match(game, /2000\/effects\.speed/);
  assert.match(game, /2000\/effects\.speed/);
});

test("level-up effects can be toggled but the upgrade panel and card selection remain automatic", () => {
  assert.match(game, /effects\.flash\?"block":"none"/);
  assert.match(game, /effects\.ring\?"block":"none"/);
  assert.match(game, /effects\.title\?"block":"none"/);
  assert.match(game, /playLevelUpAnimation\(\)\}/);
  assert.match(game, /levelUpScreen\.style\.display="flex"/);
  assert.match(html, /חלון השדרוגים/);
  assert.match(html, /LEVEL UP/);
});


test("card selection animation is wired to a real browser animation timeline", () => {
  assert.match(game, /selectedCard\.animate\(\[/);
  assert.match(game, /targetWidth=Math\.min\(340,window\.innerWidth\*\.75\)/);
  assert.match(game, /targetHeight=Math\.min\(440,window\.innerHeight\*\.75\)/);
  assert.doesNotMatch(game, /prefers-reduced-motion: reduce/);
  assert.match(game, /cardSelectionAnimationHandle/);
});


test("upgrade cards reveal near the end of the level-up animation with staggered timing", () => {
  assert.ok(game.includes("function animateLevelUpCards()"));
  assert.ok(game.includes('card.classList.add("levelUpCardEntering")'));
  assert.ok(game.includes("const revealStartMs=1100/effects.speed;"));\n  assert.ok(game.includes("levelUpAnimationRevealTimer=setTimeout(()=>"));\n  assert.ok(game.includes("animateLevelUpCards()}},revealStartMs"));
  assert.ok(game.includes("index*90/speed"));
  assert.ok(css.includes("@keyframes levelUpCardAppear"));
  assert.ok(css.includes("opacity:0;transform:translateY(26px) scale(.88)"));
  assert.doesNotMatch(css, /\.upgradeCard\.levelUpCardEntering\{animation-duration:1ms/);
});
