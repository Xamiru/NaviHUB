import { utilityProcess, type UtilityProcess } from 'electron'
import childPath from './quizPoolChild?modulePath'
import { getDbPath } from './db/connection'
import { logInfo, logWarn } from './logBus'
import { PendingRegistry } from './pendingRegistry'
import { runQuizPoolRequest, type QuizPoolMethod, type QuizPoolMethods } from './quizPoolsCore'

// IO half of the quiz pools. Availability, the challenge/song/cast/synopsis
// pools and VA deals each read the whole library; on main they blocked every
// IPC call and every navimg:// image for seconds on a large library. They run
// in a utility process (quizPoolChild.ts) with its own read-only connection,
// kept warm between rounds (availability and VA pools stay cached until the
// library changes) and dropped after IDLE_MS of silence.
//
// When the process cannot start or dies under a request, that request runs
// here as it did before, and the rest of the session stays in-process instead
// of respawning a broken child. A timeout or an error from the computation
// itself is not a crash and rejects as usual. A timeout stops the shared
// process, so the other requests in flight to it are sent once more to a fresh
// one rather than failing with the request that overran.
//
// stopQuizPools() is in the before-quit registry (index.ts), ahead of
// closeDatabase(): the child's reader must not hold the WAL through the
// closing checkpoint.

const TIMEOUT_MS = 60_000
const IDLE_MS = 5 * 60 * 1000
const CHILD_FAILED = 'The quiz pool process failed.'
const CHILD_RESTARTED = 'The quiz pool process was restarted.'

type ChildReply = { id: number; ok: true; value: unknown } | { id: number; ok: false; error: string }

let child: UtilityProcess | null = null
let inProcess = false
let nextId = 1
const pending = new PendingRegistry<UtilityProcess, ChildReply>()
const stoppedByMain = new WeakSet<UtilityProcess>()
let idleTimer: NodeJS.Timeout | null = null

function spawn(): UtilityProcess {
  const proc = utilityProcess.fork(childPath, [], {
    serviceName: 'navihub-quiz-pools',
    stdio: 'ignore',
    env: { ...process.env, NAVIHUB_QUIZ_DB: getDbPath() }
  })
  proc.on('message', (msg: ChildReply) => {
    pending.settle(msg.id, msg)
  })
  proc.on('exit', (code) => {
    if (child === proc) child = null
    const stopped = stoppedByMain.has(proc)
    const failed = pending.fail(stopped ? 'The quiz pool process was stopped.' : CHILD_FAILED, proc)
    if (!stopped) logWarn('proc', `quiz pools: process exited (${code}) with ${failed} requests in flight`)
  })
  logInfo('proc', 'quiz pools: spawned utility process')
  return proc
}

function stop(proc: UtilityProcess): void {
  stoppedByMain.add(proc)
  if (child === proc) child = null
  proc.kill()
}

function touchIdle(): void {
  if (idleTimer) clearTimeout(idleTimer)
  idleTimer = setTimeout(() => {
    idleTimer = null
    if (child && pending.size === 0) {
      stop(child)
      logInfo('proc', 'quiz pools: idle, stopped')
    }
  }, IDLE_MS)
  idleTimer.unref()
}

function runInChild(method: QuizPoolMethod, args: readonly unknown[]): Promise<ChildReply> {
  let proc: UtilityProcess
  try {
    proc = child ??= spawn()
  } catch (err) {
    logWarn('proc', `quiz pools: could not start the process: ${String(err)}`)
    return Promise.reject(new Error(CHILD_FAILED))
  }
  const id = nextId++
  return new Promise<ChildReply>((resolve, reject) => {
    const timer = setTimeout(() => {
      pending.take(id)
      logWarn('proc', `quiz pools: ${method} exceeded ${TIMEOUT_MS} ms, process stopped`)
      pending.fail(CHILD_RESTARTED, proc)
      stop(proc)
      reject(new Error('Building this quiz took over a minute and was stopped. Try again.'))
    }, TIMEOUT_MS)
    pending.add(id, { proc, resolve, reject, clearTimer: () => clearTimeout(timer) })
    try {
      proc.postMessage({ id, method, args })
    } catch (err) {
      // A process already on its way out: settle now rather than at the timeout.
      logWarn('proc', `quiz pools: could not send ${method}: ${String(err)}`)
      pending.take(id)
      reject(new Error(CHILD_FAILED))
      return
    }
    touchIdle()
  })
}

export async function callQuizPools<M extends QuizPoolMethod>(
  method: M,
  ...args: Parameters<QuizPoolMethods[M]>
): Promise<ReturnType<QuizPoolMethods[M]>> {
  for (let attempt = 0; !inProcess; attempt++) {
    try {
      const reply = await runInChild(method, args)
      if (!reply.ok) throw new Error(reply.error)
      return reply.value as ReturnType<QuizPoolMethods[M]>
    } catch (err) {
      if (err instanceof Error && err.message === CHILD_RESTARTED && attempt === 0) continue
      if (!(err instanceof Error) || err.message !== CHILD_FAILED) throw err
      inProcess = true
      logWarn('proc', 'quiz pools: building quizzes in the main process for the rest of this session')
    }
  }
  return runQuizPoolRequest(method, args) as ReturnType<QuizPoolMethods[M]>
}

// Before-quit: drop the child (its caches are rebuilt on demand) and fail
// anything still in flight.
export function stopQuizPools(): void {
  if (idleTimer) clearTimeout(idleTimer)
  idleTimer = null
  pending.fail('App is quitting.')
  if (child) stop(child)
}
