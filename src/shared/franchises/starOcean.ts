// Star Ocean — curated canon: tri-Ace's six numbered games, the two full
// remakes (First Departure of the first game, The Second Story R) as remake
// rows, and the Star Ocean EX anime of The Second Story. First Departure R
// (2019) is an ALIAS of First Departure and Second Evolution an alias of The
// Second Story, the Persona rule; the Last Hope International and 4K remaster
// and the Till the End of Time Director's Cut are aliases of their base games.
// Excluded: Blue Sphere (a Game Boy Color sequel to The Second Story),
// Material Trader and Anamnesis (discontinued mobile games), and the manga.
// Story order = Space Date (S.D.) year, per Wikipedia and Japanese Wikipedia
// for The Divine Force: The Last Hope (S.D. 10) -> Star Ocean (346) -> The
// Second Story (366) -> Integrity and Faithlessness (537) -> The Divine Force
// (583) -> Till the End of Time (772). Remakes and the anime share their
// source's slot. mc values are the Metacritic scores tabled on Wikipedia's
// series article (First Departure's is its PSP score).
// Dates are first Japanese releases; Steam ids verified with appdetails,
// AniList ids and art curl-verified 2026-10-05.

import type { FranchiseCfg } from './types'

export const STAR_OCEAN: FranchiseCfg = {
  id: 'star-ocean',
  name: 'Star Ocean',
  short: 'Star Ocean',
  color: '#5aa6e8',
  heroUrl:
    'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2238900/library_hero.jpg',
  studio: 'tri-Ace / Square Enix (Enix)',
  tagline: 'Starfarers stranded on swords-and-sorcery worlds.',
  trivia: [
    {
      title: 'Private actions',
      body: 'The first Star Ocean (1996) introduced private actions: hidden relationship points between the hero and each companion that shift with the player’s choices and steer the story toward different endings. The Second Story expanded the idea to as many as 86 endings, and the relationships also change how characters behave towards each other in battle.\n\nThe battles themselves were real-time from the start, with every character free to move, dodge and chase enemies across the field.'
    },
    {
      title: 'Star Trek on an underdeveloped planet',
      body: 'tri-Ace’s developers were science-fiction fans and cite Star Trek as a main influence. Producer Shuichi Kobayashi named first contact between two societies as one of the series’ central themes, and most games set much of their story on an underdeveloped planet whose people meet visitors from the stars.\n\nThe games are spread across almost eight centuries of Space Date history. The Last Hope, released fourth, is the prequel to the whole series, set in S.D. 10 as humanity leaves a ruined Earth after World War III; Till the End of Time, released third, comes last, in S.D. 772.'
    },
    {
      title: 'tri-Ace’s first game',
      body: 'Star Ocean was the first game from tri-Ace, a studio formed by staff who had left Wolf Team, unhappy with how Tales of Phantasia was developed with Namco. It shipped only in Japan, on a Super Famicom cartridge with a special compression chip, and English players knew it only through a fan translation until the First Departure remake reached the West in 2008.\n\nMotoi Sakuraba is the series’ regular composer, and his progressive-rock style was there from the first score.'
    }
  ],
  entries: [
    {
      id: 'so-1',
      title: 'Star Ocean',
      year: 1996,
      releaseDate: '1996-07-19',
      chrono: 2,
      note: 'Roddick seeks a cure for a sickness on his planet, helped by two Earthlings'
    },
    {
      id: 'so-2',
      title: 'Star Ocean: The Second Story',
      aliases: ['Star Ocean: Second Story', 'Star Ocean: Second Evolution'],
      year: 1998,
      releaseDate: '1998-07-30',
      chrono: 3,
      mc: 80,
      note: 'Claude is teleported to Expel, where Rena takes him for the legendary Hero of Light'
    },
    {
      id: 'so-ex',
      title: 'Star Ocean EX',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '1005' }],
      year: 2001,
      releaseDate: '2001-04-03',
      chrono: 3,
      adaptation: true,
      note: 'Studio DEEN’s 26-episode TV adaptation of The Second Story'
    },
    {
      id: 'so-3',
      title: 'Star Ocean: Till the End of Time',
      aliases: ['Star Ocean 3', 'Star Ocean: Till the End of Time Director’s Cut'],
      year: 2003,
      releaseDate: '2003-02-27',
      chrono: 6,
      mc: 80,
      note: 'Separated from his family in a Vendeeni attack, Fayt is hunted across space'
    },
    {
      id: 'so-first-departure',
      title: 'Star Ocean: First Departure',
      aliases: ['Star Ocean: First Departure R'],
      year: 2007,
      releaseDate: '2007-12-27',
      chrono: 2,
      mc: 74,
      remake: true,
      note: 'Remake of the first game on The Second Story’s engine, fully voiced'
    },
    {
      id: 'so-4',
      title: 'Star Ocean: The Last Hope',
      aliases: [
        'Star Ocean 4: The Last Hope',
        'Star Ocean: The Last Hope International',
        'Star Ocean: The Last Hope 4K & Full HD Remaster'
      ],
      externalIds: [{ source: 'steam', id: '609150' }],
      year: 2009,
      releaseDate: '2009-02-19',
      chrono: 1,
      mc: 72,
      note: 'After World War III, Edge Maverick and Reimi join humanity’s first expedition to the stars'
    },
    {
      id: 'so-5',
      title: 'Star Ocean: Integrity and Faithlessness',
      aliases: ['Star Ocean 5: Integrity and Faithlessness'],
      year: 2016,
      releaseDate: '2016-03-31',
      chrono: 4,
      mc: 58,
      note: 'First contact with a space-faring race throws Fidel’s home planet Faykreed into chaos'
    },
    {
      id: 'so-6',
      title: 'Star Ocean: The Divine Force',
      aliases: ['Star Ocean 6: The Divine Force'],
      externalIds: [{ source: 'steam', id: '1776380' }],
      year: 2022,
      releaseDate: '2022-10-27',
      chrono: 5,
      mc: 70,
      note: 'After a Federation warship sinks his freighter, a cargo captain lands on an underdeveloped planet at war'
    },
    {
      id: 'so-2r',
      title: 'Star Ocean: The Second Story R',
      externalIds: [{ source: 'steam', id: '2238900' }],
      year: 2023,
      releaseDate: '2023-11-02',
      chrono: 3,
      remake: true,
      note: 'Remake of The Second Story'
    }
  ],
  characters: [
    {
      id: 'so-roddick',
      name: 'Roddick Farrence',
      role: 'Protagonist (Star Ocean)',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/24399.jpg',
      appearsIn: ['so-1', 'so-first-departure'],
      blurb: 'The hero of the first game, who searches for a cure for the sickness on his planet with the help of two visitors from Earth.'
    },
    {
      id: 'so-claude',
      name: 'Claude C. Kenny',
      role: 'Protagonist (The Second Story)',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b1823-XttAjHFmW8Xx.png',
      appearsIn: ['so-2', 'so-ex', 'so-2r'],
      blurb: 'A newly commissioned Earth Federation ensign and the son of Ronyx J. Kenny from the first game. A device on the planet Milocinia sends him to Expel, where his standard-issue phase gun gets him mistaken for the legendary Hero of Light.'
    },
    {
      id: 'so-rena',
      name: 'Rena Lanford',
      role: 'Heroine (The Second Story)',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b1824-wf9ERXK39AAe.png',
      appearsIn: ['so-2', 'so-ex', 'so-2r'],
      blurb: 'A girl from the village of Arlia on Expel, who mistakes Claude for the legendary Hero of Light and draws him into the mystery of the Sorcery Globe.'
    },
    {
      id: 'so-fayt',
      name: 'Fayt Leingod',
      role: 'Protagonist (Till the End of Time)',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/19089.jpg',
      appearsIn: ['so-3'],
      blurb: 'Son of the symbological geneticist Robert Leingod. A Vendeeni attack on the resort planet Hyda IV separates him from his family and sets enemies after him for reasons he does not understand.'
    },
    {
      id: 'so-sophia',
      name: 'Sophia Esteed',
      role: 'Fayt’s childhood friend (Till the End of Time)',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/19091.jpg',
      appearsIn: ['so-3'],
      blurb: 'Fayt’s childhood friend, whose family was on holiday with his on Hyda IV when the Vendeeni attacked.'
    },
    {
      id: 'so-cliff',
      name: 'Cliff Fittir',
      role: 'Agent of Quark (Till the End of Time)',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/19129.jpg',
      appearsIn: ['so-3'],
      blurb: 'A member of the anti-Federation organization Quark who tracks Fayt down on Vanguard III because Quark’s leader wants to speak to him.'
    }
  ]
}
