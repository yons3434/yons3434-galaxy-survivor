const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const indexPath = path.join(__dirname, '..', 'index.html');
const html = fs.readFileSync(indexPath, 'utf8');

test('index.html exists and contains the core game UI', () => {
  for (const id of [
    'gameCanvas',
    'hud',
    'startScreen',
    'startButton',
    'levelUp',
    'pauseMenu',
    'gameOver',
    'leaderboard',
    'achievementsOverlay',
    'profileOverlay'
  ]) {
    assert.match(html, new RegExp(`id=["']${id}["']`), `missing #${id}`);
  }
});

test('game script is present and starts in strict mode', () => {
  assert.match(html, /<script>[\s\S]*?["']use strict["'];/);
});

test('the game exposes the main gameplay entry points before refactoring', () => {
  for (const name of ['startGame', 'update', 'draw', 'gameOver']) {
    assert.match(html, new RegExp(`function\\s+${name}\\s*\\(`), `missing ${name}()`);
  }
});
