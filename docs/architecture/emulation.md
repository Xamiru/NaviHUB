# Emulators, game files and GameBanana mods

**Covers** — emulators as launch targets (Games → Emulators), game files linked to library games
and the Ways to play card, the game-folder scan, native-port suggestions, console shelves,
session screenshots, emulation playtime stats, and GameBanana mods (browse, install, the ledger,
disable/enable/uninstall). Added 2026-10-16.

## Launching through an emulator

Before this, Play spawned `media_item.exe_path` with no arguments, so linking an emulator only
opened the emulator. Now a game can also have **game files** (`game_rom`): a disc image or ROM,
its console (`platform`, a frozen key from `src/shared/emulation/platforms.ts`), an optional
emulator of its own (else the console's default in `emulator_default`), and the **game code** mods
are filed under. `src/main/emulation.ts` turns a Play choice into the exact program, argv and cwd
(`launchSpec`); `gameLaunch.startSession(mediaId, choice)` spawns that with the same detached,
never-killed session, playtime fold, playthrough capture and achievement watcher as before.

- **Which way Play takes** (`emulationCore.chooseLaunch`, mirrored by `defaultChoice` in
  `components/WaysToPlay.tsx`): an explicit choice, else the preferred game file, else the linked
  executable, else a lone game file. Several unpreferred files and no executable is an error that
  asks the user to choose. The first linked file becomes preferred unless a real PC executable
  (not a known emulator) is already linked — a native port keeps Play.
- **Presets** (`src/shared/emulation/emulatorPresets.ts`, frozen keys) carry each emulator's
  argument list, read from its own argument parser on 2026-10-16. `verified: false` marks lists
  from community reports (Ryubing, PPSSPP, Xenia Canary, xemu, Flycast); the Emulators page says
  so and the user can edit the list. A user list is stored as a JSON array with a `{rom}` element —
  never a string that gets split, never a shell.
- **Argument safety**: the game file and RetroArch core pass `assertLaunchableExe` (absolute, not
  `-`-leading, no NUL), so neither can be read as an option. `--` appears only where the emulator
  treats it as end-of-options (PCSX2, DuckStation). **RPCS3 and shadPS4 pass everything after `--`
  to the emulated game, so their game path never follows one** (`tests/emulationCore.test.ts`).
- **An emulator linked as the executable** (the old way) is recognised by its file name
  (`detectPreset`). Linking a game file then registers it automatically, the card names it instead
  of calling it native, and offers to unlink the emulator executable.
- `game_session.via` (`native` | `emu:<preset>`, frozen) and `game_session.platform` record how a
  session was launched; they feed the Emulators page's playtime-by-console and by-emulator tables.
  Rows before 2026-10-16 have NULL. The Steam-emulator achievement check before Play
  (`confirmAchievementLaunch`) runs only for the native executable.
- Launching stays Windows-only. The laptop cannot run a launch; the PC is where it is verified.

### User folders and screenshots

Each preset knows where its emulator keeps its user folder: a portable marker beside the exe
(`portable.txt`, a `portable` or `user` folder), else the first existing default under AppData,
LocalAppData or Documents (`emulationCore.resolveDataDir`). Dolphin's registry overrides are not
read; the user can set any folder by hand. The screenshot folder is known only where the
emulator's source fixes it (Dolphin `ScreenShots`, DuckStation `screenshots`, PCSX2 `snaps`,
Eden `screenshots`); elsewhere the user picks it.

After an emulated session ends (never while quitting), `gameLaunch` waits out an 8 s grace (in
which emulators flush their last screenshot), then reads the screenshot folder and one level of
subfolders for images written during the session plus that grace (`emulation.findSessionShots`,
`emulationCore.sessionShots`; image names first, then `stat` in parallel batches, at most 20,000
per folder, and a 15 s limit so a hung network folder cannot keep the poll alive). The poll keeps running
while `shotsPending`; the Playtime tab then offers "Add to Art", which imports through
`pictures.addFromPaths(mediaId, 'fanart', …)` in batches of eight. The paths stay in main
(`lastShots`); the renderer only sends the session id. Nothing is imported without the click.
A Steam-emulator achievement set is not watched during an emulated session (its unlock file sits
beside the native executable); a RetroAchievements set still is.

