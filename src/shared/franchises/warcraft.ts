// Warcraft — Blizzard's strategy games, World of Warcraft and its expansions,
// the spin-offs, the 2016 film and two key novels. Games: Warcraft: Orcs &
// Humans, Warcraft II and its Beyond the Dark Portal expansion, Warcraft III:
// Reign of Chaos, The Frozen Throne and the Reforged remaster (its own remake
// row), World of Warcraft and every expansion released by 2026-10-05 (The
// Burning Crusade through Midnight, one row each), plus Hearthstone and
// Warcraft Rumble as spin-offs. These are Battle.net titles with no Steam
// release, so game rows carry no external id and match by title. Books: Jeff
// Grubb's The Last Guardian (the basis of the film) and Christie Golden's
// Arthas: Rise of the Lich King. Film: Warcraft (2016).
// Chrono is in-universe: the First War (Orcs & Humans, The Last Guardian and
// the film share slot 1), the Second War and its aftermath, Warcraft III and
// The Frozen Throne (Reforged shares Reign of Chaos' slot; the Arthas novel,
// which follows him up to the Frozen Throne, shares that slot), then World of
// Warcraft about four years later and its expansions in release order, each of
// which advances the shared story. Hearthstone and Rumble have no slot.
// Excluded: Warcraft Adventures (cancelled), Warcraft II: Battle.net Edition
// and the Remastered collection, WoW Classic and the planned World of Warcraft:
// Forever branch, Heroes of the Storm (a crossover), the other novels, comics,
// manga and tabletop games.
// Ids from Open Library and TMDB (en-US); dates and story facts from
// Wikipedia; character art from Hearthstone's official card renders served by
// HearthstoneJSON, all checked 2026-10-05.

import type { FranchiseCfg } from './types'

