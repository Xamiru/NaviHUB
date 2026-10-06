// A Song of Ice and Fire — George R. R. Martin's novels and HBO's adaptations.
// Books: the five published saga novels (one row each), Fire & Blood (the
// first volume of the Targaryen history) and A Knight of the Seven Kingdoms
// (the 2015 collection of the three Dunk and Egg novellas). TV: Game of
// Thrones, House of the Dragon and A Knight of the Seven Kingdoms (premiered
// January 2026), one row per series.
// Chrono is in-universe: Fire & Blood and House of the Dragon (the Targaryen
// dynasty and the Dance of the Dragons, nearly 200 years before the saga),
// then Dunk and Egg (about 90 years before), then the five novels in order.
// Each series shares its source's slot; Game of Thrones takes A Game of
// Thrones' slot because it starts there. A Feast for Crows and A Dance with
// Dragons partly overlap in time; they keep consecutive slots.
// Excluded: The Winds of Winter and A Dream of Spring (unpublished), the
// planned Aegon's Conquest film, The World of Ice & Fire and The Rise of the
// Dragon (companion books), the individual novellas (collected in A Knight of
// the Seven Kingdoms), the Princess and the Queen / Rogue Prince novellas
// (expanded into Fire & Blood), comics, and the licensed games.
// Ids from Open Library and TMDB (en-US); dates and story facts from
// Wikipedia, all checked 2026-10-05.

import type { FranchiseCfg } from './types'

