// The consoles NaviHUB can launch through an emulator. The keys are stored
// (game_rom.platform, emulator.platforms, emulator_default.platform,
// game_session.platform), so they are frozen strings: relabel, never rename.

export const PLATFORM_KEYS = [
  'nes',
  'snes',
  'n64',
  'gb',
  'gbc',
  'gba',
  'nds',
  '3ds',
  'gc',
  'wii',
  'wiiu',
  'switch',
  'ps1',
  'ps2',
  'ps3',
  'psp',
  'vita',
  'ps4',
  'genesis',
  'sms',
  'saturn',
  'dc',
  'xbox',
  'x360',
  'arcade',
  'pce'
] as const

export type PlatformKey = (typeof PLATFORM_KEYS)[number]

export interface PlatformInfo {
  key: PlatformKey
  label: string
  short: string
  // Lowercase file extensions without the dot. An extension several consoles
  // share (iso, chd, bin, cue) is listed under each; the file's own header or
  // the game's platform tag decides.
  extensions: readonly string[]
  // Names the platform goes by in imported tags and catalogs (LaunchBox after
  // platformLabel, RAWG slugs), compared after normaliseName.
  aliases: readonly string[]
}

export const PLATFORMS: Readonly<Record<PlatformKey, PlatformInfo>> = {
  nes: {
    key: 'nes',
    label: 'Nintendo Entertainment System',
    short: 'NES',
    extensions: ['nes', 'fds', 'unf'],
    aliases: ['nes', 'nintendo entertainment system', 'famicom', 'nintendo famicom disk system']
  },
  snes: {
    key: 'snes',
    label: 'Super Nintendo',
    short: 'SNES',
    extensions: ['sfc', 'smc'],
    aliases: ['snes', 'super nintendo', 'super nintendo entertainment system', 'super famicom']
  },
  n64: {
    key: 'n64',
    label: 'Nintendo 64',
    short: 'N64',
    extensions: ['z64', 'n64', 'v64'],
    aliases: ['n64', 'nintendo 64']
  },
  gb: {
    key: 'gb',
    label: 'Game Boy',
    short: 'GB',
    extensions: ['gb'],
    aliases: ['game boy', 'nintendo game boy', 'gameboy']
  },
  gbc: {
    key: 'gbc',
    label: 'Game Boy Color',
    short: 'GBC',
    extensions: ['gbc'],
    aliases: ['game boy color', 'nintendo game boy color', 'gameboy color']
  },
  gba: {
    key: 'gba',
    label: 'Game Boy Advance',
    short: 'GBA',
    extensions: ['gba'],
    aliases: ['game boy advance', 'nintendo game boy advance', 'gameboy advance']
  },
  nds: {
    key: 'nds',
    label: 'Nintendo DS',
    short: 'DS',
    extensions: ['nds', 'dsi'],
    aliases: ['nintendo ds', 'ds', 'nintendo dsi']
  },
  '3ds': {
    key: '3ds',
    label: 'Nintendo 3DS',
    short: '3DS',
    extensions: ['3ds', 'cci', 'cia', 'cxi', '3dsx', 'z3ds', 'zcci', 'zcia', 'zcxi'],
    aliases: ['nintendo 3ds', '3ds', 'new nintendo 3ds']
  },
  gc: {
    key: 'gc',
    label: 'GameCube',
    short: 'GC',
    extensions: ['gcm', 'gcz', 'iso', 'rvz', 'ciso', 'dol'],
    aliases: ['gamecube', 'nintendo gamecube', 'gc']
  },
  wii: {
    key: 'wii',
    label: 'Wii',
    short: 'Wii',
    extensions: ['wbfs', 'wad', 'iso', 'rvz', 'ciso', 'wia'],
    aliases: ['wii', 'nintendo wii']
  },
  wiiu: {
    key: 'wiiu',
    label: 'Wii U',
    short: 'Wii U',
    extensions: ['wua', 'wud', 'wux', 'rpx'],
    aliases: ['wii u', 'nintendo wii u', 'wiiu']
  },
  switch: {
    key: 'switch',
    label: 'Nintendo Switch',
    short: 'Switch',
    extensions: ['nsp', 'xci', 'nsz', 'xcz'],
    aliases: ['nintendo switch', 'switch', 'nintendo switch 2']
  },
  ps1: {
    key: 'ps1',
    label: 'PlayStation',
    short: 'PS1',
    extensions: ['cue', 'bin', 'chd', 'pbp', 'm3u', 'ecm', 'img', 'iso'],
    aliases: ['playstation', 'sony playstation', 'ps1', 'psx', 'playstation 1']
  },
  ps2: {
    key: 'ps2',
    label: 'PlayStation 2',
    short: 'PS2',
    extensions: ['iso', 'chd', 'cso', 'zso', 'gz', 'bin', 'cue', 'mdf', 'nrg', 'elf'],
    aliases: ['playstation 2', 'sony playstation 2', 'ps2']
  },
  ps3: {
    key: 'ps3',
    label: 'PlayStation 3',
    short: 'PS3',
    extensions: ['bin', 'self', 'elf', 'iso'],
    aliases: ['playstation 3', 'sony playstation 3', 'ps3']
  },
  psp: {
    key: 'psp',
    label: 'PlayStation Portable',
    short: 'PSP',
    extensions: ['iso', 'cso', 'pbp', 'chd', 'elf'],
    aliases: ['psp', 'sony psp', 'playstation portable']
  },
  vita: {
    key: 'vita',
    label: 'PlayStation Vita',
    short: 'Vita',
    extensions: ['vpk'],
    aliases: ['playstation vita', 'sony playstation vita', 'ps vita', 'vita']
  },
  ps4: {
    key: 'ps4',
    label: 'PlayStation 4',
    short: 'PS4',
    extensions: ['bin', 'elf'],
    aliases: ['playstation 4', 'sony playstation 4', 'ps4']
  },
  genesis: {
    key: 'genesis',
    label: 'Sega Genesis / Mega Drive',
    short: 'Genesis',
    extensions: ['md', 'gen', 'smd', 'bin', '32x'],
    aliases: ['sega genesis', 'genesis', 'mega drive', 'sega mega drive', 'sega 32x', 'sega cd']
  },
  sms: {
    key: 'sms',
    label: 'Sega Master System',
    short: 'SMS',
    extensions: ['sms', 'gg'],
    aliases: ['sega master system', 'master system', 'sega game gear', 'game gear']
  },
  saturn: {
    key: 'saturn',
    label: 'Sega Saturn',
    short: 'Saturn',
    extensions: ['cue', 'chd', 'iso', 'mds', 'ccd'],
    aliases: ['sega saturn', 'saturn']
  },
  dc: {
    key: 'dc',
    label: 'Dreamcast',
    short: 'DC',
    extensions: ['gdi', 'cdi', 'chd', 'cue'],
    aliases: ['sega dreamcast', 'dreamcast']
  },
  xbox: {
    key: 'xbox',
    label: 'Xbox',
    short: 'Xbox',
    extensions: ['iso', 'xiso'],
    aliases: ['xbox', 'microsoft xbox']
  },
  x360: {
    key: 'x360',
    label: 'Xbox 360',
    short: 'X360',
    extensions: ['iso', 'xex', 'zar', 'god'],
    aliases: ['xbox 360', 'microsoft xbox 360']
  },
  arcade: {
    key: 'arcade',
    label: 'Arcade',
    short: 'Arcade',
    extensions: ['zip', '7z'],
    aliases: ['arcade', 'neo geo', 'snk neo geo aes', 'snk neo geo mvs']
  },
  pce: {
    key: 'pce',
    label: 'TurboGrafx-16 / PC Engine',
    short: 'PCE',
    extensions: ['pce', 'sgx'],
    aliases: ['turbografx 16', 'nec turbografx 16', 'pc engine', 'nec pc engine']
  }
}

