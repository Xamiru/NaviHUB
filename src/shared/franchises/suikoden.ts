// Suikoden — curated canon: Konami's five numbered games, Suikoden Tactics (a
// canon side story bracketing Suikoden IV), Suikoden Tierkreis (a separate
// world, spin-off), Rabbit & Bear's Eiyuden Chronicle: Hundred Heroes (the
// spiritual successor, spin-off) and the 2026 TV anime of Suikoden II. The 2006
// PSP compilation Suikoden I & II and the 2025 HD Remaster are ALIASES of
// Suikoden I (the title strings can sit on one row only); the remaster's Steam
// id is on both I and II. Excluded: the Suikogaiden visual novels, Card
// Stories, Tsumugareshi Hyakunen no Toki (outside the main world), Suikoden:
// Star Leap (the 2026 gacha game; its Steam page still says "to be
// announced"), Eiyuden Chronicle: Rising, and the manga and novel adaptations.
// Story order = the Suikoden world's in-universe order (Wikipedia: IV is about
// 150 years before I, Tactics is told before and after IV, V is six years before
// I and 142 years after IV, II three years after I, III about 16 years after
// II): IV -> Tactics -> V -> I -> II (and the anime) -> III. Tierkreis and
// Eiyuden are other worlds and carry no slot.
// Dates are first Japanese releases (Wikipedia); Steam ids verified with
// appdetails, AniList id and art curl-verified 2026-10-05.

import type { FranchiseCfg } from './types'

