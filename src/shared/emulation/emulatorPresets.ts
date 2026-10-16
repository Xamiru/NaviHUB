import type { PlatformKey } from './platforms'

// Built-in launch recipes for the PC emulators people actually use. The keys
// are stored (emulator.preset_key, game_session.via as 'emu:<key>'), so they
// are frozen strings. Argument lists come from each emulator's own argument
// parser (checked 2026-10-16); `verified: false` marks recipes taken from
// community reports, which the Emulators page says so the user knows to
// adjust the arguments if a game does not start.
//
// Argument tokens: '{rom}' is the game file, '{core}' a RetroArch core. Every
// token is one argv element — nothing here ever passes through a shell.
// '--' appears only where the emulator treats it as end-of-options. RPCS3 and
// shadPS4 hand everything after '--' to the emulated game, so the game path
// must never follow one there.

export const PRESET_KEYS = [
  'pcsx2',
  'duckstation',
  'dolphin',
  'cemu',
  'eden',
  'ryubing',
  'azahar',
  'melonds',
  'mgba',
  'ppsspp',
  'rpcs3',
  'shadps4',
  'mesen',
  'ares',
  'rmg',
  'retroarch',
  'xenia',
  'xemu',
  'flycast',
  'custom'
] as const

export type PresetKey = (typeof PRESET_KEYS)[number]

// Where the emulator keeps its user folder. `portable` markers sit beside the
// exe and switch the folder to `dir`; otherwise the first `defaults` entry
// that exists wins. Tokens: {exeDir} {appData} {localAppData} {documents}.
export interface DataDirRule {
  portable: ReadonlyArray<{ marker: string; dir: string }>
  defaults: readonly string[]
}

export interface EmulatorPreset {
  key: PresetKey
  name: string
  // Lowercase prefixes of the executable's file name, for detection.
  exeMatch: readonly string[]
  platforms: readonly PlatformKey[]
  args: readonly string[]
  verified: boolean
  needsCore?: boolean
  dataDir: DataDirRule
  // Screenshot folder relative to the user folder, where the emulator's own
  // source fixes it. Elsewhere the user picks one.
  screenshots?: string
  homepage: string | null
}

const EXE_DIR_ONLY: DataDirRule = { portable: [], defaults: ['{exeDir}'] }

