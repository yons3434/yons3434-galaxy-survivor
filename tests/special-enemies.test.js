const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const source = fs.readFileSync(path.join(__dirname, "..", "src", "game.js"), "utf8");

test("modular game.js has valid JavaScript syntax", () => {
  assert.doesNotThrow(() => new vm.Script(source, { filename: "src/game.js" }));
});

test("mirror clones spawn at 75% and 25% for normal entities and 75/50/25 for bosses", () => {
  assert.match(source, /thresholds=entity\.boss\?\[\.75,\.5,\.25\]:\[\.75,\.25\]/);
  assert.match(source, /for\(let i=0;i<2;i\+\+\)enemies\.push\(\{boss:false/);
  assert.match(source, /for\(let i=0;i<2;i\+\+\)asteroids\.push\(\{x:entity\.x/);
  assert.match(source, /for\(let i=0;i<2;i\+\+\)enemies\.push\(\{boss:true/);
});

test("mirror clones are half speed, fire half as often, and their shots move slower and are translucent", () => {
  assert.match(source, /enemy\.mirrorClone\?\.5/);
  assert.match(source, /enemy\.timer=enemy\.mirrorClone\?200/);
  assert.match(source, /speedMultiplier:enemy\.mirrorClone\?\.5:1/);
  assert.match(source, /cloneBullet:!!enemy\.mirrorClone/);
  assert.match(source, /ctx\.globalAlpha=b\.cloneBullet\?\.45:1/);
});

test("chaser meteorites lock their direction when spawned and pass through the player", () => {
  assert.match(source, /const dx=player\.x-h\.x,dy=player\.y-h\.y,len=Math\.hypot\(dx,dy)\|\|1;asteroids\.push/);
  assert.match(source, /a\.chaserMeteor\)/);
  assert.match(source, /if\(a\.chaserMeteor\)\{damagePlayer\(\);return\}/);
});

test("chaser enemies are slower and go straight after hitting the player", () => {
  assert.match(source, /chaseSpeed=Math\.max\(3\.8,enemy\.speed\*1\.2\)/);
  assert.match(source, /enemy\.chaserStraight=true/);
  assert.match(source, /enemy\.chaserVx=/);
});

test("chaser boss fires three shots and returns to its start while the player is transparent", () => {
  assert.match(source, /for\(let ss=0;ss<3;ss\+\+\)/);
  assert.match(source, /enemy\.chaserReturning=true/);
  assert.match(source, /enemy\.startX/);
});

test("split children are rendered light green", () => {
  assert.match(source, /splitClone\?"#7cff9c"/);
  assert.match(source, /splitClone:true/);
});

test("inversion boss charges for two seconds at 10% speed, then toggles persistent controls", () => {
  assert.match(source, /enemy\.inversionChargeTimer=120/);
  assert.match(source, /bossSpeed\*\.095/);
  assert.match(source, /controlsInverted=!controlsInverted/);
  assert.match(source, /const inv=controlsInverted/);
});

test("doom enemies are mini-bosses and their fire rate scales with remaining health", () => {
  assert.match(source, /activeSpecialBossArea==="doom"\?baseHealth\*3/);
  assert.match(source, /fireCooldown=Math\.max\(12,70\*\(\.2\+\.8\*healthRatio\)\)/);
  assert.match(source, /shotSpeed=2\.5\+\(1-healthRatio\)\*3/);
});

test("teleport area suppresses normal enemies and bosses and only creates inert visual gates", () => {
  assert.match(source, /if\(activeSpecialBossArea==="teleport"\)return/);
  assert.match(source, /requestedSpecial==="teleport".*?bossFightActive=false/s);
  assert.match(source, /updateTeleportAreaGates/);
  assert.match(source, /teleportAreaGates\.push/);
});
