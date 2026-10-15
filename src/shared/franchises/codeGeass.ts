// Code Geass — Sunrise's anime and its continuations: the original manga
// adaptation, the two TV seasons, the five-part Akito the Exiled OVA set in
// Europe between them, the 2017-2018 recap film trilogy, Lelouch of the
// Re;surrection (a sequel to the film trilogy's continuity, not the TV
// series') and Rozé of the Recapture. Chrono follows in-universe time: the
// first season, its manga and the first two films share slot 1; Akito sits
// between the seasons at 2; R2 and the third film share 3; Re;surrection and
// Rozé follow. Route is the two TV seasons, then the film trilogy's third part
// as the bridge into Re;surrection, with Akito, the first two films and Rozé
// as optional detours. Excluded: picture-drama specials, the gag and parody
// manga (Barcode Geass, Code Black, Kateikyoushi no Lelouch-san), the Oz the
// Reflection and Nightmare of Nunnally side manga, and the light novels.
// Ids, dates and scores from AniList; art from AniList, curl-verified
// 2026-10-14.

import type { FranchiseCfg } from './types'

const AL = 'https://s4.anilist.co/file/anilistcdn'

export const CODE_GEASS: FranchiseCfg = {
  id: 'code-geass',
  name: 'Code Geass',
  short: 'Code Geass',
  color: '#7a2e8c',
  heroUrl: `${AL}/media/anime/banner/1575.jpg`,
  studio: 'Sunrise',
  tagline: 'An exiled prince is handed the power of absolute obedience and uses it to start a war against the empire that discarded him.',
  trivia: [
    {
      title: 'A mecha show drawn by CLAMP',
      body: 'Sunrise built Code Geass around Goro Taniguchi as director and Ichiro Okouchi as writer, but recruited the manga collective CLAMP for the original character designs. The result pairs a Sunrise robot war with the long-limbed, fashion-plate look of CLAMP’s own manga, a combination that made the show unusual in both camps when it premiered in 2006.'
    },
    {
      title: 'The films changed the past to allow a future',
      body: 'The 2017-2018 film trilogy re-edits both TV seasons with new footage, but it is not a straight recap: it changes events, most visibly letting Shirley survive. Lelouch of the Re;surrection (2019) is a sequel to that film continuity rather than to the TV series, which is why the route here runs through the trilogy’s final part before it.'
    },
    {
      title: 'A war on another continent',
      body: 'Akito the Exiled moves the setting from Japan to Europe and the period to the year between the two TV seasons. It was released as five theatrical OVA parts between 2012 and 2016, following a unit of Japanese pilots fighting for the European Union against Britannia, and crosses paths with the main cast only briefly.'
    }
  ],
  entries: [
    {
      id: 'geass-manga',
      title: 'Code Geass: Lelouch of the Rebellion',
      mediaType: 'manga',
      aliases: ['Code Geass: Hangyaku no Lelouch'],
      externalIds: [{ source: 'anilist', id: '31528' }],
      year: 2006,
      releaseDate: '2006-08-24',
      chrono: 1,
      adaptation: true,
      mc: 74,
      note: 'Manga adaptation drawn alongside the broadcast, diverging from the anime in places'
    },
    {
      id: 'geass-r1',
      title: 'Code Geass: Lelouch of the Rebellion',
      mediaType: 'anime',
      aliases: ['Code Geass: Hangyaku no Lelouch'],
      externalIds: [{ source: 'anilist', id: '1575' }],
      year: 2006,
      releaseDate: '2006-10-06',
      chrono: 1,
      route: 1,
      mc: 85,
      note: 'Lelouch receives the Geass from C.C. and becomes Zero, masked leader of a Japanese resistance'
    },
    {
      id: 'geass-r2',
      title: 'Code Geass: Lelouch of the Rebellion R2',
      mediaType: 'anime',
      aliases: ['Code Geass: Hangyaku no Lelouch R2'],
      externalIds: [{ source: 'anilist', id: '2904' }],
      year: 2008,
      releaseDate: '2008-04-06',
      chrono: 3,
      route: 3,
      mc: 87,
      note: 'A year later, with his memories sealed, Lelouch is drawn back into the war and finishes it'
    },
    {
      id: 'geass-akito-1',
      title: 'Code Geass: Akito the Exiled - The Wyvern Arrives',
      mediaType: 'anime',
      aliases: ['Code Geass: Boukoku no Akito 1 - Yokuryuu wa Maiorita'],
      externalIds: [{ source: 'anilist', id: '8888' }],
      year: 2012,
      releaseDate: '2012-08-04',
      chrono: 2,
      route: 2,
      optional: true,
      spinOff: true,
      mc: 70,
      note: 'Akito the Exiled part 1: a unit of Japanese pilots fights for the European Union against Britannia'
    },
    {
      id: 'geass-akito-2',
      title: 'Code Geass: Akito the Exiled - The Wyvern Divided',
      mediaType: 'anime',
      aliases: ['Code Geass: Boukoku no Akito 2 - Hikisakareshi Yokuryuu'],
      externalIds: [{ source: 'anilist', id: '15197' }],
      year: 2013,
      releaseDate: '2013-09-14',
      chrono: 2,
      spinOff: true,
      mc: 71,
      note: 'Akito the Exiled part 2'
    },
    {
      id: 'geass-akito-3',
      title: 'Code Geass: Akito the Exiled - The Brightness Falls',
      mediaType: 'anime',
      aliases: ['Code Geass: Boukoku no Akito 3 - Kagayakumono Ten Yori Otsu'],
      externalIds: [{ source: 'anilist', id: '15199' }],
      year: 2015,
      releaseDate: '2015-05-02',
      chrono: 2,
      spinOff: true,
      mc: 69,
      note: 'Akito the Exiled part 3'
    },
    {
      id: 'geass-akito-4',
      title: 'Code Geass: Akito the Exiled - Memories of Hatred',
      mediaType: 'anime',
      aliases: ['Code Geass: Boukoku no Akito 4 - Nikushimi no Kioku Kara'],
      externalIds: [{ source: 'anilist', id: '15201' }],
      year: 2015,
      releaseDate: '2015-07-04',
      chrono: 2,
      spinOff: true,
      mc: 69,
      note: 'Akito the Exiled part 4'
    },
    {
      id: 'geass-akito-5',
      title: 'Code Geass: Akito the Exiled - To Beloved Ones',
      mediaType: 'anime',
      aliases: ['Code Geass: Boukoku no Akito Saishuushou - Itoshiki Mono-tachi e'],
      externalIds: [{ source: 'anilist', id: '21178' }],
      year: 2016,
      releaseDate: '2016-02-06',
      chrono: 2,
      spinOff: true,
      mc: 68,
      note: 'Akito the Exiled final part'
    },
    {
      id: 'geass-film-1',
      title: 'Code Geass: Lelouch of the Rebellion I - Initiation',
      mediaType: 'anime',
      aliases: ['Code Geass: Hangyaku no Lelouch I - Koudou'],
      externalIds: [{ source: 'anilist', id: '101811' }],
      year: 2017,
      releaseDate: '2017-10-21',
      chrono: 1,
      route: 4,
      optional: true,
      mc: 76,
      note: 'Film trilogy part 1: the first half of season one, re-edited with new footage'
    },
    {
      id: 'geass-film-2',
      title: 'Code Geass: Lelouch of the Rebellion II - Transgression',
      mediaType: 'anime',
      aliases: ['Code Geass: Hangyaku no Lelouch II - Handou'],
      externalIds: [{ source: 'anilist', id: '101812' }],
      year: 2018,
      releaseDate: '2018-02-10',
      chrono: 1,
      route: 5,
      optional: true,
      mc: 74,
      note: 'Film trilogy part 2: the rest of season one'
    },
    {
      id: 'geass-film-3',
      title: 'Code Geass: Lelouch of the Rebellion III - Glorification',
      mediaType: 'anime',
      aliases: ['Code Geass: Hangyaku no Lelouch III - Oudou'],
      externalIds: [{ source: 'anilist', id: '101813' }],
      year: 2018,
      releaseDate: '2018-05-26',
      chrono: 3,
      route: 6,
      mc: 78,
      note: 'Film trilogy part 3: R2 condensed, with the changes Re;surrection builds on'
    },
    {
      id: 'geass-resurrection',
      title: 'Code Geass: Lelouch of the Re;surrection',
      mediaType: 'anime',
      aliases: ['Code Geass: Fukkatsu no Lelouch'],
      externalIds: [{ source: 'anilist', id: '97880' }],
      year: 2019,
      releaseDate: '2019-02-09',
      chrono: 4,
      route: 7,
      mc: 77,
      note: 'Sequel film to the trilogy’s continuity: C.C. and Suzaku look for a way to bring Lelouch back'
    },
    {
      id: 'geass-roze',
      title: 'Code Geass: Rozé of the Recapture',
      mediaType: 'anime',
      aliases: ['Code Geass: Dakkan no Rozé'],
      externalIds: [{ source: 'anilist', id: '126830' }],
      year: 2024,
      releaseDate: '2024-06-21',
      chrono: 5,
      route: 8,
      optional: true,
      spinOff: true,
      mc: 64,
      note: 'A new cast in an occupied Hokkaido, with a Geass user fighting a new Britannian regime'
    }
  ],
  characters: [
    {
      id: 'geass-lelouch',
      name: 'Lelouch Lamperouge',
      role: 'Protagonist, Zero',
      portraitUrl: `${AL}/character/large/b417-gVLmIJu9phcK.png`,
      appearsIn: ['geass-manga', 'geass-r1', 'geass-r2', 'geass-film-1', 'geass-film-2', 'geass-film-3', 'geass-resurrection'],
      blurb: 'A disowned Britannian prince hiding as a schoolboy in occupied Japan, who takes the Geass and the mask of Zero to tear down his father’s empire.'
    },
    {
      id: 'geass-cc',
      name: 'C.C.',
      role: 'The witch who grants the Geass',
      portraitUrl: `${AL}/character/large/b1111-UhmlFtRFrnWa.png`,
      appearsIn: ['geass-manga', 'geass-r1', 'geass-r2', 'geass-film-1', 'geass-film-2', 'geass-film-3', 'geass-resurrection'],
      blurb: 'An immortal who gives Lelouch his power in exchange for a promise she will not explain, and stays at his side as an accomplice rather than an ally.'
    },
    {
      id: 'geass-suzaku',
      name: 'Suzaku Kururugi',
      role: 'Lelouch’s childhood friend',
      portraitUrl: `${AL}/character/large/b559-KRvTdc6zdCuU.jpg`,
      appearsIn: ['geass-manga', 'geass-r1', 'geass-r2', 'geass-film-1', 'geass-film-2', 'geass-film-3', 'geass-resurrection'],
      blurb: 'The son of Japan’s last prime minister, who tries to change Britannia from inside its army and ends up the pilot most often standing against Zero.'
    },
    {
      id: 'geass-kallen',
      name: 'Kallen Stadtfeld',
      role: 'Black Knights ace',
      portraitUrl: `${AL}/character/large/b558-8tSMZ4a0LWrn.jpg`,
      appearsIn: ['geass-manga', 'geass-r1', 'geass-r2', 'geass-film-1', 'geass-film-2', 'geass-film-3', 'geass-resurrection'],
      blurb: 'Half-Japanese and posing as a sickly Britannian student, she is the resistance’s best pilot and Zero’s most loyal follower.'
    },
    {
      id: 'geass-nunnally',
      name: 'Nunnally Lamperouge',
      role: 'Lelouch’s sister',
      portraitUrl: `${AL}/character/large/b1110-TSlN2WkhDJ1T.png`,
      appearsIn: ['geass-manga', 'geass-r1', 'geass-r2', 'geass-film-1', 'geass-film-2', 'geass-film-3', 'geass-resurrection'],
      blurb: 'Blind and unable to walk since their mother’s murder, she is the reason Lelouch gives for everything he does.'
    },
    {
      id: 'geass-schneizel',
      name: 'Schneizel el Britannia',
      role: 'Second Prince of Britannia',
      portraitUrl: `${AL}/character/large/b1710-GA8qDtSsY4jN.png`,
      appearsIn: ['geass-r1', 'geass-r2', 'geass-film-2', 'geass-film-3'],
      blurb: 'The empire’s smiling prime minister and the one opponent Lelouch never beat at chess.'
    },
    {
      id: 'geass-charles',
      name: 'Charles zi Britannia',
      role: 'The 98th Emperor of Britannia',
      portraitUrl: `${AL}/character/large/b5610-TuH7RZiCqQBd.png`,
      appearsIn: ['geass-r1', 'geass-r2', 'geass-film-1', 'geass-film-2', 'geass-film-3'],
      blurb: 'Lelouch’s father, who preaches that inequality is the natural order while pursuing a project that has nothing to do with the empire he rules.'
    }
  ]
}
