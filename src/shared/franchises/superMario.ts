// Super Mario — mainline platformers only: Super Mario Bros. through Super
// Mario Bros. Wonder, plus the Lost Levels, both New series tetralogies, the
// Galaxy and 3D Land/World lines (Bowser's Fury is its own row, the way it
// shipped as a standalone-playable mode alongside the 3D World port) and
// Odyssey. Mario Kart, Mario Party and every Mario RPG (Super Mario RPG,
// Paper Mario, Mario & Luigi) are excluded — different genres, different
// pages. Adaptations: the 1993 live-action film, The Super Mario Bros. Movie
// (2023) and its 2026 sequel The Super Mario Galaxy Movie.
// No chrono/route: every mainline game is set on one continuous Mushroom
// Kingdom with no fixed internal timeline, so a story order would be
// editorial invention rather than curation.
// None of this franchise is on Steam (Nintendo-exclusive) and none of it
// exists in an importer the app has (no Nintendo source), so no entry here
// carries an externalId — library matching falls back to title/alias.
// Release dates are the original Japanese release except Super Mario Bros. 2
// (1988), whose Japan release was a reskinned Famicom Disk System game
// released a year earlier under a different name (Yume Koujou: Doki Doki
// Panic) and whose Japanese Mario-branded version (Super Mario USA) came out
// four years after the West — the row uses the 1988 North American date, the
// first time this specific game existed as a Mario title, and folds the 1992
// Japanese release in as an alias. New Super Mario Bros., New Super Mario
// Bros. Wii and Super Mario Galaxy 2 also shipped in North America days
// before Japan; their rows still use the Japanese date for consistency with
// the rest of this page, which makes no ordering difference since no other
// entry falls in the gap. Dates verified against Wikipedia infoboxes and
// TMDB, movie ids from TMDB, 2026-10-05. Hero/character art is official
// Nintendo asset-CDN and Super Mario Wiki's own image host (mario.wiki.gallery
// — not Fandom, no Referer gate; Nintendo is not on Steam/AniList); every URL
// curl-verified the same day.

import type { FranchiseCfg } from './types'

const MW = 'https://mario.wiki.gallery/images'

