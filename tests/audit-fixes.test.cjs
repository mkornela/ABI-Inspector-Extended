const test = require("node:test");
const assert = require("node:assert/strict");
const path = require("path");
const fs = require("fs");
const zlib = require("zlib");

const root = path.resolve(__dirname, "..");
const enhancerDir = path.join(root, "abi-inspector-enhancer");

const getLaunchOptions = () => ({
  headless: true,
  channel: process.env.ABI_TEST_BROWSER || (process.platform === "win32" ? "msedge" : undefined),
});

// ============================================================================
// 1. Time display precision & formatting
// ============================================================================
test("Time display precision: 3-digit millisecond formatting, boundary handling, and non-finite values", () => {
  const contentJs = fs.readFileSync(path.join(enhancerDir, "content.js"), "utf8");

  // Extract the format function directly from content.js
  const formatMatch = contentJs.match(/const format = \([\s\S]*?\n  \};/);
  assert.ok(formatMatch, "format function found in content.js");
  const format = eval(`(${formatMatch[0].replace(/^const format = /, "").replace(/;$/, "")})`);

  // Standard format (showMs = false)
  assert.equal(format(0), "00:00");
  assert.equal(format(14.35), "00:14");
  assert.equal(format(62), "01:02");
  assert.equal(format(3661), "1:01:01");
  assert.equal(format(NaN), "--:--");
  assert.equal(format(Infinity), "--:--");
  assert.equal(format(-5), "00:00");

  // Millisecond precision format (showMs = true)
  assert.equal(format(0, true), "00:00.000");
  assert.equal(format(14.35, true), "00:14.350");
  assert.equal(format(14.45, true), "00:14.450");
  assert.equal(format(62, true), "01:02.000");
  assert.equal(format(3661.123, true), "1:01:01.123");
  assert.equal(format(0.001, true), "00:00.001");
  assert.equal(format(0.999, true), "00:00.999");
  assert.equal(format(NaN, true), "--:--.---");
  assert.equal(format(Infinity, true), "--:--.---");
  assert.equal(format(-5, true), "00:00.000");
});

// ============================================================================
// 2. Legacy vision-mode preference migration
// ============================================================================
test("Legacy vision-mode preference migration: 3.0.4 preferences, conflict precedence, invalid values, and fresh install", () => {
  function runMigration(storage) {
    let gammaMode = "normal";
    let saved = storage["abi-gamma-mode"] || null;
    const legacyVision = storage["abi-vision-mode"] !== undefined ? storage["abi-vision-mode"] : null;
    const validGamma = ["normal", "shadow", "max", "silhouette", "invert", "thermal"];
    const validVision = ["silhouette", "invert", "thermal"];

    if (legacyVision !== null) {
      if ((!saved || saved === "normal") && validVision.includes(legacyVision)) {
        saved = legacyVision;
        storage["abi-gamma-mode"] = legacyVision;
      }
      delete storage["abi-vision-mode"];
    }

    if (saved && validGamma.includes(saved)) {
      gammaMode = saved;
    } else {
      gammaMode = "normal";
    }
    return { gammaMode, storage };
  }

  // Case 1: Fresh installation
  const fresh = runMigration({});
  assert.equal(fresh.gammaMode, "normal", "Fresh install defaults to normal");
  assert.equal(fresh.storage["abi-vision-mode"], undefined, "No legacy key created");

  // Case 2: 3.0.4-era preference: vision mode saved, gamma unset
  const migratedSilhouette = runMigration({ "abi-vision-mode": "silhouette" });
  assert.equal(migratedSilhouette.gammaMode, "silhouette", "Migrates legacy silhouette mode to gamma");
  assert.equal(migratedSilhouette.storage["abi-gamma-mode"], "silhouette", "Saves migrated preference in abi-gamma-mode");
  assert.equal(migratedSilhouette.storage["abi-vision-mode"], undefined, "Cleans up legacy key");

  const migratedThermal = runMigration({ "abi-vision-mode": "thermal", "abi-gamma-mode": "normal" });
  assert.equal(migratedThermal.gammaMode, "thermal", "Migrates legacy thermal when gamma is 'normal'");
  assert.equal(migratedThermal.storage["abi-gamma-mode"], "thermal", "Consolidates thermal into abi-gamma-mode");
  assert.equal(migratedThermal.storage["abi-vision-mode"], undefined, "Cleans up legacy key");

  // Case 3: Conflict: both keys have meaningful non-normal values -> abi-gamma-mode takes precedence
  const conflict = runMigration({ "abi-gamma-mode": "shadow", "abi-vision-mode": "thermal" });
  assert.equal(conflict.gammaMode, "shadow", "abi-gamma-mode takes precedence over legacy key in conflicts");
  assert.equal(conflict.storage["abi-gamma-mode"], "shadow", "Maintains shadow mode");
  assert.equal(conflict.storage["abi-vision-mode"], undefined, "Removes conflicting legacy key");

  // Case 4: Invalid legacy value
  const invalid = runMigration({ "abi-vision-mode": "corrupted_mode_123", "abi-gamma-mode": "invalid_gamma" });
  assert.equal(invalid.gammaMode, "normal", "Falls back safely to normal for invalid values");
  assert.equal(invalid.storage["abi-vision-mode"], undefined, "Removes invalid legacy key");
});

