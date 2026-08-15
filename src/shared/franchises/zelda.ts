// The Legend of Zelda — curated canon. Mainline only; Hyrule Warriors / Age
// of Calamity and the Tingle-tier spin-offs are deliberately excluded (user
// call, 2026-08-15). Story order is the OFFICIAL Hyrule Historia timeline
// flattened to one sequence: Skyward Sword first, Ocarina as the split point,
// then the three branches in Fallen Hero -> Child -> Adult order, ending in
// the far-future BotW era. It is a curator's flattening of contested lore —
// a display index, nothing persists on it.
//
// None of these are on Steam, so matching is title/alias-only (RAWG/IGDB
// library rows). The 1993 Link's Awakening and its 2019 remake share an
// official title; the plain title matches the 1993 entry (declared first),
// the remake carries the '(2019)' disambiguator.

import type { FranchiseCfg } from './types'

export const ZELDA: FranchiseCfg = {
  id: 'zelda',
  name: 'The Legend of Zelda',
  short: 'Zelda',
  color: '#c9a227',
  heroUrl:
    'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/7/7c/BotW_Link_Gazing_at_Hyrule_Artwork.jpg',
  studio: 'Nintendo EPD',
  tagline: 'Courage, wisdom, power — the same legend retold for forty years.',
  trivia: [
    {
      title: 'Origins',
      body: 'Shigeru Miyamoto based the original 1986 game on childhood memories of exploring caves and countryside around Kyoto — the sense of setting out with no map and finding secrets is the founding design document of the whole series.\n\nEiji Aonuma has produced or directed every mainline entry since Majora\'s Mask, making the series a two-auteur story: Miyamoto\'s toybox, Aonuma\'s worlds.'
    },
    {
      title: 'The timeline',
      body: 'Nintendo resisted a canonical chronology for 25 years, then published one in Hyrule Historia (2011): the timeline SPLITS at Ocarina of Time into three branches — the Hero falls, the Hero returns to childhood, the Hero saves the adult era. Breath of the Wild sits so far downstream that all three branches have converged into myth.\n\nThe Story order on this page flattens those branches into one list; the branch boundaries are real, the flattening is editorial.'
    },
    {
      title: 'Reinvention as tradition',
      body: 'Roughly every decade the series burns its own formula down: A Link to the Past codified it, Ocarina moved it to 3D, Wind Waker dared cel-shading in the face of a furious internet, and Breath of the Wild deleted the dungeon-key structure entirely — each time becoming the new template everyone else copies.'
    }
  ],
  entries: [
    {
      id: 'zelda-1',
      title: 'The Legend of Zelda',
      year: 1986,
      chrono: 9,
      bgUrl: 'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/1/1e/TLoZ_Link_Observing_Hyrule_Artwork.png',
      note: 'NES — the open world, 1986 edition'
    },
    {
      id: 'zelda-2',
      title: 'Zelda II: The Adventure of Link',
      year: 1987,
      chrono: 10,
      bgUrl: 'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/9/91/TAoL_Link_in_Hyrule_Artwork_2.png',
      note: 'The side-scrolling black sheep'
    },
    {
      id: 'zelda-alttp',
      title: 'The Legend of Zelda: A Link to the Past',
      year: 1991,
      chrono: 4,
      bgUrl: 'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/a/a7/ALttP_Link_and_Zelda_Artwork.jpg',
      note: 'SNES — the formula, codified'
    },
    {
      id: 'zelda-links-awakening',
      title: "The Legend of Zelda: Link's Awakening",
      aliases: ["The Legend of Zelda: Link's Awakening DX"],
      year: 1993,
      chrono: 6,
      bgUrl: 'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/c/c3/LA_Koholint_Island_Artwork_5.png',
      note: 'Game Boy — the island that is a dream'
    },
    {
      id: 'zelda-oot',
      title: 'The Legend of Zelda: Ocarina of Time',
      aliases: ['The Legend of Zelda: Ocarina of Time 3D'],
      year: 1998,
      chrono: 3,
      mc: 99,
      bgUrl: 'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/3/31/OoT_Link_and_Epona_Artwork.png',
      note: 'Highest-rated game on Metacritic, still'
    },
    {
      id: 'zelda-majora',
      title: "The Legend of Zelda: Majora's Mask",
      aliases: ["The Legend of Zelda: Majora's Mask 3D"],
      year: 2000,
      chrono: 11,
      mc: 95,
      bgUrl: 'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/3/30/Four_Giants.jpg',
      note: 'Three days, forever'
    },
    {
      id: 'zelda-oracle',
      title: 'The Legend of Zelda: Oracle of Seasons / Oracle of Ages',
      aliases: [
        'The Legend of Zelda: Oracle of Seasons',
        'The Legend of Zelda: Oracle of Ages'
      ],
      year: 2001,
      chrono: 5,
      mc: 91,
      bgUrl: 'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/5/57/OoS_Artwork_2.png',
      note: 'The Capcom twins — one entry for both'
    },
    {
      id: 'zelda-wind-waker',
      title: 'The Legend of Zelda: The Wind Waker',
      aliases: ['The Legend of Zelda: The Wind Waker HD'],
      year: 2002,
      chrono: 13,
      mc: 96,
      bgUrl: 'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/4/42/The_Wind_Waker_Scene_HD.jpg',
      note: 'The great sea'
    },
    {
      id: 'zelda-minish-cap',
      title: 'The Legend of Zelda: The Minish Cap',
      year: 2004,
      chrono: 2,
      mc: 89,
      bgUrl: 'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/e/e2/TMC_JP_Box.jpg',
      note: 'GBA — Capcom again, tiny Link'
    },
    {
      id: 'zelda-twilight-princess',
      title: 'The Legend of Zelda: Twilight Princess',
      aliases: ['The Legend of Zelda: Twilight Princess HD'],
      year: 2006,
      chrono: 12,
      mc: 95,
      bgUrl: 'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/b/b0/TPHD_Cast_Artwork_3.png',
      note: 'The dark one'
    },
    {
      id: 'zelda-phantom-hourglass',
      title: 'The Legend of Zelda: Phantom Hourglass',
      year: 2007,
      chrono: 14,
      mc: 90,
      bgUrl: 'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/b/b4/Phantomhour.jpg',
      note: 'DS — Wind Waker afloat again'
    },
    {
      id: 'zelda-spirit-tracks',
      title: 'The Legend of Zelda: Spirit Tracks',
      year: 2009,
      chrono: 15,
      mc: 87,
      bgUrl: 'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/c/c5/ST_Link_Phantom_Zelda_Spirit_Train_Artwork.png',
      note: 'DS — Hyrule by rail'
    },
    {
      id: 'zelda-skyward-sword',
      title: 'The Legend of Zelda: Skyward Sword',
      aliases: ['The Legend of Zelda: Skyward Sword HD'],
      year: 2011,
      chrono: 1,
      mc: 93,
      bgUrl: 'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/6/61/SS_Key_Artwork.jpg',
      note: 'First in the timeline — the Master Sword forged'
    },
    {
      id: 'zelda-albw',
      title: 'The Legend of Zelda: A Link Between Worlds',
      year: 2013,
      chrono: 8,
      mc: 91,
      bgUrl: 'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/c/cd/ALBW_Hyrule_Lorule.png',
      note: '3DS — ALttP, generations later'
    },
    {
      id: 'zelda-botw',
      title: 'The Legend of Zelda: Breath of the Wild',
      year: 2017,
      chrono: 16,
      mc: 97,
      bgUrl: 'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/7/7c/BotW_Link_Gazing_at_Hyrule_Artwork.jpg',
      note: 'The formula, deleted'
    },
    {
      id: 'zelda-links-awakening-2019',
      title: "The Legend of Zelda: Link's Awakening (2019)",
      year: 2019,
      chrono: 7,
      mc: 87,
      remake: true,
      bgUrl: 'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/5/52/LANS_Release_Day_Artwork.jpg',
      note: 'Remake of the Game Boy original'
    },
    {
      id: 'zelda-totk',
      title: 'The Legend of Zelda: Tears of the Kingdom',
      year: 2023,
      chrono: 17,
      mc: 96,
      bgUrl: 'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/5/59/Tears_of_the_Kingdom_Art_Book.png',
      note: 'BotW, vertical'
    },
    {
      id: 'zelda-echoes',
      title: 'The Legend of Zelda: Echoes of Wisdom',
      year: 2024,
      chrono: 18,
      mc: 86,
      bgUrl: 'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/a/ae/Echoes_of_Wisdom_Box_Art.webp',
      note: 'Zelda, finally playable in her own legend'
    }
  ],
  characters: [
    {
      id: 'zelda-link',
      name: 'Link',
      role: 'The Hero',
      portraitUrl: 'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/1/15/TotK_Link_Artwork.png',
      appearsIn: [
        'zelda-1', 'zelda-2', 'zelda-alttp', 'zelda-links-awakening', 'zelda-oot',
        'zelda-majora', 'zelda-oracle', 'zelda-wind-waker', 'zelda-minish-cap',
        'zelda-twilight-princess', 'zelda-phantom-hourglass', 'zelda-spirit-tracks',
        'zelda-skyward-sword', 'zelda-albw', 'zelda-botw',
        'zelda-links-awakening-2019', 'zelda-totk'
      ],
      blurb:
        'Not one person but a reincarnating spirit of courage — a different boy in green in nearly every era, always mute, always left-handed until Wii motion controls said otherwise.'
    },
    {
      id: 'zelda-zelda',
      name: 'Princess Zelda',
      role: 'Bearer of Wisdom',
      portraitUrl: 'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/c/c9/TotK_Princess_Zelda_Artwork.png',
      appearsIn: [
        'zelda-1', 'zelda-2', 'zelda-alttp', 'zelda-oot', 'zelda-oracle',
        'zelda-wind-waker', 'zelda-minish-cap', 'zelda-twilight-princess',
        'zelda-phantom-hourglass', 'zelda-spirit-tracks', 'zelda-skyward-sword',
        'zelda-albw', 'zelda-botw', 'zelda-totk', 'zelda-echoes'
      ],
      blurb:
        'Princess, sage, pirate, ghost, sheikah warrior, and — as of Echoes of Wisdom — protagonist. The title was always technically about her.'
    },
    {
      id: 'zelda-ganondorf',
      name: 'Ganondorf',
      role: 'Bearer of Power',
      portraitUrl: 'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/6/63/TotK_Ganondorf_Artwork.png',
      appearsIn: [
        'zelda-1', 'zelda-alttp', 'zelda-oot', 'zelda-oracle', 'zelda-wind-waker',
        'zelda-twilight-princess', 'zelda-albw', 'zelda-botw', 'zelda-totk'
      ],
      blurb:
        'The Gerudo king whose hatred is so dense it survives death, sealing, and total calamity-form dissolution. The Wind Waker gave him melancholy; Tears of the Kingdom gave him abs.'
    },
    {
      id: 'zelda-impa',
      name: 'Impa',
      role: 'Royal guardian',
      portraitUrl: 'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/b/b5/HW_Impa_Artwork.png',
      appearsIn: ['zelda-oot', 'zelda-skyward-sword', 'zelda-botw', 'zelda-totk', 'zelda-echoes'],
      blurb:
        'The Sheikah retainer sworn to the royal family, appearing as everything from towering bodyguard to tiny ancient sage — always the keeper of the legend itself.'
    },
    {
      id: 'zelda-midna',
      name: 'Midna',
      role: 'Companion (Twilight Princess)',
      portraitUrl: 'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/7/72/TP_Midna_Render.png',
      appearsIn: ['zelda-twilight-princess'],
      blurb:
        'The imp-cursed Twilight Princess herself — snide, selfish, and by the credits the most beloved companion the series ever wrote.'
    },
    {
      id: 'zelda-skull-kid',
      name: 'Skull Kid',
      role: "Antagonist (Majora's Mask)",
      portraitUrl: 'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/8/84/MM_Skull_Kid_Artwork.png',
      appearsIn: ['zelda-oot', 'zelda-majora'],
      blurb:
        'A lonely forest child wearing a mask that ends the world in three days. The rare Zelda villain whose story is about being forgiven.'
    }
  ]
}
