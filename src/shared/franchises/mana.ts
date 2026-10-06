// Mana (Seiken Densetsu) — Square Enix's action-RPG anthology, spun off from
// Final Fantasy Adventure (1991) once Secret of Mana (1993) dropped the Final
// Fantasy branding. No chrono column: past the numbered trilogy, each entry
// builds its own Tree of Mana, world and cast from scratch — only a handful
// of motifs repeat (the Mana Sword, Rabites, Flammies) — so there is no
// shared story to order and this page sorts by release only. Collection of
// Mana (Switch, 2019) is not its own row: it bundles Final Fantasy Adventure,
// Secret of Mana and the first official Western release of the Trials of
// Mana original under their existing names, so it is folded in as an alias
// on that original release instead. Heroes of Mana (RTS) and the 2022
// Teardrop Crystal anime are marked spinOff — the former breaks from the
// series' action-RPG gameplay, the latter tells an anime-original story in
// Legend of Mana's world rather than adapting the game. Ids from Steam/
// AniList, years and credits from Wikipedia, all verified 2026-10-05.

import type { FranchiseCfg } from './types'

export const MANA: FranchiseCfg = {
  id: 'mana',
  name: 'Mana',
  short: 'Mana',
  color: '#36b37a',
  heroUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/924980/library_hero.jpg',
  studio: 'Square Enix',
  tagline: 'A world grown from one Game Boy spin-off, not a single story.',
  trivia: [
    {
      title: 'A spin-off that outgrew its parent',
      body: 'Final Fantasy Adventure began life on the Game Boy as a Final Fantasy side story, chocobos included. Secret of Mana, its 1993 sequel, dropped the Final Fantasy name and elements entirely and became the first game marketed under Mana instead — series creator Koichi Ishii has said he never thought of Mana as a set of games so much as a world to be explored through them.\n\nSquare Enix tried to spread that world across genres between 2006 and 2007 under the banner World of Mana: Children of Mana (an action dungeon crawler), Dawn of Mana (a 3D physics-driven action game) and Heroes of Mana (a real-time strategy game).'
    },
    {
      title: 'The one that took 25 years to reach the West',
      body: 'Trials of Mana (1995) never left Japan in its original form — English-speaking players only had an unofficial 1999 fan translation until Collection of Mana finally localized it for Switch in 2019, the same year a ground-up 3D remake was announced. Final Fantasy Adventure fared a little better: it has been remade twice, as the Game Boy Advance\'s Sword of Mana (2003) and the 3D mobile/Vita Adventures of Mana (2016), the latter built for the series\' 25th anniversary.'
    },
    {
      title: 'A long gap before Visions',
      body: 'Visions of Mana (2024) was the first new mainline entry since Dawn of Mana (2006), eighteen years earlier. Legend of Mana returned the same way in 2021, as a remaster of the 1999 original.'
    }
  ],
  entries: [
    {
      id: 'mana-ffa',
      title: 'Final Fantasy Adventure',
      aliases: ['Seiken Densetsu: Final Fantasy Gaiden', 'Mystic Quest'],
      year: 1991,
      releaseDate: '1991-06-28',
      note: 'A hero and heroine race to stop the Dark Lord of Glaive and his sorcerer Julius from destroying the Tree of Mana'
    },
    {
      id: 'mana-secret',
      title: 'Secret of Mana',
      aliases: ['Seiken Densetsu 2'],
      externalIds: [{ source: 'steam', id: '637670' }],
      year: 1993,
      releaseDate: '1993-08-06',
      note: 'Three heroes share one Ring Command menu against an empire chasing a flying fortress, with a second or third player able to drop in anytime'
    },
    {
      id: 'mana-trials-1995',
      title: 'Trials of Mana (1995)',
      aliases: ['Seiken Densetsu 3', 'Collection of Mana'],
      year: 1995,
      releaseDate: '1995-09-30',
      note: 'Six playable heroes split across three overlapping storylines, racing to claim the Mana Sword before the Benevodons wake'
    },
    {
      id: 'mana-legend',
      title: 'Legend of Mana',
      aliases: ['Legend of Mana Remastered'],
      externalIds: [{ source: 'steam', id: '1175830' }],
      year: 1999,
      releaseDate: '1999-07-15',
      note: 'A wandering hero reshapes the land of Fa\'Diel piece by piece with the Land Make system instead of following one central plot'
    },
    {
      id: 'mana-sword',
      title: 'Sword of Mana',
      year: 2003,
      releaseDate: '2003-08-29',
      remake: true,
      note: 'Game Boy Advance remake of the first Mana game, splitting its plot into separate hero and heroine routes'
    },
    {
      id: 'mana-children',
      title: 'Children of Mana',
      year: 2006,
      releaseDate: '2006-03-02',
      note: 'Four young survivors fight through randomly generated dungeons after a monster invasion kills their families'
    },
    {
      id: 'mana-dawn',
      title: 'Dawn of Mana',
      year: 2006,
      releaseDate: '2006-12-21',
      note: 'Keldric grabs and hurls enemies through a fully 3D world, chasing a portal of darkness that is corrupting the Tree of Mana'
    },
    {
      id: 'mana-heroes',
      title: 'Heroes of Mana',
      year: 2007,
      releaseDate: '2007-03-08',
      spinOff: true,
      note: 'A real-time strategy spin-off: soldier Roget defends neighboring nations from his own country\'s aggression across isometric battle maps'
    },
    {
      id: 'mana-adventures',
      title: 'Adventures of Mana',
      year: 2016,
      releaseDate: '2016-02-04',
      remake: true,
      note: 'A 3D remake of the first Mana game for mobile and PlayStation Vita, built for the series\' 25th anniversary'
    },
    {
      id: 'mana-trials-2020',
      title: 'Trials of Mana',
      externalIds: [{ source: 'steam', id: '924980' }],
      year: 2020,
      releaseDate: '2020-04-24',
      remake: true,
      note: 'The SNES-era original rebuilt in 3D, adding a post-game epilogue chapter and a new unlockable class'
    },
    {
      id: 'mana-teardrop',
      title: 'Legend of Mana: The Teardrop Crystal',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '136150' }],
      year: 2022,
      releaseDate: '2022-10-08',
      spinOff: true,
      note: 'An anime-original story in Legend of Mana\'s world: Shiloh is pulled into a sudden wave of attacks on the gem-bodied Jumi'
    },
    {
      id: 'mana-visions',
      title: 'Visions of Mana',
      externalIds: [{ source: 'steam', id: '2490990' }],
      year: 2024,
      releaseDate: '2024-08-29',
      note: 'Swordsman Val travels with a growing group of companions to renew the flow of Mana across the world'
    }
  ],
  characters: [
    {
      id: 'mana-randi',
      name: 'Randi',
      role: 'Hero (Secret of Mana)',
      portraitUrl: 'https://static.wikia.nocookie.net/mana/images/1/16/Randi_brandishing_the_Mana_Sword.jpg/revision/latest?cb=20180201235358',
      appearsIn: ['mana-secret'],
      blurb: 'The village boy who pulls the Mana Sword from its stone and is banished from Potos for it.'
    },
    {
      id: 'mana-primm',
      name: 'Primm',
      role: 'Heroine (Secret of Mana)',
      portraitUrl: 'https://static.wikia.nocookie.net/mana/images/1/1a/Primm_%28Remake%29.jpg/revision/latest?cb=20180201233059',
      appearsIn: ['mana-secret'],
      blurb: 'Joins Randi to rescue Dyluck, the knight she loves, from the Empire.'
    },
    {
      id: 'mana-popoi',
      name: 'Popoi',
      role: 'Sprite (Secret of Mana)',
      portraitUrl: 'https://static.wikia.nocookie.net/mana/images/f/fd/Popoi_%28Remake%29.jpg/revision/latest?cb=20180202002308',
      appearsIn: ['mana-secret'],
      blurb: 'A sprite child with no memory of its past, travelling with Randi and Primm in search of home.'
    },
    {
      id: 'mana-duran',
      name: 'Duran',
      role: 'Mercenary swordsman (Trials of Mana)',
      portraitUrl: 'https://static.wikia.nocookie.net/mana/images/7/7d/Trials_of_Mana_-_Duran.png/revision/latest?cb=20190905173944',
      appearsIn: ['mana-trials-1995', 'mana-trials-2020'],
      blurb: 'A Forcena mercenary who swears revenge after the Crimson Wizard defeats him.'
    },
    {
      id: 'mana-angela',
      name: 'Angela',
      role: 'Princess of Altena (Trials of Mana)',
      portraitUrl: 'https://static.wikia.nocookie.net/mana/images/d/d5/Trials_of_Mana_-_Angela.png/revision/latest?cb=20190905173645',
      appearsIn: ['mana-trials-1995', 'mana-trials-2020'],
      blurb: 'The princess of the kingdom of magic who cannot cast a spell, and runs from home to find out why.'
    },
    {
      id: 'mana-val',
      name: 'Val',
      role: 'Soul Guard (Visions of Mana)',
      portraitUrl: 'https://static.wikia.nocookie.net/mana/images/d/de/Val_%28Paladin%29.png/revision/latest?cb=20241016001529',
      appearsIn: ['mana-visions'],
      blurb: 'A Soul Guard escorting the chosen Alms on their pilgrimage to the Mana Tree.'
    }
  ]
}
