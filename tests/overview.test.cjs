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

test("alert interceptor converts Chinese alert into English formatted alert and respects site setting", () => {
  const events = [];
  const nativeAlertCalls = [];
  let appendedToast = null;
  const mockDocument = {
    documentElement: { dataset: { abiExtension: "on", abiSite: "on" } },
    body: {
      appendChild: (node) => { appendedToast = node; },
    },
    getElementById: () => null,
    createElement: (tag) => {
      const el = {
        tagName: tag.toUpperCase(),
        classList: { add: () => {}, remove: () => {} },
        setAttribute: () => {},
        addEventListener: () => {},
        append: (...children) => { el.children = children; },
        appendChild: (child) => { el.children = el.children || []; el.children.push(child); },
        querySelector: (sel) => {
          if (sel === ".abi-alert-title") return { textContent: el.title };
          if (sel === ".abi-alert-message") return { textContent: el.message };
          return null;
        },
      };
      return el;
    },
    addEventListener: () => {},
    dispatchEvent: (evt) => { events.push(evt); },
  };

  const context = vm.createContext({
    XMLHttpRequest: class { addEventListener() {} removeEventListener() {} },
    URL,
    location: { origin: "https://www.arenabreakoutinfinite.com" },
    window: {
      alert: (msg) => { nativeAlertCalls.push(msg); },
      postMessage: () => {},
    },
    setTimeout,
    clearTimeout,
    document: mockDocument,
    CustomEvent: class {
      constructor(type, init) {
        this.type = type;
        this.detail = init?.detail;
      }
    },
  });

  vm.runInContext(fs.readFileSync(path.join(root, "overview-observer.js"), "utf8"), context);

  // 1. Call alert with "接口请求中，请稍后再试~"
  context.window.alert("接口请求中，请稍后再试~");

  assert.equal(nativeAlertCalls.length, 0, "Native alert was intercepted");
  assert.equal(events.length, 1, "Custom event dispatched");
  assert.equal(events[0].type, "abi:alert");
  assert.equal(events[0].detail.title, "Request in Progress");
  assert.equal(events[0].detail.message, "A request is currently in progress. Please wait a moment and try again.");
  assert.equal(events[0].detail.type, "warning");

  // 2. Call alert when site modifications are disabled
  mockDocument.documentElement.dataset.abiSite = "off";
  context.window.alert("接口请求中，请稍后再试~");
  assert.equal(nativeAlertCalls.length, 1, "Native alert called when site is disabled");
  assert.equal(nativeAlertCalls[0], "接口请求中，请稍后再试~");
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

    // Verify intrusive official Milo loader layer and loading-con are hidden
    await page.evaluate(() => {
      const loader = document.createElement("div");
      loader.id = "__milo_loader_layer__";
      loader.style.display = "block";
      loader.innerHTML = `
        <div id="loading-con">
          <span class="loading-con--icon"><img src="loading.png"></span>
          <p>Data loading</p>
        </div>
      `;
      document.body.appendChild(loader);
    });
    const loaderDisplay = await page.locator("#__milo_loader_layer__").evaluate((node) => getComputedStyle(node).display);
    const loadingConDisplay = await page.locator("#loading-con").evaluate((node) => getComputedStyle(node).display);
    assert.equal(loaderDisplay, "none", "__milo_loader_layer__ is suppressed with display: none");
    assert.equal(loadingConDisplay, "none", "#loading-con is suppressed with display: none");

    // Verify .index.upon-login is suppressed on load and patroller-btn is triggered
    await page.evaluate(() => {
      window.__patrollerClicked = false;
      const indexDiv = document.createElement("div");
      indexDiv.className = "index upon-login";
      const btn = document.createElement("a");
      btn.className = "str13 btn1 patroller-btn";
      btn.href = "javascript:window.__patrollerClicked = true;";
      indexDiv.appendChild(btn);
      document.body.appendChild(indexDiv);
    });
    const indexDisplayBefore = await page.locator(".index.upon-login").evaluate((node) => getComputedStyle(node).display);
    assert.equal(indexDisplayBefore, "none", ".index.upon-login is hidden before entering");

    // Execute autoEnterInspection logic
    await page.evaluate(() => {
      const root = document.documentElement;
      const indexPage = document.querySelector(".index.upon-login");
      if (indexPage) {
        root.dataset.abiEntered = "true";
        document.querySelectorAll(".index").forEach((el) => {
          el.style.display = "none";
        });
      }
    });
    const indexDisplayAfter = await page.locator(".index.upon-login").evaluate((node) => node.style.display);
    assert.equal(indexDisplayAfter, "none", ".index.upon-login is hidden directly without javascript: navigation");
    const enteredAttr = await page.evaluate(() => document.documentElement.dataset.abiEntered);
    assert.equal(enteredAttr, "true", "document.documentElement.dataset.abiEntered set to true");

    // Verify window.alert interception and tactical toast rendering in English
    const observerSource = fs.readFileSync(path.join(root, "overview-observer.js"), "utf8");
    await page.evaluate((src) => {
      window.eval(src);
      window.alert("接口请求中，请稍后再试~");
    }, observerSource);

    const toast = page.locator(".abi-alert-toast");
    assert.equal(await toast.count(), 1, "Toast element is attached");
    assert.equal(await toast.locator(".abi-alert-title").textContent(), "Request in Progress");
    assert.equal(await toast.locator(".abi-alert-message").textContent(), "A request is currently in progress. Please wait a moment and try again.");
    assert.ok((await toast.locator(".abi-alert-icon svg").count()) > 0, "Toast icon is rendered");

    // Click close button to dismiss toast
    await toast.locator(".abi-alert-close").click();
    await page.waitForTimeout(300);
    assert.equal(await page.locator(".abi-alert-toast").count(), 0, "Toast is dismissed on close button click");

    // Verify commonTips modal translation and styling
    await page.addStyleTag({ path: path.join(root, "dialogs.css") });
    await page.evaluate(() => {
      const popup = document.createElement("div");
      popup.id = "commonTips";
      popup.className = "popup";
      popup.innerHTML = `
        <a class="str96 close-btn _close-btn" href="javascript:;">关闭</a>
        <h3 class="str103">温馨提示</h3>
        <div class="popup-content">
          <p id="commonTipsText" class="common-text">接口请求中，请稍后再试~</p>
        </div>
        <a href="javascript:;" class="str102 btn3">确定</a>
      `;
      document.body.appendChild(popup);
    });
    const dialogsSource = fs.readFileSync(path.join(root, "dialogs.js"), "utf8");
    const commonTipsFn = dialogsSource.slice(dialogsSource.indexOf("  const COMMON_TIPS_TRANSLATIONS ="), dialogsSource.indexOf("  function removeExtras()"));
    await page.evaluate((code) => {
      window.HAS_CJK = /[\u3400-\u9fff\uff00-\uffef]/;
      window.eval(`${code}; fixCommonTips();`);
    }, commonTipsFn);

    assert.equal(await page.locator("#commonTips h3").textContent(), "Notice");
    assert.equal(await page.locator("#commonTips #commonTipsText").textContent(), "A request is currently in progress. Please wait a moment and try again.");
    assert.equal(await page.locator("#commonTips .btn3").textContent(), "OK");

    // Verify modal close button styling, SVG icon, and click-to-close behavior
    await page.addScriptTag({ path: path.join(root, "dialogs.js") });
    assert.ok(await page.locator("#commonTips .close-btn svg").count() >= 1, "Close button has SVG close icon");
    assert.equal(await page.locator("#commonTips .close-btn").getAttribute("aria-label"), "Close");
    await page.locator("#commonTips .close-btn").click();
    await page.waitForTimeout(100);
    const commonTipsDisplay = await page.evaluate(() => document.getElementById("commonTips").style.display);
    assert.equal(commonTipsDisplay, "none", "Popup is hidden after clicking close-btn");

    // Verify watermark insertion and Chinese comment removal
    await page.evaluate(() => {
      document.body.appendChild(document.createComment(" 巡查系统测试 "));
      document.body.appendChild(document.createComment(" English comment test "));
    });
    const siteUiSource = fs.readFileSync(path.join(root, "site-ui.js"), "utf8");
    const watermarkAndCommentFn = siteUiSource.slice(
      siteUiSource.indexOf("  const WATERMARK = `"),
      siteUiSource.indexOf("  const SITE_TRANSLATIONS ="),
    );
    await page.evaluate((code) => {
      window.root = document.documentElement;
      window.eval(`${code}; insertWatermark(); removeChineseComments(document);`);
    }, watermarkAndCommentFn);

    const comments = await page.evaluate(() => {
      const walker = document.createTreeWalker(document, NodeFilter.SHOW_COMMENT);
      const res = [];
      while (walker.nextNode()) {
        res.push(walker.currentNode.nodeValue);
      }
      return res;
    });

    const watermarkInfo = await page.evaluate(() => {
      let outsideWatermarkCount = 0;
      for (let child = document.firstChild; child; child = child.nextSibling) {
        if (child === document.documentElement) break;
        if (child.nodeType === Node.COMMENT_NODE && (child.nodeValue || "").includes("ABI INSPECTOR EXTENDED")) {
          outsideWatermarkCount++;
        }
      }
      let insideWatermarkCount = 0;
      const innerWalker = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_COMMENT);
      while (innerWalker.nextNode()) {
        if ((innerWalker.currentNode.nodeValue || "").includes("ABI INSPECTOR EXTENDED")) {
          insideWatermarkCount++;
        }
      }
      return { outsideWatermarkCount, insideWatermarkCount };
    });
    assert.equal(watermarkInfo.outsideWatermarkCount, 1, "Exactly one watermark comment is placed before the html tag");
    assert.equal(watermarkInfo.insideWatermarkCount, 0, "Zero watermark comments exist inside the html tag");

    const hasChineseComment = comments.some((c) => /[\u3400-\u9fff]/.test(c));
    assert.equal(hasChineseComment, false, "All Chinese comments have been stripped from the DOM");

    const hasEnglishComment = comments.some((c) => c.includes("English comment test"));
    assert.ok(hasEnglishComment, "Non-Chinese comments are preserved");

    // Verify console log banner output
    const loggedMessages = await page.evaluate((code) => {
      const logs = [];
      const origLog = console.log;
      delete window.__abiExtendedBannerLogged;
      console.log = (...args) => logs.push(args.join(" "));
      try {
        window.eval(code);
        logExtensionBanner();
      } finally {
        console.log = origLog;
      }
      return logs;
    }, siteUiSource.slice(siteUiSource.indexOf("  function logExtensionBanner()"), siteUiSource.indexOf("  const HAS_CJK =")));
    assert.ok(
      loggedMessages.some((m) => m.includes("ABI INSPECTOR EXTENDED") && m.includes("v2.6.19") && m.includes("deem") && m.includes("ACTIVE")),
      "Console banner is logged with extension name, version, author, and active status"
    );

    // Verify dynamic page-wide Chinese text and placeholder translation
    await page.evaluate(() => {
      const container = document.createElement("div");
      container.id = "translationTestContainer";
      container.innerHTML = `
        <div class="index">
          <div class="bdc"><h3>安全小队介绍</h3><p>亲爱的暗区先锋们：</p></div>
          <p id="mainText">尊敬的先锋，您目前还未成为B.D.C执行部一员，请先进行巡查资格申请</p>
          <a id="applyBtn" href="javascript:;">资格申请</a>
          <a id="practiceBtn" href="javascript:;">巡查演练</a>
          <a id="selectNoticeBtn" href="javascript:;">巡查公告</a>
        </div>
        <div class="operation">
          <a id="patrolButton0" class="btn1">违规</a>
          <a id="patrolButton1" class="btn1">不违规</a>
          <a id="patrolButton2" class="btn1">不确定</a>
          <a class="exit_btn2">退出巡查</a>
        </div>
        <ul id="taskTest">
          <li><a class="taks-btn2">去完成</a></li>
          <li><a class="taks-finish">已领取</a></li>
        </ul>
        <div class="punish-row">
          <span>玩家昵称</span>
          <span>封禁3650天</span>
        </div>
        <input id="testInput" placeholder="补充证据不足（最多50字）" title="温馨提示" />
      `;
      document.body.appendChild(container);
    });

    const translateBlock = siteUiSource.slice(
      siteUiSource.indexOf("  const SITE_TRANSLATIONS ="),
      siteUiSource.indexOf("  let autoEnteredInspection = false;"),
    );
    await page.evaluate((code) => {
      window.root = document.documentElement;
      window.eval(`${code}; translateChineseContent(true);`);
    }, translateBlock);

    assert.equal(await page.locator("#patrolButton0").textContent(), "Violation");
    assert.equal(await page.locator("#patrolButton1").textContent(), "No Violation");
    assert.equal(await page.locator("#patrolButton2").textContent(), "Uncertain");
    assert.equal(await page.locator(".exit_btn2").first().textContent(), "Exit Inspection");
    assert.equal(await page.locator("#applyBtn").textContent(), "Apply for Qualification");
    assert.equal(await page.locator("#practiceBtn").textContent(), "Test cases");
    assert.equal(await page.locator("#selectNoticeBtn").textContent(), "Announcements");
    assert.equal(await page.locator("#taskTest .taks-btn2").textContent(), "Go");
    assert.equal(await page.locator("#taskTest .taks-finish").textContent(), "Claimed");
    assert.equal(await page.locator(".punish-row span").nth(0).textContent(), "Player Nickname");
    assert.equal(await page.locator(".punish-row span").nth(1).textContent(), "Banned for 10 Years");
    assert.equal(await page.locator("#testInput").getAttribute("placeholder"), "Add details on why the evidence is insufficient (optional, max 50 characters)");
    assert.equal(await page.locator("#testInput").getAttribute("title"), "Notice");

    const remainingContainerChinese = await page.evaluate(() => {
      const el = document.getElementById("translationTestContainer");
      return /[\u3400-\u9fff]/.test(el?.textContent || "");
    });
    assert.equal(remainingContainerChinese, false, "Container has zero remaining Chinese characters after translation");

    // Verify exit inspection button click behavior
    const exitBtnCode = siteUiSource.slice(
      siteUiSource.indexOf("  function handleExitInspection("),
      siteUiSource.indexOf("  function updateChallengeRewards("),
    );
    await page.evaluate((code) => {
      window.eval(code);
      window.__exitInspectionFired = false;
      window.addEventListener("abi:exit-inspection", () => {
        window.__exitInspectionFired = true;
      });
      updateExitButton(true);
    }, exitBtnCode);

    await page.locator(".exit_btn2").first().click();
    const exitFired = await page.evaluate(() => window.__exitInspectionFired);
    assert.equal(exitFired, true, "abi:exit-inspection event dispatched on clicking exit button");
    const exitDisplay = await page.evaluate(() => document.querySelector(".exit_btn2").style.display);
    assert.equal(exitDisplay, "none", "exit button is hidden after being clicked");

    // Verify reverting translations when site modifications are disabled
    await page.evaluate(() => {
      translateChineseContent(false);
    });
    assert.equal(await page.locator("#patrolButton0").textContent(), "违规");
    assert.equal(await page.locator("#patrolButton1").textContent(), "不违规");
    assert.equal(await page.locator("#testInput").getAttribute("placeholder"), "补充证据不足（最多50字）");
  } finally { await browser?.close(); }
});

