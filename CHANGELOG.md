# Changelog

All notable changes to **ABI Inspector Extended** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.0] - 2026-10-19

### Changed
- **Single-Row Video Player Control Bar Redesign:**
  - Modernized HUD video playback bar into a streamlined, high-density single-row layout eliminating dual-tier clutter.
  - **Top-Edge Scrubber:** Sleek continuous progress timeline spanning the full width across the top edge with hover-time badge and suspect moment bookmarks.
  - **Left Section:** Core playback controls featuring Play/Pause button (`#play`) and tactical skip steps: `-10s` (`#back10`), `-5s` (`#back5`), `+5s` (`#forward5`), `+10s` (`#forward10`).
  - **Center Section:** Frame-by-frame analysis controls (`[ ◀ ] Frames [ ▶ ]`, `#previous`, `#next`) flanking the precision timecode readout (`#time`).
  - **Right Section:** Remade clickable speed pill (`#speedval`) with quick-selection popup menu (`0.25×`, `0.5×`, `0.75×`, `1×`, `1.25×`, `1.5×`, `2×`) and fine-tune stepping, alongside Volume mute & slider (`#mute`, `#volume`), Pin Drop bookmark (`#pinButton`), Gamma shadow boost (`#gamma`), Video Reload (`#reload`), and Fullscreen (`#fullscreen`).

### Added
- **Dedicated "Keybinds" Settings Tab:**
  - Moved shortcut reference from intrusive player modal into a dedicated, searchable tab in the Extension Settings panel.
  - 4 categorized tactical cards: Playback & Speed, Timeline & Review Navigation, Investigation & View Tools, and Quick Verdicts.
  - Styled with tactical key badges, dark card grid, and full multi-language localization across all 9 supported languages (`en`, `de`, `ru`, `fr`, `es`, `ja`, `pt-BR`, `zh-Hant`, `cn`).

---

## [2.6.19] - 2026-10-19

### Added
- **Fullscreen Auto-Hide Clean HUD:**
  - Automatically fades out the custom video control bar and hides the mouse cursor after 2.5 seconds of inactivity when watching evidence in fullscreen.
  - Instantly wakes controls and restores cursor upon any mouse movement, touch/pointer event, or keyboard shortcut.
  - Prevents auto-hiding while video is paused so inspectors can examine still frames with controls and scrubbing readily accessible.
  - Smooth 0.35s ease fade transitions preventing abrupt visual popping.
  - Configurable toggle in Extension Settings under the Playback section with full multi-language localization across all 9 supported languages (`en`, `de`, `ru`, `fr`, `es`, `ja`, `pt-BR`, `zh-Hant`, `cn`).
  - Automated unit test suite verifying fullscreen hide timer, pointer/key wake triggers, paused state retention, settings disabling, and fullscreen exit restoration.

---

## [2.6.18] - 2026-10-19

### Added
- **Accidental Tab Close & Leave Guard (`beforeunload`):**
  - Prevents accidental loss of active inspection progress and draft notes by prompting browser-native confirmation before closing, refreshing, or leaving the tab while an active case inspection is underway.
  - Monitors workbench presence, active evidence video playback, draft case notes, and inspection countdown timers.
  - Distinguishes intentional exits via the official exit button (`.exit_btn2`) and finalized verdicts, allowing clean departure without nuisance prompts.
  - Configurable toggle in Extension Settings under the Verdicts section with full multi-language localization across all 9 supported languages.
  - Automated unit test suite verifying active review detection, draft notes, clean exits, and settings persistence.

---

## [2.6.17] - 2026-10-19

### Added
- **Custom HUD Accent Color Profiles:**
  - Introduced 4 tactical HUD accent color schemes: Amber (Classic / Default), Green (Operator HUD), Blue (Night Vision), and Crimson (Alert Red).
  - Dynamically recolors playback progress bars, buffer tracks, suspect moment pin markers, buttons, and settings UI controls.
  - Tactile swatch chips in the Extension Settings panel with instant live preview and persistence.
  - Full multi-language localization across all 9 supported languages.
  - Automated unit test coverage across theme profiles, styles, and settings persistence.

---

## [2.6.16] - 2026-10-18

