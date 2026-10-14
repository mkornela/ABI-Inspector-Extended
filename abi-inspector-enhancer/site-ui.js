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
  let lastNavTab = null;
  document.addEventListener("abi:overview-updated", scheduleUpdate);
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    const dialog = document.querySelector("#wxMine > .abi-rank-dialog");
    if (!dialog || dialog.hidden) return;
    dialog.hidden = true;
    document.querySelector("#wxMine .abi-rank-open")?.focus();
  });
  document.addEventListener("click", (event) => {
    const navItem = event.target.closest(".main .nav li, .nav li, #mine, a[href*='mine']");
    if (!navItem) return;
    if (navItem.id === "mine" || navItem.textContent.includes("Overview") || navItem.matches(".str22")) {
      const mineHost = document.querySelector("#wxMine");
      if (mineHost) {
        for (const el of mineHost.querySelectorAll("[data-abi-progress-ready]")) {
          delete el.dataset.abiProgressReady;
          if (el.classList.contains("abi-today-ring-fill")) {
            el.style.strokeDashoffset = "320.44";
          } else {
            el.style.width = "0%";
          }
        }
      }
      scheduleUpdate();
    }
  }, true);

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

    const activeTab = nav.querySelector("li.current");
    const isInspectionTab = Boolean(
      activeTab?.id === "working" ||
      activeTab?.id === "drill" ||
      activeTab?.classList.contains("str24") ||
      activeTab?.classList.contains("str26"),
    );
    const shouldShowBrand = enabled && !isInspectionTab;
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
    updateWorkbenchStatus(enabled);
    updateInspectorProfile(enabled);
    updateExitButton(enabled);
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
      actions.append(identity, home, logout, security);
      topNav.append(actions);
    }

    const userName = actions.querySelector(".abi-account-name-text");
    if (userName && userName.textContent !== sourceName.textContent) {
      userName.textContent = sourceName.textContent;
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
    const langBtn = topNav.querySelector("#langBtn") || document.querySelector("#langBtn");
    if (toolbarEnabled) {
      if (langBtn && langBtn.parentElement !== actions) {
        actions.append(langBtn);
      }
    } else if (langBtn && langBtn.parentElement === actions) {
      topNav.insertBefore(langBtn, actions);
    }
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
      "#wxMine .abi-level-percent",
      "#wxMine .abi-level-current",
      "#wxMine .abi-level-maximum",
      "#wxMine .abi-level-caption",
      "#wxMine .abi-level-label",
      "#wxMine .abi-level-xp",
      "#wxMine .abi-today-count",
      "#wxMine .abi-today-remaining",
      "#wxMine .abi-stat-trend",
      "#wxMine .abi-stat-sublabel",
      "#wxMine .abi-stat-item strong",
      "#wxMine .abi-period-total strong",
      "#wxMine .abi-legend-item",
      "#wxMine .abi-inspection-accuracy",
      "#wxMine .abi-inspection-bans strong",
      "#wxMine .abi-stat-delta",
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
      "#wxMine .abi-rank-fill, #wxMine .abi-level-fill, #wxMine .abi-today-fill, #wxPatrol .task-progress > div",
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
    site: true,
    playerVolume: 100,
    playbackSpeed: 1,
    autoPlay: false,
    loopVideo: false,
    inspectionNotes: true,
    colorKey: true,
    verdictEnhancements: true,
    verdictHotkeys: false,
  };

  function createSettingsPanel() {
    const panel = document.createElement("section");
    panel.className = "abi-extension-settings";

    const body = document.createElement("div");
    body.className = "abi-settings-body";

    // 1. Playback Card
    const playback = document.createElement("section");
    playback.className = "abi-settings-group";
    playback.setAttribute("aria-labelledby", "abi-settings-playback-title");
    const playbackHead = document.createElement("div");
    playbackHead.className = "abi-settings-section-heading";
    const playbackIndex = document.createElement("span");
    playbackIndex.className = "abi-settings-index";
    playbackIndex.textContent = "01";
    const playbackTitle = document.createElement("h2");
    playbackTitle.id = "abi-settings-playback-title";
    playbackTitle.textContent = "Playback";
    playbackHead.append(playbackTitle, playbackIndex);
    playback.append(playbackHead);

    const controlRow = makeSettingsToggle(
      "abi-settings-controls",
      "controls",
      "Video controls & shortcuts",
      "Show the local player toolbar, frame-by-frame navigation, and playback shortcuts.",
    );
    const autoPlayRow = makeSettingsToggle(
      "abi-settings-autoplay",
      "autoPlay",
      "Auto-play on load",
      "Start playback automatically when opening an inspection case.",
    );
    const loopRow = makeSettingsToggle(
      "abi-settings-loop",
      "loopVideo",
      "Loop playback",
      "Automatically repeat the evidence video when reaching the end.",
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

    const volumePresets = document.createElement("div");
    volumePresets.className = "abi-volume-presets";
    for (const [pLabel, pVal] of [["Mute (0%)", 0], ["50%", 50], ["100%", 100]]) {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "abi-volume-chip";
      chip.textContent = pLabel;
      chip.addEventListener("click", () => {
        volumeSlider.value = String(pVal);
        volumeOutput.value = `${pVal}%`;
        volumeSlider.style.setProperty("--abi-volume-fill", `${pVal}%`);
        chrome.storage.local.set({ playerVolume: pVal });
      });
      volumePresets.append(chip);
    }

    volumeRow.append(volumeHeading, volumeHelp, volumeSlider, volumePresets);

    const speedRow = document.createElement("div");
    speedRow.className = "abi-settings-speed";
    const speedLabel = document.createElement("label");
    speedLabel.textContent = "Default playback speed";
    const speedOutput = document.createElement("output");
    speedOutput.textContent = "1×";
    const speedHeading = document.createElement("div");
    speedHeading.className = "abi-settings-speed-heading";
    speedHeading.append(speedLabel, speedOutput);

    const speedHelp = document.createElement("p");
    speedHelp.textContent = "Initial speed applied to new inspection videos.";

    const speedPresets = document.createElement("div");
    speedPresets.className = "abi-speed-presets";
    const speedRates = [1, 1.25, 1.5, 2];
    for (const rate of speedRates) {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "abi-speed-chip";
      chip.dataset.speed = String(rate);
      chip.textContent = `${rate}×`;
      chip.addEventListener("click", () => {
        speedPresets.querySelectorAll(".abi-speed-chip").forEach((c) => c.classList.toggle("active", c === chip));
        speedOutput.textContent = `${rate}×`;
        chrome.storage.local.set({ playbackSpeed: rate });
      });
      speedPresets.append(chip);
    }
    speedRow.append(speedHeading, speedHelp, speedPresets);

    playback.append(controlRow, autoPlayRow, loopRow, volumeRow, speedRow);

    // 2. Interface & Overview Card
    const interfaceGroup = document.createElement("section");
    interfaceGroup.className = "abi-settings-group";
    interfaceGroup.setAttribute("aria-labelledby", "abi-settings-interface-title");
    const interfaceHead = document.createElement("div");
    interfaceHead.className = "abi-settings-section-heading";
    const interfaceIndex = document.createElement("span");
    interfaceIndex.className = "abi-settings-index";
    interfaceIndex.textContent = "02";
    const interfaceTitle = document.createElement("h2");
    interfaceTitle.id = "abi-settings-interface-title";
    interfaceTitle.textContent = "Interface & Overview";
    interfaceHead.append(interfaceTitle, interfaceIndex);
    interfaceGroup.append(
      interfaceHead,
      makeSettingsToggle(
        "abi-settings-site",
        "site",
        "Site modifications",
        "Enable custom overview stats board, responsive layout, tab navigation, and verdict dialogs.",
      ),
    );

    // Streamer / Privacy toggle
    const privacyRow = document.createElement("label");
    privacyRow.className = "abi-settings-toggle";
    privacyRow.htmlFor = "abi-settings-privacy";
    const privacyCopy = document.createElement("span");
    privacyCopy.className = "abi-settings-copy";
    const privacyStrong = document.createElement("strong");
    privacyStrong.textContent = "Streamer / Privacy mode";
    const privacyHelp = document.createElement("small");
    privacyHelp.textContent = "Anonymize player name, ID, rank XP, and sensitive inspection data for streams or screenshots.";
    privacyCopy.append(privacyStrong, privacyHelp);
    const privacyInput = document.createElement("input");
    privacyInput.id = "abi-settings-privacy";
    privacyInput.type = "checkbox";
    privacyInput.className = "abi-settings-checkbox";
    privacyInput.checked = privacyAnonymized;
    const privacySwitch = document.createElement("span");
    privacySwitch.className = "abi-settings-switch";
    privacySwitch.setAttribute("aria-hidden", "true");
    privacyInput.addEventListener("change", () => {
      privacyAnonymized = privacyInput.checked;
      try {
        localStorage.setItem(privacyStorageKey, String(privacyAnonymized));
      } catch {}
      scheduleUpdate();
    });
    privacyRow.append(privacyCopy, privacyInput, privacySwitch);
    interfaceGroup.append(privacyRow);

    // 3. Workbench & Verdicts Card
    const display = document.createElement("section");
    display.className = "abi-settings-group";
    display.setAttribute("aria-labelledby", "abi-settings-display-title");
    const displayHead = document.createElement("div");
    displayHead.className = "abi-settings-section-heading";
    const displayIndex = document.createElement("span");
    displayIndex.className = "abi-settings-index";
    displayIndex.textContent = "03";
    const displayTitle = document.createElement("h2");
    displayTitle.id = "abi-settings-display-title";
    displayTitle.textContent = "Workbench & Verdicts";
    displayHead.append(displayTitle, displayIndex);
    display.append(
      displayHead,
      makeSettingsToggle(
        "abi-settings-verdict-enhancements",
        "verdictEnhancements",
        "Verdict dialog enhancements",
        "English violation placeholders, character counters (x / 50), and 3-category limit badge.",
      ),
      makeSettingsToggle(
        "abi-settings-verdict-hotkeys",
        "verdictHotkeys",
        "Quick verdict hotkeys",
        "Press 1 or G (Violation), 2 or U (Uncertain), 3 or I (No Violation) on the workbench.",
      ),
      makeSettingsToggle(
        "abi-settings-notes",
        "inspectionNotes",
        "Enhanced inspection notice",
        "Use the enhanced, concise notice. Turn off to restore original site wording.",
      ),
      makeSettingsToggle(
        "abi-settings-color-key",
        "colorKey",
        "Role & distance color key",
        "Color-code markers for teammates (green), enemies (amber), and scavs/bots (blue).",
      ),
    );

    // 4. About & System Card
    const about = document.createElement("section");
    about.className = "abi-settings-group abi-settings-about";
    about.setAttribute("aria-labelledby", "abi-settings-about-title");
    const aboutHead = document.createElement("div");
    aboutHead.className = "abi-settings-section-heading";
    const aboutIndex = document.createElement("span");
    aboutIndex.className = "abi-settings-index";
    aboutIndex.textContent = "04";
    const aboutTitle = document.createElement("h2");
    aboutTitle.id = "abi-settings-about-title";
    aboutTitle.textContent = "About & System";
    aboutHead.append(aboutTitle, aboutIndex);

    const aboutInfo = document.createElement("div");
    aboutInfo.className = "abi-settings-about-line";
    const aboutCopy = document.createElement("p");
    aboutCopy.textContent = "ABI Inspector Extended";
    const badgesWrap = document.createElement("div");
    badgesWrap.className = "abi-settings-badges";
    const aboutVersion = document.createElement("span");
    aboutVersion.className = "abi-settings-version";
    aboutVersion.textContent = `v${chrome.runtime?.getManifest?.()?.version || "2.5.1"}`;
    const statusBadge = document.createElement("span");
    statusBadge.className = "abi-settings-status-badge";
    statusBadge.textContent = "Active";
    badgesWrap.append(aboutVersion, statusBadge);
    aboutInfo.append(aboutCopy, badgesWrap);

    const actionsRow = document.createElement("div");
    actionsRow.className = "abi-settings-actions-row";

    const resetBtn = document.createElement("button");
    resetBtn.type = "button";
    resetBtn.className = "abi-settings-btn abi-settings-btn-neutral";
    resetBtn.textContent = "Restore Defaults";
    resetBtn.addEventListener("click", async () => {
      await chrome.storage.local.set(settingsDefaults);
      privacyAnonymized = false;
      try {
        localStorage.setItem(privacyStorageKey, "false");
      } catch {}
      const setCheck = (selector, val) => {
        const el = panel.querySelector(selector);
        if (el) el.checked = val;
      };
      setCheck("#abi-settings-controls", true);
      setCheck("#abi-settings-autoplay", false);
      setCheck("#abi-settings-loop", false);
      setCheck("#abi-settings-site", true);
      setCheck("#abi-settings-privacy", false);
      setCheck("#abi-settings-verdict-enhancements", true);
      setCheck("#abi-settings-verdict-hotkeys", false);
      setCheck("#abi-settings-notes", true);
      setCheck("#abi-settings-color-key", true);
      volumeSlider.value = "100";
      volumeOutput.value = "100%";
      volumeSlider.style.setProperty("--abi-volume-fill", "100%");
      speedOutput.textContent = "1×";
      speedPresets.querySelectorAll(".abi-speed-chip").forEach((c) => c.classList.toggle("active", c.dataset.speed === "1"));
      scheduleUpdate();
      const prevText = resetBtn.textContent;
      resetBtn.textContent = "Defaults restored ✓";
      resetBtn.disabled = true;
      setTimeout(() => {
        resetBtn.textContent = prevText;
        resetBtn.disabled = false;
      }, 1500);
    });

    const reloadBtn = document.createElement("button");
    reloadBtn.type = "button";
    reloadBtn.className = "abi-settings-btn abi-settings-btn-accent abi-settings-reload-btn";
    reloadBtn.textContent = "Reload page to apply";
    reloadBtn.hidden = true;
    reloadBtn.addEventListener("click", () => location.reload());

    actionsRow.append(resetBtn, reloadBtn);

    const creditsRow = document.createElement("div");
    creditsRow.className = "abi-settings-credits";
    const creditsText = document.createElement("span");
    creditsText.textContent = "Local preferences for Arena Breakout: Infinite inspection workbench. ";
    const creditsAuthor = document.createElement("span");
    creditsAuthor.className = "abi-settings-author";
    creditsAuthor.innerHTML = 'Made by <a href="https://github.com/mkornela" target="_blank" rel="noopener noreferrer">deem</a>';
    creditsRow.append(creditsText, creditsAuthor);

    about.append(aboutHead, aboutInfo, actionsRow, creditsRow);

    body.append(playback, interfaceGroup, display, about);
    panel.append(body);

    chrome.storage.local.get(settingsDefaults, (settings) => {
      const current = settings || settingsDefaults;
      const setCheck = (selector, val) => {
        const el = panel.querySelector(selector);
        if (el) el.checked = Boolean(val);
      };
      setCheck("#abi-settings-controls", current.controls);
      setCheck("#abi-settings-autoplay", current.autoPlay);
      setCheck("#abi-settings-loop", current.loopVideo);
      setCheck("#abi-settings-site", current.site);
      setCheck("#abi-settings-privacy", privacyAnonymized);
      setCheck("#abi-settings-verdict-enhancements", current.verdictEnhancements);
      setCheck("#abi-settings-verdict-hotkeys", current.verdictHotkeys);
      setCheck("#abi-settings-notes", current.inspectionNotes);
      setCheck("#abi-settings-color-key", current.colorKey);

      const vol = current.playerVolume ?? 100;
      volumeSlider.value = String(vol);
      volumeOutput.value = `${vol}%`;
      volumeSlider.style.setProperty("--abi-volume-fill", `${vol}%`);

      const currentSpeed = Number(current.playbackSpeed) || 1;
      speedOutput.textContent = `${currentSpeed}×`;
      speedPresets.querySelectorAll(".abi-speed-chip").forEach((c) => {
        c.classList.toggle("active", Math.abs(Number(c.dataset.speed) - currentSpeed) < 0.01);
      });

      updateSettingsStatus(panel, current);
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
    const reload = panel.querySelector(".abi-settings-reload-btn, .abi-settings-reload");
    if (reload) reload.hidden = !needsReload;
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
    if (typeof window !== "undefined" && window.setProgress && window.setProgress !== setProgress) {
      window.setProgress(fill, percentage);
      return;
    }
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
    for (const video of document.querySelectorAll(
      ":is(.box.drill, #wxDrill) .content.video, .content.video:has(#drillButton)",
    )) {
      const userInfo = video.querySelector(".user-info");
      let drillCard = video.querySelector(".abi-drill-card");
      const drillDataList = video.querySelectorAll(".drill-data");

      if (!enabled) {
        if (drillCard) {
          if (userInfo) {
            for (const item of drillDataList) {
              userInfo.appendChild(item);
            }
          }
          drillCard.remove();
        }
        for (const item of drillDataList) {
          const span = item.querySelector("span");
          if (span && span.dataset.abiOriginalText !== undefined) {
            span.textContent = span.dataset.abiOriginalText;
            delete span.dataset.abiOriginalText;
          }
        }
        continue;
      }

      for (const item of drillDataList) {
        const span = item.querySelector("span");
        if (!span) continue;
        if (span.dataset.abiOriginalText === undefined) {
          span.dataset.abiOriginalText = span.textContent;
        }
        const label = span.classList.contains("str140")
          ? "Inspections"
          : span.classList.contains("str141")
            ? "Valid"
            : null;
        if (label && span.textContent !== label) span.textContent = label;
      }

      if (!drillCard) {
        drillCard = document.createElement("div");
        drillCard.className = "abi-drill-card";
        const header = document.createElement("div");
        header.className = "abi-status-header";
        const title = document.createElement("div");
        title.className = "abi-status-title";
        title.textContent = "Practice Cases";
        header.appendChild(title);
        drillCard.appendChild(header);

        const grid = document.createElement("div");
        grid.className = "abi-drill-grid";
        for (const item of drillDataList) {
          grid.appendChild(item);
        }
        drillCard.appendChild(grid);

        if (userInfo) {
          userInfo.after(drillCard);
        } else {
          video.prepend(drillCard);
        }
      } else {
        if (userInfo && userInfo.nextElementSibling !== drillCard) {
          userInfo.after(drillCard);
        }
        let grid = drillCard.querySelector(".abi-drill-grid");
        if (!grid) {
          grid = document.createElement("div");
          grid.className = "abi-drill-grid";
          drillCard.appendChild(grid);
        }
        for (const item of drillDataList) {
          if (item.parentElement !== grid) grid.appendChild(item);
        }
      }
    }
  }

  function updateWorkbenchStatus(enabled) {
    for (const rogue of document.querySelectorAll(
      ".box.drill .abi-status-card, #wxDrill .abi-status-card, .content.video:has(#drillButton) .abi-status-card",
    )) {
      rogue.remove();
    }

    for (const video of document.querySelectorAll(
      "#xcWorking > .content.video, #xcWorking.content.video",
    )) {
      const userInfo = video.querySelector(".user-info");
      const status = video.querySelector(".user-status");
      let card = video.querySelector(".abi-status-card");

      if (!enabled) {
        card?.remove();
        if (status) status.style.display = "";
        const span = status?.querySelector(".str73");
        if (span) span.style.display = "";
        const strong = status?.querySelector("#dayTotalJudgedNum, strong");
        if (strong) strong.style.display = "";
        continue;
      }

      const countEl = status?.querySelector("#dayTotalJudgedNum, strong") || video.querySelector("#dayTotalJudgedNum");
      const domText = countEl?.textContent?.trim();
      const domCount = domText !== "" && domText !== undefined ? parseInt(domText, 10) : NaN;
      const summaryCount = window.__abiOverviewData?.userJudgeSummary?.day_judged_num;
      
      // Prefer live DOM count if valid; otherwise fallback to summaryCount.
      let count = Number.isFinite(domCount) ? domCount : (summaryCount !== undefined ? Number(summaryCount) : 0);
      if (summaryCount !== undefined && Number.isFinite(domCount)) {
        count = Math.max(domCount, Number(summaryCount));
      }
      
      // Keep overview data in sync with live count on workbench
      if (window.__abiOverviewData?.userJudgeSummary && Number.isFinite(count) && count > (window.__abiOverviewData.userJudgeSummary.day_judged_num || 0)) {
        window.__abiOverviewData.userJudgeSummary.day_judged_num = count;
      }

      const max = Number(window.__abiOverviewData?.userJudgeSummary?.day_permit_num) || 20;
      const remaining = Math.max(0, max - count);
      const percent = Math.min(100, Math.max(0, (count / max) * 100));

      if (status) status.style.setProperty("display", "none", "important");

      if (!card) {
        card = document.createElement("div");
        card.className = "abi-status-card";
        if (userInfo) {
          userInfo.after(card);
        } else if (status) {
          status.after(card);
        }
      } else if (userInfo && userInfo.nextElementSibling !== card) {
        userInfo.after(card);
      }

      const numEl = card.querySelector(".abi-status-num");
      const slashEl = card.querySelector(".abi-status-slash");
      const fillEl = card.querySelector(".abi-status-fill");
      const remEl = card.querySelector(".abi-status-remaining");
      const trackEl = card.querySelector(".abi-status-track");

      if (numEl && slashEl && fillEl && remEl && trackEl) {
        if (numEl.textContent !== String(count)) numEl.textContent = String(count);
        if (slashEl.textContent !== ` / ${max}`) slashEl.textContent = ` / ${max}`;
        if (fillEl.style.width !== `${percent}%`) fillEl.style.width = `${percent}%`;
        if (remEl.textContent !== `${remaining} cases remaining today`) remEl.textContent = `${remaining} cases remaining today`;
        trackEl.setAttribute("aria-valuenow", String(count));
        trackEl.setAttribute("aria-valuemax", String(max));
      } else {
        card.innerHTML = `
          <div class="abi-status-header">
            <div class="abi-status-title">Inspected Today</div>
            <div class="abi-status-count"><strong class="abi-status-num">${count}</strong><span class="abi-status-slash"> / ${max}</span></div>
          </div>
          <div class="abi-status-track" role="progressbar" aria-valuenow="${count}" aria-valuemin="0" aria-valuemax="${max}">
            <div class="abi-status-fill" style="width: ${percent}%;"></div>
          </div>
          <div class="abi-status-remaining">${remaining} cases remaining today</div>
        `;
      }
    }
  }

  function updateInspectorProfile(enabled) {
    for (const userid of document.querySelectorAll(
      ":is(#xcWorking, .content.video) .userid",
    )) {
      let copyBtn = userid.querySelector(".abi-copy-id-btn");
      if (!enabled) {
        copyBtn?.remove();
        userid.style.width = "";
        userid.style.maxWidth = "";
        userid.style.overflow = "";
        continue;
      }

      userid.style.setProperty("width", "auto", "important");
      userid.style.setProperty("max-width", "100%", "important");
      userid.style.setProperty("overflow", "visible", "important");

      if (!copyBtn) {
        copyBtn = document.createElement("button");
        copyBtn.type = "button";
        copyBtn.className = "abi-copy-id-btn";
        copyBtn.title = "Copy User ID";
        copyBtn.setAttribute("aria-label", "Copy User ID");

        const copySvg = `<svg class="abi-copy-icon" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>`;
        const checkSvg = `<svg class="abi-copy-check" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#37cf88" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;

        copyBtn.innerHTML = copySvg;

        copyBtn.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          const idSpan = userid.querySelector("[id^='roleOpenid']");
          const text = idSpan?.textContent?.trim() || "";
          if (!text) return;
          const setCopied = () => {
            copyBtn.innerHTML = checkSvg;
            copyBtn.classList.add("copied");
            setTimeout(() => {
              copyBtn.innerHTML = copySvg;
              copyBtn.classList.remove("copied");
            }, 1500);
          };
          if (navigator.clipboard?.writeText) {
            navigator.clipboard.writeText(text).then(setCopied).catch(setCopied);
          } else {
            const ta = document.createElement("textarea");
            ta.value = text;
            ta.style.position = "fixed";
            ta.style.opacity = "0";
            document.body.append(ta);
            ta.select();
            document.execCommand("copy");
            ta.remove();
            setCopied();
          }
        });
        userid.append(copyBtn);
      }
    }
  }

  function updateExitButton(enabled) {
    const nav = document.querySelector(".main .nav");
    const exitBtn = document.querySelector(".exit_btn2");
    if (!nav || !exitBtn) return;
    if (!enabled) {
      exitBtn.style.setProperty("display", "none", "important");
      const operation = document.querySelector(
        ":is(#xcWorking, .content.video) .operation",
      );
      if (operation && exitBtn.parentElement === nav) {
        operation.append(exitBtn);
      }
      return;
    }
    const activeTab = nav.querySelector("li.current");
    const isInspectionTab = Boolean(
      activeTab?.id === "working" ||
      activeTab?.id === "drill" ||
      activeTab?.classList.contains("str24") ||
      activeTab?.classList.contains("str26"),
    );
    if (exitBtn.parentElement !== nav) {
      nav.append(exitBtn);
    }
    if (isInspectionTab) {
      exitBtn.style.setProperty("display", "inline-flex", "important");
    } else {
      exitBtn.style.setProperty("display", "none", "important");
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
      if (button?.dataset.abiProgressDisplay) {
        delete button.dataset.abiProgressDisplay;
      }
      const info = row.querySelector(".taks-info");
      const prog = row.querySelector(".task-progress");
      if (!enabled) {
        if (prog && info && prog.parentElement !== info) {
          info.appendChild(prog);
        }
        continue;
      }
      if (prog && info && prog.parentElement === info) {
        row.appendChild(prog);
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
    for (const video of document.querySelectorAll(":is(#xcWorking, .content.video)")) {
      const title = video.querySelector(".tips-title");
      const content = video.querySelector(".tips-content");
      if (!title) continue;

      if (!enabled) {
        if (content && title.parentElement === content) {
          content.before(title);
        }
        if (title.dataset.abiOriginalText !== undefined) {
          title.textContent = title.dataset.abiOriginalText;
        }
        continue;
      }

      if (title.dataset.abiOriginalText === undefined) {
        title.dataset.abiOriginalText = title.textContent;
      }
      const label = video.querySelector("#drillButton")
        ? "Official Inspection Notes"
        : title.dataset.abiOriginalText.trim().replace(/\s*:?\s*$/, "");
      if (title.textContent !== label) title.textContent = label;

      if (content && title.parentElement !== content) {
        content.prepend(title);
      }
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
    const copyBtn = shell?.querySelector(".abi-copy-id") || profile.querySelector(".abi-copy-id");
    copyBtn?.remove();
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
      const titleRow = document.createElement("div");
      titleRow.className = "abi-identity-honor abi-title-row";
      const kicker = document.createElement("span");
      kicker.className = "abi-rank-current-kicker";
      kicker.textContent = "CURRENT RANK";
      const rules = document.createElement("button");
      rules.type = "button";
      rules.className = "abi-rank-open";
      rules.setAttribute("aria-label", "Display ranks");
      rules.title = "Display ranks";
      rules.append(createRankIcon());
      titleRow.append(kicker, rules);
      const meter = document.createElement("div");
      meter.className = "abi-meter";
      identity.append(person, titleRow, meter);
      const board = document.createElement("div");
      board.className = "abi-board";
      board.setAttribute("aria-label", "Inspection statistics");
      shell.append(identity, board);
      overview.append(shell);
      let wasVisible = false;
      const entrance = new IntersectionObserver(([entry]) => {
        if (!shell.isConnected) { entrance.disconnect(); return; }
        const visible = entry.isIntersecting;
        if (visible && !wasVisible && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
          shell.querySelectorAll(".abi-identity > div, .abi-stat-card").forEach((node, index) => {
            node.animate([{ opacity: 0, transform: "translateY(8px)" }, { opacity: 1, transform: "translateY(0)" }],
              { duration: 340, delay: index * 35, easing: "ease-out", fill: "backwards" });
          });
          shell.querySelectorAll(".abi-rank-fill, .abi-level-fill").forEach((node) => {
            if (!document.documentElement.hasAttribute("data-abi-anonymized")) node.animate(
              [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }],
              { duration: 850, delay: 100, easing: "cubic-bezier(.2,.8,.2,1)", fill: "backwards" });
          });
        }
        wasVisible = visible;
      });
      entrance.observe(shell);
    }
    shell.querySelector(":scope > .abi-overview-head")?.remove();

    const identity = shell.querySelector(".abi-identity");
    const person = shell.querySelector(".abi-identity-person");
    let titleRow = shell.querySelector(".abi-identity-honor") || shell.querySelector(".abi-title-row");
    if (!titleRow) {
      titleRow = document.createElement("div");
      titleRow.className = "abi-identity-honor abi-title-row";
    } else {
      titleRow.classList.add("abi-identity-honor", "abi-title-row");
    }
    const meter = shell.querySelector(".abi-meter");
    const oldRank = shell.querySelector(".abi-identity-rank");
    if (oldRank && identity) {
      while (oldRank.firstChild) identity.insertBefore(oldRank.firstChild, oldRank);
      oldRank.remove();
    }
    if (identity && titleRow.parentElement !== identity) {
      identity.insertBefore(titleRow, meter || null);
    }

    const avatar =
      profile.querySelector(":scope > .avatar") ||
      person?.querySelector(":scope > .avatar");
    const username = profile.querySelector(":scope > .username") || shell.querySelector(".username");
    const userid = profile.querySelector(":scope > .userid") || shell.querySelector(".userid");
    const honor = profile.querySelector(":scope > .honor") || shell.querySelector(".honor");
    if (avatar && avatar.parentElement !== person) {
      person.insertBefore(avatar, person.firstChild);
    }
    if (username && username.parentElement !== person) {
      person.append(username);
    }
    if (userid && userid.parentElement !== person) person.append(userid);
    if (username && userid && username.nextElementSibling !== userid) {
      person.insertBefore(username, userid);
    }
    if (userid && !userid.querySelector(".abi-copy-id")) {
      const copyBtn = document.createElement("button");
      copyBtn.type = "button";
      copyBtn.className = "abi-copy-id";
      copyBtn.setAttribute("aria-label", "Copy user ID");
      copyBtn.title = "Copy user ID";
      copyBtn.innerHTML = `<svg viewBox="0 0 16 16" width="10" height="10" fill="currentColor"><path d="M4 2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2z"/></svg>`;
      copyBtn.addEventListener("click", async (e) => {
        e.stopPropagation();
        const raw = userid.querySelector("span")?.textContent || userid.textContent || "";
        const idText = raw.replace(/[^\w\d_-]/g, "");
        if (idText) {
          try {
            await navigator.clipboard.writeText(idText);
            copyBtn.classList.add("abi-copied");
            copyBtn.title = "Copied!";
            setTimeout(() => {
              copyBtn.classList.remove("abi-copied");
              copyBtn.title = "Copy user ID";
            }, 1800);
          } catch {}
        }
      });
      userid.append(copyBtn);
    }
    let currentKicker = titleRow?.querySelector(".abi-rank-current-kicker");
    if (!currentKicker && titleRow) {
      currentKicker = document.createElement("span");
      currentKicker.className = "abi-rank-current-kicker";
      currentKicker.textContent = "CURRENT RANK";
      titleRow.prepend(currentKicker);
    }
    const rulesButton = titleRow?.querySelector(".abi-rank-open");
    if (rulesButton && !rulesButton.querySelector(".abi-rank-icon")) {
      rulesButton.replaceChildren(createRankIcon());
    }
    if (honor && titleRow && honor.parentElement !== titleRow) {
      titleRow.append(honor);
    }
    titleRow?.querySelector(".abi-rank-rules-hint")?.remove();

    let cards = shell.querySelector(".abi-board");
    let progress = shell.querySelector(".abi-rank-progress") || profile.querySelector(".abi-rank-progress");
    const grade = profile.querySelector(":scope > .grade") || shell.querySelector(".grade");
    place(identity, grade);

    if (cards && cards.querySelector(":scope > .abi-stat-card") && !cards.querySelector(".abi-stat-values")) {
      cards.replaceChildren();
    }

    const statValues = [...stats.querySelectorAll(":scope > li:not(.record)")];
    if (statValues.length < 5) return;

    const readValue = (index) =>
      statValues[index]?.querySelector("strong")?.textContent.trim() || "—";
    const total = readValue(0);
    const successful = readValue(2);
    const recentAccuracy = readValue(3);
    const bans = readValue(4);
    const live = window.__abiOverviewData || {};
    const summary = live.userJudgeSummary || {};
    const weekSummary = live.userWeekJudgeSummary || {};
    const growth = live.userGrowthSummary || {};
    const count = (value) => Number.isFinite(value) ? value.toLocaleString("en-US") : "—";
    const parseCount = (value) => Number(String(value).replace(/[^\d]/g, "")) || 0;
    const totalCount = parseCount(total);
    const successfulCount = parseCount(successful);
    const bansCount = parseCount(bans);
    const recentAccuracyNum = parseFloat(recentAccuracy.replace(/[^\d.]/g, "")) || null;
    const lifeWrong = Number.isFinite(summary.life_wrong_case_num) ? summary.life_wrong_case_num : 0;

    const calculateAccuracy = (periodKey, { correct, wrong, summaryAccuracy }) => {
      const resolved = (correct || 0) + (wrong || 0);
      if (resolved === 0) return null;

      if (periodKey === "weekly") {
        return (correct / resolved) * 100;
      }
      if (periodKey === "overall") {
        return Number.isFinite(summaryAccuracy) ? summaryAccuracy / 100 : null;
      }
      if (periodKey === "season") {
        return Number.isFinite(summaryAccuracy) ? summaryAccuracy / 100 : (correct > 0 ? (correct / resolved) * 100 : null);
      }
      return null;
    };

    const weeklyAccuracyNum = calculateAccuracy("weekly", {
      correct: weekSummary.week_right_num,
      wrong: weekSummary.week_wrong_num,
    });
    const seasonAccuracyNum = calculateAccuracy("season", {
      correct: summary.season_right_case_num,
      wrong: summary.season_wrong_case_num,
      summaryAccuracy: summary.season_accuracy,
    });
    const lifeAccuracyNum = calculateAccuracy("overall", {
      correct: successfulCount,
      wrong: lifeWrong,
      summaryAccuracy: summary.life_accuracy,
    });

    const formatAccuracy = (val) =>
      val !== null && Number.isFinite(val) ? `${val.toFixed(1)}%` : "--";

    const getAccuracyTier = (val) => {
      if (val === null || !Number.isFinite(val)) return null;
      if (val >= 90) return "high";
      if (val >= 80) return "good";
      if (val >= 70) return "warning";
      return "critical";
    };

    const recordRows = stats.querySelectorAll(
      ".record #judgePunishRecord > li:not(:first-child)",
    );
    const lastBan = [...recordRows]
      .map((row) => row.querySelector("span")?.textContent.trim() || "")
      .filter((value) => /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(value))
      .sort()
      .at(-1);

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
    const lastBanShort = daysAgo === null ? "None" : daysAgo === 0 ? "Today" : `${daysAgo}d ago`;

    cards.querySelectorAll(".abi-stat-volume, .abi-stat-season, .abi-stat-weekly").forEach((node) => node.remove());

    const cardDefs = [
      ["abi-stat-inspections", "Inspections"],
      ["abi-stat-accuracy", "Inspection accuracy"],
      ["abi-stat-today", "Today"],
    ];

    for (const [className, label] of cardDefs) {
      let card = cards.querySelector(`.${className}`);
      if (!card) {
        card = document.createElement("section");
        card.className = `abi-stat-card ${className}`;
        const heading = document.createElement("h3");
        heading.textContent = label;
        const values = document.createElement("div");
        values.className = "abi-stat-values";
        card.append(heading, values);
        cards.append(card);
      }
    }

    const orderedCards = cardDefs
      .map(([className]) => cards.querySelector(`.${className}`))
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
    updateText(
      cards.querySelector(".abi-stat-today > h3"),
      "Today",
    );
    updateText(
      cards.querySelector(".abi-stat-inspections > h3"),
      "Inspections",
    );

    // 1. Accuracy Card
    const accuracyValues = cards.querySelector(".abi-stat-accuracy .abi-stat-values");
    if (accuracyValues) {
      let hero = accuracyValues.querySelector(".abi-accuracy-hero");
      if (!hero) {
        hero = document.createElement("div");
        hero.className = "abi-accuracy-hero";
        accuracyValues.append(hero);
      }
      let recentItem = hero.querySelector('[data-stat="recent-accuracy"]');
      if (!recentItem) {
        recentItem = document.createElement("div");
        recentItem.className = "abi-stat-item";
        recentItem.dataset.stat = "recent-accuracy";
        const label = document.createElement("span");
        label.className = "abi-stat-label";
        label.textContent = "Recent";
        const strong = document.createElement("strong");
        recentItem.append(label, strong);
        hero.append(recentItem);
      }
      const recentStrong = recentItem.querySelector("strong");
      updateText(recentStrong, formatAccuracy(recentAccuracyNum));
      const recentTier = getAccuracyTier(recentAccuracyNum);
      if (recentTier) recentItem.dataset.tier = recentTier;
      else delete recentItem.dataset.tier;

      let trend = recentItem.querySelector(".abi-stat-trend");
      if (recentAccuracyNum !== null && lifeAccuracyNum !== null) {
        if (!trend) {
          trend = document.createElement("span");
          trend.className = "abi-stat-trend";
          recentItem.append(trend);
        }
        const delta = recentAccuracyNum - lifeAccuracyNum;
        if (delta > 0) {
          updateText(trend, `↗ ${delta.toFixed(1)} pts above lifetime`);
          trend.dataset.direction = "up";
        } else if (delta < 0) {
          updateText(trend, `↘ ${Math.abs(delta).toFixed(1)} pts below lifetime`);
          trend.dataset.direction = "down";
        } else {
          updateText(trend, `• 0.0 pts vs lifetime`);
          trend.dataset.direction = "flat";
        }
        trend.title = `Recent (${recentAccuracyNum.toFixed(1)}%) compared to Lifetime (${lifeAccuracyNum.toFixed(1)}%)`;
      } else {
        trend?.remove();
      }

      let rows = accuracyValues.querySelector(".abi-accuracy-rows");
      if (!rows) {
        rows = document.createElement("div");
        rows.className = "abi-accuracy-rows";
        accuracyValues.append(rows);
      }

      const rowsConfig = [
        {
          key: "weekly-accuracy",
          label: "Weekly",
          num: weeklyAccuracyNum,
          tooltip: "Calculated from correct / (correct + wrong) this week; unresolved inspections are excluded.",
          deltaType: "diff",
        },
        {
          key: "seasonal-accuracy",
          label: "Seasonal",
          num: seasonAccuracyNum,
          tooltip: "Calculated from season inspection data.",
          deltaType: "diff",
        },
        {
          key: "overall-accuracy",
          label: "Overall",
          num: lifeAccuracyNum,
          tooltip: "Calculated from lifetime inspection data.",
          deltaType: "none",
        },
      ];

      for (const conf of rowsConfig) {
        let item = rows.querySelector(`[data-stat="${conf.key}"]`);
        if (!item) {
          item = document.createElement("div");
          item.className = "abi-stat-item";
          item.dataset.stat = conf.key;
          const label = document.createElement("span");
          label.className = "abi-stat-label";
          label.textContent = conf.label;
          const right = document.createElement("div");
          right.className = "abi-stat-right";
          const delta = document.createElement("span");
          delta.className = "abi-stat-delta";
          const strong = document.createElement("strong");
          right.append(delta, strong);
          item.append(label, right);
          rows.append(item);
        } else {
          const right = item.querySelector(".abi-stat-right");
          const strong = right?.querySelector("strong");
          const delta = right?.querySelector(".abi-stat-delta");
          if (right && delta && strong && delta.nextElementSibling !== strong) {
            right.append(delta, strong);
          }
        }
        item.title = conf.tooltip;
        const tier = getAccuracyTier(conf.num);
        if (tier) item.dataset.tier = tier;
        else delete item.dataset.tier;
        updateText(item.querySelector("strong"), formatAccuracy(conf.num));

        const deltaNode = item.querySelector(".abi-stat-delta");
        if (conf.deltaType === "none" || !conf.deltaType) {
          deltaNode.className = "abi-stat-delta";
          updateText(deltaNode, "");
        } else {
          if (conf.num !== null && lifeAccuracyNum !== null) {
            const diff = conf.num - lifeAccuracyNum;
            const diffSign = diff > 0 ? "+" : "";
            updateText(deltaNode, `${diffSign}${diff.toFixed(1)}%`);
            deltaNode.className = `abi-stat-delta ${diff > 0 ? "abi-delta-positive" : diff < 0 ? "abi-delta-negative" : "abi-delta-flat"}`;
          } else {
            deltaNode.className = "abi-stat-delta";
            updateText(deltaNode, "");
          }
        }
      }
    }

    // 2. Today Card
    const todayValues = cards.querySelector(".abi-stat-today .abi-stat-values");
    if (todayValues) {
      let wrap = todayValues.querySelector(".abi-today-wrap");
      if (!wrap) {
        wrap = document.createElement("div");
        wrap.className = "abi-today-wrap";
        const ringBox = document.createElement("div");
        ringBox.className = "abi-today-ring-box";
        ringBox.setAttribute("role", "progressbar");
        ringBox.setAttribute("aria-label", "Today's inspection quota");

        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("class", "abi-today-ring");
        svg.setAttribute("width", "110");
        svg.setAttribute("height", "110");
        svg.setAttribute("viewBox", "0 0 110 110");

        const track = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        track.setAttribute("class", "abi-today-ring-track");
        track.setAttribute("cx", "55");
        track.setAttribute("cy", "55");
        track.setAttribute("r", "51");
        track.setAttribute("fill", "none");
        track.setAttribute("stroke-width", "8");

        const fill = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        fill.setAttribute("class", "abi-today-ring-fill abi-today-fill");
        fill.setAttribute("cx", "55");
        fill.setAttribute("cy", "55");
        fill.setAttribute("r", "51");
        fill.setAttribute("fill", "none");
        fill.setAttribute("stroke-width", "8");
        fill.setAttribute("stroke-linecap", "round");

        svg.append(track, fill);

        const center = document.createElement("div");
        center.className = "abi-today-center abi-today-count";
        const done = document.createElement("strong");
        done.className = "abi-today-done";
        const limitWrap = document.createElement("span");
        limitWrap.className = "abi-today-limit-wrap";
        limitWrap.append(document.createTextNode("of "), Object.assign(document.createElement("span"), { className: "abi-today-limit" }));
        center.append(done, document.createTextNode(" "), limitWrap);

        ringBox.append(svg, center);

        const remaining = document.createElement("span");
        remaining.className = "abi-today-remaining";

        wrap.append(ringBox, remaining);
        todayValues.replaceChildren(wrap);
      }

      const dayDone = Number.isFinite(summary.day_judged_num) ? summary.day_judged_num : null;
      const dayLimit = Number.isFinite(summary.day_permit_num) ? summary.day_permit_num : null;
      const dayReady = dayDone !== null && dayLimit !== null;
      const dayPercent = dayReady && dayLimit > 0 ? Math.min(100, Math.round((dayDone / dayLimit) * 100)) : 0;

      const ringBox = wrap.querySelector(".abi-today-ring-box");
      const todayFill = wrap.querySelector(".abi-today-fill");
      const todayRemaining = wrap.querySelector(".abi-today-remaining");
      const doneNode = wrap.querySelector(".abi-today-done");
      const limitNode = wrap.querySelector(".abi-today-limit");

      updateText(doneNode, count(dayDone));
      updateText(limitNode, count(dayLimit));

      ringBox.setAttribute("aria-valuenow", String(dayDone ?? 0));
      ringBox.setAttribute("aria-valuemax", String(dayLimit ?? 100));

      const RING_RADIUS = 51;
      const RING_CIRCUMFERENCE = +(2 * Math.PI * RING_RADIUS).toFixed(2); // 320.44

      const setRingProgress = (fillNode, percentage) => {
        const clamped = Math.max(0, Math.min(percentage, 100));
        const target = `${clamped}%`;
        fillNode.dataset.abiProgressTarget = target;
        const offset = RING_CIRCUMFERENCE * (1 - clamped / 100);
        fillNode.style.strokeDasharray = `${RING_CIRCUMFERENCE}`;
        if (!fillNode.dataset.abiProgressReady) {
          fillNode.dataset.abiProgressReady = "true";
          fillNode.style.strokeDashoffset = `${RING_CIRCUMFERENCE}`;
          requestAnimationFrame(() => {
            if (fillNode.isConnected) fillNode.style.strokeDashoffset = `${offset}`;
          });
          return;
        }
        fillNode.style.strokeDashoffset = `${offset}`;
      };

      setRingProgress(todayFill, dayPercent);

      if (dayReady) {
        if (dayDone >= dayLimit && dayLimit > 0) {
          updateText(todayRemaining, "Daily quota complete ✓");
          todayRemaining.dataset.status = "done";
          todayFill.dataset.state = "done";
        } else {
          const remCases = Math.max(0, dayLimit - dayDone);
          updateText(todayRemaining, `${remCases.toLocaleString("en-US")} cases remaining`);
          if (remCases <= 5 && remCases > 0) {
            todayRemaining.dataset.status = "warning";
            todayFill.dataset.state = "warning";
          } else {
            todayRemaining.dataset.status = "active";
            todayFill.dataset.state = "normal";
          }
        }
      } else {
        updateText(todayRemaining, "Daily quota");
        delete todayRemaining.dataset.status;
        todayFill.dataset.state = "empty";
      }
    }

    // 3. Inspections Card
    const inspectionsValues = cards.querySelector(".abi-stat-inspections .abi-stat-values");
    if (inspectionsValues) {
      const rowsData = [
        {
          period: "lifetime",
          label: "Lifetime",
          inspections: totalCount,
          correct: successfulCount,
          wrong: lifeWrong,
          bans: bansCount,
          accuracy: lifeAccuracyNum,
          lastBan: lastBanShort,
          lastBanTitle: `Last ban: ${lastBanLabel}`,
        },
        {
          period: "season",
          label: "This season",
          inspections: summary.season_total_case_num ?? 0,
          correct: summary.season_right_case_num ?? 0,
          wrong: summary.season_wrong_case_num ?? 0,
          bans: summary.season_right_punish_case_num ?? 0,
          accuracy: seasonAccuracyNum,
          lastBan: null,
          lastBanTitle: "Bans this season",
        },
        {
          period: "weekly",
          label: "This week",
          inspections: weekSummary.week_total_num ?? 0,
          correct: weekSummary.week_right_num ?? 0,
          wrong: weekSummary.week_wrong_num ?? 0,
          bans: weekSummary.week_right_punish_num ?? 0,
          accuracy: weeklyAccuracyNum,
          lastBan: null,
          lastBanTitle: "Bans this week",
        },
      ];

      const setSegmentProgress = (node, percentage) => {
        const clamped = Math.max(0, Math.min(percentage, 100));
        const target = `${clamped}%`;
        node.dataset.abiProgressTarget = target;
        if (typeof window !== "undefined" && window.setProgress && window.setProgress !== setProgress) {
          window.setProgress(node, clamped);
          return;
        }
        if (!node.dataset.abiProgressReady) {
          node.dataset.abiProgressReady = "true";
          node.style.width = "0%";
          requestAnimationFrame(() => {
            if (node.isConnected) node.style.width = node.dataset.abiProgressTarget;
          });
          return;
        }
        node.style.width = target;
      };

      for (const row of rowsData) {
        let rowNode = inspectionsValues.querySelector(`[data-period="${row.period}"]`);
        if (!rowNode) {
          rowNode = document.createElement("div");
          rowNode.className = "abi-inspection-row";
          rowNode.dataset.period = row.period;

          const periodCol = document.createElement("div");
          periodCol.className = "abi-inspection-period";
          const pName = document.createElement("span");
          pName.className = "abi-period-name";
          pName.textContent = row.label;
          const pTotal = document.createElement("span");
          pTotal.className = "abi-period-total";
          pTotal.dataset.stat = "Inspections";
          periodCol.append(pName, pTotal);

          const barWrap = document.createElement("div");
          barWrap.className = "abi-stacked-bar-wrap";
          const bar = document.createElement("div");
          bar.className = "abi-stacked-bar";
          bar.setAttribute("role", "img");
          const legend = document.createElement("div");
          legend.className = "abi-bar-legend";
          barWrap.append(bar, legend);

          const metaCol = document.createElement("div");
          metaCol.className = "abi-inspection-meta";
          const accNode = document.createElement("strong");
          accNode.className = "abi-inspection-accuracy";
          accNode.dataset.stat = "accuracy";
          const bansNode = document.createElement("span");
          bansNode.className = "abi-inspection-bans";
          bansNode.dataset.stat = "Bans";
          metaCol.append(accNode, bansNode);

          rowNode.append(periodCol, barWrap, metaCol);
          inspectionsValues.append(rowNode);
        }

        // Update period total
        const pTotal = rowNode.querySelector(".abi-period-total");
        pTotal.innerHTML = `<strong>${count(row.inspections)}</strong> inspections`;

        // Update stacked bar and legend
        const bar = rowNode.querySelector(".abi-stacked-bar");
        const legend = rowNode.querySelector(".abi-bar-legend");
        const unresolved = Math.max(0, row.inspections - row.correct - row.wrong);

        if (row.inspections === 0) {
          bar.setAttribute("aria-label", `${row.label}: 0 inspections`);
          bar.querySelectorAll(".abi-bar-correct, .abi-bar-wrong, .abi-bar-unresolved").forEach((n) => n.remove());
          let emptySeg = bar.querySelector(".abi-bar-empty");
          if (!emptySeg) {
            emptySeg = document.createElement("div");
            emptySeg.className = "abi-bar-segment abi-bar-empty";
            bar.append(emptySeg);
          }
          emptySeg.title = `${row.label}: 0 inspections`;
          setSegmentProgress(emptySeg, 100);
        } else {
          bar.querySelector(".abi-bar-empty")?.remove();
          bar.setAttribute(
            "aria-label",
            `${row.label}: ${count(row.correct)} correct, ${count(row.wrong)} wrong, ${count(unresolved)} unresolved of ${count(row.inspections)} inspections`,
          );
          const correctPct = (row.correct / row.inspections) * 100;
          const wrongPct = (row.wrong / row.inspections) * 100;
          const unresolvedPct = Math.max(0, 100 - correctPct - wrongPct);

          const segDefs = [
            { key: "correct", cls: "abi-bar-correct", val: row.correct, pct: correctPct, label: "Correct" },
            { key: "wrong", cls: "abi-bar-wrong", val: row.wrong, pct: wrongPct, label: "Wrong" },
            { key: "unresolved", cls: "abi-bar-unresolved", val: unresolved, pct: unresolvedPct, label: "Unresolved" },
          ];

          for (const s of segDefs) {
            let seg = bar.querySelector(`.${s.cls}`);
            if (s.pct > 0) {
              if (!seg) {
                seg = document.createElement("div");
                seg.className = `abi-bar-segment ${s.cls}`;
                seg.dataset.stat = s.key;
                bar.append(seg);
              }
              seg.title = `${s.label}: ${count(s.val)} (${s.pct.toFixed(1)}%) of ${count(row.inspections)} inspections`;
              setSegmentProgress(seg, s.pct);
            } else if (seg) {
              seg.remove();
            }
          }
          const orderedSegs = ["abi-bar-correct", "abi-bar-wrong", "abi-bar-unresolved"]
            .map((c) => bar.querySelector(`.${c}`))
            .filter(Boolean);
          if (orderedSegs.length > 1) {
            bar.append(...orderedSegs);
          }
        }

        legend.innerHTML = `
          <span class="abi-legend-item abi-legend-correct" data-stat="Correct"><strong>${count(row.correct)}</strong> correct</span>
          <span class="abi-legend-item abi-legend-wrong" data-stat="Wrong"><strong>${count(row.wrong)}</strong> wrong</span>
          <span class="abi-legend-item abi-legend-unresolved" data-stat="Unresolved"><strong>${count(unresolved)}</strong> unresolved</span>
        `;

        // Update accuracy
        const accNode = rowNode.querySelector(".abi-inspection-accuracy");
        updateText(accNode, formatAccuracy(row.accuracy));
        const tier = getAccuracyTier(row.accuracy);
        if (tier) accNode.dataset.tier = tier;
        else delete accNode.dataset.tier;

        // Update bans
        const bansNode = rowNode.querySelector(".abi-inspection-bans");
        bansNode.title = row.lastBanTitle;
        if (row.lastBan) {
          bansNode.innerHTML = `<strong>${count(row.bans)}</strong> bans <span class="abi-stat-sublabel">${row.lastBan}</span>`;
        } else {
          bansNode.innerHTML = `<strong>${count(row.bans)}</strong> bans`;
        }
      }
    }

    const levelText =
      profile.querySelector("#level-text")?.textContent.trim() ||
      shell.querySelector("#level-text")?.textContent.trim() ||
      "";
    const inspectorLevel = growth.ret_exp_level ?? (Number(
      (
        profile.querySelector("#exp_level") ||
        shell.querySelector("#exp_level")
      )?.textContent.replace(/[^\d]/g, ""),
    ) || 0);
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
      const percent = document.createElement("span");
      percent.className = "abi-level-percent";
      const track = document.createElement("span");
      track.className = "abi-level-track";
      const fill = document.createElement("span");
      fill.className = "abi-level-fill";
      track.append(fill);
      const count = document.createElement("strong");
      count.className = "abi-level-count";
      const caption = document.createElement("span");
      caption.className = "abi-level-caption";
      levelProgress.append(label, percent, track, count, caption);
      identity?.append(levelProgress);
    }
    if (identity && levelProgress.parentElement !== identity) {
      identity.append(levelProgress);
    }
    levelProgress.querySelector(".abi-level-kicker")?.remove();
    let levelLabel = levelProgress.querySelector(".abi-level-label");
    if (!levelLabel) {
      levelLabel = document.createElement("span");
      levelLabel.className = "abi-level-label";
      levelProgress.prepend(levelLabel);
    }
    let levelPercentNode = levelProgress.querySelector(".abi-level-percent");
    if (!levelPercentNode) {
      levelPercentNode = document.createElement("span");
      levelPercentNode.className = "abi-level-percent";
      levelProgress.insertBefore(levelPercentNode, levelProgress.querySelector(".abi-level-track") || null);
    }
    let levelTrack = levelProgress.querySelector(".abi-level-track");
    if (!levelTrack) {
      levelTrack = document.createElement("span");
      levelTrack.className = "abi-level-track";
      const fill = document.createElement("span");
      fill.className = "abi-level-fill";
      levelTrack.append(fill);
      levelProgress.append(levelTrack);
    }
    let levelCaption = levelProgress.querySelector(".abi-level-caption");
    if (!levelCaption) {
      levelCaption = document.createElement("span");
      levelCaption.className = "abi-level-caption";
      levelProgress.append(levelCaption);
    }
    let levelCount = levelProgress.querySelector(".abi-level-count");
    if (!levelCount) {
      levelCount = document.createElement("strong");
      levelCount.className = "abi-level-count";
      levelProgress.append(levelCount);
    }
    const xpReady = Number.isFinite(growth.level_got_exp) && Number.isFinite(growth.exp_step) && growth.exp_step > 0;
    const levelPercent = xpReady ? Math.min(growth.level_got_exp / growth.exp_step, 1) * 100 : 0;
    updateText(levelLabel, `Level ${inspectorLevel}`);
    updateText(levelPercentNode, xpReady ? `${levelPercent.toFixed(1)}%` : "—");
    if (!levelCount.querySelector(".abi-level-current")) {
      const current = document.createElement("span");
      current.className = "abi-level-current";
      const maximum = document.createElement("span");
      maximum.className = "abi-level-maximum";
      levelCount.replaceChildren(current, document.createTextNode(" / "), maximum);
    }
    updateText(levelCount.querySelector(".abi-level-current"), xpReady ? count(growth.level_got_exp) : "—");
    updateText(levelCount.querySelector(".abi-level-maximum"), xpReady ? `${count(growth.exp_step)} XP` : "— XP");
    const remainingXp = xpReady ? count(Math.max(0, growth.exp_step - growth.level_got_exp)) : "—";
    const totalXpText = Number.isFinite(growth.total_exp) ? ` · Total: ${count(growth.total_exp)} XP` : "";
    updateText(
      levelCaption,
      xpReady ? `${remainingXp} XP to level ${inspectorLevel + 1}${totalXpText}` : "Waiting for progression data",
    );
    let xpDetails = levelProgress.querySelector(".abi-level-xp");
    if (!xpDetails) {
      xpDetails = document.createElement("span");
      xpDetails.className = "abi-level-xp";
      levelProgress.append(xpDetails);
    }
    updateText(xpDetails, `Total XP: ${count(growth.total_exp)}`);
    levelProgress.title = xpDetails.textContent;
    const levelFill = levelTrack.querySelector(".abi-level-fill");
    setProgress(levelFill, levelPercent);
    levelTrack.setAttribute("role", "progressbar");
    levelTrack.setAttribute("aria-valuemin", "0");
    levelTrack.setAttribute("aria-valuemax", String(xpReady ? growth.exp_step : 100));
    levelTrack.setAttribute("aria-valuenow", String(xpReady ? Math.min(growth.level_got_exp, growth.exp_step) : 0));
    levelTrack.setAttribute(
      "aria-label",
      `XP toward level ${inspectorLevel + 1}`,
    );
    levelTrack.setAttribute("aria-valuetext", levelCaption.textContent);

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
    const rankKicker = nextRank ? "NEXT RANK" : atTop ? "CURRENT RANK" : "RANK";
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
