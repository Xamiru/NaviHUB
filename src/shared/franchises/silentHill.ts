// Silent Hill — curated canon. Mainline + Origins/Homecoming/Shattered
// Memories/Downpour (the Western-era numbered-adjacent entries) + the 2024
// SH2 remake + Silent Hill f. Book of Memories, Ascension, The Short Message
// (a free PS5 teaser) and P.T. are excluded. No `chrono`: the series is an
// anthology — only Origins -> 1 -> 3 is a real story line, and that is
// carried in the notes rather than a half-meaningful order.
// All art URLs curl-verified 2026-08-15; SH1/2/3/Origins/SM/Downpour have
// no Steam release, so their backgrounds are official key/promo art.

import type { FranchiseCfg } from './types'

export const SILENT_HILL: FranchiseCfg = {
  id: 'silent-hill',
  name: 'Silent Hill',
  short: 'Silent Hill',
  color: '#8c8478',
  heroUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2124490/library_hero.jpg',
  studio: 'Konami (Team Silent, then Climax / Double Helix / Vatra / Bloober / NeoBards)',
  tagline: 'Fog, rust, and the guilt you brought with you.',
  trivia: [
    {
      title: 'Team Silent',
      body: 'The first four games (1999-2004) came from Team Silent, an internal Konami group of staff who had mostly been sidelined from other projects. Given no expectations, they built the psychological counterweight to Resident Evil: the horror is never the monster, it is what the monster means.\n\nAfter Silent Hill 4 the series was handed to Western studios — Climax (Origins, Shattered Memories), Double Helix (Homecoming), Vatra (Downpour) — and the fog got thinner each time.'
    },
    {
      title: 'The fog was a workaround',
      body: 'Silent Hill 1\'s fog hid the PlayStation\'s short draw distance. It became the series\' defining image, and every sequel on far stronger hardware kept it on purpose — the rare technical limitation that turned into an artistic signature.\n\nAkira Yamaoka\'s industrial score and Masahiro Ito\'s creature designs (Pyramid Head above all) did the rest.'
    },
    {
      title: 'Twelve years of silence',
      body: 'After Downpour (2012) came P.T. (2014) — a free "playable teaser" for a Kojima/del Toro Silent Hills that Konami cancelled and then deleted from the store, making it the most famous game that never existed. The 2024 remake of Silent Hill 2 and Silent Hill f (2025, 1960s Japan) are the series\' first real entries since.'
    }
  ],
  entries: [
    {
      id: 'sh-1',
      title: 'Silent Hill',
      aliases: ['Silent Hill (1999)'],
      year: 1999,
      mc: 86,
      bgUrl: 'https://static.wikia.nocookie.net/silent/images/8/86/196415-silent-hill-saga-silent-hill-wallpaper.jpg/revision/latest?cb=20130915161749',
      note: 'Harry Mason looks for his daughter'
    },
    {
      id: 'sh-2',
      title: 'Silent Hill 2 (2001)',
      aliases: ['Silent Hill 2: Restless Dreams', 'Silent Hill 2: Director\'s Cut'],
      year: 2001,
      mc: 89,
      bgUrl: 'https://static.wikia.nocookie.net/silent/images/c/cb/Silent_Hill_2_Promotional_Art.png/revision/latest?cb=20250617225339',
      note: 'In my restless dreams, I see that town'
    },
    {
      id: 'sh-3',
      title: 'Silent Hill 3',
      year: 2003,
      mc: 85,
      bgUrl: 'https://static.wikia.nocookie.net/silent/images/9/9f/SanctumHole.png/revision/latest?cb=20151016010632',
      note: 'Direct sequel to the first — Heather'
    },
    {
      id: 'sh-4',
      title: 'Silent Hill 4: The Room',
      year: 2004,
      mc: 76,
      bgUrl: 'https://static.wikia.nocookie.net/silent/images/8/81/SH4HospitalEileen7.png/revision/latest?cb=20131027235227',
      note: 'Team Silent\'s last — Room 302'
    },
    {
      id: 'sh-origins',
      title: 'Silent Hill: Origins',
      aliases: ['Silent Hill: Zero'],
      year: 2007,
      mc: 78,
      bgUrl: 'https://static.wikia.nocookie.net/silent/images/3/3a/KBOrigins.png/revision/latest?cb=20150808201411',
      note: 'PSP prequel to the first game'
    },
    {
      id: 'sh-homecoming',
      title: 'Silent Hill: Homecoming',
      externalIds: [{ source: 'steam', id: '19000' }],
      year: 2008,
      mc: 71,
      bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/19000/library_hero.jpg',
      note: 'The action-leaning Western entry'
    },
    {
      id: 'sh-shattered-memories',
      title: 'Silent Hill: Shattered Memories',
      year: 2009,
      mc: 79,
      bgUrl: 'https://static.wikia.nocookie.net/silent/images/7/74/Central_SHSM.png/revision/latest?cb=20140914170935',
      note: 'Wii reimagining of the first — the game profiles you'
    },
    {
      id: 'sh-downpour',
      title: 'Silent Hill: Downpour',
      year: 2012,
      mc: 64,
      bgUrl: 'https://static.wikia.nocookie.net/silent/images/c/c7/DownpourConcept.jpg/revision/latest?cb=20150927145416',
      note: 'The last of the old guard'
    },
    {
      id: 'sh-2-remake',
      title: 'Silent Hill 2',
      aliases: ['Silent Hill 2 (2024)', 'Silent Hill 2 Remake'],
      externalIds: [{ source: 'steam', id: '2124490' }],
      year: 2024,
      mc: 86,
      remake: true,
      bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2124490/library_hero.jpg',
      note: 'Bloober Team remake — the return'
    },
    {
      id: 'sh-f',
      title: 'Silent Hill f',
      externalIds: [{ source: 'steam', id: '2947440' }],
      year: 2025,
      mc: 86,
      bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2947440/library_hero.jpg',
      note: '1960s Japan — Ebisugaoka, not the town'
    }
  ],
  characters: [
    {
      id: 'sh-harry',
      name: 'Harry Mason',
      role: 'Protagonist (SH1, Shattered Memories)',
      portraitUrl: 'https://static.wikia.nocookie.net/silent/images/9/95/Harry_SH2.png/revision/latest?cb=20181009235807',
      appearsIn: ['sh-1', 'sh-shattered-memories', 'sh-3'],
      blurb:
        'A writer who crashes his car outside town and spends one endless night looking for his adopted daughter — the ordinary man who set the series\' template.'
    },
    {
      id: 'sh-heather',
      name: 'Heather Mason',
      role: 'Protagonist (SH3)',
      portraitUrl: 'https://static.wikia.nocookie.net/silent/images/c/c0/Heather_Mason.png/revision/latest?cb=20150414154920',
      appearsIn: ['sh-3'],
      blurb:
        'Harry\'s daughter, seventeen and furious, dragged back into the cult\'s plans. The series\' sharpest-written lead.'
    },
    {
      id: 'sh-james',
      name: 'James Sunderland',
      role: 'Protagonist (SH2)',
      portraitUrl: 'https://static.wikia.nocookie.net/silent/images/6/62/James_Sunderland.webp/revision/latest?cb=20231001005315',
      appearsIn: ['sh-2', 'sh-2-remake'],
      blurb:
        'Summoned to the town by a letter from his dead wife. What he finds there is about him, and the game never says so out loud.'
    },
    {
      id: 'sh-pyramid-head',
      name: 'Pyramid Head',
      role: 'The executioner',
      portraitUrl: 'https://static.wikia.nocookie.net/silent/images/c/c9/Red_Pyramid.png/revision/latest?cb=20241231221947',
      appearsIn: ['sh-2', 'sh-2-remake', 'sh-homecoming'],
      blurb:
        'James\'s punishment given a body. Masahiro Ito\'s design became the series mascot — to the point later games borrowed him where he made no sense.'
    },
    {
      id: 'sh-maria',
      name: 'Maria',
      role: 'The other woman (SH2)',
      portraitUrl: 'https://static.wikia.nocookie.net/silent/images/2/2d/Maria_SH_2.png/revision/latest?cb=20181009144357',
      appearsIn: ['sh-2', 'sh-2-remake'],
      blurb:
        'Mary\'s face on someone who is not Mary. Every ending in Silent Hill 2 turns on how James treats her.'
    },
    {
      id: 'sh-alessa',
      name: 'Alessa Gillespie',
      role: 'The girl the town burned',
      portraitUrl: 'https://static.wikia.nocookie.net/silent/images/6/6e/Alessa_-_SH1.png/revision/latest?cb=20181129164025',
      appearsIn: ['sh-1', 'sh-3', 'sh-origins'],
      blurb:
        'The source of the Otherworld: a child\'s agony made into architecture. The first trilogy\'s whole story is hers.'
    },
    {
      id: 'sh-henry',
      name: 'Henry Townshend',
      role: 'Protagonist (SH4)',
      portraitUrl: 'https://static.wikia.nocookie.net/silent/images/f/fd/HenryTownshend.PNG/revision/latest?cb=20150219134459',
      appearsIn: ['sh-4'],
      blurb:
        'Locked into his own apartment by chains from the inside, with a hole in the bathroom wall the only way out. The quietest lead the series has.'
    },
    {
      id: 'sh-hinako',
      name: 'Hinako Shimizu',
      role: 'Protagonist (Silent Hill f)',
      portraitUrl: 'https://static.wikia.nocookie.net/silent/images/1/1e/SHf_-_Hinako_model.png/revision/latest?cb=20250910055434',
      appearsIn: ['sh-f'],
      blurb:
        'A schoolgirl in a 1960s Japanese mountain town as it fills with fog and red spider lilies. The first Silent Hill to leave Silent Hill.'
    }
  ]
}