export const SUIKODEN: FranchiseCfg = {
  id: 'suikoden',
  name: 'Suikoden',
  short: 'Suikoden',
  color: '#4a8fd0',
  heroUrl:
    'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1932640/library_hero.jpg',
  studio: 'Konami',
  tagline: 'Gather the 108 Stars of Destiny.',
  trivia: [
    {
      title: 'The 108 Stars of Destiny',
      body: 'Suikoden is loosely based on the classical Chinese novel Water Margin, whose Japanese title is Suikoden, and borrows its 108 heroes. Every main game revolves around recruiting 108 Stars of Destiny, and the army’s headquarters, usually an abandoned castle captured from monsters, fills up with them as the story goes on.\n\nRecruiting all 108 is optional, but it changes what the story gives you. Suikoden III bends the rule: some of its Stars are antagonists.'
    },
    {
      title: 'One world, told out of order',
      body: 'Every main game shares one world and its 27 True Runes, sentient sources of all magic whose bearers stop ageing. The release order is not the story order: Suikoden IV is the earliest, about 150 years before the first game, Suikoden V comes six years before it, Suikoden II is three years after it, and Suikoden III, some 16 years after II, is the latest.\n\nThat is why characters keep turning up across games. Viktor and Flik rescue the hero of Suikoden II, and Luc, a character from the first game, is the masked bishop behind Suikoden III.'
    },
    {
      title: 'Murayama and the revival',
      body: 'Yoshitaka Murayama created the series and wrote and directed the first two games, then left Konami near the end of Suikoden III’s development. With other Suikoden veterans he founded Rabbit & Bear Studios, whose Eiyuden Chronicle: Hundred Heroes (2024) is a spiritual successor; Murayama died during its development.\n\nKonami’s own revival began with the Suikoden I & II HD Remaster in March 2025, followed by a Suikoden II anime from Konami Animation.'
    }
  ],
  entries: [
    {
      id: 'suikoden-1',
      title: 'Suikoden',
      aliases: [
        'Genso Suikoden',
        'Suikoden I',
        'Suikoden I & II',
        'Suikoden I & II HD Remaster: Gate Rune and Dunan Unification Wars'
      ],
      externalIds: [{ source: 'steam', id: '1932640' }],
      year: 1995,
      releaseDate: '1995-12-15',
      chrono: 4,
      note: 'A general’s son receives the Soul Eater rune and leads the Liberation Army against the Scarlet Moon Empire'
    },
    {
      id: 'suikoden-2',
      title: 'Suikoden II',
      aliases: ['Genso Suikoden II'],
      externalIds: [{ source: 'steam', id: '1932640' }],
      year: 1998,
      releaseDate: '1998-12-17',
      chrono: 5,
      note: 'Riou and Jowy split the Rune of the Beginning and end up on opposite sides of the Highland war'
    },
    {
      id: 'suikoden-3',
      title: 'Suikoden III',
      aliases: ['Genso Suikoden III'],
      year: 2002,
      releaseDate: '2002-07-11',
      chrono: 6,
      note: 'Hugo, Chris and Geddoe see the Grasslands-Zexen war from three sides'
    },
    {
      id: 'suikoden-4',
      title: 'Suikoden IV',
      aliases: ['Genso Suikoden IV'],
      year: 2004,
      releaseDate: '2004-08-19',
      chrono: 1,
      note: 'A boy from Razril inherits the Rune of Punishment as the Kooluk Empire moves on the Island Nations'
    },
    {
      id: 'suikoden-tactics',
      title: 'Suikoden Tactics',
      aliases: ['Rhapsodia'],
      year: 2005,
      releaseDate: '2005-09-22',
      chrono: 2,
      note: 'Kyril chases the transforming Rune Cannons, before and after Suikoden IV'
    },
    {
      id: 'suikoden-5',
      title: 'Suikoden V',
      aliases: ['Genso Suikoden V'],
      year: 2006,
      releaseDate: '2006-02-23',
      chrono: 3,
      note: 'The Prince of Falena, after his mother’s Sun Rune has razed Lordlake'
    },
    {
      id: 'suikoden-tierkreis',
      title: 'Suikoden Tierkreis',
      aliases: ['Genso Suikoden Tierkreis'],
      year: 2008,
      releaseDate: '2008-12-18',
      spinOff: true,
      note: 'Another world: 108 heroes against the One King, who preaches that all fate is fixed'
    },
    {
      id: 'suikoden-eiyuden',
      title: 'Eiyuden Chronicle: Hundred Heroes',
      externalIds: [{ source: 'steam', id: '1658280' }],
      year: 2024,
      releaseDate: '2024-04-23',
      spinOff: true,
      note: 'Murayama’s spiritual successor to Suikoden, made at Rabbit & Bear Studios'
    },
    {
      id: 'suikoden-anime',
      title: 'Gensou Suikoden',
      mediaType: 'anime',
      aliases: ['Suikoden: The Anime'],
      externalIds: [{ source: 'anilist', id: '187316' }],
      year: 2026,
      releaseDate: '2026-10-03',
      chrono: 5,
      adaptation: true,
      note: 'Konami Animation’s TV series of Suikoden II, from the Highland youth brigade onward'
    }
  ],
  characters: [
    {
      id: 'suikoden-riou',
      name: 'Riou',
      role: 'Protagonist (II)',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b33178-UPXKQXfyxJoG.png',
      appearsIn: ['suikoden-2', 'suikoden-anime'],
      blurb: 'Genkaku’s adopted son and a member of Highland’s Unicorn Youth Brigade until Luca Blight has it massacred. His half of the Rune of the Beginning, the Bright Shield, binds him to fight his best friend.'
    },
    {
      id: 'suikoden-jowy',
      name: 'Jowy Atreides',
      role: 'Riou’s best friend (II)',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b33180-t8I1VeNQSKss.png',
      appearsIn: ['suikoden-2', 'suikoden-anime'],
      blurb: 'Bearer of the Black Sword half of the Rune of the Beginning. He assassinates Muse’s mayor Anabelle and opens the city’s gates to Highland.'
    },
    {
      id: 'suikoden-nanami',
      name: 'Nanami',
      role: 'Riou’s adopted sister (II)',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/33181.jpg',
      appearsIn: ['suikoden-2', 'suikoden-anime'],
      blurb: 'Riou’s big sister by adoption, who wants nothing more than for the three friends to run away and live quietly together.'
    },
    {
      id: 'suikoden-luca',
      name: 'Luca Blight',
      role: 'Prince of Highland (II)',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/86219.jpg',
      appearsIn: ['suikoden-2', 'suikoden-anime'],
      blurb: 'Highland’s brutal heir, who stages a false-flag attack on the youth brigade as an excuse to invade Jowston despite a fresh peace treaty. The main antagonist for most of Suikoden II.'
    },
    {
      id: 'suikoden-luc',
      name: 'Luc',
      role: 'Bearer of the True Wind Rune',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/13121.jpg',
      appearsIn: ['suikoden-1', 'suikoden-3', 'suikoden-anime'],
      blurb: 'A character from the first game who returns as Suikoden III’s masked bishop. He gathers the elemental True Runes to destroy his own, the rune that has dictated his fate.'
    },
    {
      id: 'suikoden-chris',
      name: 'Chris Lightfellow',
      role: 'Acting Captain of the Zexen Knights (III)',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b6025-FaGMyG3kYDO4.jpg',
      appearsIn: ['suikoden-3'],
      blurb: 'The Silver Maiden, revered as a hero and increasingly at odds with the Zexen Council. She kills Hugo’s friend Lulu at Karaya, then sets out across the Grasslands to find her missing father.'
    },
    {
      id: 'suikoden-hugo',
      name: 'Hugo',
      role: 'Son of the Karaya chief (III)',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/7804.jpg',
      appearsIn: ['suikoden-3'],
      blurb: 'Sent to Zexen with a truce offer, he returns to find his village burning. In canon he becomes the new Flame Champion.'
    },
    {
      id: 'suikoden-geddoe',
      name: 'Geddoe',
      role: 'Harmonian mercenary captain (III)',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/8746.jpg',
      appearsIn: ['suikoden-3'],
      blurb: 'Leader of Harmonia’s Twelfth Southern Fringe Defense Force Unit, sent to look into the Fire Bringer. He secretly bears the True Lightning Rune and was a companion of the Flame Champion fifty years earlier.'
    }
  ]
}
