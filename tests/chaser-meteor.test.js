const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "Galaxy-Defender.html"), "utf8");
const script = html.match(/<script>([\\s\\S]*?)<\\/script>/)?.[1] || "";

test("Galaxy Defender monolithic file has valid JavaScript syntax", () => {
  assert.ok(script.length > 10000);
  assert.doesNotThrow(() => new vm.Script(script));
});

test("chaser meteor uses the diagonal warning-lane attack", () => {
  assert.match(html, /function setupChaserMeteor\\(a\\)/);
  assert.match(html, /a\\.chaserPhase="warning"/);
  assert.match(html, /a\\.chaserPhase="charging"/);
  assert.match(html, /a\\.chaserPhase="flying"/);
  assert.match(html, /a\\.chaserDx\\*a\\.speed\\/60/);
  assert.match(html, /w=76/);
  assert.match(html, /Math\\.SQRT1_2/);
});

test("old free-chasing chaser meteor hazard system is removed", () => {
  assert.doesNotMatch(html, /window\\.chaserHazards/);
  assert.doesNotMatch(html, /Chaser-area warning zones/);
});