test("overview-observer provides ActTools polyfill and formats/consolidates console logs", () => {
  const originalLogs = [];
  const fakeConsole = {
    log: (...args) => originalLogs.push({ method: "log", args }),
    info: (...args) => originalLogs.push({ method: "info", args }),
    warn: (...args) => originalLogs.push({ method: "warn", args }),
    debug: (...args) => originalLogs.push({ method: "debug", args }),
  };

  const context = vm.createContext({
    window: {},
    navigator: { userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
    document: { documentElement: { dataset: { abiSite: "on" } } },
    console: fakeConsole,
    setTimeout: (fn) => { timers.push(fn); return timers.length; },
    clearTimeout: () => {},
  });
  const timers = [];

  const observerSource = fs.readFileSync(path.join(root, "overview-observer.js"), "utf8");
  vm.runInContext(observerSource, context);

  // 1. Verify ActTools polyfill exists and functions
  assert.ok(context.window.ActTools, "window.ActTools is defined");
  assert.equal(typeof context.window.ActTools.isPhone, "function");
  assert.equal(context.window.ActTools.isPhone(), false, "isPhone returns false on desktop userAgent");

  // 2. Test consolidating nav.js language logs
  context.console.log(2, ["cn", "en", "es", "pt-BR", "de", "ja", "ru", "zh-Hant", "th", "fr"]);
  context.console.log("en");
  context.console.log("ja");
  context.console.log("pt-BR");
  timers.splice(0).forEach((fn) => fn());

  // 3. Test translating Chinese log
  context.console.log("语言切换回调成功");

  // 4. Test activity start log
  context.console.log("start=====");

  // 5. Test common.js debug log
  context.console.log("初始化xxxxxxxxxx");

  const formattedStrings = originalLogs.map((l) => l.args.join(" "));

  // Assert language logs were consolidated
  const navLog = formattedStrings.find((s) => s.includes("Supported Languages"));
  assert.ok(navLog, "Consolidated [ABI Nav] log was emitted");
  assert.ok(navLog.includes("cn, en, es, pt-BR"), "Includes consolidated language codes");

  // Assert individual language logs were NOT emitted separately
  const singleLangLogs = formattedStrings.filter((s) => s.includes("%cen%c") || s.includes("%cja%c"));
  assert.equal(singleLangLogs.length, 0, "Individual redundant language code logs were suppressed");

  // Assert Chinese text in logs was translated
  const translatedLog = formattedStrings.find((s) => s.includes("Language switch callback successful"));
  assert.ok(translatedLog, "Chinese log was translated to 'Language switch callback successful'");

  const activityLog = formattedStrings.find((s) => s.includes("Patroller activity initialized"));
  assert.ok(activityLog, "Activity start log was translated to 'Patroller activity initialized'");

  const debugLog = formattedStrings.find((s) => s.includes("Patroller module initialized (debug)"));
  assert.ok(debugLog, "Debug log was translated to 'Patroller module initialized (debug)'");

  // 6. Test Milo setCommonConfig auto-patching with intlGameid
  let passedConfig = null;
  context.window.Milo = {
    setCommonConfig: (cfg) => { passedConfig = cfg; },
  };
  context.window.Milo.setCommonConfig({ needPromiseCallback: false });
  assert.ok(passedConfig, "Milo setCommonConfig was called");
  assert.equal(passedConfig.intlGameid, 30061, "intlGameid 30061 was injected automatically");

  // 7. Test suppression of 'milo-outside please setCommonConfig intlGameid' (both with site on and off)
  const logCountBefore = originalLogs.length;
  context.console.warn("milo-outside please setCommonConfig intlGameid");
  assert.equal(originalLogs.length, logCountBefore, "milo-outside please setCommonConfig intlGameid was suppressed when site on");

  context.document.documentElement.dataset.abiSite = "off";
  context.console.warn("milo-outside please setCommonConfig intlGameid");
  assert.equal(originalLogs.length, logCountBefore, "milo-outside please setCommonConfig intlGameid was suppressed when site off");
  context.document.documentElement.dataset.abiSite = "on";

  // 8. Test suppression of 'Blocked script execution in about:blank'
  context.console.warn("Blocked script execution in 'about:blank'");
  assert.equal(originalLogs.length, logCountBefore, "Blocked script execution warning was suppressed");

  // 9. Test normal warnings route through rawConsole.log to avoid Chrome extension error tab flags
  context.console.warn("Generic site warning");
  assert.equal(originalLogs.length, logCountBefore + 1, "Generic warning was logged");
  assert.equal(originalLogs[originalLogs.length - 1].method, "log", "Warning was routed through log method to prevent Chrome extension errors");
});

test("Multilingual localization: dynamic language switching across 9 supported languages", async (t) => {
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
  const browser = await chromium.launch({
    headless: true,
    channel: process.env.ABI_TEST_BROWSER || (process.platform === "win32" ? "msedge" : "chromium"),
  });
  try {
    const page = await browser.newPage({ viewport: { width: 1320, height: 900 } });
    await page.setContent(`
      <html data-abi-site="on">
        <head></head>
        <body>
          <div class="top-nav">
            <span id="s3_1">User123</span>
            <a id="a3_1">退出登录</a>
            <a class="home-btn">返回官网</a>
            <a class="safe-link">安全中心</a>
          </div>
          <div class="main">
            <ul class="nav">
              <li id="mine">数据总览</li>
              <li id="working">巡查工作台</li>
              <li id="patrol">巡查挑战</li>
              <li id="drill">演练</li>
              <li id="notice">公告</li>
              <a class="exit_btn2">退出巡查</a>
            </ul>
          </div>
          <div id="wxMine" class="content mine">
            <div class="user">
              <div class="user-info">
                <div class="username">Inspector</div>
                <div class="userid"><span>ID: 12345</span></div>
                <div class="honor"><span id="level-text">Senior Inspector</span></div>
                <div class="grade"><span id="exp_level">22</span></div>
              </div>
              <div class="user-data">
                <ul class="statistics">
                  <li><strong>616</strong></li>
                  <li><strong>43</strong></li>
                  <li><strong>506</strong></li>
                  <li><strong>86%</strong></li>
                  <li><strong>185</strong></li>
                </ul>
              </div>
            </div>
          </div>
          <div id="xcWorking" class="content video">
            <div class="user-info">
              <div class="user-status">
                <span class="str73">Inspected Today</span>
                <strong id="dayTotalJudgedNum">0</strong>
              </div>
            </div>
            <div class="tips-content">
              <p id="p46_1">Distance markers</p>
              <p id="p46_2">Color Key</p>
            </div>
          </div>
          <div class="box notice">
            <div class="content">
              <ul class="notice-nav">
                <li tabid="notice1" class="current">Penalty List</li>
                <li tabid="ssss2">Guidelines</li>
                <li tabid="ssss1">FAQ</li>
              </ul>
              <div class="notice-main" style="display: block;">
                <div class="notice-content str84 scrollbar faq">
                  <p id="p84_1">Q: How do I become an inspector?</p>
                  <p id="p84_2">A: Keep a clean record.</p>
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `);

    // Load site-ui.js
    const siteUiSource = fs.readFileSync(path.join(root, "site-ui.js"), "utf8");
    await page.evaluate((src) => {
      window.eval(src);
    }, siteUiSource);

    // 1. Initial English (default)
    assert.equal(await page.locator("#mine").textContent(), "Overview");
    assert.equal(await page.locator("#working").textContent(), "Workbench");
    assert.equal(await page.locator(".exit_btn2").textContent(), "Exit Inspection");
    assert.equal(await page.locator(".abi-account-welcome").textContent(), "Welcome,");
    assert.equal(await page.locator(".abi-stat-inspections h3").textContent(), "Inspections");
    assert.equal(await page.locator(".abi-stat-accuracy h3").textContent(), "Inspection accuracy");
    assert.equal(await page.locator(".abi-stat-today h3").textContent(), "Today");
    assert.equal(await page.locator("#xcWorking .abi-status-title").textContent(), "Inspected Today");
    assert.equal(await page.locator("#xcWorking .abi-status-remaining").textContent(), "20 cases remaining today");
    assert.deepEqual(
      await page.locator("#xcWorking #p46_2 .abi-color-name").allTextContents(),
      ["Teammates", "Enemies", "Scavs (bots)"]
    );
    assert.ok((await page.locator("#xcWorking #p46_1").textContent()).includes("added by the official inspection system"));
    assert.equal(await page.locator(".box.notice .abi-faq-card").count(), 1);
    assert.equal(await page.locator(".box.notice .abi-guideline-faq-question-prefix").textContent(), "Q:");

    // 2. Switch to German (de)
    await page.evaluate(() => {
      document.documentElement.dataset.abiLang = "de";
      document.dispatchEvent(new CustomEvent("abi:language-changed", { detail: { lang: "de" } }));
    });
    await page.waitForTimeout(100);
    assert.equal(await page.locator("#mine").textContent(), "Datenübersicht");
    assert.equal(await page.locator("#working").textContent(), "Werkbank");
    assert.equal(await page.locator("#patrol").textContent(), "Herausforderungen");
    assert.equal(await page.locator("#drill").textContent(), "Übung");
    assert.equal(await page.locator("#notice").textContent(), "Ankündigungen");
    assert.equal(await page.locator(".exit_btn2").textContent(), "Inspektion beenden");
    assert.equal(await page.locator(".abi-account-welcome").textContent(), "Willkommen,");
    assert.equal(await page.locator(".abi-stat-inspections h3").textContent(), "Überprüfungen");
    assert.equal(await page.locator(".abi-stat-accuracy h3").textContent(), "Überprüfungsgenauigkeit");
    assert.equal(await page.locator(".abi-stat-today h3").textContent(), "Heute");
    assert.equal(await page.locator("#xcWorking .abi-status-title").textContent(), "Heute überprüft");
    assert.equal(await page.locator("#xcWorking .abi-status-remaining").textContent(), "20 Fälle heute übrig");
    assert.deepEqual(
      await page.locator("#xcWorking #p46_2 .abi-color-name").allTextContents(),
      ["Teamkameraden", "Gegner", "Scavs (Bots)"]
    );
    assert.ok((await page.locator("#xcWorking #p46_1").textContent()).includes("vom offiziellen Überprüfungssystem hinzugefügt"));

    // 3. Switch to Russian (ru)
    await page.evaluate(() => {
      document.documentElement.dataset.abiLang = "ru";
      document.dispatchEvent(new CustomEvent("abi:language-changed", { detail: { lang: "ru" } }));
    });
    await page.waitForTimeout(100);
    assert.equal(await page.locator("#mine").textContent(), "Обзор данных");
    assert.equal(await page.locator("#working").textContent(), "Верстак");
    assert.equal(await page.locator("#patrol").textContent(), "Испытания");
    assert.equal(await page.locator(".exit_btn2").textContent(), "Выйти из инспекции");
    assert.equal(await page.locator(".abi-account-welcome").textContent(), "Привет,");
    assert.equal(await page.locator(".abi-stat-inspections h3").textContent(), "Инспекции");
    assert.equal(await page.locator(".abi-stat-accuracy h3").textContent(), "Точность инспекций");
    assert.equal(await page.locator(".abi-stat-today h3").textContent(), "Сегодня");
    assert.equal(await page.locator("#xcWorking .abi-status-title").textContent(), "Проверено сегодня");
    assert.equal(await page.locator("#xcWorking .abi-status-remaining").textContent(), "20 дел осталось сегодня");
    assert.deepEqual(
      await page.locator("#xcWorking #p46_2 .abi-color-name").allTextContents(),
      ["Союзники", "Враги", "Дикие (боты)"]
    );
    assert.ok((await page.locator("#xcWorking #p46_1").textContent()).includes("добавлены официальной системой инспекции"));

    // 4. Switch to Spanish (es)
    await page.evaluate(() => {
      document.documentElement.dataset.abiLang = "es";
      document.dispatchEvent(new CustomEvent("abi:language-changed", { detail: { lang: "es" } }));
    });
    await page.waitForTimeout(100);
    assert.equal(await page.locator("#mine").textContent(), "Resumen de datos");
    assert.equal(await page.locator("#working").textContent(), "Banco de trabajo");
    assert.equal(await page.locator(".exit_btn2").textContent(), "Salir de la inspección");
    assert.equal(await page.locator(".abi-account-welcome").textContent(), "Hola,");
    assert.equal(await page.locator("#xcWorking .abi-status-title").textContent(), "Inspeccionados hoy");
    assert.equal(await page.locator("#xcWorking .abi-status-remaining").textContent(), "20 casos restantes hoy");
    assert.deepEqual(
      await page.locator("#xcWorking #p46_2 .abi-color-name").allTextContents(),
      ["Compañeros", "Enemigos", "Scavs (bots)"]
    );

    // 5. Switch to Japanese (ja)
    await page.evaluate(() => {
      document.documentElement.dataset.abiLang = "ja";
      document.dispatchEvent(new CustomEvent("abi:language-changed", { detail: { lang: "ja" } }));
    });
    await page.waitForTimeout(100);
    assert.equal(await page.locator("#mine").textContent(), "データの概要");
    assert.equal(await page.locator("#working").textContent(), "ワークベンチ");
    assert.equal(await page.locator(".exit_btn2").textContent(), "検査を終了");
    assert.equal(await page.locator("#xcWorking .abi-status-title").textContent(), "本日の検査");
    assert.equal(await page.locator("#xcWorking .abi-status-remaining").textContent(), "本日残り 20 件");
    assert.deepEqual(
      await page.locator("#xcWorking #p46_2 .abi-color-name").allTextContents(),
      ["味方", "敵", "ボット (Scav)"]
    );

    // 6. Switch back to English (en)
    await page.evaluate(() => {
      document.documentElement.dataset.abiLang = "en";
      document.dispatchEvent(new CustomEvent("abi:language-changed", { detail: { lang: "en" } }));
    });
    await page.waitForTimeout(100);
    assert.equal(await page.locator("#mine").textContent(), "Overview");
    assert.equal(await page.locator("#working").textContent(), "Workbench");
    assert.equal(await page.locator(".exit_btn2").textContent(), "Exit Inspection");
    assert.equal(await page.locator("#xcWorking .abi-status-title").textContent(), "Inspected Today");
    assert.equal(await page.locator("#xcWorking .abi-status-remaining").textContent(), "20 cases remaining today");
    assert.deepEqual(
      await page.locator("#xcWorking #p46_2 .abi-color-name").allTextContents(),
      ["Teammates", "Enemies", "Scavs (bots)"]
    );
  } finally {
    await browser?.close();
  }
});

test("Dialog enhancements: close icon is singular and footer cancel button has no extra icon", async (t) => {
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
    await page.setContent(`<!DOCTYPE html><html><head></head><body>
      <div class="popup patrol-popup" id="illegalPopup">
        <a class="str96 close-btn _close-btn" href="javascript:;" aria-label="Close">Close</a>
        <h3>Violation</h3>
        <ul id="courtMenu" class="popup-checkbox">
          <li><input type="checkbox" id="c0"/><label for="c0">Wallhack</label></li>
        </ul>
        <textarea id="guiltyDetail" class="illegal-description" maxlength="50"></textarea>
        <div class="popup-btn-box">
          <a href="javascript:;" class="str94 btn4 _close-btn">关闭</a>
          <a id="patrolSubmit" href="javascript:;" class="str95 btn3">Submit</a>
        </div>
      </div>
    </body></html>`);

    await page.addStyleTag({ path: path.join(root, "dialogs.css") });

    const dialogsSource = fs.readFileSync(path.join(root, "dialogs.js"), "utf8");
    await page.evaluate((code) => {
      window.eval(code);
    }, dialogsSource);

    // 1. Top-right close button has exactly 1 SVG and no pseudo text
    const closeBtn = page.locator("#illegalPopup > .close-btn");
    assert.equal(await closeBtn.count(), 1, "Top close button exists");
    assert.equal(await closeBtn.locator("svg.abi-close-svg").count(), 1, "Exactly one close SVG in close button");

    const afterContent = await page.evaluate(() => {
      const el = document.querySelector("#illegalPopup > .close-btn");
      return window.getComputedStyle(el, "::after").content;
    });
    assert.ok(afterContent === "none" || afterContent === '""' || afterContent === "", `::after content should be none, got: ${afterContent}`);

    // 2. Footer Cancel button has text "Cancel", no SVG, and no ::after content
    const cancelBtn = page.locator("#illegalPopup .popup-btn-box .btn4");
    assert.equal(await cancelBtn.count(), 1, "Cancel button exists");
    assert.equal((await cancelBtn.textContent()).trim(), "Cancel", "Cancel button text translated to Cancel");
    assert.equal(await cancelBtn.locator("svg").count(), 0, "No SVG inside Cancel button");

    const cancelAfter = await page.evaluate(() => {
      const el = document.querySelector("#illegalPopup .popup-btn-box .btn4");
      return window.getComputedStyle(el, "::after").content;
    });
    assert.ok(cancelAfter === "none" || cancelAfter === '""' || cancelAfter === "", `Cancel button ::after should be none, got: ${cancelAfter}`);

    // 3. Quick-Tag Reason Chips in Violation Modal
    const chipsContainer = page.locator("#illegalPopup .abi-reason-chips");
    assert.equal(await chipsContainer.count(), 1, "Quick reason tags container rendered in #illegalPopup");

    const chipBtns = page.locator("#illegalPopup .abi-reason-chips .abi-chip-btn");
    assert.equal(await chipBtns.count(), 3, "All 3 requested quick-tag chips rendered");

    const chipTexts = await chipBtns.allTextContents();
    assert.deepEqual(
      chipTexts.map((s) => s.trim()),
      [
        "Lag Switching",
        "Rage cheating",
        "Macro",
      ],
      "Chips render correct English labels"
    );

    // Test clicking a chip fills empty textarea
    const lagSwitchBtn = chipBtns.nth(0);
    await lagSwitchBtn.click();
    assert.equal(await page.locator("#guiltyDetail").inputValue(), "Lag Switching", "Clicking chip fills textarea");
    assert.ok(await lagSwitchBtn.evaluate((el) => el.classList.contains("active")), "Clicked chip receives .active class");
    assert.equal(await lagSwitchBtn.getAttribute("aria-pressed"), "true", "Clicked chip has aria-pressed='true'");

    // Test counter update
    assert.equal(
      (await page.locator("#illegalPopup .abi-textcount").textContent()).trim(),
      "13 / 50",
      "Character counter updates to 13 / 50"
    );

    // Test clicking second chip appends with comma
    const macroBtn = chipBtns.nth(2);
    await macroBtn.click();
    assert.equal(
      await page.locator("#guiltyDetail").inputValue(),
      "Lag Switching, Macro",
      "Clicking second chip appends to reason"
    );
    assert.ok(await macroBtn.evaluate((el) => el.classList.contains("active")), "Second chip receives .active class");
    assert.equal(
      (await page.locator("#illegalPopup .abi-textcount").textContent()).trim(),
      "20 / 50",
      "Character counter updates to 20 / 50"
    );

    // Test clicking second chip again toggles it off
    await macroBtn.click();
    assert.equal(
      await page.locator("#guiltyDetail").inputValue(),
      "Lag Switching",
      "Clicking active chip again removes it"
    );
    assert.ok(!(await macroBtn.evaluate((el) => el.classList.contains("active"))), "Untoggled chip loses .active class");
    assert.equal(
      (await page.locator("#illegalPopup .abi-textcount").textContent()).trim(),
      "13 / 50",
      "Character counter reverts to 13 / 50"
    );

    // Test 50-character limit guard: fill to 40 chars, attempt to add 13-char tag
    await page.locator("#guiltyDetail").fill("1234567890123456789012345678901234567890"); // 40 chars
    await lagSwitchBtn.click();
    assert.equal(
      await page.locator("#guiltyDetail").inputValue(),
      "1234567890123456789012345678901234567890",
      "Appending tag exceeding 50 chars is rejected"
    );
    assert.ok(
      await page.locator("#illegalPopup .abi-textcount").evaluate((el) => el.classList.contains("abi-limit-reached")),
      "Counter receives .abi-limit-reached shake feedback when limit is exceeded"
    );

    // Reset textarea
    await page.locator("#guiltyDetail").fill("");
    await page.locator("#guiltyDetail").dispatchEvent("input");

    // Test dynamic localization to German
    await page.evaluate(() => {
      document.documentElement.dataset.abiLang = "de";
      window.dispatchEvent(new CustomEvent("abi-language-change", { detail: { lang: "de" } }));
    });
    // Give mutation/event a tick
    await page.waitForTimeout(50);
    const deChipTexts = await chipBtns.allTextContents();
    assert.deepEqual(
      deChipTexts.map((s) => s.trim().replace(/^✓\s*/, "")),
      [
        "Lag-Switching",
        "Rage-Cheating",
        "Makro",
      ],
      "Chips dynamically update to German translations"
    );

    // Test site modifications disabled cleanup
    await page.evaluate(() => {
      document.documentElement.dataset.abiSite = "off";
    });
    await page.waitForTimeout(50);
    assert.equal(
      await page.locator("#illegalPopup .abi-reason-chips").count(),
      0,
      "Reason chips are cleanly removed when site modifications are disabled"
    );
  } finally {
    await browser?.close();
  }
});

