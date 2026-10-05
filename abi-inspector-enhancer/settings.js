(() => {
  "use strict";
  // Runs at document_start. Mirrors the popup switches onto <html>, applies
  // saved volume to inspection videos, and answers the popup's ping.
  if (window.top !== window || typeof chrome === "undefined" || !chrome.storage) return;

  const DEFAULTS = {
    controls: true,
    site: true,
    playerVolume: 100,
    inspectionNotes: true,
    colorKey: true,
  };
  const root = document.documentElement;
  let playerVolume = 100;
  let volumeReady = false;

  function applyPlayerVolume() {
    if (!volumeReady) return;
    const volume = playerVolume / 100;
    document.querySelectorAll(".content.video video").forEach((video) => {
      if (Math.abs(video.volume - volume) > 0.001) {
        const previousVolume = video.volume;
        video.volume = volume;
        if (previousVolume === 0 && volume > 0 && video.muted) video.muted = false;
      }
    });
  }

  function apply(settings, syncVolume = false) {
    root.dataset.abiSite = settings.site ? "on" : "off";
    root.dataset.abiControls = settings.controls ? "on" : "off";
    root.dataset.abiInspectionNotes = settings.inspectionNotes ? "on" : "off";
    root.dataset.abiColorKey = settings.colorKey ? "on" : "off";
    const savedVolume = Number(settings.playerVolume);
    playerVolume = Number.isFinite(savedVolume)
      ? Math.max(0, Math.min(100, savedVolume))
      : DEFAULTS.playerVolume;
    volumeReady = true;
    if (syncVolume) applyPlayerVolume();
  }
  const load = (syncVolume = false) =>
    chrome.storage.local.get(DEFAULTS, (settings) => apply(settings, syncVolume));
  load(true);
  chrome.storage.onChanged.addListener((_changes, area) => {
    if (area === "local") load(Boolean(_changes.playerVolume));
  });

  const playerObserver = new MutationObserver(applyPlayerVolume);
  playerObserver.observe(root, { childList: true, subtree: true });
  document.addEventListener(
    "loadedmetadata",
    (event) => {
      if (event.target instanceof HTMLVideoElement && event.target.closest(".content.video"))
        applyPlayerVolume();
    },
    true,
  );

  const onInspector = () =>
    location.origin === "https://www.arenabreakoutinfinite.com" &&
    /^\/act\/a20251028patroller\/?$/.test(location.pathname);

  // The popup uses this to show page status and to offer a reload after the
  // player-controls switch changes (the toolbar is mounted once per page load).
  chrome.runtime.onMessage.addListener((message, _sender, reply) => {
    if (!onInspector()) return;
    if (message?.type === "abi:ping") {
      reply({ ok: true, controlsLoaded: root.dataset.abiControlsLoaded || null });
    } else if (message?.type === "abi:reload") {
      location.reload();
    }
  });
})();
