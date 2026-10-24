#!/usr/bin/env node

// Runs one heavy command (a typecheck project or a Vitest suite) under a
// machine-wide lock, so parallel agent sessions queue instead of stacking
// several 1-2 GB toolchains on the laptop's RAM at once.
//
//   node scripts/with-heavy-lock.cjs <cmd> [args...]
//
// NAVIHUB_HEAVY_SLOTS=<n>  how many heavy commands may run at once (default 1)
// NAVIHUB_HEAVY_LOCK=skip  run without the lock (also set to "held" for the
//                          child, so a nested wrapper never waits on itself)
//
// The lock lives under ~/.cache, not os.tmpdir(): sessions may get different
// TMPDIRs, and every checkout and worktree on the machine shares the same RAM.
// An owner whose pid is gone (killed, crashed, timed out) is reclaimed.

const { spawn } = require('node:child_process')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')

const LOCK_ROOT = path.join(os.homedir(), '.cache', 'navihub-heavy-lock')
const POLL_MS = 1000
// A slot directory is created before its owner file is written; give a
// half-written slot this long before treating it as abandoned.
const OWNERLESS_GRACE_MS = 10_000

const argv = process.argv.slice(2)
if (argv.length === 0) {
  process.stderr.write('usage: with-heavy-lock.cjs <cmd> [args...]\n')
  process.exit(2)
}

const mode = process.env.NAVIHUB_HEAVY_LOCK
const slots = Math.max(1, Number.parseInt(process.env.NAVIHUB_HEAVY_SLOTS ?? '', 10) || 1)
const label = argv.join(' ')

function alive(pid) {
  try {
    process.kill(pid, 0)
    return true
  } catch (err) {
    return err.code === 'EPERM'
  }
}

function readOwner(dir) {
  try {
    return JSON.parse(fs.readFileSync(path.join(dir, 'owner.json'), 'utf8'))
  } catch {
    return null
  }
}

function isStale(dir) {
  const owner = readOwner(dir)
  if (owner && Number.isInteger(owner.pid)) return !alive(owner.pid)
  try {
    return Date.now() - fs.statSync(dir).mtimeMs > OWNERLESS_GRACE_MS
  } catch {
    return false
  }
}

// Removes a stale slot so it can be taken again. Two waiters that both judge
// a slot stale must not both remove it: the second rm would delete the slot
// the first has just re-created. So removal happens under a per-slot guard
// directory (mkdir is atomic), and staleness is re-checked inside it. A guard
// left behind by a waiter that died mid-reclaim expires after the grace.
function reclaimIfStale(dir) {
  const guard = `${dir}.reclaim`
  try {
    fs.mkdirSync(guard)
  } catch (err) {
    if (err.code !== 'EEXIST') throw err
    try {
      if (Date.now() - fs.statSync(guard).mtimeMs > OWNERLESS_GRACE_MS) {
        fs.rmSync(guard, { recursive: true, force: true })
      }
    } catch {
      // Released meanwhile.
    }
    return false
  }
  try {
    if (!isStale(dir)) return false
    fs.rmSync(dir, { recursive: true, force: true })
    return true
  } finally {
    fs.rmSync(guard, { recursive: true, force: true })
  }
}

// Returns the held slot directory, or the list of current owners.
function tryAcquire() {
  fs.mkdirSync(LOCK_ROOT, { recursive: true })
  const owners = []
  for (let i = 0; i < slots; i++) {
    const dir = path.join(LOCK_ROOT, `slot-${i}`)
    try {
      fs.mkdirSync(dir)
    } catch (err) {
      if (err.code !== 'EEXIST') throw err
      if (reclaimIfStale(dir)) {
        i--
        continue
      }
      owners.push(readOwner(dir))
      continue
    }
    const owner = { pid: process.pid, cmd: label, cwd: process.cwd(), startedAt: new Date().toISOString() }
    fs.writeFileSync(path.join(dir, 'owner.json'), JSON.stringify(owner))
    return { dir }
  }
  return { owners }
}

let held = null
function release() {
  if (!held) return
  // Only remove the slot if it is still ours (a stale-reclaim race could have
  // handed it to someone else).
  if (readOwner(held)?.pid === process.pid) fs.rmSync(held, { recursive: true, force: true })
  held = null
}

let child = null
let waitTimer = null
function onSignal(signal) {
  if (child) {
    child.kill(signal)
    return
  }
  clearTimeout(waitTimer)
  release()
  process.kill(process.pid, signal)
}
for (const signal of ['SIGINT', 'SIGTERM', 'SIGHUP']) {
  process.once(signal, () => onSignal(signal))
}

function run() {
  child = spawn(argv[0], argv.slice(1), {
    stdio: 'inherit',
    env: { ...process.env, NAVIHUB_HEAVY_LOCK: 'held' },
    shell: process.platform === 'win32'
  })
  child.on('error', (err) => {
    release()
    process.stderr.write(`with-heavy-lock: ${err.message}\n`)
    process.exit(1)
  })
  child.on('exit', (code, signal) => {
    release()
    if (signal) {
      process.removeAllListeners(signal)
      process.kill(process.pid, signal)
    } else {
      process.exit(code ?? 1)
    }
  })
}

if (mode === 'held' || mode === 'skip') {
  run()
} else {
  let lastReport = ''
  const startedWaiting = Date.now()
  const attempt = () => {
    const result = tryAcquire()
    if (result.dir) {
      held = result.dir
      if (lastReport) {
        const secs = Math.round((Date.now() - startedWaiting) / 1000)
        process.stderr.write(`with-heavy-lock: acquired after ${secs}s\n`)
      }
      run()
      return
    }
    const report = result.owners
      .map((o) => (o ? `pid ${o.pid}: ${o.cmd} (in ${o.cwd})` : 'a starting job'))
      .join('; ')
    if (report !== lastReport) {
      process.stderr.write(`with-heavy-lock: waiting for ${report}\n`)
      lastReport = report
    }
    waitTimer = setTimeout(attempt, POLL_MS)
  }
  attempt()
}
