const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const path = require("node:path");
const root = path.join(__dirname, "..", "abi-inspector-enhancer");
const summary = {
  userJudgeSummary: { season_total_case_num: 390, season_right_case_num: 306, season_wrong_case_num: 34, season_right_punish_case_num: 108, season_accuracy: 9128, life_accuracy: 9025, day_judged_num: 3, day_permit_num: 20 },
  userWeekJudgeSummary: { week_total_num: 43, week_right_num: 9, week_wrong_num: 3, week_right_punish_num: 1 },
  userGrowthSummary: { ret_exp_level: 22, total_exp: 2575, level_got_exp: 5, exp_step: 210, exp_process: 2.38 },
};

test("observer preserves send arguments/result and publishes only summary fields", () => {
  const messages = [];
  const originalBody = JSON.stringify({ ret: 0, jData: { iRet: 0, ...summary, token: "private", roleData: { charac_name: "private" } } });
  class XHR {
    constructor() { this.listeners = {}; this.responseURL = "https://sg-apps.vasdgame.com/ide/"; this.status = 200; this.responseType = ""; this.responseText = originalBody; }
    addEventListener(name, fn) { this.listeners[name] = fn; }
    removeEventListener(name) { delete this.listeners[name]; }
    send(...args) { this.sent = args; return "original result"; }
  }
  const context = vm.createContext({ XMLHttpRequest: XHR, URL, location: { origin: "https://www.arenabreakoutinfinite.com" }, window: { postMessage: (message) => messages.push(message) } });
  vm.runInContext(fs.readFileSync(path.join(root, "overview-observer.js"), "utf8"), context);
  const xhr = new XHR();
  assert.equal(xhr.send("original payload"), "original result");
  assert.deepEqual(xhr.sent, ["original payload"]);
  xhr.listeners.load();
  assert.equal(xhr.responseText, originalBody);
  assert.deepEqual(JSON.parse(JSON.stringify(messages[0].data)), summary);
  xhr.responseURL = "https://example.com/ide/";
  xhr.listeners.load();
  assert.equal(messages.length, 1);
});

