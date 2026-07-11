---
name: verify
description: Launch and drive the built NaviHUB Electron app for end-to-end verification (screenshots, navigation) against the real library DB.
---

# Verifying NaviHUB in the running app

Build first (`npm run build` — the app runs from `out/`), then drive the GUI
with playwright-core's Electron driver. No project code changes needed.

```bash
npm install --no-save --no-audit playwright-core   # node_modules only; uninstall --no-save after
```

Driver script essentials (run with plain `node script.mjs`):

```js
import { createRequire } from 'node:module'
const projectRequire = createRequire('/home/xamir/Desktop/NaviHUB/package.json')
const { _electron } = projectRequire('playwright-core')
const electronPath = projectRequire('electron')

const env = { ...process.env }
delete env.ELECTRON_RUN_AS_NODE   // VS Code sets it → Electron runs as plain Node, no window

const app = await _electron.launch({
  executablePath: electronPath,
  args: ['/home/xamir/Desktop/NaviHUB'],  // the APP DIR — see gotcha below
  cwd: '/home/xamir/Desktop/NaviHUB',
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
- **Delete `ELECTRON_RUN_AS_NODE` from env** (the CLAUDE.md terminal gotcha
  applies to programmatic launches too).
- Navigate with `page.evaluate(() => { window.location.hash = '#/route' })`
  (HashRouter); the scroll container is `<main>` (check `main.scrollTop`).
- `page.screenshot()` works even though the window appears on the user's real
  display (no xvfb installed); keep sessions short. Read-only flows only —
  this is the live personal DB (concurrent open alongside the user's running
  instance is fine, SQLite WAL).
- Capture `page.on('pageerror')` + console errors — a clean run prints none.
