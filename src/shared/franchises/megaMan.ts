// Mega Man — classic 1-11, X 1-8, Zero 1-4, ZX, Legends 1-2, and Battle
// Network 1 (the only Battle Network row, per the task brief — the other
// five numbered entries are not included, only folded in as Legacy
// Collection aliases on this one). Each sub-series' many enhanced
// re-releases fold into one row via its Legacy Collection bundle, the same
// one-Steam-id-per-bundle approach used elsewhere on this page: Mega Man
// Legacy Collection (1-6) sits on the first game, Legacy Collection 2 (7-10)
// sits on 7, X Legacy Collection (X1-4) sits on X1, X Legacy Collection 2
// (X5-8) sits on X5, and Zero/ZX Legacy Collection (Zero 1-4, ZX, ZX Advent)
// sits on Zero 1. Mega Man 11 and Battle Network 1 are not bundled and keep
// their own ids. Mega Man Legends never released on PC/Steam under any
// bundle. The Western 1990s cartoon is excluded (not on AniList); the one
// Japanese anime in scope, Mega Man: Upon a Star, uses the date of its AniList entry.
// Chrono follows the task's "classic -> X -> Zero -> ZX -> Legends" order,
// which is also long-standing Capcom-endorsed Mega Man lore: all five
// sub-series share one distant-future timeline, each game placed after the
// last in both release and story order within its own sub-series (none of
// Street Fighter or Devil May Cry's release-vs-story reordering applies
// here). Battle Network is a separate "cyber world" continuity with human
// NetNavi operators instead of robots and carries no chrono, like the
// anime (an original, non-canon side story).
// Dates verified against Wikipedia infoboxes, 2026-10-05 (citing Capcom's
// own MM25: Mega Man & Mega Man X Official Complete Works for the classic
// and X games); Steam ids via the Steam store API, AniList id via AniList,
// the same day. Hero art is the Mega Man 11 Steam library hero; character
// portraits are Wikipedia/Wikimedia fair-use renders. Mega Man has very
// little individual character art on Wikipedia outside Mega Man, X, Zero and
// Sigma — Bass uses the Mega Man & Bass box art, the only reliable source
// found for him.

import type { FranchiseCfg } from './types'