test("Overview renders live counts and XP, updates without duplicate cards, and handles unavailable data", async (t) => {
  let playwright;
  try {
    playwright = require("playwright");
  } catch {
    if (t && typeof t.skip === "function") {
      t.skip("playwright module is not installed in local environment");
      return;
    }
  }
  const { chromium } = playwright;
  const browser = await chromium.launch({ headless: true, channel: process.env.ABI_TEST_BROWSER || (process.platform === "win32" ? "msedge" : "chromium") });
  try {
    const page = await browser.newPage({ viewport: { width: 1320, height: 900 } });
    await page.setContent(`<html data-abi-site="on"><head><style>html{font-size:100px}body{font:16px system-ui;margin:0;background:#101618;color:white}#wxMine{height:850px}</style></head><body><div id="wxMine" class="content mine"><div class="user"><div class="user-info"><div class="username">Inspector</div><div class="userid"><span>ID</span></div><div class="honor"><span id="level-text">Senior Inspector</span></div><div class="grade"><span id="exp_level">22</span></div></div><div class="user-data"><ul class="statistics">${[616,43,506,"86%",185].map(value => `<li><strong>${value}</strong></li>`).join("")}</ul></div></div></div></body></html>`);
    await page.addStyleTag({ path: path.join(root, "layout.css") });
    const source = fs.readFileSync(path.join(root, "site-ui.js"), "utf8");
    const fn = source.slice(source.indexOf("  function updateOverview(enabled)"), source.indexOf("  function scheduleUpdate()"));
    await page.evaluate(({ fn, summary }) => {
      window.__abiOverviewData = summary;
      window.ranks = [{ title: "Senior Inspector", required: 375 }, { title: "Expert + Lv. 35", required: 475, levelRequired: 35 }];
      window.place = (parent, node) => { if (parent && node && node.parentElement !== parent) parent.append(node); };
      window.updateText = (node, value) => { if (node && node.textContent !== value) node.textContent = value; };
      window.setProgress = (node, value) => { node.style.width = `${value}%`; };
      window.createRankIcon = () => document.createElement("span");
      window.syncRankDialog = () => {};
      window.restoreOverview = () => {};
      window.eval(`${fn};window.renderOverview = updateOverview;`);
      window.renderOverview(true);
    }, { fn, summary });
    assert.equal(await page.locator('.abi-today-done').textContent(), "3");
    assert.equal(await page.locator('.abi-today-limit').textContent(), "20");
    assert.equal((await page.locator('.abi-today-count').textContent()).trim().replace(/\s+/g, " "), "3 of 20");
    assert.equal(await page.locator('.abi-stat-accuracy [data-stat="seasonal-accuracy"] strong').textContent(), "91.3%");
    assert.equal(await page.locator('.abi-stat-accuracy [data-stat="overall-accuracy"] strong').textContent(), "90.3%");
    assert.equal(await page.locator('.abi-stat-accuracy [data-stat="weekly-accuracy"] strong').textContent(), "75.0%");
    assert.equal(await page.locator('.abi-stat-inspections [data-period="weekly"] [data-stat="Correct"] strong').textContent(), "9");
    assert.equal(await page.locator('.abi-stat-inspections [data-period="season"] [data-stat="Bans"] strong').textContent(), "108");
    assert.equal(await page.locator('.abi-stat-inspections [data-period="weekly"] .abi-inspection-accuracy').textContent(), "75.0%");
    assert.equal(await page.locator('.abi-stat-inspections [data-period="season"] .abi-inspection-accuracy').textContent(), "91.3%");
    assert.equal(await page.locator('.abi-stat-inspections [data-period="lifetime"] .abi-inspection-accuracy').textContent(), "90.3%");
    assert.ok((await page.locator('.abi-level-caption').textContent()).includes("205 XP to level 23"));
    assert.ok((await page.locator('.abi-level-xp').textContent()).includes("2,575"));
    assert.equal(await page.locator('.abi-level-track').getAttribute("aria-valuemax"), "210");
    await page.evaluate(() => { window.__abiOverviewData.userJudgeSummary.day_judged_num = 4; window.renderOverview(true); });
    assert.equal(await page.locator('.abi-today-done').textContent(), "4");
    assert.equal((await page.locator('.abi-today-count').textContent()).trim().replace(/\s+/g, " "), "4 of 20");
    assert.equal(await page.locator('.abi-stat-card').count(), 3);
    // Match the short Overview panel in the reported screenshot, not just a tall desktop.
    await page.setViewportSize({ width: 1320, height: 650 });
    await page.locator('#wxMine').evaluate(node => { node.style.height = "640px"; });
    assert.ok(await page.locator('#wxMine').evaluate(node => node.scrollHeight <= node.clientHeight + 1), "Overview fits a 640px panel vertically");
    for (const width of [1320, 680, 390]) {
      await page.setViewportSize({ width, height: 900 });
      const fits = await page.locator('.abi-overview').evaluate(node => node.scrollWidth <= node.clientWidth + 1);
      assert.ok(fits, `Overview fits ${width}px`);
    }
    if (process.env.ABI_QA_SCREENSHOT) {
      await page.setViewportSize({ width: 1320, height: 650 });
      await page.screenshot({ path: process.env.ABI_QA_SCREENSHOT, fullPage: true });
    }
    await page.evaluate(() => { window.__abiOverviewData = {}; window.renderOverview(true); });
    assert.equal(await page.locator('.abi-level-caption').textContent(), "Waiting for progression data");
    assert.equal(await page.locator('.abi-stat-accuracy [data-stat="seasonal-accuracy"] strong').textContent(), "--");
  } finally { await browser?.close(); }
});
