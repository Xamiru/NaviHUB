// Devil May Cry — the five numbered games, the DmC reboot, the 2007 anime
// and the 2025 Netflix series. HD Collection (2012, bundling 1/2/3 Special
// Edition) and the per-game Special Editions fold in as aliases rather than
// separate rows, the Resident Evil/Persona convention; the HD Collection's
// Steam id sits on the first game's row since the bundle is named after it
// and a Steam appid can only usefully back one entry.
// Chrono follows Capcom's stated in-universe order: 3 (Dante and Vergil's
// youth) -> 1 (Dante defeats Mundus) -> 4 (Nero, Fortuna) -> 2 (Dante vs.
// Argosax) -> 5 (Nero, V and Vergil's return) — the well-known oddity where
// the chronological order does not match the release or numbering order.
// The 2007 anime is Capcom-sanctioned canon (Madhouse, under Capcom's
// supervision) but Wikipedia's own synopsis places it "between Devil May Cry
// and Devil May Cry 2" — a gap this task's stated order fills with Devil May
// Cry 4, so this page leaves the anime without a chrono slot rather than
// invent a tie-break the brief didn't ask for. DmC: Devil May Cry is an
// explicit alternate-universe reboot and the 2025 Netflix series is a loose,
// altered-canon reimagining (new characters, an original antagonist) — both
// carry no chrono, the separate-continuity convention.
// Dates verified against Wikipedia infoboxes, 2026-10-05; Steam ids via the
// Steam store API and AniList/TMDB ids via their APIs the same day. Hero art
// is the Devil May Cry 5 Steam library hero; character portraits are
// Wikipedia/Wikimedia fair-use renders (en.wikipedia.org uploads, not
// Fandom, so no Referer gate).

import type { FranchiseCfg } from './types'

