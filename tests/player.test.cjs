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

    // Click player container to resume and verify it continues playing without stopping after 500ms
    await page.evaluate(() => {
      const player = document.querySelector("#workingPlayer");
      player.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    await page.waitForTimeout(600);
    isPaused = await page.evaluate(() => document.querySelector("video").paused);
    assert.equal(isPaused, false, "Video continues playing and does not stop after half a second");

    // Pause again to preserve paused state for subsequent speed tests
    await page.evaluate(() => {
      const player = document.querySelector("#workingPlayer");
      player.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    isPaused = await page.evaluate(() => document.querySelector("video").paused);
    assert.equal(isPaused, true, "Video paused again for next test section");

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

test("Suspect Moment Bookmarks / Pin Drop: drops pin with M key, renders on timeline, seeks on click, and removes on right-click", async (t) => {
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
      let _currentTime = 15;
      let _duration = 60;
      Object.defineProperty(v, "paused", {
        get: () => _paused,
        set: (val) => { _paused = val; },
        configurable: true,
      });
      Object.defineProperty(v, "currentTime", {
        get: () => _currentTime,
        set: (val) => {
          _currentTime = val;
          v.dispatchEvent(new Event("timeupdate"));
        },
        configurable: true,
      });
      Object.defineProperty(v, "duration", {
        get: () => _duration,
        set: (val) => { _duration = val; },
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

    // 1. Drop pin at currentTime = 15s using M key
    await page.keyboard.press("m");

    let pinData = await page.evaluate(() => {
      const controls = document.querySelector("abi-local-controls");
      const pins = controls.shadowRoot.querySelectorAll(".timeline-pin");
      return Array.from(pins).map((pin) => ({
        left: pin.style.left,
        title: pin.title,
        time: pin.dataset.time,
      }));
    });

    assert.equal(pinData.length, 1, "Should have dropped 1 bookmark pin");
    assert.equal(pinData[0].left, "25%", "Pin at 15s in a 60s video should be at 25%");
    assert.match(pinData[0].title, /00:15/, "Pin title should contain timestamp 00:15");

    // 2. Advance time to 30s and drop another pin using the toolbar pin button
    await page.evaluate(() => {
      const v = document.querySelector("video");
      v.currentTime = 30;
      const controls = document.querySelector("abi-local-controls");
      controls.shadowRoot.querySelector("#pinButton").click();
    });

    pinData = await page.evaluate(() => {
      const controls = document.querySelector("abi-local-controls");
      const pins = controls.shadowRoot.querySelectorAll(".timeline-pin");
      return Array.from(pins).map((pin) => ({
        left: pin.style.left,
        title: pin.title,
        time: pin.dataset.time,
      }));
    });

    assert.equal(pinData.length, 2, "Should have 2 pins after clicking #pinButton");
    assert.equal(pinData[1].left, "50%", "Pin at 30s in a 60s video should be at 50%");

    // 3. Click the first pin to seek back to 15s
    await page.evaluate(() => {
      const v = document.querySelector("video");
      v.currentTime = 45; // Move playhead elsewhere
      const controls = document.querySelector("abi-local-controls");
      const firstPin = controls.shadowRoot.querySelector(".timeline-pin");
      firstPin.click();
    });

    const currentTimeAfterPinClick = await page.evaluate(() => document.querySelector("video").currentTime);
    assert.equal(currentTimeAfterPinClick, 15, "Clicking pin seeks playhead directly to 15s");

    // 4. Right-click the first pin to remove it
    await page.evaluate(() => {
      const controls = document.querySelector("abi-local-controls");
      const firstPin = controls.shadowRoot.querySelector(".timeline-pin");
      firstPin.dispatchEvent(new MouseEvent("contextmenu", { bubbles: true, cancelable: true }));
    });

    pinData = await page.evaluate(() => {
      const controls = document.querySelector("abi-local-controls");
      const pins = controls.shadowRoot.querySelectorAll(".timeline-pin");
      return Array.from(pins).map((pin) => ({
        left: pin.style.left,
        time: pin.dataset.time,
      }));
    });

    assert.equal(pinData.length, 1, "Should have 1 pin remaining after right-click removal");
    assert.equal(pinData[0].time, "30", "Remaining pin should be the 30s pin");

    // 5. Press M while at 30s to toggle/remove it
    await page.evaluate(() => {
      const v = document.querySelector("video");
      v.currentTime = 30;
    });
    await page.keyboard.press("m");

    const finalPinCount = await page.evaluate(() => {
      const controls = document.querySelector("abi-local-controls");
      return controls.shadowRoot.querySelectorAll(".timeline-pin").length;
    });
    assert.equal(finalPinCount, 0, "Pressing M near bookmark toggles it off");

  } finally {
    await browser?.close();
  }
});

test("Reload Player Button: reloads video source in-place, preserves currentTime, and gives feedback", async (t) => {
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

    await page.evaluate(() => {
      const v = document.querySelector("video");
      let _paused = true;
      let _currentTime = 22;
      let _duration = 90;
      let _loadCount = 0;
      Object.defineProperty(v, "paused", {
        get: () => _paused,
        set: (val) => { _paused = val; },
        configurable: true,
      });
      Object.defineProperty(v, "currentTime", {
        get: () => _currentTime,
        set: (val) => {
          _currentTime = val;
          v.dispatchEvent(new Event("timeupdate"));
        },
        configurable: true,
      });
      Object.defineProperty(v, "duration", {
        get: () => _duration,
        set: (val) => { _duration = val; },
        configurable: true,
      });
      Object.defineProperty(v, "loadCount", {
        get: () => _loadCount,
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
      v.load = () => {
        _loadCount++;
        v.dispatchEvent(new Event("loadedmetadata"));
        v.dispatchEvent(new Event("canplay"));
      };
    });

    await page.addScriptTag({ path: path.join(__dirname, "..", "abi-inspector-enhancer", "settings.js") });
    await page.addScriptTag({ path: path.join(__dirname, "..", "abi-inspector-enhancer", "content.js") });

    await page.waitForSelector("abi-local-player", { state: "attached" });
    await page.waitForSelector("abi-local-controls", { state: "attached" });

    // Verify #reload button exists with correct tooltip
    const buttonData = await page.evaluate(() => {
      const controls = document.querySelector("abi-local-controls");
      const reloadBtn = controls.shadowRoot.querySelector("button#reload");
      return {
        exists: Boolean(reloadBtn),
        title: reloadBtn?.title,
        ariaLabel: reloadBtn?.getAttribute("aria-label"),
      };
    });

    assert.equal(buttonData.exists, true, "Reload player button should exist in controls");
    assert.equal(buttonData.title, "Reload player", "Tooltip should say 'Reload player'");

    // Click #reload button
    await page.evaluate(() => {
      const controls = document.querySelector("abi-local-controls");
      controls.shadowRoot.querySelector("button#reload").click();
    });

    const afterReload = await page.evaluate(() => {
      const v = document.querySelector("video");
      const controls = document.querySelector("abi-local-controls");
      const status = controls.shadowRoot.querySelector("#status")?.textContent;
      return {
        loadCount: v.loadCount,
        currentTime: v.currentTime,
        status,
      };
    });

    assert.equal(afterReload.loadCount, 1, "video.load() was called exactly once on reload");
    assert.equal(afterReload.currentTime, 22, "Playback timestamp preserved at 22s across reload");
    assert.match(afterReload.status, /Reloaded player stream/, "Status notice confirms stream reloaded");

  } finally {
    await browser?.close();
  }
});

test("Timeline Scrubber Hover-Time Badge: floating timestamp badge follows cursor movement over scrubber", async (t) => {
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

    await page.evaluate(() => {
      const v = document.querySelector("video");
      let _paused = true;
      let _currentTime = 10;
      let _duration = 120;
      Object.defineProperty(v, "paused", {
        get: () => _paused,
        set: (val) => { _paused = val; },
        configurable: true,
      });
      Object.defineProperty(v, "currentTime", {
        get: () => _currentTime,
        set: (val) => {
          _currentTime = val;
          v.dispatchEvent(new Event("timeupdate"));
        },
        configurable: true,
      });
      Object.defineProperty(v, "duration", {
        get: () => _duration,
        set: (val) => { _duration = val; },
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

    // Verify hover badge element exists inside shadow DOM
    const badgeExists = await page.evaluate(() => {
      const controls = document.querySelector("abi-local-controls");
      const badge = controls.shadowRoot.querySelector("#hoverBadge");
      return Boolean(badge);
    });
    assert.equal(badgeExists, true, "Hover-time badge exists in timeline-bar");

    // Simulate pointermove over scrubber at 25% of its width
    await page.evaluate(() => {
      const controls = document.querySelector("abi-local-controls");
      const seek = controls.shadowRoot.querySelector("#seek");
      const rect = seek.getBoundingClientRect();
      const clientX = rect.left + rect.width * 0.25;
      const clientY = rect.top + rect.height * 0.5;
      seek.dispatchEvent(new PointerEvent("pointermove", {
        clientX,
        clientY,
        bubbles: true,
      }));
    });

    const badgeState25 = await page.evaluate(() => {
      const controls = document.querySelector("abi-local-controls");
      const badge = controls.shadowRoot.querySelector("#hoverBadge");
      return {
        visible: badge.classList.contains("visible"),
        text: badge.textContent.trim(),
        left: badge.style.left,
      };
    });

    assert.equal(badgeState25.visible, true, "Badge becomes visible on pointer movement");
    assert.equal(badgeState25.text, "00:30", "At 25% of 120s video, preview time should be 00:30");
    assert.equal(badgeState25.left, "25%", "Badge style.left should be 25%");

    // Simulate pointermove over scrubber at 75% of its width
    await page.evaluate(() => {
      const controls = document.querySelector("abi-local-controls");
      const seek = controls.shadowRoot.querySelector("#seek");
      const rect = seek.getBoundingClientRect();
      const clientX = rect.left + rect.width * 0.75;
      const clientY = rect.top + rect.height * 0.5;
      seek.dispatchEvent(new PointerEvent("pointermove", {
        clientX,
        clientY,
        bubbles: true,
      }));
    });

    const badgeState75 = await page.evaluate(() => {
      const controls = document.querySelector("abi-local-controls");
      const badge = controls.shadowRoot.querySelector("#hoverBadge");
      return {
        text: badge.textContent.trim(),
        left: badge.style.left,
      };
    });

    assert.equal(badgeState75.text, "01:30", "At 75% of 120s video, preview time should be 01:30");
    assert.equal(badgeState75.left, "75%", "Badge style.left should be 75%");

    // Simulate pointerleave
    await page.evaluate(() => {
      const controls = document.querySelector("abi-local-controls");
      const seek = controls.shadowRoot.querySelector("#seek");
      seek.dispatchEvent(new PointerEvent("pointerleave", { bubbles: true }));
    });

    const isVisibleAfterLeave = await page.evaluate(() => {
      const controls = document.querySelector("abi-local-controls");
      const badge = controls.shadowRoot.querySelector("#hoverBadge");
      return badge.classList.contains("visible");
    });

    assert.equal(isVisibleAfterLeave, false, "Badge hides on pointerleave");

  } finally {
    await browser?.close();
  }
});

test("Toast HUD popup does not move or shift the player bar during status notifications", async (t) => {
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
      <html data-abi-site="on">
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
      let _currentTime = 12;
      let _duration = 100;
      Object.defineProperty(v, "paused", {
        get: () => _paused,
        set: (val) => { _paused = val; },
        configurable: true,
      });
      Object.defineProperty(v, "currentTime", {
        get: () => _currentTime,
        set: (val) => { _currentTime = val; },
        configurable: true,
      });
      Object.defineProperty(v, "duration", {
        get: () => _duration,
        set: (val) => { _duration = val; },
        configurable: true,
      });
      v.play = async () => { _paused = false; v.dispatchEvent(new Event("play")); };
      v.pause = () => { _paused = true; v.dispatchEvent(new Event("pause")); };
    });

    await page.addScriptTag({ path: path.join(__dirname, "..", "abi-inspector-enhancer", "settings.js") });
    await page.addScriptTag({ path: path.join(__dirname, "..", "abi-inspector-enhancer", "content.js") });

    await page.waitForSelector("abi-local-player", { state: "attached" });
    await page.waitForSelector("abi-local-controls", { state: "attached" });

    // Measure initial panel bounding box height before any notification
    const initialPanelHeight = await page.evaluate(() => {
      const controls = document.querySelector("abi-local-controls");
      const panel = controls.shadowRoot.querySelector(".panel");
      return panel.getBoundingClientRect().height;
    });

    // Drop a bookmark to trigger status notification "Bookmark dropped at 00:12 (M)"
    await page.keyboard.press("KeyM");

    const statusState = await page.evaluate(() => {
      const controls = document.querySelector("abi-local-controls");
      const status = controls.shadowRoot.querySelector("#status");
      const panel = controls.shadowRoot.querySelector(".panel");
      return {
        text: status.textContent,
        visible: status.classList.contains("visible"),
        panelHeight: panel.getBoundingClientRect().height,
      };
    });

    assert.match(statusState.text, /Bookmark dropped at 00:12 \(M\)/, "Status text shows bookmark dropped");
    assert.equal(statusState.visible, true, "Status has visible class for floating toast");
    assert.equal(statusState.panelHeight, initialPanelHeight, "Panel height remains unchanged so player bar never jumps or shifts");

  } finally {
    await browser?.close();
  }
});

test("Case Expiry Countdown Timer & Under-60s Amber Pulse: active case countdown, under-60s warning pulse, expiration state, and drill exclusion", async (t) => {
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
      <html data-abi-site="on">
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
      v.play = async () => { _paused = false; v.dispatchEvent(new Event("play")); };
      v.pause = () => { _paused = true; v.dispatchEvent(new Event("pause")); };
    });

    await page.addScriptTag({ path: path.join(__dirname, "..", "abi-inspector-enhancer", "settings.js") });
    await page.addScriptTag({ path: path.join(__dirname, "..", "abi-inspector-enhancer", "content.js") });

    await page.waitForSelector("abi-local-player", { state: "attached" });

    // 1. Initial State: Expiry badge is mounted with countdown timer
    const initialBadge = await page.evaluate(() => {
      const badge = document.querySelector("#caseExpiryBadge");
      const player = document.querySelector("abi-local-player");
      return {
        exists: Boolean(badge),
        role: badge?.getAttribute("role"),
        text: badge?.textContent,
        title: badge?.title,
        hasPulseBadge: badge?.classList.contains("abi-case-expiring"),
        hasPulsePlayer: player?.classList.contains("abi-case-expiring"),
      };
    });

    assert.equal(initialBadge.exists, true, "Case expiry badge exists on active workbench case");
    assert.equal(initialBadge.role, "timer", "Badge has role=timer for accessibility");
    assert.match(initialBadge.text, /Expires:\s*1[45]:\d\d/, "Displays remaining review time (e.g. 15:00 or 14:59)");
    assert.match(
      initialBadge.title,
      /Case review expires in (?:15:00|14:59) — submitting after expiration makes the verdict invalid/,
      "Tooltip warns about expiration invalidating verdict",
    );
    assert.equal(initialBadge.hasPulseBadge, false, "Does not pulse when > 60s remain");
    assert.equal(initialBadge.hasPulsePlayer, false, "Player border does not pulse when > 60s remain");

    // 2. Under-60s Amber/Red Pulse Warning: Set remaining to 45 seconds
    const under60 = await page.evaluate(() => {
      const player = document.querySelector("abi-local-player");
      const badge = document.querySelector("#caseExpiryBadge");
      player.dataset.caseRemaining = "45";
      player.updateExpiry();
      return {
        text: badge.textContent,
        title: badge.title,
        hasPulseBadge: badge.classList.contains("abi-case-expiring"),
        hasPulsePlayer: player.classList.contains("abi-case-expiring"),
      };
    });

    assert.match(under60.text, /00:45/, "Displays 00:45 remaining time");
    assert.equal(
      under60.title,
      "Case review expires in 00:45 — submitting after expiration makes the verdict invalid",
      "Tooltip updates with under-60s warning",
    );
    assert.equal(under60.hasPulseBadge, true, "Badge pulses in warm amber/red when under 60 seconds");
    assert.equal(under60.hasPulsePlayer, true, "Player border pulses in warm amber/red when under 60 seconds");

    // 3. Expiration State: Set remaining to 0 seconds
    const expired = await page.evaluate(() => {
      const player = document.querySelector("abi-local-player");
      const badge = document.querySelector("#caseExpiryBadge");
      player.dataset.caseRemaining = "0";
      player.updateExpiry();
      return {
        text: badge.textContent,
        title: badge.title,
        isExpired: badge.classList.contains("abi-case-expired"),
        hasPulseBadge: badge.classList.contains("abi-case-expiring"),
      };
    });

    assert.match(expired.text, /00:00 \(EXPIRED\)/, "Displays expired notice");
    assert.equal(
      expired.title,
      "Case review expires in 00:00 — submitting after expiration makes the verdict invalid",
      "Tooltip indicates review expired",
    );
    assert.equal(expired.isExpired, true, "Badge has abi-case-expired class");

    // 4. Test clicking badge triggers toast notice
    await page.evaluate(() => {
      const badge = document.querySelector("#caseExpiryBadge");
      badge.click();
    });

    const toastText = await page.evaluate(() => {
      const controls = document.querySelector("abi-local-controls");
      return controls.shadowRoot.querySelector("#status")?.textContent;
    });

    assert.match(toastText, /Case review expires in 00:00/, "Clicking expiry badge shows status toast");

    // 5. Mount below inspection notes box: when .tips-content exists in .info-team, badge moves directly after it
    const mountedBelowNotes = await page.evaluate(() => {
      let infoTeam = document.querySelector("#xcWorking .content.video .info-team");
      if (!infoTeam) {
        infoTeam = document.createElement("div");
        infoTeam.className = "info-team";
        const contentVideo = document.querySelector("#xcWorking .content.video");
        contentVideo.prepend(infoTeam);
      }
      const tipsBox = document.createElement("div");
      tipsBox.className = "tips-content";
      infoTeam.append(tipsBox);

      const player = document.querySelector("abi-local-player");
      player.updateExpiry();

      const badge = document.querySelector("#caseExpiryBadge");
      return {
        previousIsNotes: badge.previousElementSibling === tipsBox,
        parentIsInfoTeam: badge.parentElement === infoTeam,
      };
    });

    assert.equal(mountedBelowNotes.previousIsNotes, true, "Case expiry badge mounts directly after .tips-content");
    assert.equal(mountedBelowNotes.parentIsInfoTeam, true, "Case expiry badge is located inside .info-team");

  } finally {
    await browser?.close();
  }
});

test("Double-Click or F for Fullscreen Video: toggles fullscreen via F key and double-click on video area", async (t) => {
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
      <html data-abi-site="on">
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

    // Setup fullscreen mock before scripts load
    await page.evaluate(() => {
      const v = document.querySelector("video");
      let _paused = true;
      Object.defineProperty(v, "paused", {
        get: () => _paused,
        set: (val) => { _paused = val; },
        configurable: true,
      });
      v.play = async () => { _paused = false; v.dispatchEvent(new Event("play")); };
      v.pause = () => { _paused = true; v.dispatchEvent(new Event("pause")); };

      let _fsEl = null;
      Object.defineProperty(document, "fullscreenElement", {
        get: () => _fsEl,
        configurable: true,
      });
      HTMLElement.prototype.requestFullscreen = async function () {
        _fsEl = this;
        document.dispatchEvent(new Event("fullscreenchange"));
      };
      document.exitFullscreen = async function () {
        _fsEl = null;
        document.dispatchEvent(new Event("fullscreenchange"));
      };
    });

    await page.addScriptTag({ path: path.join(__dirname, "..", "abi-inspector-enhancer", "settings.js") });
    await page.addScriptTag({ path: path.join(__dirname, "..", "abi-inspector-enhancer", "content.js") });

    await page.waitForSelector("abi-local-player", { state: "attached" });
    await page.waitForSelector("abi-local-controls", { state: "attached" });

    // Initial state: not in fullscreen
    let fsState = await page.evaluate(() => {
      const shell = document.querySelector("abi-local-player");
      const controls = document.querySelector("abi-local-controls");
      const fsBtn = controls.shadowRoot.querySelector("#fullscreen");
      return {
        isFullscreen: document.fullscreenElement === shell,
        ariaPressed: fsBtn.getAttribute("aria-pressed"),
      };
    });
    assert.equal(fsState.isFullscreen, false, "Initially not fullscreen");
    assert.equal(fsState.ariaPressed, "false", "Fullscreen button aria-pressed is initially false");

    // 1. Press 'F' key to toggle fullscreen ON
    await page.keyboard.press("KeyF");

    fsState = await page.evaluate(() => {
      const shell = document.querySelector("abi-local-player");
      const controls = document.querySelector("abi-local-controls");
      const fsBtn = controls.shadowRoot.querySelector("#fullscreen");
      return {
        isFullscreen: document.fullscreenElement === shell,
        ariaPressed: fsBtn.getAttribute("aria-pressed"),
      };
    });
    assert.equal(fsState.isFullscreen, true, "Pressing F key enters fullscreen");
    assert.equal(fsState.ariaPressed, "true", "Fullscreen button aria-pressed updates to true");

    // 2. Press 'F' key again to toggle fullscreen OFF
    await page.keyboard.press("KeyF");

    fsState = await page.evaluate(() => {
      const shell = document.querySelector("abi-local-player");
      const controls = document.querySelector("abi-local-controls");
      const fsBtn = controls.shadowRoot.querySelector("#fullscreen");
      return {
        isFullscreen: document.fullscreenElement === shell,
        ariaPressed: fsBtn.getAttribute("aria-pressed"),
      };
    });
    assert.equal(fsState.isFullscreen, false, "Pressing F key again exits fullscreen");
    assert.equal(fsState.ariaPressed, "false", "Fullscreen button aria-pressed updates to false");

    // 3. Double-click anywhere on the video area to toggle fullscreen ON
    await page.evaluate(() => {
      const player = document.querySelector("#workingPlayer");
      player.dispatchEvent(new MouseEvent("dblclick", { bubbles: true, cancelable: true }));
    });

    fsState = await page.evaluate(() => {
      const shell = document.querySelector("abi-local-player");
      const controls = document.querySelector("abi-local-controls");
      const fsBtn = controls.shadowRoot.querySelector("#fullscreen");
      return {
        isFullscreen: document.fullscreenElement === shell,
        ariaPressed: fsBtn.getAttribute("aria-pressed"),
      };
    });
    assert.equal(fsState.isFullscreen, true, "Double-clicking video area enters fullscreen");
    assert.equal(fsState.ariaPressed, "true", "Fullscreen button aria-pressed is true after dblclick");

    // 4. Double-click on video area again to toggle fullscreen OFF
    await page.evaluate(() => {
      const player = document.querySelector("#workingPlayer");
      player.dispatchEvent(new MouseEvent("dblclick", { bubbles: true, cancelable: true }));
    });

    fsState = await page.evaluate(() => {
      const shell = document.querySelector("abi-local-player");
      const controls = document.querySelector("abi-local-controls");
      const fsBtn = controls.shadowRoot.querySelector("#fullscreen");
      return {
        isFullscreen: document.fullscreenElement === shell,
        ariaPressed: fsBtn.getAttribute("aria-pressed"),
      };
    });
    assert.equal(fsState.isFullscreen, false, "Double-clicking video area again exits fullscreen");
    assert.equal(fsState.ariaPressed, "false", "Fullscreen button aria-pressed is false after second dblclick");

    // 5. Volume slider thumb styling check
    const volumeStyles = await page.evaluate(() => {
      const controls = document.querySelector("abi-local-controls");
      const style = controls.shadowRoot.querySelector("style")?.textContent;
      return style || "";
    });
    assert.match(volumeStyles, /#volume::-webkit-slider-thumb\s*\{[^}]*width:\s*8px/, "Volume thumb is styled with 8px diameter and vertically centered on track");

  } finally {
    await browser?.close();
  }
});

test("Background Tab Auto-Pause: automatically pauses when tab is hidden and resumes when returning, preserving manual pause state", async (t) => {
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

    await page.evaluate(() => {
      const v = document.querySelector("video");
      let _paused = true;
      Object.defineProperty(v, "paused", {
        get: () => _paused,
        set: (val) => { _paused = val; },
        configurable: true,
      });
      v.play = async () => { _paused = false; v.dispatchEvent(new Event("play")); };
      v.pause = () => { _paused = true; v.dispatchEvent(new Event("pause")); };
    });

    await page.addScriptTag({ path: path.join(__dirname, "..", "abi-inspector-enhancer", "settings.js") });
    await page.addScriptTag({ path: path.join(__dirname, "..", "abi-inspector-enhancer", "content.js") });

    await page.waitForSelector("abi-local-player", { state: "attached" });
    await page.waitForSelector("abi-local-controls", { state: "attached" });

    // 1. Initial state: video autoplays on load
    let isPaused = await page.evaluate(() => document.querySelector("video").paused);
    assert.equal(isPaused, false, "Video is playing initially");

    // 2. Tab is hidden (user switches to another tab or minimizes browser)
    await page.evaluate(() => {
      Object.defineProperty(document, "hidden", { value: true, configurable: true });
      document.dispatchEvent(new Event("visibilitychange"));
    });

    let stateAfterHide = await page.evaluate(() => {
      const v = document.querySelector("video");
      return {
        paused: v.paused,
        bgPaused: v.dataset.abiBackgroundPaused,
      };
    });
    assert.equal(stateAfterHide.paused, true, "Video automatically pauses when tab is hidden");
    assert.equal(stateAfterHide.bgPaused, "true", "Marks abiBackgroundPaused as true");

    // 3. User returns to the tab (tab becomes visible)
    await page.evaluate(() => {
      Object.defineProperty(document, "hidden", { value: false, configurable: true });
      document.dispatchEvent(new Event("visibilitychange"));
    });

    let stateAfterShow = await page.evaluate(() => {
      const v = document.querySelector("video");
      return {
        paused: v.paused,
        bgPaused: v.dataset.abiBackgroundPaused,
      };
    });
    assert.equal(stateAfterShow.paused, false, "Video automatically resumes playing when returning to tab");
    assert.equal(stateAfterShow.bgPaused, undefined, "Clears abiBackgroundPaused mark");

    // 4. User manually pauses video before switching tabs
    await page.evaluate(() => {
      const controls = document.querySelector("abi-local-controls");
      const playBtn = controls.shadowRoot.querySelector("button#play");
      playBtn.click();
    });

    isPaused = await page.evaluate(() => document.querySelector("video").paused);
    assert.equal(isPaused, true, "Video is manually paused by user");

    // 5. Tab is hidden while video was already paused by user
    await page.evaluate(() => {
      Object.defineProperty(document, "hidden", { value: true, configurable: true });
      document.dispatchEvent(new Event("visibilitychange"));
    });

    let stateAfterManualHide = await page.evaluate(() => {
      const v = document.querySelector("video");
      return {
        paused: v.paused,
        bgPaused: v.dataset.abiBackgroundPaused,
      };
    });
    assert.equal(stateAfterManualHide.paused, true, "Video remains paused");
    assert.equal(stateAfterManualHide.bgPaused, undefined, "Does not mark abiBackgroundPaused if already manually paused");

    // 6. User returns to tab: manual pause state MUST be preserved!
    await page.evaluate(() => {
      Object.defineProperty(document, "hidden", { value: false, configurable: true });
      document.dispatchEvent(new Event("visibilitychange"));
    });

    let stateAfterManualReturn = await page.evaluate(() => document.querySelector("video").paused);
    assert.equal(stateAfterManualReturn, true, "Manual pause is preserved when returning to tab");

    // 7. When data-abi-background-pause='off', auto-pause is disabled
    await page.evaluate(() => {
      const controls = document.querySelector("abi-local-controls");
      const playBtn = controls.shadowRoot.querySelector("button#play");
      playBtn.click(); // resume play
      document.documentElement.dataset.abiBackgroundPause = "off";
    });

    isPaused = await page.evaluate(() => document.querySelector("video").paused);
    assert.equal(isPaused, false, "Video is playing");

    await page.evaluate(() => {
      Object.defineProperty(document, "hidden", { value: true, configurable: true });
      document.dispatchEvent(new Event("visibilitychange"));
    });

    let stateWithSettingOff = await page.evaluate(() => document.querySelector("video").paused);
    assert.equal(stateWithSettingOff, false, "Video does not auto-pause when abiBackgroundPause is off");

  } finally {
    await browser?.close();
  }
});

test("Millisecond / Fractional Time Display: toggles precision format via click on time display, shows milliseconds on player and hover badge, and persists preference", async (t) => {
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
      <html data-abi-site="on">
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
      let _currentTime = 14.35;
      let _duration = 62.00;
      Object.defineProperty(v, "paused", {
        get: () => _paused,
        set: (val) => { _paused = val; },
        configurable: true,
      });
      Object.defineProperty(v, "currentTime", {
        get: () => _currentTime,
        set: (val) => { _currentTime = val; },
        configurable: true,
      });
      Object.defineProperty(v, "duration", {
        get: () => _duration,
        set: (val) => { _duration = val; },
        configurable: true,
      });
      v.play = async () => { _paused = false; v.dispatchEvent(new Event("play")); };
      v.pause = () => { _paused = true; v.dispatchEvent(new Event("pause")); };
    });

    await page.addScriptTag({ path: path.join(__dirname, "..", "abi-inspector-enhancer", "settings.js") });
    await page.addScriptTag({ path: path.join(__dirname, "..", "abi-inspector-enhancer", "content.js") });

    await page.waitForSelector("abi-local-player", { state: "attached" });

    // 1. Initial State: Standard format (MM:SS / MM:SS)
    const initialText = await page.evaluate(() => {
      const controls = document.querySelector("abi-local-controls");
      const timeEl = controls.shadowRoot.querySelector("#time");
      return {
        text: timeEl.textContent,
        title: timeEl.title,
        role: timeEl.getAttribute("role"),
      };
    });

    assert.equal(initialText.text, "00:14 / 01:02", "Default format displays standard seconds (00:14 / 01:02)");
    assert.equal(initialText.role, "button", "Time display has role=button for accessibility");
    assert.equal(initialText.title, "Click to toggle millisecond precision", "Time display has helpful tooltip");

    // 2. Click time display to toggle millisecond precision
    await page.evaluate(() => {
      const controls = document.querySelector("abi-local-controls");
      const timeEl = controls.shadowRoot.querySelector("#time");
      timeEl.click();
    });

    const msState = await page.evaluate(() => {
      const controls = document.querySelector("abi-local-controls");
      const timeEl = controls.shadowRoot.querySelector("#time");
      const toast = controls.shadowRoot.querySelector("#status");
      const player = document.querySelector("abi-local-player");
      return {
        text: timeEl.textContent,
        toastText: toast?.textContent,
        datasetPrecision: player.dataset.timePrecision,
        storedPrecision: localStorage.getItem("abi-time-precision"),
      };
    });

    assert.equal(msState.text, "00:14.35 / 01:02.00", "Displays fractional millisecond precision (00:14.35 / 01:02.00)");
    assert.equal(msState.toastText, "Millisecond precision enabled", "Shows HUD toast notice confirming enablement");
    assert.equal(msState.datasetPrecision, "ms", "Sets data-time-precision='ms' on player shell");
    assert.equal(msState.storedPrecision, "ms", "Persists preference in localStorage");

    // 3. Hovering scrubber also previews fractional milliseconds
    const hoverBadgeText = await page.evaluate(() => {
      const controls = document.querySelector("abi-local-controls");
      const seek = controls.shadowRoot.querySelector("#seek");
      const hoverBadge = controls.shadowRoot.querySelector("#hoverBadge");
      const rect = seek.getBoundingClientRect();
      seek.dispatchEvent(
        new PointerEvent("pointermove", {
          clientX: rect.left + rect.width * 0.5,
          bubbles: true,
        }),
      );
      return hoverBadge.textContent;
    });

    assert.equal(hoverBadgeText, "00:31.00", "Hover badge on scrubber displays fractional millisecond preview");

    // 4. Click again to revert to standard time format
    await page.evaluate(() => {
      const controls = document.querySelector("abi-local-controls");
      const timeEl = controls.shadowRoot.querySelector("#time");
      timeEl.click();
    });

    const revertedState = await page.evaluate(() => {
      const controls = document.querySelector("abi-local-controls");
      const timeEl = controls.shadowRoot.querySelector("#time");
      const toast = controls.shadowRoot.querySelector("#status");
      return {
        text: timeEl.textContent,
        toastText: toast?.textContent,
        storedPrecision: localStorage.getItem("abi-time-precision"),
      };
    });

    assert.equal(revertedState.text, "00:14 / 01:02", "Reverts to standard format (00:14 / 01:02)");
    assert.equal(revertedState.toastText, "Standard time format", "Shows HUD toast notice confirming standard format");
    assert.equal(revertedState.storedPrecision, "normal", "Updates localStorage to normal");

  } finally {
    await browser?.close();
  }
});

