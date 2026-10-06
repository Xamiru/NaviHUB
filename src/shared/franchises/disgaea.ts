// Disgaea — Nippon Ichi Software's tactical RPG series. Rows: the numbered
// games 1-7, Disgaea D2: A Brighter Darkness (2013, a direct mainline sequel
// to the first game, included beside the numbered entries), Makai Kingdom
// (2005, spin-off row), and the 2006 TV anime adaptation of the first game.
// Enhanced editions are ALIASES of their base game with their Steam ids, the
// Persona rule: Afternoon of Darkness / Disgaea DS / Disgaea PC / Disgaea 1
// Complete (Refine in Japan), Dark Hero Days / Disgaea 2 PC, Absence of
// Detention, A Promise Revisited / Complete+, and the Complete editions of
// 5, 6 and 7. No Steam release was found for Disgaea 3 or D2.
// Makai Kingdom is in: Overlord Zetta rules one of the pocket-universe
// Netherworlds the series shares, and the game is a Disgaea spin-off with
// similar gameplay. Phantom Brave is out: it is a spiritual sequel set in the
// separate oceanic world of Ivoire, linked to Disgaea only by crossover cameos.
// Also excluded: the Prinny platformers, Disgaea Infinite (visual novel),
// mobile titles, Disgaea Mayhem (2026 action spin-off), novels and manga.
// No chrono column: beyond D2 following the first game, the games are set in
// separate Netherworlds with no established order between them.
// Ids from Steam appdetails / AniList, dates and story facts from the English
// Wikipedia series and per-game articles (Refine from the Japanese article),
// all verified 2026-10-05.

import type { FranchiseCfg } from './types'

