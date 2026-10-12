"use strict";
const canvas=document.getElementById("gameCanvas"),ctx=canvas.getContext("2d");
const profileButton=document.getElementById("profileButton"),profileOverlay=document.getElementById("profileOverlay"),profileNameInput=document.getElementById("profileNameInput"),saveProfileNameButton=document.getElementById("saveProfileNameButton"),closeProfileButton=document.getElementById("closeProfileButton"),profileStats=document.getElementById("profileStats"),profileBestBody=document.getElementById("profileBestBody");
const gameSettingsButton=document.getElementById("gameSettingsButton"),gameSettingsOverlay=document.getElementById("gameSettingsOverlay"),closeGameSettingsButton=document.getElementById("closeGameSettingsButton"),mobileControls=document.getElementById("mobileControls"),mobileShootButton=document.getElementById("mobileShootButton"),joystickArea=document.getElementById("joystickArea"),joystickStick=document.getElementById("joystickStick"),controlModeSelect=document.getElementById("controlModeSelect");
const achievementsOverlay=document.getElementById("achievementsOverlay"),achievementsGrid=document.getElementById("achievementsGrid"),achievementsSummary=document.getElementById("achievementsSummary"),achievementsButton=document.getElementById("achievementsButton"),closeAchievementsButton=document.getElementById("closeAchievementsButton"),profileAchievementsButton=document.getElementById("profileAchievementsButton"),profileAchievementSummary=document.getElementById("profileAchievementSummary");
const startScreen=document.getElementById("startScreen"),startButton=document.getElementById("startButton"),levelUpScreen=document.getElementById("levelUp"),pauseMenu=document.getElementById("pauseMenu"),gameOverScreen=document.getElementById("gameOver"),restartButton=document.getElementById("restartButton"),resumeButton=document.getElementById("resumeButton"),endGameButton=document.getElementById("endGameButton"),upgradeContainer=document.getElementById("upgradeContainer"),leaderboard=document.getElementById("leaderboard"),leaderboardButton=document.getElementById("leaderboardButton"),closeLeaderboardButton=document.getElementById("closeLeaderboardButton"),gameOverLeaderboardButton=document.getElementById("gameOverLeaderboardButton"),leaderboardTabs=document.getElementById("leaderboardTabs"),leaderboardBody=document.getElementById("leaderboardBody"),collectionButton=document.getElementById("collectionButton"),collectionOverlay=document.getElementById("collectionOverlay"),collectionContent=document.getElementById("collectionContent"),closeCollectionButton=document.getElementById("closeCollectionButton"),helpButton=document.getElementById("helpButton"),closeHelpButton=document.getElementById("closeHelpButton"),helpOverlay=document.getElementById("helpOverlay"),helpContent=document.getElementById("helpContent");
let gameStarted=false,gameRunning=false,paused=false,levelUpOpen=false,animationId=null,distance=0,distanceSpeed=.1,difficulty="normal",scoreSaved=false,gameTime=0,recordBroken=false,personalBestAtStart=0;let lastAchievementDistance=-1;
let lowHealthBoostLevel=0;
const isPhoneDevice=()=>/Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent)||(("ontouchstart" in window||navigator.maxTouchPoints>0)&&window.matchMedia("(pointer:coarse)").matches);
let mobileControlsEnabled=isPhoneDevice();
let mobileControlMode="joystick";
let joystickPointerId=null,joystickX=0,joystickY=0;
const difficultySettings={easy:{enemyHP:.5,xp:1.5,extraLives:2,enemyTriple:false,deathSpread:false,background:"#062b15",color:"#00ff88",music:"easy"},normal:{enemyHP:1,xp:1,extraLives:0,enemyTriple:false,deathSpread:false,background:"#101b3d",color:"#4cc9f0",music:"normal"},hard:{enemyHP:1.5,xp:.75,extraLives:0,enemyTriple:true,deathSpread:false,background:"#3b1200",color:"#ff9800",music:"hard"},super:{enemyHP:2,xp:.5,extraLives:-1,enemyTriple:true,deathSpread:false,background:"#350008",color:"#ff1744",music:"super"},impossible:{enemyHP:3,xp:.25,extraLives:-2,enemyTriple:true,deathSpread:false,background:"#000000",color:"#ffffff",music:"impossible",glow:true}};
let level=1,xp=0,xpNeeded=100,lastBossDistance=0,bossSpeed=2,bossFightActive=false,superBossCount=0,invincible=false,invincibleTimer=0,dodgeGhostTimer=0,messageTimer=null;
let freezeTimer=0,stunLevel=0,inversionTimer=0,specialSpawnCooldown=0;
let screenShakePower=0,screenShakeUntil=0;
let hitEffectsEnabled=localStorage.getItem("galaxyDefenderHitEffects")!=="off";
let meteoriteBreakEffectEnabled=localStorage.getItem("galaxyDefenderMeteoriteBreakEffect")!=="off";
let damageNumbersEnabled=localStorage.getItem("galaxyDefenderDamageNumbers")!=="off";
const meteoriteFragments=[];
const floatingDamageNumbers=[];
function showDamageNumber(target,damage){if(!damageNumbersEnabled||!target||!Number.isFinite(damage)||damage<=0)return;const actualDamage=target.health<=0?Math.max(0,damage+target.health):damage;if(actualDamage<=0)return;const now=performance.now();let entry=floatingDamageNumbers.find(n=>n.target===target&&now-n.lastHitAt<=300);if(entry){entry.amount=Math.min(entry.startHealth,entry.amount+actualDamage);entry.lastHitAt=now;entry.startAt=now}else floatingDamageNumbers.push({target,amount:actualDamage,startHealth:Math.max(actualDamage,(Number(target.health)||0)+damage),lastHitAt:now,startAt:now});}
function drawFloatingDamageNumbers(){if(!damageNumbersEnabled){floatingDamageNumbers.length=0;return}const now=performance.now();for(let i=floatingDamageNumbers.length-1;i>=0;i--){const n=floatingDamageNumbers[i],age=now-n.startAt;if(age>=750||!n.target){floatingDamageNumbers.splice(i,1);continue}const target=n.target,size=target.boss?(target.specialType==="split"?(target.splitStage===2?38:62):55):(Number(target.size)||25);ctx.save();ctx.globalAlpha=Math.max(0,1-age/750);ctx.font="bold 19px Arial";ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillStyle="#ff3030";ctx.shadowColor="#ff1010";ctx.shadowBlur=9;ctx.fillText("-"+Math.round(n.amount),target.x,target.y-size-20-age*.035);ctx.restore()}}
function spawnMeteoriteFragments(a){if(!meteoriteBreakEffectEnabled||!a||a.fragmentsSpawned)return;a.fragmentsSpawned=true;const count=10+Math.floor(Math.random()*5);for(let i=0;i<count;i++){const sides=5+Math.floor(Math.random()*3),shape=[];for(let j=0;j<sides;j++)shape.push(.58+Math.random()*.52);meteoriteFragments.push({x:a.x,y:a.y,vx:(Math.random()-.5)*7,vy:(Math.random()-.5)*7-1,rotation:Math.random()*Math.PI*2,spin:(Math.random()-.5)*.22,size:3+Math.random()*5,life:38+Math.floor(Math.random()*22),maxLife:60,shade:90+Math.floor(Math.random()*70),shape})}}
function screenShake(power,duration){if(!hitEffectsEnabled)return;screenShakePower=Math.max(screenShakePower,power);screenShakeUntil=Math.max(screenShakeUntil,performance.now()+duration)}
let speedComboDistance=0,speedComboPermanentDistance=0,speedComboPermanentBonus=0,speedComboTemporaryBonus=0,speedComboPermanentLastAwardedStep=0,speedComboLastAwardedStep=0;
// Permanent combo persists through hits; temporary combo is the only part that can reset during a run.
const keys=Object.create(null),mouse={x:window.innerWidth/2,y:window.innerHeight/2};
const player={x:0,y:0,size:25,speed:5,damage:10,maxLives:3,lives:3,fireRate:15,lastShot:0};
let damageLevel=0,speedLevel=0,fireRateLevel=0,maxLivesLevel=0,extraFireLevel=0,splitBulletLevel=0,luckLevel=0,dodgeChance=0,healOneUsed=false,fullHealUsed=false,reviveAvailable=false,piercingLevel=0,homingLevel=0,extraRowLevel=0,laserHeatLevel=0,laserHeat=0,laserMode=false,laserOn=false,flamethrowerMode=false,flamethrowerOn=false,swordCount=0,swordDamage=4,swordRange=90,swordAngle=0,droneDamageLevel=0,droneTier=0,maxDrones=2,extraDroneLevel=0,flamethrowerLevel=0,shotgunLevel=0,minigunLevel=0,rpgLevel=0,blackHoleAmmo=0,blackHoleMaxAmmo=0,chainLightningLevel=0,amazingDroneLevel=0,bulletSizeLevel=0,xpBoostLevel=0,levelHealLevel=0,poisonLevel=0,burnLevel=0,freezeLevel=0,confusionLevel=0,continuousFireLevel=0,expandedChoiceLevel=0,currentWeapon="pistol";
const ammo={pistol:Infinity,minigun:150,rpg:10,shotgun:30,flamethrower:Infinity,blackHole:0},weaponNames={pistol:"אקדח",minigun:"מיניגאן",rpg:"RPG",shotgun:"שוטגאן",flamethrower:"להביור",blackHole:"רובה חור שחור"};
let bullets=[],enemyBullets=[],asteroids=[],enemies=[],explosions=[],drones=[],selectedUpgrades=[];
const upgrades=[{id:"damage",rarity:"רגיל",rarityClass:"common",icon:"💥",title:"עוד נזק",description:"מגדיל את הנזק של היריות וגם מחזק את החרבות."},{id:"fireRate",rarity:"רגיל",rarityClass:"common",icon:"⚡",title:"מהירות יריות",description:"מגדיל את מהירות הירי וגם את מהירות הסיבוב של החרבות."},{id:"maxLives",rarity:"רגיל",rarityClass:"common",icon:"❤️",title:"הרחבת חיים מקסימליים",description:"מוסיף לב אחד לחיים המקסימליים."},{id:"healOne",rarity:"רגיל",rarityClass:"common",icon:"❤️",title:"ריפוי לב אחד",description:"מרפא לב אחד. חד־פעמי."},{id:"speed",rarity:"רגיל",rarityClass:"common",icon:"🚀",title:"מהירות תנועה",description:"מגדיל את מהירות תנועת החללית."},{id:"extraFire",rarity:"נדיר",rarityClass:"rare",icon:"🔫",title:"עוד ירי",description:"מוסיף יריות נוספות לכל ירייה."},{id:"xpBoost",rarity:"נדיר",rarityClass:"rare",icon:"✨",title:"עוד XP",description:"מגדיל את כמות ה־XP שמקבלים."},{id:"luck",rarity:"נדיר",rarityClass:"rare",icon:"🍀",title:"עוד מזל",description:"מגדיל את הסיכוי לקבל שדרוגים נדירים יותר."},{id:"dodge",rarity:"נדיר",rarityClass:"rare",icon:"🌀",title:"התחמקות",description:"נותן סיכוי לא לאבד לב כאשר נפגעים."},{id:"fullHeal",rarity:"נדיר",rarityClass:"rare",icon:"💚",title:"ריפוי כל החיים",description:"מרפא את כל החיים. חד־פעמי."},{id:"drone",rarity:"נדיר",rarityClass:"rare",icon:"🛸",title:"מיני־חללית",description:"מוסיף מיני־חללית רגילה שיורה אוטומטית."},{id:"extraDrone",rarity:"נדיר",rarityClass:"rare",icon:"🛸",title:"עוד מיני־חללית",description:"מגדיל את מקסימום המיני־חלליות ב־1 עד מקסימום 5."},{id:"extraDrone",rarity:"נדיר",rarityClass:"rare",icon:"🛸",title:"עוד מיני־חללית",description:"מגדיל את המקסימום של המיני־חלליות ב־1. מתחיל מ־2 ועד מקסימום 5."},{id:"rpg",rarity:"אדיר",rarityClass:"epic",icon:"🚀",title:"יריות RPG",description:"פותח את נשק ה־RPG ומוסיף 10 תחמושת."},{id:"piercing",rarity:"נדיר",rarityClass:"rare",icon:"🏹",title:"יריות חודרות",description:"רמה I מאפשרת לקליע לחדור דרך מטרה אחת ולפגוע במטרה נוספת. כל רמה מוסיפה חדירה אחת נוספת."},{id:"sword",rarity:"אדיר",rarityClass:"epic",icon:"⚔️",title:"עוד חרב",description:"מוסיף חרב אנרגיה מסתובבת סביב החללית."},{id:"revive",rarity:"אדיר",rarityClass:"epic",icon:"💖",title:"החייאה",description:"כאשר החיים מגיעים לאפס, חוזרים לחיים עם כל החיים המלאים."},{id:"levelHeal",rarity:"אדיר",rarityClass:"epic",icon:"💜",title:"ריפוי בעליית רמה",description:"בכל פעם שעולים רמה, השחקן מתרפא בלב אחד."},{id:"shotgun",rarity:"אדיר",rarityClass:"epic",icon:"🔫",title:"שוטגאן",description:"פותח את השוטגאן."},{id:"droneUpgrade",rarity:"אדיר",rarityClass:"epic",icon:"🛸",title:"מיני־חללית משודרגת",description:"כל המיני־חלליות הקיימות משתדרגות ויורות 3 קליעים."},{id:"chainLightning",rarity:"מדהים",rarityClass:"amazing",icon:"⚡",title:"שרשרת ברקים",description:"פגיעה באויב יכולה להעביר ברק לאויבים קרובים נוספים."},{id:"rpgMiniShip",rarity:"מדהים",rarityClass:"amazing",icon:"🤖",title:"מיני־חללית RPG",description:"מוסיף מיני־חללית מיוחדת שיורה טילי RPG אוטומטיים."},{id:"blackHole",rarity:"מדהים",rarityClass:"amazing",icon:"🌌",title:"רובה חור שחור",description:"נשק חדש שמתחיל עם 4 יריות. כל ירייה יוצרת חור שחור שמושך אויבים ומטאוריטים ומתפוצץ. התחמושת חוזרת רק כאשר בוחרים שוב בקלף."},{id:"laser",rarity:"אגדי",rarityClass:"legendary",icon:"🔴",title:"מצב לייזר",description:"פותח לייזר חזק שעוקב אחרי העכבר וגורם נזק."},{id:"laserHeat",rarity:"אגדי",rarityClass:"legendary",icon:"🔥",title:"לייזר מתחמם",description:"שדרוג ללייזר שכבר פתחת. פגיעה רצופה באויבים מחממת את הקרן ומגדילה את הנזק; בכל רמה הנזק המרבי עולה וההתחממות מהירה יותר."},{id:"flamethrower",rarity:"אגדי",rarityClass:"legendary",icon:"🔥",title:"להביור",description:"פותח להביור שעוקב אחרי העכבר."},{id:"splitBullet",rarity:"אגדי",rarityClass:"legendary",icon:"🔱",title:"קליע מפוצל",description:"כל פגיעה של קליע רגיל מתפצלת. רמה I יוצרת 2 קליעים. כל רמה מגדילה את סך נזק הפיצול לפי ×1, ×2, ×3 וכן הלאה, את כמות הקליעים, הזווית, המהירות, הטווח והגודל. פיצול שני ושלישי מקבלים סיכוי לפי הרמה. מקסימום 3 דורות פיצול; שקיפות: 100%, 75%, 50%, 25%."},{id:"droneMega",rarity:"אגדי",rarityClass:"legendary",icon:"🛸",title:"מיני־חללית גדולה",description:"משדרג את המיני־חללית הגדולה ויורה 7 קליעים."}, {id:"lowHealthRage",rarity:"אדיר",rarityClass:"epic",icon:"❤️‍🔥",title:"זעם אחרון",description:"כאשר החיים של החללית נמוכים מ־50%, מהירות התנועה גדלה ב־50%, מהירות הטעינה גדלה ב־50%, הנזק גדל ב־25% והחללית זוהרת בכתום."},{id:"poison",rarity:"אדיר",rarityClass:"epic",icon:"☠️",title:"רעל",description:"כל פגיעה מרעילה את האויב. הרעל גורם נזק של 5% מה־HP המקסימלי בכל שנייה למשך 4 שניות. כל בחירה נוספת מחזקת את הרעל לפי מספר הבחירות."},{id:"burn",rarity:"אגדי",rarityClass:"legendary",icon:"🔥",title:"צריבה",description:"פגיעה יכולה להצית את האויב למשך 4 שניות. 8 פעימות נזק, אחת בכל חצי שנייה. רמה I: 10% סיכוי ו־5% מהחיים המרביים בכל פעימה. הנזק והסיכוי גדלים עד רמה XI; בוסים סופגים רבע מנזק הצריבה."},{id:"freeze",rarity:"אדיר",rarityClass:"epic",icon:"🧊",title:"הקפאה",description:"כל פגיעה יכולה להקפיא את האויב. רמה I מתחילה ב־10% סיכוי, 25% האטה ו־4 שניות. בכל בחירה הסיכוי והעוצמה ×1.5 והזמן ×1.33 (עד 90% האטה)."},{id:"stun",rarity:"אדיר",rarityClass:"epic",icon:"⚡",title:"שיתוק",description:"כל פגיעה יכולה לשתק אויב שאינו בוס. רמה I: 5% סיכוי ו־1 שנייה. בכל בחירה הסיכוי ומשך השיתוק ×1.5. בזמן השיתוק האויב לא מתקדם ולא יורה ומסתובב ברדיוס של 15% מגודלו."},{id:"continuousFire",rarity:"נדיר",rarityClass:"rare",icon:"🎯",title:"ירי רציף",description:"כל פגיעה רצופה באותו אויב מגדילה את נזק הפגיעה הבאה ב־20% מהנזק הקודם. כל שדרוג מוסיף עוד 20 נקודות אחוז לצמיחת הנזק. הפסקה של יותר מ־1.5 שניות מאפסת את הרצף."},{id:"expandedChoice",rarity:"אדיר",rarityClass:"epic",icon:"🃏",title:"בחירה מורחבת",description:"מוסיף אפשרות אחת לבחירת הקלפים בכל עליית רמה. ניתן לבחור עד 3 פעמים בכל משחק."}];
function resizeCanvas(){canvas.width=window.innerWidth;canvas.height=window.innerHeight;if(!gameStarted){player.x=canvas.width/2;player.y=canvas.height-120}}window.addEventListener("resize",resizeCanvas);
canvas.addEventListener("mousemove",e=>{mouse.x=e.clientX;mouse.y=e.clientY});
const leaderboardDifficultyNames={easy:"🟢 קל",normal:"⚪ בינוני",hard:"🟠 קשה",super:"🔴 סופר קשה",impossible:"⚫ בלתי אפשרי"};
const PROFILE_ID_KEY="galaxyDefenderProfileId_v2", PROFILE_NAME_KEY="galaxyDefenderProfileName_v2";
const SUPABASE_URL="https://xuuolwzgumkperloybwx.supabase.co";
const SUPABASE_PUBLISHABLE_KEY="sb_publishable_1W5HZKcovGMiXQSSzf3DgA_RvsDUMWI";
const supabaseClient=window.supabase?.createClient?window.supabase.createClient(SUPABASE_URL,SUPABASE_PUBLISHABLE_KEY):null;
const LEADERBOARD_PREFIX="galaxyDefenderLeaderboard_v5_";
const STATS_KEY="galaxyDefenderStats_v2";
const ACHIEVEMENTS_KEY="galaxyDefenderAchievements_v1";
const ACHIEVEMENTS_STATS_KEY="galaxyDefenderAchievementStats_v1";
const PLAYER_XP_KEY="galaxyDefenderPlayerXP_v1";
let playerXPData=loadPlayerXPData();
function loadPlayerXPData(){try{const x=JSON.parse(localStorage.getItem(PLAYER_XP_KEY)||"{}");return {xp:Number(x.xp)||0,paidCategoryBonuses:x.paidCategoryBonuses&&typeof x.paidCategoryBonuses==="object"?x.paidCategoryBonuses:{}}}catch(e){return {xp:0,paidCategoryBonuses:{}}}}
function savePlayerXPData(){try{localStorage.setItem(PLAYER_XP_KEY,JSON.stringify(playerXPData))}catch(e){}}
function playerLevelFromXP(total){return Math.floor(Math.max(0,total)/1000)+1}
function playerLevelProgress(total){const level=playerLevelFromXP(total),base=(level-1)*1000;return {level,into:total-base,needed:1000}}
function addPlayerXP(amount,applyDifficulty=true,reason=""){let value=Number(amount)||0;if(value<=0)return 0;if(applyDifficulty)value*=({easy:.5,normal:1,hard:1.5,super:2,impossible:3}[difficulty]||1);playerXPData.xp+=value;savePlayerXPData();return value}
function showPlayerXPGain(){renderPlayerXPUI()}
function renderPlayerXPUI(){const box=document.getElementById("playerXpSummary");if(!box)return;const pr=playerLevelProgress(playerXPData.xp);const pct=Math.min(100,pr.into/pr.needed*100);box.innerHTML=`<div class="playerXpTitle">⭐ רמת שחקן ${pr.level}</div><div>${playerXPData.xp.toFixed(2)} XP כולל</div><div>${pr.into.toFixed(2)} / ${pr.needed} XP לרמה הבאה</div><div class="playerXpBar"><div class="playerXpFill" style="width:${pct}%"></div></div>`}
function achievementTierName(tier){return tier==="common"?"common":tier==="rare"?"rare":tier==="epic"?"epic":"legendary"}
function checkAchievementCategoryBonus(tier,set){const bonuses={common:250,rare:500,epic:1000,legendary:2500,amazing:5000};const tierNames={common:"רגילים",rare:"נדירים",epic:"אדירים",legendary:"אגדיים",amazing:"מדהימים"};if(set&&achievementDefinitions.filter(a=>a.tier===tier).every(a=>set.has(a.id))&&!playerXPData.paidCategoryBonuses[tier]){playerXPData.paidCategoryBonuses[tier]=true;savePlayerXPData();addPlayerXP(bonuses[tier],false,"השלמת כל ההישגים ה"+tierNames[tier]);}}

