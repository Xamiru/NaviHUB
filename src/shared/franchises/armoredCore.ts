// Armored Core — every mainline numbered entry (1, 2, 3, 4, V, VI) plus the
// eight expansion-era titles the task brief names explicitly: Project
// Phantasma and Master of Arena (expanding the original), 2: Another Age
// (expanding 2), 3: Silent Line (expanding 3), Nexus and Last Raven
// (standalone follow-ups to 3), and For Answer and Verdict Day (expanding 4
// and V respectively). Armored Core: Nine Breaker and Formula Front are not
// named in the brief and are excluded.
// No chrono: each generation (1-3, 4/For Answer, V/Verdict Day, VI) is its
// own continuity with different lore, mechs and even different fictional
// physics for AC movement, and FromSoftware has never drawn a single
// connecting timeline across them the way Mega Man or Castlevania do.
// Only Armored Core VI: Fires of Rubicon has ever released on Steam/PC; the
// rest are PS1/PS2/PS3/Xbox 360-only and carry no externalId.
// Dates verified against Wikipedia infoboxes, 2026-10-05; the Steam id via
// the Steam store API the same day. Hero art is the Armored Core VI Steam
// library hero. Like Ace Combat, Armored Core's player-pilots (Ravens) are
// rarely named or shown on screen — no individual pilot has a dedicated
// Wikipedia page with art — so "main characters" here use each era's own
// box art, the only reliable way to represent them, rather than invented or
// Fandom-sourced portraits.

import type { FranchiseCfg } from './types'

