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

 let card=source.match(/^פתח(?:ו)?(?: (\d+))? קלפים? (רגילים|נדירים|אדירים|אגדיים|מדהימים)(?: בסך הכול)?\\.?$/);
 if(card){const n=card[1]||"1",tier=card[2].includes("רגיל")?["common cards","cartas comunes","cartes communes","gewöhnliche Karten","обычных карт","بطاقات عادية"]:card[2].includes("נדיר")?["rare cards","cartas raras","cartes rares","seltene Karten","редких карт","بطاقات نادرة"]:card[2].includes("אדיר")?["epic cards","cartas épicas","cartes épiques","epische Karten","эпических карт","بطاقات ملحمية"]:card[2].includes("אגדי")?["legendary cards","cartas legendarias","cartes légendaires","legendäre Karten","легендарных карт","بطاقات أسطورية"]:["Amazing cards","cartas asombrosas","cartes incroyables","fantastische Karten","удивительные карты","بطاقات مذهلة"];return ["Unlock "+n+" "+tier[i]+".","Desbloquea "+n+" "+tier[i]+".","Débloque "+n+" "+tier[i]+".","Schalte "+n+" "+tier[i]+" frei.","Открой "+n+" "+tier[i]+".","افتح "+n+" "+tier[i]+"."][i];}
 let c=source.match(/^(?:הרוס|השמד|הבס|הרוג) ([\d,]+) (מטאוריתים?|מטאוריטים|מטעוריתים?|מטעוריטים|חלליות אויב|חלליות|בוסים|בוסים מיוחדים) בסך הכול\\.?$/);
 if(c){const noun=c[2].includes("מטאור")?["meteorites","meteoritos","météorites","Meteoriten","метеоритов","نيازك"]:c[2].includes("חללית")?["enemy spaceships","naves enemigas","vaisseaux ennemis","feindliche Raumschiffe","кораблей врагов","سفن الأعداء"]:c[2].includes("מיוחדים")?["special bosses","jefes especiales","boss spéciaux","Spezialbosse","особых боссов","زعماء خاصين"]:["bosses","jefes","boss","Bosse","боссов","زعماء"];return ["Defeat "+c[1]+" "+noun[i]+" in total.","Derrota "+c[1]+" "+noun[i]+" en total.","Bats "+c[1]+" "+noun[i]+" au total.","Besiege insgesamt "+c[1]+" "+noun[i]+".","Победи всего "+c[1]+" "+noun[i]+".","اهزم "+c[1]+" "+noun[i]+" إجمالًا."][i];}
 c=source.match(/^השמד ([\d,]+) חלליות אויב בסך הכול\\.?$/);
 if(c)return ["Destroy "+c[1]+" enemy spaceships in total.","Destruye "+c[1]+" naves enemigas en total.","Détruis "+c[1]+" vaisseaux ennemis au total.","Zerstöre insgesamt "+c[1]+" feindliche Raumschiffe.","Уничтожь всего "+c[1]+" вражеских кораблей.","دمر "+c[1]+" سفن أعداء إجمالًا."][i];
 c=source.match(/^הבס ([\d,]+) בוסים בסך הכול\\.?$/);
 if(c)return ["Defeat "+c[1]+" bosses in total.","Derrota a "+c[1]+" jefes en total.","Bats "+c[1]+" boss au total.","Besiege insgesamt "+c[1]+" Bosse.","Победи всего "+c[1]+" боссов.","اهزم "+c[1]+" زعماء إجمالًا."][i];
 c=source.match(/^צבור ([\d,]+) נקודות אולטרה במהלך משחק אחד\\.?$/);
 if(c)return ["Earn "+c[1]+" Ultra points in one game.","Consigue "+c[1]+" puntos Ultra en una partida.","Gagne "+c[1]+" points Ultra en une partie.","Sammle "+c[1]+" Ultra-Punkte in einem Spiel.","Набери "+c[1]+" очков Ультра за одну игру.","اجمع "+c[1]+" نقطة ألترا في مباراة واحدة."][i];
 c=source.match(/^שרוד ([\d,]+) מטר במצב בלתי אפשרי\\.?$/);
 if(c)return ["Survive "+c[1]+" meters in Impossible mode.","Sobrevive "+c[1]+" metros en modo Imposible.","Survis "+c[1]+" mètres en mode Impossible.","Überlebe "+c[1]+" Meter im Unmöglich-Modus.","Выживи на дистанции "+c[1]+" метров в режиме «Невозможно».","ابقَ على قيد الحياة لمسافة "+c[1]+" مترًا في وضع المستحيل."][i];

 return source;
}