// ============================================================================
// 3. Keybind localization across all 9 supported languages
// ============================================================================
test("Keybinds localization across all 9 supported languages: renders full localized descriptions without English leaks", async (t) => {
  let playwright;
  try {
    playwright = require("playwright");
  } catch {
    if (t && typeof t.skip === "function") {
      t.skip("playwright module is not installed");
      return;
    }
  }

  const browser = await playwright.chromium.launch(getLaunchOptions());

  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    await page.setContent(`<!DOCTYPE html><html><head></head><body><div class="main"></div></body></html>`);
    await page.addStyleTag({ path: path.join(enhancerDir, "layout.css") });

    const siteUiSource = fs.readFileSync(path.join(enhancerDir, "site-ui.js"), "utf8");
    const settingsBlock = siteUiSource.slice(
      siteUiSource.indexOf("  const I18N = {"),
      siteUiSource.indexOf("  function configureSettingsNavigation("),
    );

    const i18nMatch = siteUiSource.match(/const I18N = \{([\s\S]*?)\n  \};/);
    assert.ok(i18nMatch, "I18N found in site-ui.js");
    const I18N = eval(`({${i18nMatch[1]}})`);
    const supportedLocales = Object.keys(I18N);

    assert.equal(supportedLocales.length, 9, "All 9 languages present in I18N");

    const pkgVersion = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8")).version;

    for (const locale of supportedLocales) {
      await page.evaluate(
        ({ loc, block, curVer }) => {
          document.querySelector(".main").innerHTML = "";
          document.documentElement.dataset.abiLang = loc;
          window.getCurrentLang = () => loc;
          window.storageMock = {
            controls: true,
            playerVolume: 100,
            playbackSpeed: 1,
            autoPlay: true,
            loopVideo: false,
            site: true,
            verdictHotkeys: false,
            customKeybinds: {},
          };
          window.chrome = {
            runtime: { getManifest: () => ({ version: curVer }) },
            storage: {
              local: {
                get: (k, cb) => cb({ ...window.storageMock }),
                set: (d, cb) => { Object.assign(window.storageMock, d); if (cb) cb(); },
              },
            },
          };
          window.privacyAnonymized = false;
          window.privacyStorageKey = "abi_privacy_mode";
          window.root = document.documentElement;
          window.scheduleUpdate = () => {};

          window.eval(block);
          const panel = createSettingsPanel();
          document.querySelector(".main").appendChild(panel);
        },
        { loc: locale, block: settingsBlock, curVer: pkgVersion },
      );

      // Verify category headers match locale dictionary
      const catTitles = await page.locator(".abi-keybind-cat-title").allTextContents();
      assert.ok(catTitles.includes(I18N[locale].playbackKeys), `${locale}: playback category localized`);
      assert.ok(catTitles.includes(I18N[locale].navigationKeys), `${locale}: navigation category localized`);
      assert.ok(catTitles.includes(I18N[locale].investigationKeys), `${locale}: investigation category localized`);
      assert.ok(catTitles.includes(I18N[locale].verdictKeys), `${locale}: verdict category localized`);

      // Verify quick verdict descriptions match locale dictionary
      const rowDescs = await page.locator(".abi-keybind-desc").allTextContents();
      assert.ok(rowDescs.includes(I18N[locale].keyViolationDesc), `${locale}: Violation desc localized`);
      assert.ok(rowDescs.includes(I18N[locale].keyUncertainDesc), `${locale}: Uncertain desc localized`);
      assert.ok(rowDescs.includes(I18N[locale].keyNoViolationDesc), `${locale}: No Violation desc localized`);
      assert.ok(rowDescs.includes(I18N[locale].keySubmitFinalDesc), `${locale}: Submit Final Verdict desc localized`);
    }
  } finally {
    await browser?.close();
  }
});

