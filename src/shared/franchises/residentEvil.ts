// Resident Evil — curated canon. Mainline + the Revelations pair; the
// Outbreak/Umbrella Chronicles/Resistance tier is excluded. Remakes are
// separate entries; in Story order a remake sits directly after its
// original (same events, retold). Steam names are bare ("Resident Evil 2"
// IS the 2019 remake), so the plain titles belong to the remake entries and
// the originals carry a year disambiguator.
// All art URLs curl-verified 2026-08-15. The four pre-Steam games (1996-2000)
// have no 16:9 hero art anywhere official — their backgrounds are the widest
// official Capcom assets that exist (box scans / print ads / render banners).
// Adaptations (2026-10-05): the game-canon CG films/series are anime rows
// (AniList) with story-order slots; the live-action films and the Netflix
// series are a separate continuity, so they carry no chrono and sink below
// the story order. Ids from AniList and TMDB.

import type { FranchiseCfg } from './types'

export const RESIDENT_EVIL: FranchiseCfg = {
  id: 'resident-evil',
  name: 'Resident Evil',
  short: 'Resident Evil',
  color: '#a32222',
  heroUrl:
    'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2050650/library_hero.jpg',
  studio: 'Capcom',
  tagline: 'Survival horror, invented, lost, and reinvented — twice.',
  trivia: [
    {
      title: 'Genre, named here',
      body: 'The 1996 original\'s marketing coined the phrase "survival horror" — fixed cameras, tank controls and scarce ink ribbons were all rationing devices to keep the player weak.\n\nIt began as a remake of Capcom\'s 1989 haunted-house game Sweet Home, and in Japan the series has always been Biohazard; "Resident Evil" exists because a US trademark said no.'
    },
    {
      title: 'The two reinventions',
      body: 'RE4 (2005) invented the over-the-shoulder action camera that half the industry then adopted, saving the series by making it less scary. RE7 (2017) saved it again by doing the opposite: first-person, one family, one house. The franchise\'s superpower is knowing when to burn its own formula.'
    },
    {
      title: 'The remake machine',
      body: 'The 2002 GameCube REmake set the gold standard for faithful remakes; the 2019-2023 RE Engine wave (RE2/RE3/RE4) turned remaking into a parallel product line so successful that the remakes now outsell most new entries — which is why they get their own rows here.'
    }
  ],
  entries: [
    {
      id: 're-1',
      title: 'Resident Evil (1996)',
      aliases: ["Resident Evil: Director's Cut"],
      year: 1996,
      chrono: 2,
      mc: 91,
      bgUrl:
        'https://static.wikia.nocookie.net/residentevil/images/8/89/BIO_HAZARD_Original_cover.jpg/revision/latest?cb=20151222214126',
      note: 'The mansion incident'
    },
    {
      id: 're-2',
      title: 'Resident Evil 2 (1998)',
      year: 1998,
      chrono: 4,
      mc: 89,
      bgUrl:
        'https://static.wikia.nocookie.net/residentevil/images/c/c5/Characters_from_RE2_-_HD.png/revision/latest?cb=20150106193552',
      note: 'Raccoon City falls'
    },
    {
      id: 're-3',
      title: 'Resident Evil 3: Nemesis',
      year: 1999,
      chrono: 6,
      mc: 91,
      bgUrl:
        'https://static.wikia.nocookie.net/residentevil/images/e/e5/RE3_NEMESIS_PROMO_AD_POSTER.png/revision/latest?cb=20151127083858',
      note: 'S.T.A.R.S.'
    },
    {
      id: 're-code-veronica',
      title: 'Resident Evil Code: Veronica',
      aliases: ['Resident Evil Code: Veronica X', 'Resident Evil Code: Veronica X HD'],
      year: 2000,
      chrono: 8,
      mc: 94,
      bgUrl:
        'https://static.wikia.nocookie.net/residentevil/images/5/5a/RESIDENTEVILCODEVERONICAXPS2COVER.jpg/revision/latest?cb=20161206201503',
      note: 'The Redfields vs the Ashfords'
    },
    {
      id: 're-film-2002',
      title: 'Resident Evil',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '1576' }],
      year: 2002,
      releaseDate: '2002-03-15',
      adaptation: true,
      note: 'Paul W. S. Anderson’s first film: Alice wakes in the Hive beneath Raccoon City'
    },
    {
      id: 're-remake',
      title: 'Resident Evil (2002)',
      aliases: ['Resident Evil', 'Resident Evil HD Remaster'],
      externalIds: [{ source: 'steam', id: '304240' }],
      year: 2002,
      releaseDate: '2002-03-22',
      chrono: 3,
      mc: 91,
      remake: true,
      bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/304240/library_hero.jpg',
      note: 'The GameCube REmake — still the gold standard'
    },
    {
      id: 're-0',
      title: 'Resident Evil Zero',
      aliases: ['Resident Evil 0', 'Resident Evil 0 HD Remaster'],
      externalIds: [{ source: 'steam', id: '339340' }],
      year: 2002,
      releaseDate: '2002-11-12',
      chrono: 1,
      mc: 83,
      bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/339340/library_hero.jpg',
      note: 'The night before the mansion'
    },
    {
      id: 're-film-apocalypse',
      title: 'Resident Evil: Apocalypse',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '1577' }],
      year: 2004,
      releaseDate: '2004-09-10',
      adaptation: true,
      note: 'Raccoon City falls; Jill Valentine and Nemesis join the film series'
    },
    {
      id: 're-4',
      title: 'Resident Evil 4 (2005)',
      aliases: ['Resident Evil 4: Ultimate HD Edition'],
      externalIds: [{ source: 'steam', id: '254700' }],
      year: 2005,
      chrono: 9,
      mc: 96,
      bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/254700/library_hero.jpg',
      note: 'The reinvention'
    },
    {
      id: 're-film-extinction',
      title: 'Resident Evil: Extinction',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '7737' }],
      year: 2007,
      releaseDate: '2007-09-21',
      adaptation: true,
      note: 'The T-virus has spread worldwide; Alice crosses the Nevada desert'
    },
    {
      id: 're-cg-degeneration',
      title: 'Resident Evil: Degeneration',
      mediaType: 'anime',
      aliases: ['Biohazard: Degeneration'],
      externalIds: [{ source: 'anilist', id: '3446' }],
      year: 2008,
      releaseDate: '2008-10-18',
      chrono: 9,
      spinOff: true,
      note: 'Game-canon CG film: Leon and Claire at a T-virus outbreak in Harvardville airport'
    },
    {
      id: 're-5',
      title: 'Resident Evil 5',
      aliases: ['Resident Evil 5 Gold Edition'],
      externalIds: [{ source: 'steam', id: '21690' }],
      year: 2009,
      chrono: 12,
      mc: 86,
      bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/21690/library_hero.jpg',
      note: 'Co-op action era peaks'
    },
    {
      id: 're-film-afterlife',
      title: 'Resident Evil: Afterlife',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '35791' }],
      year: 2010,
      releaseDate: '2010-09-10',
      adaptation: true,
      note: 'Alice, Claire and Chris Redfield against Wesker in Los Angeles'
    },
    {
      id: 're-revelations',
      title: 'Resident Evil: Revelations',
      externalIds: [{ source: 'steam', id: '222480' }],
      year: 2012,
      releaseDate: '2012-01-26',
      chrono: 11,
      mc: 82,
      spinOff: true,
      bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/222480/library_hero.jpg',
      note: 'Between 4 and 5, at sea'
    },
    {
      id: 're-film-retribution',
      title: 'Resident Evil: Retribution',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '71679' }],
      year: 2012,
      releaseDate: '2012-09-14',
      adaptation: true,
      note: 'Escape from Umbrella’s underwater simulation facility, with Leon and Ada'
    },
    {
      id: 're-cg-damnation',
      title: 'Resident Evil: Damnation',
      mediaType: 'anime',
      aliases: ['Biohazard: Damnation'],
      externalIds: [{ source: 'anilist', id: '9544' }],
      year: 2012,
      releaseDate: '2012-09-15',
      chrono: 12,
      spinOff: true,
      note: 'Game-canon CG film: Leon in an Eastern European civil war fought with Plagas'
    },
    {
      id: 're-6',
      title: 'Resident Evil 6',
      externalIds: [{ source: 'steam', id: '221040' }],
      year: 2012,
      releaseDate: '2012-10-02',
      chrono: 14,
      mc: 74,
      bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/221040/library_hero.jpg',
      note: 'The action era overreaches'
    },
    {
      id: 're-revelations-2',
      title: 'Resident Evil: Revelations 2',
      externalIds: [{ source: 'steam', id: '287290' }],
      year: 2015,
      chrono: 13,
      mc: 75,
      spinOff: true,
      bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/287290/library_hero.jpg',
      note: 'Claire and Barry, episodic'
    },
    {
      id: 're-film-final-chapter',
      title: 'Resident Evil: The Final Chapter',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '173897' }],
      year: 2016,
      releaseDate: '2016-12-23',
      adaptation: true,
      note: 'Alice returns to the Hive to end the Anderson series'
    },
    {
      id: 're-7',
      title: 'Resident Evil 7: Biohazard',
      externalIds: [{ source: 'steam', id: '418370' }],
      year: 2017,
      chrono: 15,
      mc: 86,
      bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/418370/library_hero.jpg',
      note: 'The second reinvention — welcome to the family'
    },
    {
      id: 're-cg-vendetta',
      title: 'Resident Evil: Vendetta',
      mediaType: 'anime',
      aliases: ['Biohazard: Vendetta'],
      externalIds: [{ source: 'anilist', id: '21464' }],
      year: 2017,
      releaseDate: '2017-05-27',
      chrono: 14,
      spinOff: true,
      note: 'Game-canon CG film: Chris, Leon and Rebecca against a bioterrorist in New York'
    },
    {
      id: 're-2-remake',
      title: 'Resident Evil 2 (2019)',
      aliases: ['Resident Evil 2'],
      externalIds: [{ source: 'steam', id: '883710' }],
      year: 2019,
      chrono: 5,
      mc: 91,
      remake: true,
      bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/883710/library_hero.jpg',
      note: 'Remake of RE2 — Mr. X approaches'
    },
    {
      id: 're-3-remake',
      title: 'Resident Evil 3 (2020)',
      aliases: ['Resident Evil 3'],
      externalIds: [{ source: 'steam', id: '952060' }],
      year: 2020,
      chrono: 7,
      mc: 84,
      remake: true,
      bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/952060/library_hero.jpg',
      note: 'Remake of Nemesis'
    },
    {
      id: 're-village',
      title: 'Resident Evil Village',
      aliases: ['Resident Evil 8: Village'],
      externalIds: [{ source: 'steam', id: '1196590' }],
      year: 2021,
      chrono: 16,
      mc: 84,
      bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1196590/library_hero.jpg',
      note: 'RE7\'s gothic sequel'
    },
    {
      id: 're-cg-infinite-darkness',
      title: 'Resident Evil: Infinite Darkness',
      mediaType: 'anime',
      aliases: ['Biohazard: Infinite Darkness'],
      externalIds: [{ source: 'anilist', id: '124494' }],
      year: 2021,
      releaseDate: '2021-07-08',
      chrono: 11,
      spinOff: true,
      note: 'Game-canon CG series: Leon and Claire uncover a White House cover-up in 2006'
    },
    {
      id: 're-film-raccoon-city',
      title: 'Resident Evil: Welcome to Raccoon City',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '460458' }],
      year: 2021,
      releaseDate: '2021-11-24',
      adaptation: true,
      note: 'Reboot film that merges the first two games into one night in Raccoon City'
    },
    {
      id: 're-netflix-series',
      title: 'Resident Evil',
      mediaType: 'tv',
      externalIds: [{ source: 'tmdb', id: '108296' }],
      year: 2022,
      releaseDate: '2022-07-14',
      spinOff: true,
      note: 'Netflix series: Wesker’s daughters in New Raccoon City and a ruined 2036'
    },
    {
      id: 're-4-remake',
      title: 'Resident Evil 4 (2023)',
      aliases: ['Resident Evil 4'],
      externalIds: [{ source: 'steam', id: '2050650' }],
      year: 2023,
      chrono: 10,
      mc: 93,
      remake: true,
      bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2050650/library_hero.jpg',
      note: 'Remake of the reinvention'
    },
    {
      id: 're-cg-death-island',
      title: 'Resident Evil: Death Island',
      mediaType: 'anime',
      aliases: ['Biohazard: Death Island'],
      externalIds: [{ source: 'anilist', id: '161441' }],
      year: 2023,
      releaseDate: '2023-07-07',
      chrono: 14,
      spinOff: true,
      note: 'Game-canon CG film: Leon, Chris, Jill, Claire and Rebecca together on Alcatraz'
    },
    {
      id: 're-film-2026',
      title: 'Resident Evil (2026)',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '1423191' }],
      year: 2026,
      releaseDate: '2026-09-18',
      adaptation: true,
      note: 'Zach Cregger’s new film, separate from both earlier film series'
    }
  ],
  characters: [
    {
      id: 're-leon',
      name: 'Leon S. Kennedy',
      role: 'Rookie cop to agent',
      portraitUrl:
        'https://static.wikia.nocookie.net/residentevil/images/7/7d/RE9_-_Leon_Render.png/revision/latest?cb=20251212111407',
      appearsIn: ['re-2', 're-2-remake', 're-4', 're-4-remake', 're-6'],
      blurb:
        'Worst first day in police history, followed by a career of presidential rescues and one-liners. The series\' action lead whenever it wants to be a blockbuster.'
    },
    {
      id: 're-jill',
      name: 'Jill Valentine',
      role: 'S.T.A.R.S. survivor',
      portraitUrl:
        'https://static.wikia.nocookie.net/residentevil/images/0/0e/Jill_-_Death_Island_Render.png/revision/latest?cb=20230706214935',
      appearsIn: ['re-1', 're-remake', 're-3', 're-3-remake', 're-5', 're-revelations'],
      blurb:
        'The master of unlocking, the one Nemesis hunts, and the series\' most enduring survivor — from the mansion to mind control and back.'
    },
    {
      id: 're-chris',
      name: 'Chris Redfield',
      role: 'S.T.A.R.S. to BSAA',
      portraitUrl:
        'https://static.wikia.nocookie.net/residentevil/images/d/d8/ChrisBFull.png/revision/latest?cb=20231222181841',
      appearsIn: ['re-1', 're-remake', 're-code-veronica', 're-5', 're-6', 're-7', 're-village'],
      blurb:
        'Thirty years of punching bioweapons, one infamous boulder. The franchise\'s constant soldier, present at both its beginning and its modern era.'
    },
    {
      id: 're-claire',
      name: 'Claire Redfield',
      role: 'Civilian who keeps showing up',
      portraitUrl:
        'https://static.wikia.nocookie.net/residentevil/images/9/9e/Claire_-_Death_Island_Render.png/revision/latest?cb=20230703033607',
      appearsIn: ['re-2', 're-2-remake', 're-code-veronica', 're-revelations-2'],
      blurb:
        'Rode into Raccoon City looking for her brother and never really left the outbreak business. The heart of the series\' survivor stories.'
    },
    {
      id: 're-ada',
      name: 'Ada Wong',
      role: 'Spy of shifting loyalties',
      portraitUrl:
        'https://static.wikia.nocookie.net/residentevil/images/a/a7/Ada_Wong_RE6_render.png/revision/latest?cb=20260116014956',
      appearsIn: ['re-2', 're-2-remake', 're-4', 're-4-remake', 're-6'],
      blurb:
        'Red dress, grappling hook, allegiance unknown — to everyone including the writers. The series\' longest-running enigma.'
    },
    {
      id: 're-wesker',
      name: 'Albert Wesker',
      role: 'The traitor',
      portraitUrl:
        'https://static.wikia.nocookie.net/residentevil/images/e/e4/Wesker_Revelations_2_Render.png/revision/latest?cb=20150302074104',
      appearsIn: ['re-1', 're-remake', 're-0', 're-code-veronica', 're-5'],
      blurb:
        'S.T.A.R.S. captain, Umbrella double agent, and eventually a sunglasses-at-night god of the new world order. Complete. Global. Saturation.'
    },
    {
      id: 're-ethan',
      name: 'Ethan Winters',
      role: 'Protagonist (7, Village)',
      portraitUrl:
        'https://static.wikia.nocookie.net/residentevil/images/4/4f/Ethan_Village_Render.png/revision/latest?cb=20210203080824',
      appearsIn: ['re-7', 're-village'],
      blurb:
        'An ordinary man whose search for his wife walks him into the Bakers\' dinner table and a village of monsters. Loses more body parts than any hero in the series and keeps going.'
    }
  ]
}