const achievementDefinitions=[
{id:"firstGame",tier:"common",icon:"🎮",title:"המשחק הראשון",desc:"שחק במשחק הראשון שלך."},
{id:"m100",tier:"common",icon:"📏",title:"100 מטר",desc:"הגע ל־100 מטר במשחק אחד."},
{id:"playEasy",tier:"common",icon:"🟢",title:"שחק בקל",desc:"שחק לפחות משחק אחד בקל."},
{id:"playNormal",tier:"common",icon:"⚪",title:"שחק בבינוני",desc:"שחק לפחות משחק אחד בבינוני."},
{id:"playHard",tier:"common",icon:"🟠",title:"שחק בקשה",desc:"שחק לפחות משחק אחד בקשה."},
{id:"playSuper",tier:"common",icon:"🔴",title:"שחק בסופר קשה",desc:"שחק לפחות משחק אחד בסופר קשה."},
{id:"playImpossible",tier:"common",icon:"⚫",title:"שחק בבלתי אפשרי",desc:"שחק לפחות משחק אחד בבלתי אפשרי."},
{id:"level1",tier:"common",icon:"🆙",title:"עלה רמה פעם 1",desc:"עלה רמה בפעם הראשונה."},
{id:"meteor1",tier:"common",icon:"☄️",title:"הרוס מתאורית",desc:"הרוס מטאורית אחת."},
{id:"enemy1",tier:"common",icon:"🛸",title:"הרוס חללית אויב",desc:"הרוס חללית אויב אחת."},
{id:"meteor10",tier:"common",icon:"☄️",title:"הרוס 10 מתאוריתים",desc:"הרוס 10 מטאוריתים בסך הכול."},
{id:"enemy10",tier:"common",icon:"🛸",title:"הרוס 10 חלליות אויב",desc:"הרוס 10 חלליות אויב בסך הכול."},
{id:"commonCard1",tier:"common",icon:"🃏",title:"פתח קלף רגיל",desc:"פתח קלף רגיל."},
{id:"rareCard1",tier:"common",icon:"🃏",title:"פתח קלף נדיר",desc:"פתח קלף נדיר."},

{id:"allDifficulties",tier:"rare",icon:"🌈",title:"נשא את כל רמות הקושי",desc:"שחק בכל 5 דרגות הקושי."},
{id:"m500",tier:"rare",icon:"📏",title:"500 מטר",desc:"הגע ל־500 מטר במשחק אחד."},
{id:"m1000",tier:"rare",icon:"📏",title:"1000 מטר",desc:"הגע ל־1000 מטר במשחק אחד."},
{id:"boss1",tier:"rare",icon:"👹",title:"הרוג בוס",desc:"הרוג בוס אחד."},
{id:"meteor50",tier:"rare",icon:"☄️",title:"הרוס 50 מטעוריתים",desc:"הרוס 50 מטאוריתים בסך הכול."},
{id:"meteor100",tier:"rare",icon:"☄️",title:"הרוס 100 מטעוריטים",desc:"הרוס 100 מטאוריטים בסך הכול."},
{id:"enemy50",tier:"rare",icon:"🛸",title:"הרוס 50 חלליות אויב",desc:"הרוס 50 חלליות אויב בסך הכול."},
{id:"enemy100",tier:"rare",icon:"🛸",title:"הרוס 100 חלליות אויב",desc:"הרוס 100 חלליות אויב בסך הכול."},
{id:"level5",tier:"rare",icon:"⭐",title:"הגע לרמה 5 במשחק אחד",desc:"הגע לרמה 5 במשחק אחד."},
{id:"level10",tier:"rare",icon:"⭐",title:"הגע לרמה 10",desc:"הגע לרמה 10 במשחק אחד."},
{id:"levels25",tier:"rare",icon:"🆙",title:"עבור 25 רמות",desc:"עלה 25 רמות בסך הכול, לא חייב ברצף."},
{id:"impossible100",tier:"rare",icon:"⚫",title:"שרוד 100 מטר בבלתי אפשרי",desc:"הגע ל־100 מטר במשחק בבלתי אפשרי."},
{id:"epicCard1",tier:"rare",icon:"🃏",title:"פתח קלף אדיר",desc:"פתח קלף אדיר."},
{id:"legendaryCard1",tier:"rare",icon:"🃏",title:"פתח קלף אגדי",desc:"פתח קלף אגדי."},
{id:"commonCards10",tier:"rare",icon:"🃏",title:"פתח 10 קלפים רגילים",desc:"פתח 10 קלפים רגילים בסך הכול."},
{id:"rareCards5",tier:"rare",icon:"🃏",title:"פתח 5 קלפים נדירים",desc:"פתח 5 קלפים נדירים בסך הכול."},

{id:"meteor500",tier:"epic",icon:"☄️",title:"הרוס 500 מטאוריטים",desc:"הרוס 500 מטאוריטים בסך הכול."},
{id:"enemy500",tier:"epic",icon:"🛸",title:"הרוס 500 חלילות אויב",desc:"הרוס 500 חלליות אויב בסך הכול."},
{id:"m3000",tier:"epic",icon:"📏",title:"3000 מטר",desc:"הגע ל־3000 מטר במשחק אחד."},
{id:"m5000",tier:"epic",icon:"📏",title:"5000 מטר",desc:"הגע ל־5000 מטר במשחק אחד."},
{id:"boss10",tier:"epic",icon:"👹",title:"הרוס 10 בוסים",desc:"הרוג 10 בוסים בסך הכול."},
{id:"splitBoss1",tier:"epic",icon:"💚",title:"הרוס בוס מתפצל",desc:"הרוג בוס מתפצל."},
{id:"impossible300",tier:"epic",icon:"⚫",title:"שרוד 300 מטר בבלתי אפשרי",desc:"הגע ל־300 מטר בבלתי אפשרי."},
{id:"level20",tier:"epic",icon:"⭐",title:"הגעה לרמה 20 במשחק אחד",desc:"הגע לרמה 20 במשחק אחד."},
{id:"levels50",tier:"epic",icon:"🆙",title:"עלה 50 רמות",desc:"עלה 50 רמות בסך הכול, לא חייב ברצף."},
{id:"commonCards20",tier:"epic",icon:"🃏",title:"פתח 20 קלפים רגילים",desc:"פתח 20 קלפים רגילים בסך הכול."},
{id:"rareCards10",tier:"epic",icon:"🃏",title:"פתח 10 קלפים נדירים",desc:"פתח 10 קלפים נדירים בסך הכול."},
{id:"epicCards5",tier:"epic",icon:"🃏",title:"פתח 5 קלפים אדירים",desc:"פתח 5 קלפים אדירים בסך הכול."},
{id:"legendaryCards5",tier:"epic",icon:"🃏",title:"פתח 5 קלפים אגדים",desc:"פתח 5 קלפים אגדיים בסך הכול."},

{id:"meteor1000",tier:"legendary",icon:"☄️",title:"הרוס 1000 מטאוריתים",desc:"הרוס 1000 מטאוריתים בסך הכול."},
{id:"enemy1000",tier:"legendary",icon:"🛸",title:"הרוס 1000 חלליות אויב",desc:"הרוס 1000 חלליות אויב בסך הכול."},
{id:"m7500",tier:"legendary",icon:"📏",title:"7500 מטר",desc:"הגע ל־7500 מטר במשחק אחד."},
{id:"m10000",tier:"legendary",icon:"📏",title:"10000 מטר",desc:"הגע ל־10000 מטר במשחק אחד."},
{id:"boss25",tier:"legendary",icon:"👹",title:"הרוס 25 בוסים",desc:"הרוג 25 בוסים בסך הכול."},
{id:"splitBoss10",tier:"legendary",icon:"💚",title:"הרוס 10 בוסים מתפצלים",desc:"הרוג 10 בוסים מתפצלים."},
{id:"impossible750",tier:"legendary",icon:"⚫",title:"שרוד 750 מטר בבלתי אפשרי",desc:"הגע ל־750 מטר בבלתי אפשרי."},
{id:"level30",tier:"legendary",icon:"⭐",title:"רמה 30 במשחק אחד",desc:"הגע לרמה 30 במשחק אחד."},
{id:"level50",tier:"legendary",icon:"👑",title:"רמה 50 במשחק אחד",desc:"הגע לרמה 50 במשחק אחד."},
{id:"levels75",tier:"legendary",icon:"🆙",title:"עלה 75 רמות",desc:"עלה 75 רמות בסך הכול, לא חייב ברצף."},
{id:"legendaryCards10",tier:"legendary",icon:"🃏",title:"פתח 10 קלפים אגדיים",desc:"פתח 10 קלפים אגדיים בסך הכול."},
{id:"epicCards20",tier:"legendary",icon:"🃏",title:"פתח 20 קלפים אדירים",desc:"פתח 20 קלפים אדירים בסך הכול."},
{id:"rareCards35",tier:"legendary",icon:"🃏",title:"פתח 35 קלפים נדירים",desc:"פתח 35 קלפים נדירים בסך הכול."},
{id:"commonCards50",tier:"legendary",icon:"🃏",title:"פתח 50 קלפים רגילים",desc:"פתח 50 קלפים רגילים בסך הכול."},

{id:"amazingCard1",tier:"legendary",icon:"✨",title:"קלף מדהים ראשון",desc:"פתח את קלף המדהים הראשון שלך."},

{id:"amazingCards10",tier:"amazing",icon:"✨",title:"10 קלפים מדהימים",desc:"פתח 10 קלפים מדהימים בסך הכול."},
{id:"legendaryCards25",tier:"amazing",icon:"🃏",title:"פתחו 25 קלפים אגדיים",desc:"פתח 25 קלפים אגדיים בסך הכול."},
{id:"epicCards50",tier:"amazing",icon:"🃏",title:"פתחו 50 קלפים אדירים",desc:"פתח 50 קלפים אדירים בסך הכול."},
{id:"rareCards75",tier:"amazing",icon:"🃏",title:"פתחו 75 קלפים נדירים",desc:"פתח 75 קלפים נדירים בסך הכול."},
{id:"commonCards150",tier:"amazing",icon:"🃏",title:"פתחו 150 קלפים רגילים",desc:"פתח 150 קלפים רגילים בסך הכול."},
{id:"levels150",tier:"amazing",icon:"🆙",title:"עלה 150 רמות",desc:"עלה 150 רמות בסך הכול."},
{id:"level100",tier:"amazing",icon:"👑",title:"עלה לרמה 100 במשחק אחד",desc:"הגע לרמה 100 במשחק אחד."},
{id:"specialBoss25",tier:"amazing",icon:"👹",title:"הרוס 25 בוסים מיוחדים",desc:"הרוס 25 בוסים מיוחדים בסך הכול."},
{id:"boss50",tier:"amazing",icon:"👹",title:"הרוס 50 בוסים",desc:"הרוס 50 בוסים בסך הכול."},
{id:"impossible1500",tier:"amazing",icon:"⚫",title:"שרוד 1500 מטר בבלתי אפשרי",desc:"הגע ל־1500 מטר במשחק בבלתי אפשרי."},
{id:"impossibleBoss1",tier:"amazing",icon:"☠️",title:"הרוס בוס בבלתי אפשרי",desc:"הרוס בוס אחד במהלך משחק בבלתי אפשרי."},
{id:"m25000",tier:"amazing",icon:"📏",title:"25000 מטר",desc:"הגע ל־25000 מטר במשחק אחד."},
{id:"enemy2500",tier:"amazing",icon:"🛸",title:"הרוס 2500 חלליות",desc:"הרוס 2500 חלליות אויב בסך הכול."},
{id:"meteor2500",tier:"amazing",icon:"☄️",title:"הרוס 2500 מטאוריטים",desc:"הרוס 2500 מטאוריטים בסך הכול."}
];
const DAILY_MISSIONS_KEY="galaxyDefenderDailyMissions_v2",DAILY_TIER_XP={common:30,rare:50,epic:75,legendary:100,amazing:150},DAILY_POOL=[{id:"distance250",kind:"distance",target:250,tier:"common",icon:"📏",title:"שרוד 250 מטר"},{id:"meteor10",kind:"meteors",target:10,tier:"common",icon:"☄️",title:"הרוס 10 מטאוריטים"},{id:"enemy5",kind:"enemies",target:5,tier:"common",icon:"🛸",title:"הרוס 5 חלליות אויב"},{id:"xp500",kind:"playerXP",target:500,tier:"rare",icon:"⭐",title:"צבור 500 XP לשחקן"},{id:"level3",kind:"levels",target:3,tier:"rare",icon:"🆙",title:"עלה 3 רמות"},{id:"distance750",kind:"distance",target:750,tier:"rare",icon:"🚀",title:"שרוד 750 מטר"},{id:"meteor25",kind:"meteors",target:25,tier:"epic",icon:"☄️",title:"הרוס 25 מטאוריטים"},{id:"enemy15",kind:"enemies",target:15,tier:"epic",icon:"🛸",title:"הרוס 15 חלליות אויב"},{id:"boss1",kind:"bosses",target:1,tier:"legendary",icon:"👹",title:"הרוג בוס"},{id:"distance1500",kind:"distance",target:1500,tier:"legendary",icon:"🌌",title:"שרוד 1500 מטר"},{id:"meteor50",kind:"meteors",target:50,tier:"amazing",icon:"☄️",title:"הרוס 50 מטאוריטים"},{id:"enemy30",kind:"enemies",target:30,tier:"amazing",icon:"🛸",title:"הרוס 30 חלליות אויב"}];function dailyDateKey(ts=Date.now()){const d=new Date(ts);return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")}function dailyHash(str){let h=2166136261;for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}function dailyPickMissions(key){const a=DAILY_POOL.slice(),picked=[];let state=dailyHash(key);while(picked.length<5&&a.length){state=(Math.imul(state,1664525)+1013904223)>>>0;const i=state%a.length;picked.push(a.splice(i,1)[0])}return picked}function dailyStatsSnapshot(){const st=getAchievementStats();return {meteors:Number(st.meteors)||0,enemies:Number(st.enemies)||0,bosses:Number(st.bosses)||0,levels:Number(st.levels)||0,playerXP:Number(playerXPData.xp)||0}}function loadDailyMissions(){try{const x=JSON.parse(localStorage.getItem(DAILY_MISSIONS_KEY)||"null");return x&&Array.isArray(x.missions)?x:null}catch(e){return null}}function saveDailyMissions(){try{localStorage.setItem(DAILY_MISSIONS_KEY,JSON.stringify(dailyData))}catch(e){}}let dailyData=loadDailyMissions();function ensureDailyMissions(){const now=Date.now(),today=dailyDateKey(now);if(!dailyData){const b=dailyStatsSnapshot();dailyData={date:today,lastSeen:now,streak:0,streakAwardedDate:"",missions:dailyPickMissions(today).map(m=>Object.assign({},m,{completed:false,rewardClaimed:false})),baseline:b};saveDailyMissions();return}const elapsed=now-(Number(dailyData.lastSeen)||now);if(elapsed>86400000)dailyData.streak=0;if(dailyData.date!==today){const b=dailyStatsSnapshot();dailyData={date:today,lastSeen:now,streak:Number(dailyData.streak)||0,streakAwardedDate:"",missions:dailyPickMissions(today).map(m=>Object.assign({},m,{completed:false,rewardClaimed:false})),baseline:b}}else dailyData.lastSeen=now;saveDailyMissions()}function dailyMissionProgress(m){const b=dailyData.baseline||{},st=dailyStatsSnapshot();if(m.kind==="distance")return Math.max(0,Math.floor(distance));if(m.kind==="meteors")return Math.max(0,st.meteors-(b.meteors||0));if(m.kind==="enemies")return Math.max(0,st.enemies-(b.enemies||0));if(m.kind==="bosses")return Math.max(0,st.bosses-(b.bosses||0));if(m.kind==="levels")return Math.max(0,st.levels-(b.levels||0));if(m.kind==="playerXP")return Math.max(0,Math.floor(st.playerXP-(b.playerXP||0)));return 0}function dailyTierName(t){return t==="common"?"רגיל":t==="rare"?"נדיר":t==="epic"?"אדיר":t==="legendary"?"אגדי":"מדהים"}function updateDailyMissions(){if(!dailyData)ensureDailyMissions();let changed=false;dailyData.missions.forEach(m=>{if(m.completed)return;const p=dailyMissionProgress(m);if(p>=m.target){m.completed=true;if(!m.rewardClaimed){m.rewardClaimed=true;addPlayerXP(DAILY_TIER_XP[m.tier]||0,false,"משימה יומית: "+m.title)}changed=true}});const all=dailyData.missions.length===5&&dailyData.missions.every(m=>m.completed);if(all&&dailyData.streakAwardedDate!==dailyData.date){dailyData.streak=(Number(dailyData.streak)||0)+1;dailyData.streakAwardedDate=dailyData.date;addPlayerXP(100,false,"בונוס 5 משימות יומיות");if(dailyData.streak>=1)unlockAchievement("dailyStreak1");if(dailyData.streak>=3)unlockAchievement("dailyStreak3");if(dailyData.streak>=7)unlockAchievement("dailyStreak7");if(dailyData.streak>=14)unlockAchievement("dailyStreak14");if(dailyData.streak>=30)unlockAchievement("dailyStreak30");changed=true}if(changed)saveDailyMissions();renderDailyMissions()}function renderHomeDailyMissions(){const box=document.getElementById("homeDailyMissions"),count=document.getElementById("homeDailyCount");if(!box||!dailyData)return;const done=dailyData.missions.filter(m=>m.completed).length;if(count)count.textContent=done+"/5"}function renderDailyMissions(){const list=document.getElementById("dailyMissionsList"),summary=document.getElementById("dailyMissionsSummary"),streak=document.getElementById("dailyMissionsStreak");if(!list||!summary||!streak||!dailyData)return;const done=dailyData.missions.filter(m=>m.completed).length,all=done===5;streak.textContent="🔥 רצף: "+(dailyData.streak||0)+" ימים";summary.innerHTML="<b>"+done+"/5 משימות הושלמו היום</b>";list.innerHTML=dailyData.missions.map(m=>{const p=Math.min(m.target,dailyMissionProgress(m)),pct=Math.min(100,p/m.target*100),reward=DAILY_TIER_XP[m.tier]||0;return '<div class="dailyMissionRow '+(m.completed?"done":"")+'"><div class="dailyMissionIcon">'+m.icon+'</div><div><div class="dailyMissionTitle">'+m.title+' <span style="font-size:12px;opacity:.75">('+dailyTierName(m.tier)+')</span></div><div class="dailyMissionProgress"><div class="dailyMissionFill" style="width:'+pct+'%"></div></div><div style="font-size:12px;margin-top:4px">'+p+' / '+m.target+'</div></div><div class="dailyMissionReward">'+(m.completed?"✅ הושלם":"+"+reward+" XP")+'</div></div>'}).join("");const bonus=document.getElementById("dailyMissionsBonus");if(bonus)bonus.outerHTML='<div id="dailyMissionsBonus" class="dailyMissionsBonus '+(all?"done":"")+'">'+(all?"🎁 כל 5 המשימות הושלמו! +100 XP":"🎁 השלמת כל 5 המשימות: +100 XP")+'</div>';else list.insertAdjacentHTML("afterend",'<div id="dailyMissionsBonus" class="dailyMissionsBonus '+(all?"done":"")+'">'+(all?"🎁 כל 5 המשימות הושלמו! +100 XP":"🎁 השלמת כל 5 המשימות: +100 XP")+'</div>')}renderHomeDailyMissions();ensureDailyMissions();renderHomeDailyMissions();setInterval(updateDailyMissions,1000);
function getAchievementState(){try{const x=JSON.parse(localStorage.getItem(ACHIEVEMENTS_KEY)||"[]");return Array.isArray(x)?new Set(x):new Set()}catch(e){return new Set()}}
function getAchievementStats(){try{const x=JSON.parse(localStorage.getItem(ACHIEVEMENTS_STATS_KEY)||"{}");return Object.assign({games:0,levels:0,meteors:0,enemies:0,bosses:0,splitBosses:0,commonCards:0,rareCards:0,epicCards:0,legendaryCards:0,amazingCards:0,specialBosses:0,impossibleBosses:0,played:{}},x)}catch(e){return {games:0,levels:0,meteors:0,enemies:0,bosses:0,splitBosses:0,commonCards:0,rareCards:0,epicCards:0,legendaryCards:0,amazingCards:0,played:{}}}}
function saveAchievementState(set){try{localStorage.setItem(ACHIEVEMENTS_KEY,JSON.stringify([...set]))}catch(e){}}
function saveAchievementStats(st){try{localStorage.setItem(ACHIEVEMENTS_STATS_KEY,JSON.stringify(st))}catch(e){}}
function unlockAchievement(id){const def=achievementDefinitions.find(a=>a.id===id);if(!def)return;const set=getAchievementState();if(set.has(id))return;set.add(id);saveAchievementState(set);const reward={common:25,rare:50,epic:100,legendary:250,amazing:500}[def.tier]||0;addPlayerXP(reward,false,"הישג: "+def.title);showAchievementToast(def);checkAchievementCategoryBonus(def.tier,set)}
function showAchievementToast(def){let toast=document.getElementById("achievementToast");if(!toast){toast=document.createElement("div");toast.id="achievementToast";toast.className="achievementToast";document.body.appendChild(toast)}toast.className="achievementToast "+def.tier;toast.innerHTML=`<div class="big">🏅 ${def.icon}</div><div>הישג חדש!</div><div class="name">${def.title}</div>`;requestAnimationFrame(()=>toast.classList.add("show"));clearTimeout(window.achievementToastTimer);window.achievementToastTimer=setTimeout(()=>toast.classList.remove("show"),2800)}
function achievementSnapshot(){return [...getAchievementState()]}
function checkAchievements(){const st=getAchievementStats(),d=Math.floor(distance);if(st.games>=1)unlockAchievement("firstGame");if(d>=100)unlockAchievement("m100");if(d>=500)unlockAchievement("m500");if(d>=1000)unlockAchievement("m1000");if(d>=3000)unlockAchievement("m3000");if(d>=5000)unlockAchievement("m5000");if(d>=7500)unlockAchievement("m7500");if(d>=10000)unlockAchievement("m10000");if(d>=25000)unlockAchievement("m25000");if(level>=2)unlockAchievement("level1");if(level>=5)unlockAchievement("level5");if(level>=10)unlockAchievement("level10");if(level>=20)unlockAchievement("level20");if(level>=30)unlockAchievement("level30");if(level>=50)unlockAchievement("level50");if(level>=100)unlockAchievement("level100");if(difficulty==="impossible"){if(d>=100)unlockAchievement("impossible100");if(d>=300)unlockAchievement("impossible300");if(d>=750)unlockAchievement("impossible750");if(d>=1500)unlockAchievement("impossible1500")}if(st.meteors>=1)unlockAchievement("meteor1");if(st.meteors>=10)unlockAchievement("meteor10");if(st.meteors>=50)unlockAchievement("meteor50");if(st.meteors>=100)unlockAchievement("meteor100");if(st.meteors>=500)unlockAchievement("meteor500");if(st.meteors>=1000)unlockAchievement("meteor1000");if(st.meteors>=2500)unlockAchievement("meteor2500");if(st.enemies>=1)unlockAchievement("enemy1");if(st.enemies>=10)unlockAchievement("enemy10");if(st.enemies>=50)unlockAchievement("enemy50");if(st.enemies>=100)unlockAchievement("enemy100");if(st.enemies>=500)unlockAchievement("enemy500");if(st.enemies>=1000)unlockAchievement("enemy1000");if(st.enemies>=2500)unlockAchievement("enemy2500");if(st.bosses>=1)unlockAchievement("boss1");if(st.bosses>=10)unlockAchievement("boss10");if(st.bosses>=25)unlockAchievement("boss25");if(st.bosses>=50)unlockAchievement("boss50");if(st.splitBosses>=1)unlockAchievement("splitBoss1");if(st.splitBosses>=10)unlockAchievement("splitBoss10");if(st.specialBosses>=25)unlockAchievement("specialBoss25");if(st.impossibleBosses>=1)unlockAchievement("impossibleBoss1");if(st.levels>=25)unlockAchievement("levels25");if(st.levels>=50)unlockAchievement("levels50");if(st.levels>=75)unlockAchievement("levels75");if(st.levels>=150)unlockAchievement("levels150");if(st.commonCards>=1)unlockAchievement("commonCard1");if(st.commonCards>=10)unlockAchievement("commonCards10");if(st.commonCards>=20)unlockAchievement("commonCards20");if(st.commonCards>=50)unlockAchievement("commonCards50");if(st.commonCards>=150)unlockAchievement("commonCards150");if(st.rareCards>=1)unlockAchievement("rareCard1");if(st.rareCards>=5)unlockAchievement("rareCards5");if(st.rareCards>=10)unlockAchievement("rareCards10");if(st.rareCards>=35)unlockAchievement("rareCards35");if(st.rareCards>=75)unlockAchievement("rareCards75");if(st.epicCards>=1)unlockAchievement("epicCard1");if(st.epicCards>=5)unlockAchievement("epicCards5");if(st.epicCards>=20)unlockAchievement("epicCards20");if(st.epicCards>=50)unlockAchievement("epicCards50");if(st.legendaryCards>=1)unlockAchievement("legendaryCard1");if(st.legendaryCards>=5)unlockAchievement("legendaryCards5");if(st.legendaryCards>=10)unlockAchievement("legendaryCards10");if(st.legendaryCards>=25)unlockAchievement("legendaryCards25");if(st.amazingCards>=1)unlockAchievement("amazingCard1");if(st.amazingCards>=10)unlockAchievement("amazingCards10");if(Object.keys(st.played||{}).filter(k=>st.played[k]>0).length>=5)unlockAchievement("allDifficulties")}
function renderAchievements(snapshot=null){const set=snapshot instanceof Set?snapshot:new Set(snapshot||getAchievementState());achievementsGrid.innerHTML="";const tiers={common:"הישגים רגילים",rare:"הישגים נדירים",epic:"הישגים אדירים",legendary:"הישגים אגדיים",amazing:"הישגים מדהימים"};const tierCounts={};Object.keys(tiers).forEach(tier=>{const total=achievementDefinitions.filter(a=>a.tier===tier).length;const unlocked=achievementDefinitions.filter(a=>a.tier===tier&&set.has(a.id)).length;tierCounts[tier]={unlocked,total}});const totalUnlocked=Object.values(tierCounts).reduce((sum,x)=>sum+x.unlocked,0);const totalAchievements=achievementDefinitions.length;const percent=totalAchievements?Math.round(totalUnlocked/totalAchievements*100):0;achievementsSummary.innerHTML=`<div class="achievementSummary"><div class="achievementSummaryBox">⚪ הישגים רגילים: ${tierCounts.common.unlocked}/${tierCounts.common.total}</div><div class="achievementSummaryBox">🟢 הישגים נדירים: ${tierCounts.rare.unlocked}/${tierCounts.rare.total}</div><div class="achievementSummaryBox">🟣 הישגים אדירים: ${tierCounts.epic.unlocked}/${tierCounts.epic.total}</div><div class="achievementSummaryBox">🟡 הישגים אגדיים: ${tierCounts.legendary.unlocked}/${tierCounts.legendary.total}</div><div class="achievementSummaryBox">🔴 הישגים מדהימים: ${tierCounts.amazing.unlocked}/${tierCounts.amazing.total}</div></div><div class="achievementSummaryTotal">🏅 סך הכול הישגים: ${totalUnlocked}/${totalAchievements}</div><div class="achievementSummaryPercent">${percent}% הושלמו</div>`;Object.keys(tiers).forEach(tier=>{const title=document.createElement("div");title.style.gridColumn="1/-1";title.style.fontSize="22px";title.style.fontWeight="bold";title.style.marginTop="8px";title.textContent=`${tiers[tier]}: ${tierCounts[tier].unlocked}/${tierCounts[tier].total}`;achievementsGrid.appendChild(title);achievementDefinitions.filter(a=>a.tier===tier).forEach(a=>{const card=document.createElement("div");card.className=`achievementCard ${tier} ${set.has(a.id)?"unlocked":""}`;card.innerHTML=`<div class="achievementIcon">${a.icon}</div><div class="achievementTitle">${a.title}</div><div class="achievementDesc">${a.desc}</div><div style="margin-top:7px">${set.has(a.id)?"✅ הושג":"🔒 נעול"}</div>`;achievementsGrid.appendChild(card)})})}
function openAchievements(snapshot=null){checkAchievements();renderAchievements(snapshot);achievementsOverlay.style.display="flex"}
function closeAchievements(){achievementsOverlay.style.display="none"}

const playerProfileId=(()=>{let id=localStorage.getItem(PROFILE_ID_KEY);if(!id){id="p_"+Date.now().toString(36)+"_"+Math.random().toString(36).slice(2,10);localStorage.setItem(PROFILE_ID_KEY,id)}return id})();
let profileName=localStorage.getItem(PROFILE_NAME_KEY)||"שחקן";
profileNameInput.value=profileName;homeProfileName.textContent=profileName;renderPlayerXPUI();
function leaderboardKey(mode){return LEADERBOARD_PREFIX+mode}
let globalLeaderboardCache=Object.fromEntries(Object.keys(difficultySettings).map(k=>[k,[]]));
let globalLeaderboardReady=false;
function normalizeGlobalLeaderboard(rows){
  const seen=new Set(),out=[];
  for(const r of Array.isArray(rows)?rows:[]){
    const playerId=String(r.player_id||"").trim();
    if(!playerId||seen.has(playerId))continue;
    seen.add(playerId);
    out.push({
      playerId,
      name:String(r.player_name||"שחקן").slice(0,20),
      distance:Number(r.distance)||0,
      level:Number(r.level)||1,
      date:r.created_at?Date.parse(r.created_at)||Date.now():Date.now(),
      achievements:Array.isArray(r.achievements)?r.achievements:[]
    });
  }
  return out.sort((a,b)=>Number(b.distance)-Number(a.distance)||Number(b.level)-Number(a.level)||Number(a.date)-Number(b.date)).slice(0,100);
}
function getLeaderboard(mode){
  const list=globalLeaderboardCache[mode];
  return Array.isArray(list)?list.slice():[];
}
async function loadGlobalLeaderboard(mode){
  if(!supabaseClient)return [];
  try{
    const {data,error}=await supabaseClient.from("leaderboard")
      .select("id,player_id,player_name,distance,level,difficulty,created_at,achievements")
      .eq("difficulty",mode)
      .order("distance",{ascending:false})
      .order("level",{ascending:false})
      .order("created_at",{ascending:true})
      .limit(500);
    if(error)throw error;
    const list=normalizeGlobalLeaderboard(data);
    globalLeaderboardCache[mode]=list;
    globalLeaderboardReady=true;
    return list;
  }catch(e){
    console.warn("Global leaderboard unavailable.",e);
    globalLeaderboardCache[mode]=[];
    return [];
  }
}
async function loadAllGlobalLeaderboards(){
  await Promise.all(Object.keys(difficultySettings).map(loadGlobalLeaderboard));
  await updateGlobalPlayerCount();
  renderLeaderboard(difficulty);
}
async function registerGlobalPlayer(){
  if(!supabaseClient)return;
  try{
    await supabaseClient.from("player_registry").upsert({
      player_id:playerProfileId,
      player_name:(String(profileName||"שחקן").trim()||"שחקן").slice(0,20),
      last_seen:new Date().toISOString()
    },{onConflict:"player_id"});
  }catch(e){console.warn("Global player registration failed.",e)}
}
async function getGlobalPlayerCount(){
  if(!supabaseClient)return null;
  try{
    const {count,error}=await supabaseClient.from("player_registry").select("player_id",{count:"exact",head:true});
    if(error)throw error;
    return Number(count)||0;
  }catch(e){console.warn("Global player count unavailable.",e);return null}
}
async function updateGlobalPlayerCount(){
  const el=document.getElementById("globalPlayerCount");if(!el)return;
  const count=await getGlobalPlayerCount();
  if(count!==null)el.textContent="👥 שחקנים ששיחקו אי פעם: "+count;
}
function getStats(){try{const x=JSON.parse(localStorage.getItem(STATS_KEY)||"{}");return {totalTime:Number(x.totalTime)||0,games:Number(x.games)||0,played:x.played&&typeof x.played==="object"?x.played:{}}}catch(e){return {totalTime:0,games:0,played:{}}}}
function saveStatsForGame(){const st=getStats();st.totalTime+=Math.max(0,Math.floor(gameTime));st.games++;st.played[difficulty]=(Number(st.played[difficulty])||0)+1;try{localStorage.setItem(STATS_KEY,JSON.stringify(st))}catch(e){}}
function setProfileName(name){profileName=(String(name||"").trim()||"שחקן").slice(0,16);localStorage.setItem(PROFILE_NAME_KEY,profileName);homeProfileName.textContent=profileName}
function getPersonalBest(mode=difficulty){
  const list=getLeaderboard(mode);
  const mine=list.find(x=>x.playerId===playerProfileId);
  return mine?Number(mine.distance)||0:0;
}
function checkLiveRecord(){
  if(!gameStarted||!gameRunning||recordBroken)return;
  const d=Math.floor(distance);
  if(personalBestAtStart>0&&d>personalBestAtStart){
    recordBroken=true;
    showMessage("🏆 שיא חדש! "+d+"m");
    const banner=document.getElementById("recordLiveBanner");
    if(banner){banner.textContent="🏆 שיא חדש! "+d+"m";banner.style.display="block";clearTimeout(window.recordBannerTimer);window.recordBannerTimer=setTimeout(()=>banner.style.display="none",2200)}
  }
}
async function saveLeaderboardScore(){
  if(scoreSaved)return -1;
  scoreSaved=true;
  if(!supabaseClient)return -1;
  const name=(String(profileName||"שחקן").trim()||"שחקן").slice(0,20);
  const entry={
    player_id:playerProfileId,
    player_name:name,
    score:Math.floor(distance),
    distance:Math.floor(distance),
    level:Number(level),
    difficulty,
    achievements:achievementSnapshot()
  };
  try{
    const {error}=await supabaseClient.from("leaderboard").insert(entry);
    if(error)throw error;
    const list=await loadGlobalLeaderboard(difficulty);
    const rank=list.findIndex(x=>x.playerId===playerProfileId&&Number(x.distance)===entry.distance);
    return rank>=0&&rank<100?rank:-1;
  }catch(e){
    console.warn("Global leaderboard save failed.",e);
    return -1;
  }
}
function renderLeaderboard(mode=difficulty){
  leaderboardTabs.innerHTML="";
  Object.keys(difficultySettings).forEach(key=>{const btn=document.createElement("button");btn.type="button";btn.textContent=leaderboardDifficultyNames[key];if(key===mode)btn.classList.add("active");btn.addEventListener("click",()=>renderLeaderboard(key));leaderboardTabs.appendChild(btn)});
  const list=getLeaderboard(mode);leaderboardBody.innerHTML="";
  if(!list.length){leaderboardBody.innerHTML='<tr><td colspan="4">אין עדיין תוצאות. היה הראשון!</td></tr>';return}
  list.forEach((entry,i)=>{const tr=document.createElement("tr");const tdName=document.createElement("td");const b=document.createElement("button");b.type="button";b.className="leaderboardUser";b.textContent=entry.name||"שחקן";b.addEventListener("click",()=>openPublicProfile(entry.playerId,entry.name||"שחקן"));tdName.appendChild(b);tr.appendChild(Object.assign(document.createElement("td"),{textContent:String(i+1)}));tr.appendChild(tdName);tr.appendChild(Object.assign(document.createElement("td"),{textContent:"📏 "+Math.floor(entry.distance)+"m"}));tr.appendChild(Object.assign(document.createElement("td"),{textContent:"⭐ "+Math.floor(entry.level||1)}));leaderboardBody.appendChild(tr)});
}
let viewedProfileId=playerProfileId,viewedProfileAchievementSnapshot=null;
function formatDuration(seconds){const total=Math.max(0,Math.floor(seconds)),d=Math.floor(total/86400),h=Math.floor(total%86400/3600),m=Math.floor(total%3600/60),sec=total%60;return (d?d+" ימים ":"")+(h?String(h).padStart(2,"0")+":":"")+String(m).padStart(2,"0")+":"+String(sec).padStart(2,"0")}
function profileBestFor(id){const out={};Object.keys(difficultySettings).forEach(mode=>{const e=getLeaderboard(mode).find(x=>x.playerId===id);out[mode]=e?Math.floor(e.distance):0});return out}
function renderProfile(id=playerProfileId,name=profileName,editable=id===playerProfileId){viewedProfileId=id;viewedProfileAchievementSnapshot=null;if(!editable){for(const mode of Object.keys(difficultySettings)){const e=getLeaderboard(mode).find(x=>x.playerId===id);if(e&&Array.isArray(e.achievements))viewedProfileAchievementSnapshot=new Set([...(viewedProfileAchievementSnapshot||new Set()),...e.achievements])}}
  profileNameInput.value=name||"שחקן";profileNameInput.disabled=!editable;saveProfileNameButton.style.display=editable?"inline-block":"none";
  const st=editable?getStats():getStats(); const best=profileBestFor(id); const played=st.played;
  profileStats.innerHTML=`<div class="profileStat">⏱️ זמן משחק<br><b>${formatDuration(st.totalTime)}</b></div><div class="profileStat">🎮 משחקים<br><b>${st.games}</b></div>`;
  const achievementSet=editable?getAchievementState():(viewedProfileAchievementSnapshot||new Set());
  const achievementCount=[...achievementSet].filter(a=>achievementDefinitions.some(d=>d.id===a)).length;
  const achievementTotal=achievementDefinitions.length;
  const achievementPercent=achievementTotal?Math.round(achievementCount/achievementTotal*100):0;
  const achievementTiers={common:"⚪ הישגים רגילים",rare:"🟢 הישגים נדירים",epic:"🟣 הישגים אדירים",legendary:"🟡 הישגים אגדיים"};const achievementTierHtml=Object.keys(achievementTiers).map(tier=>{const total=achievementDefinitions.filter(a=>a.tier===tier).length;const unlocked=achievementDefinitions.filter(a=>a.tier===tier&&achievementSet.has(a.id)).length;return `<div class="profileAchievementTier">${achievementTiers[tier]}: ${unlocked}/${total}</div>`}).join("");renderPlayerXPUI();
  profileAchievementSummary.innerHTML=`<div class="profileAchievementTitle">🏅 הישגים</div><div class="profileAchievementCounts">${achievementTierHtml}</div><div class="profileAchievementPercent">${achievementPercent}% הושלמו</div><div class="profileAchievementBar"><div class="profileAchievementFill" style="width:${achievementPercent}%"></div></div><div style="margin-top:7px"><b>סך הכול: ${achievementCount}/${achievementTotal}</b></div>`;
  profileBestBody.innerHTML="";
  Object.keys(difficultySettings).forEach(mode=>{const tr=document.createElement("tr");const playedCount=Number(played[mode])||0;tr.innerHTML=`<td>${leaderboardDifficultyNames[mode]}</td><td>${editable?playedCount:"—"}</td><td>${best[mode]?"📏 "+best[mode]+"m":"—"}</td>`;profileBestBody.appendChild(tr)});
  profileOverlay.style.display="flex";
}
function openPublicProfile(id,name){closeLeaderboard();renderProfile(id,name,false)}
function openMyProfile(){renderProfile();}
function closeProfile(){profileOverlay.style.display="none";profileNameInput.disabled=false;}
function escapeHtml(value){
  return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
}
function formatTime(seconds){const total=Math.floor(seconds),h=Math.floor(total/3600),m=Math.floor(total%3600/60),sec=total%60;return (h?String(h).padStart(2,"0")+":":"")+String(m).padStart(2,"0")+":"+String(sec).padStart(2,"0")}
const COLLECTION_UNLOCKS_KEY="galaxyDefenderCollectionUnlocks_v1";
function loadCollectionUnlocks(){try{const x=JSON.parse(localStorage.getItem(COLLECTION_UNLOCKS_KEY)||"[]");return new Set(Array.isArray(x)?x:[])}catch(e){return new Set()}}
let collectionUnlocks=loadCollectionUnlocks();
function saveCollectionUnlocks(){try{localStorage.setItem(COLLECTION_UNLOCKS_KEY,JSON.stringify([...collectionUnlocks]))}catch(e){}}
function unlockCollectionItem(id){if(!id||collectionUnlocks.has(id))return false;collectionUnlocks.add(id);saveCollectionUnlocks();const item=COLLECTION_DATA.flatMap(s=>s.items).find(x=>x.id===id);if(item){addPlayerXP(50,false,"פתיחת אוסף: "+item.title);if(gameRunning)showMessage("📖 נפתח באוסף: "+item.title)}return true}
function collectionId(item){return item.id||((item.boss?"boss:":"entity:")+item.title)}
function collectionIdForEntity(entity,isAsteroid){
  if(entity&&entity.boss){
    const t=entity.specialType||"normal";
    return t==="normal"?"boss:בוס רגיל":({mirror:"boss:בוס המראה",ice:"boss:בוס הקרח",gates:"boss:בוס השערים",chaser:"boss:בוס הרודף",teleport:"boss:בוס הטלפורט",inversion:"boss:בוס ההיפוך",split:"boss:בוס מתפצל",king:"boss:מלך החלל",doom:"boss:בוס האבדון"}[t]||null);
  }
  if(isAsteroid){
    const t=entity.specialType||"normal";
    return ({normal:"entity:מטאוריט",mirror:"entity:מטאוריט שיבוט",ice:"entity:מטאוריט קפוא",gate:"entity:מטאוריט שער",chaser:"entity:מטאוריט רודף",chaserMeteor:"entity:מטאוריט רודף",teleport:"entity:מטאוריט טלפורט",inversion:"entity:מטאוריט הפוך",split:"entity:מטאוריט מתפצל"}[t]||"entity:מטאוריט");
  }
  const t=entity.specialType||"normal";
  return ({normal:"entity:חללית אויב",mirror:"entity:חללית שיבוט",ice:"entity:אויב קפוא",gate:"entity:שומר שער",gates:"entity:שומר שער",chaser:"entity:רודף קטן",teleport:"entity:טלפורטר",inversion:"entity:חללית הפוכה",split:"entity:אויב מתפצל",doom:"entity:שליח האבדון"}[t]||"entity:חללית אויב");
}

const COLLECTION_DATA=[
  {section:"🌌 האזור הרגיל",items:[
    {icon:"☄️",title:"מטאוריט",desc:"מטאוריט רגיל שמופיע בחלל."},
    {icon:"🛸",title:"חללית אויב",desc:"חללית אויב רגילה שיורה על השחקן."},
    {icon:"👹",title:"בוס רגיל",desc:"בוס בסיסי עם הרבה חיים ומתקפות חזקות."}
  ]},
  {section:"🪞 אזור בוס המראה",items:[
    {icon:"🪞",title:"חללית שיבוט",desc:"מתפצלת לשני שיבוטים שקופים יותר, עם 50% פחות חיים וירי איטי יותר."},
    {icon:"🪞",title:"מטאוריט שיבוט",desc:"מתפצל לשני שיבוטים בצדדים עם מאפייני שיבוט."},
    {icon:"🪞",title:"בוס המראה",desc:"בוס מיוחד המבוסס על שיבוטים והטעיה." ,boss:true}
  ]},
  {section:"🧊 אזור בוס הקרח",items:[
    {icon:"❄️",title:"אויב קפוא",desc:"פגיעה בו מאטה את תנועת השחקן ואת קצב הירי למשך 2 שניות."},
    {icon:"❄️",title:"מטאוריט קפוא",desc:"פגיעה בו או השמדתו מקרוב מקפיאה את השחקן למשך 7 שניות."},
    {icon:"🧊",title:"בוס הקרח",desc:"בוס מיוחד של אזור הקרח." ,boss:true}
  ]},
  {section:"🕳️ אזור בוס השערים",items:[
    {icon:"🌀",title:"שומר שער",desc:"אויב מיוחד שמשתמש בשערים כדי לנוע ולהופיע מחדש."},
    {icon:"🌀",title:"מטאוריט שער",desc:"מטאוריט מיוחד שמופיע דרך שערים ונעלם דרכם."},
    {icon:"🕳️",title:"בוס השערים",desc:"בוס מיוחד של אזור השערים." ,boss:true}
  ]},
  {section:"🚀 אזור בוס הרודף",items:[
    {icon:"🏎️",title:"רודף קטן",desc:"אינו יורה. הדרך היחידה שלו לפגוע היא להתנגש בשחקן."},
    {icon:"🏎️",title:"מטאוריט רודף",desc:"מטאוריט מיוחד שמטרתו לפגוע בשחקן בהתנגשות."},
    {icon:"🚀",title:"בוס הרודף",desc:"בוס מיוחד שמתמקד במרדף והתנגשויות." ,boss:true}
  ]},
  {section:"🌀 אזור בוס הטלפורט",items:[
    {icon:"👻",title:"טלפורטר",desc:"נעלם ומשאיר אזור סגול, ואז חוזר אליו אחרי 4 שניות ויורה."},
    {icon:"🌀",title:"מטאוריט טלפורט",desc:"חוזר לאזור סגול ואז מנפץ אותו במקום לירות."},
    {icon:"🌀",title:"בוס הטלפורט",desc:"בוס מיוחד המבוסס על טלפורטציה." ,boss:true}
  ]},
  {section:"🔄 אזור בוס ההיפוך",items:[
    {icon:"🔄",title:"חללית הפוכה",desc:"פגיעה בה יכולה להפוך את כיווני התנועה של השחקן לזמן קצר."},
    {icon:"🔄",title:"מטאוריט הפוך",desc:"מחליף כיוון בקצה המסך ונע במסלול ההפוך."},
    {icon:"🔄",title:"בוס ההיפוך",desc:"בוס מיוחד שמשנה את כיווני השליטה." ,boss:true}
  ]},
  {section:"🟢 אזור הבוס המתפצל",items:[
    {icon:"🟢",title:"אויב מתפצל",desc:"אויב שמת כשהוא מתפצל ל־2 שיבוטים עם 50% פחות חיים."},
    {icon:"☄️",title:"מטאוריט מתפצל",desc:"מטאוריט שמת כשהוא מתפצל ל־2 שיבוטים עם 50% פחות חיים."},
    {icon:"👹",title:"בוס מתפצל",desc:"בוס ירוק שמתפצל לבוסים בינוניים ואז למיני־בוסים." ,boss:true}
  ]},
  {section:"👑 אזור מלך החלל",items:[
    {icon:"☄️🛸",title:"אויבים ומטאוריטים מכל האזורים",desc:"באזור הזה אין אויב מיוחד — מופיעים אויבים ומטאוריטים באקראי מכל האזורים."},
    {icon:"👑",title:"מלך החלל",desc:"בוס מיוחד ובכיר שלוקח חלקים מהסגנונות של האזורים האחרים." ,boss:true}
  ]},
  {section:"☠️ אזור בוס האבדון",items:[
    {icon:"☠️",title:"שליח האבדון",desc:"אויב מיוחד שהופך למסוכן ומהיר יותר ככל שהוא מאבד חיים."},
    {icon:"☠️",title:"בוס האבדון",desc:"בוס מיוחד שנכנס למצבי זעם בשלבי החיים הנמוכים." ,boss:true}
  ]}
];
COLLECTION_DATA.forEach(section=>section.items.forEach(item=>{
  item.id=collectionId(item);
  const aliases={
    "מטאוריט":"entity:מטאוריט","חללית אויב":"entity:חללית אויב","בוס רגיל":"boss:בוס רגיל",
    "חללית שיבוט":"entity:חללית שיבוט","מטאוריט שיבוט":"entity:מטאוריט שיבוט","בוס המראה":"boss:בוס המראה",
    "אויב קפוא":"entity:אויב קפוא","מטאוריט קפוא":"entity:מטאוריט קפוא","בוס הקרח":"boss:בוס הקרח",
    "שומר שער":"entity:שומר שער","מטאוריט שער":"entity:מטאוריט שער","בוס השערים":"boss:בוס השערים",
    "רודף קטן":"entity:רודף קטן","מטאוריט רודף":"entity:מטאוריט רודף","בוס הרודף":"boss:בוס הרודף",
    "טלפורטר":"entity:טלפורטר","מטאוריט טלפורט":"entity:מטאוריט טלפורט","בוס הטלפורט":"boss:בוס הטלפורט",
    "חללית הפוכה":"entity:חללית הפוכה","מטאוריט הפוך":"entity:מטאוריט הפוך","בוס ההיפוך":"boss:בוס ההיפוך",
    "אויב מתפצל":"entity:אויב מתפצל","מטאוריט מתפצל":"entity:מטאוריט מתפצל","בוס מתפצל":"boss:בוס מתפצל",
    "מלך החלל":"boss:מלך החלל","שליח האבדון":"entity:שליח האבדון","בוס האבדון":"boss:בוס האבדון"
  };
  if(aliases[item.title])item.id=aliases[item.title];
}));
function renderCollection(){
  collectionContent.innerHTML="";
  COLLECTION_DATA.forEach(section=>{
    const wrap=document.createElement("section");wrap.className="collectionSection";
    const h=document.createElement("h2");h.textContent=section.section;wrap.appendChild(h);
    const grid=document.createElement("div");grid.className="collectionGrid";
    section.items.forEach(item=>{
      const unlocked=collectionUnlocks.has(item.id);
      const card=document.createElement("div");
      card.className="collectionCard"+(item.boss?" boss":"")+(unlocked?"":" locked");
      card.innerHTML=unlocked?`<div class="icon">${item.icon}</div><div class="title">${item.title}</div><div class="desc">${item.desc}</div>`:`<div class="icon">❓</div><div class="title">???</div><div class="desc">כדי לפתוח צריך להרוס את האויב/המטאוריט/הבוס הזה במשחק.</div>`;
      grid.appendChild(card);
    });
    wrap.appendChild(grid);collectionContent.appendChild(wrap);
  });
}
function openCollection(){renderCollection();collectionOverlay.style.display="flex"}
function closeCollection(){collectionOverlay.style.display="none"}
collectionButton.addEventListener("click",e=>{e.preventDefault();e.stopPropagation();openCollection()});
closeCollectionButton.addEventListener("click",e=>{e.preventDefault();e.stopPropagation();closeCollection()});
collectionOverlay.addEventListener("click",e=>{if(e.target===collectionOverlay)closeCollection()});
function renderHelp(){helpContent.innerHTML="";const controls=document.createElement("div");controls.className="helpSection";controls.innerHTML="<h3>🎮 איך משחקים</h3><div>WASD / חצים — תנועה</div><div>SPACE — ירי</div><div>1 — אקדח | 2 — מיניגאן | 3 — RPG</div><div>4 — להביור | 5 — שוטגאן | 6 — רובה חור שחור</div><div>Q — RPG | R — שוטגאן | F — להביור</div><div>E — נשק רגיל | L — לייזר</div><div>P — עצירה / המשך</div><div>Esc — סגירת חלון פתוח או עצירת המשחק</div><div>הלייזר והלהביור מכוונים לעכבר.</div><div>בכל עליית רמה בוחרים קלף שדרוג אחד.</div><div>השמד אויבים ומטאוריטים כדי לקבל XP ולהתחזק.</div>";helpContent.appendChild(controls);const diff=document.createElement("div");diff.className="helpSection";diff.innerHTML="<h3>⚔️ דרגות קושי</h3><div>🟢 קל — יותר XP, יותר חיים, אויבים חלשים יותר ומגן ארוך יותר אחרי פגיעה.</div><div>⚪ בינוני — רגיל.</div><div>🟠 קשה — אויבים חזקים יותר ויורים בשלשות.</div><div>🔴 סופר קשה — אויבים חזקים מאוד, פחות XP ופחות חיים.</div><div>⚫ בלתי אפשרי — אויבים חזקים במיוחד, מעט XP ורקע שחור עם זוהר.</div>";helpContent.appendChild(diff);const cards=document.createElement("div");cards.className="helpSection";cards.style.gridColumn="1 / -1";cards.innerHTML="<h3>🃏 כל הקלפים</h3>";const seen=new Set();const rarityOrder={common:0,rare:1,epic:2,legendary:3,amazing:4};[...upgrades].sort((a,b)=>(rarityOrder[a.rarityClass]??99)-(rarityOrder[b.rarityClass]??99)).forEach(u=>{const key=u.id+"|"+u.title;if(seen.has(key))return;seen.add(key);const card=document.createElement("div");card.className="helpCard "+u.rarityClass;card.innerHTML=`<div class="icon">${u.icon}</div><div class="title">${u.title}</div><div class="desc">${u.description}</div><div class="small">${u.rarity}</div>`;cards.appendChild(card)});helpContent.appendChild(cards)}
function openHelp(){renderHelp();helpOverlay.style.display="flex"}function closeHelp(){helpOverlay.style.display="none"}
helpButton.addEventListener("click",e=>{e.preventDefault();e.stopPropagation();openHelp()});closeHelpButton.addEventListener("click",e=>{e.preventDefault();e.stopPropagation();closeHelp()});
async function openLeaderboard(mode=difficulty){await loadGlobalLeaderboard(mode);await updateGlobalPlayerCount();
  renderLeaderboard(mode);
  leaderboard.style.display="flex";
}
function closeLeaderboard(){
  leaderboard.style.display="none";
}
leaderboardButton.addEventListener("click",e=>{e.preventDefault();e.stopPropagation();openLeaderboard(document.getElementById("difficultySelect").value)});
function returnToHome(){settingsOpenedFromGame=false;profileOverlay.style.display="none";achievementsOverlay.style.display="none";leaderboard.style.display="none";collectionOverlay.style.display="none";helpOverlay.style.display="none";gameSettingsOverlay.style.display="none";pauseMenu.style.display="none";levelUpScreen.style.display="none";gameOverScreen.style.display="none";gameStarted=false;gameRunning=false;paused=false;levelUpOpen=false;gameSettingsButton.style.display="none";mobileControls.style.display="none";resetJoystick();keys.space=false;startScreen.style.display="flex";updateProfileButtonVisibility()}
document.getElementById("homeButton").addEventListener("click",e=>{e.preventDefault();e.stopPropagation();returnToHome()});
closeLeaderboardButton.addEventListener("click",e=>{e.preventDefault();e.stopPropagation();closeLeaderboard()});
gameOverLeaderboardButton.addEventListener("click",e=>{e.preventDefault();e.stopPropagation();openLeaderboard(difficulty)});

profileButton.addEventListener("click",e=>{e.preventDefault();e.stopPropagation();openMyProfile()});
closeProfileButton.addEventListener("click",e=>{e.preventDefault();e.stopPropagation();closeProfile()});
saveProfileNameButton.addEventListener("click",e=>{e.preventDefault();e.stopPropagation();setProfileName(profileNameInput.value);renderProfile();renderAchievements();showMessage("✅ שם המשתמש נשמר!")});
profileOverlay.addEventListener("click",e=>{if(e.target===profileOverlay)closeProfile()});
function updateProfileButtonVisibility(){const b=document.getElementById("profileButton");if(b)b.style.display=(!gameStarted&&!gameRunning)?"flex":"none";}

const distanceZones=[
  {min:0,max:1000,name:"🌌 חלל רגיל",key:"normal"},
  {min:1000,max:3000,name:"⚠️ אזור מסוכן",key:"danger"},
  {min:3000,max:5000,name:"🟣 ערפילית",key:"nebula"},
  {min:5000,max:7500,name:"☠️ אזור קטלני",key:"deadly"},
  {min:7500,max:Infinity,name:"🌑 החלל האפל",key:"dark"}
];
let currentDistanceZone="normal";
let specialBossWarningActive=false;
let specialBossWarningType="";
const SPECIAL_BOSS_WARNING_DISTANCE=300;
function getDistanceZone(){
  const d=Math.floor(distance);
  return distanceZones.find(z=>d>=z.min&&d<z.max)||distanceZones[distanceZones.length-1];
}
function getZoneColors(mode,zone){
  const palettes={
    easy:{normal:["#062b15","#02030a"],danger:["#064d28","#02030a"],nebula:["#063d52","#02030a"],deadly:["#183b18","#02030a"],dark:["#06100b","#000000"]},
    normal:{normal:["#101b3d","#02030a"],danger:["#4b1b12","#02030a"],nebula:["#35145e","#02030a"],deadly:["#3b0909","#02030a"],dark:["#09090f","#000000"]},
    hard:{normal:["#3b1200","#02030a"],danger:["#681700","#02030a"],nebula:["#4b155f","#02030a"],deadly:["#5a0505","#000000"],dark:["#170005","#000000"]},
    super:{normal:["#350008","#02030a"],danger:["#5a000b","#02030a"],nebula:["#3d075d","#02030a"],deadly:["#4d0008","#000000"],dark:["#120006","#000000"]},
    impossible:{normal:["#000000","#000000"],danger:["#07000b","#000000"],nebula:["#10001c","#000000"],deadly:["#120006","#000000"],dark:["#000000","#000000"]}
  };
  return (palettes[mode]||palettes.normal)[zone]||palettes.normal.normal;
}
const SPECIAL_BOSS_AREAS={
  split:{name:"🟢 אזור הבוס המתפצל",colors:["#123d18","#020a04"],text:"#66ff88"},
  mirror:{name:"🪞 אזור בוס המראה",colors:["#3b2a4d","#08050d"],text:"#e0b7ff"},
  ice:{name:"🧊 אזור בוס הקרח",colors:["#0b4c66","#02121a"],text:"#7de9ff"},
  gates:{name:"🕳️ אזור בוס השערים",colors:["#2b174d","#06020d"],text:"#d09bff"},
  chaser:{name:"🚀 אזור בוס הרודף",colors:["#5a1606","#100200"],text:"#ff7552"},
  teleport:{name:"🌀 אזור בוס הטלפורט",colors:["#32135e","#07020d"],text:"#d69cff"},
  inversion:{name:"🔄 אזור בוס ההיפוך",colors:["#17434c","#041014"],text:"#6ff7ff"},
  king:{name:"👑 אזור מלך החלל",colors:["#4b3210","#0d0714"],text:"#ffd85a"},
  doom:{name:"☠️ אזור בוס האבדון",colors:["#43000a","#030000"],text:"#ff4d66"}
};
let activeSpecialBossArea="";
let pendingBossPlan=null;
let lastScheduledBossDistance=0;
function setSpecialBossArea(type,active=true){
  const area=active?(SPECIAL_BOSS_AREAS[type]||SPECIAL_BOSS_AREAS.split):null;
  activeSpecialBossArea=active?type:"";
  if(area){
    const gradient="radial-gradient(circle at 50% 40%, "+area.colors[0]+", "+area.colors[1]+" 82%)";
    document.body.style.background=area.colors[1];
    canvas.style.background=gradient;
    const indicator=document.getElementById("zoneIndicator");
    if(indicator){indicator.textContent=area.name;indicator.style.color=area.text;indicator.style.borderColor=area.text;}
  }else{
    document.body.style.background=difficultySettings[difficulty].background;
    canvas.style.background="radial-gradient(circle at 50% 40%, "+difficultySettings[difficulty].background+", #02030a 80%)";
    const indicator=document.getElementById("zoneIndicator");
    if(indicator){indicator.textContent="🌌 חלל רגיל";indicator.style.color=difficultySettings[difficulty].color||"#fff";indicator.style.borderColor=difficultySettings[difficulty].color||"#fff";}
  }
}
function setSpecialBossWarning(active,type=""){}
function prepareForSpecialBoss(bossDistance,type=""){}
function applyDistanceZone(showMessageOnChange=true){
  if(activeSpecialBossArea){setSpecialBossArea(activeSpecialBossArea,true);return;}
  const indicator=document.getElementById("zoneIndicator");
  document.body.style.background=difficultySettings[difficulty].background;
  canvas.style.background="radial-gradient(circle at 50% 40%, "+difficultySettings[difficulty].background+", #02030a 80%)";
  if(indicator){indicator.textContent="🌌 חלל רגיל";indicator.style.color=difficultySettings[difficulty].color||"#fff";indicator.style.borderColor=difficultySettings[difficulty].color||"#fff";}
  currentDistanceZone="normal";
}
function startGame(){registerGlobalPlayer();
function applyDifficultyEffects(){const setting=difficultySettings[difficulty];document.body.style.background=setting.background;canvas.style.background="radial-gradient(circle at 50% 40%, "+setting.background+", #02030a 80%)";document.title="Galaxy Defender - "+difficulty;currentDistanceZone="normal";activeSpecialBossArea="";applyDistanceZone(false)}if(gameStarted)return;gameStarted=true;scoreSaved=false;gameTime=0;expandedChoiceLevel=0;distance=0;speedComboDistance=0;speedComboPermanentDistance=0;speedComboPermanentBonus=0;speedComboTemporaryBonus=0;speedComboPermanentLastAwardedStep=0;speedComboLastAwardedStep=0;window.activeBlackHoles=[];window.chaserHazards=[];currentDistanceZone="normal";activeSpecialBossArea="";pendingBossPlan=null;lastScheduledBossDistance=0;specialBossWarningActive=false;specialBossWarningType="";difficulty=document.getElementById("difficultySelect").value;recordBroken=false;lastAchievementDistance=-1;const ach=getAchievementStats();ach.games++;ach.played[difficulty]=(Number(ach.played[difficulty])||0)+1;saveAchievementStats(ach);unlockAchievement("firstGame");if(ach.played.easy>0)unlockAchievement("playEasy");if(ach.played.normal>0)unlockAchievement("playNormal");if(ach.played.hard>0)unlockAchievement("playHard");if(ach.played.super>0)unlockAchievement("playSuper");if(ach.played.impossible>0)unlockAchievement("playImpossible");checkAchievements();personalBestAtStart=getPersonalBest(difficulty);document.getElementById("recordLiveBanner").style.display="none";applyDifficultyEffects();let setting=difficultySettings[difficulty];player.maxLives+=setting.extraLives;if(player.maxLives<1)player.maxLives=1;player.lives=player.maxLives;gameRunning=true;paused=false;levelUpOpen=false;startScreen.style.display="none";pauseMenu.style.display="none";levelUpScreen.style.display="none";gameOverScreen.style.display="none";gameSettingsButton.style.display="flex";resizeCanvas();updateMobileControlMode();updateHUD();updateMobileControls();if(!animationId)animationId=requestAnimationFrame(gameLoop)}
function restartGame(){window.location.reload()}
startButton.addEventListener("click",e=>{e.preventDefault();e.stopPropagation();startGame()});document.getElementById("homeDailyMissions").addEventListener("click",e=>{e.preventDefault();e.stopPropagation();openAchievements()});achievementsButton.addEventListener("click",e=>{e.preventDefault();e.stopPropagation();openAchievements()});closeAchievementsButton.addEventListener("click",e=>{e.preventDefault();e.stopPropagation();closeAchievements()});achievementsOverlay.addEventListener("click",e=>{if(e.target===achievementsOverlay)closeAchievements()});profileAchievementsButton.addEventListener("click",e=>{e.preventDefault();e.stopPropagation();const snap=viewedProfileAchievementSnapshot||getAchievementState();closeProfile();openAchievements(snap)});restartButton.addEventListener("click",e=>{e.preventDefault();e.stopPropagation();restartGame()});
function togglePause(){if(!gameStarted||levelUpOpen||gameOverScreen.style.display==="flex")return;paused=!paused;gameRunning=!paused;pauseMenu.style.display=paused?"flex":"none";if(paused)showSelectedCards();updateMobileControls()}
function endGameEarly(){paused=false;gameRunning=false;pauseMenu.style.display="none";gameOver()}
resumeButton.addEventListener("click",e=>{e.preventDefault();e.stopPropagation();if(!paused)return;togglePause()});endGameButton.addEventListener("click",e=>{e.preventDefault();e.stopPropagation();endGameEarly()});
gameSettingsButton.addEventListener("click",e=>{e.preventDefault();e.stopPropagation();openGameSettings()});
closeGameSettingsButton.addEventListener("click",e=>{e.preventDefault();e.stopPropagation();closeGameSettings()});
["uiLuck","uiDodge","uiWeapon","uiAmmo","uiDistance","uiSpeedCombo","uiXP","uiLives","uiDrones","uiSwords"].forEach(id=>document.getElementById(id).addEventListener("change",applyUiSettings));
document.getElementById("mobileControlsToggle").addEventListener("change",e=>{mobileControlsEnabled=e.target.checked;updateMobileControls()});
controlModeSelect.addEventListener("change",e=>{mobileControlMode=e.target.value;updateMobileControlMode()});

document.querySelectorAll(".mobileBtn[data-key]").forEach(btn=>{
  const key=btn.dataset.key;
  const down=e=>{e.preventDefault();if(gameRunning&&!paused&&!levelUpOpen)keys[key]=true};
  const up=e=>{e.preventDefault();keys[key]=false};
  btn.addEventListener("pointerdown",down);
  btn.addEventListener("pointerup",up);
  btn.addEventListener("pointercancel",up);
  btn.addEventListener("pointerleave",up);
});

mobileShootButton.addEventListener("pointerdown",e=>{e.preventDefault();if(gameRunning&&!paused&&!levelUpOpen){keys.space=true;mobileShootButton.setPointerCapture?.(e.pointerId)}});
["pointerup","pointercancel","pointerleave"].forEach(ev=>mobileShootButton.addEventListener(ev,e=>{e.preventDefault();keys.space=false}));

document.querySelectorAll(".mobileWeaponBtn").forEach(btn=>{
  btn.addEventListener("pointerdown",e=>{
    e.preventDefault();
    if(!gameRunning||paused||levelUpOpen)return;
    switchWeapon(btn.dataset.weapon);
  });
});

function setJoystickFromEvent(e){
  const r=joystickArea.getBoundingClientRect();
  const cx=r.left+r.width/2,cy=r.top+r.height/2;
  let dx=e.clientX-cx,dy=e.clientY-cy;
  const max=58,len=Math.hypot(dx,dy)||1;
  if(len>max){dx=dx/len*max;dy=dy/len*max}
  joystickX=dx/max;joystickY=dy/max;
  joystickStick.style.transform=`translate(${dx}px,${dy}px)`;
  keys.arrowleft=joystickX<-.22;keys.arrowright=joystickX>.22;
  keys.arrowup=joystickY<-.22;keys.arrowdown=joystickY>.22;
}
function returnToHome(){
  profileOverlay.style.display="none";
  achievementsOverlay.style.display="none";
  leaderboard.style.display="none";
  collectionOverlay.style.display="none";
  helpOverlay.style.display="none";
  gameSettingsOverlay.style.display="none";
  pauseMenu.style.display="none";
  levelUpScreen.style.display="none";
  gameOverScreen.style.display="none";
  startScreen.style.display="flex";
  gameSettingsButton.style.display="none";
  mobileControls.style.display="none";
  canvas.style.transform="";
  gameStarted=false;gameRunning=false;paused=false;levelUpOpen=false;
  updateProfileButtonVisibility();
}
function resetJoystick(){
  joystickPointerId=null;joystickX=0;joystickY=0;
  joystickStick.style.transform="translate(0,0)";
  keys.arrowleft=keys.arrowright=keys.arrowup=keys.arrowdown=false;
}
joystickArea.addEventListener("pointerdown",e=>{
  e.preventDefault();joystickPointerId=e.pointerId;joystickArea.setPointerCapture?.(e.pointerId);setJoystickFromEvent(e);
});
joystickArea.addEventListener("pointermove",e=>{if(e.pointerId===joystickPointerId){e.preventDefault();setJoystickFromEvent(e)}});
["pointerup","pointercancel","pointerleave"].forEach(ev=>joystickArea.addEventListener(ev,e=>{if(e.pointerId===joystickPointerId)resetJoystick()}));
function handleEscapeKey(){
  if(profileOverlay.style.display==="flex"){closeProfile();return}
  if(achievementsOverlay.style.display==="flex"){closeAchievements();return}
  if(leaderboard.style.display==="flex"){closeLeaderboard();return}
  if(collectionOverlay.style.display==="flex"){closeCollection();return}
  if(helpOverlay.style.display==="flex"){closeHelp();return}
  if(gameSettingsOverlay.style.display==="flex"){closeGameSettings();return}
  if(pauseMenu.style.display==="flex"){if(paused)togglePause();return}
  if(!gameStarted||levelUpOpen||gameOverScreen.style.display==="flex")return;
  if(!paused)togglePause();
}
document.addEventListener("keydown",e=>{const key=e.key.toLowerCase();if(e.key==="Escape"){e.preventDefault();handleEscapeKey();return}if(e.code==="Space"){e.preventDefault();if(gameStarted&&!paused&&!levelUpOpen)keys.space=true;return}if(key==="p"){e.preventDefault();if(gameStarted)togglePause();return}if(!gameStarted||paused||levelUpOpen)return;keys[key]=true;if(e.key==="1"){switchWeapon("pistol");return}if(e.key==="2"){switchWeapon("minigun");return}if(e.key==="3"){switchWeapon("rpg");return}if(e.key==="4"){switchWeapon("flamethrower");return}if(e.key==="5"){switchWeapon("shotgun");return}if(e.key==="6"){switchWeapon("blackHole");return}if(key==="q"){switchWeapon("rpg");return}if(key==="r"){switchWeapon("shotgun");return}if(key==="f"){if(flamethrowerMode){flamethrowerOn=true;laserOn=false;currentWeapon="flamethrower";updateHUD()}else showMessage("🔥 קודם צריך לקבל את קלף הלהביור!");return}if(key==="e"){currentWeapon="pistol";laserOn=false;flamethrowerOn=false;updateHUD();return}if(key==="b"){switchWeapon("blackHole");return}if(key==="l"){if(laserMode){laserOn=!laserOn;flamethrowerOn=false;currentWeapon=laserOn?"laser":"pistol";updateHUD()}else showMessage("🔴 קודם צריך לקבל את קלף הלייזר!")}});
document.addEventListener("keyup",e=>{const key=e.key.toLowerCase();if(e.code==="Space"){e.preventDefault();keys.space=false;return}keys[key]=false});
function switchWeapon(weapon){if(weapon==="blackHole"&&blackHoleMaxAmmo<=0){showMessage("🌌 קודם צריך לקבל את קלף רובה החור השחור!");return}if(weapon==="rpg"&&rpgLevel<=0){showMessage("🚀 קודם צריך לקבל את קלף ה־RPG!");return}if(weapon==="shotgun"&&shotgunLevel<=0){showMessage("🔫 קודם צריך לקבל את קלף השוטגאן!");return}if(weapon==="flamethrower"&&!flamethrowerMode){showMessage("🔥 קודם צריך לקבל את קלף הלהביור!");return}if(weapon==="minigun"&&ammo.minigun<=0){showMessage("🎯 אין תחמושת למיניגאן!");return}currentWeapon=weapon;laserOn=false;if(weapon!=="flamethrower")flamethrowerOn=false;if(weapon==="flamethrower")flamethrowerOn=true;updateHUD()}
function lowHealthActive(){return lowHealthBoostLevel>0&&player.lives<player.maxLives*.5}
function effectiveFireRate(){let v=lowHealthActive()?Math.max(2,player.fireRate/1.5):player.fireRate;if(freezeTimer>0)v*=1.5;return v}
function effectiveDamage(){return lowHealthActive()?player.damage*1.25:player.damage}
function speedComboStepMeters(){
  if(difficulty==="easy")return 200;
  if(difficulty==="normal")return 100;
  if(difficulty==="hard")return 50;
  if(difficulty==="super")return 50;
  if(difficulty==="impossible")return 10;
  return Infinity;
}
function speedComboStepValue(){return difficulty==="super"?.02:.01}
function speedComboMultiplier(){return Math.min(10,1+speedComboPermanentBonus+speedComboTemporaryBonus)}
function worldSpeedMultiplier(){return speedComboMultiplier()}
function effectiveMoveSpeed(){let v=player.speed;if(lowHealthActive())v*=1.5;if(freezeTimer>0)v*=.5;return v}
function resetTemporarySpeedCombo(){
  // A hit resets ONLY the non-fixed combo.
  // The permanent combo and its distance counter are intentionally untouched.
  speedComboDistance=0;
  speedComboTemporaryBonus=0;
  speedComboLastAwardedStep=0;
  updateSpeedComboUI();
}
function updateSpeedComboUI(){
  const hud=document.getElementById("speedComboHud");
  const legacy=document.getElementById("speedComboText");
  const enabled=Number.isFinite(speedComboStepMeters());
  const text="×"+speedComboMultiplier().toFixed(2);
  if(hud){hud.textContent=text;hud.style.display=enabled?"":"none"}
  if(legacy){legacy.textContent=text;legacy.style.display="none"}
}
function updateSpeedComboDistance(delta){
  const step=speedComboStepMeters();
  if(!Number.isFinite(step)||delta<=0)return;

  // Permanent/fixed combo:
  // tracks total run distance and NEVER resets when the player is hit.
  const permanentPrevious=Math.floor(speedComboPermanentDistance/step);
  speedComboPermanentDistance+=delta;
  const permanentCurrent=Math.floor(speedComboPermanentDistance/step);
  if(permanentCurrent>permanentPrevious){
    speedComboPermanentBonus=Math.min(
      9,
      speedComboPermanentBonus+(permanentCurrent-permanentPrevious)*speedComboStepValue()
    );
    speedComboPermanentLastAwardedStep=permanentCurrent;
  }

  // Temporary combo:
  // tracks only the distance travelled since the last hit and DOES reset on hit.
  const previous=Math.floor(speedComboDistance/step);
  speedComboDistance+=delta;
  const current=Math.floor(speedComboDistance/step);
  if(current>previous){
    speedComboTemporaryBonus=Math.min(
      9-speedComboPermanentBonus,
      speedComboTemporaryBonus+(current-previous)*speedComboStepValue()
    );
    speedComboLastAwardedStep=current;
  }

  if(permanentCurrent>permanentPrevious||current>previous)updateSpeedComboUI();
}
function addBossSpeedCombo(){
  const bonus={easy:.05,normal:.05,hard:.10,super:.15,impossible:.20}[difficulty]||0;
  // Permanent combo: increases from boss rewards and is NEVER changed by damagePlayer/resetTemporarySpeedCombo.
  speedComboPermanentBonus=Math.min(9,speedComboPermanentBonus+bonus);
  updateSpeedComboUI();
}
function shoot(){if(!gameRunning||paused||levelUpOpen)return;if(currentWeapon==="laser"||currentWeapon==="flamethrower")return;if(currentWeapon==="blackHole"){if(player.lastShot>0){player.lastShot--;return}if(blackHoleAmmo<=0){showMessage("🌌 נגמרו יריות חור שחור!");return}shootBlackHole();blackHoleAmmo--;ammo.blackHole=blackHoleAmmo;player.lastShot=Math.max(24,48-fireRateLevel*2);updateHUD();return;}if(currentWeapon==="rpg"){if(player.lastShot>0){player.lastShot--;return}if(ammo.rpg<=0){showMessage("🚀 נגמרה תחמושת ה־RPG!");return}shootRPG();ammo.rpg--;player.lastShot=Math.max(300,300-fireRateLevel*5);updateHUD();return}if(currentWeapon!=="pistol"&&ammo[currentWeapon]!==Infinity&&ammo[currentWeapon]<=0){showMessage("🎯 נגמרה התחמושת!");return}if(player.lastShot>0){player.lastShot--;return}if(currentWeapon==="shotgun"){shootShotgun();ammo.shotgun--}else if(currentWeapon==="minigun"){shootMinigun();ammo.minigun--}else shootPistol();player.lastShot=Math.max(2,effectiveFireRate()-fireRateLevel*2);updateHUD()}
function createBullet(angle,speed,damage,size,extra={}){bullets.push({x:player.x,y:player.y-30,vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed,damage,size,pierceRemaining:piercingLevel,hitTargets:[],homing:homingLevel>0,splitGeneration:0,splitTravel:0,...extra})}
function consumeBulletPierce(b,target){if(!Array.isArray(b.hitTargets))b.hitTargets=[];if(b.hitTargets.includes(target))return false;b.hitTargets.push(target);if((Number(b.pierceRemaining)||0)>0){b.pierceRemaining--;return true}return false}
function getSplitBulletCount(){return Math.max(0,splitBulletLevel+1)}
function getSplitBulletSpread(){return (20+Math.max(0,splitBulletLevel-1)*5)*Math.PI/180}
function getSplitBulletSpeedMultiplier(){return 1+Math.max(0,Math.min(9,splitBulletLevel-1))*.1}
function getSplitBulletRangeMultiplier(){return getSplitBulletSpeedMultiplier()}
function getSplitBulletSizeMultiplier(){return 1+Math.max(0,Math.min(9,splitBulletLevel-1))*.05}
function getSplitBulletAlpha(generation){return generation<=0?1:generation===1?.75:generation===2?.5:.25}
function shouldSplitBullet(b){
  if(splitBulletLevel<=0||!b||b.rpg||b.blackHole)return false;
  const generation=Math.max(0,Number(b.splitGeneration)||0);
  if(generation>=3)return false;
  if(generation===0)return true;
  const chance=(generation===1?.05:.01)*Math.min(10,splitBulletLevel);
  return Math.random()<chance;
}
function spawnSplitBullets(b){
  const levelValue=Math.max(1,splitBulletLevel),count=getSplitBulletCount(),generation=Math.min(3,(Number(b.splitGeneration)||0)+1);
  if(!count||generation>3)return;
  const baseAngle=Math.atan2(b.vy,b.vx),spread=getSplitBulletSpread(),speed=Math.hypot(b.vx,b.vy)*getSplitBulletSpeedMultiplier(),childDamage=b.damage*levelValue/count,childSize=Math.max(2,b.size*getSplitBulletSizeMultiplier()),maxTravel=900*getSplitBulletRangeMultiplier();
  for(let i=0;i<count;i++){
    const t=count===1?.5:i/(count-1),angle=baseAngle+(-spread+spread*2*t);
    bullets.push({x:b.x,y:b.y,vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed,damage:childDamage,size:childSize,piercing:false,homing:homingLevel>0,splitGeneration:generation,splitTravel:0,splitMaxTravel:maxTravel,splitChild:true});
  }
}
function shootPistol(){const count=1+extraFireLevel+(extraRowLevel>0?1:0);for(let i=0;i<count;i++){const offset=(i-(count-1)/2)*.12;createBullet(-Math.PI/2+offset,9,effectiveDamage(),5+bulletSizeLevel)}}
function shootMinigun(){const count=1+extraFireLevel;for(let i=0;i<count;i++){const angle=-Math.PI/2+(Math.random()-.5)*.15;createBullet(angle,11,effectiveDamage()*.7,4+bulletSizeLevel)}}
function shootRPG(){createBullet(-Math.PI/2,4,effectiveDamage()*5,13+bulletSizeLevel,{rpg:true,piercing:false})}
function shootShotgun(){const count=6+extraFireLevel;for(let i=0;i<count;i++){const angle=-Math.PI/2+(i-(count-1)/2)*.55/Math.max(1,count-1);createBullet(angle,9,effectiveDamage()*.5,5+bulletSizeLevel)}}
function shootBlackHole(){createBullet(-Math.PI/2,5,effectiveDamage()*7,15+bulletSizeLevel,{blackHole:true,piercing:false,homing:false})}
function triggerChainLightning(source){if(chainLightningLevel<=0)return;const maxJumps=2+chainLightningLevel,range=120+chainLightningLevel*10,targets=[...asteroids,...enemies].filter(t=>t.health>0);let current=source,used=new Set([source]);for(let i=0;i<maxJumps;i++){let next=null,best=Infinity;for(const t of targets){if(used.has(t))continue;const d=Math.hypot(t.x-current.x,t.y-current.y);if(d<range&&d<best){best=d;next=t}}if(!next)break;next.health-=effectiveDamage()*.65;applyPoison(next);applyFreeze(next);applyStun(next);applyBurn(next);used.add(next);explosion(next.x,next.y);current=next;if(next.health<=0){if(enemies.includes(next))destroyEnemy(next);else destroyAsteroid(next)}}}


function spawnBlackHole(x,y){const hole={x,y,radius:24,life:150,maxLife:150,blackHole:true};window.activeBlackHoles=window.activeBlackHoles||[];window.activeBlackHoles.push(hole);}
function updateBlackHoles(){const holes=window.activeBlackHoles||[];for(const h of holes){h.life--;h.radius=Math.min(90,h.radius+1.2);[...asteroids,...enemies].forEach(t=>{if(t.health<=0)return;const dx=h.x-t.x,dy=h.y-t.y,d=Math.hypot(dx,dy)||1;const pull=Math.max(0,1-d/h.radius)*2.8;t.x+=dx/d*pull;t.y+=dy/d*pull;if(d<34){t.health-=effectiveDamage()*.18;applyPoison(t);applyFreeze(t);applyStun(t);applyBurn(t,true);if(t.health<=0){if(enemies.includes(t))destroyEnemy(t);else destroyAsteroid(t)}}});if(h.life<=0){explosion(h.x,h.y);[...asteroids,...enemies].forEach(t=>{if(t.health<=0)return;const d=Math.hypot(t.x-h.x,t.y-h.y);if(d<110){t.health-=effectiveDamage()*3*(1-d/110);applyPoison(t);applyFreeze(t);applyStun(t);applyBurn(t,true);if(t.health<=0){if(enemies.includes(t))destroyEnemy(t);else destroyAsteroid(t)}}})}}window.activeBlackHoles=holes.filter(h=>h.life>0)}
function drawBlackHoles(){(window.activeBlackHoles||[]).forEach(h=>{ctx.save();ctx.translate(h.x,h.y);const pulse=1+Math.sin(h.life*.15)*.08;ctx.scale(pulse,pulse);ctx.shadowColor="#7e57c2";ctx.shadowBlur=28;ctx.fillStyle="#050008";ctx.beginPath();ctx.arc(0,0,h.radius*.55,0,Math.PI*2);ctx.fill();ctx.strokeStyle="#b388ff";ctx.lineWidth=4;ctx.beginPath();ctx.arc(0,0,h.radius*.8,0,Math.PI*2);ctx.stroke();ctx.strokeStyle="#fff";ctx.globalAlpha=.65;ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,0,h.radius,0,Math.PI*2);ctx.stroke();ctx.restore()})}
function rpgExplosion(x,y,isMini=false){const explosionRadius=isMini?120:120;explosion(x,y);screenShake(4,120);[...asteroids,...enemies].forEach(target=>{if(target.health<=0)return;const d=Math.hypot(target.x-x,target.y-y);if(d<=explosionRadius){const damage=effectiveDamage()*8*(1-d/explosionRadius*.5);target.health-=damage;applyPoison(target);applyFreeze(target);applyStun(target);applyBurn(target);if(target.health<=0){if(enemies.includes(target))destroyEnemy(target);else destroyAsteroid(target)}}});showMessage("💥 RPG התפוצץ!") }
function spawnAsteroid(){
  const size=Math.random()*18+12;
  const health=(10+size*.55+distance*.004)*5*difficultySettings[difficulty].enemyHP;
  const special=activeSpecialBossArea;
  let type="normal";
  if(special==="mirror")type="mirror";
  else if(special==="ice")type="ice";
  else if(special==="gates")type="gate";
  else if(special==="chaser")type="chaser";
  else if(special==="teleport")type="teleport";
  else if(special==="inversion")type="inversion";
  const splitOnDeath=special==="split";
  asteroids.push({x:Math.random()*canvas.width,y:-50,size,health,maxHealth:health,speed:2+Math.random()*2+distance/1500,specialType:type,splitOnDeath,teleportTimer:240,teleportMarker:null,teleportHidden:false,gateTimer:Math.random()*100,clone:false,cloneSpawned:false,splitDone:false,inversionReturning:false,shatterTimer:0});
}
function spawnEnemy(){
  const health=(100+distance*.012)*difficultySettings[difficulty].enemyHP;
  const special=activeSpecialBossArea;
  let type="normal";
  if(special==="mirror")type="mirror";
  else if(special==="ice")type="ice";
  else if(special==="gates")type="gate";
  else if(special==="chaser")type="chaser";
  else if(special==="teleport")type="teleport";
  else if(special==="inversion")type="inversion";
  const splitOnDeath=special==="split";
  enemies.push({x:Math.random()*canvas.width,y:-50,health,maxHealth:health,speed:type==="chaser"?2.8:1.5+distance/3000,timer:type==="chaser"?999999:100,boss:false,specialType:type,cloneSpawned:false,teleportTimer:240,teleportMarker:null,teleportHidden:false,gateTimer:Math.random()*120,splitOnDeath,clone:false,splitDone:false});
}
function chooseSpecialBossType(){
  const pool=[
    ["mirror",20],
    ["ice",20],
    ["gates",15],
    ["chaser",15],
    ["teleport",10],
    ["inversion",10],
    ["split",5],
    ["king",3],
    ["doom",2]
  ];
  const total=pool.reduce((sum,item)=>sum+item[1],0);
  let roll=Math.random()*total;
  for(const [type,weight] of pool){roll-=weight;if(roll<0)return type}
  return "mirror";
}
function bossSpecialChanceAt(distanceValue){
  if(distanceValue<=1000)return 0;
  if(distanceValue<=3000)return .10;
  if(distanceValue<=5000)return .25;
  if(distanceValue<=7500)return .50;
  if(distanceValue<=10000)return .90;
  return 1;
}
function getBossDistanceList(){
  const list=[1000,2000,3000,4000,5000,6000,7500,9000,10000];
  if(distance>10000){
    const first=Math.max(12500,10000+2500);
    for(let d=first;d<=distance+5000;d+=2500)list.push(d);
  }else list.push(12500,15000,17500,20000);
  return [...new Set(list)].sort((a,b)=>a-b);
}
function planNextBoss(d){
  if(pendingBossPlan){
    if(pendingBossPlan.special && d>=pendingBossPlan.distance-pendingBossPlan.lead){
      setSpecialBossArea(pendingBossPlan.type,true);
    }
    return;
  }
  const all=getBossDistanceList();
  const bossDistance=all.find(v=>v>d+0.0001);
  if(!bossDistance||lastScheduledBossDistance===bossDistance)return;
  lastScheduledBossDistance=bossDistance;
  const special=Math.random()<bossSpecialChanceAt(bossDistance);
  const type=special?chooseSpecialBossType():"normal";
  const lead=bossDistance>=10000?2500:1000;
  pendingBossPlan={distance:bossDistance,special,type,lead};
  if(special&&d>=bossDistance-lead){
    setSpecialBossArea(type,true);
  }else if(!special){
    activeSpecialBossArea="";
    applyDistanceZone(false);
  }
}
function spawnBoss(type="normal"){
  bossFightActive=true;
  const rawType=String(type);
  const isSpecialRaw=rawType.startsWith("special:");
  const requestedSpecial=isSpecialRaw?rawType.slice(8):"";
  const isBigSplit=rawType==="big"||requestedSpecial==="split";
  const isSpecial=isSpecialRaw||isBigSplit;
  const specialType=isBigSplit?"split":requestedSpecial;
  let health;
  if(isBigSplit)health=(700+distance*.5)*5*difficultySettings[difficulty].enemyHP;
  else if(isSpecial)health=(550+distance*.45)*5*difficultySettings[difficulty].enemyHP;
  else health=(350+distance*.35)*5*difficultySettings[difficulty].enemyHP;
  const side=Math.random()<.5?100:canvas.width-100;
  const boss={boss:true,bigBoss:isBigSplit,splitBoss:isBigSplit,specialBoss:isSpecial,specialType,x:side,y:120,health,maxHealth:health,direction:side<canvas.width/2?1:-1,timer:isBigSplit?999999:30,mirrorClone:false,cloneSpawned:false,specialTimer:0,phase:1,splitStage:isBigSplit?0:undefined,specialFireTimer:isBigSplit?600:0};
  enemies.push(boss);
  if(isSpecial)setSpecialBossArea(specialType,true);
  pendingBossPlan=null;
  showMessage(isBigSplit?"💥 בוס מתפצל הגיע!":isSpecial?"⚠️ בוס מיוחד הגיע!":"👹 בוס הגיע!");
}
function findNearestTarget(x,y){let nearest=null,best=Infinity;[...asteroids,...enemies].forEach(target=>{if(target.health<=0)return;const d=Math.hypot(target.x-x,target.y-y);if(d<best){best=d;nearest=target}});return nearest}
function getContinuousFireDamage(target,baseDamage,bullet,now){if(continuousFireLevel<=0||!target||!Number.isFinite(baseDamage)||baseDamage<0)return baseDamage;if(target.continuousFireLastBullet===bullet)return baseDamage;const lastDamage=Number(target.continuousFireLastDamage)||0,lastHitAt=Number(target.continuousFireLastHitAt)||0;const continuing=lastDamage>0&&now-lastHitAt<=1500;const rawDamage=continuing?lastDamage*(1+.2*continuousFireLevel):baseDamage;const damage=Math.round(rawDamage*1e10)/1e10;target.continuousFireLastDamage=damage;target.continuousFireLastHitAt=now;target.continuousFireLastBullet=bullet;return damage}
function applyPoison(enemy){if(poisonLevel<=0||!enemy||enemy.health<=0)return;const now=performance.now();enemy.poisonUntil=now+4000;enemy.poisonStrength=poisonLevel;enemy.poisonNextTickAt=now+1000}
function updatePoison(){if(poisonLevel<=0)return;const now=performance.now();const tickTarget=(target,destroyFn)=>{if(target.health<=0||!(target.poisonUntil>now))return;if(!(target.poisonNextTickAt>0))target.poisonNextTickAt=now+1000;if(now>=target.poisonNextTickAt){target.poisonNextTickAt+=1000;const poisonDamage=target.maxHealth*.05*target.poisonStrength;target.health-=poisonDamage;showDamageNumber(target,poisonDamage);if(target.health<=0)destroyFn(target)}};asteroids.forEach(a=>tickTarget(a,destroyAsteroid));enemies.forEach(enemy=>tickTarget(enemy,destroyEnemy))}
function applyBurn(target,continuous=false){
  if(burnLevel<=0||!target||target.health<=0)return false;
  if(continuous&&target.burnUntil>performance.now())return false;
  if(Math.random()>=GalaxyBurn.getChance(burnLevel))return false;
  const now=performance.now();
  target.burnUntil=now+GalaxyBurn.durationMs;
  target.burnStrength=burnLevel;
  target.burnNextTickAt=now+GalaxyBurn.tickIntervalMs;
  target.burnTicksRemaining=GalaxyBurn.ticksPerApplication;
  return true;
}
function updateBurn(){
  if(burnLevel<=0)return;
  const now=performance.now();
  const tickTarget=(target,destroyFn)=>{
    if(target.health<=0||!(target.burnUntil>now))return;
    while(target.burnTicksRemaining>0&&now>=target.burnNextTickAt){
      const isBoss=!!(target.boss&&enemies.includes(target));
      const burnDamage=GalaxyBurn.getTickDamage(target.maxHealth,target.burnStrength,isBoss);
      target.health-=burnDamage;
      showDamageNumber(target,burnDamage);
      target.burnTicksRemaining--;
      target.burnNextTickAt+=GalaxyBurn.tickIntervalMs;
      if(target.health<=0){destroyFn(target);return}
    }
    if(target.burnTicksRemaining<=0)target.burnUntil=0;
  };
  asteroids.forEach(a=>tickTarget(a,destroyAsteroid));
  enemies.forEach(enemy=>tickTarget(enemy,destroyEnemy));
}
function drawBurnEffect(target,size,isSquare){
  if(!(target.burnUntil>performance.now()))return;
  const t=performance.now()*.001;
  ctx.save();
  for(let i=0;i<16;i++){
    const side=i%4,along=(((Math.floor(i/4)+.5)/4)*2-1)*size*.88;
    let bx,by,dx,dy,tx,ty;
    if(isSquare){
      if(side===0){bx=target.x+along;by=target.y-size;dx=0;dy=-1;tx=1;ty=0}
      else if(side===1){bx=target.x+size;by=target.y+along;dx=1;dy=0;tx=0;ty=1}
      else if(side===2){bx=target.x+along;by=target.y+size;dx=0;dy=1;tx=1;ty=0}
      else{bx=target.x-size;by=target.y+along;dx=-1;dy=0;tx=0;ty=1}
    }else{
      const angle=(i/16)*Math.PI*2;
      dx=Math.cos(angle);dy=Math.sin(angle);tx=-dy;ty=dx;
      bx=target.x+dx*size;by=target.y+dy*size;
    }
    const pulse=.75+.25*Math.sin(t*23+i*2.17);
    const len=(8+size*.35)*pulse,width=2.5+2*pulse;
    const tipX=bx+dx*len+tx*Math.sin(t*17+i)*2;
    const tipY=by+dy*len+ty*Math.sin(t*17+i)*2;
    const grad=ctx.createLinearGradient(bx,by,tipX,tipY);
    grad.addColorStop(0,"#ff2500");grad.addColorStop(.55,"#ff7600");grad.addColorStop(1,"#ffe66a");
    ctx.fillStyle=grad;
    ctx.beginPath();
    ctx.moveTo(bx-tx*width,by-ty*width);
    ctx.quadraticCurveTo(bx+dx*len*.3-tx*width*.7,by+dy*len*.3-ty*width*.7,tipX,tipY);
    ctx.quadraticCurveTo(bx+dx*len*.25+tx*width*.7,by+dy*len*.25+ty*width*.7,bx+tx*width,by+ty*width);
    ctx.closePath();ctx.fill();
  }
  for(let i=0;i<7;i++){
    const a=t*2.4+i*2.399,dist=size+5+((i*7)%11);
    const sx=target.x+Math.cos(a)*dist,sy=target.y+Math.sin(a)*dist;
    ctx.globalAlpha=.45+.55*(.5+.5*Math.sin(t*14+i*3));
    ctx.fillStyle=i%2?"#ff6818":"#fff0a0";
    ctx.shadowColor="#ff6b19";ctx.shadowBlur=7;
    ctx.fillRect(sx,sy,2,2);
  }
  ctx.restore();
}
function getFreezeChance(){return Math.min(1,.1*Math.pow(1.5,Math.max(0,freezeLevel-1)))}
function getFreezeStrength(){return Math.min(.9,.25*Math.pow(1.5,Math.max(0,freezeLevel-1)))}
function getFreezeDuration(){return 4000*Math.pow(1.33,Math.max(0,freezeLevel-1))}
function getEnemyFreezeFactor(enemy){if(!enemy||freezeLevel<=0||!(enemy.freezeUntil>performance.now()))return 1;return Math.max(.1,1-(Number(enemy.freezeStrength)||0))}
function applyFreeze(enemy){if(freezeLevel<=0||!enemy||enemy.health<=0)return false;if(Math.random()>=getFreezeChance())return false;const now=performance.now();enemy.freezeUntil=now+getFreezeDuration();enemy.freezeStrength=getFreezeStrength();return true}
function getStunChance(){return Math.min(1,.05*Math.pow(1.5,Math.max(0,stunLevel-1)))}
function getStunDuration(){return 1000*Math.pow(1.5,Math.max(0,stunLevel-1))}
function isStunnedEnemy(enemy){return !!(enemy&&enemy.health>0&&enemy.stunnedUntil>performance.now())}
function applyStun(enemy){if(stunLevel<=0||!enemy||enemy.health<=0||isStunnedEnemy(enemy))return false;if(Math.random()>=getStunChance())return false;const now=performance.now();enemy.stunnedUntil=now+getStunDuration();enemy.stunCenterX=enemy.x;enemy.stunCenterY=enemy.y;enemy.stunAngle=0;return true}
function updateStunnedEnemy(enemy){if(!isStunnedEnemy(enemy))return false;const now=performance.now();if(now>=enemy.stunnedUntil){enemy.stunnedUntil=0;enemy.x=enemy.stunCenterX;enemy.y=enemy.stunCenterY;return false}const radius=Math.max(.1,(Number(enemy.size)||22)*.15);enemy.stunAngle=(Number(enemy.stunAngle)||0)+(Math.PI*2/.2)/60;enemy.x=enemy.stunCenterX+Math.cos(enemy.stunAngle)*radius;enemy.y=enemy.stunCenterY+Math.sin(enemy.stunAngle)*radius;return true}
function getConfusionChance(){return Math.min(1,.05*Math.pow(1.5,Math.max(0,confusionLevel-1)))}
function getConfusionDuration(){return 4000*Math.pow(1.33,Math.max(0,confusionLevel-1))}
function getConfusionDamageMultiplier(){if(confusionLevel<=0)return 0;if(confusionLevel===1)return .125;return .25*Math.pow(1.5,Math.max(0,confusionLevel-2))}
function isConfusedEnemy(enemy){return !!(enemy&&!enemy.boss&&enemy.health>0&&enemy.confusedUntil>performance.now())}
function findConfusionTarget(source){let nearest=null,best=Infinity;const now=performance.now();for(const target of enemies){if(target===source||target.health<=0)continue;if(target.confusedUntil>now)continue;const d=Math.hypot(target.x-source.x,target.y-source.y);if(d<best){best=d;nearest=target}}return nearest}
function applyConfusion(enemy){if(confusionLevel<=0||!enemy||enemy.health<=0||enemy.boss)return false;if(Math.random()>=getConfusionChance())return false;const now=performance.now();enemy.confusedUntil=now+getConfusionDuration();enemy.confusedDamageMultiplier=getConfusionDamageMultiplier();enemy.confusedFireTimer=0;return true}
function updateConfusedEnemy(enemy){if(!isConfusedEnemy(enemy))return false;const worldMultiplier=worldSpeedMultiplier(),freezeFactor=getEnemyFreezeFactor(enemy),moveSpeed=Math.max(.1,Number(enemy.speed)||1)*worldMultiplier*freezeFactor;enemy.y-=moveSpeed;enemy.x-=Math.sin(Date.now()/500)*.7*worldMultiplier*freezeFactor;enemy.confusedFireTimer=(enemy.confusedFireTimer??0)-freezeFactor;if(enemy.confusedFireTimer<=0){const target=findConfusionTarget(enemy);if(target){const dx=target.x-enemy.x,dy=target.y-enemy.y,len=Math.hypot(dx,dy)||1;enemyBullets.push({x:enemy.x,y:enemy.y,vx:dx/len*3.5,vy:dy/len*3.5,confusedBullet:true,confusedSource:enemy,confusedDamage:Number(enemy.confusedDamageMultiplier)||getConfusionDamageMultiplier(),freezeSpeedMultiplier:freezeFactor});enemy.confusedFireTimer=Math.max(25,100-(Math.max(0,confusionLevel-1)*5))}else enemy.confusedFireTimer=20}return true}
function addXP(amount){amount*=difficultySettings[difficulty].xp;amount*=1+xpBoostLevel*.25;xp+=amount;while(xp>=xpNeeded){xp-=xpNeeded;level++;const ach=getAchievementStats();ach.levels++;saveAchievementStats(ach);checkAchievements();xpNeeded=Math.floor(xpNeeded*1.25);if(levelHealLevel>0)player.lives=Math.min(player.maxLives,player.lives+1);addPlayerXP(10,false,"עליית רמה");if(rpgLevel>0)ammo.rpg+=5;if(shotgunLevel>0)ammo.shotgun+=15;openLevelUp()}updateHUD()}
const numberedUpgradeIds=new Set(["damage","fireRate","maxLives","speed","extraFire","splitBullet","xpBoost","luck","dodge","piercing","sword","levelHeal","chainLightning","lowHealthRage","poison","burn","freeze","stun","confusion","continuousFire","expandedChoice","flamethrower","laserHeat"]);
function getUpgradeLevel(id){
  switch(id){
    case"damage":return damageLevel;
    case"fireRate":return fireRateLevel;
    case"maxLives":return maxLivesLevel;
    case"speed":return speedLevel;
    case"extraFire":return extraFireLevel;
    case"xpBoost":return xpBoostLevel;
    case"luck":return luckLevel;
    case"dodge":return Math.round(dodgeChance/.08);
    case"piercing":return piercingLevel;
    case"sword":return swordCount;
    case"levelHeal":return levelHealLevel;
    case"homing":return homingLevel;
    case"chainLightning":return chainLightningLevel;
    case"extraRow":return extraRowLevel;
    case"lowHealthRage":return lowHealthBoostLevel;
    case"splitBullet":return splitBulletLevel;
    case"poison":return poisonLevel;
    case"burn":return burnLevel;
    case"freeze":return freezeLevel;
    case"stun":return stunLevel;
    case"confusion":return confusionLevel;
    case"continuousFire":return continuousFireLevel;
    case"expandedChoice":return expandedChoiceLevel;
    case"laserHeat":return laserHeatLevel;
    default:return 0;
  }
}
function toRomanNumeral(value){
  const map=[[10,"X"],[9,"IX"],[5,"V"],[4,"IV"],[1,"I"]];
  let result="";
  for(const [n,symbol] of map){while(value>=n){result+=symbol;value-=n}}
  return result||"I";
}
function getUpgradeCardTitle(upgrade){
  if(!numberedUpgradeIds.has(upgrade.id))return upgrade.title;
  const level=getUpgradeLevel(upgrade.id);
  return level<=0?upgrade.title:upgrade.title+" "+toRomanNumeral(level+1);
}
function openLevelUp(){levelUpOpen=true;gameRunning=false;const availableFiltered=upgrades.filter(u=>!(u.id==="extraDrone"&&maxDrones>=5)&&!(u.id==="burn"&&burnLevel>=GalaxyBurn.maxLevel)&&!(u.id==="expandedChoice"&&expandedChoiceLevel>=3)&&!(u.id==="flamethrower"&&flamethrowerLevel>=10)&&!(u.id==="laserHeat"&&(!laserMode||laserHeatLevel>=5)));const weighted=[];availableFiltered.forEach(upgrade=>{let weight=upgrade.rarityClass==="common"?60:upgrade.rarityClass==="rare"?25:upgrade.rarityClass==="epic"?12:upgrade.rarityClass==="legendary"?3:1;weight+=luckLevel*2;for(let i=0;i<weight;i++)weighted.push(upgrade)});const choices=[],choiceCount=Math.min(6,3+expandedChoiceLevel);while(choices.length<choiceCount&&weighted.length){const index=Math.floor(Math.random()*weighted.length),choice=weighted[index];if(!choices.some(x=>x.id===choice.id))choices.push(choice);weighted.splice(index,1)}upgradeContainer.innerHTML="";choices.forEach(upgrade=>{const card=document.createElement("div");card.className="upgradeCard "+upgrade.rarityClass;card.innerHTML=`<div class="rarity">${upgrade.rarity}</div><div class="upgradeIcon">${upgrade.icon}</div><div class="upgradeTitle">${getUpgradeCardTitle(upgrade)}</div>${(upgrade.id==="expandedChoice"&&expandedChoiceLevel===2)||(upgrade.id==="flamethrower"&&flamethrowerLevel===9)?'<div class="upgradeMaxLabel">מקסימום!</div>':""}<div class="upgradeDescription">${upgrade.description}</div>`;card.addEventListener("click",function(){if(!levelUpOpen)return;applyUpgrade(upgrade);selectedUpgrades.push(upgrade);const ach=getAchievementStats();const key=upgrade.rarityClass==="common"?"commonCards":upgrade.rarityClass==="rare"?"rareCards":upgrade.rarityClass==="epic"?"epicCards":upgrade.rarityClass==="legendary"?"legendaryCards":"amazingCards";ach[key]=(Number(ach[key])||0)+1;saveAchievementStats(ach);checkAchievements();levelUpScreen.style.display="none";levelUpOpen=false;gameRunning=true;updateHUD()});upgradeContainer.appendChild(card)});levelUpScreen.style.display="flex"}
function applyUpgrade(u){switch(u.id){case"damage":damageLevel++;player.damage+=4;swordDamage+=2;break;case"fireRate":fireRateLevel++;player.fireRate=Math.max(3,player.fireRate-2);break;case"maxLives":maxLivesLevel++;player.maxLives++;player.lives++;break;case"healOne":if(!healOneUsed){healOneUsed=true;player.lives=Math.min(player.maxLives,player.lives+1)}break;case"speed":speedLevel++;player.speed+=.7;break;case"extraFire":extraFireLevel++;break;case"xpBoost":xpBoostLevel++;break;case"luck":luckLevel++;break;case"dodge":dodgeChance=Math.min(.5,dodgeChance+.08);break;case"fullHeal":if(!fullHealUsed){fullHealUsed=true;player.lives=player.maxLives}break;case"extraDrone":if(maxDrones<5){maxDrones++;extraDroneLevel++;showMessage("🛸 מקסימום מיני חלליות: "+maxDrones)}break;case"drone":if(drones.length<maxDrones)drones.push({type:"normal",angle:Math.random()*Math.PI*2,radius:70,timer:20,rotationSpeed:.025});break;case"rpg":rpgLevel++;ammo.rpg+=10;break;case"piercing":piercingLevel++;break;case"sword":swordCount++;break;case"revive":reviveAvailable=true;break;case"levelHeal":levelHealLevel++;break;case"shotgun":shotgunLevel++;ammo.shotgun+=30;break;case"droneUpgrade":if(drones.length===0)drones.push({type:"upgraded",angle:Math.random()*Math.PI*2,radius:85,timer:10,rotationSpeed:.05});else drones.forEach(d=>{if(d.type==="normal"){d.type="upgraded";d.radius=85;d.rotationSpeed=.05}});droneTier=Math.max(droneTier,1);break;case"homing":homingLevel++;break;case"chainLightning":chainLightningLevel++;break;case"rpgMiniShip":amazingDroneLevel++;if(!drones.some(d=>d.type==="rpgMini")){drones.push({type:"rpgMini",angle:Math.random()*Math.PI*2,radius:115,timer:12,rotationSpeed:.035})}break;case"blackHole":blackHoleMaxAmmo+=4;blackHoleAmmo+=4;ammo.blackHole=blackHoleAmmo;showMessage("🌌 +4 יריות חור שחור!");break;case"extraRow":extraRowLevel++;break;case"laser":laserMode=true;break;case"laserHeat":laserHeatLevel=Math.min(5,laserHeatLevel+1);showMessage("🔥 לייזר מתחמם "+toRomanNumeral(laserHeatLevel));break;case"flamethrower":flamethrowerMode=true;flamethrowerLevel=Math.min(10,flamethrowerLevel+1);break;case"lowHealthRage":lowHealthBoostLevel++;break;case"splitBullet":splitBulletLevel++;showMessage("🔱 קליע מפוצל ×"+splitBulletLevel);break;case"poison":poisonLevel++;showMessage("☠️ רעל ×"+poisonLevel);break;case"burn":burnLevel=Math.min(GalaxyBurn.maxLevel,burnLevel+1);showMessage("🔥 צריבה "+toRomanNumeral(burnLevel));break;case"freeze":freezeLevel++;showMessage("🧊 הקפאה ×"+freezeLevel);break;case"stun":stunLevel++;showMessage("⚡ שיתוק ×"+stunLevel);break;case"confusion":confusionLevel++;showMessage("🌀 בלבול ×"+confusionLevel);break;case"continuousFire":continuousFireLevel++;showMessage("🎯 ירי רציף ×"+continuousFireLevel);break;case"expandedChoice":expandedChoiceLevel=Math.min(3,expandedChoiceLevel+1);showMessage("🃏 בחירה מורחבת "+toRomanNumeral(expandedChoiceLevel));break;case"droneMega":if(drones.length===0)drones.push({type:"large",angle:Math.random()*Math.PI*2,radius:100,timer:10,rotationSpeed:.075});else drones.forEach(d=>{d.type="large";d.radius=100;d.rotationSpeed=.075});droneTier=2;break}updateHUD()}
function updateLaser(){
  const dt=1/60;
  if(!laserMode)return;
  let hitTarget=false;
  if(laserOn&&gameRunning){
    const dx=mouse.x-player.x,dy=mouse.y-player.y,len=Math.hypot(dx,dy)||1,dirX=dx/len,dirY=dy/len,maxRange=1200;
    [...enemies,...asteroids].forEach(target=>{if(target.health<=0)return;const ex=target.x-player.x,ey=target.y-player.y,forward=ex*dirX+ey*dirY,side=Math.abs(ex*dirY-ey*dirX);if(forward>0&&forward<maxRange&&side<35){if(enemies.includes(target))hitTarget=true;const startDps=15+5*(laserHeatLevel-1),maxDps=40+10*(laserHeatLevel-1),dps=startDps+(maxDps-startDps)*laserHeat;const laserDamage=laserHeatLevel>0?dps*dt:effectiveDamage()*.25;target.health-=laserDamage;showDamageNumber(target,laserDamage);applyPoison(target);applyFreeze(target);applyStun(target);applyBurn(target,true);if(hitEffectsEnabled&&laserHeatLevel>0)screenShake(.35+laserHeat*2.2,45);if(target.health<=0){if(enemies.includes(target))destroyEnemy(target);else destroyAsteroid(target)}}});
  }
  if(laserHeatLevel>0){
    if(hitTarget){const heatTime=Math.max(2.5,15-2.5*(laserHeatLevel-1));laserHeat=Math.min(1,laserHeat+dt/heatTime);}
    else {const coolTime=5+2.5*(laserHeatLevel-1);laserHeat=Math.max(0,laserHeat-(2*Math.sqrt(Math.max(laserHeat,0))/coolTime)*dt);}
  }else laserHeat=0;
}
function getLaserHeatColor(){return `hsl(${210-210*laserHeat},100%,60%)`;}
function applyFlamethrowerBurn(target,flameDamage){if(!target||target.health<=0||target.flameBurnUntil>performance.now())return false;const now=performance.now(),level=Math.max(1,flamethrowerLevel),burnPercent=.2+.1*(level-1);target.flameBurnUntil=now+2500;target.flameBurnNextTickAt=now+500;target.flameBurnTicksRemaining=5;target.flameBurnDamagePerTick=flameDamage*burnPercent/5;return true}
function updateFlamethrowerBurn(){if(flamethrowerLevel<=0)return;const now=performance.now();const tickTarget=(target,destroyFn)=>{if(target.health<=0||!(target.flameBurnUntil>now))return;while(target.flameBurnTicksRemaining>0&&now>=target.flameBurnNextTickAt){const burnDamage=target.flameBurnDamagePerTick;target.health-=burnDamage;showDamageNumber(target,burnDamage);target.flameBurnTicksRemaining--;target.flameBurnNextTickAt+=500;if(target.health<=0){destroyFn(target);return}}if(target.flameBurnTicksRemaining<=0)target.flameBurnUntil=0};asteroids.forEach(a=>tickTarget(a,destroyAsteroid));enemies.forEach(enemy=>tickTarget(enemy,destroyEnemy))}
function updateFlamethrower(){if(!flamethrowerOn||!flamethrowerMode||!gameRunning)return;const dx=mouse.x-player.x,dy=mouse.y-player.y,len=Math.hypot(dx,dy)||1,dirX=dx/len,dirY=dy/len,level=Math.max(1,flamethrowerLevel),scale=1+.5*(level-1),range=220*scale;[...enemies,...asteroids].forEach(target=>{if(target.health<=0)return;const ex=target.x-player.x,ey=target.y-player.y,forward=ex*dirX+ey*dirY,side=Math.abs(ex*dirY-ey*dirX);if(forward>0&&forward<range&&side<55){const flameDamage=effectiveDamage()*.18*scale;target.health-=flameDamage;showDamageNumber(target,flameDamage);applyFlamethrowerBurn(target,flameDamage);applyPoison(target);applyFreeze(target);applyStun(target);applyBurn(target,true);if(target.health<=0){if(enemies.includes(target))destroyEnemy(target);else destroyAsteroid(target)}}})}
function updateSwords(){if(swordCount<=0)return;swordAngle+=.015+fireRateLevel*.004;for(let i=0;i<swordCount;i++){const angle=swordAngle+i*Math.PI*2/swordCount,sx=player.x+Math.cos(angle)*swordRange,sy=player.y+Math.sin(angle)*swordRange;enemies.forEach(enemy=>{if(enemy.health<=0)return;if(Math.hypot(sx-enemy.x,sy-enemy.y)<35){const swordHitDamage=swordDamage*(lowHealthActive()?1.25:1);enemy.health-=swordHitDamage;showDamageNumber(enemy,swordHitDamage);applyPoison(enemy);applyFreeze(enemy);applyBurn(enemy,true);if(enemy.health<=0)destroyEnemy(enemy)}});asteroids.forEach(a=>{if(a.health<=0)return;if(Math.hypot(sx-a.x,sy-a.y)<35){const swordHitDamage=swordDamage*(lowHealthActive()?1.25:1);a.health-=swordHitDamage;showDamageNumber(a,swordHitDamage);applyPoison(a);applyFreeze(a);applyBurn(a,true);if(a.health<=0)destroyAsteroid(a)}});enemyBullets.forEach(b=>{if(Math.hypot(sx-b.x,sy-b.y)<30)b.dead=true})}}
function updateDrones(){drones.forEach(drone=>{drone.angle+=drone.rotationSpeed;drone.x=player.x+Math.cos(drone.angle)*drone.radius;drone.y=player.y+Math.sin(drone.angle)*drone.radius;drone.timer--;if(drone.timer>0)return;const target=findNearestTarget(drone.x,drone.y);if(target){const dx=target.x-drone.x,dy=target.y-drone.y,baseAngle=Math.atan2(dy,dx);let count=1;if(drone.type==="upgraded")count=3;if(drone.type==="large")count=7;if(drone.type==="rpgMini")count=1;for(let i=0;i<count;i++){const spread=count===1?0:(i-(count-1)/2)*.13;createDroneBullet(drone,baseAngle+spread,drone.type==="rpgMini"?12:(drone.type==="large"?7+droneDamageLevel*4:5+droneDamageLevel*3),drone.type==="large"?6:drone.type==="rpgMini"?9:5)}}drone.timer=drone.type==="normal"?40:drone.type==="upgraded"?20:13})}
function createDroneBullet(drone,angle,damage,size){bullets.push({x:drone.x,y:drone.y,vx:Math.cos(angle)*7,vy:Math.sin(angle)*7,damage,size,droneBullet:true,rpg:drone.type==="rpgMini",rpgMini:drone.type==="rpgMini",homing:homingLevel>0,piercing:piercingLevel>0})}
function damagePlayer(){
  if(invincible||!gameRunning)return false;
  if(Math.random()<dodgeChance){
    dodgeGhostTimer=60;
    showMessage("🌀 התחמקת מהפגיעה!");
    return false;
  }
  player.lives--;
  screenShake(4,120);
  resetTemporarySpeedCombo();
  invincible=true;
  invincibleTimer=300;
  if(player.lives<=0){
    if(reviveAvailable){
      reviveAvailable=false;
      player.lives=player.maxLives;
      invincibleTimer=420;
      showMessage("💖 ניצלת וחזרת לחיים עם חיים מלאים!");
    }else gameOver();
  }else showMessage("💥 נפגעת! ❤️ "+player.lives);
  updateHUD();
  return true;
}
function destroyAsteroid(a){
  if(!a || a.health>0)return;
  spawnMeteoriteFragments(a);
  a.health=0;
  const ach=getAchievementStats();
  ach.meteors++;
  saveAchievementStats(ach);
  checkAchievements();
  const wasNearPlayer=Math.hypot(a.x-player.x,a.y-player.y)<=(a.size+70);
  explosion(a.x,a.y);
  unlockCollectionItem(collectionIdForEntity(a,true));
  if(a.specialType==="mirror"&&!a.cloneSpawned&&!a.clone){
    spawnMirrorAsteroidClones(a);
  }else if(a.splitOnDeath&&!a.clone){
    splitEntityIntoClones(a);
  }
  if(a.specialType==="ice"&&wasNearPlayer){
    freezeTimer=Math.max(freezeTimer,420);
  }
  let reward=5;
  if(a.size<18)reward=2;
  else if(a.size<24)reward=3;
  addPlayerXP(reward,true,a.size<18?"מטאוריט קטן":a.size<24?"מטאוריט בינוני":"מטאוריט גדול");
  addXP(12+Math.floor(a.size*.8)+Math.floor(distance*.01));
}

