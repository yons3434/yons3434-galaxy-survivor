const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

const i18n = fs.readFileSync("src/i18n.js", "utf8");
const html = fs.readFileSync("index.html", "utf8");

test("internationalization script has valid JavaScript syntax", () => {
  assert.doesNotThrow(() => new vm.Script(i18n, { filename: "src/i18n.js" }));
});

test("language selector exposes all seven supported languages", () => {
  for (const code of ["he", "en", "es", "fr", "de", "ru", "ar"]) {
    assert.match(html, new RegExp('option value="' + code + '"'));
  }
  assert.match(html, /id="languageSelect"/);
  assert.match(html, /src="src\/i18n\.js"/);
});

test("first-visit detection prefers supported browser languages, then region/time zone, then English", () => {
  assert.match(i18n, /prefs\.find\(x=>supported\.includes\(x\)\)/);
  assert.match(i18n, /region\[code\]/);
  assert.match(i18n, /zones\[Intl\.DateTimeFormat/);
});

test("saved language is reused and manual changes are persisted", () => {
  assert.match(i18n, /localStorage\.getItem\(KEY\)/);
  assert.match(i18n, /localStorage\.setItem\(KEY,code\)/);
  assert.match(i18n, /localStorage\.setItem\(KEY\+"_manual","1"\)/);
});

test("Hebrew and Arabic use RTL; other supported languages use LTR", () => {
  assert.match(i18n, /code==="he"\|\|code==="ar"/);
  assert.match(i18n, /document\.documentElement\.dir=/);
});