export function isPlatformKey(value: unknown): value is PlatformKey {
  return typeof value === 'string' && (PLATFORM_KEYS as readonly string[]).includes(value)
}

// "Sony Playstation 2" / "playstation-2" / "PlayStation 2" → "playstation 2".
export function normaliseName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

const ALIAS_INDEX: ReadonlyMap<string, PlatformKey> = new Map(
  PLATFORM_KEYS.flatMap((key) => [
    [normaliseName(key), key] as const,
    ...PLATFORMS[key].aliases.map((alias) => [normaliseName(alias), key] as const)
  ])
)

// A platform tag or catalog name → our key, or null for PC and the consoles
// NaviHUB does not launch.
export function platformFromName(name: string): PlatformKey | null {
  return ALIAS_INDEX.get(normaliseName(name)) ?? null
}

export function fileExtension(path: string): string {
  const base = path.split(/[\\/]/).pop() ?? ''
  const dot = base.lastIndexOf('.')
  return dot > 0 ? base.slice(dot + 1).toLowerCase() : ''
}

// Every platform a file's extension could belong to, in PLATFORM_KEYS order.
export function platformsForExtension(ext: string): PlatformKey[] {
  const e = ext.toLowerCase().replace(/^\./, '')
  if (!e) return []
  return PLATFORM_KEYS.filter((key) => PLATFORMS[key].extensions.includes(e))
}

// Every extension any platform uses — the game-file picker's filter.
export const ALL_GAME_EXTENSIONS: readonly string[] = [
  ...new Set(PLATFORM_KEYS.flatMap((key) => PLATFORMS[key].extensions))
].sort()
