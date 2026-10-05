// Middle-earth — J.R.R. Tolkien's Hobbit/Silmarillion/Lord of the Rings novels
// and their screen adaptations. Core rows: The Hobbit, the three Lord of the
// Rings volumes (one row per volume) and The Silmarillion as books; Rankin/Bass's
// The Hobbit (1977) and The Return of the King (1980) television films; Ralph
// Bakshi's 1978 Lord of the Rings; Peter Jackson's six live-action films; The
// Rings of Power (TV); and The War of the Rohirrim (2024 anime film). Chrono
// follows in-universe order, not publication order: The Silmarillion (First and
// early Second Age), The Rings of Power (Second Age), The War of the Rohirrim
// (Third Age, about 200 years before The Hobbit), The Hobbit, then The Lord of
// the Rings across its three volumes — an adaptation shares its source volume's
// chrono slot. Ids and dates from TMDB (en-US) and Open Library, all
// curl-verified 2026-10-05; book publication dates are well-documented history
// rather than lookups (Hobbit 21 Sep 1937, Fellowship 29 Jul 1954, Two Towers
// 11 Nov 1954, Return of the King 20 Oct 1955, Silmarillion 15 Sep 1977).

import type { FranchiseCfg } from './types'

const TM = 'https://image.tmdb.org/t/p'

