"use strict";

const DEFAULTS = { extensionEnabled: true, controls: true };
const $ = (id) => document.getElementById(id);
const statusEl = $("status");
const reloadBtn = $("reload");
const masterInput = $("extensionEnabled");
const masterBadge = $("masterBadge");
const openSettingsBtn = $("openSettingsBtn");

let tabId = null; // active tab, if it is the Inspector page
let page = null; // reply from settings.js, or null when not on the Inspector page

let popupVersion = "2.6.13";
try {
  popupVersion = chrome.runtime?.getManifest?.()?.version || "2.6.13";
} catch {}
$("version").textContent = `v${popupVersion}`;

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
    // Not on Inspector page: leave page = null.
  }
}

function render(settings) {
  const isEnabled = settings.extensionEnabled !== false;
  masterInput.checked = isEnabled;

  if (isEnabled) {
    masterBadge.textContent = "Active";
    masterBadge.className = "status-pill status-pill-active";
  } else {
    masterBadge.textContent = "Disabled";
    masterBadge.className = "status-pill status-pill-disabled";
  }

  const loaded = page?.controlsLoaded; // "on" | "off" | null
  const wanted = isEnabled && settings.controls ? "on" : "off";
  const needsReload = Boolean(page && loaded && loaded !== wanted);

  reloadBtn.hidden = !needsReload;
  statusEl.classList.toggle("attention", Boolean(needsReload));

  if (!page) {
    statusEl.dataset.state = "idle";
    statusEl.textContent = "Not on Inspector page. Settings apply when you open it.";
    openSettingsBtn.disabled = true;
    openSettingsBtn.title = "Open the Inspector page to view on-site settings.";
  } else if (needsReload) {
    statusEl.dataset.state = "attention";
    statusEl.textContent = "Reload the Inspector page to apply changes.";
    openSettingsBtn.disabled = !isEnabled;
  } else if (!isEnabled) {
    statusEl.dataset.state = "disabled";
    statusEl.textContent = "Extension is turned off on the Inspector page.";
    openSettingsBtn.disabled = true;
  } else {
    statusEl.dataset.state = "ready";
    statusEl.textContent = "Active on the open Inspector workbench.";
    openSettingsBtn.disabled = false;
  }
}

async function init() {
  await findInspectorTab();
  const settings = await chrome.storage.local.get(DEFAULTS);
  render(settings);
}

masterInput.addEventListener("change", async () => {
  const isEnabled = masterInput.checked;
  await chrome.storage.local.set({ extensionEnabled: isEnabled });
  const settings = await chrome.storage.local.get(DEFAULTS);
  render(settings);
});

openSettingsBtn.addEventListener("click", async () => {
  if (tabId == null) return;
  try {
    await chrome.tabs.sendMessage(tabId, { type: "abi:open-settings" });
  } catch {}
  window.close();
});

reloadBtn.addEventListener("click", async () => {
  if (tabId == null) return;
  try {
    await chrome.tabs.sendMessage(tabId, { type: "abi:reload" });
  } catch {}
  window.close();
});

init();
