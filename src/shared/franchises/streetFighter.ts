// Street Fighter — the mainline numbered games plus the three canon
// adaptations the task scope calls for: the 1994 animated movie, the 1994
// Van Damme live-action film, and the Street Fighter II V TV anime. The 2026
// live-action reboot is excluded: it releases 2026-10-13, after this page's
// 2026-10-05 cutoff. Also excluded: every other OVA/special (Alpha: The
// Animation, Alpha: Generations, the SFIV and Super SFIV shorts, the Fatal
// Fury and SPY x FAMILY crossover specials) — none were in scope.
// Street Fighter II's five arcade/console revisions (Champion Edition,
// Hyper Fighting, Super Street Fighter II, Super Street Fighter II Turbo)
// fold into its row as aliases rather than separate entries, the same
// treatment Street Fighter III's three arcade releases (New Generation, 2nd
// Impact, 3rd Strike) get here — this page uses 3rd Strike, the version
// still sold and played today, as the row's title and date, with the
// earlier two folded in as aliases. The three Alpha games ARE separate rows
// (distinct stories, not revisions of one release) and share chrono 2.
// Chrono follows the task brief's specified in-universe order: Street
// Fighter (1) -> Alpha trilogy (2) -> II (3) -> IV (4) -> V (5) -> III (6)
// -> 6 (7) — Capcom's long-stated oddity that IV and III both happen after
// II but in that relative order, with V bridging IV and III. The 1994
// anime movie and the Street Fighter II V TV series adapt II's story and
// share its chrono slot; the 1994 live-action film is a separate loose
// continuity and carries no chrono, the Resident Evil film convention.
// Steam ids are given only where the task asked for them (IV/Ultra, V, 6,
// the 30th Anniversary Collection); Super Street Fighter IV and 3rd Strike
// Online Edition were both delisted from Steam and have no working id today
// — folded in as aliases only. Capcom's Alpha-era Steam listings are
// individual Capcom Arcade 2nd Stadium DLC packs bolted onto a free hub app,
// not a normal ownable release, so they carry no externalId either.
// Dates verified against Wikipedia infoboxes, 2026-10-05; movie/anime ids
// from TMDB/AniList the same day. Hero art is the Street Fighter 6 Steam
// library hero; character portraits are Wikipedia/Wikimedia (official
// character renders are fair-use local uploads on en.wikipedia.org, not
// Fandom, so no Referer gate).

import type { FranchiseCfg } from './types'

