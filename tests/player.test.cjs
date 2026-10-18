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