export const MEGA_MAN: FranchiseCfg = {
  id: 'mega-man',
  name: 'Mega Man',
  short: 'Mega Man',
  color: '#1f5fbf',
  heroUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/742300/library_hero.jpg',
  studio: 'Capcom',
  tagline: 'Steal the boss\'s weapon, beat the next boss with it — a formula forty years old and still working.',
  trivia: [
    {
      title: 'The weapon-stealing loop',
      body: 'Mega Man (1987) let players tackle its Robot Master stages in any order and keep the defeated boss\'s weapon, turning stage order into a puzzle: nearly every boss has a specific weakness among the others\' arsenals. That single idea has carried the classic series, X, and Zero across more than twenty games without needing to change.'
    },
    {
      title: 'Three reinventions, one timeline',
      body: 'Mega Man X (1993) moved the fight a hundred years forward to Reploids, sentient robots capable of free will, and the dilemma of telling a rebel from a true threat. Mega Man Zero (2002) jumped a century further into a resistance story under human-Reploid persecution, and ZX (2006) opened the format into an explorable world. Capcom has treated all of it as one long future history — Classic leads to X leads to Zero leads to ZX leads, eventually, to Mega Man Legends\'s buried-ruins setting.'
    },
    {
      title: 'A parallel world with a human face',
      body: 'Mega Man Battle Network (2001) swapped robots and future Earth for a present-day "net society" where kids like Lan Hikari battle through the internet alongside NetNavi partners styled after the classic cast\'s names (Lan\'s navi MegaMan.EXE, among them). It is explicitly a separate continuity from the Classic/X/Zero/ZX/Legends timeline, not a future or past chapter of it.'
    }
  ],
  entries: [
    { id: 'mm-1', title: 'Mega Man', aliases: ['Mega Man Legacy Collection', 'Rockman'], externalIds: [{ source: 'steam', id: '363440' }], year: 1987, releaseDate: '1987-12-17', chrono: 1, note: 'Six — later eight — Robot Masters, and the weapon-stealing loop that defines the series (Legacy Collection also bundles 2-6)' },
    { id: 'mm-2', title: 'Mega Man 2', year: 1988, releaseDate: '1988-12-24', chrono: 2, note: 'Often cited as the series peak: Metal Man, Air Man, and the Metal Blade' },
    { id: 'mm-3', title: 'Mega Man 3', year: 1990, releaseDate: '1990-09-28', chrono: 3, note: 'Introduces Rush and the rival-turned-ally Proto Man' },
    { id: 'mm-4', title: 'Mega Man 4', year: 1991, releaseDate: '1991-12-06', chrono: 4, note: 'The Charge Shot becomes a permanent series fixture' },
    { id: 'mm-5', title: 'Mega Man 5', year: 1992, releaseDate: '1992-12-04', chrono: 5, note: 'Proto Man\'s apparent betrayal, and Beat the bird support unit' },
    { id: 'mm-6', title: 'Mega Man 6', year: 1993, releaseDate: '1993-11-05', chrono: 6, note: 'The last NES entry; Mr. X and the Rush Power Adapters' },
    { id: 'mm-x1', title: 'Mega Man X', aliases: ['Mega Man X Legacy Collection', 'Rockman X'], externalIds: [{ source: 'steam', id: '743890' }], year: 1993, releaseDate: '1993-12-17', chrono: 12, note: 'A century later: X and Zero face the Maverick uprising led by Sigma (X Legacy Collection also bundles X2-4)' },
    { id: 'mm-x2', title: 'Mega Man X2', year: 1994, releaseDate: '1994-12-16', chrono: 13, note: 'The X-Hunters and the return of Zero\'s remains as a plot device' },
    { id: 'mm-7', title: 'Mega Man 7', aliases: ['Mega Man Legacy Collection 2'], externalIds: [{ source: 'steam', id: '495050' }], year: 1995, releaseDate: '1995-03-24', chrono: 7, note: 'The 16-bit classic entry; Mega Man meets Bass for the first time (Legacy Collection 2 also bundles 8-10)' },
    { id: 'mm-x3', title: 'Mega Man X3', year: 1995, releaseDate: '1995-12-01', chrono: 14, note: 'Doppler\'s rebellion and the first playable Zero sections' },
    { id: 'mm-8', title: 'Mega Man 8', year: 1996, releaseDate: '1996-12-17', chrono: 8, note: 'Full voice acting and anime cutscenes on the PlayStation/Saturn' },
    { id: 'mm-x4', title: 'Mega Man X4', year: 1997, releaseDate: '1997-08-01', chrono: 15, note: 'Zero becomes fully playable; the Repliforce civil war' },
    { id: 'mm-legends1', title: 'Mega Man Legends', aliases: ['Rockman DASH'], year: 1997, releaseDate: '1997-12-18', chrono: 25, note: '3D adventure in the ruin-diving far future, as Mega Man Volnutt' },
    { id: 'mm-legends2', title: 'Mega Man Legends 2', aliases: ['Rockman DASH 2'], year: 2000, releaseDate: '2000-04-20', chrono: 26, note: 'Volnutt and Roll Caskett chase the Mother Lode treasure' },
    { id: 'mm-x5', title: 'Mega Man X5', aliases: ['Mega Man X Legacy Collection 2'], externalIds: [{ source: 'steam', id: '743900' }], year: 2000, releaseDate: '2000-11-30', chrono: 16, note: 'Originally planned as the X series finale; Zero\'s infection by the Sigma Virus (X Legacy Collection 2 also bundles X6-8)' },
    { id: 'mm-bn1', title: 'Mega Man Battle Network', aliases: ['Battle Network Rockman.EXE', 'Mega Man Battle Network Legacy Collection Vol. 1'], externalIds: [{ source: 'steam', id: '1798010' }], year: 2001, releaseDate: '2001-03-21', spinOff: true, note: 'Separate "net society" continuity: Lan Hikari and his NetNavi, MegaMan.EXE' },
    { id: 'mm-x6', title: 'Mega Man X6', year: 2001, releaseDate: '2001-11-29', chrono: 17, note: 'X alone confronts the Zero Nightmare phenomenon' },
    { id: 'mm-zero1', title: 'Mega Man Zero', aliases: ['Mega Man Zero/ZX Legacy Collection', 'Rockman Zero'], externalIds: [{ source: 'steam', id: '999020' }], year: 2002, releaseDate: '2002-04-26', chrono: 20, note: 'A century after X6: Zero wakes into a Reploid resistance movement under human persecution (Legacy Collection also bundles Zero 2-4, ZX and ZX Advent)' },
    { id: 'mm-anime', title: 'Mega Man: Upon a Star', mediaType: 'anime', aliases: ['Rockman: Hoshi ni Negai wo'], externalIds: [{ source: 'anilist', id: '1854' }], year: 2002, releaseDate: '2002-09-20', adaptation: true, note: 'Three-episode OVA in which Mega Man and his friends tour Japan' },
    { id: 'mm-zero2', title: 'Mega Man Zero 2', year: 2003, releaseDate: '2003-05-02', chrono: 21, note: 'Zero joins the Resistance properly and faces Elpizo' },
    { id: 'mm-x7', title: 'Mega Man X7', year: 2003, releaseDate: '2003-07-17', chrono: 18, note: 'Introduces Axl and a 3D/2D hybrid presentation' },
    { id: 'mm-zero3', title: 'Mega Man Zero 3', year: 2004, releaseDate: '2004-04-23', chrono: 22, note: 'Copy X\'s fall and the return of a familiar enemy, Omega' },
    { id: 'mm-x8', title: 'Mega Man X8', year: 2004, releaseDate: '2004-12-07', chrono: 19, note: 'X, Zero and Axl together against a new Sigma scheme on the moon' },
    { id: 'mm-zero4', title: 'Mega Man Zero 4', year: 2005, releaseDate: '2005-04-21', chrono: 23, note: 'Series finale: Zero\'s last stand against Dr. Weil\'s Ragnarok' },
    { id: 'mm-zx', title: 'Mega Man ZX', year: 2006, releaseDate: '2006-07-06', chrono: 24, note: 'Generations later: Vent or Aile merge with Biometal to become Model Zero or Model X' },
    { id: 'mm-9', title: 'Mega Man 9', year: 2008, releaseDate: '2008-09-22', chrono: 9, note: 'Deliberate throwback to NES-era graphics and difficulty' },
    { id: 'mm-10', title: 'Mega Man 10', year: 2010, releaseDate: '2010-03-01', chrono: 10, note: 'Roll becomes playable for the first time in the mainline series' },
    { id: 'mm-11', title: 'Mega Man 11', externalIds: [{ source: 'steam', id: '742300' }], year: 2018, releaseDate: '2018-10-02', chrono: 11, note: 'First HD mainline entry, introducing the Double Gear system' }
  ],
  characters: [
    {
      id: 'mm-megaman',
      name: 'Mega Man',
      role: 'Robot hero, built to fight',
      portraitUrl: 'https://upload.wikimedia.org/wikipedia/en/7/7e/Mega_Man_11_Artwork.png',
      appearsIn: ['mm-1', 'mm-2', 'mm-3', 'mm-4', 'mm-5', 'mm-6', 'mm-7', 'mm-8', 'mm-9', 'mm-10', 'mm-11'],
      blurb: 'Originally a lab assistant robot named Rock, rebuilt into a fighter when Dr. Wily turned his fellow robots against the world. Copies every weapon he defeats.'
    },
    {
      id: 'mm-x',
      name: 'X',
      role: 'The first Reploid capable of free will',
      portraitUrl: 'https://upload.wikimedia.org/wikipedia/en/7/73/MegamanXcharacter.png',
      appearsIn: ['mm-x1', 'mm-x2', 'mm-x3', 'mm-x4', 'mm-x5', 'mm-x6', 'mm-x7', 'mm-x8'],
      blurb: 'Built by Dr. Light and sealed away for decades until his capacity for independent judgment could be trusted. A century after the original Mega Man, he inherits the fight against machines gone rogue.'
    },
    {
      id: 'mm-zero',
      name: 'Zero',
      role: 'Reploid warrior with a dark past',
      portraitUrl: 'https://upload.wikimedia.org/wikipedia/en/8/8d/Zero-mmx.png',
      appearsIn: ['mm-x1', 'mm-x2', 'mm-x3', 'mm-x4', 'mm-x5', 'mm-x6', 'mm-x7', 'mm-x8', 'mm-zero1', 'mm-zero2', 'mm-zero3', 'mm-zero4'],
      blurb: 'X\'s red-clad partner, built by Dr. Wily, who carries a buried connection to the Maverick Virus and eventually headlines his own series a century later.'
    },
    {
      id: 'mm-sigma',
      name: 'Sigma',
      role: 'Fallen Maverick Hunter commander',
      portraitUrl: 'https://upload.wikimedia.org/wikipedia/en/1/19/Mega_Man_X_Sigma.png',
      appearsIn: ['mm-x1', 'mm-x2', 'mm-x3', 'mm-x5', 'mm-x6', 'mm-x8'],
      blurb: 'Once the leader of the Maverick Hunters, infected and turned into the X series\' recurring final boss, returning in body after body across nearly every game.'
    },
    {
      id: 'mm-bass',
      name: 'Bass',
      role: 'Dr. Wily\'s rival creation',
      portraitUrl: 'https://upload.wikimedia.org/wikipedia/en/0/08/Mmandbass.jpg',
      appearsIn: ['mm-7', 'mm-8'],
      blurb: 'Built by Wily specifically to out-fight Mega Man, with his wolf companion Treble. Headlined his own game, Mega Man & Bass, as a playable alternative to the hero.'
    }
  ]
}
