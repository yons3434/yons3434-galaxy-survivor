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
"בוס האבדון":["Doom Boss","Jefe de la perdición","Boss funeste","Untergangs-Boss","Босс погибели","زعيم الهلاك"],
"⏱️ זמן משחק":["⏱️ Play Time","⏱️ Tiempo de juego","⏱️ Temps de jeu","⏱️ Spielzeit","⏱️ Время игры","⏱️ وقت اللعب"],
"🎮 משחקים":["🎮 Games","🎮 Partidas","🎮 Parties","🎮 Spiele","🎮 Игры","🎮 المباريات"],
"⚪ הישגים רגילים:":["⚪ Common Achievements:","⚪ Logros comunes:","⚪ Succès courants :","⚪ Gewöhnliche Erfolge:","⚪ Обычные достижения:","⚪ الإنجازات العادية:"],
"🟢 הישגים נדירים:":["🟢 Rare Achievements:","🟢 Logros raros:","🟢 Succès rares :","🟢 Seltene Erfolge:","🟢 Редкие достижения:","🟢 الإنجازات النادرة:"],
"🟣 הישגים אדירים:":["🟣 Epic Achievements:","🟣 Logros épicos:","🟣 Succès épiques :","🟣 Epische Erfolge:","🟣 Эпические достижения:","🟣 الإنجازات الملحمية:"],
"🟡 הישגים אגדיים:":["🟡 Legendary Achievements:","🟡 Logros legendarios:","🟡 Succès légendaires :","🟡 Legendäre Erfolge:","🟡 Легендарные достижения:","🟡 الإنجازات الأسطورية:"],
"🔴 הישגים מדהימים:":["🔴 Amazing Achievements:","🔴 Logros asombrosos:","🔴 Succès incroyables :","🔴 Fantastische Erfolge:","🔴 Удивительные достижения:","🔴 الإنجازات المذهلة:"],
"🌀 הישגי אולטרה:":["🌀 Ultra Achievements:","🌀 Logros Ultra:","🌀 Succès Ultra :","🌀 Ultra-Erfolge:","🌀 Ультра-достижения:","🌀 إنجازات ألترا:"],
"🏅 סך הכול הישגים:":["🏅 Total Achievements:","🏅 Total de logros:","🏅 Total des succès :","🏅 Erfolge insgesamt:","🏅 Всего достижений:","🏅 إجمالي الإنجازات:"],
"סך הכול:":["Total:","Total:","Total :","Insgesamt:","Всего:","الإجمالي:"],
"% הושלמו":["% completed","% completado","% terminés","% abgeschlossen","% выполнено","% مكتمل"],
"אין עדיין תוצאות. היה הראשון!":["No scores yet. Be the first!","Aún no hay resultados. ¡Sé el primero!","Aucun résultat pour l’instant. Sois le premier !","Noch keine Ergebnisse. Sei der Erste!","Пока нет результатов. Стань первым!","لا توجد نتائج بعد. كن الأول!"],
"100 התוצאות הטובות ביותר בכל דרגת קושי":["The top 100 scores in each difficulty","Los 100 mejores resultados de cada dificultad","Les 100 meilleurs scores de chaque difficulté","Die 100 besten Ergebnisse je Schwierigkeitsgrad","100 лучших результатов на каждом уровне сложности","أفضل 100 نتيجة في كل مستوى صعوبة"],
"WASD / חצים — תנועה":["WASD / Arrows — Move","WASD / Flechas — Moverse","WASD / Flèches — Déplacement","WASD / Pfeile — Bewegen","WASD / Стрелки — Движение","WASD / الأسهم — الحركة"],
"SPACE — ירי":["SPACE — Shoot","ESPACIO — Disparar","ESPACE — Tirer","LEERTASTE — Schießen","ПРОБЕЛ — Стрелять","مسافة — إطلاق النار"],
"הלייזר והלהביור מכוונים לעכבר.":["The laser and flamethrower aim at the mouse.","El láser y el lanzallamas apuntan al ratón.","Le laser et le lance-flammes visent la souris.","Laser und Flammenwerfer zielen auf die Maus.","Лазер и огнемёт наводятся мышью.","يوجه الليزر وقاذف اللهب نحو مؤشر الفأرة."],
"בכל עליית רמה בוחרים קלף שדרוג אחד.":["Choose one upgrade card each time you level up.","Elige una carta de mejora cada vez que subas de nivel.","Choisis une carte d’amélioration à chaque niveau gagné.","Wähle bei jedem Levelaufstieg eine Verbesserungskarte.","При каждом повышении уровня выбирай одну карту улучшения.","اختر بطاقة ترقية واحدة عند كل ارتفاع للمستوى."],
"השמד אויבים ומטאוריטים כדי לקבל XP ולהתחזק.":["Destroy enemies and meteorites to earn XP and grow stronger.","Destruye enemigos y meteoritos para conseguir XP y hacerte más fuerte.","Détruis des ennemis et des météorites pour gagner de l’XP et devenir plus puissant.","Zerstöre Gegner und Meteoriten, um XP zu erhalten und stärker zu werden.","Уничтожай врагов и метеориты, чтобы получать XP и становиться сильнее.","دمر الأعداء والنيازك لتحصل على XP وتزداد قوة."],
"🟢 קל — יותר XP, יותר חיים, אויבים חלשים יותר ומגן ארוך יותר אחרי פגיעה.":["🟢 Easy — more XP, more lives, weaker enemies, and a longer shield after taking damage.","🟢 Fácil: más XP, más vidas, enemigos más débiles y un escudo más duradero tras recibir daño.","🟢 Facile : plus d’XP, plus de vies, des ennemis plus faibles et un bouclier plus long après un coup.","🟢 Einfach — mehr XP, mehr Leben, schwächere Gegner und längerer Schild nach Treffern.","🟢 Лёгкий — больше XP и жизней, слабее враги и дольше щит после попадания.","🟢 سهل — XP أكثر وحياة أكثر وأعداء أضعف ودرع أطول بعد الإصابة."],
"⚪ בינוני — רגיל.":["⚪ Normal — standard difficulty.","⚪ Normal — dificultad estándar.","⚪ Normal — difficulté standard.","⚪ Normal — Standard-Schwierigkeit.","⚪ Средний — обычная сложность.","⚪ متوسط — الصعوبة العادية."],
"🟠 קשה — אויבים חזקים יותר ויורים בשלשות.":["🟠 Hard — stronger enemies that fire in bursts of three.","🟠 Difícil: enemigos más fuertes que disparan en ráfagas de tres.","🟠 Difficile : ennemis plus puissants qui tirent par salves de trois.","🟠 Schwer — stärkere Gegner, die Dreiersalven abfeuern.","🟠 Сложный — более сильные враги стреляют очередями по три.","🟠 صعب — أعداء أقوى يطلقون ثلاث طلقات متتالية."],
"🔴 סופר קשה — אויבים חזקים מאוד, פחות XP ופחות חיים.":["🔴 Super Hard — very strong enemies, less XP, and fewer lives.","🔴 Muy difícil: enemigos muy fuertes, menos XP y menos vidas.","🔴 Très difficile : ennemis très puissants, moins d’XP et moins de vies.","🔴 Sehr schwer — sehr starke Gegner, weniger XP und weniger Leben.","🔴 Очень сложно — очень сильные враги, меньше XP и жизней.","🔴 صعب جدًا — أعداء أقوياء جدًا وXP أقل وحياة أقل."],
"⚫ בלתי אפשרי — אויבים חזקים במיוחד, מעט XP ורקע שחור עם זוהר.":["⚫ Impossible — extremely strong enemies, very little XP, and a black glowing background.","⚫ Imposible: enemigos extremadamente fuertes, muy poca XP y fondo negro brillante.","⚫ Impossible : ennemis extrêmement puissants, très peu d’XP et fond noir lumineux.","⚫ Unmöglich — extrem starke Gegner, sehr wenig XP und schwarzer Leuchthintergrund.","⚫ Невозможно — чрезвычайно сильные враги, мало XP и чёрный светящийся фон.","⚫ مستحيل — أعداء أقوياء للغاية وXP قليل وخلفية سوداء متوهجة."],
"🃏 כל הקלפים":["🃏 All Cards","🃏 Todas las cartas","🃏 Toutes les cartes","🃏 Alle Karten","🃏 Все карты","🃏 جميع البطاقات"]
};
Object.assign(ui,{
"מטאוריט רגיל שמופיע בחלל.":["A regular meteorite that appears in space.","Un meteorito normal que aparece en el espacio.","Une météorite ordinaire qui apparaît dans l’espace.","Ein gewöhnlicher Meteorit, der im Weltraum erscheint.","Обычный метеорит, появляющийся в космосе.","نيزك عادي يظهر في الفضاء."],
"חללית אויב רגילה שיורה על השחקן.":["A regular enemy spaceship that shoots at the player.","Una nave enemiga normal que dispara al jugador.","Un vaisseau ennemi ordinaire qui tire sur le joueur.","Ein gewöhnliches feindliches Raumschiff, das auf den Spieler schießt.","Обычный вражеский корабль, который стреляет по игроку.","سفينة عدو عادية تطلق النار على اللاعب."],
"בוס בסיסי עם הרבה חיים ומתקפות חזקות.":["A basic boss with lots of health and powerful attacks.","Un jefe básico con mucha salud y ataques potentes.","Un boss de base avec beaucoup de points de vie et des attaques puissantes.","Ein einfacher Boss mit vielen Lebenspunkten und starken Angriffen.","Базовый босс с большим запасом здоровья и мощными атаками.","زعيم أساسي لديه الكثير من الصحة وهجمات قوية."],
"מתפצלת לשני שיבוטים שקופים יותר, עם 50% פחות חיים וירי איטי יותר.":["Splits into two more transparent clones with 50% less health and a slower firing rate.","Se divide en dos clones más transparentes, con un 50 % menos de salud y disparos más lentos.","Se divise en deux clones plus transparents, avec 50 % de vie en moins et une cadence de tir plus lente.","Teilt sich in zwei transparentere Klone mit 50 % weniger Leben und langsamerer Feuerrate.","Разделяется на два более прозрачных клона с 50% меньшим здоровьем и более медленной стрельбой.","تنقسم إلى نسختين أكثر شفافية بصحة أقل بنسبة 50٪ ومعدل إطلاق أبطأ."],
"מתפצל לשני שיבוטים בצדדים עם מאפייני שיבוט.":["Splits into two clones on the sides with clone properties.","Se divide en dos clones laterales con características de clon.","Se divise en deux clones sur les côtés avec les caractéristiques des clones.","Teilt sich seitlich in zwei Klone mit Klon-Eigenschaften.","Разделяется на два клона по бокам со свойствами клона.","ينقسم إلى نسختين على الجانبين بخصائص النسخ."],
"בוס מיוחד המבוסס על שיבוטים והטעיה.":["A special boss built around clones and deception.","Un jefe especial basado en clones y engaños.","Un boss spécial fondé sur les clones et la tromperie.","Ein Spezialboss, der auf Klonen und Täuschung basiert.","Особый босс, основанный на клонах и обмане.","زعيم خاص يعتمد على النسخ والخداع."],
"פגיעה בו מאטה את תנועת השחקן ואת קצב הירי למשך 2 שניות.":["Hitting it slows the player's movement and firing rate for 2 seconds.","Golpearlo ralentiza el movimiento y la cadencia de disparo del jugador durante 2 segundos.","Le toucher ralentit les déplacements et la cadence de tir du joueur pendant 2 secondes.","Ein Treffer verlangsamt die Bewegung und Feuerrate des Spielers für 2 Sekunden.","Попадание замедляет движение игрока и скорость стрельбы на 2 секунды.","إصابته تبطئ حركة اللاعب ومعدل إطلاق النار لمدة ثانيتين."],
"פגיעה בו או השמדתו מקרוב מקפיאה את השחקן למשך 7 שניות.":["Hitting it or destroying it at close range freezes the player for 7 seconds.","Golpearlo o destruirlo de cerca congela al jugador durante 7 segundos.","Le toucher ou le détruire à proximité gèle le joueur pendant 7 secondes.","Ein Treffer oder die Zerstörung aus nächster Nähe friert den Spieler 7 Sekunden lang ein.","Попадание по нему или уничтожение вблизи замораживает игрока на 7 секунд.","إصابته أو تدميره من مسافة قريبة يجمد اللاعب لمدة 7 ثوانٍ."],
"בוס מיוחד של אזור הקרח.":["A special boss from the ice zone.","Un jefe especial de la zona de hielo.","Un boss spécial de la zone de glace.","Ein Spezialboss aus der Eiszone.","Особый босс ледяной зоны.","زعيم خاص من منطقة الجليد."],
"אויב מיוחד שמשתמש בשערים כדי לנוע ולהופיע מחדש.":["A special enemy that uses portals to move and reappear.","Un enemigo especial que usa portales para moverse y reaparecer.","Un ennemi spécial qui utilise des portails pour se déplacer et réapparaître.","Ein Spezialgegner, der Portale nutzt, um sich zu bewegen und wieder aufzutauchen.","Особый враг, использующий порталы для перемещения и повторного появления.","عدو خاص يستخدم البوابات للتنقل والظهور مجددًا."],
"מטאוריט מיוחד שמופיע דרך שערים ונעלם דרכם.":["A special meteorite that appears and disappears through portals.","Un meteorito especial que aparece y desaparece a través de portales.","Une météorite spéciale qui apparaît et disparaît par des portails.","Ein Spezialmeteorit, der durch Portale erscheint und verschwindet.","Особый метеорит, появляющийся и исчезающий через порталы.","نيزك خاص يظهر ويختفي عبر البوابات."],
"בוס מיוחד של אזור השערים.":["A special boss from the portal zone.","Un jefe especial de la zona de portales.","Un boss spécial de la zone des portails.","Ein Spezialboss aus der Portalzone.","Особый босс зоны порталов.","زعيم خاص من منطقة البوابات."],
"אינו יורה. הדרך היחידה שלו לפגוע היא להתנגש בשחקן.":["It does not shoot. Its only way to damage the player is by colliding with them.","No dispara. Su única forma de dañar al jugador es chocando contra él.","Il ne tire pas. Il ne peut blesser le joueur qu’en le percutant.","Er schießt nicht. Er kann dem Spieler nur durch Zusammenstoßen Schaden zufügen.","Он не стреляет. Единственный способ нанести урон игроку — столкнуться с ним.","لا يطلق النار. طريقته الوحيدة لإيذاء اللاعب هي الاصطدام به."],
"מטאוריט מיוחד שמטרתו לפגוע בשחקן בהתנגשות.":["A special meteorite designed to hit the player by collision.","Un meteorito especial que busca golpear al jugador al chocar.","Une météorite spéciale conçue pour percuter le joueur.","Ein Spezialmeteorit, der den Spieler durch Zusammenstoß treffen soll.","Особый метеорит, который должен поразить игрока при столкновении.","نيزك خاص هدفه إصابة اللاعب بالاصطدام."],
"בוס מיוחד שמתמקד במרדף והתנגשויות.":["A special boss focused on chasing and collisions.","Un jefe especial centrado en persecuciones y colisiones.","Un boss spécial axé sur la poursuite et les collisions.","Ein Spezialboss, der auf Verfolgung und Zusammenstöße setzt.","Особый босс, ориентированный на преследование и столкновения.","زعيم خاص يركز على المطاردة والاصطدامات."],
"נעלם ומשאיר אזור סגול, ואז חוזר אליו אחרי 4 שניות ויורה.":["Disappears, leaving a purple zone, then returns to it after 4 seconds and shoots.","Desaparece y deja una zona morada; vuelve a ella tras 4 segundos y dispara.","Disparaît en laissant une zone violette, puis y revient après 4 secondes et tire.","Verschwindet und hinterlässt eine violette Zone, kehrt nach 4 Sekunden zurück und schießt.","Исчезает, оставляя фиолетовую область, затем возвращается через 4 секунды и стреляет.","يختفي تاركًا منطقة بنفسجية، ثم يعود إليها بعد 4 ثوانٍ ويطلق النار."],
"חוזר לאזור סגול ואז מנפץ אותו במקום לירות.":["Returns to a purple zone and shatters it instead of shooting.","Vuelve a una zona morada y la rompe en lugar de disparar.","Revient dans une zone violette puis la brise au lieu de tirer.","Kehrt zu einer violetten Zone zurück und zerschmettert sie, statt zu schießen.","Возвращается в фиолетовую область и разбивает её вместо выстрела.","يعود إلى منطقة بنفسجية ثم يحطمها بدلًا من إطلاق النار."],
"בוס מיוחד המבוסס על טלפורטציה.":["A special boss based on teleportation.","Un jefe especial basado en la teletransportación.","Un boss spécial basé sur la téléportation.","Ein Spezialboss, der auf Teleportation basiert.","Особый босс, основанный на телепортации.","زعيم خاص يعتمد على الانتقال الآني."],
"פגיעה בה יכולה להפוך את כיווני התנועה של השחקן לזמן קצר.":["Hitting it can briefly reverse the player's movement controls.","Golpearla puede invertir brevemente los controles de movimiento del jugador.","La toucher peut inverser brièvement les commandes de déplacement du joueur.","Ein Treffer kann die Bewegungssteuerung des Spielers kurzzeitig umkehren.","Попадание может ненадолго изменить направление управления движением игрока.","إصابتها قد تعكس اتجاهات حركة اللاعب لفترة قصيرة."],
"מחליף כיוון בקצה המסך ונע במסלול ההפוך.":["Changes direction at the edge of the screen and travels along the reverse path.","Cambia de dirección en el borde de la pantalla y sigue la trayectoria inversa.","Change de direction au bord de l’écran et suit la trajectoire inverse.","Wechselt am Bildschirmrand die Richtung und bewegt sich auf der umgekehrten Bahn.","Меняет направление у края экрана и движется по обратной траектории.","يغير اتجاهه عند حافة الشاشة ويتحرك في المسار المعاكس."],
"בוס מיוחד שמשנה את כיווני השליטה.":["A special boss that reverses the control directions.","Un jefe especial que invierte las direcciones de control.","Un boss spécial qui inverse les commandes de déplacement.","Ein Spezialboss, der die Steuerungsrichtungen umkehrt.","Особый босс, меняющий направления управления.","زعيم خاص يعكس اتجاهات التحكم."],
"אויב שמת כשהוא מתפצל ל־2 שיבוטים עם 50% פחות חיים.":["An enemy that splits into 2 clones with 50% less health when it dies.","Un enemigo que al morir se divide en 2 clones con un 50 % menos de salud.","Un ennemi qui se divise à sa mort en 2 clones ayant 50 % de vie en moins.","Ein Gegner, der beim Tod in 2 Klone mit 50 % weniger Leben zerfällt.","Враг, который при смерти делится на 2 клона с 50% меньшим здоровьем.","عدو ينقسم عند موته إلى نسختين بصحة أقل بنسبة 50٪."],
"מטאוריט שמת כשהוא מתפצל ל־2 שיבוטים עם 50% פחות חיים.":["A meteorite that splits into 2 clones with 50% less health when destroyed.","Un meteorito que al destruirse se divide en 2 clones con un 50 % menos de salud.","Une météorite qui se divise à sa destruction en 2 clones ayant 50 % de vie en moins.","Ein Meteorit, der bei seiner Zerstörung in 2 Klone mit 50 % weniger Leben zerfällt.","Метеорит, который при уничтожении делится на 2 клона с 50% меньшим здоровьем.","نيزك ينقسم عند تدميره إلى نسختين بصحة أقل بنسبة 50٪."],
"בוס ירוק שמתפצל לבוסים בינוניים ואז למיני־בוסים.":["A green boss that splits into medium bosses and then mini-bosses.","Un jefe verde que se divide en jefes medianos y luego en minijefes.","Un boss vert qui se divise en boss moyens puis en mini-boss.","Ein grüner Boss, der sich in mittelgroße Bosse und dann in Mini-Bosse teilt.","Зелёный босс, который делится на средних боссов, а затем на мини-боссов.","زعيم أخضر ينقسم إلى زعماء متوسطين ثم زعماء صغار."],
"באזור הזה אין אויב מיוחד — מופיעים אויבים ומטאוריטים באקראי מכל האזורים.":["There is no unique enemy in this zone — enemies and meteorites from all zones appear at random.","No hay enemigos únicos en esta zona: aparecen enemigos y meteoritos aleatorios de todas las zonas.","Cette zone n’a pas d’ennemi particulier : des ennemis et météorites de toutes les zones apparaissent au hasard.","In dieser Zone gibt es keinen besonderen Gegner — Gegner und Meteoriten aus allen Zonen erscheinen zufällig.","В этой зоне нет особого врага — случайно появляются враги и метеориты из всех зон.","لا يوجد عدو مميز في هذه المنطقة — تظهر أعداء ونيازك عشوائيًا من جميع المناطق."],
"בוס מיוחד ובכיר שלוקח חלקים מהסגנונות של האזורים האחרים.":["A powerful special boss that borrows elements from the styles of other zones.","Un jefe especial y poderoso que incorpora elementos de los estilos de otras zonas.","Un boss spécial puissant qui reprend des éléments des styles des autres zones.","Ein mächtiger Spezialboss, der Elemente aus den Stilen anderer Zonen übernimmt.","Мощный особый босс, сочетающий элементы стилей других зон.","زعيم خاص وقوي يستعير عناصر من أساليب المناطق الأخرى."],
"אויב מיוחד שהופך למסוכן ומהיר יותר ככל שהוא מאבד חיים.":["A special enemy that becomes more dangerous and faster as it loses health.","Un enemigo especial que se vuelve más peligroso y rápido a medida que pierde salud.","Un ennemi spécial qui devient plus dangereux et rapide à mesure qu’il perd de la vie.","Ein Spezialgegner, der mit sinkender Gesundheit gefährlicher und schneller wird.","Особый враг, который становится опаснее и быстрее по мере потери здоровья.","عدو خاص يصبح أكثر خطورة وسرعة كلما فقد صحته."],
"בוס מיוחד שנכנס למצבי זעם בשלבי החיים הנמוכים.":["A special boss that enters rage phases at low health.","Un jefe especial que entra en fases de furia cuando tiene poca salud.","Un boss spécial qui entre en phase de rage lorsque sa santé est faible.","Ein Spezialboss, der bei wenig Gesundheit in Wutphasen eintritt.","Особый босс, впадающий в ярость при низком уровне здоровья.","زعيم خاص يدخل في مراحل غضب عندما تنخفض صحته."]
});
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
    ],
    "sourceTitle": "מצב אולטרה",
    "sourceDescription": "פותח את מערכת נקודות האולטרה. להפעלה נדרשות לפחות 1,000 נקודות. מעניק פי 2 נזק, קצב ירי והתקדמות במרחק, מהירות תנועה ×1.2 וחסינות לנזק. צורך 1,000 נקודות לשנייה. כל 5,000 נקודות שהוצאו מעניקות מגן, עד למספר החיים המרבי. לאחר כיבוי או התרוקנות יש להמתין 15 שניות."
  },
  "ultraLaser": {
    "title": [
      "Ultra Laser",
      "Láser Ultra",
      "Laser Ultra",
      "Ultra-Laser",
      "Ультра-лазер",
      "ليزر ألترا"
    ],
    "sourceTitle": "אולטרה לייזר",
    "sourceDescription": "פותח כפתור יכולת נפרד. עולה 5,000 נקודות אולטרה למשך 10 שניות ומכוון עם העכבר. כשהמצב הרגיל של אולטרה כבוי: נזק פי 2 מהלייזר הרגיל ועובי רגיל. כשהמצב פעיל: נזק פי 5, עובי פי 3, מהירות השחקן בחצי ודחיפת קליעים, חלליות ומטאוריטים; בוסים אינם נדחפים. טעינה מחדש: 20 שניות."
  },
  "chainExplosion": {
    "title": [
      "Chain Explosion",
      "Explosión en cadena",
      "Explosion en chaîne",
      "Kettenexplosion",
      "Цепной взрыв",
      "انفجار متسلسل"
    ],
    "sourceTitle": "פיצוץ שרשרת",
    "sourceDescription": "כאשר אויב מת, הוא יוצר הבזק אנרגיה, כדור פיצוץ ופיקסלים מתפזרים. הנזק הוא 20%–100% מהחיים המרביים של האויב שהתפוצץ; גודל הפיצוץ גדל מ־100% עד 500%. ברמות V–VII הקלף אגדי וברמות VIII–IX מדהים. פיצוץ בוס גדול במיוחד ואינו ממשיך שרשרת."
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
    ],
    "sourceTitle": "עוד נזק",
    "sourceDescription": "מגדיל את הנזק של היריות וגם מחזק את החרבות."
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
    ],
    "sourceTitle": "מהירות יריות",
    "sourceDescription": "מגדיל את מהירות הירי וגם את מהירות הסיבוב של החרבות."
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
    ],
    "sourceTitle": "הרחבת חיים מקסימליים",
    "sourceDescription": "מוסיף לב אחד לחיים המקסימליים."
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
    ],
    "sourceTitle": "ריפוי לב אחד",
    "sourceDescription": "מרפא לב אחד. חד־פעמי."
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
    ],
    "sourceTitle": "מהירות תנועה",
    "sourceDescription": "מגדיל את מהירות תנועת החללית."
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
    ],
    "sourceTitle": "עוד ירי",
    "sourceDescription": "מוסיף יריות נוספות לכל ירייה."
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
    ],
    "sourceTitle": "עוד XP",
    "sourceDescription": "מגדיל את כמות ה־XP שמקבלים."
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
    ],
    "sourceTitle": "עוד מזל",
    "sourceDescription": "מגדיל את הסיכוי לקבל שדרוגים נדירים יותר."
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
    ],
    "sourceTitle": "התחמקות",
    "sourceDescription": "נותן סיכוי לא לאבד לב כאשר נפגעים."
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
    ],
    "sourceTitle": "ריפוי כל החיים",
    "sourceDescription": "מרפא את כל החיים. חד־פעמי."
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
    ],
    "sourceTitle": "מיני־חללית",
    "sourceDescription": "מוסיף מיני־חללית רגילה שיורה אוטומטית."
  },
  "extraDrone": {
    "title": [
      "Extra Mini Spaceship",
      "Mini nave adicional",
      "Mini-vaisseau supplémentaire",
      "Zusätzliches Mini-Raumschiff",
      "Дополнительный мини-корабль",
      "مركبة صغيرة إضافية"
    ],
    "sourceTitle": "עוד מיני־חללית",
    "sourceDescription": "מגדיל את מקסימום המיני־חלליות ב־1 עד מקסימום 5."
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
    ],
    "sourceTitle": "יריות RPG",
    "sourceDescription": "פותח את נשק ה־RPG ומוסיף 10 תחמושת."
  },
  "piercing": {
    "title": [
      "Piercing Shots",
      "Disparos perforantes",
      "Tirs perforants",
      "Durchschlagende Schüsse",
      "Пробивающие выстрелы",
      "طلقات خارقة"
    ],
    "sourceTitle": "יריות חודרות",
    "sourceDescription": "הקליע פוגע בכל מטרה מספר פעמים בזמן החדירה. הפגיעה הראשונה גורמת לנזק מלא, והפגיעות הבאות גורמות לנזק לפי הרמה. הקליע ממשיך במהירות רגילה; בכל מטרה חדשה הנזק מתאפס לנזק מלא."
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
    ],
    "sourceTitle": "עוד חרב",
    "sourceDescription": "מוסיף חרב אנרגיה מסתובבת סביב החללית."
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
    ],
    "sourceTitle": "החייאה",
    "sourceDescription": "כאשר החיים מגיעים לאפס, חוזרים לחיים עם כל החיים המלאים."
  },
  "fillShields": {
    "title": [
      "Refill Shields",
      "Rellenar escudos",
      "Recharger les boucliers",
      "Schilde auffüllen",
      "Пополнить щиты",
      "إعادة ملء الدروع"
    ],
    "sourceTitle": "מילוי מגנים",
    "sourceDescription": "ממלא מיד את כל המגנים החסרים עד למקסימום. חד־פעמי; אינו משחזר חיים."
  },
  "levelHeal": {
    "title": [
      "Heal on Level Up",
      "Curación al subir de nivel",
      "Soin à chaque niveau",
      "Heilung beim Levelaufstieg",
      "Лечение при повышении уровня",
      "الشفاء عند رفع المستوى"
    ],
    "sourceTitle": "ריפוי בעליית רמה",
    "sourceDescription": "בכל פעם שעולים רמה, השחקן מתרפא בלב אחד."
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
    ],
    "sourceTitle": "שוטגאן",
    "sourceDescription": "פותח את השוטגאן."
  },
  "droneUpgrade": {
    "title": [
      "Upgraded Mini Spaceship",
      "Mini nave mejorada",
      "Mini-vaisseau amélioré",
      "Verbessertes Mini-Raumschiff",
      "Улучшенный мини-корабль",
      "مركبة صغيرة مطورة"
    ],
    "sourceTitle": "מיני־חללית משודרגת",
    "sourceDescription": "כל המיני־חלליות הקיימות משתדרגות ויורות 3 קליעים."
  },
  "chainLightning": {
    "title": [
      "Chain Lightning",
      "Relámpago en cadena",
      "Éclair en chaîne",
      "Kettenblitz",
      "Цепная молния",
      "برق متسلسل"
    ],
    "sourceTitle": "שרשרת ברקים",
    "sourceDescription": "פגיעה באויב יכולה להעביר ברק לאויבים קרובים נוספים."
  },
  "rpgMiniShip": {
    "title": [
      "RPG Mini Spaceship",
      "Mini nave RPG",
      "Mini-vaisseau RPG",
      "RPG-Mini-Raumschiff",
      "Мини-корабль с РПГ",
      "مركبة RPG صغيرة"
    ],
    "sourceTitle": "מיני־חללית RPG",
    "sourceDescription": "מוסיף מיני־חללית מיוחדת שיורה טילי RPG אוטומטיים."
  },
  "blackHole": {
    "title": [
      "Black Hole Gun",
      "Arma de agujero negro",
      "Arme à trou noir",
      "Schwarzes-Loch-Gewehr",
      "Пушка чёрной дыры",
      "بندقية الثقب الأسود"
    ],
    "sourceTitle": "רובה חור שחור",
    "sourceDescription": "נשק חדש שמתחיל עם 4 יריות. כל ירייה יוצרת חור שחור שמושך אויבים ומטאוריטים ומתפוצץ. התחמושת חוזרת רק כאשר בוחרים שוב בקלף."
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
    ],
    "sourceTitle": "מצב לייזר",
    "sourceDescription": "פותח לייזר חזק שעוקב אחרי העכבר וגורם נזק."
  },
  "laserHeat": {
    "title": [
      "Overheating Laser",
      "Láser sobrecalentado",
      "Laser surchauffant",
      "Überhitzender Laser",
      "Перегревающийся лазер",
      "ليزر مرتفع الحرارة"
    ],
    "sourceTitle": "לייזר מתחמם",
    "sourceDescription": "שדרוג ללייזר שכבר פתחת. רמה I: נזק התחלתי 100% ונזק מרחבי מרבי 200% מהלייזר הרגיל, התחממות תוך 9 שניות וקירור תוך 11 שניות. בכל רמה: הנזק ההתחלתי עולה ב־25%, הנזק המרחבי ב־50%, זמן ההתחממות מתקצר בשנייה וזמן הקירור מתארך בשנייה. עד רמה V."
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
    ],
    "sourceTitle": "להביור",
    "sourceDescription": "פותח להביור שעוקב אחרי העכבר."
  },
  "splitBullet": {
    "title": [
      "Split Bullet",
      "Bala dividida",
      "Balle divisée",
      "Geteiltes Projektil",
      "Разделяющаяся пуля",
      "طلقة منقسمة"
    ],
    "sourceTitle": "קליע מפוצל",
    "sourceDescription": "כל פגיעה של קליע רגיל מתפצלת. רמה I יוצרת 2 קליעים. כל רמה מגדילה את סך נזק הפיצול לפי ×1, ×2, ×3 וכן הלאה, את כמות הקליעים, הזווית, המהירות, הטווח והגודל. פיצול שני ושלישי מקבלים סיכוי לפי הרמה. מקסימום 3 דורות פיצול; שקיפות: 100%, 75%, 50%, 25%."
  },
  "droneMega": {
    "title": [
      "Large Mini Spaceship",
      "Mini nave grande",
      "Grand mini-vaisseau",
      "Großes Mini-Raumschiff",
      "Большой мини-корабль",
      "مركبة صغيرة كبيرة"
    ],
    "sourceTitle": "מיני־חללית גדולה",
    "sourceDescription": "משדרג את המיני־חללית הגדולה ויורה 7 קליעים."
  },
  "lowHealthRage": {
    "title": [
      "Last Stand",
      "Último recurso",
      "Dernier recours",
      "Letztes Gefecht",
      "Последний рывок",
      "الغضب الأخير"
    ],
    "sourceTitle": "זעם אחרון",
    "sourceDescription": "כאשר החיים של החללית נמוכים מ־50%, מהירות התנועה גדלה ב־50%, מהירות הטעינה גדלה ב־50%, הנזק גדל ב־25% והחללית זוהרת בכתום."
  },
  "poison": {
    "title": [
      "Poison",
      "Veneno",
      "Poison",
      "Gift",
      "Яд",
      "سم"
    ],
    "sourceTitle": "רעל",
    "sourceDescription": "כל פגיעה מרעילה את המטרה ללא הגבלת זמן. הנזק בכל פעימה הוא אחוז מהחיים הנוכחיים, אך הרעל לעולם אינו מוריד מתחת ל־1 חיים. אויבים ומטאוריטים מקבלים עוצמה מלאה; בוסים 25%. כל פגיעה נוספת מגבירה את עוצמת הרעל ומאיצה את הפעימות. רמה IX היא המקסימום."
  },
  "burn": {
    "title": [
      "Burn",
      "Quemadura",
      "Brûlure",
      "Verbrennung",
      "Ожог",
      "حرق"
    ],
    "sourceTitle": "צריבה",
    "sourceDescription": "פגיעה יכולה להצית אויב או מטאוריט. הנזק הכולל מתחיל ב־50% מנזק הפגיעה ועולה עד 95% ברמה X. כל פגיעה מוצלחת נוספת מגדילה את הנזק המצטבר ומקצרת את משך הצריבה ב־25%. סיכוי ההצתה מתחיל ב־20% ועולה עד 65%; סיכויי ההמשך יורדים לפי הרמה. אם פגיעה חוזרת נכשלת או שלא פוגעים בזמן, הצריבה נעלמת. בוסים סופגים רבע מהנזק."
  },
  "freeze": {
    "title": [
      "Freeze",
      "Congelación",
      "Gel",
      "Einfrieren",
      "Заморозка",
      "تجميد"
    ],
    "sourceTitle": "הקפאה",
    "sourceDescription": "כל פגיעה יכולה להקפיא את האויב. רמה I מתחילה ב־10% סיכוי, 25% האטה ו־4 שניות. בכל בחירה הסיכוי והעוצמה ×1.5 והזמן ×1.33 (עד 90% האטה)."
  },
  "stun": {
    "title": [
      "Stun",
      "Aturdimiento",
      "Étourdissement",
      "Betäubung",
      "Оглушение",
      "شلل"
    ],
    "sourceTitle": "שיתוק",
    "sourceDescription": "כל פגיעה יכולה לשתק אויב שאינו בוס. רמה I: 5% סיכוי ו־1 שנייה. בכל בחירה הסיכוי ומשך השיתוק ×1.5. בזמן השיתוק האויב לא מתקדם ולא יורה ומסתובב ברדיוס של 15% מגודלו."
  },
  "continuousFire": {
    "title": [
      "Sustained Fire",
      "Fuego continuo",
      "Tir continu",
      "Dauerfeuer",
      "Непрерывный огонь",
      "إطلاق نار مستمر"
    ],
    "sourceTitle": "ירי רציף",
    "sourceDescription": "כל פגיעה רצופה באותו אויב מגדילה את נזק הפגיעה הבאה ב־20% מהנזק הקודם. כל שדרוג מוסיף עוד 20 נקודות אחוז לצמיחת הנזק. הפסקה של יותר מ־1.5 שניות מאפסת את הרצף."
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
  dailyMissions:Object.freeze({
  "distance250": {
    "sourceTitle": "שרוד 250 מטר",
    "title": [
      "Survive 250 meters",
      "Sobrevive 250 metros",
      "Survis 250 mètres",
      "Überlebe 250 Meter",
      "Выживи на дистанции 250 метров",
      "ابقَ على قيد الحياة لمسافة 250 مترًا"
    ]
  },
  "meteor10": {
    "sourceTitle": "הרוס 10 מטאוריטים",
    "title": [
      "Destroy 10 meteorites",
      "Destruye 10 meteoritos",
      "Détruis 10 météorites",
      "Zerstöre 10 Meteoriten",
      "Уничтожь 10 метеоритов",
      "دمر 10 نيازك"
    ]
  },
  "enemy5": {
    "sourceTitle": "הרוס 5 חלליות אויב",
    "title": [
      "Destroy 5 enemy spaceships",
      "Destruye 5 naves enemigas",
      "Détruis 5 vaisseaux ennemis",
      "Zerstöre 5 feindliche Raumschiffe",
      "Уничтожь 5 кораблей врагов",
      "دمر 5 سفن أعداء"
    ]
  },
  "xp500": {
    "sourceTitle": "צבור 500 XP לשחקן",
    "title": [
      "Earn 500 Player XP",
      "Consigue 500 XP de jugador",
      "Gagne 500 XP de joueur",
      "Sammle 500 Spieler-XP",
      "Получи 500 XP игрока",
      "اجمع 500 نقطة خبرة للاعب"
    ]
  },
  "level3": {
    "sourceTitle": "עלה 3 רמות",
    "title": [
      "Gain 3 levels",
      "Sube 3 niveles",
      "Gagne 3 niveaux",
      "Steige 3 Level auf",
      "Получи 3 уровня",
      "ارفع مستواك 3 مستويات"
    ]
  },
  "distance750": {
    "sourceTitle": "שרוד 750 מטר",
    "title": [
      "Survive 750 meters",
      "Sobrevive 750 metros",
      "Survis 750 mètres",
      "Überlebe 750 Meter",
      "Выживи на дистанции 750 метров",
      "ابقَ على قيد الحياة لمسافة 750 مترًا"
    ]
  },
  "meteor25": {
    "sourceTitle": "הרוס 25 מטאוריטים",
    "title": [
      "Destroy 25 meteorites",
      "Destruye 25 meteoritos",
      "Détruis 25 météorites",
      "Zerstöre 25 Meteoriten",
      "Уничтожь 25 метеоритов",
      "دمر 25 نيزكًا"
    ]
  },
  "enemy15": {
    "sourceTitle": "הרוס 15 חלליות אויב",
    "title": [
      "Destroy 15 enemy spaceships",
      "Destruye 15 naves enemigas",
      "Détruis 15 vaisseaux ennemis",
      "Zerstöre 15 feindliche Raumschiffe",
      "Уничтожь 15 кораблей врагов",
      "دمر 15 سفينة عدو"
    ]
  },
  "boss1": {
    "sourceTitle": "הרוג בוס",
    "title": [
      "Defeat a boss",
      "Derrota a un jefe",
      "Bats un boss",
      "Besiege einen Boss",
      "Победи босса",
      "اهزم زعيمًا"
    ]
  },
  "distance1500": {
    "sourceTitle": "שרוד 1500 מטר",
    "title": [
      "Survive 1,500 meters",
      "Sobrevive 1.500 metros",
      "Survis 1 500 mètres",
      "Überlebe 1.500 Meter",
      "Выживи на дистанции 1 500 метров",
      "ابقَ على قيد الحياة لمسافة 1500 متر"
    ]
  },
  "meteor50": {
    "sourceTitle": "הרוס 50 מטאוריטים",
    "title": [
      "Destroy 50 meteorites",
      "Destruye 50 meteoritos",
      "Détruis 50 météorites",
      "Zerstöre 50 Meteoriten",
      "Уничтожь 50 метеоритов",
      "دمر 50 نيزكًا"
    ]
  },
  "enemy30": {
    "sourceTitle": "הרוס 30 חלליות אויב",
    "title": [
      "Destroy 30 enemy spaceships",
      "Destruye 30 naves enemigas",
      "Détruis 30 vaisseaux ennemis",
      "Zerstöre 30 feindliche Raumschiffe",
      "Уничтожь 30 кораблей врагов",
      "دمر 30 سفينة عدو"
    ]
  }
}),
  collection:Object.freeze({})
});
})();
