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
 "בלתי ניתן לעצירה":["Unstoppable","Imparable","Inarrêtable","Unaufhaltsam","Неудержимый","لا يمكن إيقافه"],
 "עלה רמה פעם 1":["Level Up for the First Time","Sube de nivel por primera vez","Passe un niveau pour la première fois","Steige zum ersten Mal auf","Впервые повысь уровень","ارفع المستوى لأول مرة"],
 "הרוס מתאורית":["Destroy a Meteorite","Destruye un meteorito","Détruis une météorite","Zerstöre einen Meteoriten","Уничтожь метеорит","دمر نيزكًا"],
 "הרוס חללית אויב":["Destroy an Enemy Spaceship","Destruye una nave enemiga","Détruis un vaisseau ennemi","Zerstöre ein feindliches Raumschiff","Уничтожь вражеский корабль","دمر سفينة عدو"],
 "נשא את כל רמות הקושי":["Try Every Difficulty","Prueba todas las dificultades","Essaie toutes les difficultés","Spiele auf allen Schwierigkeitsgraden","Попробуй все уровни сложности","جرّب جميع مستويات الصعوبة"],
 "הרוג בוס":["Defeat a Boss","Derrota a un jefe","Bats un boss","Besiege einen Boss","Победи босса","اهزم زعيمًا"],
 "הרוס בוס מתפצל":["Defeat the Splitting Boss","Derrota al jefe divisor","Bats le boss diviseur","Besiege den Spaltboss","Победи разделяющегося босса","اهزم الزعيم المنقسم"],
 "קלף מדהים ראשון":["First Amazing Card","Primera carta asombrosa","Première carte incroyable","Erste erstaunliche Karte","Первая удивительная карта","أول بطاقة مذهلة"]
};
function translateAchievementPattern(source,lang){
 const index=supported.indexOf(lang)-1;
 if(index<0)return source;
 if(uniqueAchievementText[source])return uniqueAchievementText[source][index];
 let titleMatch=source.match(/^(\d+) מטר$/);
 if(titleMatch)return [titleMatch[1]+" meters",titleMatch[1]+" metros",titleMatch[1]+" mètres",titleMatch[1]+" Meter",titleMatch[1]+" метров",titleMatch[1]+" متر"][index];
 titleMatch=source.match(/^הרוס (\d+) (.+)$/);
 if(titleMatch){const n=titleMatch[1],term=titleMatch[2];const noun=(term.includes("מטאור")||term.includes("תאור")||term.includes("טעור"))?["meteorites","meteoritos","météorites","Meteoriten","метеоритов","نيازك"]:(term.includes("חללית")||term.includes("חליל"))?["enemy spaceships","naves enemigas","vaisseaux ennemis","feindliche Raumschiffe","кораблей врагов","سفن الأعداء"]:term.includes("בוס")?["bosses","jefes","boss","Bosse","боссов","زعماء"]:null;if(noun)return ["Destroy "+n+" "+noun[index],"Destruye "+n+" "+noun[index],"Détruis "+n+" "+noun[index],"Zerstöre "+n+" "+noun[index],"Уничтожь "+n+" "+noun[index],"دمر "+n+" "+noun[index]][index];}
 titleMatch=source.match(/^פתחו? (\d+)? ?(קלפים?.*)$/);
 if(titleMatch){const n=titleMatch[1]?titleMatch[1]+" ":"";const term=titleMatch[2];const tier=term.includes("רגיל")?["common cards","cartas comunes","cartes communes","gewöhnliche Karten","обычных карт","بطاقات عادية"]:term.includes("נדיר")?["rare cards","cartas raras","cartes rares","seltene Karten","редких карт","بطاقات نادرة"]:term.includes("אדיר")?["epic cards","cartas épicas","cartes épiques","epische Karten","эпических карт","بطاقات ملحمية"]:term.includes("אגדי")?["legendary cards","cartas legendarias","cartes légendaires","legendäre Karten","легендарных карт","بطاقات أسطورية"]:term.includes("מדהים")?["amazing cards","cartas asombrosas","cartes incroyables","fantastische Karten","удивительных карт","بطاقات مذهلة"]:["cards","cartas","cartes","Karten","карт","بطاقات"];return ["Unlock "+n+tier[index],"Desbloquea "+n+tier[index],"Débloque "+n+tier[index],"Schalte "+n+tier[index]+" frei","Открой "+n+tier[index],"افتح "+n+tier[index]][index];}
 titleMatch=source.match(/^(\d+) קלפים? (רגילים|נדירים|אדירים|אגדיים|מדהימים)$/);
 if(titleMatch){const n=titleMatch[1],term=titleMatch[2];const tier=term.includes("רגיל")?["common cards","cartas comunes","cartes communes","gewöhnliche Karten","обычных карт","بطاقات عادية"]:term.includes("נדיר")?["rare cards","cartas raras","cartes rares","seltene Karten","редких карт","بطاقات نادرة"]:term.includes("אדיר")?["epic cards","cartas épicas","cartes épiques","epische Karten","эпических карт","بطاقات ملحمية"]:term.includes("אגדי")?["legendary cards","cartas legendarias","cartes légendaires","legendäre Karten","легендарных карт","بطاقات أسطورية"]:["amazing cards","cartas asombrosas","cartes incroyables","fantastische Karten","удивительных карт","بطاقات مذهلة"];return [n+" "+tier[index],n+" "+tier[index],n+" "+tier[index],n+" "+tier[index],n+" "+tier[index],n+" "+tier[index]][index];}
 titleMatch=source.match(/^(?:עבור )?(\d+) רמות$/);
 if(titleMatch){const n=titleMatch[1];return ["Gain "+n+" levels","Sube "+n+" niveles","Gagne "+n+" niveaux","Steige "+n+" Level auf","Получи "+n+" уровней","ارفع "+n+" مستويات"][index];}
 titleMatch=source.match(/^(?:הגעה ל|רמה |עלה לרמה )(\d+)(?: במשחק אחד)?$/);
 if(titleMatch){const n=titleMatch[1];return ["Reach level "+n,"Alcanza el nivel "+n,"Atteins le niveau "+n,"Erreiche Level "+n,"Достигни уровня "+n,"صل إلى المستوى "+n][index];}
 titleMatch=source.match(/^שחק ב(.+)$/);
 if(titleMatch){const mode=titleMatch[1].includes("בלתי")?["Impossible","Imposible","Impossible","Unmöglich","Невозможном","المستحيل"]:titleMatch[1].includes("סופר")?["Super Hard","Muy difícil","Très difficile","Sehr schwer","Очень сложном","الصعب جدًا"]:titleMatch[1].includes("קשה")?["Hard","Difícil","Difficile","Schwer","Сложном","الصعب"]:titleMatch[1].includes("בינוני")?["Normal","Normal","Normal","Normal","Среднем","المتوسط"]:["Easy","Fácil","Facile","Einfach","Лёгком","السهل"];return ["Play on "+mode[index],"Juega en "+mode[index],"Joue en mode "+mode[index],"Spiele auf "+mode[index],"Сыграй на уровне "+mode[index],"العب في مستوى "+mode[index]][index];}

 let m=source.match(/^הגע ל־([\d,]+) מטר במשחק אחד\.?$/);
 if(m)return ["Reach "+m[1]+" meters in one game.","Alcanza "+m[1]+" metros en una partida.","Atteins "+m[1]+" mètres en une partie.","Erreiche "+m[1]+" Meter in einem Spiel.","Достигни "+m[1]+" метров за одну игру.","Достигни "+m[1]+" метров за одну игру."][index];
 m=source.match(/^הגע ל־([\d,]+) מטר במשחק בבלתי אפשרי\.?$/);
 if(m)return ["Reach "+m[1]+" meters in an Impossible game.","Alcanza "+m[1]+" metros en una partida Imposible.","Atteins "+m[1]+" mètres en mode Impossible.","Erreiche "+m[1]+" Meter in einem Unmöglich-Spiel.","Достигни "+m[1]+" метров в режиме «Невозможно».","تصل إلى "+m[1]+" مترًا في وضع المستحيل."][index];
 m=source.match(/^(?:הרוס|הרג) (\d+) (מטאוריטים|מטאוריתים|חלליות אויב|בוסים) בסך הכול\.?$/);
 if(m){const word=m[2].startsWith("מטאור")?"meteorites":m[2]==="חלליות אויב"?"enemy spaceships":"bosses";const forms={ "meteorites":["Destroy "+m[1]+" meteorites in total.","Destruye "+m[1]+" meteoritos en total.","Détruis "+m[1]+" météorites au total.","Zerstöre insgesamt "+m[1]+" Meteoriten.","Уничтожь всего "+m[1]+" метеоритов.","دمر "+m[1]+" نيزكًا إجمالًا."],"enemy spaceships":["Destroy "+m[1]+" enemy spaceships in total.","Destruye "+m[1]+" naves enemigas en total.","Détruis "+m[1]+" vaisseaux ennemis au total.","Zerstöre insgesamt "+m[1]+" feindliche Raumschiffe.","Уничтожь всего "+m[1]+" кораблей врагов.","دمر "+m[1]+" من سفن الأعداء إجمالًا."],"bosses":["Defeat "+m[1]+" bosses in total.","Derrota "+m[1]+" jefes en total.","Bats "+m[1]+" boss au total.","Besiege insgesamt "+m[1]+" Bosse.","Победи всего "+m[1]+" боссов.","اهزم "+m[1]+" زعماء إجمالًا."]};return forms[word][index];}
 m=source.match(/^הגע לרמה (\d+)(?: במשחק אחד)?\.?$/);
 if(m)return ["Reach level "+m[1]+(source.includes("במשחק אחד")?" in one game.":"."),
 "Alcanza el nivel "+m[1]+(source.includes("במשחק אחד")?" en una partida.":"."),"Atteins le niveau "+m[1]+(source.includes("במשחק אחד")?" en une partie.":"."),"Erreiche Level "+m[1]+(source.includes("במשחק אחד")?" in einem Spiel.":"."),"Достигни уровня "+m[1]+(source.includes("במשחק אחד")?" за одну игру.":"."),"صل إلى المستوى "+m[1]+(source.includes("במשחק אחד")?" في مباراة واحدة.":".")][index];
 m=source.match(/^שחק לפחות משחק אחד ב(.+)\.?$/);
 if(m){const mode=m[1].includes("בלתי")?["Impossible","Imposible","Impossible","Unmöglich","Невозможном","المستحيل"]:m[1].includes("סופר")?["Super Hard","Muy difícil","Très difficile","Sehr schwer","Очень сложном","الصعب جدًا"]:m[1].includes("קשה")?["Hard","Difícil","Difficile","Schwer","Сложном","الصعب"]:m[1].includes("בינוני")?["Normal","Normal","Normal","Normal","Среднем","المتوسط"]:["Easy","Fácil","Facile","Einfach","Лёгком","السهل"];return ["Play at least one game on "+mode[index]+".","Juega al menos una partida en "+mode[index]+".","Joue au moins une partie en mode "+mode[index]+".","Spiele mindestens ein Spiel auf "+mode[index]+".","Сыграй хотя бы одну игру на уровне "+mode[index]+".","العب مباراة واحدة على الأقل في مستوى "+mode[index]+"."][index];}
 m=source.match(/^(?:הרוג|הבס|השמד) (\d+) בוסים בסך הכול\.?$/);
 if(m)return ["Defeat "+m[1]+" bosses in total.","Derrota "+m[1]+" jefes en total.","Bats "+m[1]+" boss au total.","Besiege insgesamt "+m[1]+" Bosse.","Победи всего "+m[1]+" боссов.","اهزم "+m[1]+" زعماء إجمالًا."][index];
 m=source.match(/^עלה (\d+) רמות בסך הכול.*\.?$/);
 if(m)return ["Gain "+m[1]+" levels in total.","Sube "+m[1]+" niveles en total.","Gagne "+m[1]+" niveaux au total.","Steige insgesamt "+m[1]+" Level auf.","Получи "+m[1]+" уровней в общей сложности.","ارفع مستواك "+m[1]+" مرة إجمالًا."][index];
 return source;
}

