// Attack on Titan — Hajime Isayama's manga and its MAPPA/Wit anime adaptation,
// the Levi prequel No Regrets in both its manga and anime OVA forms, the
// Lost Girls side-story OVA, the 2024 compilation film The Last Attack, and
// the 2015 Japanese live-action duology. Chrono follows in-universe time: No
// Regrets (Levi's past) sits before everything else at slot 1; the manga,
// Season 1, its side-chapter OVA, Lost Girls and both live-action films share
// slot 2 as tellings of the story's opening stretch; Seasons 2-3 Part 2 and
// the Final Season arcs each advance one slot in broadcast order; the Final
// Chapters' two specials share the story's last two slots, and The Last
// Attack (which compiles them with a new epilogue) shares the final slot
// with Special 2. Route is the anime in broadcast order, with the prequel/
// side OVAs and The Last Attack as optional detours and the manga and No
// Regrets manga left outside the route as source material. Excluded: the
// recap compilation films Crimson Bow and Arrow, Wings of Freedom and The
// Roar of Awakening (clip-shows of content already covered by the TV
// seasons), and the gag-short "Final Season Specials" chibi shorts.
// Ids and years from AniList; the 2015 live-action films' TMDB ids and dates
// confirmed by web search. Art from AniList/TMDB, curl-verified 2026-10-05.

import type { FranchiseCfg } from './types'

const AL = 'https://s4.anilist.co/file/anilistcdn'