// ============================================================================
// 4. Quick-verdict mapping and keybind labels
// ============================================================================
test("Quick-verdict mapping and keybind labels: matches keyboard handler, settings toggle, and Keybinds table", async (t) => {
  let playwright;
  try {
    playwright = require("playwright");
  } catch {
    if (t && typeof t.skip === "function") {
      t.skip("playwright module is not installed");
      return;
    }
  }

  const browser = await playwright.chromium.launch(getLaunchOptions());

  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

    const mockHtml = `
      <html data-abi-site="on" data-abi-verdict-hotkeys="on">
      <head>
        <style>
          .content.video { width: 800px; height: 500px; }
          .play-box { width: 100%; height: 100%; }
          #workingPlayer { width: 100%; height: 100%; }
          video { width: 100%; height: 100%; }
          .operation { display: flex; gap: 8px; }
          .operation a { display: inline-block; padding: 8px; }
        </style>
      </head>
      <body>
        <div class="main">
          <ul class="nav"><li id="working" class="current"><span>Workbench</span></li></ul>
        </div>
        <div id="xcWorking">
          <div class="content video">
            <div class="play-box">
              <div id="workingPlayer"><video src="https://example.com/test.mp4"></video></div>
            </div>
            <div class="operation">
              <a id="patrolButton0" data-index="1" href="javascript:;">Violation (1/V)</a>
              <a id="patrolButton2" data-index="2" href="javascript:;">Uncertain (2/U)</a>
              <a id="patrolButton1" data-index="0" href="javascript:;">No Violation (3/C/I)</a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    await page.route("https://www.arenabreakoutinfinite.com/act/a20251028patroller/*", (route) => {
      route.fulfill({ status: 200, contentType: "text/html", body: mockHtml });
    });

    await page.goto("https://www.arenabreakoutinfinite.com/act/a20251028patroller/");

    await page.evaluate(() => {
      window.__clickedVerdicts = [];
      document.querySelector("#patrolButton0").addEventListener("click", () => window.__clickedVerdicts.push("violation"));
      document.querySelector("#patrolButton2").addEventListener("click", () => window.__clickedVerdicts.push("uncertain"));
      document.querySelector("#patrolButton1").addEventListener("click", () => window.__clickedVerdicts.push("no_violation"));

      const v = document.querySelector("video");
      let _paused = true;
      Object.defineProperty(v, "duration", { value: 60.0, configurable: true });
      Object.defineProperty(v, "currentTime", { value: 10.0, writable: true, configurable: true });
      Object.defineProperty(v, "paused", {
        get: () => _paused,
        set: (val) => { _paused = val; },
        configurable: true,
      });
      v.play = async () => { _paused = false; return Promise.resolve(); };
      v.pause = () => { _paused = true; };
      v.load = () => {};
      v.getBoundingClientRect = () => ({ width: 800, height: 450, top: 0, left: 0, bottom: 450, right: 800 });
    });

    await page.addScriptTag({ path: path.join(enhancerDir, "settings.js") });
    await page.addScriptTag({ path: path.join(enhancerDir, "content.js") });
    await page.waitForSelector("abi-local-player", { state: "attached" });

    // 1. Test key '1' -> Violation
    await page.keyboard.press("1");
    let clicks = await page.evaluate(() => window.__clickedVerdicts);
    assert.deepEqual(clicks, ["violation"], "Key '1' triggers Violation");

    // 2. Test key 'v' -> Violation
    await page.keyboard.press("v");
    clicks = await page.evaluate(() => window.__clickedVerdicts);
    assert.deepEqual(clicks, ["violation", "violation"], "Key 'v' triggers Violation");

    // 3. Test key '2' -> Uncertain
    await page.keyboard.press("2");
    clicks = await page.evaluate(() => window.__clickedVerdicts);
    assert.deepEqual(clicks, ["violation", "violation", "uncertain"], "Key '2' triggers Uncertain");

    // 4. Test key 'u' -> Uncertain
    await page.keyboard.press("u");
    clicks = await page.evaluate(() => window.__clickedVerdicts);
    assert.deepEqual(clicks, ["violation", "violation", "uncertain", "uncertain"], "Key 'u' triggers Uncertain");

    // 5. Test key '3' -> No Violation
    await page.keyboard.press("3");
    clicks = await page.evaluate(() => window.__clickedVerdicts);
    assert.deepEqual(clicks, ["violation", "violation", "uncertain", "uncertain", "no_violation"], "Key '3' triggers No Violation");

    // 6. Test key 'c' -> No Violation
    await page.keyboard.press("c");
    clicks = await page.evaluate(() => window.__clickedVerdicts);
    assert.deepEqual(clicks, ["violation", "violation", "uncertain", "uncertain", "no_violation", "no_violation"], "Key 'c' triggers No Violation");

    // 7. Test key 'i' -> No Violation
    await page.keyboard.press("i");
    clicks = await page.evaluate(() => window.__clickedVerdicts);
    assert.deepEqual(clicks, ["violation", "violation", "uncertain", "uncertain", "no_violation", "no_violation", "no_violation"], "Key 'i' triggers No Violation");
  } finally {
    await browser?.close();
  }
});

// ============================================================================
// 5. Loop shortcuts vs verdict hotkeys conflict resolution
// ============================================================================
test("Shortcut conflict resolution: loop shortcuts and verdict hotkeys cannot trigger each other in enabled and disabled states", async (t) => {
  let playwright;
  try {
    playwright = require("playwright");
  } catch {
    if (t && typeof t.skip === "function") {
      t.skip("playwright module is not installed");
      return;
    }
  }

  const browser = await playwright.chromium.launch(getLaunchOptions());

  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

    const mockHtml = `
      <html data-abi-site="on" data-abi-verdict-hotkeys="off">
      <head>
        <style>
          .content.video { width: 800px; height: 500px; }
          .play-box { width: 100%; height: 100%; }
          #workingPlayer { width: 100%; height: 100%; }
          video { width: 100%; height: 100%; }
          .operation { display: flex; }
          .operation a { display: inline-block; padding: 8px; }
        </style>
      </head>
      <body>
        <div class="main"><ul class="nav"><li id="working" class="current"><span>Workbench</span></li></ul></div>
        <div id="xcWorking">
          <div class="content video">
            <div class="play-box"><div id="workingPlayer"><video src="https://example.com/test.mp4"></video></div></div>
            <div class="operation">
              <a id="patrolButton0" data-index="1" href="javascript:;">Violation</a>
              <a id="patrolButton2" data-index="2" href="javascript:;">Uncertain</a>
              <a id="patrolButton1" data-index="0" href="javascript:;">No Violation</a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    await page.route("https://www.arenabreakoutinfinite.com/act/a20251028patroller/*", (route) => {
      route.fulfill({ status: 200, contentType: "text/html", body: mockHtml });
    });

    await page.goto("https://www.arenabreakoutinfinite.com/act/a20251028patroller/");

    await page.evaluate(() => {
      window.__clickedVerdicts = [];
      document.querySelector("#patrolButton0").addEventListener("click", () => window.__clickedVerdicts.push("violation"));
      document.querySelector("#patrolButton2").addEventListener("click", () => window.__clickedVerdicts.push("uncertain"));
      document.querySelector("#patrolButton1").addEventListener("click", () => window.__clickedVerdicts.push("no_violation"));

      const v = document.querySelector("video");
      let _paused = true;
      Object.defineProperty(v, "duration", { value: 60.0, configurable: true });
      Object.defineProperty(v, "currentTime", { value: 15.0, writable: true, configurable: true });
      Object.defineProperty(v, "paused", {
        get: () => _paused,
        set: (val) => { _paused = val; },
        configurable: true,
      });
      v.play = async () => { _paused = false; return Promise.resolve(); };
      v.pause = () => { _paused = true; };
      v.load = () => {};
      v.getBoundingClientRect = () => ({ width: 800, height: 450, top: 0, left: 0, bottom: 450, right: 800 });
    });

    await page.addScriptTag({ path: path.join(enhancerDir, "settings.js") });
    await page.addScriptTag({ path: path.join(enhancerDir, "content.js") });
    await page.waitForSelector("abi-local-player", { state: "attached" });

    // State 1: Verdict hotkeys are OFF
    // 1. Pressing 'i', 'o', 'v', '1', '2', '3' must NOT trigger verdict actions
    await page.keyboard.press("i");
    await page.keyboard.press("o");
    await page.keyboard.press("v");
    await page.keyboard.press("1");
    await page.keyboard.press("2");
    await page.keyboard.press("3");

    let clicks = await page.evaluate(() => window.__clickedVerdicts);
    assert.deepEqual(clicks, [], "No verdicts triggered when verdictHotkeys is OFF");

    // 2. Pressing 'i' and 'o' must NOT set A/B loop points (only '[' and ']' should)
    let loopState = await page.evaluate(() => document.querySelector("abi-local-player").getLoopState());
    assert.equal(loopState.loopStart, null, "Key 'i' does not set Loop In point");
    assert.equal(loopState.loopEnd, null, "Key 'o' does not set Loop Out point");

    // 3. Press explicit loop keys '[' and ']' -> sets loop properly
    await page.keyboard.press("[");
    loopState = await page.evaluate(() => document.querySelector("abi-local-player").getLoopState());
    assert.equal(loopState.loopStart, 15.0, "Key '[' explicitly sets Loop In point");

    await page.evaluate(() => { document.querySelector("video").currentTime = 25.0; });
    await page.keyboard.press("]");
    loopState = await page.evaluate(() => document.querySelector("abi-local-player").getLoopState());
    assert.equal(loopState.loopEnd, 25.0, "Key ']' explicitly sets Loop Out point");
    assert.equal(loopState.loopActive, true, "Loop is active");

    await page.keyboard.press("\\");
    loopState = await page.evaluate(() => document.querySelector("abi-local-player").getLoopState());
    assert.equal(loopState.loopActive, false, "Key '\\' explicitly clears Loop");

    // State 2: Enable verdict hotkeys
    await page.evaluate(() => {
      document.documentElement.dataset.abiVerdictHotkeys = "on";
    });

    // 4. Pressing loop keys '[' and ']' must NOT trigger any verdict clicks
    await page.keyboard.press("[");
    await page.keyboard.press("]");
    await page.keyboard.press("\\");
    clicks = await page.evaluate(() => window.__clickedVerdicts);
    assert.deepEqual(clicks, [], "Loop keys '[', ']', '\\' never trigger verdict actions");

    // 5. Pressing 'i' triggers No Violation verdict, but does NOT modify loop
    loopState = await page.evaluate(() => document.querySelector("abi-local-player").getLoopState());
    assert.equal(loopState.loopActive, false, "Loop remains cleared");

    await page.keyboard.press("i");
    clicks = await page.evaluate(() => window.__clickedVerdicts);
    assert.deepEqual(clicks, ["no_violation"], "Key 'i' safely triggers No Violation verdict");
  } finally {
    await browser?.close();
  }
});

