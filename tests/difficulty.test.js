const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const source = fs.readFileSync(
  path.join(__dirname, "..", "js", "config", "difficulty.js"),
  "utf8"
);

function loadDifficultyModule() {
  const transformed = source
    .replace(/export const /g, "const ")
    .replace(/export function /g, "function ")
    .concat("\nmodule.exports = { difficultySettings, getDifficultySettings };");
  const module = { exports: {} };
  const fn = new Function("module", "exports", transformed);
  fn(module, module.exports);
  return module.exports;
}

test("all five difficulty modes exist", () => {
  const { difficultySettings } = loadDifficultyModule();
  assert.deepEqual(Object.keys(difficultySettings), [
    "easy",
    "normal",
    "hard",
    "super",
    "impossible"
  ]);
});

test("normal difficulty is the neutral baseline", () => {
  const { getDifficultySettings } = loadDifficultyModule();
  const normal = getDifficultySettings("normal");
  assert.equal(normal.enemyHP, 1);
  assert.equal(normal.xp, 1);
  assert.equal(normal.extraLives, 0);
});

test("invalid difficulty falls back to normal", () => {
  const { getDifficultySettings } = loadDifficultyModule();
  assert.deepEqual(getDifficultySettings("unknown"), getDifficultySettings("normal"));
});
