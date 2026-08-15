// Final Fantasy — curated canon. Mainline I-XVI (XIV included on merit, XI
// excluded) + approved spin-offs: Tactics, Crisis Core, and the FF7 Remake
// project. No `chrono` on any entry: the stories are standalone, so the
// Story order pill hides itself for this franchise.
// Steam ids cover both classic ports and current relaunch SKUs where Steam
// re-listed a game (FF7: 39140 classic + 3837340 "2013 Edition" relaunch).
// All art URLs curl-verified 2026-08-15. MC values omitted for the pre-
// Metacritic classics (I-VI).

import type { FranchiseCfg } from './types'

export const FINAL_FANTASY: FranchiseCfg = {
  id: 'final-fantasy',
  name: 'Final Fantasy',
  short: 'Final Fantasy',
  color: '#4a7dcf',
  heroUrl:
    'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2909400/library_hero.jpg',
  studio: 'Square Enix',
  tagline: 'A new world, a new cast, the same name — fantasy reinvented sixteen times.',
  trivia: [
    {
      title: 'The desperate gamble',
      body: 'The 1987 original was named "Final" because Square was near bankruptcy and Hironobu Sakaguchi expected it to be his last game. It sold 400,000 copies and the joke is now on its fortieth year.\n\nAlmost uniquely among franchises, each numbered entry resets everything — world, cast, systems — keeping only chocobos, crystals, a man named Cid, and composer Nobuo Uematsu\'s shadow.'
    },
    {
      title: 'The VII gravity well',
      body: 'Final Fantasy VII (1997) did more to sell the PlayStation and mainstream the JRPG than any other release, and its gravity has never faded: a PSP prequel (Crisis Core), a film, and now a three-part remake saga that is itself a meditation on whether a story can escape its own canon.'
    },
    {
      title: 'Two MMOs, one redemption',
      body: 'FF XIV launched in 2010 in such a broken state that Square Enix apologized, destroyed the world in an in-game apocalypse, and relaunched it as A Realm Reborn (2013) — which grew into one of the most acclaimed MMOs ever made. That arc is why XIV earns its slot on this list while XI sits it out.'
    }
  ],
  entries: [
    {
      id: 'ff-1',
      title: 'Final Fantasy',
      externalIds: [{ source: 'steam', id: '1173770' }],
      year: 1987,
      bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1173770/library_hero.jpg',
      note: 'The desperate gamble itself'
    },
    {
      id: 'ff-2',
      title: 'Final Fantasy II',
      externalIds: [{ source: 'steam', id: '1173780' }],
      year: 1988,
      bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1173780/library_hero.jpg',
      note: 'Use a skill, grow a skill'
    },
    {
      id: 'ff-3',
      title: 'Final Fantasy III',
      aliases: ['Final Fantasy III (3D Remake)'],
      externalIds: [{ source: 'steam', id: '1173790' }],
      year: 1990,
      bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1173790/library_hero.jpg',
      note: 'The job system is born'
    },
    {
      id: 'ff-4',
      title: 'Final Fantasy IV',
      aliases: ['Final Fantasy IV (3D Remake)'],
      externalIds: [{ source: 'steam', id: '1173800' }],
      year: 1991,
      bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1173800/library_hero.jpg',
      note: 'ATB and melodrama arrive'
    },
    {
      id: 'ff-5',
      title: 'Final Fantasy V',
      externalIds: [{ source: 'steam', id: '1173810' }],
      year: 1992,
      bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1173810/library_hero.jpg',
      note: 'The job system, perfected'
    },
    {
      id: 'ff-6',
      title: 'Final Fantasy VI',
      externalIds: [{ source: 'steam', id: '1173820' }],
      year: 1994,
      bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1173820/library_hero.jpg',
      note: 'Kefka wins. For a while.'
    },
    {
      id: 'ff-7',
      title: 'Final Fantasy VII',
      externalIds: [
        { source: 'steam', id: '39140' },
        { source: 'steam', id: '3837340' }
      ],
      year: 1997,
      releaseDate: '1997-01-31',
      mc: 92,
      bgUrl:
        'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3837340/1ac9db3267d37c0a96a926fdd8b09dfa7831e044/ss_1ac9db3267d37c0a96a926fdd8b09dfa7831e044.1920x1080.jpg?t=1775108423',
      note: 'The one that sold the PlayStation'
    },
    {
      id: 'ff-tactics',
      title: 'Final Fantasy Tactics',
      aliases: [
        'Final Fantasy Tactics: The War of the Lions',
        'Final Fantasy Tactics - The Ivalice Chronicles'
      ],
      externalIds: [{ source: 'steam', id: '1004640' }],
      year: 1997,
      releaseDate: '1997-06-20',
      mc: 83,
      spinOff: true,
      bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1004640/library_hero.jpg',
      note: 'Ivalice — war, faith, and class betrayal'
    },
    {
      id: 'ff-8',
      title: 'Final Fantasy VIII',
      aliases: ['Final Fantasy VIII Remastered'],
      externalIds: [
        { source: 'steam', id: '39150' },
        { source: 'steam', id: '1026680' }
      ],
      year: 1999,
      mc: 90,
      bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1026680/library_hero.jpg',
      note: 'Mercenary school romance'
    },
    {
      id: 'ff-9',
      title: 'Final Fantasy IX',
      externalIds: [{ source: 'steam', id: '377840' }],
      year: 2000,
      mc: 94,
      bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/377840/library_hero.jpg',
      note: 'The love letter to the classics'
    },
    {
      id: 'ff-10',
      title: 'Final Fantasy X',
      aliases: ['Final Fantasy X/X-2 HD Remaster'],
      externalIds: [{ source: 'steam', id: '359870' }],
      year: 2001,
      mc: 92,
      bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/359870/library_hero.jpg',
      note: 'Spira and the endless pilgrimage'
    },
    {
      id: 'ff-12',
      title: 'Final Fantasy XII',
      aliases: ['Final Fantasy XII: The Zodiac Age'],
      externalIds: [{ source: 'steam', id: '595520' }],
      year: 2006,
      mc: 92,
      bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/595520/library_hero.jpg',
      note: 'Ivalice again — politics over prophecy'
    },
    {
      id: 'ff-crisis-core',
      title: 'Crisis Core: Final Fantasy VII',
      aliases: ['Crisis Core: Final Fantasy VII Reunion'],
      externalIds: [{ source: 'steam', id: '1608070' }],
      year: 2007,
      mc: 83,
      spinOff: true,
      bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1608070/library_hero.jpg',
      note: 'Zack Fair earns his cameo tears'
    },
    {
      id: 'ff-13',
      title: 'Final Fantasy XIII',
      externalIds: [{ source: 'steam', id: '292120' }],
      year: 2009,
      mc: 83,
      bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/292120/library_hero.jpg',
      note: 'The beautiful corridor'
    },
    {
      id: 'ff-14',
      title: 'Final Fantasy XIV',
      aliases: ['Final Fantasy XIV: A Realm Reborn', 'Final Fantasy XIV Online'],
      externalIds: [{ source: 'steam', id: '39210' }],
      year: 2013,
      mc: 86,
      bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/39210/library_hero.jpg',
      note: 'A Realm Reborn — the great redemption'
    },
    {
      id: 'ff-15',
      title: 'Final Fantasy XV',
      aliases: ['Final Fantasy XV Windows Edition'],
      externalIds: [{ source: 'steam', id: '637650' }],
      year: 2016,
      mc: 81,
      bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/637650/library_hero.jpg',
      note: 'A road trip with the boys'
    },
    {
      id: 'ff-7-remake',
      title: 'Final Fantasy VII Remake',
      aliases: ['Final Fantasy VII Remake Intergrade'],
      externalIds: [{ source: 'steam', id: '1462040' }],
      year: 2020,
      mc: 87,
      remake: true,
      bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1462040/library_hero.jpg',
      note: 'Midgar, expanded — and defiant of its own script'
    },
    {
      id: 'ff-16',
      title: 'Final Fantasy XVI',
      externalIds: [{ source: 'steam', id: '2515020' }],
      year: 2023,
      mc: 87,
      bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2515020/library_hero.jpg',
      note: 'Full action, Game of Thrones register'
    },
    {
      id: 'ff-7-rebirth',
      title: 'Final Fantasy VII Rebirth',
      externalIds: [{ source: 'steam', id: '2909400' }],
      year: 2024,
      mc: 92,
      remake: true,
      bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2909400/library_hero.jpg',
      note: 'Part two — the world opens up'
    }
  ],
  characters: [
    {
      id: 'ff-cloud',
      name: 'Cloud Strife',
      role: 'Protagonist (VII)',
      portraitUrl:
        'https://static.wikia.nocookie.net/finalfantasy/images/e/ec/Cloud_Strife_from_FFVII_Rebirth_promo_render.png/revision/latest/scale-to-width-down/417?cb=20251015150343',
      appearsIn: ['ff-7', 'ff-crisis-core', 'ff-7-remake', 'ff-7-rebirth', 'ff-tactics'],
      blurb:
        'The mercenary with the buster sword and a borrowed past — the most recognizable silhouette in JRPG history, and a study in identity built from someone else\'s memories.'
    },
    {
      id: 'ff-sephiroth',
      name: 'Sephiroth',
      role: 'Antagonist (VII)',
      portraitUrl:
        'https://static.wikia.nocookie.net/finalfantasy/images/a/af/Sephiroth_from_FFVII_Rebirth_promo_render.png/revision/latest?cb=20231231113824',
      appearsIn: ['ff-7', 'ff-crisis-core', 'ff-7-remake', 'ff-7-rebirth'],
      blurb:
        'One wing, seven-foot katana, a god complex with the receipts to almost back it. Gaming\'s most iconic villain, scored by his own choir.'
    },
    {
      id: 'ff-aerith',
      name: 'Aerith Gainsborough',
      role: 'The flower girl (VII)',
      portraitUrl:
        'https://static.wikia.nocookie.net/finalfantasy/images/1/1f/Aerith_Gainsborough_from_FFVII_Rebirth_promo_render.png/revision/latest?cb=20240304072103',
      appearsIn: ['ff-7', 'ff-crisis-core', 'ff-7-remake', 'ff-7-rebirth'],
      blurb:
        'The last of the Cetra, selling flowers in a city that killed the planet. The scene everyone knows is still the genre\'s defining gut-punch, 27 years on.'
    },
    {
      id: 'ff-tifa',
      name: 'Tifa Lockhart',
      role: 'The heart of AVALANCHE (VII)',
      portraitUrl:
        'https://static.wikia.nocookie.net/finalfantasy/images/2/21/Tifa_Lockhart_from_FFVII_Rebirth_promo_render.png/revision/latest?cb=20240304073043',
      appearsIn: ['ff-7', 'ff-7-remake', 'ff-7-rebirth'],
      blurb:
        'Bar owner, martial artist, and the keeper of Cloud\'s real history — the quiet anchor of the entire VII cast.'
    },
    {
      id: 'ff-squall',
      name: 'Squall Leonhart',
      role: 'Protagonist (VIII)',
      portraitUrl:
        'https://static.wikia.nocookie.net/finalfantasy/images/d/d2/Ff8-squall.jpg/revision/latest/scale-to-width-down/806?cb=20100603174959',
      appearsIn: ['ff-8'],
      blurb:
        'The gunblade-wielding lone wolf whose whole arc is learning that "whatever" is not a personality. The scar came from Seifer; the growth came later.'
    },
    {
      id: 'ff-tidus',
      name: 'Tidus',
      role: 'Protagonist (X)',
      portraitUrl:
        'https://static.wikia.nocookie.net/finalfantasy/images/2/20/FFX_Tidus_Art_Render.png/revision/latest/scale-to-width-down/569?cb=20240828002225',
      appearsIn: ['ff-10'],
      blurb:
        'A star athlete ripped out of his city into a drowned world\'s pilgrimage. His story is the rare one where the ending recontextualizes every hour before it.'
    },
    {
      id: 'ff-noctis',
      name: 'Noctis Lucis Caelum',
      role: 'Protagonist (XV)',
      portraitUrl:
        'https://static.wikia.nocookie.net/finalfantasy/images/4/4a/FFXV_Noctis.png/revision/latest?cb=20160818232513',
      appearsIn: ['ff-15'],
      blurb:
        'The prince on a road trip to his own wedding that becomes a funeral march. Ten years of development hell, salvaged by four boys and a car.'
    },
    {
      id: 'ff-clive',
      name: 'Clive Rosfield',
      role: 'Protagonist (XVI)',
      portraitUrl:
        'https://static.wikia.nocookie.net/finalfantasy/images/5/5a/FFXVI_Clive_Rosfield%28Young_Adult%29.png/revision/latest/scale-to-width-down/576?cb=20221209185315',
      appearsIn: ['ff-16'],
      blurb:
        'A shield turned avenger turned vessel of fire, carrying XVI\'s grim political fantasy on his back through three eras of his own life.'
    }
  ]
}
