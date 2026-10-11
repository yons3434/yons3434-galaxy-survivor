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
  assert.equal((index.match(/<script/g) || []).length, 3);
  assert.match(index, /src\/burn\.js/);
  assert.ok(index.indexOf("src/burn.js") < index.indexOf("src/game.js"));
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

test("burn upgrade is legendary, stackable, and has an animated effect", () => {
  assert.match(js, /id:"burn",rarity:"אגדי",rarityClass:"legendary",icon:"🔥",title:"צריבה"/);
  assert.match(js, /case"burn":return burnLevel/);
  assert.match(js, /case"burn":burnLevel=Math\.min\(GalaxyBurn\.maxLevel,burnLevel\+1\)/);
  assert.match(js, /function applyBurn\(target,continuous=false\)/);
  assert.match(js, /function updateBurn\(\)/);
  assert.match(js, /function drawBurnEffect\(target,size,isSquare\)/);
  assert.match(js, /applyBurn\(enemy\)/);
  assert.match(js, /burnLevel>=GalaxyBurn\.maxLevel/);
});

test("poison upgrade keeps its requested scaling", () => {
  assert.match(js, /id:"poison",rarity:"אדיר",rarityClass:"epic"/);
  assert.match(js, /enemy\.poisonUntil=now\+4000/);
  assert.match(js, /enemy\.poisonNextTickAt=now\+1000/);
  assert.match(js, /target\.maxHealth\*\.05\*target\.poisonStrength/);
  assert.match(js, /case"poison":poisonLevel\+\+/);
});

