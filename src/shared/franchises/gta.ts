// Grand Theft Auto — curated canon. Every mainline entry across the three
// "universes" (2D / 3D / HD) plus the story spin-offs (LCS, VCS, Episodes
// from Liberty City, Chinatown Wars); GTA Online, London 1969 and the GBA
// port are excluded. Story order = in-universe year (the universes never
// cross, so this is a flat calendar): GTA1 -> GTA2 -> VCS 1984 -> VC 1986 ->
// SA 1992 -> LCS 1998 -> III 2001 -> IV 2008 -> EFLC 2008 -> CW 2009 ->
// V 2013 -> VI. Steam re-listed III/VC/SA as "The Definitive Edition" and V
// as "Enhanced" — every id era is included.
// All art URLs curl-verified 2026-08-15.

import type { FranchiseCfg } from './types'

export const GTA: FranchiseCfg = {
  id: 'gta',
  name: 'Grand Theft Auto',
  short: 'GTA',
  color: '#e0a83a',
  heroUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/271590/library_hero.jpg',
  studio: 'Rockstar Games (DMA Design, then Rockstar North)',
  tagline: 'America, satirised one stolen car at a time.',
  trivia: [
    {
      title: 'Race\'n\'Chase',
      body: 'The 1997 original began life at DMA Design in Dundee as "Race\'n\'Chase", a top-down cops-and-robbers game that testers only enjoyed once a bug made the police cars ram players. The chaos was promoted to the point of the game.\n\nGTA III (2001) then moved the whole idea into 3D and effectively invented the modern open-world game — the template every "GTA clone" of the 2000s copied.'
    },
    {
      title: 'Three universes',
      body: 'Rockstar treats the 2D era, the 3D era (III / VC / SA and their handheld stories) and the HD era (IV onward) as separate continuities that share city names and brands but no people. Liberty City has been rebuilt three times, each version a different reading of New York.'
    },
    {
      title: 'The long fifth',
      body: 'GTA V (2013) shipped on the PS3, then the PS4, then the PC, then the PS5 — and stayed among the ten best-selling games on Earth for over a decade, largely on GTA Online\'s back. It is why VI has taken thirteen years.'
    }
  ],
  entries: [
    { id: 'gta-1', title: 'Grand Theft Auto', aliases: ['Grand Theft Auto (1997)'], year: 1997, chrono: 1, bgUrl: 'https://static.wikia.nocookie.net/gtawiki/images/d/d5/Poster-GTA1-Original.jpg', note: 'Top-down Liberty City, Vice City, San Andreas — all three' },
    { id: 'gta-2', title: 'Grand Theft Auto 2', year: 1999, chrono: 2, mc: 70, bgUrl: 'https://static.wikia.nocookie.net/gtawiki/images/b/b7/Artwork-AnywhereCity-GTA2.jpg', note: '"Three weeks into the future"' },
    { id: 'gta-3', title: 'Grand Theft Auto III', aliases: ['Grand Theft Auto III - The Definitive Edition'], externalIds: [{ source: 'steam', id: '12100' }, { source: 'steam', id: '1546970' }], year: 2001, chrono: 7, mc: 97, bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1546970/library_hero.jpg', note: 'The open world, invented' },
    { id: 'gta-vice-city', title: 'Grand Theft Auto: Vice City', aliases: ['Grand Theft Auto: Vice City - The Definitive Edition'], externalIds: [{ source: 'steam', id: '12110' }, { source: 'steam', id: '1546990' }], year: 2002, chrono: 4, mc: 95, bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1546990/library_hero.jpg', note: '1986, neon, Tommy Vercetti' },
    { id: 'gta-san-andreas', title: 'Grand Theft Auto: San Andreas', aliases: ['Grand Theft Auto: San Andreas - The Definitive Edition'], externalIds: [{ source: 'steam', id: '12120' }, { source: 'steam', id: '1547000' }], year: 2004, chrono: 5, mc: 95, bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1547000/library_hero.jpg', note: '1992 — three cities, one state' },
    { id: 'gta-lcs', title: 'Grand Theft Auto: Liberty City Stories', year: 2005, chrono: 6, mc: 88, spinOff: true, bgUrl: 'https://static.wikia.nocookie.net/gtawiki/images/0/02/Screenshots-GTALCS-PSP-Latest-16.jpg', note: 'PSP — Toni Cipriani, 1998' },
    { id: 'gta-vcs', title: 'Grand Theft Auto: Vice City Stories', year: 2006, chrono: 3, mc: 86, spinOff: true, bgUrl: 'https://static.wikia.nocookie.net/gtawiki/images/e/ee/SplashScreen-GTAVCS-Splash.jpg', note: 'PSP — 1984, before Tommy' },
    { id: 'gta-4', title: 'Grand Theft Auto IV', aliases: ['Grand Theft Auto IV: The Complete Edition'], externalIds: [{ source: 'steam', id: '12210' }], year: 2008, chrono: 8, mc: 98, bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/12210/library_hero.jpg', note: 'The HD era begins — Niko Bellic' },
    { id: 'gta-chinatown-wars', title: 'Grand Theft Auto: Chinatown Wars', year: 2009, releaseDate: '2009-03-17', chrono: 10, mc: 93, spinOff: true, bgUrl: 'https://static.wikia.nocookie.net/gtawiki/images/f/f4/GTAChinatownWars-Wallpapers-Jaoming.jpg', note: 'DS — top-down returns, brilliantly' },
    { id: 'gta-eflc', title: 'Grand Theft Auto: Episodes from Liberty City', aliases: ['Grand Theft Auto IV: The Lost and Damned', 'Grand Theft Auto: The Ballad of Gay Tony'], externalIds: [{ source: 'steam', id: '12220' }], year: 2009, releaseDate: '2009-10-29', chrono: 9, mc: 89, spinOff: true, bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/12220/library_hero.jpg', note: 'The Lost and Damned + The Ballad of Gay Tony' },
    { id: 'gta-5', title: 'Grand Theft Auto V', aliases: ['Grand Theft Auto V Legacy', 'Grand Theft Auto V Enhanced'], externalIds: [{ source: 'steam', id: '271590' }, { source: 'steam', id: '3240220' }], year: 2013, chrono: 11, mc: 97, bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3240220/library_hero.jpg', note: 'Three protagonists, four console generations' },
    { id: 'gta-6', title: 'Grand Theft Auto VI', year: 2026, chrono: 12, bgUrl: 'https://www.rockstargames.com/VI/-/opengraph-image.jpg?opengraph-image.0t8ty~nlmxq2s.jpg', note: 'Releases 19 Nov 2026 — back to Vice City' }
  ],
  characters: [
    { id: 'gta-claude', name: 'Claude', role: 'Protagonist (III)', portraitUrl: 'https://static.wikia.nocookie.net/gtawiki/images/3/34/Claude-GTA3.png', appearsIn: ['gta-3', 'gta-san-andreas'], blurb: 'The silent one — betrayed at a bank job in the opening minute and never says a word about it, or anything else, for the whole game.' },
    { id: 'gta-tommy', name: 'Tommy Vercetti', role: 'Protagonist (Vice City)', portraitUrl: 'https://static.wikia.nocookie.net/gtawiki/images/a/ae/TommyVercetti-GTAVC.jpg', appearsIn: ['gta-vice-city'], blurb: 'Fifteen years in prison, then a drug deal gone wrong in a city of pastel suits. Ray Liotta gave the series its first real voice.' },
    { id: 'gta-cj', name: 'Carl "CJ" Johnson', role: 'Protagonist (San Andreas)', portraitUrl: 'https://static.wikia.nocookie.net/gtawiki/images/7/70/CJ-GTASA.png', appearsIn: ['gta-san-andreas'], blurb: 'Home to Los Santos for his mother\'s funeral, and straight back into the Grove Street life. The most beloved lead in the series.' },
    { id: 'gta-niko', name: 'Niko Bellic', role: 'Protagonist (IV)', portraitUrl: 'https://static.wikia.nocookie.net/gtawiki/images/9/9e/NikoBellic-GTAIV-Portrait.png', appearsIn: ['gta-4', 'gta-eflc'], blurb: 'An Eastern European veteran chasing the American dream his cousin promised him and finding only the same violence with better weather.' },
    { id: 'gta-michael', name: 'Michael De Santa', role: 'Protagonist (V)', portraitUrl: 'https://static.wikia.nocookie.net/gtawiki/images/2/27/MichaelDeSanta-GTAOee-Portrait.png', appearsIn: ['gta-5'], blurb: 'A retired bank robber in witness protection with a therapist, a pool, and a family that hates him. The series\' mid-life crisis.' },
    { id: 'gta-franklin', name: 'Franklin Clinton', role: 'Protagonist (V)', portraitUrl: 'https://static.wikia.nocookie.net/gtawiki/images/f/f3/FranklinClinton-GTAOe-TheContract.png', appearsIn: ['gta-5'], blurb: 'The repo man who wants out of the South Los Santos grind and picks the worst two mentors imaginable.' },
    { id: 'gta-trevor', name: 'Trevor Philips', role: 'Protagonist (V)', portraitUrl: 'https://static.wikia.nocookie.net/gtawiki/images/7/7d/TrevorPhilips-GTAVee.png', appearsIn: ['gta-5'], blurb: 'The id of the whole franchise given a trailer in Sandy Shores. Loyal to a fault, and to almost nothing else.' },
    { id: 'gta-lucia', name: 'Lucia Caminos', role: 'Protagonist (VI)', portraitUrl: 'https://static.wikia.nocookie.net/gtawiki/images/2/2a/LuciaCaminos-GTAVI-Portrait.png', appearsIn: ['gta-6'], blurb: 'The series\' first playable female lead — fresh out of prison in Leonida with Jason at her side.' }
  ]
}