export const WARCRAFT: FranchiseCfg = {
  id: 'warcraft',
  name: 'Warcraft',
  short: 'Warcraft',
  color: '#d9a441',
  heroUrl: 'https://image.tmdb.org/t/p/w1280/aTGvZ3F8QnAD8cPpJRaaqRRxFK6.jpg',
  studio: 'Blizzard Entertainment',
  tagline: 'The Alliance and the Horde, from the first orc invasion to the war against the Void.',
  trivia: [
    {
      title: 'It sounded super cool',
      body: 'The name "Warcraft" was proposed by Blizzard developer Sam Didier and chosen, according to co-founder Allen Adham, because "it sounded super cool", with no particular meaning attached.\n\nLater games are known for lavishly presented stories, but Orcs & Humans had no script: its plot was improvised in the recording studio by producer Bill Roper, who was also its only voice actor.'
    },
    {
      title: 'Monsters as protagonists',
      body: 'The setting centres on war between the human-led Alliance and the orc-led Horde, and it is noted for treating "monster races" such as orcs, trolls and the undead as complex protagonists with real character development and moral complexity.\n\nThe first three games are considered landmarks of real-time strategy, and World of Warcraft is regarded as the most popular and influential MMORPG ever made. The franchise has grossed over 12 billion dollars.'
    },
    {
      title: 'From strategy to an online world',
      body: 'World of Warcraft, set about four years after The Frozen Throne, launched on November 23, 2004, the franchise\'s tenth anniversary. Its first expansion, The Burning Crusade, sold nearly 2.4 million copies on its first day, then the fastest-selling PC game; Wrath of the Lich King beat it with 2.8 million.\n\nThe 2016 film, directed by Duncan Jones, was built on the plot of Jeff Grubb\'s novel The Last Guardian, returning the series to the First War where it began.'
    }
  ],
  entries: [
    {
      id: 'warcraft-orcs-humans',
      title: 'Warcraft: Orcs & Humans',
      aliases: ['Warcraft: Orcs and Humans'],
      year: 1994,
      releaseDate: '1994-11-15',
      chrono: 1,
      note: 'The First War: a horde of orcs from Draenor invades the human kingdom of Azeroth'
    },
    {
      id: 'warcraft-2',
      title: 'Warcraft II: Tides of Darkness',
      aliases: ['Warcraft II'],
      year: 1995,
      releaseDate: '1995-12-05',
      chrono: 2,
      note: 'The Second War: Azeroth\'s survivors flee to Lordaeron and the Alliance pushes the Horde to Blackrock Spire'
    },
    {
      id: 'warcraft-2-dark-portal',
      title: 'Warcraft II: Beyond the Dark Portal',
      year: 1996,
      releaseDate: '1996-05-16',
      chrono: 3,
      note: 'Expansion set after Tides of Darkness, with new campaigns and the orc homeworld of Draenor'
    },
    {
      id: 'warcraft-last-guardian',
      title: 'Warcraft: The Last Guardian',
      mediaType: 'book',
      aliases: ['The Last Guardian'],
      externalIds: [{ source: 'openlibrary', id: 'OL5059146W' }],
      year: 2002,
      chrono: 1,
      note: 'Khadgar is apprenticed to Medivh, the last Guardian of Tirisfal, in the tower of Karazhan'
    },
    {
      id: 'warcraft-3',
      title: 'Warcraft III: Reign of Chaos',
      aliases: ['Warcraft III'],
      year: 2002,
      releaseDate: '2002-07-03',
      chrono: 4,
      note: 'Prince Arthas falls to the undead Scourge as the Burning Legion moves to conquer Azeroth'
    },
    {
      id: 'warcraft-3-frozen-throne',
      title: 'Warcraft III: The Frozen Throne',
      year: 2003,
      releaseDate: '2003-07-01',
      chrono: 5,
      note: 'Continues after Reign of Chaos through Maiev Shadowsong and the blood elf prince Kael\'thas'
    },
    {
      id: 'warcraft-wow',
      title: 'World of Warcraft',
      year: 2004,
      releaseDate: '2004-11-23',
      chrono: 6,
      note: 'Online world set about four years after The Frozen Throne; every player sides with the Alliance or the Horde'
    },
    {
      id: 'warcraft-burning-crusade',
      title: 'World of Warcraft: The Burning Crusade',
      year: 2007,
      releaseDate: '2007-01-16',
      chrono: 7,
      note: 'Opens Outland, the ravaged world held by the Burning Legion and Illidan\'s forces'
    },
    {
      id: 'warcraft-wrath-lich-king',
      title: 'World of Warcraft: Wrath of the Lich King',
      year: 2008,
      releaseDate: '2008-11-13',
      chrono: 8,
      note: 'Northrend, home of the Lich King Arthas and his undead, and the first hero class, the death knight'
    },
    {
      id: 'warcraft-arthas-novel',
      title: 'Arthas: Rise of the Lich King',
      mediaType: 'book',
      aliases: ['Arthas', 'World of Warcraft: Arthas: Rise of the Lich King'],
      externalIds: [{ source: 'openlibrary', id: 'OL5696525W' }],
      year: 2009,
      releaseDate: '2009-04-21',
      chrono: 5,
      note: 'Arthas from nine-year-old prince to Lich King, replaying scenes from the games through his eyes'
    },
    {
      id: 'warcraft-cataclysm',
      title: 'World of Warcraft: Cataclysm',
      year: 2010,
      releaseDate: '2010-12-07',
      chrono: 9,
      note: 'The dragon Deathwing returns from Deepholm, and his emergence reshapes much of Azeroth'
    },
    {
      id: 'warcraft-mists-pandaria',
      title: 'World of Warcraft: Mists of Pandaria',
      year: 2012,
      releaseDate: '2012-09-25',
      chrono: 10,
      note: 'Alliance and Horde meet the pandaren on Pandaria as Warchief Garrosh Hellscream drives the war'
    },
    {
      id: 'warcraft-hearthstone',
      title: 'Hearthstone',
      aliases: ['Hearthstone: Heroes of Warcraft'],
      year: 2014,
      releaseDate: '2014-03-11',
      spinOff: true,
      note: 'Free-to-play card game built from Warcraft\'s characters and relics'
    },
    {
      id: 'warcraft-warlords-draenor',
      title: 'World of Warcraft: Warlords of Draenor',
      year: 2014,
      releaseDate: '2014-11-13',
      chrono: 11,
      note: 'Garrosh escapes to Draenor 35 years in the past, before the rise of the Horde'
    },
    {
      id: 'warcraft-film',
      title: 'Warcraft',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '68735' }],
      year: 2016,
      releaseDate: '2016-06-10',
      chrono: 1,
      adaptation: true,
      note: 'Gul\'dan opens a portal to Azeroth while Lothar, Khadgar and Medivh face the first orc warband'
    },
    {
      id: 'warcraft-legion',
      title: 'World of Warcraft: Legion',
      year: 2016,
      releaseDate: '2016-08-30',
      chrono: 12,
      note: 'Gul\'dan opens a portal at the Tomb of Sargeras and the Burning Legion invades Azeroth'
    },
    {
      id: 'warcraft-battle-azeroth',
      title: 'World of Warcraft: Battle for Azeroth',
      year: 2018,
      releaseDate: '2018-08-14',
      chrono: 13,
      note: 'War returns after Sylvanas\'s Horde destroys Teldrassil; Kul Tiras and Zandalar open up'
    },
    {
      id: 'warcraft-3-reforged',
      title: 'Warcraft III: Reforged',
      year: 2020,
      releaseDate: '2020-01-28',
      chrono: 4,
      remake: true,
      note: 'Remaster of Reign of Chaos and The Frozen Throne with the same plot and updated graphics'
    },
    {
      id: 'warcraft-shadowlands',
      title: 'World of Warcraft: Shadowlands',
      year: 2020,
      releaseDate: '2020-11-23',
      chrono: 14,
      note: 'Opens the Shadowlands, the realm of the dead, ending against Zovaal the Jailer'
    },
    {
      id: 'warcraft-dragonflight',
      title: 'World of Warcraft: Dragonflight',
      year: 2022,
      releaseDate: '2022-11-28',
      chrono: 15,
      note: 'The Dragon Isles, ancestral home of dragonkind, reappear after 10,000 years hidden'
    },
    {
      id: 'warcraft-rumble',
      title: 'Warcraft Rumble',
      year: 2023,
      releaseDate: '2023-11-03',
      spinOff: true,
      note: 'Mobile tower defense and action strategy game set in the Warcraft universe'
    },
    {
      id: 'warcraft-war-within',
      title: 'World of Warcraft: The War Within',
      year: 2024,
      releaseDate: '2024-08-26',
      chrono: 16,
      note: 'First part of the Worldsoul Saga: Xal\'atath, Harbinger of the Void, threatens the underground Khaz Algar'
    },
    {
      id: 'warcraft-midnight',
      title: 'World of Warcraft: Midnight',
      year: 2026,
      releaseDate: '2026-03-02',
      chrono: 17,
      note: 'Second part of the Worldsoul Saga: Xal\'atath\'s Void host besieges the Sunwell in Quel\'Thalas'
    }
  ],
  characters: [
    {
      id: 'warcraft-arthas',
      name: 'Arthas Menethil',
      role: 'Prince of Lordaeron, the Lich King',
      portraitUrl: 'https://art.hearthstonejson.com/v1/512x/HERO_04b.jpg',
      appearsIn: [
        'warcraft-3',
        'warcraft-3-frozen-throne',
        'warcraft-wrath-lich-king',
        'warcraft-arthas-novel',
        'warcraft-3-reforged',
        'warcraft-hearthstone'
      ],
      blurb:
        'An idealistic paladin and crown prince who purges Stratholme, takes up the cursed sword Frostmourne in Northrend and becomes the Lich King.'
    },
    {
      id: 'warcraft-thrall',
      name: 'Thrall',
      role: 'Warchief of the Horde',
      portraitUrl: 'https://art.hearthstonejson.com/v1/512x/HERO_02.jpg',
      appearsIn: ['warcraft-3', 'warcraft-cataclysm', 'warcraft-3-reforged', 'warcraft-hearthstone'],
      blurb:
        'The orc shaman who joins forces with Jaina at the Prophet\'s urging in Warcraft III, and later steps down as Warchief of the Horde after the Cataclysm.'
    },
    {
      id: 'warcraft-jaina',
      name: 'Jaina Proudmoore',
      role: 'Archmage',
      portraitUrl: 'https://art.hearthstonejson.com/v1/512x/HERO_08.jpg',
      appearsIn: [
        'warcraft-3',
        'warcraft-3-reforged',
        'warcraft-mists-pandaria',
        'warcraft-battle-azeroth',
        'warcraft-hearthstone'
      ],
      blurb:
        'A human archmage who investigates the plague with Arthas, leaves him in disgust after Stratholme, and allies with Thrall in Kalimdor.'
    },
    {
      id: 'warcraft-sylvanas',
      name: 'Sylvanas Windrunner',
      role: 'Banshee Queen',
      portraitUrl: 'https://art.hearthstonejson.com/v1/512x/EX1_016.jpg',
      appearsIn: [
        'warcraft-3',
        'warcraft-3-frozen-throne',
        'warcraft-3-reforged',
        'warcraft-legion',
        'warcraft-battle-azeroth',
        'warcraft-shadowlands',
        'warcraft-hearthstone'
      ],
      blurb:
        'Ranger-General of Silvermoon, killed and raised as a banshee by Arthas; later Warchief of the Horde, she destroys Teldrassil and becomes a Shadowlands raid boss.'
    },
    {
      id: 'warcraft-illidan',
      name: 'Illidan Stormrage',
      role: 'The Betrayer',
      portraitUrl: 'https://art.hearthstonejson.com/v1/512x/HERO_10.jpg',
      appearsIn: [
        'warcraft-3',
        'warcraft-3-frozen-throne',
        'warcraft-3-reforged',
        'warcraft-burning-crusade',
        'warcraft-legion',
        'warcraft-hearthstone'
      ],
      blurb:
        'A demon hunter who rules Outland from the Black Temple and is slain there in The Burning Crusade; in Legion, Gul\'dan steals his body.'
    },
    {
      id: 'warcraft-medivh',
      name: 'Medivh',
      role: 'Last Guardian of Tirisfal',
      portraitUrl: 'https://art.hearthstonejson.com/v1/512x/HERO_08a.jpg',
      appearsIn: [
        'warcraft-orcs-humans',
        'warcraft-last-guardian',
        'warcraft-3',
        'warcraft-film',
        'warcraft-legion',
        'warcraft-hearthstone'
      ],
      blurb:
        'The Guardian possessed by Sargeras, who helps Gul\'dan open the Dark Portal, then returns in Warcraft III as the Prophet seeking redemption.'
    },
    {
      id: 'warcraft-garrosh',
      name: 'Garrosh Hellscream',
      role: 'Warchief of the Horde',
      portraitUrl: 'https://art.hearthstonejson.com/v1/512x/HERO_01.jpg',
      appearsIn: ['warcraft-mists-pandaria', 'warcraft-warlords-draenor', 'warcraft-hearthstone'],
      blurb:
        'Thrall\'s successor as Warchief, who embraces war with the Alliance, is overthrown after Pandaria and escapes to a past Draenor.'
    }
  ]
}
