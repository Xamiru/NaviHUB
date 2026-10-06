import type { IpcMain, IpcMainInvokeEvent } from 'electron'
import { logWarn } from './logBus'

// A handler's synchronous part runs on the main process, where it holds up
// every other IPC call and every navimg:// image. Any handler that takes
// SLOW_IPC_MS or longer is logged by name, so a library that has outgrown a
// handler shows up in the log (Tools -> Logs) instead of as a vague lag. Only
// the channel and duration are written: arguments can hold personal data.
// Only the part before a handler's first await is timed.
export const SLOW_IPC_MS = 100
// One warning per channel per window, so a slow polled channel cannot flood the log.
export const SLOW_IPC_REPEAT_MS = 10_000

type Listener = (event: IpcMainInvokeEvent, ...args: unknown[]) => unknown

export function slowHandlerTimer(
  options: {
    thresholdMs?: number
    repeatMs?: number
    now?: () => number
    warn?: (message: string) => void
  } = {}
): (channel: string, listener: Listener) => Listener {
  const threshold = options.thresholdMs ?? SLOW_IPC_MS
  const repeat = options.repeatMs ?? SLOW_IPC_REPEAT_MS
  const now = options.now ?? (() => performance.now())
  const warn = options.warn ?? ((message: string) => logWarn('ipc', message))
  const lastWarned = new Map<string, number>()
  return (channel, listener) =>
    (event, ...args) => {
      const start = now()
      try {
        return listener(event, ...args)
      } finally {
        const end = now()
        const last = lastWarned.get(channel)
        if (end - start >= threshold && (last === undefined || end - last >= repeat)) {
          lastWarned.set(channel, end)
          warn(`slow handler ${channel}: ${Math.round(end - start)} ms on the main process`)
        }
      }
    }
}

// Times every handler registered through ipcMain.handle from here on.
export function timeIpcHandlers(ipc: Pick<IpcMain, 'handle'>): void {
  const wrap = slowHandlerTimer()
  const register = ipc.handle.bind(ipc)
  ipc.handle = (channel, listener) => register(channel, wrap(channel, listener))
}
