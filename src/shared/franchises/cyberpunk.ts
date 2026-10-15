// Cyberpunk — CD Projekt Red's Cyberpunk 2077 (2020), its Phantom Liberty
// expansion (a Steam DLC app with its own id, so its own row) and Studio
// Trigger's Cyberpunk: Edgerunners (2022, AniList anime). The universe began
// as Mike Pondsmith's tabletop role-playing game; that is trivia only here.
// Chrono is in-universe: Edgerunners (2075-2076) comes first, then Cyberpunk
// 2077; Phantom Liberty is played inside the base game's story and shares its
// slot.
// Excluded: Cyberpunk: Edgerunners 2 (AniList lists it for 2026-10-20, after
// the cutoff), REDmod and the bonus-content apps, the tabletop books, comics
// and the Cyberpunk 2077 soundtrack single Let You Down.
// Ids from Steam appdetails and AniList; dates from Wikipedia (the game's
// original release, a day later than Steam's UTC date) and AniList, all
// checked 2026-10-14.

import type { FranchiseCfg } from './types'

const AL = 'https://s4.anilist.co/file/anilistcdn'
const ST = 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps'

export const CYBERPUNK: FranchiseCfg = {
  id: 'cyberpunk',
  name: 'Cyberpunk',
  short: 'Cyberpunk',
  color: '#f5e61d',
  heroUrl: `${ST}/1091500/library_hero.jpg`,
  studio: 'CD Projekt Red / Studio Trigger',
  tagline: 'Night City sells upgrades for the body and takes the person in exchange.',
  trivia: [
    {
      title: 'A tabletop game first',
      body: 'Cyberpunk began as a pen-and-paper role-playing game by Mike Pondsmith: the first edition came out in 1988 and Cyberpunk 2020 in 1990. CD Projekt Red built Cyberpunk 2077 as a first-person open-world game in that universe, set in Night City, with Keanu Reeves performing and appearing as the rockerboy Johnny Silverhand.'
    },
    {
      title: 'A rough launch and a long recovery',
      body: 'Cyberpunk 2077 launched on December 10, 2020, to bugs that were especially severe on the PlayStation 4 and Xbox One; Sony removed it from the PlayStation Store later that month and restored it in June 2021. Large patches followed, and Phantom Liberty, a spy-thriller expansion with Idris Elba as Solomon Reed, arrived on September 26, 2023, days after the game\'s 2.0 update.'
    },
    {
      title: 'The anime is a prequel',
      body: 'Cyberpunk: Edgerunners was produced by CD Projekt Red with Studio Trigger and premiered on Netflix on September 13, 2022, as a standalone ten-episode story that takes place from 2075 to 2076, with the street kid David Martinez at its centre.'
    }
  ],
  entries: [
    {
      id: 'cp-2077',
      title: 'Cyberpunk 2077',
      externalIds: [{ source: 'steam', id: '1091500' }],
      year: 2020,
      releaseDate: '2020-12-10',
      chrono: 2,
      mc: 86,
      note: 'Open-world RPG: V, a mercenary in Night City, carries a chip that holds a dead rockerboy\'s mind'
    },
    {
      id: 'cp-edgerunners',
      title: 'Cyberpunk: Edgerunners',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '120377' }],
      year: 2022,
      releaseDate: '2022-09-13',
      chrono: 1,
      mc: 85,
      note: 'Studio Trigger\'s ten-episode prequel: a street kid becomes an edgerunner after losing everything'
    },
    {
      id: 'cp-phantom-liberty',
      title: 'Cyberpunk 2077: Phantom Liberty',
      aliases: ['Phantom Liberty'],
      externalIds: [{ source: 'steam', id: '2138330' }],
      year: 2023,
      releaseDate: '2023-09-26',
      chrono: 2,
      note: 'Expansion set in the walled district of Dogtown, a spy thriller built around a downed presidential shuttle'
    }
  ],
  characters: [
    {
      id: 'cp-david',
      name: 'David Martinez',
      role: 'Edgerunner',
      portraitUrl: `${AL}/character/large/b284158-z1uGKC3IYVa1.png`,
      appearsIn: ['cp-edgerunners'],
      blurb: 'A street kid from Santo Domingo who gets a military-grade implant and joins a crew of edgerunners.'
    },
    {
      id: 'cp-lucy',
      name: 'Lucy',
      role: 'Netrunner',
      portraitUrl: `${AL}/character/large/b284157-cqYawN7XCNJx.jpg`,
      appearsIn: ['cp-edgerunners'],
      blurb: 'A netrunner who dreams of reaching the Moon, and the person David follows deeper into the work.'
    },
    {
      id: 'cp-maine',
      name: 'Maine',
      role: 'Crew leader',
      portraitUrl: `${AL}/character/large/b284159-RvuKShSpDOS5.png`,
      appearsIn: ['cp-edgerunners'],
      blurb: 'The heavily augmented leader of the edgerunner crew that takes David in.'
    },
    {
      id: 'cp-rebecca',
      name: 'Rebecca',
      role: 'Edgerunner',
      portraitUrl: `${AL}/character/large/b284163-tt8smoAXl24x.jpg`,
      appearsIn: ['cp-edgerunners'],
      blurb: 'A hard-fighting gunslinger on Maine\'s crew.'
    },
    {
      id: 'cp-kiwi',
      name: 'Kiwi',
      role: 'Edgerunner',
      portraitUrl: `${AL}/character/large/b284161-QlVuoXKKONLM.jpg`,
      appearsIn: ['cp-edgerunners'],
      blurb: 'A netrunner and member of Maine\'s crew.'
    },
    {
      id: 'cp-dorio',
      name: 'Dorio',
      role: 'Edgerunner',
      portraitUrl: `${AL}/character/large/b284160-pfwyNhxrsZOP.png`,
      appearsIn: ['cp-edgerunners'],
      blurb: 'A member of Maine\'s crew.'
    }
  ]
}
