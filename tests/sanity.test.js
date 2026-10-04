const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const js = fs.readFileSync(path.join(root, 'src', 'game.js'), 'utf8');

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
    assert.match(index, new RegExp(`id=["']${id}["']`), `missing #${id}`);
  }
});

test('game script is loaded from the split source file and starts in strict mode', () => {
  assert.match(index, /<script\s+src=["']src\/game\.js["']><\/script>/);
  assert.match(js, /^["']use strict["'];/);
});

test('the split game source exposes the main gameplay entry points', () => {
  for (const name of ['startGame', 'update', 'draw', 'gameOver']) {
    assert.match(js, new RegExp(`function\\s+${name}\\s*\\(`), `missing ${name}()`);
  }
});
