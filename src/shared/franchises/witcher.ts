// The Witcher — Andrzej Sapkowski's books, CD Projekt Red's games and the
// screen adaptations. Books are one row each under their Polish first
// publication year: The Last Wish and Sword of Destiny (story collections),
// the five Witcher Saga novels, and the prequels Season of Storms (2013) and
// Crossroads of Ravens (2024; the English translation has its own Open Library
// work, listed as a second id). Games: The Witcher (Enhanced Edition / Director's
// Cut as aliases), The Witcher 2 (Enhanced Edition alias), The Witcher 3 (Game
// of the Year, Complete and Remastered editions as aliases — the Steam store
// row is now titled Remastered), and Thronebreaker plus Gwent as spin-offs.
// Screen: the Polish 2001 film and 2002 series (both Wiedźmin / The Hexer;
// TMDB's en-US title for the series is "The Witcher", so its row is titled
// The Hexer and matches by id), Netflix's The Witcher, Nightmare of the Wolf,
// Blood Origin, Sirens of the Deep and The Rats: A Witcher Tale.
// Chrono is in-universe: Blood Origin (1,200 years earlier), Vesemir's youth
// in Nightmare of the Wolf, Crossroads of Ravens (Geralt just out of training),
// The Last Wish, Season of Storms (set between Last Wish stories), Sword of
// Destiny, the five saga novels, then the three games (the first set about
// five years after The Lady of the Lake). Adaptations share their source's
// slot: both Polish adaptations and the Netflix series start from the short
// stories (The Last Wish slot), Sirens of the Deep adapts "A Little Sacrifice"
// (Sword of Destiny), and The Rats sits with Time of Contempt (season 3).
// Thronebreaker and Gwent are spin-offs without a slot.
// Excluded: The Witcher Remake and The Witcher IV (unreleased), the Songs of
// the Past expansion (2027), the 1990 Reporter collection (superseded by The
// Last Wish), comics, tabletop and board games, mobile spin-offs.
// Ids from Steam appdetails, Open Library search and TMDB (en-US); dates and
// story facts from Wikipedia, all checked 2026-10-05.

import type { FranchiseCfg } from './types'

