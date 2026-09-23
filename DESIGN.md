---
name: NaviHUB
description: A local media archive and learning workspace with four selectable themes.
colors:
  lain-canvas: "rgb(15 13 21)"
  lain-ink-inverse: "rgb(43 18 32)"
  lain-panel: "rgb(24 21 31)"
  lain-raised: "rgb(43 36 49)"
  lain-accent: "rgb(229 171 182)"
  lain-link: "rgb(164 188 215)"
  lain-anomaly: "rgb(247 142 153)"
  metal-canvas: "rgb(228 230 224)"
  metal-panel: "rgb(244 245 238)"
  metal-raised: "rgb(211 215 207)"
  metal-accent: "rgb(169 47 34)"
  metal-link: "rgb(49 92 75)"
  metal-anomaly: "rgb(159 37 48)"
  metal-ink: "rgb(26 36 32)"
  metal-paper: "rgb(255 249 233)"
  miku-canvas: "rgb(111 212 226)"
  miku-panel: "rgb(34 185 206)"
  miku-raised: "rgb(80 199 217)"
  miku-ink: "rgb(6 46 58)"
  miku-accent: "rgb(8 59 72)"
  miku-link: "rgb(96 26 58)"
  peaks-canvas: "rgb(23 14 12)"
  peaks-panel: "rgb(43 23 19)"
  peaks-curtain: "rgb(155 32 24)"
  peaks-accent: "rgb(234 214 179)"
  signal-affirmative-lain: "rgb(158 208 169)"
  signal-caution-lain: "rgb(229 200 142)"
  signal-affirmative-metal: "rgb(36 99 59)"
  signal-caution-metal: "rgb(115 76 14)"
typography:
  body:
    fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
  lain-chrome:
    fontFamily: "IBM Plex Mono, Noto Sans Mono CJK JP, monospace"
  lain-brand:
    fontFamily: "VT323, IBM Plex Mono, monospace"
    fontSize: "clamp(4.5rem, 7vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.95
  metal-chrome:
    fontFamily: "Barlow Condensed, Noto Sans CJK JP, sans-serif"
  miku-chrome:
    fontFamily: "Quicksand, Noto Sans CJK JP, sans-serif"
  peaks-chrome:
    fontFamily: "Bodoni Moda, Noto Serif CJK JP, Georgia, serif"
  lain-study-headings:
    fontFamily: "Chakra Petch, IBM Plex Mono, Noto Sans CJK JP, sans-serif"
  metal-study-headings:
    fontFamily: "Barlow Condensed, sans-serif"
rounded:
  sharp: "0px"
  lain-sm: "1px"
  lain-md: "2px"
  lain-lg: "3px"
  lain-xl: "3px"
  lain-2xl: "4px"
  metal: "1px"
  miku-panel: "10px"
  miku-hero: "16px"
  peaks: "0px"
spacing:
  section-gap: "24px"
components:
  button-primary:
    backgroundColor: "{colors.lain-accent}"
    textColor: "{colors.lain-ink-inverse}"
    rounded: "{rounded.lain-md}"
---

## Overview

NaviHUB is a local media archive and learning workspace. Its visual system has four selectable expressions over shared semantic surfaces and interaction patterns: Lain's **Wired, after dark**, Metal Gear's **Solid / Ink**, Hatsune Miku's **Beyond the blue**, and Twin Peaks' **The waiting room**. Lain is the default. Their stored keys are `lain`, `metal-gear`, `miku` and `twin-peaks`.

The shared interface is dense, keyboard-led desktop chrome with restrained geometry and clear reading surfaces. Lain layers a rose-signal terminal atmosphere over black violet; Solid / Ink uses paper, dark field ink, and red actions with locally bundled classic MGS2 artwork. Study routes quiet the atmosphere while keeping the current theme's contrast. Cover imagery remains the main texture: Home's pinned wall uses the library's own covers.

**The Semantic Surface Rule.** Use the shared surface, ink, line, and signal roles for application chrome so every palette can carry the same component. Treat reader and artwork overlays as explicit contrast islands.

## Colors

Lain's primary accent marks the active route, primary action, and live signal. Cool blue marks links; warm rose marks anomalies; green and ochre carry affirmative and caution states. Its canvas, panel, and raised layers preserve depth without bright borders.

Solid / Ink puts deep green ink on pale paper. Red is reserved for actions and current selection; forest green is the link signal. Keep status meanings distinct from the action accent. Light theme surfaces must use dark legible ink; dark readers and controls over art explicitly switch to their own high-contrast palette.

Miku carries the approved cyan-blue through the entire interface: #22B9CE panels and #6FD4E2 canvas replace white reading areas. Dark blue text/actions provide contrast, with deeper status and link hues. Twin Peaks puts warm curtain red in navigation, section bars and the player, framing warm black reading panels and ivory actions. The approved versions supersede the earlier pale-mint Miku and wine-purple Twin Peaks studies.

