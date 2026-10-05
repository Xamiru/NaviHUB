// Twin Peaks — Mark Frost and David Lynch's series, film and companion books.
// TMDB treats the original 1990-91 run and 2017's The Return as ONE television
// series (id 1920, 48 total episodes: 30 original plus 18 for The Return), so
// this page has a single TV row covering both rather than a separate row for
// The Return. Core rows: that TV series, Fire Walk with Me, The Missing
// Pieces (deleted scenes cut as their own release), and three companion
// books — The Secret Diary of Laura Palmer, The Secret History of Twin Peaks
// and Twin Peaks: The Final Dossier. Route is the standard recommended viewing
// order: the TV series (through its original two seasons), then Fire Walk
// with Me, with The Missing Pieces and the books as optional detours — The
// Return itself is reached by continuing the same TV entry past season two.
// Chrono is in-universe order: the Secret Diary covers years before Laura's
// death, Fire Walk with Me covers her final week, the TV series covers the
// investigation onward (including The Return 25 years later), and the two
// Mark Frost books are framed as compiled shortly before and shortly after
// The Return. Ids and dates from TMDB (en-US) and Open Library, curl-verified
// 2026-10-05.

import type { FranchiseCfg } from './types'

const TM = 'https://image.tmdb.org/t/p'

export const TWIN_PEAKS: FranchiseCfg = {
  id: 'twin-peaks',
  name: 'Twin Peaks',
  short: 'Twin Peaks',
  color: '#5b7b9a',
  heroUrl: `${TM}/w1280/dZklTql88IDOmkC3JAYQSTgyK6f.jpg`,
  studio: 'Lynch/Frost Productions',
  tagline: 'Who killed Laura Palmer — and what waits in the woods outside a small logging town.',
  trivia: [
    {
      title: 'A murder mystery that became something stranger',
      body: 'Twin Peaks (1990) opens with the discovery of homecoming queen Laura Palmer\'s body and FBI Agent Dale Cooper\'s investigation into a small Washington logging town full of secrets. ABC pressured Lynch and Frost to reveal the killer partway through the second season, after which ratings fell and the show was cancelled; its finale leaves Cooper in a dire cliffhanger that went unresolved for twenty-five years.'
    },
    {
      title: 'A prequel film, not a wrap-up',
      body: 'Twin Peaks: Fire Walk with Me (1992) is a prequel covering Laura Palmer\'s last week alive, not a continuation of the series\' cliffhanger, and its grim tone and poor initial reception left the story in limbo for decades. The Missing Pieces assembles roughly ninety minutes of deleted Fire Walk with Me footage, including material involving other series characters that was cut from the theatrical release.'
    },
    {
      title: 'The Return, twenty-five years later',
      body: 'Showtime\'s 2017 continuation, retroactively folded into the original series as its third season, resolves the finale\'s cliffhanger on its own uncompromising terms. Mark Frost\'s two companion novels bookend it: The Secret History of Twin Peaks is a found-document history released the year before The Return, and Twin Peaks: The Final Dossier follows it to account for where the show\'s characters ended up.'
    }
  ],
  entries: [
    {
      id: 'tp-tv',
      title: 'Twin Peaks',
      mediaType: 'tv',
      externalIds: [{ source: 'tmdb', id: '1920' }],
      year: 1990,
      releaseDate: '1990-04-08',
      chrono: 3,
      route: 1,
      note: 'Agent Cooper investigates Laura Palmer\'s murder; The Return (2017) is its third season'
    },
    {
      id: 'tp-secret-diary',
      title: 'The Secret Diary of Laura Palmer',
      mediaType: 'book',
      externalIds: [{ source: 'openlibrary', id: 'OL4201255W' }],
      year: 1990,
      releaseDate: '1990-09-14',
      chrono: 1,
      route: 4,
      optional: true,
      note: 'Jennifer Lynch\'s tie-in novel, Laura\'s own diary covering the years leading up to her death'
    },
    {
      id: 'tp-fwwm',
      title: 'Twin Peaks: Fire Walk with Me',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '1923' }],
      year: 1992,
      releaseDate: '1992-06-03',
      chrono: 2,
      route: 2,
      note: 'Prequel film covering Laura Palmer\'s last seven days, and the unsolved Teresa Banks murder a year earlier'
    },
    {
      id: 'tp-missing-pieces',
      title: 'Twin Peaks: The Missing Pieces',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '284457' }],
      year: 2014,
      releaseDate: '2014-07-16',
      chrono: 2,
      route: 3,
      optional: true,
      note: 'Roughly ninety minutes of deleted Fire Walk with Me scenes, assembled as their own release'
    },
    {
      id: 'tp-secret-history',
      title: 'The Secret History of Twin Peaks',
      mediaType: 'book',
      externalIds: [{ source: 'openlibrary', id: 'OL19604068W' }],
      year: 2016,
      releaseDate: '2016-10-18',
      chrono: 4,
      route: 5,
      optional: true,
      note: 'Mark Frost\'s found-document history of the town, framed as an FBI dossier compiled just before The Return'
    },
    {
      id: 'tp-final-dossier',
      title: 'Twin Peaks: The Final Dossier',
      mediaType: 'book',
      externalIds: [{ source: 'openlibrary', id: 'OL19650387W' }],
      year: 2017,
      releaseDate: '2017-11-02',
      chrono: 5,
      route: 6,
      optional: true,
      note: 'Mark Frost\'s follow-up dossier, accounting for the characters\' fates after The Return'
    }
  ],
  characters: [
    {
      id: 'tp-cooper',
      name: 'Dale Cooper',
      role: 'FBI Special Agent',
      portraitUrl: `${TM}/w300_and_h450_face/7gNyx8fYAUdOp2jpCEH3dyFbeV.jpg`,
      appearsIn: ['tp-tv'],
      blurb: 'The FBI agent sent to investigate Laura Palmer\'s murder, whose genuine warmth and taste for coffee and pie make him the show\'s emotional center.'
    },
    {
      id: 'tp-laura',
      name: 'Laura Palmer',
      role: 'Homecoming queen',
      portraitUrl: `${TM}/w300_and_h450_face/kqAg6YjwTM1l7Ijffl6W3LCreSF.jpg`,
      appearsIn: ['tp-fwwm', 'tp-missing-pieces'],
      blurb: 'The homecoming queen whose murder opens the series; Fire Walk with Me shows her final week and the abuse she hid from everyone around her.'
    },
    {
      id: 'tp-leland',
      name: 'Leland Palmer',
      role: 'Laura\'s father',
      portraitUrl: `${TM}/w300_and_h450_face/60313U01R1j9eueDBXiIh9o55RQ.jpg`,
      appearsIn: ['tp-fwwm'],
      blurb: 'Laura\'s father, a respected attorney whose composure conceals the truth behind his daughter\'s murder.'
    },
    {
      id: 'tp-shelly',
      name: 'Shelly Johnson',
      role: 'Double R Diner waitress',
      portraitUrl: `${TM}/w300_and_h450_face/Af47IaCUF9BYzmGBycZiKjqIwYf.jpg`,
      appearsIn: ['tp-tv', 'tp-fwwm'],
      blurb: 'A waitress at the Double R Diner trapped in an abusive marriage to Leo Johnson, and one of Laura\'s few real friends.'
    },
    {
      id: 'tp-bobby',
      name: 'Bobby Briggs',
      role: 'Laura\'s boyfriend',
      portraitUrl: `${TM}/w300_and_h450_face/sAR3KoRwOxV9sztnEuTi5nLrTlz.jpg`,
      appearsIn: ['tp-tv', 'tp-fwwm'],
      blurb: 'Laura\'s troubled boyfriend at the time of her death, whose grief and guilt push him toward a longer road to decency.'
    },
    {
      id: 'tp-ben-horne',
      name: 'Benjamin Horne',
      role: 'Owner of the Great Northern Hotel',
      portraitUrl: `${TM}/w300_and_h450_face/q0RQwBRnBFonTgXXDyE7I8MgucV.jpg`,
      appearsIn: ['tp-tv'],
      blurb: 'The town\'s wealthiest businessman, whose schemes to develop Twin Peaks tangle him in Laura\'s life and its aftermath.'
    },
    {
      id: 'tp-albert',
      name: 'Albert Rosenfield',
      role: 'FBI forensic pathologist',
      portraitUrl: `${TM}/w300_and_h450_face/n6VZ8OQmozHmnJQRwR55gBH8Tl0.jpg`,
      appearsIn: ['tp-tv', 'tp-fwwm'],
      blurb: 'The FBI\'s acid-tongued forensic pathologist, whose contempt for small-town sentiment hides real loyalty to Cooper.'
    }
  ]
}
