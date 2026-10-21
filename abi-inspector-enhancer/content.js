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
    clock: {
      viewBox: "0 0 512 512",
      d: "M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z",
    },
    gamma: {
      viewBox: "0 0 512 512",
      d: "M256 160c-53 0-96 43-96 96s43 96 96 96 96-43 96-96-43-96-96-96zm0-96c13.3 0 24-10.7 24-24V16c0-13.3-10.7-24-24-24s-24 10.7-24 24v24c0 13.3 10.7 24 24 24zm0 384c-13.3 0-24 10.7-24 24v24c0 13.3 10.7 24 24 24s24-10.7 24-24v-24c0-13.3-10.7-24-24-24zm192-216h-24c-13.3 0-24 10.7-24 24s10.7 24 24 24h24c13.3 0 24-10.7 24-24s-10.7-24-24-24zM96 256c0-13.3-10.7-24-24-24H24c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24zm297.9-141.9c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l17 17c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-17-17zm-273.8 274c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l17 17c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-17-17zm0-274l-17 17c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l17-17c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0zm273.8 274l-17 17c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l17-17c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0z",
    },
    repeat: {
      viewBox: "0 0 512 512",
      d: "M0 224c0 17.7 14.3 32 32 32s32-14.3 32-32c0-53 43-96 96-96l160 0 0 32c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l64-64c12.5-12.5 12.5-32.8 0-45.3l-64-64c-9.2-9.2-22.9-11.9-34.9-6.9S320 19.1 320 32l0 32L160 64C71.6 64 0 135.6 0 224zm512 64c0-17.7-14.3-32-32-32s-32 14.3-32 32c0 53-43 96-96 96l-160 0 0-32c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9 6.9l-64 64c-12.5 12.5-12.5 32.8 0 45.3l64 64c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.7 19.8-29.6l0-32 160 0c88.4 0 160-71.6 160-160z",
    },
    vision: {
      viewBox: "0 0 576 512",
      d: "M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.9-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.6c11.9 44.4 52.4 75.3 98.8 75.3c56.3 0 102-45.7 102-102c0-46.4-30.9-86.9-75.3-98.8c-6.8-1.9-13.7-2.9-20.6-3.2c-5.8-.2-9.2 6.2-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z",
    },
  };
  const styles = `
    :host { display:block; color:var(--abi-text,#e0e3de); font-family:var(--abi-font,"Arial Narrow",sans-serif); font-weight:var(--abi-weight,700); letter-spacing:var(--abi-tracking,0px); color-scheme:dark; }
    * { box-sizing:border-box; }
    :host { min-width:0; width:100%; box-sizing:border-box; transition:opacity 0.15s ease; }
    :host(.abi-hud-hidden) { opacity:0 !important; pointer-events:none !important; cursor:none !important; transition:opacity 0.35s ease !important; }
    :host(.abi-hud-hidden) * { cursor:none !important; }
    .icon { width:14px; height:14px; fill:currentColor; flex:none; pointer-events:none; }
    button { display:inline-flex; align-items:center; justify-content:center; gap:6px; }

    /* Single Row Panel with Top-Edge Scrubber */
    .panel {
      position: relative;
      padding: 0 14px 10px;
      background: linear-gradient(180deg,#13191c 0%,#0d1113 100%);
      border: 1px solid rgba(255,255,255,0.08);
      border-top: 0;
      border-radius: 0 0 10px 10px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.4);
      container-type: inline-size;
    }

    /* Top-Edge Sleek Scrubber */
    .timeline {
      display: flex;
      align-items: center;
      height: 22px;
      margin-bottom: 4px;
      position: relative;
    }
    .timeline-bar {
      position: relative;
      flex: 1 1 0;
      display: flex;
      align-items: center;
      height: 100%;
      min-width: 0;
    }
    .timeline-pins { position: absolute; inset: 0; pointer-events: none; }
    .timeline-pin {
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 6px;
      height: 14px;
      background: var(--abi-pin-color,#f59e0b);
      border: 1px solid #ffffff;
      border-radius: 2px;
      cursor: pointer;
      pointer-events: auto;
      z-index: 3;
      box-shadow: 0 0 4px var(--abi-pin-glow,rgba(245,158,11,0.8));
      transition: transform .1s ease, background .15s ease;
    }
    .timeline-pin:hover {
      transform: translate(-50%, -50%) scale(1.3);
      background: var(--abi-accent,#fbbf24);
      box-shadow: 0 0 8px var(--abi-accent-glow,rgba(251,191,36,1));
    }
    .loop-range {
      position: absolute;
      top: 1px;
      bottom: 1px;
      background: rgba(var(--abi-accent-rgb,245,158,11),0.3);
      border-left: 2px solid var(--abi-accent,#f59e0b);
      border-right: 2px solid var(--abi-accent,#f59e0b);
      border-radius: 2px;
      pointer-events: none;
      z-index: 2;
      box-shadow: 0 0 6px var(--abi-accent-glow,rgba(245,158,11,0.5));
    }
    .loop-range::before, .loop-range::after {
      position: absolute;
      top: -14px;
      font-size: 9px;
      font-family: ui-monospace, "Cascadia Mono", monospace;
      font-weight: 800;
      line-height: 1;
      padding: 1px 3px;
      border-radius: 2px;
      background: var(--abi-accent,#f59e0b);
      color: #0b0f11;
      letter-spacing: 0;
    }
    .loop-range::before {
      content: "A";
      left: 0;
      transform: translateX(-50%);
    }
    .loop-range::after {
      content: "B";
      right: 0;
      transform: translateX(50%);
    }
    .hover-badge {
      position: absolute;
      bottom: calc(100% + 4px);
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

    /* Single Controls Row */
    .row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      width: 100%;
    }
    .left {
      display: flex;
      align-items: center;
      gap: 5px;
      flex: 0 0 auto;
    }
    .center {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      flex: 0 1 auto;
    }
    .right {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 7px;
      flex: 0 0 auto;
    }
    .group {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    /* Timecode Display */
    .time {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 26px;
      min-width: 96px;
      box-sizing: border-box;
      font-family: ui-monospace, "Cascadia Mono", "Segoe UI Mono", "Liberation Mono", Menlo, Monaco, Consolas, monospace;
      font-size: 12px;
      font-variant-numeric: tabular-nums;
      font-feature-settings: "tnum" 1;
      white-space: nowrap;
      color: #8fa09d;
      font-weight: 700;
      letter-spacing: 0.03em;
      cursor: pointer;
      user-select: none;
      padding: 0 8px;
      border-radius: 4px;
      border: 1px solid transparent;
      text-align: center;
      transition: color .15s ease, background .15s ease, border-color .15s ease;
    }
    .time[data-precision="ms"],
    :host-context([data-time-precision="ms"]) .time {
      min-width: 154px;
    }
    .time:hover {
      color: #ffffff;
      background: rgba(255,255,255,0.08);
      border-color: rgba(255,255,255,0.12);
    }
    .time:focus-visible { outline: 1px solid var(--abi-accent,#e66b4e); outline-offset: 1px; }

    /* Center Frames Control */
    .frames-control {
      display: inline-flex;
      align-items: center;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 5px;
      padding: 1px;
      gap: 1px;
    }
    .frames-control button {
      width: 26px;
      height: 26px;
      padding: 0;
      border: 0;
      background: transparent;
      border-radius: 4px;
      color: #a0adaa;
    }
    .frames-control button:hover {
      background: rgba(255,255,255,0.1);
      color: #ffffff;
      transform: none;
    }

    /* Button Styles */
    button {
      font: inherit;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.03em;
      text-transform: uppercase;
      height: 30px;
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 4px;
      color: #c5cec9;
      background: rgba(255,255,255,0.04);
      padding: 0 8px;
      cursor: pointer;
      white-space: nowrap;
      box-shadow: none;
      transition: all .15s ease;
    }
    button:hover {
      border-color: rgba(255,255,255,0.22);
      background: rgba(255,255,255,0.09);
      color: #ffffff;
      transform: translateY(-1px);
    }
    button:active { transform: translateY(0); }
    button[aria-pressed=true] {
      color: var(--abi-accent,#e66b4e);
      border-color: var(--abi-accent,#e66b4e);
      background: rgba(var(--abi-accent-rgb,230,107,78),0.12);
    }

    .primary {
      width: 38px;
      height: 32px;
      padding: 0;
      color: #ffffff;
      border: 1.5px solid var(--abi-accent,#d95338);
      background: linear-gradient(135deg,rgba(var(--abi-accent-rgb,217,83,56),0.3),rgba(var(--abi-accent-rgb,160,42,22),0.45));
      border-radius: 6px;
      box-shadow: 0 2px 10px var(--abi-accent-glow,rgba(195,71,45,0.35));
    }
    .primary:hover {
      border-color: var(--abi-accent-hover,#ff684a);
      background: linear-gradient(135deg,rgba(var(--abi-accent-rgb,230,107,78),0.45),rgba(var(--abi-accent-rgb,195,71,45),0.6));
      box-shadow: 0 4px 14px var(--abi-accent-glow,rgba(195,71,45,0.5));
    }

    #back10, #back5, #forward5, #forward10 {
      padding: 0 7px;
      font-size: 11px;
      font-variant-numeric: tabular-nums;
    }

    /* Remade Speed Control & Popup Menu */
    .speed-control-wrap {
      position: relative;
    }
    #speedval {
      min-width: 46px;
      padding: 0 8px;
      text-transform: none;
      background: rgba(255,255,255,0.06);
      border-color: rgba(255,255,255,0.12);
      color: #e0e3de;
      font-weight: 800;
      font-variant-numeric: tabular-nums;
      border-radius: 5px;
    }
    #speedval:hover {
      border-color: rgba(255,255,255,0.25);
      background: rgba(255,255,255,0.1);
    }
    #speedval.changed {
      color: var(--abi-accent, #b8d66a);
      border-color: var(--abi-accent, #b8d66a);
      background: rgba(var(--abi-accent-rgb, 184,214,106), 0.14);
      box-shadow: 0 0 8px var(--abi-accent-glow, rgba(184,214,106,0.3));
    }

    .speed-menu {
      position: absolute;
      bottom: calc(100% + 8px);
      right: 0;
      background: #111719;
      border: 1px solid var(--abi-border, rgba(255,255,255,0.16));
      border-radius: 8px;
      padding: 10px;
      box-shadow: 0 12px 36px rgba(0,0,0,0.85);
      z-index: 60;
      min-width: 176px;
      backdrop-filter: blur(8px);
      display: flex;
      flex-direction: column;
      gap: 8px;
      animation: abi-fade-in .15s ease-out;
    }
    .speed-menu[hidden] {
      display: none !important;
    }
    @keyframes abi-fade-in {
      from { opacity: 0; transform: translateY(4px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .speed-menu-title {
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #8fa09d;
      margin-bottom: 2px;
      padding-inline: 2px;
    }
    .speed-menu-presets {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 4px;
    }
    .speed-menu-opt {
      height: 26px;
      padding: 0 4px;
      font-size: 11px;
      font-weight: 700;
      font-variant-numeric: tabular-nums;
      text-transform: none;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 4px;
      color: #c5cec9;
    }
    .speed-menu-opt:hover {
      background: rgba(255,255,255,0.12);
      border-color: rgba(255,255,255,0.22);
      color: #ffffff;
      transform: none;
    }
    .speed-menu-opt.active {
      color: #ffffff;
      background: rgba(var(--abi-accent-rgb, 217, 83, 56), 0.25);
      border-color: var(--abi-accent, #d95338);
      font-weight: 800;
      box-shadow: 0 0 6px var(--abi-accent-glow, rgba(217,83,56,0.4));
    }
    .speed-menu-stepper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 6px;
      padding-top: 6px;
      border-top: 1px solid rgba(255,255,255,0.08);
    }
    .speed-step-btn {
      flex: 1 1 0;
      height: 26px;
      padding: 0;
      font-size: 13px;
      font-weight: 800;
    }
    .speed-step-label {
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #6d7d7b;
      white-space: nowrap;
    }

    /* Right Group Action Buttons */
    #mute, #fullscreen, #reload, #previous, #next, #pinButton, #gamma, #loopBtn {
      width: 30px;
      height: 30px;
      padding: 0;
    }
    #pinButton {
      color: var(--abi-pin-color,#f59e0b);
    }
    #pinButton:hover {
      color: var(--abi-accent,#fbbf24);
      border-color: var(--abi-accent-glow,rgba(245,158,11,0.4));
    }
    #loopBtn.active {
      color: var(--abi-accent,#fbbf24);
      border-color: var(--abi-accent,#f59e0b);
      background: rgba(var(--abi-accent-rgb,245,158,11),0.18);
      box-shadow: 0 0 8px var(--abi-accent-glow,rgba(245,158,11,0.3));
    }
    #visionBtn.active {
      color: #38bdf8;
      border-color: rgba(56,189,248,0.6);
      background: rgba(56,189,248,0.18);
      box-shadow: 0 0 8px rgba(56,189,248,0.35);
    }
    #gamma.active {
      color: #fbbf24;
      border-color: rgba(245,158,11,0.5);
      background: rgba(245,158,11,0.15);
    }
    #reload.spinning .icon {
      animation: abi-reload-spin .6s cubic-bezier(0.4, 0, 0.2, 1);
    }
    @keyframes abi-reload-spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    button:disabled,input:disabled { opacity:.35; cursor:default; }
    :focus-visible { outline:1px solid var(--abi-text,#e0e3de); outline-offset:2px; }
    input[type=range] { appearance:none; -webkit-appearance:none; height:18px; margin:0; padding:0; border:0; background:transparent; cursor:pointer; min-width:0; border-radius:0; }
    #seek { flex:1 1 0; width:0; }
    #seek::-webkit-slider-runnable-track { height:4px; border:0; border-radius:999px; background:linear-gradient(to right,var(--abi-track-fill,#e66b4e) 0 var(--fill,0%),rgba(255,255,255,0.25) var(--fill,0%) var(--buffer,var(--fill,0%)),rgba(255,255,255,0.08) var(--buffer,var(--fill,0%)) 100%); box-shadow:0 0 6px var(--abi-track-glow,rgba(230,107,78,0.3)); }
    #seek::-webkit-slider-thumb { appearance:none; -webkit-appearance:none; width:12px; height:12px; margin-top:-4px; border:2px solid #ffffff; border-radius:50%; background:var(--abi-track-fill,#e66b4e); box-shadow:0 0 8px var(--abi-track-glow,rgba(230,107,78,0.8)); transition:transform .1s ease; }
    #seek:hover::-webkit-slider-thumb { transform:scale(1.25); }
    #volume { width:52px; }
    #volume::-webkit-slider-runnable-track { height:3px; border:0; border-radius:999px; background:linear-gradient(to right,#b8d66a 0 var(--fill,100%),rgba(255,255,255,0.1) var(--fill,100%) 100%); }
    #volume::-webkit-slider-thumb { appearance:none; -webkit-appearance:none; width:8px; height:8px; margin-top:-2.5px; border:1px solid #ffffff; border-radius:50%; background:#b8d66a; box-shadow:0 0 5px rgba(184,214,106,0.7); transition:transform .1s ease; }
    #volume:hover::-webkit-slider-thumb { transform:scale(1.25); }

    #status {
      position: absolute;
      bottom: calc(100% + 14px);
      left: 50%;
      transform: translateX(-50%);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      max-width: min(90%, 450px);
      padding: 6px 14px;
      background: rgba(14, 18, 20, 0.94);
      border: 1px solid var(--abi-border, rgba(255, 255, 255, 0.16));
      border-radius: 6px;
      color: #f0f3ee;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.03em;
      white-space: nowrap;
      pointer-events: none;
      z-index: 50;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(6px);
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.15s ease, visibility 0.15s ease, transform 0.15s ease;
    }
    #status.visible {
      opacity: 1;
      visibility: visible;
      transform: translateX(-50%) translateY(-2px);
    }
    #status:empty { display: none; }

    .stream-health {
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 4px;
      width: 24px;
      height: 24px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      cursor: pointer;
      position: relative;
      transition: all 0.15s ease;
    }
    .stream-health:hover {
      border-color: rgba(255, 255, 255, 0.25);
      background: rgba(255, 255, 255, 0.06);
    }
    .stream-health .stream-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #4ade80;
      box-shadow: 0 0 6px rgba(74, 222, 128, 0.7);
      transition: background 0.2s ease, box-shadow 0.2s ease;
    }
    .stream-health[data-state="buffering"] .stream-dot {
      background: #f59e0b;
      box-shadow: 0 0 8px rgba(245, 158, 11, 0.85);
      animation: streamPulse 0.85s infinite alternate ease-in-out;
    }
    .stream-health[data-state="error"] .stream-dot {
      background: #ef4444;
      box-shadow: 0 0 8px rgba(239, 68, 68, 0.85);
    }
    .stream-health[data-state="idle"] .stream-dot {
      background: #64748b;
      box-shadow: none;
    }
    @keyframes streamPulse {
      0% { opacity: 0.35; transform: scale(0.85); }
      100% { opacity: 1; transform: scale(1.18); }
    }

    @container (max-width: 820px) {
      .row { gap: 6px; }
      #back10, #forward10 { display: none; }
      #volume { width: 40px; }
    }
    @container (max-width: 650px) {
      .center { gap: 6px; }
      #volume { display: none; }
    }
    @media(max-width:600px) {
      .panel { padding-inline:8px; }
      button { padding-inline:6px; font-size:11px; }
      .group { padding-inline:2px; }
    }
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

  const format = (value, showMs = false) => {
    if (!Number.isFinite(value)) return showMs ? "--:--.---" : "--:--";
    const totalSec = Math.max(0, value);
    const seconds = Math.floor(totalSec);
    const ms = Math.min(999, Math.max(0, Math.floor(((totalSec * 1000) + 1e-4) % 1000)));
    const h = Math.floor(seconds / 3600);
    const base = `${h ? `${h}:` : ""}${String(Math.floor(seconds / 60) % 60).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
    return showMs ? `${base}.${String(ms).padStart(3, "0")}` : base;
  };

  function create(player) {
    const shell = document.createElement("abi-local-player");
    const host = document.createElement("abi-local-controls");
    const life = new AbortController();
    const on = (el, name, fn, capture = false) =>
      el.addEventListener(name, fn, { signal: life.signal, capture });
    const tab = document.querySelector(".nav #working, .nav #drill");
    const activeTab = document.querySelector(".nav li.current");
    const idleTab = document.querySelector(".nav li:not(.current)");
    const note = player.closest(".content.video")?.querySelector(".tips-title");
    const nav = document.querySelector(".main .nav, .nav");
    const ACCENT_MAP = {
      amber: {
        accent: "#d49a37",
        glow: "rgba(212, 154, 55, 0.4)",
        rgb: "212, 154, 55",
        hover: "#e5ab48",
        track: "#e66b4e",
        trackGlow: "rgba(230, 107, 78, 0.4)",
        pin: "#f59e0b",
        pinGlow: "rgba(245, 158, 11, 0.8)",
      },
      green: {
        accent: "#3fb950",
        glow: "rgba(63, 185, 80, 0.4)",
        rgb: "63, 185, 80",
        hover: "#56d364",
        track: "#3fb950",
        trackGlow: "rgba(63, 185, 80, 0.4)",
        pin: "#56d364",
        pinGlow: "rgba(86, 211, 100, 0.8)",
      },
      blue: {
        accent: "#58a6ff",
        glow: "rgba(88, 166, 255, 0.4)",
        rgb: "88, 166, 255",
        hover: "#79c0ff",
        track: "#58a6ff",
        trackGlow: "rgba(88, 166, 255, 0.4)",
        pin: "#79c0ff",
        pinGlow: "rgba(121, 192, 255, 0.8)",
      },
      crimson: {
        accent: "#f85149",
        glow: "rgba(248, 81, 73, 0.4)",
        rgb: "248, 81, 73",
        hover: "#ff7b72",
        track: "#f85149",
        trackGlow: "rgba(248, 81, 73, 0.4)",
        pin: "#ff7b72",
        pinGlow: "rgba(255, 123, 114, 0.8)",
      },
    };

    function applyAccentTheme(accentKey) {
      const key = accentKey || document.documentElement.dataset.abiHudAccent || "amber";
      const theme = ACCENT_MAP[key] || ACCENT_MAP.amber;
      for (const target of [shell, host]) {
        target.style.setProperty("--abi-accent", theme.accent);
        target.style.setProperty("--abi-accent-glow", theme.glow);
        target.style.setProperty("--abi-accent-rgb", theme.rgb);
        target.style.setProperty("--abi-accent-hover", theme.hover);
        target.style.setProperty("--abi-track-fill", theme.track);
        target.style.setProperty("--abi-track-glow", theme.trackGlow);
        target.style.setProperty("--abi-pin-color", theme.pin);
        target.style.setProperty("--abi-pin-glow", theme.pinGlow);
      }
    }

    function syncTheme() {
      const tabStyle = tab && getComputedStyle(tab);
      const idleStyle = idleTab && getComputedStyle(idleTab);
      const noteStyle = note && getComputedStyle(note);
      const navStyle = nav && getComputedStyle(nav);
      if (tabStyle) {
        shell.style.setProperty("--abi-font", tabStyle.fontFamily);
        shell.style.setProperty("--abi-weight", tabStyle.fontWeight);
        shell.style.setProperty("--abi-tracking", tabStyle.letterSpacing);
      }
      applyAccentTheme();
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
    try {
      const accentObserver = new MutationObserver(() => applyAccentTheme());
      accentObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-abi-hud-accent"],
      });
      life.signal.addEventListener("abort", () => accentObserver.disconnect());
    } catch {}
    window.addEventListener("abi-accent-change", (e) => {
      applyAccentTheme(e.detail?.accent);
    }, { signal: life.signal });
    shell.getHudAccent = () => document.documentElement.dataset.abiHudAccent || "amber";
    shell.setHudAccent = (accent) => applyAccentTheme(accent);
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
          <div id="loopRange" class="loop-range" hidden></div>
          <div id="hoverBadge" class="hover-badge" aria-hidden="true">00:00</div>
        </div>
      </div>
      <div class="row">
        <div class="left">
          <div class="group" role="group" aria-label="Playback"><button id="play" class="primary" title="Play / Pause (Space or K)">Play</button></div>
          <div class="group seek-group" role="group" aria-label="Seek"><button id="back10" title="Back 10 seconds">−10s</button><button id="back5" title="Back 5 seconds (J or Left)">−5s</button><button id="forward5" title="Forward 5 seconds (L or Right)">+5s</button><button id="forward10" title="Forward 10 seconds">+10s</button></div>
        </div>
        <div class="center">
          <div class="frames-control" role="group" aria-label="Frame stepping and time">
            <button id="previous" title="Previous frame (,)" aria-label="Previous frame (comma)"></button>
            <span class="time" id="time" role="button" tabindex="0" title="Click to toggle millisecond precision">00:00 / --:--</span>
            <button id="next" title="Next frame (.)" aria-label="Next frame (period)"></button>
          </div>
        </div>
        <div class="right">
          <div class="speed-control-wrap" id="speedControlWrap">
            <button id="speedval" class="speed-pill" title="Playback speed (click for presets, \\ to reset)" aria-label="Playback speed" aria-haspopup="true" aria-expanded="false">1×</button>
            <div id="speedMenu" class="speed-menu" role="menu" aria-label="Playback speed presets" hidden>
              <div class="speed-menu-title">Playback Speed</div>
              <div class="speed-menu-presets">
                <button type="button" class="speed-menu-opt" data-speed="0.25">0.25×</button>
                <button type="button" class="speed-menu-opt" data-speed="0.5">0.5×</button>
                <button type="button" class="speed-menu-opt" data-speed="0.75">0.75×</button>
                <button type="button" class="speed-menu-opt" data-speed="1">1.0×</button>
                <button type="button" class="speed-menu-opt" data-speed="1.25">1.25×</button>
                <button type="button" class="speed-menu-opt" data-speed="1.5">1.5×</button>
                <button type="button" class="speed-menu-opt" data-speed="2">2.0×</button>
              </div>
              <div class="speed-menu-stepper">
                <button id="slower" class="speed-step-btn" title="Slower (-)" aria-label="Slower playback (-)">−</button>
                <span class="speed-step-label">Fine Tune</span>
                <button id="faster" class="speed-step-btn" title="Faster (+)" aria-label="Faster playback (+)">+</button>
              </div>
            </div>
          </div>
          <div class="group volume-group" role="group" aria-label="Audio"><button id="mute" title="Mute (Shift+M or icon)" aria-pressed="false">Mute</button><input id="volume" type="range" min="0" max="1" step="0.01" value="1" aria-label="Volume"></div>
          <div class="group tool-group" role="group" aria-label="Tools">
            <button id="pinButton" title="Drop moment bookmark (M)" aria-label="Drop moment bookmark (M)">Bookmark</button>
            <button id="loopBtn" title="A/B Loop Repeat: Set In ([) / Out (]); Clear (\)" aria-label="A/B Loop Repeat: Set In ([) / Out (]); Clear (\)">Loop</button>
            <button id="gamma" title="Shadow, Gamma & Vision Modes (G)" aria-label="Shadow, Gamma & Vision Modes (G)">Gamma</button>
            <button id="streamHealth" class="stream-health" role="status" aria-label="Stream health: Ready" title="Stream: Ready" type="button"><span class="stream-dot"></span></button>
            <button id="reload" title="Reload player" aria-label="Reload player">Reload</button>
            <button id="fullscreen" title="Fullscreen (F); Escape to exit" aria-pressed="false">Fullscreen</button>
          </div>
        </div>
      </div>
      <div id="status" role="status" aria-live="polite"></div>`;
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
    decorate(ui.loopBtn, "repeat", "", "A/B Loop Repeat: Set In ([) / Out (]); Clear (\\)");
    decorate(ui.gamma, "gamma", "", "Shadow, Gamma & Vision Modes (G)");
    decorate(ui.reload, "reload", "", "Reload player");
    player.before(shell);
    // Keep the complete original subtree together, including all overlays.
    // Modern Chromium supports a state-preserving DOM move.
    if (typeof shell.moveBefore === "function") shell.moveBefore(player, null);
    else shell.append(player);
    shell.append(host);

    if (!document.getElementById("abi-case-expiry-styles")) {
      const styleEl = document.createElement("style");
      styleEl.id = "abi-case-expiry-styles";
      styleEl.textContent = `
        @keyframes abi-case-expiry-pulse {
          0%, 100% {
            border-color: rgba(245, 158, 11, 0.6) !important;
            box-shadow: 0 0 10px rgba(245, 158, 11, 0.35) !important;
          }
          50% {
            border-color: rgba(239, 68, 68, 0.95) !important;
            box-shadow: 0 0 22px rgba(239, 68, 68, 0.7) !important;
          }
        }
        :is(#xcWorking > .content.video, .content.video:has(#drillButton)):has(abi-local-player) .play-box > abi-local-player.abi-case-expiring,
        abi-local-player.abi-case-expiring {
          animation: abi-case-expiry-pulse 1.8s infinite ease-in-out !important;
        }

        /* Tactical Hold-to-Zoom Loupe */
        .abi-zoom-badge {
          position: absolute !important;
          top: 14px !important;
          left: 14px !important;
          z-index: 25 !important;
          display: none !important;
          align-items: center !important;
          gap: 6px !important;
          padding: 4px 10px !important;
          background: rgba(14, 20, 22, 0.88) !important;
          border: 1px solid rgba(239, 68, 68, 0.8) !important;
          border-radius: 4px !important;
          color: #fca5a5 !important;
          font-family: var(--abi-font, "Arial Narrow", sans-serif) !important;
          font-size: 11px !important;
          font-weight: 800 !important;
          letter-spacing: 0.1em !important;
          text-transform: uppercase !important;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.6), 0 0 10px rgba(239, 68, 68, 0.35) !important;
          pointer-events: none !important;
          user-select: none !important;
        }
        .abi-zoom-badge.active {
          display: inline-flex !important;
        }
        abi-local-player > :first-child {
          overflow: hidden !important;
        }

        /* Case Expiry Card mounted directly below the Inspection Notes box in .info-team */
        :is(#xcWorking > .content.video, .content.video:has(#drillButton)) .abi-case-expiry-badge,
        .info-team .abi-case-expiry-badge {
          position: static !important;
          display: flex !important;
          flex-direction: column !important;
          gap: 8px !important;
          width: 100% !important;
          height: auto !important;
          min-width: 0 !important;
          flex: 0 0 auto !important;
          flex-shrink: 0 !important;
          box-sizing: border-box !important;
          margin: 0 !important;
          padding: 14px 16px !important;
          border: 1px solid rgba(255, 255, 255, 0.08) !important;
          border-radius: 8px !important;
          background: rgba(14, 19, 21, 0.65) !important;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4) !important;
          cursor: pointer !important;
          user-select: none !important;
          backdrop-filter: blur(4px);
          transition: border-color .3s ease, color .3s ease, background .3s ease, box-shadow .3s ease !important;
        }

        :is(#xcWorking > .content.video, .content.video:has(#drillButton)) .abi-case-expiry-badge:hover,
        .info-team .abi-case-expiry-badge:hover {
          border-color: rgba(255, 255, 255, 0.18) !important;
          background: rgba(18, 24, 27, 0.75) !important;
        }

        .abi-case-expiry-badge .abi-expiry-header {
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          width: 100% !important;
          gap: 12px !important;
        }

        .abi-case-expiry-badge .abi-expiry-title-group {
          display: flex !important;
          align-items: center !important;
          gap: 8px !important;
        }

        .abi-case-expiry-badge .abi-expiry-icon {
          width: 14px !important;
          height: 14px !important;
          fill: #e66b4e !important;
          flex: none !important;
        }

        .abi-case-expiry-badge .abi-expiry-label {
          color: #929a9b !important;
          font-size: 11px !important;
          font-weight: 800 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.08em !important;
          font-family: var(--abi-font, "Arial Narrow", sans-serif);
        }

        .abi-case-expiry-badge .abi-expiry-time {
          font-size: 15px !important;
          font-weight: 800 !important;
          letter-spacing: 0.05em !important;
          font-variant-numeric: tabular-nums !important;
          color: #f0f3ee !important;
          font-family: var(--abi-font, "Arial Narrow", sans-serif);
        }

        .abi-case-expiry-badge .abi-expiry-desc {
          font-size: 11px !important;
          line-height: 1.45 !important;
          color: #889391 !important;
          font-family: var(--abi-font, "Arial Narrow", sans-serif);
        }

        /* Fallback floating appearance if directly inside player shell */
        abi-local-player > .abi-case-expiry-badge {
          position: absolute !important;
          top: 12px !important;
          right: 14px !important;
          z-index: 30 !important;
          display: inline-flex !important;
          width: auto !important;
          padding: 5px 12px !important;
          background: rgba(14, 18, 20, 0.88) !important;
          border: 1px solid rgba(255, 255, 255, 0.16) !important;
          border-radius: 6px !important;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.55) !important;
        }
        abi-local-player > .abi-case-expiry-badge .abi-expiry-desc {
          display: none !important;
        }
        abi-local-player > .abi-case-expiry-badge .abi-expiry-header {
          display: inline-flex !important;
          gap: 7px !important;
        }
        abi-local-player > .abi-case-expiry-badge .abi-expiry-time {
          font-size: 12px !important;
        }

        .abi-case-expiry-badge.abi-case-expiring {
          background: rgba(30, 16, 14, 0.92) !important;
          color: #fca5a5 !important;
          animation: abi-case-expiry-pulse 1.8s infinite ease-in-out !important;
        }
        .abi-case-expiry-badge.abi-case-expiring .abi-expiry-label {
          color: #f87171 !important;
        }
        .abi-case-expiry-badge.abi-case-expiring .abi-expiry-icon {
          fill: #f87171 !important;
        }
        .abi-case-expiry-badge.abi-case-expiring .abi-expiry-time {
          color: #fecaca !important;
        }
        .abi-case-expiry-badge.abi-case-expiring .abi-expiry-desc {
          color: #fca5a5 !important;
        }

        .abi-case-expiry-badge.abi-case-expired {
          background: rgba(45, 10, 10, 0.95) !important;
          color: #ef4444 !important;
          border-color: #ef4444 !important;
          box-shadow: 0 0 14px rgba(239, 68, 68, 0.6) !important;
        }
        .abi-case-expiry-badge.abi-case-expired .abi-expiry-time {
          color: #ef4444 !important;
        }
        .abi-case-expiry-badge.abi-case-expired .abi-expiry-desc {
          color: #f87171 !important;
        }
      `;
      (document.head || document.documentElement).append(styleEl);
    }

    const isDrill = Boolean(
      player.closest("#drill") ||
      player.closest(".content.video:has(#drillButton)") ||
      document.querySelector(".nav #drill.current")
    );

    let expiryInterval = null;
    let expiryBadge = null;
    if (!isDrill) {
      expiryBadge = document.createElement("div");
      expiryBadge.id = "caseExpiryBadge";
      expiryBadge.className = "abi-case-expiry-badge";
      expiryBadge.setAttribute("role", "timer");
      expiryBadge.setAttribute("aria-live", "polite");

      const header = document.createElement("div");
      header.className = "abi-expiry-header";

      const titleGroup = document.createElement("div");
      titleGroup.className = "abi-expiry-title-group";

      const expiryIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      expiryIcon.setAttribute("class", "icon abi-expiry-icon");
      expiryIcon.setAttribute("viewBox", icons.clock.viewBox);
      expiryIcon.setAttribute("aria-hidden", "true");
      expiryIcon.setAttribute("focusable", "false");
      const expiryIconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
      expiryIconPath.setAttribute("d", icons.clock.d);
      expiryIcon.append(expiryIconPath);

      const expiryLabel = document.createElement("span");
      expiryLabel.className = "abi-expiry-label";
      expiryLabel.textContent = "Expires:";

      titleGroup.append(expiryIcon, expiryLabel);

      const expiryTime = document.createElement("span");
      expiryTime.className = "abi-expiry-time";
      expiryTime.textContent = "15:00";

      header.append(titleGroup, expiryTime);

      const expiryDesc = document.createElement("div");
      expiryDesc.className = "abi-expiry-desc";
      expiryDesc.textContent =
        "Submit your verdict before the timer runs out. Once this time passes, you cannot submit the case because it gets cancelled.";

      expiryBadge.append(header, expiryDesc);

      const mountBadge = () => {
        const notesBox = document.querySelector(
          "#xcWorking .tips-content, .content.video .tips-content, .tips-content",
        );
        if (notesBox) {
          if (expiryBadge.previousElementSibling !== notesBox || expiryBadge.parentElement !== notesBox.parentElement) {
            notesBox.after(expiryBadge);
          }
          return;
        }
        const infoTeam = document.querySelector(
          "#xcWorking .info-team, .content.video .info-team, .info-team",
        );
        if (infoTeam) {
          if (expiryBadge.parentElement !== infoTeam) {
            infoTeam.append(expiryBadge);
          }
          return;
        }
        if (!expiryBadge.parentElement) {
          shell.append(expiryBadge);
        }
      };

      mountBadge();

      let caseStartTime = Date.now();
      let totalExpirySeconds = 900;

      const getRemaining = () => {
        if (shell.dataset.caseRemaining !== undefined) {
          return Math.max(0, parseInt(shell.dataset.caseRemaining, 10));
        }
        const customExpiry = parseInt(shell.dataset.caseExpiry || player.dataset.caseExpiry || "", 10);
        const total = Number.isFinite(customExpiry) && customExpiry > 0 ? customExpiry : totalExpirySeconds;
        const elapsed = Math.floor((Date.now() - caseStartTime) / 1000);
        return Math.max(0, total - elapsed);
      };

      const updateExpiry = () => {
        mountBadge();
        if (!expiryBadge.isConnected) return;
        const remaining = getRemaining();
        const formatted = format(remaining);

        if (remaining <= 0) {
          expiryTime.textContent = "00:00 (EXPIRED)";
          const noticeMsg = "Case review expires in 00:00 — submitting after expiration makes the verdict invalid";
          expiryBadge.title = noticeMsg;
          expiryDesc.textContent = "Time has expired. This case was cancelled and can no longer be submitted.";
          expiryBadge.classList.add("abi-case-expiring", "abi-case-expired");
          shell.classList.add("abi-case-expiring");
        } else {
          expiryTime.textContent = formatted;
          const noticeMsg = `Case review expires in ${formatted} — submitting after expiration makes the verdict invalid`;
          expiryBadge.title = noticeMsg;
          expiryDesc.textContent =
            "Submit your verdict before the timer runs out. Once this time passes, you cannot submit the case because it gets cancelled.";
          expiryBadge.classList.remove("abi-case-expired");
          if (remaining <= 60) {
            expiryBadge.classList.add("abi-case-expiring");
            shell.classList.add("abi-case-expiring");
          } else {
            expiryBadge.classList.remove("abi-case-expiring");
            shell.classList.remove("abi-case-expiring");
          }
        }
      };

      expiryBadge.addEventListener("click", () => {
        const remaining = getRemaining();
        notice(`Case review expires in ${format(remaining)}`);
      });

      updateExpiry();
      expiryInterval = setInterval(updateExpiry, 1000);
      shell.updateExpiry = updateExpiry;
      shell.resetExpiryTimer = (newDuration) => {
        if (Number.isFinite(newDuration) && newDuration > 0) totalExpirySeconds = newDuration;
        caseStartTime = Date.now();
        updateExpiry();
      };
    }

    let mediaLife = null;
    let video = null;
    let noticeTimer;
    let bookmarks = [];
    let wasPlayingBeforeBackground = false;
    let precisionMs = false;
    let isScrubbing = false;
    let preScrubMuted = false;
    let lastStablePlaybackTime = 0;
    let modalTransitionUntil = 0;
    let hadOpenModal = false;
    let isUserSeeking = false;
    let rafId = null;
    try {
      precisionMs =
        localStorage.getItem("abi-time-precision") === "ms" ||
        document.documentElement.dataset.abiTimePrecision === "ms" ||
        shell.dataset.timePrecision === "ms";
    } catch {}

    function isAnyModalOpen() {
      const candidates = document.querySelectorAll(
        ".popup, .dialog, .modal, .patrol-popup, .grade-popup, [id*='Popup'], [id*='popup'], [id^='drillResult'], #commonTips, #commonTips1, #resultWrong, #resultRight, #notAuth, #notExam, #getAuth, #traingFail, #LowVersion, #noticePopup, #drillIntro, dialog[open], [role='dialog'], [aria-modal='true']"
      );
      for (const el of candidates) {
        if (el.classList.contains("abi-zoom-badge") || el.classList.contains("abi-case-expiry-badge")) continue;
        if (el.hasAttribute("hidden")) continue;
        if (el.tagName === "DIALOG" && !el.open) continue;
        const disp = el.style?.display;
        if (disp === "none") continue;
        const vis = el.style?.visibility;
        if (vis === "hidden") continue;
        if (disp === "block" || disp === "flex" || el.open || (el.offsetParent !== null && disp !== "none")) {
          return true;
        }
      }
      return false;
    }

    function checkModalTransitions() {
      const open = isAnyModalOpen();
      if (open !== hadOpenModal) {
        hadOpenModal = open;
        modalTransitionUntil = Date.now() + 2000;
        if (video && Number.isFinite(video.currentTime) && video.currentTime > 0.3) {
          lastStablePlaybackTime = video.currentTime;
        }
      }
    }

    const modalObserver = new MutationObserver(checkModalTransitions);
    try {
      modalObserver.observe(document.body || document.documentElement, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["style", "class", "hidden", "open"],
      });
      life.signal.addEventListener("abort", () => modalObserver.disconnect());
    } catch {}

    on(document, "click", (e) => {
      const t = e.target;
      if (
        t instanceof Element &&
        t.closest(
          ".popup, .dialog, .modal, .patrol-popup, [id*='Popup'], [id*='popup'], ._close-btn, .close-btn, .btn1, .btn2, .btn3, .btn4, #btn1, #btn2, #btn3, [data-dismiss='modal'], .abi-today-wrap"
        )
      ) {
        modalTransitionUntil = Date.now() + 2000;
        if (video && Number.isFinite(video.currentTime) && video.currentTime > 0.3) {
          lastStablePlaybackTime = video.currentTime;
        }
      }
    }, true);

    on(document, "keydown", (e) => {
      if (
        e.key === "Escape" ||
        e.key === "1" ||
        e.key === "2" ||
        e.key === "3" ||
        e.key === "v" ||
        e.key === "V"
      ) {
        modalTransitionUntil = Date.now() + 2000;
        if (video && Number.isFinite(video.currentTime) && video.currentTime > 0.3) {
          lastStablePlaybackTime = video.currentTime;
        }
      }
    }, true);

    shell.getRetainedPlaybackTime = () => lastStablePlaybackTime;

    const zoomBadge = document.createElement("div");
    zoomBadge.className = "abi-zoom-badge";
    zoomBadge.textContent = "2.5× LOUPE";
    zoomBadge.setAttribute("aria-hidden", "true");
    shell.append(zoomBadge);

    let lastClientX = null;
    let lastClientY = null;
    let isZooming = false;

    function updateZoomOrigin(clientX, clientY) {
      if (!video) return;
      const rect = video.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0 && Number.isFinite(clientX) && Number.isFinite(clientY)) {
        const x = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
        const y = Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100));
        video.style.transformOrigin = `${x.toFixed(2)}% ${y.toFixed(2)}%`;
      } else {
        video.style.transformOrigin = "50% 50%";
      }
    }

    function startZoom(e) {
      selectVideo();
      if (!video) return;
      if (isZooming) return;
      isZooming = true;
      shell.dataset.abiZoom = "2.5x";
      if (player && player.style) player.style.overflow = "hidden";
      if (e && Number.isFinite(e.clientX)) {
        lastClientX = e.clientX;
        lastClientY = e.clientY;
      }
      updateZoomOrigin(lastClientX, lastClientY);
      video.style.transform = "scale(2.5)";
      video.style.transition = "transform 0.08s ease-out";
      video.style.cursor = "crosshair";
      zoomBadge.classList.add("active");
    }

    function stopZoom() {
      if (!isZooming) return;
      isZooming = false;
      delete shell.dataset.abiZoom;
      if (video) {
        video.style.transform = "";
        video.style.transformOrigin = "";
        video.style.transition = "";
        video.style.cursor = "";
      }
      if (player && player.style) player.style.overflow = "";
      zoomBadge.classList.remove("active");
    }

    on(player, "pointermove", (e) => {
      lastClientX = e.clientX;
      lastClientY = e.clientY;
      if (isZooming) {
        updateZoomOrigin(e.clientX, e.clientY);
      }
    });

    on(window, "pointermove", (e) => {
      if (isZooming) {
        lastClientX = e.clientX;
        lastClientY = e.clientY;
        updateZoomOrigin(e.clientX, e.clientY);
      }
    });

    on(player, "pointerdown", (e) => {
      if (e.button === 2) {
        e.preventDefault();
        startZoom(e);
      }
    });

    on(window, "pointerup", (e) => {
      if (e.button === 2 && isZooming) {
        stopZoom();
      }
    });

    on(player, "contextmenu", (e) => {
      e.preventDefault();
    });

    on(window, "blur", () => {
      stopZoom();
    });

    let audioCtx = null;
    function playTacticalCue(type) {
      if (document.documentElement.dataset.abiTacticalAudio === "off") return;
      try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        if (!audioCtx) {
          audioCtx = new AudioContextClass();
        }
        if (audioCtx.state === "suspended") {
          audioCtx.resume().catch(() => {});
        }
        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);

        switch (type) {
          case "pin": {
            osc.type = "sine";
            osc.frequency.setValueAtTime(880, now);
            osc.frequency.setValueAtTime(1320, now + 0.04);
            gain.gain.setValueAtTime(0.04, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
            osc.start(now);
            osc.stop(now + 0.12);
            break;
          }
          case "loopIn": {
            osc.type = "sine";
            osc.frequency.setValueAtTime(587, now);
            osc.frequency.exponentialRampToValueAtTime(784, now + 0.05);
            gain.gain.setValueAtTime(0.035, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);
            osc.start(now);
            osc.stop(now + 0.09);
            break;
          }
          case "loopOut": {
            osc.type = "sine";
            osc.frequency.setValueAtTime(880, now);
            gain.gain.setValueAtTime(0.04, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);
            osc.start(now);
            osc.stop(now + 0.1);
            break;
          }
          case "loopClear": {
            osc.type = "sine";
            osc.frequency.setValueAtTime(440, now);
            osc.frequency.exponentialRampToValueAtTime(220, now + 0.06);
            gain.gain.setValueAtTime(0.03, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
            osc.start(now);
            osc.stop(now + 0.08);
            break;
          }
          case "mode": {
            osc.type = "triangle";
            osc.frequency.setValueAtTime(1200, now);
            gain.gain.setValueAtTime(0.03, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);
            osc.start(now);
            osc.stop(now + 0.035);
            break;
          }
          case "step": {
            osc.type = "sine";
            osc.frequency.setValueAtTime(850, now);
            gain.gain.setValueAtTime(0.02, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);
            osc.start(now);
            osc.stop(now + 0.025);
            break;
          }
          case "speed": {
            osc.type = "sine";
            const rate = (video && Number(video.playbackRate)) || 1;
            const freq = Math.max(300, Math.min(1200, 440 * rate));
            osc.frequency.setValueAtTime(freq, now);
            gain.gain.setValueAtTime(0.03, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
            osc.start(now);
            osc.stop(now + 0.04);
            break;
          }
          default: {
            osc.type = "sine";
            osc.frequency.setValueAtTime(600, now);
            gain.gain.setValueAtTime(0.025, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);
            osc.start(now);
            osc.stop(now + 0.03);
          }
        }
      } catch {}
    }

    let gammaMode = "normal";
    try {
      let saved = localStorage.getItem("abi-gamma-mode");
      const legacyVision = localStorage.getItem("abi-vision-mode");
      const validGamma = ["normal", "shadow", "max", "silhouette", "invert", "thermal"];
      const validVision = ["silhouette", "invert", "thermal"];

      // One-time backward-compatible migration:
      // If legacy vision mode was set, migrate it to abi-gamma-mode if abi-gamma-mode is unset or normal.
      // If abi-gamma-mode already has a meaningful non-normal mode, it takes deterministic precedence.
      if (legacyVision !== null) {
        if ((!saved || saved === "normal") && validVision.includes(legacyVision)) {
          saved = legacyVision;
          localStorage.setItem("abi-gamma-mode", legacyVision);
        }
        localStorage.removeItem("abi-vision-mode");
      }

      if (saved && validGamma.includes(saved)) {
        gammaMode = saved;
      } else {
        gammaMode = "normal";
      }
    } catch {}

    const GAMMA_PRESETS = {
      normal: {
        filter: "",
        name: "Normal (1.0×)",
      },
      shadow: {
        filter: "brightness(1.35) contrast(1.15) saturate(1.1)",
        name: "Shadow Boost",
      },
      max: {
        filter: "brightness(1.75) contrast(1.25) saturate(1.15)",
        name: "Max Brightness",
      },
      silhouette: {
        filter: "contrast(2.4) brightness(1.1) saturate(0.25)",
        name: "Silhouette Contrast",
      },
      invert: {
        filter: "invert(1) hue-rotate(180deg) contrast(1.35) brightness(1.05)",
        name: "Negative Invert",
      },
      thermal: {
        filter: "grayscale(1) contrast(2.8) brightness(1.2)",
        name: "Monochrome Thermal",
      },
    };

    const GAMMA_CYCLE = ["normal", "shadow", "max", "silhouette", "invert", "thermal"];

    function applyGamma(mode, announce = false) {
      if (!GAMMA_PRESETS[mode]) mode = "normal";
      gammaMode = mode;
      shell.dataset.abiGamma = mode;
      try {
        localStorage.setItem("abi-gamma-mode", mode);
      } catch {}
      if (video) {
        video.style.filter = GAMMA_PRESETS[mode].filter;
      }
      if (ui.gamma) {
        ui.gamma.classList.toggle("active", mode !== "normal");
        ui.gamma.setAttribute("aria-pressed", String(mode !== "normal"));
        ui.gamma.title = `Shadow, Gamma & Vision: ${GAMMA_PRESETS[mode].name} (G)`;
      }
      if (announce) {
        notice(`Gamma: ${GAMMA_PRESETS[mode].name}`);
        playTacticalCue("mode");
      }
    }

    function toggleGamma(direction = 1) {
      selectVideo();
      const currentIdx = GAMMA_CYCLE.indexOf(gammaMode);
      const nextIdx = (currentIdx + direction + GAMMA_CYCLE.length) % GAMMA_CYCLE.length;
      applyGamma(GAMMA_CYCLE[nextIdx], true);
    }

    function toggleVision(direction = 1) {
      toggleGamma(direction);
    }
    function applyVision(mode, announce = false) {
      applyGamma(mode, announce);
    }

    shell.playTacticalCue = playTacticalCue;
    shell.toggleGamma = toggleGamma;
    shell.applyGamma = applyGamma;
    shell.toggleVision = toggleVision;
    shell.applyVision = applyVision;
    shell.getGammaState = () => ({ mode: gammaMode, filter: GAMMA_PRESETS[gammaMode]?.filter || "" });

    let loopStart = null;
    let loopEnd = null;
    let loopActive = false;

    function renderLoopUI() {
      if (!ui.loopRange) return;
      const hasBoth = loopStart !== null && loopEnd !== null && loopEnd > loopStart;
      if (hasBoth && finite()) {
        const dur = video.duration;
        const leftPct = Math.max(0, Math.min(100, (loopStart / dur) * 100));
        const rightPct = Math.max(0, Math.min(100, (loopEnd / dur) * 100));
        ui.loopRange.style.left = `${leftPct}%`;
        ui.loopRange.style.width = `${Math.max(0.5, rightPct - leftPct)}%`;
        ui.loopRange.hidden = false;
        ui.loopRange.title = `Looping: ${format(loopStart)} - ${format(loopEnd)} (\\ to clear)`;
      } else {
        ui.loopRange.hidden = true;
      }
      if (ui.loopBtn) {
        const isActive = loopActive && hasBoth;
        ui.loopBtn.classList.toggle("active", isActive);
        ui.loopBtn.setAttribute("aria-pressed", String(isActive));
        if (isActive) {
          ui.loopBtn.title = `Loop active: ${format(loopStart)} - ${format(loopEnd)} (Click or \\ to clear)`;
        } else if (loopStart !== null) {
          ui.loopBtn.title = `Loop In set at ${format(loopStart)} (Press ] to set Out point)`;
        } else {
          ui.loopBtn.title = "A/B Loop Repeat: Set In ([) / Out (]); Clear (\\)";
        }
      }
    }

    function checkLoopBoundaries() {
      if (
        loopActive &&
        loopStart !== null &&
        loopEnd !== null &&
        loopEnd > loopStart &&
        video &&
        !isUserSeeking &&
        !isScrubbing
      ) {
        if (video.currentTime >= loopEnd - 0.03 || video.currentTime < loopStart - 0.1) {
          video.currentTime = loopStart;
          updateTimeAndSeek();
        }
      }
    }

    function setLoopIn() {
      selectVideo();
      if (!finite()) {
        notice("Video not ready for loop");
        return;
      }
      loopStart = Number(video.currentTime.toFixed(2));
      if (loopEnd !== null && loopStart >= loopEnd) {
        loopEnd = Math.min(video.duration, Number((loopStart + 2.0).toFixed(2)));
      }
      loopActive = loopEnd !== null && loopEnd > loopStart;
      if (loopActive) {
        notice(`Loop A set: ${format(loopStart)} — Active (${format(loopStart)} to ${format(loopEnd)})`);
      } else {
        notice(`Loop A set: ${format(loopStart)} ([) — Press ] to set Loop B`);
      }
      renderLoopUI();
    }

    function setLoopOut() {
      selectVideo();
      if (!finite()) {
        notice("Video not ready for loop");
        return;
      }
      loopEnd = Number(video.currentTime.toFixed(2));
      if (loopStart === null) {
        loopStart = Math.max(0, Number((loopEnd - 2.0).toFixed(2)));
      } else if (loopEnd <= loopStart) {
        const tmp = loopStart;
        loopStart = loopEnd;
        loopEnd = tmp;
      }
      loopActive = true;
      notice(`Loop B set: ${format(loopEnd)} (]) — Loop Active (${format(loopStart)} to ${format(loopEnd)})`);
      renderLoopUI();
    }

    function clearLoop() {
      if (loopStart === null && loopEnd === null) return;
      loopStart = null;
      loopEnd = null;
      loopActive = false;
      notice("Loop cleared (\\)");
      playTacticalCue("loopClear");
      renderLoopUI();
    }

    function toggleLoop() {
      selectVideo();
      if (loopActive || loopStart !== null || loopEnd !== null) {
        clearLoop();
      } else if (finite()) {
        setLoopIn();
      }
    }

    shell.setLoopIn = setLoopIn;
    shell.setLoopOut = setLoopOut;
    shell.clearLoop = clearLoop;
    shell.toggleLoop = toggleLoop;
    shell.getLoopState = () => ({ loopStart, loopEnd, loopActive });

    const notice = (message) => {
      ui.status.textContent = message;
      ui.status.classList.toggle("visible", Boolean(message));
      clearTimeout(noticeTimer);
      noticeTimer = setTimeout(() => {
        ui.status.classList.remove("visible");
        ui.status.textContent = "";
      }, 3000);
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
        playTacticalCue("pin");
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
          stopPlaybackLoop();
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
      stopPlaybackLoop();
      mediaLife?.abort();
      video = selected;
      if (video) {
        applyGamma(gammaMode, false);
        
        renderLoopUI();
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
          "progress",
          "waiting",
          "canplay",
          "canplaythrough",
          "stalled",
        ]) {
          video.addEventListener(
            name,
            (event) => {
              if (
                [
                  "progress",
                  "waiting",
                  "canplay",
                  "canplaythrough",
                  "stalled",
                  "error",
                  "seeking",
                  "seeked",
                ].includes(event.type)
              ) {
                updateStreamHealth();
              }
              if (event.type === "loadstart") {
                stopPlaybackLoop();
                delete video.dataset.abiUserPaused;
                delete video.dataset.abiUserPlayed;
                delete video.dataset.abiAutoplayed;
                delete video.dataset.abiSpeedInitialized;
                delete video.dataset.abiBackgroundPaused;
                wasPlayingBeforeBackground = false;
                bookmarks = [];
                renderPins();
                loopStart = null;
                loopEnd = null;
                loopActive = false;
                renderLoopUI();
                shell.resetExpiryTimer?.();
                lastStablePlaybackTime = 0;
                modalTransitionUntil = 0;
                hadOpenModal = false;
              }
              if (event.type === "durationchange") {
                renderPins();
                renderLoopUI();
              }
              if (event.type === "play") {
                if (
                  rootDs.abiAutoPlay === "off" &&
                  video.dataset.abiUserPlayed !== "true"
                ) {
                  video.pause();
                } else {
                  delete video.dataset.abiUserPaused;
                  video.dataset.abiUserPlayed = "true";
                  startPlaybackLoop();
                }
              }
              if (event.type === "ended") {
                if (loopActive && loopStart !== null) {
                  video.currentTime = loopStart;
                  video.play().catch(() => {});
                  return;
                }
                stopPlaybackLoop();
              } else if (
                event.type === "pause" ||
                event.type === "emptied" ||
                event.type === "error"
              ) {
                stopPlaybackLoop();
              }
              if (event.type === "timeupdate") {
                checkLoopBoundaries();
                if (
                  !isUserSeeking &&
                  !isScrubbing &&
                  Number.isFinite(video.currentTime) &&
                  video.currentTime > 0.3
                ) {
                  lastStablePlaybackTime = video.currentTime;
                }
              }
              if (event.type === "seeking" || event.type === "timeupdate") {
                if (
                  !isUserSeeking &&
                  !isScrubbing &&
                  (hadOpenModal || Date.now() < modalTransitionUntil)
                ) {
                  if (video.currentTime < 0.2 && lastStablePlaybackTime >= 0.5) {
                    try {
                      video.currentTime = lastStablePlaybackTime;
                    } catch {}
                  }
                }
              }
              if (event.type === "play" || event.type === "pause" || event.type === "ended") {
                wakeHud();
              }
              render();
            },
            { signal: mediaLife.signal },
          );
        }
      }
      render();
    }
    function getBufferedEnd(v) {
      if (!v || !v.buffered || !v.buffered.length) return 0;
      const cur = v.currentTime || 0;
      for (let i = 0; i < v.buffered.length; i++) {
        if (v.buffered.start(i) <= cur + 0.5 && cur <= v.buffered.end(i) + 0.1) {
          return v.buffered.end(i);
        }
      }
      return v.buffered.end(v.buffered.length - 1);
    }

    function updateStreamHealth() {
      if (!ui.streamHealth) return;
      if (!video || !finite()) {
        ui.streamHealth.dataset.state = "idle";
        ui.streamHealth.title = "Stream: Awaiting video";
        ui.streamHealth.setAttribute("aria-label", "Stream health: Idle");
        return;
      }
      const cur = video.currentTime || 0;
      const dur = video.duration || 0;
      const bufEnd = getBufferedEnd(video);
      const bufferedAhead = Math.max(0, bufEnd - cur);
      const isFullyBuffered = bufEnd >= dur - 0.25;

      if (video.networkState === HTMLMediaElement.NETWORK_NO_SOURCE || video.error) {
        ui.streamHealth.dataset.state = "error";
        ui.streamHealth.title = "Stream: Connection error — click to reload stream";
        ui.streamHealth.setAttribute("aria-label", "Stream health: Connection error");
      } else if (video.seeking || video.readyState < 3 || (!video.paused && bufferedAhead < 0.2 && !isFullyBuffered)) {
        ui.streamHealth.dataset.state = "buffering";
        ui.streamHealth.title = `Stream: Buffering (${bufferedAhead.toFixed(1)}s ahead) — click to reload`;
        ui.streamHealth.setAttribute("aria-label", "Stream health: Buffering");
      } else if (bufferedAhead >= 1.5 || isFullyBuffered) {
        ui.streamHealth.dataset.state = "excellent";
        ui.streamHealth.title = `Stream: Healthy (CDN buffered ${isFullyBuffered ? "100%" : bufferedAhead.toFixed(1) + "s ahead"})`;
        ui.streamHealth.setAttribute("aria-label", "Stream health: Healthy");
      } else {
        ui.streamHealth.dataset.state = "good";
        ui.streamHealth.title = `Stream: Stable (${bufferedAhead.toFixed(1)}s ahead)`;
        ui.streamHealth.setAttribute("aria-label", "Stream health: Stable");
      }
    }

    function updateTimeAndSeek() {
      const ready = finite();
      const cur = video?.currentTime || 0;
      const dur = ready ? video.duration : 0;
      ui.time.dataset.precision = precisionMs ? "ms" : "normal";
      ui.time.textContent = `${format(cur, precisionMs)} / ${format(dur, precisionMs)}`;
      ui.seek.max = ready ? String(dur) : "1";
      if (!isScrubbing) {
        ui.seek.value = ready ? String(cur) : "0";
      }
      const fillTime = isScrubbing ? Number(ui.seek.value) : cur;
      ui.seek.style.setProperty(
        "--fill",
        `${ready && dur > 0 ? Math.max(0, Math.min(100, (fillTime / dur) * 100)) : 0}%`,
      );
      const bufEnd = getBufferedEnd(video);
      const bufPct = ready && dur > 0 ? Math.max(0, Math.min(100, (bufEnd / dur) * 100)) : 0;
      ui.seek.style.setProperty("--buffer", `${bufPct}%`);
      updateStreamHealth();
      ui.seek.setAttribute(
        "aria-valuetext",
        `${format(cur, precisionMs)} of ${format(dur, precisionMs)}`,
      );
    }
    function tickPlayback() {
      if (video && !video.paused && !video.ended) {
        checkLoopBoundaries();
        if (
          !isUserSeeking &&
          !isScrubbing &&
          Number.isFinite(video.currentTime) &&
          video.currentTime > 0.3
        ) {
          lastStablePlaybackTime = video.currentTime;
        }
        updateTimeAndSeek();
        rafId = requestAnimationFrame(tickPlayback);
      } else {
        rafId = null;
      }
    }
    function startPlaybackLoop() {
      if (rafId !== null) return;
      if (video && !video.paused && !video.ended) {
        rafId = requestAnimationFrame(tickPlayback);
      }
    }
    function stopPlaybackLoop() {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    }
    function render() {
      const ready = finite();
      for (const id of ["play", "slower", "speedval", "faster", "mute", "volume", "pinButton", "loopBtn", "gamma", "reload", "streamHealth"])
        if (ui[id]) ui[id].disabled = !video;
      for (const id of [
        "seek",
        "pinButton",
        "loopBtn",
        "back10",
        "back5",
        "forward5",
        "forward10",
        "previous",
        "next",
      ])
        if (ui[id]) ui[id].disabled = !ready;
      renderLoopUI();
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
      updateTimeAndSeek();
      if (!paused && !video.ended) {
        startPlaybackLoop();
      } else {
        stopPlaybackLoop();
      }
      if (video) {
        ui.volume.value = String(video.volume);
        const displayMuted = isScrubbing ? preScrubMuted : video.muted;
        ui.volume.style.setProperty(
          "--fill",
          `${displayMuted ? 0 : video.volume * 100}%`,
        );
        decorate(
          ui.mute,
          displayMuted || video.volume === 0 ? "volume-xmark" : "volume-high",
          "",
          `${displayMuted ? "Unmute" : "Mute"} (Shift+M or icon)`,
        );
        ui.mute.setAttribute("aria-pressed", String(displayMuted));
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
      isUserSeeking = true;
      modalTransitionUntil = 0;
      const targetTime = Math.max(0, Math.min(video.duration, time));
      lastStablePlaybackTime = targetTime;
      try {
        video.currentTime = targetTime;
      } catch {
        notice("The official video is not seekable yet");
      }
      render();
      setTimeout(() => {
        isUserSeeking = false;
      }, 400);
    }
    function jump(amount) {
      if (video) seek(video.currentTime + amount);
    }
    function step(direction) {
      if (!video) return;
      video.pause();
      jump(direction / 30);
      playTacticalCue("step");
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
      playTacticalCue("speed");
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
          if (isScrubbing) {
            preScrubMuted = !preScrubMuted;
          } else {
            video.muted = !video.muted;
          }
          render();
        }
      },
      pinButton: toggleBookmark,
      loopBtn: toggleLoop,
      gamma: toggleGamma,
      reload: reloadVideo,
      fullscreen,
    };
    for (const [id, fn] of Object.entries(actions)) {
      if (id === "speedval") continue;
      if (ui[id])
        on(ui[id], "click", (event) => {
          event?.preventDefault?.();
          event?.stopPropagation?.();
          selectVideo();
          fn();
        });
    }
    if (ui.streamHealth) {
      on(ui.streamHealth, "click", (e) => {
        e?.preventDefault?.();
        e?.stopPropagation?.();
        selectVideo();
        updateStreamHealth();
        const state = ui.streamHealth.dataset.state || "idle";
        if (state === "error" || state === "buffering") {
          reloadVideo();
          notice("Reconnecting stream...");
        } else {
          notice(ui.streamHealth.title || "Stream connection healthy");
        }
      });
    }
    function updateHoverBadge(e) {
      if (!finite() || !ui.hoverBadge) return;
      const rect = ui.seek.getBoundingClientRect();
      if (rect.width <= 0) return;
      const clampX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const ratio = clampX / rect.width;
      const hoverTime = ratio * video.duration;
      ui.hoverBadge.textContent = format(hoverTime, precisionMs);
      ui.hoverBadge.style.left = `${ratio * 100}%`;
      ui.hoverBadge.classList.add("visible");
    }
    function hideHoverBadge() {
      ui.hoverBadge?.classList.remove("visible");
    }
    function startScrubbing() {
      if (!video || isScrubbing) return;
      isScrubbing = true;
      isUserSeeking = true;
      modalTransitionUntil = 0;
      preScrubMuted = Boolean(video.muted);
      try {
        video.muted = true;
      } catch {}
    }
    function stopScrubbing() {
      if (!isScrubbing) return;
      isScrubbing = false;
      modalTransitionUntil = 0;
      if (video) {
        lastStablePlaybackTime = video.currentTime;
        try {
          video.muted = preScrubMuted;
        } catch {}
        render();
      }
      setTimeout(() => {
        isUserSeeking = false;
      }, 400);
    }
    on(ui.seek, "pointermove", updateHoverBadge);
    on(ui.seek, "pointerenter", updateHoverBadge);
    on(ui.seek, "pointerleave", hideHoverBadge);
    on(ui.seek, "pointerdown", (e) => {
      selectVideo();
      startScrubbing();
      updateHoverBadge(e);
    });
    on(ui.seek, "input", () => {
      if (!isScrubbing) startScrubbing();
      seek(Number(ui.seek.value));
    });
    on(ui.seek, "change", stopScrubbing);
    on(ui.seek, "pointerup", stopScrubbing);
    on(window, "pointerup", stopScrubbing);
    on(window, "pointercancel", stopScrubbing);
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
    function toggleSpeedMenu(force) {
      if (!ui.speedMenu) return;
      const willOpen = typeof force === "boolean" ? force : ui.speedMenu.hidden;
      ui.speedMenu.hidden = !willOpen;
      ui.speedval?.setAttribute("aria-expanded", String(willOpen));
      if (willOpen) {
        updateSpeedMenuSelection();
      }
    }

    function updateSpeedMenuSelection() {
      if (!ui.speedMenu) return;
      const currentRate = video ? Number(video.playbackRate.toFixed(2)) : 1;
      ui.speedMenu.querySelectorAll(".speed-menu-opt").forEach((opt) => {
        const rate = Number(opt.dataset.speed);
        opt.classList.toggle("active", Math.abs(rate - currentRate) < 0.01);
      });
    }

    if (ui.speedval) {
      on(ui.speedval, "click", (e) => {
        e?.preventDefault?.();
        e?.stopPropagation?.();
        toggleSpeedMenu();
      });
    }

    if (ui.speedMenu) {
      ui.speedMenu.querySelectorAll(".speed-menu-opt").forEach((opt) => {
        on(opt, "click", (e) => {
          e?.preventDefault?.();
          e?.stopPropagation?.();
          const rate = Number(opt.dataset.speed);
          if (Number.isFinite(rate) && rate > 0) {
            setSpeed(rate);
            notice(`Speed: ${rate}×`);
            toggleSpeedMenu(false);
          }
        });
      });
    }

    on(host, "click", (e) => {
      if (ui.speedMenu && !ui.speedMenu.hidden && !ui.speedControlWrap?.contains(e.target)) {
        toggleSpeedMenu(false);
      }
    });

    on(window, "click", () => {
      if (ui.speedMenu && !ui.speedMenu.hidden) {
        toggleSpeedMenu(false);
      }
    });

    on(window, "keydown", (e) => {
      if (e.key === "Escape" && ui.speedMenu && !ui.speedMenu.hidden) {
        toggleSpeedMenu(false);
      }
    });

    const togglePrecision = (event) => {
      event?.preventDefault?.();
      event?.stopPropagation?.();
      precisionMs = !precisionMs;
      try {
        localStorage.setItem("abi-time-precision", precisionMs ? "ms" : "normal");
      } catch {}
      shell.dataset.timePrecision = precisionMs ? "ms" : "normal";
      render();
      notice(precisionMs ? "Millisecond precision enabled" : "Standard time format");
    };

    on(ui.time, "click", togglePrecision);
    on(ui.time, "keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        togglePrecision(e);
      }
    });

    shell.togglePrecision = togglePrecision;
    shell.setPrecision = (val) => {
      precisionMs = Boolean(val);
      shell.dataset.timePrecision = precisionMs ? "ms" : "normal";
      try {
        localStorage.setItem("abi-time-precision", precisionMs ? "ms" : "normal");
      } catch {}
      render();
    };

    let hudHideTimer = null;

    function wakeHud() {
      if (hudHideTimer) {
        clearTimeout(hudHideTimer);
        hudHideTimer = null;
      }
      shell.removeAttribute("data-abi-hud-hidden");
      shell.classList.remove("abi-hud-hidden");
      if (host) host.classList.remove("abi-hud-hidden");

      const isFullscreen = Boolean(document.fullscreenElement === shell || document.fullscreenElement);
      const isEnabled = document.documentElement.dataset.abiAutoHideHud !== "off";
      const isPlaying = video && !video.paused && !video.ended;

      if (isFullscreen && isEnabled && isPlaying && !isScrubbing) {
        const delay = Number(window.__abiHudHideDelay) || 2500;
        hudHideTimer = setTimeout(() => {
          const stillFullscreen = Boolean(document.fullscreenElement === shell || document.fullscreenElement);
          const stillEnabled = document.documentElement.dataset.abiAutoHideHud !== "off";
          const stillPlaying = video && !video.paused && !video.ended;
          if (stillFullscreen && stillEnabled && stillPlaying && !isScrubbing) {
            shell.setAttribute("data-abi-hud-hidden", "true");
            shell.classList.add("abi-hud-hidden");
            if (host) host.classList.add("abi-hud-hidden");
          }
        }, delay);
      }
    }

    life.signal.addEventListener("abort", () => {
      if (hudHideTimer) {
        clearTimeout(hudHideTimer);
        hudHideTimer = null;
      }
    });

    const onFullscreenChange = () => {
      render();
      if (!document.fullscreenElement) {
        if (hudHideTimer) {
          clearTimeout(hudHideTimer);
          hudHideTimer = null;
        }
        shell.removeAttribute("data-abi-hud-hidden");
        shell.classList.remove("abi-hud-hidden");
        if (host) host.classList.remove("abi-hud-hidden");
      } else {
        wakeHud();
      }
    };

    on(document, "fullscreenchange", onFullscreenChange);
    on(shell, "pointermove", wakeHud);
    on(shell, "mousemove", wakeHud);
    on(shell, "pointerdown", wakeHud);
    on(window, "keydown", wakeHud);
    shell.wakeHud = wakeHud;
    shell.isHudHidden = () => shell.hasAttribute("data-abi-hud-hidden") || shell.classList.contains("abi-hud-hidden");

    const onHide = () => {
      if (document.documentElement.dataset.abiBackgroundPause === "off") return;
      if (!video) return;
      if (!video.paused && !video.ended) {
        wasPlayingBeforeBackground = true;
        video.dataset.abiBackgroundPaused = "true";
        video.pause();
      }
    };

    const onShow = () => {
      if (document.documentElement.dataset.abiBackgroundPause === "off") return;
      if (!video) return;
      if (wasPlayingBeforeBackground || video.dataset.abiBackgroundPaused === "true") {
        wasPlayingBeforeBackground = false;
        delete video.dataset.abiBackgroundPaused;
        if (video.paused && !video.ended) {
          video.play().catch(() => {});
        }
      }
    };

    on(document, "visibilitychange", () => {
      if (document.hidden) onHide();
      else onShow();
    });
    on(window, "pagehide", onHide);
    on(window, "pageshow", onShow);
    on(window, "blur", () => {
      if (document.hidden) onHide();
    });
    on(window, "focus", () => {
      if (!document.hidden) onShow();
    });
    const isVideoArea = (target) =>
      target instanceof Element &&
      (target === player || player.contains(target)) &&
      !target.closest(
        "abi-local-controls, .abi-case-expiry-badge, dialog",
      );

    // Click directly on video screen to toggle play/pause (capture phase intercepts before native player scripts)
    on(
      player,
      "click",
      (event) => {
        if (isVideoArea(event.target)) {
          event.preventDefault();
          event.stopPropagation();
          event.stopImmediatePropagation();
          togglePlay();
        }
      },
      true,
    );

    // Double-click anywhere on the video area toggles fullscreen
    on(shell, "dblclick", (event) => {
      if (isVideoArea(event.target)) {
        event.preventDefault();
        event.stopPropagation();
        actions.fullscreen();
      }
    });
    shell.toggleFullscreen = actions.fullscreen;
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
    shell.getStreamHealth = () => ({
      state: ui.streamHealth?.dataset.state || "idle",
      title: ui.streamHealth?.title || "",
      bufferedEnd: getBufferedEnd(video),
    });
    shell.getCustomKeybinds = getCustomKeybinds;
    shell.setAttribute("data-controls-ready", "");

    function getCustomKeybinds() {
      try {
        const raw =
          document.documentElement.dataset.abiKeybinds ||
          localStorage.getItem("abi-keybinds");
        if (raw) return JSON.parse(raw);
      } catch {}
      return {};
    }

    function matchesKey(event, action, defaultKeys) {
      const custom = getCustomKeybinds();
      const k = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      if (custom && custom[action]) {
        const assigned = String(custom[action]).toLowerCase();
        const normAssigned = assigned === "space" ? " " : assigned;
        return k === normAssigned || event.code.toLowerCase() === assigned;
      }
      return defaultKeys.some((dk) => {
        const norm = dk.toLowerCase() === "space" ? " " : dk.toLowerCase();
        return k === norm || event.code.toLowerCase() === dk.toLowerCase();
      });
    }

    return {
      player,
      shell,
      host,
      selectVideo,
      wakeHud,
      getCustomKeybinds,
      matchesKey,
      getStreamHealth: () => ({
        state: ui.streamHealth?.dataset.state || "idle",
        title: ui.streamHealth?.title || "",
        bufferedEnd: getBufferedEnd(video),
      }),
      key(event) {
        selectVideo();
        if (!video || !visible(video)) return;
        if (document.documentElement.dataset.abiVerdictHotkeys === "on") {
          let verdictTarget = null;
          let verdictName = "";
          if (matchesKey(event, "verdict1", ["1", "v"])) {
            verdictTarget = document.querySelector("#patrolButton0, #drillButton0, .operation a[data-index='1']");
            verdictName = "Violation";
          } else if (matchesKey(event, "verdict2", ["2", "u"])) {
            verdictTarget = document.querySelector("#patrolButton2, .operation a[data-index='2']");
            verdictName = "Uncertain";
          } else if (matchesKey(event, "verdict3", ["3", "c", "i"])) {
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
        if (event.shiftKey && matchesKey(event, "mute", ["m"])) {
          event.preventDefault();
          event.stopImmediatePropagation();
          actions.mute();
          return;
        }
        if (!event.shiftKey && matchesKey(event, "bookmark", ["m", "b"])) {
          event.preventDefault();
          event.stopImmediatePropagation();
          toggleBookmark();
          return;
        }
        if (matchesKey(event, "zoom", ["z"])) {
          event.preventDefault();
          event.stopImmediatePropagation();
          startZoom();
          return;
        }
        if (event.shiftKey && (event.key.toLowerCase() === "g" || matchesKey(event, "gamma", ["g"]))) {
          event.preventDefault();
          event.stopImmediatePropagation();
          toggleGamma(-1);
          return;
        }
        if (matchesKey(event, "gamma", ["g", "x"])) {
          event.preventDefault();
          event.stopImmediatePropagation();
          toggleVision();
          return;
        }
        if (matchesKey(event, "loopIn", ["["])) {
          event.preventDefault();
          event.stopImmediatePropagation();
          setLoopIn();
          return;
        }
        if (matchesKey(event, "loopOut", ["]"])) {
          event.preventDefault();
          event.stopImmediatePropagation();
          setLoopOut();
          return;
        }
        if (matchesKey(event, "loopClear", ["\\"])) {
          event.preventDefault();
          event.stopImmediatePropagation();
          clearLoop();
          return;
        }
        if (matchesKey(event, "play", [" ", "k"])) {
          event.preventDefault();
          event.stopImmediatePropagation();
          if (event.repeat) return;
          actions.play();
          return;
        }
        if (matchesKey(event, "back5", ["j", "ArrowLeft"])) {
          event.preventDefault();
          event.stopImmediatePropagation();
          actions.back5();
          return;
        }
        if (matchesKey(event, "forward5", ["l", "ArrowRight"])) {
          event.preventDefault();
          event.stopImmediatePropagation();
          actions.forward5();
          return;
        }
        if (matchesKey(event, "previous", [",", "<"])) {
          event.preventDefault();
          event.stopImmediatePropagation();
          actions.previous();
          return;
        }
        if (matchesKey(event, "next", [".", ">"])) {
          event.preventDefault();
          event.stopImmediatePropagation();
          actions.next();
          return;
        }
        if (matchesKey(event, "slower", ["-", "_"])) {
          event.preventDefault();
          event.stopImmediatePropagation();
          actions.slower();
          return;
        }
        if (matchesKey(event, "faster", ["=", "+"])) {
          event.preventDefault();
          event.stopImmediatePropagation();
          actions.faster();
          return;
        }
        if (matchesKey(event, "fullscreen", ["f"])) {
          event.preventDefault();
          event.stopImmediatePropagation();
          if (event.repeat) return;
          actions.fullscreen();
          return;
        }
      },
      keyUp(event) {
        if (matchesKey(event, "zoom", ["z"])) {
          stopZoom();
        }
      },
      startZoom,
      stopZoom,
      toggleGamma,
      applyGamma,
      toggleVision,
      applyVision,
      setLoopIn,
      setLoopOut,
      clearLoop,
      toggleLoop,
      getLoopState: () => ({ loopStart, loopEnd, loopActive }),
      destroy() {
        stopPlaybackLoop();
        shell.removeAttribute("data-controls-ready");
        stopZoom();
        if (video) video.style.filter = "";
        zoomBadge?.remove();
        life.abort();
        mediaLife?.abort();
        playerObserver.disconnect();
        clearTimeout(noticeTimer);
        if (expiryInterval) clearInterval(expiryInterval);
        expiryBadge?.remove();
        shell.classList.remove("abi-case-expiring");
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
      let customValues = [];
      try {
        const raw = document.documentElement.dataset.abiKeybinds || localStorage.getItem("abi-keybinds");
        if (raw) customValues = Object.values(JSON.parse(raw)).map((k) => String(k).toLowerCase());
      } catch {}
      const isAllowedShift =
        event.shiftKey &&
        (["m", "g", "+"].includes(event.key.toLowerCase()) || customValues.includes(event.key.toLowerCase()));
      if (
        event.defaultPrevented ||
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        event.isComposing ||
        (event.shiftKey && !isAllowedShift)
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
  document.addEventListener(
    "keyup",
    (event) => {
      let customValues = [];
      try {
        const raw = document.documentElement.dataset.abiKeybinds || localStorage.getItem("abi-keybinds");
        if (raw) customValues = Object.values(JSON.parse(raw)).map((k) => String(k).toLowerCase());
      } catch {}
      const isAllowedShift =
        event.shiftKey &&
        (["m", "g", "+"].includes(event.key.toLowerCase()) || customValues.includes(event.key.toLowerCase()));
      if (
        event.defaultPrevented ||
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        event.isComposing ||
        (event.shiftKey && !isAllowedShift)
      )
        return;
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
      instance?.keyUp?.(event);
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
