---
name: local-release
description: Build and publish a NaviHUB release locally from this machine when GitHub Actions can't run (credit exhausted, runner outage). Stamps the derived version, runs the full verify stage, builds Linux + Windows artifacts, and publishes the GitHub release with both updater manifests.
---

# Local release (the GitHub-Actions fallback)

Replicates `.github/workflows/release.yml` on this machine. Proven path: v0.15.0,
v0.16.0, v0.17.0 all shipped this way. The in-app updater picks these releases up
identically to CI ones.

**Ask before starting if:** the working tree is dirty, HEAD ≠ origin/main, or any
test fails. A release must correspond exactly to a pushed commit. Never fix or
commit anything as part of a release run — the user commits and pushes themselves.

## 0. Preconditions

```bash
git fetch origin
git status --short          # must be empty
git rev-parse HEAD origin/main   # must match
git rev-list --count HEAD   # → N, used for the version
```

Also needs: `gh` authenticated (it is, on this VPS), docker running (for the wine
image), disk space in `dist/` (~700 MB per release; old versions can be deleted).

## 1. Version — derived, NEVER committed

`minor = BASE_MINOR + (commit count − BASE_COMMITS)` with the workflow's pinned
baselines **BASE_MINOR=2, BASE_COMMITS=7** ("7 commits = 0.2.0"). So 22 commits →
0.17.0. Patch is always 0; 0.x grows forever (0.9.0 → 0.10.0 is correct).

```bash
npm version X.Y.0 --no-git-tag-version --allow-same-version
```

The committed package.json version is stale BY DESIGN — the stamp is restored in
step 6. If `vX.Y.0` already exists on GitHub, something is off (double release or
baseline drift): stop and ask, don't overwrite.

## 2. Verify stage (mirrors CI's `verify` job)

```bash
npm run typecheck
npm run test        # ELECTRON_RUN_AS_NODE electron — NEVER plain `npx vitest` (ABI)
```

100% pass required. A failing test = stop, report, no release.

## 3. Linux build

```bash
npm run build
npx electron-builder --linux --publish never
```

- **Transient TLS/network failures happen** on the electron zip download — retry
  once before diagnosing (v0.17.0 hit this; second run was clean).
- Verify: `dist/NaviHUB-X.Y.0.AppImage` exists and `head -1 dist/latest-linux.yml`
  says `version: X.Y.0` (a stale yml from the previous release looks plausible —
  check the version line, not just existence).

## 4. Windows build (long — run in background, ~5-10 min)

```bash
bash scripts/dist-win.sh
```

The script handles both cross-build traps: NSIS needs wine (docker image
`electronuserland/builder:wine`) and `@electron/rebuild` can't cross-fetch native
modules (it swaps in the win32-x64 better-sqlite3 prebuild first, then restores
the Linux build via `npm run rebuild` at the end — if the script is interrupted,
run `npm run rebuild` by hand or the local app/tests break).

**Mandatory check** after it finishes:

```bash
file dist/win-unpacked/resources/app.asar.unpacked/node_modules/better-sqlite3/build/Release/better_sqlite3.node
# must say PE32+, never ELF
head -1 dist/latest.yml   # must say version: X.Y.0
```

## 5. Publish

Exactly these **five assets** — both updater manifests are load-bearing (without
them the in-app updater has nothing to read). No blockmap upload (CI parity).

```bash
gh release create vX.Y.0 --title "NaviHUB X.Y.0" --notes "<one-line summary of what shipped>" \
  dist/NaviHUB-X.Y.0.AppImage dist/latest-linux.yml \
  dist/NaviHUB-Setup-X.Y.0.exe dist/NaviHUB-X.Y.0-portable.exe dist/latest.yml
```

Post-checks:

```bash
gh release view vX.Y.0 --json assets -q '.assets[].name'   # all five present
gh api repos/AmirHTaee/NaviHUB/releases/latest -q .tag_name  # MUST be vX.Y.0
```

The latest-release check guards the updater: `/releases/latest` must resolve to
an app release, never to the `games-catalog-1` PRERELEASE (prerelease flag keeps
it out — if latest resolves wrong, fix the release flags before telling the user).

If `gh release create` fails midway (tag created, some assets missing), don't
recreate — upload the stragglers: `gh release upload vX.Y.0 <files>`.

## 6. Restore the stamp

```bash
git checkout -- package.json package-lock.json
git status --short   # clean again
```

## 7. Hand off

Tell the user: update in-app on the PC (Settings → System → Updates — needs
`github.token` set, repo is private), and mention anything in the release that
needs a manual first step on their machine.
