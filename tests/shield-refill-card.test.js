const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const source = fs.readFileSync(
  path.join(__dirname, "..", "src", "game.js"),
  "utf8"
);

test("game source remains valid JavaScript", () => {
  assert.doesNotThrow(() => new Function(source));
});

test("shield refill is an Epic one-time card", () => {
  assert.match(
    source,
    /id:"fillShields",rarity:"אדיר",rarityClass:"epic",icon:"🛡️",title:"מילוי מגנים",description:"ממלא מיד את כל המגנים החסרים עד למקסימום\. חד־פעמי; אינו משחזר חיים\."/
  );
});

test("shield refill is hidden while shields are full", () => {
  assert.match(
    source,
    /!\(u\.id==="fillShields"&&ultraShields>=player\.maxLives\)/
  );
});

test("choosing shield refill fills shields to the maximum without healing lives", () => {
  assert.match(
    source,
    /case"fillShields":ultraShields=player\.maxLives;showMessage\("🛡️ כל המגנים מולאו!"\);updateHUD\(\);break;/
  );
});
