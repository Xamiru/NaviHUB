// Fallout — the Interplay/Black Isle, Bethesda and Obsidian games and Prime
// Video's 2024 series. Games: Fallout, Fallout 2, Fallout Tactics (a squad
// tactics spin-off), Fallout 3 (the Steam row is the Game of the Year
// Edition), Fallout: New Vegas, Fallout Shelter (a mobile management spin-off,
// listed here at its 2015 mobile release; Steam's date is the 2017 PC port),
// Fallout 4 and Fallout 76 (listed at its 2018 launch; Steam's date is the
// 2020 store listing). Screen: Fallout (TMDB tv).
// Chrono is the in-universe year: Fallout 76 (2102), Fallout (2161), Fallout 2
// (2241), Fallout 3 (2277), New Vegas (2281), Fallout 4 (2287) and the TV
// series (2296). Tactics and Shelter are spin-offs without a slot.
// Excluded: Fallout 4 VR, the Classic Collection and Anniversary bundles,
// the expansions and add-ons of each game, and the tabletop and board games.
// Ids from Steam appdetails and TMDB (en-US); original release dates and story
// years from Wikipedia, all checked 2026-10-14. Metacritic values are the ones
// Steam shows on each store page.

import type { FranchiseCfg } from './types'

const TM = 'https://image.tmdb.org/t/p'
const ST = 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps'

