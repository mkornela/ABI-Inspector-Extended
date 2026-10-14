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
    autoPlay: false,
    loopVideo: false,
    inspectionNotes: true,
    colorKey: true,
    verdictEnhancements: true,
    verdictHotkeys: false,
  };
  const root = document.documentElement;
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
  const load = (syncMedia = false) =>
    chrome.storage.local.get(DEFAULTS, (settings) => apply(settings, syncMedia));
  load(true);
  chrome.storage.onChanged.addListener((_changes, area) => {
    if (area === "local") load(true);
  });

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
})();
