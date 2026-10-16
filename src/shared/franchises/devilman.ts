// Devilman — Go Nagai's 1972 manga and what grew from it: the 1972 Toei TV
// anime, the 1987 and 1990 OVAs (The Birth and The Demon Bird), the 2000 OVA
// Amon: The Apocalypse of Devilman, the 2004 Japanese live-action film (TMDB)
// and Science SARU's 2018 Netflix series Devilman Crybaby.
// No chrono: every version retells Akira Fudo's story from the beginning (or
// from its own vantage point), so there is no shared timeline to rank them on.
// Excluded: Violence Jack and the other Nagai spin-offs, Devilman Lady and
// Neo Devilman (separate works with their own AniList records), Mazinger Z vs.
// Devilman, Cyborg 009 vs Devilman and the other manga and one-shot crossovers
// with their own AniList entries.
// Ids, dates and scores from AniList and TMDB (en-US; the film's date is its
// Japanese theatrical release), all checked 2026-10-14.

import type { FranchiseCfg } from './types'

const AL = 'https://s4.anilist.co/file/anilistcdn'

export const DEVILMAN: FranchiseCfg = {
  id: 'devilman',
  name: 'Devilman',
  short: 'Devilman',
  color: '#8a1c2b',
  heroUrl: `${AL}/media/manga/banner/31474-eSVkINsgBG53.jpg`,
  studio: 'Go Nagai / Toei Animation / Science SARU',
  tagline: 'A gentle boy fuses with a demon to fight demons, and learns what humans do once they know.',
  trivia: [
    {
      title: 'Two stories started in the same year',
      body: 'The manga began in Kodansha\'s Weekly Shonen Magazine in June 1972, and a Toei Animation TV series started a month later. They were produced in parallel but tell different stories: the TV series is a monster-of-the-week show, while the manga is a far darker work, which is why later adaptations return to the manga rather than the 1972 anime.'
    },
    {
      title: 'The OVAs that came back to the manga',
      body: 'Devilman: The Birth (1987) and Devilman: The Demon Bird (1990) were the first anime to follow the manga\'s tone rather than the TV series\'. Amon: The Apocalypse of Devilman followed in 2000, retelling the story from the demon Amon\'s side.'
    },
    {
      title: 'Crybaby and Yuasa',
      body: 'Devilman Crybaby, released on Netflix on January 5, 2018, was directed by Masaaki Yuasa at Science SARU and moved the story into the present day. It is the most recent adaptation on this page.'
    }
  ],
  entries: [
    {
      id: 'devilman-manga',
      title: 'Devilman',
      mediaType: 'manga',
      aliases: ['Debiruman'],
      externalIds: [{ source: 'anilist', id: '31474' }],
      year: 1972,
      releaseDate: '1972-06-11',
      mc: 80,
      note: 'Nagai\'s manga: Akira Fudo merges with the demon Amon and becomes Devilman to defend humanity'
    },
    {
      id: 'devilman-tv-1972',
      title: 'Devilman',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '2252' }],
      year: 1972,
      releaseDate: '1972-07-08',
      mc: 64,
      adaptation: true,
      note: 'Toei\'s TV series, a lighter monster-hunting story that departs sharply from the manga'
    },
    {
      id: 'devilman-birth',
      title: 'Devilman: The Birth',
      mediaType: 'anime',
      aliases: ['Devilman: Tanjou-hen'],
      externalIds: [{ source: 'anilist', id: '2354' }],
      year: 1987,
      releaseDate: '1987-11-01',
      mc: 71,
      adaptation: true,
      note: 'First OVA, adapting the manga\'s opening chapters'
    },
    {
      id: 'devilman-demon-bird',
      title: 'Devilman: The Demon Bird',
      mediaType: 'anime',
      aliases: ['Devilman: Sirene-hen', 'Devilman: Youchou Sirene-hen'],
      externalIds: [{ source: 'anilist', id: '2355' }],
      year: 1990,
      releaseDate: '1990-02-25',
      mc: 70,
      adaptation: true,
      note: 'Second OVA, built around the demon Sirene and the Makimura family'
    },
    {
      id: 'devilman-amon',
      title: 'Amon: The Apocalypse of Devilman',
      mediaType: 'anime',
      aliases: ['AMON: Devilman Mokushiroku'],
      externalIds: [{ source: 'anilist', id: '2356' }],
      year: 2000,
      releaseDate: '2000-05-24',
      mc: 62,
      adaptation: true,
      note: 'OVA centred on Amon, the demon whose body Akira takes'
    },
    {
      id: 'devilman-film-2004',
      title: 'Devilman',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '36166' }],
      year: 2004,
      releaseDate: '2004-10-09',
      mc: 61,
      adaptation: true,
      note: 'Japanese live-action film of the manga'
    },
    {
      id: 'devilman-crybaby',
      title: 'Devilman Crybaby',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '98460' }],
      year: 2018,
      releaseDate: '2018-01-05',
      mc: 76,
      adaptation: true,
      note: 'Masaaki Yuasa\'s ten-episode Netflix series, set in the present day'
    }
  ],
  characters: [
    {
      id: 'devilman-akira',
      name: 'Akira Fudo',
      role: 'Devilman',
      portraitUrl: `${AL}/character/large/b2456-rTjIXMLPHTu2.jpg`,
      appearsIn: [
        'devilman-manga',
        'devilman-tv-1972',
        'devilman-birth',
        'devilman-demon-bird',
        'devilman-amon',
        'devilman-film-2004',
        'devilman-crybaby'
      ],
      blurb: 'A timid boy who cries for other people, fused with the demon Amon at Ryo’s sabbath and left with a demon’s body and his own human heart.'
    },
    {
      id: 'devilman-ryo',
      name: 'Ryo Asuka',
      role: 'Akira\'s friend',
      portraitUrl: `${AL}/character/large/b4092-63yxC7cCrWke.png`,
      appearsIn: [
        'devilman-manga',
        'devilman-birth',
        'devilman-demon-bird',
        'devilman-amon',
        'devilman-film-2004',
        'devilman-crybaby'
      ],
      blurb: 'Akira’s brilliant, cold best friend, who knows the demons are waking and makes Akira into Devilman to fight them — and who is, the story finally reveals, Satan himself.'
    },
    {
      id: 'devilman-miki',
      name: 'Miki Makimura',
      role: 'Akira\'s classmate',
      portraitUrl: `${AL}/character/large/b7968-te8U6niaAoKk.png`,
      appearsIn: [
        'devilman-manga',
        'devilman-tv-1972',
        'devilman-birth',
        'devilman-demon-bird',
        'devilman-amon',
        'devilman-film-2004',
        'devilman-crybaby'
      ],
      blurb: 'The girl whose family takes Akira in. Brave, ordinary and loyal to him when the world turns on anyone suspected of being a demon: the human heart Akira is fighting to keep.'
    },
    {
      id: 'devilman-amon',
      name: 'Amon',
      role: 'The demon',
      portraitUrl: `${AL}/character/large/b7972-ro7f4Rjp7Bll.png`,
      appearsIn: ['devilman-manga', 'devilman-amon', 'devilman-crybaby'],
      blurb: 'The Lord of War, one of the strongest demons, whose body Akira takes over at the sabbath. Akira’s will wins; Amon never quite stops pushing from inside.'
    },
    {
      id: 'devilman-sirene',
      name: 'Sirene',
      role: 'Demon bird',
      portraitUrl: `${AL}/character/large/b18590-uSU2YjJWxWgJ.jpg`,
      appearsIn: ['devilman-manga', 'devilman-tv-1972', 'devilman-demon-bird', 'devilman-crybaby'],
      blurb: 'A winged demon who hunts Akira for betraying her kind and fights on past the point her body can take — the series’ most famous battle, and the heart of The Demon Bird.'
    },
    {
      id: 'devilman-tare',
      name: 'Tare Makimura',
      role: 'Miki\'s brother',
      portraitUrl: `${AL}/character/large/b7967-EytwuXK0gbru.jpg`,
      appearsIn: [
        'devilman-manga',
        'devilman-tv-1972',
        'devilman-demon-bird',
        'devilman-amon',
        'devilman-crybaby'
      ],
      blurb: 'Miki’s little brother, who idolises Akira and pulls him into his own small adventures — one of the ordinary lives the story makes you care about before the end comes.'
    }
  ]
}
