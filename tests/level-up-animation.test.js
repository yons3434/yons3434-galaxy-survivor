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


test("upgrade cards appear only after the level-up animation fully ends", () => {
  assert.ok(game.includes("function animateLevelUpCards()"));
  assert.ok(game.includes('card.classList.add("levelUpCardEntering","cardAppear'));
  assert.ok(game.includes("const totalMs=2000/effects.speed;"));
  assert.ok(game.includes("},totalMs)"));
  assert.ok(game.includes('levelUpScreen.style.display="flex";applyCardChoiceBackdrop();animateLevelUpCards()'));
  assert.doesNotMatch(game, /revealStartMs|levelUpAnimationRevealTimer=setTimeout/);
  assert.ok(game.includes("index*90/speed"));
  assert.ok(css.includes("@keyframes levelUpCardAppear"));
  assert.ok(css.includes("opacity:0;transform:translateY(26px) scale(.88)"));
  assert.doesNotMatch(css, /\.upgradeCard\.levelUpCardEntering\{animation-duration:1ms/);
});

test("in-game LEVEL UP is optional, follows the player, ramps to 0.5x over the first quarter, then stays at 0.5x", () => {
  assert.match(html, /id="levelUpAnimationShowInGame"/);
  assert.match(game, /showInGame:saved\.showInGame===true/);
  assert.match(game, /overlay\.classList\.add\("in-game"\)/);
  assert.match(game, /positionLevelUpAnimationAtPlayer\(overlay\)/);
  assert.match(game, /levelUpSlowMotionDuration=totalMs/);
  assert.match(game, /rampDuration=Math\.max\(1,levelUpSlowMotionDuration\*\.25\)/);
  assert.match(game, /targetScale=Math\.max\(\.2,Math\.min\(1,\(Number\(levelUpAnimationSettings\.gameSpeed\)\|\|50\)\/100\)\)/);
  assert.match(game, /timeScale=1-\(1-targetScale\)\*rampProgress/);
  assert.match(game, /if\(rampProgress>=1\)timeScale=targetScale/);
  assert.match(game, /drawWithSlowMotionInterpolation\(updateAccumulator\/FIXED_UPDATE_STEP\)/);
  assert.match(game, /captureSlowMotionRenderState\(\)/);
  assert.doesNotMatch(game, /elapsed>=250\)\{levelUpSlowMotionActive=false;gameRunning=false/);
  assert.match(game, /gameRunning=inGame;updateAccumulator=0/);
  assert.match(game, /gameRunning=false/);
  assert.match(css, /#levelUpAnimationOverlay\.in-game/);
});


test("in-game LEVEL UP remains anchored to the ship and ends slow motion only when the animation ends", () => {
  assert.match(game, /levelUpAnimationInGameActive=effects\.showInGame===true/);
  assert.match(game, /if\(levelUpAnimationInGameActive\)[\s\S]*positionLevelUpAnimationAtPlayer/);
  assert.match(game, /const clockNow=performance\.now\(\)/);
  assert.match(game, /levelUpAnimationInGameActive=false;gameRunning=false;updateAccumulator=0/);
  assert.match(css, /#levelUpAnimationOverlay\.in-game\{z-index:900!important;background:transparent!important/);
});


test("in-game slow motion offers 100%, 50%, and 20% and interpolates rendered positions without reducing requestAnimationFrame frequency", () => {
  assert.match(html, /id="levelUpAnimationGameSpeed"[\s\S]*?<option value="100">[\s\S]*?<option value="50">[\s\S]*?<option value="20">/);
  assert.match(game, /gameSpeed:\[100,50,20\]\.includes\(Number\(saved\.gameSpeed\)\)\?Number\(saved\.gameSpeed\):50/);
  assert.match(game, /animationId=requestAnimationFrame\(gameLoop\)/);
  assert.match(game, /object\.x=previous\.x\+\(object\.x-previous\.x\)\*amount/);
  assert.match(game, /object\.y=previous\.y\+\(object\.y-previous\.y\)\*amount/);
});
