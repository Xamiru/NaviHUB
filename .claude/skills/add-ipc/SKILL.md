---
name: add-ipc
description: Add a new backend capability to NaviHUB end to end — payload types, the NaviApi contract, the ipcMain handler, the preload mirror, and the renderer query. Use whenever the renderer needs data or an action it cannot currently reach.
---

# Adding a backend capability (the five-file chain)

Every backend capability crosses the same five files in the same order. Sessions repeatedly
re-derive this by reading `types.ts` (23 sessions), `api.ts` (20), `preload/index.ts` (17) and
`ipc.ts` (16) before the first edit. Follow the chain instead.

There are currently **375 channels** across **41 namespaces**. You are adding to a working system,
so copy the shape of the neighbours rather than inventing one.

## 1. Payload types — `src/shared/types.ts`

Input and output shapes. Nothing electron-specific; both sides import this.

## 2. Contract — `src/shared/api.ts`

Add the method to the right `NaviApi` namespace (or a new one if the domain is genuinely new).
This file is the source of truth: preload is typed `const api: NaviApi`, so typecheck holds
api.ts ↔ preload ↔ renderer together.

## 3. Handler — `src/main/ipc.ts`

A thin one-liner in the `// ---- domain ----` block:

```ts
ipcMain.handle('domain:action', (_e, arg: ArgType) => repo.fn(arg))
```

Keep logic in a repo or feature module — `ipc.ts` is 375 delegations in 761 lines and stays that way.

- Long-running work does **not** get a push channel. The only push channels are the player
  bridge's `player:cmd`/`player:state` (frozen by `tests/pushBridge.test.ts` — adding one means
  editing its ALLOWED list, and the bar is "polling genuinely can't work", not "polling is
  awkward"). Expose a module-level status
  object plus a `domain:xStatus` invoke channel and let the renderer poll. Copy `musicDownload.ts`.
- An importer wraps in `withActivity` so the Topbar pill moves.
- Anything that needs today's date takes it as a parameter — `todayLocal()` at the top of
  `registerIpc` computes it once, in main, as a **local** day.

## 4. Mirror — `src/preload/index.ts`

```ts
action: (arg) => ipcRenderer.invoke('domain:action', arg)
```

**The channel string is not typechecked.** `'domain:actoin'` compiles and fails at runtime.
`tests/ipcContractSync.test.ts` catches it — run the tests.

## 5. Renderer

Consume through `api` (`lib/api.ts` = `window.api`) inside TanStack Query, with a key from
`lib/queryKeys.ts`. Never build a key inline, and keep each group's `all` key a prefix of every
key in the group or invalidation silently misses. Mutations are plain `await api.…` in event
handlers, not `useMutation` — errors surface through the global toast net.

## Verify

```bash
npm run typecheck   # holds api.ts ↔ preload ↔ renderer
npm run test        # ipcContractSync holds ipc.ts ↔ preload
```

If both pass, the contract is aligned. Whether the *screen* works is a separate question — see the
definition of done in CLAUDE.md.
