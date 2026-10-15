// One Piece — Eiichiro Oda's manga, Toei Animation's TV series (one AniList
// row for the whole broadcast run), all fifteen theatrical films from 2000's
// One Piece: The Movie to 2022's Film Red, the 2024 Fan Letter special and
// Netflix's live-action series (one TMDB row; season 2 premiered 2026-03-10).
// NO chrono: the films are side stories outside the manga's continuity or
// retellings of its arcs (Episode of Alabasta, Episode of Chopper Plus), and
// cannot be pinned to one point in the story. Route is the TV series, with
// every film, the special and the live-action series as optional detours; the
// manga sits outside the route as the source. Excluded: the Episode of ...
// TV recap specials (East Blue, Nami, Merry, Skypiea), the Heart of Gold and
// Nebulandia TV specials, short promotional specials, the One Piece Log
// re-edits, Film God Valley (2027) and the games.
// Anime/manga ids, dates and scores from AniList; the live-action series' id,
// premiere date and user score from TMDB (en-US). Art from AniList,
// curl-verified 2026-10-14.

import type { FranchiseCfg } from './types'

const AL = 'https://s4.anilist.co/file/anilistcdn'

// Films each Straw Hat appears in, by the year they joined the crew on screen.
const FILMS_ALL = ['op-movie-1', 'op-clockwork-island', 'op-chopper-kingdom', 'op-dead-end', 'op-sacred-sword', 'op-baron-omatsuri', 'op-karakuri-castle', 'op-alabasta', 'op-chopper-plus', 'op-strong-world', 'op-straw-hat-chase', 'op-film-z', 'op-film-gold', 'op-stampede', 'op-film-red']
const FILMS_FROM_2001 = FILMS_ALL.slice(1)
const FILMS_FROM_2002 = FILMS_ALL.slice(2)