function splitEntityIntoClones(entity){
  if(entity.splitDone)return;
  entity.splitDone=true;
  const isEnemy=enemies.includes(entity),childHealth=entity.maxHealth/2,offset=70;
  if(isEnemy){
    for(let i=0;i<2;i++)enemies.push({boss:false,x:entity.x+(i===0?-offset:offset),y:entity.y,health:childHealth,maxHealth:childHealth,speed:Math.max(1,entity.speed*.95),timer:entity.specialType==="chaser"?999999:100,specialType:entity.specialType,clone:true,cloneSplit:true,splitDone:true,cloneSpawned:true,teleportTimer:240,teleportMarker:null,teleportHidden:false,gateTimer:180,inversionReturning:false,shatterTimer:0});
  }else{
    for(let i=0;i<2;i++)asteroids.push({x:entity.x+(i===0?-offset:offset),y:entity.y,size:Math.max(10,entity.size*.88),health:childHealth,maxHealth:childHealth,speed:Math.max(1,entity.speed*.95),specialType:entity.specialType,splitDone:true,clone:true,splitOnDeath:false,cloneSpawned:true,teleportTimer:240,teleportMarker:null,teleportHidden:false,gateTimer:180,inversionReturning:false,shatterTimer:0});
  }
}
function spawnMirrorAsteroidClones(a){
  if(a.cloneSpawned)return;
  a.cloneSpawned=true;
  const h=a.maxHealth*.5,o=70;
  for(let i=0;i<2;i++)asteroids.push({x:a.x+(i===0?-o:o),y:a.y,size:a.size,health:h,maxHealth:h,speed:Math.max(1,a.speed*.8),specialType:"mirror",clone:true,cloneSpawned:true,teleportTimer:240,teleportMarker:null,teleportHidden:false,gateTimer:180,inversionReturning:false,shatterTimer:0});
}
function spawnMirrorClones(entity){
  if(entity.cloneSpawned)return;
  entity.cloneSpawned=true;
  const h=entity.maxHealth*.5,offset=75;
  if(entity.boss){
    for(let i=0;i<2;i++)enemies.push({boss:true,bigBoss:false,splitBoss:false,specialBoss:true,specialType:"mirror",x:entity.x+(i===0?-offset:offset),y:entity.y,health:h,maxHealth:h,direction:i===0?-1:1,timer:125,mirrorClone:true,cloneSpawned:true,mirrorOriginal:entity,teleportTimer:0,gateTimer:0,phase:1,specialTimer:0});
  }else{
    for(let i=0;i<2;i++)enemies.push({boss:false,x:entity.x+(i===0?-offset:offset),y:entity.y,health:h,maxHealth:h,speed:Math.max(.8,entity.speed*.8),timer:125,specialType:"mirror",mirrorClone:true,cloneSpawned:true,teleportTimer:0,teleportMarker:null,teleportHidden:false,gateTimer:180,splitDone:true,clone:true});
  }
}
function destroyEnemy(enemy){
  if(!enemy||enemy.health>0)return;
  enemy.health=0;
  const ach=getAchievementStats();
  if(enemy.boss){ach.bosses++;if(enemy.bigBoss)ach.splitBosses++;if(enemy.specialBoss)ach.specialBosses++;if(difficulty==="impossible")ach.impossibleBosses++;}else ach.enemies++;
  saveAchievementStats(ach);
  checkAchievements();
  explosion(enemy.x,enemy.y);
  unlockCollectionItem(collectionIdForEntity(enemy,false));
  if(enemy.splitOnDeath&&!enemy.clone)splitEntityIntoClones(enemy);
  if(enemy.specialType==="mirror"&&!enemy.boss&&!enemy.mirrorClone)spawnMirrorClones(enemy);
  if(enemy.boss){
    addBossSpeedCombo();
    if(enemy.specialType==="split"&&enemy.splitBoss){
      if(enemy.splitStage===0){
        addPlayerXP(100,true,"בוס מתפצל");
        for(let i=0;i<2;i++)enemies.push({boss:true,bigBoss:false,splitBoss:true,specialBoss:true,specialType:"split",x:enemy.x+(i===0?-80:80),y:enemy.y,health:enemy.maxHealth/2,maxHealth:enemy.maxHealth/2,direction:i===0?1:-1,timer:999999,splitStage:1,specialFireTimer:300,cloneSpawned:true});
        bossFightActive=true;
      }else if(enemy.splitStage===1){
        for(let i=0;i<2;i++)enemies.push({boss:true,bigBoss:false,splitBoss:true,specialBoss:true,specialType:"split",x:enemy.x+(i===0?-55:55),y:enemy.y,health:enemy.maxHealth/2,maxHealth:enemy.maxHealth/2,direction:i===0?1:-1,timer:999999,splitStage:2,miniSplitBoss:true,specialFireTimer:150,cloneSpawned:true});
        bossFightActive=true;
      }
    }else{
      addPlayerXP(50,true,"בוס");
      addXP(500+Math.floor(distance*.3));
      distanceSpeed*=1.35;
      bossSpeed*=1.15;
      showMessage("👹 הבוס הובס! ⚡ המשחק מהיר יותר!");
    }
  }else{
    addPlayerXP(7,true,"חללית אויב");
    addXP(40+Math.floor(distance*.02));
  }
  const stillBoss=enemies.some(e=>e.boss&&e.health>0);
  bossFightActive=stillBoss;
  if(!stillBoss){
    activeSpecialBossArea="";
    setSpecialBossArea("",false);
  }else{
    const remaining=enemies.find(e=>e.boss&&e.health>0&&e.specialBoss);
    if(remaining)setSpecialBossArea(remaining.specialType||"split",true);
  }
}
function update(){if(!gameRunning)return;gameTime+=1/60;for(let i=meteoriteFragments.length-1;i>=0;i--){const f=meteoriteFragments[i];f.x+=f.vx;f.y+=f.vy;f.vx*=.985;f.vy=f.vy*.985+.035;f.rotation+=f.spin;f.life--;if(f.life<=0)meteoriteFragments.splice(i,1)}let speed=effectiveMoveSpeed();
  const inv=inversionTimer>0;
  const left=keys.arrowleft||keys.a,right=keys.arrowright||keys.d,up=keys.arrowup||keys.w,down=keys.arrowdown||keys.s;
  if(!inv){if(left)player.x-=speed;if(right)player.x+=speed;if(up)player.y-=speed;if(down)player.y+=speed;}
  else{if(left)player.x+=speed;if(right)player.x-=speed;if(up)player.y+=speed;if(down)player.y-=speed;}
  player.x=Math.max(30,Math.min(canvas.width-30,player.x));player.y=Math.max(100,Math.min(canvas.height-50,player.y));
  if(keys.space)shoot();updateLaser();updateFlamethrower();updateFlamethrowerBurn();updateSwords();updateDrones();updateBlackHoles();updatePoison();updateBurn();
  if(!bossFightActive){
    const oldDistance=Math.floor(distance);
    const worldMultiplier=worldSpeedMultiplier();
    const distanceDelta=distanceSpeed*worldMultiplier;
    distance+=distanceDelta;
    updateSpeedComboDistance(distanceDelta);
    const newDistance=Math.floor(distance);
    if(newDistance>oldDistance){
      const oldFive=Math.floor(oldDistance/5),newFive=Math.floor(newDistance/5);
      if(newFive>oldFive)addPlayerXP(newFive-oldFive,true,"מרחק");
      if(personalBestAtStart>0&&newDistance>personalBestAtStart){
        const from=Math.max(oldDistance+1,personalBestAtStart+1);
        const recordMeters=Math.max(0,newDistance-from+1);
        if(recordMeters>0)addPlayerXP(recordMeters,true,"שיא חדש");
      }
    }
    checkLiveRecord();
    let d=Math.floor(distance);
    if(d!==lastAchievementDistance){lastAchievementDistance=d;checkAchievements();}
    planNextBoss(d);
    if(pendingBossPlan&&d>=pendingBossPlan.distance){
      const plan=pendingBossPlan;
      pendingBossPlan=null;
      lastBossDistance=plan.distance;
      if(plan.special)spawnBoss("special:"+plan.type);else spawnBoss("normal");
    }
  }
  const spawnChance=Math.min(.15,.02+distance/25000);
  if(Math.random()<spawnChance)spawnAsteroid();
  if(Math.random()<spawnChance/3)spawnEnemy();
  if(invincible){invincibleTimer--;if(invincibleTimer<=0){invincible=false;invincibleTimer=0}}
  if(dodgeGhostTimer>0)dodgeGhostTimer--;

  // Regular entities move here; special movement is handled once in processSpecialEntities().
  asteroids.forEach(a=>{
    if(a.health<=0)return;
    if(updateStunnedEnemy(a))return;
    const freezeFactor=getEnemyFreezeFactor(a);
    if(a.specialType==="normal")a.y+=a.speed*worldSpeedMultiplier()*freezeFactor;
  });
  enemies.forEach(enemy=>{
    if(enemy.health<=0)return;
    const freezeFactor=getEnemyFreezeFactor(enemy);
    if(enemy.boss){
      if(updateStunnedEnemy(enemy))return;
      // Split bosses are updated in this main entity loop so they cannot be skipped by
      // the generic special-boss early return.
      if(enemy.specialType==="split"){
        const stage=Number(enemy.splitStage)||0;
        const moveFactor=stage===0?1:stage===1?1.25:1.5;
        const edge=stage===0?100:stage===1?65:45;
        enemy.x+=(Number(enemy.direction)||1)*bossSpeed*moveFactor*freezeFactor;
        if(enemy.x<edge){enemy.x=edge;enemy.direction=1}
        else if(enemy.x>canvas.width-edge){enemy.x=canvas.width-edge;enemy.direction=-1}
        enemy.specialFireTimer=(Number.isFinite(enemy.specialFireTimer)?enemy.specialFireTimer:(stage===0?600:stage===1?300:150))-freezeFactor;
        if(enemy.specialFireTimer<=0){
          const dx=player.x-enemy.x,dy=player.y-enemy.y,len=Math.hypot(dx,dy)||1;
          const shotSpeed=stage===0?2.5:stage===1?5:10;
          const shotSize=stage===0?18:stage===1?10:6;
          enemyBullets.push({freezeSpeedMultiplier:freezeFactor,x:enemy.x,y:enemy.y+shotSize,vx:dx/len*shotSpeed,vy:dy/len*shotSpeed,size:shotSize,specialSplitBullet:true,splitStage:stage,damage:stage===0?2:1});
          enemy.specialFireTimer=stage===0?600:stage===1?300:150;
        }
        return;
      }
      if(enemy.specialBoss)return;
      enemy.x+=enemy.direction*bossSpeed*freezeFactor;if(enemy.x<100||enemy.x>canvas.width-100)enemy.direction*=-1;
      enemy.timer-=freezeFactor;
      if(enemy.timer<=0){
        const dx=player.x-enemy.x,dy=player.y-enemy.y,len=Math.hypot(dx,dy)||1;
        const shots=difficultySettings[difficulty].enemyTriple?3:1;
        for(let ss=0;ss<shots;ss++){
          const spread=(ss-(shots-1)/2)*.25;
          enemyBullets.push({x:enemy.x,y:enemy.y+20,vx:(dx/len+spread)*2,vy:4,freezeSpeedMultiplier:freezeFactor});
        }
        enemy.timer=25;
      }
      return;
    }
    if(enemy.specialType==="normal"){
      if(updateStunnedEnemy(enemy))return;
      if(updateConfusedEnemy(enemy))return;
      enemy.y+=enemy.speed*worldSpeedMultiplier()*freezeFactor;
      enemy.x+=Math.sin(Date.now()/500)*.7*worldSpeedMultiplier()*freezeFactor;
      enemy.timer-=freezeFactor;
      if(enemy.timer<=0){
        const dx=player.x-enemy.x,dy=player.y-enemy.y,len=Math.hypot(dx,dy)||1;
        const shots=difficultySettings[difficulty].enemyTriple?3:1;
        for(let ss=0;ss<shots;ss++){
          const spread=(ss-(shots-1)/2)*.25;
          enemyBullets.push({x:enemy.x,y:enemy.y+20,vx:(dx/len+spread),vy:3,freezeSpeedMultiplier:freezeFactor});
        }
        enemy.timer=100;
      }
    }
  });
processSpecialEntities();
  bullets.forEach(b=>{
    if(b.dead)return;
    const bulletSpeed=Math.hypot(Number(b.vx)||0,Number(b.vy)||0);
    b.x+=Number(b.vx)||0;
    b.y+=Number(b.vy)||0;
    if(b.splitChild){b.splitTravel=(Number(b.splitTravel)||0)+bulletSpeed;if(b.splitTravel>=(Number(b.splitMaxTravel)||900))b.dead=true;}
    if(b.dead)return;
    asteroids.forEach(a=>{
      if(a.health<=0||b.dead||(Array.isArray(b.hitTargets)&&b.hitTargets.includes(a)))return;
      if(Math.hypot(b.x-a.x,b.y-a.y)<a.size+b.size){
        if(b.blackHole){b.dead=true;spawnBlackHole(b.x,b.y);return}
        if(b.rpg){b.dead=true;rpgExplosion(b.x,b.y,b.rpgMini===true);return}
        if(shouldSplitBullet(b)){b.dead=true;spawnSplitBullets(b);return}
        const hitDamage=getContinuousFireDamage(a,b.damage*5,b,performance.now());a.health-=hitDamage;showDamageNumber(a,hitDamage);applyPoison(a);applyFreeze(a);applyStun(a);applyBurn(a);
        if(chainLightningLevel>0)triggerChainLightning(a);
        if(!consumeBulletPierce(b,a))b.dead=true;
        if(a.health<=0)destroyAsteroid(a);
      }
    });
    if(b.dead)return;
    enemies.forEach(enemy=>{
      if(enemy.health<=0||b.dead||(Array.isArray(b.hitTargets)&&b.hitTargets.includes(enemy)))return;
      const size=enemy.boss?(enemy.specialType==="split"?(enemy.splitStage===2?38:62):55):25;
      if(Math.hypot(b.x-enemy.x,b.y-enemy.y)<size+b.size){
        if(b.blackHole){b.dead=true;spawnBlackHole(b.x,b.y);return}
        if(b.rpg){b.dead=true;rpgExplosion(b.x,b.y,b.rpgMini===true);return}
        if(shouldSplitBullet(b)){b.dead=true;spawnSplitBullets(b);return}
        const hitDamage=getContinuousFireDamage(enemy,b.damage*5,b,performance.now());enemy.health-=hitDamage;showDamageNumber(enemy,hitDamage);applyPoison(enemy);applyFreeze(enemy);applyStun(enemy);applyBurn(enemy);
        if(enemy.boss)screenShake(2,80);
        if(chainLightningLevel>0)triggerChainLightning(enemy);
        if(!consumeBulletPierce(b,enemy))b.dead=true;
        if(enemy.health<=0)destroyEnemy(enemy);
      }
    });
  });
  enemyBullets.forEach(b=>{
    if(b.dead)return;
    const bulletSpeedMultiplier=Math.max(.1,Math.min(1,Number(b.freezeSpeedMultiplier)||1));
    b.x+=(Number(b.vx)||0)*bulletSpeedMultiplier;
    b.y+=(Number(b.vy)||0)*bulletSpeedMultiplier;
    if(b.shortRange){
      b.rangeLeft=(b.rangeLeft??240)-Math.hypot(Number(b.vx)||0,Number(b.vy)||0)*bulletSpeedMultiplier;
      if(b.rangeLeft<=0){b.dead=true;return}
    }
    if(b.confusedBullet){
      for(const target of enemies){
        if(target===b.confusedSource||target.health<=0)continue;
        if(Math.hypot(b.x-target.x,b.y-target.y)<(target.boss?55:25)+6){
          target.health-=target.maxHealth*(Number(b.confusedDamage)||getConfusionDamageMultiplier());
          b.dead=true;
          if(target.health<=0)destroyEnemy(target);
          break;
        }
      }
      return;
    }
    if(Math.hypot(b.x-player.x,b.y-player.y)<25){if(b.specialSplitBullet&&b.splitStage===0){
    const wasInv=invincible||dodgeGhostTimer>0;if(!wasInv){
      player.lives=Math.max(0,player.lives-2);
      resetTemporarySpeedCombo();
      b.dead=true;if(player.lives<=0){if(reviveAvailable){reviveAvailable=false;player.lives=player.maxLives;invincible=true;invincibleTimer=420;}else gameOver();}else{invincible=true;invincibleTimer=300;showMessage("💥 פגיעה חזקה! ❤️ "+player.lives);updateHUD();}}
  }else if(damagePlayer())b.dead=true}});asteroids.forEach(a=>{
  if(a.health<=0)return;
  if(a.teleportMarker||a.y<-500)return;
  if(Math.hypot(a.x-player.x,a.y-player.y)<a.size+20){
    if(invincible||dodgeGhostTimer>0)return;
    if(a.specialType==="ice"){freezeTimer=Math.max(freezeTimer,420);a.health=0;destroyAsteroid(a);return}
    if(a.specialType==="inversion"){inversionTimer=Math.max(inversionTimer,120)}
    if(a.specialType==="chaser"){}
    a.health=0;damagePlayer();
  }
});
  enemies.forEach(enemy=>{
    if(enemy.health<=0||enemy.teleportMarker||enemy.y<-500)return;
    const size=enemy.boss?(enemy.specialType==="split"?(enemy.splitStage===2?38:62):55):25;
    if(Math.hypot(enemy.x-player.x,enemy.y-player.y)<size+20){
      if(invincible||dodgeGhostTimer>0)return;
      if(enemy.specialType==="ice"){if(damagePlayer())freezeTimer=Math.max(freezeTimer,120);return}
      if(enemy.specialType==="inversion"){if(damagePlayer())inversionTimer=Math.max(inversionTimer,120);return}
      if(enemy.specialType==="chaser"){damagePlayer();return}
      damagePlayer();
    }
  });bullets=bullets.filter(b=>!b.dead&&b.y>-100&&b.y<canvas.height+100&&b.x>-100&&b.x<canvas.width+100);enemyBullets=enemyBullets.filter(b=>!b.dead&&b.y>-100&&b.y<canvas.height+100&&b.x>-100&&b.x<canvas.width+100);asteroids=asteroids.filter(a=>a.health>0&&a.y<canvas.height+100);enemies=enemies.filter(e=>e.health>0&&(e.boss||e.y<canvas.height+100));explosions.forEach(e=>{e.radius+=3;e.life--});explosions=explosions.filter(e=>e.life>0);const boss=enemies.find(e=>e.boss);if(boss){document.getElementById("bossContainer").style.display="block";document.getElementById("bossHealth").style.width=Math.max(0,boss.health/boss.maxHealth*100)+"%"}else document.getElementById("bossContainer").style.display="none";updateHUD()}