**The Signal Meaning Rule.** Preserve the distinction among live/action, link, anomaly, affirmative, and caution roles when extending any theme. Do not assign status meaning by hue alone.

## Typography

The body uses the system sans-serif stack, with Inter as the preferred face when available; Inter is not bundled with the theme. Lain uses IBM Plex Mono for terminal chrome and VT323 for the oversized Home wordmark; compact labels stay crisp and legible. Solid / Ink uses Barlow Condensed for navigation, headings, buttons, and labels, with uppercase treatment on major chrome. Lain study headings use Chakra Petch with the mono chrome fallback; Solid / Ink overrides them with Barlow Condensed. Solid / Ink expanded navigation links use the body stack at 13px, while group headings and controls use Barlow Condensed. Japanese fallbacks are included in the shipped display stacks.

Miku uses Quicksand for headings, controls and navigation, with the body stack for prose. Twin Peaks uses Bodoni Moda for headings, brand and primary controls; small inputs, filters, data labels and navigation links use the body stack for legibility. Both fonts are bundled locally.

## Layout

The app is a desktop workspace with a persistent navigation rail and scrollable content. The rail is 80px compact or 208px expanded, controlled by a saved preference. Keep navigation direct and compact. Miku marks the active destination with deep blue and cyan text; Twin Peaks uses ivory with red text. In Lain, active location uses a signal-tinted surface and leading edge; Solid / Ink uses a red fill with inverse text and no leading edge.

Home's cover wall remains pinned above configurable widgets. It uses up to 24 of the user's covers behind the brand, with a theme-specific scrim to protect text and a selected local signature image at the side. Below it, lead with an actual saved resume point or an in-progress title, then show other in-progress rows; configurable widgets follow. Preserve this hierarchy when adapting Home.

## Elevation & Depth

Lain builds depth through tonal violet surfaces, inset signal edges, and restrained phosphor glow. Signal clarity can reduce or deepen those effects; clean mode removes scanlines, glow, and chromatic split. Quiet study surfaces suppress those effects and keep visual attention on the lesson.

Solid / Ink is flatter: paper and field-ink surfaces, fine green-gray separators, and minimal shadow. Avoid carrying Lain's glow into the light theme. Use contrast and spacing to establish hierarchy before adding borders or shadow.

## Shapes

Geometry follows the selected theme. Lain uses hairline-to-four-pixel corners across the radius scale; Solid / Ink stays at zero to one pixel. Pills and avatars retain their purpose-specific full rounding. Miku deliberately uses rounded panels (10px), a 16px hero and pill-shaped controls, matching the approved option. Twin Peaks uses square edges and a narrow chevron threshold only at the Home hero.

## Components

### Buttons and controls

Primary actions use the theme accent with inverse text. In Lain, a restrained signal glow may accompany the action; Solid / Ink keeps primary actions flat. Ghost actions remain quiet until hover. All keyboard-focused controls receive the global visible accent ring; mouse focus does not add that ring. Increased-contrast preferences strengthen muted text and suppress atmospheric effects.

### Cards and sections

Cards use the panel/raised surface roles and sharp corners. Lain section headers are plum bars with fine rose rules. Solid / Ink uses filled dark-green bars with cream labels; its headings are larger, condensed, and uppercase. Keep data and study content readable above atmosphere.

### Navigation

The compact rail shows area entry points; the expanded rail exposes grouped direct links. Use the shared active-state roles and preserve the user's saved compact/expanded choice. The brand mark changes with the theme: existing Lain portrait, bundled FOXHOUND emblem, official Miku portrait crop or Laura Palmer portrait.

### Home hero

Keep the media cover wall, selected theme artwork, NaviHUB wordmark, and real resume destination together as one identity surface. The wall is decorative and dimmed; it must never compete with the heading or reduce its contrast.

## Do's and Don'ts

- **Do** use semantic surface, ink, line, and signal roles for shared chrome.
- **Do** preserve the Home cover wall and put a real resume or in-progress destination before configurable widgets.
- **Do** keep study routes quiet, readable, keyboard-operable, and respectful of reduced motion and increased contrast.
- **Do** use the existing local theme assets and font stacks; provenance is recorded in `src/renderer/src/assets/themes/README.md`.
- **Don't** treat the Home cover wall as a configurable widget or replace it with generic dashboard content.
- **Don't** use glow, scanlines, or chromatic split outside Lain or on quiet study surfaces.
- **Don't** weaken text contrast to preserve atmosphere, especially over artwork.
- **Don't** add emoji or decorative Unicode glyphs; use the existing icon and functional-glyph conventions.

The implementation has renderer captures using synthetic library data in `previews/theme-implementation/` and `previews/new-theme-implementation/`. They document representative compositions; they are not live-library screenshots or proof of Electron GUI behavior. The current implementation has not been verified in a live Electron UI.
