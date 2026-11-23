--!strict
-- GALAXY DEFENDER — Roblox / Luau port
-- Place this LocalScript in StarterPlayer > StarterPlayerScripts.
-- Profile identity is the Roblox username. Translation and the original account system are excluded.
-- This is an expanded playable conversion foundation; it is not yet a line-for-line port
-- of every browser feature (global Supabase leaderboard, every original card/effect,
-- all special boss phases, and persistent cross-session stats still need dedicated ports).

local Players = game:GetService("Players")
local UIS = game:GetService("UserInputService")
local RunService = game:GetService("RunService")
local TweenService = game:GetService("TweenService")

local player = Players.LocalPlayer
local rng = Random.new()
local oldGui = player:WaitForChild("PlayerGui"):FindFirstChild("GalaxyDefenderGui")
if oldGui then oldGui:Destroy() end

local C = {
	bg = Color3.fromRGB(5, 7, 17), panel = Color3.fromRGB(12, 18, 39),
	ship = Color3.fromRGB(76, 201, 240), white = Color3.fromRGB(245, 250, 255),
	red = Color3.fromRGB(255, 45, 75), orange = Color3.fromRGB(255, 150, 55),
	purple = Color3.fromRGB(170, 70, 255), green = Color3.fromRGB(65, 235, 130),
	gold = Color3.fromRGB(255, 210, 26), blue = Color3.fromRGB(60, 150, 255),
}
local DIFFICULTIES = {
	Easy = {hp=.5, xp=1.5, lives=5, color=Color3.fromRGB(0,255,136), bg=Color3.fromRGB(4,35,20)},
	Normal = {hp=1, xp=1, lives=3, color=C.ship, bg=C.bg},
	Hard = {hp=1.5, xp=.75, lives=3, color=C.orange, bg=Color3.fromRGB(45,18,2)},
	Super = {hp=2, xp=.5, lives=2, color=C.red, bg=Color3.fromRGB(45,0,10)},
	Impossible = {hp=3, xp=.25, lives=1, color=C.purple, bg=Color3.fromRGB(0,0,0)},
}
local difficultyName = "Normal"
local difficulty = DIFFICULTIES[difficultyName]

local function make(className: string, props: {[string]: any}, parent: Instance): any
	local obj = Instance.new(className)
	for k,v in pairs(props) do (obj :: any)[k] = v end
	obj.Parent = parent
	return obj
end
local function corner(parent: Instance, radius: number?)
	make("UICorner", {CornerRadius=UDim.new(0,radius or 10)}, parent)
end
local function stroke(parent: Instance, color: Color3, thickness: number?)
	make("UIStroke", {Color=color, Thickness=thickness or 1.5, Transparency=.1}, parent)
end

local gui = make("ScreenGui", {Name="GalaxyDefenderGui", IgnoreGuiInset=true, ResetOnSpawn=false, ZIndexBehavior=Enum.ZIndexBehavior.Sibling}, player.PlayerGui)
local arena = make("Frame", {Name="Arena", Size=UDim2.fromScale(1,1), BackgroundColor3=difficulty.bg, BorderSizePixel=0, ClipsDescendants=true}, gui)

-- Procedural starfield (2D GUI, not a 3D Roblox character).
local stars = {}
for i=1,190 do
	local s = rng:NextInteger(1,3)
	local star = make("Frame", {Size=UDim2.fromOffset(s,s), Position=UDim2.fromScale(rng:NextNumber(),rng:NextNumber()),
		BackgroundColor3=Color3.fromRGB(190,210,255), BackgroundTransparency=rng:NextNumber(.15,.72), BorderSizePixel=0}, arena)
	table.insert(stars, {ui=star, drift=rng:NextNumber(8,28)})
end

local hud = make("Frame", {Size=UDim2.new(1,-20,0,44), Position=UDim2.fromOffset(10,8), BackgroundTransparency=1}, arena)
local function hudLabel(name: string, x: number, width: number, value: string)
	local l=make("TextLabel",{Name=name,Size=UDim2.fromOffset(width,38),Position=UDim2.fromOffset(x,0),
		BackgroundColor3=Color3.new(0,0,0),BackgroundTransparency=.2,Text=value,TextColor3=C.white,
		TextSize=14,Font=Enum.Font.GothamBold,BorderSizePixel=0},hud)
	corner(l,8); stroke(l,C.ship,1)
	return l
