// Ys — curated canon: Nihon Falcom's mainline Ys games from Ys I & II (1987-88)
// through Ys X: Nordics, plus the two OVAs that adapt Ys I and Ys II. Ys I and
// Ys II were written as one story split across two releases, so they share one
// row (dated from Ys I); Chronicles, Chronicles+, Complete and the Eternal
// remakes are ALIASES of it, the Persona rule. Ys IV is one row for both
// licensed 1993 versions (Tonkin House's Mask of the Sun, Hudson's The Dawn of
// Ys), with Falcom's own Memories of Celceta as its remake row; The Oath in
// Felghana is the remake row of Ys III. Ys X: Proud Nordics (2025) and the
// Memoire remasters are aliases of their base games. The Clouded Leopard
// (Asian-language) Steam releases of IX and X are extra ids beside the NIS
// America ones. Excluded: Ys V's 2006 Taito PS2 remake, Ys vs. Trails in the
// Sky, the Ys Online games, the unreleased Ys VIII mobile adaptation, drama CDs,
// manga and novels.
// Story order = Falcom's published Adol chronology (series portal, as tabled
// on Wikipedia's Ys (series) article), with Ys Origin first because it is set
// about 700 years before Ys I: Origin -> I & II -> X -> IV / Celceta ->
// III / Felghana -> V -> VIII -> VI -> Seven -> IX. Remakes and the OVAs share
// their source's slot.
// Dates are first Japanese releases (Wikipedia infoboxes); Steam ids verified
// with appdetails, AniList ids and art curl-verified 2026-10-05.

import type { FranchiseCfg } from './types'

