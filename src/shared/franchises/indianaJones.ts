// Indiana Jones — the five theatrical films, The Young Indiana Jones
// Chronicles television series, and the two main adventure games, Indiana Jones
// and the Fate of Atlantis (1992) and Indiana Jones and the Great Circle
// (2024). One continuity, so chrono follows in-universe time: the Young Indy
// series (1908-1920) first, then Temple of Doom (1935), Raiders (1936), the
// Great Circle (1937), Last Crusade (1938), Fate of Atlantis (1939), Kingdom
// of the Crystal Skull (1957) and Dial of Destiny (1969). Route is release
// order of the films, with the series and games as optional detours.
// Excluded: the LEGO Indiana Jones games and the other licensed tie-in titles.
// Fate of Atlantis carries no release date: Wikidata lists only the year 1992,
// and Steam's 2009 date is a relisting of the 1992 game.
// Ids and dates from TMDB (en-US), Steam and Open Library, curl-verified
// 2026-10-14. Film dates are the earliest US row on TMDB's releases page.

import type { FranchiseCfg } from './types'

const TM = 'https://image.tmdb.org/t/p'

export const INDIANA_JONES: FranchiseCfg = {
  id: 'indiana-jones',
  name: 'Indiana Jones',
  short: 'Indiana Jones',
  color: '#b5651d',
  heroUrl: `${TM}/w1280/zPACwR32amTNvzId9qyapCWXYDJ.jpg`,
  studio: 'Lucasfilm',
  tagline: 'Archaeologist, professor and reluctant hero, chasing relics through four decades.',
  trivia: [
    {
      title: 'A serial for the cinema',
      body: 'George Lucas and Steven Spielberg made Raiders of the Lost Ark (1981) as a tribute to Saturday-morning adventure serials, with Harrison Ford as the archaeologist Indiana Jones. Temple of Doom (1984) is a prequel set in 1935, a year before Raiders; Last Crusade (1989) adds Sean Connery as Indy’s father.'
    },
    {
      title: 'Before and after the films',
      body: 'The Young Indiana Jones Chronicles (1992) follows Indy from childhood through the First World War. Kingdom of the Crystal Skull (2008) moves the story to 1957, and Dial of Destiny (2023) is set in 1969 and is Ford’s fifth film in the role.'
    },
    {
      title: 'Adventure games',
      body: 'LucasArts’ Indiana Jones and the Fate of Atlantis (1992) is an original adventure story rather than an adaptation of a film. MachineGames’ Indiana Jones and the Great Circle (2024) is set between Raiders and Last Crusade in 1937.'
    }
  ],
  entries: [
    {
      id: 'indy-raiders',
      title: 'Raiders of the Lost Ark',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '85' }],
      year: 1981,
      releaseDate: '1981-06-12',
      chrono: 3,
      route: 1,
      mc: 79,
      note: 'Indy races the Nazis to the Ark of the Covenant in 1936'
    },
    {
      id: 'indy-doom',
      title: 'Indiana Jones and the Temple of Doom',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '87' }],
      year: 1984,
      releaseDate: '1984-05-08',
      chrono: 2,
      route: 2,
      mc: 73,
      note: 'A prequel set in 1935: Indy, Short Round and Willie Scott in India and Shanghai'
    },
    {
      id: 'indy-crusade',
      title: 'Indiana Jones and the Last Crusade',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '89' }],
      year: 1989,
      releaseDate: '1989-05-24',
      chrono: 5,
      route: 3,
      mc: 79,
      note: 'Indy and his father search for the Holy Grail'
    },
    {
      id: 'indy-atlantis',
      title: 'Indiana Jones and the Fate of Atlantis',
      externalIds: [{ source: 'steam', id: '6010' }],
      year: 1992,
      chrono: 6,
      route: 7,
      optional: true,
      note: 'LucasArts adventure: a 1939 hunt for Atlantis'
    },
    {
      id: 'indy-young',
      title: 'The Young Indiana Jones Chronicles',
      mediaType: 'tv',
      externalIds: [{ source: 'tmdb', id: '661' }],
      year: 1992,
      releaseDate: '1992-03-04',
      chrono: 1,
      route: 6,
      optional: true,
      spinOff: true,
      mc: 65,
      note: 'Television series following Indy from childhood to his twenties'
    },
    {
      id: 'indy-skull',
      title: 'Indiana Jones and the Kingdom of the Crystal Skull',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '217' }],
      year: 2008,
      releaseDate: '2008-05-22',
      chrono: 7,
      route: 4,
      mc: 60,
      note: 'The 1957 sequel, with a Cold War adversary and Marion Ravenwood returning'
    },
    {
      id: 'indy-dial',
      title: 'Indiana Jones and the Dial of Destiny',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '335977' }],
      year: 2023,
      releaseDate: '2023-06-14',
      chrono: 8,
      route: 5,
      mc: 65,
      note: 'The 1969 farewell, with Helena Shaw and the search for Archimedes’ dial'
    },
    {
      id: 'indy-great-circle',
      title: 'Indiana Jones and the Great Circle',
      externalIds: [{ source: 'steam', id: '2677660' }],
      year: 2024,
      releaseDate: '2024-12-08',
      chrono: 4,
      route: 8,
      optional: true,
      mc: 87,
      note: 'MachineGames’ first-person adventure set between Raiders and Last Crusade'
    }
  ],
  characters: [
    {
      id: 'indy-indiana',
      name: 'Indiana Jones',
      role: 'Archaeologist',
      portraitUrl: `${TM}/w300_and_h450_face/pjBMJVPpcZK23Vt1nzr1zEBTWrP.jpg`,
      appearsIn: ['indy-raiders', 'indy-doom', 'indy-crusade', 'indy-skull', 'indy-dial'],
      blurb: 'Harrison Ford’s professor-adventurer, who hates snakes and loves old objects.'
    },
    {
      id: 'indy-marion',
      name: 'Marion Ravenwood',
      role: 'Old flame',
      portraitUrl: `${TM}/w300_and_h450_face/75yyZZyinCUcuK8pOSXnggmuiRp.jpg`,
      appearsIn: ['indy-raiders', 'indy-skull', 'indy-dial'],
      blurb: 'Karen Allen’s tavern owner, tough enough to match Indy in the first film.'
    },
    {
      id: 'indy-henry',
      name: 'Henry Jones Sr.',
      role: 'Indy’s father',
      portraitUrl: `${TM}/w300_and_h450_face/cd0zKpYJ6eSutkrZkLFxQCGjhnF.jpg`,
      appearsIn: ['indy-crusade'],
      blurb: 'Sean Connery’s medievalist is the reason Indy goes looking for the Grail.'
    },
    {
      id: 'indy-sallah',
      name: 'Sallah',
      role: 'Excavator and friend',
      portraitUrl: `${TM}/w300_and_h450_face/qpXl1YnqQsUKYEDm3BB2zK5wbhe.jpg`,
      appearsIn: ['indy-raiders', 'indy-crusade', 'indy-dial'],
      blurb: 'John Rhys-Davies’ Cairo digger is one of Indy’s most dependable allies.'
    },
    {
      id: 'indy-short-round',
      name: 'Short Round',
      role: 'Sidekick',
      portraitUrl: `${TM}/w300_and_h450_face/iestHyn7PLuVowj5Jaa1SGPboQ4.jpg`,
      appearsIn: ['indy-doom'],
      blurb: 'Ke Huy Quan’s young driver and partner in Temple of Doom.'
    },
    {
      id: 'indy-helena',
      name: 'Helena Shaw',
      role: 'Goddaughter',
      portraitUrl: `${TM}/w300_and_h450_face/5VbadQsYCKdiJysP01LJFPmYB8A.jpg`,
      appearsIn: ['indy-dial'],
      blurb: 'Phoebe Waller-Bridge’s treasure hunter joins Indy in Dial of Destiny.'
    },
    {
      id: 'indy-belloq',
      name: 'René Belloq',
      role: 'Rival archaeologist',
      portraitUrl: `${TM}/w300_and_h450_face/qrjgLfuNdXektuBwNL6onZBkbHw.jpg`,
      appearsIn: ['indy-raiders'],
      blurb: 'Paul Freeman plays Indy’s French rival, who works for the Nazis in the first film.'
    }
  ]
}
