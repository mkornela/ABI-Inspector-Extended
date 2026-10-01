(() => {
  "use strict";
  // Runs at document_start. Mirrors the two popup switches onto <html> so the
  // stylesheets and dialogs.js can follow them, and answers the popup's ping.
  if (window.top !== window || typeof chrome === "undefined" || !chrome.storage) return;

  const DEFAULTS = { controls: true, site: true };
  const root = document.documentElement;

  function apply(settings) {
    root.dataset.abiSite = settings.site ? "on" : "off";
    root.dataset.abiControls = settings.controls ? "on" : "off";
  }
  const load = () => chrome.storage.local.get(DEFAULTS, apply);
  load();
  chrome.storage.onChanged.addListener((_changes, area) => {
    if (area === "local") load();
  });

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
