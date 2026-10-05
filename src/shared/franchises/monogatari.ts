// Monogatari — NisiOisiN's light novels as adapted by SHAFT, one row per
// anime release (TV season, film or ONA) from Bakemonogatari through the
// 2024 Off & Monster Season, following AniList's own split rather than
// grouping multiple novels under one umbrella title. No manga tie-ins are
// included; this page is anime-only, as the task scope asks. Route is
// broadcast order, the series' own standard recommendation, with only the
// Koyomi Vamp recap film and the Off & Monster Season's bonus one-shot
// special marked optional (both retell or sit beside content told elsewhere).
// Chrono is an approximation of the commonly cited in-universe timeline:
// Kizumonogatari (plus its 2024 recap) comes first, then Nekomonogatari
// Black, Bakemonogatari, Nisemonogatari, the Second Season bundle, New
// Year's Eve in Tsukimonogatari, the flashback anthology Koyomimonogatari
// (whose individual shorts actually scatter across Koyomi's three years of
// high school — collapsed here to one slot for lack of a better single
// position), Kanbaru's Hanamonogatari the following spring, the two
// Owarimonogatari seasons and Zoku Owarimonogatari closing out Koyomi's
// senior year, and finally Off & Monster Season, set with Koyomi an adult.
// Several Second Season and Owarimonogatari chapters do not individually
// align to one point in this order; the whole release is slotted at its
// predominant position. Ids and years from AniList, art from AniList,
// curl-verified 2026-10-05.

import type { FranchiseCfg } from './types'

const AL = 'https://s4.anilist.co/file/anilistcdn'

