const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const game = fs.readFileSync(path.join(__dirname, "..", "src", "game.js"), "utf8");
const translations = fs.readFileSync(path.join(__dirname, "..", "src", "translations.js"), "utf8");

test("Revenge Wave is fully removed from gameplay and upgrade selection", () => {
  assert.doesNotMatch(game, /revengeWave|RevengeWave|גל נקמה/);
  assert.doesNotMatch(translations, /גל נקמה|Revenge Wave|Onda de venganza|Onde de vengeance|Vergeltungswelle|Волна возмездия|موجة الانتقام/);
});

test("Taking damage no longer activates Revenge Wave", () => {
  const start = game.indexOf("function damagePlayer(){");
  const end = game.indexOf("\nfunction deadlyLootEligibility", start);
  assert.notEqual(start, -1);
  assert.notEqual(end, -1);
  assert.doesNotMatch(game.slice(start, end), /activateRevengeWave/);
});
