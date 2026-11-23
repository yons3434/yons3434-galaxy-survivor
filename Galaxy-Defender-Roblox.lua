--!strict
-- GALAXY DEFENDER — Roblox / Luau port
-- Place this LocalScript in StarterPlayer > StarterPlayerScripts.
-- Original account, profile, leaderboard, and translation systems are intentionally excluded.
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
local scoreLabel = hudLabel("Score",0,120,"SCORE: 0")
local livesLabel = hudLabel("Lives",128,100,"LIVES: 3")
local levelLabel = hudLabel("Level",236,100,"LEVEL: 1")
local distanceLabel = hudLabel("Distance",344,130,"0 m")
local weaponLabel = hudLabel("Weapon",482,180,"WEAPON: PISTOL")

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
local startSub=make("TextLabel",{Size=UDim2.new(1,-40,0,32),Position=UDim2.fromOffset(20,70),BackgroundTransparency=1,Text="SURVIVE • UPGRADE • DESTROY",TextColor3=C.white,TextSize=15,Font=Enum.Font.GothamBold,ZIndex=21},startPanel)
local diffLabel=make("TextLabel",{Size=UDim2.new(1,-30,0,25),Position=UDim2.fromOffset(15,108),BackgroundTransparency=1,Text="DIFFICULTY: NORMAL",TextColor3=C.gold,TextSize=15,Font=Enum.Font.GothamBold,ZIndex=21},startPanel)
local startBtn=button(startPanel,"PLAY",UDim2.fromOffset(210,48),UDim2.new(.5,-105,0,150),C.green); startBtn.ZIndex=22
local diffBtn=button(startPanel,"CHANGE DIFFICULTY",UDim2.fromOffset(210,42),UDim2.new(.5,-105,0,210)); diffBtn.ZIndex=22
local helpBtn=button(startPanel,"CONTROLS & HELP",UDim2.fromOffset(210,42),UDim2.new(.5,-105,0,260)); helpBtn.ZIndex=22

local pausePanel=panel("PauseMenu",360,230)
local pauseTitle=make("TextLabel",{Size=UDim2.new(1,0,0,48),BackgroundTransparency=1,Text="PAUSED",TextColor3=C.ship,TextSize=26,Font=Enum.Font.GothamBlack,ZIndex=21},pausePanel)
local resumeBtn=button(pausePanel,"RESUME",UDim2.fromOffset(190,42),UDim2.new(.5,-95,0,75),C.green); resumeBtn.ZIndex=22
local quitBtn=button(pausePanel,"MAIN MENU",UDim2.fromOffset(190,42),UDim2.new(.5,-95,0,130)); quitBtn.ZIndex=22

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
	levelPanel.Visible=false; helpPanel.Visible=false
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



-----------------------------------------------------------------------
-- FULL SYSTEM EXPANSION
-- These systems are implemented as native Roblox/Luau gameplay systems.
-- They extend the playable foundation above; they do not execute browser JS.
-----------------------------------------------------------------------

-- Persistent run progression and combat state.
local upgradeLevels: {[string]: number} = {}
local maxLives = difficulty.lives
local dodgeChance = 0
local reviveAvailable = false
local healOneUsed = false
local fullHealUsed = false
local levelHealLevel = 0
local extraFireLevel = 0
local piercingLevel = 0
local homingLevel = 0
local luckLevel = 0
local swordCount = 0
local swordDamage = 8
local droneCount = 0
local maxDrones = 5
local droneTier = 0
local blackHoleAmmo = 0
local laserUnlocked = false
local flamethrowerUnlocked = false
local blackHoleUnlocked = false
local laserHeatLevel = 0
local burnLevel = 0
local poisonLevel = 0
local freezeLevel = 0
local stunLevel = 0
local confusionLevel = 0
local chainLightningLevel = 0
local chainExplosionLevel = 0
local mirrorCloneLevel = 0
local infernoBombLevel = 0
local deadlyLootLevel = 0
local ultraLaserUnlocked = false
local ultraMiniShipLevel = 0
local ultraCardCount = 0
local ultraCapacity = 5000
local ultraSpentTowardShield = 0
local ultraLaserUntil = 0
local ultraLaserCooldownUntil = 0
local ultraLaserButton: TextButton? = nil
local ultraButton: TextButton? = nil
local activeStatuses: {[Instance]: {[string]: any}} = {}
local drones: {any} = {}
local swords: {any} = {}
local blackHoles: {any} = {}
local enemyProjectiles: {any} = {}
local explosions: {any} = {}
local healingParticles: {any} = {}
local floatingRewards: {any} = {}
local achievementCounts: {[string]: number} = {}
local unlockedAchievements: {[string]: boolean} = {}
local totalUltraPointsEarned = 0
local totalDistanceRecord = 0
local gameStartTime = 0
local nextAchievementCheck = 0
local nextAmbientSpawn = 0
local invulnerableUntil = 0
local rageUntil = 0
local laserHeat = 0
local laserCoolingUntil = 0
local lastContinuousHit = 0
local currentAim = Vector2.new(0,-1)
local ultraLaserColorIndex = 0

local function addUpgradeLevel(id: string)
	upgradeLevels[id] = (upgradeLevels[id] or 0) + 1
	return upgradeLevels[id]
end

local function createSmallLabel(parent: Instance, text: string, y: number, color: Color3?): TextLabel
	return make("TextLabel", {
		Size=UDim2.new(1,-20,0,25), Position=UDim2.fromOffset(10,y),
		BackgroundTransparency=1, Text=text, TextColor3=color or C.white,
		TextSize=14, Font=Enum.Font.GothamBold, TextXAlignment=Enum.TextXAlignment.Center,
	}, parent)
end

local function makeOverlayPanel(name: string, title: string, width: number, height: number)
	local p=panel(name,width,height)
	local heading=make("TextLabel",{
		Size=UDim2.new(1,-20,0,42),Position=UDim2.fromOffset(10,8),
		BackgroundTransparency=1,Text=title,TextColor3=C.ship,TextSize=23,
		Font=Enum.Font.GothamBlack,ZIndex=21,
	},p)
	return p,heading
end

-- Full in-game status HUD for systems added by the port.
local extraHud = make("Frame", {
	Name="AdvancedHUD", Size=UDim2.fromOffset(250,110), Position=UDim2.new(1,-260,0,58),
	BackgroundColor3=Color3.new(0,0,0), BackgroundTransparency=.25, BorderSizePixel=0,
},arena)
corner(extraHud,10); stroke(extraHud,C.purple,1)
local ultraHud = createSmallLabel(extraHud,"ULTRA: LOCKED",2,C.purple)
local droneHud = createSmallLabel(extraHud,"DRONES: 0  •  SWORDS: 0",28,C.ship)
local statusHud = createSmallLabel(extraHud,"STATUS: NORMAL",54,C.white)
local comboHud = createSmallLabel(extraHud,"COMBO: ×1",80,C.gold)

