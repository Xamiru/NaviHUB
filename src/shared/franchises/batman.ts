// Batman — the theatrical live-action Batman films across three unrelated
// continuities, plus Batman: The Animated Series and its film, The LEGO Batman
// Movie, the Arkham trilogy of games, and The Penguin. NO chrono on any entry:
// these are several unconnected continuities (1960s Batman; the Burton/
// Schumacher films; the Nolan trilogy; the Reeves film and its HBO spin-off),
// not one timeline, so the note on each entry names its continuity instead.
// Excluded: the DCEU ensemble films (Batman v Superman, Justice League, The
// Flash) and Arkham Origins, a prequel made by a different studio than the
// Rocksteady trilogy. The Batman: Part II is EXCLUDED: TMDB lists it with a
// release date of 2028-02-18, well after this page's 2026-10-05 cutoff. The
// 1966 and 1989 films are both titled plain "Batman" on TMDB; the 1966 film is
// given its own TMDB-listed US alternative title, "Batman: The Movie", so
// franchise entry titles stay unique. Steam ids are each trilogy game's
// current storefront listing (the Game of the Year editions for Asylum and
// City). Ids and dates from TMDB (en-US) and the Steam store API, curl-
// verified 2026-10-05.

import type { FranchiseCfg } from './types'

const TM = 'https://image.tmdb.org/t/p'

