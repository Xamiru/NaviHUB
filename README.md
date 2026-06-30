# NaviHUB

A personal, local-only desktop hub for tracking your hobbies — anime first, with
visual novels, games, movies, and TV series designed to slot in later. Think
MyAnimeList + Letterboxd + VNDB, combined into one app, just for you, on your PC.

The defining feature is **cross-linking**: studios, voice actors, and characters
become their own browsable pages. Open a voice actor and you'll see every anime
they were in, with the characters they played.

## Stack

- **Electron** + **electron-vite** (main / preload / renderer split, Vite HMR)
- **React + TypeScript + Tailwind CSS** (renderer)
- **SQLite** via **better-sqlite3**, schema also modeled in **Drizzle ORM**
- All data is local: `~/.config/navihub/navihub.db`, images under
  `~/.config/navihub/media/`. The whole library is two folders you can back up.

## Run it

```bash
npm install      # also rebuilds better-sqlite3 for Electron (postinstall)
npm run dev      # launches the app
```

Other scripts:

```bash
npm run build      # production build into ./out
npm run typecheck  # tsc for both main and renderer
npm run rebuild    # re-run electron-rebuild if you hit a native-module error
```

### Note when running from inside the VS Code integrated terminal

VS Code (itself an Electron app) exports `ELECTRON_RUN_AS_NODE=1`, which forces
any Electron launch into plain-Node mode — the window never appears and you'll
see `Cannot read properties of undefined (reading 'protocol')`. Launch from a
normal terminal, or unset it:

```bash
env -u ELECTRON_RUN_AS_NODE npm run dev
```

On some sandboxed Linux setups you may also need `--no-sandbox`:

```bash
env -u ELECTRON_RUN_AS_NODE ./node_modules/.bin/electron-vite dev -- --no-sandbox
```

## Project layout

```
src/
  main/        Electron main: DB connection, repos, IPC handlers, image files
    db/        schema.ts (Drizzle) + init.sql (runtime DDL) + connection.ts
    repos/     mediaRepo, peopleRepo, companyRepo, characterRepo, linkRepo, tagRepo, settingsRepo
  preload/     contextBridge — exposes window.api (typed by src/shared/api.ts)
  renderer/    React app (pages/, components/, lib/)
  shared/      types.ts + api.ts — the contract shared by main and renderer
```

## Data model

One relational schema, created in full from day one (only part is used by the
anime MVP). The key table is `credit`, which links a `person` to a `media_item`
optionally via a `character` — that single table powers the voice-actor → anime
graph and generalizes to actors in movies, staff, etc. See `src/main/db/init.sql`.

## Desktop shortcut

A launcher is installed two ways:

- **App menu / Activities:** search "NaviHUB" (entry at
  `~/.local/share/applications/NaviHUB.desktop`). Recommended on GNOME.
- **Desktop icon:** `~/Desktop/NaviHUB.desktop`. On modern GNOME, right-click it
  once and choose **Allow Launching** (GNOME removed the old `gio` trusted flag).

Both run `launch.sh`, which starts the **built** app (no dev server). It builds
once automatically if `out/` is missing. After changing source, run `npm run build`
to refresh what the shortcut launches (`npm run dev` is still best for development).

## Roadmap

- **Phase 1 (done):** anime logging — add/edit/list/detail, cover images, tags,
  customizable statuses + score scale.
- **Phase 2 (done):** studios, voice actors, characters with their own pages;
  assign cast (VA + character + language) and staff on an anime; two-way
  navigation (anime ↔ VA ↔ character ↔ studio); inline create-on-the-fly.
- **Phase 3 (done):** global search across entities; anime tag + favorites filters.
- **Phase 4 (done):** AniList import — search a title and one-click import its
  cover, main studio, and first 125 characters (in AniList favourites order) with
  their Japanese voice actors and staff. Re-import is authoritative: it refreshes
  metadata, keeps your status/score/progress, and prunes characters no longer in
  the set. Deduped via `external_source` / `external_id`.
- **Phase 5 (in progress):** other media types. **Movies are live** — same flow
  as anime (logging, cast, crew, production companies, cross-links), with import
  from **TMDB** (search a film → poster, top-billed cast with the characters they
  play, directors/writers, production companies). Paste a free TMDB API key into
  Settings once. Movie browse pages are **Actors** and **Directors**, ranked by
  number of roles, exactly like Voice Actors / Studios. VN / games / TV next.

> Note: changing import/ordering logic only affects existing titles after you
> **re-import** them (character order and importance are stored at import time).
