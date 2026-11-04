/* Ultra Mini Spaceship: independent orbit, burst laser, and chained Ultra beams. */
(function () {
  "use strict";

  const MAX_LEVEL = 5;
  const POINT_COST = 3000;
  const MAX_CONNECTIONS = 20;
  const COOLDOWN_MS = 20000;
  const SHOT_INTERVAL_MS = 3000;
  const SHOT_DURATION_MS = 500;
  const STOP_DURATION_MS = 700;
  const NORMAL_DPS = 300;
  const ULTRA_DPS = 300;
  const SHIP_ORBIT_X = 112;
  const SHIP_ORBIT_Y = 72;
  const SHIP_SPEED = 0.012;
  const CHAIN_INTERVAL_MS = 400;

  let ultraMiniShipLevel = 0;
  let ultraMiniShips = [];
  let ultraMiniModeActive = false;
  let ultraMiniConnections = 0;
  let ultraMiniCooldownUntil = 0;
  let lastFrameAt = 0;
  let cardAdded = false;

  const card = {
    id: "ultraMiniShip",
    rarity: "אולטרה",
    rarityClass: "ultra",
    icon: "🛸",
    title: "אולטרה מיני חללית",
    description: "חלליות שמסתובבות סביב השחקן ויורות קרני לייזר לעבר אויבים. כל רמה מוסיפה חללית נוספת."
  };

  function addCard() {
    if (cardAdded || !Array.isArray(upgrades)) return;
    upgrades.push(card);
    cardAdded = true;
  }

  function ensureShipCount() {
    while (ultraMiniShips.length < ultraMiniShipLevel) {
      const index = ultraMiniShips.length;
      ultraMiniShips.push({
        angle: (Math.PI * 2 * index) / Math.max(1, ultraMiniShipLevel),
        fireStartedAt: 0,
        nextShotAt: performance.now() + 1000 + index * 350,
        stopUntil: 0,
        chainAt: 0,
        x: player.x,
        y: player.y,
        beams: []
      });
    }
    ultraMiniShips.forEach((ship, index) => {
      ship.slot = index;
      ship.angle = Number.isFinite(ship.angle) ? ship.angle : (Math.PI * 2 * index) / Math.max(1, ultraMiniShips.length);
    });
  }

  function nearestTarget(x, y, excluded) {
    let best = null;
    let bestDistance = Infinity;
    for (const target of [...enemies, ...asteroids]) {
      if (!target || target.health <= 0 || target.teleportHidden || (excluded && excluded.has(target))) continue;
      const distance = Math.hypot(target.x - x, target.y - y);
      if (distance < bestDistance) {
        best = target;
        bestDistance = distance;
      }
    }
    return best;
  }

  function finishUltraMiniMode(message) {
    ultraMiniModeActive = false;
    ultraModeActive = false;
    ultraMiniCooldownUntil = performance.now() + COOLDOWN_MS;
    ultraCooldownUntil = Math.max(Number(ultraCooldownUntil) || 0, performance.now() + 15000);
    ultraLastCountdown = -1;
    ultraMiniShips.forEach(ship => {
      ship.beams = [];
      ship.chainAt = 0;
    });
    showMessage(message || "🛸 הקרן ה־20 התחברה — מצב האולטרה הסתיים!");
    updateHUD();
  }

  function connectNextBeam(ship, now, impactPoint = null) {
    if (!ultraMiniModeActive || ultraMiniConnections >= MAX_CONNECTIONS) return;
    const excluded = new Set(ship.beams.filter(beam => beam.target && beam.target.health > 0).map(beam => beam.target));
    const origin = impactPoint || ship.lastImpact || (ship.beams.length ? ship.beams[ship.beams.length - 1].target : ship);
    const target = nearestTarget(origin.x, origin.y, excluded);
    if (!target) return;
    ship.beams.push({ target, connectedAt: now });
    ship.lastImpact = null;
    ultraMiniConnections += 1;
    ship.chainAt = now + CHAIN_INTERVAL_MS;
    if (ultraMiniConnections >= MAX_CONNECTIONS) finishUltraMiniMode("🛸 הקרן ה־20 התחברה — מצב האולטרה הסתיים!");
  }

  function updateShips() {
    if (!gameStarted || !gameRunning) return;
    const now = performance.now();
    const dt = lastFrameAt ? Math.min(0.05, (now - lastFrameAt) / 1000) : 1 / 60;
    lastFrameAt = now;
    ensureShipCount();

    if (ultraMiniModeActive && !ultraModeActive) {
      ultraMiniModeActive = false;
      ultraMiniShips.forEach(ship => { ship.beams = []; });
    }

    ultraMiniShips.forEach((ship, index) => {
      const firing = now < ship.stopUntil;
      if (!firing) ship.angle += SHIP_SPEED * (dt * 60);
      ship.x = player.x + Math.cos(ship.angle) * SHIP_ORBIT_X;
      ship.y = player.y + Math.sin(ship.angle) * SHIP_ORBIT_Y;

      if (ultraMiniModeActive && ultraModeActive) {
        const brokenBeam = ship.beams.find(beam => !beam.target || beam.target.health <= 0);
        if (brokenBeam && brokenBeam.target) ship.lastImpact = { x: brokenBeam.target.x, y: brokenBeam.target.y };
        ship.beams = ship.beams.filter(beam => beam.target && beam.target.health > 0);
        ship.beams.forEach(beam => {
          const damage = ULTRA_DPS * dt;
          beam.target.health -= damage;
          if (damage > 0) showDamageNumber(beam.target, damage);
          if (beam.target.health <= 0) {
            ship.lastImpact = { x: beam.target.x, y: beam.target.y };
            if (enemies.includes(beam.target)) destroyEnemy(beam.target);
            else if (asteroids.includes(beam.target)) destroyAsteroid(beam.target);
          }
        });
        const brokenDuringDamage = ship.beams.some(beam => !beam.target || beam.target.health <= 0);
        if (brokenBeam || brokenDuringDamage) {
          const impactPoint = ship.lastImpact;
          ship.beams = ship.beams.filter(beam => beam.target && beam.target.health > 0);
          connectNextBeam(ship, now, impactPoint);
        } else if (ship.lastImpact && now >= ship.chainAt) {
          connectNextBeam(ship, now, ship.lastImpact);
        } else if (now >= ship.chainAt && ultraMiniConnections < MAX_CONNECTIONS) {
          connectNextBeam(ship, now);
        }
        return;
      }

      if (now >= ship.nextShotAt && now >= ship.stopUntil) {
        const target = nearestTarget(ship.x, ship.y);
        if (target) {
          ship.fireStartedAt = now;
          ship.stopUntil = now + STOP_DURATION_MS;
          ship.nextShotAt = now + SHOT_INTERVAL_MS;
          ship.burstTarget = target;
        } else {
          ship.nextShotAt = now + 250;
        }
      }

      if (ship.burstTarget && now < ship.fireStartedAt + SHOT_DURATION_MS && ship.burstTarget.health > 0) {
        const damage = NORMAL_DPS * dt;
        ship.burstTarget.health -= damage;
        if (damage > 0) showDamageNumber(ship.burstTarget, damage);
        if (ship.burstTarget.health <= 0) {
          if (enemies.includes(ship.burstTarget)) destroyEnemy(ship.burstTarget);
          else if (asteroids.includes(ship.burstTarget)) destroyAsteroid(ship.burstTarget);
          ship.burstTarget = null;
        }
      } else if (now >= ship.fireStartedAt + SHOT_DURATION_MS) {
        ship.burstTarget = null;
      }
    });
  }

  function drawShips() {
    if (!gameStarted || !ultraMiniShips.length) return;
    const now = performance.now();
    ctx.save();
    ultraMiniShips.forEach(ship => {
      if (ultraMiniModeActive && ultraModeActive) {
        ship.beams.forEach((beam, index) => {
          const target = beam.target;
          if (!target || target.health <= 0) return;
          const hue = (now / 8 + index * 35) % 360;
          ctx.save();
          ctx.strokeStyle = `hsl(${hue},100%,65%)`;
          ctx.shadowColor = ctx.strokeStyle;
          ctx.shadowBlur = 15;
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.moveTo(ship.x, ship.y);
          ctx.lineTo(target.x, target.y);
          ctx.stroke();
          ctx.restore();
        });
      } else if (ship.burstTarget && now < ship.fireStartedAt + SHOT_DURATION_MS && ship.burstTarget.health > 0) {
        ctx.save();
        ctx.strokeStyle = "#62f7ff";
        ctx.shadowColor = "#62f7ff";
        ctx.shadowBlur = 18;
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(ship.x, ship.y);
        ctx.lineTo(ship.burstTarget.x, ship.burstTarget.y);
        ctx.stroke();
        ctx.restore();
      }
      ctx.save();
      ctx.translate(ship.x, ship.y);
      ctx.rotate(ship.angle + Math.PI / 2);
      ctx.shadowColor = ultraMiniModeActive ? "#ff4df0" : "#67f7ff";
      ctx.shadowBlur = ultraMiniModeActive ? 22 : 12;
      ctx.fillStyle = ultraMiniModeActive ? "#f4b5ff" : "#75f7ff";
      ctx.beginPath();
      ctx.moveTo(0, -15);
      ctx.lineTo(-10, 10);
      ctx.lineTo(0, 6);
      ctx.lineTo(10, 10);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    });
    ctx.restore();
  }

  function updateButton() {
    const button = document.getElementById("ultraMiniShipButton");
    if (!button) return;
    const now = performance.now();
    const remaining = Math.max(0, Math.ceil((ultraMiniCooldownUntil - now) / 1000));
    const visible = ultraUnlocked && ultraMiniShipLevel > 0 && gameStarted && gameOverScreen.style.display !== "flex";
    const unavailable = !ultraMiniModeActive && (remaining > 0 || ultraPoints < POINT_COST || !gameRunning);
    button.style.display = visible ? "flex" : "none";
    button.classList.toggle("active", ultraMiniModeActive);
    button.classList.toggle("disabled", unavailable);
    button.disabled = unavailable;
    button.innerHTML = GalaxyI18n.translate("🛸 מיני חללית אולטרה") + "<br><small>" +
      (ultraMiniModeActive ? ultraMiniConnections + " / 20 " + GalaxyI18n.translate("קרניים") :
        remaining ? "⏳ " + remaining + " " + GalaxyI18n.translate("שניות") :
          Math.floor(ultraPoints).toLocaleString("en-US") + " / 3,000 " + GalaxyI18n.translate("נקודות")) + "</small>";
  }

  const originalGetUpgradeCardTitle = getUpgradeCardTitle;
  getUpgradeCardTitle = function (upgrade) {
    if (upgrade.id === "ultraMiniShip") return upgrade.title + " " + ["I", "II", "III", "IV", "V"][ultraMiniShipLevel];
    return originalGetUpgradeCardTitle(upgrade);
  };

  const originalApplyUpgrade = applyUpgrade;
  applyUpgrade = function (upgrade) {
    originalApplyUpgrade(upgrade);
    if (upgrade.id === "ultraMode") addCard();
    if (upgrade.id === "ultraMiniShip" && ultraMiniShipLevel < MAX_LEVEL) {
      ultraMiniShipLevel += 1;
      ensureShipCount();
      showMessage("🛸 אולטרה מיני חללית " + ["I", "II", "III", "IV", "V"][ultraMiniShipLevel - 1] + " נפתחה!");
    }
  };

  const originalOpenLevelUp = openLevelUp;
  openLevelUp = function () {
    if (ultraUnlocked && ultraMiniShipLevel < MAX_LEVEL) addCard();
    else if (ultraMiniShipLevel >= MAX_LEVEL) {
      const index = upgrades.findIndex(upgrade => upgrade.id === "ultraMiniShip");
      if (index >= 0) upgrades.splice(index, 1);
    }
    originalOpenLevelUp();
  };

  const originalUpdate = update;
  update = function () {
    originalUpdate();
    updateShips();
    updateButton();
  };

  const originalDraw = draw;
  draw = function () {
    originalDraw();
    drawShips();
  };

  const originalSpendUltraModePoints = spendUltraModePoints;
  spendUltraModePoints = function () {
    if (ultraMiniModeActive) return;
    originalSpendUltraModePoints();
  };

  const originalUpdateHUD = updateHUD;
  updateHUD = function () {
    originalUpdateHUD();
    updateButton();
  };

  document.getElementById("ultraMiniShipButton").addEventListener("click", function () {
    if (ultraMiniModeActive) {
      ultraMiniModeActive = false;
      ultraModeActive = false;
      ultraCooldownUntil = performance.now() + 15000;
      ultraMiniCooldownUntil = performance.now() + COOLDOWN_MS;
      showMessage("🛸 מצב אולטרה מיני חללית כובה");
      updateHUD();
      return;
    }
    if (!ultraUnlocked || ultraMiniShipLevel <= 0 || !gameRunning) return;
    if (performance.now() < ultraMiniCooldownUntil) return;
    if (ultraPoints < POINT_COST) {
      showMessage("נדרשות 3,000 נקודות אולטרה");
      return;
    }
    ultraPoints -= POINT_COST;
    ultraModeActive = true;
    ultraMiniModeActive = true;
    ultraMiniConnections = 0;
    ultraMiniShips.forEach((ship, index) => {
      ship.beams = [];
      ship.chainAt = performance.now() + index * 100;
    });
    showMessage("🛸 אולטרה מיני חללית הופעלה!");
    updateHUD();
  });

  updateButton();
})();
