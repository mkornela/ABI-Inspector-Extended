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
  const ranks = [
    { title: "Trainee Inspector", required: 0 },
    { title: "Assistant Inspector", required: 15 },
    { title: "Junior Inspector", required: 125 },
    { title: "Intermediate Inspector", required: 250 },
    { title: "Senior Inspector", required: 375 },
    { title: "Expert + Lv. 35", required: 475, levelRequired: 35 },
  ];
  const version = chrome.runtime
    .getManifest()
    .version.split(".")
    .slice(0, 2)
    .join(".");
  let queued = false;
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    const dialog = document.querySelector("#wxMine > .abi-rank-dialog");
    if (!dialog || dialog.hidden) return;
    dialog.hidden = true;
    document.querySelector("#wxMine .abi-rank-open")?.focus();
  });

  function updateNavigation() {
    queued = false;
    const nav = document.querySelector(".main .nav");
    if (!nav || !root.hasAttribute("data-abi-site")) return;

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
      brand.setAttribute(
        "aria-label",
        `ABI Inspector Extended version ${version}`,
      );

      const name = document.createElement("span");
      name.className = "abi-brand-name";
      name.textContent = "ABI Inspector Extended";
      const versionLabel = document.createElement("span");
      versionLabel.className = "abi-brand-version";
      versionLabel.textContent = `v${version}`;

      brand.append(name, versionLabel);
      nav.append(brand);
    } else if (!shouldShowBrand && brand) {
      brand.remove();
    }

    nav.classList.toggle("abi-has-brand", shouldShowBrand);
    updateHeaderSlot(nav);
    updateColorKey(enabled);
    updateInspectionNote(enabled);
    updateInspectionTitle(enabled);
    updateOverview(enabled);
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
    const note = document.querySelector("#xcWorking .tips-content #p46_2");
    if (!note) return;

    if (!enabled) {
      if (!note.classList.contains("abi-color-key")) return;
      note.replaceChildren(note.dataset.abiOriginalText || "");
      note.classList.remove("abi-color-key");
      delete note.dataset.abiOriginalText;
      return;
    }

    if (note.classList.contains("abi-color-key")) return;
    note.dataset.abiOriginalText = note.textContent;
    note.classList.add("abi-color-key");

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
  }

  function updateInspectionNote(enabled) {
    const note = document.querySelector("#xcWorking .tips-content #p46_1");
    if (!note) return;

    if (!enabled) {
      if (!note.classList.contains("abi-inspection-note")) return;
      note.replaceChildren(note.dataset.abiOriginalText || "");
      note.classList.remove("abi-inspection-note");
      delete note.dataset.abiOriginalText;
      return;
    }

    if (note.classList.contains("abi-inspection-note")) return;
    note.dataset.abiOriginalText = note.textContent;
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

  function updateInspectionTitle(enabled) {
    const title = document.querySelector("#xcWorking .tips-title");
    if (!title) return;

    if (!enabled) {
      if (title.dataset.abiOriginalText === undefined) return;
      title.textContent = title.dataset.abiOriginalText;
      delete title.dataset.abiOriginalText;
      return;
    }

    if (title.dataset.abiOriginalText === undefined) {
      title.dataset.abiOriginalText = title.textContent;
    }
    const label = title.dataset.abiOriginalText.trim().replace(/\s*:?\s*$/, "");
    if (title.textContent !== label) title.textContent = label;
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

  const observer = new MutationObserver(scheduleUpdate);
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["class", "data-abi-site"],
    characterData: true,
  });

  updateNavigation();
})();
