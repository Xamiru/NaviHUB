// Back to the Future — Robert Zemeckis's three films and the 1991 animated
// series that continues them. Chrono follows the story: the three films in
// order (Part II visits 2015 and an alternate 1985 and Part III visits 1885,
// but each film's own present sets its slot), then the cartoon,
// which picks up after the third film. Route is release order, with the
// animated series as an optional detour. Excluded: Telltale's 2010 Back to the
// Future: The Game, which has no Steam listing today (a store search and the
// storefront's suggest endpoint return only unrelated Back to the Future
// cosmetic packs), and the Universal theme-park ride.
// Ids and dates from TMDB (en-US), Steam and Open Library, curl-verified
// 2026-10-14. Film dates are the earliest US row on TMDB's releases page.

import type { FranchiseCfg } from './types'

const TM = 'https://image.tmdb.org/t/p'

export const BACK_TO_THE_FUTURE: FranchiseCfg = {
  id: 'back-to-the-future',
  name: 'Back to the Future',
  short: 'Back to the Future',
  color: '#d9663a',
  heroUrl: `${TM}/w1280/2H2YYbn8wDzYXtak83Md6PAwMdp.jpg`,
  studio: 'Amblin Entertainment / Universal Pictures',
  tagline: 'If my calculations are correct, you are about to see some serious history.',
  trivia: [
    {
      title: 'A trilogy planned in two parts',
      body: 'Back to the Future (1985) was written as a complete story. Its sequels were shot back to back: Part II and Part III were filmed together and released in November 1989 and May 1990, which is why Part II ends by setting up the third film.'
    },
    {
      title: 'One set of faces, several timelines',
      body: 'The films move between 1985, 1955, 2015, an alternate 1985 and 1885. Michael J. Fox plays Marty McFly in each, and Christopher Lloyd plays Emmett "Doc" Brown, the inventor of the DeLorean time machine.'
    },
    {
      title: 'The cartoon continues the story',
      body: 'Back to the Future: The Animated Series ran on CBS from 1991. Christopher Lloyd appears as Doc Brown in live-action segments that bookend the episodes, while the animated Doc, Marty and their family travel through time in the Brown family’s train.'
    }
  ],
  entries: [
    {
      id: 'bttf-1',
      title: 'Back to the Future',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '105' }],
      year: 1985,
      releaseDate: '1985-07-03',
      chrono: 1,
      route: 1,
      mc: 83,
      note: 'Marty McFly is sent to 1955 in Doc Brown’s DeLorean and has to get his parents together'
    },
    {
      id: 'bttf-2',
      title: 'Back to the Future Part II',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '165' }],
      year: 1989,
      releaseDate: '1989-11-20',
      chrono: 2,
      route: 2,
      mc: 78,
      note: 'Doc takes Marty to 2015, where Biff’s sports almanac rewrites history'
    },
    {
      id: 'bttf-3',
      title: 'Back to the Future Part III',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '196' }],
      year: 1990,
      releaseDate: '1990-05-25',
      chrono: 3,
      route: 3,
      mc: 75,
      note: 'Marty travels to 1885 to rescue Doc in the Old West'
    },
    {
      id: 'bttf-animated',
      title: 'Back to the Future: The Animated Series',
      mediaType: 'tv',
      aliases: ['Back to the Future'],
      externalIds: [{ source: 'tmdb', id: '4745' }],
      year: 1991,
      releaseDate: '1991-09-14',
      chrono: 4,
      route: 4,
      optional: true,
      spinOff: true,
      mc: 63,
      note: 'CBS Saturday-morning cartoon in which Doc’s family travels through time with Marty'
    }
  ],
  characters: [
    {
      id: 'bttf-marty',
      name: 'Marty McFly',
      role: 'Teenage time traveller',
      portraitUrl: `${TM}/w300_and_h450_face/2JB4FMgQmnhbBlQ4SxWFN9EIVDi.jpg`,
      appearsIn: ['bttf-1', 'bttf-2', 'bttf-3'],
      blurb: 'Michael J. Fox’s skateboarding teenager is the trilogy’s constant across every time period.'
    },
    {
      id: 'bttf-doc',
      name: 'Emmett "Doc" Brown',
      role: 'Inventor',
      portraitUrl: `${TM}/w300_and_h450_face/nxVjpyb3UrfbPZnEyDNlQVlFAs5.jpg`,
      appearsIn: ['bttf-1', 'bttf-2', 'bttf-3', 'bttf-animated'],
      blurb: 'Christopher Lloyd’s eccentric scientist builds the DeLorean time machine.'
    },
    {
      id: 'bttf-biff',
      name: 'Biff Tannen',
      role: 'Bully and antagonist',
      portraitUrl: `${TM}/w300_and_h450_face/mVhm65ZVBIRIptWGiMIvoUy0Khi.jpg`,
      appearsIn: ['bttf-1', 'bttf-2', 'bttf-3'],
      blurb: 'Thomas F. Wilson plays Biff and his descendants across the family’s generations.'
    },
    {
      id: 'bttf-lorraine',
      name: 'Lorraine Baines McFly',
      role: 'Marty’s mother',
      portraitUrl: `${TM}/w300_and_h450_face/n7qTKpbAbr2P1RlcW1Lq1NhckQ2.jpg`,
      appearsIn: ['bttf-1', 'bttf-2'],
      blurb: 'Lea Thompson’s Lorraine develops an unexpected crush on her own son in 1955.'
    },
    {
      id: 'bttf-george',
      name: 'George McFly',
      role: 'Marty’s father',
      portraitUrl: `${TM}/w300_and_h450_face/imBnLpSXvg61qDDdEfvL6R4ITKt.jpg`,
      appearsIn: ['bttf-1'],
      blurb: 'Crispin Glover’s timid George finds his nerve with Marty’s help.'
    },
    {
      id: 'bttf-jennifer',
      name: 'Jennifer Parker',
      role: 'Marty’s girlfriend',
      portraitUrl: `${TM}/w300_and_h450_face/1pmjDSLvOuqKW1P2KRPlpFMeUFe.jpg`,
      appearsIn: ['bttf-2', 'bttf-3'],
      blurb: 'Elisabeth Shue takes over the role from Part II onward.'
    }
  ]
}
