const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const js = fs.readFileSync(path.join(root, 'src', 'game.js'), 'utf8');

test('split game JavaScript parses without syntax errors', () => {
  assert.doesNotThrow(() => new vm.Script(js), 'src/game.js has a syntax error');
});
