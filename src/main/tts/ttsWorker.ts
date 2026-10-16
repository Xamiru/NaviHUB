import { createRequire } from 'module'
import { parentPort, workerData } from 'worker_threads'
import { readingFromTrace } from './ttsCore'

// Worker thread hosting the Open JTalk WebAssembly engine (resources/openjtalk/),
// so a synthesis (~150 ms) never blocks the main process's IPC or image
// protocol. One engine instance serves every request, one at a time in arrival
// order. Imports nothing from electron.

interface Init {
  enginePath: string
  dicDir: string
  voiceDir: string
  args: string[]
}

interface EmscriptenFS {
  mkdir(path: string): void
  mount(type: unknown, opts: { root: string }, path: string): void
  writeFile(path: string, data: string): void
  readFile(path: string): Uint8Array
}

interface OpenJTalkModule {
  FS: EmscriptenFS
  NODEFS: unknown
  callMain(args: string[]): number
}

const { enginePath, dicDir, voiceDir, args } = workerData as Init
const load = createRequire(enginePath)(enginePath) as (opts: object) => Promise<OpenJTalkModule>

const engine = load({ print: () => {}, printErr: () => {} }).then((M) => {
  M.FS.mkdir('/dic')
  M.FS.mount(M.NODEFS, { root: dicDir }, '/dic')
  M.FS.mkdir('/voice')
  M.FS.mount(M.NODEFS, { root: voiceDir }, '/voice')
  return M
})

function run(M: OpenJTalkModule, text: string): { wav: Uint8Array; reading: string | null } {
  M.FS.writeFile('/in.txt', text)
  const code = M.callMain(args)
  if (code !== 0) throw new Error(`Open JTalk exited with ${code}`)
  const trace = new TextDecoder().decode(M.FS.readFile('/trace.txt'))
  return { wav: M.FS.readFile('/out.wav'), reading: readingFromTrace(trace) }
}

let queue: Promise<void> = Promise.resolve()

// `reading` (hiragana) is what the card or entry says the text reads as. The
// written form goes first because it carries the pitch accent (橋 vs 箸); if the
// engine read it differently (今日 as きょう when the card means こんにち), the
// reading itself is spoken instead, so the learner never hears another word.
parentPort!.on('message', (msg: { id: number; text: string; reading: string | null }) => {
  queue = queue.then(async () => {
    try {
      const M = await engine
      let out = run(M, msg.text)
      if (msg.reading && out.reading && out.reading !== msg.reading) out = run(M, msg.reading)
      parentPort!.postMessage({ id: msg.id, wav: out.wav }, [out.wav.buffer as ArrayBuffer])
    } catch (err) {
      parentPort!.postMessage({ id: msg.id, error: err instanceof Error ? err.message : String(err) })
    }
  })
})