export const STREET_FIGHTER: FranchiseCfg = {
  id: 'street-fighter',
  name: 'Street Fighter',
  short: 'Street Fighter',
  color: '#c1272d',
  heroUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1364780/library_hero.jpg',
  studio: 'Capcom',
  tagline: 'Hadoken first, ask questions never — the fighting game that invented the genre\'s grammar.',
  trivia: [
    {
      title: 'The template for every fighting game after it',
      body: 'The 1987 original let two players pick from a tiny roster and threw in hidden special-move inputs almost as an afterthought. Street Fighter II (1991) is the game that actually built the genre: a cast of eight distinct, equally viable fighters, combo timing, and the quarter-circle motion every fighting game since has either used or deliberately avoided. It became the biggest arcade phenomenon of the early 1990s and the reason home consoles started shipping six-button pads.'
    },
    {
      title: 'A timeline that ignores the numbers',
      body: 'Capcom has long maintained that Street Fighter III takes place after Street Fighter IV, despite the numbering, with the Alpha trilogy bridging the gap between the original game and II. In story order the series runs SF, Alpha, II, IV, V, III and then 6.'
    },
    {
      title: 'Why there are three Street Fighter IIIs',
      body: 'Unlike II\'s mostly cosmetic revisions, Street Fighter III: New Generation (1997), 2nd Impact (1997) and 3rd Strike (1999) are three structurally different arcade releases with shifting rosters and mechanics, all built on the parry system New Generation introduced. 3rd Strike is the version still played in tournaments and re-released today.'
    }
  ],
  entries: [
    {
      id: 'sf-1',
      title: 'Street Fighter',
      year: 1987,
      releaseDate: '1987-08-30',
      chrono: 1,
      note: 'Ryu and Sagat\'s first fight, in a single-player tournament against the computer'
    },
    {
      id: 'sf-2',
      title: 'Street Fighter II',
      aliases: [
        'Street Fighter II: The World Warrior',
        'Street Fighter II: Champion Edition',
        'Street Fighter II: Hyper Fighting',
        'Super Street Fighter II',
        'Super Street Fighter II Turbo'
      ],
      year: 1991,
      releaseDate: '1991-03-07',
      chrono: 3,
      note: 'The World Warrior tournament: eight fighters, one grudge each, worldwide arcade phenomenon'
    },
    {
      id: 'sf-2-movie',
      title: 'Street Fighter II: The Movie',
      mediaType: 'anime',
      aliases: ['Street Fighter II: The Animated Movie'],
      externalIds: [{ source: 'anilist', id: '1362' }],
      year: 1994,
      releaseDate: '1994-08-06',
      chrono: 3,
      adaptation: true,
      note: 'Ryu and Ken\'s journey intercut with Chun-Li\'s hunt for her father\'s killer, Bison'
    },
    {
      id: 'sf-film-1994',
      title: 'Street Fighter',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '11667' }],
      year: 1994,
      releaseDate: '1994-12-23',
      adaptation: true,
      note: 'Jean-Claude Van Damme\'s Guile leads a United Nations force against Bison\'s fictional Shadaloo City'
    },
    {
      id: 'sf-2v-anime',
      title: 'Street Fighter II V',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '876' }],
      year: 1995,
      releaseDate: '1995-04-10',
      chrono: 3,
      adaptation: true,
      note: '29-episode TV series following Ryu and Ken\'s round-the-world journey'
    },
    {
      id: 'sf-alpha',
      title: 'Street Fighter Alpha: Warriors\' Dreams',
      aliases: ['Street Fighter Alpha', 'Street Fighter Zero'],
      year: 1995,
      releaseDate: '1995-06-22',
      chrono: 2,
      note: 'A prequel to II: young Ryu, Ken and Chun-Li, and the debut of the Alpha Counter'
    },
    {
      id: 'sf-alpha-2',
      title: 'Street Fighter Alpha 2',
      aliases: ['Street Fighter Zero 2'],
      year: 1996,
      releaseDate: '1996-03-25',
      chrono: 2,
      note: 'Adds Rose, Sakura and Dhalsim to the prequel-era roster'
    },
    {
      id: 'sf-alpha-3',
      title: 'Street Fighter Alpha 3',
      aliases: ['Street Fighter Zero 3'],
      year: 1998,
      releaseDate: '1998-07-15',
      chrono: 2,
      note: 'The largest Alpha roster, closing the prequel era just before II'
    },
    {
      id: 'sf-3',
      title: 'Street Fighter III: 3rd Strike',
      aliases: [
        'Street Fighter III',
        'Street Fighter III: New Generation',
        'Street Fighter III: 2nd Impact',
        'Street Fighter III: Third Strike'
      ],
      year: 1999,
      releaseDate: '1999-05-12',
      chrono: 6,
      note: 'A new generation of fighters around Alex and Ken; the parry system redefines high-level play'
    },
    {
      id: 'sf-4',
      title: 'Street Fighter IV',
      aliases: ['Super Street Fighter IV', 'Super Street Fighter IV: Arcade Edition', 'Ultra Street Fighter IV'],
      externalIds: [
        { source: 'steam', id: '21660' },
        { source: 'steam', id: '45760' }
      ],
      year: 2008,
      releaseDate: '2008-07-18',
      chrono: 4,
      note: 'The 3D-on-2D revival that brought the series back after a decade away'
    },
    {
      id: 'sf-5',
      title: 'Street Fighter V',
      aliases: ['Street Fighter V: Champion Edition'],
      externalIds: [{ source: 'steam', id: '310950' }],
      year: 2016,
      releaseDate: '2016-02-16',
      chrono: 5,
      note: 'A rocky launch redeemed over years of free content; V-Trigger and V-Skill reshape the system'
    },
    {
      id: 'sf-30th',
      title: 'Street Fighter 30th Anniversary Collection',
      externalIds: [{ source: 'steam', id: '586200' }],
      year: 2018,
      releaseDate: '2018-05-29',
      spinOff: true,
      note: 'Twelve arcade originals in one package: the first game, five SF II revisions, three SF III releases'
    },
    {
      id: 'sf-6',
      title: 'Street Fighter 6',
      externalIds: [{ source: 'steam', id: '1364780' }],
      year: 2023,
      releaseDate: '2023-06-02',
      chrono: 7,
      note: 'Drive Gauge, the open-world Battle Hub and World Tour, and the series\' best-reviewed entry in years'
    }
  ],
  characters: [
    {
      id: 'sf-ryu',
      name: 'Ryu',
      role: 'Wandering martial artist',
      portraitUrl: 'https://upload.wikimedia.org/wikipedia/en/5/50/RyuStreetFighterTwoHadoken.png',
      appearsIn: ['sf-1', 'sf-2', 'sf-2-movie', 'sf-2v-anime', 'sf-alpha', 'sf-alpha-2', 'sf-alpha-3', 'sf-3', 'sf-4', 'sf-5', 'sf-6'],
      blurb: 'A wandering karateka searching for stronger opponents, forever one step from the Satsui no Hado consuming him. The series\' default face and its most recurring protagonist.'
    },
    {
      id: 'sf-ken',
      name: 'Ken Masters',
      role: 'Ryu\'s training partner and rival',
      portraitUrl: 'https://upload.wikimedia.org/wikipedia/en/2/2f/Ken_Masters_%28SF3_-_Third_Strike%29.png',
      appearsIn: ['sf-1', 'sf-2', 'sf-2-movie', 'sf-2v-anime', 'sf-alpha', 'sf-alpha-2', 'sf-alpha-3', 'sf-3', 'sf-4', 'sf-5', 'sf-6'],
      blurb: 'Trained alongside Ryu under the same master, now a wealthy American with a wife and kids who still can\'t resist a fight.'
    },
    {
      id: 'sf-chun-li',
      name: 'Chun-Li',
      role: 'Interpol officer',
      portraitUrl: 'https://upload.wikimedia.org/wikipedia/en/5/53/Chun-Li.png',
      appearsIn: ['sf-2', 'sf-2-movie', 'sf-film-1994', 'sf-alpha', 'sf-alpha-2', 'sf-alpha-3', 'sf-4', 'sf-5', 'sf-6'],
      blurb: 'Investigating Shadaloo for her father\'s murder, and the genre\'s first great playable woman — her Lightning Kicks were a system-selling move in 1991.'
    },
    {
      id: 'sf-bison',
      name: 'M. Bison',
      role: 'Shadaloo\'s dictator',
      portraitUrl: 'https://upload.wikimedia.org/wikipedia/en/e/e4/Bison_%28Super_Street_Fighter_II%29.png',
      appearsIn: ['sf-2', 'sf-2-movie', 'sf-film-1994', 'sf-alpha', 'sf-alpha-2', 'sf-alpha-3', 'sf-5'],
      blurb: 'Head of the criminal empire Shadaloo, powered by Psycho Power and a body-swapping immortality scheme that keeps bringing him back.'
    },
    {
      id: 'sf-akuma',
      name: 'Akuma',
      role: 'Master of the Satsui no Hado',
      portraitUrl: 'https://upload.wikimedia.org/wikipedia/en/f/f0/Akuma_%28Street_Fighter%29.png',
      appearsIn: ['sf-alpha', 'sf-alpha-2', 'sf-alpha-3', 'sf-3', 'sf-4', 'sf-5', 'sf-6'],
      blurb: 'Gouken\'s brother, trained in the same art as Ryu\'s master, who embraced the murderous intent Ryu resists. A secret final boss since Super Street Fighter II Turbo.'
    },
    {
      id: 'sf-guile',
      name: 'Guile',
      role: 'US Air Force officer',
      portraitUrl: 'https://upload.wikimedia.org/wikipedia/en/b/bc/Guile_%28SSFII%29.png',
      appearsIn: ['sf-2', 'sf-film-1994', 'sf-4', 'sf-5', 'sf-6'],
      blurb: 'Hunting Bison for the death of his best friend Charlie, armed with the Sonic Boom and the flattest flat-top in gaming.'
    },
    {
      id: 'sf-cammy',
      name: 'Cammy',
      role: 'Former Shadaloo assassin',
      portraitUrl: 'https://upload.wikimedia.org/wikipedia/en/2/27/Cammy_%28Street_Fighter_character%29.png',
      appearsIn: ['sf-alpha', 'sf-alpha-2', 'sf-alpha-3', 'sf-3', 'sf-4', 'sf-5', 'sf-6'],
      blurb: 'A Doll — one of Bison\'s brainwashed female assassins — who broke his conditioning and has spent every game since hunting down Shadaloo\'s remnants.'
    }
  ]
}
