(() => {
  "use strict";
  // Runs at document_start. Mirrors the popup switches onto <html>, applies
  // saved volume to inspection videos, and answers the popup's ping.
  if (window.top !== window || typeof chrome === "undefined" || !chrome.storage) return;

  const DEFAULTS = {
    extensionEnabled: true,
    controls: true,
    site: true,
    playerVolume: 100,
    playbackSpeed: 1,
    autoPlay: true,
    loopVideo: false,
    skipIntro: true,
    inspectionNotes: true,
    colorKey: true,
    verdictEnhancements: true,
    verdictHotkeys: false,
  };
  const root = document.documentElement;

  // Early suppression of intrusive official Milo loader overlay on tab switches,
  // and suppression of intro screen flash when logged in until inspection is entered
  const earlyStyle = document.createElement("style");
  earlyStyle.id = "abi-milo-suppress";
  earlyStyle.textContent = `
    html:not([data-abi-site="off"]) #__milo_loader_layer__,
    html:not([data-abi-site="off"]) #loading-con,
    html:not([data-abi-site="off"]) #__milo_loader_layer__ #loading-con {
      display: none !important;
      visibility: hidden !important;
      opacity: 0 !important;
      pointer-events: none !important;
      width: 0 !important;
      height: 0 !important;
      z-index: -9999 !important;
    }
    html:not([data-abi-site="off"]):not([data-abi-skip-intro="off"]):not([data-abi-entered]) .index.upon-login {
      display: none !important;
    }
  `;
  (document.head || root).appendChild(earlyStyle);

  const WATERMARK = `
================================================================================
  ABI INSPECTOR EXTENDED \u2014 v2.6.6
  Enhanced Patroller Interface & Local Playback Controls
  Author: deem (https://github.com/mkornela)
  Status: Extension Loaded & Active
================================================================================
`;
  function insertWatermark() {
    if (root.dataset.abiWatermark === "loaded") return;
    try {
      let alreadyOutside = false;
      for (let child = document.firstChild; child; child = child.nextSibling) {
        if (child === document.documentElement) break;
        if (child.nodeType === Node.COMMENT_NODE && (child.nodeValue || "").includes("ABI INSPECTOR EXTENDED")) {
          alreadyOutside = true;
          break;
        }
      }
      if (!alreadyOutside) {
        const target = document.documentElement || document.firstChild;
        if (target && document.insertBefore) {
          document.insertBefore(document.createComment(WATERMARK), target);
        }
      }
    } catch {}
    root.dataset.abiWatermark = "loaded";
  }
  insertWatermark();

  function logExtensionBanner() {
    if (window.__abiExtendedBannerLogged) return;
    window.__abiExtendedBannerLogged = true;
    try {
      console.log(
        "%c ABI INSPECTOR EXTENDED %c v2.6.6 %c deem %c ACTIVE \n%cEnhanced Patroller Interface & Local Playback Controls (https://github.com/mkornela)",
        "background: #d49a37; color: #0b0f11; font-weight: bold; font-family: monospace; border-radius: 3px 0 0 3px; padding: 3px 8px; font-size: 11px;",
        "background: #182226; color: #d49a37; font-weight: bold; font-family: monospace; padding: 3px 8px; font-size: 11px; border-left: 1px solid #2a373c;",
        "background: #222f35; color: #c4d0d0; font-family: monospace; padding: 3px 8px; font-size: 11px; border-left: 1px solid #2a373c;",
        "background: #238636; color: #ffffff; font-weight: bold; font-family: monospace; border-radius: 0 3px 3px 0; padding: 3px 8px; font-size: 11px;",
        "color: #8fa0a5; font-size: 11px; padding: 4px 0 2px 2px; font-family: system-ui, sans-serif;"
      );
    } catch {}
  }
  logExtensionBanner();

  const HAS_CJK = /[\u3400-\u9fff\uff00-\uffef]/;
  function removeChineseComments() {
    if (!document.createTreeWalker) return;
    try {
      const walker = document.createTreeWalker(document, NodeFilter.SHOW_COMMENT);
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
  removeChineseComments();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", removeChineseComments, { once: true });
  }

  let playerVolume = 100;
  let currentSettings = { ...DEFAULTS };
  let volumeReady = false;

  function applyMediaSettings() {
    if (!volumeReady) return;
    const volume = playerVolume / 100;
    const speed = Number(currentSettings.playbackSpeed) || 1;
    const loop = Boolean(currentSettings.loopVideo);
    const autoPlay = Boolean(currentSettings.autoPlay);

    document.querySelectorAll(".content.video video").forEach((video) => {
      if (Math.abs(video.volume - volume) > 0.001) {
        const previousVolume = video.volume;
        video.volume = volume;
        if (previousVolume === 0 && volume > 0 && video.muted) video.muted = false;
      }
      const currentSrc = video.currentSrc || video.src || "loaded";
      if (video.dataset.abiSpeedInitialized !== currentSrc) {
        video.dataset.abiSpeedInitialized = currentSrc;
        if (Math.abs(video.playbackRate - speed) > 0.001) {
          video.playbackRate = speed;
        }
      }
      if (video.loop !== loop) {
        video.loop = loop;
      }
      if (
        autoPlay &&
        video.paused &&
        !video.ended &&
        video.readyState >= 2 &&
        video.dataset.abiUserPaused !== "true" &&
        video.dataset.abiAutoplayed !== currentSrc
      ) {
        video.dataset.abiAutoplayed = currentSrc;
        video.play().catch(() => {});
      } else if (!autoPlay && !video.paused && video.dataset.abiUserPlayed !== "true") {
        video.pause();
      }
    });
  }

  function apply(settings, syncMedia = false) {
    currentSettings = { ...DEFAULTS, ...settings };
    const master = currentSettings.extensionEnabled !== false;
    root.dataset.abiExtension = master ? "on" : "off";
    root.dataset.abiSite = master && currentSettings.site ? "on" : "off";
    root.dataset.abiControls = master && currentSettings.controls ? "on" : "off";
    root.dataset.abiInspectionNotes = master && currentSettings.inspectionNotes ? "on" : "off";
    root.dataset.abiColorKey = master && currentSettings.colorKey ? "on" : "off";
    root.dataset.abiVerdictEnhancements = master && currentSettings.verdictEnhancements ? "on" : "off";
    root.dataset.abiVerdictHotkeys = master && currentSettings.verdictHotkeys ? "on" : "off";
    root.dataset.abiAutoPlay = master && currentSettings.autoPlay ? "on" : "off";
    root.dataset.abiLoopVideo = master && currentSettings.loopVideo ? "on" : "off";
    root.dataset.abiSkipIntro = master && currentSettings.skipIntro !== false ? "on" : "off";
    root.dataset.abiPlaybackSpeed = String(currentSettings.playbackSpeed || 1);

    const savedVolume = Number(settings.playerVolume);
    playerVolume = Number.isFinite(savedVolume)
      ? Math.max(0, Math.min(100, savedVolume))
      : DEFAULTS.playerVolume;
    volumeReady = true;
    if (syncMedia) {
      const speed = Number(currentSettings.playbackSpeed) || 1;
      document.querySelectorAll(".content.video video").forEach((video) => {
        video.dataset.abiSpeedInitialized = video.currentSrc || video.src || "loaded";
        if (Math.abs(video.playbackRate - speed) > 0.001) {
          video.playbackRate = speed;
        }
      });
      applyMediaSettings();
    }
  }
  const load = (syncMedia = false) => {
    try {
      if (typeof chrome !== "undefined" && chrome?.storage?.local?.get) {
        chrome.storage.local.get(DEFAULTS, (settings) => apply(settings, syncMedia));
      }
    } catch {}
  };
  load(true);
  try {
    chrome.storage.onChanged.addListener((_changes, area) => {
      if (area === "local") load(true);
    });
  } catch {}

  const playerObserver = new MutationObserver(applyMediaSettings);
  playerObserver.observe(root, { childList: true, subtree: true });
  document.addEventListener(
    "loadstart",
    (event) => {
      if (event.target instanceof HTMLVideoElement && event.target.closest(".content.video")) {
        delete event.target.dataset.abiSpeedInitialized;
        delete event.target.dataset.abiUserPaused;
        delete event.target.dataset.abiAutoplayed;
      }
    },
    true,
  );
  document.addEventListener(
    "loadedmetadata",
    (event) => {
      if (event.target instanceof HTMLVideoElement && event.target.closest(".content.video"))
        applyMediaSettings();
    },
    true,
  );

  const onInspector = () =>
    location.origin === "https://www.arenabreakoutinfinite.com" &&
    /^\/act\/a20251028patroller\/?$/.test(location.pathname);

  // The popup uses this to show page status, offer reload, or open on-site settings.
  try {
    chrome.runtime.onMessage.addListener((message, _sender, reply) => {
      if (!onInspector()) return;
      if (message?.type === "abi:ping") {
        reply({
          ok: true,
          controlsLoaded: root.dataset.abiControlsLoaded || null,
          extensionEnabled: root.dataset.abiExtension !== "off",
        });
      } else if (message?.type === "abi:reload") {
        location.reload();
      } else if (message?.type === "abi:open-settings") {
        const brand = document.querySelector(".abi-extension-brand");
        if (brand) brand.click();
        reply?.({ ok: true });
      }
    });
  } catch {}
})();