export const YS: FranchiseCfg = {
  id: 'ys',
  name: 'Ys',
  short: 'Ys',
  color: '#d8443c',
  heroUrl:
    'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3949290/library_hero.jpg',
  studio: 'Nihon Falcom',
  tagline: 'One red-haired adventurer, more than a hundred journals.',
  trivia: [
    {
      title: 'Adol’s journals',
      body: 'Most Ys games are framed as adaptations of the travel journals of Adol Christin, who leaves home at 16 and sets out on his first major adventure at 17. Falcom says he left more than one hundred such records, which lets it tell his journeys in any order: Ys X takes place shortly after Ys II, and Ys VIII comes before Ys VI.\n\nYs Origin is the exception. It is set about 700 years before Ys I and follows a search party sent after the twin goddesses Feena and Reah, not Adol.'
    },
    {
      title: 'From bump combat to Cross Action',
      body: 'Ys I and II used contact-based "bump" combat: Adol attacks by walking into enemies, and hitting them off-centre is safer than meeting them head-on. Ys III switched to side-scrolling swordplay, Ys V added an attack button, jumping and alchemy, and Ys VI built the engine that The Oath in Felghana and Ys Origin reused.\n\nYs Seven replaced the lone hero with a switchable party of three and introduced Flash Guard, the framework for Celceta, VIII and IX. Ys X cut the party to two, Adol and Karja, and added sailing and naval battles.'
    },
    {
      title: 'Split, licensed and remade',
      body: 'The original concept for Ys was too big for Falcom’s schedule and storage, so it was divided into Ys I (1987) and Ys II (1988). Yuzo Koshiro, still in his teens, wrote music for both alongside Mieko Ishikawa and Falcom’s sound staff.\n\nFor Ys IV, Falcom wrote the planning materials and music but licensed two different games to Hudson Soft and Tonkin House, both released in 1993; it told the Celceta story itself in Memories of Celceta (2012). Ys V never had an official English release, and a 2013 fan translation made every numbered game released at the time playable in English.'
    }
  ],
  entries: [
    {
      id: 'ys-1-2',
      title: 'Ys I & II',
      aliases: [
        'Ys I',
        'Ys II',
        'Ys I: Ancient Ys Vanished',
        'Ys II: Ancient Ys Vanished - The Final Chapter',
        'Ys: The Vanished Omens',
        'Ys Book I & II',
        'Ys Eternal',
        'Ys II Eternal',
        'Ys I & II Complete',
        'Ys I & II Chronicles+'
      ],
      externalIds: [{ source: 'steam', id: '223810' }],
      year: 1987,
      releaseDate: '1987-06-21',
      chrono: 2,
      note: 'Adol washes up on storm-walled Esteria, gathers the six Books of Ys and rises to the floating land'
    },
    {
      id: 'ys-3',
      title: 'Ys III: Wanderers from Ys',
      aliases: ['Ys III'],
      year: 1989,
      releaseDate: '1989-07-21',
      chrono: 5,
      note: 'Adol follows Dogi home to Felghana, where Count McGuire hunts the statues sealing Galbalan'
    },
    {
      id: 'ys-ova-1',
      title: 'Ys',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '1276' }],
      year: 1989,
      releaseDate: '1989-11-21',
      chrono: 2,
      adaptation: true,
      note: 'Seven-episode OVA of Ys I: Adol against Dark Fact on Esteria'
    },
    {
      id: 'ys-ova-2',
      title: 'Ys II: Castle in the Heavens',
      mediaType: 'anime',
      aliases: ['Ys: Tenkuu no Shinden - Adol Christine no Bouken'],
      externalIds: [{ source: 'anilist', id: '1277' }],
      year: 1992,
      releaseDate: '1992-12-16',
      chrono: 2,
      adaptation: true,
      note: 'Four-episode OVA sequel: Adol carries the fight to the floating land of Ys'
    },
    {
      id: 'ys-4',
      title: 'Ys IV',
      aliases: ['Ys IV: Mask of the Sun', 'Ys IV: The Dawn of Ys'],
      year: 1993,
      releaseDate: '1993-11-19',
      chrono: 4,
      note: 'Adol’s journey into the forest of Celceta'
    },
    {
      id: 'ys-5',
      title: 'Ys V: Lost Kefin, Kingdom of Sand',
      aliases: ['Ys V', 'Ys V Expert'],
      year: 1995,
      releaseDate: '1995-12-29',
      chrono: 6,
      note: 'In the Afrocan desert Adol searches for Kefin, a city of alchemy lost for five centuries'
    },
    {
      id: 'ys-6',
      title: 'Ys VI: The Ark of Napishtim',
      externalIds: [{ source: 'steam', id: '312540' }],
      year: 2003,
      releaseDate: '2003-09-27',
      chrono: 8,
      note: 'Swept through the Great Vortex of Canaan, Adol lands among the Rehda and the Eldeen’s Ark'
    },
    {
      id: 'ys-felghana',
      title: 'Ys: The Oath in Felghana',
      aliases: ['Ys Memoire: The Oath in Felghana'],
      externalIds: [{ source: 'steam', id: '207320' }],
      year: 2005,
      releaseDate: '2005-06-30',
      chrono: 5,
      remake: true,
      note: 'Ys III rebuilt in 3D: Chester’s war on McGuire and the return of Galbalan'
    },
    {
      id: 'ys-origin',
      title: 'Ys Origin',
      externalIds: [{ source: 'steam', id: '207350' }],
      year: 2006,
      releaseDate: '2006-12-21',
      chrono: 1,
      note: '700 years before Adol, Yunica and Hugo climb Darm Tower after the vanished goddesses'
    },
    {
      id: 'ys-seven',
      title: 'Ys Seven',
      externalIds: [{ source: 'steam', id: '587100' }],
      year: 2009,
      releaseDate: '2009-09-17',
      chrono: 9,
      note: 'Adol and Dogi in Altago, where the Five Great Dragons drive a cycle of destruction'
    },
    {
      id: 'ys-celceta',
      title: 'Ys: Memories of Celceta',
      aliases: [
        'Ys: Memories of Celceta Kai',
        'Ys Memoire: Memories of Celceta',
        'Ys Memoire: Revelations in Celceta'
      ],
      externalIds: [{ source: 'steam', id: '587110' }],
      year: 2012,
      releaseDate: '2012-09-27',
      chrono: 4,
      remake: true,
      note: 'An amnesiac Adol maps the forest of Celceta for Governor-General Griselda'
    },
    {
      id: 'ys-8',
      title: 'Ys VIII: Lacrimosa of Dana',
      externalIds: [{ source: 'steam', id: '579180' }],
      year: 2016,
      releaseDate: '2016-07-21',
      chrono: 7,
      note: 'Shipwrecked on the Isle of Seiren, Adol dreams of Dana, last of the Eternians'
    },
    {
      id: 'ys-9',
      title: 'Ys IX: Monstrum Nox',
      externalIds: [
        { source: 'steam', id: '1351630' },
        { source: 'steam', id: '1732330' }
      ],
      year: 2019,
      releaseDate: '2019-09-26',
      chrono: 10,
      note: 'Jailed in Balduq, Adol is made a Monstrum and fights in the Grimwald Nox'
    },
    {
      id: 'ys-10',
      title: 'Ys X: Nordics',
      aliases: ['Ys X: Proud Nordics'],
      externalIds: [
        { source: 'steam', id: '2731870' },
        { source: 'steam', id: '2570810' },
        { source: 'steam', id: '3949290' },
        { source: 'steam', id: '3821790' }
      ],
      year: 2023,
      releaseDate: '2023-09-28',
      chrono: 3,
      note: 'Young Adol is bound to Karja Balta of the seafaring Normans against the immortal Griegr'
    }
  ],
  characters: [
    {
      id: 'ys-adol',
      name: 'Adol Christin',
      role: 'The red-haired adventurer',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b5752-j2oFeKIeswp8.png',
      appearsIn: [
        'ys-1-2',
        'ys-3',
        'ys-ova-1',
        'ys-ova-2',
        'ys-4',
        'ys-5',
        'ys-6',
        'ys-felghana',
        'ys-seven',
        'ys-celceta',
        'ys-8',
        'ys-9',
        'ys-10'
      ],
      blurb: 'The hero of every journey but Origin, mostly silent, whose travel journals are the stories. Falcom’s president has described him as a character expressed through actions rather than words.'
    },
    {
      id: 'ys-dogi',
      name: 'Dogi',
      role: 'Adol’s companion',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b24041-wrp9fnTZUmpu.png',
      appearsIn: [
        'ys-1-2',
        'ys-3',
        'ys-ova-1',
        'ys-ova-2',
        'ys-6',
        'ys-felghana',
        'ys-seven',
        'ys-9'
      ],
      blurb: 'Met on Adol’s first adventure and at his side on many after it. Ys III and The Oath in Felghana take the pair to Dogi’s homeland of Felghana.'
    },
    {
      id: 'ys-feena',
      name: 'Feena',
      role: 'Goddess of Ys',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b24037-biaPn3tbkUWL.png',
      appearsIn: ['ys-1-2', 'ys-ova-1', 'ys-ova-2', 'ys-origin'],
      blurb: 'The amnesiac girl Adol rescues on Esteria, revealed as one of the twin goddesses of Ys. After Darm falls she and Reah enter a long sleep to watch over the land.'
    },
    {
      id: 'ys-reah',
      name: 'Reah',
      role: 'Goddess of Ys',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b24038-TQu63QdPAoCD.png',
      appearsIn: ['ys-1-2', 'ys-ova-1', 'ys-ova-2', 'ys-origin'],
      blurb: 'Feena’s twin. The goddesses’ Black Pearl gave ancient Ys its magic and also gave rise to the demons; Origin follows the search for both sisters seven centuries earlier.'
    },
    {
      id: 'ys-dark-fact',
      name: 'Dark Fact',
      role: 'Master of Darm Tower (Ys I)',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b24045-vTcG87GAu5tn.png',
      appearsIn: ['ys-1-2', 'ys-ova-1'],
      blurb: 'A descendant of the priest Fact who confronts Adol in Darm Tower, seeking the power held in the Books of Ys. Defeating him sends Adol up to the floating land.'
    },
    {
      id: 'ys-dana',
      name: 'Dana Iclucia',
      role: 'Last of the Eternians (Ys VIII)',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b238821-zwarx2wBwM34.png',
      appearsIn: ['ys-8'],
      blurb: 'A girl from a prehistoric civilization who appears in Adol’s dreams on the Isle of Seiren. When the castaways find her waking from a long slumber, she has no memory of why she alone survived.'
    }
  ]
}
