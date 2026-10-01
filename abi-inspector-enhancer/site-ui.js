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
  const version = chrome.runtime
    .getManifest()
    .version.split(".")
    .slice(0, 2)
    .join(".");
  let queued = false;

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
  }

  function scheduleUpdate() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(updateNavigation);
  }

  const observer = new MutationObserver(scheduleUpdate);
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["class", "data-abi-site"],
  });

  updateNavigation();
})();
