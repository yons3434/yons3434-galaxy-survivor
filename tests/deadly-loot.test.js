"use strict";
const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const vm=require("node:vm");
const source=fs.readFileSync(require.resolve("../src/deadly-loot.js"),"utf8");
function load(){const sandbox={window:{},Math};vm.runInNewContext(source,sandbox);return sandbox.window.GalaxyDeadlyLoot}
test("level rewards scale from I to IX",()=>{const x=load();assert.deepEqual(JSON.parse(JSON.stringify(x.levelStats(1))),{level:1,rageSeconds:10,xp:1000,shotgunAmmo:30,rpgAmmo:5});assert.deepEqual(JSON.parse(JSON.stringify(x.levelStats(9))),{level:9,rageSeconds:30,xp:3000,shotgunAmmo:70,rpgAmmo:21});assert.equal(x.levelStats(99).level,9)});
test("drop caps match enemies, meteorites and bosses",()=>{const x=load();assert.equal(x.maxDrops({kind:"enemy"}),2);assert.equal(x.maxDrops({kind:"meteorite",size:17}),0);assert.equal(x.maxDrops({kind:"meteorite",size:20}),1);assert.equal(x.maxDrops({kind:"meteorite",size:30}),2);assert.equal(x.maxDrops({boss:true}),6)});
test("base, level, luck and boss chance modifiers",()=>{const x=load();assert.equal(x.chance(1,0,false,false),.04);assert.equal(x.chance(1,0,true,false),.01);assert.equal(x.chance(2,0,false,false),.045);assert.equal(x.chance(1,1,false,false),.0425);assert.equal(x.chance(1,0,false,true),.08);assert.equal(x.chance(1,0,true,true),.02)});
test("ineligible drops are skipped and entity caps are enforced",()=>{const x=load();let calls=0;const always=()=>{calls++;return 0};const drops=x.rollDrops({kind:"enemy"},1,0,{life:false,shield:false,xp:true,ammo:false,rage:false},always);assert.equal(drops.length,2);assert.ok(drops.every(d=>d.kind==="xp"));assert.equal(calls,10);assert.equal(x.rollDrops({kind:"meteorite",size:17},9,9,{life:true,shield:true,xp:true,ammo:true,rage:true},always).length,0)});
test("double rewards are twice the regular level IX rewards",()=>{const x=load(),s=x.levelStats(9);assert.equal(s.xp*2,6000);assert.equal(s.rageSeconds*2,60);assert.equal(s.shotgunAmmo*2,140);assert.equal(s.rpgAmmo*2,42)});
