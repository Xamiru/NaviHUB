import { describe, expect, it } from 'vitest'
import {
  buildArgv,
  chooseLaunch,
  emulatorIdFor,
  parseArgsJson,
  parsePlatforms,
  resolveDataDir,
  resolveScreenshotDir,
  sessionShots,
  templateFor,
  validateArgs
} from '../src/main/emulationCore'
import {
  EMULATOR_PRESETS,
  PRESET_KEYS,
  detectPreset,
  presetOfVia
} from '../src/shared/emulation/emulatorPresets'
import {
  PLATFORM_KEYS,
  PLATFORMS,
  platformFromName,
  platformsForExtension
} from '../src/shared/emulation/platforms'

const ROM = 'D:\\Games\\PS2\\Shadow of the Colossus.iso'

describe('emulator presets', () => {
  it('every preset either names the game file once or lets it be appended', () => {
    for (const key of PRESET_KEYS) {
      const args = EMULATOR_PRESETS[key].args
      expect(args.filter((a) => a === '{rom}').length).toBeLessThanOrEqual(1)
      expect(EMULATOR_PRESETS[key].key).toBe(key)
    }
  })

  it('never puts the game file after -- for emulators that pass the rest to the game', () => {
    for (const key of ['rpcs3', 'shadps4'] as const) {
      const args = EMULATOR_PRESETS[key].args
      expect(args).not.toContain('--')
      expect(args).toContain('{rom}')
    }
  })

  it('uses -- before the game file where the emulator honours it', () => {
    expect(buildArgv(EMULATOR_PRESETS.pcsx2.args, ROM, null)).toEqual(['-batch', '-fullscreen', '--', ROM])
    expect(buildArgv(EMULATOR_PRESETS.duckstation.args, ROM, null).slice(-2)).toEqual(['--', ROM])
  })

  it('builds the confirmed launch lines', () => {
    expect(buildArgv(EMULATOR_PRESETS.dolphin.args, 'C:\\g\\tp.rvz', null)).toEqual([
      '-b',
      '-C',
      'Dolphin.Display.Fullscreen=True',
      '-e',
      'C:\\g\\tp.rvz'
    ])
    expect(buildArgv(EMULATOR_PRESETS.eden.args, 'C:\\g\\totk.nsp', null)).toEqual(['-f', '-g', 'C:\\g\\totk.nsp'])
    expect(buildArgv(EMULATOR_PRESETS.shadps4.args, 'C:\\g\\eboot.bin', null)).toEqual([
      '-f',
      'true',
      '-g',
      'C:\\g\\eboot.bin'
    ])
  })

  it('platforms named by presets are real platform keys', () => {
    for (const key of PRESET_KEYS) {
      for (const p of EMULATOR_PRESETS[key].platforms) expect(PLATFORM_KEYS).toContain(p)
    }
  })

  it('detects the preset from the executable name, longest prefix first', () => {
    expect(detectPreset('C:\\Emu\\pcsx2-qt.exe')).toBe('pcsx2')
    expect(detectPreset('C:\\Emu\\duckstation-qt-x64-ReleaseLTCG.exe')).toBe('duckstation')
    expect(detectPreset('C:\\Emu\\Dolphin.exe')).toBe('dolphin')
    expect(detectPreset('C:\\Emu\\Ryujinx.exe')).toBe('ryubing')
    expect(detectPreset('C:\\Emu\\xemu.exe')).toBe('xemu')
    expect(detectPreset('C:\\Emu\\PPSSPPWindows64.exe')).toBe('ppsspp')
    expect(detectPreset('C:\\Games\\soh.exe')).toBe('custom')
  })

  it('reads the preset back out of a session via', () => {
    expect(presetOfVia('emu:dolphin')).toBe('dolphin')
    expect(presetOfVia('native')).toBeNull()
    expect(presetOfVia('emu:unknown')).toBeNull()
    expect(presetOfVia(null)).toBeNull()
  })
})