local achievementPanel, achievementHeading = makeOverlayPanel("AchievementsPanel","ACHIEVEMENTS",560,440)
local achievementScroll = make("ScrollingFrame",{
	Size=UDim2.new(1,-24,1,-105),Position=UDim2.fromOffset(12,55),
	BackgroundTransparency=1,BorderSizePixel=0,ScrollBarThickness=6,
	CanvasSize=UDim2.fromOffset(0,0),AutomaticCanvasSize=Enum.AutomaticSize.Y,
},achievementPanel)
local achievementLayout = make("UIListLayout",{
	Padding=UDim.new(0,5),SortOrder=Enum.SortOrder.LayoutOrder,
},achievementScroll)
local achievementClose = button(achievementPanel,"CLOSE",UDim2.fromOffset(150,36),UDim2.new(.5,-75,1,-43))
achievementClose.ZIndex=22
local achievementButton = button(arena,"🏆 ACHIEVEMENTS",UDim2.fromOffset(150,34),UDim2.new(1,-160,1,-48),C.gold)
achievementButton.TextSize=13
achievementButton.MouseButton1Click:Connect(function()
	achievementPanel.Visible=true
end)
achievementClose.MouseButton1Click:Connect(function() achievementPanel.Visible=false end)

local function addAchievementRow(id: string, title: string, description: string, target: number, reward: number)
	local row=make("Frame",{
		Name="Achievement_"..id,Size=UDim2.new(1,-8,0,58),BackgroundColor3=Color3.fromRGB(18,25,48),
		BorderSizePixel=0,
	},achievementScroll)
	corner(row,8); stroke(row,C.purple,1)
	local titleLabel=make("TextLabel",{
		Size=UDim2.new(.65,-8,0,25),Position=UDim2.fromOffset(9,4),
		BackgroundTransparency=1,Text=title,TextColor3=C.white,TextSize=14,
		Font=Enum.Font.GothamBold,TextXAlignment=Enum.TextXAlignment.Left,
	},row)
	local desc=make("TextLabel",{
		Size=UDim2.new(.65,-8,0,20),Position=UDim2.fromOffset(9,30),
		BackgroundTransparency=1,Text=description,TextColor3=Color3.fromRGB(175,190,215),
		TextSize=11,Font=Enum.Font.Gotham,TextXAlignment=Enum.TextXAlignment.Left,
	},row)
	local progress=make("TextLabel",{
		Size=UDim2.new(.32,-8,1,-8),Position=UDim2.new(.68,0,0,4),
		BackgroundTransparency=1,Text="0 / "..target,TextColor3=C.gold,
		TextSize=13,Font=Enum.Font.GothamBold,
	},row)
	return {id=id,target=target,reward=reward,row=row,progress=progress,title=titleLabel}
end

local achievementDefinitions = {
	{"kills10","First Contact","Destroy 10 enemy ships",10,100},
	{"kills100","Ace Pilot","Destroy 100 enemy ships",100,250},
	{"kills1000","Galaxy Hunter","Destroy 1,000 enemy ships",1000,500},
	{"kills2500","Legendary Hunter","Destroy 2,500 enemy ships",2500,1000},
	{"meteors100","Meteor Breaker","Destroy 100 meteorites",100,250},
	{"meteors1000","Meteor Storm","Destroy 1,000 meteorites",1000,750},
	{"boss1","Boss Slayer","Defeat your first boss",1,250},
	{"boss10","Boss Nemesis","Defeat 10 bosses",10,1000},
	{"level10","Rising Star","Reach level 10",10,250},
	{"level20","Veteran Defender","Reach level 20",20,500},
	{"distance1000","Deep Space","Travel 1,000 meters",1000,250},
	{"distance3000","Impossible Survivor","Travel 3,000 meters on Impossible",3000,1000},
	{"distance10000","Beyond the Galaxy","Travel 10,000 meters",10000,2500},
	{"combo25","Unstoppable","Reach a 25 kill combo",25,500},
	{"ultra10000","Ultra Collector","Earn 10,000 Ultra points",10000,1000},
	{"allWeapons","Arsenal Complete","Unlock every standard weapon",1,750},
	{"upgrade20","Fully Armed","Choose 20 upgrades in one run",20,500},
	{"survive600","Endurance","Survive for 10 minutes",600,1000},
}
local achievementRows: {[string]: any} = {}
for index,def in ipairs(achievementDefinitions) do
	local row=addAchievementRow(def[1],def[2],def[3],def[4],def[5])
	row.row.LayoutOrder=index
	achievementRows[def[1]]=row
end

local function setAchievementProgress(id: string, value: number)
	achievementCounts[id]=math.max(achievementCounts[id] or 0,value)
	local row=achievementRows[id]
	if not row then return end
	local def
	for _,d in ipairs(achievementDefinitions) do if d[1]==id then def=d; break end end
	if not def then return end
	local amount=math.min(achievementCounts[id],def[4])
	if amount>=def[4] and not unlockedAchievements[id] then
		unlockedAchievements[id]=true
		ultraPoints=math.min(10000,ultraPoints+def[5])
		totalUltraPointsEarned+=def[5]
		message("ACHIEVEMENT UNLOCKED: "..def[2])
		row.title.TextColor3=C.gold
		stroke(row.row,C.gold,2)
	end
	row.progress.Text=tostring(amount).." / "..tostring(def[4])..(unlockedAchievements[id] and "  ✓" or "")
end

local function updateAchievementStats()
	local e=stats.enemies
	local m=stats.meteors
	local b=stats.bosses
	setAchievementProgress("kills10",e)
	setAchievementProgress("kills100",e)
	setAchievementProgress("kills1000",e)
	setAchievementProgress("kills2500",e)
	setAchievementProgress("meteors100",m)
	setAchievementProgress("meteors1000",m)
	setAchievementProgress("boss1",b)
	setAchievementProgress("boss10",b)
	setAchievementProgress("level10",level)
	setAchievementProgress("level20",level)
	setAchievementProgress("distance1000",math.floor(distance))
	if difficultyName=="Impossible" then setAchievementProgress("distance3000",math.floor(distance)) end
	setAchievementProgress("distance10000",math.floor(distance))
	setAchievementProgress("combo25",combo)
	setAchievementProgress("ultra10000",totalUltraPointsEarned)
	setAchievementProgress("upgrade20",upgradeLevels.__total or 0)
	setAchievementProgress("survive600",math.floor(os.clock()-gameStartTime))
	if laserUnlocked and flamethrowerUnlocked and blackHoleUnlocked and (upgradeLevels.rpg or 0)>0 and (upgradeLevels.shotgun or 0)>0 then
		setAchievementProgress("allWeapons",1)
	end
end

local function awardUltra(amount: number)
	if amount<=0 then return end
	local before=ultraPoints
	ultraPoints=math.min(10000,ultraPoints+amount)
	totalUltraPointsEarned+=ultraPoints-before
	ultraCapacity=5000+math.max(0,level-1)*500+ultraCardCount*1500
	updateAchievementStats()
end

local function grantUltraShieldFromSpend(amount: number)
	ultraSpentTowardShield+=amount
	while ultraSpentTowardShield>=5000 do
		ultraSpentTowardShield-=5000
		ultraShield=math.min(lives,ultraShield+1)
		message("ULTRA SHIELD EARNED")
	end
end