function processSpecialEntities(){
  if(freezeTimer>0)freezeTimer--;
  if(inversionTimer>0)inversionTimer--;

  // Special bosses and their unique attacks.
  enemies.forEach(enemy=>{
    if(!enemy.boss||!enemy.specialBoss||enemy.health<=0||enemy.specialType==="split")return;
    const freezeFactor=getEnemyFreezeFactor(enemy);
    if(updateStunnedEnemy(enemy))return;
    if(enemy.specialType==="split"){
      const stage=enemy.splitStage||0;
      const splitMoveFactor=stage===0?1:stage===1?1.25:1.5;
      enemy.x+=enemy.direction*bossSpeed*splitMoveFactor*freezeFactor;
      const edge=stage===0?100:stage===1?65:45;
      if(enemy.x<edge){enemy.x=edge;enemy.direction=1}
      else if(enemy.x>canvas.width-edge){enemy.x=canvas.width-edge;enemy.direction=-1}
      enemy.specialFireTimer=(enemy.specialFireTimer??(stage===0?600:stage===1?300:150))-freezeFactor;
      if(enemy.specialFireTimer<=0){
        const dx=player.x-enemy.x,dy=player.y-enemy.y,len=Math.hypot(dx,dy)||1;
        const stage=enemy.splitStage||0;
        const speed=stage===0?2.5:stage===1?5:10;
        const size=stage===0?18:stage===1?10:6;
        enemyBullets.push({freezeSpeedMultiplier:freezeFactor,x:enemy.x,y:enemy.y+size,vx:dx/len*speed,vy:dy/len*speed,size,
          specialSplitBullet:true,splitStage:stage,damage:stage===0?2:1});
        enemy.specialFireTimer=stage===0?600:stage===1?300:150;
      }
      return;
    }
    if(enemy.specialType==="mirror"){
      // Both the original and its two clones keep normal boss fire; clones are handled below at 20% slower cadence/speed.
      enemy.x+=enemy.direction*bossSpeed*(enemy.mirrorClone?.8:1)*freezeFactor;
      if(enemy.x<100||enemy.x>canvas.width-100)enemy.direction*=-1;
      enemy.timer=(enemy.timer??30)-freezeFactor;
      if(enemy.timer<=0){
        const dx=player.x-enemy.x,dy=player.y-enemy.y,len=Math.hypot(dx,dy)||1;
        const shotSpeed=enemy.mirrorClone?1.6:2;
        enemyBullets.push({freezeSpeedMultiplier:freezeFactor,x:enemy.x,y:enemy.y+20,vx:dx/len*shotSpeed,vy:enemy.mirrorClone?2.4:3});
        enemy.timer=enemy.mirrorClone?125:30;
      }
      if(!enemy.mirrorClone&&!enemy.cloneSpawned&&enemy.health<=enemy.maxHealth*.5)spawnMirrorClones(enemy);
      return;
    }
    if(enemy.specialType==="ice"){
      enemy.x+=enemy.direction*bossSpeed*.9*freezeFactor;
      if(enemy.x<100||enemy.x>canvas.width-100)enemy.direction*=-1;
      enemy.timer=(enemy.timer??45)-freezeFactor;
      if(enemy.timer<=0){
        const dx=player.x-enemy.x,dy=player.y-enemy.y,len=Math.hypot(dx,dy)||1;
        enemyBullets.push({freezeSpeedMultiplier:freezeFactor,x:enemy.x,y:enemy.y+20,vx:dx/len*2,vy:3});
        enemy.timer=45;
      }
      return;
    }
    if(enemy.specialType==="gates"){
      enemy.gateTimer=(enemy.gateTimer??120)-freezeFactor;
      if(enemy.gateTimer<=0){
        enemy.gateTimer=180;
        enemy.x=80+Math.random()*(canvas.width-160);
        enemy.y=140+Math.random()*Math.max(80,canvas.height-300);
      }
      enemy.timer=(enemy.timer??60)-freezeFactor;
      if(enemy.timer<=0){
        const dx=player.x-enemy.x,dy=player.y-enemy.y,len=Math.hypot(dx,dy)||1;
        enemyBullets.push({freezeSpeedMultiplier:freezeFactor,x:enemy.x,y:enemy.y+20,vx:dx/len*2,vy:3});
        enemy.timer=60;
      }
      return;
    }
    if(enemy.specialType==="chaser"){
      const dx=player.x-enemy.x,dy=player.y-enemy.y,len=Math.hypot(dx,dy)||1;
      const chaseSpeed=Math.max(3.8,bossSpeed*1.65);
      enemy.x+=dx/len*chaseSpeed*worldSpeedMultiplier()*freezeFactor;enemy.y+=dy/len*chaseSpeed*worldSpeedMultiplier()*freezeFactor;
      const fireRange=330;
      enemy.timer=(enemy.timer??45)-freezeFactor;
      if(Math.hypot(dx,dy)<=fireRange && enemy.timer<=0){
        for(let ss=0;ss<2;ss++){
          const base=Math.atan2(dy,dx)+(ss===0?-0.12:0.12);
          enemyBullets.push({freezeSpeedMultiplier:freezeFactor,x:enemy.x,y:enemy.y+20,vx:Math.cos(base)*4.5,vy:Math.sin(base)*4.5,shortRange:true,rangeLeft:fireRange});
        }
        enemy.timer=50;
      }
      return;
    }
    if(enemy.specialType==="teleport"){
      enemy.specialTimer=(enemy.specialTimer??240)-freezeFactor;
      if(!enemy.teleportHidden&&enemy.specialTimer<=0){
        enemy.specialTimer=240;
        enemy.teleportMarker={x:70+Math.random()*(canvas.width-140),y:140+Math.random()*Math.max(60,canvas.height-300),life:240};
        enemy.teleportHidden=true;
      }
      if(enemy.teleportHidden&&enemy.teleportMarker){
        enemy.teleportMarker.life-=freezeFactor;
        if(enemy.teleportMarker.life<=0){
          enemy.x=enemy.teleportMarker.x;enemy.y=enemy.teleportMarker.y;
          enemy.teleportMarker=null;enemy.teleportHidden=false;enemy.timer=5;
        }
      }
      if(!enemy.teleportHidden){
        enemy.timer=(enemy.timer??5)-freezeFactor;
        if(enemy.timer<=0){
          const dx=player.x-enemy.x,dy=player.y-enemy.y,len=Math.hypot(dx,dy)||1;
          enemyBullets.push({freezeSpeedMultiplier:freezeFactor,x:enemy.x,y:enemy.y+20,vx:dx/len*2.2,vy:3.5});
          enemy.timer=120;
        }
      }
      return;
    }
    if(enemy.specialType==="inversion"){
      enemy.x+=enemy.direction*bossSpeed*.95*freezeFactor;
      if(enemy.x<100||enemy.x>canvas.width-100)enemy.direction*=-1;
      enemy.timer=(enemy.timer??50)-freezeFactor;
      if(enemy.timer<=0){
        const dx=player.x-enemy.x,dy=player.y-enemy.y,len=Math.hypot(dx,dy)||1;
        enemyBullets.push({freezeSpeedMultiplier:freezeFactor,x:enemy.x,y:enemy.y+20,vx:dx/len*2,vy:3});
        enemy.timer=50;
      }
    }
    // king/doom special bosses keep their own area but use the ordinary boss attack cadence.
    if(enemy.specialType==="king"||enemy.specialType==="doom"){
      enemy.x+=enemy.direction*bossSpeed*freezeFactor;
      if(enemy.x<100||enemy.x>canvas.width-100)enemy.direction*=-1;
      enemy.timer=(enemy.timer??35)-freezeFactor;
      if(enemy.timer<=0){
        const dx=player.x-enemy.x,dy=player.y-enemy.y,len=Math.hypot(dx,dy)||1;
        enemyBullets.push({freezeSpeedMultiplier:freezeFactor,x:enemy.x,y:enemy.y+20,vx:dx/len*2.2,vy:4});
        enemy.timer=35;
      }
    }
  });

  // Special enemies.
  enemies.forEach(enemy=>{
    if(enemy.boss||enemy.health<=0)return;
    const freezeFactor=getEnemyFreezeFactor(enemy);
    if(updateStunnedEnemy(enemy))return;
    if(updateConfusedEnemy(enemy))return;
    if(enemy.specialType==="mirror"){
      enemy.y+=enemy.speed*(enemy.mirrorClone?.8:1)*worldSpeedMultiplier()*freezeFactor;
      enemy.x+=Math.sin(Date.now()/500)*.7*(enemy.mirrorClone?.8:1)*freezeFactor;
      enemy.timer-=freezeFactor;
      if(enemy.timer<=0){
        const dx=player.x-enemy.x,dy=player.y-enemy.y,len=Math.hypot(dx,dy)||1;
        enemyBullets.push({freezeSpeedMultiplier:freezeFactor,x:enemy.x,y:enemy.y+20,vx:dx/len*(enemy.mirrorClone?0.8:1),vy:enemy.mirrorClone?2.4:3});
        enemy.timer=enemy.mirrorClone?125:100;
      }
    }else if(enemy.specialType==="chaser"){
      const dx=player.x-enemy.x,dy=player.y-enemy.y,len=Math.hypot(dx,dy)||1;
      const chaseSpeed=Math.max(4.5,enemy.speed*1.35);
      enemy.x+=dx/len*chaseSpeed*freezeFactor;enemy.y+=dy/len*chaseSpeed*freezeFactor;
      const fireRange=240;
      enemy.timer=(enemy.timer??70)-freezeFactor;
      if(Math.hypot(dx,dy)<=fireRange && enemy.timer<=0){
        enemyBullets.push({freezeSpeedMultiplier:freezeFactor,x:enemy.x,y:enemy.y+20,vx:dx/len*4,vy:dy/len*4,shortRange:true,rangeLeft:fireRange});
        enemy.timer=70;
      }
    }else if(enemy.specialType==="ice"){
      enemy.y+=enemy.speed*worldSpeedMultiplier()*freezeFactor;enemy.x+=Math.sin(Date.now()/500)*.7*worldSpeedMultiplier()*freezeFactor;
      enemy.timer-=freezeFactor;
      if(enemy.timer<=0){
        const dx=player.x-enemy.x,dy=player.y-enemy.y,len=Math.hypot(dx,dy)||1;
        enemyBullets.push({freezeSpeedMultiplier:freezeFactor,x:enemy.x,y:enemy.y+20,vx:dx/len,vy:3});
        enemy.timer=100;
      }
    }else if(enemy.specialType==="teleport"){
      if(!enemy.teleportHidden){
        enemy.teleportTimer=(enemy.teleportTimer??240)-freezeFactor;
        if(enemy.teleportTimer<=0){
          enemy.teleportTimer=240;
          enemy.teleportMarker={x:50+Math.random()*(canvas.width-100),y:120+Math.random()*(canvas.height-220),life:240};
          enemy.teleportHidden=true;
        }
        if(enemy.timer>0)enemy.timer-=freezeFactor;
        if(enemy.timer<=0){
          const dx=player.x-enemy.x,dy=player.y-enemy.y,len=Math.hypot(dx,dy)||1;
          enemyBullets.push({freezeSpeedMultiplier:freezeFactor,x:enemy.x,y:enemy.y+20,vx:dx/len,vy:3});
          enemy.timer=100;
        }
      }else if(enemy.teleportMarker){
        enemy.teleportMarker.life-=freezeFactor;
        if(enemy.teleportMarker.life<=0){
          enemy.x=enemy.teleportMarker.x;enemy.y=enemy.teleportMarker.y;
          enemy.teleportMarker=null;enemy.teleportHidden=false;enemy.timer=5;
        }
      }
    }else if(enemy.specialType==="gate"){
      enemy.y+=enemy.speed*worldSpeedMultiplier();enemy.gateTimer=(enemy.gateTimer??180)-freezeFactor;
      if(enemy.gateTimer<=0){enemy.gateTimer=180;enemy.x=70+Math.random()*(canvas.width-140);enemy.y=120+Math.random()*Math.max(80,canvas.height-280);}
      enemy.timer-=freezeFactor;
      if(enemy.timer<=0){
        const dx=player.x-enemy.x,dy=player.y-enemy.y,len=Math.hypot(dx,dy)||1;
        enemyBullets.push({freezeSpeedMultiplier:freezeFactor,x:enemy.x,y:enemy.y+20,vx:dx/len,vy:3});enemy.timer=100;
      }
    }else if(enemy.specialType==="inversion"){
      enemy.y+=enemy.speed*worldSpeedMultiplier();enemy.timer-=freezeFactor;
      if(enemy.timer<=0){
        const dx=player.x-enemy.x,dy=player.y-enemy.y,len=Math.hypot(dx,dy)||1;
        enemyBullets.push({freezeSpeedMultiplier:freezeFactor,x:enemy.x,y:enemy.y+20,vx:dx/len,vy:3});enemy.timer=100;
      }
    }else if(enemy.specialType!=="normal"){
      enemy.y+=enemy.speed*freezeFactor;
    }
  });

  // Special meteor movement/effects.
  asteroids.forEach(a=>{
    if(a.health<=0)return;
    if(updateStunnedEnemy(a))return;
    const freezeFactor=getEnemyFreezeFactor(a);
    if(a.specialType==="mirror"){
      a.y+=a.speed*worldSpeedMultiplier()*freezeFactor;
    }else if(a.specialType==="ice"){
      a.y+=a.speed*freezeFactor;
    }else if(a.specialType==="gate"){
      a.y+=a.speed*worldSpeedMultiplier()*freezeFactor;
      a.gateTimer=(a.gateTimer??180)-freezeFactor;
      if(a.gateTimer<=0){a.gateTimer=180;a.x=70+Math.random()*(canvas.width-140);a.y=120+Math.random()*Math.max(80,canvas.height-280);}
    }else if(a.specialType==="chaser"){
      const dx=player.x-a.x,dy=player.y-a.y,len=Math.hypot(dx,dy)||1;a.x+=dx/len*a.speed*worldSpeedMultiplier()*freezeFactor;a.y+=dy/len*a.speed*worldSpeedMultiplier()*freezeFactor;
    }else if(a.specialType==="teleport"){
      if(!a.teleportHidden){
        a.teleportTimer=(a.teleportTimer??240)-freezeFactor;
        if(a.teleportTimer<=0){
          a.teleportTimer=240;
          a.teleportMarker={x:50+Math.random()*(canvas.width-100),y:120+Math.random()*(canvas.height-220),life:240};
          a.teleportHidden=true;
        }
      }else if(a.teleportMarker){
        a.teleportMarker.life-=freezeFactor;
        if(a.teleportMarker.life<=0){
          a.x=a.teleportMarker.x;a.y=a.teleportMarker.y;a.teleportMarker=null;a.teleportHidden=false;a.shatterTimer=15;
        }
      }
      if(a.shatterTimer>0){a.shatterTimer--;if(a.shatterTimer===0){explosion(a.x,a.y);if(Math.hypot(a.x-player.x,a.y-player.y)<110)damagePlayer();}}
    }else if(a.specialType==="inversion"){
      if(!a.inversionReturning){
        a.y+=a.speed*worldSpeedMultiplier()*freezeFactor;
        if(a.y>=canvas.height-a.size){a.y=canvas.height-a.size;a.inversionReturning=true;}
      }else{
        a.y-=a.speed*worldSpeedMultiplier()*freezeFactor;
        if(a.y<-a.size)a.health=0;
      }
    }
  });

  // Chaser-area warning zones: 5 seconds, then a very fast meteor flies through them.
  if(activeSpecialBossArea==="chaser"){
    window.chaserHazards=window.chaserHazards||[];
    if(window.chaserHazards.length<1&&Math.random()<.004)window.chaserHazards.push({x:40+Math.random()*(canvas.width-80),y:150,rx:58,ry:28,life:300,spawned:false});
    window.chaserHazards.forEach(h=>{h.life--;if(h.life<=0&&!h.spawned){h.spawned=true;asteroids.push({x:h.x,y:-60,size:18,health:999999,maxHealth:999999,speed:18+distance/4000,specialType:"chaserMeteor",chaserMeteor:true,splitOnDeath:false,clone:false,teleportTimer:0,teleportMarker:null,teleportHidden:false,gateTimer:180,inversionReturning:false,shatterTimer:0});}});
    window.chaserHazards=window.chaserHazards.filter(h=>!h.spawned);
  }

  // Split-bullet wall logic.
  enemyBullets.forEach(b=>{
    if(!b.specialSplitBullet||b.dead)return;
    if(b.x<=b.size||b.x>=canvas.width-b.size||b.y<=b.size||b.y>=canvas.height-b.size){
      if(b.splitStage===0){
        const a=Math.atan2(b.vy,b.vx);for(const delta of [-.35,.35])enemyBullets.push({freezeSpeedMultiplier:freezeFactor,x:b.x,y:b.y,vx:Math.cos(a+delta)*5,vy:Math.sin(a+delta)*5,size:10,specialSplitBullet:true,splitStage:1,damage:1});
      }else if(b.splitStage===1){
        const a=Math.atan2(b.vy,b.vx);for(const delta of [-.28,.28])enemyBullets.push({freezeSpeedMultiplier:freezeFactor,x:b.x,y:b.y,vx:Math.cos(a+delta)*10,vy:Math.sin(a+delta)*10,size:6,specialSplitBullet:true,splitStage:2,damage:1});
      }
      b.dead=true;
    }
  });
}

