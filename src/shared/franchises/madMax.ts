// Mad Max — George Miller's five films (Mad Max, Mad Max 2, Beyond Thunderdome,
// Fury Road and Furiosa: A Mad Max Saga) and the 2015 Avalanche Studios game.
// One loose continuity, so chrono follows in-universe order: the first three
// films, then the prequel Furiosa, then Fury Road. The 2015 game is a
// standalone story with no fixed place in that order, so it is a spin-off
// without one. Route is release order, with the game as an optional detour.
// Excluded: Mad Max: The Wasteland, which TMDB files in the same collection
// but lists with no score and no US release.
// Mad Max 2 is also known as The Road Warrior in the US; the alias covers it.
// Ids and dates from TMDB (en-US), Steam and Open Library, curl-verified
// 2026-10-14. Release dates are the original (Australian) theatrical dates for
// the first three films, the US premiere for Fury Road and the US theatrical
// date for Furiosa.

import type { FranchiseCfg } from './types'

const TM = 'https://image.tmdb.org/t/p'

export const MAD_MAX: FranchiseCfg = {
  id: 'mad-max',
  name: 'Mad Max',
  short: 'Mad Max',
  color: '#d9822b',
  heroUrl: `${TM}/w1280/uT895WNwm0aIJRtGizcQhrejWUo.jpg`,
  studio: 'Kennedy Miller / Warner Bros.',
  tagline: 'The road is the only thing left, and everyone wants it.',
  trivia: [
    {
      title: 'A low-budget film that became a world',
      body: 'George Miller’s first Mad Max (1979) was made in Australia on a small budget and starred the then-unknown Mel Gibson as a highway patrolman. Mad Max 2 (1981), released in the US as The Road Warrior, moved the series to a post-collapse wasteland and set its visual style.'
    },
    {
      title: 'Thirty years between films',
      body: 'Beyond Thunderdome (1985) co-starred Tina Turner as Aunty Entity. Miller returned thirty years later with Mad Max: Fury Road (2015), with Tom Hardy replacing Gibson as Max and Charlize Theron as Imperator Furiosa, and followed it with the prequel Furiosa: A Mad Max Saga (2024).'
    },
    {
      title: 'A game from the road',
      body: 'Mad Max (2015), developed by Avalanche Studios, is an open-world vehicular action game released the same year as Fury Road. Its Max builds his own car, the Magnum Opus, while fighting through the wasteland.'
    }
  ],
  entries: [
    {
      id: 'madmax-1',
      title: 'Mad Max',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '9659' }],
      year: 1979,
      releaseDate: '1979-04-12',
      chrono: 1,
      route: 1,
      mc: 67,
      note: 'A highway patrolman is pushed into vengeance by a motorcycle gang'
    },
    {
      id: 'madmax-2',
      title: 'Mad Max 2',
      mediaType: 'movie',
      aliases: ['The Road Warrior'],
      externalIds: [{ source: 'tmdb', id: '8810' }],
      year: 1981,
      releaseDate: '1981-12-24',
      chrono: 2,
      route: 2,
      mc: 74,
      note: 'Max defends a besieged refinery in the wasteland after society’s collapse'
    },
    {
      id: 'madmax-thunderdome',
      title: 'Mad Max Beyond Thunderdome',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '9355' }],
      year: 1985,
      releaseDate: '1985-07-08',
      chrono: 3,
      route: 3,
      mc: 62,
      note: 'Max enters Bartertown, ruled by Aunty Entity'
    },
    {
      id: 'madmax-fury-road',
      title: 'Mad Max: Fury Road',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '76341' }],
      year: 2015,
      releaseDate: '2015-05-07',
      chrono: 5,
      route: 4,
      mc: 76,
      note: 'Max joins Furiosa in a chase across the desert against Immortan Joe'
    },
    {
      id: 'madmax-game',
      title: 'Mad Max',
      externalIds: [{ source: 'steam', id: '234140' }],
      year: 2015,
      releaseDate: '2015-09-01',
      route: 6,
      optional: true,
      spinOff: true,
      mc: 73,
      note: 'Avalanche Studios’ open-world game, released after Fury Road'
    },
    {
      id: 'madmax-furiosa',
      title: 'Furiosa: A Mad Max Saga',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '786892' }],
      year: 2024,
      releaseDate: '2024-05-24',
      chrono: 4,
      route: 5,
      mc: 74,
      note: 'Prequel to Fury Road: Furiosa’s youth and the war with Dementus'
    }
  ],
  characters: [
    {
      id: 'madmax-max-gibson',
      name: 'Max Rockatansky',
      role: 'Road warrior (first three films)',
      portraitUrl: `${TM}/w300_and_h450_face/jnqHMaOslt8cef2atSmOpGRvNla.jpg`,
      appearsIn: ['madmax-1', 'madmax-2', 'madmax-thunderdome'],
      blurb: 'Mel Gibson’s highway patrolman becomes a drifter after losing his family.'
    },
    {
      id: 'madmax-max-hardy',
      name: 'Max Rockatansky',
      role: 'Road warrior (Fury Road)',
      portraitUrl: `${TM}/w300_and_h450_face/d81K0RH8UX7tZj49tZaQhZ9ewH.jpg`,
      appearsIn: ['madmax-fury-road'],
      blurb: 'Tom Hardy takes the role for Fury Road, a haunted man who speaks little.'
    },
    {
      id: 'madmax-furiosa-theron',
      name: 'Imperator Furiosa',
      role: 'War rig driver',
      portraitUrl: `${TM}/w300_and_h450_face/gd7ShD0yt4bsR2STeQ19KQ6hvXL.jpg`,
      appearsIn: ['madmax-fury-road'],
      blurb: 'Charlize Theron plays the one-armed driver who turns on Immortan Joe in Fury Road.'
    },
    {
      id: 'madmax-furiosa-young',
      name: 'Furiosa',
      role: 'Young Furiosa',
      portraitUrl: `${TM}/w300_and_h450_face/yZpghhtKM2VZHDx6JGAZqAVU4PL.jpg`,
      appearsIn: ['madmax-furiosa'],
      blurb: 'Anya Taylor-Joy takes the title role in Furiosa.'
    },
    {
      id: 'madmax-dementus',
      name: 'Dementus',
      role: 'Warlord',
      portraitUrl: `${TM}/w300_and_h450_face/piQGdoIQOF3C1EI5cbYZLAW1gfj.jpg`,
      appearsIn: ['madmax-furiosa'],
      blurb: 'Chris Hemsworth plays the biker warlord who takes Furiosa from the Green Place.'
    },
    {
      id: 'madmax-immortan',
      name: 'Immortan Joe',
      role: 'Citadel warlord',
      portraitUrl: `${TM}/w300_and_h450_face/7XSPjKNwmyEPMnmoVSQ42ykMz6M.jpg`,
      appearsIn: ['madmax-fury-road'],
      blurb: 'Hugh Keays-Byrne, who also played the Toecutter in the first film, plays the ruler of the Citadel.'
    },
    {
      id: 'madmax-aunty',
      name: 'Aunty Entity',
      role: 'Ruler of Bartertown',
      portraitUrl: `${TM}/w300_and_h450_face/rqL6OCQi5IzZPYCZPvtqbKNUKGA.jpg`,
      appearsIn: ['madmax-thunderdome'],
      blurb: 'Tina Turner plays the ruler of Bartertown in Beyond Thunderdome.'
    }
  ]
}
