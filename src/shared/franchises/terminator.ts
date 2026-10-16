// Terminator — James Cameron's The Terminator and Terminator 2, and every
// later film and series built on them, across several continuities. NO chrono
// and no route on any entry: the sequels reboot and branch (Rise of the
// Machines and Salvation follow T2; The Sarah Connor Chronicles follows T2 and
// ignores Rise of the Machines; Genisys resets the timeline from the 1984
// film; Dark Fate follows T2 and discards everything after it; Terminator Zero
// is a separate anime story), so the note on each entry names its
// continuity instead. Excluded: the Terminator 2 3-D theme-park film, the
// Salvation machinima web series, and licensed games.
// Ids and dates from TMDB (en-US), Steam and Open Library, curl-verified
// 2026-10-14. Film dates are the earliest US row on TMDB's releases page.

import type { FranchiseCfg } from './types'

const TM = 'https://image.tmdb.org/t/p'

export const TERMINATOR: FranchiseCfg = {
  id: 'terminator',
  name: 'Terminator',
  short: 'Terminator',
  color: '#c2392b',
  heroUrl: `${TM}/w1280/ztBeLd2UCbUATJ1cXwwHev3G3xX.jpg`,
  studio: 'Carolco / Skydance / Paramount',
  tagline: 'Machines from the future keep returning to change the war that has not happened yet.',
  trivia: [
    {
      title: 'Several timelines, one premise',
      body: 'Every Terminator story rests on the same idea: a machine war in the future, and agents sent back to alter the past. The 1984 film and Terminator 2 (1991) set that up; later entries disagree about what followed. Rise of the Machines continues from T2 and Salvation from it, Genisys resets the timeline, and Dark Fate ignores every film after T2.'
    },
    {
      title: 'The T-800, the T-1000 and the shape of action films',
      body: 'Arnold Schwarzenegger plays the T-800 in the first film as a relentless killer and in T2 as a protector. Terminator 2 introduced the liquid-metal T-1000, played by Robert Patrick, and its computer-generated effects were among the most influential of their time.'
    },
    {
      title: 'Television and animation',
      body: 'Terminator: The Sarah Connor Chronicles (2008) followed Sarah and John Connor after T2 on Fox for two seasons. Terminator Zero (2024) is a Netflix anime set in 1997 Japan, produced by Production I.G.'
    }
  ],
  entries: [
    {
      id: 'term-1984',
      title: 'The Terminator',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '218' }],
      year: 1984,
      releaseDate: '1984-10-26',
      mc: 77,
      note: 'Cameron’s original: a Terminator and a soldier are sent to 1984 to find Sarah Connor'
    },
    {
      id: 'term-2',
      title: 'Terminator 2: Judgment Day',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '280' }],
      year: 1991,
      releaseDate: '1991-07-01',
      mc: 82,
      note: 'Continuity of the 1984 film: a reprogrammed T-800 protects young John Connor from a T-1000'
    },
    {
      id: 'term-3',
      title: 'Terminator 3: Rise of the Machines',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '296' }],
      year: 2003,
      releaseDate: '2003-06-30',
      mc: 62,
      note: 'Continues from T2: Judgment Day is delayed rather than prevented'
    },
    {
      id: 'term-sarah-connor',
      title: 'Terminator: The Sarah Connor Chronicles',
      mediaType: 'tv',
      externalIds: [{ source: 'tmdb', id: '433' }],
      year: 2008,
      releaseDate: '2008-01-13',
      spinOff: true,
      mc: 75,
      note: 'Fox series that follows T2 and ignores Rise of the Machines'
    },
    {
      id: 'term-salvation',
      title: 'Terminator Salvation',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '534' }],
      year: 2009,
      releaseDate: '2009-05-14',
      mc: 61,
      note: 'Set in 2018 during the war, in the continuity of the first three films'
    },
    {
      id: 'term-genisys',
      title: 'Terminator Genisys',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '87101' }],
      year: 2015,
      releaseDate: '2015-07-01',
      mc: 60,
      note: 'Reboot: an altered timeline rewrites the 1984 events'
    },
    {
      id: 'term-dark-fate',
      title: 'Terminator: Dark Fate',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '290859' }],
      year: 2019,
      releaseDate: '2019-11-01',
      mc: 64,
      note: 'Direct sequel to T2 that discards Rise of the Machines and everything after; Linda Hamilton returns as Sarah Connor'
    },
    {
      id: 'term-zero',
      title: 'Terminator Zero',
      mediaType: 'tv',
      externalIds: [{ source: 'tmdb', id: '239287' }],
      year: 2024,
      releaseDate: '2024-08-29',
      spinOff: true,
      mc: 71,
      note: 'Netflix anime set in 1997 Japan, in its own continuity'
    }
  ],
  characters: [
    {
      id: 'term-t800',
      name: 'The Terminator (T-800)',
      role: 'Cyborg assassin, later protector',
      portraitUrl: `${TM}/w300_and_h450_face/4jM3vsHIEQVeNFifiTAUDVAmiUo.jpg`,
      appearsIn: ['term-1984', 'term-2', 'term-3', 'term-genisys', 'term-dark-fate'],
      blurb: 'A Cyberdyne Model 101 sent back to kill Sarah Connor in 1984, then reprogrammed and sent back again to protect her son: the machine that learns why people cry. Arnold Schwarzenegger plays it.'
    },
    {
      id: 'term-sarah',
      name: 'Sarah Connor',
      role: 'Mother of the future resistance leader',
      portraitUrl: `${TM}/w300_and_h450_face/7FNn9Z5xkRS9EFbGL2tpmpph9xV.jpg`,
      appearsIn: ['term-1984', 'term-2', 'term-dark-fate'],
      blurb: 'A waitress told by a stranger from the future that her unborn son will save mankind; by T2 she is an asylum inmate and the hardest soldier of a war that has not started. Linda Hamilton plays her.'
    },
    {
      id: 'term-reese',
      name: 'Kyle Reese',
      role: 'Soldier sent back from 2029',
      portraitUrl: `${TM}/w300_and_h450_face/9oFLsADWQm2TvU8XzLIzBbjdMkU.jpg`,
      appearsIn: ['term-1984'],
      blurb: 'The resistance soldier who volunteers to go back for Sarah because he fell for her photograph — and becomes John Connor’s father. Michael Biehn plays him.'
    },
    {
      id: 'term-t1000',
      name: 'The T-1000',
      role: 'Liquid-metal Terminator',
      portraitUrl: `${TM}/w300_and_h450_face/qRv2Es9rZoloullTbzss3I5j1Mp.jpg`,
      appearsIn: ['term-2'],
      blurb: 'Skynet’s liquid-metal prototype, able to become anyone it touches, who hunts John across Los Angeles in a police uniform. Robert Patrick plays it.'
    },
    {
      id: 'term-john',
      name: 'John Connor',
      role: 'Future resistance leader',
      portraitUrl: `${TM}/w300_and_h450_face/e221dMIBgb6Lk092GIkHB9ohQF1.jpg`,
      appearsIn: ['term-2'],
      blurb: 'The future leader of the human resistance, a ten-year-old delinquent in T2 who teaches his machine guardian not to kill. Edward Furlong plays him.'
    },
    {
      id: 'term-grace',
      name: 'Grace',
      role: 'Augmented soldier from the future',
      portraitUrl: `${TM}/w300_and_h450_face/ekQbEIKh26jbz17P0wwLbo6uNs9.jpg`,
      appearsIn: ['term-dark-fate'],
      blurb: 'An augmented soldier from a future war against Legion, sent back to protect Dani Ramos — who, in this timeline, is the leader humanity needs. Mackenzie Davis plays her.'
    }
  ]
}