export const MONOGATARI: FranchiseCfg = {
  id: 'monogatari',
  name: 'Monogatari',
  short: 'Monogatari',
  color: '#4fa8d8',
  heroUrl: `${AL}/media/anime/banner/n5081-0Zcn5GOFYHMc.jpg`,
  studio: 'SHAFT',
  tagline: 'A high schooler who survived a vampire attack keeps running into girls with their own supernatural "oddity" to carry.',
  trivia: [
    {
      title: 'Text as a visual style',
      body: 'SHAFT and director Akiyuki Shinbo built Monogatari’s look around NisiOisiN’s dense, pun-heavy prose: walls of on-screen text, jump cuts, still images held a beat too long, and conversations shot like duels. It reads as an unusual choice for TV animation and became the franchise’s most recognizable trait.'
    },
    {
      title: 'Broadcast order and story order rarely match',
      body: 'NisiOisiN releases the novels out of their in-universe sequence on purpose — Kizumonogatari, set before Koyomi meets any of the female leads, was broadcast as films years after Bakemonogatari introduced them. The anime keeps this order, so watching broadcast-first means meeting characters before learning how Koyomi became what he is.'
    },
    {
      title: 'A still-running epilogue',
      body: 'Off & Monster Season (2024) jumps the story forward to Koyomi as an adult, checking in on where the cast ended up years after Zoku Owarimonogatari closed out his high school years — NisiOisiN and SHAFT returning to a story most readers had assumed was finished.'
    }
  ],
  entries: [
    {
      id: 'mono-bake',
      title: 'Bakemonogatari',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '5081' }],
      year: 2009,
      releaseDate: '2009-07-03',
      chrono: 3,
      route: 1,
      mc: 82,
      note: 'Koyomi meets Hitagi Senjougahara and a string of other girls, each carrying a supernatural "oddity"'
    },
    {
      id: 'mono-nise',
      title: 'Nisemonogatari',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '11597' }],
      year: 2012,
      releaseDate: '2012-01-08',
      chrono: 4,
      route: 2,
      mc: 79,
      note: 'Koyomi’s two younger sisters get pulled into a fake monk’s scheme over summer break'
    },
    {
      id: 'mono-nekokuro',
      title: 'Nekomonogatari Black',
      mediaType: 'anime',
      aliases: ['Nekomonogatari (Kuro)'],
      externalIds: [{ source: 'anilist', id: '15689' }],
      year: 2012,
      releaseDate: '2012-12-31',
      chrono: 2,
      route: 3,
      mc: 77,
      note: 'Prequel to Bakemonogatari: Tsubasa Hanekawa’s own oddity, discovered during Golden Week'
    },
    {
      id: 'mono-second-season',
      title: 'Monogatari Series Second Season',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '17074' }],
      year: 2013,
      releaseDate: '2013-07-07',
      chrono: 5,
      route: 4,
      mc: 88,
      note: 'Bundles five story arcs: Nekomonogatari White, Kabukimonogatari, Otorimonogatari, Onimonogatari and Koimonogatari'
    },
    {
      id: 'mono-hana',
      title: 'Hanamonogatari',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '20593' }],
      year: 2014,
      releaseDate: '2014-08-16',
      chrono: 8,
      route: 5,
      mc: 78,
      note: 'Suruga Kanbaru’s story, the spring after Koyomi graduates, told without him as narrator'
    },
    {
      id: 'mono-tsuki',
      title: 'Tsukimonogatari',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '20918' }],
      year: 2014,
      releaseDate: '2014-12-31',
      chrono: 6,
      route: 6,
      mc: 79,
      note: 'New Year’s Eve: Shinobu Oshino gets a story told mostly from her own point of view'
    },
    {
      id: 'mono-owari',
      title: 'Owarimonogatari',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '21262' }],
      year: 2015,
      releaseDate: '2015-10-04',
      chrono: 9,
      route: 7,
      mc: 85,
      note: 'The Ougi Formula and Sodachi Riddle arcs, as Koyomi’s senior year starts closing in on him'
    },
    {
      id: 'mono-kizu1',
      title: 'Kizumonogatari Part 1: Tekketsu',
      mediaType: 'anime',
      aliases: ['Kizumonogatari I: Tekketsu-hen'],
      externalIds: [{ source: 'anilist', id: '9260' }],
      year: 2016,
      releaseDate: '2016-01-08',
      chrono: 1,
      route: 8,
      mc: 83,
      note: 'Spring break before Bakemonogatari: Koyomi meets a dying vampire and survives being drained by her'
    },
    {
      id: 'mono-koyomimonogatari',
      title: 'Koyomimonogatari',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '21520' }],
      year: 2016,
      releaseDate: '2016-01-09',
      chrono: 7,
      route: 9,
      mc: 74,
      note: 'Twelve short flashback episodes filling in minor incidents from across Koyomi’s three years of high school'
    },
    {
      id: 'mono-kizu2',
      title: 'Kizumonogatari Part 2: Nekketsu',
      mediaType: 'anime',
      aliases: ['Kizumonogatari II: Nekketsu-hen'],
      externalIds: [{ source: 'anilist', id: '21399' }],
      year: 2016,
      releaseDate: '2016-08-19',
      chrono: 1,
      route: 10,
      mc: 85,
      note: 'Koyomi, now part-vampire himself, goes after the three vampire hunters who maimed Kiss-shot'
    },
    {
      id: 'mono-kizu3',
      title: 'Kizumonogatari Part 3: Reiketsu',
      mediaType: 'anime',
      aliases: ['Kizumonogatari III: Reiketsu-hen'],
      externalIds: [{ source: 'anilist', id: '21400' }],
      year: 2017,
      releaseDate: '2017-01-06',
      chrono: 1,
      route: 11,
      mc: 87,
      note: 'The confrontation that decides whether Koyomi stays part-vampire or finds a way back'
    },
    {
      id: 'mono-owari2',
      title: 'Owarimonogatari Second Season',
      mediaType: 'anime',
      aliases: ['Owarimonogatari (Ge)'],
      externalIds: [{ source: 'anilist', id: '21745' }],
      year: 2017,
      releaseDate: '2017-08-12',
      chrono: 10,
      route: 12,
      mc: 89,
      note: 'The Shinobu Mail arc, and Nadeko Sengoku’s return as the series starts tying off its threads'
    },
    {
      id: 'mono-zoku-owari',
      title: 'Zoku Owarimonogatari',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '100815' }],
      year: 2019,
      releaseDate: '2019-02-27',
      chrono: 11,
      route: 13,
      mc: 84,
      note: 'Ougi Oshino’s true nature comes out, closing the "young Koyomi" saga at graduation'
    },
    {
      id: 'mono-koyomi-vamp',
      title: 'Kizumonogatari: Koyomi Vamp',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '181970' }],
      year: 2024,
      releaseDate: '2024-01-12',
      chrono: 1,
      route: 14,
      optional: true,
      adaptation: true,
      remake: true,
      mc: 80,
      note: 'Theatrical recap compiling the Kizumonogatari trilogy into a single film ahead of Off & Monster Season'
    },
    {
      id: 'mono-off-monster',
      title: 'Monogatari Series: Off & Monster Season',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '173533' }],
      year: 2024,
      releaseDate: '2024-07-06',
      chrono: 12,
      route: 15,
      mc: 86,
      note: 'Jumps forward to an adult Koyomi, catching up with the cast years after high school'
    },
    {
      id: 'mono-off-monster-special',
      title: 'Monogatari Series: Off & Monster Season - A Cruel Fairy Tale: The Beautiful Princess',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '180332' }],
      aliases: ['Monogatari Series: Off & Monster Season - Zankoku Douwa: Utsukushi-hime'],
      year: 2024,
      releaseDate: '2024-08-17',
      chrono: 12,
      route: 16,
      optional: true,
      mc: 78,
      note: 'Bonus one-shot story released alongside the Off & Monster Season broadcast'
    }
  ],
  characters: [
    {
      id: 'mono-koyomi',
      name: 'Koyomi Araragi',
      role: 'Narrator and protagonist',
      portraitUrl: `${AL}/character/large/b22036-Ed3CjwPlDLp4.png`,
      appearsIn: ['mono-bake', 'mono-nise', 'mono-nekokuro', 'mono-second-season', 'mono-hana', 'mono-tsuki', 'mono-owari', 'mono-kizu1', 'mono-koyomimonogatari', 'mono-kizu2', 'mono-kizu3', 'mono-owari2', 'mono-zoku-owari', 'mono-koyomi-vamp', 'mono-off-monster', 'mono-off-monster-special'],
      blurb: 'A former delinquent left part-vampire after a spring break attack, who keeps getting pulled into other people’s supernatural problems out of a mix of curiosity and guilt.'
    },
    {
      id: 'mono-shinobu',
      name: 'Shinobu Oshino',
      role: 'Koyomi’s vampire companion',
      portraitUrl: `${AL}/character/large/b23602-Z4MDNYcoAWZu.png`,
      appearsIn: ['mono-bake', 'mono-nise', 'mono-second-season', 'mono-tsuki', 'mono-kizu1', 'mono-kizu2', 'mono-kizu3', 'mono-owari', 'mono-owari2', 'mono-off-monster'],
      blurb: 'Once the legendary vampire Kiss-shot Acerola-orion Heart-under-blade, reduced to child-sized form and bound to Koyomi’s shadow.'
    },
    {
      id: 'mono-hitagi',
      name: 'Hitagi Senjougahara',
      role: 'Koyomi’s girlfriend',
      portraitUrl: `${AL}/character/large/b22037-sY7GWSKYr2Nl.jpg`,
      appearsIn: ['mono-bake', 'mono-nise', 'mono-second-season', 'mono-tsuki', 'mono-owari', 'mono-owari2', 'mono-zoku-owari', 'mono-off-monster'],
      blurb: 'Lost her weight to a crab years before the story starts, and lets almost no one close enough to find out why until Koyomi does.'
    },
    {
      id: 'mono-tsubasa',
      name: 'Tsubasa Hanekawa',
      role: 'Koyomi’s classmate',
      portraitUrl: `${AL}/character/large/b22055-EaTsy30ihdgb.png`,
      appearsIn: ['mono-bake', 'mono-nise', 'mono-nekokuro', 'mono-second-season', 'mono-owari', 'mono-off-monster'],
      blurb: 'The class’s star student, who turns out to be hiding a home life and an oddity nobody around her has noticed.'
    },
    {
      id: 'mono-suruga',
      name: 'Suruga Kanbaru',
      role: 'Hitagi’s underclassman',
      portraitUrl: `${AL}/character/large/22054-n6Jsvp80bUhD.jpg`,
      appearsIn: ['mono-bake', 'mono-second-season', 'mono-hana', 'mono-off-monster'],
      blurb: 'A basketball star carrying a monkey’s paw grafted onto her arm, and the subject of her own starring arc in Hanamonogatari.'
    },
    {
      id: 'mono-nadeko',
      name: 'Nadeko Sengoku',
      role: 'Koyomi’s underclassman',
      portraitUrl: `${AL}/character/large/b22050-RUw3vyGYdr9W.jpg`,
      appearsIn: ['mono-bake', 'mono-second-season', 'mono-owari2'],
      blurb: 'Quiet and self-effacing in Bakemonogatari, before her own arcs reveal how much she has been swallowing.'
    },
    {
      id: 'mono-mayoi',
      name: 'Mayoi Hachikuji',
      role: 'A lost elementary schooler',
      portraitUrl: `${AL}/character/large/b22052-beyfl4AyMGhn.png`,
      appearsIn: ['mono-bake', 'mono-nise', 'mono-owari2'],
      blurb: 'A snail oddity wandering the same street forever, who Koyomi meets first and keeps running into long after he should have stopped being able to.'
    }
  ]
}
