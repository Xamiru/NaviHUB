import type { PlatformKey } from './platforms'

// Fan-made native PC ports built from decompilations and static
// recompilations, matched against library titles so a game's Playtime tab can
// say "this has a native PC port". Each one needs the player's own copy of the
// original game. Ids are frozen (curated-overlay posture); entries come from
// the readonlymemo.com port list and each project's README (2026-10-16).

export interface NativePort {
  id: string
  name: string
  // Library titles it plays, compared with portTitleKey.
  titles: readonly string[]
  platform: PlatformKey
  homepage: string
  // The Windows program to link once installed; null where the project does not name it.
  exeName: string | null
  needs: string
}

export const NATIVE_PORTS: readonly NativePort[] = [
  {
    id: 'ship-of-harkinian',
    name: 'Ship of Harkinian',
    titles: ['The Legend of Zelda: Ocarina of Time'],
    platform: 'n64',
    homepage: 'https://github.com/HarbourMasters/Shipwright',
    exeName: 'soh.exe',
    needs: 'A supported Ocarina of Time N64 ROM, converted on first launch.'
  },
  {
    id: '2-ship-2-harkinian',
    name: '2 Ship 2 Harkinian',
    titles: ["The Legend of Zelda: Majora's Mask"],
    platform: 'n64',
    homepage: 'https://github.com/HarbourMasters/2ship2harkinian',
    exeName: '2ship.exe',
    needs: "A US Majora's Mask N64 ROM, converted on first launch."
  },
  {
    id: 'zelda64-recomp',
    name: 'Zelda 64: Recompiled',
    titles: ["The Legend of Zelda: Majora's Mask"],
    platform: 'n64',
    homepage: 'https://github.com/Zelda64Recomp/Zelda64Recomp',
    exeName: null,
    needs: "A US Majora's Mask N64 ROM, chosen in its main menu."
  },
  {
    id: 'zelda3',
    name: 'zelda3',
    titles: ['The Legend of Zelda: A Link to the Past'],
    platform: 'snes',
    homepage: 'https://github.com/snesrev/zelda3',
    exeName: 'zelda3.exe',
    needs: 'The US SNES ROM; the project is built from source.'
  },
  {
    id: 'dusklight',
    name: 'Dusklight',
    titles: ['The Legend of Zelda: Twilight Princess'],
    platform: 'gc',
    homepage: 'https://github.com/TwilitRealm/dusklight',
    exeName: null,
    needs: 'A GameCube or Wii disc image (.iso or .rvz).'
  },
  {
    id: 'opengoal-jak1',
    name: 'OpenGOAL',
    titles: ['Jak and Daxter: The Precursor Legacy'],
    platform: 'ps2',
    homepage: 'https://opengoal.dev',
    exeName: null,
    needs: 'A disc image of the PS2 game, imported by the OpenGOAL launcher.'
  },
  {
    id: 'opengoal-jak2',
    name: 'OpenGOAL',
    titles: ['Jak II', 'Jak 2', 'Jak II: Renegade'],
    platform: 'ps2',
    homepage: 'https://opengoal.dev',
    exeName: null,
    needs: 'A disc image of the PS2 game, imported by the OpenGOAL launcher.'
  },
  {
    id: 'opengoal-jak3',
    name: 'OpenGOAL',
    titles: ['Jak 3'],
    platform: 'ps2',
    homepage: 'https://opengoal.dev',
    exeName: null,
    needs: 'A disc image of the PS2 game, imported by the OpenGOAL launcher.'
  },
  {
    id: 'ghostship',
    name: 'Ghostship',
    titles: ['Super Mario 64'],
    platform: 'n64',
    homepage: 'https://github.com/HarbourMasters/Ghostship',
    exeName: 'Ghostship.exe',
    needs: 'A US or Japanese Super Mario 64 ROM.'
  },
  {
    id: 'spaghettikart',
    name: 'SpaghettiKart',
    titles: ['Mario Kart 64'],
    platform: 'n64',
    homepage: 'https://github.com/HarbourMasters/SpaghettiKart',
    exeName: 'Spaghettify.exe',
    needs: 'The US Mario Kart 64 ROM.'
  },
  {
    id: 'perfect-dark-port',
    name: 'Perfect Dark PC port',
    titles: ['Perfect Dark'],
    platform: 'n64',
    homepage: 'https://github.com/fgsfdsfgs/perfect_dark',
    exeName: 'pd.x86_64.exe',
    needs: 'The NTSC final Perfect Dark ROM in its data folder.'
  },
  {
    id: 'starship',
    name: 'Starship',
    titles: ['Star Fox 64', 'Lylat Wars'],
    platform: 'n64',
    homepage: 'https://github.com/HarbourMasters/Starship',
    exeName: 'starship.exe',
    needs: 'A US Star Fox 64 ROM (1.0 or 1.1).'
  },
  {
    id: 'banjo-recomp',
    name: 'Banjo: Recompiled',
    titles: ['Banjo-Kazooie'],
    platform: 'n64',
    homepage: 'https://github.com/BanjoRecomp/BanjoRecomp',
    exeName: null,
    needs: 'The US 1.0 Banjo-Kazooie ROM, chosen in its main menu.'
  }
]

// Lower case, letters and digits only, the word "the" dropped, so "Legend of
// Zelda, The: Ocarina of Time" and "The Legend of Zelda - Ocarina of Time" agree.
export function portTitleKey(title: string): string {
  return title
    .normalize('NFKC')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .split(/[^\p{L}\p{N}]+/u)
    .filter((w) => w && w !== 'the')
    .join('')
}

const BY_TITLE: ReadonlyMap<string, NativePort[]> = (() => {
  const map = new Map<string, NativePort[]>()
  for (const port of NATIVE_PORTS) {
    for (const title of port.titles) {
      const key = portTitleKey(title)
      map.set(key, [...(map.get(key) ?? []), port])
    }
  }
  return map
})()

export function portsForTitle(title: string): NativePort[] {
  return BY_TITLE.get(portTitleKey(title)) ?? []
}

// Whether a linked executable is this port's own program.
export function isPortExe(port: NativePort, exePath: string | null): boolean {
  if (!exePath || !port.exeName) return false
  const base = exePath.split(/[\\/]/).pop()?.toLowerCase() ?? ''
  return base === port.exeName.toLowerCase()
}
