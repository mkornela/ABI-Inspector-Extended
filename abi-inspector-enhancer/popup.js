"use strict";
const DEFAULTS = { controls: true, site: true, playerVolume: 100 };
const $ = (id) => document.getElementById(id);
const statusEl = $("status");
const reloadBtn = $("reload");

let tabId = null; // active tab, if it is the Inspector page
let page = null; // reply from settings.js, or null when not on the Inspector page

$("version").textContent = `v${chrome.runtime.getManifest().version}`;

async function findInspectorTab() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab?.id == null) return;
    const reply = await chrome.tabs.sendMessage(tab.id, { type: "abi:ping" });
    if (reply?.ok) {
      tabId = tab.id;
      page = reply;
    }
  } catch {
    // Not the Inspector page (no content script to answer): leave page = null.
  }
}

function render(settings) {
  $("controls").checked = settings.controls;
  $("site").checked = settings.site;
  const volume = Math.max(0, Math.min(100, Number(settings.playerVolume) || 0));
  $("playerVolume").value = String(volume);
  $("playerVolumeValue").value = `${volume}%`;
  $("playerVolume").style.setProperty("--volume-fill", `${volume}%`);

  const loaded = page?.controlsLoaded; // "on" | "off" | null
  const wanted = settings.controls ? "on" : "off";
  const needsReload = page && loaded && loaded !== wanted;

  reloadBtn.hidden = !needsReload;
  statusEl.classList.toggle("attention", Boolean(needsReload));
  if (!page) statusEl.textContent = "Not on the Inspector page. Settings are saved and apply when you open it.";
  else if (needsReload) statusEl.textContent = "Reload the Inspector page to apply the player controls change.";
  else statusEl.textContent = "Applied to the open Inspector page.";
}

async function init() {
  await findInspectorTab();
  render(await chrome.storage.local.get(DEFAULTS));
}

for (const key of ["controls", "site"]) {
  $(key).addEventListener("change", async (event) => {
    await chrome.storage.local.set({ [key]: event.target.checked });
    render(await chrome.storage.local.get(DEFAULTS));
  });
}

$("playerVolume").addEventListener("input", async (event) => {
  const playerVolume = Number(event.target.value);
  $("playerVolumeValue").value = `${playerVolume}%`;
  event.target.style.setProperty("--volume-fill", `${playerVolume}%`);
  await chrome.storage.local.set({ playerVolume });
});

reloadBtn.addEventListener("click", async () => {
  if (tabId == null) return;
  try {
    await chrome.tabs.sendMessage(tabId, { type: "abi:reload" });
  } catch {
    // The page is already reloading or closed.
  }
  window.close();
});

init();
