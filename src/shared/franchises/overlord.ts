// Overlord — Kugane Maruyama's light novels and their adaptations, one row per
// release in release order: the light novel series (stored as a manga row),
// the Comp Ace manga, Madhouse's four TV seasons, the two 2017 compilation
// films, the Sacred Kingdom film, and the two licensed PC games.
// No chrono column: everything follows one continuity, but the compilation
// films only recap season one and the games are side stories, so release order
// is enough.
// Excluded: the Ple Ple Pleiades chibi shorts and the 2016 OVA, the Isekai
// Quartet crossover, the Overlord New World sequel manga and other spin-off
// manga, and the mobile games Mass for the Dead (2019) and Lord of Nazarick
// (2024), which have no PC release.
// Ids from AniList / Steam appdetails, story facts from the Wikipedia novel
// article, AniList synopses and character pages and the games' store
// descriptions, art from AniList, all verified 2026-10-05.

import type { FranchiseCfg } from './types'

export const OVERLORD: FranchiseCfg = {
  id: 'overlord',
  name: 'Overlord',
  short: 'Overlord',
  color: '#9b6fd6',
  heroUrl: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/20832-NswCiSYMoI2k.jpg',
  studio: 'Kugane Maruyama / Madhouse',
  tagline: 'The last player online, and the new world\'s most feared undead king.',
  trivia: [
    {
      title: 'From a web serial to the top of the charts',
      body: 'Kugane Maruyama began serializing Overlord online in 2010 on the novel site Arcadia, and uploaded it to Shousetsuka ni Narou in 2012 before Enterbrain acquired it. The first volume, illustrated by So-bin, came out on July 30, 2012. In the afterword of volume sixteen, Maruyama announced that the series will end with volume eighteen.\n\nOverlord was the top-selling light novel series of 2015 and ranked first in the 2017 Kono Light Novel ga Sugoi! guide in the tankoubon category. By December 2021 the novels and manga together had more than 11 million copies in circulation.'
    },
    {
      title: 'The last night of YGGDRASIL',
      body: 'In 2126 the full-dive game YGGDRASIL closes after a twelve-year run. Its guild Ainz Ooal Gown once had 41 members; only four are left, and only the skeletal Overlord Momonga decides to stay logged in until the servers go dark.\n\nThey never do. The guild\'s headquarters, the Great Tomb of Nazarick, is carried into another world, its NPCs come alive, and Momonga is stuck in his avatar with no way to log out. He takes the guild\'s name as his own so that any other players will notice, and finds his new undead body leaves him with no moral qualms about killing.'
    },
    {
      title: 'A midquel on the big screen',
      body: 'Madhouse adapted the novels as four 13-episode seasons between 2015 and 2022, with two compilation films recapping the first season in 2017. Season four skipped the novels\' Sacred Kingdom arc, which became the film Overlord: The Sacred Kingdom in September 2024, a midquel set during the fourth season.\n\nSince 2019 Overlord\'s cast has also appeared in chibi form in Isekai Quartet, a crossover comedy with KonoSuba, Re:Zero, The Saga of Tanya the Evil and other Kadokawa light novel series.'
    }
  ],
  entries: [
    {
      id: 'overlord-ln',
      title: 'Overlord',
      mediaType: 'manga',
      externalIds: [{ source: 'anilist', id: '85976' }],
      year: 2012,
      releaseDate: '2012-07-30',
      note: 'The light novels: Momonga stays logged in as his game shuts down, and wakes in a new world'
    },
    {
      id: 'overlord-manga',
      title: 'Overlord (manga)',
      mediaType: 'manga',
      externalIds: [{ source: 'anilist', id: '85934' }],
      year: 2014,
      releaseDate: '2014-11-26',
      adaptation: true,
      note: 'Satoshi Oshio and Hugin Miyama\'s adaptation, serialized in Comp Ace until 2023'
    },
    {
      id: 'overlord-s1',
      title: 'Overlord',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '20832' }],
      year: 2015,
      releaseDate: '2015-07-07',
      adaptation: true,
      note: 'Madhouse\'s first season: trapped as his avatar, Momonga takes the name Ainz Ooal Gown'
    },
    {
      id: 'overlord-undead-king',
      title: 'Overlord: The Undead King',
      mediaType: 'anime',
      aliases: ['Overlord: Fushisha no Ou'],
      externalIds: [{ source: 'anilist', id: '98873' }],
      year: 2017,
      releaseDate: '2017-02-25',
      adaptation: true,
      note: 'Compilation film recapping the first half of season one'
    },
    {
      id: 'overlord-dark-hero',
      title: 'Overlord: The Dark Hero',
      mediaType: 'anime',
      aliases: ['Overlord: The Dark Warrior', 'Overlord: Shikkoku no Senshi'],
      externalIds: [{ source: 'anilist', id: '98874' }],
      year: 2017,
      releaseDate: '2017-03-11',
      adaptation: true,
      note: 'Compilation film recapping the second half of season one'
    },
    {
      id: 'overlord-ii',
      title: 'Overlord II',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '98437' }],
      year: 2018,
      releaseDate: '2018-01-09',
      adaptation: true,
      note: 'A Lizard Man uprising, while Ainz works as the adamantite adventurer Momon'
    },
    {
      id: 'overlord-iii',
      title: 'Overlord III',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '101474' }],
      year: 2018,
      releaseDate: '2018-07-10',
      adaptation: true,
      note: 'Ainz\'s plans for Carne village and his alter ego Momon begin to bear fruit'
    },
    {
      id: 'overlord-dungeon-of-nazarick',
      title: 'Dungeon of Nazarick',
      externalIds: [{ source: 'steam', id: '1453740' }],
      year: 2020,
      spinOff: true,
      note: '2D action game: a common adventurer explores the Great Tomb of Nazarick'
    },
    {
      id: 'overlord-escape-from-nazarick',
      title: 'Overlord: Escape from Nazarick',
      externalIds: [{ source: 'steam', id: '1782150' }],
      year: 2022,
      releaseDate: '2022-06-16',
      spinOff: true,
      note: 'Metroidvania overseen by Maruyama: Clementine hunts for her missing memories'
    },
    {
      id: 'overlord-iv',
      title: 'Overlord IV',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '133844' }],
      year: 2022,
      releaseDate: '2022-07-05',
      adaptation: true,
      note: 'Ainz rules the new Sorcerer Kingdom and sends Albedo to its struggling capital, E-Rantel'
    },
    {
      id: 'overlord-sacred-kingdom',
      title: 'Overlord: The Sacred Kingdom',
      mediaType: 'anime',
      aliases: ['Overlord: Sei Oukoku-hen'],
      externalIds: [{ source: 'anilist', id: '133845' }],
      year: 2024,
      releaseDate: '2024-09-20',
      adaptation: true,
      note: 'Film of the arc season four skipped: the demon emperor Jaldabaoth invades the Sacred Kingdom'
    }
  ],
  characters: [
    {
      id: 'overlord-momonga',
      name: 'Momonga (Ainz Ooal Gown)',
      role: 'Guild master of Ainz Ooal Gown',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b89103-ZsnA0r77GHsR.png',
      appearsIn: [
        'overlord-ln',
        'overlord-manga',
        'overlord-s1',
        'overlord-undead-king',
        'overlord-dark-hero',
        'overlord-ii',
        'overlord-iii',
        'overlord-dungeon-of-nazarick',
        'overlord-iv',
        'overlord-sacred-kingdom'
      ],
      blurb: 'A cautious, careful player trapped in the body of his skeletal avatar, revered by Nazarick\'s NPCs as the highest of the 41 Supreme Beings. Becoming undead leaves his emotions cold and suppressed.'
    },
    {
      id: 'overlord-albedo',
      name: 'Albedo',
      role: 'Overseer of the Floor Guardians',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b89122-Gj7MBs7F5cMJ.png',
      appearsIn: [
        'overlord-ln',
        'overlord-manga',
        'overlord-s1',
        'overlord-iii',
        'overlord-dungeon-of-nazarick',
        'overlord-iv'
      ],
      blurb: 'One of Nazarick\'s most powerful NPCs, with fallen-angel wings and horns. Ainz rewrote her settings on a whim, and she has been madly in love with him ever since.'
    },
    {
      id: 'overlord-shalltear',
      name: 'Shalltear Bloodfallen',
      role: 'Guardian of the first three floors',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b89121-N8hzLH4nfWna.png',
      appearsIn: ['overlord-ln', 'overlord-manga', 'overlord-s1'],
      blurb: 'A vampire Floor Guardian, among the strongest in Nazarick. She is also in love with Momonga and constantly clashes with Albedo over him.'
    },
    {
      id: 'overlord-demiurge',
      name: 'Demiurge',
      role: 'Guardian of the seventh floor',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b89125-pnLki4r5UyV5.png',
      appearsIn: [
        'overlord-ln',
        'overlord-manga',
        'overlord-s1',
        'overlord-iii',
        'overlord-dungeon-of-nazarick'
      ],
      blurb: 'A bespectacled demon in charge of Nazarick\'s tactics and defenses, considered its most evil NPC. He keeps reading hidden genius into Ainz\'s plans.'
    },
    {
      id: 'overlord-narberal',
      name: 'Narberal Gamma',
      role: 'Pleiades combat maid',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b89152-S3WrhOMakSCq.png',
      appearsIn: ['overlord-ln', 'overlord-manga', 'overlord-s1', 'overlord-dark-hero'],
      blurb: 'A doppelganger combat maid who travels with Ainz as his adventuring partner Nabe. Like most of Nazarick she despises humans, which makes the disguise hard work.'
    },
    {
      id: 'overlord-pandoras-actor',
      name: 'Pandora\'s Actor',
      role: 'Area Guardian of the Treasury',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/89154-jbsFsEsjL3aS.jpg',
      appearsIn: ['overlord-ln', 'overlord-manga', 'overlord-s1'],
      blurb: 'The doppelganger Momonga created himself out of everything he once thought was cool, theatrical gestures included. He embarrasses his maker but is the NPC Ainz trusts most.'
    }
  ]
}
