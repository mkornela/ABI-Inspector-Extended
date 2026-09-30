(() => {
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
  };
  const styles = `
    :host { display:block; color:var(--abi-text,#e0e3de); font-family:var(--abi-font,"Arial Narrow",sans-serif); font-weight:var(--abi-weight,700); letter-spacing:var(--abi-tracking,0px); color-scheme:dark; }
    * { box-sizing:border-box; }
    :host { min-width:0; width:100%; box-sizing:border-box; }
    .icon { width:14px; height:14px; fill:currentColor; flex:none; pointer-events:none; }
    button { display:inline-flex; align-items:center; justify-content:center; gap:7px; }
    #mute { width:34px; padding:0; }
    .panel { padding:0 14px 10px; background:var(--abi-surface,#0b1114); background-image:repeating-linear-gradient(135deg,transparent 0 3px,#ffffff03 3px 4px); border:0; border-bottom:1px solid var(--abi-border,#41494b); }
    .timeline { display:flex; align-items:center; gap:16px; height:35px; }
    .time { font-size:13px; font-variant-numeric:tabular-nums; white-space:nowrap; min-width:87px; text-align:right; }
    .row { display:flex; align-items:center; flex-wrap:wrap; row-gap:10px; }
    .group { display:flex; align-items:center; gap:2px; padding:0 10px; border-left:1px solid color-mix(in srgb,var(--abi-border,#596160) 55%,transparent); }
    .group:first-child { padding-left:0; border-left:0; }
    .group:last-child { padding-right:0; }
    button,select { font:inherit; font-size:15px; letter-spacing:inherit; text-transform:uppercase; height:34px; border:1px solid transparent; border-radius:0; color:inherit; background:transparent; padding:0 8px; cursor:pointer; white-space:nowrap; box-shadow:none; }
    button:hover,select:hover { border-color:var(--abi-border,#707674); background:#ffffff05; }
    button[aria-pressed=true] { color:var(--abi-accent,#c3472d); border-bottom-color:currentColor; }
    .primary { min-width:62px; color:var(--abi-accent,#c3472d); border:1px solid currentColor; margin-right:1px; }
    button:disabled,input:disabled { opacity:.35; cursor:default; }
    :focus-visible { outline:1px solid var(--abi-text,#e0e3de); outline-offset:2px; }
    input[type=range] { appearance:none; -webkit-appearance:none; height:18px; margin:0; padding:0; border:0; background:transparent; cursor:pointer; min-width:0; border-radius:0; }
    input[type=range]::-webkit-slider-runnable-track { height:3px; border:0; border-radius:0; background:linear-gradient(to right,var(--abi-accent,#c3472d) 0 var(--fill,0%),#374044 var(--fill,0%) 100%); }
    input[type=range]::-webkit-slider-thumb { appearance:none; -webkit-appearance:none; width:3px; height:11px; margin-top:-4px; border:0; border-radius:0; background:var(--abi-text,#e0e3de); box-shadow:none; }
    #seek { flex:1 1 0; width:0; }
    #volume { width:50px; }
    label { display:flex; align-items:center; gap:4px; font-size:13px; text-transform:uppercase; }
    select { font-size:14px; padding:0 3px; }
    option { background:#0b1114; color:#e0e3de; }
    #status { font-size:13px; line-height:1.5; padding-top:6px; }
    #status:empty { display:none; }
    @media(max-width:600px) { .panel { padding-inline:8px; } button { padding-inline:6px; font-size:14px; } .group { padding-inline:6px; } }
  `;
  let instance = null;
  let queued = false;
  const format = (value) => {
    if (!Number.isFinite(value)) return "--:--";
    const seconds = Math.max(0, Math.floor(value));
    const h = Math.floor(seconds / 3600);
    return `${h ? `${h}:` : ""}${String(Math.floor(seconds / 60) % 60).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
  };

  function create(player) {
    const shell = document.createElement("abi-local-player");
    const host = document.createElement("abi-local-controls");
    const tab = document.querySelector(".nav #working");
    const activeTab = document.querySelector(".nav li.current");
    const idleTab = document.querySelector(".nav li:not(.current)");
    const note = document.querySelector("#xcWorking .tips-title");
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
      <div class="timeline"><input id="seek" type="range" min="0" max="1" step="0.01" value="0" aria-label="Video position"><span class="time" id="time">00:00 / --:--</span></div>
      <div class="row">
        <div class="group" role="group" aria-label="Playback"><button id="play" class="primary" title="Play / Pause (Space or K)">Play</button></div>
        <div class="group" role="group" aria-label="Seek">
          <button id="back10" title="Back 10 seconds">−10s</button><button id="back5" title="Back 5 seconds (J or Left)">−5s</button><button id="forward5" title="Forward 5 seconds (L or Right)">+5s</button><button id="forward10" title="Forward 10 seconds">+10s</button>
        </div>
        <div class="group" role="group" aria-label="Frame stepping"><button id="previous" title="Previous approximate frame (comma)">Previous frame</button><button id="next" title="Next approximate frame (period)">Next frame</button></div>
        <div class="group" role="group" aria-label="Playback settings"><label>Speed <select id="speed" aria-label="Playback speed"><option value="0.1">0.1×</option><option value="0.25">0.25×</option><option value="0.5">0.5×</option><option value="0.75">0.75×</option><option value="1" selected>1×</option><option value="1.25">1.25×</option><option value="1.5">1.5×</option><option value="2">2×</option><option value="3">3×</option></select></label></div>
        <div class="group" role="group" aria-label="Audio"><button id="mute" title="Mute (M)" aria-pressed="false">Mute</button><input id="volume" type="range" min="0" max="1" step="0.01" value="1" aria-label="Volume"></div>
        <div class="group" role="group" aria-label="View"><button id="fullscreen" title="Fullscreen (F); Escape to exit" aria-pressed="false">Fullscreen</button></div>
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
      "Previous frame",
      "Previous approximate frame (comma)",
    );
    decorate(
      ui.next,
      "forward-step",
      "Next frame",
      "Next approximate frame (period)",
    );
    decorate(ui.mute, "volume-high", "", "Mute (M)");
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
    function visible(candidate) {
      const css = getComputedStyle(candidate);
      return (
        candidate.getClientRects().length > 0 &&
        css.visibility === "visible" &&
        css.display !== "none" &&
        Number(css.opacity) !== 0
      );
    }
    function selectVideo() {
      const candidates = [...player.querySelectorAll("video")].filter(visible);
      candidates.sort(
        (a, b) =>
          (parseInt(getComputedStyle(b).zIndex, 10) || 0) -
          (parseInt(getComputedStyle(a).zIndex, 10) || 0),
      );
      const selected = candidates[0] || null;
      if (selected === video) return;
      mediaLife?.abort();
      video = selected;
      if (video) {
        mediaLife = new AbortController();
        for (const name of [
          "timeupdate",
          "durationchange",
          "loadedmetadata",
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
          video.addEventListener(name, render, { signal: mediaLife.signal });
        }
      }
      render();
    }
    function render() {
      const ready = finite();
      for (const id of ["play", "speed", "mute", "volume"])
        ui[id].disabled = !video;
      for (const id of [
        "seek",
        "back10",
        "back5",
        "forward5",
        "forward10",
        "previous",
        "next",
      ])
        ui[id].disabled = !ready;
      const paused = !video || video.paused;
      decorate(
        ui.play,
        paused ? "play" : "pause",
        paused ? "Play" : "Pause",
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
          `${video.muted ? "Unmute" : "Mute"} (M)`,
        );
        ui.mute.setAttribute("aria-pressed", String(video.muted));
        ui.speed.value = String(video.playbackRate);
      }
      ui.fullscreen.setAttribute(
        "aria-pressed",
        String(document.fullscreenElement === shell),
      );
      const expanded = document.fullscreenElement === shell;
      decorate(
        ui.fullscreen,
        expanded ? "compress" : "expand",
        expanded ? "Exit fullscreen" : "Fullscreen",
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
      notice("Approximate frame step · 1/30 second");
    }
    async function togglePlay() {
      if (!video) return;
      if (!video.paused) video.pause();
      else {
        try {
          await video.play();
        } catch {
          notice("Playback unavailable — try the official player");
        }
      }
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
    const actions = {
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
      fullscreen,
    };
    for (const [id, fn] of Object.entries(actions))
      on(ui[id], "click", () => {
        selectVideo();
        fn();
      });
    on(ui.seek, "input", () => seek(Number(ui.seek.value)));
    on(ui.volume, "input", () => {
      if (video) {
        video.volume = Number(ui.volume.value);
        video.muted = video.volume === 0;
        render();
      }
    });
    on(ui.speed, "change", () => {
      if (video) {
        video.playbackRate = Number(ui.speed.value);
        render();
      }
    });
    on(document, "fullscreenchange", render);
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
        const keys = {
          " ": "play",
          k: "play",
          j: "back5",
          l: "forward5",
          ArrowLeft: "back5",
          ArrowRight: "forward5",
          ",": "previous",
          ".": "next",
          m: "mute",
          f: "fullscreen",
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
    const player = document.getElementById("workingPlayer");
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
})();