export const SUPER_MARIO: FranchiseCfg = {
  id: 'super-mario',
  name: 'Super Mario',
  short: 'Super Mario',
  color: '#e4000f',
  heroUrl:
    'https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_1.5/ncom/en_US/merchandising/feature-banner/Current%20Events/Nintendo%20Direct%20Mini/2023/super-mario-bros-wonder/1920x1080_eShop',
  studio: 'Nintendo EAD / EPD',
  tagline: 'Jump, stomp, grab the flag — forty years of the same perfect idea.',
  trivia: [
    {
      title: 'A plumber by accident',
      body: 'Mario started as "Jumpman" in 1981\'s Donkey Kong, a carpenter with no name. Nintendo of America\'s staff thought he resembled their landlord, Mario Segale, and the name stuck; the cap, mustache and overalls exist because the 1981 hardware\'s tiny sprites could not show hair, a mouth or arm movement clearly.\n\nSuper Mario Bros. (1985) was not Mario\'s debut, but it is the game that invented the side-scrolling platformer as a commercial genre and sold the Famicom/NES into tens of millions of homes.'
    },
    {
      title: 'Two games called Super Mario Bros. 2',
      body: 'The Super Mario Bros. 2 Western players got in 1988 is a reskin of Yume Koujou: Doki Doki Panic, a Japan-only Fuji TV tie-in game — Nintendo thought the real Japanese sequel (today\'s Lost Levels) was too punishingly hard for a Western audience. Japan eventually got the Western game too, in 1992, retitled Super Mario USA.'
    },
    {
      title: 'The jump between dimensions, twice',
      body: 'Super Mario 64 (1996) invented the analog-stick 3D platformer in one step and is still taught as a design reference for camera and movement feel. Super Mario Galaxy (2007) did it again eleven years later by discarding a flat horizon for sphere-based planetoid gravity, then Super Mario Odyssey (2017) added Cappy\'s possession mechanic as a third reinvention of what "collect-a-thon" could mean.'
    }
  ],
  entries: [
    {
      id: 'mario-smb1',
      title: 'Super Mario Bros.',
      year: 1985,
      releaseDate: '1985-09-13',
      note: 'World 1-1: the template for every side-scrolling platformer after it'
    },
    {
      id: 'mario-lost-levels',
      title: 'Super Mario Bros.: The Lost Levels',
      year: 1986,
      releaseDate: '1986-06-03',
      note: 'Japan-only sequel, infamous for poison mushrooms and wind levels'
    },
    {
      id: 'mario-smb2',
      title: 'Super Mario Bros. 2',
      aliases: ['Super Mario USA', 'Super Mario Bros. USA'],
      year: 1988,
      releaseDate: '1988-10-09',
      note: 'A reskinned Yume Koujou: Doki Doki Panic — Mario, Luigi, Peach and Toad can each pick up and throw vegetables'
    },
    {
      id: 'mario-smb3',
      title: 'Super Mario Bros. 3',
      year: 1988,
      releaseDate: '1988-10-23',
      note: 'The world map, the raccoon suit, and eight Koopaling-held kingdoms'
    },
    {
      id: 'mario-smw',
      title: 'Super Mario World',
      year: 1990,
      releaseDate: '1990-11-21',
      note: 'Yoshi\'s debut and the SNES launch game that built Dinosaur Land'
    },
    {
      id: 'mario-film-1993',
      title: 'Super Mario Bros.',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '9607' }],
      year: 1993,
      releaseDate: '1993-05-28',
      adaptation: true,
      note: 'Live-action cult oddity: a dinosaur-ruled dystopian Koopa city under a parallel Manhattan'
    },
    {
      id: 'mario-sm64',
      title: 'Super Mario 64',
      year: 1996,
      releaseDate: '1996-06-23',
      note: 'The first 3D Mario — Peach\'s Castle as a hub full of doors into paintings'
    },
    {
      id: 'mario-sunshine',
      title: 'Super Mario Sunshine',
      year: 2002,
      releaseDate: '2002-07-19',
      note: 'Isle Delfino, the water-jet FLUDD, and Bowser Jr.\'s first appearance'
    },
    {
      id: 'mario-nsmb',
      title: 'New Super Mario Bros.',
      year: 2006,
      releaseDate: '2006-05-25',
      note: 'Returns to 2D side-scrolling for the first time since Super Mario World'
    },
    {
      id: 'mario-galaxy',
      title: 'Super Mario Galaxy',
      year: 2007,
      releaseDate: '2007-11-01',
      note: 'Planetoid gravity and the Comet Observatory hub'
    },
    {
      id: 'mario-nsmb-wii',
      title: 'New Super Mario Bros. Wii',
      year: 2009,
      releaseDate: '2009-12-03',
      note: 'Four-player simultaneous 2D Mario for the first time'
    },
    {
      id: 'mario-galaxy-2',
      title: 'Super Mario Galaxy 2',
      year: 2010,
      releaseDate: '2010-05-27',
      note: 'Yoshi returns to space, alongside the Cloud and Rock Mushroom power-ups'
    },
    {
      id: 'mario-3d-land',
      title: 'Super Mario 3D Land',
      year: 2011,
      releaseDate: '2011-11-03',
      note: 'The first handheld 3D Mario, built around short stages and the Tanooki tail'
    },
    {
      id: 'mario-nsmb-2',
      title: 'New Super Mario Bros. 2',
      year: 2012,
      releaseDate: '2012-07-28',
      note: 'Gold Mushrooms, Gold Flowers, and an entire game built around coin totals'
    },
    {
      id: 'mario-nsmb-u',
      title: 'New Super Mario Bros. U',
      aliases: ['New Super Mario Bros. U Deluxe'],
      year: 2012,
      releaseDate: '2012-12-08',
      note: 'Wii U launch title; the Deluxe rerelease added Luigi U\'s campaign and Toadette'
    },
    {
      id: 'mario-3d-world',
      title: 'Super Mario 3D World',
      year: 2013,
      releaseDate: '2013-11-21',
      note: 'Four-player 3D Mario and the Cat Suit, in Sprixie Kingdom'
    },
    {
      id: 'mario-odyssey',
      title: 'Super Mario Odyssey',
      year: 2017,
      releaseDate: '2017-10-27',
      note: 'Cappy lets Mario possess enemies and objects across a dozen open Kingdoms'
    },
    {
      id: 'mario-3d-world-bowsers-fury',
      title: 'Bowser\'s Fury',
      aliases: ['Super Mario 3D World + Bowser\'s Fury'],
      year: 2021,
      releaseDate: '2021-02-12',
      spinOff: true,
      note: 'Open-area expansion bundled with the Switch port of 3D World: Giant Cat Mario vs. a corrupted Bowser'
    },
    {
      id: 'mario-film-2023',
      title: 'The Super Mario Bros. Movie',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '502356' }],
      year: 2023,
      releaseDate: '2023-04-05',
      adaptation: true,
      note: 'Illumination\'s animated film: Brooklyn plumbers Mario and Luigi are pulled into the Mushroom Kingdom, and Luigi into Bowser\'s Dark Lands'
    },
    {
      id: 'mario-wonder',
      title: 'Super Mario Bros. Wonder',
      year: 2023,
      releaseDate: '2023-10-20',
      note: 'Wonder Flowers warp each level into something stranger; the Elephant Fruit and talking Flower Kingdom'
    },
    {
      id: 'mario-film-2026',
      title: 'The Super Mario Galaxy Movie',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '1226863' }],
      year: 2026,
      releaseDate: '2026-04-01',
      adaptation: true,
      note: 'Sequel film that takes Mario and his friends into space, drawing on Super Mario Galaxy'
    }
  ],
  characters: [
    {
      id: 'mario-mario',
      name: 'Mario',
      role: 'The plumber himself',
      portraitUrl: `${MW}/thumb/0/0d/MarioAlternateJamboreeRender.png/1200px-MarioAlternateJamboreeRender.png`,
      appearsIn: [
        'mario-smb1', 'mario-lost-levels', 'mario-smb2', 'mario-smb3', 'mario-smw',
        'mario-film-1993', 'mario-sm64', 'mario-sunshine', 'mario-nsmb', 'mario-galaxy',
        'mario-nsmb-wii', 'mario-galaxy-2', 'mario-3d-land', 'mario-nsmb-2', 'mario-nsmb-u',
        'mario-3d-world', 'mario-odyssey', 'mario-3d-world-bowsers-fury', 'mario-film-2023',
        'mario-wonder', 'mario-film-2026'
      ],
      blurb: 'Red cap, blue overalls, impossible jump height. The most recognizable video game character ever made, and the one constant across forty years of the series.'
    },
    {
      id: 'mario-luigi',
      name: 'Luigi',
      role: 'The taller, greener brother',
      portraitUrl: `${MW}/7/76/SMPJ_Luigi.png`,
      appearsIn: [
        'mario-smb1', 'mario-lost-levels', 'mario-smb2', 'mario-smb3', 'mario-smw',
        'mario-film-1993', 'mario-sunshine', 'mario-nsmb-wii', 'mario-nsmb-u',
        'mario-3d-world', 'mario-odyssey', 'mario-film-2023', 'mario-wonder'
      ],
      blurb: 'Player 2 since the arcade days, with a higher jump and a lower profile; the co-op 2D games and 3D World make him a full partner.'
    },
    {
      id: 'mario-peach',
      name: 'Princess Peach',
      role: 'Ruler of the Mushroom Kingdom',
      portraitUrl: `${MW}/7/7c/Peach_Posing_Alt_3D_Artwork.png`,
      appearsIn: [
        'mario-smb1', 'mario-lost-levels', 'mario-smb2', 'mario-smb3', 'mario-smw',
        'mario-film-1993', 'mario-sm64', 'mario-sunshine', 'mario-galaxy', 'mario-odyssey',
        'mario-film-2023', 'mario-wonder', 'mario-film-2026'
      ],
      blurb: 'Kidnapped so often it became the series\' running joke, and playable since Super Mario Bros. 2 — with a float no one else in the cast has.'
    },
    {
      id: 'mario-bowser',
      name: 'Bowser',
      role: 'King of the Koopas',
      portraitUrl: `${MW}/c/c7/SMBW_Artwork_Bowser.png`,
      appearsIn: [
        'mario-smb1', 'mario-lost-levels', 'mario-smb3', 'mario-smw', 'mario-film-1993',
        'mario-sm64', 'mario-sunshine', 'mario-galaxy', 'mario-nsmb-wii', 'mario-galaxy-2',
        'mario-odyssey', 'mario-3d-world-bowsers-fury', 'mario-film-2023', 'mario-wonder'
      ],
      blurb: 'Horns, shell, breath of fire, one castle he keeps losing. Every mainline game ends with some version of the same fight, and it has never gotten old.'
    },
    {
      id: 'mario-yoshi',
      name: 'Yoshi',
      role: 'Dinosaur mount',
      portraitUrl: `${MW}/5/5f/SMPJ_Yoshi.png`,
      appearsIn: ['mario-smw', 'mario-sunshine', 'mario-galaxy', 'mario-galaxy-2', 'mario-3d-world', 'mario-odyssey', 'mario-wonder'],
      blurb: 'Introduced in Super Mario World as a dinosaur Mario could ride and feed enemies to. Has had an entire sub-series of his own since.'
    },
    {
      id: 'mario-bowser-jr',
      name: 'Bowser Jr.',
      role: 'Bowser\'s son and heir',
      portraitUrl: `${MW}/f/f5/SMBW_Bowser_Jr_Artwork_1.png`,
      appearsIn: ['mario-sunshine', 'mario-galaxy', 'mario-3d-world-bowsers-fury', 'mario-film-2026'],
      blurb: 'Debuted in Sunshine framing Mario for his father\'s graffiti crimes. In Bowser\'s Fury he teams up with Mario to save his own father.'
    },
    {
      id: 'mario-toad',
      name: 'Toad',
      role: 'Mushroom Kingdom retainer',
      portraitUrl: `${MW}/5/53/SMG1%2BSMG2_Toad.png`,
      appearsIn: ['mario-smb2', 'mario-sm64', 'mario-galaxy', 'mario-nsmb-u', 'mario-3d-world', 'mario-wonder'],
      blurb: 'The "our princess is in another castle" guy, multiplied into an entire species. Playable in the New Super Mario Bros. games and 3D World.'
    }
  ]
}