end
local profileLabel = hudLabel("Profile",0,190,"PROFILE: "..player.Name)
local scoreLabel = hudLabel("Score",198,120,"SCORE: 0")
local livesLabel = hudLabel("Lives",326,100,"LIVES: 3")
local levelLabel = hudLabel("Level",434,100,"LEVEL: 1")
local distanceLabel = hudLabel("Distance",542,130,"0 m")
local weaponLabel = hudLabel("Weapon",680,180,"WEAPON: PISTOL")

local xpBack=make("Frame",{Size=UDim2.fromOffset(340,14),Position=UDim2.new(.5,-170,0,55),BackgroundColor3=Color3.fromRGB(35,40,55),BorderSizePixel=0},arena)
corner(xpBack,10)
local xpFill=make("Frame",{Size=UDim2.fromScale(0,1),BackgroundColor3=C.green,BorderSizePixel=0},xpBack); corner(xpFill,10)
local xpText=make("TextLabel",{Size=UDim2.fromOffset(260,20),Position=UDim2.new(.5,-130,0,72),BackgroundTransparency=1,Text="LEVEL 1  •  0 / 100 XP",TextColor3=C.white,TextSize=13,Font=Enum.Font.GothamBold},arena)

local centerMessage=make("TextLabel",{Size=UDim2.new(.8,0,0,48),Position=UDim2.new(.1,0,.18,0),BackgroundTransparency=1,Text="GALAXY DEFENDER",TextColor3=C.white,TextSize=28,Font=Enum.Font.GothamBlack,TextStrokeTransparency=.45},arena)
local function message(text: string)
	centerMessage.Text=text; centerMessage.TextTransparency=0
	task.delay(1.6,function()
		if centerMessage.Parent then TweenService:Create(centerMessage,TweenInfo.new(.45),{TextTransparency=1}):Play() end
	end)
end

local ship=make("Frame",{Name="PlayerShip",Size=UDim2.fromOffset(48,52),AnchorPoint=Vector2.new(.5,.5),Position=UDim2.new(.5,0,.82,0),BackgroundTransparency=1},arena)
local shipBody=make("Frame",{Size=UDim2.fromOffset(13,42),Position=UDim2.new(.5,-6.5,0,5),BackgroundColor3=C.ship,BorderSizePixel=0},ship)
local wingL=make("Frame",{Size=UDim2.fromOffset(19,10),Position=UDim2.new(.5,-23,0,31),Rotation=-18,BackgroundColor3=C.ship,BorderSizePixel=0},ship)
local wingR=make("Frame",{Size=UDim2.fromOffset(19,10),Position=UDim2.new(.5,4,0,31),Rotation=18,BackgroundColor3=C.ship,BorderSizePixel=0},ship)
local cockpit=make("Frame",{Size=UDim2.fromOffset(7,15),Position=UDim2.new(.5,-3.5,0,8),BackgroundColor3=C.white,BorderSizePixel=0},ship); corner(cockpit,5)
local flame=make("Frame",{Size=UDim2.fromOffset(9,13),Position=UDim2.new(.5,-4.5,0,43),BackgroundColor3=C.orange,BorderSizePixel=0},ship)

local function button(parent: Instance, text: string, size: UDim2, pos: UDim2, color: Color3?): TextButton
	local b=make("TextButton",{Size=size,Position=pos,BackgroundColor3=color or C.ship,Text=text,TextColor3=Color3.fromRGB(3,8,18),
		TextSize=16,Font=Enum.Font.GothamBold,BorderSizePixel=0,AutoButtonColor=true},parent)
	corner(b,10); return b
end
local function panel(name: string, width: number, height: number)
	local p=make("Frame",{Name=name,Size=UDim2.fromOffset(width,height),AnchorPoint=Vector2.new(.5,.5),Position=UDim2.fromScale(.5,.5),
		BackgroundColor3=C.panel,BorderSizePixel=0,Visible=false,ZIndex=20},arena)
	corner(p,18); stroke(p,C.ship,2); return p
