// Tales of — all seventeen "mothership" entries Wikipedia's own series article
// counts from Phantasia to Arise (excluding "Escort" titles like Tales of the
// World, Tales of Vs. and direct side-sequels such as Dawn of the New World),
// plus the four notable anime: the first arc of the Symphonia OVA, the Abyss
// TV series, both Zestiria the X seasons, and the Vesperia: First Strike film
// (a Japanese animated film, so it is mediaType 'anime' with an AniList id
// here, not a TMDB movie). The Symphonia OVA's later two arcs (Tethe'alla,
// covering the direct sequel Dawn of the New World, and the finale) are
// excluded along with that non-mothership sequel itself. No chrono — these
// are standalone worlds — and no route; the task asks for neither here. Steam
// only carries eight of the seventeen games, all as remasters/definitive
// editions: Symphonia, Vesperia (Definitive Edition), Berseria (plus a
// separate Remastered listing as an extra id), Zestiria, Graces f Remastered,
// Xillia Remastered, Eternia Remastered and Arise; the other nine mothership
// games never left PlayStation/Wii/handheld platforms. Character art is
// AniList's wherever an anime adaptation exists (Symphonia, Abyss, Zestiria);
// Yuri Lowell, Velvet Crowe and Alphen — none of whom have an anime — come
// from the Aselia Tales of Wiki (Fandom), the series' main fan wiki. Dates
// from Steam, AniList and Wikipedia. All verified 2026-10-05.

import type { FranchiseCfg } from './types'

