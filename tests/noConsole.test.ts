import { readdirSync, readFileSync, statSync } from 'fs'
import { fileURLToPath } from 'url'
import { join, relative } from 'path'
import { describe, expect, it } from 'vitest'

// src/main has had zero console output since the app was written — a
// discipline, not an enforced rule (there is no ESLint config). Now that
// logBus.ts exists as the sanctioned alternative, this locks it: a stray
// console.log in the main process is invisible in a packaged build AND
// bypasses the log file the user can actually read.

const mainDir = fileURLToPath(new URL('../src/main', import.meta.url))

function walk(dir: string): string[] {
  const out: string[] = []
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) out.push(...walk(p))
    else if (p.endsWith('.ts')) out.push(p)
  }
  return out
}

describe('src/main writes no console output', () => {
  const files = walk(mainDir)

  it('scans a plausible number of files', () => {
    // Guards the walk itself against silently finding nothing.
    expect(files.length).toBeGreaterThan(50)
  })

  it('has no console.* calls', () => {
    const offenders = files
      .filter((f) => /\bconsole\s*\.\s*(log|error|warn|info|debug|trace|table|dir)\s*\(/.test(readFileSync(f, 'utf8')))
      .map((f) => relative(mainDir, f))
      .sort()
    expect(
      offenders,
      `use logBus (logInfo/logWarn/logError) instead of console in: ${offenders.join(', ')}`
    ).toEqual([])
  })

  it('routes the one stdout escape hatch through process.stdout, behind an env flag', () => {
    const bus = readFileSync(join(mainDir, 'logBus.ts'), 'utf8')
    expect(bus).toContain("process.env['NAVIHUB_LOG_STDOUT']")
    expect(bus).toContain('process.stdout.write')
    // A CALL, not the word — the file's own comments mention console.* while
    // explaining why it does not use it.
    expect(bus).not.toMatch(/\bconsole\s*\.\s*\w+\s*\(/)
  })
})

describe('the logging chain stays electron-free', () => {
  // logBus is imported by http.ts and db/connection.ts, whose tests run with no
  // electron mock. If any link in the chain pulls electron in, a large share of
  // the suite dies with "Cannot read properties of undefined" from the electron
  // stub. logFile.ts is the deliberate exception — nothing testable imports it.
  for (const file of ['logCore.ts', 'logBus.ts', 'tasks.ts', 'taskControls.ts', 'childLines.ts']) {
    it(`${file} does not import electron`, () => {
      const src = readFileSync(join(mainDir, file), 'utf8')
      expect(src).not.toMatch(/from 'electron'/)
      expect(src).not.toMatch(/require\(['"]electron['"]\)/)
    })
  }
})
