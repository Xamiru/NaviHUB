// JoJo's Bizarre Adventure — Hirohiko Araki's manga, told in numbered Parts
// that each follow a new Joestar descendant, and David Production's anime
// adaptation. AniList splits both media by Part/season rather than by the
// looser groupings fan wikis sometimes use: Stone Ocean is two AniList anime
// entries (not three), and Steel Ball Run's 2026 adaptation is two entries,
// 1st STAGE and a combined 2nd & 3rd STAGE. Chrono follows Part number; the
// 2012 TV series adapts both Part 1 (Phantom Blood) and Part 2 (Battle
// Tendency) in one continuous broadcast and is slotted at 1, matching its
// opening part. Route is the anime in broadcast order, with A.P.P.P.'s
// Stardust Crusaders OVAs as optional detours (the 2007 Phantom Blood film,
// never released on home video, sits outside the route), and the two still-unadapted
// manga parts (JoJolion, The JOJOLands) left outside the route as source
// material. Excluded: Araki's unrelated early manga and short stories,
// the light-novel-only side stories, and "Jojo Rabbit" (an unrelated TMDB
// movie that only shares a nickname).
// Ids and years from AniList, art from AniList, curl-verified 2026-10-05.

import type { FranchiseCfg } from './types'

const AL = 'https://s4.anilist.co/file/anilistcdn'