const collectionDescriptionTranslations={
"מטאוריט רגיל שמופיע בחלל.":["A regular meteorite that appears in space.","Un meteorito normal que aparece en el espacio.","Une météorite ordinaire qui apparaît dans l’espace.","Ein gewöhnlicher Meteorit, der im Weltraum erscheint.","Обычный метеорит, появляющийся в космосе.","نيزك عادي يظهر في الفضاء."],
"חללית אויב רגילה שיורה על השחקן.":["A regular enemy spaceship that shoots at the player.","Una nave enemiga normal que dispara al jugador.","Un vaisseau ennemi ordinaire qui tire sur le joueur.","Ein gewöhnliches feindliches Raumschiff, das auf den Spieler schießt.","Обычный вражеский корабль, который стреляет по игроку.","سفينة عدو عادية تطلق النار على اللاعب."],
"בוס בסיסי עם הרבה חיים ומתקפות חזקות.":["A basic boss with lots of health and powerful attacks.","Un jefe básico con mucha vida y ataques potentes.","Un boss de base avec beaucoup de points de vie et des attaques puissantes.","Ein einfacher Boss mit viel Lebensenergie und starken Angriffen.","Обычный босс с большим запасом здоровья и мощными атаками.","زعيم أساسي لديه الكثير من الصحة وهجمات قوية."],
"מתפצלת לשני שיבוטים שקופים יותר, עם 50% פחות חיים וירי איטי יותר.":["Splits into two more transparent clones with 50% less health and slower firing.","Se divide en dos clones más transparentes, con un 50 % menos de vida y disparos más lentos.","Se divise en deux clones plus transparents, avec 50 % de santé en moins et des tirs plus lents.","Teilt sich in zwei transparentere Klone mit 50 % weniger Leben und langsamerem Schussrhythmus.","Разделяется на два более прозрачных клона с 50% меньшим здоровьем и более редкой стрельбой.","تنقسم إلى نسختين أكثر شفافية، بصحة أقل بنسبة 50% وإطلاق نار أبطأ."],
"מתפצל לשני שיבוטים בצדדים עם מאפייני שיבוט.":["Splits into two side clones with clone characteristics.","Se divide en dos clones laterales con características de clonación.","Se divise en deux clones latéraux ayant les caractéristiques d’un clone.","Teilt sich in zwei seitliche Klone mit Klon-Eigenschaften.","Разделяется на два боковых клона с характеристиками клона.","ينقسم إلى نسختين جانبيتين بخصائص النسخ."],
"בוס מיוחד המבוסס על שיבוטים והטעיה.":["A special boss based on clones and deception.","Un jefe especial basado en clones y engaños.","Un boss spécial fondé sur les clones et la tromperie.","Ein Spezialboss, der auf Klonen und Täuschung basiert.","Особый босс, основанный на клонах и обмане.","زعيم خاص يعتمد على النسخ والخداع."],
"פגיעה בו מאטה את תנועת השחקן ואת קצב הירי למשך 2 שניות.":["Hitting it slows the player's movement and firing rate for 2 seconds.","Golpearlo ralentiza el movimiento del jugador y la cadencia de disparo durante 2 segundos.","Le toucher ralentit les déplacements du joueur et sa cadence de tir pendant 2 secondes.","Ein Treffer verlangsamt die Bewegung und Feuerrate des Spielers für 2 Sekunden.","Попадание по нему замедляет движение игрока и скорострельность на 2 секунды.","إصابته تبطئ حركة اللاعب ومعدل إطلاق النار لمدة ثانيتين."],
"פגיעה בו או השמדתו מקרוב מקפיאה את השחקן למשך 7 שניות.":["Hitting it or destroying it nearby freezes the player for 7 seconds.","Golpearlo o destruirlo de cerca congela al jugador durante 7 segundos.","Le toucher ou le détruire à proximité gèle le joueur pendant 7 secondes.","Ein Treffer oder seine Zerstörung in unmittelbarer Nähe friert den Spieler 7 Sekunden lang ein.","Попадание по нему или его уничтожение вблизи замораживает игрока на 7 секунд.","إصابته أو تدميره عن قرب يجمد اللاعب لمدة 7 ثوانٍ."],
"בוס מיוחד של אזור הקרח.":["A special boss from the ice zone.","Un jefe especial de la zona de hielo.","Un boss spécial de la zone de glace.","Ein Spezialboss aus der Eiszone.","Особый босс ледяной зоны.","زعيم خاص في منطقة الجليد."],
"אויב מיוחד שמשתמש בשערים כדי לנוע ולהופיע מחדש.":["A special enemy that uses portals to move and reappear.","Un enemigo especial que usa portales para moverse y reaparecer.","Un ennemi spécial qui utilise des portails pour se déplacer et réapparaître.","Ein Spezialgegner, der Portale nutzt, um sich zu bewegen und wieder aufzutauchen.","Особый враг, который использует порталы для перемещения и повторного появления.","عدو خاص يستخدم البوابات للتحرك والظهور مجددًا."],
"מטאוריט מיוחד שמופיע דרך שערים ונעלם דרכם.":["A special meteorite that appears and disappears through portals.","Un meteorito especial que aparece y desaparece a través de portales.","Une météorite spéciale qui apparaît et disparaît par des portails.","Ein Spezialmeteorit, der durch Portale erscheint und wieder verschwindet.","Особый метеорит, который появляется и исчезает через порталы.","نيزك خاص يظهر ويختفي عبر البوابات."],
"בוס מיוחד של אזור השערים.":["A special boss from the portal zone.","Un jefe especial de la zona de portales.","Un boss spécial de la zone des portails.","Ein Spezialboss aus der Portalzone.","Особый босс зоны порталов.","زعيم خاص في منطقة البوابات."],
"אינו יורה. הדרך היחידה שלו לפגוע היא להתנגש בשחקן.":["It does not shoot. Its only way to deal damage is by colliding with the player.","No dispara. Su única forma de hacer daño es chocar contra el jugador.","Il ne tire pas. Son seul moyen d’infliger des dégâts est de percuter le joueur.","Er schießt nicht. Er kann dem Spieler nur durch Zusammenstöße Schaden zufügen.","Он не стреляет. Единственный способ нанести урон — столкнуться с игроком.","لا يطلق النار. طريقته الوحيدة لإلحاق الضرر هي الاصطدام باللاعب."],
"מטאוריט מיוחד שמטרתו לפגוע בשחקן בהתנגשות.":["A special meteorite designed to hit the player by colliding with them.","Un meteorito especial que busca golpear al jugador mediante una colisión.","Une météorite spéciale conçue pour heurter le joueur par collision.","Ein Spezialmeteorit, der den Spieler durch Zusammenstöße treffen soll.","Особый метеорит, который пытается поразить игрока столкновением.","نيزك خاص يهدف إلى إصابة اللاعب عن طريق الاصطدام."],
"בוס מיוחד שמתמקד במרדף והתנגשויות.":["A special boss focused on chasing and collisions.","Un jefe especial centrado en persecuciones y colisiones.","Un boss spécial axé sur la poursuite et les collisions.","Ein Spezialboss, der sich auf Verfolgung und Zusammenstöße konzentriert.","Особый босс, специализирующийся на преследовании и столкновениях.","زعيم خاص يركز على المطاردة والاصطدامات."],
"נעלם ומשאיר אזור סגול, ואז חוזר אליו אחרי 4 שניות ויורה.":["Disappears and leaves a purple area, then returns to it after 4 seconds and shoots.","Desaparece y deja una zona morada; vuelve a ella después de 4 segundos y dispara.","Disparaît en laissant une zone violette, puis y revient après 4 secondes et tire.","Verschwindet und hinterlässt ein violettes Feld, kehrt nach 4 Sekunden dorthin zurück und schießt.","Исчезает, оставляя фиолетовую область, затем через 4 секунды возвращается туда и стреляет.","يختفي ويترك منطقة أرجوانية، ثم يعود إليها بعد 4 ثوانٍ ويطلق النار."],
"חוזר לאזור סגול ואז מנפץ אותו במקום לירות.":["Returns to a purple area and then shatters it instead of shooting.","Vuelve a una zona morada y la hace estallar en lugar de disparar.","Revient dans une zone violette puis la fait éclater au lieu de tirer.","Kehrt zu einem violetten Feld zurück und zerschmettert es, statt zu schießen.","Возвращается в фиолетовую область и разбивает её вместо выстрела.","يعود إلى منطقة أرجوانية ثم يحطمها بدلًا من إطلاق النار."],
"בוס מיוחד המבוסס על טלפורטציה.":["A special boss based on teleportation.","Un jefe especial basado en la teletransportación.","Un boss spécial fondé sur la téléportation.","Ein Spezialboss, der auf Teleportation basiert.","Особый босс, основанный на телепортации.","زعيم خاص يعتمد على الانتقال الآني."],
"פגיעה בה יכולה להפוך את כיווני התנועה של השחקן לזמן קצר.":["Hitting it can temporarily reverse the player's movement controls.","Golpearla puede invertir temporalmente los controles de movimiento del jugador.","La toucher peut inverser temporairement les commandes de déplacement du joueur.","Ein Treffer kann die Bewegungssteuerung des Spielers kurzzeitig umkehren.","Попадание по ней может ненадолго изменить направления управления игроком на противоположные.","إصابتها قد تعكس اتجاهات حركة اللاعب لفترة قصيرة."],
"מחליף כיוון בקצה המסך ונע במסלול ההפוך.":["Changes direction at the edge of the screen and travels along the reverse path.","Cambia de dirección en el borde de la pantalla y sigue la trayectoria inversa.","Change de direction au bord de l’écran et suit la trajectoire inverse.","Ändert am Bildschirmrand die Richtung und bewegt sich auf der umgekehrten Bahn.","Меняет направление у края экрана и движется по обратной траектории.","يغير اتجاهه عند حافة الشاشة ويتحرك في المسار المعاكس."],
"בוס מיוחד שמשנה את כיווני השליטה.":["A special boss that reverses the control directions.","Un jefe especial que invierte las direcciones de los controles.","Un boss spécial qui inverse les directions des commandes.","Ein Spezialboss, der die Steuerungsrichtungen umkehrt.","Особый босс, который меняет направления управления на противоположные.","زعيم خاص يعكس اتجاهات التحكم."],
"אויב שמת כשהוא מתפצל ל־2 שיבוטים עם 50% פחות חיים.":["An enemy that splits into 2 clones with 50% less health when it dies.","Un enemigo que al morir se divide en 2 clones con un 50 % menos de vida.","Un ennemi qui se divise à sa mort en 2 clones ayant 50 % de santé en moins.","Ein Gegner, der sich beim Tod in 2 Klone mit 50 % weniger Leben teilt.","Враг, который при смерти разделяется на 2 клона с 50% меньшим здоровьем.","عدو ينقسم عند موته إلى نسختين بصحة أقل بنسبة 50%."],
"מטאוריט שמת כשהוא מתפצל ל־2 שיבוטים עם 50% פחות חיים.":["A meteorite that splits into 2 clones with 50% less health when destroyed.","Un meteorito que al destruirse se divide en 2 clones con un 50 % menos de vida.","Une météorite qui se divise à sa destruction en 2 clones ayant 50 % de santé en moins.","Ein Meteorit, der sich bei seiner Zerstörung in 2 Klone mit 50 % weniger Leben teilt.","Метеорит, который при уничтожении разделяется на 2 клона с 50% меньшим здоровьем.","نيزك ينقسم عند تدميره إلى نسختين بصحة أقل بنسبة 50%."],
"בוס ירוק שמתפצל לבוסים בינוניים ואז למיני־בוסים.":["A green boss that splits into medium bosses and then mini-bosses.","Un jefe verde que se divide en jefes medianos y luego en minijefes.","Un boss vert qui se divise en boss moyens, puis en mini-boss.","Ein grüner Boss, der sich in mittelgroße Bosse und danach in Mini-Bosse teilt.","Зелёный босс, который разделяется на средних боссов, а затем на мини-боссов.","زعيم أخضر ينقسم إلى زعماء متوسطين ثم زعماء صغار."],
"באזור הזה אין אויב מיוחד — מופיעים אויבים ומטאוריטים באקראי מכל האזורים.":["There is no unique enemy in this zone — enemies and meteorites from all zones appear at random.","En esta zona no hay enemigos especiales: aparecen enemigos y meteoritos aleatorios de todas las zonas.","Cette zone n’a pas d’ennemi spécial : des ennemis et météorites de toutes les zones apparaissent aléatoirement.","In dieser Zone gibt es keinen besonderen Gegner — Gegner und Meteoriten aus allen Zonen erscheinen zufällig.","В этой зоне нет особого врага — случайным образом появляются враги и метеориты из всех зон.","لا يوجد عدو مميز في هذه المنطقة — تظهر أعداء ونيازك عشوائيًا من جميع المناطق."],
"בוס מיוחד ובכיר שלוקח חלקים מהסגנונות של האזורים האחרים.":["A powerful special boss that borrows elements from the styles of the other zones.","Un jefe especial y poderoso que incorpora elementos de los estilos de las otras zonas.","Un boss spécial et puissant qui reprend des éléments des styles des autres zones.","Ein mächtiger Spezialboss, der Elemente aus den Stilen der anderen Zonen übernimmt.","Могущественный особый босс, использующий элементы стилей других зон.","زعيم خاص وقوي يستعير عناصر من أساليب المناطق الأخرى."],
"אויב מיוחד שהופך למסוכן ומהיר יותר ככל שהוא מאבד חיים.":["A special enemy that becomes more dangerous and faster as it loses health.","Un enemigo especial que se vuelve más peligroso y rápido a medida que pierde vida.","Un ennemi spécial qui devient plus dangereux et plus rapide à mesure qu’il perd des points de vie.","Ein Spezialgegner, der mit sinkender Lebensenergie gefährlicher und schneller wird.","Особый враг, который становится опаснее и быстрее по мере потери здоровья.","عدو خاص يصبح أكثر خطورة وسرعة كلما فقد صحته."],
"בוס מיוחד שנכנס למצבי זעם בשלבי החיים הנמוכים.":["A special boss that enters rage phases at low health.","Un jefe especial que entra en fases de furia cuando tiene poca vida.","Un boss spécial qui entre en phase de rage lorsque sa santé est faible.","Ein Spezialboss, der bei wenig Lebensenergie in Wutphasen eintritt.","Особый босс, который впадает в ярость при низком уровне здоровья.","زعيم خاص يدخل في حالات غضب عندما تنخفض صحته."]
};


