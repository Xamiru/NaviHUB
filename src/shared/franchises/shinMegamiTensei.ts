// Shin Megami Tensei — the mainline numbered games (I, II, if..., Nocturne,
// Strange Journey, IV, IV Apocalypse, V), plus Devil Survivor 1-2 and Digital
// Devil Saga 1-2 as spin-off rows. Persona is deliberately EXCLUDED — it has
// its own franchise page on this site — and so is NINE (2002), a Japan-only
// Xbox entry whose Western release was cancelled and whose own release
// details are thin enough on primary sources to leave out rather than guess.
// No chrono (each entry is its own standalone post-apocalyptic world) and no
// route (not one of the four franchises the brief calls out for a
// recommended order). Steam only carries two of these: Nocturne (via its 2021
// HD Remaster) and V (via its 2024 Vengeance edition) — every other entry is
// a Nintendo/Sony handheld or console exclusive with no PC release, so only
// those two have externalIds. No mainline SMT anime exists (unlike Persona),
// so character art is from the Megami Tensei Wiki (Fandom) throughout. Most
// mainline protagonists are silent, player-named avatars without an official
// name, which is why the character list favors named demons and Devil
// Survivor's cast instead. Dates from Steam and Wikipedia.
// All verified 2026-10-05.

import type { FranchiseCfg } from './types'

