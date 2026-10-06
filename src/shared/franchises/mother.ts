// Mother — curated canon: Shigesato Itoi's three Nintendo role-playing games,
// Mother (EarthBound Beginnings), Mother 2 (EarthBound) and Mother 3. Western
// titles lead, with the Japanese names as aliases. No Steam releases and no
// anime adaptation exist. Excluded: the Mother 1+2 compilation (both games
// already have rows), the unreleased EarthBound 64, manga and tribute comics.
// No story order: each sequel follows the one before it (Mother in 1988,
// EarthBound in an unnamed year of the 1990s, Mother 3 an unknown length of time
// after EarthBound), so story order would only repeat the release order.
// Dates are first Japanese releases (Wikipedia). There is no Steam art and no
// anime banner, so the hero is the AniList banner of the official Mother
// tribute comic, and portraits come from that comic's character art; all art
// curl-verified 2026-10-05.

import type { FranchiseCfg } from './types'

export const MOTHER: FranchiseCfg = {
  id: 'mother',
  name: 'Mother',
  short: 'Mother',
  color: '#e35d8f',
  heroUrl: 'https://s4.anilist.co/file/anilistcdn/media/manga/banner/119014-PIlSWKXpHGu3.jpg',
  studio: 'Ape / HAL Laboratory / Brownie Brown (Nintendo)',
  tagline: 'Psychic kids, baseball bats and the end of the world.',
  trivia: [
    {
      title: 'An RPG set in a parody America',
      body: 'Writer and director Shigesato Itoi pitched Mother to Shigeru Miyamoto while visiting Nintendo on other business. Miyamoto turned it down at first, then gave him a team. The game borrowed Dragon Quest’s structure but swapped fantasy for an offbeat parody of late-20th-century America: hospitals restore health, baseball bats and toy guns are weapons, and the enemies include aliens, robots and brainwashed animals and people.\n\nMother sold around 400,000 copies on release.'
    },
    {
      title: 'EarthBound, Zero and Beginnings',
      body: 'An English Mother was finished as Earth Bound and then shelved as commercially unviable; a prototype later circulated online as EarthBound Zero. Mother 2 therefore reached America in 1995 simply as EarthBound, sold by a $2 million campaign that proclaimed "This game stinks." It sold poorly there, and its cult following grew after Ness became a playable fighter in Super Smash Bros.\n\nThe first game finally came out worldwide in June 2015 as EarthBound Beginnings, marking 20 years since EarthBound’s American release. Satoru Iwata was EarthBound’s lead programmer, and the game faced repeated threats of cancellation until he joined the team.'
    },
    {
      title: 'Twelve years and four consoles',
      body: 'Mother 3 began in 1994 on the Super Famicom, moved to the Nintendo 64 and its 64DD add-on as EarthBound 64, was cancelled in 2000, and was restarted in 2003 for the Game Boy Advance. It is more mature and dramatic than its predecessors, dealing with loss and grief, capitalism and consumerism, and rebellion against tyranny.\n\nNintendo never released it outside Japan. A fan translation by the Starmen.net community in 2008 was downloaded more than 100,000 times in its first week.'
    }
  ],
  entries: [
    {
      id: 'mother-1',
      title: 'EarthBound Beginnings',
      aliases: ['Mother', 'EarthBound Zero'],
      year: 1989,
      releaseDate: '1989-07-27',
      note: 'In 1988 Ninten uses his great-grandfather’s psychic research to stop paranormal outbreaks across America'
    },
    {
      id: 'mother-2',
      title: 'EarthBound',
      aliases: ['Mother 2', 'Mother 2: Gīgu no Gyakushū'],
      year: 1994,
      releaseDate: '1994-08-27',
      note: 'After a meteorite lands in Eagleland, Ness gathers eight melodies to stop the cosmic destroyer Giygas'
    },
    {
      id: 'mother-3',
      title: 'Mother 3',
      year: 2006,
      releaseDate: '2006-04-20',
      note: 'The Pigmask Army remakes Tazmily Village, and Lucas races a masked man to pull the Needles'
    }
  ],
  characters: [
    {
      id: 'mother-ninten',
      name: 'Ninten',
      role: 'Protagonist (Mother)',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b227515-7oKhL7gM3SBX.png',
      appearsIn: ['mother-1'],
      blurb: 'A boy from the town of Mother’s Day whose house is attacked by a poltergeist. He collects the eight melodies of a song from the dreams of Queen Mary of Magicant.'
    },
    {
      id: 'mother-ness',
      name: 'Ness',
      role: 'Protagonist (EarthBound)',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b27049-DxvXQiyEq6QC.jpg',
      appearsIn: ['mother-2'],
      blurb: 'Warned by Buzz-Buzz, a creature from the future, that Giygas will engulf the world in ten years. To defeat him the party ends up moving their souls into robots and travelling back in time.'
    },
    {
      id: 'mother-paula',
      name: 'Paula',
      role: 'Psychic girl (EarthBound)',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b227525-pSHv9m2qYFna.png',
      appearsIn: ['mother-2'],
      blurb: 'Rescued by Ness from a cult in Happy Happy Village that was exploiting her psychic powers. In the final battle her prayers to the world turn the fight against Giygas.'
    },
    {
      id: 'mother-jeff',
      name: 'Jeff',
      role: 'Boy scientist (EarthBound)',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b227520-R2MQ0R0QZ9Ds.png',
      appearsIn: ['mother-2'],
      blurb: 'A child scientist from Winters who answers Paula’s psychic call for help after she and Ness are trapped in Threed.'
    },
    {
      id: 'mother-poo',
      name: 'Poo',
      role: 'Prince of Dalaam (EarthBound)',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b227543-iA6OFzeYeaF0.png',
      appearsIn: ['mother-2'],
      blurb: 'The prince of Dalaam, who appears to Ness in a vision and joins the party once he has finished his Mu Training.'
    },
    {
      id: 'mother-lucas',
      name: 'Lucas',
      role: 'Protagonist (Mother 3)',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b227529-S6lFBEt2lhbu.png',
      appearsIn: ['mother-3'],
      blurb: 'A boy from Tazmily Village whose mother Hinawa dies defending him and his twin. Three years later he learns psychic powers from the Magypsy Ionia and races to pull the Needles.'
    },
    {
      id: 'mother-claus',
      name: 'Claus',
      role: 'Lucas’s twin (Mother 3)',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b227541-X3co6I8U1Euh.png',
      appearsIn: ['mother-3'],
      blurb: 'Leaves Tazmily alone to take revenge on the Drago that killed their mother and does not come back. He is the Masked Man, brainwashed into pulling the Needles against his brother.'
    },
    {
      id: 'mother-porky',
      name: 'Porky Minch',
      role: 'Antagonist (EarthBound, Mother 3)',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b227542-um7c4ZxyW1wd.png',
      appearsIn: ['mother-2', 'mother-3'],
      blurb: 'Pokey in EarthBound, where he sides with Giygas and escapes through time and space. He resurfaces as the leader of the Pigmask Army, having built an empire on the Nowhere Islands.'
    }
  ]
}
