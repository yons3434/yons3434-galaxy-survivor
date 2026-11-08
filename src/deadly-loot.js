"use strict";
(() => {
 const rewards=["life","shield","xp","ammo","rage"];
 function levelStats(level){const lv=Math.max(1,Math.min(9,Math.floor(Number(level)||1))),step=lv-1;return{level:lv,rageSeconds:10+step*2.5,xp:1000+step*250,shotgunAmmo:30+step*5,rpgAmmo:5+step*2}}
 function maxDrops(entity){if(entity&&entity.boss)return 6;if(entity&&entity.kind==="meteorite"){const s=Number(entity.size)||0;return s<18?0:s<24?1:2}return 2}
 function chance(level,luckLevel,doubled,boss){const steps=Math.max(0,Math.min(8,Math.floor(Number(level)||1)-1)),luck=Math.max(0,Math.floor(Number(luckLevel)||0)),base=doubled?.01:.04,card=steps*(doubled?.00125:.005),luckBonus=luck*(doubled?.000625:.0025);return(base+card+luckBonus)*(boss?2:1)}
 function rollDrops(entity,level,luckLevel,eligible,random=Math.random){const cap=maxDrops(entity);if(!cap)return[];const boss=!!(entity&&entity.boss),stats=levelStats(level),out=[];for(const kind of rewards){if(!eligible||!eligible[kind])continue;for(const doubled of[false,true])if(random()<chance(level,luckLevel,doubled,boss)){const m=doubled?2:1;out.push({kind,doubled,amount:kind==="life"||kind==="shield"?m:kind==="xp"?stats.xp*m:kind==="ammo"?{shotgun:stats.shotgunAmmo*m,rpg:stats.rpgAmmo*m}:stats.rageSeconds*m})}}for(let i=out.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[out[i],out[j]]=[out[j],out[i]]}return out.slice(0,cap)}
 window.GalaxyDeadlyLoot=Object.freeze({rewards,levelStats,maxDrops,chance,rollDrops});
})();