test("stackable upgrade cards show Roman numeral levels while unlock-only cards do not", () => {
  assert.match(js, /const numberedUpgradeIds=new Set\(\["damage"/);
  assert.match(js, /function getUpgradeLevel\(id\)/);
  assert.match(js, /case"poison":return poisonLevel/);
  assert.match(js, /toRomanNumeral\(level\+1\)/);
  assert.match(js, /return level<=0\?upgrade\.title/);
  assert.match(js, /function toRomanNumeral\(value\)/);
  assert.match(js, /function getUpgradeCardTitle\(upgrade\)/);
});


test("pause card list merges repeated picks and extra-fire starts at II", () => {
  assert.match(js, /function getSelectedUpgradeCardTitle\(upgrade,count\)/);
  assert.match(js, /if\(upgrade\.id==="extraFire"\)return upgrade\.title\+" "\+toRomanNumeral\(count\+1\)/);
  assert.match(js, /const grouped=\[\];/);
  assert.match(js, /byId\.set\(upgrade\.id,group\)/);
  assert.match(js, /group\.count\+\+/);
  assert.match(js, /getSelectedUpgradeCardTitle\(upgrade,count\)/);
});


test("upgrade card titles number only stackable upgrades", () => {
  assert.match(js, /const numberedUpgradeIds=new Set\(\["damage","fireRate","maxLives","speed","extraFire","splitBullet","xpBoost","luck","dodge","piercing","sword","levelHeal","homing","chainLightning","lowHealthRage","poison","burn","freeze","stun","confusion","continuousFire","expandedChoice","vortex"\]\)/);
  assert.match(js, /function getUpgradeCardTitle\(upgrade\)/);
  assert.match(js, /toRomanNumeral\(level\+1\)/);
  assert.match(js, /id:"drone"/);
  assert.doesNotMatch(js, /numberedUpgradeIds=new Set\(\[[^\]]*"drone"/);
  assert.doesNotMatch(js, /numberedUpgradeIds=new Set\(\[[^\]]*"rpg"/);
  assert.doesNotMatch(js, /numberedUpgradeIds=new Set\(\[[^\]]*"shotgun"/);
  assert.doesNotMatch(js, /numberedUpgradeIds=new Set\(\[[^\]]*"fullHeal"/);
  assert.doesNotMatch(js, /numberedUpgradeIds=new Set\(\[[^\]]*"healOne"/);
});


test("split bullet upgrade is legendary, stackable, transparent, and limited to three generations", () => {
  assert.doesNotMatch(js, /id:"extraRow"/);
  assert.match(js, /id:"splitBullet",rarity:"אגדי",rarityClass:"legendary",icon:"🔱",title:"קליע מפוצל"/);
  assert.match(js, /let damageLevel=0,speedLevel=0,fireRateLevel=0,maxLivesLevel=0,extraFireLevel=0,splitBulletLevel=0/);
  assert.match(js, /const numberedUpgradeIds=new Set\(\["damage","fireRate","maxLives","speed","extraFire","splitBullet"/);
  assert.match(js, /case"splitBullet":return splitBulletLevel/);
  assert.match(js, /case"splitBullet":splitBulletLevel\+\+/);
  assert.match(js, /function getSplitBulletCount\(\)\{return Math\.max\(0,splitBulletLevel\+1\)\}/);
  assert.match(js, /function getSplitBulletSpread\(\)\{return \(20\+Math\.max\(0,splitBulletLevel-1\)\*5\)\*Math\.PI\/180\}/);
  assert.match(js, /function getSplitBulletSpeedMultiplier\(\)\{return 1\+Math\.max\(0,Math\.min\(9,splitBulletLevel-1\)\)\*\.1\}/);
  assert.match(js, /function getSplitBulletRangeMultiplier\(\)\{return getSplitBulletSpeedMultiplier\(\)\}/);
  assert.match(js, /function getSplitBulletSizeMultiplier\(\)\{return 1\+Math\.max\(0,Math\.min\(9,splitBulletLevel-1\)\)\*\.05\}/);
  assert.match(js, /function getSplitBulletAlpha\(generation\)\{return generation<=0\?1:generation===1\?\.75:generation===2\?\.5:\.25\}/);
  assert.match(js, /const chance=\(generation===1\?\.05:\.01\)\*Math\.min\(10,splitBulletLevel\)/);
  assert.match(js, /if\(generation>=3\)return false/);
  assert.match(js, /const levelValue=Math\.max\(1,splitBulletLevel\),count=getSplitBulletCount\(\),generation=Math\.min\(3,\(Number\(b\.splitGeneration\)\|\|0\)\+1\)/);
  assert.match(js, /childDamage=b\.damage\*levelValue\/count/);
  assert.match(js, /splitMaxTravel:maxTravel/);
  assert.match(js, /if\(b\.blackHole\)\{b\.dead=true;spawnBlackHole\(b\.x,b\.y\);return\}/);
  assert.match(js, /if\(b\.rpg\)\{b\.dead=true;rpgExplosion\(b\.x,b\.y,b\.rpgMini===true\);return\}/);
  assert.match(js, /if\(shouldSplitBullet\(b\)\)\{b\.dead=true;spawnSplitBullets\(b\);return\}/);
  assert.match(js, /bullets\.forEach\(b=>\{ctx\.save\(\);ctx\.globalAlpha=getSplitBulletAlpha/);
});

test("confusion upgrade card is removed", () => {
  assert.doesNotMatch(js, /id:"confusion"/);
});

test("Escape closes overlays or pauses without exiting the game", () => {
  assert.match(js, /function handleEscapeKey\(\)\{/);
  assert.match(js, /if\(e\.key==="Escape"\)\{e\.preventDefault\(\);handleEscapeKey\(\);return\}/);
  assert.match(js, /if\(!gameStarted\|\|levelUpOpen\|\|gameOverScreen\.style\.display==="flex"\)return/);
  assert.match(js, /if\(!paused\)togglePause\(\)/);
  assert.match(js, /Esc — סגירת חלון פתוח או עצירת המשחק/);
  assert.match(js, /if\(key==="p"\)\{e\.preventDefault\(\);if\(gameStarted\)togglePause\(\);return\}/);
});;

test("core game buttons remain present after gameplay changes", () => {
  for (const id of [
    "startButton",
    "profileButton",
    "homeDailyMissions",
    "leaderboardButton",
    "collectionButton",
    "homeButton",
    "achievementsButton",
    "helpButton",
    "restartButton",
  ]) {
    assert.match(index, new RegExp(`id="${id}"`));
  }
});


test("stun upgrade is epic, stackable, stuns bosses, and does not apply from swords", () => {
  assert.match(js, /id:"stun",rarity:"אדיר",rarityClass:"epic"/);
  assert.match(js, /function getStunChance\(\)\{return Math\.min\(1,\.05\*Math\.pow\(1\.5/);
  assert.match(js, /function getStunDuration\(\)\{return 1000\*Math\.pow\(1\.5/);
  assert.match(js, /function isStunnedEnemy\(enemy\)\{return !!\(enemy&&enemy\.health>0&&enemy\.stunnedUntil>performance\.now\(\)\)\}/);
  assert.match(js, /function applyStun\(enemy\)\{if\(stunLevel<=0\|\|!enemy\|\|enemy\.health<=0\|\|isStunnedEnemy\(enemy\)\)return false/);
  assert.match(js, /function updateStunnedEnemy\(enemy\)/);
  assert.match(js, /\*\.15\)/);
  assert.match(js, /Math\.PI\*2\/.2/);
  assert.match(js, /case"stun":return stunLevel/);
  assert.match(js, /case"stun":stunLevel\+\+/);
  assert.match(js, /"poison","burn","freeze","stun","confusion"/);
  assert.match(js, /if\(updateStunnedEnemy\(enemy\)\)return;/);
  assert.match(js, /enemy\.health-=getContinuousFireDamage\(enemy,b\.damage,b,performance\.now\(\)\);applyPoison\(enemy\);applyFreeze\(enemy\);applyStun\(enemy\);applyBurn\(enemy\);/);
  assert.doesNotMatch(js, /enemy\.health-=swordDamage\([^;]+\);applyPoison\(enemy\);applyFreeze\(enemy\);applyStun\(enemy\)/);
  assert.match(js, /if\(enemy\.boss\)\{\s*if\(updateStunnedEnemy\(enemy\)\)return;/);
});


test("poison, freeze, and stun also affect meteors while confusion remains enemy-only", () => {
  assert.match(js, /asteroids\.forEach\(a=>tickTarget\(a,destroyAsteroid\)/);
  assert.match(js, /a\.health-=getContinuousFireDamage\(a,b\.damage,b,performance\.now\(\)\);applyPoison\(a\);applyFreeze\(a\);applyStun\(a\);applyBurn\(a\);/);
  assert.match(js, /asteroids\.forEach\(a=>\{\n    if\(a\.health<=0\)return;\n    if\(updateStunnedEnemy\(a\)\)return;/);
  assert.match(js, /const freezeFactor=getEnemyFreezeFactor\(a\)/);
  assert.match(js, /applyPoison\(a\);applyFreeze\(a\)/);
  assert.match(js, /function applyConfusion\(enemy\).*enemy\.boss/);
  assert.doesNotMatch(js, /applyConfusion\(a\)/);
});


test("expanded choice card adds one level-up option per pick up to six, then disappears for the current game", () => {
  assert.match(js, /id:"expandedChoice",rarity:"אדיר",rarityClass:"epic",icon:"🃏",title:"בחירה מורחבת"/);
  assert.match(js, /"continuousFire","expandedChoice"\]\)/);
  assert.match(js, /case"expandedChoice":return expandedChoiceLevel/);
  assert.match(js, /const choices=\[\],choiceCount=Math\.min\(6,3\+expandedChoiceLevel\)/);
  assert.match(js, /u\.id==="expandedChoice"&&expandedChoiceLevel>=3/);
  assert.match(js, /case"expandedChoice":expandedChoiceLevel=Math\.min\(3,expandedChoiceLevel\+1\)/);
  assert.match(js, /expandedChoiceLevel=0;distance=0/);
  assert.match(js, /upgrade\.id==="expandedChoice"&&expandedChoiceLevel===2\?'[^']*מקסימום!/);
  assert.match(css, /\.upgradeMaxLabel/);
});


test("vortex upgrade attracts player bullets, damages affected targets, and scales chance and duration", () => {
  assert.match(js, /id:"vortex",rarity:"אדיר",rarityClass:"epic",icon:"🌀",title:"מערבולת"/);
  assert.match(js, /"continuousFire","expandedChoice","vortex"\]\)/);
  assert.match(js, /case"vortex":return vortexLevel/);
  assert.match(js, /function getVortexChance\(\)\{return Math\.min\(\.6,\.1\+\.05\*Math\.max\(0,vortexLevel-1\)\)\}/);
  assert.match(js, /function getVortexDuration\(\)\{return Math\.min\(10000,3000\+1000\*Math\.max\(0,vortexLevel-1\)\)\}/);
  assert.match(js, /function applyVortex\(target\)/);
  assert.match(js, /function pullBulletTowardVortex\(b\)/);
  assert.match(js, /pullBulletTowardVortex\(b\)/);
  assert.match(js, /if\(!absorbedByVortex\)applyVortex\(a\)/);
  assert.match(js, /if\(!absorbedByVortex\)applyVortex\(enemy\)/);
  assert.match(js, /function drawVortexEffect\(target,size,isSquare\)/);
  assert.match(js, /drawVortexEffect\(a,a\.size,false\)/);
  assert.match(js, /drawVortexEffect\(enemy,size,true\)/);
  assert.match(js, /case"vortex":vortexLevel\+\+/);
  assert.match(js, /vortexLevel=0;distance=0/);
});