### Added
- **Playback Position Retain on Modals:**
  - Preserves the exact video playback timestamp when opening or closing modals/dialogs (such as violation confirmation popups, training dialogs, drill results, and notices), preventing official scripts from rewinding playback to 0:00.
  - Intercepts intrusive script-driven seeking during modal transitions and seamlessly restores the playhead to the last stable playback position.
  - Distinguishes intentional user seeking (via scrubber, jump keys, or buttons) from scripted rewinds so users can freely seek anywhere including back to 0:00.
  - Added comprehensive automated unit test suite.

---

## [2.6.15] - 2026-10-18

### Added
- **Daily Server Reset Countdown Clock:**
  - Live timer on the Overview card (`#wxMine .abi-stat-today`) displaying a real-time countdown clock until the daily 20-case quota resets (based on the official 00:00 UTC server reset hour).
  - Clean tactical clock badge (`.abi-today-reset-clock`) with SVG clock icon, tabular digits, and informative hover tooltip.
  - Fully localized across all 9 supported extension languages.
  - Added comprehensive automated unit test suite.

---

## [2.6.14] - 2026-10-18

### Added
- **Silent Scrubbing:**
  - Automatically mutes audio output (`video.muted = true`) while the timeline scrubber is actively being dragged or sought, preventing distorted audio stutter and screeching bursts.
  - Seamlessly restores the previous audio mute state upon release (`pointerup` / `change`), including when the cursor is released outside the slider bounds or off-window.
  - Preserves volume display level and mute button state visually so controls do not jump during scrubbing.
  - Added comprehensive automated unit test suite.

---

## [2.6.13] - 2026-10-18

### Added
- **Shadow & Gamma Boost (`G` key):**
  - Cycle between `Normal` (1.0×), `Shadow Boost` (brightness 1.35, contrast 1.15), and `Max Brightness` (brightness 1.75, contrast 1.25) to reveal targets in shadows, dark corridors, and night raids.
  - Added dedicated `#gamma` icon toggle button to `<abi-local-controls>` toolbar with visual active styling.
  - Added HUD toast announcements showing active gamma preset.
  - Automatically persists gamma preset in `localStorage` (`abi-gamma-mode`).
  - Shifted Violation verdict hotkey to `V` (accepts `1` or `V`) to dedicate `G` key to Gamma cycling.
  - Added shortcut reference to the video controls modal (`#keysDialog`).

### Fixed
- **Video Player Click-to-Resume Stoppage:**
  - Resolved an issue where clicking on the video player to start playback resulted in playback pausing again after ~400ms.
  - Intercepted video surface clicks in the capture phase with immediate event propagation stoppage to prevent conflicts with the host site's TCPlayer debounced click handlers.
  - Synchronized `abiUserPlayed` / `abiUserPaused` tracking on native `play` events to prevent background media settings checkers from falsely re-pausing playback.

---

## [2.6.12] - 2026-10-18

### Added
- **Tactical Hold-to-Zoom Loupe (`Z` key / Right-click hold):**
  - Hold `Z` (or right-click hold on video) to magnify playback 2.5× centered directly on the mouse cursor position.
  - Dynamically updates transform origin as the cursor moves across the video frame for fluid inspection of distant suspects.
  - Instant snap-back to 1× magnification upon releasing `Z` or right-click.
  - Tactical HUD badge overlay (`.abi-zoom-badge`) displaying `"2.5× LOUPE"`.
  - Added shortcut reference to the video controls modal (`#keysDialog`).
  - Added comprehensive automated unit test suite.

---

## [2.6.11] - 2026-10-18

### Added
- **Millisecond / Fractional Time Display:**
  - Toggleable precision time format on the player timeline displaying milliseconds (`MM:SS.ms`, e.g., `00:14.35 / 01:02.00`).
  - Interactive click on the `#time` display toggles between standard seconds format and millisecond precision mode with HUD toast notification.
  - Timeline scrubber hover-preview badge dynamically shows millisecond precision when active.
  - Automatically persists user time precision preference in `localStorage`.
  - Documented in the video controls shortcuts modal (`#keysDialog`).

### Changed
- **Relocated Case Expiry Countdown Card:**
  - Moved the Case Expiry timer from floating in the player area to a dedicated tactical card positioned directly below the official Inspection Notes box (`.tips-content` in `.info-team`).
  - Re-authored the card description with clear, direct phrasing explaining that verdicts cannot be submitted once the timer expires because the case gets cancelled.
  - Seamlessly maintains real-time countdown, under-60s warm amber/red pulsing, and expired states.

---

## [2.6.10] - 2026-10-18

