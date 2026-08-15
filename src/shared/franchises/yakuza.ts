// Yakuza / Like a Dragon — curated canon. Mainline + the Judgment duology
// (approved spin-offs); Dead Souls / Ishin / Kenzan-tier excluded. Story
// order: 0 (1988) -> Kiwami/1 (2005) -> ... -> Infinite Wealth (2023); the
// Judgment games run parallel and are slotted where their events land.
// Kiwami 1/2 were re-listed on Steam in 2026 under NEW appids; both old
// ("Legacy") and new ids are included so any import era matches.
// All art URLs curl-verified 2026-08-15. The two PS2 originals have no
// widescreen press art — their official SEGA wallpapers are 4:3.

import type { FranchiseCfg } from './types'

export const YAKUZA: FranchiseCfg = {
  id: 'yakuza',
  name: 'Yakuza / Like a Dragon',
  short: 'Yakuza',
  color: '#cf4a8c',
  heroUrl:
    'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/638970/library_hero.jpg',
  studio: 'Ryu Ga Gotoku Studio (SEGA)',
  tagline: 'Crime drama, karaoke, and the eternal streets of Kamurocho.',
  trivia: [
    {
      title: 'One city, twenty years',
      body: 'Kamurocho — a faithful reskin of Tokyo\'s real Kabukicho district — appears in every single entry, rebuilt era by era. Fans can navigate the real neighborhood from game memory alone.\n\nToshihiro Nagoshi pitched the first game as an adult crime drama in an industry chasing teenagers; SEGA greenlit it reluctantly, and it became their flagship.'
    },
    {
      title: 'Tone whiplash as identity',
      body: 'The series\' signature is playing a bone-breaking mafia tragedy and a minigame about managing a cabaret club with the same total sincerity. A man avenges his sworn brother, then dances disco. Neither undercuts the other — that balance IS the franchise.'
    },
    {
      title: 'The handover',
      body: 'Yakuza: Like a Dragon (2020) pulled off the rarest trick in franchises: swapping protagonist (Kiryu to Ichiban), genre (brawler to turn-based RPG), and tone (stoic to earnest goofball) in one release — and the series got MORE popular. Infinite Wealth then ran both heroes side by side.'
    }
  ],
  entries: [
    {
      id: 'yakuza-1',
      title: 'Yakuza',
      year: 2005,
      chrono: 2,
      mc: 75,
      bgUrl:
        'https://static.wikia.nocookie.net/yakuza/images/5/5a/Wallpaper4_yakuza_8387554544_o.jpg/revision/latest?cb=20190929092903',
      note: 'PS2 original — remade as Kiwami'
    },
    {
      id: 'yakuza-2',
      title: 'Yakuza 2',
      year: 2006,
      chrono: 4,
      mc: 76,
      bgUrl:
        'https://static.wikia.nocookie.net/yakuza/images/1/19/Wallpaper13_yakuza2_10788631416_o.jpg/revision/latest?cb=20190929095434',
      note: 'PS2 original — remade as Kiwami 2'
    },
    {
      id: 'yakuza-3',
      title: 'Yakuza 3',
      aliases: ['Yakuza 3 Remastered'],
      externalIds: [{ source: 'steam', id: '1088710' }],
      year: 2009,
      chrono: 6,
      mc: 78,
      bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1088710/library_hero.jpg',
      note: 'Okinawa and the orphanage'
    },
    {
      id: 'yakuza-4',
      title: 'Yakuza 4',
      aliases: ['Yakuza 4 Remastered'],
      externalIds: [{ source: 'steam', id: '1105500' }],
      year: 2010,
      chrono: 7,
      mc: 78,
      bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1105500/library_hero.jpg',
      note: 'Four protagonists'
    },
    {
      id: 'yakuza-5',
      title: 'Yakuza 5',
      aliases: ['Yakuza 5 Remastered'],
      externalIds: [{ source: 'steam', id: '1105510' }],
      year: 2012,
      chrono: 8,
      mc: 83,
      bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1105510/library_hero.jpg',
      note: 'Five cities, five stories'
    },
    {
      id: 'yakuza-0',
      title: 'Yakuza 0',
      externalIds: [{ source: 'steam', id: '638970' }],
      year: 2015,
      chrono: 1,
      mc: 85,
      bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/638970/library_hero.jpg',
      note: '1988 — the best entry point'
    },
    {
      id: 'yakuza-kiwami',
      title: 'Yakuza Kiwami',
      externalIds: [
        { source: 'steam', id: '3717330' },
        { source: 'steam', id: '834530' }
      ],
      year: 2016,
      releaseDate: '2016-01-21',
      chrono: 3,
      mc: 80,
      remake: true,
      bgUrl:
        'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3717330/6280aa976357798222d2d38f90874c9c9eb04af5/page_bg_raw.jpg?t=1784876186',
      note: 'Remake of Yakuza (2005)'
    },
    {
      id: 'yakuza-6',
      title: 'Yakuza 6: The Song of Life',
      externalIds: [{ source: 'steam', id: '1388590' }],
      year: 2016,
      releaseDate: '2016-12-08',
      chrono: 9,
      mc: 83,
      bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1388590/library_hero.jpg',
      note: "Kiryu's farewell (first of several)"
    },
    {
      id: 'yakuza-kiwami-2',
      title: 'Yakuza Kiwami 2',
      externalIds: [
        { source: 'steam', id: '3717340' },
        { source: 'steam', id: '927380' }
      ],
      year: 2017,
      chrono: 5,
      mc: 85,
      remake: true,
      bgUrl:
        'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3717340/13194650b6023ab48956113c2c753685bc9ef787/page_bg_raw.jpg?t=1781258352',
      note: 'Remake of Yakuza 2 — Dragon Engine'
    },
    {
      id: 'yakuza-judgment',
      title: 'Judgment',
      externalIds: [{ source: 'steam', id: '2058180' }],
      year: 2018,
      chrono: 10,
      mc: 81,
      spinOff: true,
      bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2058180/library_hero.jpg',
      note: 'Detective side of Kamurocho'
    },
    {
      id: 'yakuza-lad',
      title: 'Yakuza: Like a Dragon',
      aliases: ['Like a Dragon'],
      externalIds: [{ source: 'steam', id: '1235140' }],
      year: 2020,
      chrono: 11,
      mc: 84,
      bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1235140/library_hero.jpg',
      note: 'Ichiban arrives — turn-based reboot'
    },
    {
      id: 'yakuza-lost-judgment',
      title: 'Lost Judgment',
      externalIds: [{ source: 'steam', id: '2058190' }],
      year: 2021,
      chrono: 12,
      mc: 82,
      spinOff: true,
      bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2058190/library_hero.jpg',
      note: 'Yagami in Yokohama'
    },
    {
      id: 'yakuza-gaiden',
      title: 'Like a Dragon Gaiden: The Man Who Erased His Name',
      externalIds: [{ source: 'steam', id: '2375550' }],
      year: 2023,
      chrono: 13,
      mc: 83,
      bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2375550/library_hero.jpg',
      note: 'What Kiryu did during 7'
    },
    {
      id: 'yakuza-infinite-wealth',
      title: 'Like a Dragon: Infinite Wealth',
      externalIds: [{ source: 'steam', id: '2072450' }],
      year: 2024,
      chrono: 14,
      mc: 89,
      bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2072450/library_hero.jpg',
      note: 'Hawaii — two heroes, one series'
    }
  ],
  characters: [
    {
      id: 'yakuza-kiryu',
      name: 'Kazuma Kiryu',
      role: 'The Dragon of Dojima',
      portraitUrl:
        'https://static.wikia.nocookie.net/yakuza/images/2/22/LADIW_-_Character_Profile_-_Kazuma_Kiryu.png/revision/latest?cb=20250806193501',
      appearsIn: [
        'yakuza-0', 'yakuza-1', 'yakuza-kiwami', 'yakuza-2', 'yakuza-kiwami-2',
        'yakuza-3', 'yakuza-4', 'yakuza-5', 'yakuza-6', 'yakuza-lad',
        'yakuza-gaiden', 'yakuza-infinite-wealth'
      ],
      blurb:
        'The stoic legend who keeps trying to leave the yakuza life and keeps getting dragged back — a man physically incapable of ignoring a stranger in trouble or a karaoke machine.'
    },
    {
      id: 'yakuza-majima',
      name: 'Goro Majima',
      role: 'The Mad Dog of Shimano',
      portraitUrl:
        'https://static.wikia.nocookie.net/yakuza/images/f/f1/LADPYIH_-_Character_Profile_-_Goro_Majima.jpg/revision/latest?cb=20241102212057',
      appearsIn: [
        'yakuza-0', 'yakuza-1', 'yakuza-kiwami', 'yakuza-2', 'yakuza-kiwami-2',
        'yakuza-3', 'yakuza-4', 'yakuza-5', 'yakuza-6', 'yakuza-lad', 'yakuza-infinite-wealth'
      ],
      blurb:
        'Eyepatch, snakeskin jacket, dagger, zero impulse control — and in Yakuza 0, unexpectedly, the series\' most tragic romantic lead. Kiryu\'s eternal self-appointed rival.'
    },
    {
      id: 'yakuza-ichiban',
      name: 'Ichiban Kasuga',
      role: 'Protagonist (the RPG era)',
      portraitUrl:
        'https://static.wikia.nocookie.net/yakuza/images/3/32/LADPYIH_-_Character_Profile_-_Ichiban_Kasuga.png/revision/latest?cb=20260709132750',
      appearsIn: ['yakuza-lad', 'yakuza-infinite-wealth'],
      blurb:
        'A low-rank grunt who took an 18-year prison sentence for his patriarch, came out to betrayal, and decided to live like a Dragon Quest hero anyway. Impossible not to root for.'
    },
    {
      id: 'yakuza-haruka',
      name: 'Haruka Sawamura',
      role: 'Kiryu\'s ward',
      portraitUrl:
        'https://static.wikia.nocookie.net/yakuza/images/b/b8/LADIW_-_Character_Profile_-_Haruka_Sawamura.png/revision/latest?cb=20240202012559',
      appearsIn: ['yakuza-1', 'yakuza-kiwami', 'yakuza-2', 'yakuza-kiwami-2', 'yakuza-3', 'yakuza-4', 'yakuza-5', 'yakuza-6'],
      blurb:
        'The orphan Kiryu raises, and the emotional throughline of the first six games — from the girl he protects to an idol who walks away from stardom for family.'
    },
    {
      id: 'yakuza-yagami',
      name: 'Takayuki Yagami',
      role: 'Protagonist (Judgment)',
      portraitUrl:
        'https://static.wikia.nocookie.net/yakuza/images/f/f5/LJ_-_Character_Profile_-_Takayuki_Yagami.png/revision/latest?cb=20211018105026',
      appearsIn: ['yakuza-judgment', 'yakuza-lost-judgment'],
      blurb:
        'A disgraced defense attorney turned street detective. Same city as Kiryu, opposite side of the law — mostly.'
    },
    {
      id: 'yakuza-akiyama',
      name: 'Shun Akiyama',
      role: 'The lender of Sky Finance',
      portraitUrl:
        'https://static.wikia.nocookie.net/yakuza/images/f/fd/LADIW_-_Character_Profile_-_Shun_Akiyama.png/revision/latest?cb=20231208132115',
      appearsIn: ['yakuza-4', 'yakuza-5', 'yakuza-infinite-wealth'],
      blurb:
        'The moneylender who charges no interest — repayment is passing his tests of character. The series\' most effortless cool since his debut in Yakuza 4.'
    }
  ]
}
