# ABI Inspector Extended

[![Version](https://img.shields.io/badge/version-3.0.2-f59e0b.svg)](CHANGELOG.md)
[![Manifest](https://img.shields.io/badge/manifest-v3-3b82f6.svg)](abi-inspector-enhancer/manifest.json)
[![Tests](https://img.shields.io/badge/tests-26%20passed-10b981.svg)](tests/)
[![Security](https://img.shields.io/badge/privacy-100%25%20client--side-06b6d4.svg)](#privacy-and-compatibility)
[![Languages](https://img.shields.io/badge/languages-9%20supported-8b5cf6.svg)](#localization)

> [!WARNING]
> **Use at your own risk:** I am still awaiting a response from the game developers about the extension and whether it is safe to use.

**Version 3.0.2** · A high-performance tactical interface enhancement for the official Arena Breakout: Infinite Inspector.

ABI Inspector Extended elevates the Inspector experience with a streamlined single-row video player HUD, tactical Hold-to-Zoom loupe, shadow and gamma boost, a live 00:00 UTC daily quota countdown clock, animated overview accuracy boards, an in-depth in-site settings and keybinds hub, and full 9-language localization.

> Independent community project. Not affiliated with or endorsed by the game’s publisher. Retains 100% of official inspection workflows, verification protocols, and network safety.

---

## Screenshots

All project screenshots live in [`screenshots/`](screenshots/). Inspector identity values and case numbers in screenshots are anonymized with `***`.

### Overview

| Overview · Accuracy Board (EN) | Overview · German Localization (DE) |
| :---: | :---: |
| ![Anonymized Accuracy Board overview](screenshots/tab_1_overview.png) | ![Overview with German localization](screenshots/tab_1_overview_de.png) |

### Tactical Workbench & Video Player

| Workbench · Single-Row Tactical Video HUD | Test Cases & Drill Mode |
| :---: | :---: |
| ![Workbench with single-row tactical video controls, bookmarks, and notes](screenshots/tab_2_video.png) | ![Test Cases with player and inspection notes](screenshots/tab_4_testcases.png) |

### Settings & Master Switch

| In-Site Settings & Keybinds Hub | Extension Popup Master Switch |
| :---: | :---: |
| ![In-site extension settings and keybinds hub](screenshots/insite_settings.png) | ![Extension popup with master toggle](screenshots/settings.png) |

### Restyled Verdict Dialogs

| Violation Dialog | No Violation Dialog | Uncertain Dialog |
| :---: | :---: | :---: |
| ![Violation dialog with quick-tag chips](screenshots/violation.png) | ![No Violation dialog with quick-tag chips](screenshots/no_violation.png) | ![Uncertain dialog with quick-tag chips](screenshots/uncertain.png) |

### Challenges & Guidelines

| Challenges & Rewards | Penalty Reference List |
| :---: | :---: |
| ![Weekly and exclusive challenge list](screenshots/tab_3_challenges.png) | ![News penalty list](screenshots/tab_5_news_penalties.png) |

| Inspection Guidelines | Frequently Asked Questions |
| :---: | :---: |
| ![News inspection guidelines](screenshots/tab_5_news_guidelines.png) | ![News FAQ](screenshots/tab_5_news_faq.png) |

---

## What's New in Version 3.0

- 🎯 **Single-Row Tactical Video Player:** A unified, compact, ultra-responsive player control bar:
  - **Left Wing:** Play / Pause toggle, jump seek buttons (`-10s`, `-5s`, `+5s`, `+10s`).
  - **Center Deck:** Full-width interactive scrubber timeline with hover-time badge, suspect bookmark pin markers, micro frame stepping buttons (`<` / `>`), and clickable millisecond/fractional time display.
  - **Right Wing:** Tactile playback speed badge (`0.1×` to `3.0×`), smooth volume slider, suspect bookmark pin dropper, 3-stage Shadow & Gamma Boost, in-place player reload, and native fullscreen toggle.
- 🔍 **Tactical Hold-to-Zoom Loupe:** Hold **`Z`** or hold **Right-Click** over the video for instantaneous 2.5× magnification centered precisely on your cursor. Release to return smoothly to 1× framing.
- ☀️ **Shadow & Gamma Boost:** Cycle through **Normal → Shadow Boost → Max Brightness** with the **`G`** key or player toolbar button to reveal targets lurking in pitch-black corners, dense foliage, or dark interiors.
- ⏱️ **Daily Server Reset Countdown Clock:** Live countdown badge on the Overview Today card indicating exact hours, minutes, and seconds remaining until the official **00:00 UTC** daily quota refresh.
- ⌨️ **Dedicated In-Site Keybinds Hub:** Keybinds are now housed in their own dedicated tab inside Settings with visual tactile key chips and clear descriptions.
- 🎨 **Custom HUD Accent Color Themes:** Choose between **Amber Gold**, **Emerald Green**, **Tactical Blue**, and **Crimson Red** with real-time reactive theme previews.
- 🛡️ **Accidental Leave Guard:** Active case protection prompts confirmation before closing or reloading the tab during an in-progress review.
- 🔇 **Silent Scrubbing:** Automatically mutes audio output during seek bar drags, preventing deafening audio stutter and screeching bursts.
- 🎬 **Modal Position Retain:** Preserves exact video playback position when opening or dismissing verdict modals, preventing official site scripts from resetting the video back to 0:00.
- 👁️ **Clean Fullscreen HUD:** Auto-fades player controls and cursor during fullscreen playback after 2.5 seconds of inactivity, waking instantly upon mouse movement.

---

## Core Features

- **Accuracy Board Overview:** Profile header, current rank and level progression, inspection accuracy percentage, historical volume, successful inspections, and ban statistics.
- **Detailed Overview with Stacked Progress Bars:** 
  - Weekly and seasonal inspection stacked progress bars visually segment correct, wrong, and pending/unresolved inspections.
  - Interactive hover tooltips display exact counts and percentage breakdowns.
  - Smooth loading bar animations on tab navigation.
  - Daily inspection counters, today's allowance, current-level XP, remaining XP, and cumulative XP.
  - All metrics render from existing Inspector responses without sending extra API requests.
- **Modern Unified Metallic UI:**
  - Dark metallic palette (`#13191c` / `#161f23`) with sleek `6px` rounded borders and subtle hover elevations.
  - Unified rounded button and card styling across Navigation, Overview, Workbench, Challenges, News tabs, and the top account bar.
  - Custom floating language picker and streamlined header actions without background clutters.
- **In-Site Settings Hub (`Settings`):**
  - Dedicated configuration tab on the Inspector site with instant reactive toggles and live status badges.
  - Customize Player Controls, Autoplay behavior, Site modifications, Overview enhancements, Anonymization defaults, and Verdict Dialog enhancements.
  - Single-click "Reset all to defaults" action.
- **Streamlined Extension Popup:**
  - One-click master on/off switch to activate or bypass all extension features instantly.
  - Direct shortcut button to open the comprehensive in-site settings tab.
  - Displays live connection status and version details.
- **Quick Verdict Hotkeys (Workbench):**
  - Instant verdict selection directly from your keyboard:
    - **`1`**: Violation
    - **`2`**: Uncertain
    - **`3`**: No Violation
  - Disabled by default in Settings to prevent accidental submissions; can be enabled at any time.
- **Enhanced Video Controls & Player Fixes:**
  - Full playback bar: play/pause, 5-second & 10-second jumps, frame stepping (~1/30s), playback speed multiplier (0.1× to 3×), volume slider, and fullscreen.
  - **Screen-click play/pause:** Click directly on the video screen/container to pause or resume playback.
  - **Reliable playback speed retention:** Adjusting playback speed persists reliably across pauses, unpauses, and case switches without snapping back to 1×.
  - **Autoplay safety:** Videos auto-start on load if autoplay is enabled, but never override user pauses or repeatedly loop unexpected play states.
- **Screenshot Anonymization:**
  - Account toolbar and settings toggle to anonymize names, account IDs, ranks, levels, and inspection numbers with `***`.
  - Easy toggle between Anonymize and Unanonymize for safe sharing and recording.
- **Workbench and Test Cases:** Shared player layout, official inspection notes, team/enemy/Scav color references, and native verdict controls.
- **Restyled Verdict Dialogs & Quick-Tag Reason Chips:** Modernized modal styling, one-click localized quick-tag reason chips (Wallhack / Pre-aiming, Aimbot / Instant Snap, Abnormal Speed / Movement, No Recoil, Macro, Lag Switching, Rage Cheating), English/localized placeholders, character limits (`x / 50`), and category counters (`x / 3 selected`) while preserving official submission behaviors.

---

## Localization

ABI Inspector Extended features native 100% string coverage across **9 languages**:

| Code | Language | Native Name |
| :--- | :--- | :--- |
| `en` | English | English |
| `de` | German | Deutsch |
| `ru` | Russian | Русский |
| `fr` | French | Français |
| `es` | Spanish | Español |
| `ja` | Japanese | 日本語 |
| `pt-BR` | Portuguese (Brazil) | Português (Brasil) |
| `zh-Hant` | Traditional Chinese | 繁體中文 |
| `cn` | Simplified Chinese | 简体中文 |

Switch languages at any time using the header language selector or through the in-site settings panel.

---

## Installation

1. Download or clone this repository to a permanent local folder.
2. Open `chrome://extensions` in Chrome, `edge://extensions` in Edge, or the extensions page in your Chromium-based browser.
3. Enable **Developer mode** (toggle in the top-right corner).
4. Click **Load unpacked** and select the [`abi-inspector-enhancer`](abi-inspector-enhancer/) directory.
5. Navigate to or reload the official Inspector portal:
   [`https://www.arenabreakoutinfinite.com/act/a20251028patroller/`](https://www.arenabreakoutinfinite.com/act/a20251028patroller/)

> [!TIP]
> After updating extension files, click the reload icon on the extensions page and refresh the Inspector tab.

---

## Keyboard Shortcuts

Shortcuts apply while focused on the Inspector page or video player. Hotkeys are automatically ignored while typing in input fields, text areas, search boxes, or when focused on dialog action buttons.

### Player & Navigation Shortcuts

| Action | Key / Input | Description |
| :--- | :--- | :--- |
| **Play / Pause** | `Space` or `K` | Toggle playback (or click directly on video) |
| **Seek ±5s** | `J` / `L` or `←` / `→` | Jump back or forward 5 seconds |
| **Seek ±10s** | `-10` / `+10` buttons | Jump back or forward 10 seconds via player buttons |
| **Frame Step** | `,` / `.` (or `<` / `>`) | Step backward or forward one exact frame (~1/30s) |
| **Adjust Speed** | `[` / `]` | Decrease or increase playback speed by 0.1× |
| **Reset Speed** | `\` (or click speed badge) | Reset playback speed instantly back to 1.0× |
| **Mute / Unmute** | `M` (when video focused) | Toggle audio mute |
| **Bookmark Pin** | `M` / Pin Button | Drop or remove suspect moment marker at current timestamp |
| **Hold-to-Zoom** | Hold `Z` or Right-Click | 2.5× loupe magnification centered on cursor |
| **Shadow Boost** | `G` / Gamma Button | Cycle: Normal → Shadow Boost → Max Brightness |
| **Precision Time** | Click timestamp | Toggle seconds display vs. millisecond fractional time |
| **Fullscreen** | `F` or Double-Click | Toggle immersive fullscreen mode (`Esc` to exit) |

### Quick Verdict Shortcuts (Workbench)

> [!NOTE]
> Quick verdict hotkeys must be enabled under the in-site **Settings → Keybinds** tab.

| Verdict | Hotkey | Action |
| :--- | :--- | :--- |
| **Violation** | `1` | Opens the Violation classification dialog |
| **Uncertain** | `2` | Opens the Uncertain submission dialog |
| **No Violation** | `3` | Opens the No Violation confirmation dialog |

---

## Privacy and Compatibility

- **100% Client-Side:** Declares only standard `storage` permission for user preferences and player volume persistence.
- **Zero Network Overhead:** Contains no third-party CDNs, telemetry, tracking pixels, or external API endpoints.
- **TOS & Fair Use Friendly:** Does NOT scrape raw video URLs, remove official security watermarks, bypass verification checks, or automate verdict submissions.
- **Safe Scope:** Content scripts strictly match `https://www.arenabreakoutinfinite.com/act/a20251028patroller/*`.
- **Target Browser:** Designed and tested for modern Chromium-based browsers (Google Chrome, Microsoft Edge, Brave, Opera).

---

## Source Map

To run validation checks and tests locally:
```bash
npm install
npm run check
npm test
```

Project architecture:
- [`abi-inspector-enhancer/manifest.json`](abi-inspector-enhancer/manifest.json) — Extension manifest and permission scopes.
- [`abi-inspector-enhancer/settings.js`](abi-inspector-enhancer/settings.js) — Centralized configuration schema and storage handlers.
- [`abi-inspector-enhancer/popup.html`](abi-inspector-enhancer/popup.html) & [`popup.js`](abi-inspector-enhancer/popup.js) — Master toggle popup interface.
- [`abi-inspector-enhancer/content.js`](abi-inspector-enhancer/content.js) & [`player.css`](abi-inspector-enhancer/player.css) — Single-row video controls, Hold-to-Zoom loupe, Shadow Boost, Silent Scrubbing, and bookmark pins.
- [`abi-inspector-enhancer/site-ui.js`](abi-inspector-enhancer/site-ui.js) & [`layout.css`](abi-inspector-enhancer/layout.css) — Metallic design system, stacked progress bars, 00:00 UTC countdown clock, and settings hub.
- [`abi-inspector-enhancer/overview-observer.js`](abi-inspector-enhancer/overview-observer.js) & [`overview-data.js`](abi-inspector-enhancer/overview-data.js) — Passive summary response listener relaying numeric metrics to the Overview DOM.
- [`abi-inspector-enhancer/dialogs.js`](abi-inspector-enhancer/dialogs.js) & [`dialogs.css`](abi-inspector-enhancer/dialogs.css) — Modern verdict modals, quick-tag reason chips, and character limit indicators.
- [`screenshots/`](screenshots/) — Visual documentation and gallery captures.
- [`tests/`](tests/) — Complete automated unit test suites (Overview, Player, Settings).

---

## Credits & License

The project uses locally bundled [Font Awesome Free 6.7.2](https://fontawesome.com/license/free) icons under CC BY 4.0. Attribution and license notices are available in [`abi-inspector-enhancer/THIRD_PARTY_NOTICES.md`](abi-inspector-enhancer/THIRD_PARTY_NOTICES.md).

This is an independent open-source enhancement. Use in accordance with official Arena Breakout: Infinite Inspector guidelines and terms.
