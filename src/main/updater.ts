/*
 * In-app updates from GitHub Releases.
 *
 * electron-updater is EventEmitter-based, but this app deliberately has no push
 * channel (see CLAUDE.md), so every event is collapsed into ONE module-level
 * status object that the renderer polls via `update:status` — the musicDownload.ts
 * idiom. All the decisions live in updaterCore.ts so they stay testable without
 * the SDK; this file is only wiring and IO.
 *
 * Online work is button-only: nothing here runs on launch.
 */
import { app } from 'electron'
import { autoUpdater, CancellationToken } from 'electron-updater'
import { get as getSetting } from './repos/settingsRepo'
import { fetchWithRetry } from './http'
import * as tasks from './tasks'
import {
  friendlyUpdateError,
  idleStatus,
  reduceUpdate,
  tokenTestResult,
  updateEnvironment,
  type UpdaterEvent
} from './updaterCore'
import type { UpdateEnvironment, UpdateStatus, UpdateTestResult } from '@shared/types'

// Must stay in sync with the `publish` block in electron-builder.yml. The
// packaged app also ships app-update.yml with these values, but the token can
// only be supplied at runtime (it lives in the settings table), and setFeedURL
// takes the whole config or nothing.
const GITHUB_OWNER = 'AmirHTaee'
const GITHUB_REPO = 'NaviHUB'

let status: UpdateStatus | null = null
let counter = 0
let activeId: string | null = null
let cancelToken: CancellationToken | null = null
let listenersBound = false

function msg(e: unknown): string {
  return e instanceof Error ? e.message : String(e)
}

function token(): string {
  return getSetting('github.token')?.trim() ?? ''
}

function environment(): UpdateEnvironment {
  return updateEnvironment({
    packaged: app.isPackaged,
    portableExe: process.env.PORTABLE_EXECUTABLE_FILE ?? null,
    token: token()
  })
}

// Shallow copy, like musicDownload.getStatus — the renderer must never hold a
// live reference to mutable main state. `environment` is recomputed on every
// read because it changes mid-session the moment a token is pasted.
export function getStatus(): UpdateStatus {
  const env = environment()
  if (!status || status.state === 'idle') return idleStatus(app.getVersion(), env)
  return { ...status, environment: env, currentVersion: app.getVersion() }
}

function apply(id: string, ev: UpdaterEvent): void {
  // The stale-run guard: a late event from a superseded run must not corrupt
  // the current status.
  if (!status || status.id !== id) return
  status = reduceUpdate(status, ev)
}

// autoUpdater is a singleton, so its listeners are bound once and read the
// current run id rather than closing over one. That makes `activeId` the "who
// owns the updater's events" slot — and it is only ever handed over while
// nothing is in flight (checkForUpdate refuses to start under a download), so
// a long-running download's late events can't be applied to a newer run.
function bindListeners(): void {
  if (listenersBound) return
  listenersBound = true
  const on = (ev: () => UpdaterEvent) => (): void => {
    if (activeId) apply(activeId, ev())
  }
  autoUpdater.on('checking-for-update', on(() => ({ kind: 'checking' })))
  autoUpdater.on('update-not-available', on(() => ({ kind: 'notAvailable' })))
  autoUpdater.on('update-available', (info) => {
    if (activeId) apply(activeId, { kind: 'available', version: info.version })
  })
  autoUpdater.on('download-progress', (p) => {
    if (activeId) apply(activeId, { kind: 'progress', percent: p.percent })
  })
  autoUpdater.on('update-downloaded', (info) => {
    if (activeId) apply(activeId, { kind: 'downloaded', version: info.version })
  })
  autoUpdater.on('error', (err) => {
    if (activeId) apply(activeId, { kind: 'error', message: friendlyUpdateError(msg(err)) })
  })
}

function configure(): void {
  bindListeners()
  // Checking must never silently pull ~140MB — downloading is a separate button.
  autoUpdater.autoDownload = false
  autoUpdater.autoInstallOnAppQuit = false
  autoUpdater.setFeedURL({
    provider: 'github',
    owner: GITHUB_OWNER,
    repo: GITHUB_REPO,
    private: true,
    token: token()
  })
}

