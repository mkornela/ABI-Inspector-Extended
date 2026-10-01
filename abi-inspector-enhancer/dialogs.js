(() => {
  "use strict";
  // Same document guard as content.js.
  if (
    location.origin !== "https://www.arenabreakoutinfinite.com" ||
    !/^\/act\/a20251028patroller\/?$/.test(location.pathname) ||
    window.top !== window
  )
    return;

  const root = document.documentElement;
  // data-abi-site is maintained by settings.js ("Site modifications" switch).
  const siteOn = () => root.dataset.abiSite !== "off";

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

  function removeExtras() {
    document.querySelectorAll(".abi-counter, .abi-textcount").forEach((n) => n.remove());
    document.getElementById("courtMenu")?.classList.remove("abi-full");
    restorePlaceholders();
  }

  function refreshAll() {
    if (!siteOn()) {
      removeExtras();
      return;
    }
    fixPlaceholders();
    refreshTypes();
    refreshTextCounts();
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
  for (const id of ["illegalPopup", "drillResult1", "drillResult2"]) {
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
  refreshAll();
})();