end
local startPanel=panel("StartMenu",480,390); startPanel.Visible=true
local startTitle=make("TextLabel",{Size=UDim2.new(1,-30,0,55),Position=UDim2.fromOffset(15,14),BackgroundTransparency=1,Text="🚀 GALAXY DEFENDER 🚀",TextColor3=C.ship,TextSize=26,Font=Enum.Font.GothamBlack,ZIndex=21},startPanel)
local startSub=make("TextLabel",{Size=UDim2.new(1,-40,0,32),Position=UDim2.fromOffset(20,70),BackgroundTransparency=1,Text="Profile: "..player.Name,TextColor3=C.white,TextSize=15,Font=Enum.Font.GothamBold,ZIndex=21},startPanel)
local diffLabel=make("TextLabel",{Size=UDim2.new(1,-30,0,25),Position=UDim2.fromOffset(15,108),BackgroundTransparency=1,Text="DIFFICULTY: NORMAL",TextColor3=C.gold,TextSize=15,Font=Enum.Font.GothamBold,ZIndex=21},startPanel)
local startBtn=button(startPanel,"PLAY",UDim2.fromOffset(210,48),UDim2.new(.5,-105,0,150),C.green); startBtn.ZIndex=22
local diffBtn=button(startPanel,"CHANGE DIFFICULTY",UDim2.fromOffset(210,42),UDim2.new(.5,-105,0,210)); diffBtn.ZIndex=22
local helpBtn=button(startPanel,"CONTROLS & HELP",UDim2.fromOffset(210,42),UDim2.new(.5,-105,0,260)); helpBtn.ZIndex=22
local profileBtn=button(startPanel,"PROFILE",UDim2.fromOffset(210,42),UDim2.new(.5,-105,0,310)); profileBtn.ZIndex=22

local pausePanel=panel("PauseMenu",360,230)
local pauseTitle=make("TextLabel",{Size=UDim2.new(1,0,0,48),BackgroundTransparency=1,Text="PAUSED",TextColor3=C.ship,TextSize=26,Font=Enum.Font.GothamBlack,ZIndex=21},pausePanel)
local resumeBtn=button(pausePanel,"RESUME",UDim2.fromOffset(190,42),UDim2.new(.5,-95,0,75),C.green); resumeBtn.ZIndex=22
local quitBtn=button(pausePanel,"MAIN MENU",UDim2.fromOffset(190,42),UDim2.new(.5,-95,0,130)); quitBtn.ZIndex=22

local profilePanel=panel("ProfilePanel",390,250)
local profileTitle=make("TextLabel",{Size=UDim2.new(1,0,0,45),BackgroundTransparency=1,Text="PLAYER PROFILE",TextColor3=C.ship,TextSize=23,Font=Enum.Font.GothamBlack,ZIndex=21},profilePanel)
local profileInfo=make("TextLabel",{Size=UDim2.new(1,-30,0,100),Position=UDim2.fromOffset(15,55),BackgroundTransparency=1,Text="ROBLOX USERNAME\n"..player.Name.."\nYour Roblox username is used as your profile.",TextColor3=C.white,TextSize=16,Font=Enum.Font.GothamBold,ZIndex=21},profilePanel)
local profileClose=button(profilePanel,"CLOSE",UDim2.fromOffset(150,40),UDim2.new(.5,-75,1,-55)); profileClose.ZIndex=22

local helpPanel=panel("HelpPanel",440,300)
local helpTitle=make("TextLabel",{Size=UDim2.new(1,0,0,45),BackgroundTransparency=1,Text="CONTROLS",TextColor3=C.ship,TextSize=24,Font=Enum.Font.GothamBlack,ZIndex=21},helpPanel)
local helpText=make("TextLabel",{Size=UDim2.new(1,-30,1,-105),Position=UDim2.fromOffset(15,55),BackgroundTransparency=1,Text="MOVE: WASD / ARROW KEYS\nFIRE: SPACE\nWEAPONS: 1 PISTOL • 2 RPG • 3 SHOTGUN • 4 LASER • 5 FLAMETHROWER\nPAUSE: P / ESC\nULTRA: RIGHT MOUSE BUTTON (when unlocked)",TextColor3=C.white,TextSize=15,Font=Enum.Font.GothamBold,TextWrapped=true,ZIndex=21},helpPanel)
local helpClose=button(helpPanel,"CLOSE",UDim2.fromOffset(150,40),UDim2.new(.5,-75,1,-55)); helpClose.ZIndex=22

local levelPanel=panel("LevelUp",720,350)
local levelTitle=make("TextLabel",{Size=UDim2.new(1,0,0,52),BackgroundTransparency=1,Text="LEVEL UP! CHOOSE AN UPGRADE",TextColor3=C.gold,TextSize=23,Font=Enum.Font.GothamBlack,ZIndex=21},levelPanel)
local cardHolder=make("Frame",{Size=UDim2.new(1,-24,1,-75),Position=UDim2.fromOffset(12,62),BackgroundTransparency=1,ZIndex=21},levelPanel)
local cardLayout=make("UIListLayout",{FillDirection=Enum.FillDirection.Horizontal,HorizontalAlignment=Enum.HorizontalAlignment.Center,VerticalAlignment=Enum.VerticalAlignment.Center,Padding=UDim.new(0,10)},cardHolder)

