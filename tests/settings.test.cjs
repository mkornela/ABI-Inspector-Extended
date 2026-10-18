const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const root = path.join(__dirname, "..", "abi-inspector-enhancer");

test("Settings panel redesign: DOM structure, search, dependencies, key chips, and reset", async (t) => {
  let playwright;
  try {
    playwright = require("playwright");
  } catch {
    if (t && typeof t.skip === "function") {
      t.skip("playwright module is not installed");
      return;
    }
  }
  const { chromium } = playwright;
  const browser = await chromium.launch({
    headless: true,
    channel: process.env.ABI_TEST_BROWSER || (process.platform === "win32" ? "msedge" : "chromium"),
  });

  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    await page.setContent(`<!DOCTYPE html><html><head></head><body><div class="main"></div></body></html>`);
    await page.addStyleTag({ path: path.join(root, "layout.css") });

    // Mock chrome.storage.local, chrome.runtime, and load site-ui.js
    await page.evaluate(() => {
      window.storageMock = {
        controls: true,
        playerVolume: 100,
        playbackSpeed: 1,
        autoPlay: true,
        loopVideo: false,
        site: true,
        skipIntro: true,
        inspectionNotes: true,
        colorKey: true,
        verdictEnhancements: true,
        verdictHotkeys: false,
        hudAccent: "amber",
        leaveGuard: true,
        autoHideHud: true,
      };
      window.chrome = {
        runtime: {
          getManifest: () => ({ version: "3.0.0" }),
        },
        storage: {
          local: {
            get: (keys, cb) => {
              const res = { ...window.storageMock };
              if (cb) cb(res);
              return Promise.resolve(res);
            },
            set: (data, cb) => {
              Object.assign(window.storageMock, data);
              if (cb) cb();
              return Promise.resolve();
            },
          },
        },
      };
      window.privacyAnonymized = false;
      window.privacyStorageKey = "abi_privacy_mode";
      window.root = document.documentElement;
      window.scheduleUpdate = () => {};
    });

    const siteUiSource = fs.readFileSync(path.join(root, "site-ui.js"), "utf8");
    const settingsBlock = siteUiSource.slice(
      siteUiSource.indexOf("  const settingsDefaults = {"),
      siteUiSource.indexOf("  function configureSettingsNavigation("),
    );

    await page.evaluate((code) => {
      window.eval(code);
      const panel = createSettingsPanel();
      document.querySelector(".main").appendChild(panel);
    }, settingsBlock);

    // 1. Verify Topbar, Search Bar, and Saved Toast
    assert.equal(await page.locator(".abi-settings-topbar").count(), 1, "Sticky topbar exists");
    assert.equal(await page.locator(".abi-settings-search-input").count(), 1, "Search input exists");
    assert.equal(await page.locator(".abi-settings-toast").count(), 1, "Toast element exists");

    // 2. Verify Left Sidebar Navigation has 6 sections
    const navButtons = page.locator(".abi-settings-nav-btn");
    assert.equal(await navButtons.count(), 6, "6 sidebar navigation buttons");
    assert.equal(await navButtons.nth(0).textContent(), "Playback");
    assert.equal(await navButtons.nth(1).textContent(), "Keybinds");
    assert.equal(await navButtons.nth(2).textContent(), "Interface");
    assert.equal(await navButtons.nth(3).textContent(), "Verdicts");
    assert.equal(await navButtons.nth(4).textContent(), "Privacy");
    assert.equal(await navButtons.nth(5).textContent(), "About");

    // 3. Verify the 6 Section Cards exist
    assert.equal(await page.locator("#abi-section-playback").count(), 1, "Playback section exists");
    assert.equal(await page.locator("#abi-section-keybinds").count(), 1, "Keybinds section exists");
    assert.equal(await page.locator("#abi-section-interface").count(), 1, "Interface section exists");
    assert.equal(await page.locator("#abi-section-verdicts").count(), 1, "Verdicts section exists");
    assert.equal(await page.locator("#abi-section-privacy").count(), 1, "Privacy section exists");
    assert.equal(await page.locator("#abi-section-about").count(), 1, "About section exists");

    const keybindRows = page.locator("#abi-section-keybinds .abi-keybind-row");
    assert.ok((await keybindRows.count()) >= 10, "Keybind rows present in keybinds tab");

    // 4. Verify Key Chips
    const playbackChips = page.locator("#abi-section-playback .abi-key-chip");
    assert.ok((await playbackChips.count()) >= 5, "Key chips present under video controls");
    assert.ok((await playbackChips.first().textContent()).includes("Space"), "Space key chip present");
    assert.equal(await page.locator("#abi-settings-autohide-hud").count(), 1, "Auto-hide HUD toggle exists");
    assert.equal(await page.locator("#abi-settings-autohide-hud").isChecked(), true, "Auto-hide HUD toggle is checked by default");

    const verdictChips = page.locator("#abi-section-verdicts .abi-key-chip");
    assert.equal(await verdictChips.count(), 3, "3 key chips present under verdict hotkeys");
    assert.ok((await verdictChips.first().textContent()).includes("1 or V"), "1 or V hotkey chip present");
    assert.equal(await page.locator("#abi-settings-leave-guard").count(), 1, "Accidental leave guard toggle exists");
    assert.equal(await page.locator("#abi-settings-leave-guard").isChecked(), true, "Accidental leave guard toggle is checked by default");

    // 5. Verify Streamer / Privacy Mode Live Preview
    const preview = page.locator("#abi-section-privacy .abi-privacy-preview-box");
    assert.equal(await preview.count(), 1, "Privacy live preview box exists");
    assert.ok((await preview.textContent()).includes("Player123"), "Original player name shown in preview");
    assert.ok((await preview.textContent()).includes("Player•••"), "Masked player name shown in preview");

    // 6. Verify Dependencies
    // Toggle site modifications off -> skip intro should become disabled
    await page.locator('label[for="abi-settings-site"]').click();
    assert.equal(await page.locator("#abi-settings-skip-intro").isDisabled(), true, "Skip intro disabled when site is off");
    assert.equal(await page.locator('label[for="abi-settings-skip-intro"]').getAttribute("aria-disabled"), "true");

    // Toggle site modifications back on -> skip intro becomes enabled
    await page.locator('label[for="abi-settings-site"]').click();
    assert.equal(await page.locator("#abi-settings-skip-intro").isDisabled(), false, "Skip intro re-enabled when site is on");

    // Toggle verdict enhancements off -> verdict hotkeys should become disabled
    await page.locator('label[for="abi-settings-verdict-enhancements"]').click();
    assert.equal(await page.locator("#abi-settings-verdict-hotkeys").isDisabled(), true, "Verdict hotkeys disabled when enhancements off");

    // Toggle verdict enhancements back on
    await page.locator('label[for="abi-settings-verdict-enhancements"]').click();
    assert.equal(await page.locator("#abi-settings-verdict-hotkeys").isDisabled(), false, "Verdict hotkeys re-enabled");

    // 7. Verify Live Search Filtering
    const searchInput = page.locator(".abi-settings-search-input");
    await searchInput.fill("privacy");
    assert.equal(await page.locator("#abi-section-playback").isHidden(), true, "Playback card hidden during privacy search");
    assert.equal(await page.locator("#abi-section-privacy").isHidden(), false, "Privacy card visible during privacy search");

    // Search for non-matching string
    await searchInput.fill("nonexistentqueryxyz");
    assert.equal(await page.locator(".abi-settings-empty").isHidden(), false, "Empty state visible when no match");

    // Clear search
    await page.locator(".abi-settings-search-clear").click();
    assert.equal(await page.locator(".abi-settings-empty").isHidden(), true, "Empty state hidden after clear");
    assert.equal(await page.locator("#abi-section-playback").isHidden(), false, "Playback card visible after clear");

    // 8. Verify Section Reset Button
    await page.locator('label[for="abi-settings-loop"]').click(); // enable loop
    assert.equal(await page.locator("#abi-settings-loop").isChecked(), true, "Loop checked");
    await page.locator("#abi-section-playback .abi-settings-reset-section-btn").click();
    assert.equal(await page.locator("#abi-settings-loop").isChecked(), false, "Loop reset to default false");
    assert.equal(await page.locator("#abi-settings-controls").isChecked(), true, "Controls reset to default true");

    // 9. Verify Restore Defaults Button
    await page.locator(".abi-settings-btn-neutral").click();
    assert.equal((await page.locator(".abi-settings-btn-neutral").textContent()).trim(), "Defaults restored ✓", "Button shows confirmation text");

    // 10. Verify Custom HUD Accent Color Profiles
    const accentChips = page.locator(".abi-accent-chip");
    assert.equal(await accentChips.count(), 4, "Four accent color options available (amber, green, blue, crimson)");
    const activeAccent = page.locator(".abi-accent-chip.active");
    assert.equal(await activeAccent.getAttribute("data-accent"), "amber", "Default active accent is amber");

    // Click Green accent chip
    await page.locator('.abi-accent-chip[data-accent="green"]').click();
    assert.equal(await page.locator(".abi-accent-chip.active").getAttribute("data-accent"), "green", "Green accent is now active");
    let currentHtmlAccent = await page.evaluate(() => document.documentElement.dataset.abiHudAccent);
    assert.equal(currentHtmlAccent, "green", "document.documentElement data-abi-hud-accent updated to green");

    // Reset Interface section -> resets accent to amber
    await page.locator("#abi-section-interface .abi-settings-reset-section-btn").click();
    assert.equal(await page.locator(".abi-accent-chip.active").getAttribute("data-accent"), "amber", "Reset interface section restores amber accent");
    currentHtmlAccent = await page.evaluate(() => document.documentElement.dataset.abiHudAccent);
    assert.equal(currentHtmlAccent, "amber", "document.documentElement restored to amber");
  } finally {
    await browser?.close();
  }
});
