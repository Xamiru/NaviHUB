// Danganronpa — DR1 (Trigger Happy Havoc), DR2 (Goodbye Despair), Ultra
// Despair Girls and V3 (Killing Harmony), plus the anime: The Animation
// (retells DR1) and the DR3 pair, Future Arc and Despair Arc, which aired as
// one interleaved broadcast and are core story — they conclude the Hope's
// Peak saga rather than just adapting an existing game. Route only, no
// chrono: the task calls for a recommended order here, not an in-universe
// one, and since every entry but The Animation already advances the story in
// release order, a second ordering would mostly restate the route. The
// Animation is the one optional stop (a retelling of DR1); everything else,
// including Ultra Despair Girls' side-story, sits on the core route. Steam
// sells all four games separately, so each keeps its own id (no shared
// bundle ids exist here, unlike Kingdom Hearts or Ace Attorney). Character
// art is AniList's throughout (Monokuma via AniList's direct character
// search, since he isn't tied to one of the three anime media entries) — V3
// and Ultra Despair Girls have no anime, so their original characters
// (Shuichi, Kokichi, Komaru) aren't in AniList's database and are left out of
// the character list rather than falling back to fandom art. Ids and dates
// from Steam, AniList and Wikipedia. All verified 2026-10-05.

import type { FranchiseCfg } from './types'

