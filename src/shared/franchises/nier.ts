// NieR / Drakengard — Drakengard 1-3, the original NieR (Replicant/Gestalt,
// with the 2021 ver.1.22474487139... remaster as its own remake row),
// NieR:Automata, and the NieR:Automata Ver1.1a anime (two seasons). NieR
// Re[in]carnation (mobile) is excluded — the task lists it as optional, and
// its service ended without a stable Wikipedia infobox for its own dates.
// No route (not one of the four franchises the brief calls out for one), but
// chrono IS required here and the branch is the whole point of the series:
// Drakengard 3 is a prequel to Drakengard 1; Drakengard 1 then branches on
// its own multiple endings — Ending A leads into Drakengard 2, while the
// "non-canon" Ending E leads, roughly 1,300 years later, into NieR. NieR:
// Automata follows NieR by several thousand more years. This page places
// Drakengard 2 and NieR at the same chrono slot (3) to reflect that they are
// parallel branches from Drakengard 1 rather than one following the other —
// the community-standard reading of Yoko Taro's own chronology charts — and
// gives the ver.1.22 remaster NieR's own slot, same as a remake sitting
// beside its original elsewhere on this page. Steam only carries NieR:Automata
// and the ver.1.22 remaster; the original 2010 NieR and all three Drakengard
// games never released on PC, so those entries have no externalIds. Character
// art is AniList's for the Automata-era cast (the two anime seasons); Kainé
// and Caim, who predate any adaptation, come from the NieR Wiki and the
// Drakengard Wiki (Fandom) since no other source carries them. Dates from
// Steam, AniList and Wikipedia. All verified 2026-10-05.

import type { FranchiseCfg } from './types'

