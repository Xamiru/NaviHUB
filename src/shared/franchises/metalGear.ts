// Metal Gear — curated canon. Mainline + Rising (approved); Acid/Portable
// Ops/Survive-tier spin-offs deliberately excluded. Story order follows the
// in-universe timeline (Snake Eater 1964 → ... → Rising 2018); Delta shares
// Snake Eater's slot and sits directly after it.
// bgUrl/portraitUrl/externalIds are verified at authoring time (see
// tests/franchises.test.ts for the structural guards).
// MG1 and MG2 share ONE Steam product ("METAL GEAR & METAL GEAR 2", appid
// 2131680); the matcher consumes a library row once, so that bundle row
// lights up mg-1 only — a known, accepted limitation.

import type { FranchiseCfg } from './types'

export const METAL_GEAR: FranchiseCfg = {
  id: 'metal-gear',
  name: 'Metal Gear',
  short: 'Metal Gear',
  color: '#88a06a',
  heroUrl:
    'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/287700/library_hero.jpg',
  studio: 'Konami (Kojima Productions)',
  tagline: 'Tactical espionage action — war economy, nuclear deterrence, and cardboard boxes.',
  trivia: [
    {
      title: 'The Kojima era',
      body: 'Hideo Kojima wrote and directed nearly every mainline entry from the 1987 MSX2 original through The Phantom Pain — a 28-year run under one auteur that is almost unique in game history.\n\nThe split with Konami in 2015 ended it: Metal Gear Solid Delta (2025) is the first mainline release made without him.'
    },
    {
      title: 'Genre maker',
      body: 'Metal Gear (1987) effectively invented the stealth genre on hardware that could not handle open combat — hiding was a workaround that became the point. Metal Gear Solid (1998) then did the same for cinematic direction in 3D games: codec drama, fourth-wall breaks (Psycho Mantis reading your memory card), and a sniper duel you can win by waiting a week.'
    },
    {
      title: 'One long timeline',
      body: 'The saga spans 1964 (Snake Eater) to 2018 (Rising), telling the fall of Big Boss and the rise of Solid Snake in reverse-interleaved order — half the series is prequels. Release order and story order disagree so thoroughly that the page has a toggle for exactly this.'
    }
  ],
  entries: [
    {
      id: 'mg-1',
      title: 'Metal Gear',
      aliases: ['Metal Gear - Master Collection Version', 'Metal Gear & Metal Gear 2: Solid Snake'],
      externalIds: [{ source: 'steam', id: '2131680' }],
      year: 1987,
      chrono: 6,
      bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2131680/library_hero.jpg',
      note: 'MSX2 — where Outer Heaven fell'
    },
    {
      id: 'mg-2',
      title: 'Metal Gear 2: Solid Snake',
      aliases: ['Metal Gear 2 Solid Snake - Master Collection Version'],
      externalIds: [{ source: 'steam', id: '2131680' }],
      year: 1990,
      chrono: 7,
      bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2131680/library_hero.jpg',
      note: 'MSX2 — Zanzibar Land'
    },
    {
      id: 'mg-mgs1',
      title: 'Metal Gear Solid',
      aliases: [
        'Metal Gear Solid - Master Collection Version',
        'Metal Gear Solid: Integral',
        'Metal Gear Solid: The Twin Snakes'
      ],
      externalIds: [{ source: 'steam', id: '2131630' }],
      year: 1998,
      chrono: 8,
      mc: 94,
      bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2131630/library_hero.jpg',
      note: 'Shadow Moses'
    },
    {
      id: 'mg-mgs2',
      title: 'Metal Gear Solid 2: Sons of Liberty',
      aliases: [
        'Metal Gear Solid 2: Substance',
        'Metal Gear Solid 2: Sons of Liberty - Master Collection Version'
      ],
      externalIds: [{ source: 'steam', id: '2131640' }],
      year: 2001,
      chrono: 9,
      mc: 96,
      bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2131640/library_hero.jpg',
      note: 'Big Shell'
    },
    {
      id: 'mg-mgs3',
      title: 'Metal Gear Solid 3: Snake Eater',
      aliases: [
        'Metal Gear Solid 3: Subsistence',
        'Metal Gear Solid 3: Snake Eater - Master Collection Version',
        'Metal Gear Solid: Snake Eater 3D'
      ],
      externalIds: [{ source: 'steam', id: '2131650' }],
      year: 2004,
      chrono: 1,
      mc: 91,
      bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2131650/library_hero.jpg',
      note: '1964 — where it all begins'
    },
    {
      id: 'mg-mgs4',
      title: 'Metal Gear Solid 4: Guns of the Patriots',
      year: 2008,
      chrono: 10,
      mc: 94,
      bgUrl: 'https://static.wikia.nocookie.net/metalgear/images/9/92/Metal_gear_solid4_12.jpg',
      note: 'PS3 only — Old Snake'
    },
    {
      id: 'mg-peace-walker',
      title: 'Metal Gear Solid: Peace Walker',
      aliases: ['Metal Gear Solid: Peace Walker HD Edition'],
      year: 2010,
      chrono: 3,
      mc: 89,
      bgUrl: 'https://static.wikia.nocookie.net/metalgear/images/9/92/PW.jpg',
      note: 'Costa Rica, 1974'
    },
    {
      id: 'mg-rising',
      title: 'Metal Gear Rising: Revengeance',
      externalIds: [{ source: 'steam', id: '235460' }],
      year: 2013,
      chrono: 11,
      mc: 83,
      spinOff: true,
      bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/235460/library_hero.jpg',
      note: 'PlatinumGames — Raiden unchained'
    },
    {
      id: 'mg-ground-zeroes',
      title: 'Metal Gear Solid V: Ground Zeroes',
      externalIds: [{ source: 'steam', id: '311340' }],
      year: 2014,
      chrono: 4,
      mc: 75,
      bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/311340/page_bg_generated_v6b.jpg',
      note: 'Prologue to The Phantom Pain'
    },
    {
      id: 'mg-phantom-pain',
      title: 'Metal Gear Solid V: The Phantom Pain',
      externalIds: [{ source: 'steam', id: '287700' }],
      year: 2015,
      chrono: 5,
      mc: 93,
      bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/287700/library_hero.jpg',
      note: "Kojima's last ride"
    },
    {
      id: 'mg-delta',
      title: 'Metal Gear Solid Delta: Snake Eater',
      aliases: ['Metal Gear Solid Δ: Snake Eater'],
      externalIds: [{ source: 'steam', id: '2417610' }],
      year: 2025,
      chrono: 2,
      mc: 75,
      remake: true,
      bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2417610/library_hero.jpg',
      note: 'Remake of Snake Eater'
    }
  ],
  characters: [
    {
      id: 'mg-solid-snake',
      name: 'Solid Snake',
      role: 'Protagonist',
      portraitUrl: 'https://static.wikia.nocookie.net/metalgear/images/b/be/MGS2SnakePP.png',
      appearsIn: ['mg-1', 'mg-2', 'mg-mgs1', 'mg-mgs2', 'mg-mgs4'],
      blurb:
        'The legendary soldier cloned from Big Boss, dragged out of retirement every time a Metal Gear surfaces. War has made him what he is — and he knows it.'
    },
    {
      id: 'mg-big-boss',
      name: 'Big Boss',
      role: 'Protagonist turned antagonist',
      portraitUrl: 'https://static.wikia.nocookie.net/metalgear/images/d/df/Mgspw-naked-snake-render.jpg',
      appearsIn: ['mg-mgs3', 'mg-peace-walker', 'mg-ground-zeroes', 'mg-phantom-pain', 'mg-1', 'mg-2', 'mg-delta'],
      blurb:
        'Naked Snake, the man the clones came from. Half the saga is watching the greatest soldier of the 20th century become its greatest enemy.'
    },
    {
      id: 'mg-ocelot',
      name: 'Revolver Ocelot',
      role: 'Recurring schemer',
      portraitUrl: 'https://static.wikia.nocookie.net/metalgear/images/8/85/OcelotMB.PNG',
      appearsIn: ['mg-mgs1', 'mg-mgs2', 'mg-mgs3', 'mg-mgs4', 'mg-phantom-pain', 'mg-delta'],
      blurb:
        'Triple agent, quadruple agent — nobody, including Ocelot, is entirely sure. The ricochet-happy gunslinger threads every era of the timeline together.'
    },
    {
      id: 'mg-the-boss',
      name: 'The Boss',
      role: 'Mentor and tragedy',
      portraitUrl: 'https://static.wikia.nocookie.net/metalgear/images/e/e9/BossI15.png',
      appearsIn: ['mg-mgs3', 'mg-delta'],
      blurb:
        'Mother of the special forces, Big Boss\'s mentor, and the series\' moral center. One mission in 1964 — and everything after is fallout from it.'
    },
    {
      id: 'mg-raiden',
      name: 'Raiden',
      role: 'Protagonist (MGS2, Rising)',
      portraitUrl: 'https://static.wikia.nocookie.net/metalgear/images/1/14/RaidenPortrait2018.png',
      appearsIn: ['mg-mgs2', 'mg-mgs4', 'mg-rising'],
      blurb:
        'The player-surrogate nobody asked for in 2001, reborn as a cyborg ninja and finally given his own game to slice apart.'
    },
    {
      id: 'mg-otacon',
      name: 'Hal "Otacon" Emmerich',
      role: 'Engineer and conscience',
      portraitUrl: 'https://static.wikia.nocookie.net/metalgear/images/9/95/MGS4_Otacon.png',
      appearsIn: ['mg-mgs1', 'mg-mgs2', 'mg-mgs4'],
      blurb:
        'The anime-loving engineer who built Metal Gear REX and spends the rest of the series atoning for it, one codec call at a time.'
    },
    {
      id: 'mg-liquid',
      name: 'Liquid Snake',
      role: 'Antagonist',
      portraitUrl: 'https://static.wikia.nocookie.net/metalgear/images/2/21/LiquidTSI7.png',
      appearsIn: ['mg-mgs1', 'mg-mgs2', 'mg-mgs4'],
      blurb:
        'The other clone — convinced he got the recessive genes, wrong about the science, right about the rage. Refuses to stay dead, even as an arm.'
    },
    {
      id: 'mg-quiet',
      name: 'Quiet',
      role: 'Sniper',
      portraitUrl: 'https://static.wikia.nocookie.net/metalgear/images/3/36/Quiet.png',
      appearsIn: ['mg-phantom-pain'],
      blurb:
        'The Phantom Pain\'s silent sharpshooter. One of the most contested designs in the series, and one of its best companions in the field.'
    }
  ]
}
