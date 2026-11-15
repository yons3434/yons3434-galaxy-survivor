/* Galaxy Defender central translation catalog.
 * Keep every user-facing translation in this file. Locale order:
 * en, es, fr, de, ru, ar.
 * Hebrew is the source language and remains the fallback.
 */
(() => {
"use strict";
const ui={
"🔫 תחמושת נאספה":["🔫 Ammo collected","🔫 Munición recogida","🔫 Munitions récupérées","🔫 Munition gesammelt","🔫 Боеприпасы собраны","🔫 تم جمع الذخيرة"],
"🔥 מצב זעם הופעל!":["🔥 Rage activated!","🔥 ¡Furia activada!","🔥 Rage activée !","🔥 Wut aktiviert!","🔥 Ярость активирована!","🔥 تم تفعيل الغضب!"],
"🎁 נאסף שלל!":["🎁 Loot collected!","🎁 ¡Botín recogido!","🎁 Butin récupéré !","🎁 Beute gesammelt!","🎁 Добыча собрана!","🎁 تم جمع الغنيمة!"],
"💣 +1 פצצה!":["💣 +1 Bomb!","💣 ¡+1 bomba!","💣 +1 bombe !","💣 +1 Bombe!","💣 +1 бомба!","💣 +1 قنبلة!"],
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
"🔴 מספרי נזק ופרסים מעל אויבים":["🔴 Damage and reward numbers above enemies","🔴 Números de daño y recompensas sobre enemigos","🔴 Dégâts et récompenses au-dessus des ennemis","🔴 Schadens- und Belohnungszahlen über Gegnern","🔴 Числа урона и наград над врагами","🔴 أرقام الضرر والمكافآت فوق الأعداء"],
"💚 אפקטי ריפוי":["💚 Healing effects","💚 Efectos de curación","💚 Effets de soin","💚 Heilungseffekte","💚 Эффекты лечения","💚 تأثيرات الشفاء"],
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
"💾 שמור פרופיל":["💾 Save Profile","💾 Guardar perfil","💾 Enregistrer le profil","💾 Profil speichern","💾 Сохранить профиль","💾 حفظ الملف الشخصي"],
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
"הישגים רגילים:":["Common Achievements:","Logros comunes:","Succès courants :","Gewöhnliche Erfolge:","Обычные достижения:","الإنجازات العادية:"],
"הישגים נדירים:":["Rare Achievements:","Logros raros:","Succès rares :","Seltene Erfolge:","Редкие достижения:","الإنجازات النادرة:"],
"הישגים אדירים:":["Epic Achievements:","Logros épicos:","Succès épiques :","Epische Erfolge:","Эпические достижения:","الإنجازات الملحمية:"],
"הישגים אגדיים:":["Legendary Achievements:","Logros legendarios:","Succès légendaires :","Legendäre Erfolge:","Легендарные достижения:","الإنجازات الأسطورية:"],
"הישגים מדהימים:":["Amazing Achievements:","Logros asombrosos:","Succès incroyables :","Fantastische Erfolge:","Удивительные достижения:","الإنجازات المذهلة:"],
"Ultra":["Ultra","Ultra","Ultra","Ultra","Ультра","ألترا"],
"בחירה מורחבת":["Expanded Choice","Elección ampliada","Choix étendu","Erweiterte Auswahl","Расширенный выбор","اختيار موسّع"],
"Streak:":["Streak:","Racha:","Série :","Serie:","Серия:","سلسلة:"],
"ימים":["days","días","jours","Tage","дней","أيام"],
"👥 שחקנים ששיחקו אי פעם":["Players who have ever played","Jugadores que han jugado alguna vez","Joueurs ayant déjà joué","Spieler insgesamt","Всего игроков","اللاعبون الذين لعبوا من قبل"],
"בחירה מורחבת":["Expanded Choice","Elección ampliada","Choix étendu","Erweiterte Auswahl","Расширенный выбор","اختيار موسّع"],
"קל":["Easy","Fácil","Facile","Einfach","Легко","سهل"],
"בינוני":["Normal","Normal","Normal","Normal","Средне","متوسط"],
"קשה":["Hard","Difícil","Difficile","Schwer","Сложно","صعب"],
"סופר קשה":["Super Hard","Muy difícil","Très difficile","Sehr schwer","Очень сложно","صعب جدًا"],
"בלתי אפשרי":["Impossible","Imposible","Impossible","Unmöglich","Невозможно","مستحيل"],
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
Object.assign(ui,{
"⚔️ דרגות קושי":["⚔️ Difficulty Levels","⚔️ Niveles de dificultad","⚔️ Niveaux de difficulté","⚔️ Schwierigkeitsgrade","⚔️ Уровни сложности","⚔️ مستويات الصعوبة"],
"1 — אקדח | 2 — RPG | 3 — שוטגאן":["1 — Pistol | 2 — RPG | 3 — Shotgun","1 — Pistola | 2 — RPG | 3 — Escopeta","1 — Pistolet | 2 — RPG | 3 — Fusil à pompe","1 — Pistole | 2 — RPG | 3 — Schrotflinte","1 — Пистолет | 2 — РПГ | 3 — Дробовик","1 — مسدس | 2 — RPG | 3 — بندقية خرطوش"],
"4 — להביור | 5 — לייזר | 6 — רובה חור שחור":["4 — Flamethrower | 5 — Laser | 6 — Black Hole Gun","4 — Lanzallamas | 5 — Láser | 6 — Arma de agujero negro","4 — Lance-flammes | 5 — Laser | 6 — Arme à trou noir","4 — Flammenwerfer | 5 — Laser | 6 — Schwarzes-Loch-Gewehr","4 — Огнемёт | 5 — Лазер | 6 — Пушка чёрной дыры","4 — قاذف اللهب | 5 — ليزر | 6 — بندقية الثقب الأسود"],
"Q — RPG | R — שוטגאן | F — להביור":["Q — RPG | R — Shotgun | F — Flamethrower","Q — RPG | R — Escopeta | F — Lanzallamas","Q — RPG | R — Fusil à pompe | F — Lance-flammes","Q — RPG | R — Schrotflinte | F — Flammenwerfer","Q — РПГ | R — Дробовик | F — Огнемёт","Q — RPG | R — بندقية خرطوش | F — قاذف اللهب"],
"E — נשק רגיל | L — לייזר":["E — Regular weapon | L — Laser","E — Arma normal | L — Láser","E — Arme normal | L — Laser","E — Normale Waffe | L — Laser","E — Обычное оружие | L — Лазер","E — سلاح عادي | L — ليزر"],
"P — עצירה / המשך":["P — Pause / Resume","P — Pausar / Continuar","P — Pause / Reprendre","P — Pause / Fortsetzen","P — Пауза / Продолжить","P — إيقاف مؤقت / متابعة"],
"Esc — סגירת חלון פתוח או עצירת המשחק":["Esc — Close an open window or pause the game","Esc — Cerrar una ventana abierta o pausar el juego","Esc — Fermer une fenêtre ouverte ou mettre le jeu en pause","Esc — Ein geöffnetes Fenster schließen oder das Spiel pausieren","Esc — Закрыть открытое окно или поставить игру на паузу","Esc — إغلاق نافذة مفتوحة أو إيقاف اللعبة مؤقتًا"],
"אויבים ומטאוריטים מכל האזורים":["Enemies and meteorites from all zones","Enemigos y meteoritos de todas las zonas","Ennemis et météorites de toutes les zones","Gegner und Meteoriten aus allen Zonen","Враги и метеориты из всех зон","أعداء ونيازك من جميع المناطق"],
"השם שלך":["Your name","Tu nombre","Ton nom","Dein Name","Твоё имя","اسمك"]
});
Object.assign(ui,{
"שחקן":["Player","Jugador","Joueur","Spieler","Игрок","لاعب"],
"🌐 ללא מדינה":["🌐 No country","🌐 Sin país","🌐 Aucun pays","🌐 Kein Land","🌐 Без страны","🌐 بدون دولة"],
"🌍 מדינה":["🌍 Country","🌍 País","🌍 Pays","🌍 Land","🌍 Страна","🌍 الدولة"],
"הפרופיל נשמר!":["Profile saved!","¡Perfil guardado!","Profil enregistré !","Profil gespeichert!","Профиль сохранён!","تم حفظ الملف الشخصي!"],
"שם לשיא":["Record name","Nombre para el récord","Nom du record","Rekordname","Имя для рекорда","اسم الرقم القياسي"],
"כתוב את השם שיופיע בלוח התוצאות:":["Enter the name that will appear on the leaderboard:","Escribe el nombre que aparecerá en la clasificación:","Saisissez le nom qui apparaîtra dans le classement :","Gib den Namen ein, der in der Bestenliste erscheinen soll:","Введите имя, которое будет отображаться в таблице лидеров:","اكتب الاسم الذي سيظهر في لوحة المتصدرين:"],
"שמור והמשך":["Save and continue","Guardar y continuar","Enregistrer et continuer","Speichern und fortfahren","Сохранить и продолжить","حفظ ومتابعة"],
"יש להזין שם.":["Please enter a name.","Introduce un nombre.","Veuillez saisir un nom.","Bitte gib einen Namen ein.","Введите имя.","يرجى إدخال اسم."],
"בודק אם השם פנוי…":["Checking if the name is available…","Comprobando si el nombre está disponible…","Vérification de la disponibilité du nom…","Überprüfe, ob der Name verfügbar ist…","Проверяем доступность имени…","جارٍ التحقق من توفر الاسم…"],
"השם הזה כבר תפוס. בחר שם אחר.":["That name is already taken. Choose another name.","Ese nombre ya está ocupado. Elige otro nombre.","Ce nom est déjà pris. Choisissez un autre nom.","Dieser Name ist bereits vergeben. Wähle einen anderen Namen.","Это имя уже занято. Выберите другое имя.","هذا الاسم مستخدم بالفعل. اختر اسمًا آخر."],
"לא ניתן לשמור את השם כרגע. נסה שוב.":["The name could not be saved right now. Try again.","No se pudo guardar el nombre ahora. Inténtalo de nuevo.","Impossible d’enregistrer le nom pour le moment. Réessayez.","Der Name konnte gerade nicht gespeichert werden. Versuche es erneut.","Сейчас не удалось сохранить имя. Попробуйте снова.","Не удалось сохранить имя сейчас. Попробуйте ещё раз."],
"נכנסת ללוח התוצאות במקום":["You entered the leaderboard at place","Entraste en la clasificación en el puesto","Vous êtes entré dans le classement à la place","Du bist auf Platz","Вы вошли в таблицу лидеров на место","لقد دخلت لوحة المتصدرين في المركز"],
"רמת שחקן":["Player Level","Nivel del jugador","Niveau du joueur","Spielerstufe","Уровень игрока","مستوى اللاعب"],
"XP כולל":["total XP","XP total","XP total","XP insgesamt","всего XP","إجمالي XP"],
"XP לרמה הבאה":["XP to next level","XP para el siguiente nivel","XP avant le niveau suivant","XP bis zum nächsten Level","XP до следующего уровня","XP للمستوى التالي"],
"זמן משחק":["Play Time","Tiempo de juego","Temps de jeu","Spielzeit","Время игры","وقت اللعب"],
"משחקים":["Games","Partidas","Parties","Spiele","Игры","الألعاب"],
"🛸 מיני חללית אולטרה":["🛸 Ultra Mini Ship","🛸 Mini nave Ultra","🛸 Mini-vaisseau Ultra","🛸 Ultra-Mini-Raumschiff","🛸 Ультра-мини-корабль","🛸 سفينة صغيرة ألترا"],
"קרניים":["beams","rayos","faisceaux","Strahlen","лучей","أشعة"],
"שניות":["seconds","segundos","secondes","Sekunden","секунд","ثوانٍ"],
"נקודות":["points","puntos","points","Punkte","очков","نقاط"],
"🛸 הקרן ה־20 התחברה — מצב האולטרה הסתיים!":["🛸 Beam 20 connected — Ultra mode ended!","🛸 ¡Se conectó el rayo 20: terminó el modo Ultra!","🛸 Le 20e rayon est connecté — mode Ultra terminé !","🛸 Strahl 20 verbunden — Ultra-Modus beendet!","🛸 Подключён 20-й луч — режим Ультра завершён!","🛸 تم توصيل الشعاع 20 — انتهى وضع ألترا!"],
"🛸 מצב אולטרה מיני חללית כובה":["🛸 Ultra Mini Ship mode disabled","🛸 Modo Mini nave Ultra desactivado","🛸 Mode Mini-vaisseau Ultra désactivé","🛸 Ultra-Mini-Raumschiff-Modus deaktiviert","🛸 Режим Ультра-мини-корабля выключен","🛸 تم إيقاف وضع السفينة الصغيرة ألترا"],
"נדרשות 3,000 נקודות אולטרה":["3,000 Ultra points required","Se necesitan 3.000 puntos Ultra","3 000 points Ultra requis","3.000 Ultra-Punkte erforderlich","Требуется 3 000 очков Ультра","يلزم 3000 نقطة ألترا"],
"🛸 אולטרה מיני חללית הופעלה!":["🛸 Ultra Mini Ship activated!","🛸 ¡Mini nave Ultra activada!","🛸 Mini-vaisseau Ultra activé !","🛸 Ultra-Mini-Raumschiff aktiviert!","🛸 Ультра-мини-корабль активирован!","🛸 تم تفعيل السفينة الصغيرة ألترا!"]
});
Object.assign(ui,{
"אפשר לשנות את השם דרך 👤 פרופיל":["You can change your name in 👤 Profile","Puedes cambiar tu nombre en 👤 Perfil","Tu peux changer ton nom dans 👤 Profil","Du kannst deinen Namen unter 👤 Profil ändern","Имя можно изменить в разделе 👤 Профиль","يمكنك تغيير اسمك من 👤 الملف الشخصي"]
});
Object.assign(ui,{
"פותח את מערכת נקודות האולטרה. להפעלה נדרשות לפחות 1,000 נקודות. מעניק פי 2 נזק, קצב ירי והתקדמות במרחק, מהירות תנועה ×1.2 וחסינות לנזק. צורך 1,000 נקודות לשנייה. כל 5,000 נקודות שהוצאו מעניקות מגן, עד למספר החיים המרבי. לאחר כיבוי או התרוקנות יש להמתין 15 שניות.":["Unlocks the Ultra points system. Requires at least 1,000 points to activate. Grants 2× damage, fire rate and distance progress, 1.2× movement speed, and damage immunity. Consumes 1,000 points per second. Every 5,000 points spent grants a shield, up to your maximum lives. After deactivation or depletion, wait 15 seconds.","Desbloquea el sistema de puntos Ultra. Requiere al menos 1.000 puntos para activarse. Otorga el doble de daño, cadencia de disparo y progreso de distancia, velocidad de movimiento ×1,2 e inmunidad al daño. Consume 1.000 puntos por segundo. Cada 5.000 puntos gastados otorgan un escudo, hasta el máximo de vidas. Tras desactivarlo o agotarse, espera 15 segundos.","Débloque le système de points Ultra. Nécessite au moins 1 000 points pour l’activation. Double les dégâts, la cadence de tir et la progression en distance, augmente la vitesse de déplacement de ×1,2 et confère l’immunité aux dégâts. Consomme 1 000 points par seconde. Chaque tranche de 5 000 points dépensés accorde un bouclier, jusqu’au maximum de vies. Après désactivation ou épuisement, attends 15 secondes.","Schaltet das Ultra-Punktesystem frei. Zur Aktivierung sind mindestens 1.000 Punkte erforderlich. Verdoppelt Schaden, Feuerrate und Distanzfortschritt, erhöht die Bewegungsgeschwindigkeit um ×1,2 und macht immun gegen Schaden. Verbraucht 1.000 Punkte pro Sekunde. Alle 5.000 ausgegebenen Punkte gewähren einen Schild, bis zum Lebensmaximum. Nach Deaktivierung oder Aufbrauch 15 Sekunden warten.","Открывает систему очков Ультра. Для активации требуется не менее 1 000 очков. Удваивает урон, скорострельность и продвижение по дистанции, увеличивает скорость движения в 1,2 раза и даёт иммунитет к урону. Расходует 1 000 очков в секунду. Каждые потраченные 5 000 очков дают щит, пока не достигнут максимум жизней. После отключения или истощения подожди 15 секунд.","يفتح نظام نقاط ألترا. يتطلب 1000 نقطة على الأقل للتفعيل. يضاعف الضرر ومعدل الإطلاق والتقدم في المسافة، ويزيد سرعة الحركة ×1.2 ويمنح حصانة من الضرر. يستهلك 1000 نقطة في الثانية. كل 5000 نقطة تُنفق تمنح درعًا حتى الحد الأقصى للحياة. بعد الإيقاف أو النفاد، انتظر 15 ثانية."],
"פותח כפתור יכולת נפרד. עולה 5,000 נקודות אולטרה למשך 10 שניות ומכוון עם העכבר. כשהמצב הרגיל של אולטרה כבוי: נזק פי 2 מהלייזר הרגיל ועובי רגיל. כשהמצב פעיל: נזק פי 5, עובי פי 3, מהירות השחקן בחצי ודחיפת קליעים, חלליות ומטאוריטים; בוסים אינם נדחפים. טעינה מחדש: 20 שניות.":["Unlocks a separate ability button. Costs 5,000 Ultra points and lasts 10 seconds; aim with the mouse. With regular Ultra mode off: deals 2× regular laser damage at normal thickness. While Ultra mode is active: deals 5× damage, has 3× thickness, halves player speed, and pushes projectiles, spaceships, and meteorites; bosses are not pushed. Cooldown: 20 seconds.","Desbloquea un botón de habilidad independiente. Cuesta 5.000 puntos Ultra y dura 10 segundos; apunta con el ratón. Con el modo Ultra normal desactivado: inflige el doble de daño que el láser normal y tiene grosor normal. Con Ultra activo: inflige 5 veces más daño, tiene 3 veces más grosor, reduce a la mitad la velocidad del jugador y empuja proyectiles, naves y meteoritos; los jefes no se mueven. Recarga: 20 segundos.","Débloque un bouton de capacité séparé. Coûte 5 000 points Ultra et dure 10 secondes ; vise avec la souris. Mode Ultra normal désactivé : inflige 2 fois les dégâts du laser normal, épaisseur normale. Mode Ultra actif : dégâts ×5, épaisseur ×3, vitesse du joueur divisée par deux et repousse les projectiles, vaisseaux et météorites ; les boss ne sont pas repoussés. Recharge : 20 secondes.","Schaltet eine separate Fähigkeitstaste frei. Kostet 5.000 Ultra-Punkte und hält 10 Sekunden; mit der Maus zielen. Bei deaktiviertem normalen Ultra-Modus: doppelter Schaden des normalen Lasers bei normaler Dicke. Bei aktivem Ultra-Modus: fünffacher Schaden, dreifache Dicke, halbe Spielergeschwindigkeit und stößt Projektile, Raumschiffe und Meteoriten zurück; Bosse werden nicht zurückgestoßen. Abklingzeit: 20 Sekunden.","Открывает отдельную кнопку способности. Стоит 5 000 очков Ультра и действует 10 секунд; наведение мышью. При выключенном обычном режиме Ультра: двойной урон обычного лазера и обычная толщина. При активном режиме Ультра: урон ×5, толщина ×3, скорость игрока вдвое ниже; отталкивает снаряды, корабли и метеориты, но не боссов. Перезарядка: 20 секунд.","يفتح زر قدرة منفصلًا. يكلف 5000 نقطة ألترا ويستمر 10 ثوانٍ؛ يتم التصويب بالماوس. عند إيقاف وضع ألترا العادي: يسبب ضعف ضرر الليزر العادي وبالسماكة العادية. عند تفعيل ألترا: ضرر ×5 وسماكة ×3، وتنخفض سرعة اللاعب إلى النصف، ويدفع المقذوفات والسفن والنيازك؛ لا يدفع الزعماء. إعادة الشحن: 20 ثانية."],
"כאשר אויב מת, הוא יוצר הבזק אנרגיה, כדור פיצוץ ופיקסלים מתפזרים. הנזק הוא 20%–100% מהחיים המרביים של האויב שהתפוצץ; גודל הפיצוץ גדל מ־100% עד 500%. ברמות V–VII הקלף אגדי וברמות VIII–IX מדהים. פיצוץ בוס גדול במיוחד ואינו ממשיך שרשרת.":["When an enemy dies, it creates an energy flash, an expanding explosion sphere, and scattering pixels. Damage is 20%–100% of the defeated enemy's maximum health; explosion size grows from 100% to 500%. Levels V–VII are Legendary and levels VIII–IX are Amazing. Boss explosions are especially large and do not continue the chain.","Cuando un enemigo muere, crea un destello de energía, una esfera explosiva y píxeles dispersos. El daño equivale al 20–100 % de la vida máxima del enemigo derrotado; el tamaño de la explosión aumenta del 100 % al 500 %. Los niveles V–VII son Legendarios y VIII–IX Asombrosos. Las explosiones de los jefes son especialmente grandes y no continúan la cadena.","À sa mort, un ennemi produit un flash d’énergie, une sphère d’explosion et des pixels qui se dispersent. Les dégâts représentent 20 à 100 % des PV max de l’ennemi vaincu ; la taille de l’explosion passe de 100 à 500 %. Les niveaux V à VII sont légendaires et VIII à IX incroyables. Les explosions des boss sont particulièrement grandes et ne prolongent pas la chaîne.","Wenn ein Gegner stirbt, erzeugt er einen Energieblitz, eine Explosionskugel und verstreute Pixel. Der Schaden beträgt 20–100 % der maximalen Lebenspunkte des besiegten Gegners; die Explosionsgröße wächst von 100 % auf 500 %. Stufen V–VII sind legendär, VIII–IX fantastisch. Boss-Explosionen sind besonders groß und setzen die Kette nicht fort.","После смерти враг создаёт энергетическую вспышку, сферу взрыва и разлетающиеся пиксели. Урон составляет 20–100 % от максимального здоровья погибшего врага; размер взрыва увеличивается со 100 % до 500 %. Уровни V–VII — легендарные, VIII–IX — удивительные. Взрывы боссов особенно велики и не продолжают цепочку.","عند موت العدو، يُنشئ وميضًا طاقيًا وكرة انفجار وبكسلات متناثرة. الضرر يساوي 20–100% من أقصى صحة العدو الذي انفجر؛ ويزداد حجم الانفجار من 100% إلى 500%. المستويات V–VII أسطورية وVIII–IX مذهلة. انفجار الزعيم أكبر بكثير ولا يواصل السلسلة."],
"מגדיל את מקסימום המיני־חלליות ב־1 עד מקסימום 5.":["Increases the maximum number of mini ships by 1, up to 5.","Aumenta en 1 el máximo de naves pequeñas, hasta 5.","Augmente de 1 le nombre maximal de mini-vaisseaux, jusqu’à 5.","Erhöht die maximale Anzahl der Mini-Raumschiffe um 1, bis höchstens 5.","Увеличивает максимальное число мини-кораблей на 1, максимум до 5.","يزيد الحد الأقصى للسفن الصغيرة بمقدار 1، حتى 5."],
"הקליע פוגע בכל מטרה מספר פעמים בזמן החדירה. הפגיעה הראשונה גורמת לנזק מלא, והפגיעות הבאות גורמות לנזק לפי הרמה. הקליע ממשיך במהירות רגילה; בכל מטרה חדשה הנזק מתאפס לנזק מלא.":["The projectile hits each target multiple times while piercing. The first hit deals full damage; subsequent hits deal damage based on the upgrade level. The projectile keeps its normal speed, and damage resets to full against each new target.","El proyectil golpea varias veces a cada objetivo al atravesarlo. El primer impacto causa daño completo; los siguientes dependen del nivel. El proyectil mantiene su velocidad normal y el daño vuelve al máximo con cada nuevo objetivo.","Le projectile touche chaque cible plusieurs fois en la traversant. Le premier coup inflige les dégâts complets ; les suivants dépendent du niveau. Le projectile conserve sa vitesse normale et les dégâts reviennent au maximum contre chaque nouvelle cible.","Das Projektil trifft jedes Ziel beim Durchdringen mehrfach. Der erste Treffer verursacht vollen Schaden; weitere Treffer richten je nach Stufe Schaden an. Das Projektil behält seine normale Geschwindigkeit und der Schaden wird bei jedem neuen Ziel zurückgesetzt.","Снаряд несколько раз поражает каждую цель при сквозном попадании. Первый удар наносит полный урон, последующие зависят от уровня улучшения. Скорость снаряда не меняется; при новой цели урон снова становится полным.","يصيب المقذوف كل هدف عدة مرات أثناء اختراقه. تسبب الضربة الأولى ضررًا كاملًا، وتعتمد الضربات التالية على مستوى الترقية. يحتفظ المقذوف بسرعته العادية ويعود الضرر كاملًا عند إصابة هدف جديد."],
"ממלא מיד את כל המגנים החסרים עד למקסימום. חד־פעמי; אינו משחזר חיים.":["Instantly refills all missing shields up to the maximum. One-time use; does not restore health.","Rellena al instante todos los escudos que faltan hasta el máximo. Uso único; no restaura vida.","Remplit instantanément tous les boucliers manquants jusqu’au maximum. Utilisation unique ; ne restaure pas les points de vie.","Füllt sofort alle fehlenden Schilde bis zum Maximum auf. Einmalig; stellt keine Lebenspunkte wieder her.","Мгновенно восполняет все недостающие щиты до максимума. Одноразовое действие; здоровье не восстанавливает.","يعيد ملء جميع الدروع الناقصة فورًا حتى الحد الأقصى. استخدام لمرة واحدة؛ لا يستعيد الصحة."],
"בכל פעם שעולים רמה, השחקן מתרפא בלב אחד.":["The player restores one heart each time they level up.","El jugador recupera un corazón cada vez que sube de nivel.","Le joueur récupère un cœur à chaque montée de niveau.","Bei jedem Levelaufstieg erhält der Spieler ein Herz zurück.","При каждом повышении уровня игрок восстанавливает одно сердце.","يستعيد اللاعب قلبًا واحدًا عند كل ترقية للمستوى."],
"כל המיני־חלליות הקיימות משתדרגות ויורות 3 קליעים.":["All existing mini ships are upgraded and fire 3 projectiles.","Todas las naves pequeñas existentes mejoran y disparan 3 proyectiles.","Tous les mini-vaisseaux existants sont améliorés et tirent 3 projectiles.","Alle vorhandenen Mini-Raumschiffe werden verbessert und feuern 3 Projektile ab.","Все существующие мини-корабли улучшаются и выпускают 3 снаряда.","تتم ترقية جميع السفن الصغيرة الحالية وتطلق 3 مقذوفات."],
"פגיעה באויב יכולה להעביר ברק לאויבים קרובים נוספים.":["Hitting an enemy can chain lightning to other nearby enemies.","Al golpear a un enemigo, un rayo puede saltar a otros enemigos cercanos.","Toucher un ennemi peut transmettre un éclair à d’autres ennemis proches.","Ein Treffer kann einen Blitz auf weitere Gegner in der Nähe überspringen lassen.","При попадании молния может перескочить на других ближайших врагов.","قد يؤدي ضرب عدو إلى انتقال البرق إلى أعداء آخرين قريبين."],
"מוסיף מיני־חללית מיוחדת שיורה טילי RPG אוטומטיים.":["Adds a special mini ship that automatically fires RPG rockets.","Añade una nave pequeña especial que dispara cohetes RPG automáticamente.","Ajoute un mini-vaisseau spécial qui tire automatiquement des roquettes RPG.","Fügt ein spezielles Mini-Raumschiff hinzu, das automatisch RPG-Raketen abfeuert.","Добавляет особый мини-корабль, автоматически запускающий ракеты RPG.","يضيف سفينة صغيرة خاصة تطلق صواريخ RPG تلقائيًا."],
"נשק חדש שמתחיל עם 4 יריות. כל ירייה יוצרת חור שחור שמושך אויבים ומטאוריטים ומתפוצץ. התחמושת חוזרת רק כאשר בוחרים שוב בקלף.":["A new weapon with 4 shots. Each shot creates a black hole that pulls in enemies and meteorites before exploding. Ammo is replenished only when this card is selected again.","Un arma nueva con 4 disparos. Cada disparo crea un agujero negro que atrae enemigos y meteoritos y luego explota. La munición solo se repone al volver a elegir esta carta.","Une nouvelle arme avec 4 tirs. Chaque tir crée un trou noir qui attire les ennemis et les météorites avant d’exploser. Les munitions ne sont renouvelées qu’en choisissant à nouveau cette carte.","Eine neue Waffe mit 4 Schüssen. Jeder Schuss erzeugt ein Schwarzes Loch, das Gegner und Meteoriten anzieht und explodiert. Munition wird nur durch erneute Auswahl dieser Karte aufgefüllt.","Новое оружие с 4 выстрелами. Каждый выстрел создаёт чёрную дыру, которая притягивает врагов и метеориты, а затем взрывается. Боезапас пополняется только при повторном выборе карты.","سلاح جديد يبدأ بأربع طلقات. تنشئ كل طلقة ثقبًا أسود يجذب الأعداء والنيازك ثم ينفجر. لا تتجدد الذخيرة إلا عند اختيار البطاقة مرة أخرى."],
"כל פגיעה של קליע רגיל מתפצלת. רמה I יוצרת 2 קליעים. כל רמה מגדילה את סך נזק הפיצול לפי ×1, ×2, ×3 וכן הלאה, את כמות הקליעים, הזווית, המהירות, הטווח והגודל. פיצול שני ושלישי מקבלים סיכוי לפי הרמה. מקסימום 3 דורות פיצול; שקיפות: 100%, 75%, 50%, 25%.":["Every normal projectile hit splits. Level I creates 2 projectiles. Each level increases total split damage by ×1, ×2, ×3, and so on, as well as projectile count, angle, speed, range, and size. Second- and third-generation splits gain a chance based on level. Maximum 3 split generations; opacity: 100%, 75%, 50%, 25%.","Cada impacto de un proyectil normal se divide. El nivel I crea 2 proyectiles. Cada nivel aumenta el daño total de la división (×1, ×2, ×3, etc.), además de la cantidad, el ángulo, la velocidad, el alcance y el tamaño de los proyectiles. Las divisiones de segunda y tercera generación obtienen una probabilidad según el nivel. Máximo 3 generaciones; opacidad: 100%, 75%, 50%, 25%.","Chaque impact d’un projectile normal se divise. Le niveau I crée 2 projectiles. Chaque niveau augmente les dégâts totaux de la division (×1, ×2, ×3, etc.), ainsi que le nombre, l’angle, la vitesse, la portée et la taille des projectiles. Les divisions de deuxième et troisième génération ont une chance selon le niveau. Maximum 3 générations ; opacité : 100 %, 75 %, 50 %, 25 %.","Jeder Treffer eines normalen Projektils teilt sich auf. Stufe I erzeugt 2 Projektile. Jede Stufe erhöht den Gesamtschaden der Teilung um ×1, ×2, ×3 usw. sowie Anzahl, Winkel, Geschwindigkeit, Reichweite und Größe der Projektile. Teilungen der zweiten und dritten Generation erhalten eine stufenabhängige Chance. Maximal 3 Teilungsgenerationen; Deckkraft: 100 %, 75 %, 50 %, 25 %.","Каждое попадание обычного снаряда разделяется. Уровень I создаёт 2 снаряда. Каждый уровень увеличивает общий урон разделения (×1, ×2, ×3 и так далее), количество снарядов, угол, скорость, дальность и размер. Для второго и третьего поколений разделения появляется шанс в зависимости от уровня. Максимум 3 поколения; прозрачность: 100%, 75%, 50%, 25%.","تنقسم كل إصابة للمقذوف العادي. ينشئ المستوى I مقذوفين. يزيد كل مستوى إجمالي ضرر الانقسام ×1 ثم ×2 ثم ×3 وهكذا، كما يزيد عدد المقذوفات وزاويتها وسرعتها ومداها وحجمها. تحصل انقسامات الجيلين الثاني والثالث على فرصة حسب المستوى. الحد الأقصى 3 أجيال؛ الشفافية: 100% و75% و50% و25%."],
"משדרג את המיני־חללית הגדולה ויורה 7 קליעים.":["Upgrades the large mini ship and makes it fire 7 projectiles.","Mejora la nave pequeña grande y hace que dispare 7 proyectiles.","Améliore le grand mini-vaisseau et lui fait tirer 7 projectiles.","Verbessert das große Mini-Raumschiff und lässt es 7 Projektile abfeuern.","Улучшает большой мини-корабль: теперь он выпускает 7 снарядов.","يطور السفينة الصغيرة الكبيرة ويجعلها تطلق 7 مقذوفات."],
"כאשר החיים של החללית נמוכים מ־50%, מהירות התנועה גדלה ב־50%, מהירות הטעינה גדלה ב־50%, הנזק גדל ב־25% והחללית זוהרת בכתום.":["When the ship's health falls below 50%, movement speed increases by 50%, reload speed increases by 50%, damage increases by 25%, and the ship glows orange.","Cuando la vida de la nave baja del 50 %, la velocidad de movimiento aumenta un 50 %, la velocidad de recarga un 50 %, el daño un 25 % y la nave brilla en naranja.","Lorsque la vie du vaisseau passe sous 50 %, sa vitesse de déplacement augmente de 50 %, sa vitesse de recharge de 50 %, ses dégâts de 25 % et il brille en orange.","Sinkt die Lebensenergie des Raumschiffs unter 50 %, steigen Bewegungsgeschwindigkeit um 50 %, Nachladegeschwindigkeit um 50 % und Schaden um 25 %; das Schiff leuchtet orange.","Когда здоровье корабля падает ниже 50 %, скорость движения увеличивается на 50 %, скорость перезарядки — на 50 %, урон — на 25 %, а корабль начинает светиться оранжевым.","عندما تنخفض صحة السفينة عن 50%، تزداد سرعة الحركة 50% وسرعة إعادة الشحن 50% والضرر 25%، وتتوهج السفينة باللون البرتقالي."],
"כל פגיעה מרעילה את המטרה ללא הגבלת זמן. הנזק בכל פעימה הוא אחוז מהחיים הנוכחיים, אך הרעל לעולם אינו מוריד מתחת ל־1 חיים. אויבים ומטאוריטים מקבלים עוצמה מלאה; בוסים 25%. כל פגיעה נוספת מגבירה את עוצמת הרעל ומאיצה את הפעימות. רמה IX היא המקסימום.":["Every hit poisons the target indefinitely. Each tick deals a percentage of current health, but poison can never reduce health below 1. Enemies and meteorites receive full strength; bosses receive 25%. Each additional hit increases poison strength and speeds up the ticks. Level IX is the maximum.","Cada golpe envenena al objetivo indefinidamente. Cada pulso causa un porcentaje de la vida actual, pero el veneno nunca reduce la vida por debajo de 1. Los enemigos y meteoritos reciben toda la potencia; los jefes, el 25 %. Cada golpe adicional aumenta la fuerza del veneno y acelera los pulsos. El nivel IX es el máximo.","Chaque coup empoisonne la cible indéfiniment. Chaque pulsation inflige un pourcentage de la vie actuelle, mais le poison ne peut jamais descendre sous 1 PV. Les ennemis et météorites subissent toute la puissance ; les boss, 25 %. Chaque coup supplémentaire renforce le poison et accélère les pulsations. Le niveau IX est le maximum.","Jeder Treffer vergiftet das Ziel unbegrenzt. Jeder Impuls verursacht einen Prozentsatz der aktuellen Lebenspunkte, aber Gift kann die Lebenspunkte nie unter 1 senken. Gegner und Meteoriten erhalten die volle Stärke, Bosse 25 %. Jeder weitere Treffer verstärkt das Gift und beschleunigt die Impulse. Stufe IX ist das Maximum.","Каждое попадание отравляет цель на неопределённое время. Каждый тик наносит процент от текущего здоровья, но яд никогда не снижает его ниже 1. Враги и метеориты получают полный эффект, боссы — 25 %. Каждое новое попадание усиливает яд и ускоряет тики. Максимум — уровень IX.","كل إصابة تسمم الهدف بلا حد زمني. تسبب كل نبضة نسبة من الصحة الحالية، لكن السم لا يخفض الصحة أبدًا إلى أقل من 1. تتلقى الأعداء والنيازك التأثير الكامل، والزعماء 25%. كل إصابة إضافية تزيد قوة السم وتسرّع النبضات. المستوى IX هو الحد الأقصى."],
"מגדיל את המקסימום של המיני־חלליות ב־1. מתחיל מ־2 ועד מקסימום 5.":["Increases the maximum number of mini ships by 1. Starts at 2, up to a maximum of 5.","Aumenta en 1 el máximo de mini naves. Empieza en 2, hasta un máximo de 5.","Augmente de 1 le nombre maximal de mini-vaisseaux. Commence à 2, jusqu’à un maximum de 5.","Erhöht die maximale Anzahl der Mini-Raumschiffe um 1. Startet bei 2, bis maximal 5.","Увеличивает максимальное количество мини-кораблей на 1. Начинает с 2, максимум — 5.","يزيد الحد الأقصى للسفن الصغيرة بمقدار 1. يبدأ من 2 ويصل إلى 5 كحد أقصى."],
"מוסיף אפשרות אחת לבחירת הקלפים בכל עליית רמה. ניתן לבחור עד 3 פעמים בכל משחק.":["Adds one extra card choice each time you level up. Can be selected up to 3 times per game.","Añade una opción adicional de carta al subir de nivel. Se puede elegir hasta 3 veces por partida.","Ajoute un choix de carte supplémentaire à chaque montée de niveau. Peut être choisi jusqu’à 3 fois par partie.","Fügt bei jedem Levelaufstieg eine zusätzliche Kartenauswahl hinzu. Kann bis zu 3-mal pro Spiel gewählt werden.","Добавляет один дополнительный вариант карты при повышении уровня. Можно выбрать до 3 раз за игру.","يضيف خيار بطاقة إضافيًا عند كل ارتفاع في المستوى. يمكن اختياره حتى 3 مرات في المباراة."],
"🛡️ מגן":["🛡️ Shield","🛡️ Escudo","🛡️ Bouclier","🛡️ Schild","🛡️ Щит","🛡️ درع"],
"התחמקות":["Dodge","Evasión","Esquive","Ausweichen","Уклонение","مراوغة"],
"⚡ מהירות: ×1.00":["⚡ Speed: ×1.00","⚡ Velocidad: ×1.00","⚡ Vitesse : ×1.00","⚡ Geschwindigkeit: ×1.00","⚡ Скорость: ×1.00","⚡ السرعة: ×1.00"],
"👻 בלתי פגיע!":["👻 Invulnerable!","👻 ¡Invulnerable!","👻 Invulnérable !","👻 Unverwundbar!","👻 Неуязвим!","👻 غير قابل للإصابة!"],
"🛸 אולטרה מיני חללית":["🛸 Ultra Mini Ship","🛸 Mini nave Ultra","🛸 Mini-vaisseau Ultra","🛸 Ultra-Mini-Raumschiff","🛸 Ультра-мини-корабль","🛸 سفينة ألترا صغيرة"],
"🌈 אולטרה לייזר":["🌈 Ultra Laser","🌈 Láser Ultra","🌈 Laser Ultra","🌈 Ultra-Laser","🌈 Ультра-лазер","🌈 ليزر ألترا"],
"🌈 מצב אולטרה":["🌈 Ultra Mode","🌈 Modo Ultra","🌈 Mode Ultra","🌈 Ultra-Modus","🌈 Режим Ультра","🌈 وضع ألترا"],
"🌐 שפה":["🌐 Language","🌐 Idioma","🌐 Langue","🌐 Sprache","🌐 Язык","🌐 اللغة"],
"🌀 סיכוי התחמקות:":["🌀 Dodge Chance:","🌀 Probabilidad de evasión:","🌀 Chance d’esquive :","🌀 Ausweichchance:","🌀 Шанс уклонения:","🌀 فرصة المراوغة:"],
"× מכפלת מרחק":["× Distance Multiplier","× Multiplicador de distancia","× Multiplicateur de distance","× Distanzmultiplikator","× Множитель расстояния","× مضاعف المسافة"],
"פעימות ❤️ — עוצמת האפקט":["Heartbeat ❤️ — Effect Intensity","Latido ❤️ — Intensidad del efecto","Battement ❤️ — Intensité de l’effet","Herzschlag ❤️ — Effektstärke","Пульс ❤️ — сила эффекта","نبضات القلب ❤️ — شدة التأثير"],
"🩸 פעימת פגיעה":["🩸 Hit Flash","🩸 Destello de impacto","🩸 Flash d’impact","🩸 Treffereffekt","🩸 Вспышка при попадании","🩸 وميض الإصابة"],
"💓 דופק פעימות":["💓 Heartbeat Pulse","💓 Pulso cardíaco","💓 Pulsation cardiaque","💓 Herzschlag-Puls","💓 Пульсация сердца","💓 نبض القلب"],
"הקלפים והשדרוגים שבחרת":["Cards and Upgrades You Chose","Cartas y mejoras que elegiste","Cartes et améliorations choisies","Ausgewählte Karten und Upgrades","Выбранные карты и улучшения","البطاقات والترقيات التي اخترتها"],
"דרגה":["Difficulty","Dificultad","Difficulté","Schwierigkeit","Сложность","الصعوبة"],
"שיחק":["Played","Partidas","Parties","Gespielt","Сыграно","تم اللعب"],
"שיא":["Record","Récord","Record","Rekord","Рекорд","الرقم القياسي"],
"0 / 0 הישגים":["0 / 0 Achievements","0 / 0 logros","0 / 0 succès","0 / 0 Erfolge","0 / 0 достижений","0 / 0 إنجازات"],
"📅 משימות יומיות":["📅 Daily Missions","📅 Misiones diarias","📅 Missions quotidiennes","📅 Tägliche Missionen","📅 Ежедневные задания","📅 المهام اليومية"],
"כל הבוסים והאויבים במשחק, לפי האזור שלהם":["All bosses and enemies in the game, grouped by their zone","Todos los jefes y enemigos del juego, agrupados por zona","Tous les boss et ennemis du jeu, classés par zone","Alle Bosse und Gegner im Spiel, nach Zone gruppiert","Все боссы и враги игры, сгруппированные по зонам","جميع الزعماء والأعداء في اللعبة، حسب مناطقهم"],
"המרחק שלך:":["Your Distance:","Tu distancia:","Votre distance :","Deine Distanz:","Твоя дистанция:","مسافتك:"],
"מטר":["meters","metros","mètres","Meter","метров","متر"],
"רמה:":["Level:","Nivel:","Niveau :","Level:","Уровень:","المستوى:"],
"✖️ סגור":["✖️ Close","✖️ Cerrar","✖️ Fermer","✖️ Schließen","✖️ Закрыть","✖️ إغلاق"],
"🏅 הישגים":["🏅 Achievements","🏅 Logros","🏅 Succès","🏅 Erfolge","🏅 Достижения","🏅 الإنجازات"],
"👥 שחקנים ששיחקו אי פעם:":["👥 Players who have ever played:","👥 Jugadores que han jugado alguna vez:","👥 Joueurs ayant déjà joué :","👥 Spieler insgesamt:","👥 Всего игроков:","👥 اللاعبون الذين لعبوا من قبل:"],
"🔥 רצף: 0 ימים":["🔥 Streak: 0 days","🔥 Racha: 0 días","🔥 Série : 0 jours","🔥 Serie: 0 Tage","🔥 Серия: 0 дней","🔥 سلسلة: 0 يوم"],
"⏳ אולטרה לייזר בטעינה":["⏳ Ultra Laser recharging","⏳ Láser Ultra recargando","⏳ Recharge du laser Ultra","⏳ Ultra-Laser lädt auf","⏳ Перезарядка Ультра-лазера","⏳ إعادة شحن ليزر ألترا"],
"צריך 5,000 נקודות אולטרה להפעלת הלייזר":["5,000 Ultra points are required to activate the laser.","Se necesitan 5.000 puntos Ultra para activar el láser.","5 000 points Ultra sont nécessaires pour activer le laser.","Zum Aktivieren des Lasers sind 5.000 Ultra-Punkte erforderlich.","Для активации лазера требуется 5 000 очков Ультра.","يلزم 5,000 نقطة ألترا لتفعيل الليزر."],
"🌈 אולטרה לייזר הופעל!":["🌈 Ultra Laser activated!","🌈 ¡Láser Ultra activado!","🌈 Laser Ultra activé !","🌈 Ultra-Laser aktiviert!","🌈 Ультра-лазер активирован!","🌈 تم تفعيل ليزر ألترا!"],
"🌈 מצב אולטרה כובה — המתן 15 שניות":["🌈 Ultra Mode disabled — wait 15 seconds","🌈 Modo Ultra desactivado: espera 15 segundos","🌈 Mode Ultra désactivé — attends 15 secondes","🌈 Ultra-Modus deaktiviert — warte 15 Sekunden","🌈 Режим Ультра выключен — подожди 15 секунд","🌈 تم إيقاف وضع ألترا — انتظر 15 ثانية"],
"⏳ צריך להמתין לפני הפעלה מחדש":["⏳ Wait before activating again","⏳ Espera antes de volver a activar","⏳ Attends avant de réactiver","⏳ Warte vor der erneuten Aktivierung","⏳ Подожди перед повторной активацией","⏳ انتظر قبل إعادة التفعيل"],
"🌈 מצב אולטרה הופעל!":["🌈 Ultra Mode activated!","🌈 ¡Modo Ultra activado!","🌈 Mode Ultra activé !","🌈 Ultra-Modus aktiviert!","🌈 Режим Ультра активирован!","🌈 تم تفعيل وضع ألترا!"],
"צריך לפחות 1,000 נקודות אולטרה":["At least 1,000 Ultra points are required","Se necesitan al menos 1.000 puntos Ultra","Au moins 1 000 points Ultra sont nécessaires","Mindestens 1.000 Ultra-Punkte erforderlich","Требуется не менее 1 000 очков Ультра","يلزم 1,000 نقطة ألترا على الأقل"],
"🔥 קודם צריך לקבל את קלף הלהביור!":["🔥 Unlock the Flamethrower card first!","🔥 ¡Primero desbloquea la carta Lanzallamas!","🔥 Débloque d’abord la carte Lance-flammes !","🔥 Schalte zuerst die Flammenwerfer-Karte frei!","🔥 Сначала получи карту «Огнемёт»!","🔥 افتح بطاقة قاذف اللهب أولًا!"],
"🔴 קודם צריך לקבל את קלף הלייזר!":["🔴 Unlock the Laser card first!","🔴 ¡Primero desbloquea la carta Láser!","🔴 Débloque d’abord la carte Laser !","🔴 Schalte zuerst die Laser-Karte frei!","🔴 Сначала получи карту «Лазер»!","🔴 افتح بطاقة الليزر أولًا!"],
"🌌 קודם צריך לקבל את קלף רובה החור השחור!":["🌌 Unlock the Black Hole Gun card first!","🌌 ¡Primero desbloquea la carta Cañón de agujero negro!","🌌 Débloque d’abord la carte Canon à trou noir !","🌌 Schalte zuerst die Schwarzes-Loch-Kanone-Karte frei!","🌌 Сначала получи карту «Пушка чёрной дыры»!","🌌 افتح بطاقة مدفع الثقب الأسود أولًا!"],
"🚀 קודם צריך לקבל את קלף ה־RPG!":["🚀 Unlock the RPG card first!","🚀 ¡Primero desbloquea la carta RPG!","🚀 Débloque d’abord la carte RPG !","🚀 Schalte zuerst die RPG-Karte frei!","🚀 Сначала получи карту RPG!","🚀 افتح بطاقة RPG أولًا!"],
"🔫 קודם צריך לקבל את קלף השוטגאן!":["🔫 Unlock the Shotgun card first!","🔫 ¡Primero desbloquea la carta Escopeta!","🔫 Débloque d’abord la carte Fusil à pompe !","🔫 Schalte zuerst die Schrotflinten-Karte frei!","🔫 Сначала получи карту «Дробовик»!","🔫 افتح بطاقة البندقية أولًا!"],
"🌌 נגמרו יריות חור שחור!":["🌌 No Black Hole shots left!","🌌 ¡No quedan disparos de agujero negro!","🌌 Plus de tirs de trou noir !","🌌 Keine Schwarzes-Loch-Schüsse mehr!","🌌 Заряды чёрной дыры закончились!","🌌 نفدت طلقات الثقب الأسود!"],
"🚀 נגמרה תחמושת ה־RPG!":["🚀 RPG ammo depleted!","🚀 ¡Se acabó la munición del RPG!","🚀 Munitions RPG épuisées !","🚀 RPG-Munition aufgebraucht!","🚀 Боеприпасы RPG закончились!","🚀 نفدت ذخيرة RPG!"],
"🎯 נגמרה התחמושת!":["🎯 Out of ammo!","🎯 ¡Sin munición!","🎯 Plus de munitions !","🎯 Keine Munition mehr!","🎯 Боеприпасы закончились!","🎯 نفدت الذخيرة!"],
"💥 RPG התפוצץ!":["💥 RPG exploded!","💥 ¡El RPG explotó!","💥 Le RPG a explosé !","💥 RPG explodiert!","💥 RPG взорвался!","💥 انفجر صاروخ RPG!"],
"🌈 מצב אולטרה נפתח!":["🌈 Ultra Mode unlocked!","🌈 ¡Modo Ultra desbloqueado!","🌈 Mode Ultra débloqué !","🌈 Ultra-Modus freigeschaltet!","🌈 Режим Ультра открыт!","🌈 تم فتح وضع ألترا!"],
"🌈 אולטרה לייזר נפתח!":["🌈 Ultra Laser unlocked!","🌈 ¡Láser Ultra desbloqueado!","🌈 Laser Ultra débloqué !","🌈 Ultra-Laser freigeschaltet!","🌈 Ультра-лазер открыт!","🌈 تم فتح ليزر ألترا!"],
"🛡️ כל המגנים מולאו!":["🛡️ All shields restored!","🛡️ ¡Todos los escudos restaurados!","🛡️ Tous les boucliers restaurés !","🛡️ Alle Schilde wiederhergestellt!","🛡️ Все щиты восстановлены!","🛡️ تمت استعادة جميع الدروع!"],
"🌌 +4 יריות חור שחור!":["🌌 +4 Black Hole shots!","🌌 +4 disparos de agujero negro","🌌 +4 tirs de trou noir","🌌 +4 Schwarzes-Loch-Schüsse","🌌 +4 заряда чёрной дыры","🌌 +4 طلقات للثقب الأسود"],
"🌈 אולטרה לייזר הסתיים — טעינה של 20 שניות":["🌈 Ultra Laser ended — 20-second cooldown","🌈 El Láser Ultra terminó: 20 segundos de recarga","🌈 Laser Ultra terminé — recharge de 20 secondes","🌈 Ultra-Laser beendet — 20 Sekunden Abklingzeit","🌈 Ультра-лазер завершён — перезарядка 20 секунд","🌈 انتهى ليزر ألترا — إعادة شحن لمدة 20 ثانية"],
"🛡️ המגן חסם פגיעה!":["🛡️ The shield blocked a hit!","🛡️ ¡El escudo bloqueó un impacto!","🛡️ Le bouclier a bloqué un coup !","🛡️ Der Schild hat einen Treffer abgewehrt!","🛡️ Щит заблокировал удар!","🛡️ صدّ الدرع ضربة!"],
"🌀 התחמקת מהפגיעה!":["🌀 You dodged the hit!","🌀 ¡Esquivaste el impacto!","🌀 Tu as esquivé le coup !","🌀 Du bist dem Treffer ausgewichen!","🌀 Ты уклонился от удара!","🌀 تفاديت الضربة!"],
"💖 ניצלת וחזרת לחיים עם חיים מלאים!":["💖 You were revived with full health!","💖 ¡Has revivido con toda la vida!","💖 Tu es revenu à la vie avec tous tes PV !","💖 Du wurdest mit voller Lebensenergie wiederbelebt!","💖 Ты воскрес с полным здоровьем!","💖 أُعيد إحياؤك بكامل الصحة!"],
"👹 הבוס הובס! ⚡ המשחק מהיר יותר!":["👹 Boss defeated! ⚡ The game is faster!","👹 ¡Jefe derrotado! ⚡ ¡El juego es más rápido!","👹 Boss vaincu ! ⚡ Le jeu est plus rapide !","👹 Boss besiegt! ⚡ Das Spiel ist jetzt schneller!","👹 Босс побеждён! ⚡ Игра ускорилась!","👹 هُزم الزعيم! ⚡ أصبحت اللعبة أسرع!"],
"🛡️ הגעת למספר המגנים המרבי":["🛡️ Maximum shield capacity reached","🛡️ Has alcanzado el máximo de escudos","🛡️ Capacité maximale de boucliers atteinte","🛡️ Maximale Schildanzahl erreicht","🛡️ Достигнут максимум щитов","🛡️ وصلت إلى الحد الأقصى للدروع"],
"🌈 נגמרו נקודות האולטרה — המתן 15 שניות":["🌈 Ultra points depleted — wait 15 seconds","🌈 Se agotaron los puntos Ultra: espera 15 segundos","🌈 Points Ultra épuisés — attends 15 secondes","🌈 Ultra-Punkte aufgebraucht — warte 15 Sekunden","🌈 Очки Ультра закончились — подожди 15 секунд","🌈 نفدت نقاط ألترا — انتظر 15 ثانية"],
"🏆 כל ההישגים הושלמו! +100,000 XP":["🏆 All achievements completed! +100,000 XP","🏆 ¡Todos los logros completados! +100.000 XP","🏆 Tous les succès sont terminés ! +100 000 XP","🏆 Alle Erfolge abgeschlossen! +100.000 XP","🏆 Все достижения выполнены! +100 000 XP","🏆 اكتملت جميع الإنجازات! +100,000 XP"],
"✅ שם המשתמש נשמר!":["✅ Username saved!","✅ ¡Nombre de usuario guardado!","✅ Nom d’utilisateur enregistré !","✅ Benutzername gespeichert!","✅ Имя пользователя сохранено!","✅ تم حفظ اسم المستخدم!"],
"אין עדיין תוצאות. היה הראשון!":["No scores yet. Be the first!","Aún no hay resultados. ¡Sé el primero!","Aucun résultat pour l’instant. Soyez le premier !","Noch keine Ergebnisse. Sei der Erste!","Пока нет результатов. Стань первым!","لا توجد نتائج بعد. كن الأول!"],
"🎮 איך משחקים":["🎮 How to Play","🎮 Cómo jugar","🎮 Comment jouer","🎮 Spielanleitung","🎮 Как играть","🎮 كيفية اللعب"],
"WASD / חצים — תנועה":["WASD / Arrows — Move","WASD / Flechas — Moverse","WASD / Flèches — Déplacement","WASD / Pfeile — Bewegen","WASD / Стрелки — Движение","WASD / الأسهم — الحركة"],
"SPACE — ירי":["SPACE — Shoot","SPACE — Disparar","ESPACE — Tirer","LEERTASTE — Schießen","ПРОБЕЛ — Стрельба","مسافة — إطلاق النار"],
"1 — אקדח | 2 — RPG | 3 — שוטגאן":["1 — Pistol | 2 — RPG | 3 — Shotgun","1 — Pistola | 2 — RPG | 3 — Escopeta","1 — Pistolet | 2 — RPG | 3 — Fusil à pompe","1 — Pistole | 2 — RPG | 3 — Schrotflinte","1 — Пистолет | 2 — RPG | 3 — Дробовик","1 — مسدس | 2 — RPG | 3 — بندقية"],
"4 — להביור | 5 — לייזר | 6 — רובה חור שחור":["4 — Flamethrower | 5 — Laser | 6 — Black Hole Gun","4 — Lanzallamas | 5 — Láser | 6 — Cañón de agujero negro","4 — Lance-flammes | 5 — Laser | 6 — Canon à trou noir","4 — Flammenwerfer | 5 — Laser | 6 — Schwarzes-Loch-Kanone","4 — Огнемёт | 5 — Лазер | 6 — Пушка чёрной дыры","4 — قاذف اللهب | 5 — ليزر | 6 — مدفع الثقب الأسود"],
"Q — RPG | R — שוטגאן | F — להביור":["Q — RPG | R — Shotgun | F — Flamethrower","Q — RPG | R — Escopeta | F — Lanzallamas","Q — RPG | R — Fusil à pompe | F — Lance-flammes","Q — RPG | R — Schrotflinte | F — Flammenwerfer","Q — RPG | R — Дробовик | F — Огнемёт","Q — RPG | R — بندقية | F — قاذف اللهب"],
"E — נשק רגיל | L — לייזר":["E — Regular Weapon | L — Laser","E — Arma normal | L — Láser","E — Arme normal | L — Laser","E — Normale Waffe | L — Laser","E — Обычное оружие | L — Лазер","E — السلاح العادي | L — ليزر"],
"P — עצירה / המשך":["P — Pause / Resume","P — Pausar / Continuar","P — Pause / Reprendre","P — Pause / Fortsetzen","P — Пауза / Продолжить","P — إيقاف مؤقت / متابعة"],
"Esc — סגירת חלון פתוח או המשך משחק":["Esc — Close an open window or resume the game","Esc — Cerrar una ventana o reanudar el juego","Échap — Fermer une fenêtre ou reprendre la partie","Esc — Fenster schließen oder Spiel fortsetzen","Esc — Закрыть окно или продолжить игру","Esc — إغلاق نافذة مفتوحة أو متابعة اللعبة"],
"📖 נפתח באוסף:":["📖 Added to the collection:","📖 Añadido a la colección:","📖 Ajouté à la collection :","📖 Zur Sammlung hinzugefügt:","📖 Добавлено в коллекцию:","📖 أُضيف إلى المجموعة:"],
"🛸 מקסימום מיני חלליות:":["🛸 Maximum mini ships:","🛸 Máximo de mini naves:","🛸 Nombre maximal de mini-vaisseaux :","🛸 Maximale Mini-Raumschiffe:","🛸 Максимум мини-кораблей:","🛸 الحد الأقصى للسفن الصغيرة:"],
"🛡️ מגן נוסף ממצב אולטרה!":["🛡️ Extra shield from Ultra Mode!","🛡️ ¡Escudo adicional del modo Ultra!","🛡️ Bouclier supplémentaire du mode Ultra !","🛡️ Zusätzlicher Schild durch den Ultra-Modus!","🛡️ Дополнительный щит от режима Ультра!","🛡️ درع إضافي من وضع ألترا!"],
"💥 נפגעת! ❤️":["💥 Hit! ❤️","💥 ¡Te han golpeado! ❤️","💥 Touché ! ❤️","💥 Getroffen! ❤️","💥 Получен урон! ❤️","💥 تعرضت لضربة! ❤️"],
"💥 פגיעה חזקה! ❤️":["💥 Heavy hit! ❤️","💥 ¡Golpe fuerte! ❤️","💥 Coup puissant ! ❤️","💥 Schwerer Treffer! ❤️","💥 Сильный удар! ❤️","💥 ضربة قوية! ❤️"],
"🛸 מיני חלליות":["🛸 Mini ships","🛸 Mini naves","🛸 Mini-vaisseaux","🛸 Mini-Raumschiffe","🛸 Мини-корабли","🛸 سفن صغيرة"],
"שחקן":["Player","Jugador","Joueur","Spieler","Игрок","لاعب"],
"⚠️ אזור מסוכן":["⚠️ Danger Zone","⚠️ Zona peligrosa","⚠️ Zone dangereuse","⚠️ Gefahrenzone","⚠️ Опасная зона","⚠️ منطقة خطرة"],
"🟣 ערפילית":["🟣 Nebula","🟣 Nebulosa","🟣 Nébuleuse","🟣 Nebel","🟣 Туманность","🟣 سديم"],
"☠️ אזור קטלני":["☠️ Deadly Zone","☠️ Zona mortal","☠️ Zone mortelle","☠️ Tödliche Zone","☠️ Смертельная зона","☠️ منطقة قاتلة"],
"🌑 החלל האפל":["🌑 Dark Space","🌑 Espacio oscuro","🌑 Espace sombre","🌑 Dunkler Weltraum","🌑 Тёмный космос","🌑 الفضاء المظلم"],
"👥 שחקנים ששיחקו אי פעם: 0":["👥 Players who have ever played: 0","👥 Jugadores que han jugado alguna vez: 0","👥 Joueurs ayant déjà joué : 0","👥 Spieler insgesamt: 0","👥 Всего игроков: 0","👥 اللاعبون الذين لعبوا من قبل: 0"],
"חלליות שמסתובבות סביב השחקן ויורות קרני לייזר לעבר אויבים. כל רמה מוסיפה חללית נוספת.":["Ships that orbit the player and fire laser beams at enemies. Each level adds another ship.","Naves que orbitan alrededor del jugador y disparan rayos láser a los enemigos. Cada nivel añade otra nave.","Des vaisseaux qui tournent autour du joueur et tirent des rayons laser sur les ennemis. Chaque niveau ajoute un vaisseau.","Raumschiffe, die den Spieler umkreisen und Laserstrahlen auf Gegner abfeuern. Jede Stufe fügt ein weiteres Schiff hinzu.","Корабли, вращающиеся вокруг игрока и стреляющие лазерными лучами по врагам. Каждый уровень добавляет ещё один корабль.","سفن تدور حول اللاعب وتطلق أشعة ليزر على الأعداء. يضيف كل مستوى سفينة أخرى."],
"שדרוג ללייזר שכבר פתחת. רמה I: נזק התחלתי 100% ונזק מרחבי מרבי 200% מהלייזר הרגיל, התחממות תוך 9 שניות וקירור תוך 11 שניות. בכל רמה: הנזק ההתחלתי עולה ב־25%, הנזק המרחבי ב־50%, זמן ההתחממות מתקצר בשנייה וזמן הקירור מתארך בשנייה. עד רמה V.":["An upgrade for the laser you already unlocked. Level I: 100% initial damage and 200% maximum area damage compared with the regular laser; heats up in 9 seconds and cools down in 11 seconds. Each level increases initial damage by 25%, area damage by 50%, shortens heating time by 1 second, and lengthens cooldown by 1 second. Up to level V.","Mejora del láser que ya desbloqueaste. Nivel I: daño inicial del 100% y daño de área máximo del 200% respecto al láser normal; se calienta en 9 segundos y se enfría en 11. Cada nivel aumenta el daño inicial un 25%, el daño de área un 50%, reduce el tiempo de calentamiento 1 segundo y aumenta el enfriamiento 1 segundo. Hasta el nivel V.","Amélioration du laser déjà débloqué. Niveau I : dégâts initiaux de 100 % et dégâts de zone maximaux de 200 % par rapport au laser normal ; chauffe en 9 secondes et refroidit en 11 secondes. Chaque niveau augmente les dégâts initiaux de 25 %, les dégâts de zone de 50 %, réduit le temps de chauffe d’une seconde et augmente le temps de recharge d’une seconde. Jusqu’au niveau V.","Upgrade für den bereits freigeschalteten Laser. Stufe I: 100 % Anfangsschaden und 200 % maximaler Flächenschaden im Vergleich zum normalen Laser; Aufheizzeit 9 Sekunden, Abkühlzeit 11 Sekunden. Jede Stufe erhöht den Anfangsschaden um 25 % und den Flächenschaden um 50 %, verkürzt die Aufheizzeit um 1 Sekunde und verlängert die Abklingzeit um 1 Sekunde. Bis Stufe V.","Улучшение уже открытого лазера. Уровень I: начальный урон 100% и максимальный урон по области 200% от обычного лазера; нагрев за 9 секунд и охлаждение за 11 секунд. Каждый уровень увеличивает начальный урон на 25%, урон по области на 50%, сокращает время нагрева на 1 секунду и увеличивает время перезарядки на 1 секунду. До уровня V.","ترقية لليزر الذي فتحته بالفعل. المستوى I: ضرر ابتدائي 100% وضرر منطقة أقصى 200% مقارنة بالليزر العادي؛ يسخن خلال 9 ثوانٍ ويبرد خلال 11 ثانية. يزيد كل مستوى الضرر الابتدائي 25% وضرر المنطقة 50%، ويقلل وقت التسخين ثانية واحدة ويزيد وقت التبريد ثانية واحدة. حتى المستوى V."],
"פגיעה יכולה להצית אויב או מטאוריט. הנזק הכולל מתחיל ב־50% מנזק הפגיעה ועולה עד 95% ברמה X. כל פגיעה מוצלחת נוספת מגדילה את הנזק המצטבר ומקצרת את משך הצריבה ב־25%. סיכוי ההצתה מתחיל ב־20% ועולה עד 65%; סיכויי ההמשך יורדים לפי הרמה. אם פגיעה חוזרת נכשלת או שלא פוגעים בזמן, הצריבה נעלמת. בוסים סופגים רבע מהנזק.":["Each hit can ignite an enemy or meteorite. Total damage starts at 50% of the hit damage and rises to 95% at level X. Each additional successful hit increases accumulated damage and shortens the burn duration by 25%. Ignition chance starts at 20% and rises to 65%; follow-up chances decrease by level. If a repeated hit fails or no hit lands in time, the burn disappears. Bosses take one quarter damage.","Cada impacto puede prender fuego a un enemigo o meteorito. El daño total comienza en el 50% del daño del impacto y aumenta hasta el 95% en el nivel X. Cada impacto exitoso adicional aumenta el daño acumulado y reduce la duración de la quemadura un 25%. La probabilidad de ignición empieza en el 20% y sube hasta el 65%; las probabilidades posteriores disminuyen según el nivel. Si falla un impacto repetido o no se golpea a tiempo, la quemadura desaparece. Los jefes reciben una cuarta parte del daño.","Chaque coup peut enflammer un ennemi ou une météorite. Les dégâts totaux commencent à 50 % des dégâts du coup et montent jusqu’à 95 % au niveau X. Chaque coup réussi supplémentaire augmente les dégâts cumulés et réduit la durée de brûlure de 25 %. La chance d’embrasement commence à 20 % et monte jusqu’à 65 % ; les chances suivantes diminuent selon le niveau. Si un coup répété échoue ou qu’aucun coup ne touche à temps, la brûlure disparaît. Les boss subissent un quart des dégâts.","Jeder Treffer kann einen Gegner oder Meteoriten entzünden. Der Gesamtschaden beginnt bei 50 % des Trefferschadens und steigt auf 95 % auf Stufe X. Jeder weitere erfolgreiche Treffer erhöht den angesammelten Schaden und verkürzt die Brenndauer um 25 %. Die Entzündungswahrscheinlichkeit beginnt bei 20 % und steigt auf 65 %; weitere Chancen sinken je nach Stufe. Wenn ein wiederholter Treffer fehlschlägt oder nicht rechtzeitig getroffen wird, verschwindet der Brand. Bosse erleiden ein Viertel des Schadens.","Каждое попадание может поджечь врага или метеорит. Общий урон начинается с 50% урона попадания и повышается до 95% на уровне X. Каждое дополнительное успешное попадание увеличивает накопленный урон и сокращает длительность горения на 25%. Шанс поджога начинается с 20% и растёт до 65%; последующие шансы снижаются в зависимости от уровня. Если повторное попадание не удалось или цель не была поражена вовремя, горение исчезает. Боссы получают четверть урона.","يمكن لكل إصابة إشعال عدو أو نيزك. يبدأ الضرر الإجمالي عند 50% من ضرر الإصابة ويصل إلى 95% في المستوى X. تزيد كل إصابة ناجحة إضافية الضرر المتراكم وتقلل مدة الاحتراق 25%. يبدأ احتمال الإشعال من 20% ويصل إلى 65%؛ وتنخفض احتمالات الإشعال اللاحقة حسب المستوى. إذا فشلت إصابة متكررة أو لم تحدث إصابة في الوقت المناسب، يختفي الاحتراق. يتلقى الزعماء ربع الضرر."],
"כל פגיעה יכולה להקפיא את האויב. רמה I מתחילה ב־10% סיכוי, 25% האטה ו־4 שניות. בכל בחירה הסיכוי והעוצמה ×1.5 והזמן ×1.33 (עד 90% האטה).":["Every hit can freeze the enemy. Level I starts with a 10% chance, 25% slow, and 4 seconds. With each selection, the chance and strength are multiplied by ×1.5 and the duration by ×1.33 (up to 90% slow).","Cada impacto puede congelar al enemigo. El nivel I comienza con un 10% de probabilidad, un 25% de ralentización y 4 segundos. Con cada elección, la probabilidad y la intensidad se multiplican por ×1,5 y la duración por ×1,33 (hasta un 90% de ralentización).","Chaque coup peut geler l’ennemi. Le niveau I commence avec 10 % de chances, 25 % de ralentissement et 4 secondes. À chaque sélection, les chances et la puissance sont multipliées par ×1,5 et la durée par ×1,33 (jusqu’à 90 % de ralentissement).","Jeder Treffer kann den Gegner einfrieren. Stufe I beginnt mit 10 % Chance, 25 % Verlangsamung und 4 Sekunden. Bei jeder Auswahl werden Chance und Stärke mit ×1,5 und die Dauer mit ×1,33 multipliziert (bis zu 90 % Verlangsamung).","Каждое попадание может заморозить врага. Уровень I начинается с вероятности 10%, замедления на 25% и длительности 4 секунды. При каждом выборе шанс и сила умножаются на ×1,5, а длительность — на ×1,33 (замедление до 90%).","يمكن لكل إصابة تجميد العدو. يبدأ المستوى I باحتمال 10% وإبطاء 25% ومدة 4 ثوانٍ. مع كل اختيار، يتضاعف الاحتمال والقوة ×1.5 والمدة ×1.33 (حتى إبطاء 90%)."],
"כל פגיעה יכולה לשתק אויב שאינו בוס. רמה I: 5% סיכוי ו־1 שנייה. בכל בחירה הסיכוי ומשך השיתוק ×1.5. בזמן השיתוק האויב לא מתקדם ולא יורה ומסתובב ברדיוס של 15% מגודלו.":["Every hit can stun a non-boss enemy. Level I: 5% chance and 1 second. Each selection multiplies the chance and stun duration by ×1.5. While stunned, the enemy cannot move or shoot and rotates within a radius equal to 15% of its size.","Cada impacto puede aturdir a un enemigo que no sea jefe. Nivel I: 5% de probabilidad y 1 segundo. Cada elección multiplica la probabilidad y la duración del aturdimiento por ×1,5. Mientras está aturdido, el enemigo no se mueve ni dispara y gira dentro de un radio equivalente al 15% de su tamaño.","Chaque coup peut étourdir un ennemi qui n’est pas un boss. Niveau I : 5 % de chances et 1 seconde. Chaque sélection multiplie les chances et la durée de l’étourdissement par ×1,5. Étourdi, l’ennemi ne bouge pas et ne tire pas ; il tourne dans un rayon égal à 15 % de sa taille.","Jeder Treffer kann einen Gegner betäuben, der kein Boss ist. Stufe I: 5 % Chance und 1 Sekunde. Jede Auswahl multipliziert Chance und Betäubungsdauer mit ×1,5. Während der Betäubung bewegt sich der Gegner nicht und schießt nicht, sondern dreht sich in einem Radius von 15 % seiner Größe.","Каждое попадание может оглушить врага, который не является боссом. Уровень I: шанс 5% и длительность 1 секунда. При каждом выборе шанс и длительность оглушения умножаются на ×1,5. Во время оглушения враг не движется и не стреляет, а вращается в радиусе 15% от своего размера.","يمكن لكل إصابة شلّ عدو ليس زعيمًا. المستوى I: احتمال 5% ومدة ثانية واحدة. يزيد كل اختيار الاحتمال ومدة الشلل بمقدار ×1.5. أثناء الشلل لا يتحرك العدو ولا يطلق النار، بل يدور ضمن نصف قطر يساوي 15% من حجمه."],
"כל פגיעה רצופה באותו אויב מגדילה את נזק הפגיעה הבאה ב־20% מהנזק הקודם. כל שדרוג מוסיף עוד 20 נקודות אחוז לצמיחת הנזק. הפסקה של יותר מ־1.5 שניות מאפסת את הרצף.":["Each consecutive hit on the same enemy increases the next hit's damage by 20% of the previous hit's damage. Each upgrade adds another 20 percentage points to damage growth. A pause of more than 1.5 seconds resets the streak.","Cada impacto consecutivo al mismo enemigo aumenta el daño del siguiente impacto un 20% del daño anterior. Cada mejora añade otros 20 puntos porcentuales al crecimiento del daño. Una pausa de más de 1,5 segundos reinicia la racha.","Chaque coup consécutif sur le même ennemi augmente les dégâts du coup suivant de 20 % par rapport au coup précédent. Chaque amélioration ajoute 20 points de pourcentage à la croissance des dégâts. Une pause de plus de 1,5 seconde réinitialise la série.","Jeder aufeinanderfolgende Treffer desselben Gegners erhöht den Schaden des nächsten Treffers um 20 % des vorherigen Schadens. Jedes Upgrade fügt dem Schadenswachstum weitere 20 Prozentpunkte hinzu. Eine Pause von mehr als 1,5 Sekunden setzt die Serie zurück.","Каждое последовательное попадание по одному и тому же врагу увеличивает урон следующего попадания на 20% от урона предыдущего. Каждое улучшение добавляет ещё 20 процентных пунктов к росту урона. Пауза более 1,5 секунды сбрасывает серию.","كل إصابة متتالية للعدو نفسه تزيد ضرر الإصابة التالية بنسبة 20% من ضرر الإصابة السابقة. تضيف كل ترقية 20 نقطة مئوية أخرى إلى نمو الضرر. تؤدي فترة توقف تزيد عن 1.5 ثانية إلى إعادة ضبط السلسلة."],
"🌀 בלבול":["🌀 Confusion","🌀 Confusión","🌀 Confusion","🌀 Verwirrung","🌀 Замешательство","🌀 ارتباك"],
"🃏 בחירה מורחבת":["🃏 Expanded Choice","🃏 Elección ampliada","🃏 Choix étendu","🃏 Erweiterte Auswahl","🃏 Расширенный выбор","🃏 اختيار موسّع"],
"אקדח":["Pistol","Pistola","Pistolet","Pistole","Пистолет","مسدس"]
});
// Exact source strings used by the live achievement, profile, and leaderboard renderers.
Object.assign(ui,{
  "הישגים רגילים":["Common Achievements","Logros comunes","Succès courants","Gewöhnliche Erfolge","Обычные достижения","الإنجازات العادية"],
  "הישגים נדירים":["Rare Achievements","Logros raros","Succès rares","Seltene Erfolge","Редкие достижения","الإنجازات النادرة"],
  "הישגים אדירים":["Epic Achievements","Logros épicos","Succès épiques","Epische Erfolge","Эпические достижения","الإنجازات الملحمية"],
  "הישגים אגדיים":["Legendary Achievements","Logros legendarios","Succès légendaires","Legendäre Erfolge","Легендарные достижения","الإنجازات الأسطورية"],
  "הישגים מדהימים":["Amazing Achievements","Logros asombrosos","Succès incroyables","Fantastische Erfolge","Удивительные достижения","الإنجازات المذهلة"],
  "⭐ רמת שחקן":["⭐ Player Level","⭐ Nivel del jugador","⭐ Niveau du joueur","⭐ Spielerlevel","⭐ Уровень игрока","⭐ مستوى اللاعب"],
  "רמת שחקן":["Player Level","Nivel del jugador","Niveau du joueur","Spielerlevel","Уровень игрока","مستوى اللاعب"],
  "XP כולל":["Total XP","XP total","XP total","Gesamt-XP","Всего XP","إجمالي XP"],
  "XP לרמה הבאה":["XP to next level","XP para el siguiente nivel","XP avant le niveau suivant","XP bis zum nächsten Level","XP до следующего уровня","XP للمستوى التالي"],
  "🟢 קל":["🟢 Easy","🟢 Fácil","🟢 Facile","🟢 Einfach","🟢 Легко","🟢 سهل"],
  "⚪ בינוני":["⚪ Normal","⚪ Normal","⚪ Normal","⚪ Normal","⚪ Средне","⚪ متوسط"],
  "🟠 קשה":["🟠 Hard","🟠 Difícil","🟠 Difficile","🟠 Schwer","🟠 Сложно","🟠 صعب"],
  "🔴 סופר קשה":["🔴 Super Hard","🔴 Muy difícil","🔴 Très difficile","🔴 Sehr schwer","🔴 Очень сложно","🔴 صعب جدًا"],
  "⚫ בלתי אפשרי":["⚫ Impossible","⚫ Imposible","⚫ Impossible","⚫ Unmöglich","⚫ Невозможно","⚫ مستحيل"]
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
  "deadlyLoot": {
    "title": ["Deadly Loot", "Botín mortal", "Butin mortel", "Tödliche Beute", "Смертельная добыча", "غنائم قاتلة"],
    "description": [
      "Enemies, meteorites and bosses may drop lives, shields, XP, ammo or Rage. Pickups fall downward; touch them before they disappear.",
      "Los enemigos, meteoritos y jefes pueden soltar vidas, escudos, XP, munición o Furia. Los objetos caen; tócalos antes de que desaparezcan.",
      "Les ennemis, météorites et boss peuvent lâcher des vies, des boucliers, de l’XP, des munitions ou de la Rage. Les objets tombent : touchez-les avant leur disparition.",
      "Gegner, Meteoriten und Bosse können Leben, Schilde, XP, Munition oder Wut fallen lassen. Die Beute fällt nach unten – berühre sie, bevor sie verschwindet.",
      "Враги, метеориты и боссы могут оставлять жизни, щиты, XP, боеприпасы или Ярость. Предметы падают вниз — коснитесь их, пока они не исчезли.",
      "قد يُسقط الأعداء والنيازك والزعماء أرواحًا ودروعًا ونقاط خبرة وذخيرة أو غضبًا. تسقط العناصر إلى الأسفل؛ المسها قبل اختفائها."
    ],
    "sourceTitle": "שלל קטלני",
    "sourceDescription": "אויבים, מטאוריטים ובוסים עשויים להפיל חיים, מגנים, XP, תחמושת או זעם. הפרסים נופלים למטה — גע בהם לפני שייעלמו."
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
  "infernoBomb": {
    "title": ["Inferno Bomb","Bomba infernal","Bombe infernale","Höllenbombe","Адская бомба","قنبلة الجحيم"],
    "description": ["Aim and click to lock a target. The bomb launches after one second and creates a damaging fire zone. Enemies and meteorites burn; you are immune to your own fire.","Apunta y haz clic para fijar el objetivo. La bomba se lanza tras un segundo y crea una zona de fuego dañina. Los enemigos y meteoritos arden; eres inmune a tu propio fuego.","Visez et cliquez pour verrouiller la cible. La bombe part après une seconde et crée une zone de feu qui inflige des dégâts. Les ennemis et météorites brûlent ; vous êtes immunisé contre votre propre feu.","Zielen und klicken, um das Ziel festzulegen. Die Bombe startet nach einer Sekunde und erzeugt eine schädliche Feuerzone. Gegner und Meteoriten brennen; du bist gegen dein eigenes Feuer immun.","Наведитесь и щёлкните, чтобы зафиксировать цель. Бомба запускается через секунду и создаёт огненную зону, наносящую урон. Враги и метеориты горят; вы невосприимчивы к собственному огню.","صوّب وانقر لتثبيت الهدف. تنطلق القنبلة بعد ثانية وتنشئ منطقة نارية مؤذية. تحترق الأعداء والنيازك، وأنت محصّن ضد نارك."]
    ,
    "sourceTitle": "פצצת תופת",
    "sourceDescription": "כוון עם העכבר ולחץ כדי לנעול מטרה. הפצצה נזרקת כעבור שנייה ויוצרת אזור אש שפוגע באויבים ובמטאוריטים. ביציאה מהאש נגרם נזק נוסף. השחקן חסין לאש שלו."
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
  "ultraMiniShip": {
    "title": [
      "Ultra Mini Ship",
      "Mini nave Ultra",
      "Mini-vaisseau Ultra",
      "Ultra-Mini-Raumschiff",
      "Ультра-мини-корабль",
      "سفينة ألترا صغيرة"
    ],
    "description": [
      "Spaceships that orbit the player and fire laser beams at enemies. Each level adds another spaceship.",
      "Naves que orbitan al jugador y disparan rayos láser a los enemigos. Cada nivel añade otra nave.",
      "Des vaisseaux qui tournent autour du joueur et tirent des rayons laser sur les ennemis. Chaque niveau ajoute un vaisseau supplémentaire.",
      "Raumschiffe, die den Spieler umkreisen und Laserstrahlen auf Gegner abfeuern. Jede Stufe fügt ein weiteres Raumschiff hinzu.",
      "Корабли, вращающиеся вокруг игрока и стреляющие лазерными лучами по врагам. Каждый уровень добавляет ещё один корабль.",
      "سفن تدور حول اللاعب وتطلق أشعة ليزر على الأعداء. يضيف كل مستوى سفينة أخرى."
    ],
    "sourceTitle": "אולטרה מיני חללית",
    "sourceDescription": "חלליות שמסתובבות סביב השחקן ויורות קרני לייזר לעבר אויבים. כל רמה מוסיפה חללית נוספת."
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