export const SHIN_MEGAMI_TENSEI: FranchiseCfg = {
  id: 'shin-megami-tensei',
  name: 'Shin Megami Tensei',
  short: 'Shin Megami Tensei',
  color: '#5a5a7a',
  heroUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1875830/library_hero.jpg',
  studio: 'Atlus',
  tagline: 'Negotiate with demons, pick a side, and watch the world end anyway.',
  trivia: [
    {
      title: 'Demon negotiation, not demon slaying',
      body: 'Since the 1987 Megami Tensei that started the wider series, its games have let players talk to demons mid-battle — flattering, bribing or intimidating them into joining the party — rather than only fighting them. The series draws its demon designs from real-world mythology and religion across cultures, filtered through Kazuma Kaneko\'s (and later Masayuki Doi\'s) character art.'
    },
    {
      title: 'Law, Chaos, and no good answer',
      body: 'Nearly every mainline game resolves around a Law/Chaos/Neutral alignment system: Law sides with an oppressive divine order, Chaos sides with demonic freedom that curdles into anarchy, and Neutral rejects both in favor of human self-determination. None of the three endings is written as simply correct, and the series has kept returning to this structure since the first game.'
    },
    {
      title: 'Tokyo, destroyed on a schedule',
      body: 'Most mainline entries open with modern Tokyo erased in some apocalyptic event — nuclear war, a demonic invasion, a vortex swallowing the city — and then explore the ruin that follows. Spin-offs break the pattern in their own ways: Digital Devil Saga trades Tokyo for the enclosed artificial world of Junkyard, and Devil Survivor turns the invasion into a trapped-in-Tokyo tactics game instead.'
    }
  ],
  entries: [
    {
      id: 'smt-1',
      title: 'Shin Megami Tensei',
      year: 1992,
      releaseDate: '1992-10-30',
      note: 'The series\' start: a nuclear apocalypse and a Law/Chaos/Neutral choice'
    },
    {
      id: 'smt-2',
      title: 'Shin Megami Tensei II',
      year: 1994,
      releaseDate: '1994-03-18',
      note: 'A rebuilt, messianic Tokyo Millennium decades after the first game'
    },
    {
      id: 'smt-if',
      title: 'Shin Megami Tensei if...',
      year: 1994,
      releaseDate: '1994-10-28',
      note: 'A high school turned into a demon-infested labyrinth overnight'
    },
    {
      id: 'smt-nocturne',
      title: 'Shin Megami Tensei: Nocturne',
      aliases: ['Shin Megami Tensei III: Nocturne', 'Shin Megami Tensei: Lucifer\'s Call', 'Shin Megami Tensei III Nocturne HD Remaster'],
      externalIds: [{ source: 'steam', id: '1413480' }],
      year: 2003,
      releaseDate: '2003-02-20',
      note: 'Tokyo is "Conceived" into the Vortex World, and the hero becomes the Demi-fiend'
    },
    {
      id: 'smt-dds1',
      title: 'Shin Megami Tensei: Digital Devil Saga',
      year: 2004,
      releaseDate: '2004-07-15',
      spinOff: true,
      note: 'Junkyard, the tribes, and Serph\'s descent into the Embryon\'s true nature'
    },
    {
      id: 'smt-dds2',
      title: 'Shin Megami Tensei: Digital Devil Saga 2',
      year: 2005,
      releaseDate: '2005-01-27',
      spinOff: true,
      note: 'Direct continuation: Junkyard\'s survivors reach the real world'
    },
    {
      id: 'smt-devil-survivor',
      title: 'Shin Megami Tensei: Devil Survivor',
      aliases: ['Shin Megami Tensei: Devil Survivor Overclocked'],
      year: 2009,
      releaseDate: '2009-01-15',
      spinOff: true,
      note: 'Trapped in a locked-down Tokyo for a week, tactics-battling demons with a demon-summoning app'
    },
    {
      id: 'smt-strange-journey',
      title: 'Shin Megami Tensei: Strange Journey',
      aliases: ['Shin Megami Tensei: Strange Journey Redux'],
      year: 2009,
      releaseDate: '2009-10-08',
      note: 'A military expedition into the Schwarzwelt, a void consuming Antarctica and then the world'
    },
    {
      id: 'smt-devil-survivor-2',
      title: 'Shin Megami Tensei: Devil Survivor 2',
      aliases: ['Shin Megami Tensei: Devil Survivor 2 Record Breaker'],
      year: 2011,
      releaseDate: '2011-07-28',
      spinOff: true,
      note: 'A new cast, a new apocalypse, and giant kaiju-like Septentriones'
    },
    {
      id: 'smt-4',
      title: 'Shin Megami Tensei IV',
      year: 2013,
      releaseDate: '2013-05-23',
      note: 'A knight of Mikado descends into a buried, modern Tokyo'
    },
    {
      id: 'smt-4-apocalypse',
      title: 'Shin Megami Tensei IV: Apocalypse',
      aliases: ['Shin Megami Tensei IV Final'],
      year: 2016,
      releaseDate: '2016-02-10',
      note: 'Set after IV\'s neutral ending, with a new protagonist and the god Dagda'
    },
    {
      id: 'smt-5',
      title: 'Shin Megami Tensei V',
      aliases: ['Shin Megami Tensei V: Vengeance'],
      externalIds: [{ source: 'steam', id: '1875830' }],
      year: 2021,
      releaseDate: '2021-11-11',
      note: 'A high schooler becomes Nahobino in a sand-buried, desolate Tokyo (Vengeance adds a parallel story)'
    }
  ],
  characters: [
    {
      id: 'smt-demifiend',
      name: 'Demi-fiend',
      role: 'Protagonist (Nocturne)',
      portraitUrl: 'https://static.wikia.nocookie.net/megamitensei/images/4/44/SMT_III_Hero_1.png/revision/latest?cb=20240323101209',
      appearsIn: ['smt-nocturne'],
      blurb: 'A high schooler caught at the center of Tokyo\'s Conception, reborn as a half-demon with no allegiance to Law or Chaos forced on him.'
    },
    {
      id: 'smt-lucifer',
      name: 'Lucifer',
      role: 'Recurring demon lord',
      portraitUrl: 'https://static.wikia.nocookie.net/megamitensei/images/d/dd/Lucifer_MTII.png/revision/latest?cb=20231201055634',
      appearsIn: ['smt-1', 'smt-2', 'smt-nocturne'],
      blurb: 'The series\' most persistent recurring figure, the ruler of Chaos who shows up across games to offer the protagonist a side in the Law-Chaos conflict.'
    },
    {
      id: 'smt-serph',
      name: 'Serph',
      role: 'Protagonist (Digital Devil Saga)',
      portraitUrl: 'https://static.wikia.nocookie.net/megamitensei/images/9/9c/Serph_render.png/revision/latest?cb=20120912162643',
      appearsIn: ['smt-dds1', 'smt-dds2'],
      blurb: 'Leader of the Embryon tribe in the enclosed world of Junkyard, whose Atma mantra lets him take on a dragon-like demon form in battle.'
    },
    {
      id: 'smt-atsuro',
      name: 'Atsuro Kihara',
      role: 'Ally (Devil Survivor)',
      portraitUrl: 'https://static.wikia.nocookie.net/megamitensei/images/6/65/DeSu-Atsuro.png/revision/latest?cb=20240413111021',
      appearsIn: ['smt-devil-survivor'],
      blurb: 'The protagonist\'s tech-savvy best friend, who reverse-engineers the demon-summoning app COMP that the whole cast survives the week on.'
    },
    {
      id: 'smt-yuzu',
      name: 'Yuzu Tanikawa',
      role: 'Ally (Devil Survivor)',
      portraitUrl: 'https://static.wikia.nocookie.net/megamitensei/images/6/64/DeSu-Yuzu.png/revision/latest?cb=20240418050226',
      appearsIn: ['smt-devil-survivor'],
      blurb: 'The protagonist\'s classmate, who wants nothing more than to get out of the lockdown, and whose fear makes her the most ordinary voice in the group.'
    },
    {
      id: 'smt-dagda',
      name: 'Dagda',
      role: 'Demon partner (IV: Apocalypse)',
      portraitUrl: 'https://static.wikia.nocookie.net/megamitensei/images/9/9a/Dagda_SMTIV_Final.png/revision/latest?cb=20211123031133',
      appearsIn: ['smt-4-apocalypse'],
      blurb: 'A Celtic god who makes Nanashi his vessel after a fatal accident, pushing a Chaos-leaning agenda that complicates the game\'s own alignment choices.'
    }
  ]
}
