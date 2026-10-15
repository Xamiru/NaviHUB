// The Godfather — Francis Ford Coppola's three films, Mario Puzo's 1969
// novel they adapt, and The Offer, the 2022 miniseries about the making of the
// first film (a spin-off). No chrono: Part II interleaves a prequel and a
// sequel, so a single story order would misrepresent it. Route is the films in
// release order, with the novel and The Offer as optional detours.
// The Godfather Coda: The Death of Michael Corleone, Coppola's 2020 re-edit,
// is not a separate TMDB title (it is a re-release note on Part III), so it is
// carried as an alias of Part III. Excluded: Mark Winegardner's continuation
// novels and the 2006 tie-in game, which are not part of the films' canon.
// Ids and dates from TMDB (en-US), Steam and Open Library, curl-verified
// 2026-10-14.

import type { FranchiseCfg } from './types'

const TM = 'https://image.tmdb.org/t/p'

export const GODFATHER: FranchiseCfg = {
  id: 'godfather',
  name: 'The Godfather',
  short: 'Godfather',
  color: '#a8803a',
  heroUrl: `${TM}/w1280/ejdD20cdHNFAYAN2DlqPToXKyzx.jpg`,
  studio: 'Paramount Pictures',
  tagline: 'An offer you can’t refuse, passed from one Corleone to the next.',
  trivia: [
    {
      title: 'From pulp novel to canon',
      body: 'Mario Puzo published The Godfather in 1969, and Paramount released Francis Ford Coppola’s adaptation in 1972, with Puzo co-writing the screenplay. The film’s success led to The Godfather Part II in 1974 and Part III in 1990.'
    },
    {
      title: 'Two stories in one sequel',
      body: 'The Godfather Part II tells two stories side by side: Michael Corleone consolidating power in the late 1950s, and a young Vito Corleone, played by Robert De Niro, building his life in early twentieth-century New York. De Niro won an Academy Award for the role.'
    },
    {
      title: 'A second look at the third film',
      body: 'In 2020 Coppola released a re-edited version of Part III under the title The Godfather Coda: The Death of Michael Corleone, with a new opening and ending. The Offer (2022) dramatises the making of the first film for Paramount+.'
    }
  ],
  entries: [
    {
      id: 'godfather-novel',
      title: 'The Godfather',
      mediaType: 'book',
      externalIds: [{ source: 'openlibrary', id: 'OL1673205W' }],
      year: 1969,
      route: 4,
      optional: true,
      note: 'Mario Puzo’s novel of the Corleone family, the source of the films'
    },
    {
      id: 'godfather-1972',
      title: 'The Godfather',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '238' }],
      year: 1972,
      releaseDate: '1972-03-14',
      route: 1,
      adaptation: true,
      mc: 87,
      note: 'Coppola’s original: Michael Corleone is drawn into the family business'
    },
    {
      id: 'godfather-2',
      title: 'The Godfather Part II',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '240' }],
      year: 1974,
      releaseDate: '1974-12-12',
      route: 2,
      mc: 86,
      note: 'Michael’s rule over the family intercut with young Vito’s rise'
    },
    {
      id: 'godfather-3',
      title: 'The Godfather Part III',
      mediaType: 'movie',
      aliases: ['The Godfather Coda: The Death of Michael Corleone'],
      externalIds: [{ source: 'tmdb', id: '242' }],
      year: 1990,
      releaseDate: '1990-12-20',
      route: 3,
      mc: 74,
      note: 'An aging Michael tries to legitimise the family, also released in 2020 as The Godfather Coda'
    },
    {
      id: 'godfather-offer',
      title: 'The Offer',
      mediaType: 'tv',
      externalIds: [{ source: 'tmdb', id: '114068' }],
      year: 2022,
      releaseDate: '2022-04-28',
      route: 5,
      optional: true,
      spinOff: true,
      mc: 80,
      note: 'Miniseries about producer Albert S. Ruddy and the troubled making of the first film'
    }
  ],
  characters: [
    {
      id: 'godfather-vito',
      name: 'Vito Corleone',
      role: 'Head of the Corleone family',
      portraitUrl: `${TM}/w300_and_h450_face/yIvLpf9U9NfAvC7fuAgOQ8tu51T.jpg`,
      appearsIn: ['godfather-novel', 'godfather-1972', 'godfather-2'],
      blurb: 'Marlon Brando’s patriarch, whose request for respect starts the first film’s story.'
    },
    {
      id: 'godfather-michael',
      name: 'Michael Corleone',
      role: 'Vito’s youngest son',
      portraitUrl: `${TM}/w300_and_h450_face/m8HAAjq1T75JypKk0v1FFQn4ysZ.jpg`,
      appearsIn: ['godfather-novel', 'godfather-1972', 'godfather-2', 'godfather-3'],
      blurb: 'Al Pacino’s Michael starts outside the family business and ends as its ruler.'
    },
    {
      id: 'godfather-sonny',
      name: 'Sonny Corleone',
      role: 'Vito’s eldest son',
      portraitUrl: `${TM}/w300_and_h450_face/z2Lz3rtxZ7aJjzBUkCnExvo8stn.jpg`,
      appearsIn: ['godfather-novel', 'godfather-1972'],
      blurb: 'James Caan’s hot-tempered heir runs the family while Vito recovers.'
    },
    {
      id: 'godfather-tom',
      name: 'Tom Hagen',
      role: 'Consigliere',
      portraitUrl: `${TM}/w300_and_h450_face/3tcKxC5Sc3DJ6XPDKKC2EAomEWn.jpg`,
      appearsIn: ['godfather-novel', 'godfather-1972', 'godfather-2'],
      blurb: 'Robert Duvall’s lawyer, raised by the Corleones and trusted as their counsel.'
    },
    {
      id: 'godfather-kay',
      name: 'Kay Adams',
      role: 'Michael’s wife',
      portraitUrl: `${TM}/w300_and_h450_face/A8B3BsFgbmw2WEmJuQX38qeU9eR.jpg`,
      appearsIn: ['godfather-novel', 'godfather-1972', 'godfather-2', 'godfather-3'],
      blurb: 'Diane Keaton’s Kay sees what the family business does to the man she married.'
    },
    {
      id: 'godfather-fredo',
      name: 'Fredo Corleone',
      role: 'Vito’s middle son',
      portraitUrl: `${TM}/w300_and_h450_face/41wXX1FBalyIuf5eaA4S43Y8IfZ.jpg`,
      appearsIn: ['godfather-novel', 'godfather-1972', 'godfather-2'],
      blurb: 'John Cazale’s Fredo is the overlooked brother whose betrayal drives Part II.'
    },
    {
      id: 'godfather-young-vito',
      name: 'Young Vito Corleone',
      role: 'Immigrant who becomes the Godfather',
      portraitUrl: `${TM}/w300_and_h450_face/cT8htcckIuyI1Lqwt1CvD02ynTh.jpg`,
      appearsIn: ['godfather-novel', 'godfather-2'],
      blurb: 'Robert De Niro plays Vito’s rise from a New York grocery clerk to a man of respect.'
    }
  ]
}
