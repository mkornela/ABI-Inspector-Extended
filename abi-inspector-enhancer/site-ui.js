(() => {
  "use strict";

  const labels = {
    mine: "Overview",
    working: "Workbench",
    patrol: "Challenges",
    drill: "Test cases",
    notice: "News",
  };
  const root = document.documentElement;
  const privacyStorageKey = "abi-screenshot-anonymized";
  const privacyMaskText = "***";
  const maskedTextNodes = new Map();
  let privacyAnonymized = false;
  try {
    privacyAnonymized = localStorage.getItem(privacyStorageKey) === "true";
  } catch {}
  const ranks = [
    { title: "Trainee Inspector", required: 0 },
    { title: "Assistant Inspector", required: 15 },
    { title: "Junior Inspector", required: 125 },
    { title: "Intermediate Inspector", required: 250 },
    { title: "Senior Inspector", required: 375 },
    { title: "Expert + Lv. 35", required: 475, levelRequired: 35 },
  ];
  let queued = false;
  let settingsViewState = null;
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    const dialog = document.querySelector("#wxMine > .abi-rank-dialog");
    if (!dialog || dialog.hidden) return;
    dialog.hidden = true;
    document.querySelector("#wxMine .abi-rank-open")?.focus();
  });

  function updateNavigation() {
    queued = false;
    observer.disconnect();
    try {
      updateNavigationWork();
    } finally {
      observer.takeRecords();
      observer.observe(document.documentElement, observerConfig);
    }
  }

  function updateNavigationWork() {
    restorePrivacyMask();
    updateAccountToolbar();
    const nav = document.querySelector(".main .nav");
    if (!nav || !root.hasAttribute("data-abi-site")) {
      applyPrivacyMask();
      return;
    }

    const enabled = root.dataset.abiSite !== "off";
    for (const [id, label] of Object.entries(labels)) {
      const item = nav.querySelector(`#${id}`);
      if (!item) continue;

      const textNode = [...item.childNodes].find(
        (node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim(),
      );
      if (!item.dataset.abiOriginalLabel && textNode) {
        item.dataset.abiOriginalLabel = textNode.textContent.trim();
      }

      const target = enabled ? label : item.dataset.abiOriginalLabel;
      if (target && textNode?.textContent.trim() !== target) {
        if (textNode) textNode.textContent = target;
        else item.append(document.createTextNode(target));
      }
      const accessibleLabel = target || label;
      if (item.getAttribute("aria-label") !== accessibleLabel) {
        item.setAttribute("aria-label", accessibleLabel);
      }
    }

    const exitVisible = [...document.querySelectorAll(".main .exit_btn2")].some(
      (exit) => {
        const style = getComputedStyle(exit);
        return (
          style.display !== "none" && exit.getBoundingClientRect().width > 0
        );
      },
    );
    const shouldShowBrand = enabled && !exitVisible;
    let brand = nav.querySelector(":scope > .abi-extension-brand");

    if (shouldShowBrand && !brand) {
      brand = document.createElement("li");
      brand.className = "abi-extension-brand";
      brand.setAttribute("role", "button");
      brand.setAttribute("tabindex", "0");
      brand.setAttribute("aria-label", "Extension settings");

      const name = document.createElement("span");
      name.className = "abi-brand-name";
      name.textContent = "ABI Inspector Extended";

      brand.append(name);
      nav.append(brand);
    } else if (!shouldShowBrand) {
      if (brand || settingsViewState) deactivateSettings(nav);
      brand?.remove();
    }

    nav.classList.toggle("abi-has-brand", shouldShowBrand);
    updateHeaderSlot(nav);
    configureSettingsNavigation(nav, brand);
    updateColorKey(enabled && root.dataset.abiColorKey !== "off");
    updateInspectionNote(enabled && root.dataset.abiInspectionNotes !== "off");
    updateInspectionTitle(
      enabled && root.dataset.abiInspectionNotes !== "off",
    );
    updateGuidelines(enabled);
    updateFaq(enabled);
    updateDrillCounters(enabled);
    updateChallengeRewards(enabled);
    updateChallengeProgressLabels(enabled);
    updateOverview(enabled);
    applyPrivacyMask();
  }

  function updateAccountToolbar() {
    const topNav = document.querySelector(".top-nav");
    const sourceName = topNav?.querySelector("#s3_1");
    const sourceLogout = topNav?.querySelector("#a3_1");
    const sourceHome = topNav?.querySelector(".home-btn");
    const sourceSecurity = topNav?.querySelector(".safe-link");
    if (!topNav || !sourceName || !sourceLogout || !sourceHome || !sourceSecurity) return;

    let actions = topNav.querySelector(":scope > .abi-topbar-actions");
    if (!actions) {
      actions = document.createElement("div");
      actions.className = "abi-topbar-actions";

      const identity = document.createElement("span");
      identity.className = "abi-account-name";
      const welcome = document.createElement("span");
      welcome.className = "abi-account-welcome";
      welcome.textContent = "Welcome,";
      const name = document.createElement("strong");
      name.className = "abi-account-name-text";
      identity.append(welcome, name);

      const home = document.createElement("button");
      home.type = "button";
      home.className = "abi-account-button";
      home.textContent = "Home";
      home.addEventListener("click", () => sourceHome.click());

      const anonymize = document.createElement("button");
      anonymize.type = "button";
      anonymize.className = "abi-account-button abi-anonymize-button";
      anonymize.addEventListener("click", () => {
        privacyAnonymized = !privacyAnonymized;
        try {
          localStorage.setItem(privacyStorageKey, String(privacyAnonymized));
        } catch {}
        scheduleUpdate();
      });

      const logout = document.createElement("button");
      logout.type = "button";
      logout.className = "abi-account-button";
      logout.textContent = "Log Out";
      logout.addEventListener("click", () => sourceLogout.click());

      const security = document.createElement("a");
      security.className = "abi-account-button abi-security-button";
      security.textContent = "Security Center";
      security.target = "_blank";
      security.rel = "noopener noreferrer";
      actions.append(identity, home, anonymize, logout, security);
      topNav.append(actions);
    }

    const userName = actions.querySelector(".abi-account-name-text");
    if (userName && userName.textContent !== sourceName.textContent) {
      userName.textContent = sourceName.textContent;
    }
    const anonymize = actions.querySelector(".abi-anonymize-button");
    if (anonymize) {
      anonymize.textContent = privacyAnonymized ? "Unanonymize" : "Anonymize";
      anonymize.setAttribute("aria-pressed", String(privacyAnonymized));
      anonymize.setAttribute(
        "aria-label",
        privacyAnonymized ? "Show personal information" : "Anonymize personal information",
      );
    }
    const security = actions.querySelector(".abi-security-button");
    if (security && security.href !== sourceSecurity.href) security.href = sourceSecurity.href;

    const loginPanel = topNav.querySelector("#login");
    const guestPanel = topNav.querySelector("#unlogin");
    const guestInlineDisplay = guestPanel?.style.display || "";
    const loggedIn = guestPanel
      ? guestInlineDisplay
        ? guestInlineDisplay === "none"
        : getComputedStyle(guestPanel).display === "none"
      : getComputedStyle(loginPanel || sourceName).display !== "none";
    const toolbarEnabled = loggedIn && root.dataset.abiSite !== "off";
    actions.hidden = !toolbarEnabled;
    topNav.classList.toggle("abi-account-ready", toolbarEnabled);
    for (const source of [
      topNav.querySelector("#login"),
      sourceHome,
      sourceSecurity,
    ]) {
      source?.classList.toggle("abi-account-source-hidden", toolbarEnabled);
    }
  }

  function applyPrivacyMask() {
    root.toggleAttribute("data-abi-anonymized", privacyAnonymized);
    const privateSelectors = [
      ".top-nav #s3_1",
      ".abi-account-name-text",
      ".username",
      ".userid > span",
      "[id^='roleOpenid']",
      ".honor > span",
      "#level-text",
      "#exp_level",
      "#wxMine .abi-rank-kicker",
      "#wxMine .abi-rank-caption",
      "#wxMine .abi-rank-percent",
      "#wxMine .abi-rank-count",
      "#wxMine .abi-level-current",
      "#wxMine .abi-level-maximum",
      "#wxMine .abi-level-caption",
      "#wxMine .abi-stat-item strong",
      "#wxMine .abi-rank-card h3",
      "#wxMine .abi-rank-card p",
      "#wxMine .abi-rank-bonus",
      ".drill-data strong",
      "#wxPatrol .taks-info > span",
    ].join(",");

    for (const element of document.querySelectorAll(privateSelectors)) {
      if (privacyAnonymized) {
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) {
          const textNode = walker.currentNode;
          if (!textNode.nodeValue.trim() || maskedTextNodes.has(textNode)) continue;
          maskedTextNodes.set(textNode, textNode.nodeValue);
          textNode.nodeValue = privacyMaskText;
        }
      }
    }

    for (const element of document.querySelectorAll(
      "#wxMine .abi-rank-fill, #wxMine .abi-level-fill, #wxPatrol .task-progress > div",
    )) {
      if (privacyAnonymized) element.classList.add("abi-private-progress");
    }
  }

  function restorePrivacyMask() {
    for (const [textNode, originalText] of maskedTextNodes) {
      if (textNode.isConnected) textNode.nodeValue = originalText;
    }
    maskedTextNodes.clear();

    // Restore nodes masked by the earlier overlay-based implementation.
    for (const element of document.querySelectorAll(".abi-private-value")) {
      const originalHtml = element.dataset.abiPrivateOriginalHtml;
      if (originalHtml !== undefined) element.innerHTML = originalHtml;
      element.classList.remove("abi-private-value");
      delete element.dataset.abiPrivateOriginalHtml;
      delete element.dataset.abiPrivateLabel;
    }
    for (const element of document.querySelectorAll(".abi-private-progress")) {
      element.classList.remove("abi-private-progress");
    }
  }

  const settingsDefaults = {
    controls: true,
    playerVolume: 100,
    inspectionNotes: true,
    colorKey: true,
  };

  function createSettingsPanel() {
    const panel = document.createElement("section");
    panel.className = "abi-extension-settings";

    const body = document.createElement("div");
    body.className = "abi-settings-body";
    const playback = document.createElement("section");
    playback.className = "abi-settings-group";
    playback.setAttribute("aria-labelledby", "abi-settings-playback-title");
    const playbackTitle = document.createElement("h2");
    playbackTitle.id = "abi-settings-playback-title";
    playbackTitle.textContent = "Playback";
    playback.append(playbackTitle);

    const controlRow = makeSettingsToggle(
      "abi-settings-controls",
      "controls",
      "Video controls and keybinds",
      "Show the local player toolbar and its keyboard shortcuts.",
    );
    const volumeRow = document.createElement("div");
    volumeRow.className = "abi-settings-volume";
    const volumeLabel = document.createElement("label");
    volumeLabel.htmlFor = "abi-settings-volume-slider";
    volumeLabel.textContent = "Default player volume";
    const volumeOutput = document.createElement("output");
    volumeOutput.htmlFor = volumeLabel.htmlFor;
    volumeOutput.textContent = "100%";
    const volumeHeading = document.createElement("div");
    volumeHeading.className = "abi-settings-volume-heading";
    volumeHeading.append(volumeLabel, volumeOutput);
    const volumeHelp = document.createElement("p");
    volumeHelp.textContent = "Remembered for future inspection videos.";
    const volumeSlider = document.createElement("input");
    volumeSlider.id = volumeLabel.htmlFor;
    volumeSlider.type = "range";
    volumeSlider.min = "0";
    volumeSlider.max = "100";
    volumeSlider.step = "1";
    volumeSlider.setAttribute("aria-label", "Default player volume");
    volumeSlider.addEventListener("input", () => {
      volumeOutput.value = `${volumeSlider.value}%`;
      volumeSlider.style.setProperty("--abi-volume-fill", `${volumeSlider.value}%`);
    });
    volumeSlider.addEventListener("change", () => {
      chrome.storage.local.set({ playerVolume: Number(volumeSlider.value) });
    });
    volumeRow.append(volumeHeading, volumeHelp, volumeSlider);
    playback.append(controlRow, volumeRow);

    const display = document.createElement("section");
    display.className = "abi-settings-group";
    display.setAttribute("aria-labelledby", "abi-settings-display-title");
    const displayTitle = document.createElement("h2");
    displayTitle.id = "abi-settings-display-title";
    displayTitle.textContent = "Workbench display";
    display.append(
      displayTitle,
      makeSettingsToggle(
        "abi-settings-notes",
        "inspectionNotes",
        "Inspection notes",
        "Use the enhanced notice. Turn off to restore the site's original wording.",
      ),
      makeSettingsToggle(
        "abi-settings-color-key",
        "colorKey",
        "Inspection color key",
        "Use the color key. Turn off to restore the site's original text.",
      ),
    );

    const about = document.createElement("section");
    about.className = "abi-settings-about";
    const aboutTitle = document.createElement("h2");
    aboutTitle.textContent = "About";
    const aboutCopy = document.createElement("p");
    aboutCopy.textContent = "ABI Inspector Extended";
    const aboutVersion = document.createElement("span");
    aboutVersion.className = "abi-settings-version";
    aboutVersion.textContent = `v${chrome.runtime.getManifest().version}`;
    const aboutLine = document.createElement("div");
    aboutLine.className = "abi-settings-about-line";
    aboutLine.append(aboutCopy, aboutVersion);
    about.append(aboutTitle, aboutLine);

    body.append(playback, display, about);

    const footer = document.createElement("footer");
    footer.className = "abi-settings-footer";
    const reload = document.createElement("button");
    reload.className = "abi-settings-reload";
    reload.type = "button";
    reload.textContent = "Reload page to apply";
    reload.hidden = true;
    reload.addEventListener("click", () => location.reload());
    footer.hidden = true;
    footer.append(reload);
    panel.append(body, footer);

    chrome.storage.local.get(settingsDefaults, (settings) => {
      if (!panel.isConnected) return;
      panel.querySelector("#abi-settings-controls").checked = settings.controls;
      panel.querySelector("#abi-settings-notes").checked = settings.inspectionNotes;
      panel.querySelector("#abi-settings-color-key").checked = settings.colorKey;
      volumeSlider.value = String(settings.playerVolume);
      volumeOutput.value = `${settings.playerVolume}%`;
      volumeSlider.style.setProperty("--abi-volume-fill", `${settings.playerVolume}%`);
      updateSettingsStatus(panel, settings);
    });
    return panel;
  }

  function makeSettingsToggle(id, key, title, description) {
    const row = document.createElement("label");
    row.className = "abi-settings-toggle";
    row.htmlFor = id;
    const copy = document.createElement("span");
    copy.className = "abi-settings-copy";
    const strong = document.createElement("strong");
    strong.textContent = title;
    const help = document.createElement("small");
    help.textContent = description;
    copy.append(strong, help);
    const input = document.createElement("input");
    input.id = id;
    input.type = "checkbox";
    input.className = "abi-settings-checkbox";
    const switchVisual = document.createElement("span");
    switchVisual.className = "abi-settings-switch";
    switchVisual.setAttribute("aria-hidden", "true");
    input.addEventListener("change", async () => {
      await chrome.storage.local.set({ [key]: input.checked });
      const panel = input.closest(".abi-extension-settings");
      if (panel) updateSettingsStatus(panel, await chrome.storage.local.get(settingsDefaults));
    });
    row.append(copy, input, switchVisual);
    return row;
  }

  function updateSettingsStatus(panel, settings) {
    const loaded = root.dataset.abiControlsLoaded;
    const wanted = settings.controls ? "on" : "off";
    const needsReload = Boolean(loaded && loaded !== wanted);
    const reload = panel.querySelector(".abi-settings-reload");
    reload.hidden = !needsReload;
    panel.querySelector(".abi-settings-footer").hidden = !needsReload;
  }

  function configureSettingsNavigation(nav, brand) {
    if (!nav.dataset.abiSettingsBound) {
      nav.dataset.abiSettingsBound = "true";
      nav.addEventListener("click", (event) => {
        const item = event.target.closest("li");
        if (!item || item.parentElement !== nav) return;
        if (item.classList.contains("abi-extension-brand")) {
          event.preventDefault();
          event.stopImmediatePropagation();
          if (settingsViewState) deactivateSettings(nav);
          else activateSettings(nav, item);
        } else if (settingsViewState) {
          deactivateSettings(nav);
        }
      }, true);
      nav.addEventListener("keydown", (event) => {
        const item = event.target.closest("li.abi-extension-brand");
        if (!item || item.parentElement !== nav || !["Enter", " "].includes(event.key)) return;
        event.preventDefault();
        if (settingsViewState) deactivateSettings(nav);
        else activateSettings(nav, item);
      });
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && settingsViewState) {
          deactivateSettings(document.querySelector(".main .nav"));
        }
      });
    }
    if (brand) {
      brand.setAttribute("aria-pressed", settingsViewState ? "true" : "false");
      brand.classList.toggle("current", Boolean(settingsViewState));
    }
  }

  function activateSettings(nav, brand) {
    const main = nav.closest(".main");
    if (!main) return;
    const panel = main.querySelector(":scope > .abi-extension-settings") || createSettingsPanel();
    if (!panel.isConnected) main.append(panel);
    const pages = [...main.children].filter((child) =>
      child !== nav &&
      !child.matches(".exit_btn2, .abi-extension-settings, .abi-rank-dialog"),
    );
    settingsViewState = {
      nav,
      brand,
      currentItem: nav.querySelector(":scope > li.current"),
      pages: pages.map((element) => ({
        element,
        hidden: element.hidden,
        display: element.style.getPropertyValue("display"),
        displayPriority: element.style.getPropertyPriority("display"),
      })),
    };
    for (const { element } of settingsViewState.pages) {
      element.style.setProperty("display", "none", "important");
    }
    settingsViewState.currentItem?.classList.remove("current");
    brand.classList.add("current");
    brand.setAttribute("aria-pressed", "true");
    panel.hidden = false;
  }

  function deactivateSettings(nav) {
    if (!settingsViewState) return;
    const state = settingsViewState;
    settingsViewState = null;
    const panel = state.nav.closest(".main")?.querySelector(":scope > .abi-extension-settings");
    if (panel) panel.hidden = true;
    for (const { element, hidden, display, displayPriority } of state.pages) {
      if (display) element.style.setProperty("display", display, displayPriority);
      else element.style.removeProperty("display");
      element.hidden = hidden;
    }
    state.brand.classList.remove("current");
    state.brand.setAttribute("aria-pressed", "false");
    state.currentItem?.classList.add("current");
    if (nav && nav !== state.nav) nav.querySelector(":scope > .abi-extension-brand")?.setAttribute("aria-pressed", "false");
  }

  function place(parent, node) {
    if (parent && node && node.parentElement !== parent) parent.append(node);
  }

  function setProgress(fill, percentage) {
    const target = `${Math.max(0, Math.min(percentage, 100))}%`;
    fill.dataset.abiProgressTarget = target;
    if (!fill.dataset.abiProgressReady) {
      fill.dataset.abiProgressReady = "true";
      fill.style.width = "0%";
      requestAnimationFrame(() => {
        if (fill.isConnected) fill.style.width = fill.dataset.abiProgressTarget;
      });
      return;
    }
    fill.style.width = target;
  }

  function updateText(node, value) {
    if (node && node.textContent !== value) node.textContent = value;
  }

  function updateHeaderSlot(nav) {
    const main = nav.closest(".main");
    if (!main) return;
    const style = getComputedStyle(nav);
    const innerWidth =
      nav.clientWidth -
      Number.parseFloat(style.paddingLeft) -
      Number.parseFloat(style.paddingRight);
    const gap = Number.parseFloat(style.columnGap) || 0;
    const slot = (innerWidth - gap * 5) / 6;
    if (Number.isFinite(slot) && slot > 0) {
      main.style.setProperty("--abi-header-slot", `${slot}px`);
    }
  }

  function updateColorKey(enabled) {
    const makeColorKey = (note) => {
      const fragment = document.createDocumentFragment();
      for (const [kind, label] of [
        ["teammate", "Teammates"],
        ["enemy", "Enemies"],
        ["scav", "Scavs (bots)"],
      ]) {
        const row = document.createElement("span");
        row.className = "abi-color-row";
        row.dataset.kind = kind;
        const swatch = document.createElement("span");
        swatch.className = "abi-color-swatch";
        swatch.setAttribute("aria-hidden", "true");
        const name = document.createElement("span");
        name.className = "abi-color-name";
        name.textContent = label;
        row.append(swatch, name);
        fragment.append(row);
      }
      note.replaceChildren(fragment);
    };

    for (const note of document.querySelectorAll(
      "#xcWorking .tips-content #p46_2",
    )) {
      if (!enabled) {
        if (note.classList.contains("abi-color-key")) {
          note.replaceChildren(note.dataset.abiOriginalText || "");
          note.classList.remove("abi-color-key");
          delete note.dataset.abiOriginalText;
        }
        continue;
      }

      if (note.classList.contains("abi-color-key")) continue;
      note.dataset.abiOriginalText = note.textContent;
      note.classList.add("abi-color-key");
      makeColorKey(note);
    }

    for (const panel of document.querySelectorAll(
      ".content.video:has(#drillButton)",
    )) {
      const practiceNote = findTestCaseNote(panel, "practice");
      let colorKey = panel.querySelector(".abi-test-color-key");
      if (!enabled) {
        colorKey?.remove();
        continue;
      }
      if (!colorKey) {
        colorKey = document.createElement("p");
        colorKey.className = "abi-color-key abi-test-color-key";
        colorKey.setAttribute("aria-label", "Inspection color key");
        panel.querySelector(".tips-content")?.append(colorKey);
      }
      if (colorKey.childElementCount === 0) makeColorKey(colorKey);
    }
  }

  function findTestCaseNote(panel, kind) {
    const id = kind === "practice" ? "p75_2" : "p75_1";
    const byId = panel.querySelector(`.tips-content #${id}`);
    if (byId) return byId;
    const pattern =
      kind === "practice"
        ? /practice cases|predetermined outcomes/i
        : /distance markers|color-coding/i;
    const content = panel.querySelector(".tips-content");
    const paragraphs = content ? [...content.querySelectorAll("p, li")] : [];
    const candidates = paragraphs.length ? paragraphs : [...(content?.children || [])];
    return candidates.find((note) => pattern.test(note.textContent)) || null;
  }

  function updateDrillCounters(enabled) {
    for (const span of document.querySelectorAll(
      ".content.video:has(#drillButton) .user-info .drill-data span",
    )) {
      if (!enabled) {
        if (span.dataset.abiOriginalText === undefined) continue;
        span.textContent = span.dataset.abiOriginalText;
        delete span.dataset.abiOriginalText;
        continue;
      }
      if (span.dataset.abiOriginalText === undefined) {
        span.dataset.abiOriginalText = span.textContent;
      }
      const label = span.classList.contains("str140")
        ? "Inspections"
        : span.classList.contains("str141")
          ? "Valid"
          : null;
      if (!label) continue;
      if (span.textContent !== label) span.textContent = label;
    }
  }

  function updateChallengeRewards(enabled) {
    const rewards = [...document.querySelectorAll("#wxPatrol .taks-gift > span")];
    for (const reward of rewards) {
      if (!enabled) {
        reward.classList.remove("abi-compact-reward");
        delete reward.dataset.abiRewardDisplay;
        if (reward.dataset.abiOriginalAriaLabel === "__none__") {
          reward.removeAttribute("aria-label");
        } else if (reward.dataset.abiOriginalAriaLabel !== undefined) {
          reward.setAttribute("aria-label", reward.dataset.abiOriginalAriaLabel);
        }
        delete reward.dataset.abiOriginalAriaLabel;
        continue;
      }

      const text = reward.textContent.trim();
      const amountMatch = text.match(/x\s*([\d,]+)\s*$/i);
      if (!amountMatch) continue;
      const amountText = amountMatch[1];
      const amount = Number(amountText?.replace(/,/g, ""));
      if (!Number.isFinite(amount) || amount <= 0) continue;
      const currency = reward.querySelector("em.str21, em.str169");
      const name = currency?.textContent.trim() ||
        text.slice(0, amountMatch.index).trim();
      if (!name) continue;
      const compact = (value) => value.toFixed(2).replace(/\.?0+$/, "");
      const label = /^(koen|coin)$/i.test(name)
        ? amount >= 1_000_000
          ? `${compact(amount / 1_000_000)}m ${name}`
          : amount >= 1_000
            ? `${compact(amount / 1_000)}k ${name}`
            : `${new Intl.NumberFormat("en").format(amount)} ${name}`
        : `${new Intl.NumberFormat("en").format(amount)} ${name}`;
      reward.dataset.abiRewardDisplay = label;
      reward.classList.add("abi-compact-reward");
      if (reward.dataset.abiOriginalAriaLabel === undefined) {
        reward.dataset.abiOriginalAriaLabel = reward.hasAttribute("aria-label")
          ? reward.getAttribute("aria-label")
          : "__none__";
      }
      reward.setAttribute("aria-label", label);
    }
  }

  function updateChallengeProgressLabels(enabled) {
    for (const row of document.querySelectorAll("#wxPatrol .taks-list > ul > li")) {
      const button = row.querySelector("a.taks-btn2");
      if (!button) continue;
      if (!enabled) {
        delete button.dataset.abiProgressDisplay;
        continue;
      }
      const progress = row.querySelector(".taks-info > span")?.textContent.trim();
      if (progress && button.dataset.abiProgressDisplay !== progress) {
        button.dataset.abiProgressDisplay = progress;
      }
    }
  }

  function updateInspectionNote(enabled) {
    const notes = new Set(
      document.querySelectorAll("#xcWorking .tips-content #p46_1"),
    );
    for (const panel of document.querySelectorAll(
      ".content.video:has(#drillButton)",
    )) {
      for (const kind of ["inspection", "practice"]) {
        const note = findTestCaseNote(panel, kind);
        if (note) notes.add(note);
      }
    }
    for (const note of notes) {
      if (!enabled) {
        if (note.classList.contains("abi-inspection-note") ||
            note.classList.contains("abi-practice-note")) {
          note.replaceChildren(note.dataset.abiOriginalText || "");
          note.classList.remove("abi-inspection-note", "abi-practice-note");
          delete note.dataset.abiOriginalText;
        }
        continue;
      }
      if (note.classList.contains("abi-inspection-note") ||
          note.classList.contains("abi-practice-note")) continue;
      note.dataset.abiOriginalText = note.textContent;
      if (note.id === "p75_2" || /practice cases|predetermined outcomes/i.test(note.textContent)) {
        note.classList.add("abi-practice-note");
        note.textContent = note.textContent.replace(/^\s*2\.\s*/, "").trim();
        continue;
      }
      note.classList.add("abi-inspection-note");
      const fragment = document.createDocumentFragment();
      fragment.append("Distance markers and character colors are ");
      const official = document.createElement("strong");
      official.textContent = "added by the official inspection system";
      fragment.append(official);
      fragment.append(" to help identify possible violations. They are ");
      const notSuspect = document.createElement("strong");
      notSuspect.textContent = "not effects created by the inspected player";
      fragment.append(notSuspect);
      fragment.append(" and do not, by themselves, indicate cheating.");
      note.replaceChildren(fragment);
    }
  }

  function updateInspectionTitle(enabled) {
    for (const title of document.querySelectorAll(".content.video .tips-title")) {
      if (!enabled) {
        if (title.dataset.abiOriginalText !== undefined) {
          title.textContent = title.dataset.abiOriginalText;
        }
        continue;
      }

      if (title.dataset.abiOriginalText === undefined) {
        title.dataset.abiOriginalText = title.textContent;
      }
      const label = title.closest(".content.video")?.querySelector("#drillButton")
        ? "Official Inspection Notes"
        : title.dataset.abiOriginalText.trim().replace(/\s*:?\s*$/, "");
      if (title.textContent !== label) title.textContent = label;
    }
  }

  function markGuidelinePhrase(node, phrase, kind, explanation = "") {
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const textNode = walker.currentNode;
      if (textNode.parentElement?.closest(".abi-guideline-mark")) continue;
      const text = textNode.nodeValue;
      const index = text.toLowerCase().indexOf(phrase.toLowerCase());
      if (index < 0) continue;
      const wrapper = document.createElement(kind === "term" ? "abbr" : "strong");
      wrapper.className = `abi-guideline-mark abi-guideline-${kind}`;
      if (explanation) wrapper.title = explanation;
      wrapper.textContent = text.slice(index, index + phrase.length);
      const fragment = document.createDocumentFragment();
      fragment.append(text.slice(0, index), wrapper, text.slice(index + phrase.length));
      textNode.replaceWith(fragment);
      return;
    }
  }

  function updateGuidelines(enabled) {
    const content = document.querySelector(
      ".box.notice .notice-main .notice-content.str83",
    );
    if (!content) return;

    if (!enabled) {
      if (!content.classList.contains("abi-guidelines")) return;
      const mainHeading = content.querySelector(".abi-guideline-main-heading");
      const mainPanel = content.closest(".notice-main");
      if (mainHeading && mainPanel) {
        mainHeading.classList.remove("abi-guideline-main-heading");
        mainPanel.insertBefore(mainHeading, content);
      }
      content.innerHTML = content.dataset.abiOriginalHtml || "";
      delete content.dataset.abiOriginalHtml;
      content.classList.remove("abi-guidelines");
      return;
    }
    if (content.classList.contains("abi-guidelines")) return;

    content.dataset.abiOriginalHtml = content.innerHTML;
    const mainHeading = content
      .closest(".notice-main")
      ?.querySelector(":scope > h4");
    const originalRules = new Map(
      [...content.querySelectorAll("[id^='p83_']")].map((rule) => [rule.id, rule]),
    );
    const penaltyHeading = [...content.querySelectorAll("h5")].find((heading) =>
      /penalties for inspector violations/i.test(heading.textContent),
    );
    const getRule = (id, className, stripMarker = true) => {
      const rule = originalRules.get(id);
      if (!rule) return null;
      rule.textContent = rule.textContent.trim().replace(
        stripMarker ? /^(?:\d+\.|[a-z]\))\s*/i : /$^/,
        "",
      );
      rule.classList.add(...className.split(/\s+/));
      return rule;
    };
    const appendRule = (parent, id, className = "abi-guideline-item") => {
      const rule = getRule(id, className);
      if (rule) parent.append(rule);
      return rule;
    };

    content.replaceChildren();
    content.classList.add("abi-guidelines");
    if (mainHeading) {
      mainHeading.classList.add("abi-guideline-main-heading");
      content.append(mainHeading);
    }

    const conduct = document.createElement("div");
    conduct.className = "abi-guideline-list";
    conduct.setAttribute("role", "list");
    const p1 = appendRule(conduct, "p83_1");
    const p2 = appendRule(conduct, "p83_2");
    const subrules = document.createElement("div");
    subrules.className = "abi-guideline-sublist";
    subrules.setAttribute("role", "list");
    for (const id of ["p83_3", "p83_4", "p83_5"]) {
      appendRule(subrules, id, "abi-guideline-item abi-guideline-subitem");
    }
    conduct.append(subrules);
    const p6 = appendRule(conduct, "p83_6");
    const p7 = appendRule(conduct, "p83_7");
    content.append(conduct);

    if (penaltyHeading) {
      penaltyHeading.className = "abi-guideline-penalty-heading";
      content.append(penaltyHeading);
    }

    const penaltyIntro = getRule("p83_8", "abi-guideline-penalty-intro", false);
    if (penaltyIntro) content.append(penaltyIntro);
    const penalties = document.createElement("div");
    penalties.className = "abi-guideline-list abi-guideline-penalties";
    penalties.setAttribute("role", "list");
    const p9 = appendRule(penalties, "p83_9");
    const p10 = appendRule(penalties, "p83_10");
    const p11 = appendRule(penalties, "p83_11");
    content.append(penalties);

    for (const [node, phrase] of [
      [p1, "fair gaming environment"],
      [p2, "serious, responsible, objective, and fair manner"],
      [content.querySelector("#p83_3"), "Game Security Penalty Rules"],
      [content.querySelector("#p83_4"), "Do not lend your account"],
      [content.querySelector("#p83_5"), "official video inspection feature"],
      [p6, "do not represent the official stance"],
      [p7, "immediately revoked"],
      [penaltyIntro, "impact and severity"],
      [p9, "Revocation of video inspection status"],
      [p10, "Termination of any official collaborations"],
      [p11, "Legal action may be taken"],
    ]) {
      if (node) markGuidelinePhrase(node, phrase, "emphasis");
    }
    for (const [node, term, explanation] of [
      [content.querySelector("#p83_5"), "third-party videos", "Videos from sources outside the official inspection system."],
      [content.querySelector("#p83_5"), "blackmail", "Threats used to force someone to act."],
      [content.querySelector("#p83_5"), "defamation", "False statements that harm someone's reputation."],
      [p6, "affiliate relationship", "An official association with the company."],
      [p11, "consequences", "The results or effects of an action."],
    ]) {
      if (node) markGuidelinePhrase(node, term, "term", explanation);
    }
  }

  function updateFaq(enabled) {
    const content = document.querySelector(
      ".box.notice .notice-main .notice-content.str84.faq",
    );
    if (!content) return;

    if (!enabled) {
      if (!content.classList.contains("abi-faq")) return;
      const heading = content.querySelector(".abi-guideline-main-heading");
      const mainPanel = content.closest(".notice-main");
      if (heading && mainPanel) {
        heading.classList.remove("abi-guideline-main-heading");
        mainPanel.insertBefore(heading, content);
      }
      content.innerHTML = content.dataset.abiOriginalHtml || "";
      delete content.dataset.abiOriginalHtml;
      delete content.dataset.abiFaqLayout;
      content.classList.remove("abi-faq");
      return;
    }
    if (content.dataset.abiFaqLayout === "routes-v3") return;

    if (content.dataset.abiOriginalHtml === undefined) {
      content.dataset.abiOriginalHtml = content.innerHTML;
    }
    const heading =
      content.querySelector(".abi-guideline-main-heading") ||
      content.closest(".notice-main")?.querySelector(":scope > h4");
    const entries = [...content.querySelectorAll("[id^='p84_']")].sort(
      (a, b) => Number(a.id.slice(4)) - Number(b.id.slice(4)),
    );
    const list = document.createElement("div");
    list.className = "abi-faq-list";
    list.setAttribute("role", "list");

    for (let index = 0; index < entries.length; index += 2) {
      const question = entries[index];
      let answer = entries[index + 1];
      if (!question || !answer) continue;

      const card = document.createElement("article");
      card.className = "abi-faq-card";
      card.setAttribute("role", "listitem");
      question.classList.add("abi-faq-question");
      answer.classList.add("abi-faq-answer");
      markGuidelinePhrase(question, "Q:", "faq-question-prefix");
      markGuidelinePhrase(answer, "A:", "faq-answer-prefix");
      if (/Inspector Community via the following methods/i.test(answer.textContent)) {
        const source = answer.textContent.replace(/\s+/g, " ").trim();
        const markers = [...source.matchAll(/([123])\\?[)）]\s*/g)];
        const firstRoute = markers[0]?.index ?? -1;
        const secondRoute = markers[1]?.index ?? -1;
        const thirdRoute = markers[2]?.index ?? -1;
        const conclusionMatch = source
          .slice(markers[2] ? markers[2].index + markers[2][0].length : 0)
          .match(/\bOnce you(?:'|’)ve entered the Inspector Community\b/i);
        const conclusionStart = conclusionMatch
          ? markers[2].index + markers[2][0].length + conclusionMatch.index
          : source.length;
        if (firstRoute >= 0 && secondRoute > firstRoute && thirdRoute > secondRoute) {
          const routeStart = (marker) => marker.index + marker[0].length;
          const structuredAnswer = document.createElement("div");
          structuredAnswer.id = answer.id;
          structuredAnswer.className = "abi-faq-answer";

          const lead = document.createElement("p");
          lead.className = "abi-faq-answer-lead";
          const prefix = document.createElement("strong");
          prefix.className = "abi-guideline-mark abi-guideline-faq-answer-prefix";
          prefix.textContent = "A:";
          lead.append(prefix, ` ${source.slice(0, firstRoute).replace(/^A:\s*/i, "").trim()}`);

          const routes = document.createElement("ol");
          routes.className = "abi-faq-routes";
          const routeTexts = [
            source.slice(routeStart(markers[0]), secondRoute),
            source.slice(routeStart(markers[1]), thirdRoute),
            source.slice(routeStart(markers[2]), conclusionStart),
          ];
          for (const route of routeTexts) {
            const item = document.createElement("li");
            item.textContent = route.trim();
            routes.append(item);
          }

          const conclusion = document.createElement("p");
          conclusion.className = "abi-faq-route-conclusion";
          conclusion.textContent = source.slice(conclusionStart).trim();
          structuredAnswer.append(lead, routes, conclusion);
          answer.replaceWith(structuredAnswer);
          answer = structuredAnswer;
          entries[index + 1] = answer;
        }
      }
      card.append(question, answer);
      list.append(card);
    }

    const faqById = new Map(entries.map((entry) => [entry.id, entry]));
    for (const [id, phrase] of [
      ["p84_2", "excellent gaming record"],
      ["p84_4", "inspection practices"],
      ["p84_8", "Violation Found"],
      ["p84_8", "No Violation Found"],
      ["p84_12", "player searching, aiming, and firing"],
      ["p84_14", "correct verdict"],
      ["p84_16", "official team"],
      ["p84_18", "not an effect of cheating"],
      ["p84_20", "Teaming with Cheaters"],
      ["p84_24", "will be reset"],
      ["p84_26", "evaluated in real time"],
      ["p84_28", "limited-time item"],
      ["p84_30", "exclusive Inspector rewards"],
      ["p84_32", "revocation of Inspector status"],
      ["p84_34", "50 upgrade points"],
      ["p84_34", "250 upgrade points per day"],
    ]) {
      const node = faqById.get(id);
      if (node) markGuidelinePhrase(node, phrase, "emphasis");
    }
    for (const [id, term, explanation] of [
      ["p84_10", "Insufficient Evidence", "Choose this when the video does not provide enough information for a clear verdict."],
      ["p84_10", "Video Error", "Choose this when a technical problem prevents a fair review."],
      ["p84_20", "Teaming with Cheaters", "Players working together with cheaters to gain an unfair advantage."],
      ["p84_34", "upgrade points", "Points earned for accurate inspections that contribute to Inspector progression."],
    ]) {
      const node = faqById.get(id);
      if (node) markGuidelinePhrase(node, term, "term", explanation);
    }

    content.replaceChildren();
    content.classList.add("abi-faq");
    if (heading) {
      heading.classList.add("abi-guideline-main-heading");
      content.append(heading);
    }
    content.append(list);
    content.dataset.abiFaqLayout = "routes-v3";
  }

  function restoreRewards(dialog) {
    const table = document.querySelector("#wxMine .grade-popup table");
    if (!dialog || !table) return;
    const rows = [...table.querySelectorAll("tbody tr")];
    [...dialog.querySelectorAll(".abi-rank-card")].forEach((card, index) => {
      const cell = rows[index]?.children[4];
      if (!cell) return;
      const image = card.querySelector("img");
      const label = card.querySelector(".abi-rank-reward span");
      if (label?.dataset.abiOriginalReward !== undefined) {
        label.innerHTML = label.dataset.abiOriginalReward;
        delete label.dataset.abiOriginalReward;
      }
      if (label) {
        delete label.dataset.abiKoenAmount;
        label.removeAttribute("aria-label");
        label.classList.remove("abi-koen-amount");
      }
      image?.classList.remove("abi-koen-icon");
      if (image) cell.append(image);
      if (label) cell.append(label);
    });
  }

  function restoreOverview(profile) {
    if (!profile) return;
    const shell = profile.parentElement?.querySelector(":scope > .abi-overview");
    const dialog = document.querySelector("#wxMine > .abi-rank-dialog");
    restoreRewards(dialog);
    const working = profile.querySelector("#gotoWorking");
    for (const selector of [
      ".avatar",
      ".username",
      ".userid",
      ".honor",
      ".abi-rank-progress",
      ".grade",
    ]) {
      const node = shell?.querySelector(selector);
      if (!node) continue;
      if (working) profile.insertBefore(node, working);
      else profile.append(node);
    }
    shell?.remove();
    profile.parentElement
      ?.querySelector(":scope > .abi-overview-cards")
      ?.remove();
    dialog?.remove();
  }

  function ensureDialog(host) {
    let dialog = host.querySelector(":scope > .abi-rank-dialog");
    if (dialog) return dialog;
    dialog = document.createElement("div");
    dialog.className = "abi-rank-dialog";
    dialog.hidden = true;

    const panel = document.createElement("div");
    panel.className = "abi-rank-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "true");
    panel.setAttribute("aria-labelledby", "abi-rank-title");

    const header = document.createElement("header");
    header.className = "abi-rank-head";
    const title = document.createElement("h2");
    title.id = "abi-rank-title";
    title.textContent = "Rank rules";
    const close = document.createElement("button");
    close.type = "button";
    close.className = "abi-rank-close";
    close.textContent = "Close";
    header.append(title, close);

    const list = document.createElement("div");
    list.className = "abi-rank-list";
    panel.append(header, list);
    dialog.append(panel);
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.hidden = true;
    });
    close.addEventListener("click", () => {
      dialog.hidden = true;
      host.querySelector(".abi-rank-open")?.focus();
    });
    host.append(dialog);
    return dialog;
  }

  function syncRankDialog(profile, levelText) {
    const host = document.querySelector("#wxMine") || profile.parentElement;
    const popup = profile.parentElement?.querySelector(".grade-popup");
    const table = popup?.querySelector("table");
    if (!host || !table) return;
    const dialog = ensureDialog(host);
    const heading = popup.querySelector("h3")?.textContent.trim();
    const title = dialog.querySelector("#abi-rank-title");
    if (heading && title.textContent !== heading) title.textContent = heading;

    const rows = [...table.querySelectorAll("tbody tr")];
    const list = dialog.querySelector(".abi-rank-list");
    rows.forEach((row, index) => {
      const cells = [...row.children];
      if (cells.length < 5) return;
      let card = list.children[index];
      if (!card) {
        card = document.createElement("article");
        card.className = "abi-rank-card";
        const main = document.createElement("div");
        main.className = "abi-rank-card-main";
        const name = document.createElement("h3");
        const detail = document.createElement("p");
        main.append(name, detail);
        const bonus = document.createElement("div");
        bonus.className = "abi-rank-bonus";
        const reward = document.createElement("div");
        reward.className = "abi-rank-reward";
        card.append(main, bonus, reward);
        list.append(card);
      }
      const rankTitle = cells[0].textContent.trim();
      const inspections = cells[1].textContent.trim();
      const accuracy = cells[2].textContent.trim();
      const bonusValue = cells[3].textContent.trim();
      updateText(card.querySelector("h3"), rankTitle);
      const accuracyLabel =
        !accuracy || accuracy === "/" ? "No accuracy gate" : `${accuracy} recent accuracy`;
      updateText(
        card.querySelector("p"),
        `${inspections} successful inspections · ${accuracyLabel}`,
      );
      updateText(
        card.querySelector(".abi-rank-bonus"),
        !bonusValue || bonusValue === "/" ? "—" : `${bonusValue} bonus XP`,
      );
      const reward = card.querySelector(".abi-rank-reward");
      const image = cells[4].querySelector("img");
      const label = cells[4].querySelector("span");
      const koenLabel = label?.textContent.match(/Koen\s*x\s*([\d,]+)/i);
      if (koenLabel && label.dataset.abiOriginalReward === undefined) {
        label.dataset.abiOriginalReward = label.innerHTML;
        label.dataset.abiKoenAmount = koenLabel[1].replace(/,/g, "");
      }
      const koenAmount = Number(label?.dataset.abiKoenAmount);
      if (Number.isFinite(koenAmount) && koenAmount > 0) {
        const compactAmount =
          koenAmount >= 1_000_000 && koenAmount % 1_000_000 === 0
            ? `${koenAmount / 1_000_000}m`
            : koenAmount >= 1_000 && koenAmount % 1_000 === 0
              ? `${koenAmount / 1_000}k`
              : new Intl.NumberFormat().format(koenAmount);
        if (label.textContent !== compactAmount) label.textContent = compactAmount;
        label.setAttribute("aria-label", `${compactAmount} Koen`);
        label.classList.add("abi-koen-amount");
        if (label.parentElement !== reward) reward.append(label);
        if (image) {
          image.classList.add("abi-koen-icon");
          if (image.parentElement !== reward) reward.append(image);
          if (label.nextElementSibling !== image) reward.insertBefore(label, image);
        }
      } else {
        if (image && image.parentElement !== reward) reward.prepend(image);
        if (label && label.parentElement !== reward) reward.append(label);
      }
      const currentName = rankTitle.toLowerCase().split("+")[0].trim();
      card.classList.toggle(
        "is-current",
        Boolean(currentName) && levelText.toLowerCase().includes(currentName),
      );
    });
    while (list.children.length > rows.length) list.lastElementChild.remove();
  }

  function createRankIcon() {
    const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    icon.setAttribute("viewBox", "0 0 24 24");
    icon.setAttribute("class", "abi-rank-icon");
    icon.setAttribute("aria-hidden", "true");

    const shield = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path",
    );
    shield.setAttribute(
      "d",
      "M12 2.5 19.5 5.4v6.1c0 4.8-3 8.3-7.5 10-4.5-1.7-7.5-5.2-7.5-10V5.4L12 2.5Z",
    );
    const star = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path",
    );
    star.setAttribute(
      "d",
      "m12 6.1 1.45 2.96 3.27.48-2.36 2.3.56 3.25L12 13.55l-2.92 1.54.56-3.25-2.36-2.3 3.27-.48L12 6.1Z",
    );
    icon.append(shield, star);
    return icon;
  }

  function updateOverview(enabled) {
    const overview = document.querySelector("#wxMine > .user");
    const profile = overview?.querySelector(":scope > .user-info");
    const sourceStats = overview?.querySelector(":scope > .user-data");
    const stats = sourceStats?.querySelector(".statistics");
    if (!overview || !profile || !stats) return;

    if (!enabled) {
      restoreOverview(profile);
      return;
    }

    overview.querySelector(":scope > .abi-overview-cards")?.remove();
    let shell = overview.querySelector(":scope > .abi-overview");
    if (!shell) {
      shell = document.createElement("div");
      shell.className = "abi-overview";
      const identity = document.createElement("section");
      identity.className = "abi-identity";
      identity.setAttribute("aria-label", "Inspector profile");
      const person = document.createElement("div");
      person.className = "abi-identity-person";
      const rank = document.createElement("div");
      rank.className = "abi-identity-rank";
      const titleRow = document.createElement("div");
      titleRow.className = "abi-title-row";
      const rules = document.createElement("button");
      rules.type = "button";
      rules.className = "abi-rank-open";
      rules.setAttribute("aria-label", "Display ranks");
      rules.title = "Display ranks";
      rules.append(createRankIcon());
      titleRow.append(rules);
      const meter = document.createElement("div");
      meter.className = "abi-meter";
      rank.append(titleRow, meter);
      identity.append(person, rank);
      const board = document.createElement("div");
      board.className = "abi-board";
      board.setAttribute("aria-label", "Inspection statistics");
      shell.append(identity, board);
      overview.append(shell);
    }
    shell.querySelector(":scope > .abi-overview-head")?.remove();

    const person = shell.querySelector(".abi-identity-person");
    const titleRow = shell.querySelector(".abi-title-row");
    const meter = shell.querySelector(".abi-meter");
    const avatar =
      profile.querySelector(":scope > .avatar") ||
      person?.querySelector(":scope > .avatar");
    const username = profile.querySelector(":scope > .username") || shell.querySelector(".username");
    const userid = profile.querySelector(":scope > .userid") || shell.querySelector(".userid");
    const honor = profile.querySelector(":scope > .honor") || shell.querySelector(".honor");
    place(person, titleRow);
    if (avatar && avatar.parentElement !== person) {
      person.insertBefore(avatar, person.firstChild);
    }
    if (username && username.parentElement !== person) {
      person.insertBefore(username, titleRow);
    }
    if (userid && userid.parentElement !== person) person.insertBefore(userid, titleRow);
    if (username && userid && username.nextElementSibling !== userid) {
      person.insertBefore(username, userid);
    } else if (username && !userid && username.nextElementSibling !== titleRow) {
      person.insertBefore(username, titleRow);
    }
    if (userid && userid.nextElementSibling !== titleRow) {
      person.insertBefore(userid, titleRow);
    }
    if (honor && titleRow && honor.parentElement !== titleRow) titleRow.append(honor);
    const rulesButton = titleRow?.querySelector(":scope > .abi-rank-open");
    if (rulesButton) {
      if (!rulesButton.querySelector(".abi-rank-icon")) {
        rulesButton.replaceChildren(createRankIcon());
      }
      if (rulesButton !== titleRow.firstElementChild) {
        titleRow.prepend(rulesButton);
      }
    }

    let cards = shell.querySelector(".abi-board");
    let progress = shell.querySelector(".abi-rank-progress") || profile.querySelector(".abi-rank-progress");
    const grade = profile.querySelector(":scope > .grade") || shell.querySelector(".grade");
    place(shell.querySelector(".abi-identity-rank"), grade);

    if (cards && cards.querySelector(":scope > .abi-stat-card") && !cards.querySelector(".abi-stat-values")) {
      cards.replaceChildren();
    }

    const statValues = [...stats.querySelectorAll(":scope > li:not(.record)")];
    if (statValues.length < 5) return;

    const readValue = (index) =>
      statValues[index]?.querySelector("strong")?.textContent.trim() || "—";
    const total = readValue(0);
    const weekly = readValue(1);
    const successful = readValue(2);
    const recentAccuracy = readValue(3);
    const bans = readValue(4);

    const parseCount = (value) => Number(value.replace(/[^\d]/g, "")) || 0;
    const totalCount = parseCount(total);
    const successfulCount = parseCount(successful);
    const overallAccuracy = totalCount
      ? `${((successfulCount / totalCount) * 100).toFixed(2)}%`
      : "—";

    const recordRows = stats.querySelectorAll(
      ".record #judgePunishRecord > li:not(:first-child)",
    );
    const lastBan = [...recordRows]
      .map((row) => row.querySelector("span")?.textContent.trim() || "")
      .filter((value) => /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(value))
      .sort()
      .at(-1);

    if (cards && !cards.querySelector(".abi-stat-card")) {
      for (const [className, label] of [
        ["abi-stat-accuracy", "Inspection accuracy"],
        ["abi-stat-volume", "Inspection volume"],
        ["abi-stat-successful", "Successful inspections"],
        ["abi-stat-bans", "Number of bans"],
      ]) {
        const card = document.createElement("section");
        card.className = `abi-stat-card ${className}`;
        const heading = document.createElement("h3");
        heading.textContent = label;
        const values = document.createElement("div");
        values.className = "abi-stat-values";
        card.append(heading, values);
        cards.append(card);
      }
    }

    const orderedCards = [
      ".abi-stat-accuracy",
      ".abi-stat-volume",
      ".abi-stat-successful",
      ".abi-stat-bans",
    ]
      .map((selector) => cards.querySelector(selector))
      .filter(Boolean);
    if (
      orderedCards.some((card, index) => cards.children[index] !== card)
    ) {
      cards.append(...orderedCards);
    }
    updateText(
      cards.querySelector(".abi-stat-accuracy > h3"),
      "Inspection accuracy",
    );

    const renderStat = (cardClass, label, value) => {
      const card = cards.querySelector(`.${cardClass} .abi-stat-values`);
      if (!card) return;
      let valueNode = card.querySelector(`[data-stat="${label}"]`);
      if (!valueNode) {
        valueNode = document.createElement("div");
        valueNode.className = "abi-stat-item";
        valueNode.dataset.stat = label;
        const name = document.createElement("span");
        name.className = "abi-stat-label";
        name.textContent =
          {
            total: "Total",
            week: "This week",
            successful: "Lifetime",
            "recent-accuracy": "Recent accuracy",
            bans: "Bans",
            "overall-accuracy": "Overall accuracy",
            "last-ban": "Last ban",
          }[label] || label;
        const number = document.createElement("strong");
        valueNode.append(name, number);
        card.append(valueNode);
      }
      const number = valueNode.querySelector("strong");
      if (number.textContent !== value) number.textContent = value;
    };

    renderStat("abi-stat-volume", "total", total);
    renderStat("abi-stat-volume", "week", weekly);
    renderStat("abi-stat-successful", "successful", successful);
    renderStat("abi-stat-accuracy", "recent-accuracy", recentAccuracy);
    renderStat("abi-stat-accuracy", "overall-accuracy", overallAccuracy);
    renderStat("abi-stat-bans", "bans", bans);

    let daysAgo = null;
    if (lastBan) {
      const [banYear, banMonth, banDate] = lastBan
        .slice(0, 10)
        .split("-")
        .map(Number);
      const now = new Date();
      const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
      const banDay = Date.UTC(banYear, banMonth - 1, banDate);
      daysAgo = Math.max(0, Math.floor((today - banDay) / 86_400_000));
    }
    const lastBanLabel =
      daysAgo === null
        ? "No ban recorded"
        : daysAgo === 0
          ? "Today"
          : daysAgo === 1
            ? "1 day ago"
            : `${daysAgo} days ago`;
    renderStat("abi-stat-bans", "last-ban", lastBanLabel);
    const lastBanValue = cards.querySelector('[data-stat="last-ban"] strong');
    if (lastBanValue && lastBan) lastBanValue.title = lastBan;

    const levelText =
      profile.querySelector("#level-text")?.textContent.trim() ||
      shell.querySelector("#level-text")?.textContent.trim() ||
      "";
    const inspectorLevel = Number(
      (
        profile.querySelector("#exp_level") ||
        shell.querySelector("#exp_level")
      )?.textContent.replace(/[^\d]/g, ""),
    ) || 0;
    const currentIndex = ranks.findIndex((rank) =>
      levelText.toLowerCase().includes(rank.title.toLowerCase()),
    );
    const expertRank = ranks.at(-1);
    const nextRank =
      ranks.find((rank) => rank.required > successfulCount) ||
      (inspectorLevel < expertRank.levelRequired ? expertRank : null);
    if (!progress) {
      progress = document.createElement("div");
      progress.className = "abi-rank-progress";
    }
    place(meter, progress);

    let levelProgress = shell.querySelector(".abi-level-progress");
    if (!levelProgress) {
      levelProgress = document.createElement("div");
      levelProgress.className = "abi-level-progress";
      const label = document.createElement("span");
      label.className = "abi-level-label";
      const count = document.createElement("strong");
      count.className = "abi-level-count";
      const track = document.createElement("span");
      track.className = "abi-level-track";
      const fill = document.createElement("span");
      fill.className = "abi-level-fill";
      track.append(fill);
      levelProgress.append(label, count, track);
      shell.querySelector(".abi-identity-rank")?.append(levelProgress);
    }
    let levelCaption = levelProgress.querySelector(".abi-level-caption");
    if (!levelCaption) {
      levelCaption = document.createElement("span");
      levelCaption.className = "abi-level-caption";
      levelProgress.append(levelCaption);
    }
    const levelPercent = Math.min(inspectorLevel / 35, 1) * 100;
    updateText(levelProgress.querySelector(".abi-level-label"), "Inspector level");
    const levelCount = levelProgress.querySelector(".abi-level-count");
    if (!levelCount.querySelector(".abi-level-current")) {
      const current = document.createElement("span");
      current.className = "abi-level-current";
      const maximum = document.createElement("span");
      maximum.className = "abi-level-maximum";
      levelCount.replaceChildren(current, document.createTextNode(" / "), maximum);
    }
    updateText(levelCount.querySelector(".abi-level-current"), String(inspectorLevel));
    updateText(levelCount.querySelector(".abi-level-maximum"), "35");
    updateText(
      levelCaption,
      `${inspectorLevel} of 35 levels completed`,
    );
    const levelTrack = levelProgress.querySelector(".abi-level-track");
    const levelFill = levelTrack.querySelector(".abi-level-fill");
    setProgress(levelFill, levelPercent);
    levelTrack.setAttribute("role", "progressbar");
    levelTrack.setAttribute("aria-valuemin", "0");
    levelTrack.setAttribute("aria-valuemax", "35");
    levelTrack.setAttribute("aria-valuenow", String(inspectorLevel));
    levelTrack.setAttribute(
      "aria-label",
      `Inspector level ${inspectorLevel} of 35`,
    );

    const ensureChild = (className, tag) => {
      let node = progress.querySelector(`:scope > .${className}`);
      if (!node) {
        node = document.createElement(tag);
        node.className = className;
        progress.append(node);
      }
      return node;
    };
    const kickerNode = ensureChild("abi-rank-kicker", "span");
    const percentNode = ensureChild("abi-rank-percent", "span");
    const captionNode = ensureChild("abi-rank-caption", "span");
    const countNode = ensureChild("abi-rank-count", "strong");
    let track = progress.querySelector(":scope > .abi-rank-track");
    if (!track) {
      track = document.createElement("span");
      track.className = "abi-rank-track";
      progress.append(track);
    }
    let fill = track.querySelector(":scope > .abi-rank-fill");
    if (!fill) {
      fill = document.createElement("span");
      fill.className = "abi-rank-fill";
      track.append(fill);
    }

    const atTop =
      !nextRank &&
      (currentIndex >= ranks.length - 1 ||
        successfulCount >= ranks.at(-1).required);
    const rankKicker = nextRank ? "Next rank" : atTop ? "Current rank" : "Rank";
    const rankLabel = nextRank
      ? nextRank.title
      : atTop
        ? levelText || "Highest inspection rank"
        : "Rank progress";
    const expertPending = nextRank === expertRank;
    const rankCount = nextRank
      ? `${successful} / ${nextRank.required}${expertPending ? ` · Lv. ${inspectorLevel} / ${expertRank.levelRequired}` : ""}`
      : `${successful} successful inspections`;
    const fillRatio = nextRank
      ? expertPending
        ? (Math.min(successfulCount / nextRank.required, 1) +
            Math.min(inspectorLevel / expertRank.levelRequired, 1)) /
          2
        : Math.min(successfulCount / nextRank.required, 1)
      : 1;
    const percent = Math.round(fillRatio * 100);
    updateText(kickerNode, rankKicker);
    updateText(captionNode, rankLabel);
    updateText(countNode, rankCount);
    updateText(percentNode, `${percent}%`);
    setProgress(fill, fillRatio * 100);
    track.setAttribute("role", "progressbar");
    track.setAttribute("aria-valuemin", "0");
    track.setAttribute("aria-valuemax", "100");
    track.setAttribute("aria-valuenow", String(percent));
    track.setAttribute("aria-valuetext", `${percent} percent, ${rankCount}`);
    track.setAttribute("aria-label", `${rankKicker}: ${rankLabel}`);
    syncRankDialog(profile, levelText);
    const rules = shell.querySelector(".abi-rank-open");
    const dialog = document.querySelector("#wxMine > .abi-rank-dialog");
    if (rules && dialog && !rules.dataset.abiBound) {
      rules.dataset.abiBound = "1";
      rules.addEventListener("click", () => {
        dialog.hidden = false;
        dialog.querySelector(".abi-rank-close")?.focus();
      });
    }
  }

  function scheduleUpdate() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(updateNavigation);
  }

  window.addEventListener("resize", scheduleUpdate, { passive: true });

  const observerConfig = {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: [
      "class",
      "data-abi-site",
      "data-abi-inspection-notes",
      "data-abi-color-key",
      "data-abi-controls",
    ],
    characterData: true,
  };
  const observer = new MutationObserver(scheduleUpdate);
  observer.observe(document.documentElement, observerConfig);

  updateNavigation();
})();