function drawHealthBar(x,y,width,height,health,maxHealth){const ratio=Math.max(0,Math.min(1,health/maxHealth));ctx.fillStyle="rgba(0,0,0,.85)";ctx.fillRect(x-width/2,y,width,height);ctx.fillStyle=ratio>.5?"#00e676":ratio>.25?"#ffeb3b":"#ff1744";ctx.fillRect(x-width/2,y,width*ratio,height);ctx.strokeStyle="#fff";ctx.strokeRect(x-width/2,y,width,height)}
function draw(){ctx.clearRect(0,0,canvas.width,canvas.height);ctx.save();ctx.translate(player.x,player.y);const ghostActive=invincible||dodgeGhostTimer>0;ctx.globalAlpha=ghostActive?.68:1;if(dodgeGhostTimer>0&&!invincible){ctx.globalAlpha=.68}const rageActive=lowHealthActive();if(rageActive){ctx.fillStyle="#ff8c00";ctx.shadowColor="#ff8c00";ctx.shadowBlur=35}else{ctx.fillStyle="#4cc9f0";ctx.shadowBlur=0}ctx.beginPath();ctx.moveTo(0,-30);ctx.lineTo(-22,25);ctx.lineTo(0,15);ctx.lineTo(22,25);ctx.closePath();ctx.fill();ctx.fillStyle="#fff";ctx.fillRect(-5,-10,10,15);ctx.restore();if(laserMode&&laserOn){const dx=mouse.x-player.x,dy=mouse.y-player.y,len=Math.hypot(dx,dy)||1;ctx.save();const maxHot=laserHeatLevel>0&&laserHeat>=.999,laserColor=maxHot?(Math.floor(performance.now()/220)%2?"#ff1010":"#ff4a4a"):(laserHeatLevel>0?getLaserHeatColor():"#ff1744");ctx.strokeStyle=laserColor;ctx.shadowColor=laserColor;ctx.shadowBlur=20+laserHeat*25;ctx.lineWidth=12+laserHeat*3;ctx.beginPath();ctx.moveTo(player.x,player.y);ctx.lineTo(player.x+dx/len*1000,player.y+dy/len*1000);ctx.stroke();ctx.restore()}
if(laserHeatLevel>0){const barW=72,barH=7,barX=player.x-barW/2,barY=player.y+39,maxHot=laserHeat>=.999,barColor=maxHot?(Math.floor(performance.now()/220)%2?"#ff1010":"#ff4a4a"):getLaserHeatColor();ctx.save();ctx.fillStyle="rgba(0,0,0,.8)";ctx.fillRect(barX-2,barY-2,barW+4,barH+4);ctx.fillStyle="#252b38";ctx.fillRect(barX,barY,barW,barH);ctx.fillStyle=barColor;ctx.shadowColor=barColor;ctx.shadowBlur=maxHot?14:5;ctx.fillRect(barX,barY,barW*laserHeat,barH);ctx.strokeStyle="#fff";ctx.lineWidth=1;ctx.strokeRect(barX,barY,barW,barH);ctx.restore()}if(flamethrowerOn){const dx=mouse.x-player.x,dy=mouse.y-player.y,len=Math.hypot(dx,dy)||1,dirX=dx/len,dirY=dy/len;ctx.save();ctx.globalAlpha=.8;ctx.shadowColor="#ff9800";ctx.shadowBlur=25;ctx.strokeStyle="#ff6d00";ctx.lineWidth=55;ctx.beginPath();ctx.moveTo(player.x+dirX*20,player.y+dirY*20);ctx.lineTo(player.x+dirX*220,player.y+dirY*220);ctx.stroke();ctx.strokeStyle="#ffff00";ctx.lineWidth=25;ctx.stroke();ctx.restore()}bullets.forEach(b=>{ctx.save();ctx.globalAlpha=getSplitBulletAlpha(Number(b.splitGeneration)||0);ctx.fillStyle=b.rpg?"#ff1744":b.droneBullet?"#00ff88":"#ffff00";ctx.beginPath();ctx.arc(b.x,b.y,b.size,0,Math.PI*2);ctx.fill();ctx.restore()});enemyBullets.forEach(b=>{ctx.fillStyle=b.confusedBullet?"#c65cff":b.specialSplitBullet?(b.splitStage===0?"#064d18":b.splitStage===1?"#25e66b":"#8dffad"):"#ff1744";ctx.beginPath();ctx.arc(b.x,b.y,b.specialSplitBullet?b.size:6,0,Math.PI*2);ctx.fill()});asteroids.forEach(a=>{
  if(a.teleportHidden&&a.teleportMarker){ctx.save();ctx.globalAlpha=.75;ctx.shadowColor="#bb66ff";ctx.shadowBlur=25;ctx.fillStyle="rgba(180,70,255,.20)";ctx.strokeStyle="#c060ff";ctx.lineWidth=4;ctx.beginPath();ctx.arc(a.teleportMarker.x,a.teleportMarker.y,a.size+18,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.restore();return}
  if(difficulty==="impossible"){ctx.shadowColor="#00ffff";ctx.shadowBlur=25}else ctx.shadowBlur=0;
  if(a.clone)ctx.globalAlpha=.8;
  drawBurnEffect(a,a.size,false);
  ctx.fillStyle=a.specialType==="ice"?"#8eeeff":a.specialType==="gate"?"#b060ff":a.specialType==="chaser"?"#ff5533":a.specialType==="inversion"?"#42d8dc":"#777";
  ctx.beginPath();ctx.arc(a.x,a.y,a.size,0,Math.PI*2);ctx.fill();ctx.strokeStyle="#aaa";ctx.stroke();if(a.poisonUntil>performance.now()){ctx.save();ctx.strokeStyle="#7cff00";ctx.shadowColor="#7cff00";ctx.shadowBlur=16;ctx.lineWidth=3;ctx.beginPath();ctx.arc(a.x,a.y,a.size+4,0,Math.PI*2);ctx.stroke();ctx.restore()}if(a.freezeUntil>performance.now()){const freezeGlow=Number(a.freezeStrength)||0;ctx.save();ctx.globalAlpha=.55+.45*freezeGlow;ctx.strokeStyle="#9ff7ff";ctx.shadowColor="#8eeeff";ctx.shadowBlur=12+38*freezeGlow;ctx.lineWidth=3+4*freezeGlow;ctx.beginPath();ctx.arc(a.x,a.y,a.size+6+freezeGlow*4,0,Math.PI*2);ctx.stroke();ctx.restore()}drawHealthBar(a.x,a.y-a.size-10,Math.max(35,a.size*2.2),6,a.health,a.maxHealth);
});
  enemies.forEach(enemy=>{
    if(enemy.teleportHidden&&enemy.teleportMarker){ctx.save();ctx.globalAlpha=.8;ctx.shadowColor="#bf62ff";ctx.shadowBlur=25;ctx.strokeStyle="#d070ff";ctx.lineWidth=5;ctx.beginPath();ctx.arc(enemy.teleportMarker.x,enemy.teleportMarker.y,30,0,Math.PI*2);ctx.stroke();ctx.restore();return}
    const size=enemy.boss?(enemy.specialType==="split"?(enemy.splitStage===0?70:enemy.splitStage===1?55:38):55):22;
    if(difficulty==="impossible"){ctx.shadowColor="#ff00ff";ctx.shadowBlur=30}else ctx.shadowBlur=0;
    let fill=enemy.boss?(enemy.splitBoss?"#00ff66":"#ff1744"):"#9c27b0";
    if(enemy.specialType==="mirror")fill=enemy.mirrorClone?"rgba(210,190,255,.8)":"#c9a3ff";
    if(enemy.specialType==="ice")fill="#75e6ff";if(enemy.specialType==="gate")fill="#b45cff";if(enemy.specialType==="chaser")fill="#ff5733";if(enemy.specialType==="teleport")fill="#d07aff";if(enemy.specialType==="inversion")fill="#4fe0dc";if(enemy.specialType==="split"&&enemy.splitStage===1)fill="#22d65d";if(enemy.specialType==="split"&&enemy.splitStage===2)fill="#7cff9c";
    if(enemy.mirrorClone)ctx.globalAlpha=.8;
    drawBurnEffect(enemy,size,true);
    ctx.fillStyle=fill;ctx.fillRect(enemy.x-size,enemy.y-size,size*2,size*2);if(isConfusedEnemy(enemy)){const confusionPower=Math.min(1,Math.max(0,Number(enemy.confusedDamageMultiplier)||getConfusionDamageMultiplier()));ctx.save();ctx.globalAlpha=.65+.35*confusionPower;ctx.strokeStyle="#d47aff";ctx.shadowColor="#c65cff";ctx.shadowBlur=18+42*confusionPower;ctx.lineWidth=3+4*confusionPower;ctx.strokeRect(enemy.x-size-5-confusionPower*6,enemy.y-size-5-confusionPower*6,size*2+10+confusionPower*12,size*2+10+confusionPower*12);ctx.font="22px Arial";ctx.textAlign="center";ctx.fillStyle="#e7b7ff";ctx.shadowBlur=12+30*confusionPower;ctx.fillText("🌀",enemy.x,enemy.y-size-18);ctx.restore()}if(enemy.poisonUntil>performance.now()){ctx.save();ctx.strokeStyle="#7cff00";ctx.shadowColor="#7cff00";ctx.shadowBlur=16;ctx.lineWidth=3;ctx.strokeRect(enemy.x-size-3,enemy.y-size-3,size*2+6,size*2+6);ctx.restore()}if(enemy.freezeUntil>performance.now()){const freezeGlow=Number(enemy.freezeStrength)||0;ctx.save();ctx.globalAlpha=.55+.45*freezeGlow;ctx.strokeStyle="#9ff7ff";ctx.shadowColor="#8eeeff";ctx.shadowBlur=12+38*freezeGlow;ctx.lineWidth=3+4*freezeGlow;ctx.strokeRect(enemy.x-size-4-freezeGlow*6,enemy.y-size-4-freezeGlow*6,size*2+8+freezeGlow*12,size*2+8+freezeGlow*12);ctx.restore()}
    ctx.globalAlpha=1;
    drawHealthBar(enemy.x,enemy.y-size-10,enemy.boss?120:50,7,enemy.health,enemy.maxHealth);
    if(enemy.boss){ctx.fillStyle="#fff";ctx.font="20px Arial";ctx.textAlign="center";ctx.fillText("BOSS",enemy.x,enemy.y+7)}
  });
  // Special hazard telegraphs.
  if(activeSpecialBossArea==="chaser"){window.chaserHazards=window.chaserHazards||[];window.chaserHazards.forEach(h=>{ctx.save();ctx.globalAlpha=Math.max(0,h.life/300)*.6;ctx.fillStyle="#ff2200";ctx.strokeStyle="#ff6a55";ctx.lineWidth=4;ctx.beginPath();ctx.ellipse(h.x,h.y,h.rx,h.ry,0,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.restore()})}
  if(freezeTimer>0){ctx.save();ctx.globalAlpha=.18;ctx.fillStyle="#8eeeff";ctx.fillRect(0,0,canvas.width,canvas.height);ctx.restore()}drones.forEach(d=>{const size=d.type==="normal"?12:d.type==="upgraded"?16:d.type==="rpgMini"?18:22;ctx.fillStyle=d.type==="large"?"#ffd600":d.type==="rpgMini"?"#ff1744":d.type==="upgraded"?"#ff9800":"#00ff88";ctx.beginPath();ctx.arc(d.x,d.y,size,0,Math.PI*2);ctx.fill();ctx.fillStyle="#fff";ctx.font="10px Arial";ctx.textAlign="center";ctx.fillText("🛸",d.x,d.y+4)});if(swordCount>0)for(let i=0;i<swordCount;i++){const angle=swordAngle+i*Math.PI*2/swordCount,sx=player.x+Math.cos(angle)*swordRange,sy=player.y+Math.sin(angle)*swordRange;ctx.save();ctx.translate(sx,sy);ctx.rotate(angle);ctx.fillStyle="#00ffff";ctx.shadowColor="#00ffff";ctx.shadowBlur=15;ctx.fillRect(-3,-25,6,50);ctx.restore()}drawBlackHoles();explosions.forEach(e=>{ctx.strokeStyle="#ff9800";ctx.lineWidth=4;ctx.beginPath();ctx.arc(e.x,e.y,e.radius,0,Math.PI*2);ctx.stroke()});meteoriteFragments.forEach(f=>{ctx.save();ctx.globalAlpha=Math.max(0,Math.min(1,f.life/f.maxLife));ctx.translate(f.x,f.y);ctx.rotate(f.rotation);ctx.fillStyle=`rgb(${f.shade},${f.shade},${f.shade})`;ctx.strokeStyle="#b8b8b8";ctx.lineWidth=1;ctx.beginPath();f.shape.forEach((r,i)=>{const angle=i/f.shape.length*Math.PI*2,px=Math.cos(angle)*f.size*r,py=Math.sin(angle)*f.size*r;if(i===0)ctx.moveTo(px,py);else ctx.lineTo(px,py)});ctx.closePath();ctx.fill();ctx.stroke();ctx.restore()});drawFloatingDamageNumbers()}
function setHud(id,show){const e=document.getElementById(id);if(e)e.style.display=show?"":"none"}
function updateMobileControlMode(){
  mobileControls.classList.toggle("joystickMode",mobileControlMode==="joystick");
  mobileControls.classList.toggle("arrowsMode",mobileControlMode==="arrows");
  if(mobileControlMode==="joystick")resetJoystick();
}
function updateMobileWeaponButtons(){
  document.querySelectorAll(".mobileWeaponBtn").forEach(btn=>{
    const w=btn.dataset.weapon;
    const unlocked=(w==="pistol"||w==="minigun"||w==="rpg"&&rpgLevel>0||w==="shotgun"&&shotgunLevel>0||w==="flamethrower"&&flamethrowerMode||w==="blackHole"&&blackHoleMaxAmmo>0);
    btn.disabled=!unlocked;
    btn.classList.toggle("locked",!unlocked);
    btn.classList.toggle("active",currentWeapon===w);
  });
}
function updateMobileControls(){
  const show=isPhoneDevice()&&mobileControlsEnabled&&gameStarted&&!paused&&!levelUpOpen&&gameRunning;
  mobileControls.style.display=show?"block":"none";
  if(!show)resetJoystick();
  updateMobileControlMode();
  updateMobileWeaponButtons();
}
function applyUiSettings(){const damageNumbersToggle=document.getElementById("uiDamageNumbers");if(damageNumbersToggle){damageNumbersToggle.checked=damageNumbersEnabled;damageNumbersToggle.onchange=()=>{damageNumbersEnabled=damageNumbersToggle.checked;localStorage.setItem("galaxyDefenderDamageNumbers",damageNumbersEnabled?"on":"off");if(!damageNumbersEnabled)floatingDamageNumbers.length=0}}const hitEffectsToggle=document.getElementById("uiHitEffects");if(hitEffectsToggle){hitEffectsToggle.checked=hitEffectsEnabled;hitEffectsToggle.onchange=()=>{hitEffectsEnabled=hitEffectsToggle.checked;localStorage.setItem("galaxyDefenderHitEffects",hitEffectsEnabled?"on":"off");if(!hitEffectsEnabled){screenShakePower=0;screenShakeUntil=0;canvas.style.transform=""}}}const meteoriteBreakToggle=document.getElementById("uiMeteoriteBreak");if(meteoriteBreakToggle){meteoriteBreakToggle.checked=meteoriteBreakEffectEnabled;meteoriteBreakToggle.onchange=()=>{meteoriteBreakEffectEnabled=meteoriteBreakToggle.checked;localStorage.setItem("galaxyDefenderMeteoriteBreakEffect",meteoriteBreakEffectEnabled?"on":"off");if(!meteoriteBreakEffectEnabled)meteoriteFragments.length=0}}const map={uiLuck:"rarityLuck",uiDodge:"dodgeStat",uiWeapon:"weaponName",uiAmmo:"ammo",uiDistance:"distance",uiSpeedCombo:"speedComboHud",uiLives:"lives",uiDrones:"droneCount",uiSwords:"swordCount"};Object.entries(map).forEach(([a,b])=>setHud(b,document.getElementById(a).checked));document.getElementById("dodgeValue").textContent=Math.round(dodgeChance*100)+"%";const row=document.getElementById("mobileToggleRow"),modeRow=document.getElementById("controlModeRow");row.style.display=isPhoneDevice()?"flex":"none";modeRow.style.display=isPhoneDevice()?"flex":"none";document.getElementById("mobileControlsToggle").disabled=!isPhoneDevice();controlModeSelect.disabled=!isPhoneDevice();controlModeSelect.value=mobileControlMode;updateMobileControls()}
let settingsOpenedFromGame=false;
function openGameSettings(){settingsOpenedFromGame=gameStarted;gameRunning=false;gameSettingsOverlay.style.display="flex";applyUiSettings()}
function closeGameSettings(){gameSettingsOverlay.style.display="none";if(settingsOpenedFromGame&&gameStarted&&!paused&&!levelUpOpen&&gameOverScreen.style.display!=="flex")gameRunning=true;settingsOpenedFromGame=false;updateMobileControls()}
function updateHUD(){document.getElementById("distance").textContent=Math.floor(distance);const xpNow=document.getElementById("xpNow");if(xpNow)xpNow.textContent="";document.getElementById("lives").textContent=player.lives;document.getElementById("maxLives").textContent=player.maxLives;document.getElementById("weaponName").textContent=currentWeapon==="laser"?"🔴 לייזר":currentWeapon==="flamethrower"?"🔥 להביור":weaponNames[currentWeapon]||currentWeapon;document.getElementById("ammo").textContent=currentWeapon==="laser"||currentWeapon==="flamethrower"||ammo[currentWeapon]===Infinity?"∞":currentWeapon==="blackHole"?blackHoleAmmo:(ammo[currentWeapon]??0);document.getElementById("droneCount").textContent=drones.length;document.getElementById("swordCount").textContent=swordCount;document.getElementById("rarityLuck").textContent=luckLevel;document.getElementById("dodgeValue").textContent=Math.round(dodgeChance*100)+"%";document.getElementById("dodgeHudValue").textContent=Math.round(dodgeChance*100)+"%";const levelText=document.getElementById("levelText");if(levelText)levelText.textContent="רמה "+level+" | "+Math.floor(xp)+" / "+xpNeeded+" XP";const xpBar=document.getElementById("xpBar");if(xpBar)xpBar.style.width=Math.min(100,(xp/xpNeeded)*100)+"%";const xpContainer=document.getElementById("xpContainer");if(xpContainer)xpContainer.style.display="block";updateSpeedComboUI();updateMobileWeaponButtons()}
function showMessage(text){const message=document.getElementById("message");message.textContent=text;message.style.opacity="1";clearTimeout(messageTimer);messageTimer=setTimeout(()=>{message.style.opacity="0"},1000)}
function getSelectedUpgradeCardTitle(upgrade,count){if(upgrade.id==="extraFire")return upgrade.title+" "+toRomanNumeral(count+1);return count<=1?upgrade.title:upgrade.title+" "+toRomanNumeral(count)}
function showSelectedCards(){const container=document.getElementById("selectedCards");container.innerHTML="";const grouped=[];const byId=new Map();selectedUpgrades.forEach(upgrade=>{let group=byId.get(upgrade.id);if(!group){group={upgrade,count:0};byId.set(upgrade.id,group);grouped.push(group)}group.count++});grouped.forEach(({upgrade,count})=>{const card=document.createElement("div");card.className="selectedCard "+upgrade.rarityClass;card.innerHTML=`<div class="icon">${upgrade.icon}</div><div class="title">${getSelectedUpgradeCardTitle(upgrade,count)}</div>`;container.appendChild(card)})}
function explosion(x,y){explosions.push({x,y,radius:5,life:20})}
async function gameOver(){updateProfileButtonVisibility();gameRunning=false;gameSettingsButton.style.display="none";mobileControls.style.display="none";document.getElementById("recordLiveBanner").style.display="none";paused=false;levelUpOpen=false;pauseMenu.style.display="none";levelUpScreen.style.display="none";document.getElementById("finalDistance").textContent=Math.floor(distance);document.getElementById("finalLevel").textContent=level;const rank=await saveLeaderboardScore();document.getElementById("newRecordMessage").textContent=rank>=0?"🏆 נכנסת ללוח התוצאות במקום #"+(rank+1)+"!":"";gameOverScreen.style.display="flex"}
function gameLoop(){animationId=null;if(!gameStarted)return;update();draw();const now=performance.now();if(now<screenShakeUntil){const amp=screenShakePower*Math.min(1,(screenShakeUntil-now)/80+.15);canvas.style.transform=`translate(${(Math.random()*2-1)*amp}px,${(Math.random()*2-1)*amp}px)`}else{screenShakePower=0;canvas.style.transform=""}animationId=requestAnimationFrame(gameLoop)}
resizeCanvas();updateHUD();

updateProfileButtonVisibility();