local gameOverPanel=panel("GameOver",390,270)
local gameOverTitle=make("TextLabel",{Size=UDim2.new(1,0,0,60),BackgroundTransparency=1,Text="GAME OVER",TextColor3=C.red,TextSize=30,Font=Enum.Font.GothamBlack,ZIndex=21},gameOverPanel)
local finalStats=make("TextLabel",{Size=UDim2.new(1,0,0,55),Position=UDim2.fromOffset(0,65),BackgroundTransparency=1,Text="SCORE: 0",TextColor3=C.white,TextSize=17,Font=Enum.Font.GothamBold,ZIndex=21},gameOverPanel)
local restartBtn=button(gameOverPanel,"PLAY AGAIN",UDim2.fromOffset(190,42),UDim2.new(.5,-95,0,140),C.green); restartBtn.ZIndex=22
local menuBtn=button(gameOverPanel,"MAIN MENU",UDim2.fromOffset(190,42),UDim2.new(.5,-95,0,190)); menuBtn.ZIndex=22

local score,lives,level,xp=0,difficulty.lives,1,0
local pendingLevelUps=0
local xpNeeded=100
local distance,gameTime=0,0
local bullets,enemies,meteors,effects={},{},{},{}
local pressed: {[Enum.KeyCode]: boolean}={}
local running,paused,gameOver,levelUpOpen=false,false,false,false
local selectedWeapon="Pistol"
local weaponCooldowns={Pistol=.18,RPG=3,Shotgun=.65,Laser=.08,Flamethrower=.04}
local lastWeaponShot: {[string]: number}={}
local ammo={RPG=10,Shotgun=30}
local damage=10
local fireRateMultiplier=1
local ultraUnlocked=false
local ultraPoints=0
local ultraActive=false
local ultraCooldownUntil=0
local ultraDrain=1000
local ultraShield=0
local achievementState: {[string]: boolean}={}
local stats={enemies=0,meteors=0,bosses=0,levels=0,games=0}
local bossDistance=1000
local activeBoss: any=nil
local combo=0
local lastKillAt=0

local function updateHud()
	scoreLabel.Text="SCORE: "..score
	livesLabel.Text="LIVES: "..lives
	levelLabel.Text="LEVEL: "..level
	distanceLabel.Text=math.floor(distance).." m"
	weaponLabel.Text="WEAPON: "..string.upper(selectedWeapon)
	xpFill.Size=UDim2.new(math.clamp(xp/xpNeeded,0,1),0,1,0)
	xpText.Text=string.format("LEVEL %d  •  %d / %d XP",level,math.floor(xp),xpNeeded)
	profileLabel.Text="PROFILE: "..player.Name
end
local function cleanupList(list)
	for i=#list,1,-1 do local item=list[i]; if item.ui then item.ui:Destroy() end; table.remove(list,i) end
end
local function clearWorld()
	cleanupList(bullets); cleanupList(enemies); cleanupList(meteors); cleanupList(effects)
	activeBoss=nil
end
local function newEntity(name: string, size: number, color: Color3, x: number, y: number, shape: string?)
	local f=make("Frame",{Name=name,Size=UDim2.fromOffset(size,size),AnchorPoint=Vector2.new(.5,.5),Position=UDim2.fromOffset(x,y),
		BackgroundColor3=color,BorderSizePixel=0,Rotation=rng:NextInteger(0,359)},arena)
	if shape=="circle" then corner(f,size) else corner(f,math.max(4,math.floor(size*.2))) end
	stroke(f,color:Lerp(C.white,.35),1.5)
	return f
end
local function floatingText(text: string,x: number,y: number,color: Color3)
	local t=make("TextLabel",{Size=UDim2.fromOffset(130,28),AnchorPoint=Vector2.new(.5,.5),Position=UDim2.fromOffset(x,y),
		BackgroundTransparency=1,Text=text,TextColor3=color,TextSize=16,Font=Enum.Font.GothamBlack,TextStrokeTransparency=.3},arena)
	local tw=TweenService:Create(t,TweenInfo.new(.7),{Position=t.Position-UDim2.fromOffset(0,35),TextTransparency=1})
	tw:Play(); tw.Completed:Connect(function() if t.Parent then t:Destroy() end end)
