"use strict";
(function(root){
  const RARITY_ORDER = ["common","rare","epic","legendary","amazing","ultra"];
  const RARITY_CHANCES = [
    [55,25,12,5,2.5,0.5],
    [53,24.87,12.53,5.8,3,0.8],
    [51,24.73,13.07,6.6,3.5,1.1],
    [49,24.6,13.6,7.4,4,1.4],
    [47,24.47,14.13,8.2,4.5,1.7],
    [45,24.33,14.67,9,5,2],
    [43,24.2,15.2,9.8,5.5,2.3],
    [41,24.07,15.73,10.6,6,2.6],
    [39,23.93,16.27,11.4,6.5,2.9],
    [37,23.8,16.8,12.2,7,3.2],
    [35,23.67,17.33,13,7.5,3.5],
    [33,23.53,17.87,13.8,8,3.8],
    [31,23.4,18.4,14.6,8.5,4.1],
    [29,23.27,18.93,15.4,9,4.4],
    [27,23.13,19.47,16.2,9.5,4.7],
    [25,23,20,17,10,5]
  ];
  function getRarityChances(level){
    const index=Math.max(0,Math.min(15,Math.floor(Number(level)||0)));
    const row=RARITY_CHANCES[index];
    return Object.fromEntries(RARITY_ORDER.map((rarity,i)=>[rarity,row[i]]));
  }
  function chooseUpgradeChoices(availableUpgrades,level,choiceCount=3,random=Math.random){
    const pool=[];
    const seen=new Set();
    for(const upgrade of Array.isArray(availableUpgrades)?availableUpgrades:[]){
      if(!upgrade||upgrade.id==null||seen.has(upgrade.id))continue;
      seen.add(upgrade.id);
      pool.push(upgrade);
    }
    const choices=[];
    const count=Math.max(0,Math.floor(Number(choiceCount)||0));
    while(choices.length<count&&pool.length){
      const groups=new Map();
      for(const upgrade of pool){
        const rarity=RARITY_ORDER.includes(upgrade.rarityClass)?upgrade.rarityClass:"rare";
        if(!groups.has(rarity))groups.set(rarity,[]);
        groups.get(rarity).push(upgrade);
      }
      const chances=getRarityChances(level);
      let total=0;
      for(const rarity of groups.keys())total+=chances[rarity];
      if(total<=0)break;
      let roll=Math.min(0.9999999999999999,Math.max(0,Number(random())||0))*total;
      let selectedRarity=null;
      for(const rarity of RARITY_ORDER){
        if(!groups.has(rarity))continue;
        roll-=chances[rarity];
        if(roll<0){selectedRarity=rarity;break}
      }
      if(!selectedRarity)selectedRarity=Array.from(groups.keys()).at(-1);
      const group=groups.get(selectedRarity);
      const cardIndex=Math.min(group.length-1,Math.floor(Math.max(0,Number(random())||0)*group.length));
      const selected=group[cardIndex];
      choices.push(selected);
      const index=pool.findIndex(item=>item.id===selected.id);
      if(index>=0)pool.splice(index,1);
    }
    return choices;
  }
  const api={RARITY_ORDER,RARITY_CHANCES,getRarityChances,chooseUpgradeChoices};
  if(typeof module!=="undefined"&&module.exports)module.exports=api;
  if(root)root.GalaxyLuck=api;
})(typeof window!=="undefined"?window:globalThis);
