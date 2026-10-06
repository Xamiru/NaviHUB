// Sword Art Online — Reki Kawahara's light novels and everything built on
// them, one row per release in release order: the main light novel series and
// Progressive (both stored as manga rows, one per catalogue entry), the
// Gun Gale Online spin-off novel, every A-1 Pictures season, special and film,
// both Alternative: Gun Gale Online seasons, and the console/PC games from
// Hollow Fragment to Echoes of Aincrad. Hollow Fragment folds in the 2013 PSP
// game Infinity Moment, which it incorporates; Re: Hollow Fragment and the
// Hollow Realization Deluxe Edition are aliases of their base games.
// No chrono column: the games form their own alternative timeline, and the
// anime films and Progressive retell or branch from the novels.
// Excluded: the manga adaptations, Girls' Ops and the other spin-off novels,
// the Ordinal Scale and Fatal Bullet tie-in specials, the mobile games
// (Integral Factor included), the Accel World VS. Sword Art Online crossover,
// and the unreleased film Integral Domain (2028).
// Ids from AniList / Steam appdetails, story facts from the Wikipedia
// Sword Art Online and video-game articles, AniList synopses and the games'
// store descriptions, art from AniList, all verified 2026-10-05.

import type { FranchiseCfg } from './types'

export const SWORD_ART_ONLINE: FranchiseCfg = {
  id: 'sword-art-online',
  name: 'Sword Art Online',
  short: 'Sword Art Online',
  color: '#4aa3df',
  heroUrl: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/11757-TlEEV9weG4Ag.jpg',
  studio: 'Reki Kawahara / A-1 Pictures / Bandai Namco',
  tagline: 'This may be a game, but it is not something you play.',
  trivia: [
    {
      title: 'A contest entry that ran long',
      body: 'Reki Kawahara wrote the first volume in 2001 for the 2002 Dengeki Game Novel Prize, but it ran past the page limit, so he never submitted it. Instead he published it as a web novel under the pen name Fumio Kunori and kept adding arcs on his website from 2002 to 2008.\n\nIn 2008 he entered the contest again with Accel World and won the Grand Prize. ASCII Media Works also asked to publish his earlier work; he withdrew the web version, and the first Sword Art Online volume came out under Dengeki Bunko on April 10, 2009. The series has 30 million copies in circulation and helped popularize the term isekai outside Japan.'
    },
    {
      title: 'One engine, many worlds',
      body: 'Every world in the series runs on the Cardinal system that Akihiko Kayaba built for Sword Art Online. It was copied for Alfheim Online, and Kayaba later left Kirito The Seed, a package for building virtual worlds; Kirito leaked it online and revived the virtual reality industry.\n\nGun Gale Online, a gunfight game, was built with The Seed by an American company. So was the Underworld of the Alicization arc, a simulated civilization where time runs a thousand times faster than in the real world. In the Unital Ring arc, all the Seed worlds merge into one.'
    },
    {
      title: 'The games\' own timeline',
      body: 'The console games form an alternative timeline to the novels, with original characters and their own take on events from the books. The first, Infinity Moment, came out only in Japan for the PSP on March 14, 2013; Hollow Fragment, which incorporates it, was the first game released in the West, in 2014.\n\nBy March 2026 the console games had sold more than 10 million units worldwide.'
    }
  ],
  entries: [
    {
      id: 'sao-ln',
      title: 'Sword Art Online',
      mediaType: 'manga',
      externalIds: [{ source: 'anilist', id: '51479' }],
      year: 2009,
      releaseDate: '2009-04-10',
      note: 'The main light novels: Kirito and Asuna trapped in a game where dying is real'
    },
    {
      id: 'sao-anime',
      title: 'Sword Art Online',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '11757' }],
      year: 2012,
      releaseDate: '2012-07-08',
      adaptation: true,
      note: 'A-1 Pictures\' first season: the Aincrad death game, then Alfheim Online'
    },
    {
      id: 'sao-progressive-ln',
      title: 'Sword Art Online Progressive',
      mediaType: 'manga',
      externalIds: [{ source: 'anilist', id: '73921' }],
      year: 2012,
      releaseDate: '2012-10-10',
      note: 'Kawahara retells Aincrad floor by floor, starting from the first few floors'
    },
    {
      id: 'sao-extra-edition',
      title: 'Sword Art Online: Extra Edition',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '20021' }],
      year: 2013,
      releaseDate: '2013-12-31',
      note: 'Year-end special: a recap plus a whale quest in Alfheim Online and Leafa learning to swim'
    },
    {
      id: 'sao-hollow-fragment',
      title: 'Sword Art Online: Hollow Fragment',
      aliases: ['Sword Art Online Re: Hollow Fragment', 'Sword Art Online: Infinity Moment'],
      externalIds: [{ source: 'steam', id: '638650' }],
      year: 2014,
      note: 'Incorporates the 2013 PSP game Infinity Moment; the first SAO game released in the West'
    },
    {
      id: 'sao-ii',
      title: 'Sword Art Online II',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '20594' }],
      year: 2014,
      releaseDate: '2014-07-05',
      adaptation: true,
      note: 'Kirito investigates the Death Gun killings in Gun Gale Online'
    },
    {
      id: 'sao-ggo-ln',
      title: 'Sword Art Online Alternative: Gun Gale Online',
      mediaType: 'manga',
      externalIds: [{ source: 'anilist', id: '100858' }],
      year: 2014,
      releaseDate: '2014-12-10',
      spinOff: true,
      note: 'Keiichi Sigsawa\'s spin-off: towering, shy Karen plays as the tiny, all-pink Llenn'
    },
    {
      id: 'sao-lost-song',
      title: 'Sword Art Online: Lost Song',
      externalIds: [{ source: 'steam', id: '840720' }],
      year: 2015,
      note: 'Kirito and friends set out to conquer the floating land of Svart Alfheim'
    },
    {
      id: 'sao-hollow-realization',
      title: 'Sword Art Online: Hollow Realization',
      aliases: ['Sword Art Online: Hollow Realization Deluxe Edition'],
      externalIds: [{ source: 'steam', id: '607890' }],
      year: 2016,
      note: '2026: Kirito enters the new VRMMORPG Sword Art: Origin and meets a mysterious NPC'
    },
    {
      id: 'sao-ordinal-scale',
      title: 'Sword Art Online the Movie: Ordinal Scale',
      mediaType: 'anime',
      aliases: ['Sword Art Online: Ordinal Scale'],
      externalIds: [{ source: 'anilist', id: '21403' }],
      year: 2017,
      releaseDate: '2017-02-18',
      note: 'Original story after SAO II: the augmented-reality Augma challenges full-dive gaming'
    },
    {
      id: 'sao-fatal-bullet',
      title: 'Sword Art Online: Fatal Bullet',
      externalIds: [{ source: 'steam', id: '626690' }],
      year: 2018,
      note: 'Original third-person shooter RPG in Gun Gale Online, with your own avatar as lead'
    },
    {
      id: 'sao-ggo-anime',
      title: 'Sword Art Online Alternative: Gun Gale Online',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '100183' }],
      year: 2018,
      releaseDate: '2018-04-08',
      adaptation: true,
      spinOff: true,
      note: 'Llenn is talked into the Squad Jam team battle royale by her new friend Pitohui'
    },
    {
      id: 'sao-alicization',
      title: 'Sword Art Online: Alicization',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '100182' }],
      year: 2018,
      releaseDate: '2018-10-07',
      adaptation: true,
      note: 'Kirito wakes in the Underworld and sets out with Eugeo to rescue Alice'
    },
    {
      id: 'sao-war-of-underworld',
      title: 'Sword Art Online: Alicization - War of Underworld',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '108759' }],
      year: 2019,
      releaseDate: '2019-10-13',
      adaptation: true,
      note: 'Six months after the Administrator\'s fall, Alice tends a broken Kirito as war nears'
    },
    {
      id: 'sao-alicization-lycoris',
      title: 'Sword Art Online: Alicization Lycoris',
      externalIds: [{ source: 'steam', id: '1009290' }],
      year: 2020,
      note: 'Real-time action RPG of the Alicization arc, fought with sword skills and sacred arts'
    },
    {
      id: 'sao-war-of-underworld-2',
      title: 'Sword Art Online: Alicization - War of Underworld Part 2',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '114308' }],
      year: 2020,
      releaseDate: '2020-07-12',
      adaptation: true,
      note: 'Asuna, Sinon and Leafa log in to hold off Gabriel\'s army while Kirito sleeps'
    },
    {
      id: 'sao-progressive-aria',
      title: 'Sword Art Online the Movie -Progressive- Aria of a Starless Night',
      mediaType: 'anime',
      aliases: ['Sword Art Online Progressive: Aria of a Starless Night'],
      externalIds: [{ source: 'anilist', id: '124140' }],
      year: 2021,
      releaseDate: '2021-10-30',
      adaptation: true,
      note: 'The death game\'s first floors retold through Asuna\'s eyes, with the new character Mito'
    },
    {
      id: 'sao-progressive-scherzo',
      title: 'Sword Art Online the Movie -Progressive- Scherzo of Deep Night',
      mediaType: 'anime',
      aliases: ['Sword Art Online Progressive: Scherzo of Deep Night'],
      externalIds: [{ source: 'anilist', id: '140999' }],
      year: 2022,
      releaseDate: '2022-10-22',
      adaptation: true,
      note: 'A month into the death game, two leading guilds clash as Asuna and Kirito climb'
    },
    {
      id: 'sao-last-recollection',
      title: 'Sword Art Online: Last Recollection',
      externalIds: [{ source: 'steam', id: '1566880' }],
      year: 2023,
      note: 'Billed as the culmination of the game series, with its largest playable roster'
    },
    {
      id: 'sao-fractured-daydream',
      title: 'Sword Art Online: Fractured Daydream',
      externalIds: [{ source: 'steam', id: '1858630' }],
      year: 2024,
      note: 'Tenth-anniversary battle game with 21 characters, played solo or with friends'
    },
    {
      id: 'sao-ggo-ii',
      title: 'Sword Art Online Alternative: Gun Gale Online II',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '167141' }],
      year: 2024,
      releaseDate: '2024-10-05',
      adaptation: true,
      spinOff: true,
      note: 'Team LPFM enters a surprise battle royale on a map that sinks into the ocean'
    },
    {
      id: 'sao-echoes-of-aincrad',
      title: 'Echoes of Aincrad',
      externalIds: [{ source: 'steam', id: '2244210' }],
      year: 2026,
      note: 'Create your own hero in Aincrad and fight alongside a partner'
    },
    {
      id: 'sao-unanswered-butterfly',
      title: 'Unanswered//butterfly: Sword Art Online',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '208754' }],
      year: 2026,
      releaseDate: '2026-07-10',
      spinOff: true,
      note: 'Film bundled with Echoes of Aincrad: Emirun and Rex train under Asuna for revenge'
    }
  ],
  characters: [
    {
      id: 'sao-kirito',
      name: 'Kazuto "Kirito" Kirigaya',
      role: 'Protagonist',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b36765-BnLbXg0Tzzh9.png',
      appearsIn: [
        'sao-ln',
        'sao-anime',
        'sao-progressive-ln',
        'sao-extra-edition',
        'sao-hollow-fragment',
        'sao-ii',
        'sao-lost-song',
        'sao-hollow-realization',
        'sao-ordinal-scale',
        'sao-alicization',
        'sao-war-of-underworld',
        'sao-war-of-underworld-2',
        'sao-progressive-aria',
        'sao-progressive-scherzo'
      ],
      blurb: 'A former beta tester who plays solo and takes the label "beater" to shield other testers. He clears Aincrad, rescues Asuna from Alfheim Online, and is later sent into the Underworld.'
    },
    {
      id: 'sao-asuna',
      name: 'Asuna Yuuki',
      role: 'Heroine',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b36828-j5ib0adAzGMx.png',
      appearsIn: [
        'sao-ln',
        'sao-anime',
        'sao-progressive-ln',
        'sao-extra-edition',
        'sao-alicization',
        'sao-war-of-underworld-2',
        'sao-progressive-aria',
        'sao-progressive-scherzo',
        'sao-unanswered-butterfly'
      ],
      blurb: 'Sub-leader of the Knights of the Blood, nicknamed Lightning Flash for her lightning-fast sword skills. She marries Kirito in Aincrad and is the lead of the Progressive films.'
    },
    {
      id: 'sao-leafa',
      name: 'Suguha "Leafa" Kirigaya',
      role: 'Kirito\'s sister',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b36831-JfyFU7gPPVmr.png',
      appearsIn: ['sao-ln', 'sao-anime', 'sao-extra-edition', 'sao-ii', 'sao-war-of-underworld-2'],
      blurb: 'Kazuto\'s cousin and adoptive sister, who plays Alfheim Online as the fairy Leafa. She helps him reach the World Tree to save Asuna.'
    },
    {
      id: 'sao-sinon',
      name: 'Shino "Sinon" Asada',
      role: 'Gun Gale Online sniper',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b55147-1fCU8lONEuZQ.png',
      appearsIn: ['sao-ln', 'sao-ii', 'sao-war-of-underworld-2'],
      blurb: 'A cool-headed sniper who plays Gun Gale Online to overcome her trauma around guns. She fights beside Kirito in the Bullet of Bullets tournament against Death Gun.'
    },
    {
      id: 'sao-eugeo',
      name: 'Eugeo',
      role: 'Underworld swordsman',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b70899-TwMq5mtH5ifc.jpg',
      appearsIn: ['sao-ln', 'sao-alicization'],
      blurb: 'A young carver from the village of Rulid and Kirito\'s childhood friend in the Underworld. He sets out to become an Integrity Knight to rescue Alice, and dies in the battle against the Administrator.'
    },
    {
      id: 'sao-alice',
      name: 'Alice Zuberg',
      role: 'Heroine of Alicization',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b75450-vDO1lQup1pe7.jpg',
      appearsIn: [
        'sao-ln',
        'sao-alicization',
        'sao-war-of-underworld',
        'sao-war-of-underworld-2',
        'sao-alicization-lycoris'
      ],
      blurb: 'Eugeo\'s childhood friend, taken by an Integrity Knight for breaking the Taboo Index and remade as a knight herself. She is A.L.I.C.E., the true artificial intelligence the Underworld was built to produce.'
    },
    {
      id: 'sao-kayaba',
      name: 'Akihiko Kayaba',
      role: 'Creator of Sword Art Online',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b36829-X5zITNEQ7xij.png',
      appearsIn: ['sao-ln', 'sao-anime', 'sao-alicization'],
      blurb: 'Creator of the NerveGear and Sword Art Online, who traps 10,000 players inside and plays among them as Heathcliff. After his defeat he uploads his mind to the Internet and leaves Kirito The Seed.'
    }
  ]
}