describe('buildArgv', () => {
  it('appends the game file when the template has no slot for it', () => {
    expect(buildArgv(['--fullscreen'], ROM, null)).toEqual(['--fullscreen', ROM])
  })

  it('refuses a game file that could be read as an option or is relative', () => {
    expect(() => buildArgv(['{rom}'], '-dvd_path', null)).toThrow(/option-like/)
    expect(() => buildArgv(['{rom}'], 'games/sotc.iso', null)).toThrow(/absolute/)
    expect(() => buildArgv(['{rom}'], 'C:\\a\u0000b.iso', null)).toThrow(/NUL/)
  })

  it('needs a core for RetroArch and validates it the same way', () => {
    expect(() => buildArgv(EMULATOR_PRESETS.retroarch.args, ROM, null)).toThrow(/core/)
    expect(() => buildArgv(EMULATOR_PRESETS.retroarch.args, ROM, '-L')).toThrow(/option-like/)
    expect(buildArgv(EMULATOR_PRESETS.retroarch.args, ROM, 'C:\\RA\\cores\\pcsx2_libretro.dll')).toEqual([
      '-f',
      '-L',
      'C:\\RA\\cores\\pcsx2_libretro.dll',
      ROM
    ])
  })

  it('keeps a game path with spaces and quotes as one element', () => {
    const odd = 'C:\\My Games\\"Quoted" & more.iso'
    expect(buildArgv(['-x', '{rom}'], odd, null)).toEqual(['-x', odd])
  })
})

describe('argument lists', () => {
  it('parses only arrays of short strings', () => {
    expect(parseArgsJson('["-f","{rom}"]')).toEqual(['-f', '{rom}'])
    expect(parseArgsJson('"-f {rom}"')).toBeNull()
    expect(parseArgsJson('[1,2]')).toBeNull()
    expect(parseArgsJson('[]')).toBeNull()
    expect(parseArgsJson('not json')).toBeNull()
    expect(parseArgsJson(null)).toBeNull()
  })

  it('falls back to the preset when the stored list is unusable', () => {
    expect(templateFor('pcsx2', null)).toEqual(EMULATOR_PRESETS.pcsx2.args)
    expect(templateFor('pcsx2', '["-nogui","{rom}"]')).toEqual(['-nogui', '{rom}'])
    expect(templateFor('pcsx2', '{bad')).toEqual(EMULATOR_PRESETS.pcsx2.args)
  })

  it('rejects a list naming the game file twice', () => {
    expect(() => validateArgs(['{rom}', '{rom}'])).toThrow(/once/)
    expect(() => validateArgs('-f {rom}')).toThrow()
    expect(validateArgs(['-f', '{rom}'])).toEqual(['-f', '{rom}'])
  })

  it('keeps only known platforms, once each', () => {
    expect(parsePlatforms('["ps2","ps2","dreamcast","gc"]')).toEqual(['ps2', 'gc'])
    expect(parsePlatforms('oops')).toEqual([])
  })
})

describe('resolveDataDir', () => {
  const env = {
    appData: 'C:\\Users\\me\\AppData\\Roaming',
    localAppData: 'C:\\Users\\me\\AppData\\Local',
    documents: 'C:\\Users\\me\\Documents'
  }

  it('prefers the override, then a portable marker, then the first existing default', () => {
    const exe = 'D:\\Emu\\Dolphin\\Dolphin.exe'
    const rule = EMULATOR_PRESETS.dolphin.dataDir
    expect(resolveDataDir(rule, exe, 'E:\\DolphinUser', env, () => false)).toBe('E:\\DolphinUser')
    expect(resolveDataDir(rule, exe, null, env, (p) => p === 'D:\\Emu\\Dolphin\\portable.txt')).toBe(
      'D:\\Emu\\Dolphin\\User'
    )
    expect(
      resolveDataDir(rule, exe, null, env, (p) => p === 'C:\\Users\\me\\AppData\\Roaming\\Dolphin Emulator')
    ).toBe('C:\\Users\\me\\AppData\\Roaming\\Dolphin Emulator')
    expect(resolveDataDir(rule, exe, null, env, () => false)).toBeNull()
  })

  it('finds Eden in AppData unless a user folder sits beside it', () => {
    const exe = 'D:\\Emu\\Eden\\eden.exe'
    const rule = EMULATOR_PRESETS.eden.dataDir
    expect(resolveDataDir(rule, exe, null, env, (p) => p.endsWith('Roaming\\eden'))).toBe(
      'C:\\Users\\me\\AppData\\Roaming\\eden'
    )
    expect(resolveDataDir(rule, exe, null, env, (p) => p === 'D:\\Emu\\Eden\\user')).toBe('D:\\Emu\\Eden\\user')
  })

  it('skips defaults whose environment folder is unknown', () => {
    const rule = EMULATOR_PRESETS.duckstation.dataDir
    const exe = 'D:\\Emu\\DuckStation\\duckstation-qt.exe'
    const noEnv = { appData: null, localAppData: null, documents: null }
    expect(resolveDataDir(rule, exe, null, noEnv, (p) => !p.endsWith('portable.txt'))).toBeNull()
  })

  it('puts the screenshot folder under the user folder only where the preset knows it', () => {
    expect(resolveScreenshotDir('pcsx2', null, 'C:\\Users\\me\\Documents\\PCSX2')).toBe(
      'C:\\Users\\me\\Documents\\PCSX2\\snaps'
    )
    expect(resolveScreenshotDir('cemu', null, 'C:\\Cemu')).toBeNull()
    expect(resolveScreenshotDir('cemu', 'E:\\Shots', null)).toBe('E:\\Shots')
    expect(resolveScreenshotDir('pcsx2', null, null)).toBeNull()
  })
})