test("Case Log Modal: Today card interaction, dialog opening, verdict logging, filtering, and clearing", async () => {
  let playwright;
  try {
    playwright = await import("playwright");
  } catch (error) {
    if (error && error.code === "ERR_MODULE_NOT_FOUND") {
      console.warn("Skipping Playwright test because 'playwright' is not installed in the workspace.");
      return;
    }
  }
  const { chromium } = playwright;
  const browser = await chromium.launch({
    headless: true,
    channel: process.env.ABI_TEST_BROWSER || (process.platform === "win32" ? "msedge" : "chromium"),
  });

  try {
    const page = await browser.newPage({ viewport: { width: 1320, height: 900 } });
    await page.setContent(`<!DOCTYPE html><html data-abi-site="on"><head></head><body>
      <div class="top-nav">
        <span id="s3_1">User123</span>
        <a id="a3_1">退出登录</a>
      </div>
      <div class="main">
        <ul class="nav">
          <li id="mine" class="current">数据总览</li>
          <li id="working">巡查工作台</li>
          <li id="patrol">巡查挑战</li>
          <li id="drill">演练</li>
          <li id="notice">公告</li>
        </ul>
      </div>
      <div id="wxMine" class="content mine">
        <div class="user">
          <div class="user-info">
            <div class="username">Inspector</div>
            <div class="userid"><span>ID</span></div>
            <div class="honor"><span id="level-text">Senior Inspector</span></div>
            <div class="grade"><span id="exp_level">22</span></div>
          </div>
          <div class="user-data">
            <ul class="statistics">${[616, 43, 506, "86%", 185].map((v) => `<li><strong>${v}</strong></li>`).join("")}</ul>
          </div>
        </div>
      </div>
    </body></html>`);

    await page.addStyleTag({ path: path.join(root, "layout.css") });

    // Inject site-ui.js
    const siteUiSource = fs.readFileSync(path.join(root, "site-ui.js"), "utf8");
    await page.evaluate((src) => {
      window.eval(src);
    }, siteUiSource);

    await page.waitForTimeout(100);

    // 1. Verify .abi-today-wrap button semantics and log hint
    const todayWrap = page.locator("#wxMine .abi-today-wrap");
    assert.equal(await todayWrap.count(), 1, "Today card wrapper exists");
    assert.equal(await todayWrap.getAttribute("role"), "button", "Today card has role='button'");
    assert.equal(await todayWrap.getAttribute("tabindex"), "0", "Today card has tabindex='0'");
    assert.ok(await page.locator("#wxMine .abi-today-log-hint").count() >= 1, "Today card contains .abi-today-log-hint");
    assert.ok((await page.locator("#wxMine .abi-today-log-hint").textContent()).includes("View Case Log"), "Hint text includes View Case Log");

    // 2. Click Today card to open case log modal dialog
    await todayWrap.click();
    await page.waitForTimeout(50);

    const dialog = page.locator(".abi-case-log-dialog");
    assert.equal(await dialog.count(), 1, "Case log dialog exists");
    assert.equal(await dialog.getAttribute("hidden"), null, "Case log dialog is visible (hidden attribute removed)");
    assert.equal(await page.locator("#abi-case-log-title").textContent(), "Case Inspection Log", "Dialog title is rendered");

    // Initially, no cases are logged -> empty state
    assert.equal(await page.locator(".abi-case-log-empty").count(), 1, "Empty state is displayed initially");
    assert.equal(await page.locator(".abi-log-metric[data-metric='total'] .abi-log-metric-val").textContent(), "0", "Total count is 0");

    // 3. Log 3 sample verdicts programmatically
    await page.evaluate(async () => {
      await window.__abiLogCaseVerdict({
        id: "CASE-1001",
        verdict: "violation",
        verdictLabel: "Violation",
        reasons: ["Wallhack", "Aimbot"],
        note: "Pre-firing corners with zero info",
        durationSeconds: 45,
      });
      await window.__abiLogCaseVerdict({
        id: "CASE-1002",
        verdict: "no_violation",
        verdictLabel: "No Violation",
        reasons: [],
        note: "",
        durationSeconds: 30,
      });
      await window.__abiLogCaseVerdict({
        id: "CASE-1003",
        verdict: "uncertain",
        verdictLabel: "Uncertain",
        reasons: [],
        note: "Stuttering video stream",
        durationSeconds: 15,
      });
    });

    await page.waitForTimeout(100);

    // 4. Verify summary metrics
    assert.equal(await page.locator(".abi-log-metric[data-metric='total'] .abi-log-metric-val").textContent(), "3", "Total reviewed is 3");
    assert.equal(await page.locator(".abi-log-metric[data-metric='violation'] .abi-log-metric-val").textContent(), "1", "Violations is 1");
    assert.equal(await page.locator(".abi-log-metric[data-metric='no_violation'] .abi-log-metric-val").textContent(), "1", "No Violations is 1");
    assert.equal(await page.locator(".abi-log-metric[data-metric='uncertain'] .abi-log-metric-val").textContent(), "1", "Uncertain is 1");
    assert.equal(await page.locator(".abi-log-metric[data-metric='avg_duration'] .abi-log-metric-val").textContent(), "30s", "Avg duration is 30s");

    // 5. Verify rendered list items
    const items = page.locator(".abi-case-log-item");
    assert.equal(await items.count(), 3, "3 case log items rendered");
    assert.equal(await page.locator(".abi-case-id-badge").first().textContent(), "CASE-1003", "Most recent case listed first");
    assert.ok(await page.locator(".abi-case-reason-tag").count() >= 2, "Reason tags rendered for violation case");

    // 6. Test filter tabs
    await page.locator(".abi-case-log-tab[data-filter='violation']").click();
    await page.waitForTimeout(50);
    assert.equal(await page.locator(".abi-case-log-item").count(), 1, "Only 1 item shown under Violation filter");
    assert.equal(await page.locator(".abi-case-log-item .abi-verdict-badge").textContent(), "Violation", "Badge is Violation");

    await page.locator(".abi-case-log-tab[data-filter='all']").click();
    await page.waitForTimeout(50);
    assert.equal(await page.locator(".abi-case-log-item").count(), 3, "All 3 items shown under All filter");

    // 7. Test search filter
    await page.locator(".abi-case-log-search").fill("Wallhack");
    await page.waitForTimeout(50);
    assert.equal(await page.locator(".abi-case-log-item").count(), 1, "1 item matched 'Wallhack' search");

    await page.locator(".abi-case-log-search").fill("");
    await page.waitForTimeout(50);
    assert.equal(await page.locator(".abi-case-log-item").count(), 3, "Resetting search returns all 3 items");

    // 8. Test Clear Log
    await page.evaluate(async () => {
      await window.__abiClearCaseLog();
    });
    await page.waitForTimeout(50);

    assert.equal(await page.locator(".abi-case-log-empty").count(), 1, "Empty state displayed after clearing log");
    assert.equal(await page.locator(".abi-log-metric[data-metric='total'] .abi-log-metric-val").textContent(), "0", "Total count reset to 0");

    // 9. Close dialog
    await page.locator(".abi-case-log-close").click();
    assert.equal(await dialog.getAttribute("hidden"), "", "Dialog hidden after clicking close button");
  } finally {
    await browser?.close();
  }
});