### Added
- **Background Tab Auto-Pause & Resume:**
  - Automatically pauses video playback when switching tabs or minimizing the browser window (`document.visibilitychange` / `window.blur` / `pagehide`).
  - Automatically and seamlessly resumes playback when returning to the tab.
  - Intelligently preserves manual user pauses — if a user deliberately paused playback before switching tabs, returning to the tab preserves the paused state without unsolicited playback.
  - Fully toggleable via `data-abi-background-pause="off"` setting attribute.

---

## [2.6.9] - 2026-10-18

### Added
- **Double-Click or `F` for Fullscreen Video:**
  - Double-clicking anywhere on the video area toggles seamless native fullscreen on and off without affecting buttons or controls.
  - Pressing `F` key toggles native fullscreen instantly; `Escape` or second press exits.
  - Documented shortcut in the Video Control Keys dialog (`#keysDialog`).

### Fixed
- **Volume Slider Thumb Dot Alignment & Size (`#volume`):**
  - Restored custom slider thumb rule for `#volume` with centered vertical alignment on the 3px track (`margin-top: -2.5px`).
  - Reduced thumb diameter to 8px with a crisp white border and subtle green tactical glow for a cleaner appearance.

---

## [2.6.8] - 2026-10-18

### Added
- **Case Expiry Countdown Timer & Under-60s Amber Pulse (`#caseExpiryBadge`):**
  - Added a tactical floating countdown timer badge on active inspection cases (`#xcWorking`) displaying remaining review time before expiration.
  - Informative tooltip: `"Case review expires in X:XX — submitting after expiration makes the verdict invalid"`.
  - When under 60 seconds remain, both the timer badge and the entire `<abi-local-player>` border subtly pulse in warm amber/red (`.abi-case-expiring`).
  - Automatically resets timer on new case load (`loadstart`) and clean removal on player teardown.
  - Non-intrusive: automatically excluded on offline drill/practice cases.

### Fixed
- **Floating Status Toast Overlay (`#status`):**
  - Converted player status notifications (e.g. `"Bookmark dropped at 00:12 (M)"`, stream reload notices) from an in-flow layout element to a floating HUD toast overlay positioned above the control bar.
  - Completely eliminates player bar shifting, jumping, or layout shifts when dropping bookmarks or receiving notifications.

---

## [2.6.7] - 2026-10-18

### Added
- **Timeline Scrubber Hover-Time Badge (`#hoverBadge`):**
  - Added a floating tactical timestamp badge above the timeline scrubber track (`.timeline-bar`).
  - Precisely follows pointer movement (`pointermove`, `pointerenter`, `pointerdown`) along the scrubber width with smooth fade transitions.
  - Displays dynamic preview time (`MM:SS`) for the exact frame under the cursor prior to seeking.
  - Automatically hides (`pointerleave`) when moving off the timeline scrubber.

---

## [2.6.6] - 2026-10-18

### Added
- **Reload Player Button on Player Control Bar (`#reload`):**
  - Added dedicated reload icon button on the `<abi-local-player>` control bar within the View controls group.
  - Tooltip: `"Reload player"`, with animated SVG spin animation upon click.
  - Re-attaches and reloads the HTML5 video source in-place to unfreeze stalled CDN streams or unbuffer playback without requiring a full page refresh.
  - Intelligently preserves playback position (`currentTime`), playback speed (`playbackRate`), and unpaused playing state across reloads.
  - Documented in the Video Control Keys dialog (`#keysDialog`) under the View section.

---

## [2.6.5] - 2026-10-18

### Added
- **Suspect Moment Bookmarks & Timeline Pin Drop (`M` / `B` key):**
  - Press `M` (or `B` / click `#pinButton` on the timeline control bar) to drop a visual pin on the video timeline at the current playhead position.
  - Pins render directly on the timeline scrubber track (`.timeline-bar`) as high-contrast amber markers (`.timeline-pin`) positioned precisely by percentage (`(time / duration) * 100%`).
  - Pin interaction:
    - Hover preview displays formatted timestamp: `Bookmark at MM:SS (Click to seek, right-click to remove)`.
    - Clicking any pin seeks playback directly to that exact moment and displays a status toast.
    - Right-clicking (contextmenu) on a pin removes it from the timeline.
    - Pressing `M` or `B` again while near an existing bookmark (< 0.5s) toggles and removes it.
  - Controls & Keyboard layout:
    - Added dedicated bookmark icon button (`#pinButton`) with SVG icon on the timeline bar next to the duration display.
    - Added `Drop bookmark / pin` shortcuts documentation (`M` or `B`) to the Video Control Keys modal (`#keysDialog`).
    - Audio mute remains accessible via the toolbar button (`#mute`) and `Shift+M` keyboard shortcut.
    - Automatically cleans up bookmark pins when a new video or inspection case loads.

