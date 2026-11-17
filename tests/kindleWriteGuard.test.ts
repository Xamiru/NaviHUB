import { readdirSync, readFileSync, statSync } from 'fs'
import { join, relative } from 'path'
import { describe, expect, it } from 'vitest'

// The Kindle is written to by ONE module, src/main/kindle/kindleWrite.ts, whose
// every path is confined to documents/NaviHUB/. These text guards (house style)
// keep it that way: the read side never gains a write, and nothing else
// reaches for the writer.

const root = join(__dirname, '..')
const read = (rel: string): string => readFileSync(join(root, rel), 'utf8')

function walk(dir: string): string[] {
  const out: string[] = []
  for (const name of readdirSync(dir)) {
    const abs = join(dir, name)
    if (statSync(abs).isDirectory()) out.push(...walk(abs))
    else if (/\.(ts|tsx)$/.test(name)) out.push(relative(root, abs).split('\\').join('/'))
  }
  return out
}

const WRITE_CALLS = /\b(writeFile|appendFile|createWriteStream|copyFile|rename|unlink|rmdir|mkdir|rm|symlink|truncate|chmod|utimes)\s*\(/g

describe('Kindle write guard', () => {
  it('the read-only device adapter writes only the local copy it was asked for', () => {
    const src = read('src/main/kindle/kindleDevice.ts')
    // Its one writer is copyToLocal, which opens the LOCAL target 'wx' and
    // removes only that target when the copy fails.
    const opens = src.split('\n').filter((l) => l.includes('fsp.open('))
    expect(opens.length).toBeGreaterThan(0)
    for (const line of opens) expect(line).toMatch(/fsp\.open\(.*, 'r'\)|fsp\.open\(localAbs, 'wx'\)/)
    const code = src
      .split('\n')
      .filter((l) => !l.trim().startsWith('//'))
      .join('\n')
    const writes = [...code.matchAll(WRITE_CALLS)].map((m) => m[0])
    // The stream of the handle opened 'wx' on localAbs, and its cleanup.
    expect(writes).toEqual(['createWriteStream(', 'rm('])
    expect(code).toMatch(/handle\.createWriteStream\(\)/)
    expect(code).toMatch(/fsp\.rm\(localAbs, \{ force: true \}\)/)
  })

  it('the scanner reaches the device only through the read interface', () => {
    const src = read('src/main/kindle/kindleScan.ts')
    expect(src).not.toMatch(/\.root\b/)
    expect(src).not.toMatch(/FilesystemDeviceWriter|kindleWrite/)
  })

  it('nothing but the writer module constructs a device writer', () => {
    const users = walk(join(root, 'src'))
      .filter((f) => f !== 'src/main/kindle/kindleWrite.ts')
      .filter((f) =>
        /new (DeviceWriter|GioMtpUploader|FilesystemUploader)\(|uploaderFor\(|from '\.\/kindleWrite'|kindle\/kindleWrite'/.test(
          read(f)
        )
      )
    // Send to Kindle is the one user, and it reaches the device through it only.
    expect(users).toEqual(['src/main/kindle/kindleSend.ts'])
  })

  it('the writer confines every path to documents/NaviHUB', () => {
    const src = read('src/main/kindle/kindleWrite.ts')
    // Each fs call takes the NaviHUB folder or a checked name in it
    // (this.dir() / this.file(name)), a helper's own argument, or the local
    // file being sent.
    const calls = [...src.matchAll(/fsp\.(\w+)\(([^,)]*)/g)].map((m) => `${m[1]}(${m[2]}`)
    expect(calls.length).toBeGreaterThan(0)
    for (const c of calls) {
      expect(c).toMatch(/^(\w+)\((this\.dir\(|this\.file\(name|abs$|file\.localPath$)/)
    }
    // The one plain-file write: a checked name, opened 'wx'.
    expect(src).toMatch(
      /const abs = this\.file\(name\)\s+await pipeline\(\s*createReadStream\(localAbs\),\s*stopGate\(shouldStop\),\s*createWriteStream\(abs, \{ flags: 'wx' \}\)\s*\)/
    )
    expect([...src.matchAll(/createWriteStream\(/g)]).toHaveLength(1)
    // The one place a name becomes a path checks it first, and both uploaders
    // (gio included) take their paths from it.
    expect(src).toMatch(/protected file\(name: string\): string \{\n\s+assertName\(name\)/)
    expect([...src.matchAll(/join\(this\.dir\(\), /g)]).toHaveLength(1)
  })

  it('every gio call ends its options before the paths', () => {
    const src = read('src/main/kindle/kindleWrite.ts')
    const calls = [...src.matchAll(/this\.gio\(\[([^\]]*)\]/g)].map((m) => m[1])
    expect(calls).toHaveLength(2)
    for (const args of calls) expect(args).toMatch(/^'(copy|remove)', '--', /)
    // Only upload and remove: gio never renames, moves or lists on the device.
    expect(src).not.toMatch(/'(move|rename|mkdir|trash|save|set)'/)
  })
})
