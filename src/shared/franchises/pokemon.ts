// Pokémon — one row per paired main-series release (Red/Blue through
// Scarlet/Violet), the four remake pairs (FireRed/LeafGreen, HeartGold/
// SoulSilver, Omega Ruby/Alpha Sapphire, Brilliant Diamond/Shining Pearl),
// Let's Go, Legends: Arceus and Legends: Z-A, plus the original anime TV
// series and two Japanese-animated films: The First Movie and (per the
// user's own library, which already stores it as mediaType 'anime' with
// AniList id 528 rather than a TMDB movie — the general rule for Japanese
// animated films wins over this page's own description) the 1998 Mewtwo
// film. Pokémon Detective Pikachu is live-action and keeps its TMDB id.
// Third versions that are not separate task rows (Yellow, Crystal, Emerald,
// Platinum, Ultra Sun/Ultra Moon) fold in as aliases of their paired
// generation, the same rule this page already uses for enhanced editions
// elsewhere. No chrono and no route — the task calls for neither here, and
// the games have no shared continuity to order. No externalIds on any game:
// the series has never released on Steam, so library matching for the games
// is by title and version-name aliases only. The anime and First Movie use
// AniList ids (matching how the user's own library already stores them);
// Detective Pikachu uses TMDB. Character art is AniList's throughout — the
// anime cast and Mewtwo all come from the two anime/film entries already on
// this page, so no fandom fallback was needed. Dates from Wikipedia and
// AniList. All verified 2026-10-05.

import type { FranchiseCfg } from './types'

