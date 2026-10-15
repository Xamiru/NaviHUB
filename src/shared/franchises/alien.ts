// Alien — the seven theatrical Alien films (Alien, Aliens, Alien 3, Alien
// Resurrection, Prometheus, Alien: Covenant, Alien: Romulus), the FX series
// Alien: Earth (2025) and the survival-horror game Alien: Isolation. Chrono
// follows in-universe time: Prometheus (2093) and Covenant (2104) precede
// everything; Alien: Earth is set in 2120, two years before Alien (2122);
// Isolation (2137) and Romulus (2142) both sit between Alien and Aliens
// (2179), then Alien 3 and Resurrection follow Aliens. Route is the classic
// release-order viewing, with Resurrection and Isolation as optional detours.
// Excluded: the Alien vs. Predator crossover films (Alien vs. Predator and
// Aliens vs. Predator: Requiem), which belong to a separate crossover brand
// rather than the Alien story proper.
// Ids and dates from TMDB (en-US), Steam and Open Library, curl-verified
// 2026-10-14. Film dates are the earliest US row on TMDB's releases page
// (a premiere where one is listed, otherwise the theatrical date).

import type { FranchiseCfg } from './types'

const TM = 'https://image.tmdb.org/t/p'

export const ALIEN: FranchiseCfg = {
  id: 'alien',
  name: 'Alien',
  short: 'Alien',
  color: '#5f8f6b',
  heroUrl: `${TM}/w1280/cEobq5QrnOJjO6giDs8q4RxmMKh.jpg`,
  studio: '20th Century Fox / Disney',
  tagline: 'In space, no one can hear you scream.',
  trivia: [
    {
      title: 'A haunted house in space',
      body: 'Ridley Scott’s 1979 Alien works as a slasher in a cramped industrial ship: seven crew members of the Nostromo, a creature that grows from a parasite into a hunter, and a company that regards the crew as expendable. Aliens (1986) answered it with an action film in James Cameron’s hands, and the series has been reinvented by a new director almost every time since.'
    },
    {
      title: 'One director per film',
      body: 'Each of the first four films was made by a different director: Ridley Scott, James Cameron, David Fincher and Jean-Pierre Jeunet. Scott returned to direct Prometheus and Alien: Covenant, which look at where the creature and the android David come from. Fede Alvarez directed Alien: Romulus, set between the first two films.'
    },
    {
      title: 'Beyond the cinema',
      body: 'Alien: Isolation, released in 2014 by Creative Assembly, follows Ellen Ripley’s daughter Amanda aboard a station stalked by a single creature, and is widely admired for staying close to the look of the 1979 film. Alien: Earth, created by Noah Hawley for FX, was released in 2025 and is set two years before the first film.'
    }
  ],
  entries: [
    {
      id: 'alien-1979',
      title: 'Alien',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '348' }],
      year: 1979,
      releaseDate: '1979-05-25',
      chrono: 4,
      route: 1,
      mc: 82,
      note: 'Ridley Scott’s original: the crew of the Nostromo answers a distress call and brings something aboard'
    },
    {
      id: 'alien-aliens',
      title: 'Aliens',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '679' }],
      year: 1986,
      releaseDate: '1986-07-14',
      chrono: 7,
      route: 2,
      mc: 80,
      note: 'James Cameron’s action sequel sends Ripley back with a squad of colonial marines'
    },
    {
      id: 'alien-3',
      title: 'Alien 3',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '8077' }],
      year: 1992,
      releaseDate: '1992-05-19',
      chrono: 8,
      route: 3,
      mc: 64,
      note: 'David Fincher’s bleak film strands Ripley on a prison planet'
    },
    {
      id: 'alien-resurrection',
      title: 'Alien Resurrection',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '8078' }],
      year: 1997,
      releaseDate: '1997-11-20',
      chrono: 9,
      route: 4,
      optional: true,
      mc: 62,
      note: 'Jean-Pierre Jeunet’s sequel, set two centuries after Alien 3, with a cloned Ripley'
    },
    {
      id: 'alien-prometheus',
      title: 'Prometheus',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '70981' }],
      year: 2012,
      releaseDate: '2012-06-08',
      chrono: 1,
      route: 5,
      mc: 66,
      note: 'Scott’s return to the series: an expedition follows a star map to the engineers'
    },
    {
      id: 'alien-isolation',
      title: 'Alien: Isolation',
      externalIds: [{ source: 'steam', id: '214490' }],
      year: 2014,
      releaseDate: '2014-10-06',
      chrono: 5,
      route: 7,
      optional: true,
      mc: 81,
      note: 'Survival horror: Amanda Ripley hunts for answers on Sevastopol Station while one creature hunts her'
    },
    {
      id: 'alien-covenant',
      title: 'Alien: Covenant',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '126889' }],
      year: 2017,
      releaseDate: '2017-05-19',
      chrono: 2,
      route: 6,
      mc: 62,
      note: 'A colony ship lands on an unexpected paradise and meets David'
    },
    {
      id: 'alien-romulus',
      title: 'Alien: Romulus',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '945961' }],
      year: 2024,
      releaseDate: '2024-08-12',
      chrono: 6,
      route: 8,
      mc: 72,
      note: 'Fede Alvarez’s film, set between Alien and Aliens: young colonists scavenge a derelict station'
    },
    {
      id: 'alien-earth',
      title: 'Alien: Earth',
      mediaType: 'tv',
      externalIds: [{ source: 'tmdb', id: '157239' }],
      year: 2025,
      releaseDate: '2025-08-12',
      chrono: 3,
      route: 9,
      mc: 73,
      note: 'Noah Hawley’s FX series: a crashed ship brings the creatures to Earth in 2120'
    }
  ],
  characters: [
    {
      id: 'alien-ripley',
      name: 'Ellen Ripley',
      role: 'Warrant officer of the Nostromo',
      portraitUrl: `${TM}/w300_and_h450_face/wTSnfktNBLd6kwQxgvkqYw6vEon.jpg`,
      appearsIn: ['alien-1979', 'alien-aliens', 'alien-3', 'alien-resurrection'],
      blurb: 'Sigourney Weaver’s Ripley survives the Nostromo and carries the original four films.'
    },
    {
      id: 'alien-ash',
      name: 'Ash',
      role: 'Science officer (android)',
      portraitUrl: `${TM}/w300_and_h450_face/cOJDgvgj4nMec6Inzj1H5nugTO5.jpg`,
      appearsIn: ['alien-1979'],
      blurb: 'Ian Holm’s science officer is revealed to be an android serving the company’s orders.'
    },
    {
      id: 'alien-xenomorph',
      name: 'The Xenomorph',
      role: 'The creature',
      portraitUrl: `${TM}/w300_and_h450_face/7ddxWlDIOVKBK6TjP66vb9Qp3MW.jpg`,
      appearsIn: ['alien-1979', 'alien-aliens', 'alien-3', 'alien-resurrection', 'alien-isolation', 'alien-romulus', 'alien-earth'],
      blurb: 'Bolaji Badejo wore the suit for the 1979 film; the creature has stalked every installment since.'
    },
    {
      id: 'alien-bishop',
      name: 'Bishop',
      role: 'Android of the colonial marines',
      portraitUrl: `${TM}/w300_and_h450_face/1PkFmD5HdjmRa2DumtwINnnAjTH.jpg`,
      appearsIn: ['alien-aliens'],
      blurb: 'Lance Henriksen’s calm synthetic helps Ripley, who is wary of androids after the Nostromo.'
    },
    {
      id: 'alien-david',
      name: 'David',
      role: 'Android',
      portraitUrl: `${TM}/w300_and_h450_face/xvbnUiB2ZBR3QIt595OzNy657Vw.jpg`,
      appearsIn: ['alien-prometheus', 'alien-covenant'],
      blurb: 'Michael Fassbender’s android drives the story of Prometheus and Covenant.'
    },
    {
      id: 'alien-rain',
      name: 'Rain Carradine',
      role: 'Young colonist',
      portraitUrl: `${TM}/w300_and_h450_face/6gUzyMnwo7TjZA7E1Amd1GI8JGw.jpg`,
      appearsIn: ['alien-romulus'],
      blurb: 'Cailee Spaeny leads Romulus as a young miner who tries to escape with her synthetic brother.'
    },
    {
      id: 'alien-wendy',
      name: 'Wendy',
      role: 'Hybrid',
      portraitUrl: `${TM}/w300_and_h450_face/pFNFXu2PaSUvHqFJCBPz5BEjgTj.jpg`,
      appearsIn: ['alien-earth'],
      blurb: 'Sydney Chandler leads the 2025 FX series as a hybrid, a child’s mind transferred into a synthetic adult body.'
    }
  ]
}
