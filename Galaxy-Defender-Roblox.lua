-- GALAXY DEFENDER - Roblox LocalScript port (core playable build)
-- Install: StarterPlayer > StarterPlayerScripts > LocalScript
-- Profile name is always the Roblox username: Players.LocalPlayer.Name.
-- NOTE: This is the first playable Luau port of the core game loop.
-- Advanced original systems (all cards, bosses, achievements, Ultra, persistence)
-- are not yet ported; they are not represented as completed here.

local Players = game:GetService("Players")
local UIS = game:GetService("UserInputService")
local RunService = game:GetService("RunService")
local TweenService = game:GetService("TweenService")
local player = Players.LocalPlayer
local rng = Random.new()

local C = {
    bg = Color3.fromRGB(5, 7, 17),
    ship = Color3.fromRGB(76, 201, 240),
    white = Color3.fromRGB(245, 250, 255),
    red = Color3.fromRGB(255, 75, 95),
    orange = Color3.fromRGB(255, 160, 65),
    purple = Color3.fromRGB(170, 90, 255),
    green = Color3.fromRGB(90, 230, 145),
}

local gui = Instance.new("ScreenGui")
gui.Name = "GalaxyDefenderGui"
gui.IgnoreGuiInset = true
gui.ResetOnSpawn = false
gui.Parent = player:WaitForChild("PlayerGui")

local function make(className, props, parent)
    local obj = Instance.new(className)
    for key, value in pairs(props) do obj[key] = value end
    obj.Parent = parent
    return obj
end

local arena = make("Frame", {
    Name = "Arena", Size = UDim2.fromScale(1, 1),
    BackgroundColor3 = C.bg, BorderSizePixel = 0, ClipsDescendants = true,
}, gui)

-- Star background
for i = 1, 150 do
    local size = rng:NextInteger(1, 3)
    make("Frame", {
        Size = UDim2.fromOffset(size, size),
        Position = UDim2.fromScale(rng:NextNumber(), rng:NextNumber()),
        BackgroundColor3 = Color3.fromRGB(160, 190, 255),
        BackgroundTransparency = rng:NextNumber(0.15, 0.7),
        BorderSizePixel = 0,
    }, arena)
end

local hud = make("Frame", {
    Name = "HUD", Size = UDim2.new(1, -24, 0, 42),
    Position = UDim2.fromOffset(12, 10), BackgroundTransparency = 1,
}, arena)

local function label(name, x, width, value)
    return make("TextLabel", {
        Name = name, Size = UDim2.fromOffset(width, 38),
        Position = UDim2.fromOffset(x, 0),
        BackgroundColor3 = Color3.fromRGB(0, 0, 0),
        BackgroundTransparency = 0.2, BorderSizePixel = 0,
        Text = value, TextColor3 = C.white, TextSize = 15,
        Font = Enum.Font.GothamBold,
    }, hud)
end

-- The profile is the Roblox account username, not DisplayName.
local profile = label("Profile", 0, 190, "PROFILE: " .. player.Name)
local scoreText = label("Score", 198, 130, "SCORE: 0")
local livesText = label("Lives", 336, 110, "LIVES: 3")
local levelText = label("Level", 454, 110, "LEVEL: 1")

local xpBack = make("Frame", {
    Name = "XPBack", Size = UDim2.fromOffset(320, 12),
    Position = UDim2.new(0.5, -160, 0, 58),
    BackgroundColor3 = Color3.fromRGB(35, 40, 55), BorderSizePixel = 0,
}, arena)
local xpFill = make("Frame", {
    Name = "XPFill", Size = UDim2.fromScale(0, 1),
    BackgroundColor3 = C.ship, BorderSizePixel = 0,
}, xpBack)

local notice = make("TextLabel", {
    Name = "Notice", Size = UDim2.new(0.8, 0, 0, 44),
    Position = UDim2.new(0.1, 0, 0.15, 0),
    BackgroundTransparency = 1, Text = "GALAXY DEFENDER",
    TextColor3 = C.white, TextSize = 27, Font = Enum.Font.GothamBlack,
}, arena)

local ship = make("Frame", {
    Name = "PlayerShip", Size = UDim2.fromOffset(46, 50),
    AnchorPoint = Vector2.new(0.5, 0.5),
    Position = UDim2.new(0.5, 0, 0.82, 0),
    BackgroundTransparency = 1,
}, arena)

