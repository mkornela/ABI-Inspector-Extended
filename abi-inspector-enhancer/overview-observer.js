(() => {
  "use strict";
  // Polyfill early ActTools to prevent unhandled ReferenceError in common.js setHomeBtn()
  if (typeof window !== "undefined") {
    const isMobileUserAgent = () =>
      /Android|webOS|iPhone|iPod|BlackBerry|iPad/i.test(navigator.userAgent || "");
    if (typeof window.ActTools === "undefined") {
      window.ActTools = {
        isPhone: isMobileUserAgent,
        isQQ: () => /qq\//i.test(navigator.userAgent || ""),
        isNull: (v) => v === null || v === undefined || v === "",
      };
    } else if (!window.ActTools.isPhone) {
      window.ActTools.isPhone = isMobileUserAgent;
    }

    // Ensure Milo receives the correct intlGameid (30061) to prevent "please setCommonConfig intlGameid"
    const ABI_GAME_ID = 30061;
    let _milo = window.Milo;

    const wrapSetCommonConfig = (target) => {
      if (!target || typeof target !== "object") return;
      let _setCommonConfig = target.setCommonConfig;
      if (typeof _setCommonConfig === "function") {
        if (!_setCommonConfig.__abiPatched) {
          const orig = _setCommonConfig;
          const wrapped = function (cfg) {
            const gameId = (typeof window.ActConfig !== "undefined" && window.ActConfig.gameID) || ABI_GAME_ID;
            const merged = Object.assign({ intlGameid: gameId }, cfg || {});
            if (merged.intlGameid === -1 || merged.intlGameid === undefined) {
              merged.intlGameid = gameId;
            }
            return orig.call(this, merged);
          };
          wrapped.__abiPatched = true;
          target.setCommonConfig = wrapped;
          try {
            wrapped.call(target, { intlGameid: ABI_GAME_ID });
          } catch {}
        }
      } else {
        Object.defineProperty(target, "setCommonConfig", {
          configurable: true,
          enumerable: true,
          get() {
            return _setCommonConfig;
          },
          set(fn) {
            if (typeof fn === "function" && !fn.__abiPatched) {
              const orig = fn;
              _setCommonConfig = function (cfg) {
                const gameId = (typeof window.ActConfig !== "undefined" && window.ActConfig.gameID) || ABI_GAME_ID;
                const merged = Object.assign({ intlGameid: gameId }, cfg || {});
                if (merged.intlGameid === -1 || merged.intlGameid === undefined) {
                  merged.intlGameid = gameId;
                }
                return orig.call(this, merged);
              };
              _setCommonConfig.__abiPatched = true;
              try {
                _setCommonConfig.call(target, { intlGameid: ABI_GAME_ID });
              } catch {}
            } else {
              _setCommonConfig = fn;
            }
          },
        });
      }
    };

    if (_milo) wrapSetCommonConfig(_milo);
    try {
      Object.defineProperty(window, "Milo", {
        configurable: true,
        enumerable: true,
        get() {
          return _milo;
        },
        set(val) {
          _milo = val;
          wrapSetCommonConfig(_milo);
        },
      });
    } catch {
      if (!_milo) window.Milo = {};
      wrapSetCommonConfig(window.Milo);
    }

    // Polyfill early _footerShow_ to prevent ReferenceError in common.js langCallback()
    if (typeof window._footerShow_ === "undefined") {
      window._footerShow_ = { loadLang: () => {}, init: () => {} };
    }

    // Synchronize language switches across official nav.js and extension content scripts
    const notifyLanguageChange = (lang) => {
      if (!lang || typeof lang !== "string") return;
      const normalized = lang.indexOf("-") < 0 ? lang.toLowerCase() : lang;
      if (typeof document !== "undefined" && document.documentElement) {
        document.documentElement.dataset.abiLang = normalized;
        try {
          document.dispatchEvent(new CustomEvent("abi:language-changed", { detail: { lang: normalized } }));
        } catch {}
      }
    };

    const hookTopNav = (target) => {
      if (!target || typeof target !== "object" || target.__abiHooked) return;
      target.__abiHooked = true;
      const origSetLang = target.setLang;
      if (typeof origSetLang === "function") {
        target.setLang = function (el) {
          const res = origSetLang.apply(this, arguments);
          try {
            const lang = (el && el.dataset && el.dataset.lang) || window.lang;
            if (lang) notifyLanguageChange(lang);
          } catch {}
          return res;
        };
      }
    };

    let _topNav = window._topNav_;
    if (_topNav) hookTopNav(_topNav);
    try {
      Object.defineProperty(window, "_topNav_", {
        configurable: true,
        enumerable: true,
        get() {
          return _topNav;
        },
        set(val) {
          _topNav = val;
          hookTopNav(_topNav);
        },
      });
    } catch {
      if (_topNav) hookTopNav(_topNav);
    }

    if (typeof document !== "undefined" && document.addEventListener) {
      document.addEventListener(
        "click",
        (event) => {
          const item = event.target?.closest?.("li[data-lang]");
          if (item && item.closest?.("#langBtn, ._langNav_")) {
            const lang = item.dataset.lang;
            if (lang) {
              notifyLanguageChange(lang);
              const langNav = item.closest("._langNav_");
              if (langNav) langNav.classList.remove("_showLangNav");
            }
          } else if (!event.target?.closest?.("#langBtn, ._langNav_")) {
            document.querySelector("._langNav_")?.classList.remove("_showLangNav");
          }
        },
        true,
      );
    }
  }

  // Format official site console logs with tactical badges and origin file references,
  // consolidating rapid repetitive logs (such as nav.js language codes).
  if (typeof window !== "undefined" && typeof console !== "undefined") {
    const rawConsole = {
      log: typeof console.log === "function" ? console.log.bind(console) : () => {},
      info: typeof console.info === "function" ? console.info.bind(console) : (console.log || (() => {})).bind(console),
      warn: typeof console.warn === "function" ? console.warn.bind(console) : (console.log || (() => {})).bind(console),
      debug: typeof console.debug === "function" ? console.debug.bind(console) : (console.log || (() => {})).bind(console),
    };

    const BADGE_STYLES = {
      nav: "background: #192b38; color: #58a6ff; font-weight: bold; font-family: monospace; font-size: 11px; border-radius: 3px; padding: 1px 5px;",
      milo: "background: #2a2415; color: #d29922; font-weight: bold; font-family: monospace; font-size: 11px; border-radius: 3px; padding: 1px 5px;",
      analytics: "background: #1e222a; color: #bc8cff; font-weight: bold; font-family: monospace; font-size: 11px; border-radius: 3px; padding: 1px 5px;",
      patrol: "background: #172a1e; color: #3fb950; font-weight: bold; font-family: monospace; font-size: 11px; border-radius: 3px; padding: 1px 5px;",
      consent: "background: #22272e; color: #768390; font-weight: bold; font-family: monospace; font-size: 11px; border-radius: 3px; padding: 1px 5px;",
      site: "background: #21262d; color: #c9d1d9; font-weight: bold; font-family: monospace; font-size: 11px; border-radius: 3px; padding: 1px 5px;",
    };
    const FILE_STYLE = "color: #768390; font-size: 11px; font-family: monospace;";

    const LOG_TRANSLATIONS = [
      ["语言切换回调成功", "Language switch callback successful"],
      ["缺少footer组件", "Footer component missing"],
      ["选择了", "Selected:"],
      ["start=====", "Patroller activity initialized"],
      ["初始化xxxxxxxxxx", "Patroller module initialized (debug)"],
      ["初始化", "Initialization "],
    ];

    function cleanLogArg(arg) {
      if (typeof arg !== "string") return arg;
      let res = arg;
      for (const [cn, en] of LOG_TRANSLATIONS) {
        if (res.includes(cn)) res = res.replaceAll(cn, en);
      }
      return res;
    }

    function extractCaller() {
      try {
        const stack = new Error().stack;
        if (!stack) return null;
        const lines = stack.split("\n");
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i];
          if (
            !line.includes("overview-observer.js") &&
            !line.includes("settings.js") &&
            !line.includes("site-ui.js") &&
            !line.includes("extractCaller")
          ) {
            const match = line.match(/(?:[a-zA-Z0-9_\-]+\.js|about:blank)(?::\d+){1,2}/);
            if (match) return match[0];
            const fileOnly = line.match(/[a-zA-Z0-9_\-]+\.js/);
            if (fileOnly) return fileOnly[0];
          }
        }
      } catch {}
      return null;
    }

    let langBuffer = [];
    let langCaller = "nav.js:375";
    let langTimer = null;

    function flushLangBuffer() {
      if (langTimer) {
        clearTimeout(langTimer);
        langTimer = null;
      }
      if (!langBuffer.length) return;
      const list = Array.from(new Set(langBuffer));
      langBuffer = [];
      rawConsole.log(
        `%c[ABI Nav]%c %c[${langCaller}]%c Supported Languages (${list.length}): %c${list.join(", ")}`,
        BADGE_STYLES.nav,
        "",
        FILE_STYLE,
        "",
        "color: #58a6ff; font-weight: bold; font-family: monospace;"
      );
    }

    function formatAndLog(method, args) {
      // Pass through extension's own banner directly
      if (typeof args[0] === "string" && args[0].includes("ABI INSPECTOR EXTENDED")) {
        return rawConsole[method](...args);
      }

      // Immediately suppress harmless known noisy vendor warnings before any other checks,
      // ensuring they never reach rawConsole.warn or trigger Chrome extension error badges.
      for (let i = 0; i < args.length; i++) {
        const item = args[i];
        if (typeof item === "string") {
          if (
            item.includes("please setCommonConfig intlGameid") ||
            item.includes("Blocked script execution in 'about:blank'")
          ) {
            return;
          }
        }
      }

      const siteEnabled =
        typeof document === "undefined" ||
        !document.documentElement ||
        document.documentElement.dataset.abiSite !== "off";

      if (!siteEnabled) {
        const fallbackFn = method === "warn" ? rawConsole.log : rawConsole[method];
        return fallbackFn(...args);
      }

      const caller = extractCaller() || "";

      // Combine repetitive language code logs from nav.js or language array dump
      const isNavScript = caller.includes("nav.js");
      const isLangArrayDump = args.length === 2 && args[0] === 2 && Array.isArray(args[1]);
      if (isNavScript || isLangArrayDump || langBuffer.length) {
        if (isLangArrayDump) {
          langCaller = caller || "nav.js:375";
          langBuffer.push(...args[1]);
          if (!langTimer) langTimer = setTimeout(flushLangBuffer, 10);
          return;
        }
        if (args.length === 1 && typeof args[0] === "string" && args[0].length <= 10 && /^[a-zA-Z0-9_\-]+$/.test(args[0])) {
          langCaller = caller || langCaller || "nav.js:375";
          langBuffer.push(args[0]);
          if (!langTimer) langTimer = setTimeout(flushLangBuffer, 10);
          return;
        }
      }

      if (langBuffer.length) {
        flushLangBuffer();
      }

      let category = "site";
      let badge = "[ABI Site]";
      if (caller.includes("milo.js")) {
        category = "milo";
        badge = "[ABI Milo]";
      } else if (caller.includes("eas.js")) {
        category = "analytics";
        badge = "[ABI Analytics]";
      } else if (caller.includes("myAct.js") || caller.includes("common.js")) {
        category = "patrol";
        badge = "[ABI Patroller]";
      } else if (caller.includes("nav.js")) {
        category = "nav";
        badge = "[ABI Nav]";
      } else if (caller.includes("otBannerSdk.js") || caller.includes("otSDKStub.js")) {
        category = "consent";
        badge = "[ABI Consent]";
      }

      const cleanedArgs = args.map(cleanLogArg);

      // Suppress harmless known noisy site warnings so they don't pollute the console or extension error tab
      if (
        cleanedArgs.some(
          (arg) =>
            typeof arg === "string" &&
            (arg.includes("please setCommonConfig intlGameid") ||
              arg.includes("Blocked script execution in 'about:blank'"))
        )
      ) {
        return;
      }

      const badgeStyle = BADGE_STYLES[category] || BADGE_STYLES.site;
      const callerPrefix = caller ? `[${caller}]` : "";
      // Route intercepted site warnings through rawConsole.log to prevent Chrome from logging false-positive extension errors in chrome://extensions
      const logFn = method === "warn" ? rawConsole.log : rawConsole[method];
      return logFn(
        `%c${badge}%c %c${callerPrefix}%c`,
        badgeStyle,
        "",
        FILE_STYLE,
        "",
        ...cleanedArgs
      );
    }

    if (!console.log.__abiPatched) {
      console.log = function (...args) { formatAndLog("log", args); };
      console.log.__abiPatched = true;
      console.info = function (...args) { formatAndLog("info", args); };
      console.info.__abiPatched = true;
      console.warn = function (...args) { formatAndLog("warn", args); };
      console.warn.__abiPatched = true;
      console.debug = function (...args) { formatAndLog("debug", args); };
      console.debug.__abiPatched = true;
    }
  }

  // Observe existing XHR completions (read-only) and format native page alerts
  // into tactical English notifications.
  const fields = {
    userJudgeSummary: ["season_total_case_num", "season_right_case_num", "season_wrong_case_num", "season_right_punish_case_num", "season_accuracy", "life_accuracy", "life_wrong_case_num", "day_judged_num", "day_permit_num"],
    userWeekJudgeSummary: ["week_total_num", "week_right_num", "week_wrong_num", "week_right_punish_num"],
    userGrowthSummary: ["ret_exp_level", "total_exp", "level_got_exp", "exp_step", "exp_process"],
  };

  if (typeof XMLHttpRequest !== "undefined" && XMLHttpRequest.prototype && !XMLHttpRequest.prototype.send?.__abiPatched) {
    const send = XMLHttpRequest.prototype.send;
    const wrappedSend = function (...args) {
      const read = () => {
        try {
          if (!this.responseURL) return;
          const baseUrl = (typeof window !== "undefined" && window.location && window.location.href) ? window.location.href : "https://sg-apps.vasdgame.com";
          const url = new URL(this.responseURL, baseUrl);
          if (url.origin !== "https://sg-apps.vasdgame.com" || url.pathname !== "/ide/" || this.status !== 200) return;
          const body = this.responseType === "json" ? this.response :
            (!this.responseType || this.responseType === "text") ? JSON.parse(this.responseText) : null;
          if (!body || Number(body.ret) !== 0 || !body.jData || Number(body.jData.iRet) !== 0) return;
          const data = {};
          for (const [group, names] of Object.entries(fields)) {
            const source = body.jData[group];
            if (!source || typeof source !== "object") continue;
            data[group] = {};
            for (const name of names) {
              const value = source[name];
              if (typeof value === "number" && Number.isFinite(value) && value >= 0) data[group][name] = value;
            }
          }
          if (Object.keys(data).length && typeof window !== "undefined" && window.postMessage) {
            const targetOrigin = (location.origin && location.origin !== "null") ? location.origin : "*";
            window.postMessage({ type: "abi:overview-data", data }, targetOrigin);
          }
        } catch { /* A non-JSON response must not affect the official request. */ }
      };
      this.addEventListener("load", read, { once: true });
      try { return Reflect.apply(send, this, args); }
      catch (error) { this.removeEventListener("load", read); throw error; }
    };
    wrappedSend.__abiPatched = true;
    XMLHttpRequest.prototype.send = wrappedSend;
  }

  // Intercept native browser alert() to replace raw Chinese messages with
  // styled tactical English alert notifications.
  if (typeof window !== "undefined" && typeof window.alert === "function" && !window.alert.__abiPatched) {
    const originalAlert = window.alert;

    const TRANSLATIONS = [
      {
        match: (s) => s.includes("接口请求中") || s.includes("正在请求中"),
        title: "Request in Progress",
        message: "A request is currently in progress. Please wait a moment and try again.",
        type: "warning",
      },
      {
        match: (s) => s.includes("目前参与人数过多") || s.includes("人数过多"),
        title: "Server Busy",
        message: "The server is currently experiencing high traffic. Please try again shortly.",
        type: "warning",
      },
      {
        match: (s) => s.includes("活动已结束"),
        title: "Notice",
        message: "This event has ended.",
        type: "info",
      },
      {
        match: (s) => s.includes("服务网络异常") || s.includes("网络繁忙"),
        title: "Network Error",
        message: "Server network error. Please try again later.",
        type: "error",
      },
      {
        match: (s) => s.includes("提交失败"),
        title: "Submission Failed",
        message: "Your submission could not be processed. Please try again.",
        type: "error",
      },
      {
        match: (s) => s.includes("获取案例过快"),
        title: "Notice",
        message: "Case requests are too frequent. Please wait a moment.",
        type: "warning",
      },
      {
        match: (s) => s.includes("提交案例过快"),
        title: "Notice",
        message: "Case submissions are too frequent. Please wait a moment.",
        type: "warning",
      },
      {
        match: (s) => s.includes("提交案例超时"),
        title: "Notice",
        message: "Case submission timed out. Please try again.",
        type: "warning",
      },
      {
        match: (s) => s.includes("当前无可审核案例"),
        title: "Notice",
        message: "No cases are currently available to review.",
        type: "info",
      },
      {
        match: (s) => s.includes("当日审核已经达到上限") || s.includes("本周审核已经达到上限"),
        title: "Review Limit Reached",
        message: "Your review limit has been reached for this period.",
        type: "info",
      },
      {
        match: (s) => s.includes("当日提交不确定次数已达上限"),
        title: "Uncertain Limit Reached",
        message: "Daily limit for 'Uncertain' verdicts reached. Please submit a definite verdict (Violation / No Violation).",
        type: "warning",
      },
      {
        match: (s) => s.includes("案例已提交"),
        title: "Case Submitted",
        message: "This case has already been submitted.",
        type: "info",
      },
      {
        match: (s) => s.includes("您已经是巡查员了"),
        title: "Notice",
        message: "You are already an Inspector.",
        type: "info",
      },
    ];

    let activeToast = null;
    let toastTimer = null;

    function getTranslation(raw) {
      for (const item of TRANSLATIONS) {
        if (item.match(raw)) return item;
      }
      return {
        title: "Notice",
        message: raw,
        type: "info",
      };
    }

    function dismissToast(immediate = false) {
      if (toastTimer && typeof clearTimeout === "function") {
        clearTimeout(toastTimer);
        toastTimer = null;
      }
      if (!activeToast) return;
      const el = activeToast;
      activeToast = null;
      if (immediate || !el.isConnected) {
        if (typeof el.remove === "function") el.remove();
        return;
      }
      el.classList.add("abi-alert-hide");
      const clean = () => {
        if (typeof el.remove === "function") el.remove();
      };
      if (typeof el.addEventListener === "function") {
        el.addEventListener("animationend", clean, { once: true });
      }
      if (typeof setTimeout === "function") {
        setTimeout(clean, 250);
      } else {
        clean();
      }
    }

    function showToast(info) {
      if (typeof document === "undefined" || !document.createElement) return;
      ensureStyles();

      if (activeToast && activeToast.isConnected) {
        const msgEl = activeToast.querySelector ? activeToast.querySelector(".abi-alert-message") : null;
        if (msgEl && msgEl.textContent === info.message) {
          activeToast.classList.remove("abi-alert-shake");
          if (typeof activeToast.offsetWidth === "number") void activeToast.offsetWidth;
          activeToast.classList.add("abi-alert-shake");
          if (toastTimer && typeof clearTimeout === "function") clearTimeout(toastTimer);
          if (typeof setTimeout === "function") {
            toastTimer = setTimeout(dismissToast, 4000);
          }
          return;
        }
        dismissToast(true);
      }

      const toast = document.createElement("div");
      toast.className = `abi-alert-toast abi-alert-${info.type}`;
      if (toast.setAttribute) {
        toast.setAttribute("role", "alert");
        toast.setAttribute("aria-live", "assertive");
      }

      const icon = document.createElement("div");
      icon.className = "abi-alert-icon";
      if (info.type === "warning") {
        icon.innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`;
      } else if (info.type === "error") {
        icon.innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;
      } else {
        icon.innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
      }

      const body = document.createElement("div");
      body.className = "abi-alert-body";

      const title = document.createElement("div");
      title.className = "abi-alert-title";
      title.textContent = info.title;

      const message = document.createElement("div");
      message.className = "abi-alert-message";
      message.textContent = info.message;

      if (body.append) body.append(title, message);
      else if (body.appendChild) { body.appendChild(title); body.appendChild(message); }

      const close = document.createElement("button");
      close.type = "button";
      close.className = "abi-alert-close";
      if (close.setAttribute) close.setAttribute("aria-label", "Close");
      close.innerHTML = "&times;";
      if (close.addEventListener) {
        close.addEventListener("click", () => dismissToast());
      }

      if (toast.append) toast.append(icon, body, close);
      else if (toast.appendChild) {
        toast.appendChild(icon);
        toast.appendChild(body);
        toast.appendChild(close);
      }

      const target = document.body || document.documentElement;
      if (target && target.appendChild) target.appendChild(toast);
      activeToast = toast;

      if (toastTimer && typeof clearTimeout === "function") clearTimeout(toastTimer);
      if (typeof setTimeout === "function") {
        toastTimer = setTimeout(dismissToast, 4000);
      }
    }

    function ensureStyles() {
      if (typeof document === "undefined" || !document.createElement) return;
      if (document.getElementById && document.getElementById("abi-alert-styles")) return;
      const head = document.head || document.documentElement;
      if (!head || !head.appendChild) return;
      const style = document.createElement("style");
      style.id = "abi-alert-styles";
      style.textContent = `
        .abi-alert-toast {
          position: fixed;
          top: 24px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 100000;
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 320px;
          max-width: min(520px, calc(100vw - 32px));
          padding: 12px 16px;
          box-sizing: border-box;
          background: linear-gradient(180deg, rgba(20, 26, 29, 0.98) 0%, rgba(13, 17, 19, 0.98) 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-left: 3px solid #e0a838;
          border-radius: 6px;
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(12px);
          color: #d2dbd3;
          font-family: var(--abi-font, "Arial Narrow", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif);
          animation: abi-toast-in 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          pointer-events: auto;
          user-select: none;
        }
        .abi-alert-toast.abi-alert-error {
          border-left-color: #ca4d31;
        }
        .abi-alert-toast.abi-alert-info {
          border-left-color: #37cf88;
        }
        .abi-alert-toast.abi-alert-shake {
          animation: abi-toast-shake 0.3s ease-in-out;
        }
        .abi-alert-toast.abi-alert-hide {
          animation: abi-toast-out 0.2s cubic-bezier(0.7, 0, 0.84, 0) forwards;
        }
        @keyframes abi-toast-in {
          from { opacity: 0; transform: translate(-50%, -16px) scale(0.97); }
          to { opacity: 1; transform: translate(-50%, 0) scale(1); }
        }
        @keyframes abi-toast-out {
          from { opacity: 1; transform: translate(-50%, 0) scale(1); }
          to { opacity: 0; transform: translate(-50%, -12px) scale(0.97); }
        }
        @keyframes abi-toast-shake {
          0%, 100% { transform: translate(-50%, 0); }
          20%, 60% { transform: translate(calc(-50% - 5px), 0); }
          40%, 80% { transform: translate(calc(-50% + 5px), 0); }
        }
        .abi-alert-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          width: 28px;
          height: 28px;
          border-radius: 4px;
          background: rgba(224, 168, 56, 0.12);
          color: #e0a838;
        }
        .abi-alert-error .abi-alert-icon {
          background: rgba(202, 77, 49, 0.12);
          color: #ca4d31;
        }
        .abi-alert-info .abi-alert-icon {
          background: rgba(55, 207, 136, 0.12);
          color: #37cf88;
        }
        .abi-alert-body {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
          flex: 1 1 auto;
        }
        .abi-alert-title {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #e0a838;
          line-height: 1.2;
        }
        .abi-alert-error .abi-alert-title {
          color: #ff6b4a;
        }
        .abi-alert-info .abi-alert-title {
          color: #4ade80;
        }
        .abi-alert-message {
          font-size: 13px;
          font-weight: 600;
          line-height: 1.35;
          color: #d2dbd3;
        }
        .abi-alert-close {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          margin-left: 4px;
          padding: 0;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 4px;
          color: #8fa09d;
          font-size: 18px;
          line-height: 1;
          cursor: pointer;
          transition: all 0.15s ease;
          flex-shrink: 0;
        }
        .abi-alert-close:hover {
          background: rgba(255, 255, 255, 0.12);
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.25);
        }
      `;
      head.appendChild(style);
    }

    if (typeof document !== "undefined" && document.addEventListener) {
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && activeToast) dismissToast();
      });
    }

    const handler = function (message) {
      const raw = String(message ?? "");
      const root = typeof document !== "undefined" ? document.documentElement : null;
      const siteOn = !root || !root.dataset || (root.dataset.abiExtension !== "off" && root.dataset.abiSite !== "off");

      if (!siteOn) {
        return Reflect.apply(originalAlert, window, [raw]);
      }

      const info = getTranslation(raw);
      showToast(info);
      if (typeof document !== "undefined" && typeof document.dispatchEvent === "function") {
        try {
          document.dispatchEvent(new CustomEvent("abi:alert", { detail: { ...info, original: raw } }));
        } catch {}
      }
    };
    handler.__abiPatched = true;

    try {
      window.alert = handler;
    } catch {
      try {
        Object.defineProperty(window, "alert", {
          value: handler,
          writable: true,
          configurable: true,
        });
      } catch {}
    }
  }

  // Handle Exit Inspection in MAIN world
  if (typeof window !== "undefined" && typeof window.addEventListener === "function") {
    window.addEventListener("abi:exit-inspection", () => {
      try {
        if (typeof window.toTab === "function") {
          window.toTab(".nav li", ".main .box", 0);
        }
        if (typeof window.closevideo === "function") {
          window.closevideo();
        }
        if (window.patrolVideoPlayer) {
          try { window.patrolVideoPlayer.pause(); } catch {}
        }
        const tabid = window.tabid || "working";
        if (typeof window.$ === "function") {
          try {
            window.$("." + tabid + " div").eq(0).show().siblings().hide();
            window.$("." + tabid + " .exit_btn2").css("display", "none");
          } catch {}
        }
        setTimeout(() => {
          try {
            if (
              window.ActGlobal?.user?.isLogin &&
              window.amsData?.userType == 1 &&
              window.ActFun?.myEmit &&
              window.MyRequest?.Main
            ) {
              window.ActFun.myEmit(window.MyRequest.Main);
            }
          } catch {}
        }, 200);
      } catch {}
    });
  }

  // Suppress automatic playback on entrance when autoPlay setting is disabled
  if (typeof HTMLMediaElement !== "undefined" && HTMLMediaElement.prototype) {
    const originalPlay = HTMLMediaElement.prototype.play;
    HTMLMediaElement.prototype.play = function (...args) {
      const rootDs = typeof document !== "undefined" ? document.documentElement?.dataset : null;
      const isInspectionVideo = Boolean(
        this.closest?.(".content.video, #xcWorking, #drill, .video, #workingPlayer, #drillPlayer")
      );
      if (
        rootDs?.abiExtension !== "off" &&
        rootDs?.abiAutoPlay === "off" &&
        isInspectionVideo &&
        this.dataset.abiUserPlayed !== "true"
      ) {
        return Promise.resolve();
      }
      return originalPlay.apply(this, args);
    };
  }

  // Support closeDialog on modal close buttons
  if (typeof document !== "undefined" && typeof document.addEventListener === "function") {
    document.addEventListener(
        "click",
        (event) => {
          const target = event.target;
          if (!(target instanceof Element)) return;
          const closeBtn = target.closest("._close-btn, .close-btn, [aria-label='Close'], .abi-rank-close");
          if (!closeBtn) return;
          const popup = closeBtn.closest(
            ".popup, .dialog, .modal, .patrol-popup, .grade-popup, [id*='Popup'], [id*='popup'], [id^='drillResult'], #commonTips, #commonTips1, #resultWrong, #resultRight, #notAuth, #notExam, #getAuth, #traingFail, #LowVersion, #noticePopup, #drillIntro"
          );
          if (popup) {
            if (typeof window.closeDialog === "function") {
              try { window.closeDialog(popup.id); } catch {}
              try { window.closeDialog(); } catch {}
            }
            if (typeof window.mfDialogS === "object" && window.mfDialogS) {
              try {
                const idx = window.mfDialogS.dialogOpen?.indexOf(popup.id);
                if (idx > -1) window.mfDialogS.dialogOpen.splice(idx, 1);
                if (!window.mfDialogS.dialogOpen?.length && window.mfDialogS.overLay) {
                  window.mfDialogS.overLay.style.display = "none";
                }
              } catch {}
            }
          }
        },
        true
      );
  }
})();

