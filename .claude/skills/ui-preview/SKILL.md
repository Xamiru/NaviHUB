---
name: ui-preview
description: Show the user a NaviHUB screen or component BEFORE building it — a single self-contained local HTML file (previews/, gitignored, never uploaded) that uses the app's real Tailwind classes, Lain theme, fonts and shell, compiled with the project's own config so the markup ports straight into JSX once approved. Works on the headless VPS. Use when the user asks for a UI preview, a mockup, design options/variants, "show me first", or when a renderer change is big enough that a wrong guess would waste a build cycle.
---

# UI preview (design it, show it locally, then build it)

**What this is:** an HTML mockup of a NaviHUB screen, written with the *same* Tailwind classes the
React component will use, compiled by `build.mjs` through the project's `tailwind.config.js` +
`styles.css` into ONE standalone file under `previews/`. The user opens that file in a browser,
reacts, you edit and rebuild (same path), and only then does the design go into `src/renderer/`.

**Nothing leaves the machine.** Standing directive (CLAUDE.md, 2026-08-15): nothing from this
repo goes to the Claude account. Do **not** use the Artifact tool, Claude Design / DesignSync, or
any upload to show a preview — the deliverable is a file path, and `previews/` is gitignored so it
never reaches the remote either.

**What this is not:** verification. It proves the *design*, not the code. On the laptop, a change
that already exists in code is checked with the `verify` skill (real app, real data). On the VPS a
preview is the closest thing to a visual check that exists — still say "unverified in the UI" in
the completion message when the real code lands.

Why it works this way: the app has ONE theme (Lain, `styles.css :root`) and a fixed vocabulary of
primitives (`docs/architecture/ui-conventions.md`), so a hand-drawn mockup in a different palette
or font would only mislead. Compiling the mockup with the real config means what the user sees is
what the JSX will render, and the port is copy-paste, not translation.

## 0. Scope — one message, not twenty

If the request already names the screen, go. Otherwise ask ONCE, together: which screen or
component; how many directions (default one; "options"/"variants" → two or three); density
(dense list vs. roomy cards); anything that must stay (an existing header, a button the user
likes). Never ask what CLAUDE.md or the code already answers.

## 1. Read the real thing first

- The page/component you are redesigning under `src/renderer/src/pages/` or `components/` — its
  current structure, which primitives it uses, what state it holds.
- `docs/architecture/ui-conventions.md` — the primitives you must compose from (`PageHeader`,
  `Tabs`, `Section`, `StatTile`/`StatInline`, `MediaCard`, `HubCard`, `DoorCard`, `PillGroup`,
  `EmptyState`, `ActionMenu`, `Pager`, `.pill/.pill-active`, `.chip-toggle`, `.card`,
  `.card-glow`, `.kbd`). A mockup built from these ports mechanically; one that invents new
  idioms creates a second design system.
- CLAUDE.md "Renderer conventions" — one `btn-primary` per screen, `gray-600` decorative-only,
  no Cancel button on forms, Delete lives in `ActionMenu`, `text-gray-400`+ for readable
  secondary copy, and **no emoji or decorative glyphs** (functional `✕ ✓ ○ ★ ♥ ← ▸ ›` only).

## 2. Write the mockup

```bash
mkdir -p previews/src
cp .claude/skills/ui-preview/shell.html previews/src/<screen-slug>.html
```

Sources live in `previews/src/`, builds in `previews/` — both gitignored, both survive the session,
so a later session can pick up the same file. `shell.html` is the app shell — Sidebar, Topbar,
`<main>` — in the exact markup of `Sidebar.tsx`/`Topbar.tsx`, plus a `<main>` full of the primitive
idioms above as live examples (header, tabs, pill row, stat tiles, MediaCard grid, empty state).
Replace the inside of `<main>` with the screen; keep the shell unless the screen is chromeless
(readers, widget). Mark the sidebar entry the screen lives under as active
(`bg-accent/10 text-accent shadow-[…]`).

