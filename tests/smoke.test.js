const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const index = fs.readFileSync(path.join(root, "index.html"), "utf8");
const js = fs.readFileSync(path.join(root, "src", "game.js"), "utf8");
const css = fs.readFileSync(path.join(root, "src", "style.css"), "utf8");

test("game simulation uses a fixed 60 FPS timestep independent of display refresh rate", () => {
  assert.match(js, /const FIXED_UPDATE_STEP=1000\/60/);
  assert.match(js, /const frameDelta=Math\.min\(MAX_FRAME_DELTA,Math\.max\(0,frameNow-lastFrameTimestamp\)\)/);
  assert.match(js, /while\(updateAccumulator>=FIXED_UPDATE_STEP&&updateSteps<MAX_CATCH_UP_STEPS\)\{update\(\);updateAccumulator-=FIXED_UPDATE_STEP;updateSteps\+\+\}/);
  assert.match(js, /requestAnimationFrame\(gameLoop\)/);
});

test("split project has the expected entry files", () => {
  assert.match(index, /src\/style\.css/);
  assert.match(index, /src\/game\.js/);
  assert.equal((index.match(/<script/g) || []).length, 9);
  assert.match(index, /src\/luck\.js/);
  assert.ok(index.indexOf("src/luck.js") < index.indexOf("src/game.js"));
  assert.match(index, /src\/chain-explosion\.js/);
  assert.ok(index.indexOf("src/chain-explosion.js") < index.indexOf("src/game.js"));
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
  assert.match(js, /function applyBurn\(target,continuous=false,hitDamage=effectiveDamage\(\)\)/);
  assert.match(js, /function updateBurn\(\)/);
  assert.match(js, /function drawBurnEffect\(target,size,isSquare\)/);
  assert.match(js, /applyBurn\(enemy,false,hitDamage\)/);
  assert.match(js, /burnLevel>=GalaxyBurn\.maxLevel/);
});

