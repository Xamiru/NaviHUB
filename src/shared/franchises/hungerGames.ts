// The Hunger Games — Suzanne Collins's five novels and the five Lionsgate
// films released so far. Books: The Hunger Games, Catching Fire, Mockingjay,
// the prequel The Ballad of Songbirds and Snakes and Sunrise on the Reaping
// (2025), each one row under its Open Library work. Films: The Hunger Games,
// Catching Fire, Mockingjay - Part 1 and Part 2, and The Ballad of Songbirds &
// Snakes (TMDB).
// Chrono is in-universe: Ballad (the 10th Games) first, Sunrise on the Reaping
// (the 50th Games) second, then the trilogy in order. The films share their
// source book's slot, and both Mockingjay films share the third book's.
// Excluded: the Sunrise on the Reaping film (TMDB lists it for 2026-11-19,
// after the 2026-10-14 cutoff), the trilogy box sets, the companion guides,
// concert and making-of specials and the video games.
// Ids from Open Library and TMDB (en-US); dates from Wikipedia (books) and TMDB
// US theatrical releases (films), all checked 2026-10-14.

import type { FranchiseCfg } from './types'

const TM = 'https://image.tmdb.org/t/p'

export const HUNGER_GAMES: FranchiseCfg = {
  id: 'hunger-games',
  name: 'The Hunger Games',
  short: 'Hunger Games',
  color: '#c9a227',
  heroUrl: `${TM}/w1280/1e6UnNFSA0O1US23gm6UrungaA9.jpg`,
  studio: 'Suzanne Collins / Lionsgate',
  tagline: 'Twenty-four children are sent into an arena every year to entertain the Capitol; one of them volunteers for her sister.',
  trivia: [
    {
      title: 'Where Panem comes from',
      body: 'Collins has said the idea came to her while she flipped between reality television and coverage of the war in Iraq. The country of Panem takes its name from the Latin phrase "panem et circenses", bread and circuses, the Roman writer Juvenal\'s phrase for what rulers give a population to keep it quiet.'
    },
    {
      title: 'A trilogy that became a quintet',
      body: 'The Hunger Games (2008), Catching Fire (2009) and Mockingjay (2010) formed the original trilogy. The Ballad of Songbirds and Snakes (2020) goes back 64 years to the 10th Games and a young Coriolanus Snow, and Sunrise on the Reaping (2025) follows Haymitch Abernathy through the 50th Games, the Second Quarter Quell.'
    },
    {
      title: 'Four films from three books',
      body: 'Lionsgate released The Hunger Games in 2012 and Catching Fire in 2013, then split Mockingjay into two films, in 2014 and 2015. The Ballad of Songbirds & Snakes followed in 2023, so a newcomer reading in release order meets the prequel after the trilogy.'
    }
  ],
  entries: [
    {
      id: 'hg-book-1',
      title: 'The Hunger Games',
      mediaType: 'book',
      externalIds: [{ source: 'openlibrary', id: 'OL5735363W' }],
      year: 2008,
      releaseDate: '2008-09-14',
      chrono: 3,
      note: 'Katniss Everdeen volunteers in her sister\'s place for the 74th Hunger Games'
    },
    {
      id: 'hg-book-2',
      title: 'Catching Fire',
      mediaType: 'book',
      externalIds: [{ source: 'openlibrary', id: 'OL5735360W' }],
      year: 2009,
      releaseDate: '2009-09-01',
      chrono: 4,
      note: 'A defiant Katniss and Peeta are drawn into the Quarter Quell, an arena of past victors'
    },
    {
      id: 'hg-book-3',
      title: 'Mockingjay',
      mediaType: 'book',
      externalIds: [{ source: 'openlibrary', id: 'OL14908941W' }],
      year: 2010,
      releaseDate: '2010-08-24',
      chrono: 5,
      note: 'The districts rise in open rebellion, with Katniss as its symbol'
    },
    {
      id: 'hg-film-1',
      title: 'The Hunger Games',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '70160' }],
      year: 2012,
      releaseDate: '2012-03-23',
      chrono: 3,
      mc: 72,
      adaptation: true,
      note: 'Gary Ross\'s film of the first novel, with Jennifer Lawrence as Katniss'
    },
    {
      id: 'hg-film-2',
      title: 'The Hunger Games: Catching Fire',
      mediaType: 'movie',
      aliases: ['Catching Fire'],
      externalIds: [{ source: 'tmdb', id: '101299' }],
      year: 2013,
      releaseDate: '2013-11-22',
      chrono: 4,
      mc: 74,
      adaptation: true,
      note: 'Francis Lawrence takes over as director for the Quarter Quell'
    },
    {
      id: 'hg-film-3',
      title: 'The Hunger Games: Mockingjay - Part 1',
      mediaType: 'movie',
      aliases: ['Mockingjay - Part 1'],
      externalIds: [{ source: 'tmdb', id: '131631' }],
      year: 2014,
      releaseDate: '2014-11-21',
      chrono: 5,
      mc: 68,
      adaptation: true,
      note: 'The first half of Mockingjay: Katniss becomes the face of District 13\'s propaganda'
    },
    {
      id: 'hg-film-4',
      title: 'The Hunger Games: Mockingjay - Part 2',
      mediaType: 'movie',
      aliases: ['Mockingjay - Part 2'],
      externalIds: [{ source: 'tmdb', id: '131634' }],
      year: 2015,
      releaseDate: '2015-11-20',
      chrono: 5,
      mc: 69,
      adaptation: true,
      note: 'The march on the Capitol and the end of the story'
    },
    {
      id: 'hg-book-ballad',
      title: 'The Ballad of Songbirds and Snakes',
      mediaType: 'book',
      externalIds: [{ source: 'openlibrary', id: 'OL20716197W' }],
      year: 2020,
      releaseDate: '2020-05-19',
      chrono: 1,
      note: 'Prequel: an 18-year-old Coriolanus Snow mentors a tribute in the 10th Hunger Games'
    },
    {
      id: 'hg-film-ballad',
      title: 'The Hunger Games: The Ballad of Songbirds & Snakes',
      mediaType: 'movie',
      aliases: ['The Ballad of Songbirds and Snakes'],
      externalIds: [{ source: 'tmdb', id: '695721' }],
      year: 2023,
      releaseDate: '2023-11-17',
      chrono: 1,
      mc: 70,
      adaptation: true,
      note: 'Francis Lawrence\'s film of the prequel, with Tom Blyth as the young Snow'
    },
    {
      id: 'hg-book-sunrise',
      title: 'Sunrise on the Reaping',
      mediaType: 'book',
      externalIds: [{ source: 'openlibrary', id: 'OL43426400W' }],
      year: 2025,
      releaseDate: '2025-03-18',
      chrono: 2,
      note: 'Prequel: Haymitch Abernathy is reaped for the 50th Hunger Games, the Second Quarter Quell'
    }
  ],
  characters: [
    {
      id: 'hg-katniss',
      name: 'Katniss Everdeen',
      role: 'Tribute from District 12',
      portraitUrl: `${TM}/w300_and_h450_face/6WTY6HjXMGxnHilJRVC3eLnu43F.jpg`,
      appearsIn: ['hg-book-1', 'hg-book-2', 'hg-book-3', 'hg-film-1', 'hg-film-2', 'hg-film-3', 'hg-film-4'],
      blurb: 'A hunter who volunteers in her little sister\'s place and becomes the symbol of the rebellion; Jennifer Lawrence plays her in the films.'
    },
    {
      id: 'hg-peeta',
      name: 'Peeta Mellark',
      role: 'Tribute from District 12',
      portraitUrl: `${TM}/w300_and_h450_face/f0eosZ1Fx0VBUyspq8K2f8sUSBn.jpg`,
      appearsIn: ['hg-book-1', 'hg-book-2', 'hg-book-3', 'hg-film-1', 'hg-film-2', 'hg-film-3', 'hg-film-4'],
      blurb: 'The baker\'s son chosen as the male tribute beside Katniss, played by Josh Hutcherson.'
    },
    {
      id: 'hg-gale',
      name: 'Gale Hawthorne',
      role: 'Hunter',
      portraitUrl: `${TM}/w300_and_h450_face/As5ujeSSJRQN4TE3odg3kDk0b5o.jpg`,
      appearsIn: ['hg-book-1', 'hg-book-2', 'hg-book-3', 'hg-film-1', 'hg-film-2', 'hg-film-3', 'hg-film-4'],
      blurb: 'Katniss\'s hunting partner and friend in District 12, played by Liam Hemsworth.'
    },
    {
      id: 'hg-haymitch',
      name: 'Haymitch Abernathy',
      role: 'Mentor',
      portraitUrl: `${TM}/w300_and_h450_face/igxYDQBbTEdAqaJxaW6ffqswmUU.jpg`,
      appearsIn: [
        'hg-book-1',
        'hg-book-2',
        'hg-book-3',
        'hg-book-sunrise',
        'hg-film-1',
        'hg-film-2',
        'hg-film-3',
        'hg-film-4'
      ],
      blurb: 'District 12\'s only living victor and the mentor of Katniss and Peeta, played by Woody Harrelson; he is the hero of Sunrise on the Reaping.'
    },
    {
      id: 'hg-effie',
      name: 'Effie Trinket',
      role: 'Escort',
      portraitUrl: `${TM}/w300_and_h450_face/wMDFt9PUdxJWBzTwixiBfNpeN89.jpg`,
      appearsIn: ['hg-book-1', 'hg-book-2', 'hg-book-3', 'hg-film-1', 'hg-film-2', 'hg-film-3', 'hg-film-4'],
      blurb: 'The Capitol escort who draws District 12\'s names at the reaping, played by Elizabeth Banks.'
    },
    {
      id: 'hg-snow',
      name: 'Coriolanus Snow',
      role: 'President of Panem',
      portraitUrl: `${TM}/w300_and_h450_face/t9rN5Vni7GYmqqNi9nANCZbmewx.jpg`,
      appearsIn: [
        'hg-book-1',
        'hg-book-2',
        'hg-book-3',
        'hg-book-ballad',
        'hg-film-1',
        'hg-film-2',
        'hg-film-3',
        'hg-film-4',
        'hg-film-ballad'
      ],
      blurb: 'The president of Panem, played by Donald Sutherland in the films; the prequel follows him as a student, played there by Tom Blyth.'
    },
    {
      id: 'hg-lucy-gray',
      name: 'Lucy Gray Baird',
      role: 'Tribute from District 12',
      portraitUrl: `${TM}/w300_and_h450_face/2zR0rz3yluyWoFgCL3lGAPoRWlz.jpg`,
      appearsIn: ['hg-book-ballad', 'hg-film-ballad'],
      blurb: 'A singer from the Covey who is chosen for the 10th Games, played by Rachel Zegler.'
    }
  ]
}
