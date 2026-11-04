/* Galaxy Defender language selection: first visit uses browser language, then locale/time-zone region, then English. Later visits keep the saved choice. */
(() => {
"use strict";
const KEY="galaxyDefenderLanguage";
const supported=["he","en","es","fr","de","ru","ar"];
const names={he:"🇮🇱 עברית",en:"🇬🇧 English",es:"🇪🇸 Español",fr:"🇫🇷 Français",de:"🇩🇪 Deutsch",ru:"🇷🇺 Русский",ar:"🇸🇦 العربية"};
const region={IL:"he",ES:"es",MX:"es",AR:"es",CO:"es",CL:"es",FR:"fr",BE:"fr",DE:"de",AT:"de",RU:"ru",BY:"ru",KZ:"ru",SA:"ar",EG:"ar",AE:"ar",JO:"ar",LB:"ar",IQ:"ar",MA:"ar",TN:"ar",DZ:"ar"};
const zones={"Asia/Jerusalem":"he","Europe/Madrid":"es","Europe/Paris":"fr","Europe/Berlin":"de","Europe/Moscow":"ru","Asia/Riyadh":"ar","Africa/Cairo":"ar","Asia/Dubai":"ar"};
const translations={
"⚙️ הגדרות ממשק":["⚙️ Interface Settings","⚙️ Ajustes de interfaz","⚙️ Paramètres de l’interface","⚙️ Oberflächeneinstellungen","⚙️ Настройки интерфейса","⚙️ إعدادات الواجهة"],
"הצג או הסתר חלקים מה־HUD וכבה את כפתורי המגע בטלפון.":["Show or hide HUD elements and disable mobile touch controls.","Muestra u oculta elementos del HUD y desactiva los controles táctiles.","Afficher ou masquer des éléments du HUD et désactiver les commandes tactiles.","HUD-Elemente ein- oder ausblenden und Touch-Steuerung deaktivieren.","Показывать или скрывать элементы HUD и отключать сенсорное управление.","إظهار عناصر HUD أو إخفاؤها وتعطيل أدوات التحكم باللمس."],
"שפה":["Language","Idioma","Langue","Sprache","Язык","اللغة"],
"✔️ סגור":["✔️ Close","✔️ Cerrar","✔️ Fermer","✔️ Schließen","✔️ Закрыть","✔️ إغلاق"],
"🍀 מזל":["🍀 Luck","🍀 Suerte","🍀 Chance","🍀 Glück","🍀 Удача","🍀 الحظ"],
"🔫 סוג רובה":["🔫 Weapon","🔫 Arma","🔫 Arme","🔫 Waffe","🔫 Оружие","🔫 السلاح"],
"🎯 תחמושת":["🎯 Ammo","🎯 Munición","🎯 Munitions","🎯 Munition","🎯 Боеприпасы","🎯 الذخيرة"],
"📏 מרחק":["📏 Distance","📏 Distancia","📏 Distance","📏 Entfernung","📏 Расстояние","📏 المسافة"],
"❤️ חיים":["❤️ Lives","❤️ Vidas","❤️ Vies","❤️ Leben","❤️ Жизни","❤️ الأرواح"],
"🛸 מיני־חלליות":["🛸 Mini ships","🛸 Mini naves","🛸 Mini-vaisseaux","🛸 Mini-Raumschiffe","🛸 Мини-корабли","🛸 سفن صغيرة"],
"⚔️ חרבות":["⚔️ Swords","⚔️ Espadas","⚔️ Épées","⚔️ Schwerter","⚔️ Мечи","⚔️ السيوف"],
"💥 אפקטי פגיעה (רעידה)":["💥 Hit effects (shake)","💥 Efectos de impacto (vibración)","💥 Effets d’impact (secousse)","💥 Treffereffekte (Bildschirmwackeln)","💥 Эффекты попадания (тряска)","💥 تأثيرات الإصابة (اهتزاز)"],
"🔴 מספרי נזק מעל אויבים":["🔴 Damage numbers above enemies","🔴 Números de daño sobre enemigos","🔴 Dégâts affichés au-dessus des ennemis","🔴 Schadenszahlen über Gegnern","🔴 Числа урона над врагами","🔴 أرقام الضرر فوق الأعداء"],
"☄️ התפרקות מטאוריטים":["☄️ Meteorite breakup","☄️ Desintegración de meteoritos","☄️ Désintégration des météorites","☄️ Meteoritenzerfall","☄️ Разрушение метеоритов","☄️ تحطم النيازك"],
"📱 כפתורי טאבלט/טלפון":["📱 Tablet/phone controls","📱 Controles de móvil/tableta","📱 Commandes tablette/téléphone","📱 Tablet-/Handysteuerung","📱 Управление на телефоне/планшете","📱 أزرار الهاتف/الجهاز اللوحي"],
"🎮 צורת תנועה":["🎮 Movement style","🎮 Tipo de movimiento","🎮 Type de déplacement","🎮 Bewegungsart","🎮 Тип движения","🎮 نمط الحركة"],
"⚪ עיגול גרירה":["⚪ Drag joystick","⚪ Joystick táctil","⚪ Joystick à glisser","⚪ Zieh-Joystick","⚪ Джойстик перетаскивания","⚪ عصا تحكم بالسحب"],
"⬆️ חצים":["⬆️ Arrows","⬆️ Flechas","⬆️ Flèches","⬆️ Pfeile","⬆️ Стрелки","⬆️ الأسهم"],
"🚀 GALAXY DEFENDER 🚀":["🚀 GALAXY DEFENDER 🚀","🚀 GALAXY DEFENDER 🚀","🚀 GALAXY DEFENDER 🚀","🚀 GALAXY DEFENDER 🚀","🚀 GALAXY DEFENDER 🚀","🚀 GALAXY DEFENDER 🚀"],
"השמד מטאוריטים וחלליות אויב, צבור XP ועלה רמות.":["Destroy meteorites and enemy ships, earn XP, and level up.","Destruye meteoritos y naves enemigas, consigue XP y sube de nivel.","Détruis les météorites et les vaisseaux ennemis, gagne de l’XP et monte de niveau.","Zerstöre Meteoriten und feindliche Raumschiffe, sammle XP und steige auf.","Уничтожай метеориты и корабли врагов, получай XP и повышай уровень.","دمر النيازك وسفن الأعداء واجمع XP وارفع مستواك."],
"בחר דרגת קושי":["Choose difficulty","Elige la dificultad","Choisis la difficulté","Schwierigkeitsgrad wählen","Выбери сложность","اختر مستوى الصعوبة"],
"קל":["Easy","Fácil","Facile","Einfach","Легко","سهل"],"בינוני":["Normal","Normal","Normal","Normal","Средне","متوسط"],"קשה":["Hard","Difícil","Difficile","Schwer","Сложно","صعب"],"סופר קשה":["Super Hard","Muy difícil","Très difficile","Sehr schwer","Очень сложно","صعب جدًا"],"בלתי אפשרי":["Impossible","Imposible","Impossible","Unmöglich","Невозможно","مستحيل"],
"התחל משחק":["Start Game","Iniciar juego","Démarrer","Spiel starten","Начать игру","ابدأ اللعبة"],
"משימות יומיות":["Daily Missions","Misiones diarias","Missions quotidiennes","Tägliche Missionen","Ежедневные задания","المهام اليومية"],
"הישגים":["Achievements","Logros","Succès","Erfolge","Достижения","الإنجازات"],
"איך משחקים והקלפים":["How to Play & Cards","Cómo jugar y cartas","Comment jouer et cartes","Spielanleitung & Karten","Как играть и карты","كيفية اللعب والبطاقات"],
"🆙 עלית רמה!":["🆙 Level Up!","🆙 ¡Subiste de nivel!","🆙 Niveau supérieur !","🆙 Levelaufstieg!","🆙 Новый уровень!","🆙 ارتفع مستواك!"],
"בחר שדרוג אחד:":["Choose one upgrade:","Elige una mejora:","Choisis une amélioration :","Wähle ein Upgrade:","Выбери улучшение:","اختر ترقية واحدة:"],
"⏸️ המשחק נעצר":["⏸️ Game Paused","⏸️ Juego en pausa","⏸️ Jeu en pause","⏸️ Spiel pausiert","⏸️ Игра на паузе","⏸️ اللعبة متوقفة مؤقتًا"],
"▶️ המשך משחק":["▶️ Resume Game","▶️ Continuar","▶️ Reprendre","▶️ Weiterspielen","▶️ Продолжить","▶️ استئناف اللعبة"],
"🏁 סיים משחק":["🏁 End Game","🏁 Terminar juego","🏁 Terminer la partie","🏁 Spiel beenden","🏁 Завершить игру","🏁 إنهاء اللعبة"],
"👤 פרופיל":["👤 Profile","👤 Perfil","👤 Profil","👤 Profil","👤 Профиль","👤 الملف الشخصي"],
"💾 שמור שם":["💾 Save Name","💾 Guardar nombre","💾 Enregistrer le nom","💾 Namen speichern","💾 Сохранить имя","💾 حفظ الاسم"],
"🏆 השיאים שלי":["🏆 My Records","🏆 Mis récords","🏆 Mes records","🏆 Meine Rekorde","🏆 Мои рекорды","🏆 أرقامي القياسية"],
"🏆 לוח תוצאות":["🏆 Leaderboard","🏆 Clasificación","🏆 Classement","🏆 Bestenliste","🏆 Таблица лидеров","🏆 لوحة المتصدرين"],
"📕 אוסף בוסים ואויבים":["📕 Boss & Enemy Collection","📕 Colección de jefes y enemigos","📕 Collection des boss et ennemis","📕 Boss- und Gegnersammlung","📕 Коллекция боссов и врагов","📕 مجموعة الزعماء والأعداء"],
"📖 איך משחקים והקלפים":["📖 How to Play & Cards","📖 Cómo jugar y cartas","📖 Comment jouer et cartes","📖 Spielanleitung & Karten","📖 Как играть и карты","📖 كيفية اللعب والبطاقات"],
"💥 GAME OVER":["💥 GAME OVER","💥 FIN DEL JUEGO","💥 FIN DE PARTIE","💥 SPIEL VORBEI","💥 ИГРА ОКОНЧЕНА","💥 انتهت اللعبة"],
"משחק חדש":["New Game","Nuevo juego","Nouvelle partie","Neues Spiel","Новая игра","لعبة جديدة"],
"🏆 שיא חדש!":["🏆 New Record!","🏆 ¡Nuevo récord!","🏆 Nouveau record !","🏆 Neuer Rekord!","🏆 Новый рекорд!","🏆 رقم قياسي جديد!"],
"👹 BOSS":["👹 BOSS","👹 JEFE","👹 BOSS","👹 BOSS","👹 БОСС","👹 زعيم"],
"🌌 חלל רגיל":["🌌 Normal Space","🌌 Espacio normal","🌌 Espace normal","🌌 Normaler Weltraum","🌌 Обычный космос","🌌 الفضاء العادي"],
"👤 שם משתמש:":["👤 Username:","👤 Nombre de usuario:","👤 Nom d’utilisateur :","👤 Benutzername:","👤 Имя игрока:","👤 اسم المستخدم:"],
"שם המשתמש שלך:":["Your username:","Tu nombre de usuario:","Ton nom d’utilisateur :","Dein Benutzername:","Твоё имя игрока:","اسم المستخدم الخاص بك:"],
"שם משתמש":["Username","Nombre de usuario","Nom d’utilisateur","Benutzername","Имя игрока","اسم المستخدم"],
"קלף":["Card","Carta","Carte","Karte","Карта","بطاقة"],
"נקודות":["points","puntos","points","Punkte","очков","نقاط"],
"מזל":["Luck","Suerte","Chance","Glück","Удача","الحظ"],
"מגן":["Shield","Escudo","Bouclier","Schild","Щит","درع"],
"מרחק":["Distance","Distancia","Distance","Entfernung","Расстояние","المسافة"],
"רמה":["Level","Nivel","Niveau","Level","Уровень","المستوى"]
};
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
 if(node.nodeType===Node.TEXT_NODE){const v=translate(node.nodeValue);if(v!==node.nodeValue)node.nodeValue=v;return;}
 if(node.nodeType!==Node.ELEMENT_NODE||["SCRIPT","STYLE"].includes(node.tagName))return;
 ["title","aria-label","placeholder"].forEach(a=>{if(node.hasAttribute(a)){const key="data-gd-"+a;if(!node.hasAttribute(key))node.setAttribute(key,node.getAttribute(a));const v=translate(node.getAttribute(key));if(v!==node.getAttribute(a))node.setAttribute(a,v);}});
 Array.from(node.childNodes).forEach(visit);
}
function setLanguage(code,manual){
 if(!supported.includes(code))code="en";current=code;
 try{localStorage.setItem(KEY,code);if(manual)localStorage.setItem(KEY+"_manual","1");}catch(e){}
 document.documentElement.lang=code;document.documentElement.dir=(code==="he"||code==="ar")?"rtl":"ltr";
 document.body.classList.toggle("language-rtl",code==="he"||code==="ar");
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