export const DEVIL_MAY_CRY: FranchiseCfg = {
  id: 'devil-may-cry',
  name: 'Devil May Cry',
  short: 'Devil May Cry',
  color: '#8a0f0f',
  heroUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/601150/library_hero.jpg',
  studio: 'Capcom',
  tagline: 'Stylish action, a demon-slaying pizza enthusiast, and the father he never forgave.',
  trivia: [
    {
      title: 'The game that invented "stylish action"',
      body: 'Devil May Cry (2001) began life as a prototype for Resident Evil 4 before Capcom spun it off — the gothic castle survived, the tank controls and fixed cameras didn\'t. Its style ranking system, which grades the player in real time from "D" up to "SSS" for how flashy a combo looks rather than how efficiently it kills, became the genre\'s defining mechanic and shaped Bayonetta and the wider character-action genre that followed.'
    },
    {
      title: 'Half-devil, half-human, all family drama',
      body: 'Dante and his twin brother Vergil are the sons of Sparda, a demon who rebelled against the demon world to protect humanity two thousand years earlier. Every mainline game is ultimately a chapter in the same family story — Vergil\'s jealousy of his brother\'s humanity, Nero\'s discovery (in 4 and 5) that he is Vergil\'s son, and Dante\'s refusal to give up on either of them.'
    },
    {
      title: 'The reboot nobody asked for, and the show it led to',
      body: 'Ninja Theory\'s DmC: Devil May Cry (2013) reimagined Dante as a younger, angrier half-demon in an alternate universe, divisive at launch for its redesign but now reassessed as a strong game on its own terms. Capcom brought the series back to its original continuity with 5 (2019); the 2025 Netflix series is its own further remix, an adult animated reimagining with new characters built around the core premise rather than a retelling of any specific game.'
    }
  ],
  entries: [
    {
      id: 'dmc-1',
      title: 'Devil May Cry',
      aliases: ['Devil May Cry HD Collection'],
      externalIds: [{ source: 'steam', id: '631510' }],
      year: 2001,
      releaseDate: '2001-08-23',
      chrono: 2,
      note: 'Dante infiltrates Mallet Island and faces the demon emperor Mundus (HD Collection also bundles 2 and 3 Special Edition)'
    },
    {
      id: 'dmc-2',
      title: 'Devil May Cry 2',
      year: 2003,
      releaseDate: '2003-01-28',
      chrono: 4,
      note: 'Dante travels to Dumary Island to stop the businessman Arius and the demon Argosax'
    },
    {
      id: 'dmc-3',
      title: 'Devil May Cry 3: Dante\'s Awakening',
      aliases: ['Devil May Cry 3', 'Devil May Cry 3: Special Edition'],
      year: 2005,
      releaseDate: '2005-02-17',
      chrono: 1,
      note: 'Prequel: a young Dante opens Devil May Cry the shop while settling things with Vergil'
    },
    {
      id: 'dmc-anime',
      title: 'Devil May Cry',
      mediaType: 'anime',
      aliases: ['Devil May Cry: The Animated Series'],
      externalIds: [{ source: 'anilist', id: '1726' }],
      year: 2007,
      releaseDate: '2007-06-14',
      adaptation: true,
      note: 'Madhouse-produced, Capcom-supervised TV series set between the first two games'
    },
    {
      id: 'dmc-4',
      title: 'Devil May Cry 4',
      aliases: ['Devil May Cry 4 Special Edition'],
      externalIds: [{ source: 'steam', id: '329050' }],
      year: 2008,
      releaseDate: '2008-01-31',
      chrono: 3,
      note: 'Nero, a Holy Knight of Fortuna, turns his demonic Devil Bringer arm against the Order that raised him'
    },
    {
      id: 'dmc-reboot',
      title: 'DmC: Devil May Cry',
      externalIds: [{ source: 'steam', id: '220440' }],
      year: 2013,
      releaseDate: '2013-01-15',
      spinOff: true,
      note: 'Ninja Theory\'s alternate-universe reboot: a younger Dante uncovers the demon Mundus\'s control of modern media'
    },
    {
      id: 'dmc-5',
      title: 'Devil May Cry 5',
      aliases: ['Devil May Cry 5 Special Edition'],
      externalIds: [{ source: 'steam', id: '601150' }],
      year: 2019,
      releaseDate: '2019-03-08',
      chrono: 5,
      note: 'Nero, the mysterious V and a returning Vergil converge on Red Grave City'
    },
    {
      id: 'dmc-netflix',
      title: 'Devil May Cry',
      mediaType: 'tv',
      externalIds: [{ source: 'tmdb', id: '235930' }],
      year: 2025,
      releaseDate: '2025-04-03',
      spinOff: true,
      adaptation: true,
      note: 'Adult-animated Netflix reimagining from Adi Shankar and Studio Mir, with an original antagonist, the White Rabbit'
    }
  ],
  characters: [
    {
      id: 'dmc-dante',
      name: 'Dante',
      role: 'Devil hunter, proprietor of Devil May Cry',
      portraitUrl: 'https://upload.wikimedia.org/wikipedia/en/0/0e/Dante_%28DMC%29.png',
      appearsIn: ['dmc-1', 'dmc-2', 'dmc-3', 'dmc-anime', 'dmc-4', 'dmc-reboot', 'dmc-5', 'dmc-netflix'],
      blurb: 'Sparda\'s half-demon son, running a struggling demon-hunting business out of a shop he never bothers to clean. Fights everything with one-liners and a jukebox soundtrack.'
    },
    {
      id: 'dmc-vergil',
      name: 'Vergil',
      role: 'Dante\'s twin brother',
      portraitUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d7/VergilDMC5.png',
      appearsIn: ['dmc-3', 'dmc-5'],
      blurb: 'Obsessed with their father\'s power and contemptuous of Dante\'s human side, Vergil has spent the series alternating between villain and reluctant ally.'
    },
    {
      id: 'dmc-nero',
      name: 'Nero',
      role: 'Holy Knight turned devil hunter',
      portraitUrl: 'https://upload.wikimedia.org/wikipedia/en/0/01/NeroDevilMayCry5.png',
      appearsIn: ['dmc-4', 'dmc-5'],
      blurb: 'A Knight of the Order of the Sword with an unexplained demonic arm, later revealed to be Vergil\'s son — making him Dante\'s nephew and the series\' second protagonist.'
    },
    {
      id: 'dmc-trish',
      name: 'Trish',
      role: 'Demon created in Dante\'s mother\'s image',
      portraitUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d0/TrishDevilmayCry.png',
      appearsIn: ['dmc-1', 'dmc-anime', 'dmc-5'],
      blurb: 'Created by Mundus to manipulate Dante by resembling his late mother Eva, Trish switched sides by the end of the first game and has worked at Devil May Cry ever since.'
    },
    {
      id: 'dmc-lady',
      name: 'Lady',
      role: 'Human mercenary and demon hunter',
      portraitUrl: 'https://upload.wikimedia.org/wikipedia/en/1/1a/LadyDevilMayCry5.png',
      appearsIn: ['dmc-3', 'dmc-5'],
      blurb: 'The only major human in the main cast, armed with an arsenal of guns and rocket launchers to keep up with devils and half-devils alike.'
    }
  ]
}