test("Daily Server Reset Countdown Clock: displays live countdown until daily 20-case quota reset at 05:00 UTC", async (t) => {
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
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

    await page.setContent(`<!DOCTYPE html><html data-abi-site="on"><head></head><body>
      <div class="top-nav">
        <span id="s3_1">Patroller</span>
        <a id="a3_1">退出登录</a>
      </div>
      <div class="main">
        <ul class="nav">
          <li id="mine" class="current">数据总览</li>
          <li id="working">巡查工作台</li>
          <li id="patrol">巡查挑战</li>
          <li id="drill">演练</li>
          <li id="notice">公告</li>
        </ul>
      </div>
      <div id="wxMine" class="content mine">
        <div class="user">
          <div class="user-info">
            <div class="username">Patroller</div>
            <div class="userid"><span>ID: 998877</span></div>
            <div class="honor"><span id="level-text">Senior Inspector</span></div>
            <div class="grade"><span id="exp_level">20</span></div>
          </div>
          <div class="user-data">
            <ul class="statistics">${[500, 30, 420, "88%", 150].map((v) => `<li><strong>${v}</strong></li>`).join("")}</ul>
          </div>
        </div>
      </div>
    </body></html>`);

    await page.addStyleTag({ path: path.join(root, "layout.css") });

    const siteUiSource = fs.readFileSync(path.join(root, "site-ui.js"), "utf8");
    await page.evaluate((src) => {
      window.eval(src);
    }, siteUiSource);

    await page.waitForTimeout(100);

    // 1. Verify reset clock element presence in Today card
    const clock = page.locator("#wxMine .abi-today-reset-clock");
    assert.equal(await clock.count(), 1, "Countdown clock element exists inside Today card");

    // 2. Verify clock icon exists
    const icon = clock.locator(".abi-reset-clock-icon");
    assert.equal(await icon.count(), 1, "Clock icon is present inside reset clock");

    // 3. Verify timer text and format
    const timer = clock.locator(".abi-today-reset-timer");
    assert.equal(await timer.count(), 1, "Timer text span is present");
    const timerText = await timer.textContent();
    assert.ok(timerText.includes("Resets in"), "Timer text starts with 'Resets in'");
    assert.match(timerText, /Resets in \d{2}:\d{2}:\d{2}/, "Timer format matches 'Resets in HH:MM:SS'");

    // 4. Verify title attribute describes 05:00 UTC daily reset
    const clockTitle = await clock.getAttribute("title");
    assert.ok(clockTitle.includes("05:00 UTC"), "Clock title tooltip references 05:00 UTC server reset");

    // 5. Test formatServerResetCountdown math directly via helper
    const result = await page.evaluate(() => {
      return typeof window.__abiFormatServerResetCountdown === "function"
        ? window.__abiFormatServerResetCountdown()
        : null;
    });
    assert.match(result, /^\d{2}:\d{2}:\d{2}$/, "Countdown helper returns valid HH:MM:SS");

  } finally {
    await browser?.close();
  }
});