export const DISGAEA: FranchiseCfg = {
  id: 'disgaea',
  name: 'Disgaea',
  short: 'Disgaea',
  color: '#d9365a',
  heroUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/803600/library_hero.jpg',
  studio: 'Nippon Ichi Software',
  tagline: 'Overlords, exploding Prinnies and levels into the millions.',
  trivia: [
    {
      title: 'Level 9999 and beyond',
      body: 'Disgaea is known for complex gameplay, extremely high stats and humorous dialogue. Characters can reach level 9999 and be reincarnated to grow again, and every item hides a randomly generated Item World the party can dive through to power it up. New characters, better shops and new maps have to be voted through the Dark Assembly, whose senators can be bribed, or fought when the vote fails.\n\nThe lift-and-throw mechanic was designed as a strong, unique hook, and new ideas were piled on with each game. Disgaea 6, the first with 3D character models, raised the standard level cap to 99,999,999. The series had shipped 5 million copies as of 2021.'
    },
    {
      title: 'Prinnies, dood',
      body: 'Prinnies are the series\' mascots: penguin-like servants with bat wings and peg legs who end their sentences with "dood". Most hold the soul of a human who led a worthless life or committed a mortal sin, sewn into a Prinny body to work off that debt toward reincarnation. A human soul is unstable, so a thrown Prinny explodes; the mass-produced ones made with demon souls stay stable.\n\nThe first game makes this personal: the Prinnies\' Big Sis Prinny turns out to be Laharl\'s mother, who became one after giving her life to save him.'
    },
    {
      title: 'A multiverse of Netherworlds',
      body: 'Every game is set mostly in a Netherworld, a parallel realm of demons where moral values are reversed, alongside the human world and the angels\' Celestia. There are many Netherworlds, each with its own Overlord, and because they are magically connected, characters drift between games: Laharl, Etna and Flonne are playable in every main title after the first, and Baal, the Lord of Terror, keeps returning as a boss.\n\nRe-releases traditionally add a new storyline, such as Etna Mode in Afternoon of Darkness and Axel Mode in Dark Hero Days. The first game won IGN\'s "Best Game No One Played" award for 2003.'
    }
  ],
  entries: [
    {
      id: 'disgaea-1',
      title: 'Disgaea: Hour of Darkness',
      aliases: [
        'Disgaea',
        'Disgaea: Afternoon of Darkness',
        'Disgaea Portable',
        'Disgaea DS',
        'Disgaea PC',
        'Disgaea 1 Complete',
        'Disgaea Refine'
      ],
      externalIds: [{ source: 'steam', id: '405900' }],
      year: 2003,
      releaseDate: '2003-01-30',
      note: 'Laharl wakes from a two-year sleep to find his father dead and sets out to claim the Overlord\'s throne'
    },
    {
      id: 'disgaea-makai-kingdom',
      title: 'Makai Kingdom: Chronicles of the Sacred Tome',
      aliases: ['Makai Kingdom', 'Phantom Kingdom Portable', 'Makai Kingdom: Reclaimed and Rebound'],
      externalIds: [{ source: 'steam', id: '1732060' }],
      year: 2005,
      releaseDate: '2005-03-17',
      spinOff: true,
      note: 'Overlord Zetta burns the reality-controlling Sacred Tome and, trapped inside it, needs other Overlords to rewrite his Netherworld'
    },
    {
      id: 'disgaea-2',
      title: 'Disgaea 2: Cursed Memories',
      aliases: ['Disgaea 2', 'Disgaea 2: Dark Hero Days', 'Disgaea 2 Portable', 'Disgaea 2 PC'],
      externalIds: [{ source: 'steam', id: '495280' }],
      year: 2006,
      releaseDate: '2006-02-23',
      note: 'Adell, the only human in Veldime spared by Overlord Zenon\'s curse, sets out to defeat Zenon, with Zenon\'s daughter Rozalin in tow'
    },
    {
      id: 'disgaea-anime',
      title: 'Makai Senki Disgaea',
      mediaType: 'anime',
      aliases: ['Netherworld Battle Chronicle: Disgaea'],
      externalIds: [{ source: 'anilist', id: '860' }],
      year: 2006,
      releaseDate: '2006-04-05',
      adaptation: true,
      note: 'Twelve episodes: Flonne hunts for King Krichevskoy for two years and finds his son Laharl\'s coffin instead'
    },
    {
      id: 'disgaea-3',
      title: 'Disgaea 3: Absence of Justice',
      aliases: ['Disgaea 3', 'Disgaea 3: Absence of Detention', 'Disgaea 3 Return'],
      year: 2008,
      releaseDate: '2008-01-31',
      note: 'Mao, the Overlord\'s son at the Netherworld\'s Evil Academy, sets out to become a hero so he can overthrow his father'
    },
    {
      id: 'disgaea-4',
      title: 'Disgaea 4: A Promise Unforgotten',
      aliases: ['Disgaea 4', 'Disgaea 4: A Promise Revisited', 'Disgaea 4 Complete+'],
      externalIds: [{ source: 'steam', id: '1233880' }],
      year: 2011,
      releaseDate: '2011-02-24',
      note: 'Former tyrant Valvatorez, now working in Hades, rebels when the Corrupternment orders every Prinny exterminated'
    },
    {
      id: 'disgaea-d2',
      title: 'Disgaea D2: A Brighter Darkness',
      aliases: ['Disgaea Dimension 2'],
      year: 2013,
      releaseDate: '2013-03-20',
      note: 'Overlord Laharl faces the Krichevskoy Group\'s revolt as Yuie flowers spread through his Netherworld'
    },
    {
      id: 'disgaea-5',
      title: 'Disgaea 5: Alliance of Vengeance',
      aliases: ['Disgaea 5', 'Disgaea 5 Complete'],
      externalIds: [{ source: 'steam', id: '803600' }],
      year: 2015,
      releaseDate: '2015-03-25',
      note: 'Killia joins Overlord Seraphina\'s Rebel Army against Void Dark, the demon emperor who stole his Overload'
    },
    {
      id: 'disgaea-6',
      title: 'Disgaea 6: Defiance of Destiny',
      aliases: ['Disgaea 6', 'Disgaea 6 Complete'],
      externalIds: [{ source: 'steam', id: '1749750' }],
      year: 2021,
      releaseDate: '2021-01-28',
      note: 'The zombie Zed is reborn by Super Reincarnation every time a God of Destruction kills him, and keeps coming back'
    },
    {
      id: 'disgaea-7',
      title: 'Disgaea 7: Vows of the Virtueless',
      aliases: ['Disgaea 7', 'Disgaea 7 Complete'],
      externalIds: [{ source: 'steam', id: '2250600' }],
      year: 2023,
      releaseDate: '2023-01-26',
      note: 'Demon warrior Fuji and his companion Pirilika adventure through the Netherworld of Hinomoto'
    }
  ],
  characters: [
    {
      id: 'disgaea-char-laharl',
      name: 'Laharl',
      role: 'Overlord of the Netherworld',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b3426-RKDDfu0SCLDq.png',
      appearsIn: [
        'disgaea-1',
        'disgaea-2',
        'disgaea-anime',
        'disgaea-3',
        'disgaea-4',
        'disgaea-d2',
        'disgaea-5',
        'disgaea-6',
        'disgaea-7'
      ],
      blurb: 'King Krichevskoy\'s son, woken after two years asleep to find the throne up for grabs. Arrogant, set on being the strongest demon, and physically sickened by talk of love.'
    },
    {
      id: 'disgaea-char-etna',
      name: 'Etna',
      role: 'Leader of the Prinny Squad',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/n3419-lN9eMTuxONsE.jpg',
      appearsIn: [
        'disgaea-1',
        'disgaea-2',
        'disgaea-anime',
        'disgaea-3',
        'disgaea-4',
        'disgaea-d2',
        'disgaea-5',
        'disgaea-6',
        'disgaea-7'
      ],
      blurb: 'Ordered to kill the prince, she poisoned him into a two-year sleep instead. Sarcastic, brutal to her Prinnies, and grudgingly loyal to Laharl.'
    },
    {
      id: 'disgaea-char-flonne',
      name: 'Flonne',
      role: 'Angel Trainee',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b1771-GUWvqRquYzsN.png',
      appearsIn: [
        'disgaea-1',
        'disgaea-2',
        'disgaea-anime',
        'disgaea-3',
        'disgaea-4',
        'disgaea-d2',
        'disgaea-5',
        'disgaea-6',
        'disgaea-7'
      ],
      blurb: 'Sent from Celestia to assassinate King Krichevskoy, she stays with Laharl to learn whether demons can love. Naive, devoted to love, and obsessed with tokusatsu heroes.'
    },
    {
      id: 'disgaea-char-mid-boss',
      name: 'Mid-Boss',
      role: 'The Dark Adonis',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b14447-DU5bXdLSh1Xe.png',
      appearsIn: ['disgaea-1', 'disgaea-anime'],
      blurb: 'Vyers, self-styled Dark Adonis, renamed Mid-Boss by Laharl after their first fight. The good ending hints that he is really King Krichevskoy.'
    },
    {
      id: 'disgaea-char-prinny',
      name: 'Prinny',
      role: 'Netherworld servant',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/6327.jpg',
      appearsIn: [
        'disgaea-1',
        'disgaea-2',
        'disgaea-anime',
        'disgaea-3',
        'disgaea-4',
        'disgaea-d2',
        'disgaea-5',
        'disgaea-6',
        'disgaea-7'
      ],
      blurb: 'Usually a sinner\'s soul sewn into a penguin-like body to work toward reincarnation, dood. The human soul inside is unstable, so it explodes when thrown.'
    },
    {
      id: 'disgaea-char-adell',
      name: 'Adell',
      role: 'Last human of Veldime',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b9227-L2iR53Tfgb3V.jpg',
      appearsIn: ['disgaea-2'],
      blurb: 'The one person in Veldime untouched by Zenon\'s curse, determined to defeat the Overlord and make his family human again. His mother\'s summoning brings him Zenon\'s daughter Rozalin instead.'
    },
    {
      id: 'disgaea-char-valvatorez',
      name: 'Valvatorez',
      role: 'Former tyrant vampire',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b404720-leBU2oRXJnVT.jpg',
      appearsIn: ['disgaea-4'],
      blurb: 'Once a feared tyrant, he promised a woman 400 years ago to drink no blood until he could make her fear him, and she died first. Now working in Hades, he leads a rebellion against the Corrupternment.'
    }
  ]
}
