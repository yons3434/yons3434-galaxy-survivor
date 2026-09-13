export const difficultySettings = Object.freeze({
  easy: Object.freeze({
    enemyHP: 0.5,
    xp: 1.5,
    extraLives: 2,
    enemyTriple: false,
    deathSpread: false,
    background: "#062b15",
    color: "#00ff88",
    music: "easy"
  }),
  normal: Object.freeze({
    enemyHP: 1,
    xp: 1,
    extraLives: 0,
    enemyTriple: false,
    deathSpread: false,
    background: "#101b3d",
    color: "#4cc9f0",
    music: "normal"
  }),
  hard: Object.freeze({
    enemyHP: 1.5,
    xp: 0.75,
    extraLives: 0,
    enemyTriple: true,
    deathSpread: false,
    background: "#3b1200",
    color: "#ff9800",
    music: "hard"
  }),
  super: Object.freeze({
    enemyHP: 2,
    xp: 0.5,
    extraLives: -1,
    enemyTriple: true,
    deathSpread: false,
    background: "#350008",
    color: "#ff1744",
    music: "super"
  }),
  impossible: Object.freeze({
    enemyHP: 3,
    xp: 0.25,
    extraLives: -2,
    enemyTriple: true,
    deathSpread: true,
    background: "#000000",
    color: "#9c27b0",
    music: "impossible"
  })
});

export function getDifficultySettings(difficulty) {
  return difficultySettings[difficulty] ?? difficultySettings.normal;
}
