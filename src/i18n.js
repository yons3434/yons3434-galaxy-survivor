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
function translate(value){
 const s=value.trim(); if(current==="he"||!s)return value;
 const row=translations[s]; if(row)return value.replace(s,row[supported.indexOf(current)-1]||s);
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