export const ARMORED_CORE: FranchiseCfg = {
  id: 'armored-core',
  name: 'Armored Core',
  short: 'Armored Core',
  color: '#7a7f8a',
  heroUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1888160/library_hero.jpg',
  studio: 'FromSoftware',
  tagline: 'Build the mech, pick the fight, repeat — one of the deepest customization loops in games.',
  trivia: [
    {
      title: 'The mech as the character sheet',
      body: 'Every Armored Core game\'s real draw is the garage: hundreds of interchangeable parts (frames, generators, boosters, weapons) let players build a mech suited to their own playstyle, then rebuild it entirely for the next mission\'s different demands. The series predates FromSoftware\'s later Souls games by a decade and shares their commitment to unexplained lore and unforgiving difficulty.'
    },
    {
      title: 'A new timeline nearly every generation',
      body: 'Unlike most long-running mecha franchises, Armored Core rarely carries continuity forward: the original trilogy\'s corporate-controlled post-apocalypse, Armored Core 4\'s world of autonomous Next-generation ACs, and Armored Core V\'s ruined-city resistance war are each essentially standalone settings.'
    },
    {
      title: 'The long gap, and the comeback',
      body: 'After Verdict Day (2013), FromSoftware spent a decade on Dark Souls, Sekiro and Elden Ring before Armored Core VI: Fires of Rubicon (2023) brought the series back — faster, tighter, and the first entry built with the studio\'s modern action-game expertise behind it.'
    }
  ],
  entries: [
    { id: 'arc-1', title: 'Armored Core', year: 1997, releaseDate: '1997-07-10', note: 'Debut: a mercenary Raven takes contracts amid corporate warfare in a ruined underground world' },
    { id: 'arc-phantasma', title: 'Armored Core: Project Phantasma', year: 1997, releaseDate: '1997-12-04', note: 'Expansion disc for the original, adding new missions, arenas and parts' },
    { id: 'arc-moa', title: 'Armored Core: Master of Arena', year: 1999, releaseDate: '1999-02-04', note: 'Second expansion: an arena-focused finale to the first game\'s era' },
    { id: 'arc-2', title: 'Armored Core 2', year: 2000, releaseDate: '2000-08-03', note: 'PS2 debut: Ravens colonize Mars amid a new corporate power struggle' },
    { id: 'arc-2-aa', title: 'Armored Core 2: Another Age', year: 2001, releaseDate: '2001-04-12', note: 'Direct sequel continuing the Martian conflict\'s fallout' },
    { id: 'arc-3', title: 'Armored Core 3', year: 2002, releaseDate: '2002-04-04', note: 'A fresh setting: Layered cities built atop a ruined surface, and the Controller AI that keeps order' },
    { id: 'arc-3-silent-line', title: 'Silent Line: Armored Core', year: 2003, releaseDate: '2003-01-23', note: 'Sequel to Armored Core 3: Ravens push into the Silent Line, an uncharted region beyond the Layered society' },
    { id: 'arc-nexus', title: 'Armored Core: Nexus', year: 2004, releaseDate: '2004-03-18', note: 'Closes out the Armored Core 3 era with a story tying its factions together' },
    { id: 'arc-last-raven', title: 'Armored Core: Last Raven', year: 2005, releaseDate: '2005-08-04', note: 'A dying world and the last generation of Ravens fighting over what remains' },
    { id: 'arc-4', title: 'Armored Core 4', year: 2006, releaseDate: '2006-12-21', note: 'New-generation ACs move at previously impossible speeds in a world ruled by megacorporations' },
    { id: 'arc-for-answer', title: 'Armored Core: For Answer', year: 2008, releaseDate: '2008-03-19', note: 'Direct sequel: a resource war escalates between the corporations introduced in 4' },
    { id: 'arc-v', title: 'Armored Core V', year: 2012, releaseDate: '2012-01-26', note: 'Territory warfare in a ruined city between the ruling Corporation and the Resistance, with squad-based online play' },
    { id: 'arc-verdict-day', title: 'Armored Core: Verdict Day', year: 2013, releaseDate: '2013-09-24', note: 'Standalone sequel expanding V\'s multiplayer territory war' },
    { id: 'arc-6', title: 'Armored Core VI: Fires of Rubicon', externalIds: [{ source: 'steam', id: '1888160' }], year: 2023, releaseDate: '2023-08-25', note: 'Series revival: mercenary pilot 621 is drawn into corporate warfare over the planet Rubicon 3\'s coveted Coral energy' }
  ],
  characters: [
    {
      id: 'arc-raven-1',
      name: 'The Raven (Armored Core)',
      role: 'Unnamed mercenary pilot',
      portraitUrl: 'https://upload.wikimedia.org/wikipedia/en/d/db/ArmoredCorePS1.jpg',
      appearsIn: ['arc-1', 'arc-phantasma', 'arc-moa'],
      blurb: 'The silent player-controlled mercenary of the original trilogy, hired by whichever corporation pays best in a world fought over entirely underground.'
    },
    {
      id: 'arc-pilot-4',
      name: 'The Lynx (Armored Core 4)',
      role: 'Next-generation AC pilot',
      portraitUrl: 'https://upload.wikimedia.org/wikipedia/en/6/69/Armored_Core_4.jpg',
      appearsIn: ['arc-4'],
      blurb: 'A pilot of one of the rare Next-generation Armored Cores, fast and powerful enough to single-handedly turn corporate wars.'
    },
    {
      id: 'arc-pilot-answer',
      name: 'The Lynx (For Answer)',
      role: 'Mercenary caught in the Resource War',
      portraitUrl: 'https://upload.wikimedia.org/wikipedia/en/2/29/Armored_Core_for_Answer_cover_art.PNG',
      appearsIn: ['arc-for-answer'],
      blurb: 'Picks a side as Omer Science, Interior Union and the rest escalate Armored Core 4\'s corporate conflict into open war.'
    },
    {
      id: 'arc-pilot-v',
      name: 'The Raven (Armored Core V)',
      role: 'Mercenary pilot (Armored Core V)',
      portraitUrl: 'https://upload.wikimedia.org/wikipedia/en/6/64/Armored_Core_V_cover.png',
      appearsIn: ['arc-v', 'arc-verdict-day'],
      blurb: 'A young mercenary who joins the Resistance against the Corporation that rules the ruined city.'
    },
    {
      id: 'arc-621',
      name: '621 "Raven"',
      role: 'Augmented human mercenary pilot',
      portraitUrl: 'https://upload.wikimedia.org/wikipedia/en/8/89/Armored_Core_VI_Fires_of_Rubicon_cover_art.jpg',
      appearsIn: ['arc-6'],
      blurb: 'A death-row augmented-human pilot given a second chance as a freelance mercenary on Rubicon 3, caught between corporate factions competing for Coral.'
    }
  ]
}