// ============================================================================
// 6. Release tooling: Cross-platform ZIP builder
// ============================================================================
test("Release tooling: cross-platform ZIP builder creates valid archive and validates manifest assets", () => {
  const { collectFiles, createZipBuffer, validateArchive, buildArchive } = require("../scripts/build-zip.cjs");

  // 1. Validation test: detects missing manifest.json
  assert.throws(
    () => validateArchive([], Buffer.from("{}")),
    /missing manifest\.json at root/,
    "Throws when manifest.json is missing",
  );

  // 2. Validation test: detects missing assets referenced by manifest
  const mockManifest = {
    name: "Test Ext",
    version: "1.0.0",
    icons: { "16": "icons/missing-16.png" },
    action: { default_popup: "popup.html" },
  };
  const presentFiles = [
    { name: "manifest.json", content: Buffer.from(JSON.stringify(mockManifest)) },
    { name: "popup.html", content: Buffer.from("<html></html>") },
  ];
  assert.throws(
    () => validateArchive(presentFiles, JSON.stringify(mockManifest)),
    /missing manifest-referenced assets[\s\S]*missing-16\.png/,
    "Throws when icon is missing from archive",
  );

  // 3. Build actual project archive
  const result = buildArchive();
  assert.ok(fs.existsSync(result.zipPath), "Archive file created");
  assert.ok(result.size > 10000, "Archive size is reasonable (>10KB)");

  // 4. Parse the created ZIP buffer and verify structure
  const zipBuffer = fs.readFileSync(result.zipPath);
  assert.equal(zipBuffer.readUInt32LE(0), 0x04034b50, "Valid ZIP local file header signature");

  // Read EOCD record (last 22 bytes)
  const eocdOffset = zipBuffer.length - 22;
  assert.equal(zipBuffer.readUInt32LE(eocdOffset), 0x06054b50, "Valid ZIP EOCD signature");

  const totalEntries = zipBuffer.readUInt16LE(eocdOffset + 10);
  assert.equal(totalEntries, result.filesCount, "Total entries matches collected file count");
});

