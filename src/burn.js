"use strict";
(function(root){
const MAX_LEVEL=10,TICKS_PER_APPLICATION=8,DURATION_MS=4000;
function levelIndex(level){return Math.max(0,Math.min(MAX_LEVEL,Math.floor(Number(level)||0)))}
function getChance(level){const n=levelIndex(level);return n===0?0:Math.min(.65,.20+(n-1)*.05)}
function getChanceDecay(level){const n=levelIndex(level);return n===0?0:Math.max(.05,.50-(n-1)*.05)}
function getInitialDamageFraction(level){const n=levelIndex(level);return n===0?0:Math.min(.95,.50+(n-1)*.05)}
function getDamageIncrease(level){const n=levelIndex(level);return n===0?0:Math.min(.475,.25+(n-1)*.025)}
const api=Object.freeze({maxLevel:MAX_LEVEL,durationMs:DURATION_MS,tickIntervalMs:DURATION_MS/TICKS_PER_APPLICATION,ticksPerApplication:TICKS_PER_APPLICATION,getChance,getChanceDecay,getInitialDamageFraction,getDamageIncrease,getNextChance(previousChance,level){return Math.max(0,Math.min(1,Number(previousChance)||0)*(1-getChanceDecay(level)))},getNextDamageMultiplier(previousMultiplier,level){return Math.max(0,Number(previousMultiplier)||1)*(1+getDamageIncrease(level))},getNextDurationMs(previousDurationMs){return Math.max(0,Number(previousDurationMs)||DURATION_MS)*.75}});
if(typeof module!=="undefined"&&module.exports)module.exports=api;if(root)root.GalaxyBurn=api;
})(typeof globalThis!=="undefined"?globalThis:this);
