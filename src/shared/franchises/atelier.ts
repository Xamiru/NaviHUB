// Atelier — Gust's alchemy RPG series, one row per main entry in release
// order: the Salburg trilogy (Marie, Elie, Lilie), the Gramnad pair (Judie,
// Viorate), the Iris trilogy, Mana Khemia 1-2 (the academy pair that drops
// the Atelier name; kept as spin-off rows), the Arland games (Rorona, Totori,
// Meruru, Lulua), the Dusk trilogy (Ayesha, Escha & Logy, Shallie), the
// Mysterious games (Sophie, Firis, Lydie & Suelle, Sophie 2), the Secret
// trilogy (Ryza 1-3), Yumia, and the console Resleriana game (The Red
// Alchemist & the White Guardian, 2025). Atelier Marie Remake (2023) is its own
// remake row. Plus, DX and other enhanced editions are ALIASES of their base
// game with extra Steam ids, the Persona rule. The two TV anime (Escha & Logy,
// 2014; Ryza, 2023) are adaptation rows.
// No chrono column: each sub-series has its own world, heroines and continuity
// (Atelier Iris 3 is even unconnected to the first two Iris games), so a single
// story order across sub-series would be invented. Release order only.
// Excluded: handheld/mobile side games (Lise, Annie, Lina, Elkrone, Atelier
// Online, Quest Board and the Salburg GB/WonderSwan/GBA titles), Nelke & the
// Legendary Alchemists, the mobile gacha crossover Atelier Resleriana:
// Forgotten Alchemy & the Liberator of Polar Night (2023, no Steam release
// found), the Ryza animated shorts, and Atelier Karia (announced for 2027).
// Ids from Steam appdetails / AniList, dates and story facts from the
// Wikipedia series and per-game articles, all verified 2026-10-05.

import type { FranchiseCfg } from './types'