test("poison upgrade keeps its agreed permanent stacking mechanics", () => {
  assert.match(js, /id:"poison",rarity:"אדיר",rarityClass:"epic"/);
  assert.match(js, /target\.poisonStrength\+=\(\(1-target\.poisonStrength\)\*\.1\)/);
  assert.match(js, /target\.poisonIntervalMs=Math\.max/);
  assert.match(js, /target\.poisonNextTickAt=now\+initialInterval/);
  assert.match(js, /case"poison":poisonLevel=Math\.min\(9,poisonLevel\+1\)/);
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
  assert.match(js, /const numberedUpgradeIds=new Set\(\["damage","fireRate","maxLives","speed","extraFire","splitBullet","xpBoost","luck","dodge","piercing","sword","levelHeal","chainLightning","lowHealthRage","poison","burn","freeze","stun","confusion","continuousFire","expandedChoice","flamethrower","laserHeat","chainExplosion"\,\"deadlyLoot\"]\)/);
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

test("meteorites break into fading angular rock fragments and the effect can be toggled in settings", () => {
  assert.match(js, /function spawnMeteoriteFragments\(a\)/);
  assert.match(js, /meteoriteFragments\.push\(/);
  assert.match(js, /spawnMeteoriteFragments\(a\)/);
  assert.match(js, /meteoriteFragments\.forEach\(f=>\{/);
  assert.match(js, /galaxyDefenderMeteoriteBreakEffect/);
  assert.match(js, /uiMeteoriteBreak/);
  assert.match(index, /id="uiMeteoriteBreak"/);
});

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
  assert.match(js, /const hitDamage=getContinuousFireDamage\(enemy,b\.damage\*5\*piercingHit\.multiplier,b,performance\.now\(\)\);enemy\.health-=hitDamage;showDamageNumber\(enemy,hitDamage\);applyPoison\(enemy\);applyFreeze\(enemy\);applyStun\(enemy\);applyBurn\(enemy,false,hitDamage\);/);
  assert.doesNotMatch(js, /enemy\.health-=swordDamage\([^;]+\);applyPoison\(enemy\);applyFreeze\(enemy\);applyStun\(enemy\)/);
  assert.match(js, /if\(enemy\.boss\)\{\s*if\(updateStunnedEnemy\(enemy\)\)return;/);
});


test("poison, freeze, and stun also affect meteors while confusion remains enemy-only", () => {
  assert.match(js, /asteroids\.forEach\(a=>tickTarget\(a,destroyAsteroid\)/);
  assert.match(js, /const hitDamage=getContinuousFireDamage\(a,b\.damage\*5\*piercingHit\.multiplier,b,performance\.now\(\)\);a\.health-=hitDamage;showDamageNumber\(a,hitDamage\);applyPoison\(a\);applyFreeze\(a\);applyStun\(a\);applyBurn\(a,false,hitDamage\);/);
  assert.match(js, /asteroids\.forEach\(a=>\{\n    if\(a\.health<=0\)return;\n    if\(updateStunnedEnemy\(a\)\)return;/);
  assert.match(js, /const freezeFactor=getEnemyFreezeFactor\(a\)/);
  assert.match(js, /applyPoison\(a\);applyFreeze\(a\)/);
  assert.match(js, /function applyConfusion\(enemy\).*enemy\.boss/);
  assert.doesNotMatch(js, /applyConfusion\(a\)/);
});


test("expanded choice card adds one level-up option per pick up to six, then disappears for the current game", () => {
  assert.match(js, /id:"expandedChoice",rarity:"אדיר",rarityClass:"epic",icon:"🃏",title:"בחירה מורחבת"/);
  assert.match(js, /"continuousFire","expandedChoice","flamethrower","laserHeat","chainExplosion"\,\"deadlyLoot\"]\)/);
  assert.match(js, /case"expandedChoice":return expandedChoiceLevel/);
  assert.match(js, /const choices=window\.GalaxyLuck\.chooseUpgradeChoices\(availableFiltered,luckLevel,Math\.min\(6,3\+expandedChoiceLevel\)\)/);
  assert.match(js, /u\.id==="expandedChoice"&&expandedChoiceLevel>=3/);
  assert.match(js, /case"expandedChoice":expandedChoiceLevel=Math\.min\(3,expandedChoiceLevel\+1\)/);
  assert.match(js, /expandedChoiceLevel=0;[\s\S]*?ultraUnlocked=false;ultraModeActive=false;ultraPoints=0;ultraPointsCap=0;ultraSpentForShield=0;ultraShields=0;[\s\S]*?distance=0/);
  assert.match(js, /\(upgrade\.id==="expandedChoice"&&expandedChoiceLevel===2\)\|\|\(upgrade\.id==="flamethrower"&&flamethrowerLevel===9\)/);
  assert.match(css, /\.upgradeMaxLabel/);
});







test("red floating damage numbers show actual bullet damage, accumulate rapid hits, and can be toggled in settings", () => {
  assert.match(js, /function showDamageNumber\(target,damage\)/);
  assert.match(js, /entry\.amount=Math\.min\(entry\.startHealth,entry\.amount\+actualDamage\)/);
  assert.match(js, /now-n\.lastHitAt<=300/);
  assert.match(js, /ctx\.fillStyle="#ff3030"/);
  assert.match(js, /showDamageNumber\(a,hitDamage\)/);
  assert.match(js, /showDamageNumber\(enemy,hitDamage\)/);
  assert.match(js, /galaxyDefenderDamageNumbers/);
  assert.match(js, /uiDamageNumbers/);
  assert.match(index, /id="uiDamageNumbers"/);
});

test("normal enemies start at 100 health, meteorites have five times health, and bullet damage is multiplied by five", () => {
  assert.match(js, /const health=\(10\+size\*\.55\+distance\*\.004\)\*5\*difficultySettings\[difficulty\]\.enemyHP/);
  assert.match(js, /const health=\(100\+distance\*\.012\)\*difficultySettings\[difficulty\]\.enemyHP/);
  assert.match(js, /getContinuousFireDamage\(a,b\.damage\*5\*piercingHit\.multiplier,b,performance\.now\(\)\)/);
  assert.match(js, /getContinuousFireDamage\(enemy,b\.damage\*5\*piercingHit\.multiplier,b,performance\.now\(\)\)/);
});


test("laser and flamethrower show their actual continuous damage", () => {
  assert.match(js, /const laserDamage=laserHeatLevel>0\?dps\*dt\*\(ultraModeActive\?2:1\):effectiveDamage\(\)\*\.25;target\.health-=laserDamage;showDamageNumber\(target,laserDamage\)/);
  assert.match(js, /const flameDamage=effectiveDamage\(\)\*\.18\*scale;target\.health-=flameDamage;showDamageNumber\(target,flameDamage\)/);
});

test("poison and burn damage-over-time ticks display their actual damage", () => {
  assert.match(js, /const poisonDamage=Math\.min\(Math\.max\(0,target\.health-1\),target\.health\*strength\)/);
  assert.match(js, /const strength=Math\.min\(1,Math\.max\(0,Number\(target\.poisonStrength\)\|\|0\)\)\*\(isBoss \? 0\.25 : 1\)/);
  assert.match(js, /showDamageNumber\(target,poisonDamage\)/);
  assert.match(js, /target\.burnBaseDamage=baseHitDamage\*GalaxyBurn.getInitialDamageFraction\(burnLevel\)/);
  assert.match(js, /target\.burnDamageTotal=target\.burnBaseDamage\*target\.burnDamageMultiplier/);
  assert.match(js, /const rawBurnDamage=target\.burnDamagePerTick/);
  assert.match(js, /burnDamage=isBoss\?rawBurnDamage\/4:rawBurnDamage/);
});
test("sword hits show their actual damage against enemies and meteorites", () => {
  assert.match(js, /const swordHitDamage=swordDamage\*\(lowHealthActive\(\)\?1\.25:1\)\*\(deadlyLootRageActive\(\)\?1\.25:1\)\*\(ultraModeActive\?2:1\);enemy\.health-=swordHitDamage;showDamageNumber\(enemy,swordHitDamage\)/);
  assert.match(js, /const swordHitDamage=swordDamage\*\(lowHealthActive\(\)\?1\.25:1\)\*\(deadlyLootRageActive\(\)\?1\.25:1\)\*\(ultraModeActive\?2:1\);a\.health-=swordHitDamage;showDamageNumber\(a,swordHitDamage\)/);
});

test("damage numbers cap lethal overkill and rapid-hit totals at the target's remaining health", () => {
  assert.match(js, /const actualDamage=target\.health<=0\?Math\.max\(0,damage\+target\.health\):damage/);
  assert.match(js, /entry\.amount=Math\.min\(entry\.startHealth,entry\.amount\+actualDamage\)/);
  assert.ok(js.includes("startHealth:Math.max(actualDamage,(Number(target.health)||0)+damage)"));
});

test("all boss types receive five times their previous base health", () => {
  assert.match(js, /if\(isBigSplit\)health=\(700\+distance\*\.5\)\*5\*difficultySettings\[difficulty\]\.enemyHP/);
  assert.match(js, /else if\(isSpecial\)health=\(550\+distance\*\.45\)\*5\*difficultySettings\[difficulty\]\.enemyHP/);
  assert.match(js, /else health=\(350\+distance\*\.35\)\*5\*difficultySettings\[difficulty\]\.enemyHP/);
});

test("flamethrower upgrades cap at X, show maximum label, scale damage and range by 50 points, and burn for five ticks", () => {
  assert.match(js, /"continuousFire","expandedChoice","flamethrower","laserHeat","chainExplosion"\,\"deadlyLoot\"]\)/);
  assert.match(js, /u\.id==="flamethrower"&&flamethrowerLevel>=10/);
  assert.match(js, /upgrade\.id==="flamethrower"&&flamethrowerLevel===9/);
  assert.match(js, /flamethrowerLevel=Math\.min\(10,flamethrowerLevel\+1\)/);
  assert.match(js, /scale=1\+\.5\*\(level-1\),range=220\*scale/);
  assert.match(js, /flameDamage=effectiveDamage\(\)\*\.18\*scale/);
  assert.match(js, /burnPercent=\.2\+\.1\*\(level-1\)/);
  assert.match(js, /flameBurnUntil=now\+2500/);
  assert.match(js, /flameBurnTicksRemaining=5/);
  assert.match(js, /flameBurnNextTickAt=now\+500/);
  assert.match(js, /updateFlamethrowerBurn\(\)/);
});

test("splitting bosses move and bounce while their special attack timer runs", () => {
  assert.match(js, /const splitMoveFactor=stage===0\?1:stage===1\?1\.25:1\.5/);
  assert.match(js, /enemy\.x\+=enemy\.direction\*bossSpeed\*splitMoveFactor\*freezeFactor/);
  assert.match(js, /if\(enemy\.x<edge\)\{enemy\.x=edge;enemy\.direction=1\}/);
  assert.match(js, /else if\(enemy\.x>canvas\.width-edge\)\{enemy\.x=canvas\.width-edge;enemy\.direction=-1\}/);
  assert.match(js, /enemy\.specialFireTimer=stage===0\?600:stage===1\?300:150/);
});

test("piercing bullets hit each target multiple times with level-based reduced damage, then reset damage on a new target", () => {
  assert.match(js, /id:"piercing",rarity:"אדיר",rarityClass:"epic",icon:"🏹",title:"יריות חודרות"/);
  assert.match(js, /pierceRemaining:piercingLevel,hitTargets:\[\],piercingHits:\[\]/);
  assert.match(js, /function getPiercingHit\(b,target\)/);
  assert.match(js, /\[1,\.5\]/);
  assert.match(js, /\[1,\.6,\.4\]/);
  assert.match(js, /\[1,\.7,\.45,\.3\]/);
  assert.match(js, /\[1,\.8,\.55,\.35,\.2\]/);
  assert.match(js, /\[1,\.9,\.6,\.4,\.25,\.15\]/);
  assert.match(js, /b\.damage\*5\*piercingHit\.multiplier/);
  assert.match(js, /piercingHit\.deadAfterHit/);
  assert.doesNotMatch(js, /function consumeBulletPierce/);
});

test("continuous fire upgrade is rare and grows damage by 20 percentage points per level", () => {
  assert.match(js, /id:"continuousFire",rarity:"נדיר",rarityClass:"rare",icon:"🎯",title:"ירי רציף"/);
  assert.match(js, /lastDamage\*\(1\+\.2\*continuousFireLevel\)/);
});


test("Ultra Mode card has the intended rarity, 20% movement speed, double distance, and point drain", () => {
  assert.match(js, /id:"ultraMode",rarity:"אולטרה",rarityClass:"ultra",icon:"🌈",title:"מצב אולטרה"/);
  assert.match(js, /ultraPointsCap=5000/);
  assert.match(js, /ultraPoints>=1000/);
  assert.match(js, /performance\.now\(\)\+15000/);
  assert.match(js, /ultraSpentForShield>=5000/);
  assert.match(js, /ultraShields<player\.maxLives/);
  assert.match(js, /⏳ \"\+remaining/);
  assert.match(css, /#ultraModeButton\.disabled/);
  assert.match(js, /Math\.min\(1000\/60,ultraPoints\)/);
  assert.match(js, /if\(ultraModeActive\)v\*=1\.2/);
  assert.match(js, /distanceSpeed\*worldMultiplier\*\(ultraModeActive\?2:1\)/);
  assert.match(js, /if\(invincible\|\|ultraModeActive\|\|!gameRunning\)return false/);
  assert.match(index, /id="ultraModeButton"/);
  assert.match(css, /#ultraModeButton/);
});


test("keyboard controls work by physical key position on English and Hebrew layouts", () => {
  assert.match(js, /e\.code\.startsWith\("Key"\)\?e\.code\.slice\(3\)\.toLowerCase\(\):e\.key\.toLowerCase\(\)/);
  assert.match(js, /keys\[key\]=true/);
  assert.match(js, /keys\[key\]=false/);
  assert.match(js, /e\.code==="Digit1"\|\|e\.key==="1"/);
  assert.match(js, /if\(key==="q"\)\{switchWeapon\("rpg"\)/);
  assert.match(js, /if\(key==="r"\)\{switchWeapon\("shotgun"\)/);
  assert.match(js, /if\(key==="f"\)\{/);
  assert.match(js, /if\(key==="e"\)\{/);
  assert.match(js, /if\(key==="b"\)\{switchWeapon\("blackHole"\)/);
  assert.match(js, /if\(key==="l"\)\{/);
});

test("Ultra shields replace the lives HUD, are removed from the Ultra button, and flash a blue bubble when hit", () => {
  assert.match(index, /id="livesHud"/);
  assert.match(index, /id="shieldHud"[^>]*>🛡️ מגן <span id="shieldCount">0<\/span>\/<span id="shieldMax">3<\/span>/);
  assert.match(js, /shieldHud\.style\.display=ultraShields>0\?"inline":"none"/);
  assert.match(js, /shieldBubbleFlashUntil=performance\.now\(\)\+2500/);
  assert.match(js, /const maxShields=Math\.max\(1,Number\(player\.maxLives\)\|\|1\)/);
  assert.match(js, /shieldRatio=count\/maxShields/);
  assert.match(js, /const active=shieldRatio>0/);
  assert.match(js, /shield\.style\.opacity=active\?"1":"0"/);
  assert.match(js, /shield\.style\.setProperty\("--shield-blue",String\(\.68\*shieldRatio\)\)/);
  assert.match(js, /shield\.style\.setProperty\("--shield-spread",Math\.min\(100,60\*shieldRatio\)\+"%"/);
  assert.doesNotMatch(js.slice(js.indexOf("function updateAmbientEffectOverlays"),js.indexOf("function updateLowHealthHeartbeat")), /lowHealthHeartbeatIntensity/);
  assert.match(css, /#shieldEffectOverlay\[data-active="1"\]\{visibility:visible;animation:none;opacity:\.68\}/);
  assert.match(css, /rgba\(30,150,255,var\(--shield-blue,\.96\)\)/);
  assert.match(js, /const shieldBubbleVisible=ultraShields>0\|\|performance\.now\(\)<shieldBubbleFlashUntil/);
  assert.match(js, /ctx\.arc\(0,0,41\+\(pulse\?2:0\),0,Math\.PI\*2\)/);
  assert.doesNotMatch(js, /ultraPointsCap\)\.toLocaleString\("en-US"\)\+" נקודות"\)\+\(ultraShields>0\?" · 🛡️ "+ultraShields/);
  assert.match(css, /#ultraModeButton/);
});


test("Ultra edge glow is independent of the low-health heartbeat setting and scales with active Ultra abilities", () => {
  const fn = js.slice(js.indexOf("function updateAmbientEffectOverlays"), js.indexOf("function updateLowHealthHeartbeat"));
  assert.doesNotMatch(fn, /lowHealthHeartbeatIntensity/);
  assert.match(fn, /const strength=Math\.min\(\.3,\.12\*activeCount\)/);
  assert.match(fn, /Math\.min\(35,12\+activeCount\*8\)/);
});

test("low-health heartbeat renders visible red edges and scales with the selected intensity", () => {
  assert.match(index, /id="lowHealthHeartbeatOverlay"/);
  assert.match(js, /function updateLowHealthHeartbeat\(now\)/);
  assert.match(js, /const intensityScale=intensity\/50/);
  assert.match(js, /overlay\.style\.setProperty\("--heartbeat-red",String\(Math\.min\(\.99,\(\.58\+\.38\*bucket\)\*intensityScale\)\)\)/);
  assert.match(js, /overlay\.style\.setProperty\("--heartbeat-spread",String\(Math\.min\(100,.*intensityScale\)\)\+"%"\)/);
  assert.match(js, /overlay\.style\.setProperty\("--heartbeat-strength",String\(intensityScale\)\)/);
  assert.match(css, /#lowHealthHeartbeatOverlay\{position:fixed;inset:0;z-index:9999/);
  assert.match(css, /linear-gradient\(to right,rgba\(255,0,15,var\(--heartbeat-red\)\)/);
  assert.match(css, /@keyframes lowHealthHeartbeatPulse/);
});

test("dynamic game content passes through the active locale translator", () => {
  const i18n = fs.readFileSync(path.join(root, "src", "i18n.js"), "utf8");
  const catalog = fs.readFileSync(path.join(root, "src", "translations.js"), "utf8");
  assert.match(index, /src\/translations\.js"><\/script>\s*<script src="src\/i18n\.js"/);
  assert.match(js, /GalaxyI18n\.translate\(a\.title\)/);
  assert.match(js, /GalaxyI18n\.translate\(upgrade\.description\)/);
  assert.match(js, /GalaxyI18n\.translate\(item\.desc\)/);
  assert.match(js, /GalaxyI18n\.translate\(m\.title\)/);
  assert.match(i18n, /for\(const namespace of \["cards","achievements","dailyMissions","collection"\]\)/);
  assert.match(catalog, /"🎁 כל 5 המשימות הושלמו! \+100 XP"/);
});

test("Deadly Loot is a selectable Epic card and is loaded into the game", () => {
  assert.match(js, /id:"deadlyLoot",rarity:"אדיר",rarityClass:"epic",icon:"🎁",title:"שלל קטלני"/);
  assert.match(index, /src\/deadly-loot\.js/);
  assert.ok(index.indexOf("src/deadly-loot.js") < index.indexOf("src/game.js"));
  assert.match(js, /function renderHelp\(\)[\s\S]*\[\.\.\.upgrades\]/);
  assert.match(js, /ammo\.shotgun\+=amount\.shotgun;ammo\.rpg\+=amount\.rpg/);
  assert.match(js, /speedMultiplier:drop\.doubled\?1\.5:1/);
  assert.match(js, /p\.x\+=\(\(Number\(p\.vx\)\|\|0\)\+Math\.sin\(p\.drift\)\*\.35\)\*speed;p\.y\+=\(Number\(p\.vy\)\|\|1\.5\)\*speed/);
});

test("level-up cards display left-to-right number shortcuts and can be selected with number keys", () => {
  assert.match(css, /direction:ltr/);
  assert.match(js, /upgradeHotkey/);
  assert.match(js, /choices\.indexOf\(upgrade\)\+1/);
  assert.match(js, /if\(levelUpOpen\)\{const choiceNumber=\/\^\(\?:Digit\|Numpad\)\[1-6\]\$\//);
  assert.match(js, /upgradeContainer\.children\[choiceNumber-1\]\?\.click\(\)/);
  assert.match(css, /\.upgradeHotkey\{/);
});


test("Ultra, shield, reward, and healing visual effects are wired and translatable", () => {
  const catalog = fs.readFileSync(path.join(root, "src", "translations.js"), "utf8");
  assert.match(index, /id="ultraEffectOverlay"/);
  assert.match(index, /id="shieldEffectOverlay"/);
  assert.match(index, /id="healPulseOverlay"/);
  assert.match(index, /id="uiHealingEffects"/);
  assert.match(js, /function updateAmbientEffectOverlays\(\)/);
  assert.match(js, /ultraModeActive&&!miniActive\?1:0/);
  assert.match(js, /ultraLaserActive\?1:0/);
  assert.match(js, /window\.GalaxyUltraMiniShips&&window\.GalaxyUltraMiniShips\.isActive\(\)/);
  const mini = fs.readFileSync(path.join(root, "src", "ultra-mini-ships.js"), "utf8");
  assert.match(mini, /window\.GalaxyUltraMiniShips = \{ isActive: \(\) => ultraMiniModeActive \}/);
  assert.match(js, /function spawnFloatingReward\(drop\)/);
  assert.match(js, /function triggerHealingEffect\(amount=1\)/);
  assert.match(js, /size:48\+Math\.random\(\)\*12/);
  assert.match(js, /ctx\.font="900 "\+p\.size\+"px Arial"/);
  assert.match(js, /ctx\.lineWidth=2\.5/);
  assert.match(js, /drawFloatingRewardsAndHealing\(\)/);
  assert.match(js, /localStorage\.setItem\("galaxyDefenderHealingEffects"/);
  assert.match(css, /@keyframes healScreenPulse/);
  assert.match(css, /border:26px solid rgba\(0,255,75,\.82\)/);
  assert.match(css, /0 0 105px 35px rgba\(0,255,75,\.58\)/);
  assert.match(catalog, /"💚 אפקטי ריפוי"/);
  assert.match(catalog, /"🔴 מספרי נזק ופרסים מעל אויבים"/);
});
