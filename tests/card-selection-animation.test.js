const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const root = path.join(__dirname, "..");
const game = fs.readFileSync(path.join(root, "src", "game.js"), "utf8");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "src", "style.css"), "utf8");
const translations = fs.readFileSync(path.join(root, "src", "translations.js"), "utf8");

test("card appearance and card selection settings share the existing animation button and panel", () => {
  assert.match(html, /id="openLevelUpAnimationButton"/);
  assert.match(html, /🃏 אנימציות קלפים/);
  assert.match(html, /id="levelUpAnimationSettingsOverlay"/);
  assert.match(html, /id="cardSelectionAnimationEnabled"/);
  assert.match(html, /id="cardSelectionAnimationSpeed"/);
  assert.match(game, /renderLevelUpAnimationSettings();levelUpAnimationOverlay.style.display="flex"/);
});

test("card selection animation is enabled by default and its speed and toggle persist", () => {
  assert.match(game, /galaxyDefenderCardSelectionAnimation/);
  assert.match(game, /enabled:saved.enabled!==false/);
  assert.match(game, /speed:Math.max\\(\\.5,Math.min\\(2\\.5/);
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
  assert.match(game, /playCardSelectionAnimation(card,finish)/);
  assert.match(game, /function completeUpgradeSelection(upgrade)/);
  assert.match(game, /if(cardSelectionAnimationSettings.enabled)playCardSelectionAnimation/);
  assert.match(translations, /🃏 אנימציית בחירת קלף/);
});