end
local function awardXP(amount: number)
	xp+=amount*difficulty.xp
	while xp>=xpNeeded do
		xp-=xpNeeded; level+=1; stats.levels+=1; pendingLevelUps+=1; xpNeeded=math.floor(xpNeeded*1.18)
		if level>=5 then ultraUnlocked=true end
	end
	updateHud(); return false
end
local function damagePlayer()
	if gameOver or not running then return end
	if ultraShield>0 then ultraShield-=1; message("🛡️ ULTRA SHIELD BLOCKED THE HIT"); return end
	lives-=1
	shipBody.BackgroundColor3=C.red
	task.delay(.18,function() if shipBody.Parent then shipBody.BackgroundColor3=C.ship end end)
	if lives<=0 then
		gameOver=true; running=false
		finalStats.Text=string.format("SCORE: %d   •   DISTANCE: %d m   •   LEVEL: %d",score,math.floor(distance),level)
		gameOverPanel.Visible=true
	end
	updateHud()
end
local function addKill(isMeteor: boolean)
	score+=isMeteor and 5 or 10
	if isMeteor then stats.meteors+=1 else stats.enemies+=1 end
	local now=os.clock()
	combo=now-lastKillAt<2 and combo+1 or 1; lastKillAt=now
	awardXP(isMeteor and 5 or 10)
	if stats.enemies>=100 then achievementState["100 enemies"]=true end
	if stats.meteors>=100 then achievementState["100 meteorites"]=true end
end
local function spawnBullet(angle: number, bulletDamage: number, speed: number, size: number, color: Color3, life: number?)
	local pos=ship.AbsolutePosition+ship.AbsoluteSize/2
	local dir=Vector2.new(math.cos(angle),math.sin(angle))
	local ui=make("Frame",{Name="PlayerProjectile",Size=UDim2.fromOffset(size,size*2),AnchorPoint=Vector2.new(.5,.5),
		Position=UDim2.fromOffset(pos.X,pos.Y),BackgroundColor3=color,BorderSizePixel=0,Rotation=math.deg(angle)+90},arena)
	corner(ui,4)
	table.insert(bullets,{ui=ui,x=pos.X,y=pos.Y,vx=dir.X*speed,vy=dir.Y*speed,damage=bulletDamage,life=life or 3,radius=size+3,color=color})
end
local function fireWeapon()
	if not running or paused or gameOver or levelUpOpen then return end
	local now=os.clock()
	if now-(lastWeaponShot[selectedWeapon] or 0)<(weaponCooldowns[selectedWeapon] or .2)/fireRateMultiplier then return end
	if selectedWeapon=="RPG" and (ammo.RPG or 0)<=0 then message("RPG AMMO EMPTY"); return end
	if selectedWeapon=="Shotgun" and (ammo.Shotgun or 0)<=0 then message("SHOTGUN AMMO EMPTY"); return end
	lastWeaponShot[selectedWeapon]=now
	if selectedWeapon=="Pistol" then spawnBullet(-math.pi/2,damage,650,5,C.ship)
	elseif selectedWeapon=="RPG" then ammo.RPG-=1; spawnBullet(-math.pi/2,damage*5,420,13,C.orange,4)
	elseif selectedWeapon=="Shotgun" then
		ammo.Shotgun-=1
		for i=1,6 do local a=-math.pi/2+(i-3.5)*.09; spawnBullet(a,damage*.5,650,5,C.gold) end
	elseif selectedWeapon=="Laser" then spawnBullet(-math.pi/2,damage*.55,1000,4,Color3.fromRGB(80,255,255),.65)
	elseif selectedWeapon=="Flamethrower" then
		for i=1,3 do local a=-math.pi/2+(rng:NextNumber()-.5)*.45; spawnBullet(a,damage*.22,370,8,C.orange,.35) end
	end