export const TALES_OF: FranchiseCfg = {
  id: 'tales-of',
  name: 'Tales of',
  short: 'Tales of',
  color: '#2f8f6e',
  heroUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/740130/library_hero.jpg',
  studio: 'Bandai Namco (Tales Studio)',
  tagline: 'A new cast, a new world, the same "Tales of" promise every time.',
  trivia: [
    {
      title: 'Thirty years, one format',
      body: 'Tales of Phantasia began the series on the Super Famicom in 1995 with the "Linear Motion Battle System" — real-time, side-on combat that replaced the genre\'s usual turn-based menus. Every mothership entry since has kept real-time action combat as the one constant, even as each game resets its cast, world and plot from zero.'
    },
    {
      title: 'Skits: the series\' own invention',
      body: 'Tales games are known for "skits" — optional, portrait-based side conversations the party has between main scenes, used for jokes, worldbuilding and character chemistry that the main plot has no room for. The format has been a series signature since the earliest PlayStation entries and is one of the few mechanical throughlines connecting games with nothing else in common.'
    },
    {
      title: 'A production line, not one studio',
      body: 'Namco Tales Studio produced the series for most of its PlayStation 2/3 era, developed by rotating teams rather than one fixed studio, which is why tone and combat feel can swing hard between neighboring entries (compare Vesperia\'s noir-tinged class conflict to Graces\' friendship-first teen drama). Bandai Namco absorbed Tales Studio directly in 2011, around the time of Xillia.'
    }
  ],
  entries: [
    {
      id: 'tales-phantasia',
      title: 'Tales of Phantasia',
      year: 1995,
      releaseDate: '1995-12-15',
      note: 'The series\' start, on the Super Famicom: Cless Alvein chases the sorcerer Dhaos through time'
    },
    {
      id: 'tales-destiny',
      title: 'Tales of Destiny',
      year: 1997,
      releaseDate: '1997-12-23',
      note: 'The first Tales game released outside Japan'
    },
    {
      id: 'tales-eternia',
      title: 'Tales of Eternia',
      aliases: ['Tales of Eternia Remastered'],
      externalIds: [{ source: 'steam', id: '3470960' }],
      year: 2000,
      releaseDate: '2000-11-30',
      note: 'Two worlds, Inferia and Celestia, drifting apart'
    },
    {
      id: 'tales-destiny2',
      title: 'Tales of Destiny 2',
      year: 2002,
      releaseDate: '2002-11-28',
      note: 'A direct, Japan-only sequel to Tales of Destiny, eighteen years later'
    },
    {
      id: 'tales-symphonia',
      title: 'Tales of Symphonia',
      externalIds: [{ source: 'steam', id: '372360' }],
      year: 2003,
      releaseDate: '2003-08-29',
      note: 'Lloyd Irving and the journey of regeneration between the worlds of Sylvarant and Tethe\'alla'
    },
    {
      id: 'tales-rebirth',
      title: 'Tales of Rebirth',
      year: 2004,
      releaseDate: '2004-12-16',
      note: 'Never officially localized outside Asia'
    },
    {
      id: 'tales-legendia',
      title: 'Tales of Legendia',
      year: 2005,
      releaseDate: '2005-08-25',
      note: 'Set almost entirely aboard the living ship-world Legacy'
    },
    {
      id: 'tales-abyss',
      title: 'Tales of the Abyss',
      year: 2005,
      releaseDate: '2005-12-15',
      note: 'Luke fon Fabre, a replica with no memory of being one, and the Score that governs the world'
    },
    {
      id: 'tales-symphonia-ova',
      title: 'Tales of Symphonia: The Animation - Sylvarant Arc',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '1731' }],
      year: 2007,
      releaseDate: '2007-06-08',
      adaptation: true,
      note: 'OVA adaptation of the game\'s first half'
    },
    {
      id: 'tales-innocence',
      title: 'Tales of Innocence',
      year: 2007,
      releaseDate: '2007-12-06',
      note: 'A world where everyone is born without the ability to use magic'
    },
    {
      id: 'tales-vesperia',
      title: 'Tales of Vesperia',
      aliases: ['Tales of Vesperia: Definitive Edition'],
      externalIds: [{ source: 'steam', id: '738540' }],
      year: 2008,
      releaseDate: '2008-08-07',
      note: 'Yuri Lowell takes the law into his own hands in a world rationed by Blastia energy'
    },
    {
      id: 'tales-abyss-anime',
      title: 'Tales of the Abyss',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '4884' }],
      year: 2008,
      releaseDate: '2008-10-03',
      adaptation: true,
      note: 'Full 26-episode TV adaptation'
    },
    {
      id: 'tales-hearts',
      title: 'Tales of Hearts',
      year: 2008,
      releaseDate: '2008-12-18',
      note: 'A journey to repair a shattered Spiria, the core of a person\'s heart'
    },
    {
      id: 'tales-vesperia-film',
      title: 'Tales of Vesperia: The First Strike',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '6046' }],
      year: 2009,
      releaseDate: '2009-10-03',
      adaptation: true,
      note: 'Prequel film: how Yuri and Flynn first met in the Imperial Knights'
    },
    {
      id: 'tales-graces',
      title: 'Tales of Graces',
      aliases: ['Tales of Graces f', 'Tales of Graces f Remastered'],
      externalIds: [{ source: 'steam', id: '2530980' }],
      year: 2009,
      releaseDate: '2009-12-10',
      note: 'Childhood friends reunited years later by a kingdom\'s succession crisis'
    },
    {
      id: 'tales-xillia',
      title: 'Tales of Xillia',
      aliases: ['Tales of Xillia Remastered'],
      externalIds: [{ source: 'steam', id: '2246670' }],
      year: 2011,
      releaseDate: '2011-09-08',
      note: 'Two protagonists, Jude and Milla, on opposite sides of a war over spirit energy'
    },
    {
      id: 'tales-xillia2',
      title: 'Tales of Xillia 2',
      year: 2012,
      releaseDate: '2012-11-01',
      note: 'Direct sequel starring a new protagonist, Ludger, a year after the first game'
    },
    {
      id: 'tales-zestiria',
      title: 'Tales of Zestiria',
      externalIds: [{ source: 'steam', id: '351970' }],
      year: 2015,
      releaseDate: '2015-01-22',
      note: 'Sorey, the Shepherd, and his bond with the seraph Mikleo'
    },
    {
      id: 'tales-zestiria-x-s1',
      title: 'Tales of Zestiria the X',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '21221' }],
      year: 2016,
      releaseDate: '2016-07-03',
      adaptation: true,
      note: 'First season, adapting the game\'s opening chapters'
    },
    {
      id: 'tales-berseria',
      title: 'Tales of Berseria',
      aliases: ['Tales of Berseria Remastered'],
      externalIds: [{ source: 'steam', id: '429660' }],
      year: 2016,
      releaseDate: '2016-08-18',
      note: 'A prequel to Zestiria: Velvet Crowe\'s revenge, years before the Shepherd\'s era'
    },
    {
      id: 'tales-zestiria-x-s2',
      title: 'Tales of Zestiria the X Season 2',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '97645' }],
      year: 2017,
      releaseDate: '2017-01-08',
      adaptation: true,
      note: 'Concludes the TV adaptation'
    },
    {
      id: 'tales-arise',
      title: 'Tales of ARISE',
      externalIds: [{ source: 'steam', id: '740130' }],
      year: 2021,
      releaseDate: '2021-09-10',
      note: 'Alphen and Shionne, an enslaved planet, and a visual overhaul for the series'
    }
  ],
  characters: [
    {
      id: 'tales-lloyd',
      name: 'Lloyd Irving',
      role: 'Protagonist (Symphonia)',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b2898-QCNHmFC4M8Il.png',
      appearsIn: ['tales-symphonia', 'tales-symphonia-ova'],
      blurb: 'An easygoing swordsman who sets out on the Journey of Regeneration and ends up questioning whether saving his own world has to mean destroying another.'
    },
    {
      id: 'tales-luke',
      name: 'Luke fon Fabre',
      role: 'Protagonist (Tales of the Abyss)',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b5107-3pQZCOHwuZLn.png',
      appearsIn: ['tales-abyss', 'tales-abyss-anime'],
      blurb: 'A spoiled noble\'s son who discovers he is a replica with seven years of fabricated memories, and spends the story earning an identity that is actually his own.'
    },
    {
      id: 'tales-jade',
      name: 'Jade Curtiss',
      role: 'Colonel, ally (Tales of the Abyss)',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b5111-tmTl9AR1ISJK.png',
      appearsIn: ['tales-abyss', 'tales-abyss-anime'],
      blurb: 'A sardonic military strategist whose cheerful cruelty hides genuine guilt over the fomicry research he helped pioneer.'
    },
    {
      id: 'tales-yuri',
      name: 'Yuri Lowell',
      role: 'Protagonist (Vesperia)',
      portraitUrl: 'https://static.wikia.nocookie.net/aselia/images/7/77/Yuri_Lowell_%28ToV%29.png/revision/latest?cb=20250629152400',
      appearsIn: ['tales-vesperia', 'tales-vesperia-film'],
      blurb: 'A former Imperial Knight who decides the law protects the wrong people, and starts enforcing his own sense of justice instead.'
    },
    {
      id: 'tales-sorey',
      name: 'Sorey',
      role: 'Protagonist, the Shepherd (Zestiria)',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/89640-KXFl8pVmgSCI.jpg',
      appearsIn: ['tales-zestiria', 'tales-zestiria-x-s1', 'tales-zestiria-x-s2'],
      blurb: 'Raised by seraphim rather than humans, he becomes the Shepherd tasked with purifying the malevolence poisoning the world — at a cost the games and anime both let him actually pay.'
    },
    {
      id: 'tales-mikleo',
      name: 'Mikleo',
      role: 'Water seraph, Sorey\'s closest friend (Zestiria)',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/89653-RatgxsCjlgZ6.png',
      appearsIn: ['tales-zestiria', 'tales-zestiria-x-s1', 'tales-zestiria-x-s2'],
      blurb: 'Sorey\'s childhood friend and the voice of caution in his ear, whose bond with Sorey the story treats as its real emotional center.'
    },
    {
      id: 'tales-velvet',
      name: 'Velvet Crowe',
      role: 'Protagonist (Berseria)',
      portraitUrl: 'https://static.wikia.nocookie.net/aselia/images/6/63/Velvet_Crowe_%28ToB%29_Artwork.png/revision/latest?cb=20251119232245',
      appearsIn: ['tales-berseria'],
      blurb: 'Imprisoned for three years after a betrayal that cost her family, she breaks out for revenge in a prequel that deliberately plays against the series\' usual heroic tone.'
    },
    {
      id: 'tales-alphen',
      name: 'Alphen',
      role: 'Protagonist (Arise)',
      portraitUrl: 'https://static.wikia.nocookie.net/aselia/images/5/55/Alphen_%28ToA%29.png/revision/latest?cb=20190615162711',
      appearsIn: ['tales-arise'],
      blurb: 'An enslaved Dahnan who cannot feel pain behind his iron mask, whose partnership with the Renan noble Shionne drives a story built explicitly around colonization and liberation.'
    }
  ]
}
