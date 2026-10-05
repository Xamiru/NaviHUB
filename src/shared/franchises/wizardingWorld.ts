// Wizarding World — J.K. Rowling's Harry Potter novels and the Warner Bros.
// film adaptations, plus the Fantastic Beasts prequel trilogy and the Cursed
// Child stage play script. Core rows: the seven Harry Potter novels, the eight
// Harry Potter films, the three Fantastic Beasts films, and Harry Potter and
// the Cursed Child as a book (the play's published script). HBO's Harry Potter
// television series is EXCLUDED: TMDB lists it with a first-air date of
// 2026-12-25, which is after this page's 2026-10-05 cutoff, so it has not
// aired yet. Chrono is in-universe order with Fantastic Beasts first (1926-
// 1932ish, decades before Harry's birth), then the seven Potter-era story
// beats in sequence, then Cursed Child last (set nineteen years after the
// Battle of Hogwarts). An adaptation shares its source book's chrono slot.
// Entries are authored in RELEASE order, so the three Fantastic Beasts films
// (2016-2022) sit near the end of the array despite being chrono-earliest.
// Ids and dates from TMDB (en-US) and Open Library, curl-verified 2026-10-05.

import type { FranchiseCfg } from './types'

const TM = 'https://image.tmdb.org/t/p'