**Paths never come from the renderer.** Emulator programs, cores, user and screenshot folders and
game files are chosen in main pickers; `emulators:update` (`updateEmulatorFromRenderer`) accepts
names, consoles, argument lists and resets to the detected folders only, because a core is a DLL
RetroArch loads and the user folder decides where mods are written. Relinking a file keeps the
console and code the user chose.

### Game identity

`src/main/romIdentity.ts` reads ids without keys: the GameCube/Wii id from the disc header (plain,
RVZ/WIA, WBFS and CISO containers), the PS1/PS2 serial from `SYSTEM.CNF` in ISO9660 (cooked ISOs
and raw 2352-byte BINs, reached through a CUE sheet), and a Switch title id from an NSP's ticket
name or a `[0100…]` tag in the file name. XCI, 3DS, Wii U, CHD and CSO need the user to type the
code once (`games:updateRom`). The PS2 serial is PCSX2's own folder form (`SLUS-20312`).

### Game-folder scan

Emulators → Find game files walks folders the user picks (depth 6, 50,000 files), drops a CUE
sheet's BIN tracks and noisy extensions, reads ids for up to 5,000 files, and matches file names to
library games by `romScanCore.matchKey` (the catalog `titleKey` with "the" removed anywhere, so
No-Intro's "Legend of Zelda, The - …" matches). A game with platform tags must share a console.
Only a unique match is preselected, and only once per game (disc 2 is listed, not chosen).
Nothing links until the user accepts; the results live in memory and accepting sends result ids,
never paths. Task kind `romScan`.

## Native ports and console shelves

`src/shared/emulation/nativePorts.ts` is a curated overlay (frozen ids) of fan-made PC ports from
decompilations and recompilations — Ship of Harkinian, 2 Ship 2 Harkinian, Zelda64Recomp, zelda3,
Dusklight, OpenGOAL, Ghostship, SpaghettiKart, the Perfect Dark port, Starship, Banjo: Recompiled.
Library titles are matched by `portTitleKey`; the Ways to play card suggests the port until its
own program is the linked executable, and the Emulators page lists ports for games in the library.
Update the list by hand when the readonlymemo list moves.

The Installed page's "Group by console" toggle (a localStorage pref, `installed.groupByConsole`)
shelves the collection by the console of each game's preferred file, PC games last.

## GameBanana mods

`src/main/gamebanana.ts` talks to GameBanana's keyless apiv11 (`Util/Game/NameMatch`,
`Mod/Index`, `Mod/<id>/ProfilePage`) through `fetchWithRetry` with `maxResponseBytes`, a
User-Agent and one process-wide `gamebananaThrottle` (1 request/s; there is no documented limit).
A title's GameBanana game is a `media_external_link` row with source `gamebanana` (always
`manual`). It is deliberately absent from the unlinked-source list in `gameLinks.ts`.

**Adult content is never shown or installed** — the Art Browse invariant, hard-coded in
`gamebananaCore.ts` and not parameterised. A list row survives only with `_sInitialVisibility ===
'show'` and `_bHasContentRatings === false` (a missing flag fails); a profile also needs no
`_aContentRatings` and no private/trashed/withheld flag; `mods.start` re-reads the profile, so a
mod that became rated cannot be installed from a stale list. `tests/gamebanana.test.ts` covers
`warn`, `hide`, rated and flagless rows built from real responses.

Mod text is HTML; `htmlToParagraphs` reduces it to plain paragraphs (scripts and styles dropped
with their content) — no markup reaches the renderer. Images come only from
`images.gamebanana.com`. Every request is a user action: Search, Load mods, opening a mod,
Install, Check for updates.

### Installing

`src/main/mods.ts`, one job at a time (task kind `modInstall`), polled through `mods:status`:

1. **Refuse early**: the mod must still pass the adult filter, the file must still belong to it,
   GameBanana's antivirus result must be `clean`, and the file must be under 8 GB.