test("Tactical Hold-to-Zoom Loupe: magnifies video 2.5x centered on cursor when Z or right-click held and resets on release", async (t) => {
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
      <html data-abi-site="on" data-abi-auto-play="off">
      <head>
        <style>
          .content.video { width: 800px; height: 500px; }
          .play-box { width: 100%; height: 100%; }
          #workingPlayer { width: 800px; height: 450px; }
          video { width: 800px; height: 450px; display: block; }
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
      v.play = async () => { _paused = false; };
      v.pause = () => { _paused = true; };
      Object.defineProperty(v, "duration", { get: () => 62, configurable: true });
      Object.defineProperty(v, "currentTime", { get: () => 14.35, configurable: true });
    });

    await page.addScriptTag({ path: path.join(__dirname, "..", "abi-inspector-enhancer", "settings.js") });
    await page.addScriptTag({ path: path.join(__dirname, "..", "abi-inspector-enhancer", "content.js") });

    await page.waitForSelector("abi-local-player", { state: "attached" });
    await page.waitForSelector(".abi-zoom-badge", { state: "attached" });

    // 1. Initial State: 1x magnification, badge hidden
    const initialState = await page.evaluate(() => {
      const video = document.querySelector("video");
      const shell = document.querySelector("abi-local-player");
      const badge = shell.querySelector(".abi-zoom-badge");
      return {
        transform: video.style.transform,
        transformOrigin: video.style.transformOrigin,
        badgeActive: badge.classList.contains("active"),
        zoomAttr: shell.dataset.abiZoom,
      };
    });

    assert.equal(initialState.transform, "", "Initial transform is empty (1x)");
    assert.equal(initialState.badgeActive, false, "Zoom badge is initially inactive");
    assert.equal(initialState.zoomAttr, undefined, "No zoom dataset attribute initially");

    // 2. Move pointer over video at 25% X, 75% Y
    await page.evaluate(() => {
      const video = document.querySelector("video");
      const rect = video.getBoundingClientRect();
      const player = document.querySelector("#workingPlayer");
      player.dispatchEvent(new PointerEvent("pointermove", {
        clientX: rect.left + rect.width * 0.25,
        clientY: rect.top + rect.height * 0.75,
        bubbles: true,
      }));
    });

    // 3. Press and hold 'z' key
    await page.keyboard.down("z");

    const zoomedState = await page.evaluate(() => {
      const video = document.querySelector("video");
      const shell = document.querySelector("abi-local-player");
      const badge = shell.querySelector(".abi-zoom-badge");
      return {
        transform: video.style.transform,
        transformOrigin: video.style.transformOrigin,
        cursor: video.style.cursor,
        badgeActive: badge.classList.contains("active"),
        badgeText: badge.textContent,
        zoomAttr: shell.dataset.abiZoom,
      };
    });

    assert.equal(zoomedState.transform, "scale(2.5)", "Holding Z magnifies video to scale(2.5)");
    assert.match(zoomedState.transformOrigin, /^25(\.0+)?% 75(\.0+)?%$/, "Transform origin aligns with cursor position (25% 75%)");
    assert.equal(zoomedState.cursor, "crosshair", "Cursor changes to crosshair during zoom");
    assert.equal(zoomedState.badgeActive, true, "Zoom badge is active");
    assert.equal(zoomedState.badgeText, "2.5× LOUPE", "Zoom badge displays '2.5× LOUPE'");
    assert.equal(zoomedState.zoomAttr, "2.5x", "Player shell has data-abi-zoom='2.5x'");

    // 4. Move pointer dynamically while zooming to 60% X, 40% Y
    await page.evaluate(() => {
      const video = document.querySelector("video");
      const rect = video.getBoundingClientRect();
      window.dispatchEvent(new PointerEvent("pointermove", {
        clientX: rect.left + rect.width * 0.60,
        clientY: rect.top + rect.height * 0.40,
        bubbles: true,
      }));
    });

    const pannedOrigin = await page.evaluate(() => document.querySelector("video").style.transformOrigin);
    assert.match(pannedOrigin, /^60(\.0+)?% 40(\.0+)?%$/, "Transform origin tracks dynamic cursor movement (60% 40%)");

    // 5. Release 'z' key: instantly snaps back to 1x
    await page.keyboard.up("z");

    const releasedState = await page.evaluate(() => {
      const video = document.querySelector("video");
      const shell = document.querySelector("abi-local-player");
      const badge = shell.querySelector(".abi-zoom-badge");
      return {
        transform: video.style.transform,
        transformOrigin: video.style.transformOrigin,
        cursor: video.style.cursor,
        badgeActive: badge.classList.contains("active"),
        zoomAttr: shell.dataset.abiZoom,
      };
    });

    assert.equal(releasedState.transform, "", "Transform snaps back to empty (1x) on key release");
    assert.equal(releasedState.transformOrigin, "", "Transform origin is cleared");
    assert.equal(releasedState.badgeActive, false, "Zoom badge is hidden");
    assert.equal(releasedState.zoomAttr, undefined, "Zoom dataset attribute is cleared");

    // 6. Right-click hold test: pointerdown button=2 activates zoom, pointerup releases
    await page.evaluate(() => {
      const video = document.querySelector("video");
      const rect = video.getBoundingClientRect();
      const player = document.querySelector("#workingPlayer");
      player.dispatchEvent(new PointerEvent("pointerdown", {
        button: 2,
        clientX: rect.left + rect.width * 0.5,
        clientY: rect.top + rect.height * 0.5,
        bubbles: true,
      }));
    });

    const rightClickZoomed = await page.evaluate(() => document.querySelector("video").style.transform);
    assert.equal(rightClickZoomed, "scale(2.5)", "Right-click hold activates scale(2.5)");

    await page.evaluate(() => {
      window.dispatchEvent(new PointerEvent("pointerup", {
        button: 2,
        bubbles: true,
      }));
    });

    const rightClickReleased = await page.evaluate(() => document.querySelector("video").style.transform);
    assert.equal(rightClickReleased, "", "Releasing right click restores 1x");

  } finally {
    await browser?.close();
  }
});