export async function checkForUpdate(): Promise<UpdateStatus> {
  // A download is fire-and-forget and outlives this call. Starting a check
  // under it would reassign activeId, and the download's own progress and
  // completion events — which the shared listeners route by activeId — would
  // then land on the check: the UI would jump to 'downloading' at the old
  // run's percent and end up 'ready' for a release the check never offered.
  if (cancelToken) return getStatus()
  if (environment() !== 'ok') {
    // Not an error — getStatus() renders the reason from the environment, which
    // the Settings card explains inline instead of toasting a failure.
    status = null
    return getStatus()
  }
  configure()
  counter += 1
  const id = `upd-${process.pid}-${counter}`
  status = { ...idleStatus(app.getVersion(), 'ok'), id, state: 'checking', message: null }
  activeId = id
  try {
    await autoUpdater.checkForUpdates()
    // Defensive: if the call resolved without emitting a terminal event, don't
    // leave the UI spinning on 'checking' forever.
    if (status?.id === id && status.state === 'checking') apply(id, { kind: 'notAvailable' })
  } catch (e) {
    apply(id, { kind: 'error', message: friendlyUpdateError(msg(e)) })
  }
  return getStatus()
}

export function downloadUpdate(): UpdateStatus {
  if (!status || status.state !== 'available') {
    throw new Error('Check for updates first — nothing is waiting to download')
  }
  const id = status.id
  const ct = new CancellationToken()
  activeId = id
  cancelToken = ct
  apply(id, { kind: 'progress', percent: 0 })

  // A task for the DOWNLOAD only — a check resolves in a second and would just
  // be noise in the list. Projected from the module-level `status`, NOT
  // getStatus(): that one recomputes environment() (an app.isPackaged check
  // plus a settings read) on every call, and tasks:list polls ~1/s.
  //
  // No install special-case is needed: reaching 'ready' settles this task
  // 'done', so it is already terminal by the time quitAndInstall runs and
  // settleAllOnQuit cannot restamp it 'cancelled'.
  tasks.create({
    kind: 'appUpdate',
    label: `Downloading update ${status.version ?? ''}`.trim(),
    route: '/settings',
    controls: { cancel: () => void cancelUpdate(), pauseNote: 'Updates cannot be paused' },
    project: () => {
      if (!status || status.id !== id) return null
      // 'available' is where a cancel lands (the release still exists, the user
      // just stopped fetching it) — from a download in flight that IS a cancel.
      if (status.state === 'available') return { state: 'cancelled' }
      if (status.state === 'ready') return { state: 'done', percent: 100 }
      if (status.state === 'error') return { state: 'error', error: status.message }
      return { percent: status.percent, detail: status.version }
    }
  })
  // Fire and forget, like startDownload in musicDownload.ts: the renderer polls
  // update:status for progress. Awaiting here would hold the IPC reply open for
  // the whole ~140MB transfer, so the progress bar could never move — and the
  // renderer's post-start invalidate would arrive too late to begin polling.
  void autoUpdater
    .downloadUpdate(ct)
    .catch((e) => {
      // Cancelling rejects the download promise; that isn't a failure.
      apply(
        id,
        ct.cancelled
          ? { kind: 'cancelled' }
          : { kind: 'error', message: friendlyUpdateError(msg(e)) }
      )
    })
    .finally(() => {
      if (cancelToken === ct) cancelToken = null
    })
  return getStatus()
}

export function cancelUpdate(): UpdateStatus {
  cancelToken?.cancel()
  return getStatus()
}

export function installUpdate(): void {
  if (!status || status.state !== 'ready') {
    throw new Error('No downloaded update to install')
  }
  // Deferred a tick so the IPC reply reaches the renderer before the app quits.
  setImmediate(() => autoUpdater.quitAndInstall())
}

// before-quit hook: a half-finished download must not outlive the app.
export function killActiveUpdate(): void {
  try {
    cancelToken?.cancel()
  } catch {
    /* quitting anyway */
  }
}

// Verifies the saved token against the Releases API directly, so a bad token is
// diagnosed HERE with a real message rather than as a bare 404 inside
// electron-updater. Resolves (never rejects) so the Settings card renders it.
export async function testGithubToken(): Promise<UpdateTestResult> {
  const t = token()
  if (!t) return { ok: false, message: 'No token saved yet.' }
  try {
    // Deliberately the SAME endpoint and the SAME auth scheme as
    // PrivateGitHubProvider (`/releases/latest`, `authorization: token <pat>`).
    // GitHub also accepts `Bearer`, but a diagnostic that exercises a different
    // auth path than the real updater can pass while updating still fails.
    const res = await fetchWithRetry(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/releases/latest`,
      {
        headers: {
          authorization: `token ${t}`,
          accept: 'application/vnd.github.v3+json',
          'User-Agent': 'NaviHUB'
        },
        // Interactive button: fail fast instead of sitting on a rate-limit wait.
        timeoutMs: 15_000,
        rateLimitWaits: 0
      },
      1
    )
    const tag = res.ok ? (((await res.json()) as { tag_name?: string }).tag_name ?? null) : null
    return tokenTestResult(res.status, tag)
  } catch (e) {
    return { ok: false, message: msg(e) }
  }
}