export const EMULATOR_PRESETS: Readonly<Record<PresetKey, EmulatorPreset>> = {
  pcsx2: {
    key: 'pcsx2',
    name: 'PCSX2',
    exeMatch: ['pcsx2'],
    platforms: ['ps2'],
    args: ['-batch', '-fullscreen', '--', '{rom}'],
    verified: true,
    dataDir: {
      portable: [
        { marker: 'portable.txt', dir: '{exeDir}' },
        { marker: 'portable.ini', dir: '{exeDir}' }
      ],
      defaults: ['{documents}/PCSX2']
    },
    screenshots: 'snaps',
    homepage: 'https://pcsx2.net'
  },
  duckstation: {
    key: 'duckstation',
    name: 'DuckStation',
    exeMatch: ['duckstation'],
    platforms: ['ps1'],
    args: ['-batch', '-fullscreen', '--', '{rom}'],
    verified: true,
    dataDir: {
      portable: [{ marker: 'portable.txt', dir: '{exeDir}' }],
      defaults: ['{localAppData}/DuckStation', '{documents}/DuckStation']
    },
    screenshots: 'screenshots',
    homepage: 'https://www.duckstation.org'
  },
  dolphin: {
    key: 'dolphin',
    name: 'Dolphin',
    exeMatch: ['dolphin'],
    platforms: ['gc', 'wii'],
    // -b closes Dolphin when emulation stops, so the session ends with the game.
    args: ['-b', '-C', 'Dolphin.Display.Fullscreen=True', '-e', '{rom}'],
    verified: true,
    dataDir: {
      portable: [{ marker: 'portable.txt', dir: '{exeDir}/User' }],
      defaults: ['{documents}/Dolphin Emulator', '{appData}/Dolphin Emulator']
    },
    screenshots: 'ScreenShots',
    homepage: 'https://dolphin-emu.org'
  },
  cemu: {
    key: 'cemu',
    name: 'Cemu',
    exeMatch: ['cemu'],
    platforms: ['wiiu'],
    args: ['-f', '-g', '{rom}'],
    verified: true,
    dataDir: {
      portable: [{ marker: 'portable', dir: '{exeDir}/portable' }],
      defaults: ['{appData}/Cemu', '{exeDir}']
    },
    homepage: 'https://cemu.info'
  },
  eden: {
    key: 'eden',
    name: 'Eden',
    exeMatch: ['eden'],
    platforms: ['switch'],
    args: ['-f', '-g', '{rom}'],
    verified: true,
    dataDir: {
      portable: [{ marker: 'user', dir: '{exeDir}/user' }],
      defaults: ['{appData}/eden']
    },
    screenshots: 'screenshots',
    homepage: 'https://eden-emu.dev'
  },
  ryubing: {
    key: 'ryubing',
    name: 'Ryubing',
    exeMatch: ['ryujinx', 'ryubing'],
    platforms: ['switch'],
    args: ['--fullscreen', '{rom}'],
    verified: false,
    dataDir: {
      portable: [{ marker: 'portable', dir: '{exeDir}/portable' }],
      defaults: ['{appData}/Ryujinx']
    },
    homepage: null
  },
  azahar: {
    key: 'azahar',
    name: 'Azahar',
    exeMatch: ['azahar'],
    platforms: ['3ds'],
    args: ['-f', '{rom}'],
    verified: true,
    dataDir: {
      portable: [{ marker: 'user', dir: '{exeDir}/user' }],
      defaults: ['{appData}/Azahar']
    },
    homepage: 'https://azahar-emu.org'
  },
  melonds: {
    key: 'melonds',
    name: 'melonDS',
    exeMatch: ['melonds'],
    platforms: ['nds'],
    args: ['-f', '{rom}'],
    verified: true,
    dataDir: EXE_DIR_ONLY,
    homepage: 'https://melonds.kuribo64.net'
  },
  mgba: {
    key: 'mgba',
    name: 'mGBA',
    exeMatch: ['mgba'],
    platforms: ['gb', 'gbc', 'gba'],
    args: ['-f', '{rom}'],
    verified: true,
    dataDir: EXE_DIR_ONLY,
    homepage: 'https://mgba.io'
  },
  ppsspp: {
    key: 'ppsspp',
    name: 'PPSSPP',
    exeMatch: ['ppsspp'],
    platforms: ['psp'],
    args: ['--fullscreen', '{rom}'],
    verified: false,
    dataDir: {
      portable: [
        { marker: 'memstick', dir: '{exeDir}/memstick' },
        { marker: 'installed.txt', dir: '{exeDir}/memstick' }
      ],
      defaults: ['{documents}/PPSSPP']
    },
    homepage: 'https://www.ppsspp.org'
  },
  rpcs3: {
    key: 'rpcs3',
    name: 'RPCS3',
    exeMatch: ['rpcs3'],
    platforms: ['ps3'],
    args: ['--no-gui', '--fullscreen', '{rom}'],
    verified: true,
    dataDir: EXE_DIR_ONLY,
    homepage: 'https://rpcs3.net'
  },
  shadps4: {
    key: 'shadps4',
    name: 'shadPS4',
    exeMatch: ['shadps4'],
    platforms: ['ps4'],
    args: ['-f', 'true', '-g', '{rom}'],
    verified: true,
    dataDir: EXE_DIR_ONLY,
    homepage: 'https://shadps4.net'
  },
  mesen: {
    key: 'mesen',
    name: 'Mesen 2',
    exeMatch: ['mesen'],
    platforms: ['nes', 'snes', 'gb', 'gbc', 'gba', 'sms', 'pce'],
    args: ['--fullscreen', '{rom}'],
    verified: true,
    dataDir: { portable: [], defaults: ['{documents}/Mesen2', '{exeDir}'] },
    homepage: 'https://www.mesen.ca'
  },
  ares: {
    key: 'ares',
    name: 'ares',
    exeMatch: ['ares'],
    platforms: ['nes', 'snes', 'n64', 'gb', 'gbc', 'gba', 'genesis', 'sms', 'pce'],
    args: ['--fullscreen', '{rom}'],
    verified: true,
    dataDir: EXE_DIR_ONLY,
    homepage: 'https://ares-emu.net'
  },
  rmg: {
    key: 'rmg',
    name: "Rosalie's Mupen GUI",
    exeMatch: ['rmg'],
    platforms: ['n64'],
    args: ['-f', '{rom}'],
    verified: true,
    dataDir: EXE_DIR_ONLY,
    homepage: 'https://github.com/Rosalie241/RMG'
  },
  retroarch: {
    key: 'retroarch',
    name: 'RetroArch',
    exeMatch: ['retroarch'],
    platforms: [],
    args: ['-f', '-L', '{core}', '{rom}'],
    verified: true,
    needsCore: true,
    dataDir: EXE_DIR_ONLY,
    homepage: 'https://www.retroarch.com'
  },
  xenia: {
    key: 'xenia',
    name: 'Xenia Canary',
    exeMatch: ['xenia'],
    platforms: ['x360'],
    args: ['--fullscreen=true', '{rom}'],
    verified: false,
    dataDir: EXE_DIR_ONLY,
    homepage: 'https://xenia.jp'
  },
  xemu: {
    key: 'xemu',
    name: 'xemu',
    exeMatch: ['xemu'],
    platforms: ['xbox'],
    args: ['-full-screen', '-dvd_path', '{rom}'],
    verified: false,
    dataDir: EXE_DIR_ONLY,
    homepage: 'https://xemu.app'
  },
  flycast: {
    key: 'flycast',
    name: 'Flycast',
    exeMatch: ['flycast'],
    platforms: ['dc'],
    args: ['{rom}'],
    verified: false,
    dataDir: EXE_DIR_ONLY,
    homepage: 'https://github.com/flyinghead/flycast'
  },
  custom: {
    key: 'custom',
    name: 'Other emulator',
    exeMatch: [],
    platforms: [],
    args: ['{rom}'],
    verified: false,
    dataDir: EXE_DIR_ONLY,
    homepage: null
  }
}

export function isPresetKey(value: unknown): value is PresetKey {
  return typeof value === 'string' && (PRESET_KEYS as readonly string[]).includes(value)
}

// The preset an executable belongs to, by its file name; 'custom' when none
// matches. Longest prefix wins so 'xemu' never reads as another emulator.
export function detectPreset(exePath: string): PresetKey {
  const base = (exePath.split(/[\\/]/).pop() ?? '').toLowerCase()
  let best: { key: PresetKey; len: number } | null = null
  for (const key of PRESET_KEYS) {
    for (const prefix of EMULATOR_PRESETS[key].exeMatch) {
      if (base.startsWith(prefix) && (!best || prefix.length > best.len)) {
        best = { key, len: prefix.length }
      }
    }
  }
  return best?.key ?? 'custom'
}

// 'emu:pcsx2' → 'pcsx2'; null for 'native' and history rows.
export function presetOfVia(via: string | null | undefined): PresetKey | null {
  if (!via?.startsWith('emu:')) return null
  const key = via.slice(4)
  return isPresetKey(key) ? key : null
}