export const ATTACK_ON_TITAN: FranchiseCfg = {
  id: 'attack-on-titan',
  name: 'Attack on Titan',
  short: 'Attack on Titan',
  color: '#4a5d3a',
  heroUrl: `${AL}/media/anime/banner/16498-8jpFCOcDmneX.jpg`,
  studio: 'Wit Studio / MAPPA',
  tagline: 'Humanity lives behind three walls because of what is outside them, until a Titan a hundred times the usual size kicks one down.',
  trivia: [
    {
      title: 'A mystery that keeps re-detonating',
      body: 'Isayama built the manga (2009-2021) around questions the story keeps re-answering at a bigger scale: what the Titans are, what is outside the walls, and eventually, by the Final Season, which side the readers have been rooting for all along. Few long-running series have turned their own premise over this hard partway through.'
    },
    {
      title: 'Levi’s past comes from a light novel first',
      body: 'No Regrets started as a 2013 light novel detailing Levi’s life as an underground thug before he joins the Scout Regiment, adapted the same year into a manga and the next year into a two-episode OVA — the usual order of a Japanese light-novel property, run in reverse of how most readers meet this franchise.'
    },
    {
      title: 'One finale, told three ways',
      body: 'The story’s ending was broadcast as two TV specials under "The Final Season: THE FINAL CHAPTERS" in 2023, then re-assembled into a single theatrical cut, Attack on Titan: THE LAST ATTACK, in November 2024 with a new epilogue scene — meaning the same ending exists as two different final releases, a year apart.'
    }
  ],
  entries: [
    {
      id: 'aot-manga',
      title: 'Attack on Titan',
      mediaType: 'manga',
      aliases: ['Shingeki no Kyojin'],
      externalIds: [{ source: 'anilist', id: '53390' }],
      year: 2009,
      releaseDate: '2009-09-09',
      chrono: 2,
      mc: 84,
      note: 'Isayama’s manga, 2009-2021: Eren Yeager joins the fight to reclaim humanity’s land from the Titans'
    },
    {
      id: 'aot-s1',
      title: 'Attack on Titan',
      mediaType: 'anime',
      aliases: ['Shingeki no Kyojin'],
      externalIds: [{ source: 'anilist', id: '16498' }],
      year: 2013,
      releaseDate: '2013-04-07',
      chrono: 2,
      route: 1,
      adaptation: true,
      mc: 85,
      note: 'The Colossal Titan breaches Wall Maria, and Eren, Mikasa and Armin enlist to fight back'
    },
    {
      id: 'aot-no-regrets-manga',
      title: 'Attack on Titan: No Regrets',
      mediaType: 'manga',
      aliases: ['Shingeki no Kyojin Gaiden: Kuinaki Sentaku'],
      externalIds: [{ source: 'anilist', id: '85199' }],
      year: 2013,
      releaseDate: '2013-09-28',
      chrono: 1,
      mc: 79,
      adaptation: true,
      note: 'Manga adaptation of the light novel: Levi’s life as a thug in the capital’s underground before he joins the Scouts'
    },
    {
      id: 'aot-ova',
      title: 'Attack on Titan OVA',
      mediaType: 'anime',
      aliases: ['Shingeki no Kyojin OVA'],
      externalIds: [{ source: 'anilist', id: '18397' }],
      year: 2013,
      releaseDate: '2013-12-09',
      chrono: 2,
      route: 2,
      optional: true,
      adaptation: true,
      mc: 77,
      note: 'Three side chapters bundled with the manga’s volume releases, set during the Season 1 era'
    },
    {
      id: 'aot-no-regrets-anime',
      title: 'Attack on Titan: No Regrets',
      mediaType: 'anime',
      aliases: ['Shingeki no Kyojin Gaiden: Kuinaki Sentaku'],
      externalIds: [{ source: 'anilist', id: '20811' }],
      year: 2014,
      releaseDate: '2014-12-09',
      chrono: 1,
      route: 3,
      optional: true,
      adaptation: true,
      mc: 83,
      note: 'Two-episode OVA adapting the No Regrets manga'
    },
    {
      id: 'aot-live-action-1',
      title: 'Attack on Titan',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '295830' }],
      year: 2015,
      releaseDate: '2015-08-01',
      chrono: 2,
      route: 12,
      optional: true,
      adaptation: true,
      remake: true,
      note: 'Japanese live-action retelling of the story’s opening: Wall Maria falls and Eren joins the fight'
    },
    {
      id: 'aot-live-action-2',
      title: 'Attack on Titan: End of the World',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '340382' }],
      year: 2015,
      releaseDate: '2015-09-19',
      chrono: 2,
      route: 13,
      optional: true,
      adaptation: true,
      remake: true,
      note: 'Concludes the live-action duology with its own, largely original ending'
    },
    {
      id: 'aot-s2',
      title: 'Attack on Titan Season 2',
      mediaType: 'anime',
      aliases: ['Shingeki no Kyojin Season 2'],
      externalIds: [{ source: 'anilist', id: '20958' }],
      year: 2017,
      releaseDate: '2017-04-01',
      chrono: 3,
      route: 4,
      adaptation: true,
      mc: 85,
      note: 'The Scouts return to Wall Maria and learn Titans can come from people they know'
    },
    {
      id: 'aot-lost-girls',
      title: 'Attack on Titan: Lost Girls',
      mediaType: 'anime',
      aliases: ['Shingeki no Kyojin: LOST GIRLS'],
      externalIds: [{ source: 'anilist', id: '99634' }],
      year: 2017,
      releaseDate: '2017-12-08',
      chrono: 2,
      route: 7,
      optional: true,
      adaptation: true,
      mc: 77,
      note: 'Side-story OVA adapting two light novels built around Mikasa and Annie'
    },
    {
      id: 'aot-s3',
      title: 'Attack on Titan Season 3',
      mediaType: 'anime',
      aliases: ['Shingeki no Kyojin Season 3'],
      externalIds: [{ source: 'anilist', id: '99147' }],
      year: 2018,
      releaseDate: '2018-07-23',
      chrono: 4,
      route: 5,
      adaptation: true,
      mc: 86,
      note: 'A palace coup over who controls Eren pulls the Scouts into the capital’s own politics'
    },
    {
      id: 'aot-s3p2',
      title: 'Attack on Titan Season 3 Part 2',
      mediaType: 'anime',
      aliases: ['Shingeki no Kyojin Season 3 Part 2'],
      externalIds: [{ source: 'anilist', id: '104578' }],
      year: 2019,
      releaseDate: '2019-04-29',
      chrono: 5,
      route: 6,
      adaptation: true,
      mc: 89,
      note: 'The Scouts finally reach the basement under Eren’s old house, and the walls’ secret comes out'
    },
    {
      id: 'aot-final-season',
      title: 'Attack on Titan Final Season',
      mediaType: 'anime',
      aliases: ['Shingeki no Kyojin: The Final Season'],
      externalIds: [{ source: 'anilist', id: '110277' }],
      year: 2020,
      releaseDate: '2020-12-07',
      chrono: 6,
      route: 8,
      adaptation: true,
      mc: 87,
      note: 'The story leaves Paradis for the first time, told from across the sea in Marley'
    },
    {
      id: 'aot-final-season-p2',
      title: 'Attack on Titan Final Season Part 2',
      mediaType: 'anime',
      aliases: ['Shingeki no Kyojin: The Final Season Part 2'],
      externalIds: [{ source: 'anilist', id: '131681' }],
      year: 2022,
      releaseDate: '2022-01-10',
      chrono: 7,
      route: 9,
      adaptation: true,
      mc: 86,
      note: 'Eren’s plan becomes impossible to ignore, and his former friends have to decide what to do about it'
    },
    {
      id: 'aot-final-chapters-1',
      title: 'Attack on Titan Final Season THE FINAL CHAPTERS Special 1',
      mediaType: 'anime',
      aliases: ['Shingeki no Kyojin: The Final Season - Kanketsu-hen Zenpen'],
      externalIds: [{ source: 'anilist', id: '146984' }],
      year: 2023,
      releaseDate: '2023-03-04',
      chrono: 8,
      route: 10,
      adaptation: true,
      mc: 87,
      note: 'The Rumbling begins, and the fight moves to stopping Eren before it reaches the rest of the world'
    },
    {
      id: 'aot-final-chapters-2',
      title: 'Attack on Titan Final Season THE FINAL CHAPTERS Special 2',
      mediaType: 'anime',
      aliases: ['Shingeki no Kyojin: The Final Season - Kanketsu-hen Kouhen'],
      externalIds: [{ source: 'anilist', id: '162314' }],
      year: 2023,
      releaseDate: '2023-11-05',
      chrono: 9,
      route: 11,
      adaptation: true,
      mc: 87,
      note: 'The series finale: what it costs to stop Eren, and what is left of Paradis afterward'
    },
    {
      id: 'aot-last-attack',
      title: 'Attack on Titan: THE LAST ATTACK',
      mediaType: 'movie',
      aliases: ['Shingeki no Kyojin Kanketsu-hen: THE LAST ATTACK'],
      externalIds: [{ source: 'tmdb', id: '1333100' }],
      year: 2024,
      releaseDate: '2024-11-08',
      chrono: 9,
      route: 14,
      optional: true,
      adaptation: true,
      note: 'Theatrical re-edit of both FINAL CHAPTERS specials into one film, with a new epilogue scene'
    }
  ],
  characters: [
    {
      id: 'aot-eren',
      name: 'Eren Yeager',
      role: 'Protagonist',
      portraitUrl: `${AL}/character/large/b40882-dsj7IP943WFF.jpg`,
      appearsIn: ['aot-manga', 'aot-s1', 'aot-ova', 'aot-live-action-1', 'aot-live-action-2', 'aot-s2', 'aot-s3', 'aot-s3p2', 'aot-final-season', 'aot-final-season-p2', 'aot-final-chapters-1', 'aot-final-chapters-2', 'aot-last-attack'],
      blurb: 'Watches his mother killed by a Titan as a child and enlists to wipe them out, a goal that curdles into something far more extreme by the story’s end.'
    },
    {
      id: 'aot-mikasa',
      name: 'Mikasa Ackerman',
      role: 'Eren’s adoptive sister',
      portraitUrl: `${AL}/character/large/b40881-F3gr1PkreDvj.png`,
      appearsIn: ['aot-manga', 'aot-s1', 'aot-ova', 'aot-lost-girls', 'aot-live-action-1', 'aot-live-action-2', 'aot-s2', 'aot-s3', 'aot-s3p2', 'aot-final-season', 'aot-final-season-p2', 'aot-final-chapters-1', 'aot-final-chapters-2', 'aot-last-attack'],
      blurb: 'One of the Scouts’ most lethal soldiers, bound to Eren since he saved her as a child and unwilling to let that bond go, however it changes him.'
    },
    {
      id: 'aot-armin',
      name: 'Armin Arlert',
      role: 'Eren and Mikasa’s childhood friend',
      portraitUrl: `${AL}/character/large/b46494-g7xYYuBtYPnO.png`,
      appearsIn: ['aot-manga', 'aot-s1', 'aot-ova', 'aot-s2', 'aot-s3', 'aot-s3p2', 'aot-final-season', 'aot-final-season-p2', 'aot-final-chapters-1', 'aot-final-chapters-2', 'aot-last-attack'],
      blurb: 'Too weak to fight early on, he becomes the Scouts’ strategist, and later inherits power he never expected to carry.'
    },
    {
      id: 'aot-levi',
      name: 'Levi',
      role: 'Scout Regiment captain',
      portraitUrl: `${AL}/character/large/b45627-CR68RyZmddGG.png`,
      appearsIn: ['aot-no-regrets-manga', 'aot-no-regrets-anime', 'aot-manga', 'aot-s1', 'aot-s2', 'aot-s3', 'aot-s3p2', 'aot-final-season', 'aot-final-season-p2', 'aot-final-chapters-1', 'aot-final-chapters-2', 'aot-last-attack'],
      blurb: 'Humanity’s strongest soldier, recruited out of the capital’s underground, who measures every loss under his command without ever looking like it costs him anything.'
    },
    {
      id: 'aot-erwin',
      name: 'Erwin Smith',
      role: 'Scout Regiment commander',
      portraitUrl: `${AL}/character/large/b46496-Mu86MENd5wNB.png`,
      appearsIn: ['aot-no-regrets-manga', 'aot-no-regrets-anime', 'aot-manga', 'aot-s1', 'aot-s2', 'aot-s3', 'aot-s3p2'],
      blurb: 'Sends the Scouts to die for information more often than anyone is comfortable with, in service of a dream about the basement under Eren’s house.'
    },
    {
      id: 'aot-reiner',
      name: 'Reiner Braun',
      role: 'The Armored Titan',
      portraitUrl: `${AL}/character/large/b46484-P6A2GjNQn49F.png`,
      appearsIn: ['aot-manga', 'aot-s1', 'aot-s2', 'aot-s3', 'aot-s3p2', 'aot-final-season', 'aot-final-season-p2', 'aot-final-chapters-1', 'aot-final-chapters-2', 'aot-last-attack'],
      blurb: 'Enlisted alongside Eren as a spy, and spends the story being slowly crushed by what his mission has required of him.'
    },
    {
      id: 'aot-annie',
      name: 'Annie Leonhart',
      role: 'The Female Titan',
      portraitUrl: `${AL}/character/large/b46490-tan274Ifc1Jf.jpg`,
      appearsIn: ['aot-manga', 'aot-s1', 'aot-lost-girls', 'aot-s2', 'aot-s3', 'aot-s3p2', 'aot-final-chapters-2'],
      blurb: 'A cadet trained for one mission, who turns on the Scouts the moment it requires her to and then disappears from the story for a very long time.'
    }
  ]
}
