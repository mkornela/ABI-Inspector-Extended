(() => {
  "use strict";
  // Same document guard as content.js.
  const isAllowedOrigin =
    location.origin === "https://www.arenabreakoutinfinite.com" ||
    location.origin === "null" ||
    location.href === "about:blank";
  if (!isAllowedOrigin || window.top !== window) return;
  if (
    location.origin === "https://www.arenabreakoutinfinite.com" &&
    !/^\/act\/a20251028patroller\/?$/.test(location.pathname)
  )
    return;

  const root = document.documentElement;
  // data-abi-site and data-abi-verdict-enhancements are maintained by settings.js.
  const siteOn = () =>
    root.dataset.abiSite !== "off" && root.dataset.abiVerdictEnhancements !== "off";

  // Display-only English text for placeholders the site ships in Chinese.
  // Values sent to the server are never touched, and the original text is
  // restored when site modifications are switched off.
  const PLACEHOLDERS = {
    guiltyDetail: "Describe the violation if you can (optional, max 50 characters)",
    notSureReason: "Add details on why the evidence is insufficient (optional, max 50 characters)",
  };
  const HAS_CJK = /[\u3400-\u9fff\uff00-\uffef]/;
  const MAX_TYPES = 3;

  function fixPlaceholders() {
    for (const [id, text] of Object.entries(PLACEHOLDERS)) {
      const el = document.getElementById(id);
      if (!el) continue;
      const current = el.getAttribute("placeholder") || "";
      if (current !== text && (current === "" || HAS_CJK.test(current))) {
        if (el.dataset.abiPlaceholder === undefined) el.dataset.abiPlaceholder = current;
        el.setAttribute("placeholder", text);
      }
    }
  }

  function restorePlaceholders() {
    for (const id of Object.keys(PLACEHOLDERS)) {
      const el = document.getElementById(id);
      if (!el || el.dataset.abiPlaceholder === undefined) continue;
      el.setAttribute("placeholder", el.dataset.abiPlaceholder);
      delete el.dataset.abiPlaceholder;
    }
  }

  function ensureAfter(anchor, className) {
    if (!anchor) return null;
    let node = anchor.nextElementSibling;
    if (node && node.classList.contains(className)) return node;
    node = document.createElement("div");
    node.className = className;
    anchor.after(node);
    return node;
  }

  function refreshTypes() {
    const list = document.getElementById("courtMenu");
    if (!list) return;
    const count = list.querySelectorAll('input[type="checkbox"]:checked').length;
    list.classList.toggle("abi-full", count >= MAX_TYPES);
    const badge = list.previousElementSibling?.classList.contains("abi-counter")
      ? list.previousElementSibling
      : (() => {
          const el = document.createElement("div");
          el.className = "abi-counter";
          list.before(el);
          return el;
        })();
    const label = `${count} / ${MAX_TYPES} selected`;
    if (badge.textContent !== label) badge.textContent = label;
    badge.classList.toggle("abi-max", count >= MAX_TYPES);
  }

  function refreshTextCounts() {
    for (const id of Object.keys(PLACEHOLDERS)) {
      const el = document.getElementById(id);
      if (!el) continue;
      const max = el.maxLength > 0 ? el.maxLength : 50;
      const node = ensureAfter(el, "abi-textcount");
      const label = `${el.value.length} / ${max}`;
      if (node && node.textContent !== label) node.textContent = label;
    }
  }

  const DIALOG_IDS = [
    "illegalPopup",
    "drillResult1",
    "drillResult2",
    "commonTips",
    "commonTips1",
    "resultWrong",
    "resultRight",
    "notAuth",
    "notExam",
    "getAuth",
    "traingFail",
    "LowVersion",
    "noticePopup",
    "drillIntro",
  ];

  const DIALOG_TRANSLATIONS = [
    ["演练结果反馈", "Drill Result Feedback"],
    ["您的巡查结果：", "Your Verdict: "],
    ["您的巡查结果", "Your Verdict"],
    ["违规内容选项：", "Violation Types: "],
    ["违规内容选项", "Violation Types"],
    ["巡查演练结果：", "Official Result: "],
    ["巡查演练结果", "Official Result"],
    ["继续练习", "Continue Practice"],
    ["违规类型选择", "Select Violation Types"],
    ["使用作弊工具", "Using Cheat Tools"],
    ["温馨提示", "Notice"],
    ["提示", "Notice"],
    ["演练介绍", "Drill Introduction"],
    ["巡查公告", "Announcements"],
    ["无违规", "No Violation"],
    ["有违规", "Violation"],
    ["不确定", "Uncertain"],
    ["违规", "Violation"],
    ["确定", "OK"],
    ["取消", "Cancel"],
    ["提交", "Submit"],
    ["关闭", "Close"],
    ["透视", "Wallhack / ESP"],
    ["自瞄", "Aimbot"],
    ["无后坐力", "No Recoil"],
    ["无后座", "No Recoil"],
    ["加速或瞬移", "Speedhack / Teleport"],
    ["范围伤害", "Area Damage"],
    ["飞天遁地", "Flying / Under-Map"],
    ["外挂车队", "Teaming with Cheaters"],
    ["恶意利用游戏漏洞", "Malicious Bug Exploit"],
    ["利用游戏漏洞", "Bug Exploit"],
    ["证据不足", "Insufficient Evidence"],
    ["视频异常", "Video Anomaly"],
    ["自瞄、子弹追踪", "Aimbot, Bullet Tracking"],
    ["子弹追踪", "Bullet Tracking"],
    ["其他", "Other"],
    ["无", "None"],
    ["您本次选择无违规，请确认已完整仔细查看完整视频，避免遗漏违规点", "You selected No Violation. Please confirm you have thoroughly watched the full video to avoid missing violations."],
    ["您本次选择无违规，请确认已完整仔细查看完整视频，", "You selected No Violation. Please confirm you have thoroughly watched the full video,"],
    ["避免遗漏违规点", "to avoid missing violations."],
    ["提交不确定的次数有限，会计入当天的巡查单数，但不会影响准确率，请选择不确定原因：", "The number of Uncertain submissions is limited. It counts toward today's inspection quota but does not affect accuracy. Please select the reason:"],
    ["提交不确定的次数有限，会计入当天的巡查单数，但不会影响准确率，", "The number of Uncertain submissions is limited. It counts toward today's inspection quota but does not affect accuracy,"],
    ["请选择不确定原因：", "Please select the reason for Uncertain:"],
    ["很遗憾，先锋没有通过本次考核先锋可以通过演练进行练习,提高准确率。", "Unfortunately, you did not pass this assessment. You can practice in drills to improve your accuracy."],
    ["很遗憾，先锋没有通过本次考核", "Unfortunately, you did not pass this assessment."],
    ["先锋可以通过演练进行练习,提高准确率。", "You can practice in drills to improve your accuracy."],
    ["您暂不符合巡查员申请条件，具体如下:", "You currently do not meet the Inspector application requirements:"],
    ["您暂不符合巡查员申请条件，具体如下：", "You currently do not meet the Inspector application requirements:"],
    ["赛季段位在英雄及以上;", "Season rank Hero or above;"],
    ["赛季段位在英雄及以上；", "Season rank Hero or above;"],
    ["赛季段位在英雄及以上", "Season rank Hero or above"],
    ["信誉分>1400", "Credit score > 1400"],
    ["无作弊相关历史违规记录;", "No cheating-related penalty history;"],
    ["无作弊相关历史违规记录；", "No cheating-related penalty history;"],
    ["无作弊相关历史违规记录", "No cheating-related penalty history"],
    ["未完成巡查演练（巡查10单并达到准确率70%）", "Inspection drill not completed (complete 10 cases with ≥ 70% accuracy)"],
    ["查看巡查功能介绍", "View Inspector Overview"],
    ["前往巡查演练", "Go to Inspection Drill"],
    ["恭喜先锋获得<strong>巡查员</strong>资格!", "Congratulations Pioneer, you have been granted <strong>Inspector</strong> status!"],
    ["恭喜先锋获得巡查员资格!", "Congratulations Pioneer, you have been granted Inspector status!"],
    ["恭喜先锋获得", "Congratulations Pioneer, you have been granted "],
    ["恭喜您晋升为", "Congratulations on your promotion to "],
    ["助理巡查员", "Assistant Inspector"],
    ["见习巡查员", "Trainee Inspector"],
    ["初级巡查员", "Junior Inspector"],
    ["中级巡查员", "Intermediate Inspector"],
    ["高级巡查员", "Senior Inspector"],
    ["专家巡查员", "Expert Inspector"],
    ["巡查员", "Inspector"],
    ["您的手机系统版本过低请升级至安卓7.0或以上再尝试。", "Your operating system version is unsupported. Please upgrade to continue."],
    ["您的手机系统版本过低", "Your operating system version is unsupported."],
    ["请升级至安卓7.0或以上再尝试。", "Please upgrade to continue."],
    ["接口请求中，请稍后再试~", "A request is currently in progress. Please wait a moment and try again."],
    ["目前参与人数过多，请稍后再试~", "The server is currently experiencing high traffic. Please try again shortly."],
    ["服务网络异常，请稍后重试。", "Server network error. Please try again later."],
    ["服务网络异常，请稍后重试", "Server network error. Please try again later."],
    ["网络繁忙,请稍后重试", "Network busy. Please try again in a moment."],
    ["网络繁忙，请稍后重试", "Network busy. Please try again in a moment."],
    ["提交失败！", "Submission failed."],
    ["提交失败", "Submission failed."],
    ["您已经是巡查员了！", "You are already an Inspector."],
    ["您已经是巡查员了", "You are already an Inspector."],
  ];

  function translateChineseText(text) {
    if (!text || !HAS_CJK.test(text)) return text;
    let res = text;
    for (const [cn, en] of DIALOG_TRANSLATIONS) {
      if (res.includes(cn)) {
        res = res.replaceAll(cn, en);
      }
    }
    return res;
  }

  function removeChineseComments(rootNode = document) {
    if (!rootNode || typeof document === "undefined" || !document.createTreeWalker) return;
    try {
      const walker = document.createTreeWalker(rootNode, NodeFilter.SHOW_COMMENT);
      const toRemove = [];
      while (walker.nextNode()) {
        const node = walker.currentNode;
        if (node && HAS_CJK.test(node.nodeValue || "")) {
          toRemove.push(node);
        }
      }
      for (const node of toRemove) {
        try { node.remove(); } catch {}
      }
    } catch {}
  }

  function fixAllDialogs() {
    for (const id of DIALOG_IDS) {
      const popup = document.getElementById(id);
      if (!popup) continue;
      removeChineseComments(popup);

      const closeBtns = popup.querySelectorAll("._close-btn, .close-btn");
      for (const btn of closeBtns) {
        if (btn.classList.contains("close-btn")) {
          btn.setAttribute("aria-label", "Close");
          btn.setAttribute("title", "Close");
          if (!btn.querySelector("svg.abi-close-svg")) {
            btn.innerHTML = `<svg class="abi-close-svg" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" style="pointer-events:none;display:block;"><path d="M1.5 1.5L10.5 10.5M1.5 10.5L10.5 1.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`;
          }
        } else if (btn.textContent.trim() === "关闭" || HAS_CJK.test(btn.textContent)) {
          btn.textContent = "Cancel";
          btn.setAttribute("aria-label", "Cancel");
        }
      }

      const walker = document.createTreeWalker(popup, NodeFilter.SHOW_TEXT);
      const textNodes = [];
      while (walker.nextNode()) {
        const node = walker.currentNode;
        if (node && node.nodeValue && HAS_CJK.test(node.nodeValue)) {
          const parent = node.parentElement;
          if (parent && (parent.tagName === "SCRIPT" || parent.tagName === "STYLE")) continue;
          textNodes.push(node);
        }
      }
      for (const node of textNodes) {
        const tr = translateChineseText(node.nodeValue);
        if (tr !== node.nodeValue) {
          node.nodeValue = tr;
        }
      }
    }
  }

  const COMMON_TIPS_TRANSLATIONS = {
    "接口请求中，请稍后再试~": "A request is currently in progress. Please wait a moment and try again.",
    "服务网络异常，请稍后重试。": "Server network error. Please try again later.",
    "服务网络异常，请稍后重试": "Server network error. Please try again later.",
    "提交失败！": "Submission failed.",
    "提交失败": "Submission failed.",
    "目前参与人数过多，请稍后再试~": "The server is currently experiencing high traffic. Please try again shortly.",
    "您已经是巡查员了！": "You are already an Inspector.",
    "您已经是巡查员了": "You are already an Inspector.",
  };

  function fixCommonTips() {
    const popup = document.getElementById("commonTips");
    if (!popup) return;
    const h3 = popup.querySelector("h3");
    if (h3 && (h3.textContent.trim() === "温馨提示" || HAS_CJK.test(h3.textContent))) {
      if (h3.dataset.abiOriginalText === undefined) h3.dataset.abiOriginalText = h3.textContent;
      h3.textContent = "Notice";
    }
    const btn = popup.querySelector(".btn3");
    if (btn && (btn.textContent.trim() === "确定" || HAS_CJK.test(btn.textContent))) {
      if (btn.dataset.abiOriginalText === undefined) btn.dataset.abiOriginalText = btn.textContent;
      btn.textContent = "OK";
    }
    const textEl = document.getElementById("commonTipsText");
    if (textEl) {
      const current = textEl.textContent.trim();
      for (const [cn, en] of Object.entries(COMMON_TIPS_TRANSLATIONS)) {
        if (current.includes(cn)) {
          if (textEl.dataset.abiOriginalText === undefined) textEl.dataset.abiOriginalText = current;
          textEl.textContent = en;
          break;
        }
      }
    }
  }

  function restoreCommonTips() {
    const popup = document.getElementById("commonTips");
    if (!popup) return;
    const h3 = popup.querySelector("h3");
    if (h3 && h3.dataset.abiOriginalText !== undefined) {
      h3.textContent = h3.dataset.abiOriginalText;
      delete h3.dataset.abiOriginalText;
    }
    const btn = popup.querySelector(".btn3");
    if (btn && btn.dataset.abiOriginalText !== undefined) {
      btn.textContent = btn.dataset.abiOriginalText;
      delete btn.dataset.abiOriginalText;
    }
    const textEl = document.getElementById("commonTipsText");
    if (textEl && textEl.dataset.abiOriginalText !== undefined) {
      textEl.textContent = textEl.dataset.abiOriginalText;
      delete textEl.dataset.abiOriginalText;
    }
  }

  function removeExtras() {
    document.querySelectorAll(".abi-counter, .abi-textcount").forEach((n) => n.remove());
    document.getElementById("courtMenu")?.classList.remove("abi-full");
    restorePlaceholders();
    restoreCommonTips();
  }

  function refreshAll() {
    if (!siteOn()) {
      removeExtras();
      return;
    }
    fixPlaceholders();
    fixCommonTips();
    fixAllDialogs();
    refreshTypes();
    refreshTextCounts();
    removeChineseComments();
  }

  document.addEventListener("change", (event) => {
    if (siteOn() && event.target instanceof Element && event.target.closest("#courtMenu"))
      refreshTypes();
  });
  document.addEventListener("input", (event) => {
    if (siteOn() && event.target instanceof Element && event.target.matches("#guiltyDetail, #notSureReason"))
      refreshTextCounts();
  });

  // The site opens/closes popups by changing their inline style and may rebuild
  // option lists or re-apply language strings; re-sync after any of that.
  let queued = false;
  const queue = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      refreshAll();
    });
  };
  const observer = new MutationObserver(queue);
  for (const id of DIALOG_IDS) {
    const popup = document.getElementById(id);
    if (popup)
      observer.observe(popup, {
        attributes: true,
        attributeFilter: ["style", "class", "placeholder"],
        childList: true,
        subtree: true,
      });
  }
  // Follow the popup's "Site modifications" switch live.
  new MutationObserver(queue).observe(root, {
    attributes: true,
    attributeFilter: ["data-abi-site"],
  });
  function closeAnyPopup(popup) {
    if (!popup) return;
    popup.style.display = "none";
    popup.style.setProperty("display", "none", "important");

    const allPopups = document.querySelectorAll(
      ".popup, .patrol-popup, .grade-popup, #illegalPopup, #drillResult1, #drillResult2, #commonTips, #commonTips1, #resultWrong, #resultRight, #notAuth, #notExam, #getAuth, #traingFail, #LowVersion, #noticePopup, #drillIntro"
    );
    const anyStillOpen = [...allPopups].some(
      (p) => p !== popup && p.style.display !== "none" && p.getAttribute("hidden") === null
    );
    if (!anyStillOpen) {
      const masks = document.querySelectorAll("#_popMaskMF_, #popMaskMF, .pop_mask_mf");
      masks.forEach((m) => {
        m.style.display = "none";
        m.style.setProperty("display", "none", "important");
      });
      document.body.style.position = "static";
      document.body.style.width = "initial";
    }
  }

  document.addEventListener(
    "click",
    (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const closeBtn = target.closest("._close-btn, .close-btn, [aria-label='Close'], [data-dismiss='modal']");
      if (!closeBtn) return;

      const popup = closeBtn.closest(
        ".popup, .dialog, .modal, .patrol-popup, .grade-popup, [id*='Popup'], [id*='popup'], [id^='drillResult'], #commonTips, #commonTips1, #resultWrong, #resultRight, #notAuth, #notExam, #getAuth, #traingFail, #LowVersion, #noticePopup, #drillIntro"
      );
      if (popup) {
        event.preventDefault();
        event.stopPropagation();
        closeAnyPopup(popup);
      }
    },
    true
  );

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const openPopups = [
        ...document.querySelectorAll(
          ".popup, .patrol-popup, #illegalPopup, #drillResult1, #drillResult2, #commonTips, #commonTips1, #resultWrong, #resultRight, #notAuth, #notExam, #getAuth, #traingFail, #LowVersion, #noticePopup, #drillIntro"
        ),
      ].filter((p) => p.style.display !== "none" && p.getAttribute("hidden") === null);
      if (openPopups.length) {
        closeAnyPopup(openPopups[openPopups.length - 1]);
      }
    }
  });

  refreshAll();
})();