-- Cyan geometric ship silhouette inspired by the original Canvas ship.
make("Frame", {
    Size = UDim2.fromOffset(12, 39), Position = UDim2.new(0.5, -6, 0, 5),
    BackgroundColor3 = C.ship, BorderSizePixel = 0,
}, ship)
make("Frame", {
    Size = UDim2.fromOffset(40, 10), Position = UDim2.new(0.5, -20, 0, 29),
    BackgroundColor3 = C.ship, BorderSizePixel = 0,
}, ship)
make("Frame", {
    Size = UDim2.fromOffset(7, 17), Position = UDim2.new(0.5, -3.5, 0, 0),
    BackgroundColor3 = C.white, BorderSizePixel = 0,
}, ship)
make("Frame", {
    Size = UDim2.fromOffset(8, 13), Position = UDim2.new(0.5, -4, 0, 37),
    BackgroundColor3 = C.orange, BorderSizePixel = 0,
}, ship)

local score, lives, level, xp = 0, 3, 1, 0
local xpRequired = 100
local bullets, enemies, meteors = {}, {}, {}
local keys = {left=false, right=false, up=false, down=false}
local paused, gameOver = false, false
local lastShot, lastSpawn = 0, 0
local fireCooldown = 0.2

local function updateHud()
    scoreText.Text = "SCORE: " .. score
    livesText.Text = "LIVES: " .. lives
    levelText.Text = "LEVEL: " .. level
    xpFill.Size = UDim2.new(math.clamp(xp / xpRequired, 0, 1), 0, 1, 0)
end

local function say(text)
    notice.Text = text
    notice.TextTransparency = 0
    task.delay(1.5, function()
        if notice.Parent and not gameOver then
            TweenService:Create(notice, TweenInfo.new(0.5), {TextTransparency=1}):Play()
        end
    end)
end

local function awardXP(amount)
    xp += amount
    while xp >= xpRequired do
        xp -= xpRequired
        level += 1
        xpRequired = math.floor(xpRequired * 1.18)
        say("LEVEL UP! " .. level)
    end
    updateHud()
end

local function removeAt(list, index)
    local item = list[index]
    if item and item.ui then item.ui:Destroy() end
    table.remove(list, index)
end

local function shoot()
    if paused or gameOver or os.clock() - lastShot < fireCooldown then return end
    lastShot = os.clock()
    local p = ship.Position
    local bullet = make("Frame", {
        Name = "PlayerBullet", Size = UDim2.fromOffset(5, 16),
        AnchorPoint = Vector2.new(0.5, 0.5),
        Position = UDim2.new(p.X.Scale, p.X.Offset, p.Y.Scale, p.Y.Offset - 27),
        BackgroundColor3 = C.ship, BorderSizePixel = 0,
    }, arena)
    table.insert(bullets, {ui=bullet, x=p.X.Scale, y=p.Y.Scale, speed=0.95})
end

local function spawnEnemy()
    local size = rng:NextInteger(26, 40)
    local x = rng:NextNumber(0.05, 0.95)
    local enemy = make("Frame", {
        Name = "EnemyShip", Size = UDim2.fromOffset(size, size),
        AnchorPoint = Vector2.new(0.5, 0.5),
        Position = UDim2.new(x, 0, -0.05, 0),
        BackgroundColor3 = C.red, BorderSizePixel = 0,
    }, arena)
    make("UICorner", {CornerRadius=UDim.new(1, 0)}, enemy)
    make("UIStroke", {Color=Color3.fromRGB(255, 180, 190), Thickness=2}, enemy)
    table.insert(enemies, {
        ui=enemy, x=x, y=-0.05, hp=math.max(1, math.floor(level/4)+1),
        speed=rng:NextNumber(0.12, 0.2) + level*0.003,
    })
end

local function spawnMeteor()
    local size = rng:NextInteger(30, 54)
    local x = rng:NextNumber(0.05, 0.95)
    local meteor = make("Frame", {
        Name="Meteorite", Size=UDim2.fromOffset(size,size),
        AnchorPoint=Vector2.new(0.5,0.5),
        Position=UDim2.new(x,0,-0.07,0),
        BackgroundColor3=Color3.fromRGB(125,125,135),
        BorderSizePixel=0, Rotation=rng:NextInteger(0,359),
    }, arena)
    make("UICorner", {CornerRadius=UDim.new(0.28,0)}, meteor)
    make("UIStroke", {Color=Color3.fromRGB(35,35,45),Thickness=2}, meteor)
    table.insert(meteors,{ui=meteor,x=x,y=-0.07,speed=rng:NextNumber(0.08,0.14),hp=3})
end

local function endGame()
    if gameOver then return end
    gameOver = true
    say("GAME OVER  |  SCORE: " .. score)
    make("TextLabel", {
        Name="GameOver", Size=UDim2.fromOffset(330,65),
        AnchorPoint=Vector2.new(0.5,0.5), Position=UDim2.fromScale(0.5,0.58),
        BackgroundColor3=Color3.fromRGB(20,20,35),
        Text="GAME OVER  |  SCORE: "..score,
        TextColor3=C.white, TextSize=22, Font=Enum.Font.GothamBlack,
    }, arena)