export const POKEMON: FranchiseCfg = {
  id: 'pokemon',
  name: 'Pokémon',
  short: 'Pokémon',
  color: '#ffcb05',
  heroUrl: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/527-69bO9vmmewWm.jpg',
  studio: 'Game Freak / Nintendo / The Pokémon Company',
  tagline: 'Gotta catch \'em all — then do it again next generation.',
  trivia: [
    {
      title: 'A bug-catching idea becomes the best-selling franchise ever',
      body: 'Satoshi Tajiri based the original Red and Green on his childhood hobby of insect collecting, designing a game about trading creatures specifically to take advantage of the Game Boy\'s link cable — two cartridges, two different exclusive sets of monsters, built to make trading necessary rather than optional. That trading hook has anchored every mainline pair since, through nine generations.'
    },
    {
      title: 'Same adventure, new region, every few years',
      body: 'Each numbered generation resets to a new region, a new roster of starters, and (mostly) a new rival and professor, while keeping the same core loop: travel, catch, battle Gym Leaders, challenge the regional Champion. The series has stayed one of the only major RPG franchises to pair every mainline release with simultaneous or near-simultaneous versions designed around trading between them.'
    },
    {
      title: 'Twenty-eight years of the same Saturday-morning anime',
      body: 'The anime has followed Ash Ketchum and Pikachu since 1997, through region after region until 2023, when Ash\'s story ended after more than a thousand episodes and Pokémon Horizons took over with new protagonists Liko and Roy. Team Rocket\'s Jessie, James and Meowth have been the show\'s recurring comic antagonists for nearly the entire run.'
    }
  ],
  entries: [
    {
      id: 'pkmn-rb',
      title: 'Pokémon Red and Blue',
      aliases: [
        'Pokémon Red',
        'Pokémon Blue',
        'Pokémon Red Version',
        'Pokémon Blue Version',
        'Pokémon Green',
        'Pokémon Green Version',
        'Pokémon Yellow',
        'Pokémon Yellow Version'
      ],
      year: 1996,
      releaseDate: '1996-02-27',
      note: 'Kanto, the first 151, and the start of "gotta catch \'em all" (Yellow folded in)'
    },
    {
      id: 'pkmn-anime',
      title: 'Pokémon',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '527' }],
      year: 1997,
      releaseDate: '1997-04-01',
      adaptation: true,
      note: 'Ash Ketchum and Pikachu\'s journey begins'
    },
    {
      id: 'pkmn-first-movie',
      title: 'Pokémon: The First Movie',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '528' }],
      year: 1998,
      releaseDate: '1998-07-18',
      adaptation: true,
      note: 'Mewtwo\'s origin and his battle against his own clones'
    },
    {
      id: 'pkmn-gs',
      title: 'Pokémon Gold and Silver',
      aliases: ['Pokémon Gold', 'Pokémon Silver', 'Pokémon Gold Version', 'Pokémon Silver Version', 'Pokémon Crystal', 'Pokémon Crystal Version'],
      year: 1999,
      releaseDate: '1999-11-21',
      note: 'Johto, three years later, with Kanto fully revisitable at the postgame (Crystal folded in)'
    },
    {
      id: 'pkmn-rs',
      title: 'Pokémon Ruby and Sapphire',
      aliases: ['Pokémon Ruby', 'Pokémon Sapphire', 'Pokémon Ruby Version', 'Pokémon Sapphire Version', 'Pokémon Emerald', 'Pokémon Emerald Version'],
      year: 2002,
      releaseDate: '2002-11-21',
      note: 'Hoenn, Double Battles, and Pokémon Contests (Emerald folded in)'
    },
    {
      id: 'pkmn-frlg',
      title: 'Pokémon FireRed and LeafGreen',
      aliases: ['Pokémon FireRed', 'Pokémon LeafGreen', 'Pokémon FireRed Version', 'Pokémon LeafGreen Version'],
      year: 2004,
      releaseDate: '2004-01-29',
      remake: true,
      note: 'Remakes of Red and Blue, on Game Boy Advance'
    },
    {
      id: 'pkmn-dp',
      title: 'Pokémon Diamond and Pearl',
      aliases: ['Pokémon Diamond', 'Pokémon Pearl', 'Pokémon Diamond Version', 'Pokémon Pearl Version', 'Pokémon Platinum', 'Pokémon Platinum Version'],
      year: 2006,
      releaseDate: '2006-09-28',
      note: 'Sinnoh and the jump to the Nintendo DS\'s dual screens (Platinum folded in)'
    },
    {
      id: 'pkmn-hgss',
      title: 'Pokémon HeartGold and SoulSilver',
      aliases: ['Pokémon HeartGold', 'Pokémon SoulSilver', 'Pokémon HeartGold Version', 'Pokémon SoulSilver Version'],
      year: 2009,
      releaseDate: '2009-09-12',
      remake: true,
      note: 'Remakes of Gold and Silver, with a walking Pokémon companion'
    },
    {
      id: 'pkmn-bw',
      title: 'Pokémon Black and White',
      aliases: ['Pokémon Black', 'Pokémon White', 'Pokémon Black Version', 'Pokémon White Version'],
      year: 2010,
      releaseDate: '2010-09-18',
      note: 'Unova, an entirely new regional Pokédex, and a more serious story about the ethics of catching Pokémon at all'
    },
    {
      id: 'pkmn-b2w2',
      title: 'Pokémon Black 2 and White 2',
      aliases: ['Pokémon Black 2', 'Pokémon White 2', 'Pokémon Black Version 2', 'Pokémon White Version 2'],
      year: 2012,
      releaseDate: '2012-06-23',
      note: 'Direct sequels set two years after Black and White, a first for the main series'
    },
    {
      id: 'pkmn-xy',
      title: 'Pokémon X and Y',
      aliases: ['Pokémon X', 'Pokémon Y'],
      year: 2013,
      releaseDate: '2013-10-12',
      note: 'Kalos and the series\' jump to full 3D models on the Nintendo 3DS'
    },
    {
      id: 'pkmn-oras',
      title: 'Pokémon Omega Ruby and Alpha Sapphire',
      aliases: ['Pokémon Omega Ruby', 'Pokémon Alpha Sapphire'],
      year: 2014,
      releaseDate: '2014-11-21',
      remake: true,
      note: 'Remakes of Ruby and Sapphire, adding Mega Evolution throughout'
    },
    {
      id: 'pkmn-sm',
      title: 'Pokémon Sun and Moon',
      aliases: ['Pokémon Sun', 'Pokémon Moon', 'Pokémon Ultra Sun', 'Pokémon Ultra Moon'],
      year: 2016,
      releaseDate: '2016-11-18',
      note: 'Alola, island trials replacing Gyms, and Z-Moves (Ultra Sun/Moon folded in)'
    },
    {
      id: 'pkmn-letsgo',
      title: "Pokémon: Let's Go, Pikachu! and Let's Go, Eevee!",
      aliases: ["Pokémon Let's Go, Pikachu!", "Pokémon Let's Go, Eevee!"],
      year: 2018,
      releaseDate: '2018-11-16',
      spinOff: true,
      note: 'A gentler, Kanto-set pair built around Pokémon GO\'s catching motion on Switch'
    },
    {
      id: 'pkmn-detective-pikachu',
      title: 'Pokémon Detective Pikachu',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '447404' }],
      year: 2019,
      releaseDate: '2019-05-03',
      adaptation: true,
      note: 'Live-action film: a talking, coffee-addicted Pikachu solves his former partner\'s disappearance'
    },
    {
      id: 'pkmn-swsh',
      title: 'Pokémon Sword and Shield',
      aliases: ['Pokémon Sword', 'Pokémon Shield'],
      year: 2019,
      releaseDate: '2019-11-15',
      note: 'Galar, Dynamax battles, and the Wild Area\'s open design'
    },
    {
      id: 'pkmn-bdsp',
      title: 'Pokémon Brilliant Diamond and Shining Pearl',
      aliases: ['Pokémon Brilliant Diamond', 'Pokémon Shining Pearl'],
      year: 2021,
      releaseDate: '2021-11-19',
      remake: true,
      note: 'Remakes of Diamond and Pearl, developed by ILCA rather than Game Freak'
    },
    {
      id: 'pkmn-legends-arceus',
      title: 'Pokémon Legends: Arceus',
      year: 2022,
      releaseDate: '2022-01-28',
      spinOff: true,
      note: 'Feudal-era Hisui (ancient Sinnoh), open fields, and real-time catching instead of random encounters'
    },
    {
      id: 'pkmn-sv',
      title: 'Pokémon Scarlet and Violet',
      aliases: ['Pokémon Scarlet', 'Pokémon Violet'],
      year: 2022,
      releaseDate: '2022-11-18',
      note: 'Paldea and the main series\' first fully open world'
    },
    {
      id: 'pkmn-legends-za',
      title: 'Pokémon Legends: Z-A',
      year: 2025,
      releaseDate: '2025-10-16',
      spinOff: true,
      note: 'A second Legends entry, set entirely within a single city, Lumiose'
    }
  ],
  characters: [
    {
      id: 'pkmn-ash',
      name: 'Ash Ketchum',
      role: 'Protagonist (anime)',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b2473-JDoo3I82Km4l.png',
      appearsIn: ['pkmn-anime', 'pkmn-first-movie'],
      blurb: 'Leaves Pallet Town at ten years old to become a Pokémon Master, and stayed the anime\'s protagonist for over a thousand episodes before the show finally moved past him.'
    },
    {
      id: 'pkmn-pikachu',
      name: 'Pikachu',
      role: 'Series mascot',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b3891-edgrZOgCJ9do.jpg',
      appearsIn: ['pkmn-rb', 'pkmn-letsgo', 'pkmn-anime', 'pkmn-first-movie'],
      blurb: 'Ash\'s starter and refusal-to-evolve icon, and the single image most associated with the franchise worldwide.'
    },
    {
      id: 'pkmn-misty',
      name: 'Misty',
      role: 'Ash\'s traveling companion (anime)',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b2909-wNDR5aaxwDdi.png',
      appearsIn: ['pkmn-anime', 'pkmn-first-movie'],
      blurb: 'A Water-type specialist and the Cerulean City Gym Leader, and one of the anime\'s longest-running companions.'
    },
    {
      id: 'pkmn-brock',
      name: 'Brock',
      role: 'Ash\'s traveling companion (anime)',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b3854-qMVUF2YmWYoW.png',
      appearsIn: ['pkmn-anime', 'pkmn-first-movie'],
      blurb: 'The Pewter City Gym Leader who leaves his family\'s gym in his siblings\' hands to travel, becoming the group\'s de facto cook and Pokémon caretaker.'
    },
    {
      id: 'pkmn-jessie',
      name: 'Jessie',
      role: 'Team Rocket (anime)',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b3935-m000RuoIVOGI.png',
      appearsIn: ['pkmn-anime'],
      blurb: 'One half of the Team Rocket duo that has chased Ash\'s Pikachu since episode one, usually blasting off in defeat by the end of each attempt.'
    },
    {
      id: 'pkmn-james',
      name: 'James',
      role: 'Team Rocket (anime)',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b3936-5sX4EZIY2BRU.png',
      appearsIn: ['pkmn-anime'],
      blurb: 'Jessie\'s partner in crime, a disowned heir who ran away from an arranged marriage into a life of low-stakes villainy.'
    },
    {
      id: 'pkmn-meowth',
      name: 'Meowth',
      role: 'Team Rocket (anime)',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b3937-qBtTAn2SZqhB.png',
      appearsIn: ['pkmn-anime'],
      blurb: 'The rare Pokémon who taught itself to speak and walk upright to join Team Rocket, acting as Jessie and James\' translator and third voice.'
    },
    {
      id: 'pkmn-mewtwo',
      name: 'Mewtwo',
      role: 'Genetically engineered Pokémon',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b5113-hDiwLUwrbz6q.png',
      appearsIn: ['pkmn-rb', 'pkmn-first-movie'],
      blurb: 'A clone of the mythical Mew created by scientists, whose rage at being treated as a weapon drives Pokémon\'s first and most enduring movie villain.'
    }
  ]
}