export const BATMAN: FranchiseCfg = {
  id: 'batman',
  name: 'Batman',
  short: 'Batman',
  color: '#d4af37',
  heroUrl: `${TM}/w1280/9FE5eD92WfVCiivM9Pq9GVSrlWk.jpg`,
  studio: 'DC / Warner Bros.',
  tagline: 'Gotham City, reinvented across six decades of unconnected continuities.',
  trivia: [
    {
      title: 'Several Gothams, not one',
      body: 'Unlike most superhero franchises, Batman has been restarted wholesale several times rather than building one continuous film timeline: the campy 1966 film and television series; Tim Burton\'s gothic Batman and Batman Returns, continued in a lighter tone by Joel Schumacher\'s Batman Forever and Batman & Robin; Christopher Nolan\'s grounded Dark Knight trilogy; and Matt Reeves\'s noir-detective The Batman, which has its own HBO Max spin-off in The Penguin. None of these continuities share casting or continuity with each other.'
    },
    {
      title: 'Animation\'s own canon',
      body: 'Batman: The Animated Series (1992) and its theatrical film Batman: Mask of the Phantasm built a separate, highly regarded continuity of their own — the "DC Animated Universe" — with Kevin Conroy\'s Batman and Mark Hamill\'s Joker, voice performances many fans consider definitive and unconnected to any of the live-action films.'
    },
    {
      title: 'Video games and comedy detours',
      body: 'Rocksteady\'s Batman: Arkham Asylum, Arkham City and Arkham Knight form their own acclaimed trilogy (a prequel, Arkham Origins, was made separately by WB Games Montreal and is not part of this trilogy). The LEGO Batman Movie plays the character\'s seriousness for comedy, parodying decades of Batman media rather than belonging to any one of them.'
    }
  ],
  entries: [
    {
      id: 'bat-1966',
      title: 'Batman: The Movie',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '2661' }],
      year: 1966,
      releaseDate: '1966-07-30',
      spinOff: true,
      note: 'Campy theatrical film spun off from the 1966 Adam West television series'
    },
    {
      id: 'bat-1989',
      title: 'Batman',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '268' }],
      year: 1989,
      releaseDate: '1989-06-21',
      note: 'Tim Burton\'s gothic reinvention, with Michael Keaton as Batman and Jack Nicholson as the Joker'
    },
    {
      id: 'bat-returns',
      title: 'Batman Returns',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '364' }],
      year: 1992,
      releaseDate: '1992-06-19',
      note: 'Burton\'s stranger, more personal sequel, introducing Catwoman and the Penguin'
    },
    {
      id: 'bat-animated-series',
      title: 'Batman: The Animated Series',
      mediaType: 'tv',
      externalIds: [{ source: 'tmdb', id: '2098' }],
      year: 1992,
      releaseDate: '1992-09-05',
      note: 'Kevin Conroy and Mark Hamill lead the DC Animated Universe\'s acclaimed, separate continuity'
    },
    {
      id: 'bat-mask-phantasm',
      title: 'Batman: Mask of the Phantasm',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '14919' }],
      year: 1993,
      releaseDate: '1993-12-25',
      note: 'Theatrical film in the Animated Series continuity, revealing a tragedy from Bruce Wayne\'s past'
    },
    {
      id: 'bat-forever',
      title: 'Batman Forever',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '414' }],
      year: 1995,
      releaseDate: '1995-06-16',
      note: 'Joel Schumacher takes over with a brighter tone, Val Kilmer as Batman, and Jim Carrey as the Riddler'
    },
    {
      id: 'bat-and-robin',
      title: 'Batman & Robin',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '415' }],
      year: 1997,
      releaseDate: '1997-06-20',
      note: 'Schumacher\'s widely panned finale, with George Clooney as Batman and Arnold Schwarzenegger as Mr. Freeze'
    },
    {
      id: 'bat-begins',
      title: 'Batman Begins',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '272' }],
      year: 2005,
      releaseDate: '2005-06-10',
      note: 'Christopher Nolan\'s grounded origin story, with Christian Bale as Batman'
    },
    {
      id: 'bat-tdk',
      title: 'The Dark Knight',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '155' }],
      year: 2008,
      releaseDate: '2008-07-16',
      note: 'Heath Ledger\'s Joker pushes Batman and Harvey Dent toward their breaking points'
    },
    {
      id: 'bat-arkham-asylum',
      title: 'Batman: Arkham Asylum',
      mediaType: 'game',
      externalIds: [{ source: 'steam', id: '35140' }],
      year: 2009,
      note: 'Rocksteady\'s first Arkham game, trapping Batman inside Arkham Asylum during a Joker-orchestrated riot'
    },
    {
      id: 'bat-arkham-city',
      title: 'Batman: Arkham City',
      mediaType: 'game',
      externalIds: [{ source: 'steam', id: '200260' }],
      year: 2011,
      note: 'Batman infiltrates a walled-off section of Gotham turned into a vast open-air prison'
    },
    {
      id: 'bat-tdkr',
      title: 'The Dark Knight Rises',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '49026' }],
      year: 2012,
      releaseDate: '2012-07-17',
      note: 'Nolan\'s trilogy closer, with Bane threatening to destroy Gotham eight years after The Dark Knight'
    },
    {
      id: 'bat-arkham-knight',
      title: 'Batman: Arkham Knight',
      mediaType: 'game',
      externalIds: [{ source: 'steam', id: '208650' }],
      year: 2015,
      releaseDate: '2015-06-23',
      note: 'The Rocksteady trilogy\'s finale, as Scarecrow and a mysterious Arkham Knight unite Batman\'s enemies against him'
    },
    {
      id: 'bat-lego',
      title: 'The Lego Batman Movie',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '324849' }],
      year: 2017,
      releaseDate: '2017-02-08',
      spinOff: true,
      note: 'Animated comedy spun off from The Lego Movie, parodying decades of Batman media and its own brooding hero'
    },
    {
      id: 'bat-thebatman',
      title: 'The Batman',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '414906' }],
      year: 2022,
      releaseDate: '2022-03-01',
      note: 'Matt Reeves\'s noir detective take, with Robert Pattinson as a younger, more isolated Batman hunting the Riddler'
    },
    {
      id: 'bat-penguin',
      title: 'The Penguin',
      mediaType: 'tv',
      externalIds: [{ source: 'tmdb', id: '194764' }],
      year: 2024,
      releaseDate: '2024-09-19',
      spinOff: true,
      note: 'HBO spin-off from The Batman following Oz Cobb\'s rise through Gotham\'s criminal underworld'
    }
  ],
  characters: [
    {
      id: 'bat-bruce-keaton',
      name: 'Bruce Wayne / Batman',
      role: 'Batman (Burton/Schumacher films)',
      portraitUrl: `${TM}/w300_and_h450_face/tYSja1KByFnZ4Hkp3stPqkKHnNL.jpg`,
      appearsIn: ['bat-1989', 'bat-returns'],
      blurb: 'Michael Keaton\'s withdrawn, haunted take on Bruce Wayne, introduced in Tim Burton\'s two films.'
    },
    {
      id: 'bat-bruce-bale',
      name: 'Bruce Wayne / Batman',
      role: 'Batman (Nolan trilogy)',
      portraitUrl: `${TM}/w300_and_h450_face/7Pxez9J8fuPd2Mn9kex13YALrCQ.jpg`,
      appearsIn: ['bat-begins', 'bat-tdk', 'bat-tdkr'],
      blurb: 'Christian Bale\'s version trains abroad before returning to Gotham, building a grounded mythology across three films.'
    },
    {
      id: 'bat-bruce-pattinson',
      name: 'Bruce Wayne / The Batman',
      role: 'Batman (Reeves film)',
      portraitUrl: `${TM}/w300_and_h450_face/3qZ09UE7lN6AtorfXFRYpEtSY93.jpg`,
      appearsIn: ['bat-thebatman'],
      blurb: 'Robert Pattinson\'s second-year Batman works as a reclusive detective, still learning to be more than a creature of vengeance.'
    },
    {
      id: 'bat-joker-nicholson',
      name: 'The Joker',
      role: 'Joker (Burton film)',
      portraitUrl: `${TM}/w300_and_h450_face/6h12pZsgj3WWjMtykUgfLkLEBWz.jpg`,
      appearsIn: ['bat-1989'],
      blurb: 'Jack Nicholson\'s Joker, formerly the gangster Jack Napier, disfigured in a chemical accident caused by a young Bruce Wayne.'
    },
    {
      id: 'bat-joker-ledger',
      name: 'The Joker',
      role: 'Joker (Nolan trilogy)',
      portraitUrl: `${TM}/w300_and_h450_face/AdWKVqyWpkYSfKE5Gb2qn8JzHni.jpg`,
      appearsIn: ['bat-tdk'],
      blurb: 'Heath Ledger\'s Academy Award-winning Joker, an agent of chaos with no clear origin, out to prove Gotham\'s heroes can fall as far as he has.'
    },
    {
      id: 'bat-catwoman',
      name: 'Catwoman / Selina Kyle',
      role: 'Catwoman (Burton film)',
      portraitUrl: `${TM}/w300_and_h450_face/8qwNMFzmM3BxGKIj1iIqiHHBpx3.jpg`,
      appearsIn: ['bat-returns'],
      blurb: 'Michelle Pfeiffer\'s Selina Kyle, a meek secretary who reinvents herself as Catwoman after being murdered and left for dead.'
    },
    {
      id: 'bat-alfred',
      name: 'Alfred Pennyworth',
      role: 'Bruce Wayne\'s butler (Nolan trilogy)',
      portraitUrl: `${TM}/w300_and_h450_face/bVZRMlpjTAO2pJK6v90buFgVbSW.jpg`,
      appearsIn: ['bat-begins', 'bat-tdk', 'bat-tdkr'],
      blurb: 'Michael Caine\'s Alfred raises Bruce after his parents\' deaths and remains his closest confidant and conscience.'
    }
  ]
}