test("Shadow & Gamma Boost: cycles Normal -> Shadow Boost -> Max Brightness -> Normal via G key and HUD toolbar button", async (t) => {
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
      <html data-abi-site="on" data-abi-auto-play="off">
      <head>
        <style>
          .content.video { width: 800px; height: 500px; }
          .play-box { width: 100%; height: 100%; }
          #workingPlayer { width: 800px; height: 450px; }
          video { width: 800px; height: 450px; display: block; }
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
      v.play = async () => { _paused = false; };
      v.pause = () => { _paused = true; };
      Object.defineProperty(v, "duration", { get: () => 62, configurable: true });
      Object.defineProperty(v, "currentTime", { get: () => 14.35, configurable: true });
    });

    await page.addScriptTag({ path: path.join(__dirname, "..", "abi-inspector-enhancer", "settings.js") });
    await page.addScriptTag({ path: path.join(__dirname, "..", "abi-inspector-enhancer", "content.js") });

    await page.waitForSelector("abi-local-player", { state: "attached" });
    await page.waitForSelector("abi-local-controls", { state: "attached" });

    // 1. Initial State: normal gamma (filter is empty, gammaMode is normal)
    const initialState = await page.evaluate(() => {
      const video = document.querySelector("video");
      const shell = document.querySelector("abi-local-player");
      const controls = document.querySelector("abi-local-controls");
      const gammaBtn = controls.shadowRoot.querySelector("#gamma");
      return {
        filter: video.style.filter,
        gammaAttr: shell.dataset.abiGamma,
        btnActive: gammaBtn.classList.contains("active"),
        btnPressed: gammaBtn.getAttribute("aria-pressed"),
      };
    });

    assert.equal(initialState.filter, "", "Initial video filter is empty");
    assert.equal(initialState.gammaAttr, "normal", "Initial player shell has data-abi-gamma='normal'");
    assert.equal(initialState.btnActive, false, "Gamma button is initially not active");
    assert.equal(initialState.btnPressed, "false", "Gamma button aria-pressed is initially false");

    // 2. Press 'g' key to cycle to Shadow Boost
    await page.keyboard.press("g");

    const shadowState = await page.evaluate(() => {
      const video = document.querySelector("video");
      const shell = document.querySelector("abi-local-player");
      const controls = document.querySelector("abi-local-controls");
      const gammaBtn = controls.shadowRoot.querySelector("#gamma");
      const toast = controls.shadowRoot.querySelector("#status");
      return {
        filter: video.style.filter,
        gammaAttr: shell.dataset.abiGamma,
        btnActive: gammaBtn.classList.contains("active"),
        btnPressed: gammaBtn.getAttribute("aria-pressed"),
        toast: toast?.textContent,
        stored: localStorage.getItem("abi-gamma-mode"),
      };
    });

    assert.ok(shadowState.filter.includes("brightness(1.35)"), "Shadow Boost applies brightness(1.35)");
    assert.ok(shadowState.filter.includes("contrast(1.15)"), "Shadow Boost applies contrast(1.15)");
    assert.equal(shadowState.gammaAttr, "shadow", "Player shell has data-abi-gamma='shadow'");
    assert.equal(shadowState.btnActive, true, "Gamma button has active class");
    assert.equal(shadowState.btnPressed, "true", "Gamma button has aria-pressed='true'");
    assert.equal(shadowState.toast, "Gamma: Shadow Boost", "HUD toast announces 'Gamma: Shadow Boost'");
    assert.equal(shadowState.stored, "shadow", "Persists preference in localStorage");

    // 3. Press 'g' key again to cycle to Max Brightness
    await page.keyboard.press("g");

    const maxState = await page.evaluate(() => {
      const video = document.querySelector("video");
      const shell = document.querySelector("abi-local-player");
      const controls = document.querySelector("abi-local-controls");
      const gammaBtn = controls.shadowRoot.querySelector("#gamma");
      const toast = controls.shadowRoot.querySelector("#status");
      return {
        filter: video.style.filter,
        gammaAttr: shell.dataset.abiGamma,
        btnActive: gammaBtn.classList.contains("active"),
        btnPressed: gammaBtn.getAttribute("aria-pressed"),
        toast: toast?.textContent,
        stored: localStorage.getItem("abi-gamma-mode"),
      };
    });

    assert.ok(maxState.filter.includes("brightness(1.75)"), "Max Brightness applies brightness(1.75)");
    assert.ok(maxState.filter.includes("contrast(1.25)"), "Max Brightness applies contrast(1.25)");
    assert.equal(maxState.gammaAttr, "max", "Player shell has data-abi-gamma='max'");
    assert.equal(maxState.btnActive, true, "Gamma button remains active");
    assert.equal(maxState.btnPressed, "true", "Gamma button has aria-pressed='true'");
    assert.equal(maxState.toast, "Gamma: Max Brightness", "HUD toast announces 'Gamma: Max Brightness'");
    assert.equal(maxState.stored, "max", "Persists preference in localStorage");

    // 4. Click toolbar button to cycle back to Normal
    await page.evaluate(() => {
      const controls = document.querySelector("abi-local-controls");
      const gammaBtn = controls.shadowRoot.querySelector("#gamma");
      gammaBtn.click();
    });

    const revertedState = await page.evaluate(() => {
      const video = document.querySelector("video");
      const shell = document.querySelector("abi-local-player");
      const controls = document.querySelector("abi-local-controls");
      const gammaBtn = controls.shadowRoot.querySelector("#gamma");
      const toast = controls.shadowRoot.querySelector("#status");
      return {
        filter: video.style.filter,
        gammaAttr: shell.dataset.abiGamma,
        btnActive: gammaBtn.classList.contains("active"),
        btnPressed: gammaBtn.getAttribute("aria-pressed"),
        toast: toast?.textContent,
        stored: localStorage.getItem("abi-gamma-mode"),
      };
    });

    assert.equal(revertedState.filter, "", "Video filter reverts to empty (Normal)");
    assert.equal(revertedState.gammaAttr, "normal", "Player shell reverts to data-abi-gamma='normal'");
    assert.equal(revertedState.btnActive, false, "Gamma button is inactive");
    assert.equal(revertedState.btnPressed, "false", "Gamma button aria-pressed is false");
    assert.equal(revertedState.toast, "Gamma: Normal (1.0×)", "HUD toast announces 'Gamma: Normal (1.0×)'");
    assert.equal(revertedState.stored, "normal", "localStorage updated to 'normal'");

  } finally {
    await browser?.close();
  }
});