function translateAchievementDescription(source,lang){
 const i=supported.indexOf(lang)-1;if(i<0)return source;
 const m=source.match(/^הגע ל־([\d,]+) מטר במשחק אחד\.?$/);
 if(m)return ["Reach "+m[1]+" meters in one game.","Alcanza "+m[1]+" metros en una partida.","Atteins "+m[1]+" mètres en une partie.","Erreiche "+m[1]+" Meter in einem Spiel.","Достигни "+m[1]+" метров за одну игру.","Достигни "+m[1]+" метров за одну игру."][i];
 const patterns=[
  [/^שחק במשחק הראשון שלך\.?$/,["Play your first game.","Juega tu primera partida.","Joue ta première partie.","Spiele dein erstes Spiel.","Сыграй свою первую игру.","العب مباراتك الأولى."]],
  [/^עלה רמה בפעם הראשונה\.?$/,["Level up for the first time.","Sube de nivel por primera vez.","Passe un niveau pour la première fois.","Steige zum ersten Mal auf.","Впервые повысь уровень.","ارفع المستوى لأول مرة."]],
  [/^הרוס מטאורית אחת\.?$/,["Destroy one meteorite.","Destruye un meteorito.","Détruis une météorite.","Zerstöre einen Meteoriten.","Уничтожь один метеорит.","دمر نيزكًا واحدًا."]],
  [/^הרוס חללית אויב אחת\.?$/,["Destroy one enemy spaceship.","Destruye una nave enemiga.","Détruis un vaisseau ennemi.","Zerstöre ein feindliches Raumschiff.","Уничтожь один вражеский корабль.","دمر سفينة عدو واحدة."]],
  [/^שחק בכל 5 דרגות הקושי\.?$/,["Play on all 5 difficulty levels.","Juega en los 5 niveles de dificultad.","Joue aux 5 niveaux de difficulté.","Spiele auf allen 5 Schwierigkeitsgraden.","Сыграй на всех 5 уровнях сложности.","العب في مستويات الصعوبة الخمسة."]],
  [/^הרוג בוס אחד\.?$/,["Defeat one boss.","Derrota a un jefe.","Bats un boss.","Besiege einen Boss.","Победи одного босса.","اهزم زعيمًا واحدًا."]],
  [/^הרוג בוס מתפצל\.?$/,["Defeat a splitting boss.","Derrota a un jefe que se divide.","Bats un boss qui se divise.","Besiege einen sich teilenden Boss.","Победи разделяющегося босса.","اهزم زعيمًا منقسمًا."]],
  [/^פתח את קלף המדהים הראשון שלך\.?$/,["Unlock your first Amazing card.","Desbloquea tu primera carta Asombrosa.","Débloque ta première carte Incroyable.","Schalte deine erste Fantastische Karte frei.","Открой свою первую удивительную карту.","افتح أول بطاقة مذهلة لك."]],
  [/^השג קלף אולטרה בפעם הראשונה\.?$/,["Obtain an Ultra card for the first time.","Consigue una carta Ultra por primera vez.","Obtiens une carte Ultra pour la première fois.","Erhalte zum ersten Mal eine Ultra-Karte.","Получи карту Ультра впервые.","احصل على بطاقة ألترا لأول مرة."]],
  [/^השג את כל קלפי האולטרה במשחק אחד\.?$/,["Obtain all Ultra cards in one game.","Consigue todas las cartas Ultra en una partida.","Obtiens toutes les cartes Ultra en une partie.","Erhalte alle Ultra-Karten in einem Spiel.","Получи все карты Ультра за одну игру.","احصل على جميع بطاقات ألترا في مباراة واحدة."]],
  [/^השג את כל קלפי האולטרה ואת כל קלפי המדהים במשחק אחד\.?$/,["Obtain all Ultra and Amazing cards in one game.","Consigue todas las cartas Ultra y Asombrosas en una partida.","Obtiens toutes les cartes Ultra et Incroyables en une partie.","Erhalte alle Ultra- und Fantastischen Karten in einem Spiel.","Получи все карты Ультра и удивительные карты за одну игру.","احصل على جميع بطاقات ألترا والمذهلة في مباراة واحدة."]],
  [/^צבור 120 שניות במצב אולטרה במשחק אחד\.?$/,["Accumulate 120 seconds in Ultra mode in one game.","Acumula 120 segundos en modo Ultra en una partida.","Accumule 120 secondes en mode Ultra en une partie.","Sammle 120 Sekunden im Ultra-Modus in einem Spiel.","Набери 120 секунд в режиме Ультра за одну игру.","اجمع 120 ثانية في وضع ألترا خلال مباراة واحدة."]],
  [/^הבס 10 בוסים במצב בלתי אפשרי\.?$/,["Defeat 10 bosses in Impossible mode.","Derrota a 10 jefes en modo Imposible.","Bats 10 boss en mode Impossible.","Besiege 10 Bosse im Unmöglich-Modus.","Победи 10 боссов в режиме «Невозможно».","اهزم 10 زعماء في وضع المستحيل."]]
 ];
 for(const [re,forms] of patterns){if(re.test(source))return forms[i];}
 let x=source.match(/^הרוס (\d+) (מטאוריתים?|מטאוריטים|מטעוריתים?|מטעוריטים) בסך הכול\.?$/);
 if(x)return ["Destroy "+x[1]+" meteorites in total.","Destruye "+x[1]+" meteoritos en total.","Détruis "+x[1]+" météorites au total.","Zerstöre insgesamt "+x[1]+" Meteoriten.","Уничтожь всего "+x[1]+" метеоритов.","دمر "+x[1]+" نيزكًا إجمالًا."][i];
 x=source.match(/^הרוס (\d+) חלליות אויב בסך הכול\.?$/);
 if(x)return ["Destroy "+x[1]+" enemy spaceships in total.","Destruye "+x[1]+" naves enemigas en total.","Détruis "+x[1]+" vaisseaux ennemis au total.","Zerstöre insgesamt "+x[1]+" feindliche Raumschiffe.","Уничтожь всего "+x[1]+" вражеских кораблей.","دمر "+x[1]+" سفن أعداء إجمالًا."][i];
 x=source.match(/^(?:הרוג|הרוס|הבס) (\d+) בוסים מתפצלים?\.?$/);
 if(x)return ["Defeat "+x[1]+" splitting bosses.","Derrota a "+x[1]+" jefes que se dividen.","Bats "+x[1]+" boss qui se divisent.","Besiege "+x[1]+" sich teilende Bosse.","Победи "+x[1]+" разделяющихся боссов.","اهزم "+x[1]+" زعماء منقسمين."][i];
 x=source.match(/^הרוס (\d+) בוסים מיוחדים בסך הכול\.?$/);
 if(x)return ["Defeat "+x[1]+" special bosses in total.","Derrota a "+x[1]+" jefes especiales en total.","Bats "+x[1]+" boss spéciaux au total.","Besiege insgesamt "+x[1]+" Spezialbosse.","Победи всего "+x[1]+" особых боссов.","اهزم "+x[1]+" زعماء خاصين إجمالًا."][i];
 x=source.match(/^הגע לרמה (\d+) במשחק אחד\.?$/);
 if(x)return ["Reach level "+x[1]+" in one game.","Alcanza el nivel "+x[1]+" en una partida.","Atteins le niveau "+x[1]+" en une partie.","Erreiche Level "+x[1]+" in einem Spiel.","Достигни уровня "+x[1]+" за одну игру.","صل إلى المستوى "+x[1]+" في مباراة واحدة."][i];
 x=source.match(/^עלה (\d+) רמות בסך הכול(?:, לא חייב ברצף)?\.?$/);
 if(x)return ["Gain "+x[1]+" levels in total.","Sube "+x[1]+" niveles en total.","Gagne "+x[1]+" niveaux au total.","Steige insgesamt "+x[1]+" Level auf.","Получи "+x[1]+" уровней в общей сложности.","ارفع "+x[1]+" مستويات إجمالًا."][i];
 x=source.match(/^שחק לפחות משחק אחד ב(.+)\.?$/);
 if(x){const d=x[1].includes("בלתי")?["Impossible","Imposible","Impossible","Unmöglich","Невозможном","المستحيل"]:x[1].includes("סופר")?["Super Hard","Muy difícil","Très difficile","Sehr schwer","Очень сложном","الصعب جدًا"]:x[1].includes("קשה")?["Hard","Difícil","Difficile","Schwer","Сложном","الصعب"]:x[1].includes("בינוני")?["Normal","Normal","Normal","Normal","Среднем","المتوسط"]:["Easy","Fácil","Facile","Einfach","Лёгком","السهل"];return ["Play at least one game on "+d[i]+".","Juega al menos una partida en "+d[i]+".","Joue au moins une partie en mode "+d[i]+".","Spiele mindestens ein Spiel auf "+d[i]+".","Сыграй хотя бы одну игру на уровне "+d[i]+".","العب مباراة واحدة على الأقل في مستوى "+d[i]+"."][i];}
 x=source.match(/^הגע ל־?([\d,]+) מטר במשחק בבלתי אפשרי\.?$/);
 if(x)return ["Reach "+x[1]+" meters in an Impossible game.","Alcanza "+x[1]+" metros en una partida Imposible.","Atteins "+x[1]+" mètres en mode Impossible.","Erreiche "+x[1]+" Meter in einem Unmöglich-Spiel.","Достигни "+x[1]+" метров в режиме «Невозможно».","تصل إلى "+x[1]+" مترًا في وضع المستحيل."][i];

 let card=source.match(/^פתח(?:ו)?(?: (\\d+))? קלפים? (רגילים|נדירים|אדירים|אגדיים|מדהימים)(?: בסך הכול)?\\.?$/);
 if(card){const n=card[1]||"1",tier=card[2].includes("רגיל")?["common cards","cartas comunes","cartes communes","gewöhnliche Karten","обычных карт","بطاقات عادية"]:card[2].includes("נדיר")?["rare cards","cartas raras","cartes rares","seltene Karten","редких карт","بطاقات نادرة"]:card[2].includes("אדיר")?["epic cards","cartas épicas","cartes épiques","epische Karten","эпических карт","بطاقات ملحمية"]:card[2].includes("אגדי")?["legendary cards","cartas legendarias","cartes légendaires","legendäre Karten","легендарных карт","بطاقات أسطورية"]:["Amazing cards","cartas asombrosas","cartes incroyables","fantastische Karten","удивительные карты","بطاقات مذهلة"];return ["Unlock "+n+" "+tier[i]+".","Desbloquea "+n+" "+tier[i]+".","Débloque "+n+" "+tier[i]+".","Schalte "+n+" "+tier[i]+" frei.","Открой "+n+" "+tier[i]+".","افتح "+n+" "+tier[i]+"."][i];}
 let c=source.match(/^(?:הרוס|השמד|הבס|הרוג) ([\\d,]+) (מטאוריתים?|מטאוריטים|מטעוריתים?|מטעוריטים|חלליות אויב|חלליות|בוסים|בוסים מיוחדים) בסך הכול\\.?$/);
 if(c){const noun=c[2].includes("מטאור")?["meteorites","meteoritos","météorites","Meteoriten","метеоритов","نيازك"]:c[2].includes("חללית")?["enemy spaceships","naves enemigas","vaisseaux ennemis","feindliche Raumschiffe","кораблей врагов","سفن الأعداء"]:c[2].includes("מיוחדים")?["special bosses","jefes especiales","boss spéciaux","Spezialbosse","особых боссов","زعماء خاصين"]:["bosses","jefes","boss","Bosse","боссов","زعماء"];return ["Defeat "+c[1]+" "+noun[i]+" in total.","Derrota "+c[1]+" "+noun[i]+" en total.","Bats "+c[1]+" "+noun[i]+" au total.","Besiege insgesamt "+c[1]+" "+noun[i]+".","Победи всего "+c[1]+" "+noun[i]+".","اهزم "+c[1]+" "+noun[i]+" إجمالًا."][i];}
 c=source.match(/^השמד ([\\d,]+) חלליות אויב בסך הכול\\.?$/);
 if(c)return ["Destroy "+c[1]+" enemy spaceships in total.","Destruye "+c[1]+" naves enemigas en total.","Détruis "+c[1]+" vaisseaux ennemis au total.","Zerstöre insgesamt "+c[1]+" feindliche Raumschiffe.","Уничтожь всего "+c[1]+" вражеских кораблей.","دمر "+c[1]+" سفن أعداء إجمالًا."][i];
 c=source.match(/^הבס ([\\d,]+) בוסים בסך הכול\\.?$/);
 if(c)return ["Defeat "+c[1]+" bosses in total.","Derrota a "+c[1]+" jefes en total.","Bats "+c[1]+" boss au total.","Besiege insgesamt "+c[1]+" Bosse.","Победи всего "+c[1]+" боссов.","اهزم "+c[1]+" زعماء إجمالًا."][i];
 c=source.match(/^צבור ([\\d,]+) נקודות אולטרה במהלך משחק אחד\\.?$/);
 if(c)return ["Earn "+c[1]+" Ultra points in one game.","Consigue "+c[1]+" puntos Ultra en una partida.","Gagne "+c[1]+" points Ultra en une partie.","Sammle "+c[1]+" Ultra-Punkte in einem Spiel.","Набери "+c[1]+" очков Ультра за одну игру.","اجمع "+c[1]+" نقطة ألترا في مباراة واحدة."][i];
 c=source.match(/^שרוד ([\\d,]+) מטר במצב בלתי אפשרי\\.?$/);
 if(c)return ["Survive "+c[1]+" meters in Impossible mode.","Sobrevive "+c[1]+" metros en modo Imposible.","Survis "+c[1]+" mètres en mode Impossible.","Überlebe "+c[1]+" Meter im Unmöglich-Modus.","Выживи на дистанции "+c[1]+" метров в режиме «Невозможно».","ابقَ على قيد الحياة لمسافة "+c[1]+" مترًا في وضع المستحيل."][i];

 return source;
}

function translate(value){
 const s=value.trim(); if(current==="he"||!s)return value;
 const row=translations[s]; if(row)return value.replace(s,row[supported.indexOf(current)-1]||s);
 const achievementTranslation=translateAchievementPattern(s,current);if(achievementTranslation!==s)return value.replace(s,achievementTranslation);
 const achievementDescriptionTranslation=translateAchievementDescription(s,current);if(achievementDescriptionTranslation!==s)return value.replace(s,achievementDescriptionTranslation);
 const catalog=window.GAME_TRANSLATIONS||{};
 for(const namespace of ["cards","achievements","dailyMissions","collection"]){
  const records=catalog[namespace]||{};
  for(const record of Object.values(records)){
   if(!record||typeof record!=="object")continue;
   if(record.sourceTitle===s&&Array.isArray(record.title)){const translatedTitle=record.title[supported.indexOf(current)-1];if(translatedTitle)return value.replace(s,translatedTitle);}
   if(record.sourceDescription===s&&Array.isArray(record.description)){const translatedDescription=record.description[supported.indexOf(current)-1];if(translatedDescription)return value.replace(s,translatedDescription);}
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