export const FALLOUT: FranchiseCfg = {
  id: 'fallout',
  name: 'Fallout',
  short: 'Fallout',
  color: '#6dbf3b',
  heroUrl: `${ST}/377160/library_hero.jpg`,
  studio: 'Interplay / Bethesda / Obsidian / Amazon MGM Studios',
  tagline: 'Two centuries after the bombs, the vaults open and the wasteland finds out who was inside.',
  trivia: [
    {
      title: 'The game that dropped GURPS',
      body: 'Tim Cain began work on Fallout at Interplay in 1994 as a game built on Steve Jackson Games\' GURPS rules. When Steve Jackson Games objected to the game\'s violence, Cain and designer Christopher Taylor wrote a new system of their own, SPECIAL, which has driven the series\' character stats ever since.'
    },
    {
      title: 'Bethesda takes over',
      body: 'After Interplay\'s decline, Bethesda Softworks acquired the Fallout license, and Bethesda Game Studios made Fallout 3 in 2008 as a first-person open-world game. Fallout: New Vegas came two years later from Obsidian Entertainment, partly staffed by veterans of the original Black Isle team.'
    },
    {
      title: 'A story set before any of the games',
      body: 'Fallout 76, set in 2102, is the earliest game in the story order. The Amazon series set in 2296 sits at the other end, after Fallout 4, and its first season premiered on Prime Video on April 10, 2024.'
    }
  ],
  entries: [
    {
      id: 'fallout-1',
      title: 'Fallout',
      aliases: ['Fallout: A Post Nuclear Role Playing Game'],
      externalIds: [{ source: 'steam', id: '38400' }],
      year: 1997,
      releaseDate: '1997-10-10',
      chrono: 2,
      mc: 89,
      note: 'A Vault Dweller leaves Vault 13 on a 150-day quest to find a replacement water chip'
    },
    {
      id: 'fallout-2',
      title: 'Fallout 2',
      aliases: ['Fallout 2: A Post Nuclear Role Playing Game'],
      externalIds: [{ source: 'steam', id: '38410' }],
      year: 1998,
      releaseDate: '1998-10-29',
      chrono: 3,
      mc: 86,
      note: 'The Vault Dweller\'s grandchild, the Chosen One, searches for a Garden of Eden Creation Kit to save a village'
    },
    {
      id: 'fallout-tactics',
      title: 'Fallout Tactics: Brotherhood of Steel',
      aliases: ['Fallout Tactics'],
      externalIds: [{ source: 'steam', id: '38420' }],
      year: 2001,
      releaseDate: '2001-03-15',
      spinOff: true,
      mc: 82,
      note: 'Squad-based tactics spin-off following Brotherhood of Steel recruits'
    },
    {
      id: 'fallout-3',
      title: 'Fallout 3',
      aliases: ['Fallout 3: Game of the Year Edition'],
      externalIds: [{ source: 'steam', id: '22370' }],
      year: 2008,
      releaseDate: '2008-10-28',
      chrono: 4,
      mc: 91,
      note: 'Bethesda\'s first Fallout: a young Vault 101 dweller leaves the vault to find their father in the Capital Wasteland'
    },
    {
      id: 'fallout-nv',
      title: 'Fallout: New Vegas',
      externalIds: [{ source: 'steam', id: '22380' }],
      year: 2010,
      releaseDate: '2010-10-19',
      chrono: 5,
      mc: 84,
      note: 'Obsidian\'s Mojave Wasteland story: a courier survives a shot to the head and tracks down the man who did it'
    },
    {
      id: 'fallout-shelter',
      title: 'Fallout Shelter',
      externalIds: [{ source: 'steam', id: '588430' }],
      year: 2015,
      releaseDate: '2015-06-14',
      spinOff: true,
      mc: 63,
      note: 'Free-to-play management game: run a vault, keep its dwellers alive and happy'
    },
    {
      id: 'fallout-4',
      title: 'Fallout 4',
      externalIds: [{ source: 'steam', id: '377160' }],
      year: 2015,
      releaseDate: '2015-11-10',
      chrono: 6,
      mc: 84,
      note: 'The Sole Survivor leaves Vault 111 to search Boston for a kidnapped son'
    },
    {
      id: 'fallout-76',
      title: 'Fallout 76',
      externalIds: [{ source: 'steam', id: '1151340' }],
      year: 2018,
      releaseDate: '2018-11-14',
      chrono: 1,
      note: 'Online prequel set in 2102 in West Virginia, where the first vault dwellers leave Vault 76'
    },
    {
      id: 'fallout-tv',
      title: 'Fallout',
      mediaType: 'tv',
      externalIds: [{ source: 'tmdb', id: '106379' }],
      year: 2024,
      releaseDate: '2024-04-10',
      chrono: 7,
      mc: 81,
      note: 'Prime Video series: a vault dweller, a knight of the Brotherhood and a ghoul cross Los Angeles in 2296'
    }
  ],
  characters: [
    {
      id: 'fallout-lucy',
      name: 'Lucy MacLean',
      role: 'Vault dweller',
      portraitUrl: `${TM}/w300_and_h450_face/jqrYg35GHuMGwGqEVUthqTLQnay.jpg`,
      appearsIn: ['fallout-tv'],
      blurb: 'An optimistic Vault 33 resident played by Ella Purnell, who goes to the surface to find her father.'
    },
    {
      id: 'fallout-maximus',
      name: 'Maximus',
      role: 'Brotherhood of Steel squire',
      portraitUrl: `${TM}/w300_and_h450_face/h2CJjnDEy2nCbCy6dWzXLmZ4p47.jpg`,
      appearsIn: ['fallout-tv'],
      blurb: 'A Brotherhood of Steel squire played by Aaron Moten.'
    },
    {
      id: 'fallout-ghoul',
      name: 'The Ghoul (Cooper Howard)',
      role: 'Bounty hunter',
      portraitUrl: `${TM}/w300_and_h450_face/5lcVMJbWrNDFiWa1WxK4oR8zwev.jpg`,
      appearsIn: ['fallout-tv'],
      blurb: 'A centuries-old, noseless bounty hunter played by Walton Goggins, who was once a Hollywood actor named Cooper Howard.'
    },
    {
      id: 'fallout-norm',
      name: 'Norm MacLean',
      role: 'Vault dweller',
      portraitUrl: `${TM}/w300_and_h450_face/fc7krDmEA4VkIY4KOJjpMXGdsfg.jpg`,
      appearsIn: ['fallout-tv'],
      blurb: 'Lucy\'s brother in Vault 33, played by Moises Arias.'
    },
    {
      id: 'fallout-hank',
      name: 'Hank MacLean',
      role: 'Overseer of Vault 33',
      portraitUrl: `${TM}/w300_and_h450_face/7gNyx8fYAUdOp2jpCEH3dyFbeV.jpg`,
      appearsIn: ['fallout-tv'],
      blurb: 'Lucy and Norm\'s father and the overseer of Vault 33, played by Kyle MacLachlan.'
    },
    {
      id: 'fallout-betty',
      name: 'Betty Pearson',
      role: 'Vault 33 resident',
      portraitUrl: `${TM}/w300_and_h450_face/8zQO5GNWQwJG4we5AYfjopblRFe.jpg`,
      appearsIn: ['fallout-tv'],
      blurb: 'A Vault 33 resident played by Leslie Uggams.'
    }
  ]
}