describe('chooseLaunch', () => {
  const roms = [
    { id: 1, preferred: false },
    { id: 2, preferred: true }
  ]

  it('honours an explicit choice', () => {
    expect(chooseLaunch({ kind: 'native' }, 'C:\\g\\soh.exe', roms)).toEqual({ kind: 'native' })
    expect(chooseLaunch({ kind: 'rom', romId: 1 }, null, roms)).toEqual({ kind: 'rom', romId: 1 })
    expect(() => chooseLaunch({ kind: 'native' }, null, roms)).toThrow(/executable/)
    expect(() => chooseLaunch({ kind: 'rom', romId: 9 }, null, roms)).toThrow(/no longer linked/)
  })

  it('defaults to the preferred file, then the executable, then a lone file', () => {
    expect(chooseLaunch(null, 'C:\\g\\soh.exe', roms)).toEqual({ kind: 'rom', romId: 2 })
    expect(chooseLaunch(null, 'C:\\g\\soh.exe', [{ id: 1, preferred: false }])).toEqual({ kind: 'native' })
    expect(chooseLaunch(null, null, [{ id: 1, preferred: false }])).toEqual({ kind: 'rom', romId: 1 })
    expect(() =>
      chooseLaunch(null, null, [
        { id: 1, preferred: false },
        { id: 3, preferred: false }
      ])
    ).toThrow(/choose one/)
    expect(() => chooseLaunch(null, null, [])).toThrow(/Nothing to launch/)
  })

  it('uses the file’s own emulator, else the platform default', () => {
    const defaults = new Map([['ps2', 7]])
    expect(emulatorIdFor({ emulatorId: 3, platform: 'ps2' }, defaults)).toBe(3)
    expect(emulatorIdFor({ emulatorId: null, platform: 'ps2' }, defaults)).toBe(7)
    expect(emulatorIdFor({ emulatorId: null, platform: 'gc' }, defaults)).toBeNull()
  })
})

describe('sessionShots', () => {
  const start = 1_000_000
  const end = 2_000_000
  it('keeps images written during the session and its grace, oldest first', () => {
    const files = [
      { path: 'C:\\s\\b.png', mtimeMs: end + 5_000, size: 10 },
      { path: 'C:\\s\\a.png', mtimeMs: start + 10, size: 10 },
      { path: 'C:\\s\\old.png', mtimeMs: start - 1, size: 10 },
      { path: 'C:\\s\\late.png', mtimeMs: end + 30_000, size: 10 },
      { path: 'C:\\s\\notes.txt', mtimeMs: start + 20, size: 10 },
      { path: 'C:\\s\\empty.png', mtimeMs: start + 30, size: 0 },
      { path: 'C:\\s\\huge.png', mtimeMs: start + 40, size: 999 }
    ]
    expect(sessionShots(files, start, end, 20_000, 100)).toEqual(['C:\\s\\a.png', 'C:\\s\\b.png'])
  })
})

describe('platforms', () => {
  it('maps catalog and tag names to platform keys', () => {
    expect(platformFromName('PlayStation 2')).toBe('ps2')
    expect(platformFromName('Sony Playstation 2')).toBe('ps2')
    expect(platformFromName('playstation-2')).toBe('ps2')
    expect(platformFromName('Nintendo GameCube')).toBe('gc')
    expect(platformFromName('PlayStation')).toBe('ps1')
    expect(platformFromName('PC')).toBeNull()
  })

  it('lists every platform an extension could belong to', () => {
    expect(platformsForExtension('iso')).toEqual(expect.arrayContaining(['gc', 'wii', 'ps2', 'psp']))
    expect(platformsForExtension('.NSP')).toEqual(['switch'])
    expect(platformsForExtension('')).toEqual([])
  })

  it('no two platforms share an alias', () => {
    const seen = new Map<string, string>()
    for (const key of PLATFORM_KEYS) {
      for (const alias of PLATFORMS[key].aliases) {
        const k = alias.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
        expect(seen.get(k) ?? key).toBe(key)
        seen.set(k, key)
      }
    }
  })
})