export const MIDDLE_EARTH: FranchiseCfg = {
  id: 'middle-earth',
  name: 'Middle-earth',
  short: 'Middle-earth',
  color: '#c08a2e',
  heroUrl: `${TM}/w1280/z51Wzj94hvAIsWfknifKTqKJRwp.jpg`,
  studio: 'Tolkien Estate / New Line Cinema',
  tagline: 'From the forging of the Rings to the fall of Sauron, across the Second and Third Ages.',
  trivia: [
    {
      title: 'One continuous legendarium',
      body: 'Tolkien wrote The Hobbit as a children\'s book in 1937, then spent over a decade writing The Lord of the Rings as its sequel; his publisher split the much longer book into three volumes (The Fellowship of the Ring, The Two Towers, The Return of the King) for cost reasons, not as a narrative choice — it is one continuous story. The Silmarillion, assembled and published after his death by his son Christopher, collects the much older First Age myths that The Lord of the Rings constantly alludes to.'
    },
    {
      title: 'Second Age before Third Age',
      body: 'The Rings of Power and The Silmarillion\'s later chapters are set in the Second Age, thousands of years before The Hobbit and The Lord of the Rings, when Sauron forges the One Ring and seduces the elf-smiths of Eregion. The War of the Rohirrim sits much closer to the main story, about two hundred years before Bilbo\'s adventure in The Hobbit, telling how Helm Hammerhand\'s war gave Helm\'s Deep its name.'
    },
    {
      title: 'Three generations of adaptation',
      body: 'Rankin/Bass\'s animated television films (The Hobbit, 1977; The Return of the King, 1980) and Ralph Bakshi\'s rotoscoped The Lord of the Rings (1978, covering roughly the first half of the story) were the only screen versions for a generation. Peter Jackson\'s Lord of the Rings trilogy (2001-2003) and Hobbit trilogy (2012-2014) then became the dominant adaptations, followed by Amazon\'s Rings of Power television series and Warner Bros.\' anime prequel film The War of the Rohirrim.'
    }
  ],
  entries: [
    {
      id: 'me-hobbit-book',
      title: 'The Hobbit',
      mediaType: 'book',
      externalIds: [{ source: 'openlibrary', id: 'OL27482W' }],
      year: 1937,
      releaseDate: '1937-09-21',
      chrono: 4,
      route: 1,
      optional: true,
      note: 'Bilbo Baggins is drawn from the Shire into Thorin\'s quest to reclaim the Lonely Mountain from Smaug'
    },
    {
      id: 'me-fellowship-book',
      title: 'The Fellowship of the Ring',
      mediaType: 'book',
      externalIds: [{ source: 'openlibrary', id: 'OL27513W' }],
      year: 1954,
      releaseDate: '1954-07-29',
      chrono: 5,
      route: 2,
      optional: true,
      note: 'Frodo inherits the One Ring and sets out from the Shire with eight companions to destroy it'
    },
    {
      id: 'me-two-towers-book',
      title: 'The Two Towers',
      mediaType: 'book',
      externalIds: [{ source: 'openlibrary', id: 'OL27479W' }],
      year: 1954,
      releaseDate: '1954-11-11',
      chrono: 6,
      route: 3,
      optional: true,
      note: 'The Fellowship is broken; Frodo and Sam press on toward Mordor as Rohan faces Saruman\'s army'
    },
    {
      id: 'me-return-king-book',
      title: 'The Return of the King',
      mediaType: 'book',
      externalIds: [{ source: 'openlibrary', id: 'OL27455W' }],
      year: 1955,
      releaseDate: '1955-10-20',
      chrono: 7,
      route: 4,
      optional: true,
      note: 'Gondor makes its last stand as Frodo carries the Ring to Mount Doom'
    },
    {
      id: 'me-silmarillion',
      title: 'The Silmarillion',
      mediaType: 'book',
      externalIds: [{ source: 'openlibrary', id: 'OL27495W' }],
      year: 1977,
      releaseDate: '1977-09-15',
      chrono: 1,
      note: 'The First Age myths of the Valar, the Elves and the wars over the three Silmarils'
    },
    {
      id: 'me-hobbit-1977',
      title: 'The Hobbit',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '1362' }],
      year: 1977,
      releaseDate: '1977-11-27',
      chrono: 4,
      adaptation: true,
      optional: true,
      note: 'Rankin/Bass animated television film adapting Bilbo\'s journey to the Lonely Mountain'
    },
    {
      id: 'me-bakshi-lotr',
      title: 'The Lord of the Rings',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '123' }],
      year: 1978,
      releaseDate: '1978-11-15',
      chrono: 5,
      adaptation: true,
      optional: true,
      note: 'Ralph Bakshi\'s rotoscoped film, covering roughly the Fellowship and half of The Two Towers'
    },
    {
      id: 'me-return-king-1980',
      title: 'The Return of the King',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '1361' }],
      year: 1980,
      releaseDate: '1980-05-11',
      chrono: 7,
      adaptation: true,
      optional: true,
      note: 'Rankin/Bass animated television film finishing the story Bakshi\'s film left unfinished'
    },
    {
      id: 'me-fellowship-film',
      title: 'The Lord of the Rings: The Fellowship of the Ring',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '120' }],
      year: 2001,
      releaseDate: '2001-12-18',
      chrono: 5,
      route: 5,
      adaptation: true,
      note: 'Peter Jackson\'s first film, from the Shire to the breaking of the Fellowship at Amon Hen'
    },
    {
      id: 'me-two-towers-film',
      title: 'The Lord of the Rings: The Two Towers',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '121' }],
      year: 2002,
      releaseDate: '2002-12-18',
      chrono: 6,
      route: 6,
      adaptation: true,
      note: 'Rohan\'s stand at Helm\'s Deep while Frodo and Sam meet Gollum on the way to Mordor'
    },
    {
      id: 'me-return-king-film',
      title: 'The Lord of the Rings: The Return of the King',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '122' }],
      year: 2003,
      releaseDate: '2003-12-17',
      chrono: 7,
      route: 7,
      adaptation: true,
      note: 'The siege of Minas Tirith and the destruction of the One Ring at Mount Doom'
    },
    {
      id: 'me-hobbit-1',
      title: 'The Hobbit: An Unexpected Journey',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '49051' }],
      year: 2012,
      releaseDate: '2012-12-12',
      chrono: 4,
      route: 8,
      adaptation: true,
      note: 'Bilbo joins Thorin\'s company and finds the One Ring in Gollum\'s cave'
    },
    {
      id: 'me-hobbit-2',
      title: 'The Hobbit: The Desolation of Smaug',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '57158' }],
      year: 2013,
      releaseDate: '2013-12-11',
      chrono: 4,
      route: 9,
      adaptation: true,
      note: 'The company reaches Erebor and wakes the dragon Smaug'
    },
    {
      id: 'me-hobbit-3',
      title: 'The Hobbit: The Battle of the Five Armies',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '122917' }],
      year: 2014,
      releaseDate: '2014-12-10',
      chrono: 4,
      route: 10,
      adaptation: true,
      note: 'Smaug\'s death sparks a war over the Lonely Mountain\'s treasure'
    },
    {
      id: 'me-rings-of-power',
      title: 'The Lord of the Rings: The Rings of Power',
      mediaType: 'tv',
      externalIds: [{ source: 'tmdb', id: '84773' }],
      year: 2022,
      releaseDate: '2022-09-01',
      chrono: 2,
      route: 11,
      optional: true,
      note: 'Second Age prequel series covering the forging of the Rings of Power and Sauron\'s rise'
    },
    {
      id: 'me-war-rohirrim',
      title: 'The Lord of the Rings: The War of the Rohirrim',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '839033' }],
      year: 2024,
      releaseDate: '2024-12-05',
      chrono: 3,
      route: 12,
      optional: true,
      note: 'Anime film about King Helm Hammerhand\'s war, roughly two hundred years before The Hobbit'
    }
  ],
  characters: [
    {
      id: 'me-frodo',
      name: 'Frodo Baggins',
      role: 'Ring-bearer (The Lord of the Rings)',
      portraitUrl: `${TM}/w300_and_h450_face/7UKRbJBNG7mxBl2QQc5XsAh6F8B.jpg`,
      appearsIn: ['me-fellowship-film', 'me-two-towers-film', 'me-return-king-film'],
      blurb: 'Bilbo\'s young cousin and heir, who inherits the One Ring and volunteers to carry it into Mordor.'
    },
    {
      id: 'me-gandalf',
      name: 'Gandalf',
      role: 'Wizard (The Hobbit and The Lord of the Rings)',
      portraitUrl: `${TM}/w300_and_h450_face/5cnnnpnJG6TiYUSS7qgJheUZgnv.jpg`,
      appearsIn: ['me-hobbit-1', 'me-hobbit-2', 'me-hobbit-3', 'me-fellowship-film', 'me-two-towers-film', 'me-return-king-film'],
      blurb: 'A wandering wizard of the Istari who guides both Bilbo\'s quest and the War of the Ring, dying and returning as Gandalf the White.'
    },
    {
      id: 'me-aragorn',
      name: 'Aragorn',
      role: 'Ranger and heir of Isildur (The Lord of the Rings)',
      portraitUrl: `${TM}/w300_and_h450_face/vH5gVSpHAMhDaFWfh0Q7BG61O1y.jpg`,
      appearsIn: ['me-fellowship-film', 'me-two-towers-film', 'me-return-king-film'],
      blurb: 'A Ranger of the North and the last descendant of the kings of Gondor, reluctant to claim his birthright until the war demands it.'
    },
    {
      id: 'me-sam',
      name: 'Samwise Gamgee',
      role: 'Frodo\'s gardener and companion (The Lord of the Rings)',
      portraitUrl: `${TM}/w300_and_h450_face/As3ctGUtBYmG4zj4Ifyrcqd71HP.jpg`,
      appearsIn: ['me-fellowship-film', 'me-two-towers-film', 'me-return-king-film'],
      blurb: 'Frodo\'s gardener, who refuses to be left behind and ends up carrying Frodo himself up the slopes of Mount Doom.'
    },
    {
      id: 'me-bilbo',
      name: 'Bilbo Baggins',
      role: 'Burglar (The Hobbit)',
      portraitUrl: `${TM}/w300_and_h450_face/nrO54AzrxiNgCjBUOSz6ebyxDZY.jpg`,
      appearsIn: ['me-hobbit-1', 'me-hobbit-2', 'me-hobbit-3'],
      blurb: 'A respectable hobbit talked into acting as Thorin\'s burglar, who wins a magic ring from Gollum along the way.'
    },
    {
      id: 'me-gollum',
      name: 'Gollum',
      role: 'The Ring\'s former bearer (The Hobbit and The Lord of the Rings)',
      portraitUrl: `${TM}/w300_and_h450_face/eNGqhebQ4cDssjVeNFrKtUvweV5.jpg`,
      appearsIn: ['me-hobbit-1', 'me-two-towers-film', 'me-return-king-film'],
      blurb: 'Once a hobbit-like creature named Smeagol, corrupted by centuries of owning the One Ring, who guides and then betrays Frodo.'
    },
    {
      id: 'me-galadriel',
      name: 'Galadriel',
      role: 'Elven commander (The Rings of Power)',
      portraitUrl: `${TM}/w300_and_h450_face/kG1Xg85F9yAggCMquo4XouAOjdo.jpg`,
      appearsIn: ['me-rings-of-power'],
      blurb: 'A Second Age elven commander hunting the remnants of Morgoth\'s forces, centuries before she becomes the Lady of Lothlorien.'
    }
  ]
}
