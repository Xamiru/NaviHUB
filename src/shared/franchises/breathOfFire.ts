// Breath of Fire — curated canon: Capcom's five numbered games (Dragon Quarter
// is the fifth) plus Breath of Fire 6, the 2016 free-to-play online game, as a
// spin-off row. Excluded: the Japanese mobile-phone spin-offs (Breath of
// Daifugo, Ryu no Tsurishi and the two Breath of Fire IV action games) and the
// manga. No story order: the series article describes its continuity as
// ambiguous, with each game a self-contained story. Only Breath of Fire II is
// placed against another game (500 years after the first); the sources give
// III, IV, Dragon Quarter and 6 no placement, so no Story column. mc values are the
// Metacritic scores tabled on Wikipedia's series article (I and II from their
// Game Boy Advance re-releases).
// Dates are first Japanese releases (Wikipedia); the Breath of Fire IV Steam id
// verified with appdetails, art curl-verified 2026-10-05.

import type { FranchiseCfg } from './types'

export const BREATH_OF_FIRE: FranchiseCfg = {
  id: 'breath-of-fire',
  name: 'Breath of Fire',
  short: 'Breath of Fire',
  color: '#e0823a',
  heroUrl:
    'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/4249150/bb5a15fbd29a68fe55912e052b71a7f9ca0c5b3e/library_hero.jpg',
  studio: 'Capcom',
  tagline: 'A boy who becomes a dragon, a girl with wings.',
  trivia: [
    {
      title: 'Always Ryu, always Nina',
      body: 'Each Breath of Fire is its own story, but the two leads are usually named Ryu and Nina: a young man who can transform into dragons and a girl with wings. They are different people each time, and the continuity between games is left ambiguous.\n\nBreath of Fire II is the one direct sequel, set 500 years after the first game; its Nina is a descendant of the original Nina, and the immortal sorceress from the first game can join the party again.'
    },
    {
      title: 'Five different sounds',
      body: 'The first game was scored by five members of Capcom’s sound team Alph Lyla, including Yoko Shimomura; Breath of Fire II was written entirely by Yuko Takehara. Yoshino Aoki and Akari Kaida gave Breath of Fire III a jazz-inspired soundtrack, and Aoki scored IV alone.\n\nDragon Quarter was the first to use an outside composer, Hitoshi Sakimoto, with Yasunori Mitsuda producing the music. It also broke the formula in play, sending Ryu up from an underground world where a citizen’s D-ratio decides their social status.'
    },
    {
      title: 'A resting franchise',
      body: 'Sales rose through the PlayStation games and dipped sharply with Dragon Quarter. In 2008 Keiji Inafune said Capcom had no plans for another Breath of Fire, and in 2009 a Capcom USA executive called it a "resting IP".\n\nThe sixth game arrived in 2016 as a free-to-play online title for Windows and Android in Japan, and its service ended on 27 September 2017. Breath of Fire IV was re-released on Steam in April 2026.'
    }
  ],
  entries: [
    {
      id: 'bof-1',
      title: 'Breath of Fire',
      aliases: ['Breath of Fire: Ryū no Senshi'],
      year: 1993,
      releaseDate: '1993-04-03',
      mc: 79,
      note: 'Ryu of the Light Dragon Clan sets out after the Dark Dragons who took his sister Sara'
    },
    {
      id: 'bof-2',
      title: 'Breath of Fire II',
      aliases: ['Breath of Fire II: Sadame no Ko'],
      year: 1994,
      releaseDate: '1994-12-02',
      mc: 81,
      note: 'Five centuries on, young Ryu Bateson’s family vanishes and his village forgets him'
    },
    {
      id: 'bof-3',
      title: 'Breath of Fire III',
      year: 1997,
      releaseDate: '1997-09-11',
      note: 'Ryu, last of the Brood, grows into adulthood searching for the truth about his people'
    },
    {
      id: 'bof-4',
      title: 'Breath of Fire IV',
      aliases: ['Breath of Fire IV: Utsurowazaru Mono'],
      externalIds: [{ source: 'steam', id: '4249150' }],
      year: 2000,
      releaseDate: '2000-04-27',
      mc: 83,
      note: 'Ryu and his other half Fou-Lu, an immortal emperor awakened to reclaim godhood'
    },
    {
      id: 'bof-5',
      title: 'Breath of Fire: Dragon Quarter',
      aliases: ['Breath of Fire V: Dragon Quarter'],
      year: 2002,
      releaseDate: '2002-11-14',
      mc: 78,
      note: 'Ryu climbs a kilometre up from the underground to bring Nina, who cannot survive below, to the surface'
    },
    {
      id: 'bof-6',
      title: 'Breath of Fire 6',
      aliases: ['Breath of Fire 6: Hakuryū no Shugosha-tachi'],
      year: 2016,
      releaseDate: '2016-02-24',
      spinOff: true,
      note: 'Free-to-play online game; its service ended in September 2017'
    }
  ],
  characters: [
    {
      id: 'bof-ryu',
      name: 'Ryu',
      role: 'The dragon',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/23720.jpg',
      appearsIn: ['bof-1', 'bof-2', 'bof-3', 'bof-4', 'bof-5'],
      blurb: 'The hero of each of the first five games is a Ryu who can become a dragon, and each is a different person: a Light Dragon searching for his sister, the last of the Brood, a low-ranked citizen of an underground world.'
    },
    {
      id: 'bof-nina',
      name: 'Nina',
      role: 'The winged princess',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/23722.jpg',
      appearsIn: ['bof-1', 'bof-2', 'bof-3', 'bof-4', 'bof-5'],
      blurb: 'A winged princess of Windia, later Wyndia, in the first four games. Dragon Quarter’s Nina is different: surgery meant to turn her into an air purifier leaves her unable to survive underground.'
    },
    {
      id: 'bof-fou-lu',
      name: 'Fou-Lu',
      role: 'Founder of the Fou Empire (IV)',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/23721.jpg',
      appearsIn: ['bof-4'],
      blurb: 'A god summoned imperfectly to unify a warring empire, split in two across time and bodies. He founded the Fou Empire, fell into a long sleep, and wakes when his other half, Ryu, enters the world.'
    },
    {
      id: 'bof-bo',
      name: 'Bo',
      role: 'Wolf-man (Breath of Fire)',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b14538-SQn18L2LbGEK.png',
      appearsIn: ['bof-1'],
      blurb: 'Gilliam in the Japanese version. A wolf-man held prisoner by the Dark Dragons after they attacked his homeland.'
    },
    {
      id: 'bof-cray',
      name: 'Cray',
      role: 'Woren warrior (IV)',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/23723.jpg',
      appearsIn: ['bof-4'],
      blurb: 'A burly member of the cat-like Woren tribe who fights with a large wooden post and carries a torch for Nina’s sister Elina.'
    },
    {
      id: 'bof-ursula',
      name: 'Ursula',
      role: 'Gunner (IV)',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/38398.jpg',
      appearsIn: ['bof-4'],
      blurb: 'The proud granddaughter of a military commander, with kitsune-like features and a skill with guns.'
    }
  ]
}
