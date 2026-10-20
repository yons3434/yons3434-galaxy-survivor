const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const game = fs.readFileSync(path.join(__dirname, "../src/game.js"), "utf8");
const css = fs.readFileSync(path.join(__dirname, "../src/style.css"), "utf8");

test("Ultra achievement rarity and all agreed achievements exist", () => {
  for (const id of ["firstUltraCard", "ultraCosmicSurvivor", "ultraBossSlayer", "ultraDestructiveForce", "ultraMeteorBreaker", "ultraCollector", "ultraCosmicLegend", "ultraPoints25k", "ultraBossHunter", "ultraPerfectCollection", "ultraUnbreakableShield", "ultraLaserPower", "ultraGalaxyTravel", "ultraUnstoppable"]) {
    assert.match(game, new RegExp('id:"' + id + '"'));
  }
  assert.match(game, /ultra:"🌀 הישגי אולטרה"/);
  assert.match(css, /\.achievementCard\.ultra/);
});

test("Ultra rewards and one-time all-achievements bonus are configured", () => {
  assert.match(game, /def\.id==="ultraUnstoppable"\?10000/);
  assert.match(game, /ultra:1000/);
  assert.match(game, /addPlayerXP\(100000,false,"בונוס השלמת כל ההישגים בכל הדרגות"\)/);
  assert.match(game, /paidAllAchievementsBonus/);
});

test("run-scoped Ultra conditions and card collection tracking exist", () => {
  for (const token of ["runUltraPointsEarned>=25000", "runUltraModeSeconds>=120", "runUltraLaserKills>=50", "runEnemiesKilled>=500&&!runLivesLost", "runImpossibleBossKills>=10", "runUltraCards.has(id)", "runAmazingCards.has(id)"]) assert.ok(game.includes(token), token);
});
