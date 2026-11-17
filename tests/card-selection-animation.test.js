const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const root = path.join(__dirname, "..");
const game = fs.readFileSync(path.join(root, "src", "game.js"), "utf8");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "src", "style.css"), "utf8");
const translations = fs.readFileSync(path.join(root, "src", "translations.js"), "utf8");

test("LEVEL UP and both card animations have two separate settings panels", () => {
  assert.match(html, /id="openLevelUpAnimationButton"/);
  assert.match(html, /id="openCardAnimationsButton"/);
  assert.match(html, /id="levelUpAnimationSettingsOverlay"/);
  assert.match(html, /id="cardAnimationsSettingsOverlay"/);
  assert.match(html, /id="cardAppearanceAnimationEnabled"/);
  assert.match(html, /id="cardSelectionAnimationEnabled"/);
  assert.ok(game.includes('renderLevelUpAnimationSettings();levelUpAnimationOverlay.style.display="flex"'));
  assert.ok(game.includes('renderCardAnimationsSettings();cardAnimationsSettingsOverlay.style.display="flex"'));
});

test("card selection animation is enabled by default and its speed and toggle persist", () => {
  assert.match(game, /galaxyDefenderCardSelectionAnimation/);
  assert.match(game, /enabled:saved.enabled!==false/);
  assert.ok(game.includes("speed:Math.max(.5,Math.min(2.5"));
  assert.match(game, /saveCardSelectionAnimationSettings()/);
});

test("selecting a card moves it to the center, grows it moderately, shrinks the others, then fades it", () => {
  assert.match(css, /cardSelectionActive.cardSelectionGrow/);
  assert.match(css, /left:50%/);
  assert.match(css, /width:min\(340px,75vw\)/);
  assert.match(css, /height:min\(440px,75vh\)/);
  assert.match(css, /cardSelectionAway/);
  assert.match(css, /cardSelectionActive.cardSelectionFade/);
  assert.match(game, /moveMs=Math.max/);
});

test("the upgrade is applied only after the selection animation, while disabling it keeps selection immediate", () => {
  assert.ok(game.includes("playCardSelectionAnimation(card,finish)"));
  assert.ok(game.includes("function completeUpgradeSelection(upgrade)"));
  assert.ok(game.includes("if(cardSelectionAnimationSettings.enabled)playCardSelectionAnimation"));
  assert.match(translations, /🃏 אנימציית בחירת קלף/);
});

test("card reveal speed and enable state are independent of LEVEL UP animation settings", () => {
  assert.match(game, /galaxyDefenderCardAppearanceAnimation/);
  assert.match(game, /cardAppearanceAnimationSettings\.speed/);
  assert.match(game, /if\(!cardAppearanceAnimationSettings\.enabled\)return/);
  assert.match(html, /id="cardAppearanceAnimationSpeed"/);
});

test("card-choice opacity controls the frozen game backdrop from black to clear", () => {
  assert.match(html, /id="cardSelectionOpacity" type="range" min="0" max="100"/);
  assert.match(game, /cardSelectionAnimationSettings\.opacity/);
  assert.match(game, /--card-choice-shade/);
  assert.match(game, /--card-choice-blur/);
  assert.match(css, /backdrop-filter:blur\(var\(--card-choice-blur,0px\)\)/);
  assert.match(game, /if\(!levelUpOpen\|\|levelUpSlowMotionActive\)draw\(\)/);
});


test("card-animation settings launcher has a capture-phase click fallback and a reachable modal layer", () => {
  assert.match(game, /openCardAnimationsButton\.addEventListener\("click"[\s\S]*capture:true/);
  assert.match(css, /#cardAnimationsSettingsOverlay\{position:fixed;inset:0;z-index:420!important;pointer-events:auto\}/);
});


test("card appearance settings expose all six selectable styles, combined mode, and visual effect toggles",()=>{for(const value of ["flip","energy","side","reveal","rarityPulse","rise","all"])assert.match(html,new RegExp("value=\""+value+"\""));for(const id of ["cardAppearanceFlash","cardAppearanceGlow","cardAppearanceParticles","cardAppearanceRarityColors"])assert.ok(html.includes("id=\""+id+"\""));assert.match(game,/cardAppearanceAnimationSettings\.style/);assert.match(game,/cardAppearParticles/);assert.match(css,/@keyframes cardAppearFlip/);assert.match(css,/@keyframes cardAppearAll/)});
