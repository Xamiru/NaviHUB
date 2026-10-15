// Fullmetal Alchemist — Hiromu Arakawa's manga and its adaptations: Bones'
// 2003 series (which outran the manga and wrote its own ending) with its
// sequel film Conqueror of Shamballa and premium OVAs, Bones' 2009
// Brotherhood (the faithful adaptation) with its OVAs and the side-story film
// The Sacred Star of Milos, and Fumihiko Sori's live-action trilogy. NO
// chrono: the 2003 series and Shamballa form a separate continuity from the
// manga and Brotherhood, and the live-action films are a third; each note
// names its continuity instead. Route starts with Brotherhood, then the 2003
// series and its film as a second, different telling; OVAs, Milos and the
// live-action films are optional detours, and the manga sits outside the
// route as the source. Excluded: the light novels, one-shots, art and
// anniversary books, and the games.
// Anime/manga ids, dates and scores from AniList; live-action ids, earliest
// release dates and user scores from TMDB (en-US). Art from AniList,
// curl-verified 2026-10-14.

import type { FranchiseCfg } from './types'

const AL = 'https://s4.anilist.co/file/anilistcdn'

export const FULLMETAL_ALCHEMIST: FranchiseCfg = {
  id: 'fullmetal-alchemist',
  name: 'Fullmetal Alchemist',
  short: 'Fullmetal Alchemist',
  color: '#b0302a',
  heroUrl: `${AL}/media/anime/banner/5114-q0V5URebphSG.jpg`,
  studio: 'Square Enix / Bones',
  tagline: 'Two brothers broke alchemy’s one rule to bring their mother back, and lost an arm, a leg and a body paying for it.',
  trivia: [
    {
      title: 'One manga, two anime',
      body: 'Bones’ first adaptation began in 2003, when Arakawa’s manga was still in its early volumes. The series soon caught up with its source and departed from it, finishing with an original ending and a sequel film, Conqueror of Shamballa (2005). Once the manga was nearing its own conclusion, Bones adapted it again from the start as Fullmetal Alchemist: Brotherhood (2009), this time following it to the final chapter.'
    },
    {
      title: 'Equivalent exchange',
      body: 'The series is built on alchemy’s law of equivalent exchange: to gain something, something of equal value must be lost. The Elric brothers’ attempt to resurrect their mother breaks the taboo on human transmutation, and the price they pay, Edward’s limbs and Alphonse’s entire body, drives everything that follows.'
    },
    {
      title: 'Amestris in Italy',
      body: 'Fumihiko Sori’s 2017 live-action film shot much of its European-styled city of Amestris on location in Italy, including the Tuscan town of Volterra. Two sequels released in 2022, The Revenge of Scar and The Final Alchemy, carried the live-action version through to the story’s end.'
    }
  ],
  entries: [
    {
      id: 'fma-manga',
      title: 'Fullmetal Alchemist',
      mediaType: 'manga',
      aliases: ['Hagane no Renkinjutsushi'],
      externalIds: [{ source: 'anilist', id: '30025' }],
      year: 2001,
      releaseDate: '2001-07-12',
      mc: 89,
      note: 'Arakawa’s manga, 2001-2010: the Elric brothers search for the Philosopher’s Stone to restore their bodies'
    },
    {
      id: 'fma-2003',
      title: 'Fullmetal Alchemist',
      mediaType: 'anime',
      aliases: ['Hagane no Renkinjutsushi'],
      externalIds: [{ source: 'anilist', id: '121' }],
      year: 2003,
      releaseDate: '2003-10-04',
      route: 4,
      adaptation: true,
      mc: 79,
      note: '2003 continuity: follows the early manga, then diverges into its own story and ending'
    },
    {
      id: 'fma-shamballa',
      title: 'Fullmetal Alchemist: The Movie - Conqueror of Shamballa',
      mediaType: 'anime',
      aliases: ['Hagane no Renkinjutsushi: Shamballa wo Yuku Mono'],
      externalIds: [{ source: 'anilist', id: '430' }],
      year: 2005,
      releaseDate: '2005-07-23',
      route: 5,
      mc: 71,
      note: '2003 continuity: the sequel film that concludes the 2003 series'
    },
    {
      id: 'fma-premium-ova',
      title: 'Fullmetal Alchemist: Premium OVA Collection',
      mediaType: 'anime',
      aliases: ['Hagane no Renkinjutsushi: PREMIUM COLLECTION'],
      externalIds: [{ source: 'anilist', id: '908' }],
      year: 2006,
      releaseDate: '2006-03-29',
      route: 6,
      optional: true,
      mc: 68,
      note: '2003 continuity: short extras released with the series’ premium collection'
    },
    {
      id: 'fma-brotherhood',
      title: 'Fullmetal Alchemist: Brotherhood',
      mediaType: 'anime',
      aliases: ['Hagane no Renkinjutsushi: FULLMETAL ALCHEMIST'],
      externalIds: [{ source: 'anilist', id: '5114' }],
      year: 2009,
      releaseDate: '2009-04-05',
      route: 1,
      adaptation: true,
      mc: 90,
      note: 'Manga continuity: the complete, faithful adaptation of the manga to its ending'
    },
    {
      id: 'fma-brotherhood-ova',
      title: 'Fullmetal Alchemist: Brotherhood OVA Collection',
      mediaType: 'anime',
      aliases: ['Hagane no Renkinjutsushi: FULLMETAL ALCHEMIST Mihousou Episode'],
      externalIds: [{ source: 'anilist', id: '6421' }],
      year: 2009,
      releaseDate: '2009-08-26',
      route: 2,
      optional: true,
      mc: 77,
      note: 'Manga continuity: four side episodes released with Brotherhood’s home video'
    },
    {
      id: 'fma-milos',
      title: 'Fullmetal Alchemist: The Sacred Star of Milos',
      mediaType: 'anime',
      aliases: ['Hagane no Renkinjutsushi: Milos no Seinaru Hoshi'],
      externalIds: [{ source: 'anilist', id: '9135' }],
      year: 2011,
      releaseDate: '2011-07-02',
      route: 3,
      optional: true,
      mc: 69,
      note: 'Manga continuity: an original side-story film set during the brothers’ journey'
    },
    {
      id: 'fma-live-action',
      title: 'Fullmetal Alchemist',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '426285' }],
      year: 2017,
      releaseDate: '2017-12-01',
      route: 7,
      optional: true,
      adaptation: true,
      mc: 54,
      note: 'Live-action continuity: Fumihiko Sori’s film of the manga’s opening'
    },
    {
      id: 'fma-revenge-of-scar',
      title: 'Fullmetal Alchemist: The Revenge of Scar',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '960700' }],
      year: 2022,
      releaseDate: '2022-05-20',
      route: 8,
      optional: true,
      adaptation: true,
      mc: 65,
      note: 'Live-action continuity: the first of the two concluding films'
    },
    {
      id: 'fma-final-alchemy',
      title: 'Fullmetal Alchemist: The Final Alchemy',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '960704' }],
      year: 2022,
      releaseDate: '2022-06-24',
      route: 9,
      optional: true,
      adaptation: true,
      mc: 63,
      note: 'Live-action continuity: the conclusion, released a month after The Revenge of Scar'
    }
  ],
  characters: [
    {
      id: 'fma-edward',
      name: 'Edward Elric',
      role: 'The Fullmetal Alchemist',
      portraitUrl: `${AL}/character/large/b11-TA5Nuk7EDUZG.jpg`,
      appearsIn: ['fma-manga', 'fma-2003', 'fma-shamballa', 'fma-premium-ova', 'fma-brotherhood', 'fma-brotherhood-ova', 'fma-milos', 'fma-live-action', 'fma-revenge-of-scar', 'fma-final-alchemy'],
      blurb: 'The youngest State Alchemist in history, with an automail arm and leg, who joined the military only to find a way to restore his brother.'
    },
    {
      id: 'fma-alphonse',
      name: 'Alphonse Elric',
      role: 'Edward’s younger brother',
      portraitUrl: `${AL}/character/large/b12-tCKu8yK5kFL5.jpg`,
      appearsIn: ['fma-manga', 'fma-2003', 'fma-shamballa', 'fma-premium-ova', 'fma-brotherhood', 'fma-brotherhood-ova', 'fma-milos', 'fma-live-action', 'fma-revenge-of-scar', 'fma-final-alchemy'],
      blurb: 'His soul bound to a suit of armour since the failed transmutation, he is the gentler of the two brothers and can no longer eat, sleep or feel.'
    },
    {
      id: 'fma-winry',
      name: 'Winry Rockbell',
      role: 'Childhood friend and automail mechanic',
      portraitUrl: `${AL}/character/large/63-xloedtYxiJ2E.jpg`,
      appearsIn: ['fma-manga', 'fma-2003', 'fma-shamballa', 'fma-brotherhood', 'fma-milos', 'fma-live-action', 'fma-revenge-of-scar', 'fma-final-alchemy'],
      blurb: 'Builds and repairs Edward’s automail, and keeps the brothers tied to the home they burned down when they set out.'
    },
    {
      id: 'fma-mustang',
      name: 'Roy Mustang',
      role: 'The Flame Alchemist',
      portraitUrl: `${AL}/character/large/b68-moBLY2WO2am3.png`,
      appearsIn: ['fma-manga', 'fma-2003', 'fma-shamballa', 'fma-brotherhood', 'fma-milos', 'fma-live-action', 'fma-revenge-of-scar', 'fma-final-alchemy'],
      blurb: 'An ambitious colonel who recruited Edward, haunted by his part in the Ishval war and aiming for the top of the military to change it.'
    },
    {
      id: 'fma-hawkeye',
      name: 'Riza Hawkeye',
      role: 'Mustang’s adjutant',
      portraitUrl: `${AL}/character/large/b70-k4bCgDspyOdI.png`,
      appearsIn: ['fma-manga', 'fma-2003', 'fma-brotherhood', 'fma-live-action', 'fma-revenge-of-scar', 'fma-final-alchemy'],
      blurb: 'A sharpshooter who has sworn to guard Mustang’s back, and to shoot him herself if he ever loses his way.'
    },
    {
      id: 'fma-hughes',
      name: 'Maes Hughes',
      role: 'Mustang’s friend in Central',
      portraitUrl: `${AL}/character/large/b69-MRetSG8Qevvu.png`,
      appearsIn: ['fma-manga', 'fma-2003', 'fma-brotherhood', 'fma-live-action'],
      blurb: 'An investigations officer devoted to his family and his friends, who gets closer than anyone to the truth behind the military.'
    },
    {
      id: 'fma-scar',
      name: 'Scar',
      role: 'Ishvalan avenger',
      portraitUrl: `${AL}/character/large/b66-bLbGWXrmDqfV.png`,
      appearsIn: ['fma-manga', 'fma-2003', 'fma-brotherhood', 'fma-revenge-of-scar', 'fma-final-alchemy'],
      blurb: 'A survivor of the Ishval extermination who hunts State Alchemists with an arm that can destroy anything it touches.'
    }
  ]
}
