// Phantasy Star — Sega's science-fantasy RPG line. Chrono covers only the
// original Algol tetralogy (I-IV): each sits in one confirmed timeline, a
// thousand years apart, with the villain Dark Force/Darkfalz and (in III)
// the fleeing colony ship Alisa III tying them together even when a game
// leaves the Algol system itself. Everything after PS4 is a separate online
// sub-series with its own setting and no fixed place in that timeline, so
// Online/Universe/2/New Genesis are marked spinOff with no chrono of their
// own. PSO2 and New Genesis share one Steam listing — Sega renamed the same
// app in place when New Genesis replaced the base game's client in 2021 — so
// only the New Genesis entry carries the Steam id; the original PSO2 has
// none. Ids from Steam/AniList, years and plot facts from Wikipedia, all
// verified 2026-10-05.

import type { FranchiseCfg } from './types'

export const PHANTASY_STAR: FranchiseCfg = {
  id: 'phantasy-star',
  name: 'Phantasy Star',
  short: 'Phantasy Star',
  color: '#2fb6c9',
  heroUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1056640/library_hero.jpg',
  studio: 'Sega',
  tagline: 'A thousand years at a time, across one solar system and beyond it.',
  trivia: [
    {
      title: 'One system, four games, a thousand years apart',
      body: 'Phantasy Star debuted on the Master System in 1987 with Alis Landale freeing the Algol system from Dark Falz and the android tyrant Lassic. Phantasy Star II, set a thousand years later, turns government agent Rolf against the malfunctioning system-wide network Mother Brain. Phantasy Star III moves the action off Algol entirely, onto the colony ship Alisa III fleeing the destroyed world Palm — fans long debated how connected it really was, but Dark Force follows the colonists into exile, and Phantasy Star IV brings the story back to Algol exactly a thousand years after Phantasy Star II\'s Great Collapse to close out the tetralogy.'
    },
    {
      title: 'The online side of the family',
      body: 'Phantasy Star Online (2000) was one of the first successful online RPGs on a console: Phantasy Star Universe (2006) gave the online formula a new setting and a single-player campaign alongside it, and Phantasy Star Online 2 (2012) carried the formula forward for most of a decade in Japan before finally reaching the West in 2020.'
    },
    {
      title: 'Why New Genesis isn\'t "Phantasy Star Online 3"',
      body: 'Phantasy Star Online 2: New Genesis (2021) rebuilt the graphics and combat of PSO2 on a new open-field world, but launched as part of the same service rather than as a numbered sequel, so existing players kept their accounts and characters.'
    }
  ],
  entries: [
    {
      id: 'ps-1',
      title: 'Phantasy Star',
      year: 1987,
      releaseDate: '1987-12-20',
      chrono: 1,
      note: 'Alis Landale and her companions free the Algol system from Dark Falz and the android ruler Lassic'
    },
    {
      id: 'ps-2',
      title: 'Phantasy Star II',
      year: 1989,
      releaseDate: '1989-03-21',
      chrono: 2,
      note: 'A thousand years later, government agent Rolf turns against the malfunctioning network Mother Brain as it drags Motavia into crisis'
    },
    {
      id: 'ps-3',
      title: 'Phantasy Star III: Generations of Doom',
      year: 1990,
      releaseDate: '1990-04-21',
      chrono: 3,
      note: 'Three generations of one family, aboard a colony ship fleeing a destroyed homeworld, discover the old enemy that followed them into exile'
    },
    {
      id: 'ps-4',
      title: 'Phantasy Star IV: The End of the Millennium',
      year: 1993,
      releaseDate: '1993-12-17',
      chrono: 4,
      note: 'A thousand years after Mother Brain\'s fall, hunters Chaz and Alys investigate a resurgence of monsters threatening to finish off Algol'
    },
    {
      id: 'ps-pso',
      title: 'Phantasy Star Online',
      year: 2000,
      releaseDate: '2000-12-21',
      spinOff: true,
      note: 'Up to four players explore the forest moon Ragol together in real time, fighting monsters and trading loot online'
    },
    {
      id: 'ps-psu',
      title: 'Phantasy Star Universe',
      year: 2006,
      releaseDate: '2006-08-31',
      spinOff: true,
      note: 'A new setting and era for the online formula, pairing a single-player story campaign with the same persistent hunting'
    },
    {
      id: 'ps-pso2',
      title: 'Phantasy Star Online 2',
      year: 2012,
      releaseDate: '2012-07-04',
      spinOff: true,
      note: 'ARKS members aboard the colony fleet Oracle hunt the corrupting Darkers across a growing set of planets'
    },
    {
      id: 'ps-pso2-oracle',
      title: 'Phantasy Star Online 2: Episode Oracle',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '108358' }],
      year: 2019,
      releaseDate: '2019-10-07',
      adaptation: true,
      note: 'An anime adaptation following ARKS recruit Ash through Oracle\'s early missions against the Darkers'
    },
    {
      id: 'ps-pso2-ngs',
      title: 'Phantasy Star Online 2: New Genesis',
      externalIds: [{ source: 'steam', id: '1056640' }],
      year: 2021,
      releaseDate: '2021-06-09',
      spinOff: true,
      note: 'A visually overhauled shared world launched nine years after PSO2, built to carry the same players forward rather than split them'
    }
  ],
  characters: [
    {
      id: 'ps-alis',
      name: 'Alis Landale',
      role: 'Heroine (Phantasy Star)',
      portraitUrl: 'https://static.wikia.nocookie.net/phantasystar/images/9/96/Alis_landale_alt_profile.png/revision/latest?cb=20200220114130',
      appearsIn: ['ps-1'],
      blurb: 'Sets out to avenge her brother Nero, killed by the guards of Lassic, and ends his rule over Algol.'
    },
    {
      id: 'ps-rolf',
      name: 'Rolf',
      role: 'Agent (Phantasy Star II)',
      portraitUrl: 'https://static.wikia.nocookie.net/phantasystar/images/d/db/Rolf_art.png/revision/latest?cb=20120311104547',
      appearsIn: ['ps-2'],
      blurb: 'A Motavian government agent whose investigation into the biomonsters leads him to Mother Brain.'
    },
    {
      id: 'ps-nei',
      name: 'Nei',
      role: 'Numan (Phantasy Star II)',
      portraitUrl: 'https://static.wikia.nocookie.net/phantasystar/images/b/b1/Nei_art.png/revision/latest?cb=20120311104547',
      appearsIn: ['ps-2'],
      blurb: 'Half human and half biomonster, the girl Rolf takes in; her death midway through the game is its best-remembered scene.'
    },
    {
      id: 'ps-chaz',
      name: 'Chaz Ashley',
      role: 'Hunter (Phantasy Star IV)',
      portraitUrl: 'https://static.wikia.nocookie.net/phantasystar/images/f/fe/Chaz_portrait.png/revision/latest?cb=20151203224421',
      appearsIn: ['ps-4'],
      blurb: 'A young hunter apprenticed to Alys Brangwin who inherits the fight to save Algol a thousand years after Rolf.'
    },
    {
      id: 'ps-rune',
      name: 'Rune Walsh',
      role: 'Esper (Phantasy Star IV)',
      portraitUrl: 'https://static.wikia.nocookie.net/phantasystar/images/3/3d/Rune_portrait.png/revision/latest?cb=20151204000222',
      appearsIn: ['ps-4'],
      blurb: 'An Esper wizard who joins Chaz and Alys, the latest to carry the name of the legendary Lutz.'
    }
  ]
}