export const DANGANRONPA: FranchiseCfg = {
  id: 'danganronpa',
  name: 'Danganronpa',
  short: 'Danganronpa',
  color: '#e0107a',
  heroUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/413410/library_hero.jpg',
  studio: 'Spike Chunsoft',
  tagline: 'Mutual killing, class trials, and a bear who loves both.',
  trivia: [
    {
      title: 'A mystery engine built for despair',
      body: 'Each game traps a cast of "Ultimate" talents in a closed location where the only way to leave is to murder someone and get away with it in the class trial that follows. Director Kazutaka Kodaka designed the trials\' rhythm-action minigames (Nonstop Debate, Hangman\'s Gambit) specifically so finding the killer feels as kinetic as the killing itself.'
    },
    {
      title: 'Monokuma',
      body: 'The black-and-white bear headmaster was voiced in Japanese by Nobuyo Oyama, the longtime voice of Doraemon, until Tarako took over for Danganronpa V3. He mediates every game\'s killing game personally and is the one constant across DR1, DR2 and the DR3 anime.'
    },
    {
      title: 'Two arcs, one broadcast',
      body: 'Danganronpa 3 was not a normal anime season: Future Arc and Despair Arc aired in the same weekly slot, alternating between a direct DR1 sequel (Future) and a prequel explaining how the series\' despair-fueled tragedy began (Despair). Watching them in broadcast order means cutting between the two timelines episode by episode.'
    }
  ],
  entries: [
    {
      id: 'dr-1',
      title: 'Danganronpa: Trigger Happy Havoc',
      externalIds: [{ source: 'steam', id: '413410' }],
      year: 2010,
      releaseDate: '2010-11-25',
      route: 1,
      note: 'Hope\'s Peak Academy\'s first killing game; Makoto Naegi and Monokuma'
    },
    {
      id: 'dr-2',
      title: 'Danganronpa 2: Goodbye Despair',
      externalIds: [{ source: 'steam', id: '413420' }],
      year: 2012,
      releaseDate: '2012-07-26',
      route: 2,
      note: 'Jabberwock Island, a tropical killing game, and Hajime Hinata'
    },
    {
      id: 'dr-animation',
      title: 'Danganronpa: The Animation',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '16592' }],
      year: 2013,
      releaseDate: '2013-06-23',
      route: 3,
      optional: true,
      adaptation: true,
      note: 'Thirteen-episode retelling of Trigger Happy Havoc'
    },
    {
      id: 'dr-udg',
      title: 'Danganronpa Another Episode: Ultra Despair Girls',
      externalIds: [{ source: 'steam', id: '555950' }],
      year: 2014,
      releaseDate: '2014-09-25',
      route: 4,
      spinOff: true,
      note: 'Third-person shooter side story: Komaru Naegi against an army of Monokumas'
    },
    {
      id: 'dr3-future',
      title: 'Danganronpa 3: The End of Hope\'s Peak High School – Future Arc',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '21509' }],
      year: 2016,
      releaseDate: '2016-07-11',
      route: 5,
      note: 'Direct sequel to Trigger Happy Havoc, following the Future Foundation'
    },
    {
      id: 'dr3-despair',
      title: 'Danganronpa 3: The End of Hope\'s Peak High School – Despair Arc',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '21825' }],
      year: 2016,
      releaseDate: '2016-07-14',
      route: 6,
      note: 'Prequel: Hope\'s Peak before the tragedy, and how Junko Enoshima started it'
    },
    {
      id: 'dr-v3',
      title: 'Danganronpa V3: Killing Harmony',
      externalIds: [{ source: 'steam', id: '567640' }],
      year: 2017,
      releaseDate: '2017-01-12',
      route: 7,
      note: 'A new cast, a new academy, and a premise that turns on the series itself'
    }
  ],
  characters: [
    {
      id: 'dr-makoto',
      name: 'Makoto Naegi',
      role: 'Protagonist (DR1)',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b63851-PnzyOWEPVPHD.jpg',
      appearsIn: ['dr-1', 'dr-animation', 'dr3-future'],
      blurb: 'Admitted to Hope\'s Peak by lottery rather than talent, and the one student whose stubborn belief in his classmates survives every twist Monokuma throws at him.'
    },
    {
      id: 'dr-kyoko',
      name: 'Kyoko Kirigiri',
      role: 'Ultimate Detective (DR1)',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b63845-43rWjycWhYFF.png',
      appearsIn: ['dr-1', 'dr-animation', 'dr3-future'],
      blurb: 'Keeps her talent secret for most of DR1, piecing together each murder a step ahead of everyone else in the class trials.'
    },
    {
      id: 'dr-junko',
      name: 'Junko Enoshima',
      role: 'Ultimate Despair',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b65523-OztiX9PhydrG.png',
      appearsIn: ['dr-1', 'dr-animation', 'dr3-future', 'dr3-despair'],
      blurb: 'The series\' real architect: a fashion-model Ultimate whose boredom curdles into a cult of despair that starts the global tragedy behind every game.'
    },
    {
      id: 'dr-hajime',
      name: 'Hajime Hinata',
      role: 'Protagonist (DR2)',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b90007-ybDO4Rv8ndr5.jpg',
      appearsIn: ['dr-2', 'dr3-despair'],
      blurb: 'A "Reserve Course" student without an Ultimate talent of his own, whose actual identity on Jabberwock Island is DR2\'s central secret.'
    },
    {
      id: 'dr-nagito',
      name: 'Nagito Komaeda',
      role: 'Ultimate Lucky Student (DR2)',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b73227-AY45waaQAos0.png',
      appearsIn: ['dr-2', 'dr3-despair'],
      blurb: 'Talentless by the game\'s own logic except for catastrophic luck, and devoted to "hope" in a way that makes him as dangerous as anyone chasing despair.'
    },
    {
      id: 'dr-chiaki',
      name: 'Chiaki Nanami',
      role: 'Ultimate Gamer (DR2)',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b73205-XVUjSJd97PbC.jpg',
      appearsIn: ['dr-2', 'dr3-despair'],
      blurb: 'The class representative who treats the killing game like a puzzle to be solved fairly, and whose true nature reframes most of DR2\'s cast once revealed.'
    },
    {
      id: 'dr-monokuma',
      name: 'Monokuma',
      role: 'Headmaster and mascot',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b73235-74a7Y1lzFnDv.jpg',
      appearsIn: ['dr-1', 'dr-2', 'dr-animation', 'dr-udg', 'dr3-future', 'dr3-despair', 'dr-v3'],
      blurb: 'The two-toned bear who runs every killing game with the cheerful cruelty of a game-show host, and Junko\'s mouthpiece whenever she isn\'t speaking for herself.'
    }
  ]
}
