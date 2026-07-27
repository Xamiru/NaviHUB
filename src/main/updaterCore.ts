/*
 * Pure update logic — no electron, no electron-updater, no DB. Split out of
 * updater.ts for the same reason coachTools.ts is split out of gachaCoach.ts:
 * tests/updater.test.ts can exercise every decision without loading an SDK.
 */
import type { UpdateEnvironment, UpdateStatus, UpdateTestResult } from '@shared/types'

export interface UpdateEnvInput {
  packaged: boolean // app.isPackaged
  portableExe: string | null // process.env.PORTABLE_EXECUTABLE_FILE (set only by the portable target)
  token: string // the github.token setting, already trimmed
}

// Order matters: `dev` and `portable` are properties of the BUILD and can't be
// fixed by pasting a token, so they must win over the missing-token case —
// otherwise a dev run with no token would tell the user to add one, which
// wouldn't help.
export function updateEnvironment(input: UpdateEnvInput): UpdateEnvironment {
  if (!input.packaged) return 'dev'
  if (input.portableExe) return 'portable'
  if (!input.token) return 'no-token'
  return 'ok'
}

export function environmentMessage(environment: UpdateEnvironment): string | null {
  switch (environment) {
    case 'dev':
      return 'Updates only work in a packaged build (AppImage or installer).'
    case 'portable':
      return 'The portable build cannot replace itself — use the installer or the AppImage to get updates.'
    case 'no-token':
      return 'Add a GitHub token below — the repository is private, so updates need one.'
    default:
      return null
  }
}

export function idleStatus(currentVersion: string, environment: UpdateEnvironment): UpdateStatus {
  return {
    id: '',
    state: 'idle',
    currentVersion,
    environment,
    percent: null,
    version: null,
    message: environmentMessage(environment)
  }
}

// The electron-updater events we care about, normalized. Keeping this vocabulary
// separate from the SDK's is what lets the reducer be tested directly.
export type UpdaterEvent =
  | { kind: 'checking' }
  | { kind: 'available'; version: string }
  | { kind: 'notAvailable' }
  | { kind: 'progress'; percent: number }
  | { kind: 'downloaded'; version: string }
  | { kind: 'cancelled' }
  | { kind: 'error'; message: string }

export function reduceUpdate(prev: UpdateStatus, ev: UpdaterEvent): UpdateStatus {
  switch (ev.kind) {
    case 'checking':
      return { ...prev, state: 'checking', percent: null, version: null, message: null }
    case 'available':
      return { ...prev, state: 'available', version: ev.version, percent: null, message: null }
    case 'notAvailable':
      return { ...prev, state: 'upToDate', version: null, percent: null, message: null }
    case 'progress':
      // A late progress event must never drag a finished download back to
      // 'downloading' — electron-updater can emit one after 'update-downloaded'.
      if (prev.state === 'ready') return prev
      return {
        ...prev,
        state: 'downloading',
        percent: Math.max(0, Math.min(100, Math.round(ev.percent)))
      }
    case 'downloaded':
      return { ...prev, state: 'ready', version: ev.version, percent: 100, message: null }
    case 'cancelled':
      // Back to 'available': the update still exists, the user just stopped
      // fetching it. Treating a cancel as an error would be a lie.
      return { ...prev, state: 'available', percent: null, message: null }
    case 'error':
      // Keep `version` so the UI can say which release failed.
      return { ...prev, state: 'error', percent: null, message: ev.message }
  }
}

// Turns the Releases API response for the "Save & test" button into a verdict.
// Pure so the branch mapping is tested; updater.ts only does the fetch.
export function tokenTestResult(httpStatus: number, tagName: string | null): UpdateTestResult {
  if (httpStatus === 404) {
    return {
      ok: false,
      message:
        '404 — the token cannot see this repository. It needs `repo` scope (classic) or Contents: read (fine-grained).'
    }
  }
  if (httpStatus === 401) {
    return { ok: false, message: '401 — GitHub rejected the token. It may be expired or mistyped.' }
  }
  if (httpStatus === 403) {
    return { ok: false, message: '403 — GitHub refused the request (token access or rate limit).' }
  }
  if (httpStatus < 200 || httpStatus >= 300) {
    return { ok: false, message: `GitHub returned HTTP ${httpStatus}.` }
  }
  return { ok: true, message: `Token works — latest release is ${tagName ?? 'unknown'}.` }
}

// electron-updater surfaces a bare HTTP status for the most likely failure here
// (a token that can't see the private repo), which is unactionable as raw text.
export function friendlyUpdateError(raw: string): string {
  if (/\b404\b/.test(raw)) {
    return 'GitHub returned 404 — the token is missing, expired, or cannot see this private repository. Re-check it with Save & test.'
  }
  if (/\b401\b/.test(raw) || /bad credentials/i.test(raw)) {
    return 'GitHub rejected the token (401) — it may be expired or mistyped.'
  }
  if (/\b403\b/.test(raw)) {
    return 'GitHub refused the request (403) — the token may lack repo access, or you hit a rate limit.'
  }
  return raw
}
