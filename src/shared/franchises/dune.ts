// Dune — Frank Herbert's six Dune novels and their screen adaptations. Core
// rows: the six novels; David Lynch's 1984 film; the Frank Herbert's Dune
// (2000) and Children of Dune (2003) miniseries; Denis Villeneuve's Dune
// (2021) and Dune: Part Two (2024); and the Dune: Prophecy (2024) prequel
// series. Dune: Part Three is EXCLUDED: TMDB lists it with a release date of
// 2026-12-18, after this page's 2026-10-05 cutoff, so it has not released yet.
// Two 1984/1964-adjacent titles found while searching TMDB are unrelated and
// excluded: Woman in the Dunes (a 1964 Japanese film, no relation) and
// Jodorowsky's Dune (a 2013 documentary about Alejandro Jodorowsky's unmade
// 1970s adaptation, not a Dune adaptation itself). The 1984 and 2021 films are
// both titled plain "Dune" on TMDB; the 1984 film is given the distinct
// editorial display title "Dune (1984)" here only so franchise entry titles
// stay unique — it is not a TMDB alternative title. Entries are authored in
// RELEASE order, so Dune: Prophecy (2024) sits last despite being chrono-
// earliest. Chrono is in-universe order: Dune: Prophecy is a prequel set
// roughly ten thousand years before Dune, so it leads; adaptations share their
// source novel's chrono slot. Ids and dates from TMDB (en-US) and Open
// Library, curl-verified 2026-10-05; novel publication years (1965-1985) are
// well-documented history rather than day-level lookups.

import type { FranchiseCfg } from './types'

const TM = 'https://image.tmdb.org/t/p'