end
local function spawnEnemy(isBoss: boolean?)
	local w,h=arena.AbsoluteSize.X,arena.AbsoluteSize.Y
	if isBoss then
		local size=90
		local ui=newEntity("Boss",size,Color3.fromRGB(180,25,65),w*.5,125,"circle")
		activeBoss={ui=ui,x=w*.5,y=125,hp=(900+distance*.45)*difficulty.hp,maxHp=(900+distance*.45)*difficulty.hp,speed=105,boss=true,phase=1}
		table.insert(enemies,activeBoss); stats.bosses+=1
		message("⚠️ BOSS APPROACHING")
		return
	end
	local x=rng:NextNumber(45,w-45); local y=-35; local size=rng:NextInteger(25,42)
	local kind=rng:NextInteger(1,10)
	local color=kind<=2 and C.purple or C.red
	local hp=(40+distance*.012)*difficulty.hp
	local ui=newEntity("EnemyShip",size,color,x,y)
	table.insert(enemies,{ui=ui,x=x,y=y,hp=hp,maxHp=hp,speed=rng:NextNumber(95,145)+level*2,radius=size*.45,kind=kind,shootTimer=rng:NextNumber(2,5)})
end
local function spawnMeteor()
	local w=arena.AbsoluteSize.X
	local size=rng:NextInteger(28,58); local x=rng:NextNumber(35,w-35); local y=-50
	local hp=(25+size*.8)*difficulty.hp
	local ui=newEntity("Meteorite",size,Color3.fromRGB(125,125,135),x,y)
	table.insert(meteors,{ui=ui,x=x,y=y,hp=hp,maxHp=hp,speed=rng:NextNumber(80,145),radius=size*.45,spin=rng:NextNumber(-100,100)})
end

local upgrades = {
	{id="damage",name="POWER SHOT",desc="Increase weapon damage by 25%.",icon="💥",rarity="RARE",color=C.blue,apply=function() damage*=1.25 end},
	{id="fire",name="RAPID FIRE",desc="Fire all weapons faster by 12%.",icon="⚡",rarity="RARE",color=C.blue,apply=function() fireRateMultiplier*=1.12 end},
	{id="life",name="EXTRA LIFE",desc="Restore one life.",icon="❤️",rarity="COMMON",color=C.green,apply=function() lives+=1 end},
	{id="rpg",name="RPG AMMO",desc="Get 5 RPG rockets.",icon="🚀",rarity="EPIC",color=C.purple,apply=function() ammo.RPG+=5 end},
	{id="shotgun",name="SHOTGUN AMMO",desc="Get 15 shotgun shells.",icon="🔫",rarity="COMMON",color=C.green,apply=function() ammo.Shotgun+=15 end},
	{id="speed",name="SHIP SPEED",desc="Improve movement speed by 12%.",icon="🌀",rarity="RARE",color=C.blue,apply=function() _G.GDMoveSpeed=(_G.GDMoveSpeed or 520)*1.12 end},
	{id="ultra",name="ULTRA MODE",desc="Unlock Ultra mode and its shield.",icon="🛡️",rarity="ULTRA",color=C.purple,apply=function() ultraUnlocked=true; ultraPoints=math.min(10000,ultraPoints+1500) end},
}
local function showLevelUp()
	if levelUpOpen or gameOver then return end
	levelUpOpen=true; paused=true; levelPanel.Visible=true
	for _,child in ipairs(cardHolder:GetChildren()) do if child:IsA("TextButton") then child:Destroy() end end
	local pool=table.clone(upgrades); local choices={}
	while #choices<3 and #pool>0 do local i=rng:NextInteger(1,#pool); table.insert(choices,table.remove(pool,i)) end
	for i,up in ipairs(choices) do
		local card=button(cardHolder,up.icon.."\n"..up.name.."\n"..up.rarity.."\n"..up.desc,UDim2.fromOffset(205,220),UDim2.new(),up.color)
		card.TextWrapped=true; card.TextSize=15; card.TextColor3=C.white; card.BackgroundColor3=C.panel
		stroke(card,up.color,2)
		card.MouseButton1Click:Connect(function()
			if not levelUpOpen then return end
			up.apply(); levelPanel.Visible=false; levelUpOpen=false; paused=false
			updateHud(); message(up.name.." UNLOCKED")
		end)
	end
end

local function startGame()
	clearWorld()
	score=0; lives=difficulty.lives; level=1; xp=0; xpNeeded=100; distance=0; gameTime=0
	damage=10; fireRateMultiplier=1; ammo={RPG=10,Shotgun=30}; selectedWeapon="Pistol"
	ultraPoints=0; ultraActive=false; ultraShield=0; ultraCooldownUntil=0; ultraUnlocked=false
	stats={enemies=0,meteors=0,bosses=0,levels=0,games=stats.games+1}
	pendingLevelUps=0
	achievementState={}; bossDistance=1000; combo=0; lastKillAt=0
	ship.Position=UDim2.new(.5,0,.82,0)
	gameOver=false; paused=false; running=true; levelUpOpen=false
	startPanel.Visible=false; gameOverPanel.Visible=false; pausePanel.Visible=false
	levelPanel.Visible=false; profilePanel.Visible=false; helpPanel.Visible=false
	arena.BackgroundColor3=difficulty.bg
	updateHud(); message("DESTROY THE ENEMY SHIPS!")
