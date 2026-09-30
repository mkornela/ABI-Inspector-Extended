# ABI Inspector Extended

A self-contained Chrome / Edge Manifest V3 extension for the official Arena Breakout: Infinite Inspector page:

https://www.arenabreakoutinfinite.com/act/a20251028patroller/?lang=en

Version 1.3.0. No build step, dependencies, account connection, or external assets.

## Install in Chrome or Edge

1. Extract the ZIP to a permanent folder. If using the provided unpacked folder, skip extraction.
2. Open `chrome://extensions` in Chrome, or `edge://extensions` in Edge.
3. Enable **Developer mode**.
4. Select **Load unpacked** and choose the `abi-inspector-enhancer` folder containing `manifest.json`.
5. Open or reload the official Inspector page. The replacement toolbar sits flush beneath the working video and takes over from the native bottom controls.

Keep the folder in place. After replacing extension files, select **Reload** on its extensions-page card and reload the Inspector tab. To remove the enhancement, disable/remove the extension and reload the tab.

## Controls

| Control               | Action / shortcut                                                       |
| --------------------- | ----------------------------------------------------------------------- |
| Play / Pause          | Space or K                                                              |
| −5s / +5s             | J / L or Left / Right arrow                                             |
| −10s / +10s           | Toolbar buttons                                                         |
| Progress slider       | Seek within the current video's duration; displays current / total time |
| Previous / next frame | Comma / period; pauses and seeks approximately 1/30 second              |
| Speed                 | 0.1×, 0.25×, 0.5×, 0.75×, 1×, 1.25×, 1.5×, 2×, 3×                       |
| Volume                | Slider; arrow keys adjust it when focused                               |
| Mute / Unmute         | M                                                                       |
| Fullscreen            | F or toolbar button; Escape exits                                       |

Shortcuts work when focus is on the page/player. They are ignored in inputs, textareas, contenteditable elements, selects, buttons, links, and dialog controls, including the extension's own sliders. Tab navigates the toolbar; Enter/Space activates its buttons. Modifier-key combinations and composition input are left alone. Holding a seek key repeats seeking; holding play/mute/fullscreen does not repeatedly toggle.

Frame stepping is approximate, not decoded-frame-accurate. It uses 1/30 second regardless of the footage's actual frame rate. Seeking is disabled until a finite duration is available. The site may impose its own media limits or reset settings when a case changes. The extension uses the currently visible official video and does not force playback preferences onto replacement videos. No settings are stored.

## Explicit safety boundaries

- Controls operate only on the official HTML video inside `#workingPlayer`. No substitute player, external review copy, footage analysis, or inspection automation.
- `.watermark` and `.txp-watermark` are never edited, hidden, removed, restyled, cloned, or covered by the custom toolbar. The original player subtree stays intact, including both overlay layers. Fullscreen includes that whole subtree; it never makes the bare video fullscreen. The CSS guard keeps native controls visible if a future player places a watermark inside their container.
- The profile and official inspection notes are arranged as a left sidebar beside the video. The official verdict buttons keep their original nodes, IDs, classes, links, event handlers, and behavior; only their local appearance and position within the existing player column are changed. No submission logic, account/case APIs, or verdict listeners are accessed, and no clicks are synthesized on the official page.
- No fetch, XMLHttpRequest, WebSocket, beacons, network interception, downloads, remote scripts, CDNs, analytics, telemetry, storage, or background worker. The extension never reads `src`, `currentSrc`, source elements, or video URLs.
- The official site continues loading its own video. User-directed playback/seeking can naturally cause the site's existing media pipeline to load video data; the extension makes no network requests of its own.
- The manifest has no `permissions`, `host_permissions`, `optional_permissions`, or web-accessible resources. Its sole content-script match is the exact HTTPS hostname and Inspector directory. An additional runtime guard accepts only `/act/a20251028patroller/` (or its slashless form when injected), with any language query, and only the top frame. No subdomains or other page paths are enabled. The slashless URL normally redirects to the configured trailing-slash path.
- The native `.plugin_ctrl_txp_bottom` and its bottom gradient are hidden only while the replacement controls are mounted and ready. Their nodes and handlers are retained. Disabling the extension and reloading restores the original controls. The custom toolbar stays outside the footage, including in fullscreen, and the video uses `object-fit: contain` to avoid cropping it.
- Text and icon controls reuse the host navigation's computed font family, weight, tracking, active color, and border color. On the inspected English page this is `font_en` (Refrigerator Deluxe), accent `#ca4d31`, and 1px square borders. No fonts, icons, backgrounds, or CDN resources are requested by the extension. The progress and volume tracks have thin dark backgrounds and square handles; filled sections use the host accent.
- Every playback action remains separate, grouped into playback, seeking, frame stepping, speed, audio, and view controls. Shortcut hints are in button tooltips. Status text appears only temporarily after feedback or an error.
- The extension wraps the complete player once to place controls below the footage and support fullscreen with all original overlays. Modern Chromium's state-preserving DOM move is used when available; older versions fall back to an ordinary DOM move, which may restart initial media loading. Use an up-to-date browser.

This is an independent local UI enhancement, not an official ABI product or confirmation of publisher approval. Technical boundaries do not establish permission under the Inspector rules.

## Rerenders and troubleshooting

MutationObservers reconnect controls after video-slot switches, video replacement, player replacement, and toolbar removal. Old media listeners are removed. Rerender cleanup unwraps any remaining official nodes rather than deleting them.

If no toolbar appears, confirm the exact address above, refresh the tab after installation, and wait until the official working player is available. Training/drill players are intentionally excluded. A future change to the site's player ID or layout may require updating the extension.

If the official player rejects playback/seeking, the toolbar reports it locally. It does not retry via a different source or bypass site restrictions. Reload the page with the extension disabled to compare the original behavior.

## Icon attribution

Font Awesome Free 6.7.2 icons are embedded locally under CC BY 4.0. See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) for attribution and the included license.

## Verification and source

The source is readable without a build:

- `manifest.json`: narrow Manifest V3 declaration.
- `content.js`: local toolbar, keyboard controls, media binding, lifecycle cleanup.
- `player.css`: scoped player sizing and fullscreen layout.

The public repository contains source and documentation only; generated builds and test fixtures are kept out of the extension package.`n
No authenticated live case was tested. Real-site CSS, proprietary player behavior, and future site changes remain a compatibility limit.

Manifest and permission references: [Chrome content scripts](https://developer.chrome.com/docs/extensions/reference/manifest/content-scripts), [Chrome match patterns](https://developer.chrome.com/docs/extensions/develop/concepts/match-patterns), [Chrome permissions](https://developer.chrome.com/docs/extensions/develop/concepts/declare-permissions).
