const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
// Regression coverage for the complete Revenge Wave card lifecycle.
const game = fs.readFileSync(path.join(__dirname, "..", "src", "game.js"), "utf8");
const translations = fs.readFileSync(path.join(__dirname, "..", "src", "translations.js"), "utf8");
test("Revenge Wave is an amazing upgrade capped at nine levels", () => {
 assert.match(game,/id:"revengeWave",rarity:"מדהים",rarityClass:"amazing"/);
 assert.match(game,/case"revengeWave":revengeWaveLevel=Math\.min\(9,revengeWaveLevel\+1\)/);
 assert.match(game,/u\.id==="revengeWave"&&revengeWaveLevel>=9/);
 assert.match(game,/"revengeWave"\]\)/);
});
test("Revenge Wave activates only on a real hit and cannot retrigger while active", () => {
 assert.match(game,/player\.lives--;runLivesLost=true;\s*activateRevengeWave\(\)/);
 assert.match(game,/performance\.now\(\)<revengeWaveActiveUntil/);
 assert.match(game,/revengeWaveActiveUntil=now\+1000/);
});
test("Revenge Wave scales damage, pushes first, then slows ordinary targets while stunned", () => {
 assert.match(game,/1\+\.5\*\(Math\.max\(1,Math\.min\(9,Number\(level\)\|\|1\)\)-1\)/);
 assert.match(game,/stunDuration=1000\+500\*\(revengeWaveLevel-1\)/);
 assert.match(game,/pushDuration=350/);
 assert.match(game,/offset=\(\(isAsteroid\?entity\.size:25\)\+55\)\*2\.5/);
 assert.match(game,/entity\.revengeWaveStunStartsAt=now\+pushDuration/);
 assert.match(game,/entity\.revengeWaveStunnedUntil=now\+pushDuration\+stunDuration/);
 assert.match(game,/getRevengeWaveSlowFactor\(entity,now=performance\.now\(\)\)\{return isRevengeWaveStunned\(entity,now\)\?\?0\.25:1\}/);
 assert.match(game,/enemyBullets\.length=0/);
 assert.match(game,/drawRevengeWaveEffect\(\)/);
});
test("Revenge Wave title and description are translated", () => {
 assert.match(translations,/"גל נקמה":\["Revenge Wave","Onda de venganza","Onde de vengeance","Vergeltungswelle","Волна возмездия","موجة الانتقام"\]/);
 assert.match(translations,/"כשנפגעים משתחרר גל חשמלי למשך שנייה/);
});