function translateRemainingAchievementText(source,lang){
 const i=supported.indexOf(lang)-1;if(i<0)return source;
 let title=source.match(/^שרוד ([\\d,]+) מטר בבלתי אפשרי$/);
 if(title)return ["Survive "+title[1]+" meters in Impossible mode","Sobrevive "+title[1]+" metros en modo Imposible","Survis "+title[1]+" mètres en mode Impossible","Überlebe "+title[1]+" Meter im Unmöglich-Modus","Выживи на дистанции "+title[1]+" метров в режиме «Невозможно»","ابقَ على قيد الحياة لمسافة "+title[1]+" مترًا في وضع المستحيل"][i];
 if(source==="נשא את כל רמות הקושי")return ["Try Every Difficulty","Prueba todas las dificultades","Essaie toutes les difficultés","Spiele auf allen Schwierigkeitsgraden","Попробуй все уровни сложности","جرّب جميع مستويات الصعوبة"][i];
 if(source==="הרוס בוס מתפצל")return ["Defeat a Splitting Boss","Derrota a un jefe que se divide","Bats un boss qui se divise","Besiege einen sich teilenden Boss","Победи разделяющегося босса","اهزم زعيمًا منقسمًا"][i];
 if(source==="הרוס בוס בבלתי אפשרי")return ["Defeat a Boss in Impossible Mode","Derrota a un jefe en modo Imposible","Bats un boss en mode Impossible","Besiege einen Boss im Unmöglich-Modus","Победи босса в режиме «Невозможно»","اهزم زعيمًا في وضع المستحيل"][i];
 title=source.match(/^הרוס (\\d+) בוסים מתפצלים$/);
 if(title)return ["Defeat "+title[1]+" Splitting Bosses","Derrota a "+title[1]+" jefes que se dividen","Bats "+title[1]+" boss qui se divisent","Besiege "+title[1]+" sich teilende Bosse","Победи "+title[1]+" разделяющихся боссов","اهزم "+title[1]+" زعماء منقسمين"][i];
 title=source.match(/^הרוס (\\d+) בוסים מיוחדים$/);
 if(title)return ["Defeat "+title[1]+" Special Bosses","Derrota a "+title[1]+" jefes especiales","Bats "+title[1]+" boss spéciaux","Besiege "+title[1]+" Spezialbosse","Победи "+title[1]+" особых боссов","اهزم "+title[1]+" زعماء خاصين"][i];
 const m=source.match(/^הגע ל־?([\d,]+) מטר בבלתי אפשרי\.?$/);
 if(m)return ["Reach "+m[1]+" meters in Impossible mode.","Alcanza "+m[1]+" metros en modo Imposible.","Atteins "+m[1]+" mètres en mode Impossible.","Erreiche "+m[1]+" Meter im Unmöglich-Modus.","Достигни "+m[1]+" метров в режиме «Невозможно».","صل إلى "+m[1]+" مترًا في وضع المستحيل."][i];
 let x=source.match(/^הרוס בוס אחד במהלך משחק בבלתי אפשרי\.?$/);
 if(x)return ["Defeat one boss in an Impossible game.","Derrota a un jefe en una partida Imposible.","Bats un boss dans une partie en mode Impossible.","Besiege einen Boss in einem Unmöglich-Spiel.","Победи босса в режиме «Невозможно».","اهزم زعيمًا واحدًا في مباراة بوضع المستحيل."][i];
 x=source.match(/^הבס (\d+) אויבים בעזרת האולטרה לייזר\.?$/);
 if(x)return ["Defeat "+x[1]+" enemies with the Ultra Laser.","Derrota a "+x[1]+" enemigos con el láser Ultra.","Bats "+x[1]+" ennemis avec l’Ultra-Laser.","Besiege "+x[1]+" Gegner mit dem Ultra-Laser.","Победи "+x[1]+" врагов с помощью Ультра-лазера.","اهزم "+x[1]+" أعداء باستخدام ليزر ألترا."][i];
 x=source.match(/^השמד (\d+) אויבים בלי לאבד חיים\.?$/);
 if(x)return ["Destroy "+x[1]+" enemies without losing a life.","Destruye "+x[1]+" enemigos sin perder vidas.","Détruis "+x[1]+" ennemis sans perdre de vie.","Zerstöre "+x[1]+" Gegner, ohne Leben zu verlieren.","Уничтожь "+x[1]+" врагов, не потеряв ни одной жизни.","دمر "+x[1]+" أعداء دون فقدان أي حياة."][i];
 x=source.match(/^שרוד (\d+) מטר(?: במצב בלתי אפשרי| בבלתי אפשרי)\.?$/);
 if(x)return ["Survive "+x[1]+" meters in Impossible mode.","Sobrevive "+x[1]+" metros en modo Imposible.","Survis "+x[1]+" mètres en mode Impossible.","Überlebe "+x[1]+" Meter im Unmöglich-Modus.","Выживи на дистанции "+x[1]+" метров в режиме «Невозможно».","ابقَ على قيد الحياة لمسافة "+x[1]+" مترًا في وضع المستحيل."][i];
 x=source.match(/^צבור (\d+) XP לשחקן\.?$/);
 if(x)return ["Earn "+x[1]+" Player XP.","Consigue "+x[1]+" XP de jugador.","Gagne "+x[1]+" XP de joueur.","Sammle "+x[1]+" Spieler-EP.","Получи "+x[1]+" XP игрока.","اجمع "+x[1]+" من نقاط خبرة اللاعب."][i];
 x=source.match(/^שרוד (\d+) מטר\.?$/);
 if(x)return ["Survive "+x[1]+" meters.","Sobrevive "+x[1]+" metros.","Survis "+x[1]+" mètres.","Überlebe "+x[1]+" Meter.","Выживи на дистанции "+x[1]+" метров.","ابقَ على قيد الحياة لمسافة "+x[1]+" مترًا."][i];
 x=source.match(/^צבור (\d+) נקודות אולטרה במהלך משחק אחד\.?$/);
 if(x)return ["Earn "+x[1]+" Ultra points in one game.","Consigue "+x[1]+" puntos Ultra en una partida.","Gagne "+x[1]+" points Ultra en une partie.","Sammle "+x[1]+" Ultra-Punkte in einem Spiel.","Набери "+x[1]+" очков Ультра за одну игру.","اجمع "+x[1]+" نقطة ألترا في مباراة واحدة."][i];
 return source;
}

function translate(value){
 const s=value.trim(); if(current==="he"||!s)return value;
 const collectionDescription=collectionDescriptionTranslations[s];if(collectionDescription)return value.replace(s,collectionDescription[supported.indexOf(current)-1]||s);
 const row=translations[s]; if(row)return value.replace(s,row[supported.indexOf(current)-1]||s);
 const remainingAchievementTranslation=translateRemainingAchievementText(s,current);if(remainingAchievementTranslation!==s)return value.replace(s,remainingAchievementTranslation);
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