Rules for the markup:

- **Same classes you would write in JSX.** `bg-base-800`, `text-gray-400`, `.card`, `.pill`,
  `grid-cols-[repeat(auto-fill,minmax(150px,1fr))]` — nothing hand-written in a `<style>` block
  except a genuinely one-off value. If you need a class Tailwind doesn't have, you'd need it in
  the app too; that's a `styles.css` decision, so surface it rather than hiding it in the mock.
- **Real content, never lorem.** Titles, counts and names the user would recognise from their
  library world (this is an anime/manga/games/JP-learning hub). Sample data is fine — the VPS has
  no DB — but say so in the report.
- **Covers are placeholders:** `aspect-[2/3] rounded-lg bg-base-700`. The file must stay
  self-contained (no remote requests); if a real image matters, embed a data: URI.
- **Show state explicitly.** Hover is invisible in a preview. If a state matters (active pill,
  disabled button, error row, empty state, loading), render it as a labelled example.
- **Small vanilla JS is welcome** for tabs, toggles, a variant switcher — the user should be able
  to *feel* an interaction, not just read a description of it. No frameworks, no fetch.
- **Variants:** one frame per variant, each `h-[720px]` (not `h-screen`), with a plain label above
  it (`<p class="text-xs uppercase tracking-widest text-gray-500">Variant A · dense list</p>`),
  or a `.pill` switcher at the top that swaps frames. Name what each variant *changes*, not
  "A/B/C".
- **The CRT overlay renders** (scanlines + vignette, `body::before/::after`) — that's the app.
  Mocking a reader route? add `<script>document.documentElement.setAttribute('data-reader','')</script>`,
  which is exactly what App.tsx stamps.
- Keep the `<!-- @title Some Name -->` comment at the top: it becomes the browser-tab title. A
  name, not a caption — `Franchise Header`, `Achievements Setup`, `Home Rail Options`.

## 3. Build

```bash
node .claude/skills/ui-preview/build.mjs previews/src/<slug>.html     # → previews/<slug>.html
```

Output: `built … (NNN KB, N class tokens, N without CSS)`. **Read the "without CSS" list** — each
entry is a class that produced no rule: a typo (`bg-base-750`), or a utility this config doesn't
know. Fix them; a class that silently does nothing here will silently do nothing in the app.
Fonts (IBM Plex Mono, VT323) and the sidebar avatar are inlined automatically (~350 KB baseline);
the result is one file with no external references.

## 4. Hand over the file — do not publish it

The deliverable is the path `previews/<slug>.html`. How the user opens it:

- **Laptop:** open the file in any browser (double-click, or `xdg-open previews/<slug>.html`).
- **VPS (headless):** VS Code Explorer → right-click the file → *Download*, then open locally; or
  `scp`. Do not start a web server for it and do not upload it anywhere.

Iterations edit `previews/src/<slug>.html` and rebuild to the same output path, so the user
re-opens or refreshes the same file. `previews/` is disposable — old mockups can be deleted once a
design has shipped.

## 5. Report

The message the user reads is: the file path, one line per variant naming what it changes, what
is sample vs. real, and the ONE question you need answered ("A or B?", "denser?"). Then stop and
wait. Don't touch `src/renderer/` until they pick.

## 6. Build it for real

On approval: port to `src/renderer/` — classes copy across, static markup becomes the shared
primitives it was imitating, filter/tab state goes through `usePersistedState`, data through
`qk.*` queries, mutations as plain `await api.…`. Then `npm run typecheck` + `npm run test`, and
either `verify` (laptop) or an explicit "unverified in the UI, click X to check" in the completion
message — the preview does not discharge that.

**Do not add mockups to the repo's tracked files**; this skill folder holds only `shell.html` and
`build.mjs`, and `previews/` stays gitignored. If `Sidebar.tsx`/`Topbar.tsx` or a primitive changes
shape, update `shell.html` to match — it is a copy, and a stale shell mis-sells every later preview.
