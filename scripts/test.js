"use strict";

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function assertJson(file) {
  JSON.parse(read(file));
}

function assertPng(file) {
  const bytes = fs.readFileSync(path.join(root, file));
  const pngSignature = "89504e470d0a1a0a";
  assert(
    bytes.subarray(0, 8).toString("hex") === pngSignature,
    `${file} is not a PNG file`
  );
}

function testLocales() {
  const localeRoot = path.join(root, "src/_locales");
  const base = JSON.parse(
    fs.readFileSync(path.join(localeRoot, "en/messages.json"), "utf8")
  );
  const baseKeys = Object.keys(base).sort();
  for (const locale of fs.readdirSync(localeRoot)) {
    const file = path.join(localeRoot, locale, "messages.json");
    if (!fs.existsSync(file)) continue;
    const data = JSON.parse(fs.readFileSync(file, "utf8"));
    const keys = Object.keys(data).sort();
    const missing = baseKeys.filter((key) => !keys.includes(key));
    const extra = keys.filter((key) => !baseKeys.includes(key));
    assert(
      missing.length === 0 && extra.length === 0,
      `${locale} locale keys differ. missing=${missing.join(",")} extra=${extra.join(",")}`
    );
  }
}

function testPopupMenu() {
  const html = read("src/popup/popup.html");
  const popupJs = read("src/popup/popup.js");
  const optionsHtml = read("src/options/options.html");
  const configJs = read("src/lib/config.js");
  const forbiddenValues = [
    'value="translatePDF"',
    'value="showTranslateSelectedButton"',
    'value="showOriginalTextWhenHovering"',
    'value="showTranslatedWhenHoveringThisSite"',
    'value="showTranslatedWhenHoveringThisLang"',
  ];
  forbiddenValues.forEach((value) => {
    assert(!html.includes(value), `Popup menu still contains ${value}`);
  });
  assert(!html.includes("btnSwitchInterfaces"), "Popup can still switch to the old interface");
  assert(!popupJs.includes('twpConfig.set("useOldPopup", "yes")'), "Popup logic can still switch to the old interface");
  assert(!optionsHtml.includes('id="useOldPopup"'), "Options can still switch popup interface styles");
  assert(configJs.includes('useOldPopup: "no"'), "New popup must be the default interface");
}

function testAiProviders() {
  const optionsHtml = read("src/options/options.html");
  const optionsJs = read("src/options/options.js");
  const languagesJs = read("src/lib/languages.js");
  ["openrouter", "aihubmix", "customai"].forEach((serviceName) => {
    assert(optionsHtml.includes(serviceName), `${serviceName} missing from options UI`);
    assert(optionsJs.includes(serviceName), `${serviceName} missing from options logic`);
    assert(languagesJs.includes(`SupportedLanguages.${serviceName}`), `${serviceName} missing language support`);
  });
  assert(
    optionsHtml.includes("btnTestAiProvider"),
    "AI provider test button missing"
  );
}

[
  "src/manifest.json",
  "src/chrome_manifest.json",
  "package.json",
].forEach(assertJson);

[
  "src/icons/icon-16.png",
  "src/icons/icon-32.png",
  "src/icons/icon-64.png",
  "src/icons/icon-128.png",
  "src/icons/icon-32-translated.png",
].forEach(assertPng);

testLocales();
testPopupMenu();
testAiProviders();

console.log("All project checks passed.");
