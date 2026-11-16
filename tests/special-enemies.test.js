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
  assert.match(source, /thresholds=entity\.boss\?\[\.75,\.5,\.25\]:\[\.75,\.25\]/);\n  assert.match(source, /before>thresholdHealth&&after<=thresholdHealth/);
  assert.match(source, /for\(let i=0;i<2;i\+\+\)enemies\.push\(\{boss:false/);
  assert.match(source, /for\(let i=0;i<2;i\+\+\)asteroids\.push\(\{x:entity\.x/);
  assert.match(source, /for\(let i=0;i<2;i\+\+\)enemies\.push\(\{boss:true/);
});

test("mirror clones are half speed, fire half as often, and their shots move slower and are translucent", () => {
  assert.match(source, /enemy\.mirrorClone\?\.5/);
  assert.match(source, /enemy\.timer=enemy\.mirrorClone\?200/);\n  assert.match(source, /direction:entity\.direction,timer:60,mirrorClone:true/);
  assert.match(source, /speedMultiplier:enemy\.mirrorClone\?\.5:1/);
  assert.match(source, /cloneBullet:!!enemy\.mirrorClone/);
  assert.match(source, /ctx\.globalAlpha=b\.cloneBullet\?\.45:1/);
});

test("chaser meteorites lock their direction when spawned and pass through the player", () => {
  assert.ok(source.includes("const dx=player.x-h.x,dy=player.y-h.y,len=Math.hypot(dx,dy)||1;asteroids.push"));
  assert.match(source, /a\.chaserMeteor\)/);\n  assert.match(source, /meteorSpeed=18\+distance\/4000/);\n  assert.match(source, /vx=dx\/len;vy=dy\/len;meteorSpeed=18\+distance\/4000/);
  assert.match(source, /if\(a\.chaserMeteor\)\{damagePlayer\(\);return\}/);
});

test("chaser enemies are slower and go straight after hitting the player", () => {
  assert.match(source, /chaseSpeed=Math\.max\(3\.2,enemy\.speed\*1\.05\)/);\n  assert.match(source, /for\(let ss=0;ss<2;ss\+\+\)/);
  assert.match(source, /enemy\.chaserStraight=true/);
  assert.match(source, /enemy\.chaserVx=/);
});

test("chaser boss fires three shots and returns to its start while the player is transparent", () => {
  assert.match(source, /for\(let ss=0;ss<3;ss\+\+\)/);
  assert.match(source, /enemy\.chaserReturning=true/);
  assert.match(source, /enemy\.startX/);
});

test("split enemies and meteorites are dark green and split children are light green", () => {\n  assert.match(source, /a\.specialType==="split"\?"#0b7d3b"/);\n  assert.match(source, /!enemy\.boss&&enemy\.specialType==="split"&&!enemy\.splitClone/);
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
  assert.match(source, /spawnHealth=special==="doom"\?health\*3:health/);
  assert.match(source, /fireCooldown=Math\.max\(12,70\*\(\.2\+\.8\*healthRatio\)\)/);
  assert.match(source, /shotSpeed=2\.5\+\(1-healthRatio\)\*3/);
});

test("gate and teleport areas suppress enemies and bosses and only create inert visual gates", () => {\n  assert.match(source, /activeSpecialBossArea==="teleport"\|\|activeSpecialBossArea==="gates"/);\n  assert.match(source, /requestedSpecial==="gates".*?bossFightActive=false/s);
  assert.match(source, /if\(activeSpecialBossArea==="teleport"\|\|activeSpecialBossArea==="gates"\)return/);
  assert.match(source, /requestedSpecial==="teleport".*?bossFightActive=false/s);
  assert.match(source, /updateTeleportAreaGates/);\n  assert.match(source, /activeSpecialBossArea!=="teleport"&&activeSpecialBossArea!=="gates"/);
  assert.match(source, /teleportAreaGates\.push/);
});