export const WIZARDING_WORLD: FranchiseCfg = {
  id: 'wizarding-world',
  name: 'Wizarding World',
  short: 'Wizarding World',
  color: '#740001',
  heroUrl: `${TM}/w1280/lvOLivVeX3DVVcwfVkxKf0R22D8.jpg`,
  studio: 'Warner Bros.',
  tagline: 'Seven years at Hogwarts, and the century of wizarding history behind them.',
  trivia: [
    {
      title: 'One series, two generations of film',
      body: 'J.K. Rowling\'s seven novels (1997-2007) follow Harry Potter from age eleven through the final defeat of Lord Voldemort at seventeen. Warner Bros. adapted all seven as eight films, splitting the longest book, Deathly Hallows, into two parts to cover its ground. Fantastic Beasts and Where to Find Them began a planned five-film prequel series set generations earlier, following magizoologist Newt Scamander and a young Albus Dumbledore\'s opposition to the dark wizard Gellert Grindelwald; only three of the planned films were made.'
    },
    {
      title: 'The cast that aged with the story',
      body: 'Daniel Radcliffe, Emma Watson and Rupert Grint were cast as children and grew up on screen across the decade it took to film all eight movies, which is part of why the series is often watched as a continuous saga rather than individual films. Michael Gambon took over as Dumbledore from Richard Harris, who died after the second film, and Helena Bonham Carter, Ralph Fiennes and others returning across many entries let the films build a consistent ensemble despite the long production.'
    },
    {
      title: 'After the books',
      body: 'Harry Potter and the Cursed Child, a stage play written by Jack Thorne from a story by Rowling, Thorne and director John Tiffany, continues the story nineteen years later, following Harry\'s son Albus and Draco Malfoy\'s son Scorpius. It is usually read as a published script rather than performed, which is why this page treats it as a book alongside the novels.'
    }
  ],
  entries: [
    {
      id: 'hp-ps-book',
      title: 'Harry Potter and the Philosopher\'s Stone',
      mediaType: 'book',
      aliases: ['Harry Potter and the Sorcerer\'s Stone'],
      externalIds: [{ source: 'openlibrary', id: 'OL82563W' }],
      year: 1997,
      releaseDate: '1997-06-26',
      chrono: 4,
      route: 1,
      optional: true,
      note: 'Harry learns he is a wizard and starts at Hogwarts, where Voldemort is after the Philosopher\'s Stone'
    },
    {
      id: 'hp-cos-book',
      title: 'Harry Potter and the Chamber of Secrets',
      mediaType: 'book',
      externalIds: [{ source: 'openlibrary', id: 'OL82537W' }],
      year: 1998,
      releaseDate: '1998-07-02',
      chrono: 5,
      route: 2,
      optional: true,
      note: 'A monster from the Chamber of Secrets is petrifying students, and Harry meets a young Voldemort\'s diary'
    },
    {
      id: 'hp-poa-book',
      title: 'Harry Potter and the Prisoner of Azkaban',
      mediaType: 'book',
      externalIds: [{ source: 'openlibrary', id: 'OL82536W' }],
      year: 1999,
      releaseDate: '1999-07-08',
      chrono: 6,
      route: 3,
      optional: true,
      note: 'Escaped prisoner Sirius Black is hunting Harry, or so it seems'
    },
    {
      id: 'hp-gof-book',
      title: 'Harry Potter and the Goblet of Fire',
      mediaType: 'book',
      externalIds: [{ source: 'openlibrary', id: 'OL82560W' }],
      year: 2000,
      releaseDate: '2000-07-08',
      chrono: 7,
      route: 4,
      optional: true,
      note: 'Harry is mysteriously entered into the deadly Triwizard Tournament as Voldemort regains his body'
    },
    {
      id: 'hp-ps-film',
      title: 'Harry Potter and the Philosopher\'s Stone',
      mediaType: 'movie',
      aliases: ['Harry Potter and the Sorcerer\'s Stone'],
      externalIds: [{ source: 'tmdb', id: '671' }],
      year: 2001,
      releaseDate: '2001-11-16',
      chrono: 4,
      route: 5,
      adaptation: true,
      note: 'Chris Columbus\'s faithful first film, introducing Hogwarts and the trio'
    },
    {
      id: 'hp-cos-film',
      title: 'Harry Potter and the Chamber of Secrets',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '672' }],
      year: 2002,
      releaseDate: '2002-11-13',
      chrono: 5,
      route: 6,
      adaptation: true,
      note: 'Dobby the house-elf warns Harry away from Hogwarts as the Chamber of Secrets reopens'
    },
    {
      id: 'hp-oop-book',
      title: 'Harry Potter and the Order of the Phoenix',
      mediaType: 'book',
      externalIds: [{ source: 'openlibrary', id: 'OL82548W' }],
      year: 2003,
      releaseDate: '2003-06-21',
      chrono: 8,
      route: 7,
      optional: true,
      note: 'The Ministry denies Voldemort\'s return, so Harry and friends train in secret as Dumbledore\'s Army'
    },
    {
      id: 'hp-poa-film',
      title: 'Harry Potter and the Prisoner of Azkaban',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '673' }],
      year: 2004,
      releaseDate: '2004-05-31',
      chrono: 6,
      route: 8,
      adaptation: true,
      note: 'Alfonso Cuaron\'s darker, stylistically distinct take, introducing Sirius Black and the Marauders\' past'
    },
    {
      id: 'hp-hbp-book',
      title: 'Harry Potter and the Half-Blood Prince',
      mediaType: 'book',
      externalIds: [{ source: 'openlibrary', id: 'OL82565W' }],
      year: 2005,
      releaseDate: '2005-07-16',
      chrono: 9,
      route: 9,
      optional: true,
      note: 'Dumbledore shows Harry Voldemort\'s past in search of a way to destroy his Horcruxes'
    },
    {
      id: 'hp-gof-film',
      title: 'Harry Potter and the Goblet of Fire',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '674' }],
      year: 2005,
      releaseDate: '2005-11-16',
      chrono: 7,
      route: 10,
      adaptation: true,
      note: 'The Triwizard Tournament ends with Cedric Diggory\'s death and Voldemort\'s return'
    },
    {
      id: 'hp-oop-film',
      title: 'Harry Potter and the Order of the Phoenix',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '675' }],
      year: 2007,
      releaseDate: '2007-07-08',
      chrono: 8,
      route: 11,
      adaptation: true,
      note: 'Dolores Umbridge takes over Hogwarts as the Ministry refuses to believe Voldemort has returned'
    },
    {
      id: 'hp-dh-book',
      title: 'Harry Potter and the Deathly Hallows',
      mediaType: 'book',
      externalIds: [{ source: 'openlibrary', id: 'OL82586W' }],
      year: 2007,
      releaseDate: '2007-07-21',
      chrono: 10,
      route: 12,
      optional: true,
      note: 'Harry, Ron and Hermione hunt Horcruxes while Voldemort takes over the Ministry, ending at the Battle of Hogwarts'
    },
    {
      id: 'hp-hbp-film',
      title: 'Harry Potter and the Half-Blood Prince',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '767' }],
      year: 2009,
      releaseDate: '2009-07-15',
      chrono: 9,
      route: 13,
      adaptation: true,
      note: 'Harry and Dumbledore search out Voldemort\'s Horcruxes as Snape\'s loyalties stay in question'
    },
    {
      id: 'hp-dh1-film',
      title: 'Harry Potter and the Deathly Hallows: Part 1',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '12444' }],
      year: 2010,
      releaseDate: '2010-11-17',
      chrono: 10,
      route: 14,
      adaptation: true,
      note: 'The trio go on the run from the newly Death-Eater-controlled Ministry'
    },
    {
      id: 'hp-dh2-film',
      title: 'Harry Potter and the Deathly Hallows: Part 2',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '12445' }],
      year: 2011,
      releaseDate: '2011-07-12',
      chrono: 10,
      route: 15,
      adaptation: true,
      note: 'The Battle of Hogwarts and Harry\'s final confrontation with Voldemort'
    },
    {
      id: 'hp-cursed-child',
      title: 'Harry Potter and the Cursed Child',
      mediaType: 'book',
      externalIds: [{ source: 'openlibrary', id: 'OL17360811W' }],
      year: 2016,
      releaseDate: '2016-07-31',
      chrono: 11,
      route: 16,
      optional: true,
      note: 'Published script of the stage play, set nineteen years later, following Harry\'s son Albus and Draco\'s son Scorpius'
    },
    {
      id: 'hp-fb1',
      title: 'Fantastic Beasts and Where to Find Them',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '259316' }],
      year: 2016,
      releaseDate: '2016-11-16',
      chrono: 1,
      route: 17,
      spinOff: true,
      note: '1926, New York: magizoologist Newt Scamander loses a case full of magical creatures in the no-maj city'
    },
    {
      id: 'hp-fb2',
      title: 'Fantastic Beasts: The Crimes of Grindelwald',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '338952' }],
      year: 2018,
      releaseDate: '2018-11-14',
      chrono: 2,
      route: 18,
      spinOff: true,
      note: 'Grindelwald escapes custody and recruits followers while hiding his plans from a young Dumbledore'
    },
    {
      id: 'hp-fb3',
      title: 'Fantastic Beasts: The Secrets of Dumbledore',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '338953' }],
      year: 2022,
      releaseDate: '2022-04-06',
      chrono: 3,
      route: 19,
      spinOff: true,
      note: 'Dumbledore works with Newt and allies to stop Grindelwald from seizing control of the wizarding world'
    }
  ],
  characters: [
    {
      id: 'hp-harry',
      name: 'Harry Potter',
      role: 'The Boy Who Lived',
      portraitUrl: `${TM}/w300_and_h450_face/uUFfo8RANo7tuckB6AZAnESne55.jpg`,
      appearsIn: ['hp-ps-film', 'hp-cos-film', 'hp-poa-film', 'hp-gof-film', 'hp-oop-film', 'hp-hbp-film', 'hp-dh1-film', 'hp-dh2-film'],
      blurb: 'Orphaned as a baby when Voldemort\'s curse rebounded on him, Harry grows up to be the one prophesied to defeat him.'
    },
    {
      id: 'hp-hermione',
      name: 'Hermione Granger',
      role: 'Harry\'s closest friend',
      portraitUrl: `${TM}/w300_and_h450_face/mf0OANvWYSzU1d8yggrhyw8IbIz.jpg`,
      appearsIn: ['hp-ps-film', 'hp-cos-film', 'hp-poa-film', 'hp-gof-film', 'hp-oop-film', 'hp-hbp-film', 'hp-dh1-film', 'hp-dh2-film'],
      blurb: 'A Muggle-born witch whose research and quick thinking repeatedly save Harry and Ron over seven years at Hogwarts.'
    },
    {
      id: 'hp-ron',
      name: 'Ron Weasley',
      role: 'Harry\'s best friend',
      portraitUrl: `${TM}/w300_and_h450_face/iFlkpTaOF6fGLqxz8b0PhI0i0zN.jpg`,
      appearsIn: ['hp-ps-film', 'hp-cos-film', 'hp-poa-film', 'hp-gof-film', 'hp-oop-film', 'hp-hbp-film', 'hp-dh1-film', 'hp-dh2-film'],
      blurb: 'The youngest son of the large, poor but loving Weasley family, whose loyalty to Harry survives jealousy, fear and a Horcrux\'s whispering.'
    },
    {
      id: 'hp-dumbledore',
      name: 'Albus Dumbledore',
      role: 'Headmaster of Hogwarts',
      portraitUrl: `${TM}/w300_and_h450_face/oJIS8QUOCfLUhsfK7kROkLHVyJh.jpg`,
      appearsIn: ['hp-ps-film', 'hp-cos-film', 'hp-poa-film', 'hp-gof-film', 'hp-oop-film', 'hp-hbp-film'],
      blurb: 'The wizarding world\'s greatest living wizard and Voldemort\'s old rival, who guides Harry while concealing how much he already knows.'
    },
    {
      id: 'hp-snape',
      name: 'Severus Snape',
      role: 'Potions Master, later Headmaster',
      portraitUrl: `${TM}/w300_and_h450_face/7tADZs4ILE93oJ5pAh6mKQFEq2m.jpg`,
      appearsIn: ['hp-ps-film', 'hp-cos-film', 'hp-poa-film', 'hp-gof-film', 'hp-oop-film', 'hp-hbp-film', 'hp-dh2-film'],
      blurb: 'A double agent whose true loyalty — driven by his love for Harry\'s mother Lily — is only revealed after his death in the final book.'
    },
    {
      id: 'hp-voldemort',
      name: 'Lord Voldemort',
      role: 'Dark wizard',
      portraitUrl: `${TM}/w300_and_h450_face/tJr9GcmGNHhLVVEH3i7QYbj6hBi.jpg`,
      appearsIn: ['hp-gof-film', 'hp-oop-film', 'hp-hbp-film', 'hp-dh1-film', 'hp-dh2-film'],
      blurb: 'Formerly Tom Riddle, a dark wizard who split his soul into Horcruxes to cheat death and seeks to kill the only one prophesied to stop him.'
    },
    {
      id: 'hp-newt',
      name: 'Newt Scamander',
      role: 'Magizoologist (Fantastic Beasts)',
      portraitUrl: `${TM}/w300_and_h450_face/fSvG7qzoBBnJUmgtIuMgrK3EQPN.jpg`,
      appearsIn: ['hp-fb1', 'hp-fb2', 'hp-fb3'],
      blurb: 'A magizoologist whose escaped creatures and later alliance with Dumbledore pull him into the fight against Gellert Grindelwald.'
    }
  ]
}