test("Silent Scrubbing: mutes audio during seek bar drag and restores previous mute state upon release", async (t) => {
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
      <html data-abi-site="on" data-abi-auto-play="off">
      <head>
        <style>
          .content.video { width: 800px; height: 500px; }
          .play-box { width: 100%; height: 100%; }
          #workingPlayer { width: 800px; height: 450px; }
          video { width: 800px; height: 450px; display: block; }
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
      let _paused = false;
      let _currentTime = 10;
      let _duration = 100;
      let _muted = false;
      let _volume = 0.8;

      Object.defineProperty(v, "paused", {
        get: () => _paused,
        set: (val) => { _paused = val; },
        configurable: true,
      });
      Object.defineProperty(v, "currentTime", {
        get: () => _currentTime,
        set: (val) => {
          _currentTime = val;
          v.dispatchEvent(new Event("timeupdate"));
        },
        configurable: true,
      });
      Object.defineProperty(v, "duration", {
        get: () => _duration,
        configurable: true,
      });
      Object.defineProperty(v, "readyState", {
        get: () => 4,
        configurable: true,
      });
      Object.defineProperty(v, "muted", {
        get: () => _muted,
        set: (val) => {
          _muted = val;
          v.dispatchEvent(new Event("volumechange"));
        },
        configurable: true,
      });
      Object.defineProperty(v, "volume", {
        get: () => _volume,
        set: (val) => {
          _volume = val;
          v.dispatchEvent(new Event("volumechange"));
        },
        configurable: true,
      });
      v.play = async () => { _paused = false; v.dispatchEvent(new Event("play")); };
      v.pause = () => { _paused = true; v.dispatchEvent(new Event("pause")); };
    });

    await page.addScriptTag({ path: path.join(__dirname, "..", "abi-inspector-enhancer", "settings.js") });
    await page.addScriptTag({ path: path.join(__dirname, "..", "abi-inspector-enhancer", "content.js") });

    await page.waitForSelector("abi-local-player", { state: "attached" });
    await page.waitForSelector("abi-local-controls", { state: "attached" });

    // Initial check: video is unmuted
    let isMuted = await page.evaluate(() => document.querySelector("video").muted);
    assert.equal(isMuted, false, "Initial video is not muted");

    // 1. Pointerdown on timeline scrubber starts silent scrubbing
    await page.evaluate(() => {
      const controls = document.querySelector("abi-local-controls");
      const seek = controls.shadowRoot.querySelector("#seek");
      seek.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, clientX: 100, clientY: 10 }));
    });

    isMuted = await page.evaluate(() => document.querySelector("video").muted);
    assert.equal(isMuted, true, "Video is automatically muted on scrubber pointerdown");

    // 2. Input event during scrubbing updates currentTime while maintaining muted state
    await page.evaluate(() => {
      const controls = document.querySelector("abi-local-controls");
      const seek = controls.shadowRoot.querySelector("#seek");
      seek.value = "45";
      seek.dispatchEvent(new Event("input", { bubbles: true }));
    });

    const scrubState = await page.evaluate(() => {
      const video = document.querySelector("video");
      return {
        muted: video.muted,
        currentTime: video.currentTime,
      };
    });
    assert.equal(scrubState.muted, true, "Video remains muted while dragging timeline scrubber");
    assert.equal(scrubState.currentTime, 45, "Video currentTime seeks to new position");

    // 3. Pointerup on scrubber releases scrub and restores unmuted audio
    await page.evaluate(() => {
      const controls = document.querySelector("abi-local-controls");
      const seek = controls.shadowRoot.querySelector("#seek");
      seek.dispatchEvent(new PointerEvent("pointerup", { bubbles: true }));
    });

    isMuted = await page.evaluate(() => document.querySelector("video").muted);
    assert.equal(isMuted, false, "Video audio is automatically restored upon pointerup");

    // 4. Scrubbing when previously muted preserves muted state upon release
    await page.evaluate(() => {
      const video = document.querySelector("video");
      video.muted = true;
    });

    await page.evaluate(() => {
      const controls = document.querySelector("abi-local-controls");
      const seek = controls.shadowRoot.querySelector("#seek");
      seek.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, clientX: 100, clientY: 10 }));
      seek.value = "60";
      seek.dispatchEvent(new Event("input", { bubbles: true }));
      seek.dispatchEvent(new PointerEvent("pointerup", { bubbles: true }));
    });

    isMuted = await page.evaluate(() => document.querySelector("video").muted);
    assert.equal(isMuted, true, "Video preserves muted state if it was already muted prior to scrubbing");

    // 5. Window pointerup (dragging off-slider) safely releases scrub
    await page.evaluate(() => {
      const video = document.querySelector("video");
      video.muted = false;
      const controls = document.querySelector("abi-local-controls");
      const seek = controls.shadowRoot.querySelector("#seek");
      seek.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, clientX: 100, clientY: 10 }));
    });

    isMuted = await page.evaluate(() => document.querySelector("video").muted);
    assert.equal(isMuted, true, "Video is muted on pointerdown");

    await page.evaluate(() => {
      window.dispatchEvent(new PointerEvent("pointerup", { bubbles: true }));
    });

    isMuted = await page.evaluate(() => document.querySelector("video").muted);
    assert.equal(isMuted, false, "Window pointerup safely restores audio even when released outside scrubber");

  } finally {
    await browser?.close();
  }
});