end

local function togglePause()
	if not running or gameOver or levelUpOpen then return end
	paused=not paused; pausePanel.Visible=paused
end
local function setWeapon(index: number)
	local names={"Pistol","RPG","Shotgun","Laser","Flamethrower"}
	selectedWeapon=names[index] or selectedWeapon; updateHud()
end
UIS.InputBegan:Connect(function(input,processed)
	if processed then return end
	local key=input.KeyCode
	pressed[key]=true
	if key==Enum.KeyCode.Space then fireWeapon()
	elseif key==Enum.KeyCode.P or key==Enum.KeyCode.Escape then togglePause()
	elseif key==Enum.KeyCode.One then setWeapon(1)
	elseif key==Enum.KeyCode.Two then setWeapon(2)
	elseif key==Enum.KeyCode.Three then setWeapon(3)
	elseif key==Enum.KeyCode.Four then setWeapon(4)
	elseif key==Enum.KeyCode.Five then setWeapon(5)
	elseif input.UserInputType==Enum.UserInputType.MouseButton2 then
		if ultraUnlocked and running and not paused and not gameOver and os.clock()>=ultraCooldownUntil and ultraPoints>=1000 then
			ultraActive=not ultraActive
			if ultraActive then message("ULTRA MODE ACTIVATED") else ultraCooldownUntil=os.clock()+15; message("ULTRA MODE DEACTIVATED") end
		end
	end
end)
UIS.InputEnded:Connect(function(input) pressed[input.KeyCode]=false end)
startBtn.MouseButton1Click:Connect(startGame)
diffBtn.MouseButton1Click:Connect(function()
	local names={"Easy","Normal","Hard","Super","Impossible"}
	local i=table.find(names,difficultyName) or 2
	difficultyName=names[i%#names+1]; difficulty=DIFFICULTIES[difficultyName]
	diffLabel.Text="DIFFICULTY: "..string.upper(difficultyName)
	diffLabel.TextColor3=difficulty.color
end)
helpBtn.MouseButton1Click:Connect(function() helpPanel.Visible=true end)
profileBtn.MouseButton1Click:Connect(function() profilePanel.Visible=true end)
profileClose.MouseButton1Click:Connect(function() profilePanel.Visible=false end)
helpClose.MouseButton1Click:Connect(function() helpPanel.Visible=false end)
resumeBtn.MouseButton1Click:Connect(togglePause)
quitBtn.MouseButton1Click:Connect(function()
	running=false; paused=false; pausePanel.Visible=false; startPanel.Visible=true
end)
restartBtn.MouseButton1Click:Connect(startGame)
menuBtn.MouseButton1Click:Connect(function() gameOverPanel.Visible=false; startPanel.Visible=true end)

local spawnTimer=0
local function hitTest(ax: number,ay: number,ar: number,bx: number,by: number,br: number): boolean
	return (ax-bx)^2+(ay-by)^2 <= (ar+br)^2
end
RunService.RenderStepped:Connect(function(dt)
	dt=math.min(dt,.05)
	for _,s in ipairs(stars) do
		local p=s.ui.Position
		s.ui.Position=UDim2.new(p.X.Scale,p.X.Offset,p.Y.Scale,p.Y.Offset+s.drift*dt)
		if s.ui.AbsolutePosition.Y>arena.AbsoluteSize.Y then s.ui.Position=UDim2.new(rng:NextNumber(),0,0,0) end
	end
	if not running or paused or gameOver or levelUpOpen then return end
	gameTime+=dt; distance+=dt*(10+level*.15)
	if ultraActive then
		ultraPoints=math.max(0,ultraPoints-ultraDrain*dt)
		if ultraPoints<=0 then ultraActive=false; ultraCooldownUntil=os.clock()+15; message("ULTRA ENERGY DEPLETED") end
	end
	local move=Vector2.zero
	if pressed[Enum.KeyCode.A] or pressed[Enum.KeyCode.Left] then move+=Vector2.new(-1,0) end
	if pressed[Enum.KeyCode.D] or pressed[Enum.KeyCode.Right] then move+=Vector2.new(1,0) end
	if pressed[Enum.KeyCode.W] or pressed[Enum.KeyCode.Up] then move+=Vector2.new(0,-1) end
	if pressed[Enum.KeyCode.S] or pressed[Enum.KeyCode.Down] then move+=Vector2.new(0,1) end
	if move.Magnitude>0 then move=move.Unit end
	local pos=ship.Position
	local w,h=arena.AbsoluteSize.X,arena.AbsoluteSize.Y
	local px=math.clamp(pos.X.Offset+move.X*(_G.GDMoveSpeed or 520)*dt,25,w-25)
	local py=math.clamp(pos.Y.Offset+move.Y*(_G.GDMoveSpeed or 520)*dt,110,h-35)
	ship.Position=UDim2.fromOffset(px,py)
	if UIS:IsKeyDown(Enum.KeyCode.Space) then fireWeapon() end

	spawnTimer+=dt
	if spawnTimer>math.max(.28,1.05-level*.018) then
		spawnTimer=0; spawnEnemy(false)
		if rng:NextNumber()<.25 then spawnMeteor() end
	end
	if distance>=bossDistance and not activeBoss then spawnEnemy(true); bossDistance+=1000 end

	for i=#bullets,1,-1 do
		local b=bullets[i]; b.x+=b.vx*dt; b.y+=b.vy*dt; b.life-=dt
		b.ui.Position=UDim2.fromOffset(b.x,b.y)
		if b.life<=0 or b.x< -20 or b.x>w+20 or b.y< -30 or b.y>h+30 then b.ui:Destroy(); table.remove(bullets,i) end
	end
	for i=#enemies,1,-1 do
		local e=enemies[i]
		if e.boss then
			e.x+=math.sin(os.clock()*1.2)*e.speed*dt; e.x=math.clamp(e.x,70,w-70)
			e.y=125+math.sin(os.clock()*2)*18
			e.ui.Position=UDim2.fromOffset(e.x,e.y)
		else
			e.y+=e.speed*dt; e.x+=math.sin(os.clock()*2+i)*18*dt
			e.ui.Position=UDim2.fromOffset(e.x,e.y)
		end
		local hit=false
		for j=#bullets,1,-1 do local b=bullets[j]
			if hitTest(e.x,e.y,e.boss and 48 or 18,b.x,b.y,b.radius) then
				e.hp-=b.damage; b.ui:Destroy(); table.remove(bullets,j); hit=true
				floatingText("-"..math.floor(b.damage),e.x,e.y,C.red)
				if e.hp<=0 then
					e.ui:Destroy(); table.remove(enemies,i); addKill(false)
					if e.boss then activeBoss=nil; score+=250; ultraPoints=math.min(10000,ultraPoints+1000); message("BOSS DESTROYED!") end
				end
				break
			end
		end
		if not hit and hitTest(e.x,e.y,e.boss and 48 or 18,px,py,22) then e.ui:Destroy(); table.remove(enemies,i); damagePlayer()
		elseif e.y>h+45 then e.ui:Destroy(); table.remove(enemies,i); if not e.boss then damagePlayer() end end
	end
	for i=#meteors,1,-1 do
		local m=meteors[i]; m.y+=m.speed*dt; m.ui.Position=UDim2.fromOffset(m.x,m.y); m.ui.Rotation=(m.ui.Rotation+m.spin*dt)%360
		local removed=false
		for j=#bullets,1,-1 do local b=bullets[j]
			if hitTest(m.x,m.y,m.radius,b.x,b.y,b.radius) then
				m.hp-=b.damage; b.ui:Destroy(); table.remove(bullets,j)
				if m.hp<=0 then m.ui:Destroy(); table.remove(meteors,i); addKill(true); removed=true end
				break
			end
		end
		if not removed and hitTest(m.x,m.y,m.radius,px,py,20) then m.ui:Destroy(); table.remove(meteors,i); damagePlayer()
		elseif not removed and m.y>h+60 then m.ui:Destroy(); table.remove(meteors,i) end
	end
	updateHud()
end)

-- Level-up is triggered when XP crosses its threshold. Kept separate from the frame loop.
task.spawn(function()
	while gui.Parent do
		task.wait(.12)
		if running and not paused and not gameOver and not levelUpOpen and pendingLevelUps>0 then
			pendingLevelUps-=1
			showLevelUp()
		end
	end
end)

updateHud()
message("WELCOME, "..player.Name)
