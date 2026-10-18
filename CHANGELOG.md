# Changelog

All notable changes to **ABI Inspector Extended** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.6.1] - 2026-10-18

### Added
- Added German localization showcase screenshot (`screenshots/tab_1_overview_de.png`) to documentation highlighting localized Overview cards and status boards.

### Fixed
- **Resilient Extension Context Invalidation Handling:**
  - Safely wrapped all `chrome.runtime` and `chrome.storage` API calls across `site-ui.js`, `content.js`, `settings.js`, and `popup.js` with `try...catch` guards to prevent `Uncaught Error: Extension context invalidated` errors when the extension is updated or reloaded while tabs remain open.
  - Implemented `safeStorageGet`, `safeStorageSet`, and `getExtensionVersion` fallback utilities to gracefully resolve preferences and metadata without throwing if the extension context disconnects.
- **Fixed Doubled Dialog Close Buttons:**
  - Resolved duplicate close icons caused by CSS `::after` content rendering alongside the injected SVG in `.close-btn`.
  - Fixed CSS selector matching `_close-btn` on footer action buttons (e.g. Cancel button in `illegalPopup` and drill result modals), preventing Cancel buttons from receiving absolute top-right positioning and stray `×` symbols.

---

## [2.6.0] - 2026-10-18

### Added
- **Complete In-Site Settings Redesign:**
  - Modern, single-column content area (max-width `780px`) with a sticky left sidebar navigation strip.
  - 5 organized sections: **Playback**, **Interface**, **Verdicts**, **Privacy**, and **About**.
  - **Live Search Bar:** Search across settings titles, descriptions, and tags with instantaneous filtering, clear button, and friendly empty state.
  - **Flat Pill Toggles:** Standardized 44×26px flat switches replacing inconsistent toggle designs.
  - **Integrated Volume Slider & Speed Chips:** Slider with real-time numeric readout, active track accent gradient, and quick-set preset chips (Mute, 50%, 100%, 0.5×, 0.75×, 1×, 1.25×, 1.5×, 2×).
  - **Visual Dependencies & Tooltips:** Dependent settings (such as *Skip intro screen* depending on *Site modifications*, or *Quick verdict hotkeys* depending on *Verdict dialog enhancements*) show dimmed states and informational tooltips when parent controls are disabled.
  - **Streamer / Privacy Mode Live Preview:** Interactive preview card demonstrating real-time player name masking.
  - **Section & Global Reset:** Per-section reset buttons and an enhanced "Restore Defaults" button with inline confirmation feedback.
  - **Responsive Layout:** Automatically switches to a compact horizontal tab navigation strip on viewports under `760px`.

- **Comprehensive Multi-Language Localization (All 10 Official Languages):**
  - Full translations for **English (`en`)**, **German (`de`)**, **Russian (`ru`)**, **French (`fr`)**, **Spanish (`es`)**, **Japanese (`ja`)**, **Portuguese - Brazil (`pt-BR`)**, **Traditional Chinese (`zh-Hant`)**, and **Simplified Chinese (`cn`)**.
  - Dynamic live translation on language switch for:
    - Workbench status cards: *"Inspected Today"*, *"Cases remaining today"*, and daily quota completion.
    - Official Role & Distance Color Key: *"Teammates"*, *"Enemies"*, and *"Scavs (bots)"*.
    - Official 2-part Inspection Notice disclaimer with localized bold keyword emphasis.
    - Test Cases & Drill counters: *"Practice Cases"*, *"Inspections"*, and *"Valid"*.
  - Synchronized with official navigation bar and language switcher events (`_langNav_` and `nav.js`).

- **FAQ, Guidelines, and Penalties Tab Styling & Observer Resilience:**
  - Resilient card styling and spacing for FAQ items, Community Guidelines, and Penalty lists.
  - Multi-language Q&A parsing supporting all localized prefix glyphs (`Q:`, `F:`, `В:`, `P:`, `Q：`, `问：` / `A:`, `R:`, `О:`, `答：`).
  - Added attribute and dataset tracking (`data-abi-lang`) to prevent layout wiping when switching languages.
  - Navigation click delegates ensuring immediate re-styling without page reloads.

- **ActTools & Milo SDK Compatibility Polyfill:**
  - Injected compatibility polyfill in `overview-observer.js` to silence `milo-outside please setCommonConfig intlGameid` and related console warnings.
  - Clean, consolidated patroller and analytics logging.

- **Test Suite Expansion:**
  - Added `tests/settings.test.cjs` covering settings layout, DOM structure, search filtering, dependencies, reset buttons, and privacy previews.
  - Expanded `tests/overview.test.cjs` and `tests/player.test.cjs` verifying multilingual translation, banner watermarks, and autoplay cancellation.

### Fixed
- **Autoplay Cancellation:** Fixed video player auto-playing on page entrance when *Auto-play on load* is turned OFF.
- **Exit Inspection Button:** Fixed click handler on the navbar exit button to ensure reliable exit from inspection sessions.
- **Embed & Modal Close Buttons:** Added missing SVG close icons and restored dismissal handling across embedded dialogs and overlay frames.
- **Workbench Real-Time Counter Sync:** Fixed mutation observer thrashing when updating live inspection counts upon verdict submission.

---

## [2.5.1] - 2026-10-15

### Fixed
- Prioritized live `#dayTotalJudgedNum` DOM element on Workbench over cached summary data.
- Bi-directionally synchronized live inspection count into in-memory overview data.
- Updated status card DOM in-place to prevent mutation observer thrashing.

---

## [2.5.0] - 2026-10-14

### Added
- Dark metallic visual redesign with rounded card boxes and clean header actions.
- Animated stacked inspection progress bars with hover breakdown tooltips.
- Dedicated on-site Settings hub and simplified extension popup master switch.
- Quick verdict hotkeys (`1`/`G` for Violation, `2`/`U` for Uncertain, `3`/`I`/`C` for No Violation).
- Screen-click play/pause, reliable speed multiplier retention (0.1× to 3×), and safe autoplay.
- Automated test suites for Overview and Player controls.

---

## [2.4.0] - 2026-10-14

### Added
- Polished rank badges and interactive states on Overview.
- Enhanced Test Cases card framing to match Workbench layout.
- Restyled verdict confirmation popups with rounded corners and clean borders.

---

## [2.3.0] - 2026-10-14

### Added
- Separated profile information from status badges into dedicated cards.
- Prevented copy button text clipping on high DPI screens.
- Anchored Exit Inspection action button cleanly into navbar.
- Redesigned Challenges tab with contained layout and aligned progress bars.