export const WITCHER: FranchiseCfg = {
  id: 'witcher',
  name: 'The Witcher',
  short: 'Witcher',
  color: '#c8102e',
  heroUrl:
    'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/292030/library_hero.jpg',
  studio: 'Andrzej Sapkowski / CD Projekt Red / Netflix',
  tagline: 'Geralt of Rivia, a monster hunter for hire, and the child bound to him by destiny.',
  trivia: [
    {
      title: 'Third place in a magazine contest',
      body: 'In 1985 Andrzej Sapkowski, a 38-year-old travelling fur salesman with an economics degree, entered a short-story competition run by the Polish fantasy magazine Fantastyka at the urging of his son. His story "The Witcher" retold a Polish fairy tale about a princess turned into a monster, and came third: the jurors, he felt, ranked it down because fantasy was then considered children\'s fare in Poland.\n\nReaders disagreed, and their demand produced more stories. The Last Wish (1993) replaced the out-of-print first collection as the official first book, even though Sword of Destiny came out a year earlier, and the five-novel Witcher Saga followed at a pace of one book a year from 1994 to 1999.'
    },
    {
      title: 'Witcher, Hexer, Spellmaker',
      body: 'Sapkowski coined "wiedźmin" as a male counterpart to the Polish "wiedźma" (witch). Early English translations disagreed on what to call it: the 2001 film and the first official English translation used "Hexer", from the German word for a male witch, and a 2010 anthology chose "Spellmaker".\n\nCD Projekt settled the question with the English release of its 2007 game, titled The Witcher, and Danusia Stok\'s translation of The Last Wish used the same word that year.'
    },
    {
      title: 'A sequel nobody wrote down',
      body: 'Sapkowski had no involvement with the games: CD Projekt Red was licensed to tell a new story with his characters, set after the saga. The first game opens about five years after The Lady of the Lake, with an amnesiac Geralt waking at Kaer Morhen, and the trilogy ends with his search for Ciri in Wild Hunt.\n\nThe games outsold the books many times over, with more than 90 million copies by September 2026, over 65 million of them The Witcher 3 alone. Gwent, the card game played inside The Witcher 3, became two standalone games of its own in 2018.'
    }
  ],
  entries: [
    {
      id: 'witcher-sword-of-destiny',
      title: 'Sword of Destiny',
      mediaType: 'book',
      aliases: ['Miecz przeznaczenia'],
      externalIds: [{ source: 'openlibrary', id: 'OL2577472W' }],
      year: 1992,
      chrono: 6,
      note: 'Six linked stories; the title story introduces Ciri, the runaway princess of Cintra'
    },
    {
      id: 'witcher-last-wish',
      title: 'The Last Wish',
      mediaType: 'book',
      aliases: ['Ostatnie życzenie'],
      externalIds: [{ source: 'openlibrary', id: 'OL2577482W' }],
      year: 1993,
      chrono: 4,
      note: 'A wounded Geralt rests in a temple and recalls past contracts, including his first meeting with Yennefer'
    },
    {
      id: 'witcher-blood-of-elves',
      title: 'Blood of Elves',
      mediaType: 'book',
      aliases: ['Krew elfów'],
      externalIds: [{ source: 'openlibrary', id: 'OL2577486W' }],
      year: 1994,
      chrono: 7,
      note: 'First saga novel: Ciri, princess of a conquered Cintra, begins training as a witcher under Geralt'
    },
    {
      id: 'witcher-time-of-contempt',
      title: 'Time of Contempt',
      mediaType: 'book',
      aliases: ['The Time of Contempt', 'Czas pogardy'],
      externalIds: [{ source: 'openlibrary', id: 'OL2577481W' }],
      year: 1995,
      chrono: 8,
      note: 'Yennefer takes Ciri to the mages\' conclave on Thanedd Island, where Geralt stumbles on a coup'
    },
    {
      id: 'witcher-baptism-of-fire',
      title: 'Baptism of Fire',
      mediaType: 'book',
      aliases: ['Chrzest ognia'],
      externalIds: [{ source: 'openlibrary', id: 'OL2577480W' }],
      year: 1996,
      chrono: 9,
      note: 'Geralt leaves Brokilon to search for Ciri with Dandelion, the archer Milva and Zoltan\'s dwarves'
    },
    {
      id: 'witcher-tower-of-swallow',
      title: 'The Tower of the Swallow',
      mediaType: 'book',
      aliases: ['The Tower of Swallows', 'Wieża jaskółki'],
      externalIds: [{ source: 'openlibrary', id: 'OL2577478W' }],
      year: 1997,
      chrono: 10,
      note: 'An injured Ciri tells the hermit Vysogota how the bounty hunter Leo Bonhart slaughtered the Rats'
    },
    {
      id: 'witcher-lady-of-lake',
      title: 'The Lady of the Lake',
      mediaType: 'book',
      aliases: ['Pani Jeziora'],
      externalIds: [{ source: 'openlibrary', id: 'OL18132161W' }],
      year: 1999,
      chrono: 11,
      note: 'Final saga novel: Ciri is held among the Aen Elle elves while the Continent hunts for her'
    },
    {
      id: 'witcher-hexer-film',
      title: 'The Hexer',
      mediaType: 'movie',
      aliases: ['Wiedźmin'],
      externalIds: [{ source: 'tmdb', id: '57278' }],
      year: 2001,
      releaseDate: '2001-11-09',
      chrono: 4,
      adaptation: true,
      note: 'Polish film with Michał Żebrowski as Geralt, a two-hour condensation of the 2002 series'
    },
    {
      id: 'witcher-hexer-series',
      title: 'The Hexer',
      mediaType: 'tv',
      aliases: ['Wiedźmin'],
      externalIds: [{ source: 'tmdb', id: '17625' }],
      year: 2002,
      releaseDate: '2002-09-22',
      chrono: 4,
      adaptation: true,
      note: 'Thirteen-episode Polish series from Geralt\'s childhood at Kaer Morhen through the short stories'
    },
    {
      id: 'witcher-1',
      title: 'The Witcher',
      aliases: ['The Witcher: Enhanced Edition', 'The Witcher: Enhanced Edition Director\'s Cut'],
      externalIds: [{ source: 'steam', id: '20900' }],
      year: 2007,
      releaseDate: '2007-10-26',
      chrono: 12,
      note: 'An amnesiac Geralt wakes at Kaer Morhen and pursues the Salamandra gang that raided it'
    },
    {
      id: 'witcher-2',
      title: 'The Witcher 2: Assassins of Kings',
      aliases: ['The Witcher 2: Assassins of Kings Enhanced Edition', 'The Witcher 2'],
      externalIds: [{ source: 'steam', id: '20920' }],
      year: 2011,
      releaseDate: '2011-05-17',
      chrono: 13,
      note: 'Framed for the murder of King Foltest, Geralt hunts the real kingslayer with Roche and Triss'
    },
    {
      id: 'witcher-season-of-storms',
      title: 'Season of Storms',
      mediaType: 'book',
      aliases: ['Sezon burz'],
      externalIds: [{ source: 'openlibrary', id: 'OL18132591W' }],
      year: 2013,
      releaseDate: '2013-11-06',
      chrono: 5,
      note: 'Standalone prequel: Geralt loses his swords in Kerack and is drawn into two conspiracies'
    },
    {
      id: 'witcher-3',
      title: 'The Witcher 3: Wild Hunt',
      aliases: [
        'The Witcher 3: Wild Hunt Remastered',
        'The Witcher 3: Wild Hunt Complete Edition',
        'The Witcher 3: Wild Hunt Game of the Year Edition',
        'The Witcher 3'
      ],
      externalIds: [{ source: 'steam', id: '292030' }],
      year: 2015,
      releaseDate: '2015-05-19',
      chrono: 14,
      note: 'Geralt searches for his adopted daughter Ciri, who is on the run from the Wild Hunt'
    },
    {
      id: 'witcher-thronebreaker',
      title: 'Thronebreaker: The Witcher Tales',
      externalIds: [{ source: 'steam', id: '973760' }],
      year: 2018,
      releaseDate: '2018-10-23',
      spinOff: true,
      note: 'Card-battle RPG: Queen Meve of Lyria and Rivia fights back as Nilfgaard invades the North'
    },
    {
      id: 'witcher-gwent',
      title: 'Gwent: The Witcher Card Game',
      aliases: ['Gwent'],
      externalIds: [{ source: 'steam', id: '1284410' }],
      year: 2018,
      releaseDate: '2018-10-23',
      spinOff: true,
      note: 'Free-to-play standalone version of the card game played inside The Witcher 3'
    },
    {
      id: 'witcher-netflix',
      title: 'The Witcher',
      mediaType: 'tv',
      externalIds: [{ source: 'tmdb', id: '71912' }],
      year: 2019,
      releaseDate: '2019-12-20',
      chrono: 4,
      adaptation: true,
      note: 'Netflix series; seasons adapt the short stories, then Blood of Elves, Time of Contempt and Baptism of Fire'
    },
    {
      id: 'witcher-nightmare-wolf',
      title: 'The Witcher: Nightmare of the Wolf',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '666243' }],
      year: 2021,
      releaseDate: '2021-08-23',
      chrono: 2,
      note: 'Animated origin story of Geralt\'s mentor Vesemir, from servant boy to witcher of Kaer Morhen'
    },
    {
      id: 'witcher-blood-origin',
      title: 'The Witcher: Blood Origin',
      mediaType: 'tv',
      externalIds: [{ source: 'tmdb', id: '106541' }],
      year: 2022,
      releaseDate: '2022-12-25',
      chrono: 1,
      note: 'Prequel miniseries set 1,200 years earlier, at the creation of the first witcher'
    },
    {
      id: 'witcher-crossroads-of-ravens',
      title: 'Crossroads of Ravens',
      mediaType: 'book',
      aliases: ['Rozdroże kruków', 'Wiedźmin. Rozdroże kruków'],
      externalIds: [
        { source: 'openlibrary', id: 'OL42292378W' },
        { source: 'openlibrary', id: 'OL44550081W' }
      ],
      year: 2024,
      releaseDate: '2024-11-29',
      chrono: 3,
      note: 'A young Geralt, fresh from Kaer Morhen, is saved from the gallows by the ailing witcher Preston Holt'
    },
    {
      id: 'witcher-sirens-deep',
      title: 'The Witcher: Sirens of the Deep',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '1203329' }],
      year: 2025,
      releaseDate: '2025-02-11',
      chrono: 6,
      adaptation: true,
      note: 'Animated film loosely adapting "A Little Sacrifice": Geralt caught between merpeople and a coastal kingdom'
    },
    {
      id: 'witcher-rats',
      title: 'The Rats: A Witcher Tale',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '1571470' }],
      year: 2025,
      releaseDate: '2025-10-30',
      chrono: 8,
      note: 'The young gang of the Rats attempts a dangerous heist before they meet Ciri'
    }
  ],
  characters: [
    {
      id: 'witcher-geralt',
      name: 'Geralt of Rivia',
      role: 'Witcher',
      portraitUrl: 'https://image.tmdb.org/t/p/w300_and_h450_face/kN3A5oLgtKYAxa9lAkpsIGYKYVo.jpg',
      appearsIn: [
        'witcher-last-wish',
        'witcher-sword-of-destiny',
        'witcher-blood-of-elves',
        'witcher-time-of-contempt',
        'witcher-baptism-of-fire',
        'witcher-tower-of-swallow',
        'witcher-lady-of-lake',
        'witcher-season-of-storms',
        'witcher-crossroads-of-ravens',
        'witcher-hexer-film',
        'witcher-hexer-series',
        'witcher-netflix',
        'witcher-sirens-deep',
        'witcher-1',
        'witcher-2',
        'witcher-3'
      ],
      blurb:
        'A monster hunter given superhuman abilities by the witchers\' mutations, known as the White Wolf and the Butcher of Blaviken, who is linked to Ciri by destiny.'
    },
    {
      id: 'witcher-ciri',
      name: 'Ciri',
      role: 'Princess of Cintra',
      portraitUrl: 'https://image.tmdb.org/t/p/w300_and_h450_face/8RuLG2mePw8YgFNUjWROBuxMrwT.jpg',
      appearsIn: [
        'witcher-sword-of-destiny',
        'witcher-blood-of-elves',
        'witcher-time-of-contempt',
        'witcher-tower-of-swallow',
        'witcher-lady-of-lake',
        'witcher-hexer-series',
        'witcher-netflix',
        'witcher-3'
      ],
      blurb:
        'Calanthe\'s granddaughter and the last descendant of Lara Dorren, whose Elder Blood lets her cross space and time; Geralt\'s destiny and adopted daughter.'
    },
    {
      id: 'witcher-yennefer',
      name: 'Yennefer of Vengerberg',
      role: 'Sorceress',
      portraitUrl: 'https://image.tmdb.org/t/p/w300_and_h450_face/c3QiX7znSjTR7u2xj29KH6DAnMs.jpg',
      appearsIn: [
        'witcher-last-wish',
        'witcher-sword-of-destiny',
        'witcher-time-of-contempt',
        'witcher-lady-of-lake',
        'witcher-hexer-film',
        'witcher-hexer-series',
        'witcher-netflix',
        'witcher-3'
      ],
      blurb:
        'A powerful sorceress who becomes Geralt\'s lover and a mother figure to Ciri; Sapkowski wrote her to refuse the fantasy cliche of the hero\'s easy conquest.'
    },
    {
      id: 'witcher-dandelion',
      name: 'Dandelion (Jaskier)',
      role: 'Bard',
      portraitUrl: 'https://image.tmdb.org/t/p/w300_and_h450_face/4uo4JPaK6KpdN7v8C1pbwKpNVJU.jpg',
      appearsIn: [
        'witcher-sword-of-destiny',
        'witcher-baptism-of-fire',
        'witcher-tower-of-swallow',
        'witcher-season-of-storms',
        'witcher-hexer-film',
        'witcher-hexer-series',
        'witcher-netflix',
        'witcher-blood-origin',
        'witcher-sirens-deep',
        'witcher-1',
        'witcher-3'
      ],
      blurb:
        'Poet, minstrel and Geralt\'s best friend, whose ballads made the romance of Geralt and Yennefer famous; he joins the company searching for Ciri.'
    },
    {
      id: 'witcher-triss',
      name: 'Triss Merigold',
      role: 'Sorceress',
      portraitUrl: 'https://image.tmdb.org/t/p/w300_and_h450_face/te5rydQcq4v5m6Y8CVUT430rh1C.jpg',
      appearsIn: ['witcher-netflix', 'witcher-1', 'witcher-2', 'witcher-3'],
      blurb:
        'A sorceress of the Lodge, friend to Geralt and Yennefer and an older sister to Ciri, who is in love with Geralt and stands at his side through the first two games.'
    },
    {
      id: 'witcher-vesemir',
      name: 'Vesemir',
      role: 'Witcher of Kaer Morhen',
      portraitUrl: 'https://image.tmdb.org/t/p/w300_and_h450_face/koWU6vb82cuCDLeYE1erqnQ39cW.jpg',
      appearsIn: [
        'witcher-nightmare-wolf',
        'witcher-hexer-series',
        'witcher-netflix',
        'witcher-1',
        'witcher-3'
      ],
      blurb:
        'The oldest living witcher and Geralt\'s mentor and father figure, who once traded a servant\'s life for the trials of Kaer Morhen.'
    }
  ]
}