export const ATELIER: FranchiseCfg = {
  id: 'atelier',
  name: 'Atelier',
  short: 'Atelier',
  color: '#e0a33a',
  heroUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1121560/library_hero.jpg',
  studio: 'Gust (Koei Tecmo)',
  tagline: 'Gather, synthesize, and keep the workshop running.',
  trivia: [
    {
      title: 'An anthology of sub-series',
      body: 'Atelier is less one story than a row of small ones. The main games are grouped into sub-series, usually linked by a keyword in their titles: Salburg, Gramnad, Iris, Mana Khemia, Arland, Dusk, Mysterious, Secret, Memories and Resleriana. Each has its own self-contained story and heroines, sometimes in a completely different continuity from the others.\n\nWhat ties them together is alchemy: gathering materials in the field and combining them into items, from cooking ingredients to weapons. Conflict often comes from something other than a villain, and the tone leans light-hearted. As of August 2023 the series had shipped more than 7.5 million units worldwide.'
    },
    {
      title: 'A failing student',
      body: 'Atelier Marie was planned by Shinichi Yoshiike, who drafted the design document before Gust had even hired him, inspired by a university class on historical alchemy. Production began in February 1996 as a tactical RPG; alchemy and synthesis were added to stand out among the PlayStation\'s growing RPG library. Instead of a chosen-one hero, the lead is the academy\'s worst student, with five years to pass.\n\nThe game sold over 212,000 units in Japan by the end of 1997, but the series stayed in Japan and Asia until Atelier Iris: Eternal Mana, the first entry released in the United States. No version of Atelier Marie itself was released outside Japan until its 2023 remake.'
    },
    {
      title: 'Racing the calendar',
      body: 'Most early games give the heroine a deadline: in-game days pass while she gathers, travels and synthesizes, and failing the main goal in time can end the game early or lead to a bad ending. Atelier Sophie did away with the time limit, Atelier Firis kept one only for its first major objective, and from Atelier Lulua onward the limit was removed entirely. Atelier Marie Remake turned it into an optional setting.\n\nAtelier Rorona was the series\' first PlayStation 3 game and its first in 3D, and Atelier Firis was its first open world.'
    }
  ],
  entries: [
    {
      id: 'atelier-marie',
      title: 'Atelier Marie: The Alchemist of Salburg',
      aliases: ['Atelier Marie', 'Atelier Marie Plus: The Alchemist of Salburg'],
      year: 1997,
      releaseDate: '1997-05-23',
      note: 'Failing student Marie gets five years in her own workshop to synthesize a high-quality item and graduate'
    },
    {
      id: 'atelier-elie',
      title: 'Atelier Elie: The Alchemist of Salburg 2',
      aliases: ['Atelier Elie', 'Atelier Ellie: The Alchemist of Salburg 2'],
      year: 1998,
      releaseDate: '1998-12-17',
      note: 'Elie, once cured of a disease by Marie, enters the same Salburg academy'
    },
    {
      id: 'atelier-lilie',
      title: 'Atelier Lilie: The Alchemist of Salburg 3',
      aliases: ['Atelier Lilie'],
      year: 2001,
      releaseDate: '2001-06-21',
      note: 'Prequel in which Lilie introduces alchemy to the kingdom of Salburg'
    },
    {
      id: 'atelier-judie',
      title: 'Atelier Judie: The Alchemist of Gramnad',
      aliases: ['Atelier Judie'],
      year: 2002,
      releaseDate: '2002-06-27',
      note: 'A botched synthesis of the Hourglass of the Dragon throws Judie two centuries into the future'
    },
    {
      id: 'atelier-viorate',
      title: 'Atelier Viorate: The Alchemist of Gramnad 2',
      aliases: ['Atelier Viorate'],
      year: 2003,
      releaseDate: '2003-06-26',
      note: 'Viorate has three years to make a workshop succeed and revive her dwindling village of Karotte'
    },
    {
      id: 'atelier-iris-1',
      title: 'Atelier Iris: Eternal Mana',
      year: 2004,
      releaseDate: '2004-05-27',
      note: 'Wandering alchemist Klein Kiesling and his Mana friend Popo join monster hunter Lita in South Esviore'
    },
    {
      id: 'atelier-iris-2',
      title: 'Atelier Iris 2: The Azoth of Destiny',
      aliases: ['Atelier Iris: Eternal Mana 2'],
      year: 2005,
      releaseDate: '2005-05-26',
      note: 'Felt draws the Azure Azoth and crosses into Belkhyde to save the floating continent of Eden, a prequel in lore'
    },
    {
      id: 'atelier-iris-3',
      title: 'Atelier Iris 3: Grand Phantasm',
      year: 2006,
      releaseDate: '2006-06-29',
      note: 'Raiders Edge and Iris hunt the Alterworlds for gems to empower a wish-granting book, unconnected to the first two Iris games'
    },
    {
      id: 'atelier-mana-khemia',
      title: 'Mana Khemia: Alchemists of Al-Revis',
      aliases: ['Mana Khemia: Student Alliance'],
      year: 2007,
      releaseDate: '2007-06-21',
      spinOff: true,
      note: 'Hermit Vayne and his cat-shaped Mana Sulpher enroll at Al-Revis Academy to study alchemy'
    },
    {
      id: 'atelier-mana-khemia-2',
      title: 'Mana Khemia 2: Fall of Alchemy',
      year: 2008,
      releaseDate: '2008-05-29',
      spinOff: true,
      note: 'Al-Revis Academy has crashed to the Lower World, and its new chairman wants alchemy dropped; play as Raze or Ulrika'
    },
    {
      id: 'atelier-rorona',
      title: 'Atelier Rorona: The Alchemist of Arland',
      aliases: [
        'Atelier Rorona',
        'Atelier Rorona Plus: The Alchemist of Arland',
        'Atelier Rorona Plus: The Alchemist of Arland DX',
        'Atelier Rorona ~The Alchemist of Arland~ DX',
        'Atelier Rorona DX',
        'New Atelier Rorona: The Alchemist of Arland'
      ],
      externalIds: [{ source: 'steam', id: '936160' }],
      year: 2009,
      releaseDate: '2009-06-25',
      note: 'Rorona must pass 12 examinations over three years to keep Astrid\'s workshop from being shut down'
    },
    {
      id: 'atelier-totori',
      title: 'Atelier Totori: The Adventurer of Arland',
      aliases: [
        'Atelier Totori',
        'Atelier Totori Plus: The Adventurer of Arland',
        'Atelier Totori ~The Adventurer of Arland~ DX',
        'Atelier Totori DX'
      ],
      externalIds: [{ source: 'steam', id: '936180' }],
      year: 2010,
      releaseDate: '2010-06-24',
      note: 'Five years later, Rorona\'s student Totori becomes an adventurer to search for her missing mother'
    },
    {
      id: 'atelier-meruru',
      title: 'Atelier Meruru: The Apprentice of Arland',
      aliases: [
        'Atelier Meruru',
        'Atelier Meruru Plus: The Apprentice of Arland',
        'Atelier Meruru ~The Apprentice of Arland~ DX',
        'Atelier Meruru DX'
      ],
      externalIds: [{ source: 'steam', id: '936190' }],
      year: 2011,
      releaseDate: '2011-06-23',
      note: 'Princess Meruru of Arls becomes Totori\'s first student to make her small northern kingdom prosper'
    },
    {
      id: 'atelier-ayesha',
      title: 'Atelier Ayesha: The Alchemist of Dusk',
      aliases: [
        'Atelier Ayesha',
        'Atelier Ayesha Plus: The Alchemist of Dusk',
        'Atelier Ayesha: The Alchemist of Dusk DX',
        'Atelier Ayesha DX'
      ],
      externalIds: [{ source: 'steam', id: '1152300' }],
      year: 2012,
      releaseDate: '2012-06-28',
      note: 'Ayesha has three years to find a way to reunite with her sister Nio'
    },
    {
      id: 'atelier-escha-logy',
      title: 'Atelier Escha & Logy: Alchemists of the Dusk Sky',
      aliases: [
        'Atelier Escha & Logy',
        'Atelier Escha & Logy Plus: Alchemists of the Dusk Sky',
        'Atelier Escha & Logy: Alchemists of the Dusk Sky DX'
      ],
      externalIds: [{ source: 'steam', id: '1152310' }],
      year: 2013,
      releaseDate: '2013-06-27',
      note: 'Escha and Logy join a frontier R&D division and explore ruins in a world still recovering from the Dusk'
    },
    {
      id: 'atelier-escha-logy-anime',
      title: 'Atelier Escha & Logy: Alchemists of the Dusk Sky',
      mediaType: 'anime',
      aliases: ['Escha & Logy no Atelier: Tasogare no Sora no Renkinjutsushi'],
      externalIds: [{ source: 'anilist', id: '20506' }],
      year: 2014,
      releaseDate: '2014-04-10',
      adaptation: true,
      note: 'Escha and Logy\'s work in the R&D division, told in twelve episodes'
    },
    {
      id: 'atelier-shallie',
      title: 'Atelier Shallie: Alchemists of the Dusk Sea',
      aliases: [
        'Atelier Shallie',
        'Atelier Shallie Plus: Alchemists of the Dusk Sea',
        'Atelier Shallie: Alchemists of the Dusk Sea DX'
      ],
      externalIds: [{ source: 'steam', id: '1152320' }],
      year: 2014,
      releaseDate: '2014-07-17',
      note: 'Alchemists Shallistera and Shallotte meet as an oasis town\'s water sources dry up'
    },
    {
      id: 'atelier-sophie',
      title: 'Atelier Sophie: The Alchemist of the Mysterious Book',
      aliases: ['Atelier Sophie', 'Atelier Sophie: The Alchemist of the Mysterious Book DX'],
      externalIds: [{ source: 'steam', id: '1502970' }],
      year: 2015,
      releaseDate: '2015-11-19',
      note: 'Self-taught Sophie finds Plachta, a talking book, and restores its memories by writing recipes into it'
    },
    {
      id: 'atelier-firis',
      title: 'Atelier Firis: The Alchemist and the Mysterious Journey',
      aliases: ['Atelier Firis', 'Atelier Firis: The Alchemist and the Mysterious Journey DX'],
      externalIds: [
        { source: 'steam', id: '527290' },
        { source: 'steam', id: '1502980' }
      ],
      year: 2016,
      releaseDate: '2016-11-02',
      note: 'Firis leaves the mining town of Ertona with one year to pass the alchemist certification exam'
    },
    {
      id: 'atelier-lydie-suelle',
      title: 'Atelier Lydie & Suelle: The Alchemists and the Mysterious Paintings',
      aliases: [
        'Atelier Lydie & Suelle',
        'Atelier Lydie & Suelle: The Alchemists and the Mysterious Paintings DX'
      ],
      externalIds: [
        { source: 'steam', id: '756590' },
        { source: 'steam', id: '1502990' }
      ],
      year: 2017,
      releaseDate: '2017-12-21',
      note: 'Twins Lydie and Sue step into mysterious paintings to gather materials for their struggling family atelier'
    },
    {
      id: 'atelier-lulua',
      title: 'Atelier Lulua: The Scion of Arland',
      aliases: ['Atelier Lulua'],
      externalIds: [{ source: 'steam', id: '1045620' }],
      year: 2019,
      releaseDate: '2019-03-20',
      note: 'Rorona\'s adopted daughter Lulua can read the Alchemyriddle, a book that fell from the sky'
    },
    {
      id: 'atelier-ryza',
      title: 'Atelier Ryza: Ever Darkness & the Secret Hideout',
      aliases: ['Atelier Ryza', 'Atelier Ryza: Ever Darkness & the Secret Hideout DX'],
      externalIds: [
        { source: 'steam', id: '1121560' },
        { source: 'steam', id: '3365030' }
      ],
      year: 2019,
      releaseDate: '2019-09-26',
      note: 'Ryza and her friends sneak off Kurken Island, apprentice themselves to Empel and Lila, and find a gate to the Underworld'
    },
    {
      id: 'atelier-ryza-2',
      title: 'Atelier Ryza 2: Lost Legends & the Secret Fairy',
      aliases: ['Atelier Ryza 2', 'Atelier Ryza 2: Lost Legends & the Secret Fairy DX'],
      externalIds: [
        { source: 'steam', id: '1257290' },
        { source: 'steam', id: '3365040' }
      ],
      year: 2020,
      releaseDate: '2020-12-03',
      note: 'Three years later, Ryza explores ruins near the capital with Fi, a creature hatched from a mysterious stone'
    },
    {
      id: 'atelier-sophie-2',
      title: 'Atelier Sophie 2: The Alchemist of the Mysterious Dream',
      aliases: ['Atelier Sophie 2'],
      externalIds: [{ source: 'steam', id: '1621310' }],
      year: 2022,
      releaseDate: '2022-02-24',
      note: 'Sophie lands in the parallel world of Erde Wiege and meets a younger Plachta, between Sophie and Firis'
    },
    {
      id: 'atelier-ryza-3',
      title: 'Atelier Ryza 3: Alchemist of the End & the Secret Key',
      aliases: ['Atelier Ryza 3', 'Atelier Ryza 3: Alchemist of the End & the Secret Key DX'],
      externalIds: [
        { source: 'steam', id: '1999770' },
        { source: 'steam', id: '3365050' }
      ],
      year: 2023,
      releaseDate: '2023-03-23',
      note: 'The Kark Islands appear off Kurken, and a voice tells Ryza to synthesize keys, in the Secret trilogy\'s finale'
    },
    {
      id: 'atelier-ryza-anime',
      title: 'Atelier Ryza: Ever Darkness & the Secret Hideout The Animation',
      mediaType: 'anime',
      aliases: ['Ryza no Atelier: Tokoyami no Joou to Himitsu no Kakurega'],
      externalIds: [{ source: 'anilist', id: '162893' }],
      year: 2023,
      releaseDate: '2023-07-02',
      adaptation: true,
      note: 'Ryza, Lent, Tao and Klaudia\'s first adventure, adapted by Liden Films'
    },
    {
      id: 'atelier-marie-remake',
      title: 'Atelier Marie Remake: The Alchemist of Salburg',
      aliases: ['Atelier Marie Remake'],
      externalIds: [{ source: 'steam', id: '2138090' }],
      year: 2023,
      releaseDate: '2023-07-13',
      remake: true,
      note: 'HD remake of the first game, with a mode that switches off the five-year time limit'
    },
    {
      id: 'atelier-yumia',
      title: 'Atelier Yumia: The Alchemist of Memories & the Envisioned Land',
      aliases: ['Atelier Yumia'],
      externalIds: [{ source: 'steam', id: '3123410' }],
      year: 2025,
      releaseDate: '2025-03-21',
      note: 'Yumia joins an expedition into the fallen Aladissian Empire, where alchemy is taboo'
    },
    {
      id: 'atelier-resleriana-red',
      title: 'Atelier Resleriana: The Red Alchemist & the White Guardian',
      aliases: ['The Red Alchemist & the White Guardian'],
      externalIds: [{ source: 'steam', id: '3259600' }],
      year: 2025,
      releaseDate: '2025-09-26',
      note: 'Rias and Slade rebuild their hometown and search for the truth hidden there'
    }
  ],
  characters: [
    {
      id: 'atelier-char-marie',
      name: 'Marie',
      role: 'Alchemist of Salburg',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b8831-GXI7Eg8ev99Y.png',
      appearsIn: ['atelier-marie', 'atelier-marie-remake'],
      blurb: 'Marlone, the Royal Academy of Magic\'s worst student, given one last chance: five years in her own workshop. Her clumsy, passionate alchemy started the series.'
    },
    {
      id: 'atelier-char-rorona',
      name: 'Rorona',
      role: 'Alchemist of Arland',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b37155-BwKMTEaerk3O.png',
      appearsIn: ['atelier-rorona', 'atelier-totori', 'atelier-meruru', 'atelier-lulua'],
      blurb: 'Rorolina Frixell works off her parents\' debt in Astrid\'s workshop and saves it from closure. She later teaches Totori, spends Meruru shrunk to a child by Astrid\'s youth potion, and adopts Lulua.'
    },
    {
      id: 'atelier-char-totori',
      name: 'Totori',
      role: 'Adventurer of Arland',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b48039-LupqA9ZamdQw.png',
      appearsIn: ['atelier-totori', 'atelier-meruru', 'atelier-resleriana-red'],
      blurb: 'Totooria Helmold, the fishing-village girl who learns alchemy from Rorona and becomes an adventurer, convinced her mother is still alive. By Meruru she is the teacher.'
    },
    {
      id: 'atelier-char-escha',
      name: 'Escha Malier',
      role: 'Alchemist of the Dusk Sky',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b167188-sIc58SKApmcj.png',
      appearsIn: ['atelier-escha-logy', 'atelier-escha-logy-anime'],
      blurb: 'A cheerful, curious government alchemist who synthesizes with a cauldron. She works in the R&D division alongside her partner Logy.'
    },
    {
      id: 'atelier-char-logy',
      name: 'Logy',
      role: 'Alchemist of the Dusk Sky',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b161109-xrToTIAf1SK6.jpg',
      appearsIn: ['atelier-escha-logy', 'atelier-escha-logy-anime'],
      blurb: 'Escha\'s serious but kind partner, who builds weapons and armor with tools instead of a cauldron. He avoids talking about the burn scar on his arm.'
    },
    {
      id: 'atelier-char-ryza',
      name: 'Ryza',
      role: 'Heroine of the Secret trilogy',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b223350-yNmgtin88wwu.png',
      appearsIn: ['atelier-ryza', 'atelier-ryza-2', 'atelier-ryza-3', 'atelier-ryza-anime'],
      blurb: 'Reisalin Stout, a Kurken Island girl hungry for adventure who learns alchemy from Empel. The first Atelier heroine to return as protagonist, across three games.'
    },
    {
      id: 'atelier-char-klaudia',
      name: 'Klaudia Valentz',
      role: 'Merchant\'s daughter',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b251207-JipTTcadUKjo.png',
      appearsIn: ['atelier-ryza', 'atelier-ryza-2', 'atelier-ryza-3', 'atelier-ryza-anime'],
      blurb: 'The mainland merchant\'s daughter Ryza\'s group befriends on their first trip off the island. She joins their adventures once her father approves.'
    }
  ]
}
