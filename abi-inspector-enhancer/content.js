function main() {
  "use strict";
  // Exact document guard in addition to the narrow manifest match pattern.
  if (
    location.origin !== "https://www.arenabreakoutinfinite.com" ||
    !/^\/act\/a20251028patroller\/?$/.test(location.pathname) ||
    window.top !== window
  )
    return;
  if (document.querySelector("abi-local-player")) return;

  // Font Awesome Free 6.7.2, Fonticons, Inc. Icons: CC BY 4.0.
  // See THIRD_PARTY_NOTICES.md and FONT-AWESOME-LICENSE.txt. No runtime downloads.
  const icons = {
    play: {
      viewBox: "0 0 384 512",
      d: "M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z",
    },
    pause: {
      viewBox: "0 0 320 512",
      d: "M48 64C21.5 64 0 85.5 0 112L0 400c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48L48 64zm192 0c-26.5 0-48 21.5-48 48l0 288c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48l-32 0z",
    },
    "volume-high": {
      viewBox: "0 0 640 512",
      d: "M533.6 32.5C598.5 85.2 640 165.8 640 256s-41.5 170.7-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C557.5 398.2 592 331.2 592 256s-34.5-142.2-88.7-186.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64l0 384c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352 64 352c-35.3 0-64-28.7-64-64l0-64c0-35.3 28.7-64 64-64l67.8 0L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z",
    },
    "volume-xmark": {
      viewBox: "0 0 576 512",
      d: "M301.1 34.8C312.6 40 320 51.4 320 64l0 384c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352 64 352c-35.3 0-64-28.7-64-64l0-64c0-35.3 28.7-64 64-64l67.8 0L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM425 167l55 55 55-55c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-55 55 55 55c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-55-55-55 55c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l55-55-55-55c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z",
    },
    "backward-step": {
      viewBox: "0 0 320 512",
      d: "M267.5 440.6c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29l0-320c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4l-192 160L64 241 64 96c0-17.7-14.3-32-32-32S0 78.3 0 96L0 416c0 17.7 14.3 32 32 32s32-14.3 32-32l0-145 11.5 9.6 192 160z",
    },
    "forward-step": {
      viewBox: "0 0 320 512",
      d: "M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416L0 96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4l192 160L256 241l0-145c0-17.7 14.3-32 32-32s32 14.3 32 32l0 320c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-145-11.5 9.6-192 160z",
    },
    expand: {
      viewBox: "0 0 448 512",
      d: "M32 32C14.3 32 0 46.3 0 64l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-64 64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 32zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7 14.3 32 32 32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0 0-64zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0 0 64c0 17.7 14.3 32 32 32s32-14.3 32-32l0-96c0-17.7-14.3-32-32-32l-96 0zM448 352c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c17.7 0 32-14.3 32-32l0-96z",
    },
    compress: {
      viewBox: "0 0 448 512",
      d: "M160 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c17.7 0 32-14.3 32-32l0-96zM32 320c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0 0 64c0 17.7 14.3 32 32 32s32-14.3 32-32l0-96c0-17.7-14.3-32-32-32l-96 0zM352 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7 14.3 32 32 32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0 0-64zM320 320c-17.7 0-32 14.3-32 32l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-64 64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0z",
    },
    bookmark: {
      viewBox: "0 0 384 512",
      d: "M0 48C0 21.5 21.5 0 48 0l288 0c26.5 0 48 21.5 48 48l0 440c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488L0 48z",
    },
    reload: {
      viewBox: "0 0 512 512",
      d: "M463.5 224l8.5 0c13.3 0 24-10.7 24-24l0-128c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8l119.5 0z",
    },
  };
  const styles = `
    :host { display:block; color:var(--abi-text,#e0e3de); font-family:var(--abi-font,"Arial Narrow",sans-serif); font-weight:var(--abi-weight,700); letter-spacing:var(--abi-tracking,0px); color-scheme:dark; }
    * { box-sizing:border-box; }
    :host { min-width:0; width:100%; box-sizing:border-box; }
    .icon { width:14px; height:14px; fill:currentColor; flex:none; pointer-events:none; }
    button { display:inline-flex; align-items:center; justify-content:center; gap:7px; }
    #mute { width:34px; padding:0; }
    .panel { padding:0 16px 12px; background:linear-gradient(180deg,#13191c 0%,#0d1113 100%); border:1px solid rgba(255,255,255,0.08); border-top:0; border-radius:0 0 10px 10px; box-shadow:0 8px 24px rgba(0,0,0,0.4); }
    .timeline { display:flex; align-items:center; gap:12px; height:38px; }
    .timeline-bar { position:relative; flex:1 1 0; display:flex; align-items:center; height:100%; min-width:0; }
    .timeline-pins { position:absolute; inset:0; pointer-events:none; }
    .timeline-pin {
      position:absolute;
      top:50%;
      transform:translate(-50%, -50%);
      width:6px;
      height:14px;
      background:#f59e0b;
      border:1px solid #ffffff;
      border-radius:2px;
      cursor:pointer;
      pointer-events:auto;
      z-index:3;
      box-shadow:0 0 4px rgba(245,158,11,0.8);
      transition:transform .1s ease, background .15s ease;
    }
    .timeline-pin:hover {
      transform:translate(-50%, -50%) scale(1.3);
      background:#fbbf24;
      box-shadow:0 0 8px rgba(251,191,36,1);
    }
    #pinButton {
      width:30px;
      height:30px;
      padding:0;
      color:#f59e0b;
    }
    #pinButton:hover {
      color:#fbbf24;
      border-color:rgba(245,158,11,0.4);
    }
    .hover-badge {
      position: absolute;
      bottom: calc(100% + 6px);
      left: 0;
      transform: translateX(-50%);
      background: #111719;
      color: #e0e3de;
      border: 1px solid var(--abi-border, #41494b);
      border-radius: 4px;
      padding: 2px 6px;
      font-size: 11px;
      font-weight: 700;
      font-variant-numeric: tabular-nums;
      pointer-events: none;
      white-space: nowrap;
      opacity: 0;
      visibility: hidden;
      transition: opacity .12s ease, visibility .12s ease;
      z-index: 10;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
    }
    .hover-badge::after {
      content: "";
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border-width: 4px;
      border-style: solid;
      border-color: #41494b transparent transparent transparent;
    }
    .hover-badge.visible {
      opacity: 1;
      visibility: visible;
    }
    .time { font-size:13px; font-variant-numeric:tabular-nums; white-space:nowrap; min-width:90px; text-align:right; color:#8fa09d; font-weight:700; letter-spacing:0.02em; }
    .panel { container-type:inline-size; }
    .row { display:grid; grid-template-columns:1fr auto 1fr; align-items:center; column-gap:14px; row-gap:8px; }
    .left { justify-self:start; display:flex; align-items:center; }
    .center { display:flex; align-items:center; justify-content:center; flex-wrap:wrap; gap:6px 18px; }
    .right { justify-self:end; display:flex; align-items:center; gap:12px; }
    .group { display:flex; align-items:center; gap:4px; }
    .label { font-size:11px; font-weight:800; letter-spacing:0.08em; text-transform:uppercase; padding:0 4px; color:#8fa09d; user-select:none; }
    #keysButton { gap:6px; }
    .keyboard-icon {
      fill:none;
      stroke:currentColor;
      stroke-width:1.5;
      stroke-linecap:round;
      stroke-linejoin:round;
    }
    #keysDialog {
      width:min(620px,calc(100vw - 28px));
      max-width:620px;
      max-height:min(82vh,700px);
      margin:auto;
      padding:0;
      overflow:auto;
      border:1px solid var(--abi-border,#41494b);
      border-top:2px solid var(--abi-accent,#c3472d);
      border-radius:0;
      color:var(--abi-text,#e0e3de);
      background:#111719;
      box-shadow:0 24px 72px #000b;
    }
    #keysDialog::backdrop {
      background:#050809d9;
      backdrop-filter:blur(2px);
    }
    .keys-head {
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:16px;
      padding:17px 20px 14px;
      border-bottom:1px solid #ffffff16;
    }
    .keys-head h2 {
      margin:4px 0 0;
      color:var(--abi-text,#e0e3de);
      font-size:21px;
      font-weight:700;
      letter-spacing:.04em;
      text-transform:uppercase;
    }
    .keys-close {
      flex:0 0 34px;
      width:34px;
      height:34px;
      padding:0;
      border-color:var(--abi-border,#41494b);
      font-size:22px;
      line-height:1;
    }
    .keys-grid {
      display:grid;
      grid-template-columns:repeat(2,minmax(0,1fr));
      gap:20px 26px;
      padding:18px 20px;
    }
    .keys-group h3 {
      margin:0 0 8px;
      color:#aab1af;
      font-size:11px;
      letter-spacing:.1em;
      text-transform:uppercase;
    }
    .keys-list { display:grid; gap:6px; margin:0; }
    .keys-row {
      display:grid;
      grid-template-columns:minmax(0,1fr) auto;
      align-items:center;
      gap:10px;
      min-height:24px;
      padding-bottom:5px;
      border-bottom:1px solid #ffffff12;
    }
    .keys-row:last-child { padding-bottom:0; border-bottom:0; }
    .keys-row dt { color:#d2d8d3; font-size:13px; line-height:1.25; }
    .keys-row dd {
      display:flex;
      align-items:center;
      justify-content:flex-end;
      gap:5px;
      margin:0;
      white-space:nowrap;
    }
    .keys-row kbd {
      min-width:24px;
      padding:3px 6px;
      border:1px solid var(--abi-border,#41494b);
      background:#192024;
      color:#f0f1ec;
      font:inherit;
      font-size:11px;
      font-weight:700;
      line-height:1.1;
      text-align:center;
    }
    .keys-separator,.keys-detail { color:#929a9b; font-size:10px; }
    .keys-note { margin:4px 0 0; color:#929a9b; font-size:11px; line-height:1.45; }
    .keys-note strong { color:#d2d8d3; font-weight:700; }
    .keys-foot {
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:14px;
      padding:12px 20px;
      border-top:1px solid #ffffff16;
      background:#0e1214;
    }
    .keys-foot p { margin:0; color:#929a9b; font-size:11px; line-height:1.4; }
    .keys-done { flex:0 0 auto; min-width:76px; color:var(--abi-accent,#c3472d); }
    @media(max-width:560px) {
      .keys-grid { grid-template-columns:1fr; gap:14px; padding:16px; }
      .keys-head,.keys-foot { padding-inline:16px; }
    }
    @container (max-width:860px) {
      .row { grid-template-columns:1fr auto; }
      .center { grid-column:1 / -1; grid-row:2; }
    }
    button { font:inherit; font-size:12px; font-weight:700; letter-spacing:0.04em; text-transform:uppercase; height:30px; border:1px solid rgba(255,255,255,0.08); border-radius:4px; color:#c5cec9; background:rgba(255,255,255,0.04); padding:0 9px; cursor:pointer; white-space:nowrap; box-shadow:none; transition:all .15s ease; }
    button:hover { border-color:rgba(255,255,255,0.22); background:rgba(255,255,255,0.09); color:#ffffff; transform:translateY(-1px); }
    button:active { transform:translateY(0); }
    button[aria-pressed=true] { color:#e66b4e; border-color:#e66b4e; background:rgba(230,107,78,0.12); }
    .primary { width:36px; height:32px; padding:0; color:#ffffff; border:1.5px solid #d95338; background:linear-gradient(135deg,rgba(217,83,56,0.3),rgba(160,42,22,0.45)); border-radius:6px; box-shadow:0 2px 10px rgba(195,71,45,0.35); }
    .primary:hover { border-color:#ff684a; background:linear-gradient(135deg,rgba(230,107,78,0.45),rgba(195,71,45,0.6)); box-shadow:0 4px 14px rgba(195,71,45,0.5); }
    #previous,#next,#fullscreen,#slower,#faster,#reload { width:30px; height:30px; padding:0; }
    #reload.spinning .icon {
      animation: abi-reload-spin .6s cubic-bezier(0.4, 0, 0.2, 1);
    }
    @keyframes abi-reload-spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    #mute { width:32px; height:30px; padding:0; }
    #speedval { min-width:44px; padding:0 6px; text-transform:none; background:rgba(255,255,255,0.06); border-color:rgba(255,255,255,0.12); color:#e0e3de; font-weight:800; }
    #speedval.changed { color:#b8d66a; border-color:#b8d66a; background:rgba(184,214,106,0.14); box-shadow:0 0 8px rgba(184,214,106,0.3); }
    button:disabled,input:disabled { opacity:.35; cursor:default; }
    :focus-visible { outline:1px solid var(--abi-text,#e0e3de); outline-offset:2px; }
    input[type=range] { appearance:none; -webkit-appearance:none; height:18px; margin:0; padding:0; border:0; background:transparent; cursor:pointer; min-width:0; border-radius:0; }
    #seek { flex:1 1 0; width:0; }
    #seek::-webkit-slider-runnable-track { height:4px; border:0; border-radius:999px; background:linear-gradient(to right,#e66b4e 0 var(--fill,0%),rgba(255,255,255,0.08) var(--fill,0%) 100%); box-shadow:0 0 6px rgba(230,107,78,0.3); }
    #seek::-webkit-slider-thumb { appearance:none; -webkit-appearance:none; width:12px; height:12px; margin-top:-4px; border:2px solid #ffffff; border-radius:50%; background:#e66b4e; box-shadow:0 0 8px rgba(230,107,78,0.8); transition:transform .1s ease; }
    #seek:hover::-webkit-slider-thumb { transform:scale(1.25); }
    #volume { width:55px; }
    #volume::-webkit-slider-runnable-track { height:3px; border:0; border-radius:999px; background:linear-gradient(to right,#b8d66a 0 var(--fill,100%),rgba(255,255,255,0.1) var(--fill,100%) 100%); }
    #volume::-webkit-slider-thumb { appearance:none; -webkit-appearance:none; width:10px; height:10px; margin-top:-3.5px; border:0; border-radius:50%; background:#b8d66a; box-shadow:0 0 6px rgba(184,214,106,0.5); }
    #status { font-size:13px; line-height:1.5; padding-top:6px; }
    #status:empty { display:none; }
    @media(max-width:600px) { .panel { padding-inline:8px; } button { padding-inline:6px; font-size:14px; } .group { padding-inline:6px; } }
  `;
  let instance = null;
  let queued = false;
  function visible(element) {
    if (!element) return false;
    const css = getComputedStyle(element);
    return (
      element.getClientRects().length > 0 &&
      css.visibility === "visible" &&
      css.display !== "none" &&
      Number(css.opacity) !== 0
    );
  }

  function activeVideoPanel() {
    const activeTab = document.querySelector(".main .nav li.current, .nav li.current");
    const isWorking = activeTab?.id === "working" || activeTab?.classList.contains("str24");
    const isDrill = activeTab?.id === "drill" || activeTab?.classList.contains("str26");
    let panel = null;
    if (isWorking) {
      panel = document.querySelector("#xcWorking > .content.video");
    } else if (isDrill) {
      panel = document.querySelector(".content.video:has(#drillButton), #drill > .content.video");
    }
    if (panel) return panel;
    const candidates = [
      ...document.querySelectorAll(
        "#xcWorking > .content.video, .content.video:has(#drillButton), .content.video",
      ),
    ];
    return candidates.find(visible) || candidates[0] || null;
  }

  function activePlayer() {
    const playBox = activeVideoPanel()?.querySelector(":scope > .play-box");
    if (!playBox) return null;
    const shell = playBox.querySelector(":scope > abi-local-player");
    if (shell) return shell.firstElementChild;
    const children = [...playBox.children].filter(
      (child) =>
        child.matches('[id$="Player"]') ||
        child.matches("video") ||
        child.querySelector("video"),
    );
    return children.find(visible) || children[0] || null;
  }

  const format = (value) => {
    if (!Number.isFinite(value)) return "--:--";
    const seconds = Math.max(0, Math.floor(value));
    const h = Math.floor(seconds / 3600);
    return `${h ? `${h}:` : ""}${String(Math.floor(seconds / 60) % 60).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
  };

  function create(player) {
    const shell = document.createElement("abi-local-player");
    const host = document.createElement("abi-local-controls");
    const tab = document.querySelector(".nav #working, .nav #drill");
    const activeTab = document.querySelector(".nav li.current");
    const idleTab = document.querySelector(".nav li:not(.current)");
    const note = player.closest(".content.video")?.querySelector(".tips-title");
    const nav = document.querySelector(".main .nav, .nav");
    function syncTheme() {
      const tabStyle = tab && getComputedStyle(tab);
      const idleStyle = idleTab && getComputedStyle(idleTab);
      const noteStyle = note && getComputedStyle(note);
      const navStyle = nav && getComputedStyle(nav);
      if (tabStyle) {
        shell.style.setProperty("--abi-font", tabStyle.fontFamily);
        shell.style.setProperty("--abi-weight", tabStyle.fontWeight);
        shell.style.setProperty("--abi-tracking", tabStyle.letterSpacing);
        // Sample active-state color only when Workbench is the active tab.
        if (activeTab)
          shell.style.setProperty(
            "--abi-accent",
            getComputedStyle(activeTab).color,
          );
      }
      if (idleStyle)
        shell.style.setProperty("--abi-border", idleStyle.borderTopColor);
      if (noteStyle) shell.style.setProperty("--abi-text", noteStyle.color);
      if (
        navStyle &&
        navStyle.backgroundColor !== "rgba(0, 0, 0, 0)" &&
        navStyle.backgroundColor !== "transparent"
      ) {
        shell.style.setProperty("--abi-surface", navStyle.backgroundColor);
      }
    }
    syncTheme();
    document.fonts?.ready.then(() => {
      if (shell.isConnected) syncTheme();
    });
    const shadow = host.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = styles;
    shadow.append(style);
    const panel = document.createElement("section");
    panel.className = "panel";
    panel.setAttribute("aria-label", "ABI local video controls");
    // Static extension-owned markup only. Never copy page content or media URLs.
    panel.innerHTML = `
      <div class="timeline">
        <div class="timeline-bar">
          <input id="seek" type="range" min="0" max="1" step="0.01" value="0" aria-label="Video position">
          <div id="timelinePins" class="timeline-pins"></div>
          <div id="hoverBadge" class="hover-badge" aria-hidden="true">00:00</div>
        </div>
        <button id="pinButton" title="Drop moment bookmark (M)" aria-label="Drop moment bookmark (M)">Bookmark</button>
        <span class="time" id="time">00:00 / --:--</span>
      </div>
      <div class="row">
        <div class="left"><div class="group" role="group" aria-label="Playback"><button id="play" class="primary" title="Play / Pause (Space or K)">Play</button></div></div>
        <div class="center">
          <div class="group" role="group" aria-label="Seek"><button id="back10" title="Back 10 seconds">−10s</button><button id="back5" title="Back 5 seconds (J or Left)">−5s</button><button id="forward5" title="Forward 5 seconds (L or Right)">+5s</button><button id="forward10" title="Forward 10 seconds">+10s</button></div>
          <div class="group" role="group" aria-label="Frame stepping"><button id="previous" title="Previous approximate frame (comma)">Previous frame</button><span class="label" aria-hidden="true">Frames</span><button id="next" title="Next approximate frame (period)">Next frame</button></div>
          <div class="group" role="group" aria-label="Playback speed"><span class="label" aria-hidden="true">Speed</span><button id="slower" title="Slower ([)" aria-label="Slower playback ([)">−</button><button id="speedval" title="Reset to 1× (\)" aria-label="Playback speed. Click to reset to 1×">1×</button><button id="faster" title="Faster (])" aria-label="Faster playback (])">+</button></div>
        </div>
        <div class="right">
          <div class="group" role="group" aria-label="Audio"><button id="mute" title="Mute (Shift+M or icon)" aria-pressed="false">Mute</button><input id="volume" type="range" min="0" max="1" step="0.01" value="1" aria-label="Volume"></div>
          <div class="group" role="group" aria-label="View">
            <button id="reload" title="Reload player" aria-label="Reload player">Reload</button>
            <button id="keysButton" title="Show video control keys" aria-label="Show video control keys">
              <svg class="icon keyboard-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <rect x="2.75" y="5.25" width="18.5" height="13.5" rx="1" />
                <path d="M6 9h.1M10 9h.1M14 9h.1M18 9h.1M6 12h.1M10 12h.1M14 12h.1M18 12h.1M8 15.5h8" />
              </svg>
              Keys
            </button>
            <button id="fullscreen" title="Fullscreen (F); Escape to exit" aria-pressed="false">Fullscreen</button>
          </div>
        </div>
      </div>
      <div id="status" role="status" aria-live="polite"></div>
      <dialog
        id="keysDialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="keysTitle"
        aria-describedby="keysHelp"
      >
        <header class="keys-head">
          <div><h2 id="keysTitle">Video control keys</h2></div>
          <button id="keysClose" class="keys-close" type="button" aria-label="Close keyboard shortcuts" autofocus>×</button>
        </header>
        <div class="keys-grid">
          <section class="keys-group" aria-labelledby="keysPlaybackTitle">
            <h3 id="keysPlaybackTitle">Playback</h3>
            <dl class="keys-list">
              <div class="keys-row">
                <dt>Play / pause</dt>
                <dd><kbd>SPACE</kbd><span class="keys-separator">or</span><kbd>K</kbd></dd>
              </div>
              <div class="keys-row"><dt>Mute / unmute</dt><dd><kbd>Shift+M</kbd><span class="keys-detail">or icon</span></dd></div>
            </dl>
          </section>
          <section class="keys-group" aria-labelledby="keysReviewTitle">
            <h3 id="keysReviewTitle">Review</h3>
            <dl class="keys-list">
              <div class="keys-row">
                <dt>Drop bookmark / pin</dt>
                <dd><kbd>M</kbd><span class="keys-separator">or</span><kbd>B</kbd></dd>
              </div>
              <div class="keys-row">
                <dt>Back 5 seconds</dt>
                <dd><kbd>J</kbd><span class="keys-separator">or</span><kbd>←</kbd></dd>
              </div>
              <div class="keys-row">
                <dt>Forward 5 seconds</dt>
                <dd><kbd>L</kbd><span class="keys-separator">or</span><kbd>→</kbd></dd>
              </div>
              <div class="keys-row"><dt>Previous frame</dt><dd><kbd>,</kbd></dd></div>
              <div class="keys-row"><dt>Next frame</dt><dd><kbd>.</kbd></dd></div>
            </dl>
            <p class="keys-note">
              <strong>Toolbar only:</strong> use −10s / +10s to skip farther.
            </p>
          </section>
          <section class="keys-group" aria-labelledby="keysSpeedTitle">
            <h3 id="keysSpeedTitle">Playback speed</h3>
            <dl class="keys-list">
              <div class="keys-row"><dt>Slower</dt><dd><kbd>[</kbd></dd></div>
              <div class="keys-row"><dt>Faster</dt><dd><kbd>]</kbd></dd></div>
              <div class="keys-row">
                <dt>Reset to 1×</dt>
                <dd><kbd>\\</kbd></dd>
              </div>
            </dl>
          </section>
          <section class="keys-group" aria-labelledby="keysViewTitle">
            <h3 id="keysViewTitle">View</h3>
            <dl class="keys-list">
              <div class="keys-row">
                <dt>Fullscreen</dt>
                <dd><kbd>F</kbd><span class="keys-detail">Esc exits</span></dd>
              </div>
              <div class="keys-row">
                <dt>Reload player</dt>
                <dd><span class="keys-detail">Toolbar button</span></dd>
              </div>
            </dl>
          </section>
          <section class="keys-group" aria-labelledby="keysVerdictTitle">
            <h3 id="keysVerdictTitle">Quick Verdicts (Workbench)</h3>
            <dl class="keys-list">
              <div class="keys-row">
                <dt>Violation</dt>
                <dd><kbd>1</kbd><span class="keys-separator">or</span><kbd>G</kbd></dd>
              </div>
              <div class="keys-row">
                <dt>Uncertain</dt>
                <dd><kbd>2</kbd><span class="keys-separator">or</span><kbd>U</kbd></dd>
              </div>
              <div class="keys-row">
                <dt>No violation</dt>
                <dd><kbd>3</kbd><span class="keys-separator">or</span><kbd>I</kbd></dd>
              </div>
            </dl>
          </section>
        </div>
        <footer class="keys-foot">
          <p id="keysHelp">
            Shortcuts pause while typing or focused on a control. Focus a slider
            and use ← / → to adjust it.
          </p>
          <button id="keysDone" class="keys-done" type="button">Done</button>
        </footer>
      </dialog>`;
    shadow.append(panel);
    const ui = Object.fromEntries(
      [...panel.querySelectorAll("[id]")].map((el) => [el.id, el]),
    );
    ui.previous.setAttribute("aria-label", "Previous approximate frame");
    ui.next.setAttribute("aria-label", "Next approximate frame");
    // Rebuild an icon only when its state changes, not on every timeupdate.
    function decorate(button, name, label, accessibleLabel) {
      button.setAttribute("aria-label", accessibleLabel);
      button.title = accessibleLabel;
      if (button.dataset.icon === name) return;
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("class", "icon");
      svg.setAttribute("viewBox", icons[name].viewBox);
      svg.setAttribute("aria-hidden", "true");
      svg.setAttribute("focusable", "false");
      const shape = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path",
      );
      shape.setAttribute("d", icons[name].d);
      svg.append(shape);
      button.replaceChildren(svg);
      if (label) button.append(document.createTextNode(label));
      button.dataset.icon = name;
    }
    decorate(
      ui.previous,
      "backward-step",
      "",
      "Previous approximate frame (comma)",
    );
    decorate(
      ui.next,
      "forward-step",
      "",
      "Next approximate frame (period)",
    );
    decorate(ui.mute, "volume-high", "", "Mute (Shift+M or icon)");
    decorate(ui.pinButton, "bookmark", "", "Drop moment bookmark (M)");
    decorate(ui.reload, "reload", "", "Reload player");
    player.before(shell);
    // Keep the complete original subtree together, including all overlays.
    // Modern Chromium supports a state-preserving DOM move.
    if (typeof shell.moveBefore === "function") shell.moveBefore(player, null);
    else shell.append(player);
    shell.append(host);

    const life = new AbortController();
    let mediaLife = null;
    let video = null;
    let noticeTimer;
    let bookmarks = [];
    const on = (el, name, fn) =>
      el.addEventListener(name, fn, { signal: life.signal });
    const notice = (message) => {
      ui.status.textContent = message;
      clearTimeout(noticeTimer);
      noticeTimer = setTimeout(() => {
        ui.status.textContent = "";
      }, 3500);
    };
    const finite = () =>
      video && Number.isFinite(video.duration) && video.duration > 0;
    function renderPins() {
      if (!ui.timelinePins) return;
      ui.timelinePins.replaceChildren();
      if (!finite()) return;
      const duration = video.duration;
      for (const time of bookmarks) {
        const percent = Math.max(0, Math.min(100, (time / duration) * 100));
        const pin = document.createElement("div");
        pin.className = "timeline-pin";
        pin.style.left = `${percent}%`;
        pin.title = `Bookmark at ${format(time)} (Click to seek, right-click to remove)`;
        pin.setAttribute("role", "button");
        pin.setAttribute("tabindex", "0");
        pin.setAttribute("aria-label", `Bookmark at ${format(time)}`);
        pin.dataset.time = String(time);
        pin.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          seek(time);
          notice(`Jumped to bookmark at ${format(time)}`);
        });
        pin.addEventListener("contextmenu", (e) => {
          e.preventDefault();
          e.stopPropagation();
          const idx = bookmarks.indexOf(time);
          if (idx !== -1) {
            bookmarks.splice(idx, 1);
            notice(`Removed bookmark at ${format(time)}`);
            renderPins();
          }
        });
        ui.timelinePins.append(pin);
      }
    }
    function toggleBookmark() {
      if (!finite()) {
        notice("Seeking unavailable until the video is ready");
        return;
      }
      const current = Number((video?.currentTime || 0).toFixed(2));
      const existingIndex = bookmarks.findIndex((t) => Math.abs(t - current) < 0.5);
      if (existingIndex !== -1) {
        const removed = bookmarks.splice(existingIndex, 1)[0];
        notice(`Removed bookmark at ${format(removed)}`);
      } else {
        bookmarks.push(current);
        bookmarks.sort((a, b) => a - b);
        notice(`Bookmark dropped at ${format(current)} (M)`);
      }
      renderPins();
    }
    function reloadVideo() {
      selectVideo();
      if (!video) {
        notice("No video found to reload");
        return;
      }
      ui.reload?.classList.add("spinning");
      setTimeout(() => ui.reload?.classList.remove("spinning"), 600);
      const savedTime = video.currentTime || 0;
      const wasPaused = video.paused;
      const currentRate = video.playbackRate;
      const src = video.getAttribute("src") || video.src;
      const sources = [...video.querySelectorAll("source")];
      if (sources.length > 0) {
        for (const s of sources) {
          const sSrc = s.getAttribute("src");
          if (sSrc) s.setAttribute("src", sSrc);
        }
      } else if (src) {
        video.setAttribute("src", src);
      }
      const onReady = () => {
        video.removeEventListener("loadedmetadata", onReady);
        video.removeEventListener("canplay", onReady);
        if (savedTime > 0) {
          try { video.currentTime = savedTime; } catch {}
        }
        if (currentRate && currentRate !== 1) {
          try { video.playbackRate = currentRate; } catch {}
        }
        if (!wasPaused) {
          video.play().catch(() => {});
        }
      };
      video.addEventListener("loadedmetadata", onReady, { once: true });
      video.addEventListener("canplay", onReady, { once: true });
      try {
        video.load();
      } catch {}
      notice("Reloaded player stream");
      render();
    }
    function selectVideo() {
      const scope = player || shell || document;
      const allVideos = [...scope.querySelectorAll("video")];
      if (!allVideos.length) {
        if (video) {
          mediaLife?.abort();
          video = null;
          render();
        }
        return;
      }
      const playingVideo =
        allVideos.find((v) => !v.paused && visible(v)) ||
        allVideos.find((v) => !v.paused);
      const visibleVideos = allVideos.filter(visible);
      visibleVideos.sort(
        (a, b) =>
          (parseInt(getComputedStyle(b).zIndex, 10) || 0) -
          (parseInt(getComputedStyle(a).zIndex, 10) || 0),
      );
      const selected = playingVideo || visibleVideos[0] || allVideos[0] || null;
      if (selected === video) return;
      mediaLife?.abort();
      video = selected;
      if (video) {
        const rootDs = document.documentElement.dataset;
        const initialSpeed = Number(rootDs.abiPlaybackSpeed);
        const currentSrc = video.currentSrc || video.src || "loaded";
        if (
          Number.isFinite(initialSpeed) &&
          initialSpeed > 0 &&
          video.dataset.abiSpeedInitialized !== currentSrc
        ) {
          video.dataset.abiSpeedInitialized = currentSrc;
          if (Math.abs(video.playbackRate - initialSpeed) > 0.001) {
            video.playbackRate = initialSpeed;
          }
        }
        if (rootDs.abiLoopVideo === "on") {
          video.loop = true;
        }
        if (
          rootDs.abiAutoPlay === "on" &&
          video.paused &&
          !video.ended &&
          video.dataset.abiUserPaused !== "true" &&
          video.dataset.abiAutoplayed !== currentSrc
        ) {
          video.dataset.abiAutoplayed = currentSrc;
          video.play().catch(() => {});
        } else if (
          rootDs.abiAutoPlay === "off" &&
          !video.paused &&
          video.dataset.abiUserPlayed !== "true"
        ) {
          video.pause();
        }
        mediaLife = new AbortController();
        for (const name of [
          "timeupdate",
          "durationchange",
          "loadedmetadata",
          "loadstart",
          "play",
          "pause",
          "ended",
          "volumechange",
          "ratechange",
          "emptied",
          "seeking",
          "seeked",
          "error",
        ]) {
          video.addEventListener(
            name,
            (event) => {
              if (event.type === "loadstart") {
                delete video.dataset.abiUserPaused;
                delete video.dataset.abiUserPlayed;
                delete video.dataset.abiAutoplayed;
                delete video.dataset.abiSpeedInitialized;
                bookmarks = [];
                renderPins();
              }
              if (event.type === "durationchange") {
                renderPins();
              }
              if (
                event.type === "play" &&
                rootDs.abiAutoPlay === "off" &&
                video.dataset.abiUserPlayed !== "true"
              ) {
                video.pause();
              }
              render();
            },
            { signal: mediaLife.signal },
          );
        }
      }
      render();
    }
    function render() {
      const ready = finite();
      for (const id of ["play", "slower", "speedval", "faster", "mute", "volume", "pinButton", "reload"])
        if (ui[id]) ui[id].disabled = !video;
      for (const id of [
        "seek",
        "pinButton",
        "back10",
        "back5",
        "forward5",
        "forward10",
        "previous",
        "next",
      ])
        if (ui[id]) ui[id].disabled = !ready;
      const paused = !video || video.paused;
      decorate(
        ui.play,
        paused ? "play" : "pause",
        "",
        `${paused ? "Play" : "Pause"} video (Space or K)`,
      );
      ui.play.setAttribute(
        "aria-label",
        !video || video.paused ? "Play video" : "Pause video",
      );
      ui.time.textContent = `${format(video?.currentTime || 0)} / ${format(video?.duration)}`;
      ui.seek.max = ready ? String(video.duration) : "1";
      ui.seek.value = ready ? String(video.currentTime) : "0";
      ui.seek.style.setProperty(
        "--fill",
        `${ready ? Math.max(0, Math.min(100, (video.currentTime / video.duration) * 100)) : 0}%`,
      );
      ui.seek.setAttribute(
        "aria-valuetext",
        `${format(video?.currentTime || 0)} of ${format(video?.duration)}`,
      );
      if (video) {
        ui.volume.value = String(video.volume);
        ui.volume.style.setProperty(
          "--fill",
          `${video.muted ? 0 : video.volume * 100}%`,
        );
        decorate(
          ui.mute,
          video.muted || video.volume === 0 ? "volume-xmark" : "volume-high",
          "",
          `${video.muted ? "Unmute" : "Mute"} (Shift+M or icon)`,
        );
        ui.mute.setAttribute("aria-pressed", String(video.muted));
        const rate = video.playbackRate;
        ui.speedval.textContent = `${Number(rate.toFixed(2))}×`;
        ui.speedval.classList.toggle("changed", Math.abs(rate - 1) > 0.001);
        ui.slower.disabled = rate <= SPEEDS[0] + 0.001;
        ui.faster.disabled = rate >= SPEEDS[SPEEDS.length - 1] - 0.001;
      }
      ui.fullscreen.setAttribute(
        "aria-pressed",
        String(document.fullscreenElement === shell),
      );
      const expanded = document.fullscreenElement === shell;
      decorate(
        ui.fullscreen,
        expanded ? "compress" : "expand",
        "",
        expanded ? "Exit fullscreen (F or Escape)" : "Fullscreen (F)",
      );
    }
    function seek(time) {
      if (!finite()) {
        notice("Seeking unavailable until the video is ready");
        return;
      }
      try {
        video.currentTime = Math.max(0, Math.min(video.duration, time));
      } catch {
        notice("The official video is not seekable yet");
      }
      render();
    }
    function jump(amount) {
      if (video) seek(video.currentTime + amount);
    }
    function step(direction) {
      if (!video) return;
      video.pause();
      jump(direction / 30);
    }
    async function togglePlay() {
      selectVideo();
      if (!video) return;
      if (!video.paused) {
        video.dataset.abiUserPaused = "true";
        delete video.dataset.abiUserPlayed;
        try {
          video.pause();
        } catch {}
      } else {
        delete video.dataset.abiUserPaused;
        video.dataset.abiUserPlayed = "true";
        try {
          await video.play();
        } catch {
          notice("Playback unavailable — try the official player");
        }
      }
      render();
    }
    async function fullscreen() {
      try {
        if (document.fullscreenElement === shell)
          await document.exitFullscreen();
        else if (!document.fullscreenElement) await shell.requestFullscreen();
        else notice("Exit the current fullscreen view first");
      } catch {
        notice("Fullscreen unavailable in this browser context");
      }
    }
    // Speed ladder: one click per step; the value button resets to 1×.
    const SPEEDS = [0.1, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 3];
    function setSpeed(rate) {
      if (!video) return;
      video.playbackRate = rate;
      const currentSrc = video.currentSrc || video.src || "loaded";
      video.dataset.abiSpeedInitialized = currentSrc;
      const rootDs = document.documentElement.dataset;
      rootDs.abiPlaybackSpeed = String(rate);
      if (typeof chrome !== "undefined" && chrome.storage) {
        try {
          chrome.storage.local.set({ playbackSpeed: rate }).catch(() => {});
        } catch {}
      }
      render();
    }
    function stepSpeed(direction) {
      if (!video) return;
      const now = video.playbackRate;
      const next =
        direction > 0
          ? SPEEDS.find((s) => s > now + 0.001)
          : [...SPEEDS].reverse().find((s) => s < now - 0.001);
      if (next !== undefined) setSpeed(next);
    }
    const actions = {
      slower: () => stepSpeed(-1),
      faster: () => stepSpeed(1),
      speedval: () => setSpeed(1),
      play: togglePlay,
      back10: () => jump(-10),
      back5: () => jump(-5),
      forward5: () => jump(5),
      forward10: () => jump(10),
      previous: () => step(-1),
      next: () => step(1),
      mute: () => {
        if (video) {
          video.muted = !video.muted;
          render();
        }
      },
      pinButton: toggleBookmark,
      reload: reloadVideo,
      fullscreen,
    };
    for (const [id, fn] of Object.entries(actions))
      if (ui[id])
        on(ui[id], "click", (event) => {
          event?.preventDefault?.();
          event?.stopPropagation?.();
          selectVideo();
          fn();
        });
    function updateHoverBadge(e) {
      if (!finite() || !ui.hoverBadge) return;
      const rect = ui.seek.getBoundingClientRect();
      if (rect.width <= 0) return;
      const clampX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const ratio = clampX / rect.width;
      const hoverTime = ratio * video.duration;
      ui.hoverBadge.textContent = format(hoverTime);
      ui.hoverBadge.style.left = `${ratio * 100}%`;
      ui.hoverBadge.classList.add("visible");
    }
    function hideHoverBadge() {
      ui.hoverBadge?.classList.remove("visible");
    }
    on(ui.seek, "pointermove", updateHoverBadge);
    on(ui.seek, "pointerenter", updateHoverBadge);
    on(ui.seek, "pointerleave", hideHoverBadge);
    on(ui.seek, "pointerdown", updateHoverBadge);
    on(ui.seek, "input", () => seek(Number(ui.seek.value)));
    on(ui.volume, "input", () => {
      if (video) {
        video.volume = Number(ui.volume.value);
        video.muted = video.volume === 0;
        if (typeof chrome !== "undefined" && chrome.storage) {
          try {
            chrome.storage.local
              .set({ playerVolume: Math.round(video.volume * 100) })
              .catch(() => {});
          } catch {}
        }
        render();
      }
    });
    on(ui.keysButton, "click", () => ui.keysDialog.showModal());
    on(ui.keysClose, "click", () => ui.keysDialog.close());
    on(ui.keysDone, "click", () => ui.keysDialog.close());
    on(ui.keysDialog, "click", (event) => {
      if (event.target === ui.keysDialog) ui.keysDialog.close();
    });
    on(document, "fullscreenchange", render);
    // Click directly on video screen to toggle play/pause
    on(player, "click", (event) => {
      if (
        event.target instanceof Element &&
        !event.target.closest("button, a, input, select, textarea, [role='button'], [role='slider']")
      ) {
        togglePlay();
      }
    });
    // Stops extension button clicks from reaching any delegated page click handler.
    on(host, "click", (event) => event.stopPropagation());
    const playerObserver = new MutationObserver(() => {
      selectVideo();
      render();
    });
    playerObserver.observe(player, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["style", "class", "hidden", "data-used", "data-idx"],
    });
    on(window, "resize", () => {
      syncTheme();
      selectVideo();
      render();
    });
    selectVideo();
    render();
    shell.setAttribute("data-controls-ready", "");
    return {
      player,
      shell,
      host,
      selectVideo,
      key(event) {
        selectVideo();
        if (!video || !visible(video)) return;
        if (document.documentElement.dataset.abiVerdictHotkeys === "on") {
          const k = event.key.length === 1 ? event.key.toLowerCase() : event.key;
          let verdictTarget = null;
          let verdictName = "";
          if (k === "1" || k === "g") {
            verdictTarget = document.querySelector("#patrolButton0, #drillButton0, .operation a[data-index='1']");
            verdictName = "Violation";
          } else if (k === "2" || k === "u") {
            verdictTarget = document.querySelector("#patrolButton2, .operation a[data-index='2']");
            verdictName = "Uncertain";
          } else if (k === "3" || k === "i" || k === "c") {
            verdictTarget = document.querySelector("#patrolButton1, #drillButton1, .operation a[data-index='0']");
            verdictName = "No Violation";
          }
          if (verdictTarget && visible(verdictTarget)) {
            event.preventDefault();
            event.stopImmediatePropagation();
            verdictTarget.click();
            notice(`Verdict: ${verdictName}`);
            return;
          }
        }
        if (event.key.toLowerCase() === "m") {
          if (event.shiftKey) {
            event.preventDefault();
            event.stopImmediatePropagation();
            actions.mute();
            return;
          }
          event.preventDefault();
          event.stopImmediatePropagation();
          toggleBookmark();
          return;
        }
        if (event.key.toLowerCase() === "b") {
          event.preventDefault();
          event.stopImmediatePropagation();
          toggleBookmark();
          return;
        }
        const keys = {
          " ": "play",
          k: "play",
          j: "back5",
          l: "forward5",
          ArrowLeft: "back5",
          ArrowRight: "forward5",
          ",": "previous",
          ".": "next",
          f: "fullscreen",
          "[": "slower",
          "]": "faster",
          "\\": "speedval",
        };
        const action =
          keys[event.key.length === 1 ? event.key.toLowerCase() : event.key];
        if (!action) return;
        event.preventDefault();
        event.stopImmediatePropagation();
        if (event.repeat && ["play", "mute", "fullscreen"].includes(action))
          return;
        actions[action]();
      },
      destroy() {
        shell.removeAttribute("data-controls-ready");
        life.abort();
        mediaLife?.abort();
        playerObserver.disconnect();
        clearTimeout(noticeTimer);
        // Never delete an official subtree during rerender cleanup.
        host.remove();
        if (shell.isConnected) {
          // A site rerender may have already inserted a NEW official player into
          // our wrapper. Unwrap every remaining child instead of deleting it.
          const parent = shell.parentElement;
          while (shell.firstChild) {
            if (typeof parent.moveBefore === "function")
              parent.moveBefore(shell.firstChild, shell);
            else parent.insertBefore(shell.firstChild, shell);
          }
          shell.remove();
        }
      },
    };
  }

  function reconcile() {
    queued = false;
    const player = activePlayer();
    if (
      instance &&
      (instance.player !== player ||
        !instance.shell.isConnected ||
        player?.parentElement !== instance.shell)
    ) {
      instance.destroy();
      instance = null;
    }
    if (player && !instance) instance = create(player);
    else if (instance) {
      if (!instance.host.isConnected) instance.shell.append(instance.host);
      instance.selectVideo();
    }
  }
  const documentObserver = new MutationObserver(() => {
    if (!queued) {
      queued = true;
      requestAnimationFrame(reconcile);
    }
  });
  documentObserver.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
  document.addEventListener(
    "click",
    (event) => {
      if (event.target instanceof Element && event.target.closest(".main .nav > li")) {
        requestAnimationFrame(() => {
          if (!queued) {
            queued = true;
            requestAnimationFrame(reconcile);
          }
        });
      }
    },
    true,
  );
  document.addEventListener(
    "keydown",
    (event) => {
      if (
        event.defaultPrevented ||
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        event.shiftKey ||
        event.isComposing
      )
        return;
      // Respect all editing and interactive controls, including links/buttons anywhere
      // on the official page. Shadow DOM targets are checked via composedPath().
      if (
        event
          .composedPath()
          .some(
            (node) =>
              node instanceof Element &&
              (node.isContentEditable ||
                node.matches(
                  'input,textarea,select,button,a,[role="textbox"],[role="slider"],[role="button"],[role="dialog"],[aria-modal="true"]',
                )),
          )
      )
        return;
      instance?.key(event);
    },
    true,
  );
  reconcile();
}

// "Player controls" switch (popup). Read once per page load; changing it takes
// effect after the Inspector page is reloaded.
if (typeof chrome !== "undefined" && chrome.storage) {
  try {
    chrome.storage.local.get({ controls: true, extensionEnabled: true }, (res) => {
      const current = res || { controls: true, extensionEnabled: true };
      const active = current.extensionEnabled !== false && current.controls;
      document.documentElement.dataset.abiControlsLoaded = active ? "on" : "off";
      if (active) main();
    });
  } catch {
    main();
  }
} else {
  main();
}