export const NIER_DRAKENGARD: FranchiseCfg = {
  id: 'nier',
  name: 'NieR / Drakengard',
  short: 'NieR',
  color: '#8f8363',
  heroUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/524220/library_hero.jpg',
  studio: 'Cavia / PlatinumGames (Yoko Taro)',
  tagline: 'Every ending is "wrong," and the next game starts from one of them anyway.',
  trivia: [
    {
      title: 'A dragon-themed franchise that keeps genre-hopping',
      body: 'Drakengard began in 2003 as a hack-and-slash with aerial dragon-riding sections, known in Japan as Drag-On Dragoon. Each of its multiple endings seeds a different follow-up: Yoko Taro has described building later entries by asking "what kind of story would start from this ending" rather than planning a single continuous timeline in advance.'
    },
    {
      title: 'The "wrong" ending that became a series',
      body: 'Drakengard\'s hidden Ending E, in which Caim and Angelus follow the final enemy into modern-day Tokyo and fight it in a rhythm-game duel, is the branch NieR grew out of, set more than a millennium later after civilization collapses. NieR:Automata, directed by Yoko Taro with PlatinumGames handling combat, then picks up thousands of years after that.'
    },
    {
      title: 'Themes before continuity',
      body: 'What actually carries across Drakengard and NieR is authorial obsession, not a tidy timeline: cyclical violence, the cost of found families, unreliable "good" endings, and Yoko Taro\'s habit of hiding a game\'s real meaning in a route most players never reach. Keiichi Okabe\'s scores, sung in an invented language, connect the NieR games and Drakengard 3.'
    }
  ],
  entries: [
    {
      id: 'nier-dg1',
      title: 'Drakengard',
      aliases: ['Drag-On Dragoon'],
      year: 2003,
      releaseDate: '2003-09-11',
      chrono: 2,
      note: 'Caim and the dragon Angelus, and the ending that splits the whole series'
    },
    {
      id: 'nier-dg2',
      title: 'Drakengard 2',
      year: 2005,
      releaseDate: '2005-06-16',
      chrono: 3,
      note: 'Follows Drakengard\'s "Ending A," a direct continuation of that timeline'
    },
    {
      id: 'nier-2010',
      title: 'NieR Replicant',
      aliases: ['NieR Gestalt', 'NieR'],
      year: 2010,
      releaseDate: '2010-04-22',
      chrono: 3,
      note: 'Roughly 1,300 years after Drakengard\'s "Ending E": a father or brother protecting Yonah from the Black Scrawl'
    },
    {
      id: 'nier-dg3',
      title: 'Drakengard 3',
      aliases: ['Drag-On Dragoon 3'],
      year: 2013,
      releaseDate: '2013-12-19',
      chrono: 1,
      note: 'Prequel: the eldest of six sisters, Zero, and the war that leads into the first Drakengard'
    },
    {
      id: 'nier-automata',
      title: 'NieR:Automata',
      externalIds: [{ source: 'steam', id: '524220' }],
      year: 2017,
      releaseDate: '2017-02-23',
      chrono: 5,
      note: 'Thousands of years later: android soldiers 2B and 9S fight a machine war for humanity\'s sake'
    },
    {
      id: 'nier-122',
      title: 'NieR Replicant ver.1.22474487139...',
      externalIds: [{ source: 'steam', id: '1113560' }],
      year: 2021,
      releaseDate: '2021-04-22',
      chrono: 3,
      remake: true,
      note: 'Full remake of NieR Replicant, with a new cast of voice actors and extra content'
    },
    {
      id: 'nier-anime-s1',
      title: 'NieR:Automata Ver1.1a',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '145665' }],
      year: 2023,
      releaseDate: '2023-01-08',
      chrono: 5,
      adaptation: true,
      note: 'Adapts the first half of NieR:Automata'
    },
    {
      id: 'nier-anime-s2',
      title: 'NieR:Automata Ver1.1a Cour 2',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '167420' }],
      year: 2024,
      releaseDate: '2024-07-05',
      chrono: 5,
      adaptation: true,
      note: 'Concludes the adaptation'
    }
  ],
  characters: [
    {
      id: 'nier-caim',
      name: 'Caim',
      role: 'Protagonist (Drakengard)',
      portraitUrl: 'https://static.wikia.nocookie.net/drakengard/images/8/8a/Dg-caim1.jpg/revision/latest?cb=20131224145038',
      appearsIn: ['nier-dg1'],
      blurb: 'A mute prince who makes a pact with the dragon Angelus mid-battle, trading his voice for the power to survive a war that has already cost him everything else.'
    },
    {
      id: 'nier-kaine',
      name: 'Kainé',
      role: 'Ally (NieR)',
      portraitUrl: 'https://static.wikia.nocookie.net/nier/images/4/4b/NR2020_Kaine.png/revision/latest?cb=20230922134114',
      appearsIn: ['nier-2010', 'nier-122'],
      blurb: 'A foul-mouthed, half-possessed swordswoman who joins the protagonist\'s search for a cure to the Black Scrawl, carrying more grief than she ever lets on.'
    },
    {
      id: 'nier-2b',
      name: '2B',
      role: 'YoRHa combat android (NieR:Automata)',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b132494-R05zeZPjDG3l.jpg',
      appearsIn: ['nier-automata', 'nier-anime-s1', 'nier-anime-s2'],
      blurb: 'A YoRHa combat unit sent to Earth to fight the machine lifeforms, bound by orders she is not supposed to question and a partnership with 9S that costs her more each time.'
    },
    {
      id: 'nier-9s',
      name: '9S',
      role: 'YoRHa scanner android (NieR:Automata)',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b133041-XkN8gKwPwopM.jpg',
      appearsIn: ['nier-automata', 'nier-anime-s1', 'nier-anime-s2'],
      blurb: 'A scanner-type android whose curiosity about the machines he\'s fighting — and about what YoRHa isn\'t telling him — drives the game\'s second playthrough.'
    },
    {
      id: 'nier-a2',
      name: 'A2',
      role: 'YoRHa deserter (NieR:Automata)',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b138298-iGfSohqtJYsT.jpg',
      appearsIn: ['nier-automata', 'nier-anime-s2'],
      blurb: 'A YoRHa unit who went rogue years earlier, fighting alone on the fringes until 2B and 9S\'s story collides with hers.'
    },
    {
      id: 'nier-emil',
      name: 'Emil',
      role: 'Recurring ally across both series',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b138302-go34ax4StuCc.png',
      appearsIn: ['nier-2010', 'nier-122', 'nier-automata', 'nier-anime-s1'],
      blurb: 'A cursed boy from NieR whose petrifying gaze drives one of its saddest arcs; a changed Emil reappears thousands of years later as NieR:Automata\'s travelling shopkeeper.'
    },
    {
      id: 'nier-pascal',
      name: 'Pascal',
      role: 'Pacifist machine leader (NieR:Automata)',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b138307-3qE8YX8kW63R.png',
      appearsIn: ['nier-automata', 'nier-anime-s1', 'nier-anime-s2'],
      blurb: 'The soft-spoken leader of a machine village that has renounced violence, and the clearest test of whether 2B and 9S can see the machines as anything but enemies.'
    },
    {
      id: 'nier-devola',
      name: 'Devola',
      role: 'Twin android pair (NieR:Automata)',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b138301-VCBlI7TEIn2i.png',
      appearsIn: ['nier-automata', 'nier-anime-s1'],
      blurb: 'One half of a twin pair of androids carrying inherited guilt for a sabotage committed generations before either of them existed.'
    }
  ]
}
