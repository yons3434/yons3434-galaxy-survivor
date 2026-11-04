/* Galaxy Defender central translation catalog.
 * Keep every user-facing translation in this file. Locale order:
 * en, es, fr, de, ru, ar.
 * Hebrew is the source language and remains the fallback.
 */
(() => {
"use strict";
const ui={
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
,
"רגיל":["Common","Común","Commun","Gewöhnlich","Обычный","عادي"],
"נדיר":["Rare","Raro","Rare","Selten","Редкий","نادر"],
"אדיר":["Epic","Épico","Épique","Episch","Эпический","ملحمي"],
"אגדי":["Legendary","Legendario","Légendaire","Legendär","Легендарный","أسطوري"],
"מדהים":["Amazing","Asombroso","Incroyable","Fantastisch","Удивительный","مذهل"],
"אולטרה":["Ultra","Ultra","Ultra","Ultra","Ультра","ألترا"],
"🌀 הישגי אולטרה":["🌀 Ultra Achievements","🌀 Logros Ultra","🌀 Succès Ultra","🌀 Ultra-Erfolge","🌀 Ультра-достижения","🌀 إنجازات ألترا"],
"הישג חדש!":["New achievement!","¡Nuevo logro!","Nouveau succès !","Neuer Erfolg!","Новое достижение!","إنجاز جديد!"],
"✅ הושג":["✅ Unlocked","✅ Desbloqueado","✅ Débloqué","✅ Freigeschaltet","✅ Получено","✅ تم فتحه"],
"🔒 נעול":["🔒 Locked","🔒 Bloqueado","🔒 Verrouillé","🔒 Gesperrt","🔒 Заблокировано","🔒 مقفل"],
"🔥 רצף:":["🔥 Streak:","🔥 Racha:","🔥 Série :","🔥 Serie:","🔥 Серия:","🔥 سلسلة:"],
" ימים":[" days"," días"," jours"," Tage"," дней"," أيام"],
"משימות הושלמו היום":["missions completed today","misiones completadas hoy","missions terminées aujourd’hui","Missionen heute abgeschlossen","заданий выполнено сегодня","مهمة مكتملة اليوم"],
"🎁 כל 5 המשימות הושלמו! +100 XP":["🎁 All 5 missions completed! +100 XP","🎁 ¡Las 5 misiones completadas! +100 XP","🎁 Les 5 missions sont terminées ! +100 XP","🎁 Alle 5 Missionen abgeschlossen! +100 XP","🎁 Все 5 заданий выполнены! +100 XP","🎁 اكتملت المهام الخمس! +100 XP"],
"🎁 השלמת כל 5 המשימות: +100 XP":["🎁 Complete all 5 missions: +100 XP","🎁 Completa las 5 misiones: +100 XP","🎁 Termine les 5 missions : +100 XP","🎁 Schließe alle 5 Missionen ab: +100 XP","🎁 Выполни все 5 заданий: +100 XP","🎁 أكمل جميع المهام الخمس: +100 XP"],
"כדי לפתוח צריך להרוס את האויב/המטאוריט/הבוס הזה במשחק.":["Destroy this enemy, meteorite, or boss in a game to unlock it.","Destruye a este enemigo, meteorito o jefe en una partida para desbloquearlo.","Détruis cet ennemi, météorite ou boss pendant une partie pour le débloquer.","Zerstöre diesen Gegner, Meteoriten oder Boss in einem Spiel, um ihn freizuschalten.","Уничтожь этого врага, метеорит или босса в игре, чтобы открыть запись.","دمر هذا العدو أو النيزك أو الزعيم في إحدى المباريات لفتحه."],
"🎮 איך משחקים":["🎮 How to Play","🎮 Cómo jugar","🎮 Comment jouer","🎮 Spielanleitung","🎮 Как играть","🎮 كيفية اللعب"],
"🌌 האזור הרגיל":["🌌 Normal Zone","🌌 Zona normal","🌌 Zone normale","🌌 Normaler Bereich","🌌 Обычная зона","🌌 المنطقة العادية"],
"🪞 אזור בוס המראה":["🪞 Mirror Boss Zone","🪞 Zona del jefe espejo","🪞 Zone du boss miroir","🪞 Spiegelboss-Zone","🪞 Зона босса-зеркала","🪞 منطقة زعيم المرآة"],
"🧊 אזור בוס הקרח":["🧊 Ice Boss Zone","🧊 Zona del jefe de hielo","🧊 Zone du boss de glace","🧊 Eis-Boss-Zone","🧊 Зона ледяного босса","🧊 منطقة زعيم الجليد"],
"🕳️ אזור בוס השערים":["🕳️ Gate Boss Zone","🕳️ Zona del jefe de portales","🕳️ Zone du boss des portails","🕳️ Portal-Boss-Zone","🕳️ Зона босса порталов","🕳️ منطقة زعيم البوابات"],
"🚀 אזור בוס הרודף":["🚀 Chaser Boss Zone","🚀 Zona del jefe perseguidor","🚀 Zone du boss poursuivant","🚀 Verfolger-Boss-Zone","🚀 Зона босса-преследователя","🚀 منطقة زعيم المطارد"],
"🌀 אזור בוס הטלפורט":["🌀 Teleport Boss Zone","🌀 Zona del jefe teletransportador","🌀 Zone du boss téléporteur","🌀 Teleport-Boss-Zone","🌀 Зона босса-телепорта","🌀 منطقة زعيم الانتقال"],
"🔄 אזור בוס ההיפוך":["🔄 Reversal Boss Zone","🔄 Zona del jefe inversor","🔄 Zone du boss inverseur","🔄 Umkehr-Boss-Zone","🔄 Зона босса-перевёртыша","🔄 منطقة زعيم العكس"],
"🟢 אזור הבוס המתפצל":["🟢 Splitting Boss Zone","🟢 Zona del jefe divisor","🟢 Zone du boss diviseur","🟢 Spaltboss-Zone","🟢 Зона разделяющегося босса","🟢 منطقة الزعيم المنقسم"],
"👑 אזור מלך החלל":["👑 Space King Zone","👑 Zona del rey espacial","👑 Zone du roi de l’espace","👑 Weltraumkönig-Zone","👑 Зона космического короля","👑 منطقة ملك الفضاء"],
"☠️ אזור בוס האבדון":["☠️ Doom Boss Zone","☠️ Zona del jefe de la perdición","☠️ Zone du boss funeste","☠️ Untergangs-Boss-Zone","☠️ Зона босса погибели","☠️ منطقة زعيم الهلاك"]
,
"מטאוריט":["Meteorite","Meteorito","Météorite","Meteorit","Метеорит","نيزك"],
"חללית אויב":["Enemy Spaceship","Nave enemiga","Vaisseau ennemi","Feindliches Raumschiff","Корабль врага","سفينة عدو"],
"בוס רגיל":["Regular Boss","Jefe normal","Boss standard","Normaler Boss","Обычный босс","زعيم عادي"],
"חללית שיבוט":["Clone Spaceship","Nave clonada","Vaisseau cloné","Klon-Raumschiff","Корабль-клон","سفينة مستنسخة"],
"מטאוריט שיבוט":["Clone Meteorite","Meteorito clonado","Météorite clonée","Klon-Meteorit","Метеорит-клон","نيزك مستنسخ"],
"בוס המראה":["Mirror Boss","Jefe espejo","Boss miroir","Spiegelboss","Босс-зеркало","زعيم المرآة"],
"אויב קפוא":["Frozen Enemy","Enemigo congelado","Ennemi gelé","Eingefrorener Gegner","Замороженный враг","عدو متجمد"],
"מטאוריט קפוא":["Frozen Meteorite","Meteorito congelado","Météorite gelée","Eingefrorener Meteorit","Замороженный метеорит","نيزك متجمد"],
"בוס הקרח":["Ice Boss","Jefe de hielo","Boss de glace","Eis-Boss","Ледяной босс","زعيم الجليد"],
"שומר שער":["Gatekeeper","Guardián del portal","Gardien du portail","Torwächter","Страж портала","حارس البوابة"],
"מטאוריט שער":["Gate Meteorite","Meteorito del portal","Météorite du portail","Portal-Meteorit","Портальный метеорит","نيزك البوابة"],
"בוס השערים":["Gate Boss","Jefe de los portales","Boss des portails","Portal-Boss","Босс порталов","زعيم البوابات"],
"רודף קטן":["Small Chaser","Perseguidor pequeño","Petit poursuivant","Kleiner Verfolger","Маленький преследователь","مطارد صغير"],
"מטאוריט רודף":["Chaser Meteorite","Meteorito perseguidor","Météorite poursuivante","Verfolger-Meteorit","Метеорит-преследователь","نيزك مطارد"],
"בוס הרודף":["Chaser Boss","Jefe perseguidor","Boss poursuivant","Verfolger-Boss","Босс-преследователь","زعيم المطارد"],
"טלפורטר":["Teleporter","Teletransportador","Téléporteur","Teleporter","Телепортёр","ناقل آني"],
"מטאוריט טלפורט":["Teleport Meteorite","Meteorito teletransportador","Météorite téléporteuse","Teleport-Meteorit","Телепортирующийся метеорит","نيزك الانتقال"],
"בוס הטלפורט":["Teleport Boss","Jefe teletransportador","Boss téléporteur","Teleport-Boss","Босс-телепорт","زعيم الانتقال"],
"חללית הפוכה":["Reversed Spaceship","Nave invertida","Vaisseau inversé","Umgekehrtes Raumschiff","Перевёрнутый корабль","سفينة معكوسة"],
"מטאוריט הפוך":["Reversed Meteorite","Meteorito invertido","Météorite inversée","Umgekehrter Meteorit","Перевёрнутый метеорит","نيزك معكوس"],
"בוס ההיפוך":["Reversal Boss","Jefe de inversión","Boss de l’inversion","Umkehr-Boss","Босс инверсии","زعيم الانعكاس"],
"אויב מתפצל":["Splitting Enemy","Enemigo que se divide","Ennemi qui se divise","Sich teilender Gegner","Разделяющийся враг","عدو منقسم"],
"מטאוריט מתפצל":["Splitting Meteorite","Meteorito que se divide","Météorite qui se divise","Sich teilender Meteorit","Разделяющийся метеорит","نيزك منقسم"],
"בוס מתפצל":["Splitting Boss","Jefe que se divide","Boss qui se divise","Sich teilender Boss","Разделяющийся босс","زعيم منقسم"],
"מלך החלל":["Space King","Rey espacial","Roi de l’espace","Weltraumkönig","Космический король","ملك الفضاء"],
"שליח האבדון":["Doom Herald","Heraldo de la perdición","Héraut du destin funeste","Bote des Untergangs","Вестник погибели","رسول الهلاك"],
"בוס האבדון":["Doom Boss","Jefe de la perdición","Boss funeste","Untergangs-Boss","Босс погибели","زعيم الهلاك"]
};
window.GAME_TRANSLATIONS=Object.freeze({
  supported:Object.freeze(["he","en","es","fr","de","ru","ar"]),
  ui:Object.freeze(ui),
  cards:Object.freeze({
  "ultraMode": {
    "title": [
      "Ultra Mode",
      "Modo Ultra",
      "Mode Ultra",
      "Ultra-Modus",
      "Режим Ультра",
      "وضع ألترا"
    ]
  },
  "ultraLaser": {
    "title": [
      "Ultra Laser",
      "Láser Ultra",
      "Laser Ultra",
      "Ultra-Laser",
      "Ультра-лазер",
      "ليزر ألترا"
    ]
  },
  "chainExplosion": {
    "title": [
      "Chain Explosion",
      "Explosión en cadena",
      "Explosion en chaîne",
      "Kettenexplosion",
      "Цепной взрыв",
      "انفجار متسلسل"
    ]
  },
  "damage": {
    "title": [
      "More Damage",
      "Más daño",
      "Plus de dégâts",
      "Mehr Schaden",
      "Больше урона",
      "ضرر إضافي"
    ],
    "description": [
      "Increases bullet damage and also strengthens the swords.",
      "Aumenta el daño de los disparos y también fortalece las espadas.",
      "Augmente les dégâts des tirs et renforce aussi les épées.",
      "Erhöht den Schussschaden und verstärkt auch die Schwerter.",
      "Увеличивает урон выстрелов и усиливает мечи.",
      "يزيد ضرر الطلقات ويعزز السيوف أيضًا."
    ]
  },
  "fireRate": {
    "title": [
      "Fire Rate",
      "Cadencia de disparo",
      "Cadence de tir",
      "Feuerrate",
      "Скорострельность",
      "معدل إطلاق النار"
    ],
    "description": [
      "Increases firing speed and the rotation speed of the swords.",
      "Aumenta la velocidad de disparo y la velocidad de giro de las espadas.",
      "Augmente la cadence de tir et la vitesse de rotation des épées.",
      "Erhöht die Schussgeschwindigkeit und die Drehgeschwindigkeit der Schwerter.",
      "Увеличивает скорострельность и скорость вращения мечей.",
      "يزيد سرعة إطلاق النار وسرعة دوران السيوف."
    ]
  },
  "maxLives": {
    "title": [
      "Maximum Lives",
      "Vida máxima",
      "Vies maximales",
      "Maximale Leben",
      "Максимум жизней",
      "الحد الأقصى للحياة"
    ],
    "description": [
      "Adds one heart to maximum health.",
      "Añade un corazón a la salud máxima.",
      "Ajoute un cœur à la santé maximale.",
      "Fügt der maximalen Lebensanzahl ein Herz hinzu.",
      "Добавляет одно сердце к максимальному здоровью.",
      "يضيف قلبًا واحدًا إلى الحد الأقصى للصحة."
    ]
  },
  "healOne": {
    "title": [
      "Heal One Heart",
      "Curar un corazón",
      "Soigner un cœur",
      "Ein Herz heilen",
      "Восстановить одно сердце",
      "علاج قلب واحد"
    ],
    "description": [
      "Restores one heart. One-time use.",
      "Restaura un corazón. Uso único.",
      "Restaure un cœur. À usage unique.",
      "Stellt ein Herz wieder her. Einmalig.",
      "Восстанавливает одно сердце. Одноразовое.",
      "يعيد قلبًا واحدًا. يستخدم مرة واحدة."
    ]
  },
  "speed": {
    "title": [
      "Movement Speed",
      "Velocidad de movimiento",
      "Vitesse de déplacement",
      "Bewegungsgeschwindigkeit",
      "Скорость движения",
      "سرعة الحركة"
    ],
    "description": [
      "Increases the spaceship's movement speed.",
      "Aumenta la velocidad de movimiento de la nave.",
      "Augmente la vitesse de déplacement du vaisseau.",
      "Erhöht die Bewegungsgeschwindigkeit des Raumschiffs.",
      "Увеличивает скорость движения корабля.",
      "يزيد سرعة حركة المركبة الفضائية."
    ]
  },
  "extraFire": {
    "title": [
      "Extra Shots",
      "Disparos adicionales",
      "Tirs supplémentaires",
      "Zusätzliche Schüsse",
      "Дополнительные выстрелы",
      "طلقات إضافية"
    ],
    "description": [
      "Adds extra bullets to every shot.",
      "Añade disparos adicionales a cada tiro.",
      "Ajoute des projectiles supplémentaires à chaque tir.",
      "Fügt jedem Schuss zusätzliche Projektile hinzu.",
      "Добавляет дополнительные пули к каждому выстрелу.",
      "يضيف طلقات إضافية إلى كل طلقة."
    ]
  },
  "xpBoost": {
    "title": [
      "More XP",
      "Más XP",
      "Plus d’XP",
      "Mehr XP",
      "Больше XP",
      "XP إضافية"
    ],
    "description": [
      "Increases the amount of XP you earn.",
      "Aumenta la cantidad de XP que recibes.",
      "Augmente la quantité d’XP gagnée.",
      "Erhöht die Menge an verdienter XP.",
      "Увеличивает количество получаемого XP.",
      "يزيد مقدار XP الذي تحصل عليه."
    ]
  },
  "luck": {
    "title": [
      "More Luck",
      "Más suerte",
      "Plus de chance",
      "Mehr Glück",
      "Больше удачи",
      "حظ إضافي"
    ],
    "description": [
      "Increases the chance of receiving rarer upgrades.",
      "Aumenta la probabilidad de obtener mejoras más raras.",
      "Augmente les chances d’obtenir des améliorations plus rares.",
      "Erhöht die Chance auf seltenere Verbesserungen.",
      "Увеличивает шанс получить более редкие улучшения.",
      "يزيد فرصة الحصول على ترقيات أكثر ندرة."
    ]
  },
  "dodge": {
    "title": [
      "Dodge",
      "Esquivar",
      "Esquive",
      "Ausweichen",
      "Уклонение",
      "تفادي"
    ],
    "description": [
      "Gives you a chance not to lose a heart when hit.",
      "Te da la posibilidad de no perder un corazón al recibir un golpe.",
      "Donne une chance de ne pas perdre de cœur lorsque tu es touché.",
      "Gibt dir eine Chance, bei einem Treffer kein Herz zu verlieren.",
      "Даёт шанс не потерять сердце при попадании.",
      "يمنحك فرصة لعدم فقدان قلب عند التعرض لضربة."
    ]
  },
  "fullHeal": {
    "title": [
      "Full Heal",
      "Curación completa",
      "Soin complet",
      "Vollheilung",
      "Полное лечение",
      "شفاء كامل"
    ],
    "description": [
      "Restores all health. One-time use.",
      "Restaura toda la salud. Uso único.",
      "Restaure toute la santé. À usage unique.",
      "Stellt alle Lebenspunkte wieder her. Einmalig.",
      "Восстанавливает всё здоровье. Одноразовое.",
      "يعيد الصحة بالكامل. يستخدم مرة واحدة."
    ]
  },
  "drone": {
    "title": [
      "Mini Spaceship",
      "Mini nave",
      "Mini-vaisseau",
      "Mini-Raumschiff",
      "Мини-корабль",
      "مركبة صغيرة"
    ],
    "description": [
      "Adds a regular mini spaceship that fires automatically.",
      "Añade una mini nave normal que dispara automáticamente.",
      "Ajoute un mini-vaisseau standard qui tire automatiquement.",
      "Fügt ein normales Mini-Raumschiff hinzu, das automatisch schießt.",
      "Добавляет обычный мини-корабль, который стреляет автоматически.",
      "يضيف مركبة صغيرة عادية تطلق النار تلقائيًا."
    ]
  },
  "extraDrone": {
    "title": [
      "Extra Mini Spaceship",
      "Mini nave adicional",
      "Mini-vaisseau supplémentaire",
      "Zusätzliches Mini-Raumschiff",
      "Дополнительный мини-корабль",
      "مركبة صغيرة إضافية"
    ]
  },
  "rpg": {
    "title": [
      "RPG Shots",
      "Disparos de RPG",
      "Tirs de RPG",
      "RPG-Schüsse",
      "Выстрелы из РПГ",
      "طلقات RPG"
    ],
    "description": [
      "Unlocks the RPG weapon and adds 10 ammo.",
      "Desbloquea el arma RPG y añade 10 municiones.",
      "Débloque l’arme RPG et ajoute 10 munitions.",
      "Schaltet die RPG-Waffe frei und fügt 10 Munition hinzu.",
      "Открывает оружие РПГ и добавляет 10 боеприпасов.",
      "يفتح سلاح RPG ويضيف 10 ذخائر."
    ]
  },
  "piercing": {
    "title": [
      "Piercing Shots",
      "Disparos perforantes",
      "Tirs perforants",
      "Durchschlagende Schüsse",
      "Пробивающие выстрелы",
      "طلقات خارقة"
    ]
  },
  "sword": {
    "title": [
      "Extra Sword",
      "Espada adicional",
      "Épée supplémentaire",
      "Zusätzliches Schwert",
      "Дополнительный меч",
      "سيف إضافي"
    ],
    "description": [
      "Adds a rotating energy sword around the spaceship.",
      "Añade una espada de energía que gira alrededor de la nave.",
      "Ajoute une épée énergétique qui tourne autour du vaisseau.",
      "Fügt ein rotierendes Energieschwert um das Raumschiff hinzu.",
      "Добавляет энергетический меч, вращающийся вокруг корабля.",
      "يضيف سيف طاقة يدور حول المركبة الفضائية."
    ]
  },
  "revive": {
    "title": [
      "Revive",
      "Revivir",
      "Résurrection",
      "Wiederbelebung",
      "Возрождение",
      "إحياء"
    ],
    "description": [
      "When health reaches zero, you return with full health.",
      "Cuando la salud llega a cero, vuelves con toda la salud.",
      "Lorsque la santé atteint zéro, tu reviens avec toute ta santé.",
      "Wenn die Lebenspunkte null erreichen, kehrst du mit voller Gesundheit zurück.",
      "Когда здоровье достигает нуля, ты возрождаешься с полным здоровьем.",
      "عندما تصل الصحة إلى الصفر، تعود بكامل صحتك."
    ]
  },
  "fillShields": {
    "title": [
      "Refill Shields",
      "Rellenar escudos",
      "Recharger les boucliers",
      "Schilde auffüllen",
      "Пополнить щиты",
      "إعادة ملء الدروع"
    ]
  },
  "levelHeal": {
    "title": [
      "Heal on Level Up",
      "Curación al subir de nivel",
      "Soin à chaque niveau",
      "Heilung beim Levelaufstieg",
      "Лечение при повышении уровня",
      "الشفاء عند رفع المستوى"
    ]
  },
  "shotgun": {
    "title": [
      "Shotgun",
      "Escopeta",
      "Fusil à pompe",
      "Schrotflinte",
      "Дробовик",
      "بندقية خرطوش"
    ],
    "description": [
      "Unlocks the shotgun.",
      "Desbloquea la escopeta.",
      "Débloque le fusil à pompe.",
      "Schaltet die Schrotflinte frei.",
      "Открывает дробовик.",
      "يفتح بندقية الخرطوش."
    ]
  },
  "droneUpgrade": {
    "title": [
      "Upgraded Mini Spaceship",
      "Mini nave mejorada",
      "Mini-vaisseau amélioré",
      "Verbessertes Mini-Raumschiff",
      "Улучшенный мини-корабль",
      "مركبة صغيرة مطورة"
    ]
  },
  "chainLightning": {
    "title": [
      "Chain Lightning",
      "Relámpago en cadena",
      "Éclair en chaîne",
      "Kettenblitz",
      "Цепная молния",
      "برق متسلسل"
    ]
  },
  "rpgMiniShip": {
    "title": [
      "RPG Mini Spaceship",
      "Mini nave RPG",
      "Mini-vaisseau RPG",
      "RPG-Mini-Raumschiff",
      "Мини-корабль с РПГ",
      "مركبة RPG صغيرة"
    ]
  },
  "blackHole": {
    "title": [
      "Black Hole Gun",
      "Arma de agujero negro",
      "Arme à trou noir",
      "Schwarzes-Loch-Gewehr",
      "Пушка чёрной дыры",
      "بندقية الثقب الأسود"
    ]
  },
  "laser": {
    "title": [
      "Laser Mode",
      "Modo láser",
      "Mode laser",
      "Lasermodus",
      "Режим лазера",
      "وضع الليزر"
    ],
    "description": [
      "Unlocks a powerful laser that follows the mouse and deals damage.",
      "Desbloquea un potente láser que sigue al ratón e inflige daño.",
      "Débloque un puissant laser qui suit la souris et inflige des dégâts.",
      "Schaltet einen starken Laser frei, der der Maus folgt und Schaden verursacht.",
      "Открывает мощный лазер, который следует за мышью и наносит урон.",
      "يفتح ليزرًا قويًا يتبع مؤشر الفأرة ويسبب الضرر."
    ]
  },
  "laserHeat": {
    "title": [
      "Overheating Laser",
      "Láser sobrecalentado",
      "Laser surchauffant",
      "Überhitzender Laser",
      "Перегревающийся лазер",
      "ليزر مرتفع الحرارة"
    ]
  },
  "flamethrower": {
    "title": [
      "Flamethrower",
      "Lanzallamas",
      "Lance-flammes",
      "Flammenwerfer",
      "Огнемёт",
      "قاذف اللهب"
    ],
    "description": [
      "Unlocks a flamethrower that follows the mouse.",
      "Desbloquea un lanzallamas que sigue al ratón.",
      "Débloque un lance-flammes qui suit la souris.",
      "Schaltet einen Flammenwerfer frei, der der Maus folgt.",
      "Открывает огнемёт, который следует за мышью.",
      "يفتح قاذف لهب يتبع مؤشر الفأرة."
    ]
  },
  "splitBullet": {
    "title": [
      "Split Bullet",
      "Bala dividida",
      "Balle divisée",
      "Geteiltes Projektil",
      "Разделяющаяся пуля",
      "طلقة منقسمة"
    ]
  },
  "droneMega": {
    "title": [
      "Large Mini Spaceship",
      "Mini nave grande",
      "Grand mini-vaisseau",
      "Großes Mini-Raumschiff",
      "Большой мини-корабль",
      "مركبة صغيرة كبيرة"
    ]
  },
  "lowHealthRage": {
    "title": [
      "Last Stand",
      "Último recurso",
      "Dernier recours",
      "Letztes Gefecht",
      "Последний рывок",
      "الغضب الأخير"
    ]
  },
  "poison": {
    "title": [
      "Poison",
      "Veneno",
      "Poison",
      "Gift",
      "Яд",
      "سم"
    ]
  },
  "burn": {
    "title": [
      "Burn",
      "Quemadura",
      "Brûlure",
      "Verbrennung",
      "Ожог",
      "حرق"
    ]
  },
  "freeze": {
    "title": [
      "Freeze",
      "Congelación",
      "Gel",
      "Einfrieren",
      "Заморозка",
      "تجميد"
    ]
  },
  "stun": {
    "title": [
      "Stun",
      "Aturdimiento",
      "Étourdissement",
      "Betäubung",
      "Оглушение",
      "شلل"
    ]
  },
  "continuousFire": {
    "title": [
      "Sustained Fire",
      "Fuego continuo",
      "Tir continu",
      "Dauerfeuer",
      "Непрерывный огонь",
      "إطلاق نار مستمر"
    ]
  },
  "expandedChoice": {
    "title": [
      "Expanded Choice",
      "Elección ampliada",
      "Choix élargi",
      "Erweiterte Auswahl",
      "Расширенный выбор",
      "اختيار موسع"
    ]
  }
}),
  achievements:Object.freeze({}),
  dailyMissions:Object.freeze({}),
  collection:Object.freeze({})
});
})();
