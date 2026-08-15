// One shared line splitter for the three spawned tools, plus the hook that
// routes their output into the log ring.
//
// Why not readline: tqdm (mokuro) and ffmpeg's status line end with \r, never
// \n. readline buffers a whole progress bar's worth of updates until a closing
// newline that may never come — mokuroRun.ts had hand-rolled exactly this for
// that reason, and video/ffmpeg.ts and musicDownload.ts each had their own
// createInterface. This is that one splitter, with the log tap attached.
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
    // three parsers reads them, and letting them through would dilute the
    // 20-line error tails that mokuro and ffmpeg keep for their messages.
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
  // ffmpeg's stdout is the -progress key=value protocol, already parsed into
  // VideoPrepareStatus. Routing it to the bus would flood the ring with nothing
  // the user can read.
  logStdout?: boolean
}

// Wires both streams. Each line reaches its stream's own callback (the
// caller's parser, which must keep seeing everything), and the interesting
// ones ALSO become log rows.
//
// The callbacks are PER STREAM rather than one shared handler because the two
// streams carry different protocols — ffmpeg writes key=value progress on
// stdout and human diagnostics on stderr, and no content heuristic separates
// them reliably.
//
// The filters are not an optimization. A single ffmpeg or mokuro run emits a
// line per frame/page; unfiltered, one conversion evicts the entire 3000-entry
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
