// One shared line splitter for spawned tools, plus the hook that
// routes their output into the log ring.
//
// Why not readline: tqdm (mokuro) ends with \r, never
// \n. readline buffers a whole progress bar's worth of updates until a closing
// newline that may never come. This is the shared splitter, with the log tap
// attached.
import { log } from './logBus'
import { makeProcLineFilter, type ProcTool } from './logCore'

// Splits on \n AND \r so progress bars arrive as they are drawn.
export function onLines(stream: NodeJS.ReadableStream, onLine: (line: string) => void): void {
  let buf = ''
  stream.setEncoding('utf-8')
  stream.on('data', (chunk: string) => {
    buf += chunk
    const parts = buf.split(/\r\n|\r|\n/)
    buf = parts.pop() ?? ''
    // Blank lines are dropped here rather than at each consumer: none of the
    // parsers read them, and letting them through would dilute useful errors.
    for (const part of parts) if (part.trim() !== '') onLine(part)
  })
  stream.on('end', () => {
    if (buf.trim() !== '') onLine(buf)
    buf = ''
  })
}

export interface ProcLogOpts {
  tool: ProcTool
  taskId?: string | null
  onStdout: (line: string) => void
  onStderr: (line: string) => void
  // Some tools expose a machine-readable stdout stream that should reach the
  // caller but not the log.
  logStdout?: boolean
}

// Wires both streams. Each line reaches its stream's own callback (the
// caller's parser, which must keep seeing everything), and the interesting
// ones ALSO become log rows.
//
// The callbacks are per stream because some tools use stdout for progress and
// stderr for diagnostics.
//
// The filters are not an optimization. A single mokuro run emits a
// line per page; unfiltered, one run evicts the entire 3000-entry
// ring in under a minute and the log becomes useless for everything else.
export function pipeProcLines(
  proc: { stdout: NodeJS.ReadableStream; stderr: NodeJS.ReadableStream },
  opts: ProcLogOpts
): void {
  const taskId = opts.taskId ?? null
  // One filter per stream: they carry independent progress sequences, and a
  // shared percentage bucket would swallow one of them.
  const keepOut = makeProcLineFilter(opts.tool)
  const keepErr = makeProcLineFilter(opts.tool)

  const tap =
    (onLine: (line: string) => void, keep: (line: string) => boolean, toLog: boolean) =>
    (line: string): void => {
      onLine(line)
      if (toLog && keep(line)) log('debug', 'proc', `${opts.tool}: ${line.trim()}`, taskId)
    }

  onLines(proc.stdout, tap(opts.onStdout, keepOut, opts.logStdout !== false))
  onLines(proc.stderr, tap(opts.onStderr, keepErr, true))
}