test("Playback Position Retain on Modals: preserves exact video playback timestamp when opening or closing modals/dialogs, preventing official scripts from rewinding to 0:00", async (t) => {
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
      <html data-abi-site="on" data-abi-auto-play="off">
      <head>
        <style>
          .content.video { width: 800px; height: 500px; }
          .play-box { width: 100%; height: 100%; }
          #workingPlayer { width: 800px; height: 450px; }
          video { width: 800px; height: 450px; display: block; }
          .popup { display: none; }
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
        <div id="illegalPopup" class="popup">
          <div class="popup-box">
            <button class="_close-btn">Close</button>
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
      let _currentTime = 28.5;
      let _duration = 120;
      let _muted = false;
      let _volume = 1;

      Object.defineProperty(v, "paused", {
        get: () => _paused,
        set: (val) => { _paused = val; },
        configurable: true,
      });
      Object.defineProperty(v, "currentTime", {
        get: () => _currentTime,
        set: (val) => {
          _currentTime = val;
          v.dispatchEvent(new Event("timeupdate"));
        },
        configurable: true,
      });
      Object.defineProperty(v, "duration", {
        get: () => _duration,
        configurable: true,
      });
      Object.defineProperty(v, "readyState", {
        get: () => 4,
        configurable: true,
      });
      Object.defineProperty(v, "muted", {
        get: () => _muted,
        set: (val) => {
          _muted = val;
          v.dispatchEvent(new Event("volumechange"));
        },
        configurable: true,
      });
      Object.defineProperty(v, "volume", {
        get: () => _volume,
        set: (val) => {
          _volume = val;
          v.dispatchEvent(new Event("volumechange"));
        },
        configurable: true,
      });
      v.play = async () => { _paused = false; v.dispatchEvent(new Event("play")); };
      v.pause = () => { _paused = true; v.dispatchEvent(new Event("pause")); };
    });

    await page.addScriptTag({ path: path.join(__dirname, "..", "abi-inspector-enhancer", "settings.js") });
    await page.addScriptTag({ path: path.join(__dirname, "..", "abi-inspector-enhancer", "content.js") });

    await page.waitForSelector("abi-local-player", { state: "attached" });
    await page.waitForSelector("abi-local-controls", { state: "attached" });

    // Establish stable playback position at 28.5s
    await page.evaluate(() => {
      const v = document.querySelector("video");
      v.dispatchEvent(new Event("timeupdate"));
    });

    let currentPos = await page.evaluate(() => document.querySelector("video").currentTime);
    assert.equal(currentPos, 28.5, "Video is paused at 28.5s");

    // 1. Simulate official modal opening (e.g. Violation dialog)
    await page.evaluate(() => {
      const popup = document.querySelector("#illegalPopup");
      popup.style.display = "block";
    });
    await page.waitForTimeout(50);

    // 2. Official script attempts to rewind video to 0:00 upon opening modal
    await page.evaluate(() => {
      const v = document.querySelector("video");
      v.currentTime = 0;
      v.dispatchEvent(new Event("seeking"));
    });

    currentPos = await page.evaluate(() => document.querySelector("video").currentTime);
    assert.equal(currentPos, 28.5, "Playback position is preserved and restored to 28.5s on modal open rewind");

    // 3. User closes modal (clicks close button / cancel)
    await page.evaluate(() => {
      const closeBtn = document.querySelector("#illegalPopup ._close-btn");
      closeBtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      const popup = document.querySelector("#illegalPopup");
      popup.style.display = "none";
    });
    await page.waitForTimeout(50);

    // 4. Official script attempts to rewind video to 0:00 upon closing modal
    await page.evaluate(() => {
      const v = document.querySelector("video");
      v.currentTime = 0;
      v.dispatchEvent(new Event("seeking"));
    });

    currentPos = await page.evaluate(() => document.querySelector("video").currentTime);
    assert.equal(currentPos, 28.5, "Playback position is preserved and restored to 28.5s on modal close rewind");

    // 5. Intentional user seek to 0:00 via player controls is NOT blocked
    await page.evaluate(() => {
      const controls = document.querySelector("abi-local-controls");
      const seek = controls.shadowRoot.querySelector("#seek");
      seek.value = "0";
      seek.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));
      seek.dispatchEvent(new Event("input", { bubbles: true }));
      seek.dispatchEvent(new PointerEvent("pointerup", { bubbles: true }));
    });

    currentPos = await page.evaluate(() => document.querySelector("video").currentTime);
    assert.equal(currentPos, 0, "Intentional user seeking to 0:00 via controls is permitted");

  } finally {
    await browser?.close();
  }
});

