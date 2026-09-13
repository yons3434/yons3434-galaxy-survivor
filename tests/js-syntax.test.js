const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const scripts = [...html.matchAll(/<script(?:\\s[^>]*)?>([\\s\\S]*?)<\\/script>/gi)].map(m => m[1]);

test('all inline JavaScript parses without syntax errors', () => {
  assert.ok(scripts.length > 0, 'no inline script found');
  scripts.forEach((code, index) => {
    assert.doesNotThrow(() => new vm.Script(code), `script #${index + 1} has a syntax error`);
  });
});