export const DUNE: FranchiseCfg = {
  id: 'dune',
  name: 'Dune',
  short: 'Dune',
  color: '#c2812f',
  heroUrl: `${TM}/w1280/zRKQW58MBEY078AxkHxEJzUskCl.jpg`,
  studio: 'Legendary Pictures',
  tagline: 'The desert planet Arrakis, its spice, and the dynasties who would rule it.',
  trivia: [
    {
      title: 'A planet worth an empire',
      body: 'Frank Herbert\'s Dune (1965) is set on the desert world Arrakis, the only source of the spice melange, a substance that extends life, expands the mind and makes interstellar travel possible. House Atreides is given stewardship of the planet as a trap by their rivals House Harkonnen and the Padishah Emperor, and the resulting war reshapes the galaxy for thousands of years across Herbert\'s five sequel novels.'
    },
    {
      title: 'Decades of attempted adaptations',
      body: 'Alejandro Jodorowsky tried and failed to adapt Dune in the 1970s with a cast including Salvador Dali and Orson Welles; that unmade film is the subject of the documentary Jodorowsky\'s Dune, not a Dune adaptation itself. David Lynch\'s 1984 film was a troubled production, cut down by the studio; Lynch later disowned the extended television version. Two television miniseries in 2000 and 2003 adapted the first three novels more faithfully but on a smaller budget, before Denis Villeneuve\'s two-part 2021-2024 films became the first adaptation to match the scale of Herbert\'s world.'
    },
    {
      title: 'Before Paul Atreides',
      body: 'Dune: Prophecy is set roughly ten thousand years before Paul Atreides is born, following the sisterhood that will eventually become the Bene Gesserit as it begins the long breeding program and political maneuvering that shapes everything in the later novels.'
    }
  ],
  entries: [
    {
      id: 'dune-novel',
      title: 'Dune',
      mediaType: 'book',
      externalIds: [{ source: 'openlibrary', id: 'OL893414W' }],
      year: 1965,
      chrono: 2,
      route: 1,
      optional: true,
      note: 'House Atreides takes stewardship of Arrakis and is betrayed, and Paul Atreides becomes the Fremen\'s prophesied leader'
    },
    {
      id: 'dune-messiah-novel',
      title: 'Dune Messiah',
      mediaType: 'book',
      externalIds: [{ source: 'openlibrary', id: 'OL893461W' }],
      year: 1969,
      chrono: 3,
      route: 6,
      optional: true,
      note: 'Twelve years later, Paul rules as Emperor and prophet, and a conspiracy forms to destroy him'
    },
    {
      id: 'dune-children-novel',
      title: 'Children of Dune',
      mediaType: 'book',
      externalIds: [{ source: 'openlibrary', id: 'OL893516W' }],
      year: 1976,
      chrono: 4,
      route: 7,
      optional: true,
      note: 'Paul\'s twin children Leto II and Ghanima navigate the empire their father left behind'
    },
    {
      id: 'dune-god-emperor-novel',
      title: 'God Emperor of Dune',
      mediaType: 'book',
      externalIds: [{ source: 'openlibrary', id: 'OL893515W' }],
      year: 1981,
      chrono: 5,
      route: 8,
      optional: true,
      note: 'Thousands of years on, Leto II rules as a tyrannical human-sandworm hybrid pursuing his Golden Path'
    },
    {
      id: 'dune-heretics-novel',
      title: 'Heretics of Dune',
      mediaType: 'book',
      externalIds: [{ source: 'openlibrary', id: 'OL893502W' }],
      year: 1984,
      chrono: 6,
      route: 9,
      optional: true,
      note: 'Fifteen hundred years after Leto II\'s death, the Bene Gesserit face new powers returning from beyond the old empire'
    },
    {
      id: 'dune-1984',
      title: 'Dune (1984)',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '841' }],
      year: 1984,
      releaseDate: '1984-12-14',
      chrono: 2,
      route: 2,
      adaptation: true,
      optional: true,
      note: 'David Lynch\'s one-film adaptation of the first novel, cut by the studio to 137 minutes'
    },
    {
      id: 'dune-chapterhouse-novel',
      title: 'Chapterhouse: Dune',
      mediaType: 'book',
      externalIds: [{ source: 'openlibrary', id: 'OL893508W' }],
      year: 1985,
      chrono: 7,
      route: 10,
      optional: true,
      note: 'The Bene Gesserit, driven from Chapterhouse, make a desperate plan involving a new Arrakis'
    },
    {
      id: 'dune-2000-tv',
      title: 'Frank Herbert\'s Dune',
      mediaType: 'tv',
      externalIds: [{ source: 'tmdb', id: '19566' }],
      year: 2000,
      releaseDate: '2000-12-03',
      chrono: 2,
      route: 3,
      adaptation: true,
      optional: true,
      note: 'Sci-Fi Channel miniseries adapting the first novel more closely than the 1984 film'
    },
    {
      id: 'dune-2003-tv',
      title: 'Frank Herbert\'s Children of Dune',
      mediaType: 'tv',
      externalIds: [{ source: 'tmdb', id: '9156' }],
      year: 2003,
      releaseDate: '2003-03-16',
      chrono: 4,
      route: 11,
      adaptation: true,
      optional: true,
      note: 'Miniseries covering both Dune Messiah and Children of Dune'
    },
    {
      id: 'dune-2021',
      title: 'Dune',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '438631' }],
      year: 2021,
      releaseDate: '2021-09-15',
      chrono: 2,
      route: 4,
      adaptation: true,
      note: 'Denis Villeneuve\'s adaptation of the first half of the novel, from Arrakis\'s betrayal to Paul joining the Fremen'
    },
    {
      id: 'dune-part-two',
      title: 'Dune: Part Two',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '693134' }],
      year: 2024,
      releaseDate: '2024-02-27',
      chrono: 2,
      route: 5,
      adaptation: true,
      note: 'Paul leads the Fremen to war against House Harkonnen and the Emperor, completing the first novel'
    },
    {
      id: 'dune-prophecy',
      title: 'Dune: Prophecy',
      mediaType: 'tv',
      externalIds: [{ source: 'tmdb', id: '90228' }],
      year: 2024,
      releaseDate: '2024-11-17',
      chrono: 1,
      route: 12,
      optional: true,
      note: 'Roughly ten thousand years before Dune, two sisters lay the foundations of the Bene Gesserit'
    }
  ],
  characters: [
    {
      id: 'dune-paul',
      name: 'Paul Atreides',
      role: 'Heir of House Atreides',
      portraitUrl: `${TM}/w300_and_h450_face/dFxpwRpmzpVfP1zjluH68DeQhyj.jpg`,
      appearsIn: ['dune-2021', 'dune-part-two'],
      blurb: 'The son of Duke Leto Atreides, whose Bene Gesserit training and exposure to the spice awaken prophetic visions as he rises among the Fremen.'
    },
    {
      id: 'dune-jessica',
      name: 'Lady Jessica',
      role: 'Bene Gesserit concubine of House Atreides',
      portraitUrl: `${TM}/w300_and_h450_face/ra53cM1aNmdH0aFhj8yBqPOj2fb.jpg`,
      appearsIn: ['dune-2021', 'dune-part-two'],
      blurb: 'A Bene Gesserit who defies her order\'s breeding program by bearing Duke Leto a son, and later becomes a Fremen Reverend Mother.'
    },
    {
      id: 'dune-leto',
      name: 'Duke Leto Atreides',
      role: 'Head of House Atreides',
      portraitUrl: `${TM}/w300_and_h450_face/dW5U5yrIIPmMjRThR9KT2xH6nTz.jpg`,
      appearsIn: ['dune-2021'],
      blurb: 'A duke known for his fairness and loyalty, given stewardship of Arrakis in a trap that costs him his life.'
    },
    {
      id: 'dune-harkonnen',
      name: 'Baron Vladimir Harkonnen',
      role: 'Head of House Harkonnen',
      portraitUrl: `${TM}/w300_and_h450_face/mW7xmtGV4y79kQGn0zkKVGDMAmw.jpg`,
      appearsIn: ['dune-2021', 'dune-part-two'],
      blurb: 'The scheming, physically monstrous head of House Harkonnen, whose decades-old feud with House Atreides drives the betrayal on Arrakis.'
    },
    {
      id: 'dune-chani',
      name: 'Chani',
      role: 'Fremen warrior',
      portraitUrl: `${TM}/w300_and_h450_face/1qup8tSt95HLbcy2c2xrx4iJNxv.jpg`,
      appearsIn: ['dune-part-two'],
      blurb: 'A Fremen fighter who becomes Paul\'s closest companion among the desert people, and grows wary of the religious cult forming around him.'
    },
    {
      id: 'dune-stilgar',
      name: 'Stilgar',
      role: 'Fremen leader',
      portraitUrl: `${TM}/w300_and_h450_face/zfRID0jx8DKBluPGU9xtk9sZWUt.jpg`,
      appearsIn: ['dune-2021', 'dune-part-two'],
      blurb: 'Naib of the Fremen troop that takes Paul and Jessica in, and one of the first to believe Paul is the prophesied Lisan al Gaib.'
    },
    {
      id: 'dune-feyd',
      name: 'Feyd-Rautha',
      role: 'Harkonnen heir',
      portraitUrl: `${TM}/w300_and_h450_face/atdAs4pFGjUQ4m2W8kJYly7N6cC.jpg`,
      appearsIn: ['dune-part-two'],
      blurb: 'The Baron\'s brutal, cunning nephew, groomed as House Harkonnen\'s heir and set against Paul in the novel\'s climax.'
    }
  ]
}