export const JOJO: FranchiseCfg = {
  id: 'jojo',
  name: 'JoJo’s Bizarre Adventure',
  short: 'JoJo',
  color: '#e0218a',
  heroUrl: `${AL}/media/anime/banner/14719-m7Hv2AxcNNjM.jpg`,
  studio: 'David Production',
  tagline: 'One bloodline, one enemy who refuses to stay dead, and a new way to fight him every generation.',
  trivia: [
    {
      title: 'A new hero and a new power system every Part',
      body: 'Araki restarts the cast almost entirely with each numbered Part, following a new Joestar descendant a generation or more after the last. Part 3 (Stardust Crusaders) introduces Stands, visible fighting spirits with their own powers and named after musicians and bands, which become the series’ signature and the model nearly every Part after it builds on.'
    },
    {
      title: 'A visual style that keeps escalating',
      body: 'Araki’s art, famous for its exaggerated anatomy, fashion-magazine poses and increasingly baroque Stand designs, keeps changing across four decades of the manga, and the anime’s directors have generally chosen to preserve Araki’s odder choices rather than smooth them out.'
    },
    {
      title: 'The adaptations before David Production',
      body: 'Studio A.P.P.P. animated JoJo first: an OVA of the second half of Stardust Crusaders (1993-1994), a prequel OVA for its first half (2000-2002), and a 2007 Phantom Blood film timed to the manga’s twentieth anniversary. The film ran in Japanese cinemas but was never released on home video, so David Production’s 2012 series became most viewers’ first JoJo anime.'
    }
  ],
  entries: [
    {
      id: 'jojo-manga-p1',
      title: 'JoJo’s Bizarre Adventure Part 1: Phantom Blood',
      mediaType: 'manga',
      aliases: ['JoJo no Kimyou na Bouken: Phantom Blood'],
      externalIds: [{ source: 'anilist', id: '31517' }],
      year: 1986,
      releaseDate: '1986-12-02',
      chrono: 1,
      mc: 70,
      note: 'Jonathan Joestar and his adopted brother Dio Brando, and the stone mask that starts everything'
    },
    {
      id: 'jojo-manga-p2',
      title: 'JoJo’s Bizarre Adventure Part 2: Battle Tendency',
      mediaType: 'manga',
      aliases: ['JoJo no Kimyou na Bouken: Sentou Chouryuu'],
      externalIds: [{ source: 'anilist', id: '31630' }],
      year: 1987,
      releaseDate: '1987-10-20',
      chrono: 2,
      mc: 78,
      note: 'Joseph Joestar faces the Pillar Men, ancient beings far older than the stone mask’s creators'
    },
    {
      id: 'jojo-manga-p3',
      title: 'JoJo’s Bizarre Adventure Part 3: Stardust Crusaders',
      mediaType: 'manga',
      aliases: ['JoJo no Kimyou na Bouken: Stardust Crusaders'],
      externalIds: [{ source: 'anilist', id: '30872' }],
      year: 1989,
      releaseDate: '1989-03-20',
      chrono: 3,
      mc: 78,
      note: 'Introduces Stands: Jotaro Kujo crosses from Japan to Egypt to save his mother from Dio'
    },
    {
      id: 'jojo-manga-p4',
      title: 'JoJo’s Bizarre Adventure Part 4: Diamond is Unbreakable',
      mediaType: 'manga',
      aliases: ['JoJo no Kimyou na Bouken: Diamond wa Kudakenai'],
      externalIds: [{ source: 'anilist', id: '33006' }],
      year: 1992,
      releaseDate: '1992-04-14',
      chrono: 4,
      mc: 84,
      note: 'Josuke Higashikata’s quiet town of Morioh turns out to hide a serial killer with a Stand of his own'
    },
    {
      id: 'jojo-ova-1993',
      title: 'JoJo’s Bizarre Adventure (1993 OVA)',
      mediaType: 'anime',
      aliases: ['JoJo no Kimyou na Bouken', 'JoJo\'s Bizarre Adventure'],
      externalIds: [{ source: 'anilist', id: '666' }],
      year: 1993,
      releaseDate: '1993-11-19',
      chrono: 3,
      route: 5,
      optional: true,
      adaptation: true,
      note: 'A.P.P.P.’s six-episode OVA of Stardust Crusaders’ second half, from Egypt to Dio'
    },
    {
      id: 'jojo-manga-p5',
      title: 'JoJo’s Bizarre Adventure Part 5: Golden Wind',
      mediaType: 'manga',
      aliases: ['JoJo no Kimyou na Bouken: Ougon no Kaze'],
      externalIds: [{ source: 'anilist', id: '33008' }],
      year: 1995,
      releaseDate: '1995-11-28',
      chrono: 5,
      mc: 80,
      note: 'Giorno Giovanna, Dio’s son, joins the mafia gang Passione hoping to reform it from the top down'
    },
    {
      id: 'jojo-manga-p6',
      title: 'JoJo’s Bizarre Adventure Part 6: Stone Ocean',
      mediaType: 'manga',
      aliases: ['JoJo no Kimyou na Bouken: Stone Ocean'],
      externalIds: [{ source: 'anilist', id: '33009' }],
      year: 1999,
      releaseDate: '1999-12-07',
      chrono: 6,
      mc: 82,
      note: 'Jolyne Cujoh, framed and imprisoned, fights her way through a women’s penitentiary toward her father’s old enemy'
    },
    {
      id: 'jojo-ova-2000',
      title: 'JoJo’s Bizarre Adventure (2000 OVA)',
      mediaType: 'anime',
      aliases: ['JoJo no Kimyou na Bouken (2000)', 'JoJo\'s Bizarre Adventure (2000)'],
      externalIds: [{ source: 'anilist', id: '665' }],
      year: 2000,
      releaseDate: '2000-05-25',
      chrono: 3,
      route: 4,
      optional: true,
      adaptation: true,
      note: 'Seven-episode prequel OVA covering the journey’s first half'
    },
    {
      id: 'jojo-manga-p7',
      title: 'JoJo’s Bizarre Adventure: Part 7–Steel Ball Run',
      mediaType: 'manga',
      aliases: ['JoJo no Kimyou na Bouken: Steel Ball Run'],
      externalIds: [{ source: 'anilist', id: '31706' }],
      year: 2004,
      releaseDate: '2004-01-19',
      chrono: 7,
      mc: 92,
      note: 'An alternate-history Joestar, Johnny, rides a transcontinental horse race alongside the mysterious Gyro Zeppeli'
    },
    {
      id: 'jojo-pb-pilot',
      title: 'JoJo no Kimyou na Bouken: Phantom Blood',
      mediaType: 'anime',
      aliases: ['JoJo’s Bizarre Adventure: Phantom Blood (2007)'],
      externalIds: [{ source: 'anilist', id: '3603' }],
      year: 2007,
      releaseDate: '2007-02-17',
      chrono: 1,
      optional: true,
      adaptation: true,
      mc: 77,
      note: 'A.P.P.P.’s theatrical film of Part 1, shown in Japan and never released on home video'
    },
    {
      id: 'jojo-manga-p8',
      title: 'JoJo no Kimyou na Bouken: JoJolion',
      mediaType: 'manga',
      externalIds: [{ source: 'anilist', id: '55515' }],
      year: 2011,
      releaseDate: '2011-05-19',
      chrono: 8,
      mc: 85,
      note: 'A amnesiac man washed ashore in a changed Morioh pieces together who, or what, he used to be'
    },
    {
      id: 'jojo-tv1',
      title: 'JoJo’s Bizarre Adventure (TV)',
      mediaType: 'anime',
      aliases: ['JoJo no Kimyou na Bouken (TV)'],
      externalIds: [{ source: 'anilist', id: '14719' }],
      year: 2012,
      releaseDate: '2012-10-06',
      chrono: 1,
      route: 1,
      adaptation: true,
      mc: 77,
      note: 'Covers Phantom Blood and Battle Tendency across one continuous 26-episode broadcast'
    },
    {
      id: 'jojo-sc',
      title: 'JoJo’s Bizarre Adventure: Stardust Crusaders',
      mediaType: 'anime',
      aliases: ['JoJo no Kimyou na Bouken: Stardust Crusaders'],
      externalIds: [{ source: 'anilist', id: '20474' }],
      year: 2014,
      releaseDate: '2014-04-05',
      chrono: 3,
      route: 2,
      adaptation: true,
      mc: 79,
      note: 'Part 3’s first half: Jotaro’s group travels from Japan toward Egypt, one Stand user at a time'
    },
    {
      id: 'jojo-sc-egypt',
      title: 'JoJo’s Bizarre Adventure: Stardust Crusaders - Battle in Egypt',
      mediaType: 'anime',
      aliases: ['JoJo no Kimyou na Bouken: Stardust Crusaders - Egypt-hen'],
      externalIds: [{ source: 'anilist', id: '20799' }],
      year: 2015,
      releaseDate: '2015-01-11',
      chrono: 3,
      route: 3,
      adaptation: true,
      mc: 82,
      note: 'The group reaches Egypt and closes in on Dio himself'
    },
    {
      id: 'jojo-diu',
      title: 'JoJo’s Bizarre Adventure: Diamond is Unbreakable',
      mediaType: 'anime',
      aliases: ['JoJo no Kimyou na Bouken: Diamond wa Kudakenai'],
      externalIds: [{ source: 'anilist', id: '21450' }],
      year: 2016,
      releaseDate: '2016-04-02',
      chrono: 4,
      route: 6,
      adaptation: true,
      mc: 84,
      note: 'Josuke and friends hunt down Stand users across Morioh while Yoshikage Kira hides among them'
    },
    {
      id: 'jojo-gw',
      title: 'JoJo’s Bizarre Adventure: Golden Wind',
      mediaType: 'anime',
      aliases: ['JoJo no Kimyou na Bouken: Ougon no Kaze'],
      externalIds: [{ source: 'anilist', id: '102883' }],
      year: 2018,
      releaseDate: '2018-10-06',
      chrono: 5,
      route: 7,
      adaptation: true,
      mc: 85,
      note: 'Giorno and Bruno Bucciarati’s gang turn against Passione’s hidden boss'
    },
    {
      id: 'jojo-so',
      title: 'JoJo’s Bizarre Adventure: STONE OCEAN',
      mediaType: 'anime',
      aliases: ['JoJo no Kimyou na Bouken: Stone Ocean'],
      externalIds: [{ source: 'anilist', id: '131942' }],
      year: 2021,
      releaseDate: '2021-12-01',
      chrono: 6,
      route: 8,
      adaptation: true,
      mc: 80,
      note: 'Part 6’s opening twelve episodes: Jolyne arrives at Green Dolphin Street Prison'
    },
    {
      id: 'jojo-so2',
      title: 'JoJo’s Bizarre Adventure: STONE OCEAN Part 2',
      mediaType: 'anime',
      aliases: ['JoJo no Kimyou na Bouken: Stone Ocean Part 2'],
      externalIds: [{ source: 'anilist', id: '146722' }],
      year: 2022,
      releaseDate: '2022-09-01',
      chrono: 6,
      route: 9,
      adaptation: true,
      mc: 82,
      note: 'Concludes Stone Ocean and Jolyne’s fight against Father Pucci’s plan'
    },
    {
      id: 'jojo-manga-p9',
      title: 'JoJo no Kimyou na Bouken: The JOJOLands',
      mediaType: 'manga',
      externalIds: [{ source: 'anilist', id: '138072' }],
      year: 2023,
      releaseDate: '2023-02-17',
      chrono: 9,
      mc: 82,
      note: 'Still-ongoing Part 9, following Jodio Joestar in modern-day Hawaii'
    },
    {
      id: 'jojo-sbr1',
      title: 'STEEL BALL RUN JoJo’s Bizarre Adventure 1st STAGE',
      mediaType: 'anime',
      aliases: ['JoJo no Kimyou na Bouken: Steel Ball Run - 1st STAGE'],
      externalIds: [{ source: 'anilist', id: '190327' }],
      year: 2026,
      releaseDate: '2026-03-19',
      chrono: 7,
      route: 10,
      adaptation: true,
      mc: 88,
      note: 'Part 7’s anime debut: the Steel Ball Run race begins across the United States'
    },
    {
      id: 'jojo-sbr23',
      title: 'STEEL BALL RUN JoJo’s Bizarre Adventure 2nd - 3rd STAGE',
      mediaType: 'anime',
      aliases: ['JoJo no Kimyou na Bouken: Steel Ball Run - 2nd & 3rd STAGE'],
      externalIds: [{ source: 'anilist', id: '210482' }],
      year: 2026,
      releaseDate: '2026-09-25',
      chrono: 7,
      route: 11,
      adaptation: true,
      mc: 85,
      note: 'Continues the race as the field narrows and the Stand fights intensify'
    }
  ],
  characters: [
    {
      id: 'jojo-jonathan',
      name: 'Jonathan Joestar',
      role: 'Part 1 protagonist',
      portraitUrl: `${AL}/character/large/b8087-GTrObHQvujB5.png`,
      appearsIn: ['jojo-manga-p1', 'jojo-pb-pilot', 'jojo-tv1'],
      blurb: 'A Victorian-era gentleman whose adopted brother Dio’s cruelty forces him to grow up fighting far earlier than he expected to.'
    },
    {
      id: 'jojo-dio',
      name: 'Dio Brando',
      role: 'Recurring antagonist',
      portraitUrl: `${AL}/character/large/b4004-w0OtWuvjhftG.png`,
      appearsIn: ['jojo-manga-p1', 'jojo-pb-pilot', 'jojo-tv1', 'jojo-manga-p3', 'jojo-sc', 'jojo-sc-egypt'],
      blurb: 'Jonathan’s adopted brother, who claws his way to immortality and spends the next century being hunted by Jonathan’s descendants.'
    },
    {
      id: 'jojo-jotaro',
      name: 'Jotaro Kujo',
      role: 'Part 3 protagonist',
      portraitUrl: `${AL}/character/large/b4003-gWDSEGbeOAll.png`,
      appearsIn: ['jojo-manga-p3', 'jojo-sc', 'jojo-sc-egypt', 'jojo-manga-p4', 'jojo-diu'],
      blurb: 'A delinquent high schooler whose Stand, Star Platinum, makes him one of the series’ most quietly overpowered leads.'
    },
    {
      id: 'jojo-josuke',
      name: 'Josuke Higashikata',
      role: 'Part 4 protagonist',
      portraitUrl: `${AL}/character/large/b13085-CkmgXL7SSLxL.jpg`,
      appearsIn: ['jojo-manga-p4', 'jojo-diu'],
      blurb: 'Jotaro’s teenage half-uncle, fiercely protective of his hairstyle and of the town of Morioh.'
    },
    {
      id: 'jojo-giorno',
      name: 'Giorno Giovanna',
      role: 'Part 5 protagonist',
      portraitUrl: `${AL}/character/large/b10529-AloL8jjZwjsg.png`,
      appearsIn: ['jojo-manga-p5', 'jojo-gw'],
      blurb: 'Dio’s biological son, who wants to become a gang-star for reasons closer to justice than anyone expects from that lineage.'
    },
    {
      id: 'jojo-jolyne',
      name: 'Jolyne Cujoh',
      role: 'Part 6 protagonist',
      portraitUrl: `${AL}/character/large/b11222-Se9QoJHDSeYY.png`,
      appearsIn: ['jojo-manga-p6', 'jojo-so', 'jojo-so2'],
      blurb: 'Jotaro’s estranged daughter, framed into prison and forced to develop a Stand of her own to survive it.'
    },
    {
      id: 'jojo-johnny',
      name: 'Johnny Joestar',
      role: 'Part 7 protagonist',
      portraitUrl: `${AL}/character/large/b19492-gvMnKxhUhT9V.jpg`,
      appearsIn: ['jojo-manga-p7', 'jojo-sbr1', 'jojo-sbr23'],
      blurb: 'A paralyzed former jockey who enters the Steel Ball Run race chasing a legend about a miracle, in a timeline where the Joestar history runs differently.'
    }
  ]
}
