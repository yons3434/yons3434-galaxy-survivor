"use strict";
(function (root) {
  const CHANCES = [0, 0.10, 0.15, 0.20, 0.30, 0.40, 0.50, 0.60, 0.70, 0.80, 0.90, 1.00];
  const DAMAGE_PER_TICK = [0, 0.05, 0.075, 0.10, 0.125, 0.15, 0.175, 0.20, 0.225, 0.25, 0.275, 0.30];
  const MAX_LEVEL = 11;

  function levelIndex(level) {
    return Math.max(0, Math.min(MAX_LEVEL, Math.floor(Number(level) || 0)));
  }

  const api = Object.freeze({
    maxLevel: MAX_LEVEL,
    durationMs: 4000,
    tickIntervalMs: 500,
    ticksPerApplication: 8,
    getChance(level) {
      return CHANCES[levelIndex(level)];
    },
    getDamageFraction(level) {
      return DAMAGE_PER_TICK[levelIndex(level)];
    },
    getTickDamage(maxHealth, level, isBoss) {
      const damage = Math.max(0, Number(maxHealth) || 0) * this.getDamageFraction(level);
      return isBoss ? damage / 4 : damage;
    }
  });

  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (root) root.GalaxyBurn = api;
})(typeof globalThis !== "undefined" ? globalThis : this);
