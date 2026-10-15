// Toy Story — Pixar's five Toy Story films, the two ABC television specials
// (Toy Story of Terror! and Toy Story That Time Forgot, both listed on TMDB as
// movies), the Lightyear film that the toy Buzz is based on, and the 2000
// Buzz Lightyear of Star Command: The Adventure Begins film, a spin-off of the
// toy line's in-universe cartoon. No chrono: the specials and the spin-offs
// are not placed against the main story. Route is release order of the five
// films, with the specials and spin-offs as optional detours. Excluded: the
// Toy Story Toons shorts and the Buzz Lightyear of Star Command television
// series (the 2000 film is its pilot). Toy Story 5 is included: TMDB lists its
// premiere on 2026-06-09, before this file's 2026-10-14 cutoff.
// Ids and dates from TMDB (en-US), Steam and Open Library, curl-verified
// 2026-10-14. Dates are the earliest US row on TMDB's releases page.

import type { FranchiseCfg } from './types'

const TM = 'https://image.tmdb.org/t/p'

export const TOY_STORY: FranchiseCfg = {
  id: 'toy-story',
  name: 'Toy Story',
  short: 'Toy Story',
  color: '#e8b923',
  heroUrl: `${TM}/w1280/3Rfvhy1Nl6sSGJwyjb0QiZzZYlB.jpg`,
  studio: 'Pixar / Disney',
  tagline: 'Toys that come to life when no one is looking.',
  trivia: [
    {
      title: 'The first computer-animated feature',
      body: 'Toy Story (1995), directed by John Lasseter, was the first feature film made entirely with computer animation. It introduced Woody, the cowboy doll voiced by Tom Hanks, and Buzz Lightyear, the space-ranger toy voiced by Tim Allen.'
    },
    {
      title: 'Growing up with the toys',
      body: 'The films follow the toys through Andy’s childhood into Bonnie’s: Toy Story 2 (1999) turns on Woody’s collector value, Toy Story 3 (2010) brings Andy’s departure for college, and Toy Story 4 (2019) reunites Woody with Bo Peep. Toy Story 5 was released in 2026.'
    },
    {
      title: 'The film behind the toy',
      body: 'Lightyear (2022) is presented as the film that Andy saw in 1995 and which made him want a Buzz Lightyear toy, with Chris Evans voicing the character. Buzz Lightyear of Star Command: The Adventure Begins (2000) is a feature-length pilot for a television series built on the toy’s in-universe cartoon.'
    }
  ],
  entries: [
    {
      id: 'toy-1',
      title: 'Toy Story',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '862' }],
      year: 1995,
      releaseDate: '1995-11-19',
      route: 1,
      mc: 80,
      note: 'Woody’s place as Andy’s favourite is threatened by the arrival of Buzz Lightyear'
    },
    {
      id: 'toy-2',
      title: 'Toy Story 2',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '863' }],
      year: 1999,
      releaseDate: '1999-11-24',
      route: 2,
      mc: 76,
      note: 'Woody is stolen by a toy collector and learns where he comes from'
    },
    {
      id: 'toy-buzz-star-command',
      title: 'Buzz Lightyear of Star Command: The Adventure Begins',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '16187' }],
      year: 2000,
      releaseDate: '2000-08-08',
      route: 6,
      optional: true,
      spinOff: true,
      mc: 64,
      note: 'Direct-to-video pilot of the Buzz Lightyear of Star Command television series'
    },
    {
      id: 'toy-3',
      title: 'Toy Story 3',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '10193' }],
      year: 2010,
      releaseDate: '2010-06-18',
      route: 3,
      mc: 78,
      note: 'Andy goes to college and the toys end up in a daycare'
    },
    {
      id: 'toy-terror',
      title: 'Toy Story of Terror!',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '213121' }],
      year: 2013,
      releaseDate: '2013-10-16',
      route: 7,
      optional: true,
      spinOff: true,
      mc: 73,
      note: 'Halloween TV special: the toys are stranded at a roadside motel'
    },
    {
      id: 'toy-forgot',
      title: 'Toy Story That Time Forgot',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '256835' }],
      year: 2014,
      releaseDate: '2014-12-02',
      route: 8,
      optional: true,
      spinOff: true,
      mc: 71,
      note: 'Christmas TV special: Bonnie’s toys meet a set of action figures from a dinosaur line'
    },
    {
      id: 'toy-4',
      title: 'Toy Story 4',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '301528' }],
      year: 2019,
      releaseDate: '2019-06-11',
      route: 4,
      mc: 75,
      note: 'Woody meets Forky and reunites with Bo Peep'
    },
    {
      id: 'toy-lightyear',
      title: 'Lightyear',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '718789' }],
      year: 2022,
      releaseDate: '2022-06-08',
      route: 9,
      optional: true,
      spinOff: true,
      mc: 69,
      note: 'The film Andy saw in 1995, starring the human Buzz Lightyear'
    },
    {
      id: 'toy-5',
      title: 'Toy Story 5',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '1084244' }],
      year: 2026,
      releaseDate: '2026-06-09',
      route: 5,
      mc: 83,
      note: 'The 2026 sequel'
    }
  ],
  characters: [
    {
      id: 'toy-woody',
      name: 'Woody',
      role: 'Cowboy doll',
      portraitUrl: `${TM}/w300_and_h450_face/oFvZoKI6lvU03n4YoNGAll9rkas.jpg`,
      appearsIn: ['toy-1', 'toy-2', 'toy-3', 'toy-4'],
      blurb: 'Tom Hanks voices the loyal cowboy who leads the toys.'
    },
    {
      id: 'toy-buzz',
      name: 'Buzz Lightyear',
      role: 'Space ranger toy',
      portraitUrl: `${TM}/w300_and_h450_face/k8XPNHBO459FaqkqqM4tfX5GMKk.jpg`,
      appearsIn: ['toy-1', 'toy-2', 'toy-3', 'toy-4'],
      blurb: 'Tim Allen voices the space ranger who first believes he is not a toy.'
    },
    {
      id: 'toy-jessie',
      name: 'Jessie',
      role: 'Cowgirl doll',
      portraitUrl: `${TM}/w300_and_h450_face/59UIeHZFYrKyP20lXqijtfTXglO.jpg`,
      appearsIn: ['toy-2', 'toy-3', 'toy-4'],
      blurb: 'Joan Cusack voices the energetic cowgirl introduced in Toy Story 2.'
    },
    {
      id: 'toy-rex',
      name: 'Rex',
      role: 'Anxious dinosaur toy',
      portraitUrl: `${TM}/w300_and_h450_face/wVaM1WlFKDce4esThwL4XtNLhOe.jpg`,
      appearsIn: ['toy-1', 'toy-2', 'toy-3', 'toy-4'],
      blurb: 'Wallace Shawn voices the nervous green dinosaur.'
    },
    {
      id: 'toy-potato-head',
      name: 'Mr. Potato Head',
      role: 'Sarcastic toy',
      portraitUrl: `${TM}/w300_and_h450_face/iGMOVxIQoTPepRvqSCtRulfpx7u.jpg`,
      appearsIn: ['toy-1', 'toy-2', 'toy-3', 'toy-4'],
      blurb: 'Don Rickles voices the grumbling Mr. Potato Head.'
    },
    {
      id: 'toy-bo-peep',
      name: 'Bo Peep',
      role: 'Porcelain lamp figure',
      portraitUrl: `${TM}/w300_and_h450_face/nugPVN28qOhOIoHawrDJ6fIfrxR.jpg`,
      appearsIn: ['toy-1', 'toy-2', 'toy-4'],
      blurb: 'Annie Potts voices Woody’s friend, who returns as a self-reliant adventurer in Toy Story 4.'
    },
    {
      id: 'toy-forky',
      name: 'Forky',
      role: 'Craft-made toy',
      portraitUrl: `${TM}/w300_and_h450_face/3dEyZgTye0Ec17VGKp0mJ3aU6ty.jpg`,
      appearsIn: ['toy-4'],
      blurb: 'Tony Hale voices the spork Bonnie turns into a toy.'
    }
  ]
}
