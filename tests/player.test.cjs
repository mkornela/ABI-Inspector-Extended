const { test } = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");

test("Player pause and unpause button, autoplay safety, and click toggling", async (t) => {
  let playwright;
  try {
    playwright = require("playwright");
  } catch {
    if (t && typeof t.skip === "function") {
      t.skip("playwright module is not installed");
      return;
    }
  }

  const browser = await playwright.chromium.launch({
    headless: true,
    channel: process.env.ABI_TEST_BROWSER || (process.platform === "win32" ? "msedge" : "chromium"),
  });

  try {
    const page = await browser.newPage({ viewport: { width: 1200, height: 800 } });
    
    const mockHtml = `
      <html data-abi-site="on" data-abi-auto-play="on">
      <head>
        <style>
          .content.video { width: 800px; height: 500px; }
          .play-box { width: 100%; height: 100%; }
          #workingPlayer { width: 100%; height: 100%; }
          video { width: 100%; height: 100%; }
        </style>
      </head>
      <body>
        <div class="main">
          <ul class="nav">
            <li id="working" class="current"><span>Workbench</span></li>
          </ul>
        </div>
        <div id="xcWorking">
          <div class="content video">
            <div class="play-box">
              <div id="workingPlayer">
                <video src="https://example.com/test.mp4" preload="auto"></video>
              </div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    await page.route("https://www.arenabreakoutinfinite.com/act/a20251028patroller/*", (route) => {
      route.fulfill({
        status: 200,
        contentType: "text/html",
        body: mockHtml,
      });
    });

    await page.goto("https://www.arenabreakoutinfinite.com/act/a20251028patroller/");

    // Mock video methods before scripts attach
    await page.evaluate(() => {
      const v = document.querySelector("video");
      let _paused = true;
      Object.defineProperty(v, "paused", {
        get: () => _paused,
        set: (val) => { _paused = val; },
        configurable: true,
      });
      v.play = async () => {
        _paused = false;
        v.dispatchEvent(new Event("play"));
      };
      v.pause = () => {
        _paused = true;
        v.dispatchEvent(new Event("pause"));
      };
    });

    // Inject scripts
    await page.addScriptTag({ path: path.join(__dirname, "..", "abi-inspector-enhancer", "settings.js") });
    await page.addScriptTag({ path: path.join(__dirname, "..", "abi-inspector-enhancer", "content.js") });

    // Wait for abi-local-player
    await page.waitForSelector("abi-local-player", { state: "attached" });
    await page.waitForSelector("abi-local-controls", { state: "attached" });

    // Initial state: autoplay was configured on, so it autoplays the new video
    let isPaused = await page.evaluate(() => document.querySelector("video").paused);
    assert.equal(isPaused, false, "Initially playing via autoplay on load");

    // Click pause button to pause
    await page.evaluate(() => {
      const controls = document.querySelector("abi-local-controls");
      const playBtn = controls.shadowRoot.querySelector("button#play");
      playBtn.click();
    });

    isPaused = await page.evaluate(() => document.querySelector("video").paused);
    assert.equal(isPaused, true, "Video should be paused after clicking pause button");

    // Check that abiUserPaused is set to prevent autoplay loop
    const userPaused = await page.evaluate(() => document.querySelector("video").dataset.abiUserPaused);
    assert.equal(userPaused, "true", "abiUserPaused should be true");

    // Click play button to unpause
    await page.evaluate(() => {
      const controls = document.querySelector("abi-local-controls");
      const playBtn = controls.shadowRoot.querySelector("button#play");
      playBtn.click();
    });

    isPaused = await page.evaluate(() => document.querySelector("video").paused);
    assert.equal(isPaused, false, "Video should be playing after clicking play button");

    // Click pause button again
    await page.evaluate(() => {
      const controls = document.querySelector("abi-local-controls");
      const playBtn = controls.shadowRoot.querySelector("button#play");
      playBtn.click();
    });

    isPaused = await page.evaluate(() => document.querySelector("video").paused);
    assert.equal(isPaused, true, "Video should be paused after clicking pause button again");

    // Trigger DOM mutations to verify autoplay does NOT override user pause
    await page.evaluate(() => {
      const v = document.querySelector("video");
      // Simulate readyState >= 2
      Object.defineProperty(v, "readyState", { value: 4, configurable: true });
      document.body.appendChild(document.createElement("span"));
    });
    await page.waitForTimeout(50);

    isPaused = await page.evaluate(() => document.querySelector("video").paused);
    assert.equal(isPaused, true, "Video should remain paused when autoplay is on");

    // Click player container directly to toggle play/pause
    await page.evaluate(() => {
      const player = document.querySelector("#workingPlayer");
      player.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    isPaused = await page.evaluate(() => document.querySelector("video").paused);
    assert.equal(isPaused, false, "Video should unpause when clicking on player container");

    // Click player container again to pause
    await page.evaluate(() => {
      const player = document.querySelector("#workingPlayer");
      player.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    isPaused = await page.evaluate(() => document.querySelector("video").paused);
    assert.equal(isPaused, true, "Video should pause when clicking on player container again");

    // Test speed multiplier preservation
    // Increase speed using faster button (+)
    await page.evaluate(() => {
      const controls = document.querySelector("abi-local-controls");
      const fasterBtn = controls.shadowRoot.querySelector("button#faster");
      fasterBtn.click(); // 1x -> 1.25x
      fasterBtn.click(); // 1.25x -> 1.5x
    });

    let currentRate = await page.evaluate(() => document.querySelector("video").playbackRate);
    assert.equal(currentRate, 1.5, "Speed should be set to 1.5x");

    // Trigger DOM mutations while video is paused to verify speed is not reset to 1x
    await page.evaluate(() => {
      document.body.appendChild(document.createElement("div"));
    });
    await page.waitForTimeout(50);
    currentRate = await page.evaluate(() => document.querySelector("video").playbackRate);
    assert.equal(currentRate, 1.5, "Speed should remain 1.5x after DOM mutations");

    // Unpause video and verify speed does not reset
    await page.evaluate(() => {
      const controls = document.querySelector("abi-local-controls");
      const playBtn = controls.shadowRoot.querySelector("button#play");
      playBtn.click();
    });
    isPaused = await page.evaluate(() => document.querySelector("video").paused);
    assert.equal(isPaused, false, "Video is playing");
    currentRate = await page.evaluate(() => document.querySelector("video").playbackRate);
    assert.equal(currentRate, 1.5, "Speed should remain 1.5x when unpaused");

    // Trigger DOM mutations while playing to verify speed does not instantly revert to 1x
    await page.evaluate(() => {
      document.body.appendChild(document.createElement("div"));
    });
    await page.waitForTimeout(50);
    currentRate = await page.evaluate(() => document.querySelector("video").playbackRate);
    assert.equal(currentRate, 1.5, "Speed should remain 1.5x while playing even with mutations");

  } finally {
    await browser.close();
  }
});

test("Video does not auto-play when autoPlay setting is off", async (t) => {
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
  let browser;
  try {
    browser = await chromium.launch({
      headless: true,
      channel: process.env.ABI_TEST_BROWSER || (process.platform === "win32" ? "msedge" : "chromium"),
    });
    const context = await browser.newContext();
    const page = await context.newPage();

    const mockHtml = `
      <!DOCTYPE html>
      <html data-abi-site="on" data-abi-auto-play="off">
      <head>
        <style>
          .content.video { width: 800px; height: 500px; }
          .play-box { width: 100%; height: 100%; }
          #workingPlayer { width: 100%; height: 100%; }
          video { width: 100%; height: 100%; }
        </style>
      </head>
      <body>
        <div class="main">
          <ul class="nav">
            <li id="working" class="current"><span>Workbench</span></li>
          </ul>
        </div>
        <div id="xcWorking">
          <div class="content video">
            <div class="play-box">
              <div id="workingPlayer">
                <video src="https://example.com/test.mp4" preload="auto"></video>
              </div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    await page.route("https://www.arenabreakoutinfinite.com/act/a20251028patroller/*", (route) => {
      route.fulfill({
        status: 200,
        contentType: "text/html",
        body: mockHtml,
      });
    });

    await page.goto("https://www.arenabreakoutinfinite.com/act/a20251028patroller/");

    await page.evaluate(() => {
      const v = document.querySelector("video");
      let _paused = true;
      Object.defineProperty(v, "paused", {
        get: () => _paused,
        set: (val) => { _paused = val; },
        configurable: true,
      });
      v.play = async () => {
        _paused = false;
        v.dispatchEvent(new Event("play"));
      };
      v.pause = () => {
        _paused = true;
        v.dispatchEvent(new Event("pause"));
      };
    });

    await page.addScriptTag({ path: path.join(__dirname, "..", "abi-inspector-enhancer", "settings.js") });
    await page.addScriptTag({ path: path.join(__dirname, "..", "abi-inspector-enhancer", "content.js") });

    await page.waitForSelector("abi-local-player", { state: "attached" });
    await page.waitForSelector("abi-local-controls", { state: "attached" });

    // Video should remain paused because autoPlay is off
    let isPaused = await page.evaluate(() => document.querySelector("video").paused);
    assert.equal(isPaused, true, "Video stays paused when autoPlay is off");

    // Clicking play button should start playback
    await page.evaluate(() => {
      const controls = document.querySelector("abi-local-controls");
      controls.shadowRoot.querySelector("button#play").click();
    });
    isPaused = await page.evaluate(() => document.querySelector("video").paused);
    assert.equal(isPaused, false, "Video plays after user explicitly clicks play");
  } finally {
    await browser?.close();
  }
});