local function updateAdvancedHud()
	ultraHud.Text=string.format("ULTRA: %d / %d%s",math.floor(ultraPoints),math.floor(ultraCapacity),ultraActive and "  ACTIVE" or "")
	droneHud.Text=string.format("DRONES: %d  •  SWORDS: %d",#drones,swordCount)
	local activeNames={}
	for _,entry in pairs(activeStatuses) do
		for name,expires in pairs(entry) do
			if type(expires)=="number" and expires>os.clock() then table.insert(activeNames,name) end
		end
	end
	statusHud.Text="STATUS: "..(#activeNames>0 and table.concat(activeNames,", ") or "NORMAL")
	comboHud.Text="COMBO: ×"..tostring(combo)
end

-- All original card families plus the special cards already planned for the browser game.
local function addCard(id: string, name: string, description: string, rarity: string, icon: string, color: Color3, applyFn: () -> ())
	table.insert(upgrades,{
		id=id,name=name,desc=description,rarity=rarity,icon=icon,color=color,
		apply=function()
			addUpgradeLevel(id)
			upgradeLevels.__total=(upgradeLevels.__total or 0)+1
			applyFn()
			updateAchievementStats()
		end,
	})
end

addCard("maxLives","MAXIMUM LIFE","Add one maximum life and restore it.", "COMMON","❤️",C.white,function()
	maxLives+=1; lives=math.min(maxLives,lives+1)
end)
addCard("healOne","HEAL ONE LIFE","Restore one life once per run.", "COMMON","💚",C.green,function()
	if not healOneUsed then healOneUsed=true; lives=math.min(maxLives,lives+1) end
end)
addCard("fullHeal","FULL HEAL","Restore all missing lives once per run.", "RARE","💚",C.green,function()
	if not fullHealUsed then fullHealUsed=true; lives=maxLives end
end)
addCard("extraFire","EXTRA SHOT","Add another projectile to each standard volley.", "RARE","🔫",C.green,function()
	extraFireLevel+=1
end)
addCard("xpBoost","XP BOOST","Increase XP gained from all sources by 25%.", "RARE","✨",C.green,function()
	upgradeLevels.xpBoost=(upgradeLevels.xpBoost or 0)+1
end)
addCard("luck","LUCK","Improve the odds of higher rarity upgrade cards.", "RARE","🍀",C.green,function()
	luckLevel+=1
end)
addCard("dodge","DODGE","Gain an additional 8% chance to avoid damage.", "RARE","🌀",C.green,function()
	dodgeChance=math.min(.5,dodgeChance+.08)
end)
addCard("piercing","PIERCING SHOTS","Projectiles pass through enemies.", "EPIC","🏹",C.purple,function()
	piercingLevel+=1
end)
addCard("homing","HOMING SHOTS","Projectiles turn toward the nearest target.", "AMAZING","🎯",C.red,function()
	homingLevel+=1
end)
addCard("sword","ENERGY SWORD","Add a rotating energy sword around your ship.", "EPIC","⚔️",C.purple,function()
	swordCount+=1
end)
addCard("revive","REVIVE","Once per run, return from zero lives with full lives.", "EPIC","💖",C.purple,function()
	reviveAvailable=true
end)
addCard("levelHeal","LEVEL-UP HEAL","Restore one additional life whenever you level up.", "EPIC","💜",C.purple,function()
	levelHealLevel+=1
end)
addCard("drone","MINI SHIP","Add an autonomous mini ship that fires at enemies.", "RARE","🛸",C.green,function()
	if #drones<maxDrones then table.insert(drones,{angle=rng:NextNumber()*math.pi*2,radius=72,timer=0,tier=0}) end
end)
addCard("extraDrone","MORE MINI SHIPS","Increase the mini ship capacity by one, up to five.", "RARE","🛸",C.green,function()
	maxDrones=math.min(5,maxDrones+1)
end)
addCard("droneUpgrade","UPGRADED MINI SHIPS","Upgrade existing mini ships to triple-shot.", "EPIC","🛸",C.purple,function()
	droneTier=math.max(1,droneTier)
	for _,d in ipairs(drones) do d.tier=math.max(d.tier,1) end
end)
addCard("droneMega","MEGA MINI SHIP","Increase mini ship firepower and projectile spread.", "LEGENDARY","🛸",C.gold,function()
	droneTier=2
	for _,d in ipairs(drones) do d.tier=2 end
end)
addCard("rpg","RPG WEAPON","Unlock RPG and add ten rockets.", "EPIC","🚀",C.purple,function()
	ammo.RPG=(ammo.RPG or 0)+10; upgradeLevels.rpg=(upgradeLevels.rpg or 0)+1
end)
addCard("shotgun","SHOTGUN WEAPON","Unlock shotgun and add thirty shells.", "EPIC","🔫",C.purple,function()
	ammo.Shotgun=(ammo.Shotgun or 0)+30; upgradeLevels.shotgun=(upgradeLevels.shotgun or 0)+1
end)
addCard("laser","LASER MODE","Unlock continuous mouse-aimed laser fire.", "LEGENDARY","🔴",C.gold,function()
	laserUnlocked=true
end)
addCard("flamethrower","FLAMETHROWER","Unlock a continuous cone of fire.", "LEGENDARY","🔥",C.gold,function()
	flamethrowerUnlocked=true
end)
addCard("blackHole","BLACK HOLE GUN","Unlock four gravity bombs that pull in enemies and meteors.", "AMAZING","🌌",C.red,function()
	blackHoleUnlocked=true; blackHoleAmmo+=4
end)
addCard("chainLightning","CHAIN LIGHTNING","Hits can jump to nearby enemies and meteors.", "AMAZING","⚡",C.red,function()
	chainLightningLevel+=1
end)
addCard("chainExplosion","CHAIN EXPLOSION","Destroyed enemies and meteors trigger nearby explosions.", "EPIC","💥",C.purple,function()
	chainExplosionLevel+=1
end)
addCard("burn","BURNING","Continuous hits ignite targets and deal increasing damage.", "LEGENDARY","🔥",C.gold,function()
	burnLevel+=1
end)
addCard("poison","POISON","Hits apply stacking damage over time; poison cannot kill.", "EPIC","☠️",C.purple,function()
	poisonLevel+=1
end)
addCard("freeze","FREEZE","Gain a chance to slow or freeze targets.", "EPIC","❄️",C.purple,function()
	freezeLevel+=1
end)
addCard("stun","STUN","Gain a chance to briefly stop enemy movement.", "EPIC","⚡",C.purple,function()
	stunLevel+=1
end)
addCard("confusion","CONFUSION","Confused enemies attack other enemies.", "AMAZING","🌀",C.red,function()
	confusionLevel+=1
end)
addCard("laserHeat","LASER HEAT","Laser hits build heat for a stronger beam, followed by cooldown.", "LEGENDARY","🌡️",C.gold,function()
	laserHeatLevel+=1
end)
addCard("mirrorClone","MIRROR CLONES","At health thresholds, split targets into weaker copies.", "AMAZING","🪞",C.red,function()
	mirrorCloneLevel+=1
end)
addCard("infernoBomb","INFERNO BOMB","Unlock area bombs that leave damaging fire zones.", "LEGENDARY","💣",C.gold,function()
	infernoBombLevel+=1
end)
addCard("deadlyLoot","DEADLY LOOT","Increase the chance for dangerous enemies to drop useful rewards.", "EPIC","🎁",C.purple,function()
	deadlyLootLevel+=1
end)
addCard("lowHealthRage","LAST STAND","Below half health, gain speed, fire rate, damage and orange glow.", "EPIC","❤️‍🔥",C.purple,function()
	upgradeLevels.lowHealthRage=(upgradeLevels.lowHealthRage or 0)+1
end)
addCard("ultraMode","ULTRA MODE","Unlock Ultra mode and add 1,500 Ultra points.", "AMAZING","🛡️",C.red,function()
	ultraUnlocked=true; ultraCardCount+=1; awardUltra(1500)
end)
addCard("ultraLaser","ULTRA LASER","Unlock the 10-second rainbow Ultra Laser.", "AMAZING","🌈",C.red,function()
	ultraLaserUnlocked=true; ultraCardCount+=1
end)
addCard("ultraMiniShip","ULTRA MINI SHIP","Add a permanent orbiting mini ship with a piercing laser.", "AMAZING","🛸",C.red,function()
	ultraMiniShipLevel+=1; ultraCardCount+=1
end)

-- Card rarity weights. Luck raises rare-card odds without removing common cards.
local function chooseUpgradeCards()
	local pool={}
	for _,u in ipairs(upgrades) do
		local weight=1
		if u.rarity=="COMMON" then weight=6
		elseif u.rarity=="RARE" then weight=4
		elseif u.rarity=="EPIC" then weight=2.2
		elseif u.rarity=="LEGENDARY" then weight=1.1
		elseif u.rarity=="AMAZING" then weight=.45 end
		if luckLevel>0 and (u.rarity=="EPIC" or u.rarity=="LEGENDARY" or u.rarity=="AMAZING") then
			weight*=1+luckLevel*.25
		end
		if u.id=="healOne" and healOneUsed then weight=0 end
		if u.id=="fullHeal" and fullHealUsed then weight=0 end
		if u.id=="revive" and reviveAvailable then weight=0 end
		if u.id=="ultraMode" and ultraUnlocked then weight=0 end
		if u.id=="ultraLaser" and ultraLaserUnlocked then weight=0 end
		if u.id=="ultraMiniShip" and ultraMiniShipLevel>=level then weight=0 end
		if u.id=="laser" and laserUnlocked then weight=0 end
		if u.id=="flamethrower" and flamethrowerUnlocked then weight=0 end
		if u.id=="blackHole" and blackHoleUnlocked then weight=0 end
		if u.id=="rpg" and (upgradeLevels.rpg or 0)>0 then weight=0 end
		if u.id=="shotgun" and (upgradeLevels.shotgun or 0)>0 then weight=0 end
		if u.id=="drone" and #drones>=maxDrones then weight=0 end
		if u.id=="extraDrone" and maxDrones>=5 then weight=0 end
		if weight>0 then
			for _=1,math.max(1,math.floor(weight*10)) do table.insert(pool,u) end
		end
	end
	local choices={}
	while #choices<3 and #pool>0 do
		local index=rng:NextInteger(1,#pool)
		local selected=table.remove(pool,index)
		local duplicate=false
		for _,existing in ipairs(choices) do if existing.id==selected.id then duplicate=true; break end end
		if not duplicate then table.insert(choices,selected) end
	end
	return choices
end

-- Replace the original small card picker with the complete card pool.
local oldShowLevelUp = showLevelUp
showLevelUp = function()
	if levelUpOpen or gameOver then return end
	levelUpOpen=true; paused=true; levelPanel.Visible=true
	for _,child in ipairs(cardHolder:GetChildren()) do if child:IsA("TextButton") then child:Destroy() end end
	local choices=chooseUpgradeCards()
	for _,up in ipairs(choices) do
		local card=button(cardHolder,up.icon.."\n"..up.name.."\n"..up.rarity.."\n"..up.desc,
			UDim2.fromOffset(205,220),UDim2.new(),up.color)
		card.TextWrapped=true; card.TextSize=14; card.TextColor3=C.white; card.BackgroundColor3=C.panel
		stroke(card,up.color,2)
		card.MouseButton1Click:Connect(function()
			if not levelUpOpen then return end
			up.apply()
			levelPanel.Visible=false; levelUpOpen=false; paused=false
			updateHud(); updateAdvancedHud(); message(up.name.." UNLOCKED")
		end)
	end
end

-- Replace level-up progression with the original escalating XP curve and healing effect.
local oldAwardXP = awardXP
awardXP = function(amount: number)
	local multiplier=1+(upgradeLevels.xpBoost or 0)*.25
	xp+=amount*difficulty.xp*multiplier
	while xp>=xpNeeded do
		xp-=xpNeeded; level+=1; stats.levels+=1; pendingLevelUps+=1
		xpNeeded=math.floor(xpNeeded*1.25)
		if levelHealLevel>0 then lives=math.min(maxLives,lives+levelHealLevel) end
		if (upgradeLevels.rpg or 0)>0 then ammo.RPG=(ammo.RPG or 0)+5 end
		if (upgradeLevels.shotgun or 0)>0 then ammo.Shotgun=(ammo.Shotgun or 0)+15 end
		ultraCapacity=5000+math.max(0,level-1)*500+ultraCardCount*1500
		awardUltra(10)
	end
	updateHud()
	return false
end

-- Player damage: dodge, invulnerability, revive and Ultra shield are applied in order.
local baseDamagePlayer = damagePlayer
damagePlayer = function()
	if not running or gameOver or os.clock()<invulnerableUntil then return end
	if rng:NextNumber()<dodgeChance then
		invulnerableUntil=os.clock()+.55
		message("DODGED!")
		return
	end
	if ultraShield>0 then
		ultraShield-=1; invulnerableUntil=os.clock()+1
		message("ULTRA SHIELD BLOCKED THE HIT")
		return
	end
	if reviveAvailable and lives<=1 then
		reviveAvailable=false; lives=maxLives; invulnerableUntil=os.clock()+2.5
		message("REVIVE ACTIVATED!")
		updateHud(); return
	end
	baseDamagePlayer()
end

-- Aiming uses the mouse position inside the 2D arena.
UIS.InputChanged:Connect(function(input)
	if input.UserInputType==Enum.UserInputType.MouseMovement then
		local p=input.Position
		local center=ship.AbsolutePosition+ship.AbsoluteSize/2
		local delta=Vector2.new(p.X-center.X,p.Y-center.Y)
		if delta.Magnitude>0 then currentAim=delta.Unit end
	end
end)

-- Expand weapon switching to include the original black-hole weapon.
local baseSetWeapon=setWeapon
setWeapon=function(index: number)
	if index==6 and blackHoleUnlocked then
		selectedWeapon="BlackHole"
	elseif index==4 and not laserUnlocked then
		message("UNLOCK LASER WITH A LEGENDARY CARD")
	elseif index==5 and not flamethrowerUnlocked then
		message("UNLOCK FLAMETHROWER WITH A LEGENDARY CARD")
	elseif index==2 and (upgradeLevels.rpg or 0)==0 then
		message("UNLOCK RPG WITH AN EPIC CARD")
	elseif index==3 and (upgradeLevels.shotgun or 0)==0 then
		message("UNLOCK SHOTGUN WITH AN EPIC CARD")
	else
		baseSetWeapon(index)
	end
	updateHud()
end

-- Add a small black-hole projectile and persistent gravity wells.
local function spawnBlackHole()
	local center=ship.AbsolutePosition+ship.AbsoluteSize/2
	local ui=newEntity("BlackHole",38,C.purple,center.X,center.Y,"circle")
	stroke(ui,C.white,2)
	table.insert(blackHoles,{ui=ui,x=center.X,y=center.Y,age=0,radius=180,life=4.5,damage=damage*2})
end

local baseFireWeapon=fireWeapon
fireWeapon=function()
	if selectedWeapon=="BlackHole" then
		if not running or paused or gameOver or levelUpOpen then return end
		local now=os.clock()
		if now-(lastWeaponShot.BlackHole or 0)<1 then return end
		if blackHoleAmmo<=0 then message("BLACK HOLE AMMO EMPTY"); return end
		lastWeaponShot.BlackHole=now; blackHoleAmmo-=1; spawnBlackHole(); updateHud()
		return
	end
	if selectedWeapon=="Laser" and laserUnlocked then return end
	if selectedWeapon=="Flamethrower" and flamethrowerUnlocked then return end
	baseFireWeapon()
end

-- Continuous laser/flamethrower are updated independently of projectile weapons.
local function nearestTarget(x: number,y: number)
	local best=nil; local bestD=math.huge
	for _,list in ipairs({enemies,meteors}) do
		for _,target in ipairs(list) do
			if target.ui and target.ui.Parent then
				local d=(target.x-x)^2+(target.y-y)^2
				if d<bestD then bestD=d; best=target end
			end
		end
	end
	return best
end

local laserBeam=make("Frame",{
	Name="LaserBeam",AnchorPoint=Vector2.new(0,.5),Position=UDim2.fromOffset(0,0),
	Size=UDim2.fromOffset(0,8),BackgroundColor3=Color3.fromRGB(255,40,70),
	BorderSizePixel=0,Visible=false,ZIndex=8,
},arena)
corner(laserBeam,5)
local flameBeam=make("Frame",{
	Name="FlameCone",AnchorPoint=Vector2.new(0,.5),Position=UDim2.fromOffset(0,0),
	Size=UDim2.fromOffset(0,40),BackgroundColor3=C.orange,
	BackgroundTransparency=.25,BorderSizePixel=0,Visible=false,ZIndex=7,
},arena)
corner(flameBeam,18)

local function beamHitsTarget(target: any, origin: Vector2, direction: Vector2, length: number, width: number)
	local point=Vector2.new(target.x,target.y)-origin
	local along=point:Dot(direction)
	if along<0 or along>length then return false end
	local perpendicular=(point-direction*along).Magnitude
	local radius=target.radius or (target.boss and 48 or 20)
	return perpendicular<=width+radius
end

-- Status effects are target-bound and update without relying on browser timers.
local function applyStatus(target: any, name: string, duration: number, strength: number)
	if not target or not target.ui then return end
	local entry=activeStatuses[target.ui]
	if not entry then entry={}; activeStatuses[target.ui]=entry end
	local now=os.clock()
	if name=="poison" then
		-- Match the original poison stacking rule: each hit adds 10% of the
		-- remaining strength, while the tick interval becomes 10% shorter.
		local initialStrength=math.min(1,math.max(.1,poisonLevel*.1))
		local initialInterval=1/math.max(1,math.min(9,poisonLevel))
		if (entry.poisonStrength or 0)>0 then
			entry.poisonStrength=entry.poisonStrength+(1-entry.poisonStrength)*.1
			entry.poisonInterval=math.max(1/60,(entry.poisonInterval or initialInterval)*.9)
		else
			entry.poisonStrength=initialStrength
			entry.poisonInterval=initialInterval
			entry.poisonNext=now+initialInterval
		end
		entry.poisonStrength=math.min(1,entry.poisonStrength)
		entry.poisonUntil=math.huge
	elseif name=="burn" then
		entry.burnUntil=now+duration
		entry.burnStrength=(entry.burnStrength or 0)+strength
		entry.burnNext=now+.5
	elseif name=="freeze" then
		entry.freezeUntil=math.max(entry.freezeUntil or 0,now+duration)
		entry.freezeStrength=math.max(entry.freezeStrength or 0,strength)
	elseif name=="stun" then
		entry.stunUntil=math.max(entry.stunUntil or 0,now+duration)
	elseif name=="confusion" then
		entry.confusionUntil=math.max(entry.confusionUntil or 0,now+duration)
	end
end

local function damageTarget(target: any, amount: number)
	if not target or not target.ui or not target.ui.Parent then return end
	target.hp-=amount
	floatingText("-"..math.floor(amount),target.x,target.y,C.orange)
	if target.hp<=0 then
		local wasBoss=target.boss==true
		target.ui:Destroy()
		for i=#enemies,1,-1 do if enemies[i]==target then table.remove(enemies,i); break end end
		for i=#meteors,1,-1 do if meteors[i]==target then table.remove(meteors,i); break end end
		if wasBoss then
			activeBoss=nil; score+=250; stats.bosses+=1
			awardUltra(1000); message("BOSS DESTROYED!")
			ultraShield=math.min(lives,ultraShield+1)
		else
			addKill(target.isMeteor==true)
		end
		if chainExplosionLevel>0 then
			table.insert(explosions,{x=target.x,y=target.y,radius=75+chainExplosionLevel*20,life=.35,damage=damage*(.8+chainExplosionLevel*.25)})
		end
	end
end

local function chainLightning(origin: Vector2, first: any)
	if chainLightningLevel<=0 then return end
	local current=first
	local visited={[first]=true}
	for _=1,math.min(2+chainLightningLevel,8) do
		if not current then break end
		local nextTarget=nil; local best=150^2
		for _,list in ipairs({enemies,meteors}) do
			for _,candidate in ipairs(list) do
				if not visited[candidate] and candidate.ui and candidate.ui.Parent then
					local d=(candidate.x-current.x)^2+(candidate.y-current.y)^2
					if d<best then best=d; nextTarget=candidate end
				end
			end
		end
		if not nextTarget then break end
		visited[nextTarget]=true
		damageTarget(nextTarget,damage*.35)
		current=nextTarget
	end
end

local function spawnEnemyProjectile(x: number,y: number,targetX: number,targetY: number,damageAmount: number)
	local direction=Vector2.new(targetX-x,targetY-y)
	if direction.Magnitude==0 then direction=Vector2.new(0,1) end
	direction=direction.Unit
	local ui=newEntity("EnemyProjectile",10,C.red,x,y,"circle")
	table.insert(enemyProjectiles,{ui=ui,x=x,y=y,vx=direction.X*250,vy=direction.Y*250,damage=damageAmount,life=5})
end

local function spawnHealingParticle(amount: number)
	local center=ship.AbsolutePosition+ship.AbsoluteSize/2
	for _=1,math.min(amount*3,12) do
		local x=center.X+rng:NextNumber(-25,25); local y=center.Y+rng:NextNumber(-20,20)
		local ui=make("TextLabel",{
			Size=UDim2.fromOffset(34,34),AnchorPoint=Vector2.new(.5,.5),
			Position=UDim2.fromOffset(x,y),BackgroundTransparency=1,
			Text="+",TextColor3=C.green,TextSize=30,Font=Enum.Font.GothamBlack,
		},arena)
		table.insert(healingParticles,{ui=ui,x=x,y=y,age=0,life=1.8})
	end
end

local function drawUltraLaser(dt: number)
	if not ultraLaserUnlocked or os.clock()>ultraLaserUntil then
		if ultraLaserButton then ultraLaserButton.Visible=ultraLaserUnlocked end
		return
	end
	ultraLaserColorIndex=(ultraLaserColorIndex+dt*4)%6
	local colors={Color3.fromRGB(255,40,70),Color3.fromRGB(255,150,30),Color3.fromRGB(255,240,40),Color3.fromRGB(40,255,100),Color3.fromRGB(50,170,255),Color3.fromRGB(190,60,255)}
	local color=colors[math.floor(ultraLaserColorIndex)+1]
	local center=ship.AbsolutePosition+ship.AbsoluteSize/2
	laserBeam.Visible=true; laserBeam.BackgroundColor3=color
	laserBeam.Position=UDim2.fromOffset(center.X,center.Y)
	laserBeam.Size=UDim2.fromOffset(math.max(arena.AbsoluteSize.X,arena.AbsoluteSize.Y)*1.4,24)
	laserBeam.Rotation=math.deg(math.atan2(currentAim.Y,currentAim.X))
	for _,list in ipairs({enemies,meteors}) do
		for _,target in ipairs(list) do
			if beamHitsTarget(target,center,currentAim,1600,18) then
				damageTarget(target,damage*5*dt*8)
			end
		end
	end
end

local ultraPanelButton=button(arena,"ULTRA LASER",UDim2.fromOffset(135,34),UDim2.new(1,-150,1,-88),C.purple)
ultraPanelButton.TextSize=12; ultraPanelButton.Visible=false
ultraLaserButton=ultraPanelButton
ultraPanelButton.MouseButton1Click:Connect(function()
	if not ultraLaserUnlocked then return end
	local now=os.clock()
	if now<ultraLaserCooldownUntil or ultraPoints<5000 then message("ULTRA LASER NOT READY"); return end
	ultraPoints-=5000; grantUltraShieldFromSpend(5000)
	ultraLaserUntil=now+10; ultraLaserCooldownUntil=now+25
	message("ULTRA LASER ACTIVATED!")
end)

local ultraToggle=button(arena,"ULTRA: OFF",UDim2.fromOffset(135,34),UDim2.new(1,-150,1,-128),C.blue)
ultraToggle.TextSize=12
ultraButton=ultraToggle
ultraToggle.MouseButton1Click:Connect(function()
	if not ultraUnlocked then message("UNLOCK ULTRA MODE FIRST"); return end
	if ultraActive then
		ultraActive=false; ultraCooldownUntil=os.clock()+15; message("ULTRA MODE OFF")
	elseif os.clock()>=ultraCooldownUntil and ultraPoints>=1000 then
		ultraActive=true; message("ULTRA MODE ON")
	else
		message("ULTRA MODE RECHARGING")
	end
end)

-- Main advanced simulation: drones, swords, black holes, projectiles, damage-over-time,
-- freeze/stun/confusion, fire zones, laser, flamethrower, Ultra drain and visual effects.
RunService.Heartbeat:Connect(function(dt)
	dt=math.min(dt,.05)
	if not running or paused or gameOver or levelUpOpen then
		laserBeam.Visible=false; flameBeam.Visible=false
		return
	end
	local now=os.clock()
	local center=ship.AbsolutePosition+ship.AbsoluteSize/2
	local px,py=center.X,center.Y
	local rage=(upgradeLevels.lowHealthRage or 0)>0 and lives<=math.max(1,math.ceil(maxLives*.5))
	local damageMultiplier=rage and 1.25 or 1
	local moveMultiplier=rage and 1.5 or 1
	if ultraActive then
		ultraPoints=math.max(0,ultraPoints-1000*dt)
		if ultraPoints<=0 then ultraActive=false; ultraCooldownUntil=now+15; message("ULTRA ENERGY DEPLETED") end
	end
	if ultraActive then
		for _,target in ipairs(enemies) do
			if target.ui and target.ui.Parent then
				local dx,dy=px-target.x,py-target.y
				local d=math.sqrt(dx*dx+dy*dy)
				if d>0 and d<250 then target.x+=dx/d*80*dt; target.y+=dy/d*80*dt end
			end
		end
	end
	ultraToggle.Text=ultraActive and "ULTRA: ON" or "ULTRA: OFF"
	ultraToggle.BackgroundColor3=ultraActive and C.green or C.blue
	ultraPanelButton.Visible=ultraLaserUnlocked
	if ultraMiniShipLevel>0 then
		for n=1,ultraMiniShipLevel do
			local angle=now*1.4+(n-1)*math.pi*2/ultraMiniShipLevel
			local x=px+math.cos(angle)*88; local y=py+math.sin(angle)*55
			local target=nearestTarget(x,y)
			if target and now-(target.ultraLastShot or 0)>.18 then
				target.ultraLastShot=now
				damageTarget(target,damage*.45*dt*5)
			end
		end
	end
	if laserUnlocked and selectedWeapon=="Laser" then
		local direction=currentAim
		laserBeam.Visible=true
		laserBeam.Position=UDim2.fromOffset(px,py)
		laserBeam.Size=UDim2.fromOffset(1300,laserHeatLevel>0 and 15 or 8)
		laserBeam.Rotation=math.deg(math.atan2(direction.Y,direction.X))
		local heatMultiplier=1
		if laserHeatLevel>0 then
			laserHeat=math.min(10,laserHeat+dt)
			if laserHeat>=10 then
				heatMultiplier=1.5+laserHeatLevel*.25
			end
			if now<laserCoolingUntil then heatMultiplier=.5 end
		end
		for _,list in ipairs({enemies,meteors}) do
			for _,target in ipairs(list) do
				if beamHitsTarget(target,Vector2.new(px,py),direction,1300,8) then
					damageTarget(target,damage*.65*heatMultiplier*damageMultiplier*dt*12)
					lastContinuousHit=now
					if burnLevel>0 and rng:NextNumber()<math.min(.75,.2+burnLevel*.05) then
						applyStatus(target,"burn",10,damage*.5*(1+burnLevel*.5))
					end
					if poisonLevel>0 then applyStatus(target,"poison",math.huge,damage*.1*poisonLevel) end
				end
			end
		end
		if laserHeat>=10 and now-lastContinuousHit>1 then
			laserHeat=0; laserCoolingUntil=now+10
		end
	else
		laserBeam.Visible=false
		if laserHeat>0 then laserHeat=math.max(0,laserHeat-dt*.7) end
	end
	if flamethrowerUnlocked and selectedWeapon=="Flamethrower" then
		flameBeam.Visible=true
		flameBeam.Position=UDim2.fromOffset(px,py)
		flameBeam.Size=UDim2.fromOffset(240,55)
		flameBeam.Rotation=math.deg(math.atan2(currentAim.Y,currentAim.X))
		for _,list in ipairs({enemies,meteors}) do
			for _,target in ipairs(list) do
				if beamHitsTarget(target,Vector2.new(px,py),currentAim,240,32) then
					damageTarget(target,damage*.28*damageMultiplier*dt*10)
					applyStatus(target,"burn",3,damage*.35*(1+burnLevel*.25))
					lastContinuousHit=now
				end
			end
		end
	else
		flameBeam.Visible=false
	end
	for i=#drones,1,-1 do
		local d=drones[i]
		d.angle+=dt*(1.2+d.tier*.25)
		local x=px+math.cos(d.angle)*d.radius
		local y=py+math.sin(d.angle)*d.radius*.65
		d.timer-=dt
		if d.timer<=0 then
			d.timer=d.tier>=2 and .45 or .75
			local target=nearestTarget(x,y)
			if target then
				local shots=d.tier>=2 and 7 or (d.tier>=1 and 3 or 1)
				for n=1,shots do
					local spread=(n-(shots+1)/2)*.11
					damageTarget(target,damage*(d.tier>=2 and .25 or .2))
					if d.tier>=1 then
						local other=nearestTarget(x+spread*80,y)
						if other and other~=target then damageTarget(other,damage*.1) end
					end
				end
			end
		end
	end
	for n=1,swordCount do
		local angle=now*(2+fireRateMultiplier*.3)+(n-1)*math.pi*2/math.max(1,swordCount)
		local x=px+math.cos(angle)*65; local y=py+math.sin(angle)*45
		for _,list in ipairs({enemies,meteors}) do
			for _,target in ipairs(list) do
				if (target.x-x)^2+(target.y-y)^2<(target.radius+15)^2 then
					if now-(target.swordHitAt or 0)>.45 then
						target.swordHitAt=now
						damageTarget(target,swordDamage*damageMultiplier)
					end
				end
			end
		end
	end
	for i=#blackHoles,1,-1 do
		local hole=blackHoles[i]
		hole.age+=dt; hole.life-=dt
		hole.ui.Position=UDim2.fromOffset(hole.x,hole.y)
		hole.ui.Size=UDim2.fromOffset(38+math.sin(now*8)*5,38+math.sin(now*8)*5)
		for _,list in ipairs({enemies,meteors}) do
			for _,target in ipairs(list) do
				local dx,dy=hole.x-target.x,hole.y-target.y
				local dist=math.sqrt(dx*dx+dy*dy)
				if dist<hole.radius and dist>1 then
					target.x+=dx/dist*180*dt; target.y+=dy/dist*180*dt
					if dist<32 then damageTarget(target,hole.damage*dt*2) end
				end
			end
		end
		if hole.life<=0 then
			for _,list in ipairs({enemies,meteors}) do
				for _,target in ipairs(list) do
					if (target.x-hole.x)^2+(target.y-hole.y)^2<100^2 then damageTarget(target,hole.damage*2) end
				end
			end
			hole.ui:Destroy(); table.remove(blackHoles,i)
		end
	end
	for i=#enemyProjectiles,1,-1 do
		local b=enemyProjectiles[i]
		b.x+=b.vx*dt; b.y+=b.vy*dt; b.life-=dt
		b.ui.Position=UDim2.fromOffset(b.x,b.y)
		if (b.x-px)^2+(b.y-py)^2<28^2 then
			b.ui:Destroy(); table.remove(enemyProjectiles,i); damagePlayer()
		elseif b.life<=0 or b.y>arena.AbsoluteSize.Y+30 then
			b.ui:Destroy(); table.remove(enemyProjectiles,i)
		end
	end
	for i=#explosions,1,-1 do
		local ex=explosions[i]; ex.life-=dt
		for _,list in ipairs({enemies,meteors}) do
			for _,target in ipairs(list) do
				if (target.x-ex.x)^2+(target.y-ex.y)^2<ex.radius^2 then
					if now-(target.lastChainAt or 0)>.3 then
						target.lastChainAt=now; damageTarget(target,ex.damage*dt*5)
					end
				end
			end
		end
		if ex.life<=0 then table.remove(explosions,i) end
	end
	for target,entry in pairs(activeStatuses) do
		if not target.Parent then
			activeStatuses[target]=nil
		else
			local entity=nil
			for _,list in ipairs({enemies,meteors}) do
				for _,candidate in ipairs(list) do if candidate.ui==target then entity=candidate; break end end
				if entity then break end
			end
			if entity then
				if entry.poisonUntil and entity.hp>1 and now>=(entry.poisonNext or 0) then
					local interval=math.max(1/60,entry.poisonInterval or 1)
					local ticks=0
					while now>=(entry.poisonNext or 0) and entity.hp>1 and ticks<20 do
						local strength=math.clamp(entry.poisonStrength or 0,0,1)
						if entity.boss then strength*=.25 end
						local amount=math.min(entity.hp-1,entity.hp*strength)
						if amount>0 then
							entity.hp=math.max(1,entity.hp-amount)
							floatingText("POISON -"..math.floor(amount),entity.x,entity.y,C.green)
						end
						entry.poisonNext+=interval
						ticks+=1
					end
				end
				if entry.burnUntil and now<entry.burnUntil and now>=(entry.burnNext or 0) then
					entry.burnNext=now+.5
					damageTarget(entity,(entry.burnStrength or 1)*.5)
				end
				if entry.freezeUntil and now<entry.freezeUntil then
					entity.ui.BackgroundColor3=Color3.fromRGB(90,210,255)
				elseif entry.stunUntil and now<entry.stunUntil then
					entity.ui.BackgroundColor3=C.gold
				elseif entry.confusionUntil and now<entry.confusionUntil then
					entity.ui.BackgroundColor3=C.purple
				end
			end
		end
	end
	for i=#healingParticles,1,-1 do
		local p=healingParticles[i]; p.age+=dt
		p.ui.Position=UDim2.fromOffset(p.x,p.y-p.age*38)
		p.ui.TextTransparency=math.clamp(p.age/p.life,0,1)
		if p.age>=p.life then p.ui:Destroy(); table.remove(healingParticles,i) end
	end
	drawUltraLaser(dt)
	if now>=nextAchievementCheck then
		nextAchievementCheck=now+1
		updateAchievementStats(); updateAdvancedHud()
	end
end)

-- Enemies now have basic ranged attacks and special behavior. This scheduler is separate
-- from the original movement loop to keep the 2D simulation responsive.
task.spawn(function()
	while gui.Parent do
		task.wait(.65)
		if running and not paused and not gameOver then
			local center=ship.AbsolutePosition+ship.AbsoluteSize/2
			for _,enemy in ipairs(enemies) do
				if enemy.ui and enemy.ui.Parent and not enemy.boss then
					enemy.shootTimer=(enemy.shootTimer or 3)-.65
					if enemy.shootTimer<=0 then
						enemy.shootTimer=rng:NextNumber(2.5,5)
						spawnEnemyProjectile(enemy.x,enemy.y,center.X,center.Y,1)
					end
					local state=activeStatuses[enemy.ui]
					if state and state.confusionUntil and state.confusionUntil>os.clock() then
						local target=nearestTarget(enemy.x,enemy.y)
						if target and target~=enemy then damageTarget(target,2+confusionLevel) end
					end
					if state and state.freezeUntil and state.freezeUntil>os.clock() then
						enemy.speed=math.max(0,enemy.speed*.2)
					end
				elseif enemy.boss and enemy.ui and enemy.ui.Parent then
					enemy.shootTimer=(enemy.shootTimer or 2)-.65
					if enemy.shootTimer<=0 then
						enemy.shootTimer=1.5
						for n=-1,1 do spawnEnemyProjectile(enemy.x,enemy.y,center.X+n*100,center.Y,2) end
					end
				end
			end
		end
	end
end)

-- Special boss phase controller: split clones and stronger attack patterns.
task.spawn(function()
	while gui.Parent do
		task.wait(.2)
		if running and not paused and activeBoss and activeBoss.ui and activeBoss.ui.Parent then
			local boss=activeBoss
			local ratio=boss.hp/boss.maxHp
			if ratio<.65 and (boss.phase or 1)==1 then
				boss.phase=2; boss.speed=(boss.speed or 105)*1.45
				message("BOSS PHASE 2!")
			end
			if ratio<.3 and (boss.phase or 1)==2 then
				boss.phase=3; boss.speed=(boss.speed or 150)*1.35
				message("BOSS FINAL PHASE!")
			end
			if mirrorCloneLevel>0 and ratio<.5 and not boss.cloneSpawned then
				boss.cloneSpawned=true
				for n=1,2 do
					local ui=newEntity("MirrorClone",48,C.purple,boss.x+(n==1 and -70 or 70),boss.y,"circle")
					table.insert(enemies,{ui=ui,x=boss.x+(n==1 and -70 or 70),y=boss.y,
						hp=boss.maxHp*.12,maxHp=boss.maxHp*.12,speed=130,radius=24,kind=9})
				end
			end
		end
	end
end)

-- Healing effects, shield display and record tracking.
local oldAwardHeal = awardXP
local function updateLifeHud()
	livesLabel.Text="LIVES: "..lives.."/"..maxLives..(ultraShield>0 and "  🛡️"..ultraShield or "")
end
task.spawn(function()
	while gui.Parent do
		task.wait(.15)
		if running then
			updateLifeHud()
			totalDistanceRecord=math.max(totalDistanceRecord,math.floor(distance))
			if lives<=math.max(1,math.ceil(maxLives*.5)) and (upgradeLevels.lowHealthRage or 0)>0 then
				shipBody.BackgroundColor3=C.orange
				shipBody.BackgroundTransparency=.1+math.abs(math.sin(os.clock()*7))*.25
			else
				shipBody.BackgroundColor3=C.ship; shipBody.BackgroundTransparency=0
			end
		end
	end
end)

-- Reset every run-only system while keeping lifetime achievement progress in this session.
local baseStartGame=startGame
startGame=function()
	baseStartGame()
	maxLives=difficulty.lives; lives=maxLives
	dodgeChance=0; reviveAvailable=false; healOneUsed=false; fullHealUsed=false
	levelHealLevel=0; extraFireLevel=0; piercingLevel=0; homingLevel=0; luckLevel=0
	swordCount=0; swordDamage=8; droneCount=0; droneTier=0; table.clear(drones)
	blackHoleAmmo=0; blackHoleUnlocked=false; laserUnlocked=false; flamethrowerUnlocked=false
	laserHeatLevel=0; burnLevel=0; poisonLevel=0; freezeLevel=0; stunLevel=0; confusionLevel=0
	chainLightningLevel=0; chainExplosionLevel=0; mirrorCloneLevel=0; infernoBombLevel=0; deadlyLootLevel=0
	ultraLaserUnlocked=false; ultraMiniShipLevel=0; ultraCardCount=0; ultraCapacity=5000
	ultraSpentTowardShield=0; ultraLaserUntil=0; ultraLaserCooldownUntil=0
	table.clear(upgradeLevels); table.clear(activeStatuses); table.clear(blackHoles)
	table.clear(enemyProjectiles); table.clear(explosions); table.clear(healingParticles)
	laserHeat=0; laserCoolingUntil=0; lastContinuousHit=0; invulnerableUntil=0
	gameStartTime=os.clock()
	ultraPanelButton.Visible=false
	updateAdvancedHud(); updateLifeHud()
end

-- Additional keyboard bindings preserve the original WASD/arrow and pause controls.
UIS.InputBegan:Connect(function(input,processed)
	if processed then return end
	local key=input.KeyCode
	if key==Enum.KeyCode.Q then setWeapon(2)
	elseif key==Enum.KeyCode.R then setWeapon(3)
	elseif key==Enum.KeyCode.F then setWeapon(5)
	elseif key==Enum.KeyCode.E then setWeapon(1)
	elseif key==Enum.KeyCode.L then setWeapon(4)
	elseif key==Enum.KeyCode.Six then setWeapon(6)
	elseif key==Enum.KeyCode.H then achievementPanel.Visible=not achievementPanel.Visible end
end)

-- Refresh weapon labels with ammunition and show every new mechanic in the HUD.
local baseUpdateHud=updateHud
updateHud=function()
	baseUpdateHud()
	local ammoText=""
	if selectedWeapon=="RPG" then ammoText="  •  "..tostring(ammo.RPG or 0)
	elseif selectedWeapon=="Shotgun" then ammoText="  •  "..tostring(ammo.Shotgun or 0)
	elseif selectedWeapon=="BlackHole" then ammoText="  •  "..tostring(blackHoleAmmo) end
	weaponLabel.Text="WEAPON: "..string.upper(selectedWeapon)..ammoText
end

-- The Ultra meter is earned from distance, kills, and bosses; spending grants shields
-- for every 5,000 points spent, capped by current life capacity.
task.spawn(function()
	local lastMeterDistance=0
	while gui.Parent do
		task.wait(1)
		if running and not paused and not gameOver then
			local current=math.floor(distance/25)
			if current>lastMeterDistance then
				awardUltra((current-lastMeterDistance)*2)
				lastMeterDistance=current
			end
			if ultraActive and ultraPoints<1000 then
				ultraActive=false; ultraCooldownUntil=os.clock()+15
			end
			ultraCapacity=5000+math.max(0,level-1)*500+ultraCardCount*1500
			updateAdvancedHud()
		elseif not running then
			lastMeterDistance=0
		end
	end
end)

-- Achievement panel can be opened from the menu as well as the in-game HUD.
local menuAchievementButton=button(startPanel,"ACHIEVEMENTS",UDim2.fromOffset(210,36),UDim2.new(.5,-105,1,-46),C.gold)
menuAchievementButton.ZIndex=22
menuAchievementButton.MouseButton1Click:Connect(function()
	startPanel.Visible=false; achievementPanel.Visible=true
end)
achievementClose.MouseButton1Click:Connect(function()
	achievementPanel.Visible=false
	if not running and not gameOver then startPanel.Visible=true end
end)

updateHud()
updateAdvancedHud()
updateLifeHud()
message("WELCOME, PILOT")