---

## [2.6.4] - 2026-10-18

### Added
- **Tactical Case Log Modal (`.abi-case-log-dialog`):**
  - Transformed the "Inspected Today" card (`#wxMine .abi-stat-today .abi-today-wrap`) into an interactive tactical button with keyboard access (`role="button"`, `tabindex="0"`, `Enter`/`Space` handlers) and a `.abi-today-log-hint` badge.
  - Clicking the card opens a dark tactical modal dialog displaying a complete log of cases inspected locally.
  - Top summary bar displays 5 live metrics: Total Reviewed, Violations count & percentage, No Violation count & percentage, Uncertain count & percentage, and Average Review Duration in seconds.
  - Interactive toolbar with live multi-criteria search (matching case ID, verdict, notes, or reason tags), filter tabs (`All`, `Violation`, `No Violation`, `Uncertain`), Export to CSV button (`abi-case-log-YYYYMMDD.csv`), and Clear Log with confirmation.
  - Cards render with case ID badge, color-coded verdict pills, timestamp, review duration, violation reason chips, and inspection notes.
  - Fully integrated verdict logger capturing submissions across `#patrolButton1` (No Violation), `#patrolButton2` (Uncertain), and `#illegalPopup` submit button (`#patrolSubmit` / `.btn3`).
  - Full localization support across all 9 supported languages (English, German, Russian, French, Spanish, Japanese, Brazilian Portuguese, Traditional Chinese, and Simplified Chinese).

---

## [2.6.3] - 2026-10-18

### Added
- **Quick-Tag Reason Chips in Violation Modal:**
  - Added localized one-click reason chips directly above the 50-character violation description field in `#illegalPopup`.
  - Available tags: **Lag Switching**, **Rage cheating**, and **Macro** (specific violation details not covered by the standard checkboxes).
  - Clicking any chip fills an empty text box or neatly appends with comma formatting, while re-clicking an active chip removes it.
  - Fully localized across 9 languages (**English**, **German**, **Russian**, **French**, **Spanish**, **Japanese**, **Portuguese - Brazil**, **Traditional Chinese**, and **Simplified Chinese**).
  - Enforces the 50-character limit with active state synchronization and character counter shake feedback when limit is reached.

### Fixed
- **Overview Inspections Bar Hover & Bidirectional Sync:**
  - Fixed inspection stacked bar hover behavior so hovering a specific segment (yellow/green correct, red wrong, gray unresolved) highlights only that segment with scale, brightness, and color glow, dims non-hovered segments in the bar, and highlights the corresponding legend label below.
  - Fixed bidirectional hover sync from legend items to bar segments, ensuring hovering a legend label scales and glows the matching bar segment while dimming others.
  - Eliminated high-frequency DOM mutation cascade in `updateOverview` by updating legend items, period totals, and segment elements in-place instead of repeatedly recreating DOM nodes on animation frames.

---

## [2.6.2] - 2026-10-18

### Fixed
- **Fixed Doubled Dialog Close Buttons & Stray Cancel Button Styles:**
  - Resolved duplicate close icons caused by CSS `::after` content rendering alongside the injected SVG in `.close-btn`.
  - Fixed CSS selector matching `_close-btn` on footer action buttons (e.g. Cancel button in `illegalPopup` and drill result modals), preventing Cancel buttons from receiving absolute top-right positioning and stray `×` symbols.

---

## [2.6.1] - 2026-10-18

### Added
- Added German localization showcase screenshot (`screenshots/tab_1_overview_de.png`) to documentation highlighting localized Overview cards and status boards.

### Fixed
- **Resilient Extension Context Invalidation Handling:**
  - Safely wrapped all `chrome.runtime` and `chrome.storage` API calls across `site-ui.js`, `content.js`, `settings.js`, and `popup.js` with `try...catch` guards to prevent `Uncaught Error: Extension context invalidated` errors when the extension is updated or reloaded while tabs remain open.
  - Implemented `safeStorageGet`, `safeStorageSet`, and `getExtensionVersion` fallback utilities to gracefully resolve preferences and metadata without throwing if the extension context disconnects.

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
