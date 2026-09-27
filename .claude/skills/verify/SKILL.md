---
name: verify
description: "LAPTOP ONLY. Launch and drive the built NaviHUB Electron app for end-to-end verification (screenshots, navigation) against the real library DB. Use this to confirm a renderer change actually works before reporting it done. Do NOT invoke on the VPS — it is headless and has no library."
---

# Verifying NaviHUB in the running app

**Machine check first.** This only works on the laptop/PC (checkout at `/media/xamir/Anglo/NaviHUB`).
If there is no display (`$DISPLAY`/`$WAYLAND_DISPLAY` unset) or no `~/.config/navihub/navihub.db`,
you are on the headless VPS: stop, and instead tell the user in the completion message that the
change is unverified in the UI and what to click.

**When to reach for this:** any change under `src/renderer/`. The jsdom renderer tests cover shared
interaction and accessibility contracts, not whether a real screen renders and works. Thirteen of forty-eight sessions opened
with a UI defect the user found after being told the work was done.

Build first (`npm run build` — the app runs from `out/`), then drive the GUI
with playwright-core's Electron driver. No project code changes needed.

```bash
npm install --no-save --no-audit playwright-core   # node_modules only; uninstall --no-save after
```

Driver script essentials (run with plain `node script.mjs` from the repo root, so `process.cwd()`
is the app dir):

```js
import { createRequire } from 'node:module'
const root = process.cwd()
const projectRequire = createRequire(`${root}/package.json`)
const { _electron } = projectRequire('playwright-core')
const electronPath = projectRequire('electron')

const env = { ...process.env }
delete env.ELECTRON_RUN_AS_NODE   // VS Code sets it → Electron runs as plain Node, no window

const app = await _electron.launch({
  executablePath: electronPath,
  args: [root, '--ozone-platform=x11'],  // the APP DIR — see gotchas below
  cwd: root,
  env
})
const page = await app.firstWindow()
```

## Gotchas (all hit once)

- **`args` must be the project dir, NOT `out/main/index.js`.** Launching the
  bare main.js runs Electron's default_app wrapper: app name becomes
  "Electron", userData resolves to an EMPTY `~/.config/Electron` and the whole
  app looks like a fresh install (and leaves a stray `navihub.db` there —
  delete it if this happens). The app dir form reads `package.json` name
  `navihub` → real library at `~/.config/navihub`.
- **Pass `'--ozone-platform=x11'` in `args`** after the app dir. Under Wayland, Electron 44
  segfaults at launch on the laptop, and `firstWindow()` then fails with "Target page, context or
  browser has been closed".
- **Delete `ELECTRON_RUN_AS_NODE` from env** (the CLAUDE.md terminal gotcha
  applies to programmatic launches too).
- Navigate with `page.evaluate(() => { window.location.hash = '#/route' })`
  (HashRouter); the scroll container is `<main>` (check `main.scrollTop`).
- `page.screenshot()` works even though the window appears on the user's real
  display (no xvfb installed); keep sessions short. Read-only flows only —
  this is the live personal DB (concurrent open alongside the user's running
  instance is fine, SQLite WAL).
- Capture `page.on('pageerror')` + console errors — a clean run prints none.