export const ONE_PIECE: FranchiseCfg = {
  id: 'one-piece',
  name: 'One Piece',
  short: 'One Piece',
  color: '#d6312b',
  heroUrl: `${AL}/media/anime/banner/21-wf37VakJmZqs.jpg`,
  studio: 'Shueisha / Toei Animation',
  tagline: 'A rubber-bodied boy in a straw hat sets out to sea to find the greatest treasure in the world and become King of the Pirates.',
  trivia: [
    {
      title: 'The best-selling manga ever',
      body: 'Oda’s manga has run in Weekly Shonen Jump since July 1997. In 2015 Guinness World Records recognised it as the comic series with the most copies published by a single author, and it has kept extending that record since. Oda has said from early on that the story’s ending was planned in advance.'
    },
    {
      title: 'Oda takes the films in hand',
      body: 'The early films were original side adventures produced around the TV series. Starting with Strong World (2009), Oda served as executive producer and wrote the original story, and he stayed closely involved in the later films, Z, Gold, Stampede and Red. Film Red (2022), built around the singer Uta, whose songs were performed by Ado, became the franchise’s highest-grossing film.'
    },
    {
      title: 'A long voyage on television',
      body: 'Toei’s TV series has broadcast continuously since October 1999 and passed 1,100 episodes. Its first extended break came from October 2024 to April 2025, a pause that the Fan Letter special, adapted from a spin-off novel about ordinary people in the One Piece world, was released during.'
    }
  ],
  entries: [
    {
      id: 'op-manga',
      title: 'One Piece',
      mediaType: 'manga',
      externalIds: [{ source: 'anilist', id: '30013' }],
      year: 1997,
      releaseDate: '1997-07-22',
      mc: 91,
      note: 'Oda’s manga, serialized since 1997'
    },
    {
      id: 'op-tv',
      title: 'One Piece',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '21' }],
      year: 1999,
      releaseDate: '1999-10-20',
      route: 1,
      adaptation: true,
      mc: 87,
      note: 'Toei’s TV series, on air since 1999: Luffy gathers his crew and sails the Grand Line'
    },
    {
      id: 'op-movie-1',
      title: 'One Piece: The Movie',
      mediaType: 'anime',
      aliases: ['One Piece (Movie)'],
      externalIds: [{ source: 'anilist', id: '459' }],
      year: 2000,
      releaseDate: '2000-03-04',
      route: 2,
      optional: true,
      mc: 68,
      note: 'Film 1: the young crew hunts the treasure of the pirate Woonan'
    },
    {
      id: 'op-clockwork-island',
      title: 'One Piece: Clockwork Island Adventure',
      mediaType: 'anime',
      aliases: ['One Piece: Nejimaki-jima no Bouken'],
      externalIds: [{ source: 'anilist', id: '460' }],
      year: 2001,
      releaseDate: '2001-03-03',
      route: 3,
      optional: true,
      mc: 67,
      note: 'Film 2: the Going Merry is stolen, and the crew chases it to a mechanical island'
    },
    {
      id: 'op-chopper-kingdom',
      title: 'One Piece: Chopper’s Kingdom on the Island of Strange Animals',
      mediaType: 'anime',
      aliases: ['One Piece: Chinjuu-jima no Chopper Oukoku'],
      externalIds: [{ source: 'anilist', id: '461' }],
      year: 2002,
      releaseDate: '2002-03-02',
      route: 4,
      optional: true,
      mc: 64,
      note: 'Film 3: Chopper is crowned king by the animals of a strange island'
    },
    {
      id: 'op-dead-end',
      title: 'One Piece The Movie: The Dead End Adventure',
      mediaType: 'anime',
      aliases: ['One Piece The Movie: Dead End no Bouken'],
      externalIds: [{ source: 'anilist', id: '462' }],
      year: 2003,
      releaseDate: '2003-03-01',
      route: 5,
      optional: true,
      mc: 72,
      note: 'Film 4: the crew enters an outlaw pirate race with a fortune as the prize'
    },
    {
      id: 'op-sacred-sword',
      title: 'One Piece: The Curse of the Sacred Sword',
      mediaType: 'anime',
      aliases: ['One Piece: Norowareta Seiken'],
      externalIds: [{ source: 'anilist', id: '463' }],
      year: 2004,
      releaseDate: '2004-03-06',
      route: 6,
      optional: true,
      mc: 67,
      note: 'Film 5: Zoro turns against the crew over a cursed blade'
    },
    {
      id: 'op-baron-omatsuri',
      title: 'One Piece: Baron Omatsuri and the Secret Island',
      mediaType: 'anime',
      aliases: ['One Piece The Movie: Omatsuri Danshaku to Himitsu no Shima'],
      externalIds: [{ source: 'anilist', id: '464' }],
      year: 2005,
      releaseDate: '2005-03-05',
      route: 7,
      optional: true,
      mc: 78,
      note: 'Film 6: Mamoru Hosoda’s darker film about a resort island and its host'
    },
    {
      id: 'op-karakuri-castle',
      title: 'One Piece: Mega Mecha Soldier of Karakuri Castle',
      mediaType: 'anime',
      aliases: ['One Piece The Movie: Karakuri-jou no Mecha Kyohei', 'One Piece: Giant Mechanical Soldier of Karakuri Castle'],
      externalIds: [{ source: 'anilist', id: '465' }],
      year: 2006,
      releaseDate: '2006-03-04',
      route: 8,
      optional: true,
      mc: 67,
      note: 'Film 7: an old woman leads the crew to Mecha Island in search of a golden crown'
    },
    {
      id: 'op-alabasta',
      title: 'One Piece: The Desert Princess and the Pirates, Adventures in Alabasta',
      mediaType: 'anime',
      aliases: ['One Piece: Episode of Alabasta - Sabaku no Oujo to Kaizoku-tachi', 'One Piece: Episode of Alabasta'],
      externalIds: [{ source: 'anilist', id: '2107' }],
      year: 2007,
      releaseDate: '2007-03-03',
      route: 9,
      optional: true,
      adaptation: true,
      mc: 70,
      note: 'Film 8: a condensed retelling of the Alabasta arc'
    },
    {
      id: 'op-chopper-plus',
      title: 'One Piece: Episode Of Chopper +: The Miracle Winter Cherry Blossom',
      mediaType: 'anime',
      aliases: ['One Piece The Movie: Episode of Chopper Plus - Fuyu ni Saku, Kiseki no Sakura'],
      externalIds: [{ source: 'anilist', id: '3848' }],
      year: 2008,
      releaseDate: '2008-03-01',
      route: 10,
      optional: true,
      adaptation: true,
      mc: 71,
      note: 'Film 9: the Drum Island arc retold with the later crew aboard'
    },
    {
      id: 'op-strong-world',
      title: 'One Piece Film: Strong World',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '4155' }],
      year: 2009,
      releaseDate: '2009-12-12',
      route: 11,
      optional: true,
      mc: 78,
      note: 'Film 10: Oda’s original story, with the legendary pirate Shiki kidnapping Nami'
    },
    {
      id: 'op-straw-hat-chase',
      title: 'One Piece 3D: Mugiwara Chase',
      mediaType: 'anime',
      aliases: ['One Piece 3D: Straw Hat Chase'],
      externalIds: [{ source: 'anilist', id: '9999' }],
      year: 2011,
      releaseDate: '2011-03-19',
      route: 12,
      optional: true,
      mc: 64,
      note: 'Film 11: a short CG film in which Luffy chases a thief who stole his straw hat'
    },
    {
      id: 'op-film-z',
      title: 'One Piece Film: Z',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '12859' }],
      year: 2012,
      releaseDate: '2012-12-15',
      route: 13,
      optional: true,
      mc: 79,
      note: 'Film 12: a former admiral turned pirate hunter declares war on the age of piracy'
    },
    {
      id: 'op-film-gold',
      title: 'One Piece Film: Gold',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '21335' }],
      year: 2016,
      releaseDate: '2016-07-23',
      route: 14,
      optional: true,
      mc: 77,
      note: 'Film 13: a heist on Gran Tesoro, a casino ship that is its own nation'
    },
    {
      id: 'op-stampede',
      title: 'One Piece: Stampede',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '105143' }],
      year: 2019,
      releaseDate: '2019-08-09',
      route: 15,
      optional: true,
      mc: 80,
      note: 'Film 14: an anniversary crossover with dozens of pirates at a pirate festival'
    },
    {
      id: 'op-film-red',
      title: 'One Piece Film: Red',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '141902' }],
      year: 2022,
      releaseDate: '2022-08-06',
      route: 16,
      optional: true,
      mc: 78,
      note: 'Film 15: the singer Uta, Shanks’ daughter, holds a concert that turns into something else'
    },
    {
      id: 'op-live-action',
      title: 'One Piece',
      mediaType: 'tv',
      aliases: ['One Piece (Netflix)'],
      externalIds: [{ source: 'tmdb', id: '111110' }],
      year: 2023,
      releaseDate: '2023-08-31',
      route: 17,
      optional: true,
      adaptation: true,
      remake: true,
      mc: 81,
      note: 'Netflix’s live-action adaptation, with Iñaki Godoy as Luffy; season 2 premiered in March 2026'
    },
    {
      id: 'op-fan-letter',
      title: 'One Piece Fan Letter',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '182469' }],
      year: 2024,
      releaseDate: '2024-10-20',
      route: 18,
      optional: true,
      adaptation: true,
      mc: 89,
      note: 'TV special adapting a spin-off novel story: ordinary people on Sabaody as the Straw Hats reunite after the time skip'
    }
  ],
  characters: [
    {
      id: 'op-luffy',
      name: 'Monkey D. Luffy',
      role: 'Captain of the Straw Hat Pirates',
      portraitUrl: `${AL}/character/large/b40-MNypXsxSRb1R.png`,
      appearsIn: ['op-manga', 'op-tv', ...FILMS_ALL, 'op-live-action', 'op-fan-letter'],
      blurb: 'Ate a Devil Fruit that made his body rubber, and wants nothing more complicated than the freedom of being King of the Pirates.'
    },
    {
      id: 'op-zoro',
      name: 'Roronoa Zoro',
      role: 'Swordsman',
      portraitUrl: `${AL}/character/large/b62-S7oAeA9WInjV.png`,
      appearsIn: ['op-manga', 'op-tv', ...FILMS_ALL, 'op-live-action'],
      blurb: 'A three-sword fighter who swore to become the world’s greatest swordsman, and the crew’s first member.'
    },
    {
      id: 'op-nami',
      name: 'Nami',
      role: 'Navigator',
      portraitUrl: `${AL}/character/large/b723-vp5hPptgnNEC.png`,
      appearsIn: ['op-manga', 'op-tv', ...FILMS_ALL, 'op-live-action'],
      blurb: 'A thief who loves money and maps, who wants to chart the whole world and first joined the crew to rob it.'
    },
    {
      id: 'op-usopp',
      name: 'Usopp',
      role: 'Sniper',
      portraitUrl: `${AL}/character/large/b724-GFGgI9AJQkfy.jpg`,
      appearsIn: ['op-manga', 'op-tv', ...FILMS_ALL, 'op-live-action'],
      blurb: 'A compulsive liar and coward from a small village who dreams of being a brave warrior of the sea, and slowly becomes one.'
    },
    {
      id: 'op-sanji',
      name: 'Sanji',
      role: 'Cook',
      portraitUrl: `${AL}/character/large/b305-6lisPmHtCnLT.png`,
      appearsIn: ['op-manga', 'op-tv', ...FILMS_FROM_2001, 'op-live-action'],
      blurb: 'A chef who fights only with his legs to protect his hands, will feed anyone who is hungry, and cannot refuse a woman anything.'
    },
    {
      id: 'op-chopper',
      name: 'Tony Tony Chopper',
      role: 'Doctor',
      portraitUrl: `${AL}/character/large/b309-H64NhbJ2ywIQ.jpg`,
      appearsIn: ['op-manga', 'op-tv', ...FILMS_FROM_2002, 'op-live-action'],
      blurb: 'A reindeer who ate the Human-Human Fruit, rejected by both herds and humans until the crew asked him to be their doctor.'
    },
    {
      id: 'op-shanks',
      name: 'Shanks',
      role: 'Captain of the Red Hair Pirates',
      portraitUrl: `${AL}/character/large/b727-wUJx7M1z5xON.png`,
      appearsIn: ['op-manga', 'op-tv', 'op-film-red', 'op-live-action'],
      blurb: 'The pirate who gave Luffy his straw hat and lost an arm saving him, now one of the four great powers of the sea.'
    }
  ]
}