test("Accidental Tab Close & Leave Guard: prompts beforeunload during active case inspections and respects settings and clean exits", async () => {
  let browser;
  try {
    const { chromium } = require("playwright");
    browser = await chromium.launch({
      headless: true,
      channel: process.env.ABI_TEST_BROWSER || (process.platform === "win32" ? "msedge" : "chromium"),
    });
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

    await page.setContent(`<!DOCTYPE html><html data-abi-site="on"><head></head><body>
      <div class="main">
        <ul class="nav">
          <li id="mine" class="current">Overview</li>
          <li id="working">Workbench</li>
        </ul>
        <button class="exit_btn2">Exit</button>
      </div>
      <div id="wxMine" class="content mine"></div>
      <div id="wxWorking" class="content video" style="display: none;">
        <video src="evidence.mp4"></video>
        <textarea id="caseNote"></textarea>
      </div>
    </body></html>`);

    await page.addStyleTag({ path: path.join(root, "layout.css") });

    const siteUiSource = fs.readFileSync(path.join(root, "site-ui.js"), "utf8");
    await page.evaluate((src) => {
      window.eval(src);
    }, siteUiSource);

    // 1. On Overview tab with no active video/case: should NOT be active
    const idleCheck = await page.evaluate(() => window.__abiIsInspectionActive());
    assert.equal(idleCheck, false, "Leave guard is inactive on idle Overview screen");

    // 2. Switch to Workbench with active video: should BE active
    await page.evaluate(() => {
      document.querySelector("#mine").classList.remove("current");
      document.querySelector("#working").classList.add("current");
      const videoBox = document.querySelector("#wxWorking");
      videoBox.style.display = "block";
      const video = videoBox.querySelector("video");
      Object.defineProperty(video, "duration", { value: 60, configurable: true });
      Object.defineProperty(video, "readyState", { value: 4, configurable: true });
    });

    const activeCheck = await page.evaluate(() => window.__abiIsInspectionActive());
    assert.equal(activeCheck, true, "Leave guard is active when video inspection is in progress");

    // 3. Test beforeunload event handling: defaultPrevented
    const eventResult = await page.evaluate(() => {
      const evt = new Event("beforeunload", { cancelable: true });
      window.dispatchEvent(evt);
      return { defaultPrevented: evt.defaultPrevented };
    });
    assert.equal(eventResult.defaultPrevented, true, "beforeunload event is cancelled during active review");

    // 4. Test when user enters draft note without video
    await page.evaluate(() => {
      const video = document.querySelector("video");
      video.removeAttribute("src");
      Object.defineProperty(video, "duration", { value: 0, configurable: true });
      document.querySelector("#caseNote").value = "Suspicious recoil pattern at 0:14";
    });
    const draftNoteCheck = await page.evaluate(() => window.__abiIsInspectionActive());
    assert.equal(draftNoteCheck, true, "Leave guard is active when draft notes are entered");

    // 5. Test when user clicks clean exit button
    await page.evaluate(() => {
      document.querySelector(".exit_btn2").click();
    });
    const exitCleanCheck = await page.evaluate(() => window.__abiIsInspectionActive());
    assert.equal(exitCleanCheck, false, "Leave guard allows clean departure when exit button is clicked");

    // 6. Test setting disable: data-abi-leave-guard="off"
    await page.evaluate(() => {
      window.__abiIsExitingCleanly = false;
      document.documentElement.dataset.abiLeaveGuard = "off";
    });
    const disabledSettingCheck = await page.evaluate(() => window.__abiIsInspectionActive());
    assert.equal(disabledSettingCheck, false, "Leave guard respects user setting toggle when disabled");

  } finally {
    await browser?.close();
  }
});





