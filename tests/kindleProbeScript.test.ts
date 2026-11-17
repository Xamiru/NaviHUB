import { readFileSync } from 'fs'
import { join } from 'path'
import { describe, expect, it } from 'vitest'

// scripts/kindle-probe.ps1 runs on the user's Windows PC against the Kindle
// before any Windows device code exists. It must stay read-only on the device:
// its one copy goes FROM the Kindle TO a local temp folder. These are text
// guards (house style), because the script cannot run here.

const script = readFileSync(join(__dirname, '..', 'scripts', 'kindle-probe.ps1'), 'utf8')
// Comment lines describe what the script never does; only code is checked.
const code = script
  .split('\n')
  .filter((l) => !l.trim().startsWith('#'))
  .join('\n')

describe('kindle-probe.ps1', () => {
  it.each([
    'MoveHere',
    'InvokeVerb',
    'InvokeVerbEx',
    '.Delete(',
    'Remove-Item',
    'Rename-Item',
    'Move-Item',
    'Copy-Item',
    'Invoke-Expression',
    'iex ',
    'Start-Process',
    'Invoke-WebRequest',
    'Invoke-RestMethod',
    'Net.WebClient'
  ])('never calls %s', (call) => {
    expect(code.toLowerCase()).not.toContain(call.toLowerCase())
  })

  it('calls CopyHere only on the local temp folder', () => {
    const calls = [...code.matchAll(/\$(\w+)\.CopyHere\(/g)].map((m) => m[1])
    expect(calls).toEqual(['localFolder'])
    expect(code).toMatch(/\$localFolder = \$shell\.Namespace\(\$tempDir\)/)
    expect(code).toMatch(/\$tempDir = Join-Path \$env:TEMP /)
  })

  it('writes files only under its own temp folder', () => {
    const writes = [...code.matchAll(/(Set-Content|Out-File|New-Item|Add-Content)[^\n]*/g)].map((m) => m[0])
    expect(writes).toHaveLength(2)
    expect(writes.some((w) => w.startsWith('New-Item -ItemType Directory -Path $tempDir'))).toBe(true)
    expect(writes.some((w) => w.startsWith('Set-Content -LiteralPath $out'))).toBe(true)
    expect(code).toMatch(/\$out = Join-Path \$tempDir 'probe\.json'/)
  })
})
