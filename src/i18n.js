/* Galaxy Defender language selection: first visit uses browser language, then locale/time-zone region, then English. Later visits keep the saved choice. */
(() => {
"use strict";
const KEY="galaxyDefenderLanguage";
const supported=["he","en","es","fr","de","ru","ar"];
const names={he:"🇮🇱 עברית",en:"🇬🇧 English",es:"🇪🇸 Español",fr:"🇫🇷 Français",de:"🇩🇪 Deutsch",ru:"🇷🇺 Русский",ar:"🇸🇦 العربية"};
const region={IL:"he",ES:"es",MX:"es",AR:"es",CO:"es",CL:"es",FR:"fr",BE:"fr",DE:"de",AT:"de",RU:"ru",BY:"ru",KZ:"ru",SA:"ar",EG:"ar",AE:"ar",JO:"ar",LB:"ar",IQ:"ar",MA:"ar",TN:"ar",DZ:"ar"};
const zones={"Asia/Jerusalem":"he","Europe/Madrid":"es","Europe/Paris":"fr","Europe/Berlin":"de","Europe/Moscow":"ru","Asia/Riyadh":"ar","Africa/Cairo":"ar","Asia/Dubai":"ar"};
const translations=(window.GAME_TRANSLATIONS&&window.GAME_TRANSLATIONS.ui)||{};
function detectFirstLanguage(){
 const prefs=(navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||""]).map(x=>String(x).toLowerCase().split("-")[0]);
 const match=prefs.find(x=>supported.includes(x)); if(match)return match;
 for(const tag of (navigator.languages||[navigator.language||""])) { try { const code=new Intl.Locale(tag).maximize().region; if(region[code])return region[code]; } catch(e){} }
 return zones[Intl.DateTimeFormat().resolvedOptions().timeZone]||"en";
}
let current;
try { current=localStorage.getItem(KEY); } catch(e) {}
if(!supported.includes(current)){current=detectFirstLanguage();try{localStorage.setItem(KEY,current)}catch(e){}}
const achievementWords={
  "קלפים רגילים":["common cards","cartas comunes","cartes communes","gewöhnliche Karten","обычных карт","بطاقات عادية"],
  "קלפים נדירים":["rare cards","cartas raras","cartes rares","seltene Karten","редких карт","بطاقات نادرة"],
  "קלפים אדירים":["epic cards","cartas épicas","cartes épiques","epische Karten","эпических карт","بطاقات ملحمية"],
  "קלפים אגדיים":["legendary cards","cartas legendarias","cartes légendaires","legendäre Karten","легендарных карт","بطاقات أسطورية"],
  "קלפים מדהימים":["amazing cards","cartas asombrosas","cartes incroyables","fantastische Karten","удивительных карт","بطاقات مذهلة"],
  "מטאוריטים":["meteorites","meteoritos","météorites","Meteoriten","метеоритов","نيازك"],
  "מטאורית":["meteorite","meteorito","météorite","Meteorit","метеорит","نيزك"],
  "חלליות אויב":["enemy spaceships","naves enemigas","vaisseaux ennemis","feindliche Raumschiffe","кораблей врагов","سفن الأعداء"],
  "בוסים":["bosses","jefes","boss","Bosse","боссов","زعماء"],
  "בוס":["boss","jefe","boss","Boss","босс","زعيم"],
  "רמות":["levels","niveles","niveaux","Level","уровней","مستويات"]
};
const uniqueAchievementText={
 "המשחק הראשון":["First Game","Primera partida","Première partie","Erstes Spiel","Первая игра","اللعبة الأولى"],
 "שחק במשחק הראשון שלך.":["Play your first game.","Juega tu primera partida.","Joue ta première partie.","Spiele dein erstes Spiel.","Сыграй свою первую игру.","العب مباراتك الأولى."],
 "קלף אולטרה ראשון":["First Ultra Card","Primera carta Ultra","Première carte Ultra","Erste Ultra-Karte","Первая карта Ультра","أول بطاقة ألترا"],
 "השג קלף אולטרה בפעם הראשונה.":["Obtain an Ultra card for the first time.","Consigue una carta Ultra por primera vez.","Obtiens une carte Ultra pour la première fois.","Erhalte zum ersten Mal eine Ultra-Karte.","Получи карту Ультра впервые.","احصل على بطاقة ألترا لأول مرة."],
 "שורד קוסמי":["Cosmic Survivor","Superviviente cósmico","Survivant cosmique","Kosmischer Überlebender","Космический выживший","الناجي الكوني"],
 "קוטל הבוסים":["Boss Slayer","Cazajefes","Tueur de boss","Bossbezwinger","Убийца боссов","قاتل الزعماء"],
 "כוח הרסני":["Destructive Force","Fuerza destructiva","Force destructrice","Zerstörerische Kraft","Разрушительная сила","قوة مدمرة"],
 "שובר מטאוריטים":["Meteorite Breaker","Destructor de meteoritos","Briseur de météorites","Meteoritenbrecher","Разрушитель метеоритов","محطم النيازك"],
 "אוסף אולטרה":["Ultra Collector","Coleccionista Ultra","Collectionneur Ultra","Ultra-Sammler","Коллекционер Ультра","جامع ألترا"],
 "אגדה קוסמית":["Cosmic Legend","Leyenda cósmica","Légende cosmique","Kosmische Legende","Космическая легенда","أسطورة كونية"],
 "צובר כוח קוסמי":["Cosmic Power Collector","Acumulador de poder cósmico","Accumulation de puissance cosmique","Sammler kosmischer Kraft","Накопитель космической силы","جامع القوة الكونية"],
 "צייד הבוסים האולטימטיבי":["Ultimate Boss Hunter","Cazajefes definitivo","Chasseur de boss ultime","Ultimativer Bossjäger","Величайший охотник на боссов","صائد الزعماء المطلق"],
 "אוסף מושלם":["Perfect Collection","Colección perfecta","Collection parfaite","Perfekte Sammlung","Идеальная коллекция","مجموعة مثالية"],
 "מגן בלתי שביר":["Unbreakable Shield","Escudo indestructible","Bouclier incassable","Unzerbrechlicher Schild","Несокрушимый щит","درع لا ينكسر"],
 "כוח הלייזר האולטימטיבי":["Ultimate Laser Power","Poder láser definitivo","Puissance laser ultime","Ultimative Laserleistung","Абсолютная мощь лазера","قوة الليزر القصوى"],
 "מעבר לגלקסיה":["Beyond the Galaxy","Más allá de la galaxia","Au-delà de la galaxie","Jenseits der Galaxie","За пределами галактики","ما وراء المجرة"],
 "בלתי ניתן לעצירה":["Unstoppable","Imparable","Inarrêtable","Unaufhaltsam","Неудержимый","لا يمكن إيقافه"]
};
function translateAchievementPattern(source,lang){
 const index=supported.indexOf(lang)-1;
 if(index<0)return source;
 if(uniqueAchievementText[source])return uniqueAchievementText[source][index];
 let titleMatch=source.match(/^(\\d+) מטר$/);
 if(titleMatch)return [titleMatch[1]+" meters",titleMatch[1]+" metros",titleMatch[1]+" mètres",titleMatch[1]+" Meter",titleMatch[1]+" метров",titleMatch[1]+" متر"][index];
 titleMatch=source.match(/^הרוס (\\d+) (.+)$/);
 if(titleMatch){const n=titleMatch[1],term=titleMatch[2];const noun=term.includes("מטאור")?["meteorites","meteoritos","météorites","Meteoriten","метеоритов","نيازك"]:term.includes("חללית")?["enemy spaceships","naves enemigas","vaisseaux ennemis","feindliche Raumschiffe","кораблей врагов","سفن الأعداء"]:term.includes("בוס")?["bosses","jefes","boss","Bosse","боссов","زعماء"]:null;if(noun)return ["Destroy "+n+" "+noun[index],"Destruye "+n+" "+noun[index],"Détruis "+n+" "+noun[index],"Zerstöre "+n+" "+noun[index],"Уничтожь "+n+" "+noun[index],"دمر "+n+" "+noun[index]][index];}
 titleMatch=source.match(/^פתח (\\d+)? ?(קלפים?.*)$/);
 if(titleMatch){const n=titleMatch[1]?titleMatch[1]+" ":"";const tier=titleMatch[2].includes("רגילים")?["common cards","cartas comunes","cartes communes","gewöhnliche Karten","обычных карт","بطاقات عادية"]:titleMatch[2].includes("נדירים")?["rare cards","cartas raras","cartes rares","seltene Karten","редких карт","بطاقات نادرة"]:titleMatch[2].includes("אדירים")?["epic cards","cartas épicas","cartes épiques","epische Karten","эпических карт","بطاقات ملحمية"]:titleMatch[2].includes("אגדיים")?["legendary cards","cartas legendarias","cartes légendaires","legendäre Karten","легендарных карт","بطاقات أسطورية"]:["cards","cartas","cartes","Karten","карт","بطاقات"];return ["Unlock "+n+tier[index],"Desbloquea "+n+tier[index],"Débloque "+n+tier[index],"Schalte "+n+tier[index]+" frei","Открой "+n+tier[index],"افتح "+n+tier[index]][index];}
 titleMatch=source.match(/^שחק ב(.+)$/);
 if(titleMatch){const mode=titleMatch[1].includes("קל")?["Easy","Fácil","Facile","Einfach","Лёгком","السهل"]:titleMatch[1].includes("בינוני")?["Normal","Normal","Normal","Normal","Среднем","المتوسط"]:titleMatch[1].includes("קשה")?["Hard","Difícil","Difficile","Schwer","Сложном","الصعب"]:titleMatch[1].includes("בלתי")?["Impossible","Imposible","Impossible","Unmöglich","Невозможном","المستحيل"]:["Super Hard","Muy difícil","Très difficile","Sehr schwer","Очень сложном","الصعب جدًا"];return ["Play on "+mode[index],"Juega en "+mode[index],"Joue en mode "+mode[index],"Spiele auf "+mode[index],"Сыграй на уровне "+mode[index],"العب في مستوى "+mode[index]][index];}

 let m=source.match(/^הגע ל־([\d,]+) מטר במשחק אחד\.?$/);
 if(m)return ["Reach "+m[1]+" meters in one game.","Alcanza "+m[1]+" metros en una partida.","Atteins "+m[1]+" mètres en une partie.","Erreiche "+m[1]+" Meter in einem Spiel.","Достигни "+m[1]+" метров за одну игру.","Достигни "+m[1]+" метров за одну игру."][index];
 m=source.match(/^הגע ל־([\d,]+) מטר במשחק בבלתי אפשרי\.?$/);
 if(m)return ["Reach "+m[1]+" meters in an Impossible game.","Alcanza "+m[1]+" metros en una partida Imposible.","Atteins "+m[1]+" mètres en mode Impossible.","Erreiche "+m[1]+" Meter in einem Unmöglich-Spiel.","Достигни "+m[1]+" метров в режиме «Невозможно».","تصل إلى "+m[1]+" مترًا في وضع المستحيل."][index];
 m=source.match(/^(?:הרוס|הרג) (\d+) (מטאוריטים|מטאוריתים|חלליות אויב|בוסים) בסך הכול\.?$/);
 if(m){const word=m[2].startsWith("מטאור")?"meteorites":m[2]==="חלליות אויב"?"enemy spaceships":"bosses";const forms={ "meteorites":["Destroy "+m[1]+" meteorites in total.","Destruye "+m[1]+" meteoritos en total.","Détruis "+m[1]+" météorites au total.","Zerstöre insgesamt "+m[1]+" Meteoriten.","Уничтожь всего "+m[1]+" метеоритов.","دمر "+m[1]+" نيزكًا إجمالًا."],"enemy spaceships":["Destroy "+m[1]+" enemy spaceships in total.","Destruye "+m[1]+" naves enemigas en total.","Détruis "+m[1]+" vaisseaux ennemis au total.","Zerstöre insgesamt "+m[1]+" feindliche Raumschiffe.","Уничтожь всего "+m[1]+" кораблей врагов.","دمر "+m[1]+" من سفن الأعداء إجمالًا."],"bosses":["Defeat "+m[1]+" bosses in total.","Derrota "+m[1]+" jefes en total.","Bats "+m[1]+" boss au total.","Besiege insgesamt "+m[1]+" Bosse.","Победи всего "+m[1]+" боссов.","اهزم "+m[1]+" زعماء إجمالًا."]};return forms[word][index];}
 m=source.match(/^הגע לרמה (\d+)(?: במשחק אחד)?\.?$/);
 if(m)return ["Reach level "+m[1]+(source.includes("במשחק אחד")?" in one game.":"."),
 "Alcanza el nivel "+m[1]+(source.includes("במשחק אחד")?" en una partida.":"."),"Atteins le niveau "+m[1]+(source.includes("במשחק אחד")?" en une partie.":"."),"Erreiche Level "+m[1]+(source.includes("במשחק אחד")?" in einem Spiel.":"."),"Достигни уровня "+m[1]+(source.includes("במשחק אחד")?" за одну игру.":"."),"صل إلى المستوى "+m[1]+(source.includes("במשחק אחד")?" في مباراة واحدة.":".")][index];
 m=source.match(/^עלה (\d+) רמות בסך הכול.*\.?$/);
 if(m)return ["Gain "+m[1]+" levels in total.","Sube "+m[1]+" niveles en total.","Gagne "+m[1]+" niveaux au total.","Steige insgesamt "+m[1]+" Level auf.","Получи "+m[1]+" уровней в общей сложности.","ارفع مستواك "+m[1]+" مرة إجمالًا."][index];
 return source;
}
function translate(value){
 const s=value.trim(); if(current==="he"||!s)return value;
 const row=translations[s]; if(row)return value.replace(s,row[supported.indexOf(current)-1]||s);
 const achievementTranslation=translateAchievementPattern(s,current);if(achievementTranslation!==s)return value.replace(s,achievementTranslation);
 const catalog=window.GAME_TRANSLATIONS||{};
 for(const namespace of ["cards","achievements","dailyMissions","collection"]){
  const records=catalog[namespace]||{};
  for(const record of Object.values(records)){
   if(!record||typeof record!=="object")continue;
   for(const field of ["title","description","desc","section"]){
    const valueRow=record[field];
    if(Array.isArray(valueRow)&&valueRow.length===6&&valueRow[0]===s)return value.replace(s,valueRow[supported.indexOf(current)-1]||s);
   }
  }
 }
 const m=s.match(/^רמה (\d+) \| (.+) XP$/);
 if(m){const forms={en:"Level",es:"Nivel",fr:"Niveau",de:"Level",ru:"Уровень",ar:"المستوى"};return value.replace(s,forms[current]+" "+m[1]+" | "+m[2]+" XP");}
 return value;
}
function visit(node){
 if(node.nodeType===Node.TEXT_NODE){
  if(node.__gdTranslated!==undefined&&node.nodeValue!==node.__gdTranslated)node.__gdOriginal=node.nodeValue;
  if(node.__gdOriginal===undefined)node.__gdOriginal=node.nodeValue;
  const v=translate(node.__gdOriginal);node.__gdTranslated=v;
  if(v!==node.nodeValue)node.nodeValue=v;
  return;
 }
 if(node.nodeType!==Node.ELEMENT_NODE||["SCRIPT","STYLE"].includes(node.tagName))return;
 ["title","aria-label","placeholder"].forEach(a=>{
  if(!node.hasAttribute(a))return;
  const originalKey="data-gd-original-"+a,translatedKey="data-gd-translated-"+a;
  const current=node.getAttribute(a);
  if(node.hasAttribute(translatedKey)&&current!==node.getAttribute(translatedKey))node.setAttribute(originalKey,current);
  if(!node.hasAttribute(originalKey))node.setAttribute(originalKey,current);
  const v=translate(node.getAttribute(originalKey));node.setAttribute(translatedKey,v);
  if(v!==current)node.setAttribute(a,v);
 });
 Array.from(node.childNodes).forEach(visit);
}
function setLanguage(code,manual){
 if(!supported.includes(code))code="en";current=code;
 try{localStorage.setItem(KEY,code);if(manual)localStorage.setItem(KEY+"_manual","1");}catch(e){}
 const rtl=code==="he"||code==="ar";document.documentElement.lang=code;document.documentElement.dir=rtl?"rtl":"ltr";
 document.body.dataset.language=code;document.body.dataset.languageDirection=rtl?"rtl":"ltr";
 /* Keep the game layout anchored in its original RTL geometry. Text direction is handled separately. */
 document.body.style.direction="rtl";document.body.classList.toggle("language-rtl",rtl);
 document.querySelectorAll("#languageSelect option").forEach(o=>o.textContent=names[o.value]);
 const select=document.getElementById("languageSelect");if(select)select.value=code;
 visit(document.body);document.dispatchEvent(new CustomEvent("galaxy-language-change",{detail:{language:code}}));
}
function init(){
 const select=document.getElementById("languageSelect");
 if(select){select.value=current;select.addEventListener("change",()=>setLanguage(select.value,true));}
 setLanguage(current,false);
 new MutationObserver(records=>records.forEach(r=>{if(r.type==="childList")r.addedNodes.forEach(visit);else visit(r.target);})).observe(document.body,{subtree:true,childList:true,characterData:true});
}
window.GalaxyI18n={getLanguage:()=>current,setLanguage:code=>setLanguage(code,true),translate,languageNames:names};
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
})();