test("Custom HUD Accent Color Profiles: dynamically recolors player controls, progress bars, and moment pins across Amber, Green, Blue, and Crimson themes", async (t) => {
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
    page.on("pageerror", (err) => console.log("PAGE ERROR:", err));

    const mockHtml = `
      <html data-abi-site="on" data-abi-hud-accent="amber">
      <head>
        <style>
          .content.video { width: 800px; height: 500px; }
          .play-box { width: 100%; height: 100%; }
          #workingPlayer { width: 800px; height: 450px; }
          video { width: 800px; height: 450px; display: block; }
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
      let _currentTime = 10;
      Object.defineProperty(v, "paused", { get: () => true, configurable: true });
      Object.defineProperty(v, "currentTime", { get: () => _currentTime, set: (val) => { _currentTime = val; }, configurable: true });
      Object.defineProperty(v, "duration", { get: () => 100, configurable: true });
      Object.defineProperty(v, "readyState", { get: () => 4, configurable: true });
    });

    await page.addScriptTag({ path: path.join(__dirname, "..", "abi-inspector-enhancer", "settings.js") });
    await page.addScriptTag({ path: path.join(__dirname, "..", "abi-inspector-enhancer", "content.js") });

    await page.waitForSelector("abi-local-player", { state: "attached" });
    await page.waitForSelector("abi-local-controls", { state: "attached" });

    // 1. Initial Default Accent: Amber
    let themeProps = await page.evaluate(() => {
      const shell = document.querySelector("abi-local-player");
      return {
        accent: shell.style.getPropertyValue("--abi-accent"),
        track: shell.style.getPropertyValue("--abi-track-fill"),
        pin: shell.style.getPropertyValue("--abi-pin-color"),
      };
    });
    assert.equal(themeProps.accent, "#d49a37", "Amber theme primary accent is #d49a37");
    assert.equal(themeProps.track, "#e66b4e", "Amber theme seek track is #e66b4e");
    assert.equal(themeProps.pin, "#f59e0b", "Amber theme pin color is #f59e0b");

    // 2. Switch to Night-Vision Green theme
    await page.evaluate(() => {
      document.documentElement.dataset.abiHudAccent = "green";
      window.dispatchEvent(new CustomEvent("abi-accent-change", { detail: { accent: "green" } }));
    });
    await page.waitForTimeout(50);

    themeProps = await page.evaluate(() => {
      const shell = document.querySelector("abi-local-player");
      return {
        accent: shell.style.getPropertyValue("--abi-accent"),
        track: shell.style.getPropertyValue("--abi-track-fill"),
        pin: shell.style.getPropertyValue("--abi-pin-color"),
      };
    });
    assert.equal(themeProps.accent, "#3fb950", "Green theme primary accent is #3fb950");
    assert.equal(themeProps.track, "#3fb950", "Green theme seek track is #3fb950");
    assert.equal(themeProps.pin, "#56d364", "Green theme pin color is #56d364");

    // 3. Switch to Cyber Ice-Blue theme
    await page.evaluate(() => {
      document.documentElement.dataset.abiHudAccent = "blue";
      window.dispatchEvent(new CustomEvent("abi-accent-change", { detail: { accent: "blue" } }));
    });
    await page.waitForTimeout(50);

    themeProps = await page.evaluate(() => {
      const shell = document.querySelector("abi-local-player");
      return {
        accent: shell.style.getPropertyValue("--abi-accent"),
        track: shell.style.getPropertyValue("--abi-track-fill"),
        pin: shell.style.getPropertyValue("--abi-pin-color"),
      };
    });
    assert.equal(themeProps.accent, "#58a6ff", "Blue theme primary accent is #58a6ff");
    assert.equal(themeProps.track, "#58a6ff", "Blue theme seek track is #58a6ff");
    assert.equal(themeProps.pin, "#79c0ff", "Blue theme pin color is #79c0ff");

    // 4. Switch to Combat Crimson theme
    await page.evaluate(() => {
      document.documentElement.dataset.abiHudAccent = "crimson";
      window.dispatchEvent(new CustomEvent("abi-accent-change", { detail: { accent: "crimson" } }));
    });
    await page.waitForTimeout(50);

    themeProps = await page.evaluate(() => {
      const shell = document.querySelector("abi-local-player");
      return {
        accent: shell.style.getPropertyValue("--abi-accent"),
        track: shell.style.getPropertyValue("--abi-track-fill"),
        pin: shell.style.getPropertyValue("--abi-pin-color"),
      };
    });
    assert.equal(themeProps.accent, "#f85149", "Crimson theme primary accent is #f85149");
    assert.equal(themeProps.track, "#f85149", "Crimson theme seek track is #f85149");
    assert.equal(themeProps.pin, "#ff7b72", "Crimson theme pin color is #ff7b72");

    // 5. Reset to Amber theme
    await page.evaluate(() => {
      document.documentElement.dataset.abiHudAccent = "amber";
      window.dispatchEvent(new CustomEvent("abi-accent-change", { detail: { accent: "amber" } }));
    });
    await page.waitForTimeout(50);

    themeProps = await page.evaluate(() => {
      const shell = document.querySelector("abi-local-player");
      return {
        accent: shell.style.getPropertyValue("--abi-accent"),
        track: shell.style.getPropertyValue("--abi-track-fill"),
        pin: shell.style.getPropertyValue("--abi-pin-color"),
      };
    });
    assert.equal(themeProps.accent, "#d49a37", "Amber theme restored to #d49a37");

  } finally {
    await browser?.close();
  }
});