// ============================================================================
// 7. Release tooling: bump-version validation and consistency
// ============================================================================
test("Release tooling: bump-version validates semver, detects desync, and computes target versions", () => {
  const { validateSemver, computeTargetVersion } = require("../scripts/bump-version.cjs");

  // 1. Semver validation
  assert.equal(validateSemver("3.0.5"), "3.0.5");
  assert.equal(validateSemver("1.0.0"), "1.0.0");
  assert.throws(() => validateSemver("invalid"), /Invalid version/);
  assert.throws(() => validateSemver("3.0"), /Invalid version/);
  assert.throws(() => validateSemver("3.0.0.1"), /Invalid version/);
  assert.throws(() => validateSemver(""), /Invalid version/);

  // 2. Target computation
  assert.equal(computeTargetVersion("3.0.5", "patch"), "3.0.6");
  assert.equal(computeTargetVersion("3.0.5"), "3.0.6");
  assert.equal(computeTargetVersion("3.0.5", "minor"), "3.1.0");
  assert.equal(computeTargetVersion("3.0.5", "major"), "4.0.0");
  assert.equal(computeTargetVersion("3.0.5", "v3.0.9"), "3.0.9");
  assert.equal(computeTargetVersion("3.0.5", "3.0.9"), "3.0.9");
  assert.throws(() => computeTargetVersion("3.0.5", "not-a-version"), /Invalid version/);
});