export const SONG_OF_ICE_AND_FIRE: FranchiseCfg = {
  id: 'asoiaf',
  name: 'A Song of Ice and Fire',
  short: 'Ice and Fire',
  color: '#b8862b',
  heroUrl: 'https://image.tmdb.org/t/p/w1280/zZqpAXxVSBtxV9qPBcscfXBcL2w.jpg',
  studio: 'George R. R. Martin / HBO',
  tagline: 'Great houses war for the Iron Throne while winter and the Others gather in the north.',
  trivia: [
    {
      title: 'The trilogy that kept growing',
      body: 'Martin began writing A Game of Thrones in 1991 and published it in August 1996. It was marketed as the first book of the "Song of Ice and Fire trilogy", but by the second book the "trilogy" had been dropped from the name, and the series is now planned at seven volumes.\n\nFive have been published, the most recent being A Dance with Dragons in 2011. The sixth, The Winds of Winter, takes its title from the last book of the originally planned trilogy; A Dream of Spring is meant to close the series. More than 100 million copies have been sold in 47 languages.'
    },
    {
      title: 'Split by geography',
      body: 'The fourth novel grew so long that it had to be divided. Martin rejected his publishers\' idea of cutting the narrative chronologically into two halves; instead, on a friend\'s suggestion, he divided the story geographically, so that A Feast for Crows follows one set of characters and A Dance with Dragons the rest.\n\nJon Snow, Tyrion and Daenerys, three of the most popular characters, were all moved into A Dance with Dragons, which left their fates unresolved from A Storm of Swords\' cliffhanger ending in 2000 until 2011. Arya\'s chapters were split across both books.'
    },
    {
      title: 'Three eras on screen',
      body: 'HBO acquired the television rights in 2007 and aired the first of ten episodes covering A Game of Thrones in April 2011; Game of Thrones ran for eight seasons until 2019.\n\nTwo prequels followed. House of the Dragon adapts the second half of Fire & Blood and begins 172 years before Game of Thrones, in the reign of Viserys I, building toward the Targaryen civil war called the Dance of the Dragons. A Knight of the Seven Kingdoms, which premiered in January 2026, adapts the Dunk and Egg novellas set about 90 years before the novels, its first season covering The Hedge Knight.'
    }
  ],
  entries: [
    {
      id: 'asoiaf-game-of-thrones-book',
      title: 'A Game of Thrones',
      mediaType: 'book',
      externalIds: [{ source: 'openlibrary', id: 'OL257943W' }],
      year: 1996,
      releaseDate: '1996-08-01',
      chrono: 3,
      note: 'Eddard Stark discovers that King Robert\'s heirs are the children of Cersei and her twin brother Jaime'
    },
    {
      id: 'asoiaf-clash-of-kings',
      title: 'A Clash of Kings',
      mediaType: 'book',
      externalIds: [{ source: 'openlibrary', id: 'OL257939W' }],
      year: 1998,
      releaseDate: '1998-11-16',
      chrono: 4,
      note: 'Stannis and Renly both claim the throne as the War of the Five Kings spreads'
    },
    {
      id: 'asoiaf-storm-of-swords',
      title: 'A Storm of Swords',
      mediaType: 'book',
      externalIds: [{ source: 'openlibrary', id: 'OL257914W' }],
      year: 2000,
      releaseDate: '2000-08-08',
      chrono: 5,
      note: 'Stannis reaches the Wall, entangling the Night\'s Watch in the War of the Five Kings'
    },
    {
      id: 'asoiaf-feast-for-crows',
      title: 'A Feast for Crows',
      mediaType: 'book',
      externalIds: [{ source: 'openlibrary', id: 'OL257948W' }],
      year: 2005,
      releaseDate: '2005-10-17',
      chrono: 6,
      note: 'Cersei rules as regent for the young King Tommen while Brienne searches for Sansa Stark'
    },
    {
      id: 'asoiaf-got-series',
      title: 'Game of Thrones',
      mediaType: 'tv',
      externalIds: [{ source: 'tmdb', id: '1399' }],
      year: 2011,
      releaseDate: '2011-04-17',
      chrono: 3,
      adaptation: true,
      note: 'HBO\'s eight-season series, aired from April 2011 to May 2019'
    },
    {
      id: 'asoiaf-dance-with-dragons',
      title: 'A Dance with Dragons',
      mediaType: 'book',
      externalIds: [{ source: 'openlibrary', id: 'OL1955906W' }],
      year: 2011,
      releaseDate: '2011-07-12',
      chrono: 7,
      note: 'Picks up Jon Snow, Tyrion and Daenerys, the characters held back from A Feast for Crows'
    },
    {
      id: 'asoiaf-knight-seven-kingdoms-book',
      title: 'A Knight of the Seven Kingdoms',
      mediaType: 'book',
      aliases: ['Tales of Dunk and Egg'],
      externalIds: [{ source: 'openlibrary', id: 'OL17553509W' }],
      year: 2015,
      releaseDate: '2015-10-06',
      chrono: 2,
      note: 'The three Dunk and Egg novellas: hedge knight Ser Duncan the Tall and Prince Aegon "Egg" Targaryen'
    },
    {
      id: 'asoiaf-fire-and-blood',
      title: 'Fire & Blood',
      mediaType: 'book',
      aliases: ['Fire and Blood'],
      externalIds: [{ source: 'openlibrary', id: 'OL18016709W' }],
      year: 2018,
      releaseDate: '2018-11-20',
      chrono: 1,
      note: 'History of House Targaryen written as an in-universe historian\'s account, through the Dance of the Dragons'
    },
    {
      id: 'asoiaf-house-of-dragon',
      title: 'House of the Dragon',
      mediaType: 'tv',
      externalIds: [{ source: 'tmdb', id: '94997' }],
      year: 2022,
      releaseDate: '2022-08-21',
      chrono: 1,
      adaptation: true,
      note: 'Begins in the reign of Viserys I and builds to the Targaryen civil war, the Dance of the Dragons'
    },
    {
      id: 'asoiaf-knight-seven-kingdoms-series',
      title: 'A Knight of the Seven Kingdoms',
      mediaType: 'tv',
      aliases: ['A Knight of the Seven Kingdoms: The Hedge Knight'],
      externalIds: [{ source: 'tmdb', id: '224372' }],
      year: 2026,
      releaseDate: '2026-01-18',
      chrono: 2,
      adaptation: true,
      note: 'First season adapts The Hedge Knight, about 90 years before Game of Thrones'
    }
  ],
  characters: [
    {
      id: 'asoiaf-daenerys',
      name: 'Daenerys Targaryen',
      role: 'Exiled princess',
      portraitUrl: 'https://image.tmdb.org/t/p/w300_and_h450_face/iFY6t7Ux9r70WB7Sp0TTVz6eGtm.jpg',
      appearsIn: [
        'asoiaf-game-of-thrones-book',
        'asoiaf-clash-of-kings',
        'asoiaf-storm-of-swords',
        'asoiaf-dance-with-dragons',
        'asoiaf-got-series'
      ],
      blurb:
        'Daughter of the Mad King Aerys II, married off to a Dothraki warlord by her brother Viserys, who hatches three dragons and conquers Slaver\'s Bay.'
    },
    {
      id: 'asoiaf-jon-snow',
      name: 'Jon Snow',
      role: 'Night\'s Watch',
      portraitUrl: 'https://image.tmdb.org/t/p/w300_and_h450_face/iGXlJbExWwZmo9sUDsYuzf4Sv4y.jpg',
      appearsIn: [
        'asoiaf-game-of-thrones-book',
        'asoiaf-clash-of-kings',
        'asoiaf-storm-of-swords',
        'asoiaf-dance-with-dragons',
        'asoiaf-got-series'
      ],
      blurb:
        'Eddard Stark\'s bastard son, who joins the Night\'s Watch on the Wall and rises through its ranks to become Lord Commander.'
    },
    {
      id: 'asoiaf-tyrion',
      name: 'Tyrion Lannister',
      role: 'The Imp',
      portraitUrl: 'https://image.tmdb.org/t/p/w300_and_h450_face/9CAd7wr8QZyIN0E7nm8v1B6WkGn.jpg',
      appearsIn: [
        'asoiaf-game-of-thrones-book',
        'asoiaf-clash-of-kings',
        'asoiaf-storm-of-swords',
        'asoiaf-dance-with-dragons',
        'asoiaf-got-series'
      ],
      blurb:
        'Cersei and Jaime\'s younger brother and one of the principal point-of-view characters from the first novel onward.'
    },
    {
      id: 'asoiaf-arya',
      name: 'Arya Stark',
      role: 'Daughter of Winterfell',
      portraitUrl: 'https://image.tmdb.org/t/p/w300_and_h450_face/zk1rlBVci2fmnFhMezaPpa4kwZF.jpg',
      appearsIn: [
        'asoiaf-game-of-thrones-book',
        'asoiaf-clash-of-kings',
        'asoiaf-storm-of-swords',
        'asoiaf-feast-for-crows',
        'asoiaf-dance-with-dragons',
        'asoiaf-got-series'
      ],
      blurb:
        'Eddard and Catelyn Stark\'s daughter, a point-of-view character from the first novel, whose chapters Martin divided between the split fourth and fifth books.'
    },
    {
      id: 'asoiaf-cersei',
      name: 'Cersei Lannister',
      role: 'Queen',
      portraitUrl: 'https://image.tmdb.org/t/p/w300_and_h450_face/cDyZLf8ddz0EgoUjpv4jjzy7qxA.jpg',
      appearsIn: [
        'asoiaf-game-of-thrones-book',
        'asoiaf-clash-of-kings',
        'asoiaf-storm-of-swords',
        'asoiaf-feast-for-crows',
        'asoiaf-got-series',
        'asoiaf-dance-with-dragons'
      ],
      blurb:
        'Robert Baratheon\'s queen, whose children are secretly fathered by her twin Jaime; she puts Joffrey on the throne and later rules as regent for Tommen.'
    },
    {
      id: 'asoiaf-rhaenyra',
      name: 'Rhaenyra Targaryen',
      role: 'Heir to Viserys I',
      portraitUrl: 'https://image.tmdb.org/t/p/w300_and_h450_face/9Zlmb7VmtVCxkLq5yqFFRRxCaED.jpg',
      appearsIn: ['asoiaf-fire-and-blood', 'asoiaf-house-of-dragon'],
      blurb:
        'Viserys I\'s firstborn and named heir, whose succession war with her younger half-brother Aegon II is the Dance of the Dragons.'
    },
    {
      id: 'asoiaf-daemon',
      name: 'Daemon Targaryen',
      role: 'The Rogue Prince',
      portraitUrl: 'https://image.tmdb.org/t/p/w300_and_h450_face/wxMdHj4UA6LgIU5MiA7CKySZeVU.jpg',
      appearsIn: ['asoiaf-fire-and-blood', 'asoiaf-house-of-dragon'],
      blurb:
        'Viserys\'s unpredictable younger brother, a fierce warrior who wields the Valyrian steel sword Dark Sister and becomes Rhaenyra\'s uncle and second husband.'
    },
    {
      id: 'asoiaf-dunk',
      name: 'Ser Duncan the Tall',
      role: 'Hedge knight',
      portraitUrl: 'https://image.tmdb.org/t/p/w300_and_h450_face/ozlEi4BXLTrPKrnQLdcMjdmSQaE.jpg',
      appearsIn: ['asoiaf-knight-seven-kingdoms-book', 'asoiaf-knight-seven-kingdoms-series'],
      blurb:
        'A wandering hedge knight called Dunk who travels with Egg, the boy who will become King Aegon V, some 90 years before the main saga.'
    }
  ]
}