end

local function damagePlayer()
    if gameOver then return end
    lives -= 1
    updateHud()
    ship.BackgroundColor3 = C.red
    task.delay(0.15, function()
        if ship.Parent then ship.BackgroundColor3 = C.white end
    end)
    if lives <= 0 then endGame() end
end

UIS.InputBegan:Connect(function(input, processed)
    if processed then return end
    local key = input.KeyCode
    if key == Enum.KeyCode.A or key == Enum.KeyCode.Left then keys.left=true end
    if key == Enum.KeyCode.D or key == Enum.KeyCode.Right then keys.right=true end
    if key == Enum.KeyCode.W or key == Enum.KeyCode.Up then keys.up=true end
    if key == Enum.KeyCode.S or key == Enum.KeyCode.Down then keys.down=true end
    if key == Enum.KeyCode.Space then shoot() end
    if key == Enum.KeyCode.P or key == Enum.KeyCode.Escape then
        paused = not paused
        say(paused and "PAUSED" or "RESUMED")
    end
end)

UIS.InputEnded:Connect(function(input)
    local key = input.KeyCode
    if key == Enum.KeyCode.A or key == Enum.KeyCode.Left then keys.left=false end
    if key == Enum.KeyCode.D or key == Enum.KeyCode.Right then keys.right=false end
    if key == Enum.KeyCode.W or key == Enum.KeyCode.Up then keys.up=false end
    if key == Enum.KeyCode.S or key == Enum.KeyCode.Down then keys.down=false end
end)

RunService.RenderStepped:Connect(function(dt)
    if paused or gameOver then return end

    local p = ship.Position
    local dx = (keys.right and 1 or 0) - (keys.left and 1 or 0)
    local dy = (keys.down and 1 or 0) - (keys.up and 1 or 0)
    ship.Position = UDim2.new(
        math.clamp(p.X.Scale + dx*0.62*dt, 0.025, 0.975), 0,
        math.clamp(p.Y.Scale + dy*0.62*dt, 0.12, 0.94), 0
    )

    if UIS:IsKeyDown(Enum.KeyCode.Space) then shoot() end

    local now = os.clock()
    if now - lastSpawn > math.max(0.35, 1.1 - level*0.025) then
        lastSpawn = now
        spawnEnemy()
        if rng:NextNumber() < 0.2 then spawnMeteor() end
    end

    for i = #bullets, 1, -1 do
        local b = bullets[i]
        b.y -= b.speed * dt
        b.ui.Position = UDim2.new(b.x,0,b.y,0)
        if b.y < -0.05 then removeAt(bullets,i) end
    end

    local shipPos = ship.Position
    local sx, sy = shipPos.X.Scale, shipPos.Y.Scale

    for i = #enemies, 1, -1 do
        local e = enemies[i]
        e.y += e.speed * dt
        e.ui.Position = UDim2.new(e.x,0,e.y,0)
        if math.abs(e.x-sx) < 0.04 and math.abs(e.y-sy) < 0.05 then
            removeAt(enemies,i)
            damagePlayer()
        elseif e.y > 1.05 then
            removeAt(enemies,i)
            damagePlayer()
        else
            for j = #bullets, 1, -1 do
                local b = bullets[j]
                if math.abs(b.x-e.x) < 0.035 and math.abs(b.y-e.y) < 0.045 then
                    removeAt(bullets,j)
                    e.hp -= 1
                    if e.hp <= 0 then
                        removeAt(enemies,i)
                        score += 10
                        awardXP(10)
                    end
                    break
                end
            end
        end
    end

    for i = #meteors, 1, -1 do
        local m = meteors[i]
        m.y += m.speed * dt
        m.ui.Position = UDim2.new(m.x,0,m.y,0)
        if math.abs(m.x-sx) < 0.05 and math.abs(m.y-sy) < 0.055 then
            removeAt(meteors,i)
            damagePlayer()
        elseif m.y > 1.08 then
            removeAt(meteors,i)
        else
            for j = #bullets, 1, -1 do
                local b = bullets[j]
                if math.abs(b.x-m.x) < 0.045 and math.abs(b.y-m.y) < 0.055 then
                    removeAt(bullets,j)
                    m.hp -= 1
                    if m.hp <= 0 then
                        removeAt(meteors,i)
                        score += 5
                        awardXP(5)
                    end
                    break
                end
            end
        end
    end
    updateHud()
end)

updateHud()
say("DESTROY THE ENEMY SHIPS!")