2. **Download** `https://gamebanana.com/dl/<fileId>` (built from the id, never taken from a
   response). It redirects through `files.gamebanana.com` to a `filecache*.gamebanana.com` host;
   the final URL must still be a GameBanana host. `streamResponseToFile` caps the size and checks
   GameBanana's MD5 when it gives one.
3. **Extract** into `userData/modcache/staging/<job>` (`safeExtract.ts`). Zips go through yauzl
   with every name checked (absolute, drive letter, `..`, Windows-reserved characters, symlink
   entries) and sizes capped (50,000 entries, 16 GB). 7z and RAR need the user's 7-Zip
   (`sevenzip.path`, else Program Files): `7z l -slt` lists first and the whole archive is refused
   before anything is written if any name or link fails, then `7z x -o<dir> --` extracts. The
   finished tree is walked once more with `lstat`; a link or special file aborts.
4. **Plan** (`modLayoutCore.planInstall`) per preset — Eden `load/<TitleID>/<Mod>`, Ryubing
   `mods/contents/<TitleID>/<Mod>`, Cemu `graphicPacks/<Mod>` (a folder with `rules.txt`), Dolphin
   `Load/GraphicMods/<Mod>` (a folder with a metadata file) or `Load/Textures/<GameID>/<Mod>`,
   PCSX2 `.pnach` files into `patches/` or textures into `textures/<SERIAL>/replacements/<Mod>`,
   PPSSPP `PSP/TEXTURES/<ID>` (exact name, a folder with `textures.ini`). An archive holding
   several mod roots (60 fps / 30 fps) offers each as a variant. Anything else is refused with the
   reason; DuckStation and the other emulators are not supported yet.
5. **Wait** in `awaiting` until the user sees the destination and confirms. Nothing outside
   userData exists before this point (`tests/modInstall.test.ts`).
6. **Copy** into a new `<name>.navihub-partial` folder (or `<file>.navihub-partial` per patch
   file) with `COPYFILE_EXCL`, rename into place, then record the ledger. A folder name already in
   use gets " (2)"; NaviHUB never merges into or overwrites anything it did not create.

### The ledger

`mod_install` / `mod_install_file` record every file with its size and mtime at its final
place. **They are the only licence to touch files in an emulator folder.** Uninstall deletes a
listed file only while its size and mtime (±2 s) still match, then removes folders the install
left empty; edited files and anything the user added stay and are reported. Disable moves the
listed files to `userData/modcache/disabled/<id>` and Enable moves them back (rename, or across
drives copy with timestamps, check the size, remove the original), refusing before moving
anything if the way back is blocked. No emulator config file is edited. Check for updates
compares GameBanana's modified time with the one recorded at install.

`cancelModJobs()` runs in before-quit after `cancelHistoryJobs()`: it aborts the download, kills
7-Zip and removes the partial files and staging synchronously; the copy loop checks the flag before
every file and before the ledger write, so nothing is recorded after quit. A file copy already in
flight can still leave a `.navihub-partial` folder, which no install ever reuses. Stale staging
folders are cleared when the next install starts. `cancelRomScan()` follows it. A job left
waiting for confirmation is cancelled by a new install, or after 30 minutes.

Disable moves only listed, unchanged files and rolls back if a move fails partway; a file left
behind because it changed stays listed, and uninstall looks for each listed file in both places.
A folder name owned by a disabled install is never given to a new one. Installs whose game was
deleted from the library (`media_id` NULL) are listed on the Emulators page so they can still be
removed. Downloads time out per attempt after ten minutes or the time at 100 KB/s, whichever is
longer, because the timeout also covers streaming the body. `emulator`, `emulator_default`, `game_rom` and the ledger are machine
paths, wiped from exports; `sevenzip.path` is machine-local in backups.

## Unverified on the laptop

Launching, mod installs into real emulator folders, the screenshot sweep and the 7-Zip path all
need the Windows PC. What to check there: add PCSX2, DuckStation and Dolphin; link a PS2 ISO and
boot it; install a Dolphin texture pack and an Eden mod; disable and uninstall them; take an
in-game screenshot and add it to Art.
